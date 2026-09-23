#!/usr/bin/env node
/*
 * fetch-cortes.cjs
 * ----------------------------------------------------------------------------
 * Puntajes de corte (último seleccionado / último matriculado) del Proceso de
 * Admisión 2026, tomados SOLO de publicaciones oficiales de cada universidad.
 *
 * USO
 *   node scripts/fetch-cortes.cjs            descarga las páginas y genera
 *   node scripts/fetch-cortes.cjs --cache    usa las copias ya descargadas
 *
 * SALIDAS
 *   src/data/cortes-2026.json          { código DEMRE: [puntaje, tipo] }
 *   scripts/fetch-cortes-report.txt    cobertura, filas sin match y dudas
 *
 * POR QUÉ NO DEL DEMRE
 *   El DEMRE no publica los puntajes de corte en una página o PDF abierto: sólo
 *   están en sus bases de "Datos Abiertos" (portal-transparencia.demre.cl), que
 *   se descargan a mano tras un reCAPTCHA. Si algún día se descargan, conviene
 *   agregar aquí una fuente más que lea ese archivo (cubriría las 47 U.).
 *
 * TIPOS (cada universidad publica un dato distinto; se muestra tal cual)
 *   s = puntaje ponderado del último seleccionado(a)
 *   m = puntaje ponderado del último matriculado(a)
 *   c = "puntaje de corte" (la universidad no precisa si es seleccionado o
 *       matriculado)
 *
 * CÓMO SE ASOCIA CADA FILA A UNA CARRERA (src/data/carreras-2026.json)
 *   1. Si la fuente trae el código DEMRE, se usa y se exige que pertenezca a
 *      esa universidad.
 *   2. Si no, por nombre normalizado (sin tildes, sin notas "(*)", sin
 *      palabras vacías) dentro de la universidad; si la fuente indica sede o
 *      campus, se filtra por sede. Si el nombre se repite en varias sedes y la
 *      fuente agrupa por tablas, la sede de la tabla se deduce por consenso de
 *      las demás filas de esa tabla (UTalca).
 *   3. Coincidencias aproximadas (un nombre contenido en el otro) se aceptan
 *      sólo si son únicas y quedan listadas en el reporte para revisión.
 *   4. ALIAS: equivalencias revisadas a mano (nombre en la fuente -> código).
 *
 * VALIDACIÓN (la fila que falla se descarta, nunca se corrige a mano)
 *   - Puntaje numérico entre 100 y 1000.
 *   - No menor que el puntaje ponderado mínimo de postulación de la carrera
 *     (nadie puede quedar seleccionado bajo ese mínimo).
 *   - Un código con dos valores distintos -> se descarta.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src/data/cortes-2026.json');
const REPORT = path.join(__dirname, 'fetch-cortes-report.txt');
const CACHE = path.join(os.tmpdir(), 'lael-cortes-cache');
const USE_CACHE = process.argv.includes('--cache');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/carreras-2026.json'), 'utf8'));

// ── utilidades ──────────────────────────────────────────────────────────────
const NAMED = { nbsp: ' ', amp: '&', quot: '"', lt: '<', gt: '>', ndash: '-', mdash: '-', sup1: '', sup2: '', sup3: '', ordm: 'º', ordf: 'ª' };
const MARK = { acute: '́', tilde: '̃', uml: '̈', grave: '̀' };
const decode = (s) =>
  s
    .replace(/&([a-zA-Z])(acute|tilde|uml|grave);/g, (m, l, k) => (l + MARK[k]).normalize('NFC'))
    .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z0-9]+);/gi, (m, n) => NAMED[n] ?? ' ');
const clean = (s) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Filas de todas las tablas HTML, como arreglos de texto. Tiempo lineal. */
function htmlRows(html) {
  const rows = [];
  for (const part of html.split(/(?=<tr[\s>])/i).slice(1)) {
    const tr = part.split(/<\/tr>/i)[0];
    const cells = tr
      .split(/(?=<t[dh][\s>])/i)
      .slice(1)
      .map((c) => clean(c.replace(/^<t[dh][^>]*>/i, '').split(/<\/t[dh]>/i)[0]));
    if (cells.length) rows.push(cells);
  }
  return rows;
}

