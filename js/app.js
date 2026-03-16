import { fetchTombstones, getBySlug } from './data.js';
import { renderList } from './render-list.js';
import { renderProfile } from './render-profile.js';
import { getLang, setLang, updateStaticI18n } from './i18n.js';

const ISSUE_URL = 'https://github.com/MaxGzLi/vibe-coding-graveyard/issues/new?template=new-tombstone.yml';

async function route() {
  const data = await fetchTombstones();
  const hash = location.hash || '#/';
  const listEl = document.getElementById('page-list');
  const profileEl = document.getElementById('page-profile');

  if (hash.startsWith('#/project/')) {
    const slug = hash.replace('#/project/', '');
    const project = getBySlug(data, slug);
    listEl.style.display = 'none';
    profileEl.style.display = 'block';
    renderProfile(project, getLang());
    window.scrollTo(0, 0);
    return;
  }

  listEl.style.display = 'block';
  profileEl.style.display = 'none';
  renderList(data, getLang());
}

function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = getLang() === 'zh' ? 'en' : 'zh';
    setLang(next);
    updateStaticI18n();
    route();
  });
}

function initBannerClose() {
  const btn = document.getElementById('banner-close');
  const banner = document.getElementById('top-banner');
  if (btn && banner) {
    btn.addEventListener('click', () => banner.style.display = 'none');
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  setLang('zh');
  updateStaticI18n();
  initLangToggle();
  initBannerClose();
  document.querySelectorAll('[data-submit-link]').forEach(el => {
    el.href = ISSUE_URL;
  });
  route();
});
