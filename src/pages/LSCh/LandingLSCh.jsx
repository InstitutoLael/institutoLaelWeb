import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LSCH_WHY_US, TEACHER_PROFILE, COMPARISON_DATA } from '../../data/lsch';
import { useNavigate } from 'react-router-dom';
import lschRealidad from '../../assets/img/Home/mundo_lsch_bg_1777943626827.png';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

export default function LandingLSCh() {
  const navigate = useNavigate();

  const startDiagnostic = () => {
    navigate('/diagnostico');
  };

  return (
    <div className="w-full bg-lael-primary">
      {/* HERO (CINEMÁTICO) */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lael-primary/40 via-lael-primary/70 to-lael-primary z-10" />
          {/* Note: hero_lsch_teaching will be placed here when available */}
          <div className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-1000" 
            style={{ backgroundImage: `url(${lschRealidad})` }} /> 
        </div>

        <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8 font-bold">Inclusión Estratégica</motion.p>
          <h1 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal mb-10">
            El idioma que<br />
            <span className="accent-italic">elimina barreras.</span>
          </h1>
          <motion.p {...fadeUp(0.35)} className="text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-12">
            No es solo aprender señas. Es aprender a comunicarte en entornos reales con quienes el sistema ignoró.
          </motion.p>
          <motion.button {...fadeUp(0.55)} onClick={startDiagnostic}
            className="bg-lael-accent text-white px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)]">
            Iniciar diagnóstico táctico
          </motion.button>
          
          <motion.div {...fadeUp(0.7)} className="flex gap-8 mt-12 justify-center">
            {['Ley 21.015', 'Cultura Sorda', 'Instructora Nativa'].map((item, i) => (
              <React.Fragment key={item}>
                <span className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase">{item}</span>
                {i < 2 && <span className="text-lael-muted/20">·</span>}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent z-20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* IMPACTO EMOCIONAL */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
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
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-4xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Por qué Lael</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16">Cultura Sorda + metodología real.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LSCH_WHY_US.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-lael-secondary hover-card border border-lael-bd cinematic-shadow">
                <p className="text-lael-rust text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">{item.title}</p>
                <p className="text-lael-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIÓN */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center bg-lael-secondary border-y border-lael-bd cinematic-shadow">
        <div className="w-full max-w-4xl text-center">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6">Inclusión Real</p>
          <h2 className="font-display text-4xl lg:text-5xl text-lael-light font-bold mb-10">
            Más que señas. Cultura y conexión.
          </h2>
          <div className="text-lael-muted text-sm leading-relaxed max-w-2xl mx-auto space-y-6">
            <p>
              La inclusión no es saber el abecedario. Es entender cómo una persona Sorda percibe el mundo, cómo estructura el espacio a su alrededor y cómo se expresa emocionalmente.
            </p>
            <p>
              Nuestro programa está diseñado bajo los parámetros de la Cultura Sorda. Aprenderás a "hablar" con tu cuerpo, tus expresiones faciales y a usar el espacio tridimensional para comunicarte de forma nativa.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3.5 REALIDAD INCLUSIVA (VISUAL) ─────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow">
             <img 
               src={lschRealidad} 
               alt="Comunidad LSCh Lael" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-12 lg:p-20 text-center">
                <motion.div {...fadeUp()}>
                   <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Comunidad Activa</p>
                   <h3 className="font-display text-4xl lg:text-6xl text-white font-bold leading-tight mb-8">
                     Rompe el Silencio <br /> con el Alma.
                   </h3>
                   <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                     Nuestras sesiones no son solo teoría. Son encuentros donde la comunidad Sorda y oyente se une para derribar las paredes de la incomunicación. Aquí aprendes el lenguaje del corazón.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* FERNANDA */}
      <section className="relative w-full px-6 py-20 lg:py-28 flex flex-col items-center">
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
          <motion.div {...fadeUp(0.15)} className="bg-lael-secondary border border-lael-bd rounded-2xl p-8 cinematic-shadow">
            <p className="text-[10px] tracking-[0.2em] uppercase text-lael-muted mb-6 font-bold">Esto no es un curso. Es acceso cultural real.</p>
            <div className="space-y-0">
              <div className="grid grid-cols-3 pb-4 mb-2">
                <p className="text-[9px] tracking-[0.15em] text-lael-muted uppercase font-bold">Aspecto</p>
                <p className="text-[9px] tracking-[0.15em] text-lael-accent uppercase font-bold">Lael</p>
                <p className="text-[9px] tracking-[0.15em] text-lael-muted uppercase font-bold">Otros</p>
              </div>
              {COMPARISON_DATA.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 py-4 border-t border-lael-bd ${i === COMPARISON_DATA.length - 1 ? '' : ''}`}>
                  <p className="text-[11px] text-lael-muted font-bold">{row.feature}</p>
                  <p className="text-[11px] text-lael-accent font-medium">{row.us}</p>
                  <p className="text-[11px] text-lael-muted">{row.others}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NUEVO: OUTPUT PROFESIONAL ────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center">Inclusión en Acción</motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div {...fadeUp(0.1)} className="p-12 bg-emerald-500/5 rounded-[40px] border border-emerald-500/10">
                <p className="text-emerald-400 text-[10px] tracking-[0.2em] uppercase mb-6 font-bold">Caso Real</p>
                <h3 className="font-display text-3xl text-lael-light mb-8 italic">
                   "Ahora puedo atender a clientes Sordos en mi local sin intermediarios. La conexión humana es inmediata."
                </h3>
                <p className="text-lael-muted text-xs uppercase tracking-widest">— Alumna Nivel A1</p>
             </motion.div>
             <motion.div {...fadeUp(0.3)}>
                <h2 className="font-display text-4xl text-lael-light mb-8">Certificación por Competencias.</h2>
                <p className="text-lael-muted leading-relaxed mb-10">
                   Al finalizar cada nivel, recibes un <strong>Diploma de Participación y Competencia</strong> emitido por Instituto Lael, avalando tus horas de inmersión y habilidades prácticas en LSCh.
                </p>
                <div className="flex items-center gap-6 p-6 bg-lael-secondary rounded-2xl border border-lael-bd shadow-xl">
                   <div className="w-16 h-16 bg-lael-accent/20 rounded-full flex items-center justify-center text-lael-accent">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-2 5l2 2l2 -2l-2 -5z"/><circle cx="12" cy="7" r="4"/><path d="M10 11a8.1 8.1 0 0 0 -5 3v2h5m4 -2v-2a8.1 8.1 0 0 1 5 -3"/></svg>
                   </div>
                   <div>
                      <p className="text-lael-light font-bold text-sm">Diploma Oficial Lael</p>
                      <p className="text-lael-muted text-xs">Válido para CV y cumplimiento Ley 21.015</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSICIÓN */}
      <section className="relative w-full px-6 py-20 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <h2 className="font-display text-4xl text-lael-light font-bold mb-8">Elige tu plan y comienza hoy.</h2>
          <button onClick={startDiagnostic} className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-white transition-all duration-500">
            Iniciar diagnóstico táctico →
          </button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
