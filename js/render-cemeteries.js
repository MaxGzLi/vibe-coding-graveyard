import { getCategoryCounts } from './data.js';
import { t, getLang } from './i18n.js';

export function renderCemeteries(categories, data, lang) {
  const el = document.getElementById('page-cemeteries');
  if (!el) return;

  const counts = getCategoryCounts(data);

  let cardsHtml = '';
  categories.forEach(cat => {
    const name = lang === 'en' ? (cat.name_en || cat.name) : cat.name;
    const subtitle = lang === 'en' ? (cat.subtitle_en || cat.subtitle) : cat.subtitle;
    const count = counts[cat.id] || 0;

    cardsHtml += `
      <a href="#/cemetery/${cat.id}" class="cem-card">
        <div class="cem-card-cross">✝</div>
        <h3 class="cem-card-name">${name}</h3>
        <p class="cem-card-sub">${subtitle}</p>
        <div class="cem-card-count">${count} ${t('cem-interred')}</div>
      </a>
    `;
  });

  el.innerHTML = `
    <section class="cem-hero">
      <div class="cem-hero-inner">
        <div class="hero-breadcrumb-row">
          <a href="#/">${t('breadcrumb-home')}</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${t('nav-cemeteries')}</span>
        </div>
        <h1>${t('cem-title')}</h1>
        <p class="cem-hero-sub">${t('cem-subtitle')}</p>
      </div>
    </section>
    <div class="cem-grid">
      ${cardsHtml}
    </div>
  `;
}