const num = (s) => {
  const m = String(s || '').replace(/\./g, '').match(/^\s*(\d{3,4})(?:,(\d+))?\s*(?:puntos.*)?$/i);
  if (!m) return null;
  const v = parseFloat(m[1] + (m[2] ? '.' + m[2] : ''));
  return v >= 100 && v <= 1000 ? v : null;
};

const STOP = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'en', 'y', 'e', 'o', 'con', 'a', 'mencion', 'menciones', 'para', 'plan', 'comun']);
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function nameKey(s) {
  const t = fold(s)
    .replace(/\((\*+|\d+)\)/g, ' ')
    .replace(/[*¹²³]/g, ' ')
    .replace(/[^a-z0-9ñ ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));
  return [...new Set(t)].sort();
}

async function get(url, name) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, name + '.html');
  if (USE_CACHE && fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'es-CL,es' } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  const text = await res.text();
  fs.writeFileSync(file, text);
  return text;
}

/** Filas bajo el encabezado cuya celda calza con `colRe`; toma código y nombre. */
function byHeader(rows, colRe, { codeCol = null, nameCol, stopRe = null }) {
  const out = [];
  let col = -1;
  for (const r of rows) {
    const idx = r.findIndex((c) => colRe.test(c));
    if (idx >= 0) { col = idx; continue; }
    if (col < 0) continue;
    if (stopRe && r.some((c) => stopRe.test(c))) { col = -1; continue; }
    if (r.length <= col) continue;
    const code = codeCol != null && /^\d{5}$/.test(r[codeCol]) ? +r[codeCol] : null;
    out.push({ code, name: r[nameCol], raw: r[col] });
  }
  return out;
}

