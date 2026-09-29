import React from 'react';
import { motion } from 'framer-motion';
import BrandArcs from './BrandArcs';

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

export default function PageHero({ eyebrow, title, accent, children, align = 'center', size = 'md' }) {
  const sizes = {
    md: 'text-[2.35rem] leading-[1.02] sm:text-5xl lg:text-6xl',
    lg: 'text-[2.6rem] leading-[1] sm:text-6xl lg:text-7xl',
  };
  return (
    <section className="relative -mt-20 pt-36 sm:pt-44 pb-16 sm:pb-20 px-5 sm:px-6 bg-[#071D49] text-white overflow-hidden">
      <BrandArcs />
      <div className={`relative max-w-3xl mx-auto ${align === 'center' ? 'text-center' : ''}`}>
        {eyebrow && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-5 text-programa">
            <span className="w-1.5 h-1.5 rounded-full bg-programa" aria-hidden="true" />
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className={`font-display font-extrabold tracking-tight text-white mb-6 ${sizes[size]}`}
        >
          {title}
          {accent && <> <span className="accent-serif text-programa">{accent}</span></>}
        </motion.h1>
        {children && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
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
