/*
 * route-html.cjs — se ejecuta después del build (postbuild).
 * -----------------------------------------------------------------------------
 * WhatsApp, Facebook y otros no ejecutan JavaScript: al compartir un link leen
 * solo el HTML base, que tenía el mismo título para todas las páginas. Este
 * script crea un HTML por página (dist/paes.html, dist/noticias/<slug>.html…)
 * con su propio título, descripción y vista previa. GitHub Pages sirve
 * /paes → paes.html automáticamente. El sitio funciona igual que antes.
 *
 * El título y la descripción se leen del <Helmet> de cada página, así que no
 * hay que mantenerlos en dos lugares.
 * -----------------------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.institutolael.cl';

// Ruta → archivo con su <Helmet>
const PAGES = {
  '/paes': 'src/pages/PAES/index.jsx',
  '/calculadora': 'src/pages/Calculadora.jsx',
  '/inscripcion': 'src/pages/Inscripcion.jsx',
  '/adultos': 'src/pages/Nivelacion/NivelacionAdultos.jsx',
  '/empresas': 'src/pages/Empresas/index.jsx',
  '/idiomas': 'src/pages/Idiomas/index.jsx',
  '/espanol': 'src/pages/Idiomas/LandingEspanol.jsx',
  '/lsch': 'src/pages/LSCh/index.jsx',
  '/verano': 'src/pages/Verano.jsx',
  '/nosotros': 'src/pages/Nosotros.jsx',
  '/casos-reales': 'src/pages/CasosReales.jsx',
  '/sistema': 'src/pages/SistemaLael.jsx',
  '/metodo': 'src/pages/MetodoLael.jsx',
  '/preguntas': 'src/pages/Preguntas.jsx',
  '/contacto': 'src/pages/Contacto.jsx',
  '/transparencia': 'src/pages/Transparencia.jsx',
  '/privacidad': 'src/pages/Privacidad.jsx',
  '/diagnostico': 'src/pages/DiagnosticPage.jsx',
  '/testimonio': 'src/pages/Testimonio.jsx',
  '/noticias': 'src/pages/noticias/NoticiasIndex.jsx',
  '/reforzamiento': 'src/pages/Programas/Reforzamiento.jsx',
  '/orientacion': 'src/pages/Programas/Orientacion.jsx',
  '/apoderados': 'src/pages/Programas/Apoderados.jsx',
  '/ensayo-gratis': 'src/pages/Programas/EnsayoGratis.jsx',
  '/talleres-ia': 'src/pages/Programas/TalleresIA.jsx',
  '/alianzas': 'src/pages/Programas/Alianzas.jsx',
  '/trae-un-amigo': 'src/pages/Programas/TraeUnAmigo.jsx',
  '/alumnos': 'src/pages/Programas/Alumnos.jsx',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (s) => s.replace(/\s+/g, ' ').replace(/\{['"`]?|['"`]?\}/g, '').trim();

function fromHelmet(file) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const t = /<title>([^<{]+)<\/title>/.exec(src);
  const d = /<meta\s+name="description"\s+content="([^"]+)"/.exec(src);
  return { title: t && clean(t[1]), description: d && clean(d[1]) };
}

function fromData(file, label) {
  // Algunas páginas toman el título desde src/data (plantilla de programas)
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const t = /seoTitle:\s*['"`]([^'"`]+)['"`]/.exec(src) || /title:\s*['"`]([^'"`]+)['"`]/.exec(src);
  const d = /seoDescription:\s*['"`]([^'"`]+)['"`]/.exec(src) || /description:\s*['"`]([^'"`]+)['"`]/.exec(src);
  return { title: t && (t[1].includes('Instituto Lael') ? t[1] : `${t[1]} | Instituto Lael`), description: d && d[1], label };
}

function renderHtml(base, route, { title, description }) {
  let html = base;
  const url = SITE + route;
  // Reemplazos con función: así un "$" del texto (ej. "$10.000") no se
  // interpreta como referencia del reemplazo.
  const set = (re, value) => { html = html.replace(re, (_, a, b) => a + value + b); };
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`);
  set(/(<meta name="description" content=")[^"]*(")/, esc(description));
  set(/(<meta property="og:url" content=")[^"]*(")/, url);
  set(/(<meta property="og:title" content=")[^"]*(")/, esc(title));
  set(/(<meta property="og:description" content=")[^"]*(")/, esc(description));
  set(/(<meta name="twitter:title" content=")[^"]*(")/, esc(title));
  set(/(<meta name="twitter:description" content=")[^"]*(")/, esc(description));
  html = html.replace('</head>', `  <link rel="canonical" href="${url}" />\n  </head>`);
  return html;
}

function write(route, meta, base) {
  if (!meta.title || !meta.description) { console.warn(`  (sin título o descripción, se omite) ${route}`); return false; }
  const out = path.join(DIST, route.slice(1) + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderHtml(base, route, meta));
  return true;
}

const base = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
// La portada también lleva su canonical
fs.writeFileSync(path.join(DIST, 'index.html'), base.replace('</head>', `  <link rel="canonical" href="${SITE}/" />\n  </head>`));

let n = 0;
for (const [route, file] of Object.entries(PAGES)) {
  if (!fs.existsSync(path.join(ROOT, file))) { console.warn(`  (no existe ${file})`); continue; }
  let meta = fromHelmet(file);
  if (!meta.title || !meta.description) {
    const dataFile = `src/data/${route.slice(1)}.js`;
    if (fs.existsSync(path.join(ROOT, dataFile))) meta = { ...fromData(dataFile), ...Object.fromEntries(Object.entries(meta).filter(([, v]) => v)) };
  }
  if (write(route, meta, base)) n++;
}

// Noticias: una página por guía, con su título y resumen
const noticias = fs.readFileSync(path.join(ROOT, 'src/data/noticias.js'), 'utf8');
const re = /slug:\s*['"`]([^'"`]+)['"`][\s\S]*?title:\s*['"`]([^'"`]+)['"`][\s\S]*?excerpt:\s*['"`]([^'"`]+)['"`]/g;
let m;
while ((m = re.exec(noticias))) {
  if (write(`/noticias/${m[1]}`, { title: `${m[2]} | Instituto Lael`, description: m[3] }, base)) n++;
}
console.log(`route-html: ${n} páginas con su propia vista previa`);
