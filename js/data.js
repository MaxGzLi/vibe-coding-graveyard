let _data = null;

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

export function getBySlug(data, slug) {
  return data.find(d => d.slug === slug) || null;
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
