/*
 * shell.cjs — se ejecuta al final del build.
 * Pone ya dibujadas la Home y las páginas de programa más visitadas dentro de
 * <div id="root"> de su HTML (dist/index.html, dist/paes.html…). El HTML sale
 * de src/entry-shell.jsx, compilado en .shell/ por Vite. Además:
 *  - data-shell="<ruta>": main.jsx sabe que debe hidratar (adoptar) ese HTML
 *  - data-shell-t: la hora en que se dibujó (cuentas regresivas, intensivo)
 *  - --programa en <html>: el color del programa desde el primer cuadro
 *  - modulepreload del código de la página, para que se active antes
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const DIST = path.join(__dirname, '..', 'dist');
// ruta → [archivo HTML, archivo de la página en src/ (para el modulepreload)]
const PAGINAS = {
  '/': ['index.html', null],
  '/paes': ['paes.html', 'src/pages/PAES/index.jsx'],
  '/idiomas': ['idiomas.html', 'src/pages/Idiomas/index.jsx'],
  '/adultos': ['adultos.html', 'src/pages/Nivelacion/NivelacionAdultos.jsx'],
};

(async () => {
  const mod = await import(pathToFileURL(path.join(__dirname, '..', '.shell', 'entry-shell.js')).href);
  const manifest = JSON.parse(fs.readFileSync(path.join(DIST, '.vite', 'manifest.json'), 'utf8'));
  // Todos los archivos JS que necesita una entrada del manifest (sin repetir)
  const archivosDe = (clave, vistos = new Set()) => {
    const e = manifest[clave];
    if (!e || vistos.has(clave)) return [];
    vistos.add(clave);
    return [e.file, ...(e.imports || []).flatMap((i) => archivosDe(i, vistos))];
  };

  // React avisa que useLayoutEffect no corre en el servidor; aquí no importa.
  const err = console.error;
  console.error = (m, ...r) => { if (!String(m).includes('useLayoutEffect does nothing')) err(m, ...r); };

  for (const [ruta, [archivo, fuente]] of Object.entries(PAGINAS)) {
    const destino = path.join(DIST, archivo);
    if (!fs.existsSync(destino)) { console.warn(`  (no existe ${archivo}, se omite)`); continue; }
    const t = Date.now();
    globalThis.__laelShellT = t;
    const { html, color } = await mod.render(ruta);
    let page = fs.readFileSync(destino, 'utf8');
    if (!page.includes('<div id="root"></div>')) throw new Error(`No encontré <div id="root"></div> en ${archivo}`);
    page = page.replace('<div id="root"></div>', () => `<div id="root" data-shell="${ruta}" data-shell-t="${t}">${html}</div>`);
    if (color) page = page.replace('<html lang="es-CL">', `<html lang="es-CL" style="--programa:${color}">`);
    if (fuente) {
      const extra = archivosDe(fuente).filter((f) => !page.includes(f));
      page = page.replace('</head>', () => extra.map((f) => `  <link rel="modulepreload" crossorigin href="/${f}" />\n`).join('') + '  </head>');
    }
    fs.writeFileSync(destino, page);
    console.log(`shell: ${ruta} pre-dibujada (${Math.round(html.length / 1024)} KB de HTML)`);
  }
  console.error = err;
})().catch((e) => { console.error(e); process.exit(1); });
