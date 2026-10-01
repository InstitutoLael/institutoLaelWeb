/*
 * shell.cjs — se ejecuta al final del build.
 * Pone la portada de la Home ya dibujada dentro de <div id="root"> en
 * dist/index.html (solo la Home: las demás páginas ya se copiaron antes).
 * El HTML sale de src/entry-shell.jsx, compilado en .shell/ por Vite.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const dist = path.join(__dirname, '..', 'dist', 'index.html');
  const mod = await import(pathToFileURL(path.join(__dirname, '..', '.shell', 'entry-shell.js')).href);
  // React avisa que useLayoutEffect no corre en el servidor; aquí no importa
  // porque esta portada no se "hidrata": React la reemplaza al cargar.
  const err = console.error;
  console.error = (m, ...r) => { if (!String(m).includes('useLayoutEffect does nothing')) err(m, ...r); };
  const html = mod.render();
  console.error = err;
  const page = fs.readFileSync(dist, 'utf8');
  if (!page.includes('<div id="root"></div>')) throw new Error('No encontré <div id="root"></div> en dist/index.html');
  fs.writeFileSync(dist, page.replace('<div id="root"></div>', () => `<div id="root" data-shell>${html}</div>`));
  console.log(`shell: portada pre-dibujada (${Math.round(html.length / 1024)} KB de HTML)`);
})().catch((e) => { console.error(e); process.exit(1); });
