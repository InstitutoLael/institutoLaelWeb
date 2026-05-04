import React from 'react';
import { motion } from 'framer-motion';
import { LANGUAGES, LANG_FEATURES } from '../../data/idiomas';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

export default function LandingIdiomas({ onConfigure }) {
  return (
    <div className="w-full bg-[#0B0B0B]">
      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">Instituto Lael · Programas de Idiomas</motion.p>
        <motion.h1 {...fadeUp(0.15)} className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl">
          No aprendes idiomas.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light via-lael-accent to-lael-light/50">Ejecutas sistemas de comunicación.</span>
        </motion.h1>
        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base max-w-xl mx-auto leading-relaxed">Sin repetición mecánica. Solo simulaciones reales que te preparan para comunicarte en cualquier entorno.</motion.p>
        <motion.button {...fadeUp(0.55)} onClick={onConfigure} className="mt-14 bg-lael-accent text-lael-primary px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(198,166,107,0.25)]">Configurar mi programa</motion.button>
      </section>

      {/* DIFERENCIA */}
      <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center border-t border-white/[0.03]">
        <div className="w-full max-w-4xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Por qué es diferente</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-16">Simulación real, no clases pasivas.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANG_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)} className="p-8 border border-white/5 rounded-2xl bg-[#080808]">
                <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-4">{f.title}</p>
                <p className="text-lael-muted/70 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMAS PREVIEW */}
      <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center border-t border-white/[0.03]">
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Programas disponibles</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16">Elige tu sistema de comunicación.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANGUAGES.map((lang, i) => (
              <motion.div key={lang.id} {...fadeUp(i * 0.1)} className="p-8 border border-white/5 rounded-2xl bg-[#080808]">
                <p className="text-[10px] tracking-[0.2em] text-lael-accent uppercase mb-2">{lang.badge}</p>
                <h3 className="font-display text-xl text-lael-light font-bold mb-4">{lang.name}</h3>
                <p className="text-lael-muted/60 text-sm leading-relaxed mb-6">{lang.summary}</p>
                <div className="space-y-1">{lang.levels.map(lvl => <p key={lvl} className="text-[10px] text-lael-muted/40">· {lvl}</p>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSICIÓN */}
      <section className="w-full px-6 py-32 flex flex-col items-center border-t border-white/[0.03]">
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <h2 className="font-display text-4xl text-lael-light font-bold mb-8">Configura tu programa ahora.</h2>
          <button onClick={onConfigure} className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-lael-primary transition-all duration-500">Configurar programa →</button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
