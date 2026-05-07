import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { LANGUAGES, LANG_FEATURES } from '../../data/idiomas';
import { useNavigate } from 'react-router-dom';
import idiomasExecution from '../../assets/img/Home/idiomas_execution_bg_1777948997295.png';

import ScrollProgress from '../../components/ui/ScrollProgress';

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
      <ScrollProgress />
      <Helmet>
        <title>Inglés y Coreano Online Chile $9.990/mes | Instituto Lael</title>
        <meta name="description" content="Cursos de idiomas desde $9.990/mes. Clases en vivo. Sin matrícula." />
      </Helmet>
      {/* HERO (CINEMÁTICO) */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lael-primary/40 via-lael-primary/70 to-lael-primary z-10" />
          {/* Note: hero_idiomas_interaction will be placed here when available */}
          <div className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-1000" 
            style={{ backgroundImage: `url(${idiomasExecution})` }} /> 
        </div>

        <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8 font-bold">Idiomas Reales</motion.p>
          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-5xl lg:text-8xl tracking-[-0.04em] text-lael-primary font-bold leading-[0.9] max-w-5xl mb-12"
          >
            No estudias un idioma.<br />
            <span className="accent-italic">Lo hablas desde el primer día.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.35)} className="text-lael-muted text-lg lg:text-xl max-w-xl mx-auto leading-relaxed italic italic-playfair mb-14">
            Sin apps de repetición. Solo clases en vivo y simulaciones reales que te preparan para la vida profesional.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={startDiagnostic} 
            className="bg-lael-accent text-lael-primary px-12 py-6 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_4px_30px_rgba(196,151,62,0.3)]"
          >
            Quiero hablar con fluidez →
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent z-20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── 2. OUTPUT REAL (ESCENARIOS) ────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center bg-lael-secondary border-y border-lael-bd">
        <div className="w-full max-w-6xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-12 text-center font-bold">Output Real</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-5xl lg:text-6xl text-lael-primary font-bold text-center mb-24 tracking-tighter">¿QUÉ SERÁS CAPAZ DE HACER?</motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <motion.div {...fadeUp(0.2)} className="space-y-12">
                <h3 className="font-display text-3xl text-lael-primary italic italic-playfair">Escenarios de Simulación</h3>
                <div className="space-y-6">
                   {[
                      { icon: "💼", title: "Entrevistas Laborales", desc: "Simulamos procesos de selección reales en el idioma objetivo. No respondes preguntas, vendes tu valor." },
                      { icon: "✈️", title: "Inmersión en Viajes", desc: "Desde pedir ayuda médica hasta negociar en un mercado local sin usar traductor." },
                      { icon: "🤝", title: "Networking Profesional", desc: "Cómo presentar tu proyecto, cerrar acuerdos estratégicos y conectar emocionalmente." }
                   ].map(s => (
                      <div key={s.title} className="flex gap-6 p-8 bg-lael-secondary rounded-[30px] border border-lael-bd cinematic-shadow">
                         <span className="text-3xl">{s.icon}</span>
                         <div>
                            <p className="text-lael-primary font-bold text-base mb-2 uppercase tracking-wide">{s.title}</p>
                            <p className="text-lael-muted text-sm leading-relaxed">{s.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>

             <motion.div {...fadeUp(0.4)} className="p-12 lg:p-16 bg-lael-accent rounded-[50px] text-lael-light flex flex-col justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-lael-light/10 font-display text-9xl font-bold">Time</div>
                <h3 className="font-display text-4xl mb-12 relative z-10">Tiempo Estimado <br/> de Ejecución</h3>
                <div className="space-y-10 relative z-10">
                   <div>
                      <p className="text-lael-light/60 text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">Conversación Básica</p>
                      <p className="text-4xl font-bold italic italic-playfair">3 a 6 meses</p>
                   </div>
                   <div className="w-full h-px bg-lael-light/20"></div>
                   <div>
                      <p className="text-lael-light/60 text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">Fluidez Profesional</p>
                      <p className="text-4xl font-bold italic italic-playfair">12 a 18 meses</p>
                   </div>
                </div>
                <p className="mt-14 text-[11px] text-lael-light/50 italic italic-playfair">* Basado en un entrenamiento de 4 horas semanales + inmersión pasiva supervisada.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. METODOLOGÍA (EL CÓDIGO) ─────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="w-full max-w-4xl text-center">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 font-bold">El Método</p>
          <h2 className="font-display text-5xl lg:text-7xl text-lael-primary font-bold mb-12 tracking-tighter">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-24">
            {[
              { step: '01', label: 'Inmersión', desc: 'No estudias el idioma, lo vives. Exposición constante desde el minuto uno.' },
              { step: '02', label: 'Estructura', desc: 'Instalamos los algoritmos gramaticales de forma intuitiva, sin memorizar tablas.' },
              { step: '03', label: 'Simulación', desc: 'Escenarios reales: pides un café, negocias un contrato, haces una entrevista.' },
              { step: '04', label: 'Fluidez', desc: 'Tu cerebro deja de traducir y comienza a pensar directamente en el código del idioma.' },
            ].map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center lg:text-left">
                <div className="font-display text-7xl text-lael-accent/20 font-bold mb-6">{m.step}</div>
                <h4 className="text-lael-primary text-xl font-bold uppercase tracking-widest mb-4">{m.label}</h4>
                <p className="text-lael-muted text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.5 REALIDAD GLOBAL (VISUAL) ─────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow">
             <img 
               src={idiomasExecution} 
               alt="Ejecución de Idiomas Lael" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent" />
             <div className="absolute inset-y-0 right-0 flex items-center px-12 lg:px-20 max-w-2xl text-right">
                <motion.div {...fadeUp()}>
                   <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Sin Traductores</p>
                   <h3 className="font-display text-4xl lg:text-6xl text-white font-bold leading-tight mb-8">
                     Tu pasaporte es <br /> tu capacidad.
                   </h3>
                   <p className="text-white/70 text-lg leading-relaxed">
                     Preparamos tu mente para responder sin vacilar. No traduces, simplemente hablas. Porque en el mundo real, no hay tiempo para diccionarios.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 4. DIFERENCIA ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center bg-lael-secondary border-y border-lael-bd">
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center font-bold">Diferencia Táctica</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-primary font-bold text-center mb-24 tracking-tighter uppercase">Simulación real, no clases pasivas.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LANG_FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)} className="p-10 rounded-[40px] bg-lael-secondary hover-card border border-lael-bd cinematic-shadow group">
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
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-primary font-bold text-center mb-24 tracking-tighter uppercase">Elige tu sistema de comunicación.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                impact: 'ALTO IMPACTO', 
                title: 'Dominio Estratégico Inglés', 
                flag: '🇬🇧',
                desc: 'Ingeniería inversa del idioma. Estructuras de alto rendimiento para negocios y tecnología.', 
                levels: ['A1 (Fundamentos)', 'A2', 'B1', 'B2 (Dominio)'] 
              },
              { 
                impact: 'ALTA DEMANDA', 
                title: 'Inmersión Estructural Coreana', 
                flag: '🇰🇷',
                desc: 'Decodificación precisa del sistema Hangul y gramática coreana avanzada.', 
                levels: ['Nivel 1 (Fundamentos)', 'Nivel 2', 'Nivel 3'] 
              },
              { 
                impact: 'INSERCIÓN ESTRATÉGICA', 
                title: 'Integración para Expats', 
                flag: '🇨🇱',
                desc: 'Sistemas prácticos para dominar el español en el entorno chileno. Foco corporativo.', 
                levels: ['A1 (Fundamentos)', 'A2', 'B1 (Dominio)'] 
              },
            ].map((prog, i) => (
              <motion.div 
                key={prog.title} 
                {...fadeUp(i * 0.1)} 
                className="p-10 bg-lael-secondary border border-lael-bd rounded-[40px] hover:border-lael-accent/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-10">
                  <span className="text-lael-accent text-[10px] font-bold tracking-[0.3em] uppercase">{prog.impact}</span>
                  <span className="text-4xl">{prog.flag}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-lael-primary mb-6 group-hover:text-lael-accent transition-colors">{prog.title}</h3>
                <p className="text-lael-muted text-sm leading-relaxed mb-8">{prog.desc}</p>
                <div className="space-y-3">
                  {prog.levels.map(lvl => (
                    <div key={lvl} className="flex items-center gap-3 text-xs text-lael-muted font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-lael-accent/40" />
                      {lvl}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-48 flex flex-col items-center bg-lael-secondary">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-3xl">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10 font-bold">Inicia hoy</p>
          <h2 className="font-display text-5xl lg:text-7xl text-lael-primary font-bold mb-12 uppercase tracking-tighter">Configura tu <br/> sistema ahora.</h2>
          <button onClick={startDiagnostic} className="bg-lael-accent text-lael-light px-16 py-7 rounded-2xl text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_20px_50px_rgba(196,151,62,0.3)]">
             Iniciar diagnóstico táctico →
          </button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
