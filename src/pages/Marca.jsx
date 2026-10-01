import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Download, RotateCcw, Check } from 'lucide-react';
import PageHero, { fadeUp } from '../components/ui/PageHero';
import LaelLogo, { logoSvgString } from '../components/ui/LaelLogo';
import { COLORES } from '../data/catalogo';

// Página de marca: el logo redibujado, sus variantes de color (una por
// programa), la paleta y la tipografía. Cada variante se descarga en SVG.
const WRAP = 'max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12';
const NAVY = '#071D49';
const LIMA = '#D7E400';
const ORO = '#C49A3A';

const VARIANTES = [
  { id: 'original', nombre: 'Original', bg: '#FFFFFF', ink: '#14211C', accent: ORO },
  { id: 'marino', nombre: 'Marino y oro', bg: '#F4F4F4', ink: NAVY, accent: ORO },
  { id: 'noche', nombre: 'Noche y lima', bg: NAVY, ink: '#FFFFFF', accent: LIMA },
  { id: 'noche-oro', nombre: 'Noche y oro', bg: NAVY, ink: '#FFFFFF', accent: ORO },
  { id: 'lima', nombre: 'Sobre lima', bg: LIMA, ink: NAVY, accent: '#FFFFFF' },
  { id: 'negro', nombre: 'Negro', bg: '#FFFFFF', ink: '#0D0D0D', accent: '#0D0D0D' },
];

const PROGRAMAS = [
  { id: 'paes', nombre: 'Preu PAES', color: COLORES.paes },
  { id: 'adultos', nombre: 'Escuela de Sueños', color: COLORES.adultos },
  { id: 'ingles', nombre: 'Inglés', color: COLORES.ingles },
  { id: 'espanol', nombre: 'Español', color: COLORES.espanol },
  { id: 'lsch', nombre: 'Lengua de Señas', color: COLORES.lsch },
  { id: 'verano', nombre: 'Verano Lael', color: COLORES.verano },
  { id: 'reforzamiento', nombre: 'Clases particulares', color: COLORES.reforzamiento },
  { id: 'talleres-ia', nombre: 'Talleres de IA', color: COLORES['talleres-ia'] },
];

const PALETA = [
  { n: 'Azul Lael', hex: NAVY, txt: '#FFFFFF', uso: 'Base de la marca' },
  { n: 'Lima', hex: LIMA, txt: NAVY, uso: 'Botones y acentos' },
  { n: 'Oro', hex: ORO, txt: NAVY, uso: 'Logo original' },
  { n: 'Gris claro', hex: '#F4F4F4', txt: NAVY, uso: 'Fondos' },
];

function descargar(nombre, v) {
  const svg = logoSvgString(v);
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `lael-logo-${nombre}.svg`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Muestra({ v, nombre, alto = 'aspect-[4/3]' }) {
  const claro = v.bg === '#FFFFFF' || v.bg === '#F4F4F4' || v.bg === LIMA;
  return (
    <motion.figure {...fadeUp()} className="group">
      <div data-keep-light className={`relative ${alto} rounded-[24px] sm:rounded-[32px] flex items-center justify-center p-10 border ${claro ? 'border-[#071D49]/10' : 'border-transparent'}`} style={{ backgroundColor: v.bg }}>
        <LaelLogo ink={v.ink} accent={v.accent} title="" className="w-[70%] max-w-[300px] h-auto transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
        <button
          type="button"
          onClick={() => descargar(nombre.toLowerCase().replace(/\s+/g, '-'), v)}
          className={`absolute bottom-3 right-3 inline-flex items-center gap-2 min-h-[40px] px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${claro ? 'bg-[#071D49] text-white hover:bg-[#0B2A66]' : 'bg-white text-[#071D49] hover:bg-[#D7E400]'}`}
          aria-label={`Descargar logo ${nombre} en SVG`}
        >
          <Download size={14} aria-hidden="true" /> SVG
        </button>
      </div>
      <figcaption className="mt-3 flex items-center justify-between text-sm">
        <span className="font-bold text-[#071D49]">{nombre}</span>
        <span className="font-mono text-xs text-[#071D49]/75 uppercase">{v.ink === v.accent ? v.ink : `${v.ink} · ${v.accent}`}</span>
      </figcaption>
    </motion.figure>
  );
}

function Swatch({ c }) {
  const [ok, setOk] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(c.hex); setOk(true); setTimeout(() => setOk(false), 1400); } catch (_) {}
  };
  return (
    <button type="button" onClick={copiar} data-keep-light className="group text-left rounded-[24px] overflow-hidden border border-[#071D49]/10 flex flex-col min-h-[220px]" style={{ backgroundColor: c.hex, color: c.txt }} aria-label={`Copiar ${c.n}, ${c.hex}`}>
      <span className="p-5 flex-1 flex flex-col justify-between w-full">
        <span className="font-display font-extrabold text-2xl tracking-tight">{c.n}</span>
        <span className="flex items-end justify-between w-full">
          <span>
            <span className="block font-mono text-sm uppercase">{c.hex}</span>
            <span className="block text-xs font-semibold mt-1">{c.uso}</span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity inline-flex items-center gap-1" aria-live="polite">
            {ok ? <><Check size={14} /> Copiado</> : 'Copiar'}
          </span>
        </span>
      </span>
    </button>
  );
}

