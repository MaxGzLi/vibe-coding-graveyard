import { fetchCategories } from './data.js';
import { t, getLang } from './i18n.js';

const TURNSTILE_SITE_KEY = '0x4AAAAAAAxxxxxxxx';

export async function renderSubmit(lang) {
  const el = document.getElementById('page-submit');
  if (!el) return;

  const categories = await fetchCategories();
  const breadHome = t('breadcrumb-home');

  const categoryOptions = categories.map(c => {
    const label = lang === 'en' ? c.name_en : c.name;
    return `<option value="${c.id}">${label}</option>`;
  }).join('');

  el.innerHTML = `
    <section class="profile-hero">
      <div class="hero-watermark">
        <div class="hero-watermark-inner">
          <div class="watermark-text-top">VIBE CODING MEMORIAL</div>
          <div class="wm-roof"></div>
          <div class="watermark-columns">
            <div class="wm-col"></div><div class="wm-col"></div><div class="wm-col"></div><div class="wm-col"></div><div class="wm-col"></div>
          </div>
          <div class="wm-base"></div>
          <div class="watermark-text-bottom">Commission</div>
        </div>
      </div>
      <div class="profile-hero-inner">
        <div class="hero-breadcrumb-row">
          <a href="#/">${breadHome}</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${t('nav-apply')}</span>
        </div>
        <div class="hero-top-row">
          <span class="hero-category">${t('submit-hero-label')}</span>
        </div>
        <h1 class="hero-name">${t('submit-title')}</h1>
      </div>
    </section>
    <div class="profile-content">
      <div class="narrative">
        <p class="submit-intro">${t('submit-intro')}</p>

        <form id="submit-form" class="submit-form" novalidate>
          <div class="form-group">
            <label for="field-name">${t('submit-name')} <span class="required">*</span></label>
            <input type="text" id="field-name" name="name" required placeholder="${t('submit-name-ph')}">
          </div>

          <div class="form-group">
            <label for="field-purpose">${t('submit-purpose')} <span class="required">*</span></label>
            <input type="text" id="field-purpose" name="purpose" required placeholder="${t('submit-purpose-ph')}">
          </div>

          <div class="form-group">
            <label for="field-tokens">${t('submit-tokens')} <span class="required">*</span></label>
            <input type="text" id="field-tokens" name="tokens" required placeholder="${t('submit-tokens-ph')}">
          </div>

          <div class="form-group">
            <label for="field-tool">${t('submit-tool')} <span class="required">*</span></label>
            <input type="text" id="field-tool" name="tool" required placeholder="${t('submit-tool-ph')}">
          </div>

          <div class="form-group">
            <label for="field-cause">${t('submit-cause')} <span class="required">*</span></label>
            <input type="text" id="field-cause" name="cause" required placeholder="${t('submit-cause-ph')}">
          </div>

          <div class="form-group">
            <label for="field-category">${t('submit-category')} <span class="required">*</span></label>
            <select id="field-category" name="category" required>
              <option value="">${t('submit-category-ph')}</option>
              ${categoryOptions}
            </select>
          </div>

          <div class="form-group">
            <label for="field-country">${t('submit-country')} <span class="required">*</span></label>
            <input type="text" id="field-country" name="country" required
              placeholder="${t('submit-country-ph')}" maxlength="2"
              pattern="[A-Za-z]{2}" style="text-transform:uppercase">
          </div>

          <div class="form-divider"></div>

          <div class="form-group">
            <label for="field-lastWords">${t('submit-lastwords')}</label>
            <textarea id="field-lastWords" name="lastWords" rows="3" placeholder="${t('submit-lastwords-ph')}"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group form-half">
              <label for="field-born">${t('submit-born')}</label>
              <input type="text" id="field-born" name="born" placeholder="YYYY.MM">
            </div>
            <div class="form-group form-half">
              <label for="field-died">${t('submit-died')}</label>
              <input type="text" id="field-died" name="died" placeholder="YYYY.MM">
            </div>
          </div>

          <div class="form-group">
            <div class="cf-turnstile" data-sitekey="${TURNSTILE_SITE_KEY}" data-theme="light"></div>
          </div>

          <div id="submit-message" class="submit-message" style="display:none"></div>

          <button type="submit" class="submit-btn" id="submit-btn">${t('submit-btn')}</button>
        </form>
      </div>
    </div>
  `;

  // Load Turnstile script if not already loaded
  if (!document.querySelector('script[src*="turnstile"]')) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Bind form submit
  const form = document.getElementById('submit-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const msgEl = document.getElementById('submit-message');

  // Collect form data
  const data = {
    name: form.name.value.trim(),
    purpose: form.purpose.value.trim(),
    tokens: form.tokens.value.trim(),
    tool: form.tool.value.trim(),
    cause: form.cause.value.trim(),
    category: form.category.value,
    country: form.country.value.trim().toUpperCase(),
    lastWords: form.lastWords.value.trim(),
    born: form.born.value.trim(),
    died: form.died.value.trim(),
  };

  // Client-side validation
  const required = ['name', 'purpose', 'tokens', 'tool', 'cause', 'category', 'country'];
  for (const key of required) {
    if (!data[key]) {
      showMessage(msgEl, t('submit-err-required'), 'error');
      return;
    }
  }

  if (!/^[A-Z]{2}$/.test(data.country)) {
    showMessage(msgEl, t('submit-err-country'), 'error');
    return;
  }

  if (data.born && !/^\d{4}\.\d{2}$/.test(data.born)) {
    showMessage(msgEl, t('submit-err-date'), 'error');
    return;
  }

  if (data.died && !/^\d{4}\.\d{2}$/.test(data.died)) {
    showMessage(msgEl, t('submit-err-date'), 'error');
    return;
  }

  // Get Turnstile token
  const turnstileResponse = form.querySelector('[name="cf-turnstile-response"]');
  if (turnstileResponse) {
    data.turnstileToken = turnstileResponse.value;
  }

  // Submit
  btn.disabled = true;
  btn.textContent = t('submit-sending');

  try {
    const resp = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    if (result.success) {
      showMessage(msgEl, t('submit-success'), 'success');
      form.reset();
      // Reset Turnstile
      if (window.turnstile) {
        window.turnstile.reset();
      }
    } else {
      showMessage(msgEl, result.message || t('submit-err-generic'), 'error');
    }
  } catch (err) {
    showMessage(msgEl, t('submit-err-generic'), 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = t('submit-btn');
  }
}

function showMessage(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = 'submit-message submit-message-' + type;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
