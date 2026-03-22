import { t, field, countryFlag } from './i18n.js';
import { calcDays } from './data.js';

const ISSUE_URL = 'https://github.com/MaxGzLi/vibe-coding-graveyard/issues/new?template=new-tombstone.yml';

export function renderProfile(project, lang) {
  const heroName = document.getElementById('profile-hero-name');
  const breadcrumbName = document.getElementById('breadcrumb-name');
  const body = document.getElementById('profile-body');

  if (!project) {
    if (heroName) heroName.textContent = t('not-found');
    if (breadcrumbName) breadcrumbName.textContent = '';
    if (body) {
      body.innerHTML = `
        <div class="narrative" style="text-align:center;padding:4rem 1rem;">
          <h2>${t('not-found')}</h2>
          <p><a href="#/">${t('back-home')}</a></p>
        </div>
      `;
    }
    return;
  }

  const name = field(project, 'name');
  const purpose = field(project, 'purpose');
  const cause = field(project, 'cause');
  const tokens = field(project, 'tokens');
  const countryName = field(project, 'countryName');
  const lastWords = field(project, 'lastWords');
  const biography = field(project, 'biography');
  const circumstances = field(project, 'circumstances');
  const lessons = field(project, 'lessons');
  const flag = countryFlag(project.country);
  const days = calcDays(project.born, project.died);

  if (heroName) heroName.textContent = name;
  if (breadcrumbName) breadcrumbName.textContent = name;

  // Info bar metadata
  const metaParts = [
    t('status-label'),
    t('purpose-label') + purpose,
    t('country-label') + flag + ' ' + countryName,
    t('tool-label') + project.tool,
    t('dates-label') + project.born + ' — ' + project.died,
  ];
  const metaStr = metaParts.join(' | ');

  let html = `
    <div class="info-bar">
      <div class="info-text">
        <div class="info-meta">${metaStr.toUpperCase()}</div>
        <div class="info-name-repeat">${name}</div>
      </div>
      <div class="info-photo" style="background-image:url('assets/cemetery.jpg')"></div>
    </div>
    <div class="narrative">
  `;

  // Optional sections
  if (biography) {
    html += `<h2>${t('bio-heading')}</h2><p>${biography}</p>`;
  }

  if (circumstances) {
    html += `<h2>${t('circumstances-heading')}</h2><p>${circumstances}</p>`;
  }

  if (lastWords) {
    html += `
      <h2>${t('last-words-heading')}</h2>
      <div class="quote-block">
        <p>"${lastWords}"</p>
        <div class="attr">— ${project.author}</div>
      </div>
    `;
  }

  if (lessons) {
    html += `<h2>${t('lessons-heading')}</h2><p>${lessons}</p>`;
  }

  // Project info table
  const daysStr = days !== null ? ` (${days}${t('days-unit')})` : '';
  html += `
    <h2>${t('info-heading')}</h2>
    <table class="info-table">
      <tr><td>${t('cause-th')}</td><td class="cause-value">${cause}</td></tr>
      <tr><td>${t('tokens-th')}</td><td>${tokens}</td></tr>
      <tr><td>${t('tool-th')}</td><td>${project.tool}</td></tr>
      <tr><td>${t('dates-th')}</td><td>${project.born} — ${project.died}${daysStr}</td></tr>
      <tr><td>${t('author-th')}</td><td>${project.author} · ${flag} ${countryName}</td></tr>
    </table>
  `;

  // Bottom CTA
  html += `
    <div class="bottom-cta">
      <p>${t('cta-text')}</p>
      <a href="${ISSUE_URL}" class="cta-btn">${t('cta-btn')}</a>
    </div>
  `;

  html += '</div>'; // close .narrative

  if (body) body.innerHTML = html;
}
