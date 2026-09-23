/*
 * gen-dark-css.cjs — genera src/styles/dark.generated.css
 * -----------------------------------------------------------------------------
 * El sitio usa colores escritos directo en las clases (text-[#071D49],
 * bg-[#F4F4F4], bg-white...). Este script busca todas esas clases en src/ y
 * escribe su versión para el modo oscuro, así no hay que tocar cada página.
 * Se ejecuta solo antes de cada build (ver "prebuild" en package.json).
 *
 * Reglas del modo oscuro:
 *  - El azul Lael (#071D49) de las secciones y el amarillo (#D7E400) se quedan.
 *  - Fondos claros (#F4F4F4, blanco) pasan a azul noche.
 *  - Textos azul Lael pasan a casi blanco (con la misma transparencia),
 *    salvo cuando van sobre amarillo (botones y etiquetas), que siguen azules.
 *  - Bordes azules pasan a bordes blancos suaves.
 * -----------------------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src');
const OUT = path.join(ROOT, 'styles', 'dark.generated.css');

const PAGE = '#040A1A';     // fondo base (antes #F4F4F4)
const CARD = '#0C1834';     // tarjetas (antes blanco)
const CARD_HOVER = '#13234A';
const INK = '232, 236, 245'; // texto (antes azul Lael)

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.(jsx?|tsx?)$/.test(f)) out.push(p);
  }
  return out;
}

const TOKEN_RE = /(?:(hover|focus|group-hover|placeholder|focus-visible):)?(text|bg|border|ring|placeholder)-(\[#071D49\]|\[#071d49\]|\[#F4F4F4\]|\[#f4f4f4\]|\[#8D8D8D\]|\[#8d8d8d\]|white|lael-primary|lael-secondary|lael-muted)(?:\/(\d{1,3}|\[[0-9.]+\]))?(?![\w-])/g;

const tokens = new Set();
for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = TOKEN_RE.exec(src))) tokens.add(m[0]);
}

const esc = (t) => `[class~="${t}"]`;
const alpha = (a) => (a == null ? 1 : a.startsWith('[') ? Number(a.slice(1, -1)) : Number(a) / 100);
// Excluir lo que va sobre amarillo (texto navy en botón amarillo debe seguir navy)
const NOT_ON_YELLOW = ':not([class~="bg-[#D7E400]"]):not([class~="bg-[#D7E400]"] *):not([class~="bg-lael-accent"]):not([class~="bg-lael-accent"] *):not([style*="background-color: rgb(215, 228, 0)"]):not([style*="background-color: rgb(215, 228, 0)"] *)';

const rules = [];
for (const t of [...tokens].sort()) {
  const m = /^(?:(hover|focus|group-hover|placeholder|focus-visible):)?(text|bg|border|ring|placeholder)-(.+?)(?:\/(.+))?$/.exec(t);
  if (!m) continue;
  const [, variant, prop, colorRaw, a] = m;
  const color = colorRaw.toLowerCase();
  const al = alpha(a);
  let sel = `html.dark ${esc(t)}`;
  let pseudo = '';
  if (variant === 'hover') pseudo = ':hover';
  if (variant === 'focus') pseudo = ':focus';
  if (variant === 'focus-visible') pseudo = ':focus-visible';
  if (variant === 'group-hover') sel = `html.dark .group:hover ${esc(t)}`;
  if (variant === 'placeholder' || prop === 'placeholder') pseudo = '::placeholder';

  let decl = null;
  const isNavy = color === '[#071d49]' || color === 'lael-primary';
  if (prop === 'text' || prop === 'placeholder') {
    if (isNavy) { decl = `color: rgba(${INK}, ${al === 1 ? 1 : Math.min(1, al + 0.08)})`; sel += NOT_ON_YELLOW; }
    else if (color === '[#8d8d8d]' || color === 'lael-muted') decl = 'color: #A7B0C4';
  } else if (prop === 'bg') {
    if (color === '[#f4f4f4]' || color === 'lael-secondary') decl = variant === 'hover' ? `background-color: ${CARD_HOVER}` : `background-color: ${PAGE}`;
    else if (color === 'white' && (a == null || al >= 0.9)) decl = variant === 'hover' ? null : `background-color: ${al < 1 ? 'rgba(4, 10, 26, 0.95)' : CARD}`;
    else if (isNavy && al < 1) decl = `background-color: rgba(255, 255, 255, ${Math.min(0.14, al + 0.02)})`;
  } else if (prop === 'border') {
    if (isNavy) decl = `border-color: rgba(255, 255, 255, ${al === 1 ? 0.45 : Math.min(0.3, al * 1.4 + 0.03)})`;
  } else if (prop === 'ring') {
    if (isNavy) decl = `--tw-ring-color: rgba(${INK}, ${al === 1 ? 0.7 : Math.min(0.5, al * 3)})`;
  }
  if (decl) rules.push(`${sel}${pseudo} { ${decl} !important; }`);
}

const css = `/* ARCHIVO GENERADO por scripts/gen-dark-css.cjs — no editar a mano. */
html.dark { color-scheme: dark; }
html.dark, html.dark body { background-color: ${PAGE} !important; color: rgb(${INK}); }
/* Textos azules escritos como estilo en línea (style={{ color: BLUE }}) */
html.dark [style*="color: rgb(7, 29, 73)"]:not([style*="background-color: rgb(215, 228, 0)"]):not([style*="background-color: rgb(215, 228, 0)"] *):not([class~="bg-[#D7E400]"]):not([class~="bg-[#D7E400]"] *) { color: rgb(${INK}) !important; }
html.dark [style*="background-color: rgb(244, 244, 244)"] { background-color: ${PAGE} !important; }
html.dark [style*="background-color: rgb(255, 255, 255)"] { background-color: ${CARD} !important; }
/* Botones azules sobre tarjetas oscuras: un poco más claros para que se vean */
html.dark a[class~="bg-[#071D49]"], html.dark button[class~="bg-[#071D49]"] { background-color: #1E3A7A !important; }
html.dark a[class~="bg-[#071D49]"]:hover, html.dark button[class~="bg-[#071D49]"]:hover { background-color: #27498F !important; }
/* Sombras más sutiles */
html.dark .shadow-card, html.dark [class*="shadow-"] { --tw-shadow-color: rgba(0, 0, 0, 0.45); }
/* Logo del menú (versión azul) en blanco */
html.dark header img[src*="lael-nuevo-logo"]:not([src*="blanco"]) { filter: brightness(0) invert(1); }
/* Logo a color dentro de las páginas: sobre una placa blanca */
html.dark main img[src*="lael-nuevo-logo"]:not([src*="blanco"]) { background: #fff; border-radius: 16px; padding: 10px; }
/* Logos de convenios sobre fondo blanco para que se lean */
html.dark img[alt*="INO"], html.dark img[alt*="Olivos"], html.dark img[alt*="Mercado"] { background: #fff; border-radius: 10px; padding: 6px; }
/* Formularios */
html.dark input, html.dark select, html.dark textarea { color: rgb(${INK}); }
html.dark select option { background: ${CARD}; color: rgb(${INK}); }
${rules.join('\n')}
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, css);
console.log(`dark.generated.css: ${rules.length} reglas a partir de ${tokens.size} clases`);