export default function Marca() {
  const [vuelta, setVuelta] = useState(0);
  return (
    <div className="overflow-x-clip">
      <Helmet>
        <title>Marca | Instituto Lael</title>
        <meta name="description" content="El logo de Instituto Lael redibujado en vector, con sus variantes de color por programa, la paleta y la tipografía. Descarga cada versión en SVG." />
      </Helmet>

      <PageHero eyebrow="Identidad" title="Una onda" accent="y una paloma.">
        <p>La onda es el camino: sube, baja y vuelve a subir. La paloma es tu sueño, que despega cuando el camino termina. Todo lo demás en esta página sale de esas dos ideas.</p>
      </PageHero>

      {/* El logo */}
      <section className="bg-white py-20 sm:py-28">
        <div className={`${WRAP} grid lg:grid-cols-12 gap-10 items-center`}>
          <div className="lg:col-span-4">
            <motion.p {...fadeUp()} className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#071D49]/75">(01) — El logo</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
              Redibujado <span className="accent-serif">en vector.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-6 text-[#071D49]/70 leading-relaxed max-w-md">
              Cinco trazos de grosor parejo y una paloma. Antes era una imagen de 290 píxeles; ahora se ve nítido en un celular, en un pendón o en una pantalla de cine, y se puede animar.
            </motion.p>
            <button type="button" onClick={() => setVuelta((v) => v + 1)} className="mt-8 inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border border-[#071D49]/20 font-display text-xs font-extrabold uppercase tracking-wider text-[#071D49] hover:bg-[#071D49] hover:text-white transition-colors">
              <RotateCcw size={14} aria-hidden="true" /> Dibujar de nuevo
            </button>
          </div>
          <div className="lg:col-span-8 rounded-[32px] bg-[#F4F4F4] aspect-[16/10] flex items-center justify-center p-10">
            <LaelLogo key={vuelta} draw variant="marino" className="w-[78%] h-auto logo-adapt" />
          </div>
        </div>
      </section>

      {/* Variantes */}
      <section className="bg-[#F4F4F4] py-20 sm:py-28">
        <div className={WRAP}>
          <motion.p {...fadeUp()} className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#071D49]/75">(02) — Variantes</motion.p>
          <motion.h2 {...fadeUp(0.05)} className="mt-6 mb-12 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
            Un logo, <span className="accent-serif">muchos fondos.</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VARIANTES.map((v) => <Muestra key={v.id} v={v} nombre={v.nombre} />)}
          </div>
        </div>
      </section>

      {/* Una paloma por programa */}
      <section className="grain bg-[#071D49] text-white py-20 sm:py-28">
        <div className={WRAP}>
          <motion.p {...fadeUp()} className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/60">(03) — Programas</motion.p>
          <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] display-lg">
            Una paloma <span className="accent-serif text-[#D7E400]">por programa.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-6 mb-12 max-w-xl text-white/70 leading-relaxed">
            Cada programa tiene su color. Sobre el azul Lael, la E y la paloma lo toman; la onda sigue siendo blanca, porque el camino es el mismo para todos.
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAMAS.map((p) => (
              <motion.figure key={p.id} {...fadeUp()} className="group">
                <div className="relative aspect-square rounded-[24px] bg-white/[0.04] border border-white/10 flex items-center justify-center p-6 transition-colors group-hover:bg-white/[0.08]">
                  <LaelLogo ink="#FFFFFF" accent={p.color} title="" tagline={false} className="w-[78%] h-auto" />
                  <button
                    type="button"
                    onClick={() => descargar(p.id, { ink: '#FFFFFF', accent: p.color, bg: NAVY })}
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#071D49] flex items-center justify-center transition-colors"
                    aria-label={`Descargar logo de ${p.nombre} en SVG`}
                  >
                    <Download size={14} aria-hidden="true" />
                  </button>
                </div>
                <figcaption className="mt-3 flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="font-bold">{p.nombre}</span>
                  <span className="ml-auto font-mono text-xs text-white/50 uppercase">{p.color}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Paleta y tipografía */}
      <section className="bg-white py-20 sm:py-28">
        <div className={WRAP}>
          <motion.p {...fadeUp()} className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#071D49]/75">(04) — Color y letra</motion.p>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PALETA.map((c) => <Swatch key={c.hex} c={c} />)}
          </div>
          <div className="mt-16 grid lg:grid-cols-3 gap-px bg-[#071D49]/10 border-y border-[#071D49]/10">
            {[
              { f: 'Montserrat ExtraBold', uso: 'Títulos', cls: 'font-display font-extrabold tracking-[-0.04em]' },
              { f: 'Instrument Serif Italic', uso: 'La palabra que importa', cls: 'accent-serif' },
              { f: 'Inter', uso: 'Texto', cls: 'font-sans' },
            ].map((t) => (
              <div key={t.f} className="bg-white py-10 lg:px-8 first:lg:pl-0">
                <p className={`text-[#071D49] text-7xl sm:text-8xl leading-none ${t.cls}`}>Aa</p>
                <p className="mt-6 font-bold text-[#071D49]">{t.f}</p>
                <p className="text-sm text-[#071D49]/75">{t.uso}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
