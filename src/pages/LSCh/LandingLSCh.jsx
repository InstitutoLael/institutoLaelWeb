import React from 'react';
import { motion } from 'framer-motion';
import { LSCH_WHY_US, TEACHER_PROFILE, COMPARISON_DATA } from '../../data/lsch';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

export default function LandingLSCh({ onChoosePlan }) {
  return (
    <div className="w-full bg-[#0B0B0B]">

      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">Instituto Lael · Lengua de Señas Chilena</motion.p>
        <h1 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal" style={{ opacity: 0, animationDelay: '0.15s' }}>
          El idioma que<br />
          <span className="accent-italic">elimina barreras.</span>
        </h1>
        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
          No es aprender señas. Es aprender a comunicarte con quienes el mundo ignora.
        </motion.p>
        <motion.button {...fadeUp(0.55)} onClick={onChoosePlan}
          className="mt-14 bg-lael-accent text-lael-primary px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(198,166,107,0.25)]">
          Elegir mi plan
        </motion.button>
        <motion.div {...fadeUp(0.7)} className="flex gap-8 mt-12 justify-center">
          {['Ley 21.015', 'Cultura Sorda', 'Instructora Nativa'].map((item, i) => (
            <React.Fragment key={item}>
              <span className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase">{item}</span>
              {i < 2 && <span className="text-lael-muted/20">·</span>}
            </React.Fragment>
          ))}
        </motion.div>
      </section>

      {/* IMPACTO EMOCIONAL */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-3xl text-center">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6">Por qué importa</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold leading-tight mb-10">
            En Chile, más de 400.000 personas Sordas no pueden acceder a servicios básicos por falta de comunicación.
          </motion.h2>
          <motion.p {...fadeUp(0.25)} className="text-lael-muted text-base leading-relaxed">
            Aprender LSCh no es un hobby. Es un acto de inclusión activa. Cada seña que aprendes abre una puerta que el sistema dejó cerrada.
          </motion.p>
        </div>
      </section>

      {/* DIFERENCIA */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Por qué Lael</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16">Cultura Sorda + metodología real.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LSCH_WHY_US.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-[#080808] hover-card">
                <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-4">{item.title}</p>
                <p className="text-lael-muted/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FERNANDA */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6">Quien te enseña</p>
            <h2 className="font-display text-4xl lg:text-5xl text-lael-light font-bold mb-4">{TEACHER_PROFILE.name}</h2>
            <p className="text-lael-muted/50 text-[11px] tracking-[0.15em] uppercase mb-8">{TEACHER_PROFILE.role}</p>
            <p className="text-lael-muted leading-relaxed text-base mb-8">{TEACHER_PROFILE.bio}</p>
            <div className="flex flex-wrap gap-2">
              {TEACHER_PROFILE.badges.map(b => (
                <span key={b} className="text-[10px] tracking-[0.12em] text-lael-accent border border-lael-accent/30 px-3 py-1 rounded-full uppercase">{b}</span>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="bg-[#080808] border border-white/5 rounded-2xl p-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-lael-muted/40 mb-6">Esto no es un curso. Es acceso cultural real.</p>
            <div className="space-y-0">
              <div className="grid grid-cols-3 pb-4 mb-2">
                <p className="text-[9px] tracking-[0.15em] text-lael-muted/30 uppercase">Aspecto</p>
                <p className="text-[9px] tracking-[0.15em] text-lael-accent uppercase">Lael</p>
                <p className="text-[9px] tracking-[0.15em] text-lael-muted/30 uppercase">Otros</p>
              </div>
              {COMPARISON_DATA.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 py-4 border-t border-white/[0.04] ${i === COMPARISON_DATA.length - 1 ? '' : ''}`}>
                  <p className="text-[11px] text-lael-muted/50">{row.feature}</p>
                  <p className="text-[11px] text-lael-accent font-medium">{row.us}</p>
                  <p className="text-[11px] text-lael-muted/30">{row.others}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRANSICIÓN */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <h2 className="font-display text-4xl text-lael-light font-bold mb-8">Elige tu plan y comienza hoy.</h2>
          <button onClick={onChoosePlan} className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-lael-primary transition-all duration-500">
            Elegir plan →
          </button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
