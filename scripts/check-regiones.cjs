#!/usr/bin/env node
/*
 * check-regiones.cjs
 * Verifica que cada sede de src/data/carreras-2026.json tenga región en
 * src/data/regiones-sedes.json (mapa escrito a mano: "UNIVERSIDAD|sede" -> código
 * de región). Correr cada vez que se regenere carreras-2026.json:
 *
 *   node scripts/check-regiones.cjs
 *
 * Si aparece una sede nueva, agregarla a mano en regiones-sedes.json (nunca
 * suponer la región por la universidad sin revisar dónde queda la sede).
 */
const path = require('path');
const root = path.join(__dirname, '..');
const data = require(path.join(root, 'src/data/carreras-2026.json'));
const map = require(path.join(root, 'src/data/regiones-sedes.json'));

let missing = 0, bad = 0, careers = 0;
const perRegion = {};
for (const u of data.universidades) {
  for (const c of u.c) {
    const r = map.sedes[`${u.u}|${c.s}`];
    if (!r) { missing++; console.log('SIN REGIÓN:', u.u, '|', c.s, '(', c.id, c.n, ')'); continue; }
    if (!map.regiones[r]) { bad++; console.log('CÓDIGO DE REGIÓN INVÁLIDO:', r, u.u, c.s); continue; }
    careers++;
    perRegion[r] = (perRegion[r] || 0) + 1;
  }
}
const used = new Set(data.universidades.flatMap((u) => u.c.map((c) => `${u.u}|${c.s}`)));
const extra = Object.keys(map.sedes).filter((k) => !used.has(k));
console.log(`Carreras con región: ${careers}; sin región: ${missing}; códigos inválidos: ${bad}`);
console.log(`Sedes mapeadas: ${Object.keys(map.sedes).length}; sobrantes (sin carreras): ${extra.length}`);
console.log(map.orden.map((r) => `${map.regiones[r]}: ${perRegion[r] || 0}`).join(' · '));
process.exit(missing || bad ? 1 : 0);
