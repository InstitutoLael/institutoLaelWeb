import React from 'react';
import { motion } from 'framer-motion';
import WordReveal from './WordReveal';
import { Paloma } from './LaelLogo';

// Portada estándar de las páginas: fondo azul, arcos de la marca, etiqueta
// en el color del programa y título con una palabra en cursiva elegante.
//
// title: texto normal. accent: la parte que va en cursiva (opcional).
export const ease = [0.16, 1, 0.3, 1];

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease },
});

// Onda de la marca que cruza la portada y termina en la paloma
// (va solo por la mitad derecha, para no cruzar el texto)
const ONDA_HERO = 'M760 640 C 880 560 900 430 1030 430 C 1160 430 1190 530 1280 480 C 1325 455 1340 395 1336 330';

export default function PageHero({ eyebrow, title, accent, children, align = 'left', size = 'md' }) {
  const sizes = {
    md: 'text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]',
    lg: 'text-[2.9rem] sm:text-7xl lg:text-8xl xl:text-[7rem]',
  };
  const centro = align === 'center';
  return (
    <section className="grain relative -mt-20 bg-[#071D49] text-white overflow-hidden">
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1440 600" preserveAspectRatio="xMaxYMax slice">
        <path d={ONDA_HERO} pathLength="1" className="lael-draw" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} fill="none" stroke="var(--programa)" strokeWidth="2" strokeLinecap="round" />
        <path d="M1140 -40 C 1170 80 1260 120 1370 92" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="24" strokeLinecap="round" />
        <g transform="translate(1336 330) scale(1.7) translate(-229 -48)">
          <Paloma fill="var(--programa)" className="lael-dove-in" style={{ animationDelay: '1.7s' }} />
        </g>
      </svg>
      <div className={`relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-44 pb-14 sm:pb-20 ${centro ? 'text-center' : ''}`}>
        {eyebrow && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-6 sm:mb-8 text-white/60 ${centro ? 'justify-center' : ''}`}>
            <span className="text-programa">Lael</span>
            <span className="w-8 h-px bg-white/30" aria-hidden="true" />
            {eyebrow}
          </motion.p>
        )}
        <WordReveal
          className={`font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-white mb-8 max-w-[16ch] ${centro ? 'mx-auto' : ''} ${sizes[size]}`}
          segments={[{ text: title }, ...(accent ? [{ text: accent, className: 'accent-serif text-programa' }] : [])]}
        />
        {children && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }} className={`page-hero-body text-white/75 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl ${centro ? 'mx-auto is-center' : ''}`}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Título de sección con palabra destacada
export function SectionTitle({ eyebrow, title, accent, dark = false, className = '', as: Tag = 'h2' }) {
  return (
    <div className={className}>
      {eyebrow && (
        <motion.p {...fadeUp()} className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-3 ${dark ? 'text-programa' : 'text-[#071D49]'}`}>
          <span aria-hidden="true" className={`inline-block w-5 h-1.5 rounded-full ${dark ? 'bg-programa' : 'bg-[#D7E400]'}`} />
          {eyebrow}
        </motion.p>
      )}
      <motion.div {...fadeUp(0.04)}>
        <Tag className={`font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.05] ${dark ? 'text-white' : 'text-[#071D49]'}`}>
          {title}{accent && <> <span className={`accent-serif ${dark ? 'text-programa' : ''}`}>{accent}</span></>}
        </Tag>
      </motion.div>
    </div>
  );
}

export const SECTION = 'px-5 sm:px-6 py-16 sm:py-20 lg:py-24';
export const BTN = 'inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95';
export const BTN_YELLOW = `${BTN} bg-[#D7E400] text-[#071D49] hover:bg-[#c4d000]`;
export const BTN_BLUE = `${BTN} bg-[#071D49] text-white hover:bg-[#0B2A66]`;
