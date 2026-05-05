import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PAES_FEATURES } from '../../data/paes';
import { useNavigate } from 'react-router-dom';
import paesMentor from '../../assets/img/Home/paes_mentor_strategy_1777948898105.png';
import paesBg from '../../assets/img/Home/mundo_paes_bg_1777943419260.png';

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

      {/* ── 1. HERO NARRATIVO (CINEMÁTICO) ─────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lael-primary/40 via-lael-primary/70 to-lael-primary z-10" />
          {/* Note: hero_paes_mentor will be placed here when available */}
          <div className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-1000" 
            style={{ backgroundImage: `url(${paesBg})` }} /> 
        </div>

        <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div {...fadeUp()} className="mb-10">
             <h2 className="text-lael-accent font-display text-2xl lg:text-3xl italic italic-playfair font-normal">
                ¿Estudias harto pero tu puntaje no sube?
             </h2>
          </motion.div>

          <h1 className="font-display text-5xl lg:text-7xl xl:text-9xl tracking-[-0.04em] text-lael-light font-bold leading-[0.9] max-w-5xl clip-reveal mb-12">
            Te enseñamos a <br />
            <span className="accent-italic">hackear la PAES.</span>
          </h1>

          <motion.p {...fadeUp(0.35)} className="mt-12 text-lael-muted text-lg lg:text-xl max-w-xl mx-auto leading-relaxed mb-14">
             No es materia, es estrategia. Corregimos lo que estás haciendo mal el día de la prueba. <br className="hidden md:block" /> ¿Cuál es tu situación hoy?
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/diagnostico', { state: { path: 'stagnation' } })}
              className="bg-lael-accent text-white px-8 py-5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all shadow-xl">
              Estoy estancado
            </button>
            <button onClick={() => navigate('/diagnostico', { state: { path: 'target' } })}
              className="bg-lael-secondary border border-lael-bd text-lael-light px-8 py-5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all">
              Voy por carrera de élite
            </button>
            <button onClick={() => navigate('/diagnostico', { state: { path: 'lost' } })}
              className="bg-transparent border border-lael-accent/30 text-lael-accent px-8 py-5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all">
              No sé por dónde empezar
            </button>
          </motion.div>

          <motion.p {...fadeUp(0.8)} className="mt-12 text-[10px] uppercase tracking-[0.3em] text-lael-rust font-bold">
            ⚠ Si no entras hoy, pierdes 1 semana completa de activación estratégica.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent z-20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── 2. EL PROBLEMA REAL (HUMANIZADO) ─────────────────────────── */}
      <section className="relative w-full px-6 py-24 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl">
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-16 leading-tight uppercase tracking-widest">
            Estudiar más <br /> no significa mejorar.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Horas Perdidas', desc: 'Lees, subrayas, haces resúmenes... pero el puntaje sigue igual. No te falta capacidad, te falta método.' },
              { label: 'El Ruido del Preu', desc: 'Estar en una sala con 40 personas escuchando a alguien hablar no es aprender. Es solo ver a otro trabajar.' },
              { label: 'Entrenar Errores', desc: 'Sin un diagnóstico diario, solo estás repitiendo tus fallos una y otra vez. Estudiar sin corregir es hábito, no progreso.' },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp(i * 0.1)} className="p-10 rounded-3xl bg-lael-secondary border border-lael-bd cinematic-shadow group">
                <p className="text-lael-rust text-[10px] tracking-[0.2em] uppercase mb-6 font-bold">{item.label}</p>
                <p className="text-lael-muted text-sm leading-relaxed mb-6">{item.desc}</p>
                <button onClick={() => navigate('/diagnostico')} className="text-[9px] uppercase tracking-widest text-lael-accent font-bold hover:underline">
                   Esto me está pasando →
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.4)} className="mt-24 p-10 bg-lael-accent/5 rounded-[40px] border border-lael-accent/10 flex flex-col lg:flex-row items-center gap-10">
             <div className="flex-1">
                <h3 className="font-display text-2xl text-lael-light italic mb-4">"Aquí el alumno se equivocó en esto..."</h3>
                <p className="text-lael-muted text-sm leading-relaxed">
                   Mostramos la imperfección. En Lael, las correcciones no son notas, son instrucciones de vuelo para tu próximo ensayo.
                </p>
             </div>
             <div className="flex-shrink-0">
                <button onClick={() => navigate('/casos-reales')} className="px-8 py-4 bg-lael-accent text-white rounded-xl text-[10px] uppercase font-bold tracking-widest">Ver ejemplos reales</button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. DIFERENCIA TÁCTICA ────────────────────────────────────── */}
      <section className="relative w-full px-6 py-24 flex flex-col items-center bg-lael-secondary border-y border-lael-bd">
        <div className="w-full max-w-4xl">
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16 uppercase tracking-widest">
             ¿Por qué Lael es distinto?
          </motion.h2>

          <motion.div {...fadeUp(0.2)} className="rounded-[40px] border border-lael-bd overflow-hidden cinematic-shadow bg-lael-primary">
            <div className="grid grid-cols-3 px-10 py-6 border-b border-lael-bd bg-black/10">
              <p className="text-[10px] tracking-[0.2em] text-lael-muted uppercase font-bold">Aspecto</p>
              <p className="text-[10px] tracking-[0.2em] text-lael-accent uppercase font-bold">Lael</p>
              <p className="text-[10px] tracking-[0.2em] text-lael-muted uppercase font-bold">Preus Tradicionales</p>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 px-10 py-8 ${i % 2 === 0 ? 'bg-lael-primary' : 'bg-lael-secondary/50'} border-b border-lael-bd last:border-0`}>
                <p className="text-xs text-lael-muted tracking-wider font-bold uppercase">{row.feature}</p>
                <p className="text-sm text-lael-light font-bold tracking-wide">{row.lael}</p>
                <p className="text-sm text-lael-muted tracking-wide">{row.other}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. UNA SEMANA EN EL SISTEMA (SUBIDA) ─────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 text-center font-bold">Visualiza tu entrenamiento</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-24 uppercase tracking-tighter leading-none">
            Tu semana <br className="md:hidden" /> <span className="text-lael-accent">Lael.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <motion.div {...fadeUp(0.2)} className="p-10 bg-lael-secondary rounded-[40px] border border-lael-bd cinematic-shadow">
                <div className="text-lael-accent text-xs font-bold mb-8 opacity-20">01 / LUNES - JUEVES</div>
                <h4 className="text-lael-light font-bold mb-4 text-xl tracking-tight">Activación Táctica</h4>
                <p className="text-lael-muted text-sm leading-relaxed mb-8">Clases en vivo vía Zoom diseñadas para destruir los fallos de tu diagnóstico inicial.</p>
                <div className="h-px w-12 bg-lael-accent/30" />
             </motion.div>
             <motion.div {...fadeUp(0.3)} className="p-10 bg-lael-accent/5 rounded-[40px] border border-lael-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 bg-lael-accent/10 text-lael-accent text-[10px] font-bold uppercase tracking-widest">Día de Fuego</div>
                <div className="text-lael-accent text-xs font-bold mb-8 opacity-40">02 / VIERNES</div>
                <h4 className="text-lael-light font-bold mb-4 text-xl tracking-tight">Presión Real</h4>
                <p className="text-lael-muted text-sm leading-relaxed mb-8">Ensayo semanal cronometrado. Aquí entrenas tu mente para que el día de la prueba no sea una sorpresa.</p>
                <div className="h-px w-12 bg-lael-accent" />
             </motion.div>
             <motion.div {...fadeUp(0.4)} className="p-10 bg-lael-secondary rounded-[40px] border border-lael-bd cinematic-shadow">
                <div className="text-lael-accent text-xs font-bold mb-8 opacity-20">03 / SÁBADO</div>
                <h4 className="text-lael-light font-bold mb-4 text-xl tracking-tight">Recalibración</h4>
                <p className="text-lael-muted text-sm leading-relaxed mb-8">Feedback 1:1 con tu estratega. Si fallaste en algo el viernes, aquí lo arreglamos antes del lunes.</p>
                <div className="h-px w-12 bg-lael-accent/30" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. DATA REAL (SUBIDA) ────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd">
        {/* ... (keep data content) ... */}
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-12 text-center font-bold">Evidencia, no promesas</motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeUp(0.1)}>
              <h2 className="font-display text-4xl lg:text-5xl text-lael-light mb-10 leading-tight uppercase tracking-tighter">Resultados <br/> que puedes <span className="text-emerald-400">tocar.</span></h2>
              <p className="text-lael-muted text-lg leading-relaxed mb-12">
                 No prometemos "aprender". Prometemos rendimiento. El 92% de nuestros alumnos sube al menos 120 puntos tras completar su primer ciclo de activación.
              </p>
              <div className="grid grid-cols-2 gap-12">
                 <div className="p-8 bg-lael-primary rounded-3xl border border-lael-bd">
                    <p className="text-4xl font-display text-emerald-400 font-bold">+120</p>
                    <p className="text-[10px] text-lael-muted uppercase tracking-widest mt-2">Puntos promedio</p>
                 </div>
                 <div className="p-8 bg-lael-primary rounded-3xl border border-lael-bd">
                    <p className="text-4xl font-display text-emerald-400 font-bold">92%</p>
                    <p className="text-[10px] text-lael-muted uppercase tracking-widest mt-2">Éxito en Ciclo 1</p>
                 </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="p-12 bg-lael-primary rounded-[50px] border border-lael-bd relative overflow-hidden cinematic-shadow">
               <div className="flex items-end gap-4 h-64 border-b border-lael-bd pb-4">
                  <div className="w-full bg-lael-accent/10 h-[20%] rounded-2xl"></div>
                  <div className="w-full bg-lael-accent/30 h-[45%] rounded-2xl"></div>
                  <div className="w-full bg-lael-accent/60 h-[75%] rounded-2xl"></div>
                  <div className="w-full bg-lael-accent h-full rounded-2xl shadow-[0_0_40px_rgba(196,151,62,0.3)]"></div>
               </div>
               <p className="text-center mt-8 text-[11px] text-lael-muted uppercase tracking-[0.3em] font-bold">Evolución del Puntaje PAES</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5.5 REALIDAD ESTRATÉGICA (VISUAL) ────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow">
             <img 
               src={paesMentor} 
               alt="Mentoría Estratégica Lael" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
             <div className="absolute inset-y-0 left-0 flex items-center px-12 lg:px-20 max-w-2xl">
                <motion.div {...fadeUp()}>
                   <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Mentores, no Profesores</p>
                   <h3 className="font-display text-4xl lg:text-6xl text-white font-bold leading-tight mb-8">
                     Análisis Quirúrgico <br /> de tu Rendimiento.
                   </h3>
                   <p className="text-white/70 text-lg leading-relaxed">
                     En Lael no te damos una clase magistral. Te sentamos con un estratega para desglosar cada segundo de tu ejecución. Aquí es donde los puntos se ganan de verdad.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 6. TU SISTEMA INCLUYE ─────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-24 uppercase tracking-widest">
            Tu Arquitectura Táctica.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PAES_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.08)} className="group p-10 rounded-3xl bg-lael-secondary border border-lael-bd hover:border-lael-accent/30 transition-all duration-500 cinematic-shadow">
                <div className="w-14 h-14 bg-lael-accent/10 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                   {f.icon}
                </div>
                <h3 className="text-lael-light text-xl font-bold mb-4 tracking-tight uppercase">{f.title}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ AVANZADO ───────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeUp()} className="font-display text-4xl text-lael-light font-bold text-center mb-16 uppercase tracking-widest">Hablemos claro.</motion.h2>
          <div className="space-y-6">
             {[
                { q: "¿Es 100% online?", a: "Sí. No perdemos tiempo en traslados. Lael sucede donde tú estés, pero con el rigor de una sala de entrenamiento real." },
                { q: "¿Y si ya fallé antes?", a: "Perfecto. Significa que ya probaste lo que no funciona. Nosotros te mostramos por qué fallaste y cómo hackear ese resultado." },
                { q: "¿Cuánto tiempo necesito?", a: "¿Trabajas? ¿Tienes poco tiempo? El sistema se arma contigo. Optimizamos cada minuto para que el estudio sea quirúrgico." }
             ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="p-10 bg-lael-primary rounded-[40px] border border-lael-bd cinematic-shadow">
                   <h4 className="text-lael-light font-bold mb-6 text-lg tracking-tight uppercase">{item.q}</h4>
                   <p className="text-lael-muted text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA FINAL (NATURAL) ───────────────────────────────────── */}
      <section className="relative w-full px-6 py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold leading-none mb-12 uppercase tracking-tighter">
             ¿Listo para saber <br/> <span className="text-lael-accent">la verdad?</span>
          </h2>
          <p className="text-lael-muted text-lg mb-16 leading-relaxed italic italic-playfair">
             No llegas acá porque te falta capacidad. <br className="hidden md:block" /> Llegas porque nadie te enseñó cómo mejorar.
          </p>
          <button
            onClick={startDiagnostic}
            className="bg-lael-accent text-white px-16 py-7 rounded-2xl text-[11px] tracking-[0.3em] uppercase font-bold hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_50px_rgba(196,151,62,0.25)]"
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
