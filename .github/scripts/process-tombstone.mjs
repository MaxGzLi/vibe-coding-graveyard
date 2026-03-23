#!/usr/bin/env node
// Process a new tombstone submission from a GitHub Issue
// Called by the process-tombstone.yml workflow

import { readFileSync, writeFileSync } from 'fs';
import { appendFileSync } from 'fs';

// ============================================================
// 1. Parse issue body
// ============================================================

const issueBody = process.env.ISSUE_BODY || '';
const issueNumber = process.env.ISSUE_NUMBER || '0';

function parseIssueBody(body) {
  const fields = {};
  const sections = body.split(/^### /m).filter(Boolean);

  for (const section of sections) {
    const lines = section.trim().split('\n');
    const header = lines[0].trim();
    const value = lines.slice(1).join('\n').trim();

    // Map headers to field names
    if (header.includes('Project Name') || header.includes('项目名')) {
      fields.name = value;
    } else if (header.includes('Purpose') || header.includes('用途')) {
      fields.purpose = value;
    } else if (header.includes('Tokens') || header.includes('Token')) {
      fields.tokens = value;
    } else if (header.includes('Tool') || header.includes('工具')) {
      fields.tool = value;
    } else if (header.includes('Cause') || header.includes('死因')) {
      fields.cause = value;
    } else if (header.includes('Cemetery') || header.includes('墓区')) {
      fields.category = value;
    } else if (header.includes('Country') || header.includes('国家')) {
      fields.country = value;
    } else if (header.includes('Last Words') || header.includes('遗言')) {
      fields.lastWords = value;
    } else if (header.includes('Born') || header.includes('出生')) {
      fields.born = value;
    } else if (header.includes('Died') || header.includes('死亡')) {
      fields.died = value;
    }
  }

  return fields;
}

const fields = parseIssueBody(issueBody);
console.log('Parsed fields:', JSON.stringify(fields, null, 2));

// ============================================================
// 2. Validate required fields
// ============================================================

const VALID_CATEGORIES = [
  'api-wrapper', 'productivity', 'content-gen', 'social',
  'finance', 'dev-tools', 'todo', 'lifestyle'
];

// Map display names to IDs (for issue template dropdown submissions)
const CATEGORY_MAP = {
  'API 套壳区 / API Wrapper Zone': 'api-wrapper',
  'API Wrapper Zone': 'api-wrapper',
  'API 套壳区': 'api-wrapper',
  '效率幻觉区 / Productivity Illusion Zone': 'productivity',
  'Productivity Illusion Zone': 'productivity',
  '效率幻觉区': 'productivity',
  '内容批发区 / Content Factory Zone': 'content-gen',
  'Content Factory Zone': 'content-gen',
  '内容批发区': 'content-gen',
  '社交替代区 / Social Replacement Zone': 'social',
  'Social Replacement Zone': 'social',
  '社交替代区': 'social',
  '发财梦碎区 / Shattered Fortune Zone': 'finance',
  'Shattered Fortune Zone': 'finance',
  '发财梦碎区': 'finance',
  '开发者自嗨区 / Dev Self-Amusement Zone': 'dev-tools',
  'Dev Self-Amusement Zone': 'dev-tools',
  '开发者自嗨区': 'dev-tools',
  '万年 Todo 区 / Eternal Todo Zone': 'todo',
  'Eternal Todo Zone': 'todo',
  '万年 Todo 区': 'todo',
  '生活方式区 / Lifestyle Zone': 'lifestyle',
  'Lifestyle Zone': 'lifestyle',
  '生活方式区': 'lifestyle',
};

const required = ['name', 'purpose', 'tokens', 'tool', 'cause', 'category', 'country'];
const missing = required.filter(f => !fields[f]);

if (missing.length > 0) {
  setOutput('action', 'reject');
  setOutput('reject_reason', `Missing required fields: ${missing.join(', ')}`);
  process.exit(0);
}

// Resolve category
let category = fields.category;
if (!VALID_CATEGORIES.includes(category)) {
  category = CATEGORY_MAP[category] || null;
}
if (!category) {
  setOutput('action', 'reject');
  setOutput('reject_reason', `Invalid cemetery zone: "${fields.category}"`);
  process.exit(0);
}

// Validate country code
const country = fields.country.toUpperCase().trim();
if (!/^[A-Z]{2}$/.test(country)) {
  setOutput('action', 'reject');
  setOutput('reject_reason', `Invalid country code: "${fields.country}" (must be 2-letter ISO code)`);
  process.exit(0);
}

// Validate dates
if (fields.born && !/^\d{4}\.\d{2}(\.\d{2})?$/.test(fields.born)) {
  setOutput('action', 'reject');
  setOutput('reject_reason', `Invalid born date format: "${fields.born}" (expected YYYY.MM)`);
  process.exit(0);
}
if (fields.died && !/^\d{4}\.\d{2}(\.\d{2})?$/.test(fields.died)) {
  setOutput('action', 'reject');
  setOutput('reject_reason', `Invalid died date format: "${fields.died}" (expected YYYY.MM)`);
  process.exit(0);
}

// ============================================================
// 3. Generate slug and check for duplicates
// ============================================================

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

const slug = slugify(fields.name);
if (!slug) {
  setOutput('action', 'reject');
  setOutput('reject_reason', 'Could not generate a valid slug from the project name.');
  process.exit(0);
}

const tombstones = JSON.parse(readFileSync('data/tombstones.json', 'utf8'));
const existingSlugs = new Set(tombstones.map(t => t.slug));
const existingNames = new Set(tombstones.map(t => t.name.toLowerCase()));

if (existingSlugs.has(slug) || existingNames.has(fields.name.toLowerCase())) {
  setOutput('action', 'reject');
  setOutput('reject_reason', `A project with the name "${fields.name}" (or slug "${slug}") already exists in the graveyard.`);
  process.exit(0);
}

// ============================================================
// 4. OpenAI moderation check
// ============================================================

let moderationFlagged = false;
let moderationCategories = [];

const openaiKey = process.env.OPENAI_API_KEY;
if (openaiKey) {
  try {
    const textToCheck = [fields.name, fields.purpose, fields.cause, fields.lastWords || '']
      .filter(Boolean).join('\n');

    const modResp = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'omni-moderation-latest',
        input: textToCheck,
      }),
    });

    if (modResp.ok) {
      const modResult = await modResp.json();
      const result = modResult.results?.[0];
      if (result?.flagged) {
        moderationFlagged = true;
        moderationCategories = Object.entries(result.categories || {})
          .filter(([, v]) => v)
          .map(([k]) => k);
      }
    }
    console.log('Moderation check:', moderationFlagged ? `FLAGGED (${moderationCategories.join(', ')})` : 'PASS');
  } catch (err) {
    console.error('Moderation check failed:', err.message);
    // Non-blocking — proceed without moderation
  }
} else {
  console.log('No OPENAI_API_KEY set, skipping moderation check');
}