// ── fuentes oficiales ──────────────────────────────────────────────────────
// ALIAS: nombre tal como aparece en la fuente -> código DEMRE (revisado a mano)
const SOURCES = [
  {
    key: 'uchile',
    u: 'UNIVERSIDAD DE CHILE',
    t: 's',
    url: 'https://uchile.cl/admision-y-matriculas/admision-regular-pregrado/puntajes-de-ingreso',
    parse: (h) => byHeader(htmlRows(h), /^ÚLTIMO\/A SELECCIONADO\/A$/i, { codeCol: 0, nameCol: 1 }),
  },
  {
    key: 'uc',
    u: 'PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE',
    t: 'm',
    url: 'https://admision.uc.cl/recursos/puntajes-de-ultimos-matriculados-admisiones-anteriores/',
    // Tabla: Carrera | Admisión 2026 (vacantes, último matriculado) | 2025 | ...
    parse: (h) => {
      const rows = htmlRows(h);
      const hi = rows.findIndex((r) => r[0] === 'Admisión 2026');
      if (hi < 0 || !/último matriculado/i.test(rows[hi + 1][2])) throw new Error('UC: cambió el formato de la tabla');
      return rows.slice(hi + 2).filter((r) => r.length >= 3).map((r) => ({ name: r[0], raw: r[2] }));
    },
  },
  {
    key: 'ucsc',
    u: 'UNIVERSIDAD CATÓLICA DE LA SANTÍSIMA CONCEPCIÓN',
    t: 's',
    url: 'https://admision.ucsc.cl/puntajes-de-seleccion/',
    parse: (h) => byHeader(htmlRows(h), /último seleccionado/i, { codeCol: 0, nameCol: 1 }),
  },
  {
    key: 'pucv',
    u: 'PONTIFICIA UNIVERSIDAD CATÓLICA DE VALPARAÍSO',
    t: 'm',
    url: 'https://estudiantespucv.cl/dpd/puntajes-de-matriculas/',
    // Encabezado en dos filas: años (2023..2026) y "Mín. PPOND" (mínimo ponderado
    // de los matriculados = último matriculado). Código de la tabla es interno.
    parse: (h) => {
      const rows = htmlRows(h);
      const yi = rows.findIndex((r) => r.includes('2026') && r.includes('2025'));
      if (yi < 0 || !/Mín\. PPOND/i.test(rows[yi + 1].join(' '))) throw new Error('PUCV: cambió el formato');
      const col = rows[yi].indexOf('2026');
      const out = [];
      for (const r of rows.slice(yi + 2)) {
        if (r.length !== rows[yi].length || !r[1]) break;
        out.push({ name: r[1], raw: r[col] });
      }
      return out;
    },
    alias: {
      'ADMINISTRACION PUBLICA (DIURNA)': 14201,
      'OCEANOGRAFIA O BIOLOGIA MARINA(PLAN COMUN)': 14080,
      'INTERPRETACIÓN-TRADUCCIÓN INGLÉS ESPAÑOL': 14038,
      'LICENCIATURA EN FÍSICA': 14090,
      'DISEÑO': 14003,
      'PEDAGOGIA EN EDUCACION BASICA': 14033,
      'PEDAGOGIA EN EDUCACION ESPECIAL': 14032,
    },
  },
  {
    key: 'utalca',
    u: 'UNIVERSIDAD DE TALCA',
    t: 's',
    url: 'https://admision.utalca.cl/ponderaciones-vacantes-puntajes/',
    // Varias tablas (una por campus) sin nombre de campus: se deduce por consenso.
    parse: (h) => {
      const out = [];
      let group = 0, col = -1;
      for (const r of htmlRows(h)) {
        const idx = r.findIndex((c) => /^ÚLTIMO SEL\. PAES 2026$/i.test(c));
        if (idx >= 0) { col = idx; group++; continue; }
        if (col < 0 || r.length <= col) continue;
        out.push({ name: r[0], raw: r[col], group });
      }
      return out;
    },
  },
  {
    key: 'uai',
    u: 'UNIVERSIDAD ADOLFO IBÁÑEZ',
    t: 'c',
    url: 'https://www.uai.cl/admision/ponderaciones-y-puntajes/puntajes',
    // Página Next.js: la tabla viene en el payload RSC. Una pestaña por campus;
    // columna "Puntaje Ponderado de Corte (1)".
    parse: (h) => {
      const re = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g;
      const rsc = [...h.matchAll(re)].map((m) => JSON.parse(m[1])).join('');
      const lines = {};
      for (const l of rsc.split('\n')) { const m = l.match(/^([0-9a-f]+):(.*)$/); if (m) lines[m[1]] = m[2]; }
      const panelsLine = Object.values(lines).find((l) => l.includes('"panels":') && l.includes('CAMPUS'));
      const headLines = Object.values(lines).filter((l) => l.includes('"headings":'));
      if (!panelsLine || !headLines.length) throw new Error('UAI: cambió el formato');
      const out = [];
      const panels = JSON.parse(panelsLine)[3].panels;
      for (const p of panels) {
        const ref = JSON.stringify(p.content).match(/"\$L([0-9a-f]+)"/g).map((s) => s.slice(3, -1)).find((id) => lines[id] && lines[id].includes('"rows"'));
        const head = headLines.map((l) => JSON.parse(l)[3]).find((o) => o.title === p.name);
        const col = head.headings.findIndex((x) => /Puntaje Ponderado de Corte/i.test(x));
        if (col < 0) throw new Error('UAI: sin columna de corte');
        const sede = /VIÑA/i.test(p.name) ? 'Viña del Mar' : /SANTIAGO|PEÑALOL/i.test(p.name) ? 'Santiago' : null;
        for (const row of JSON.parse(lines[ref])[3].rows) {
          const cells = row.map((c) => clean(c.text || ''));
          out.push({ name: cells[0], raw: cells[col], sede });
        }
      }
      return out;
    },
    alias: {
      'Santiago|Ingeniería Civil (plan común) (2) (3)': 42002,
      'Viña del Mar|Ingeniería Civil (plan común) (2)': 42022,
      'Viña del Mar|Ingeniería Civil (plan común)': 42022,
      'Viña del Mar|Ingeniería Civil (plan común) (2) (3)': 42022,
    },
  },
  {
    key: 'uandes',
    u: 'UNIVERSIDAD DE LOS ANDES',
    t: 'c',
    url: 'https://admision.uandes.cl/puntajes-de-corte',
    parse: (h) => byHeader(htmlRows(h), /^Puntaje de corte 2026$/i, { nameCol: 0 }),
  },
];

