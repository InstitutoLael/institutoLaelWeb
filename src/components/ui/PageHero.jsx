import React from 'react';
import { motion } from 'framer-motion';
import WordReveal from './WordReveal';
import { Paloma } from './LaelLogo';
import { primeraPintura } from '../../lib/hidratacion';

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

// Props:
//  eyebrow, title, accent  → etiqueta y título (accent va en cursiva, color del programa)
//  heading                 → título ya armado (JSX), en vez de title/accent
//  children                → texto bajo el título (o lo que sea)
//  desc                    → párrafo (atajo de children)
//  actions                 → botones en fila
//  stats                   → [[valor, etiqueta], …] en una franja con línea arriba
//  aside                   → columna derecha (foto, tarjeta); oculta la onda
//  align: 'left' | 'center'; size: 'md' | 'lg'
export default function PageHero({ eyebrow, title, accent, heading, children, desc, actions, stats, aside, align = 'left', size = 'md', id }) {
  const sizes = {
    md: 'text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]',
    lg: 'text-[2.9rem] sm:text-7xl lg:text-8xl xl:text-[7rem]',
  };
  const centro = align === 'center' && !aside;
  // En una página pre-dibujada, la entrada va en CSS (igual que en el HTML)
  const [modo] = React.useState(() => (primeraPintura() ? 'css' : undefined));
  const ini = (v) => (modo ? false : v);
  const tituloCls = `font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-white mb-8 ${aside ? 'max-w-[14ch]' : 'max-w-[16ch]'} ${centro ? 'mx-auto' : ''} ${aside ? 'text-[2.6rem] sm:text-6xl lg:text-7xl' : sizes[size]}`;
  const cuerpo = (
    <>
      {eyebrow && (
        <motion.p initial={ini({ opacity: 0, y: 10 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-6 sm:mb-8 text-white/70 ${centro ? 'justify-center' : ''}`}>
          <span className="text-programa">Lael</span>
          <span className="w-8 h-px bg-white/30" aria-hidden="true" />
          {eyebrow}
        </motion.p>
      )}
      {heading ? (
        <motion.h1 initial={ini({ opacity: 0, y: 24 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className={`${tituloCls} [&_br]:hidden`}>
          {heading}
        </motion.h1>
      ) : (
        <WordReveal className={tituloCls} modo={modo} segments={[{ text: title }, ...(accent ? [{ text: accent, className: 'accent-serif text-programa' }] : [])]} />
      )}
      {(children || desc) && (
        <motion.div initial={ini({ opacity: 0, y: 12 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }} className={`page-hero-body text-white/75 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl ${centro ? 'mx-auto is-center' : ''}`}>
          {desc && <p>{desc}</p>}
          {children}
        </motion.div>
      )}
      {actions && (
        <motion.div initial={ini({ opacity: 0, y: 12 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease }} className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 ${centro ? 'justify-center' : ''}`}>
          {actions}
        </motion.div>
      )}
      {stats && (
        <motion.dl initial={ini({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className={`mt-12 sm:mt-16 grid grid-cols-3 gap-4 border-t border-white/15 pt-5 max-w-2xl ${centro ? 'mx-auto' : ''}`}>
          {stats.map(([v, l]) => (
            <div key={l} className="flex flex-col-reverse">
              <dt className="text-white/65 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] mt-1.5">{l}</dt>
              <dd className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight text-programa">{v}</dd>
            </div>
          ))}
        </motion.dl>
      )}
    </>
  );

  return (
    <section id={id} className="grain relative -mt-20 bg-[#071D49] text-white overflow-hidden">
      {!aside && (
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1440 600" preserveAspectRatio="xMaxYMax meet">
          <path d={ONDA_HERO} pathLength="1" className="lael-draw" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} fill="none" stroke="var(--programa)" strokeWidth="2" strokeLinecap="round" />
          <path d="M1140 -40 C 1170 80 1260 120 1370 92" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="24" strokeLinecap="round" />
          <g transform="translate(1336 330) scale(1.7) translate(-229 -48)">
            <Paloma fill="var(--programa)" className="lael-dove-in" style={{ animationDelay: '1.7s' }} />
          </g>
        </svg>
      )}
      <div className={`relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-44 pb-14 sm:pb-20 ${centro ? 'text-center' : ''}`}>
        {aside ? (
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
            <div className="lg:col-span-7">{cuerpo}</div>
            <motion.div initial={ini({ opacity: 0, y: 30 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }} className="lg:col-span-5">
              {aside}
            </motion.div>
          </div>
        ) : cuerpo}
      </div>
    </section>
  );
}

// Título de sección con palabra destacada. Etiqueta editorial (Lael — tema)
// y título grande con la palabra que importa en cursiva.
export function SectionTitle({ eyebrow, title, accent, dark = false, className = '', as: Tag = 'h2' }) {
  const centro = className.includes('text-center');
  return (
    <div className={className}>
      {eyebrow && (
        <motion.p {...fadeUp()} className={`flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-5 ${centro ? 'justify-center' : ''} ${dark ? 'text-white/70' : 'text-[#071D49]/75'}`}>
          <span aria-hidden="true" className={`w-8 h-px ${dark ? 'bg-programa' : 'bg-[#071D49]/40'}`} />
          {eyebrow}
        </motion.p>
      )}
      <motion.div {...fadeUp(0.04)}>
        <Tag className={`font-display font-extrabold tracking-[-0.04em] text-[2.2rem] sm:text-5xl lg:text-6xl leading-[0.98] ${dark ? 'text-white' : 'text-[#071D49]'}`}>
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
