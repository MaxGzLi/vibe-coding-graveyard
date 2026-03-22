import { fetchTombstones, fetchCategories, getBySlug, getByCategory, getCategoryById } from './data.js';
import { renderList } from './render-list.js';
import { renderProfile } from './render-profile.js';
import { renderCemeteries } from './render-cemeteries.js';
import { renderCemetery } from './render-cemetery.js';
import { renderAbout } from './render-about.js';
import { renderResearch } from './render-research.js';
import { renderNews } from './render-news.js';
import { getLang, setLang, updateStaticI18n } from './i18n.js';

const ISSUE_URL = 'https://github.com/MaxGzLi/vibe-coding-graveyard/issues/new?template=new-tombstone.yml';

function hideAllPages() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.style.display = 'none';
  });
}

function showPage(id) {
  hideAllPages();
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
}

async function route() {
  const data = await fetchTombstones();
  const categories = await fetchCategories();
  const hash = location.hash || '#/';
  const lang = getLang();

  if (hash.startsWith('#/project/')) {
    const slug = hash.replace('#/project/', '');
    const project = getBySlug(data, slug);
    showPage('page-profile');
    renderProfile(project, lang);
    window.scrollTo(0, 0);
    return;
  }

  if (hash.startsWith('#/cemetery/')) {
    const catId = hash.replace('#/cemetery/', '');
    const cat = getCategoryById(categories, catId);
    const projects = getByCategory(data, catId);
    showPage('page-cemetery');
    renderCemetery(cat, projects, lang);
    window.scrollTo(0, 0);
    return;
  }

  if (hash === '#/cemeteries') {
    showPage('page-cemeteries');
    renderCemeteries(categories, data, lang);
    window.scrollTo(0, 0);
    return;
  }

  if (hash === '#/about') {
    showPage('page-about');
    renderAbout(lang);
    window.scrollTo(0, 0);
    return;
  }

  if (hash === '#/research') {
    showPage('page-research');
    renderResearch(data, categories, lang);
    window.scrollTo(0, 0);
    return;
  }

  if (hash === '#/news') {
    showPage('page-news');
    renderNews(data, lang);
    window.scrollTo(0, 0);
    return;
  }

  // Default: homepage / registry
  showPage('page-list');
  renderList(data, lang);
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
