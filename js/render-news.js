import { getSortedByDeath } from './data.js';
import { t, field } from './i18n.js';

export function renderNews(data, lang) {
  const el = document.getElementById('page-news');
  if (!el) return;

  const sorted = getSortedByDeath(data);

  let timelineHtml = '';
  let lastDate = '';

  sorted.forEach(d => {
    const died = d.died;
    if (died !== lastDate) {
      timelineHtml += `<div class="news-date">${died}</div>`;
      lastDate = died;
    }

    const name = field(d, 'name');
    const purpose = field(d, 'purpose');
    const cause = field(d, 'cause');

    timelineHtml += `
      <div class="news-item">
        <div class="news-dot"></div>
        <div class="news-body">
          <h3><a href="#/project/${d.slug}">${name}</a></h3>
          <p>${purpose}${t('news-separator')}${t('cause-label')}${cause}</p>
          <div class="news-meta">${d.tool} · ${d.born} — ${d.died}</div>
        </div>
      </div>
    `;
  });

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
          <a href="#/">${t('breadcrumb-home')}</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${t('nav-news')}</span>
        </div>
        <div class="hero-top-row">
          <span class="hero-category">${lang === 'en' ? 'NEWS & UPDATES' : '新闻与动态'}</span>
        </div>
        <h1 class="hero-name">${t('news-title')}</h1>
      </div>
    </section>
    <div class="profile-content">
      <div class="narrative">

        <div class="news-announce">
          <div class="news-announce-label">${t('news-announce-label')}</div>
          <p>${t('news-announce-text')}</p>
        </div>

        <h2>${t('news-timeline-title')}</h2>
        <div class="news-timeline">
          ${timelineHtml}
        </div>

      </div>
    </div>
  `;
}
