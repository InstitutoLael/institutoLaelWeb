#!/usr/bin/env node
/*
 * parse-demre.cjs
 * ----------------------------------------------------------------------------
 * Parser de la publicación oficial DEMRE "Oferta Definitiva de Carreras,
 * Vacantes y Ponderaciones - Proceso de Admisión 2026" (PDF, 47 universidades).
 *
 * USO
 *   node scripts/parse-demre.cjs <oferta2026.pdf>
 *
 * Requiere pdftotext de POPPLER (no el de xpdf) porque usa `-bbox` (coordenadas
 * de cada palabra) y `-raw`. Si el pdftotext del PATH no es poppler, indicar la
 * ruta con la variable de entorno PDFTOTEXT=/ruta/a/poppler/pdftotext.exe
 *
 * SALIDAS
 *   src/data/carreras-2026.json      dataset compacto para la calculadora
 *   scripts/parse-demre-report.txt   totales, filas descartadas y spot-check
 *
 * CÓMO FUNCIONA
 *   1. Índice (pág. 2, texto -raw): nombre de cada universidad y su página de
 *      inicio. Cada página de tabla se asigna a la universidad cuyo rango la
 *      contiene.
 *   2. Por cada página, con las coordenadas de palabras (-bbox):
 *      - Encabezados de columna: texto ROTADO (vertical) sobre la primera fila.
 *        Se agrupan por posición x y se clasifican por su texto (NEM, RANKING,
 *        LECTORA, M1, HISTORIA, CIENCIAS, M2, PRUEBA ESPECIAL, ASIGNACIÓN
 *        ESPECIAL DE PEDAGOGÍA, PONDERADO MÍNIMO, PROMEDIO C.LECT+M1, REGULAR /
 *        1º SEMESTRE, 2º SEMESTRE, +MC, BEA, PACE). Así cada universidad usa su
 *        propio orden/juego de columnas, sin suponer un formato fijo.
 *      - Filas: cada código de 5 dígitos en la columna COD. Los valores de la
 *        fila son los tokens a la misma altura (centro y). Cada token va a la
 *        columna de encabezado más cercana (tolerancia 11 pt).
 *      - Nombre de carrera: palabras de la columna "CARRERA" entre la fila
 *        anterior y la siguiente (soporta nombres en 2-3 líneas). Sede: igual,
 *        en la columna "LUGAR EN QUE SE IMPARTE".
 *   3. "10 o 10" entre Historia y Ciencias: el alumno usa UNA de las dos
 *      pruebas con ese peso -> se guarda en `hc` con `hcChoice: true`.
 *
 * VALIDACIÓN (una fila que falla se DESCARTA, nunca se corrige a mano):
 *   - Todas las celdas de ponderación deben ser número entero o "---".
 *   - No puede haber tokens sin columna ni dos tokens en la misma columna.
 *   - Suma de ponderaciones = 100 exacto (hc cuenta una vez).
 *   - "o" entre Historia y Ciencias exige ambos pesos presentes e iguales.
 *     Excepción literal: "--- o 10" (una de las dos impresa como "---") se lee
 *     como que sólo esa otra prueba pondera (his o cie), y debe sumar 100.
 *   - Prueba especial impresa como "APROBADA"/"SI" (requisito aprobado, sin
 *     peso): esp = 0 y se agrega `espReq: true` a la carrera.
 *   - Historia y Ciencias con peso pero SIN "o": se descarta (no se adivina si
 *     es "una u otra" o "ambas").
 *   - Columna "Asignación Especial de Pedagogía": "SI"/"---" es sólo una marca
 *     (no pondera). Cualquier otro valor -> se descarta.
 *
 * FORMATO DEL JSON (claves cortas para que pese poco)
 *   {
 *     proceso: 2026, fuente: "...", generado: "YYYY-MM-DD",
 *     claves: { ...descripción de cada clave... },
 *     universidades: [ { u: "NOMBRE UNIVERSIDAD", c: [ carrera, ... ] } ]
 *   }
 *   carrera = {
 *     id: 11045,              código DEMRE de la carrera
 *     n: "Medicina",          nombre (tipo título, sin llamadas a notas "(3)")
 *     s: "Santiago",          sede / lugar en que se imparte
 *     w: {                    ponderaciones en %, suman 100.
 *                             SE OMITEN LAS CLAVES CON PESO 0 (siempre).
 *       nem, rank, cl, m1, m2,
 *       his,                  sólo Historia (obligatoria)
 *       cie,                  sólo Ciencias (obligatoria)
 *       hc,                   Historia O Ciencias (el alumno elige), con
 *       hcChoice: true        (hcChoice sólo aparece cuando es true)
 *       esp                   prueba especial de la carrera
 *     },
 *     min: 485,               puntaje ponderado mínimo de postulación (o null)
 *     minClM1: 458,           promedio mínimo C.Lectora + M1 (o null)
 *     vac: 82,                vacantes regulares (1er semestre) (o null)
 *     espReq: true            (opcional) exige prueba especial aprobada sin peso
 *   }
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT_JSON = path.join(ROOT, 'src', 'data', 'carreras-2026.json');
const OUT_REPORT = path.join(__dirname, 'parse-demre-report.txt');
const FUENTE = 'DEMRE, Oferta Definitiva de Carreras, Vacantes y Ponderaciones, Proceso de Admisión 2026';

const pdf = process.argv[2];
if (!pdf || !fs.existsSync(pdf)) {
  console.error('Uso: node scripts/parse-demre.cjs <oferta2026.pdf>');
  process.exit(1);
}
const PDFTOTEXT = process.env.PDFTOTEXT || 'pdftotext';

function run(args) {
  return execFileSync(PDFTOTEXT, args, { maxBuffer: 1 << 30, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

// ---------------------------------------------------------------- índice
const tocText = run(['-f', '2', '-l', '2', '-raw', '-enc', 'UTF-8', pdf, '-']);
const toc = [];
for (const line of tocText.split(/\r?\n/)) {
  const m = line.trim().match(/^(\d{1,2}) (.+?) (\d{1,3})$/);
  if (m) toc.push({ idx: +m[1], name: m[2].replace(/’/g, "'").trim(), start: +m[3] });
}
if (toc.length !== 47) {
  console.error(`Índice: se esperaban 47 universidades, se encontraron ${toc.length}`);
  process.exit(1);
}
toc.sort((a, b) => a.start - b.start);
function uniForPage(n) {
  let u = null;
  for (const t of toc) if (t.start <= n) u = t;
  return u;
}

// ---------------------------------------------------------------- palabras
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const bbox = run(['-bbox', '-enc', 'UTF-8', pdf, '-']);
const pages = bbox.split(/<page /).slice(1).map((p, i) => {
  const words = [];
  const re = /<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/g;
  let m;
  while ((m = re.exec(p))) {
    const w = { x0: +m[1], y0: +m[2], x1: +m[3], y1: +m[4], t: decode(m[5]) };
    w.xc = (w.x0 + w.x1) / 2; w.yc = (w.y0 + w.y1) / 2;
    words.push(w);
  }
  // Texto rotado (encabezados verticales): palabra con letras, >=3 caracteres y
  // más alta que ancha; las palabras cortas ("Y", "DE", "1", "1)") se marcan
  // rotadas si comparten exactamente x0/x1 con una palabra rotada larga.
  for (const w of words) w.rot = /[A-Za-zÁÉÍÓÚÑ]/.test(w.t) && w.t.length >= 3 && (w.y1 - w.y0) > (w.x1 - w.x0) * 1.1;
  // "+ MC" (vacantes +Mujeres en Ciencia; en UMAG impreso "+ MG"): palabras cortas apiladas en la misma x
  for (const w of words) if (/^(\+|M[CG]|\+M[CG])$/.test(w.t) && (w.t.length === 3 || words.some((o) => o !== w && /^(\+|M[CG])$/.test(o.t) && Math.abs(o.x0 - w.x0) < 0.05))) w.rot = true;
  for (const w of words) if (!w.rot && w.t.length < 3) w.rot = words.some((o) => o.rot && Math.abs(o.x0 - w.x0) < 0.05 && Math.abs(o.x1 - w.x1) < 0.05);
  return { n: i + 1, words };
});

// ---------------------------------------------------------------- utilidades
const SMALL = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'en', 'y', 'e', 'o', 'u', 'a', 'al', 'con', 'para', 'por', 'sin', 'mención', 'menciones', 'su', 'sus']);
const KEEP_UP = new Set(['PACE', 'TI', 'TIC', 'TICS', 'II', 'III', 'IV', 'PE', 'CFT', 'IP', 'UC', 'USM', 'EIB', 'STEM', 'ESO', 'MBA', 'RRHH', 'RR.HH.', 'TV', 'IA', 'BIM']);
function titleCase(s) {
  let first = true;
  return s.split(/(\s+|-|\/|\(|\))/).map((tok) => {
    if (tok === '(') first = true;
    if (!tok || /^(\s+|-|\/|\(|\))$/.test(tok)) return tok;
    const bare = tok.replace(/[.,:;]+$/, '');
    let out;
    if (KEEP_UP.has(bare)) out = tok;
    else {
      const low = tok.toLocaleLowerCase('es');
      if (!first && SMALL.has(low.replace(/[.,:;]+$/, ''))) out = low;
      else out = low.charAt(0).toLocaleUpperCase('es') + low.slice(1);
    }
    first = false;
    return out;
  }).join('');
}
function cleanName(s) {
  return s
    .replace(/\(\s*(\d+|PE|P\d+|\*+)\s*\)/g, ' ')   // llamadas a notas: (3) (PE) (P1) (*)
    .replace(/\(\d+(?=\s|$)/g, ' ')                   // "(10" sin cerrar (errata del PDF)
    .replace(/\*+/g, ' ')
    .replace(/\(\s*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.:;])/g, '$1')
    .trim();
}

// ---------------------------------------------------------------- encabezados
function classify(text) {
  const t = text.toUpperCase();
  if (/PROMEDIO/.test(t)) return 'minClM1';
  if (/PONDERADO/.test(t)) return 'min';
  if (/ASIGNACI/.test(t)) return 'aep';
  if (/ESPECIAL/.test(t)) return 'esp';
  if (/HISTORIA/.test(t)) return 'his';
  if (/LECTORA/.test(t)) return 'cl';
  if (/\(M2\)|MATEM[AÁ]TICA 2/.test(t)) return 'm2';
  if (/\(M1\)|MATEM[AÁ]TICA 1/.test(t)) return 'm1';
  if (/^CIENCIAS$/.test(t.trim())) return 'cie';
  if (/^NEM$/.test(t.trim())) return 'nem';
  if (/RANKING/.test(t)) return 'rank';
  if (/2º|2°/.test(t)) return 'vac2';
  if (/1º|1°/.test(t)) return 'vac';
  if (/^REGULAR$/.test(t.trim())) return 'vac';
  if (/^SEMESTRE$/.test(t.trim())) return 'sem';
  if (/^\+? ?M[CG]$/.test(t.trim())) return 'mc';
  if (/^BEA$/.test(t.trim())) return 'bea';
  if (/^PACE$/.test(t.trim())) return 'pace';
  return null;
}
const WEIGHT_KEYS = ['nem', 'rank', 'cl', 'm1', 'his', 'cie', 'm2', 'esp', 'esp2'];

function headerColumns(pg, firstCodeY) {
  let rot = pg.words.filter((w) => w.rot && w.y1 < firstCodeY - 2 && w.y0 > 100 && w.x0 > 300 && w.x1 < 760);
  // "REGULAR" rotado sobre las sub-columnas 1º/2º semestre: se ignora
  if (rot.some((w) => /SEMESTRE/.test(w.t))) rot = rot.filter((w) => w.t !== 'REGULAR');
  rot.sort((a, b) => a.x0 - b.x0);
  const clusters = [];
  for (const w of rot) {
    const c = clusters[clusters.length - 1];
    if (c && w.x0 - c.lastX0 <= 12) { c.words.push(w); c.lastX0 = w.x0; c.x1 = Math.max(c.x1, w.x1); }
    else clusters.push({ words: [w], x0: w.x0, x1: w.x1, lastX0: w.x0 });
  }
  const cols = [];
  const unknown = [];
  for (const c of clusters) {
    // texto rotado 90° (se lee de abajo hacia arriba): orden por x y luego y descendente
    const text = c.words.slice().sort((a, b) => (a.x0 - b.x0) || (b.y1 - a.y1)).map((w) => w.t).join(' ');
    let key = classify(text);
    if (key === 'esp' && cols.some((k) => k.key === 'esp')) key = 'esp2';
    if (key === 'sem') key = cols.some((k) => k.key === 'vac') ? 'vac2' : 'vac';
    const col = { key, text, x0: c.x0, x1: c.x1, xc: (c.x0 + c.x1) / 2 };
    if (key) cols.push(col); else unknown.push(col);
  }
  return { cols, unknown };
}

// ---------------------------------------------------------------- parseo
const kept = new Map(); // uni -> []
const discarded = [];
const warnings = [];
const seenIds = new Set();
const uniStats = new Map();
for (const t of toc) { kept.set(t.name, []); uniStats.set(t.name, { rows: 0, kept: 0, disc: 0, prefixes: new Map() }); }

for (const pg of pages) {
  const codes = pg.words.filter((w) => /^\d{5}$/.test(w.t) && w.x0 < 90 && w.x0 > 55 && !w.rot).sort((a, b) => a.yc - b.yc);
  if (!codes.length) continue;
  const { cols, unknown } = headerColumns(pg, codes[0].y0);
  const need = ['nem', 'rank', 'cl', 'm1'];
  if (!need.every((k) => cols.some((c) => c.key === k))) {
    warnings.push(`Página ${pg.n}: ${codes.length} códigos pero sin encabezado de ponderaciones reconocible (tabla distinta, se ignora)`);
    continue;
  }
  for (const u of unknown) warnings.push(`Página ${pg.n}: columna no reconocida "${u.text}" x=${u.x0.toFixed(0)}`);
  const uni = uniForPage(pg.n);
  const st = uniStats.get(uni.name);

  const colX0 = Math.min(...cols.map((c) => c.x0)) - 8; // borde izq. zona numérica
  const colX1 = Math.max(...cols.map((c) => c.x1)) + 12; // borde der.
  const nemCol = cols.find((c) => c.key === 'nem');
  const rankCol = cols.find((c) => c.key === 'rank');
  // columna sede: centro del encabezado "LUGAR EN QUE SE IMPARTE"
  const hdrY = codes[0].y0;
  const lugar = pg.words.filter((w) => !w.rot && w.y1 < hdrY && w.y0 > 100 && /^(LUGAR|IMPARTE|SEDE)$/.test(w.t));
  let sedeLeft;
  if (lugar.length) {
    const sc = (Math.min(...lugar.map((w) => w.x0)) + Math.max(...lugar.map((w) => w.x1))) / 2;
    const rightEdge = nemCol.xc - (rankCol.xc - nemCol.xc) / 2;
    sedeLeft = 2 * sc - rightEdge + 1;
  } else {
    warnings.push(`Página ${pg.n}: sin encabezado LUGAR; sede por separación`);
    sedeLeft = null;
  }

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const prev = codes[i - 1], next = codes[i + 1];
    const yTop = prev ? (prev.yc + code.yc) / 2 : code.yc - 16;
    const yBot = next ? (next.yc + code.yc) / 2 : code.yc + 16;
    const rowWords = pg.words.filter((w) => w !== code && !w.rot && w.yc > yTop && w.yc <= yBot && w.x0 > code.x1);
    const nums = rowWords.filter((w) => w.x0 >= colX0 && w.x1 <= colX1 && Math.abs(w.yc - code.yc) < 5).sort((a, b) => a.x0 - b.x0);
    const textWords = rowWords.filter((w) => w.x1 < colX0 + 4);
    let nameW, sedeW;
    if (sedeLeft != null) {
      nameW = textWords.filter((w) => w.xc < sedeLeft);
      sedeW = textWords.filter((w) => w.xc >= sedeLeft);
    } else { nameW = textWords; sedeW = []; }
    const joinLines = (ws) => ws.slice().sort((a, b) => (Math.abs(a.yc - b.yc) > 3 ? a.yc - b.yc : a.x0 - b.x0)).map((w) => w.t).join(' ');
    const rawName = joinLines(nameW);
    const rawSede = joinLines(sedeW);
    const raw = `pág ${pg.n} | ${code.t} | ${rawName} | ${rawSede} | ${nums.map((w) => w.t).join(' ')}`;
    st.rows++;
    const pre = code.t.slice(0, 2);
    st.prefixes.set(pre, (st.prefixes.get(pre) || 0) + 1);

    const reasons = [];
    const cell = {};
    let orFlag = false;
    const hisCol = cols.find((c) => c.key === 'his');
    const cieCol = cols.find((c) => c.key === 'cie');
    for (const w of nums) {
      // separador "o" entre Historia y Ciencias
      if (/^[oOóÓ0]$/.test(w.t) && hisCol && cieCol && w.xc > hisCol.x1 - 2 && w.xc < cieCol.x0 + 2) { orFlag = true; continue; }
      let best = null, bd = 1e9;
      for (const c of cols) { const d = Math.abs(c.xc - w.xc); if (d < bd) { bd = d; best = c; } }
      if (!best || bd > 11) { reasons.push(`token "${w.t}" sin columna (x=${w.xc.toFixed(0)})`); continue; }
      if (bd > 6) warnings.push(`Página ${pg.n} código ${code.t}: "${w.t}" asignado a ${best.key} a ${bd.toFixed(1)} pt del centro del encabezado (revisar)`);
      if (cell[best.key] !== undefined) { reasons.push(`dos valores en columna ${best.key}: "${cell[best.key]}" y "${w.t}"`); continue; }
      cell[best.key] = w.t;
    }
    const val = (k) => {
      const v = cell[k];
      if (v === undefined) return undefined;
      if (/^-{2,4}$|^—$|^–$/.test(v)) return 0;
      if (/^\d{1,3}$/.test(v)) return +v;
      return NaN;
    };
    const w = {};
    let espReq = false;
    for (const c of cols) {
      if (c.key === 'aep') {
        // Asignación Especial de Pedagogía: "SI"/"---" es sólo una marca, no un peso
        const v = cell.aep;
        if (v === undefined) reasons.push('celda vacía en aep');
        else if (!/^(SI|SÍ|NO|-{2,4})$/.test(v)) reasons.push(`Asignación Especial de Pedagogía con valor "${v}"`);
        continue;
      }
      if (!WEIGHT_KEYS.includes(c.key)) continue;
      if ((c.key === 'esp' || c.key === 'esp2') && /^(APROBADA|APROBADO|SI|SÍ)$/.test(cell[c.key] || '')) { espReq = true; w[c.key] = 0; continue; }
      const v = val(c.key);
      if (v === undefined) { reasons.push(`celda vacía en ${c.key}`); continue; }
      if (Number.isNaN(v)) { reasons.push(`valor no numérico en ${c.key}: "${cell[c.key]}"`); continue; }
      w[c.key] = v;
    }
    if (!rawName) reasons.push('sin nombre de carrera');
    if (seenIds.has(code.t)) reasons.push('código repetido');

    let weights = null;
    if (!reasons.length) {
      const esp = (w.esp || 0) + (w.esp2 || 0);
      if (w.esp && w.esp2) reasons.push('dos pruebas especiales con peso');
      const out = { nem: w.nem || 0, rank: w.rank || 0, cl: w.cl || 0, m1: w.m1 || 0, m2: w.m2 || 0, his: 0, cie: 0, hc: 0, hcChoice: false, esp };
      const H = w.his || 0, C = w.cie || 0;
      if (orFlag) {
        if (H && C && H === C) { out.hc = H; out.hcChoice = true; }
        // "--- o 10": una de las dos pruebas impresa como "---" -> sólo cuenta la otra
        else if (cell.his && cell.cie && (H === 0) !== (C === 0) && /^-+$/.test(H === 0 ? cell.his : cell.cie)) { out.his = H; out.cie = C; }
        else reasons.push(`"o" entre Historia (${H}) y Ciencias (${C}) con pesos distintos o faltantes`);
      } else if (H && C) {
        reasons.push(`Historia (${H}) y Ciencias (${C}) con peso pero sin "o": ambiguo`);
      } else { out.his = H; out.cie = C; }
      const sum = out.nem + out.rank + out.cl + out.m1 + out.m2 + out.his + out.cie + out.hc + out.esp;
      if (!reasons.length && sum !== 100) reasons.push(`suma de ponderaciones = ${sum}`);
      weights = out;
    }
    const intOrNull = (k) => { const v = cell[k]; return v && /^\d+$/.test(v) ? +v : null; };
    if (reasons.length) {
      discarded.push({ uni: uni.name, raw, reasons });
      st.disc++;
      continue;
    }
    seenIds.add(code.t);
    const compactW = {};
    for (const k of ['nem', 'rank', 'cl', 'm1', 'm2', 'his', 'cie', 'hc', 'esp']) if (weights[k]) compactW[k] = weights[k];
    if (weights.hcChoice) compactW.hcChoice = true;
    kept.get(uni.name).push({
      id: +code.t,
      n: titleCase(cleanName(rawName)),
      s: titleCase(cleanName(rawSede)) || null,
      w: compactW,
      min: intOrNull('min'),
      minClM1: intOrNull('minClM1'),
      vac: intOrNull('vac'),
      ...(espReq ? { espReq: true } : {}),
      _raw: raw,
      _full: weights,
    });
    st.kept++;
  }
}

// ---------------------------------------------------------------- spot-check
// Valores transcritos A MANO desde el PDF (páginas renderizadas), no desde el
// parser. Formato: [id, página, nem, rank, cl, m1, m2, his, cie, hc, esp, min, minClM1, vac]
const SPOT = [
  // id,   pág, universidad, nem, rank, cl, m1, m2, his, cie, hc, esp, min,  minClM1, vac, carrera
  [12039, 16, 'PUC', 20, 20, 10, 25, 10, 0, 15, 0, 0, null, 485, 650, 'Ingeniería'],
  [12014, 16, 'PUC', 20, 20, 10, 30, 10, 0, 0, 10, 0, null, 485, 418, 'Ingeniería Comercial'],
  [12058, 17, 'PUC', 20, 20, 15, 20, 0, 0, 25, 0, 0, null, 485, 82, 'Medicina'],
  [12029, 17, 'PUC', 12, 12, 12, 14, 0, 0, 0, 10, 40, null, 485, 16, 'Lic. Interpretación Musical'],
  [11083, 256, 'U. de Chile', 10, 20, 15, 20, 0, 0, 35, 0, 0, null, 458, 190, 'Medicina'],
  [11523, 256, 'U. de Chile', 10, 20, 25, 25, 0, 0, 0, 20, 0, null, 458, 30, 'Pedagogía en Educación Básica'],
  [13086, 283, 'UdeC', 15, 25, 15, 35, 0, 0, 10, 0, 0, 500, 485, 100, 'Medicina'],
  [13002, 283, 'UdeC', 10, 15, 15, 30, 20, 0, 10, 0, 0, 500, 485, 20, 'Licenciatura en Matemática'],
  [15111, 531, 'UTFSM', 15, 20, 10, 35, 10, 0, 0, 10, 0, 600, 485, 60, 'Ingeniería Civil (Valparaíso)'],
  [15180, 531, 'UTFSM', 15, 25, 10, 40, 0, 0, 0, 10, 0, 550, 485, 80, 'Arquitectura (Valparaíso)'],
  [16091, 368, 'USACH', 10, 40, 15, 15, 0, 0, 20, 0, 0, 600, 485, 40, 'Medicina'],
  [16049, 368, 'USACH', 10, 40, 10, 20, 10, 0, 10, 0, 0, 550, 485, 25, 'Pedagogía en Física y Matemática'],
  [19039, 406, 'UV', 10, 30, 20, 20, 0, 0, 20, 0, 0, null, 458, 50, 'Medicina (San Felipe)'],
  [19010, 406, 'UV', 10, 40, 20, 10, 0, 20, 0, 0, 0, null, 626, 20, 'Pedagogía en Filosofía (AEP = SI)'],
  [48001, 248, 'U. de Aysén', 10, 40, 10, 30, 0, 0, 0, 10, 0, 465, 465, 37, 'Enfermería'],
  [48004, 248, 'U. de Aysén', 10, 40, 10, 25, 5, 0, 10, 0, 0, 458, 458, 20, 'Ingeniería Civil Industrial'],
  [18087, 212, 'UCN', 10, 20, 25, 25, 0, 0, 20, 0, 0, 500, 458, 54, 'Medicina (Coquimbo)'],
  [22050, 397, 'U. de Tarapacá', 10, 40, 10, 20, 0, 0, 20, 0, 0, 625, 625, 41, 'Medicina'],
  [22025, 397, 'U. de Tarapacá', 10, 40, 10, 25, 5, 0, 0, 10, 0, 458, 458, 10, 'Pedagogía en Física y Matemática'],
  [34020, 380, 'U. de Talca', 20, 30, 10, 25, 0, 0, 15, 0, 0, null, 485, 75, 'Medicina'],
  [34087, 380, 'U. de Talca', 10, 10, 10, 10, 0, 10, 0, 0, 50, null, 485, 15, 'Lic. Interpretación y Formación Musical'],
  [52020, 58, 'UAHC', 10, 40, 30, 10, 0, 0, 0, 10, 0, null, 458, 40, 'Danza (prueba especial APROBADA)'],
  [55092, 515, 'U. Santo Tomás', 10, 10, 40, 20, 0, 0, 0, 20, 0, null, 458, 40, 'Derecho (Concepción)'],
  [33053, 333, 'U. de Magallanes', 20, 25, 15, 25, 0, 0, 0, 15, 0, 650, 600, 50, 'Medicina'],
  [41056, 128, 'UNAB', 10, 30, 15, 20, 0, 0, 25, 0, 0, null, 458, 140, 'Medicina (Santiago)'],
  [17031, 150, 'UACh', 10, 30, 15, 30, 0, 0, 15, 0, 0, null, 500, 19, 'Medicina campo clínico Osorno'],
  [43001, 316, 'U. de los Andes', 10, 15, 20, 35, 0, 0, 20, 0, 0, 680, 500, 100, 'Bachillerato de Medicina'],
  [56118, 306, 'UDLA', 10, 30, 25, 25, 0, 0, 0, 10, 0, null, 458, 120, 'Medicina Veterinaria (Providencia)'],
];

const all = new Map();
for (const [, arr] of kept) for (const c of arr) all.set(c.id, c);
const spotLines = [];
let spotOk = 0;
for (const s of SPOT) {
  const [id, page, uniShort, nem, rank, cl, m1, m2, his, cie, hc, esp, min, minClM1, vac, name] = s;
  const c = all.get(id);
  const exp = { nem, rank, cl, m1, m2, his, cie, hc, esp };
  if (!c) {
    const d = discarded.find((x) => x.raw.includes(`| ${id} |`));
    spotLines.push(`[FALTA] ${id} ${uniShort} ${name} (pág ${page}) -> no está en el dataset${d ? ' (descartada: ' + d.reasons.join('; ') + ')' : ''}`);
    continue;
  }
  const diffs = [];
  for (const k of Object.keys(exp)) if ((c._full[k] || 0) !== exp[k]) diffs.push(`${k}: PDF=${exp[k]} parser=${c._full[k]}`);
  if (c.min !== min) diffs.push(`min: PDF=${min} parser=${c.min}`);
  if (c.minClM1 !== minClM1) diffs.push(`minClM1: PDF=${minClM1} parser=${c.minClM1}`);
  if (c.vac !== vac) diffs.push(`vac: PDF=${vac} parser=${c.vac}`);
  const fmt = Object.entries(exp).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(' ');
  if (!diffs.length) spotOk++;
  spotLines.push(`[${diffs.length ? 'DIFERENCIA' : 'OK'}] ${id} ${uniShort} "${c.n}" / ${c.s} (pág ${page}): PDF ${fmt}${c._full.hcChoice ? ' (Hist o Cs)' : ''} | min ${min} | C.L+M1 ${minClM1} | vac ${vac}${diffs.length ? '\n      ' + diffs.join('\n      ') : ''}`);
}

// ---------------------------------------------------------------- salidas
const universidades = toc.slice().sort((a, b) => a.idx - b.idx).map((t) => ({
  u: t.name,
  c: kept.get(t.name).map(({ _raw, _full, ...rest }) => rest),
}));
const json = {
  proceso: 2026,
  fuente: FUENTE,
  generado: new Date().toISOString().slice(0, 10),
  claves: {
    id: 'código DEMRE', n: 'carrera', s: 'sede', min: 'puntaje ponderado mínimo de postulación', minClM1: 'promedio mínimo C.Lectora+M1', vac: 'vacantes regulares 1er semestre',
    w: 'ponderaciones %, suman 100; claves con 0 se omiten. nem, rank, cl (C.Lectora), m1, m2, his (Historia obligatoria), cie (Ciencias obligatoria), hc + hcChoice (Historia O Ciencias, a elección), esp (prueba especial)',
  },
  universidades,
};
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(json));

let totalKept = 0, totalRows = 0;
const L = [];
L.push('REPORTE parse-demre.cjs');
L.push(`Fuente: ${FUENTE}`);
L.push(`PDF: ${path.basename(pdf)}  |  generado ${new Date().toISOString()}`);
L.push('');
L.push('== TOTALES POR UNIVERSIDAD (conservadas / filas leídas) ==');
for (const t of toc.slice().sort((a, b) => a.idx - b.idx)) {
  const s = uniStats.get(t.name);
  totalKept += s.kept; totalRows += s.rows;
  const pct = s.rows ? ((100 * s.kept) / s.rows).toFixed(0) : '-';
  const pref = [...s.prefixes.entries()].map(([k, v]) => `${k}xxx:${v}`).join(',');
  L.push(`${String(t.idx).padStart(2)} ${t.name.padEnd(52)} ${String(s.kept).padStart(4)} / ${String(s.rows).padStart(4)}  (${pct}%)  págs ${t.start}+  códigos ${pref}`);
}
L.push('');
L.push(`TOTAL conservadas: ${totalKept}`);
L.push(`TOTAL descartadas: ${discarded.length}`);
L.push(`TOTAL filas leídas: ${totalRows}  (cobertura ${((100 * totalKept) / totalRows).toFixed(1)}%)`);
L.push('');
L.push(`== SPOT-CHECK MANUAL contra el PDF (${spotOk}/${SPOT.length} coinciden) ==`);
L.push('Valores transcritos a mano desde las páginas del PDF (tabla SPOT en scripts/parse-demre.cjs) y comparados con lo que extrajo el parser.');
L.push(...spotLines);
L.push('');
L.push('== FILAS DESCARTADAS ==');
L.push('Nota: las filas "Historia y Ciencias con peso pero sin \\"o\\"" vienen así en el PDF (U. de los Andes, U. Santo Tomás, U. de');
L.push('Chile Bachillerato, UFRO, U. de Talca). Contando ambas pruebas suman >100, por lo que casi seguro es "Historia O Ciencias",');
L.push('pero el PDF no lo dice: se dejan fuera hasta confirmarlo con la universidad. Las de "suma = 95/90" y "celda vacía" también son');
L.push('así en el PDF (verificado en las páginas 205 y 291).');
L.push('Formato: página | código | nombre | sede | tokens numéricos de la fila  ->  motivo');
for (const d of discarded) L.push(`${d.raw}\n    -> ${d.reasons.join('; ')}   [${d.uni}]`);
L.push('');
L.push('== AVISOS ==');
L.push(...warnings);
fs.writeFileSync(OUT_REPORT, L.join('\n') + '\n');

console.log(`Conservadas ${totalKept} / ${totalRows} filas; descartadas ${discarded.length}; spot-check ${spotOk}/${SPOT.length}`);
console.log(`-> ${path.relative(ROOT, OUT_JSON)} (${(fs.statSync(OUT_JSON).size / 1024).toFixed(0)} KB)`);
console.log(`-> ${path.relative(ROOT, OUT_REPORT)}`);
