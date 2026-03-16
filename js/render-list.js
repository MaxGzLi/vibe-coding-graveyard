import { getStats, getTopCauses } from './data.js';
import { t, field, countryFlag } from './i18n.js';

const ISSUE_URL = 'https://github.com/MaxGzLi/vibe-coding-graveyard/issues/new?template=new-tombstone.yml';

const TOMBSTONE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
  <path d="M12 2C8 2 6 4 6 4v16h12V4s-2-2-6-2z"/>
  <path d="M10 8h4M12 8v5"/>
</svg>`;

export function renderList(data, lang) {
  renderMain(data, lang);
  renderSide(data, lang);
}

function renderMain(data, lang) {
  const el = document.getElementById('list-main');
  if (!el) return;

  const resultsText = t('results-info').replace('{n}', data.length);

  let html = `
    <div class="page-heading">
      <div class="page-heading-sub">${t('registry-sub')}</div>
      <h2>${t('registry-title')}</h2>
    </div>
    <div class="page-heading-rule"></div>
    <div class="results-info">${resultsText}</div>
  `;

  data.forEach(d => {
    const name = field(d, 'name');
    const cause = field(d, 'cause');
    const purpose = field(d, 'purpose');
    const flag = countryFlag(d.country);

    html += `
      <div class="obit-entry">
        <div class="obit-icon">${TOMBSTONE_SVG}</div>
        <div class="obit-body">
          <h3><a href="#/project/${d.slug}">${name}</a></h3>
          <div class="obit-meta">${flag} · ${d.born} — ${d.died} · ${d.tool}</div>
          <div class="obit-cause">${t('cause-label')}${cause}</div>
          <p class="obit-excerpt">${purpose}</p>
        </div>
      </div>
    `;
  });

  el.innerHTML = html;
}

function renderSide(data, lang) {
  const el = document.getElementById('list-side');
  if (!el) return;

  const stats = getStats(data);
  const topCauses = getTopCauses(data, lang);

  let causesHtml = topCauses.map(c => `<a class="side-link">${c}</a>`).join('');

  el.innerHTML = `
    <div class="side-section">
      <h4>${t('stats-heading')}</h4>
      <div class="side-stat"><div class="num">${stats.total}</div><div class="desc">${t('stat-projects')}</div></div>
      <div class="side-stat"><div class="num">${stats.countries}</div><div class="desc">${t('stat-countries')}</div></div>
      <div class="side-stat"><div class="num">∞</div><div class="desc">${t('stat-tokens')}</div></div>
    </div>
    <div class="side-section">
      <h4>${t('top-causes-heading')}</h4>
      ${causesHtml}
    </div>
    <div class="side-section">
      <a class="side-apply" href="${ISSUE_URL}">${t('apply-btn')}</a>
    </div>
  `;
}
