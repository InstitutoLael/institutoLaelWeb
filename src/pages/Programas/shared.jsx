import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WordReveal from '../../components/ui/WordReveal';

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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
});

const BTN = 'inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all active:scale-95 text-center';
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

export function PageHero({ eyebrow, title, accent, desc, stats, children }) {
  return (
    <section className="relative -mt-20 pt-36 sm:pt-40 pb-16 sm:pb-24 px-5 sm:px-6 text-white overflow-hidden" style={{ backgroundColor: BLUE }}>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] opacity-25" style={{ backgroundColor: YELLOW }} aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: YELLOW }}>
          {eyebrow}
        </motion.p>
        <WordReveal
          className="font-display text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-6 sm:mb-8"
          delay={0.1}
          segments={[
            { text: title, breakAfter: 'sm' },
            { text: accent, style: { color: YELLOW } },
          ]}
        />
        <motion.p {...fadeUp(0.2)} className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {desc}
        </motion.p>
        {children && (
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            {children}
          </motion.div>
        )}
        {stats && (
          <motion.div {...fadeUp(0.4)} className="grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/10 pt-8 mt-12 sm:mt-14 max-w-xl mx-auto">
            {stats.map(([v, l]) => (
              <div key={l}>
                <p className="font-display font-extrabold text-lg sm:text-xl uppercase" style={{ color: YELLOW }}>{v}</p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">{l}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, desc, dark = false }) {
  return (
    <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
      {eyebrow && (
        <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={dark ? { color: YELLOW } : undefined}>
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05]">
        {title}
      </motion.h2>
      {desc && (
        <motion.p {...fadeUp(0.15)} className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-[#071D49]/70'}`}>
          {desc}
        </motion.p>
      )}
    </div>
  );
}

export function Faq({ items, title = 'Preguntas frecuentes' }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
      <div className="max-w-3xl mx-auto">
        <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-10 sm:mb-12">
          {title}
        </motion.h2>
        <div className="space-y-4">
          {items.map((faq, idx) => (
            <div key={faq.q} className="border border-[#071D49]/10 rounded-[24px] overflow-hidden bg-white">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left min-h-[56px]"
              >
                <span className="font-bold font-display uppercase tracking-tight pr-4 sm:pr-6">{faq.q}</span>
                <ChevronDown size={18} className={`flex-shrink-0 transition-transform ${open === idx ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                    <p className="px-5 sm:px-6 pb-6 text-[#071D49]/70 leading-relaxed">{faq.a}</p>
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
    <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white" style={{ backgroundColor: BLUE }}>
      <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
        {title} <br className="hidden sm:block" /> <span style={{ color: YELLOW }}>{accent}</span>
      </motion.h2>
      {desc && (
        <motion.p {...fadeUp(0.1)} className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {desc}
        </motion.p>
      )}
      <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
        {children}
      </motion.div>
    </section>
  );
}