if (moderationFlagged) {
  setOutput('action', 'review');
  setOutput('review_reason',
    `Content flagged by moderation system.\n\n**Categories:** ${moderationCategories.join(', ')}\n\nPlease review manually to confirm this is appropriate satirical content.`
  );
  process.exit(0);
}

// ============================================================
// 5. Translate to English via Claude API
// ============================================================

let translations = {};
const anthropicKey = process.env.ANTHROPIC_API_KEY;

if (anthropicKey) {
  try {
    const prompt = `Translate the following fields from Chinese to English for a satirical project graveyard website. Keep the tone humorous and self-deprecating. If the text is already in English, keep it as-is. Return ONLY valid JSON with these exact keys.

Input:
- name: ${fields.name}
- purpose: ${fields.purpose}
- cause: ${fields.cause}
- lastWords: ${fields.lastWords || '(none)'}

Return JSON like:
{"name_en": "...", "purpose_en": "...", "cause_en": "...", "lastWords_en": "..."}

If lastWords input is "(none)", set lastWords_en to "".`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      }),
    });

    if (resp.ok) {
      const result = await resp.json();
      const text = result.content?.[0]?.text || '';
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        translations = JSON.parse(jsonMatch[0]);
        console.log('Translations:', JSON.stringify(translations, null, 2));
      }
    } else {
      console.error('Claude API error:', resp.status, await resp.text());
    }
  } catch (err) {
    console.error('Translation failed:', err.message);
    // Non-blocking — will use empty translations
  }
} else {
  console.log('No ANTHROPIC_API_KEY set, skipping translations');
}

// ============================================================
// 6. Build tombstone entry and append
// ============================================================

const newTombstone = {
  slug,
  name: fields.name,
  name_en: translations.name_en || fields.name,
  category,
  purpose: fields.purpose,
  purpose_en: translations.purpose_en || fields.purpose,
  tokens: fields.tokens,
  tokens_en: fields.tokens,
  tool: fields.tool,
  cause: fields.cause,
  cause_en: translations.cause_en || fields.cause,
  country,
  countryName: '',
  countryName_en: '',
  lastWords: fields.lastWords || '',
  lastWords_en: translations.lastWords_en || fields.lastWords || '',
  author: '@anonymous',
  born: fields.born || '',
  died: fields.died || '',
};

// Append to tombstones array
tombstones.push(newTombstone);
writeFileSync('data/tombstones.json', JSON.stringify(tombstones, null, 2) + '\n');

console.log(`Added tombstone: ${slug} (issue #${issueNumber})`);

setOutput('action', 'publish');
setOutput('slug', slug);
setOutput('project_name', fields.name);

// ============================================================
// Helper: set GitHub Actions output
// ============================================================

function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    // Handle multiline values
    const delimiter = `EOF_${Date.now()}`;
    appendFileSync(outputFile, `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
  } else {
    console.log(`::set-output name=${name}::${value}`);
  }
}