// ── asociación y validación ────────────────────────────────────────────────
function matchRows(src, rows, log) {
  const uni = data.universidades.find((u) => u.u === src.u);
  if (!uni) throw new Error('Universidad no encontrada en carreras-2026.json: ' + src.u);
  const byId = new Map(uni.c.map((c) => [c.id, c]));
  // Clave de la carrera DEMRE sin las palabras de su propia sede
  // ("Ingeniería Civil Plan Común Talca" -> "civil ingenieria").
  const ckey = new Map(uni.c.map((c) => {
    const sedeWords = new Set(nameKey(c.s));
    return [c.id, nameKey(c.n).filter((w) => !sedeWords.has(w))];
  }));
  const sameSede = (c, hint) => fold(hint).includes(fold(c.s)) || fold(c.s).includes(fold(hint));

  // Devuelve { list, how } con los candidatos para un nombre de la fuente.
  const find = (name, sede) => {
    let pool = uni.c;
    let n = name;
    const paren = name.match(/\(([^)]*)\)\s*$/);
    let hint = sede;
    if (!hint && paren && uni.c.some((c) => sameSede(c, paren[1]))) hint = paren[1];
    if (paren && hint === paren[1]) n = name.replace(/\([^)]*\)\s*$/, '');
    if (hint) pool = pool.filter((c) => sameSede(c, hint));
    const ks = nameKey(n);
    const k = ks.join(' ');
    const exact = pool.filter((c) => ckey.get(c.id).join(' ') === k);
    if (exact.length) return { list: exact, how: 'nombre' };
    // El nombre DEMRE contiene todas las palabras de la fuente (más largo)
    const sup = pool.filter((c) => ks.every((w) => ckey.get(c.id).includes(w)));
    // o al revés. Nunca se cruza carrera con "bachillerato" de la misma carrera.
    const sub = pool.filter((c) => ckey.get(c.id).every((w) => ks.includes(w)));
    const safe = (l) => l.filter((c) => ckey.get(c.id).includes('bachillerato') === ks.includes('bachillerato'));
    if (safe(sup).length === 1) return { list: safe(sup), how: 'aprox' };
    if (!sup.length && safe(sub).length === 1) return { list: safe(sub), how: 'aprox' };
    return { list: safe([...new Set([...sup, ...sub])]), how: 'aprox' };
  };

  // Tablas sin nombre de campus (group): la sede de cada tabla es la que más
  // se repite entre sus filas con match único.
  const groupSede = {};
  for (const r of rows.filter((x) => x.group != null)) {
    const { list } = find(r.name);
    if (list.length !== 1) continue;
    const g = (groupSede[r.group] ||= {});
    g[list[0].s] = (g[list[0].s] || 0) + 1;
  }
  const sedeOf = (g) => {
    const e = Object.entries(groupSede[g] || {}).sort((a, b) => b[1] - a[1]);
    return e.length && (e.length === 1 || e[0][1] > e[1][1]) ? e[0][0] : null;
  };

  const results = [];
  for (const r of rows) {
    const value = num(r.raw);
    const gs = r.group != null ? sedeOf(r.group) : null;
    const label = `${r.sede ? r.sede + ' | ' : ''}${gs ? '[tabla ' + gs + '] ' : ''}${r.name}`;
    if (value == null) {
      log.push(r.raw && r.raw !== '-' ? `  sin puntaje válido: ${label} -> "${r.raw}"` : `  sin puntaje publicado: ${label}`);
      continue;
    }
    const aliasKey = r.sede ? `${r.sede}|${r.name}` : r.name;
    if (src.alias && src.alias[aliasKey]) {
      results.push({ id: src.alias[aliasKey], value, how: 'alias', label });
      continue;
    }
    if (r.code) {
      if (!byId.has(r.code)) log.push(`  código ${r.code} no es de ${src.u}: ${label}`);
      else results.push({ id: r.code, value, how: 'código', label });
      continue;
    }
    const { list, how } = find(r.name, r.sede || gs);
    if (list.length === 1) results.push({ id: list[0].id, value, how: gs ? how + ' + sede de la tabla' : how, label });
    else log.push(`  ${list.length ? 'ambiguo' : 'sin match'}: ${label}${list.length ? ' -> ' + list.map((c) => c.id + ' ' + c.n + ' (' + c.s + ')').join(', ') : ''}`);
  }

  // Validación
  const ok = [];
  const seen = new Map();
  const dup = new Set();
  for (const x of results) {
    const c = byId.get(x.id);
    if (!c) { log.push(`  alias a código inexistente ${x.id}: ${x.label}`); continue; }
    if (c.min != null && x.value < c.min) { log.push(`  DESCARTADO ${x.id} ${c.n}: ${x.value} < mínimo ponderado ${c.min}`); continue; }
    if (seen.has(x.id)) { log.push(`  DESCARTADO ${x.id} ${c.n}: dos filas de la fuente apuntan a la misma carrera ("${seen.get(x.id)}" y "${x.label}")`); dup.add(x.id); continue; }
    seen.set(x.id, x.label);
    ok.push({ ...x, c });
  }
  return ok.filter((x) => !dup.has(x.id));
}

