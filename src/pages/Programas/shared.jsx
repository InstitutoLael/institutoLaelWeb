import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SitePageHero from '../../components/ui/PageHero';

// Piezas compartidas por las páginas de programas nuevos (/reforzamiento,
// /orientacion, /apoderados, /ensayo-gratis, /talleres-ia, /alianzas,
// /trae-un-amigo, /alumnos). Mismo estilo que /verano, /empresas y /adultos.

export const BLUE = '#071D49';
export const YELLOW = '#D7E400';
export const WHATSAPP_NUMBER = '56964626568';

export const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
export const inscripcionLink = (programa) => `/inscripcion?programa=${programa}`;

const ease = [0.16, 1, 0.3, 1];
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease },
});

const BTN = 'inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[52px] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-colors active:scale-95 text-center';
export const BTN_STYLES = {
  yellow: `${BTN} bg-[#D7E400] text-[#071D49] hover:bg-white`,
  yellowOnLight: `${BTN} bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white`,
  navy: `${BTN} bg-[#071D49] text-white hover:bg-[#0B2A66]`,
  outlineDark: `${BTN} border border-white/25 hover:border-white text-white`,
  outlineLight: `${BTN} border-2 border-[#071D49]/20 hover:border-[#071D49] text-[#071D49]`,
};

// Botón que decide solo si es ruta interna (/...), ancla (#...) o enlace externo.
export function Btn({ href, variant = 'yellow', children, className = '', ...rest }) {
  const cls = `${BTN_STYLES[variant]} ${className}`;
  if (href.startsWith('/')) return <Link to={href} className={cls} {...rest}>{children}</Link>;
  if (href.startsWith('#')) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{children}</a>;
}

// La portada es la misma de todo el sitio (components/ui/PageHero)
export function PageHero({ eyebrow, title, accent, desc, stats, children }) {
  return <SitePageHero eyebrow={eyebrow} title={title} accent={accent} desc={desc} stats={stats} actions={children} />;
}

export function SectionHead({ eyebrow, title, desc, dark = false }) {
  return (
    <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
      {eyebrow && (
        <motion.p {...fadeUp(0)} className={`flex items-center justify-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-5 ${dark ? 'text-white/70' : 'text-[#071D49]/75'}`}>
          <span aria-hidden="true" className={`w-8 h-px ${dark ? 'bg-programa' : 'bg-[#071D49]/40'}`} />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 {...fadeUp(0.1)} className="font-display text-[2.2rem] sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[0.98]">
        {title}
      </motion.h2>
      {desc && (
        <motion.p {...fadeUp(0.15)} className={`mt-6 text-base sm:text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-[#071D49]/70'}`}>
          {desc}
        </motion.p>
      )}
    </div>
  );
}

// Preguntas frecuentes: título a la izquierda (fijo al bajar en computador)
// y las preguntas como filas que se abren.
export function Faq({ items, title = 'Preguntas frecuentes' }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <motion.h2 {...fadeUp(0)} className="lg:sticky lg:top-32 font-display text-[2.2rem] sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[0.98]">
            {title}
          </motion.h2>
        </div>
        <div className="lg:col-span-7 border-t border-[#071D49]/15">
          {items.map((faq, idx) => (
            <div key={faq.q} className="border-b border-[#071D49]/15">
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                className="w-full flex items-center gap-4 sm:gap-5 py-6 text-left min-h-[56px]"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-[#071D49]/70 w-6 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-display font-extrabold text-lg sm:text-xl tracking-tight">{faq.q}</span>
                <span aria-hidden="true" className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === idx ? 'rotate-45 bg-[#D7E400] border-[#D7E400] text-[#071D49]' : 'border-[#071D49]/20'}`}><Plus size={18} /></span>
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                    <p className="pl-10 sm:pl-11 pr-14 pb-7 text-base sm:text-lg text-[#071D49]/75 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, accent, desc, children }) {
  return (
    <section className="grain px-5 sm:px-8 lg:px-12 py-20 sm:py-28 text-white" style={{ backgroundColor: BLUE }}>
      <div className="max-w-[1600px] mx-auto">
        <motion.h2 {...fadeUp(0)} className="font-display font-extrabold tracking-[-0.045em] leading-[0.92] mb-8 max-w-5xl text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-8xl">
          {title} <span className="accent-serif text-programa">{accent}</span>
        </motion.h2>
        {desc && (
          <motion.p {...fadeUp(0.1)} className="text-white/75 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
            {desc}
          </motion.p>
        )}
        <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
