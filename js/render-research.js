import { getStats, getCauseCounts, getCountryCounts, getToolCounts, getCategoryCounts, getAvgDays, getShortestLived, calcDays } from './data.js';
import { t, field, countryFlag } from './i18n.js';

export function renderResearch(data, categories, lang) {
  const el = document.getElementById('page-research');
  if (!el) return;

  const stats = getStats(data);
  const causeCounts = getCauseCounts(data, lang);
  const countryCounts = getCountryCounts(data, lang);
  const toolCounts = getToolCounts(data);
  const catCounts = getCategoryCounts(data);
  const avgDays = getAvgDays(data);
  const shortest = getShortestLived(data);

  const shortestName = shortest ? field(shortest.project, 'name') : '-';
  const shortestDays = shortest ? shortest.days : '-';

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
          <span class="breadcrumb-current">${t('nav-research')}</span>
        </div>
        <div class="hero-top-row">
          <span class="hero-category">${lang === 'en' ? 'RESEARCH & DATA' : '数据与研究'}</span>
        </div>
        <h1 class="hero-name">${t('research-title')}</h1>
      </div>
    </section>
    <div class="profile-content">
      <div class="narrative">

        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-num">${stats.total}</div>
            <div class="stat-label">${t('stat-projects')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${stats.countries}</div>
            <div class="stat-label">${t('stat-countries')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${avgDays}</div>
            <div class="stat-label">${t('research-avg-days')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${shortestDays}${t('days-unit')}</div>
            <div class="stat-label">${shortestName}</div>
          </div>
        </div>

        <h2>${t('research-cause-title')}</h2>
        <p>${t('research-cause-desc')}</p>
        ${renderBarChart(causeCounts, stats.total)}

        <h2>${t('research-cat-title')}</h2>
        <p>${t('research-cat-desc')}</p>
        ${renderCategoryChart(catCounts, categories, lang, stats.total)}

        <h2>${t('research-country-title')}</h2>
        ${renderCountryList(countryCounts)}

        <h2>${t('research-tool-title')}</h2>
        <p>${t('research-tool-desc')}</p>
        ${renderBarChart(toolCounts, stats.total)}

        <h2>${t('research-lifespan-title')}</h2>
        <p>${t('research-lifespan-desc')}</p>
        ${renderLifespanTable(data, lang)}

      </div>
    </div>
  `;
}

function renderBarChart(entries, total) {
  let html = '<div class="bar-chart">';
  entries.forEach(([label, count]) => {
    const pct = Math.round((count / total) * 100);
    const width = Math.max(pct, 8);
    html += `
      <div class="bar-row">
        <div class="bar-label">${label}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${width}%"></div>
        </div>
        <div class="bar-value">${count}</div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

function renderCategoryChart(catCounts, categories, lang, total) {
  const entries = categories
    .map(cat => {
      const name = lang === 'en' ? (cat.name_en || cat.name) : cat.name;
      return [name, catCounts[cat.id] || 0];
    })
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return renderBarChart(entries, total);
}

function renderCountryList(countryCounts) {
  let html = '<div class="country-list">';
  countryCounts.forEach(({ code, name, count }) => {
    const flag = countryFlag(code);
    html += `
      <div class="country-row">
        <span class="country-flag">${flag}</span>
        <span class="country-name">${name}</span>
        <span class="country-count">${count}</span>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

function renderLifespanTable(data, lang) {
  const rows = data
    .map(d => ({ name: field(d, 'name'), slug: d.slug, days: calcDays(d.born, d.died), born: d.born, died: d.died }))
    .filter(r => r.days !== null)
    .sort((a, b) => a.days - b.days);

  let html = '<table class="info-table">';
  rows.forEach(r => {
    html += `
      <tr>
        <td><a href="#/project/${r.slug}" style="color:var(--navy);text-decoration:underline;">${r.name}</a></td>
        <td>${r.born} — ${r.died}</td>
        <td style="font-weight:600;">${r.days}${t('days-unit')}</td>
      </tr>
    `;
  });
  html += '</table>';
  return html;
}