(async () => {
  const out = {};
  const conflicts = new Set();
  const lines = [];
  const perUni = [];
  for (const src of SOURCES) {
    const log = [];
    let matched = [];
    try {
      const html = await get(src.url, src.key);
      const rows = src.parse(html);
      matched = matchRows(src, rows, log);
      log.unshift(`  filas leídas: ${rows.length}`);
    } catch (e) {
      log.push('  ERROR: ' + e.message);
    }
    for (const m of matched) {
      if (out[m.id] && out[m.id][0] !== m.value) conflicts.add(m.id);
      out[m.id] = [m.value, src.t];
    }
    const uni = data.universidades.find((u) => u.u === src.u);
    perUni.push({ src, n: new Set(matched.map((m) => m.id)).size, total: uni ? uni.c.length : 0 });
    lines.push(`\n## ${src.u}  [tipo ${src.t}]  ${src.url}`);
    lines.push(...log);
    const approx = matched.filter((m) => m.how !== 'código' && m.how !== 'nombre');
    if (approx.length) {
      lines.push('  revisar (aproximados / alias / sede deducida):');
      for (const m of approx) lines.push(`    [${m.how}] "${m.label}" -> ${m.id} ${m.c.n} (${m.c.s}) = ${m.value}`);
    }
  }
  for (const id of conflicts) delete out[id];

  const total = data.universidades.reduce((a, u) => a + u.c.length, 0);
  const sorted = Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
  const json = {
    proceso: 2026,
    generado: new Date().toISOString().slice(0, 10),
    tipos: { s: 'Último seleccionado', m: 'Último matriculado', c: 'Puntaje de corte' },
    fuentes: Object.fromEntries(SOURCES.map((s) => [s.u, s.url])),
    d: sorted,
  };
  fs.writeFileSync(OUT, JSON.stringify(json));

  const head = [
    'fetch-cortes.cjs — reporte ' + json.generado,
    `Carreras con puntaje de corte: ${Object.keys(sorted).length} de ${total} (${((Object.keys(sorted).length / total) * 100).toFixed(1)}%)`,
    `Universidades con fuente oficial: ${perUni.filter((p) => p.n).length} de ${data.universidades.length}`,
    conflicts.size ? `Códigos descartados por valores en conflicto: ${[...conflicts].join(', ')}` : 'Sin conflictos de valores.',
    '',
    ...perUni.map((p) => `  ${String(p.n).padStart(3)} / ${String(p.total).padStart(3)}  ${p.src.u}`),
    '',
    'Universidades sin fuente oficial abierta encontrada (no se muestra corte):',
    ...data.universidades.filter((u) => !SOURCES.some((s) => s.u === u.u)).map((u) => '  - ' + u.u),
  ];
  fs.writeFileSync(REPORT, head.concat(lines).join('\n') + '\n');
  console.log(head.slice(0, 4).join('\n'));
  console.log('Reporte: ' + path.relative(ROOT, REPORT));
})();
