import { t, field } from './i18n.js';

export function renderCemetery(category, projects, lang) {
  const el = document.getElementById('page-cemetery');
  if (!el) return;

  if (!category) {
    el.innerHTML = `
      <div class="cemetery-dark">
        <div class="walk-inner" style="text-align:center;padding:6rem 1rem;">
          <h2 style="color:#aaa;">${t('not-found')}</h2>
          <p><a href="#/cemeteries" style="color:#888;text-decoration:underline;">${t('cem-back')}</a></p>
        </div>
      </div>
    `;
    return;
  }

  const catName = lang === 'en' ? (category.name_en || category.name) : category.name;
  const catSub = lang === 'en' ? (category.subtitle_en || category.subtitle) : category.subtitle;

  let crossesHtml = '';

  if (projects.length === 0) {
    crossesHtml = `
      <div style="text-align:center;padding:60px 0;">
        <div style="color:#555;font-size:16px;">${t('cem-empty')}</div>
      </div>
    `;
  } else {
    // Build rows of 2
    for (let i = 0; i < projects.length; i += 2) {
      const left = projects[i];
      const right = projects[i + 1];

      crossesHtml += '<div class="walk-row">';

      // Left cross
      crossesHtml += `
        <div class="walk-side walk-left">
          <a href="#/project/${left.slug}" class="walk-cross">
            <div class="cross-symbol">✝</div>
            <div class="cross-name">${field(left, 'name')}</div>
            <div class="cross-dates">${left.born} — ${left.died}</div>
            <div class="cross-cause">${field(left, 'cause')}</div>
          </a>
        </div>
      `;

      // Path
      crossesHtml += '<div class="walk-path"></div>';

      // Right cross (may be empty)
      if (right) {
        crossesHtml += `
          <div class="walk-side walk-right">
            <a href="#/project/${right.slug}" class="walk-cross">
              <div class="cross-symbol">✝</div>
              <div class="cross-name">${field(right, 'name')}</div>
              <div class="cross-dates">${right.born} — ${right.died}</div>
              <div class="cross-cause">${field(right, 'cause')}</div>
            </a>
          </div>
        `;
      } else {
        crossesHtml += '<div class="walk-side walk-right"></div>';
      }

      crossesHtml += '</div>';
    }
  }

  el.innerHTML = `
    <div class="cemetery-dark">
      <div class="walk-inner">
        <div class="hero-breadcrumb-row" style="opacity:0.6;">
          <a href="#/" style="color:#fff;text-decoration:underline;">${t('breadcrumb-home')}</a>
          <span class="breadcrumb-sep">/</span>
          <a href="#/cemeteries" style="color:#fff;text-decoration:underline;">${t('nav-cemeteries')}</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current" style="color:#ccc;">${catName}</span>
        </div>

        <div class="walk-header">
          <div class="walk-section-label">SECTION</div>
          <h1 class="walk-title">${catName}</h1>
          <p class="walk-subtitle">${catSub}</p>
          <div class="walk-count">${projects.length} ${t('cem-interred')}</div>
          <div class="walk-divider"></div>
        </div>

        ${crossesHtml}

        <div class="walk-footer">
          <div class="walk-urn">⚱</div>
          <a href="#/cemeteries" class="walk-back">${t('cem-back')}</a>
        </div>
      </div>
    </div>
  `;
}
