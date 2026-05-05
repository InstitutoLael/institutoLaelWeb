import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LANGUAGES, LANG_FEATURES } from '../../data/idiomas';
import { useNavigate } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

export default function LandingIdiomas() {
  const navigate = useNavigate();

  const startDiagnostic = () => {
    navigate('/diagnostico');
  };

  return (
    <div className="w-full bg-lael-primary">
      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8 font-bold">Ingeniería del Lenguaje</motion.p>
        <h1 className="font-display text-5xl lg:text-8xl tracking-[-0.04em] text-lael-light font-bold leading-[0.9] max-w-5xl clip-reveal" style={{ animationDelay: '0.15s' }}>
          No aprendes idiomas.<br />
          <span className="accent-italic">Ejecutas sistemas de comunicación.</span>
        </h1>
        <motion.p {...fadeUp(0.35)} className="mt-12 text-lael-muted text-lg lg:text-xl max-w-xl mx-auto leading-relaxed italic italic-playfair">
          Sin repetición mecánica. Solo simulaciones reales que te preparan para comunicarte en cualquier entorno profesional.
        </motion.p>
        <motion.button {...fadeUp(0.55)} onClick={startDiagnostic} className="mt-14 bg-lael-accent text-white px-12 py-6 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_30px_rgba(196,151,62,0.3)]">
          Iniciar diagnóstico táctico →
        </motion.button>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── 2. OUTPUT REAL (ESCENARIOS) ────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center bg-lael-secondary border-y border-lael-bd">
        <div className="w-full max-w-6xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-12 text-center font-bold">Output Real</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-5xl lg:text-6xl text-lael-light font-bold text-center mb-24 tracking-tighter">¿QUÉ SERÁS CAPAZ DE HACER?</motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <motion.div {...fadeUp(0.2)} className="space-y-12">
                <h3 className="font-display text-3xl text-lael-light italic italic-playfair">Escenarios de Simulación</h3>
                <div className="space-y-6">
                   {[
                      { icon: "💼", title: "Entrevistas Laborales", desc: "Simulamos procesos de selección reales en el idioma objetivo. No respondes preguntas, vendes tu valor." },
                      { icon: "✈️", title: "Inmersión en Viajes", desc: "Desde pedir ayuda médica hasta negociar en un mercado local sin usar traductor." },
                      { icon: "🤝", title: "Networking Profesional", desc: "Cómo presentar tu proyecto, cerrar acuerdos estratégicos y conectar emocionalmente." }
                   ].map(s => (
                      <div key={s.title} className="flex gap-6 p-8 bg-lael-primary rounded-[30px] border border-lael-bd cinematic-shadow">
                         <span className="text-3xl">{s.icon}</span>
                         <div>
                            <p className="text-lael-light font-bold text-base mb-2 uppercase tracking-wide">{s.title}</p>
                            <p className="text-lael-muted text-sm leading-relaxed">{s.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>

             <motion.div {...fadeUp(0.4)} className="p-12 lg:p-16 bg-lael-accent rounded-[50px] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/10 font-display text-9xl font-bold">Time</div>
                <h3 className="font-display text-4xl mb-12 relative z-10">Tiempo Estimado <br/> de Ejecución</h3>
                <div className="space-y-10 relative z-10">
                   <div>
                      <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">Conversación Básica</p>
                      <p className="text-4xl font-bold italic italic-playfair">3 a 6 meses</p>
                   </div>
                   <div className="w-full h-px bg-white/20"></div>
                   <div>
                      <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">Fluidez Profesional</p>
                      <p className="text-4xl font-bold italic italic-playfair">12 a 18 meses</p>
                   </div>
                </div>
                <p className="mt-14 text-[11px] text-white/50 italic italic-playfair">* Basado en un entrenamiento de 4 horas semanales + inmersión pasiva supervisada.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. METODOLOGÍA (EL CÓDIGO) ─────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="w-full max-w-4xl text-center">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 font-bold">El Método</p>
          <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold mb-12 tracking-tighter">
            Hackeando el proceso <br className="hidden md:block" /> de aprendizaje.
          </h2>
          <div className="text-lael-muted text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto space-y-8 italic italic-playfair">
            <p>
              Estudiar gramática en una pizarra durante años y no poder pedir un café es el estándar de la educación tradicional. En Lael, vemos los idiomas como <strong>códigos de software</strong>.
            </p>
            <p>
              Primero instalamos la estructura básica (el algoritmo). Luego, saturamos tus sentidos con simulaciones reales (los datos). El resultado: tu cerebro decodifica el idioma automáticamente, sin necesidad de traducir palabra por palabra.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-center">
            {[
              { num: '01', title: 'Inmersión' },
              { num: '02', title: 'Estructura' },
              { num: '03', title: 'Simulación' },
              { num: '04', title: 'Fluidez' }
            ].map(step => (
              <div key={step.num}>
                <p className="font-display text-6xl text-lael-accent/15 font-bold mb-4">{step.num}</p>
                <p className="text-[11px] tracking-[0.2em] text-lael-light uppercase font-bold">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DIFERENCIA ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center bg-lael-secondary border-y border-lael-bd">
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center font-bold">Diferencia Táctica</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-24 tracking-tighter uppercase">Simulación real, no clases pasivas.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LANG_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)} className="p-10 rounded-[40px] bg-lael-primary hover-card border border-lael-bd cinematic-shadow group">
                <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-6 font-bold transition-colors">{f.title}</p>
                <p className="text-lael-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROGRAMAS ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center font-bold">Programas disponibles</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-24 tracking-tighter uppercase">Elige tu sistema de comunicación.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LANGUAGES.map((lang, i) => (
              <motion.div key={lang.id} {...fadeUp(i * 0.1)} className="p-10 rounded-[40px] bg-lael-secondary hover-card border border-lael-bd cinematic-shadow">
                <p className="text-[10px] tracking-[0.2em] text-lael-accent uppercase mb-4 font-bold">{lang.badge}</p>
                <h3 className="font-display text-3xl text-lael-light font-bold mb-6">{lang.name}</h3>
                <p className="text-lael-muted text-base leading-relaxed mb-10">{lang.summary}</p>
                <div className="space-y-3">
                   {lang.levels.map(lvl => (
                      <p key={lvl} className="text-xs text-lael-light/70 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-lael-accent/30" />
                         {lvl}
                      </p>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-48 flex flex-col items-center bg-lael-primary">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-3xl">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10 font-bold">Inicia hoy</p>
          <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold mb-12 uppercase tracking-tighter">Configura tu <br/> sistema ahora.</h2>
          <button onClick={startDiagnostic} className="bg-lael-accent text-white px-16 py-7 rounded-2xl text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_20px_50px_rgba(196,151,62,0.3)]">
             Iniciar diagnóstico táctico →
          </button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
