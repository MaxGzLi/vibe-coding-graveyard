// Cloudflare Pages Function — POST /api/submit
// Validates submission, verifies Turnstile, creates GitHub Issue

const VALID_CATEGORIES = [
  'api-wrapper', 'productivity', 'content-gen', 'social',
  'finance', 'dev-tools', 'todo', 'lifestyle'
];

// Simple in-memory rate limit (resets on cold start, which is fine for edge workers)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || (now - entry.windowStart) > windowMs) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

function isValidCountryCode(code) {
  return /^[A-Z]{2}$/.test(code);
}

function isValidDateFormat(date) {
  if (!date) return true;
  return /^\d{4}\.\d{2}$/.test(date);
}

function escapeForMarkdown(str) {
  return str.replace(/[|\\`*_{}[\]()#+\-.!]/g, '\\$&');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    // Rate limit check
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Too many submissions. Please try again later.'
      }), { status: 429, headers });
    }

    // Parse body
    const body = await request.json();

    // Validate required fields
    const required = ['name', 'purpose', 'tokens', 'tool', 'cause', 'category', 'country'];
    for (const field of required) {
      if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
        return new Response(JSON.stringify({
          success: false,
          message: `Missing required field: ${field}`
        }), { status: 400, headers });
      }
    }

    // Trim all string fields
    const data = {};
    for (const key of Object.keys(body)) {
      data[key] = typeof body[key] === 'string' ? body[key].trim() : body[key];
    }

    // Validate category
    if (!VALID_CATEGORIES.includes(data.category)) {
      return new Response(JSON.stringify({
        success: false,
        message: `Invalid category: ${data.category}`
      }), { status: 400, headers });
    }

    // Validate country code
    const country = data.country.toUpperCase();
    if (!isValidCountryCode(country)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Country must be a 2-letter ISO code (e.g., CN, US, JP)'
      }), { status: 400, headers });
    }

    // Validate date formats
    if (!isValidDateFormat(data.born)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Born date must be in YYYY.MM format'
      }), { status: 400, headers });
    }
    if (!isValidDateFormat(data.died)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Died date must be in YYYY.MM format'
      }), { status: 400, headers });
    }

    // Verify Turnstile token
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && data.turnstileToken) {
      const turnstileResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: data.turnstileToken,
          remoteip: ip,
        }),
      });
      const turnstileResult = await turnstileResp.json();
      if (!turnstileResult.success) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Bot verification failed. Please try again.'
        }), { status: 403, headers });
      }
    }

    // Build GitHub Issue body
    const issueBody = buildIssueBody(data, country);

    // Create GitHub Issue
    const githubToken = env.GITHUB_TOKEN;
    if (!githubToken) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Server configuration error: missing GitHub token'
      }), { status: 500, headers });
    }

    const issueResp = await fetch('https://api.github.com/repos/MaxGzLi/vibe-coding-graveyard/issues', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'VibeCodingGraveyard/1.0',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        title: `[Tombstone] ${data.name}`,
        body: issueBody,
        labels: ['new-tombstone'],
      }),
    });

    if (!issueResp.ok) {
      const errText = await issueResp.text();
      console.error('GitHub API error:', issueResp.status, errText);
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to create submission. Please try again later.'
      }), { status: 502, headers });
    }

    const issue = await issueResp.json();

    return new Response(JSON.stringify({
      success: true,
      message: 'Submission received! Your project will appear on the memorial shortly.',
      issueNumber: issue.number,
    }), { status: 201, headers });

  } catch (err) {
    console.error('Submit error:', err);
    return new Response(JSON.stringify({
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    }), { status: 500, headers });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function buildIssueBody(data, country) {
  // Structured format that the GitHub Action can parse
  // Using a simple key: value format for easy parsing
  let body = `### 项目名 / Project Name

${data.name}

### 用途 / Purpose

${data.purpose}

### 消耗 Token / Tokens Consumed

${data.tokens}

### 工具 / AI Tool Used

${data.tool}

### 死因 / Cause of Death

${data.cause}

### 墓区 / Cemetery Zone

${data.category}

### 国家 / Country

${country}`;

  if (data.lastWords) {
    body += `

### 遗言 / Last Words

${data.lastWords}`;
  }

  if (data.born) {
    body += `

### 出生日期 / Born

${data.born}`;
  }

  if (data.died) {
    body += `

### 死亡日期 / Died

${data.died}`;
  }

  body += `

---
_Submitted via web form_`;

  return body;
}
