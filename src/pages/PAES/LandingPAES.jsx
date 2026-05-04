import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PAES_FEATURES } from '../../data/paes';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

// Comparison row data
const COMPARE = [
  { feature: 'Enfoque', lael: 'Estrategia de rendimiento', other: 'Memorización temática' },
  { feature: 'Metodología', lael: 'Diagnóstico + Plan táctico', other: 'Clases masivas genéricas' },
  { feature: 'Seguimiento', lael: 'Mentor 1:1 en tiempo real', other: 'Respuestas lentas o nulas' },
  { feature: 'Simulacros', lael: 'Semanal bajo presión real', other: 'Esporádicos o sin feedback' },
];

export default function LandingPAES({ onStartDiagnosis }) {
  return (
    <div className="w-full bg-lael-primary">

      {/* ── HERO NARRATIVO ────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">
          Instituto Lael · Sistema de Rendimiento PAES
        </motion.p>

        <h1
          className="font-display text-5xl lg:text-7xl xl:text-8xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal"
          style={{ animationDelay: '0.15s' }}
        >
          No es un preuniversitario.<br />
          <span className="accent-italic">
            Es un sistema de rendimiento.
          </span>
        </h1>

        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
          Aquí no estudias más. Entrenas mejor. Cada sesión tiene un objetivo táctico, medible y con feedback inmediato.
        </motion.p>

        <motion.button
          {...fadeUp(0.55)}
          onClick={onStartDiagnosis}
          className="mt-14 bg-lael-accent text-white px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_4px_20px_rgba(196,151,62,0.3)] hover:-translate-y-1"
        >
          Iniciar diagnóstico
        </motion.button>

        <motion.div {...fadeUp(0.7)} className="flex gap-8 mt-12 justify-center">
          {['Diagnóstico', 'Estrategia', 'Activación'].map((item, i) => (
            <React.Fragment key={item}>
              <span className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase">{item}</span>
              {i < 2 && <span className="text-lael-muted/20">·</span>}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── PROBLEMA ──────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">
            El problema real
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-16 leading-tight">
            Estudiar más<br />no significa mejorar.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Horas sin estrategia', desc: 'Los estudiantes promedio dedican cientos de horas sin saber qué está fallando ni cómo corregirlo.' },
              { label: 'Clases masivas', desc: 'Un profesor para 30 alumnos no puede adaptar el ritmo a tu punto de partida ni a tu carrera objetivo.' },
              { label: 'Sin feedback real', desc: 'Estudiar sin corrección es practicar errores. El error sin diagnóstico se convierte en hábito.' },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-lael-secondary hover-card border border-lael-bd cinematic-shadow">
                <p className="text-lael-rust text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">{item.label}</p>
                <p className="text-lael-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIA: SISTEMA VS CLASES ──────────────────────────────── */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">
            La diferencia
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-16">
            Sistema de rendimiento vs clases tradicionales
          </motion.h2>

          <motion.div {...fadeUp(0.2)} className="rounded-2xl border border-lael-bd overflow-hidden cinematic-shadow">
            <div className="grid grid-cols-3 bg-lael-secondary px-8 py-4 border-b border-lael-bd">
              <p className="text-[10px] tracking-[0.2em] text-lael-muted uppercase font-bold">Aspecto</p>
              <p className="text-[10px] tracking-[0.2em] text-lael-accent uppercase font-bold">Lael</p>
              <p className="text-[10px] tracking-[0.2em] text-lael-muted uppercase font-bold">Otros</p>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 px-8 py-5 ${i % 2 === 0 ? 'bg-lael-primary' : 'bg-lael-secondary'} border-b border-lael-bd last:border-0`}>
                <p className="text-[11px] text-lael-muted tracking-wider font-bold">{row.feature}</p>
                <p className="text-[11px] text-lael-light font-bold tracking-wide">{row.lael}</p>
                <p className="text-[11px] text-lael-muted tracking-wide">{row.other}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALOR INCLUIDO ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">
            Tu sistema incluye
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-16">
            Todo lo que necesitas para rendir mejor.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAES_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.08)} className="flex gap-6 p-8 rounded-2xl bg-lael-secondary border border-lael-bd hover-card cinematic-shadow">
                <span className="text-3xl flex-shrink-0 text-lael-accent">{f.icon}</span>
                <div>
                  <h3 className="text-lael-light font-semibold mb-2">{f.title}</h3>
                  <p className="text-lael-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSICIÓN AL SISTEMA ──────────────────────────────────────── */}
      <section className="relative w-full px-6 py-20 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6">Siguiente paso</p>
          <h2 className="font-display text-4xl lg:text-5xl text-lael-light font-bold mb-8">
            Configura tu sistema ahora.
          </h2>
          <p className="text-lael-muted/60 text-base mb-12 leading-relaxed">
            Ingresa tus datos, selecciona tus pruebas y recibe tu propuesta de inversión en menos de 2 minutos.
          </p>
          <button
            onClick={onStartDiagnosis}
            className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-white transition-all duration-500"
          >
            Iniciar diagnóstico →
          </button>
        </motion.div>

        {/* Visual divider */}
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
