import React from 'react';

// Logo de Instituto Lael dibujado en vector (antes era una imagen de 290 px).
// Se ve nítido a cualquier tamaño, cambia de color con props y puede
// "dibujarse solo" (draw) para la intro y la cortina entre páginas.
//
// Trazos: la onda (L + A + base de la E), la ola de adentro de la A, la L
// final, la E dorada que sube hasta la paloma, y la paloma.
//
// <LaelLogo />                          azul + dorado (el original)
// <LaelLogo variant="blanco" />         blanco + lima, para fondos azules
// <LaelLogo ink="#fff" accent="#FF9F7A" />  cualquier combinación
// <LaelLogo tagline={false} draw />     sin "INSTITUTO LAEL", animado

export const LOGO_VARIANTES = {
  original: { ink: '#14211C', accent: '#C49A3A', label: 'Original' },
  marino: { ink: '#071D49', accent: '#C49A3A', label: 'Marino y oro' },
  lima: { ink: '#071D49', accent: '#9AA300', label: 'Marino y lima' },
  blanco: { ink: '#FFFFFF', accent: '#D7E400', label: 'Blanco y lima' },
  noche: { ink: '#FFFFFF', accent: '#C49A3A', label: 'Blanco y oro' },
  mono: { ink: 'currentColor', accent: 'currentColor', label: 'Un color' },
};

// Trazos principales, en la grilla de 290 × 160 del logo original
export const LOGO_PATHS = {
  onda: 'M6.5 48 V98 C6.5 115 16 125.5 28.5 125.5 C42 125.5 52 114 59 98 C68 77 81 51 101 51 C121 51 135 77 148 98 C158 114 166 122.5 182 122.5 H229',
  ola: 'M78 96 C88 96 93 99 100 107 C107 116 112 123 121 123 C131 123 140 118 149 111',
  ele: 'M246 47.5 V105 C246 117 252 123.5 264 123.5 H286',
  e: 'M166 95 C165 68 176 49 204 48 H229',
  eMedio: 'M165 80 H213',
};

export const PALOMA_PATHS = [
  'M229 48 C233 44 236 41 238 37 C236 36 231 37 228 39 C231 34 236 31 241 30 C245 27 250 23 254 20 C257 19 259 20 260 21 L264 22 L259 24 C256 31 249 37 241 39 C237 42 233 45 229 48Z',
  'M244 29 C236 27 230 21 228 13 C227 8 227 4 228 1 C232 10 238 16 248 23 Z',
  'M248 23 C245 17 243 11 244 4 C247 11 250 16 253 20 Z',
];

export function Paloma({ fill = 'currentColor', style, ...rest }) {
  return (
    <g style={{ fill, ...style }} {...rest}>
      {PALOMA_PATHS.map((d) => <path key={d} d={d} />)}
    </g>
  );
}

// El logo como texto SVG, para descargarlo (página /marca)
export function logoSvgString({ ink, accent, bg, tagline = true }) {
  const h = tagline ? 160 : 132;
  const pad = bg ? 24 : 0;
  const st = (c) => `fill="none" stroke="${c}" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${290 + pad * 2} ${h + pad * 2}">`
    + (bg ? `<rect x="${-pad}" y="${-pad}" width="${290 + pad * 2}" height="${h + pad * 2}" fill="${bg}"/>` : '')
    + ['onda', 'ola', 'ele'].map((k) => `<path d="${LOGO_PATHS[k]}" ${st(ink)}/>`).join('')
    + ['e', 'eMedio'].map((k) => `<path d="${LOGO_PATHS[k]}" ${st(accent)}/>`).join('')
    + PALOMA_PATHS.map((d) => `<path d="${d}" fill="${accent}"/>`).join('')
    + (tagline ? `<text x="146.5" y="157" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-weight="600" font-size="14.5" letter-spacing="9.6" fill="${accent}">INSTITUTO LAEL</text>` : '')
    + '</svg>';
}

export default function LaelLogo({
  variant = 'marino',
  ink,
  accent,
  tagline = true,
  draw = false,
  delay = 0,
  title = 'Instituto Lael',
  className = '',
  style,
}) {
  const v = LOGO_VARIANTES[variant] || LOGO_VARIANTES.marino;
  // Los colores pasan por variables CSS, así el modo oscuro puede cambiarlos
  // (ver .logo-adapt en index.css) sin tocar cada uso.
  const tinta = `var(--logo-ink, ${ink || v.ink})`;
  const acento = `var(--logo-acc, ${accent || v.accent})`;
  const height = tagline ? 160 : 132;
  // Con draw, cada trazo se dibuja con pathLength=1 y un retraso propio
  const trazo = (i, stroke) => (draw
    ? { pathLength: 1, className: 'lael-draw', style: { stroke, animationDelay: `${delay + i * 0.12}s` } }
    : { style: { stroke } });
  const sw = { fill: 'none', strokeWidth: 9.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <svg
      viewBox={`0 0 290 ${height}`}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={LOGO_PATHS.onda} {...sw} {...trazo(0, tinta)} />
      <path d={LOGO_PATHS.ola} {...sw} {...trazo(1, tinta)} />
      <path d={LOGO_PATHS.e} {...sw} {...trazo(2, acento)} />
      <path d={LOGO_PATHS.eMedio} {...sw} {...trazo(3, acento)} />
      <path d={LOGO_PATHS.ele} {...sw} {...trazo(4, tinta)} />
      <Paloma fill={acento} className={draw ? 'lael-dove-in' : undefined} style={draw ? { animationDelay: `${delay + 0.75}s` } : undefined} />
      {tagline && (
        <text x="146.5" y="157" textAnchor="middle" fontFamily="Montserrat, Arial, sans-serif" fontWeight="600" fontSize="14.5" letterSpacing="9.6" style={{ fill: acento }}>
          INSTITUTO LAEL
        </text>
      )}
    </svg>
  );
}
