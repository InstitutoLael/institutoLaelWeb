import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PAES_FEATURES } from '../../data/paes';
import { useNavigate } from 'react-router-dom';

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
  { feature: 'Seguimiento', lael: 'Estratega asignado 1:1', other: 'Respuestas lentas o nulas' },
  { feature: 'Simulaciones', lael: 'Sesión semanal de presión', other: 'Esporádicos o sin feedback' },
];

export default function LandingPAES() {
  const navigate = useNavigate();

  const startDiagnostic = () => {
    navigate('/diagnostico');
  };

  return (
    <div className="w-full bg-lael-primary">

      {/* ── HERO NARRATIVO ────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8 font-bold">
          Arquitectura de Puntaje PAES
        </motion.p>

        <h1
          className="font-display text-5xl lg:text-7xl xl:text-8xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal"
          style={{ animationDelay: '0.15s' }}
        >
          No estudias más.<br />
          <span className="accent-italic">
            Entrenas mejor.
          </span>
        </h1>

        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
          Si crees que la solución es más materia, este sistema no es para ti. Aquí hackeamos tu rendimiento mediante diagnóstico y sesiones tácticas.
        </motion.p>

        <motion.button
          {...fadeUp(0.55)}
          onClick={startDiagnostic}
          className="mt-14 bg-lael-accent text-white px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_4px_20px_rgba(196,151,62,0.3)] hover:-translate-y-1"
        >
          Iniciar diagnóstico táctico
        </motion.button>

        <motion.div {...fadeUp(0.7)} className="flex gap-4 md:gap-8 mt-12 justify-center">
          {['Diagnóstico', 'Estrategia', 'Activación'].map((item, i) => (
            <React.Fragment key={item}>
              <span className="text-[11px] md:text-sm tracking-[0.2em] text-lael-accent font-bold uppercase">{item}</span>
              {i < 2 && <span className="text-lael-accent/40">·</span>}
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

      {/* ── NUEVO: RESULTADOS MEDIBLES ────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center">Data Real</motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0.1)}>
              <h2 className="font-display text-4xl text-lael-light mb-8">Resultados que puedes medir.</h2>
              <p className="text-lael-muted leading-relaxed mb-8">
                No prometemos "aprender". Prometemos rendimiento. El 92% de nuestros alumnos sube al menos 120 puntos en su diagnóstico tras el primer ciclo de activación.
              </p>
              <div className="flex gap-12">
                 <div>
                    <p className="text-3xl font-display text-lael-accent font-bold">+120</p>
                    <p className="text-[10px] text-lael-muted uppercase tracking-widest">Puntos promedio</p>
                 </div>
                 <div>
                    <p className="text-3xl font-display text-lael-accent font-bold">92%</p>
                    <p className="text-[10px] text-lael-muted uppercase tracking-widest">Tasa de mejora</p>
                 </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="p-8 bg-lael-primary rounded-2xl border border-lael-bd relative overflow-hidden">
               {/* Shell de gráfico simple */}
               <div className="flex items-end gap-3 h-48 border-b border-lael-bd pb-2">
                  <div className="w-full bg-lael-accent/20 h-1/4 rounded-t-lg transition-all duration-1000 group-hover:h-1/4"></div>
                  <div className="w-full bg-lael-accent/40 h-2/4 rounded-t-lg"></div>
                  <div className="w-full bg-lael-accent/60 h-3/4 rounded-t-lg"></div>
                  <div className="w-full bg-lael-accent h-full rounded-t-lg"></div>
               </div>
               <p className="text-center mt-6 text-[10px] text-lael-muted uppercase tracking-[0.2em]">Evolución Típica · Ciclo 1 a 4</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NUEVO: CÓMO SE VE UNA SEMANA ────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Visualiza tu entrenamiento</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-20 leading-tight">
            Una semana en el Sistema PAES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <motion.div {...fadeUp(0.2)} className="p-10 bg-lael-secondary rounded-2xl border border-lael-bd">
                <h4 className="text-lael-accent font-bold mb-6 text-sm uppercase tracking-widest">Lunes a Jueves</h4>
                <p className="text-lael-light font-bold mb-4">Módulos de Activación</p>
                <p className="text-lael-muted text-sm leading-relaxed mb-6">Clases en vivo vía Zoom enfocadas en resolución táctica de ejercicios. Horarios de tarde para compatibilizar con el colegio.</p>
                <span className="text-[10px] text-lael-muted italic">18:00 - 20:00 hrs</span>
             </motion.div>
             <motion.div {...fadeUp(0.3)} className="p-10 bg-lael-secondary rounded-2xl border border-lael-bd relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-lael-accent/10 text-lael-accent text-[9px] font-bold uppercase tracking-tighter">Crítico</div>
                <h4 className="text-lael-accent font-bold mb-6 text-sm uppercase tracking-widest">Viernes</h4>
                <p className="text-lael-light font-bold mb-4">Simulacro de Presión</p>
                <p className="text-lael-muted text-sm leading-relaxed mb-6">Ensayo semanal cronometrado. No evaluamos conocimiento, evaluamos gestión del tiempo y ansiedad.</p>
                <span className="text-[10px] text-lael-muted italic">Tiempo real PAES</span>
             </motion.div>
             <motion.div {...fadeUp(0.4)} className="p-10 bg-lael-secondary rounded-2xl border border-lael-bd">
                <h4 className="text-lael-accent font-bold mb-6 text-sm uppercase tracking-widest">Sábado</h4>
                <p className="text-lael-light font-bold mb-4">Feedback & Estrategia</p>
                <p className="text-lael-muted text-sm leading-relaxed mb-6">Sesión de análisis de resultados con tu mentor. Recalibramos tu plan para la semana siguiente.</p>
                <span className="text-[10px] text-lael-muted italic">Individual / Grupal</span>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── NUEVO: OBJECIONES ────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-t border-lael-bd">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center">Dudas frecuentes</motion.p>
          <div className="space-y-6">
             {[
                { q: "¿Es 100% online?", a: "Sí. No perdemos tiempo en traslados. Todo sucede en nuestra Aula Virtual y vía Zoom en vivo." },
                { q: "¿Puedo entrar si voy en 3ro medio?", a: "Absolutamente. De hecho, es el momento ideal para empezar el diagnóstico sin la presión del último año." },
                { q: "¿Qué pasa si falto a una clase?", a: "Todas las sesiones de activación quedan grabadas y disponibles en tu perfil de alumno por 7 días." }
             ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="p-8 bg-lael-primary rounded-2xl border border-lael-bd">
                   <h4 className="text-lael-light font-bold mb-4 text-base">{item.q}</h4>
                   <p className="text-lael-muted text-sm leading-relaxed">{item.a}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ── TRANSICIÓN AL SISTEMA ──────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
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
            onClick={startDiagnostic}
            className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-white transition-all duration-500"
          >
            Iniciar diagnóstico táctico →
          </button>
        </motion.div>

        {/* Visual divider */}
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
