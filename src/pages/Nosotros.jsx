import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

const VALUES = [
  { title: 'Fe Activa', desc: 'No como dogma, sino como motor. Creemos que lo que hacemos tiene un propósito que trasciende el puntaje.' },
  { title: 'Accesibilidad Radical', desc: 'Nacimos gratis. Esa convicción no cambia aunque el modelo escale. El conocimiento no puede ser solo para quienes pueden pagarlo.' },
  { title: 'Excelencia sin Excusa', desc: 'Contexto difícil no es razón para resultados mediocres. Exigimos lo mismo que exige el sistema, pero con mejores herramientas.' },
  { title: 'Inclusión Real', desc: 'LSCh no es un producto más. Es nuestra postura frente a un mundo que excluye. La comunicación es un derecho.' },
];

export default function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Quiénes Somos | Instituto Lael — Educación con Propósito</title>
        <meta name="description" content="Nacimos en 2021 como preuniversitario gratuito. Llegamos a 600 estudiantes simultáneos. Conoce la historia y misión de Instituto Lael." />
      </Helmet>

      <main className="bg-[#0B0B0B] min-h-screen">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">Instituto Lael · Chile · 2021</motion.p>
          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-3xl"
          >
            Nuestra Historia
          </motion.h1>
          <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base lg:text-lg max-w-lg mx-auto leading-relaxed">
            Fe Activa · Accesibilidad Radical · Excelencia sin Excusa
          </motion.p>
        </section>

        {/* ── ORIGEN ────────────────────────────────────────────────── */}
        <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center border-t border-white/[0.03]">
          <div className="w-full max-w-3xl">
            <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">El origen</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold leading-tight mb-12">
              Nacimos sin financiamiento.<br />Solo convicción.
            </motion.h2>
            <motion.div {...fadeUp(0.2)} className="space-y-6 text-lael-muted text-base leading-relaxed">
              <p>
                En 2021, en plena pandemia, un grupo de jóvenes en Santiago decidió que la brecha educacional no era inevitable. Sin aula. Sin financiamiento. Sin precedente.
              </p>
              <p>
                Empezamos con clases de PAES gratuitas a través de redes sociales. En semanas pasamos de decenas a cientos de estudiantes. En meses, llegamos a <span className="text-lael-light font-semibold">600 estudiantes simultáneos</span>, todos sin pagar un peso.
              </p>
              <p>
                Ese número no es un logro de marketing. Es una señal de que algo estaba roto en el sistema, y que había gente esperando que alguien lo dijera en voz alta.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MISIÓN ────────────────────────────────────────────────── */}
        <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center border-t border-white/[0.03]">
          <div className="w-full max-w-3xl text-center">
            <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Misión</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold leading-tight">
              "Formar sistemas de rendimiento accesibles para quienes el sistema educacional tradicional dejó atrás."
            </motion.h2>
          </div>
        </section>

        {/* ── VALORES ───────────────────────────────────────────────── */}
        <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center border-t border-white/[0.03]">
          <div className="w-full max-w-5xl">
            <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Valores</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16">
              Lo que nos mueve.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map((v, i) => (
                <motion.div key={v.title} {...fadeUp(i * 0.1)} className="p-8 lg:p-10 border border-white/5 rounded-2xl bg-[#080808]">
                  <h3 className="font-display text-xl text-lael-accent font-bold mb-4">{v.title}</h3>
                  <p className="text-lael-muted/70 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUNDADOR ──────────────────────────────────────────────── */}
        <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center border-t border-white/[0.03]">
          <div className="w-full max-w-3xl">
            <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Fundador</motion.p>
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2 space-y-6 text-lael-muted text-base leading-relaxed">
                <h2 className="font-display text-3xl lg:text-4xl text-lael-light font-bold">Diego Chaparro</h2>
                <p className="text-lael-muted/50 text-[11px] tracking-[0.15em] uppercase">27 años · Santiago, Chile</p>
                <p>
                  Empecé Lael a los 23 años, convencido de que la educación de calidad no debía ser un privilegio económico. La pandemia nos dio el empujón digital que necesitábamos.
                </p>
                <p>
                  Lo que empezó como clases de PAES gratuitas se convirtió en un sistema: idiomas, señas, preparación estratégica. No porque lo planificamos así, sino porque la demanda fue real y urgente.
                </p>
                <p className="text-lael-light font-medium">
                  Hoy Instituto Lael es una empresa, pero la convicción original no cambió: que cada persona tiene derecho a las herramientas para alcanzar su potencial.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {['2021 — Fundación', '600+ Estudiantes simultáneos', 'PAES · Idiomas · LSCh', 'Santiago, Chile'].map(item => (
                  <div key={item} className="p-4 border border-white/5 rounded-xl bg-[#080808]">
                    <p className="text-[11px] tracking-[0.1em] text-lael-muted/60">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── VERSÍCULO ─────────────────────────────────────────────── */}
        <section className="w-full px-6 py-24 flex flex-col items-center border-t border-white/[0.03]">
          <motion.div {...fadeUp(0)} className="text-center max-w-xl">
            <p className="font-display text-xl text-lael-muted/40 italic leading-relaxed">
              "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres."
            </p>
            <p className="mt-4 text-[10px] tracking-[0.2em] text-lael-muted/30 uppercase">Lucas 4:18</p>
          </motion.div>
        </section>
      </main>
    </>
  );
}
