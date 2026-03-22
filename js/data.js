let _data = null;
let _categories = null;

export async function fetchTombstones() {
  if (_data) return _data;
  try {
    const res = await fetch('data/tombstones.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _data = await res.json();
  } catch (e) {
    console.error('Failed to load tombstones:', e);
    _data = [];
  }
  return _data;
}

export async function fetchCategories() {
  if (_categories) return _categories;
  try {
    const res = await fetch('data/categories.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _categories = await res.json();
  } catch (e) {
    console.error('Failed to load categories:', e);
    _categories = [];
  }
  return _categories;
}

export function getBySlug(data, slug) {
  return data.find(d => d.slug === slug) || null;
}

export function getByCategory(data, categoryId) {
  return data.filter(d => d.category === categoryId);
}

export function getCategoryById(categories, id) {
  return categories.find(c => c.id === id) || null;
}

export function getStats(data) {
  const countries = new Set(data.map(d => d.country));
  return { total: data.length, countries: countries.size };
}

export function getTopCauses(data, lang) {
  const field = lang === 'en' ? 'cause_en' : 'cause';
  const counts = {};
  data.forEach(d => {
    const c = d[field] || d.cause;
    counts[c] = (counts[c] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cause]) => cause);
}

export function getCauseCounts(data, lang) {
  const f = lang === 'en' ? 'cause_en' : 'cause';
  const counts = {};
  data.forEach(d => {
    const c = d[f] || d.cause;
    counts[c] = (counts[c] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export function getCountryCounts(data, lang) {
  const counts = {};
  const names = {};
  data.forEach(d => {
    counts[d.country] = (counts[d.country] || 0) + 1;
    if (!names[d.country]) {
      names[d.country] = lang === 'en' ? (d.countryName_en || d.countryName) : d.countryName;
    }
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([code, count]) => ({ code, name: names[code], count }));
}

export function getToolCounts(data) {
  const counts = {};
  data.forEach(d => {
    counts[d.tool] = (counts[d.tool] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export function getCategoryCounts(data) {
  const counts = {};
  data.forEach(d => {
    if (d.category) counts[d.category] = (counts[d.category] || 0) + 1;
  });
  return counts;
}

export function calcDays(born, died) {
  if (!born || !died) return null;
  const parts = (s) => {
    const p = s.split('.');
    const y = parseInt(p[0], 10);
    const m = parseInt(p[1], 10) - 1;
    const d = p.length >= 3 ? parseInt(p[2], 10) : 1;
    return new Date(y, m, d);
  };
  const d1 = parts(born);
  const d2 = parts(died);
  const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : 0;
}

export function getAvgDays(data) {
  let total = 0, count = 0;
  data.forEach(d => {
    const days = calcDays(d.born, d.died);
    if (days !== null) { total += days; count++; }
  });
  return count > 0 ? Math.round(total / count) : 0;
}

export function getShortestLived(data) {
  let min = Infinity, project = null;
  data.forEach(d => {
    const days = calcDays(d.born, d.died);
    if (days !== null && days <= min) { min = days; project = d; }
  });
  return project ? { project, days: min } : null;
}

export function getSortedByDeath(data) {
  return [...data].sort((a, b) => {
    const da = a.died.split('.').map(Number);
    const db = b.died.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      const va = da[i] || 0, vb = db[i] || 0;
      if (va !== vb) return vb - va;
    }
    return 0;
  });
}
