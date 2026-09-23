#!/usr/bin/env node
/*
 * fetch-nem.cjs
 * ----------------------------------------------------------------------------
 * Descarga las tablas OFICIALES del DEMRE de transformación del promedio de
 * notas de enseñanza media (NEM) a puntaje, y genera src/data/nem-tablas.json.
 *
 *   https://demre.cl/paes/factores-seleccion/tabla-transformacion-nem
 *   Grupo A: HC diurno          .../tabla-transformacion-nem-grupo-a
 *   Grupo B: HC adultos/nocturno .../tabla-transformacion-nem-grupo-b
 *   Grupo C: Técnico-Profesional .../tabla-transformacion-nem-grupo-c
 *
 * USO:  node scripts/fetch-nem.cjs
 *
 * Validación: cada grupo debe traer exactamente las 301 notas de 4,00 a 7,00
 * (paso 0,01), con puntajes enteros crecientes, 4,00 = 100 y 7,00 = 1000.
 * Si algo falla, el script se detiene y no escribe el archivo.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://demre.cl/paes/factores-seleccion/';
const OUT = path.join(__dirname, '..', 'src/data/nem-tablas.json');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

// Se usa curl (viene con Windows 10+, macOS y Linux): el servidor del DEMRE
// envía un encabezado HTTP mal formado que el fetch de Node rechaza.
const { execFileSync } = require('child_process');
async function get(url) {
  return execFileSync('curl', ['-sSLf', '--compressed', '-A', UA, url], { encoding: 'utf8', maxBuffer: 1 << 26 });
}

(async () => {
  const index = await get(BASE + 'tabla-transformacion-nem');
  const proc = (index.match(/Proceso de Admisi(?:ó|&oacute;)n universitario (\d{4})/) || [])[1];
  if (!proc) throw new Error('No se encontró el año del proceso en la página índice');

  const grupos = {};
  for (const g of ['a', 'b', 'c']) {
    const html = await get(BASE + 'tabla-transformacion-nem-grupo-' + g);
    const cells = [...html.matchAll(/<td[^>]*>\s*([^<]*?)\s*<\/td>/gi)].map((m) => m[1].trim());
    const table = new Map();
    for (let i = 0; i + 1 < cells.length; i++) {
      if (/^[4-7](,\d{1,2})?$/.test(cells[i]) && /^\d{3,4}$/.test(cells[i + 1])) {
        const nota = Math.round(parseFloat(cells[i].replace(',', '.')) * 100);
        if (!table.has(nota)) table.set(nota, +cells[i + 1]);
        i++;
      }
    }
    const arr = [];
    for (let n = 400; n <= 700; n++) {
      if (!table.has(n)) throw new Error(`Grupo ${g.toUpperCase()}: falta la nota ${(n / 100).toFixed(2)}`);
      arr.push(table.get(n));
    }
    if (arr[0] !== 100 || arr[300] !== 1000) throw new Error(`Grupo ${g.toUpperCase()}: extremos inesperados ${arr[0]} / ${arr[300]}`);
    for (let i = 1; i < arr.length; i++) if (arr[i] < arr[i - 1]) throw new Error(`Grupo ${g.toUpperCase()}: tabla no creciente en ${(4 + i / 100).toFixed(2)}`);
    grupos[g.toUpperCase()] = arr;
  }

  const json = {
    proceso: +proc,
    fuente: 'DEMRE, Tablas de transformación de NEM, Proceso de Admisión ' + proc,
    url: BASE + 'tabla-transformacion-nem',
    generado: new Date().toISOString().slice(0, 10),
    claves: { A: 'HC diurno', B: 'HC adultos (vespertino/nocturno, exámenes libres)', C: 'Técnico-Profesional', puntajes: 'índice 0 = nota 4,00; índice 300 = nota 7,00 (paso 0,01)' },
    grupos,
  };
  fs.writeFileSync(OUT, JSON.stringify(json));
  console.log(`OK: proceso ${proc}, 3 grupos x 301 notas -> ${path.relative(process.cwd(), OUT)}`);
  console.log('Ejemplos 5,50 / 6,00 / 6,50:', ['A', 'B', 'C'].map((g) => `${g}=${grupos[g][150]}/${grupos[g][200]}/${grupos[g][250]}`).join('  '));
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
