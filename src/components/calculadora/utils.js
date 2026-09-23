// Utilidades compartidas de la calculadora PAES.

export const FAV_KEY = 'lael_calculadora_favoritas';
export const MAX_FAVS = 4;
export const SITE_URL = 'institutolael.cl/calculadora';

export const LABEL = {
  nem: 'NEM', rank: 'Ranking', cl: 'C. Lectora', m1: 'M1', m2: 'M2', his: 'Historia', cie: 'Ciencias',
  hc: 'Hist. o Cs.', esp: 'Prueba especial', 'his o cie': 'Historia o Ciencias',
};

const LOWER = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'en', 'e']);
export const titleCase = (s) =>
  s.toLowerCase().split(' ').map((w, i) => (i > 0 && LOWER.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
export const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** 745.35 -> "745,35" (máx. 2 decimales, formato chileno). */
export const fmt = (n, dec = 2) => Number(n).toLocaleString('es-CL', { maximumFractionDigits: dec });

/** Puntaje ponderado de una carrera: { value } | { missing: [...] } | { special: true } */
export function computeScore(w, sc) {
  const val = (k) => {
    const n = Number(sc[k]);
    return n >= 100 && n <= 1000 ? n : null;
  };
  if (w.esp) return { special: true };
  const missing = [];
  let total = 0;
  for (const k of ['nem', 'rank', 'cl', 'm1', 'm2', 'his', 'cie']) {
    if (!w[k]) continue;
    const v = val(k);
    if (v == null) missing.push(k);
    else total += (w[k] / 100) * v;
  }
  if (w.hc) {
    const best = Math.max(val('his') ?? -1, val('cie') ?? -1);
    if (best < 0) missing.push('his o cie');
    else total += (w.hc / 100) * best;
  }
  if (missing.length) return { missing };
  return { value: Math.round(total * 10) / 10 };
}

/** Promedio C. Lectora + M1 del alumno (o null si falta alguno). */
export function clM1(sc) {
  const cl = Number(sc.cl), m1 = Number(sc.m1);
  return cl >= 100 && cl <= 1000 && m1 >= 100 && m1 <= 1000 ? (cl + m1) / 2 : null;
}

export const weightsText = (w) =>
  Object.entries(w)
    .filter(([, v]) => typeof v === 'number' && v > 0)
    .map(([k, v]) => `${LABEL[k]} ${v}%`)
    .join(' · ');

// ── Favoritas (localStorage siempre dentro de try/catch) ────────────────────
export function loadFavs() {
  try {
    const v = JSON.parse(localStorage.getItem(FAV_KEY));
    return Array.isArray(v) ? v.filter((x) => Number.isInteger(x)).slice(0, MAX_FAVS) : [];
  } catch (_) {
    return [];
  }
}
export function saveFavs(ids) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); } catch (_) {}
}

// ── Compartir ──────────────────────────────────────────────────────────────
export function shareText(career, score) {
  return `Con mis puntajes tengo ${fmt(score, 1)} ponderado en ${career.n} (${career.u}). Calcula el tuyo gratis en ${SITE_URL}`;
}

/** Web Share API si existe; si no, abre WhatsApp con el texto. Devuelve 'shared' | 'whatsapp' | 'cancel'. */
export async function shareResult(text) {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ text });
      return 'shared';
    } catch (e) {
      if (e && e.name === 'AbortError') return 'cancel';
    }
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  return 'whatsapp';
}
