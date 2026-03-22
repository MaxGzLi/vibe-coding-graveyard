const UI_STRINGS = {
  zh: {
    // Banner & header
    'banner-text': 'Vibe Coding 阵亡将士纪念委员会官方网站',
    'site-name': 'VIBE CODING<br>阵亡将士纪念委员会',
    'lang-btn': 'EN',

    // Nav
    'nav-registry': '安息名录',
    'nav-cemeteries': '浏览墓区',
    'nav-about': '关于本馆',
    'nav-research': '数据与研究',
    'nav-news': '新闻与动态',
    'nav-apply': '申请安葬',

    // Hero
    'hero-title': '安息吧，我的项目',
    'hero-subtitle': 'Rest in peace. Every vibe-coded project deserves a headstone.',
    'hero-category': '阵亡项目',

    // Breadcrumb
    'breadcrumb-home': '首页',
    'breadcrumb-registry': '安息名录',

    // Footer
    'footer-title': 'VIBE CODING 阵亡将士纪念委员会',
    'footer-subtitle': 'Vibe Coding Memorial Commission',
    'footer-about': '关于本馆',
    'footer-contact': '联系我们',
    'footer-apply': '申请安葬',
    'footer-privacy': '隐私政策',
    'footer-accessibility': '无障碍声明',
    'footer-copyright': '© 2026 Vibe Coding Memorial Commission. This is a satirical memorial. No real projects were harmed.',

    // Render-list UI
    'registry-sub': 'Registry of Interred Projects',
    'registry-title': '安息名录',
    'results-info': '共 {n} 个项目安息于此',
    'cause-label': '死因：',
    'stats-heading': '统计 Statistics',
    'stat-projects': '个项目安息于此',
    'stat-countries': '个国家和地区',
    'stat-tokens': 'Token 已消耗',
    'top-causes-heading': '常见死因 Top Causes',
    'apply-btn': '为你的项目申请安葬',

    // Render-profile UI
    'status-label': '状态：已阵亡',
    'purpose-label': '用途：',
    'country-label': '地区：',
    'tool-label': '工具：',
    'dates-label': '生卒：',
    'bio-heading': '生平简介',
    'circumstances-heading': '死亡经过',
    'last-words-heading': '遗言',
    'lessons-heading': '教训',
    'info-heading': '项目信息',
    'cause-th': '死因',
    'tokens-th': '消耗 Token',
    'tool-th': '工具',
    'dates-th': '生卒日期',
    'author-th': '墓主',
    'days-unit': '天',
    'cta-text': '你的 Vibe Coding 项目也阵亡了吗？让我们为它立一块碑。',
    'cta-btn': '为你的项目申请安葬 →',
    'not-found': '该项目不存在',
    'back-home': '← 返回首页',

    // Cemeteries
    'cem-title': '浏览墓区',
    'cem-subtitle': '每个墓区承载着一类梦想的终结。选择一个区域，走进去看看。',
    'cem-interred': '个项目安息于此',
    'cem-back': '← 返回墓区总览',
    'cem-empty': '此墓区尚无安葬者。但别担心，总会有的。',

    // Research
    'research-title': '数据与研究',
    'research-avg-days': '天平均存活（估算）',
    'research-cause-title': '死因分布',
    'research-cause-desc': '每个项目都有自己独特的死法，但总有一些死因特别受欢迎。',
    'research-cat-title': '墓区分布',
    'research-cat-desc': '哪个墓区最拥挤？这或许能告诉我们，开发者最喜欢在哪个领域重复犯错。',
    'research-country-title': '国家与地区分布',
    'research-tool-title': '工具分布',
    'research-tool-desc': '哪个 AI 工具"协助"了最多项目走向死亡？（工具无辜，使用者有罪。）',
    'research-lifespan-title': '存活天数排行',
    'research-lifespan-desc': '从出生到死亡，按寿命从短到长排列。日期精度为月份时按 1 日估算。',

    // News
    'news-title': '新闻与动态',
    'news-announce-label': '委员会公告',
    'news-announce-text': '鉴于近期 vibe coding 项目阵亡率持续攀升，本委员会决定扩建墓区并增设临终关怀热线。请各位创造者理性 vibe，量力而行。对于存活时间不足 24 小时的项目，我们新增了"速葬通道"服务。',
    'news-timeline-title': '最近讣告',
    'news-separator': '。',
  },
  en: {
    // Banner & header
    'banner-text': 'An official website of the Vibe Coding Memorial Commission',
    'site-name': 'VIBE CODING<br>MEMORIAL COMMISSION',
    'lang-btn': '中文',

    // Nav
    'nav-registry': 'Registry',
    'nav-cemeteries': 'Cemeteries',
    'nav-about': 'About',
    'nav-research': 'Research',
    'nav-news': 'News',
    'nav-apply': 'Apply for Burial',

    // Hero
    'hero-title': 'Rest in Peace, My Project',
    'hero-subtitle': 'Every vibe-coded project deserves a headstone.',
    'hero-category': 'Fallen Project',

    // Breadcrumb
    'breadcrumb-home': 'Home',
    'breadcrumb-registry': 'Registry',

    // Footer
    'footer-title': 'VIBE CODING MEMORIAL COMMISSION',
    'footer-subtitle': 'Vibe Coding Memorial Commission',
    'footer-about': 'About',
    'footer-contact': 'Contact Us',
    'footer-apply': 'Apply for Burial',
    'footer-privacy': 'Privacy Policy',
    'footer-accessibility': 'Accessibility',
    'footer-copyright': '© 2026 Vibe Coding Memorial Commission. This is a satirical memorial. No real projects were harmed.',

    // Render-list UI
    'registry-sub': 'Registry of Interred Projects',
    'registry-title': 'Registry',
    'results-info': '{n} projects interred',
    'cause-label': 'Cause of death: ',
    'stats-heading': 'Statistics',
    'stat-projects': 'projects interred',
    'stat-countries': 'countries & regions',
    'stat-tokens': 'tokens consumed',
    'top-causes-heading': 'Top Causes of Death',
    'apply-btn': 'Apply for Burial',

    // Render-profile UI
    'status-label': 'STATUS: FALLEN',
    'purpose-label': 'PURPOSE: ',
    'country-label': 'REGION: ',
    'tool-label': 'TOOL: ',
    'dates-label': 'DATES: ',
    'bio-heading': 'Biography',
    'circumstances-heading': 'Circumstances of Death',
    'last-words-heading': 'Last Words',
    'lessons-heading': 'Lessons Learned',
    'info-heading': 'Project Information',
    'cause-th': 'Cause of Death',
    'tokens-th': 'Tokens Consumed',
    'tool-th': 'Tool',
    'dates-th': 'Dates',
    'author-th': 'Author',
    'days-unit': ' days',
    'cta-text': 'Did your vibe-coded project also fall? Let us give it a proper headstone.',
    'cta-btn': 'Apply for Burial →',
    'not-found': 'Project not found',
    'back-home': '← Back to Home',

    // Cemeteries
    'cem-title': 'Browse Cemeteries',
    'cem-subtitle': 'Each zone marks the end of a certain kind of dream. Pick one and walk through.',
    'cem-interred': 'projects interred',
    'cem-back': '← Back to Cemeteries',
    'cem-empty': 'No projects interred here yet. But don\'t worry, there will be.',

    // Research
    'research-title': 'Research & Data',
    'research-avg-days': 'days avg. lifespan (est.)',
    'research-cause-title': 'Cause of Death Distribution',
    'research-cause-desc': 'Every project dies in its own unique way, but some causes are perennial favorites.',
    'research-cat-title': 'Cemetery Zone Distribution',
    'research-cat-desc': 'Which zone is most crowded? This might tell us where developers love to repeat their mistakes.',
    'research-country-title': 'Country & Region Distribution',
    'research-tool-title': 'Tool Distribution',
    'research-tool-desc': 'Which AI tool "assisted" the most projects to their death? (The tool is innocent; the user is guilty.)',
    'research-lifespan-title': 'Lifespan Rankings',
    'research-lifespan-desc': 'From birth to death, sorted shortest to longest. Month-only dates estimated as the 1st.',

    // News
    'news-title': 'News & Updates',
    'news-announce-label': 'Commission Announcement',
    'news-announce-text': 'Given the continued rise in vibe coding project mortality rates, the Commission has decided to expand cemetery grounds and establish an end-of-life care hotline. Creators are advised to vibe responsibly. For projects that survive less than 24 hours, we now offer an "Express Burial" service.',
    'news-timeline-title': 'Recent Obituaries',
    'news-separator': '. ',
  }
};

let _lang = 'zh';

export function getLang() {
  return _lang;
}

export function setLang(lang) {
  _lang = lang;
  document.documentElement.setAttribute('data-lang', lang);
}

export function t(key) {
  return (UI_STRINGS[_lang] && UI_STRINGS[_lang][key]) || (UI_STRINGS.zh[key]) || key;
}

export function field(obj, fieldName) {
  if (_lang === 'en') {
    const enKey = fieldName + '_en';
    if (obj[enKey]) return obj[enKey];
  }
  return obj[fieldName] || '';
}

export function countryFlag(code) {
  if (!code || code.length !== 2) return '';
  const a = code.toUpperCase().charCodeAt(0) - 0x41 + 0x1F1E6;
  const b = code.toUpperCase().charCodeAt(1) - 0x41 + 0x1F1E6;
  return String.fromCodePoint(a) + String.fromCodePoint(b);
}

export function updateStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const str = t(key);
    if (str) el.innerHTML = str;
  });
}
