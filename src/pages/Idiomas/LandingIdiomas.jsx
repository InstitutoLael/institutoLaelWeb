import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
    <div className="w-full bg-lael-primary">
      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">Instituto Lael · Programas de Idiomas</motion.p>
        <h1 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal" style={{ animationDelay: '0.15s' }}>
          No aprendes idiomas.<br />
          <span className="accent-italic">Ejecutas sistemas de comunicación.</span>
        </h1>
        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base max-w-xl mx-auto leading-relaxed">Sin repetición mecánica. Solo simulaciones reales que te preparan para comunicarte en cualquier entorno.</motion.p>
        <motion.button {...fadeUp(0.55)} onClick={onConfigure} className="mt-14 bg-lael-accent text-white px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)]">Configurar mi programa</motion.button>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* DIFERENCIA */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Por qué es diferente</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-16">Simulación real, no clases pasivas.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANG_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-lael-secondary hover-card border border-lael-bd cinematic-shadow">
                <p className="text-lael-rust text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">{f.title}</p>
                <p className="text-lael-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center bg-lael-secondary border-y border-lael-bd cinematic-shadow">
        <div className="w-full max-w-4xl text-center">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6">El Método</p>
          <h2 className="font-display text-4xl lg:text-5xl text-lael-light font-bold mb-10">
            Hackeando el proceso de aprendizaje.
          </h2>
          <div className="text-lael-muted text-sm leading-relaxed max-w-2xl mx-auto space-y-6">
            <p>
              Estudiar gramática en una pizarra durante años y no poder pedir un café es el estándar de la educación tradicional. En Lael, vemos los idiomas como <strong>códigos de software</strong>.
            </p>
            <p>
              Primero instalamos la estructura básica (el algoritmo). Luego, saturamos tus sentidos con simulaciones reales (los datos). El resultado: tu cerebro decodifica el idioma automáticamente, sin necesidad de traducir palabra por palabra.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
            {[
              { num: '01', title: 'Inmersión' },
              { num: '02', title: 'Estructura' },
              { num: '03', title: 'Simulación' },
              { num: '04', title: 'Fluidez' }
            ].map(step => (
              <div key={step.num}>
                <p className="font-display text-4xl text-lael-accent/40 font-bold mb-2">{step.num}</p>
                <p className="text-[11px] tracking-wider text-lael-light uppercase font-bold">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMAS PREVIEW */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Programas disponibles</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16">Elige tu sistema de comunicación.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANGUAGES.map((lang, i) => (
              <motion.div key={lang.id} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-lael-secondary hover-card border border-lael-bd cinematic-shadow">
                <p className="text-[10px] tracking-[0.2em] text-lael-accent uppercase mb-2 font-bold">{lang.badge}</p>
                <h3 className="font-display text-xl text-lael-light font-bold mb-4">{lang.name}</h3>
                <p className="text-lael-muted text-sm leading-relaxed mb-6">{lang.summary}</p>
                <div className="space-y-1">{lang.levels.map(lvl => <p key={lvl} className="text-[10px] text-lael-muted">· {lvl}</p>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUEVO: RESULTADOS Y ESCENARIOS ────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center">Output Real</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-20">¿Qué serás capaz de hacer?</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <motion.div {...fadeUp(0.2)} className="space-y-8">
                <h3 className="font-display text-2xl text-lael-light italic">Escenarios de Simulación</h3>
                <div className="space-y-4">
                   {[
                      { icon: "💼", title: "Entrevistas Laborales", desc: "Simulamos procesos de selección reales en el idioma objetivo." },
                      { icon: "✈️", title: "Inmersión en Viajes", desc: "Desde pedir ayuda médica hasta negociar en un mercado local." },
                      { icon: "🤝", title: "Networking Profesional", desc: "Cómo presentar tu proyecto y cerrar acuerdos estratégicos." }
                   ].map(s => (
                      <div key={s.title} className="flex gap-4 p-6 bg-lael-secondary rounded-xl border border-lael-bd">
                         <span className="text-2xl">{s.icon}</span>
                         <div>
                            <p className="text-lael-light font-bold text-sm mb-1">{s.title}</p>
                            <p className="text-lael-muted text-xs leading-relaxed">{s.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>

             <motion.div {...fadeUp(0.4)} className="p-10 bg-lael-accent rounded-3xl text-white flex flex-col justify-center">
                <h3 className="font-display text-3xl mb-8">Tiempo Estimado de Ejecución</h3>
                <div className="space-y-6">
                   <div>
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Conversación Básica</p>
                      <p className="text-2xl font-bold italic">3 a 6 meses</p>
                   </div>
                   <div className="w-full h-px bg-white/20"></div>
                   <div>
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Fluidez Profesional</p>
                      <p className="text-2xl font-bold italic">12 a 18 meses</p>
                   </div>
                </div>
                <p className="mt-10 text-[10px] text-white/50 italic">* Basado en un entrenamiento de 4 horas semanales + inmersión pasiva.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSICIÓN */}
      <section className="relative w-full px-6 py-20 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <h2 className="font-display text-4xl text-lael-light font-bold mb-8">Configura tu programa ahora.</h2>
          <button onClick={onConfigure} className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-white transition-all duration-500">Configurar programa →</button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
