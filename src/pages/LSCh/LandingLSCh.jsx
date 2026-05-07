import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Award } from 'lucide-react';
import { LSCH_WHY_US, TEACHER_PROFILE, COMPARISON_DATA } from '../../data/lsch';
import { useNavigate } from 'react-router-dom';
import lschRealidad from '../../assets/img/Home/mundo_lsch_bg_1777943626827.png';

import ScrollProgress from '../../components/ui/ScrollProgress';

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
      <ScrollProgress />
      <Helmet>
        <title>LSCh Online con Fernanda Gaete | Instituto Lael</title>
        <meta name="description" content="Lengua de Señas Chilena con educadora nativa. Ley 21.015. $14.990/mes." />
      </Helmet>
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
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8 font-bold">Inclusión Real</motion.p>
          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-5xl lg:text-7xl xl:text-8xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl mb-10 relative"
          >
            <span className="absolute inset-0 blur-[100px] bg-lael-accent/20 -z-10 rounded-full"></span>
            El idioma que<br />
            <span className="accent-italic relative z-10">elimina barreras.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.35)} className="text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-12">
            No es solo aprender señas. Es aprender a comunicarte en entornos reales con personas sordas desde el primer día.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={startDiagnostic}
            className="bg-lael-accent text-lael-light px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)]"
          >
            Aprender LSCh hoy
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
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-16 uppercase tracking-widest">Cultura Sorda + metodología real.</motion.h2>
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
          <h2 className="font-display text-4xl lg:text-5xl text-lael-primary font-bold mb-10">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                level: 'A1 • PRINCIPIANTE', 
                duration: '3 MESES',
                title: 'Iniciación Visual', 
                desc: 'Aprendes el abecedario, saludos, familia y cómo estructurar tus primeras ideas sin usar la voz.' 
              },
              { 
                level: 'A2 • INTERMEDIO', 
                duration: '3 MESES',
                title: 'Gramática Espacial', 
                desc: 'Uso del espacio para describir escenas complejas y verbos direccionales.' 
              },
              { 
                level: 'B1 • AVANZADO', 
                duration: '4 MESES',
                title: 'Contexto Profesional', 
                desc: 'Especialización técnica para salud, educación y atención al público con enfoque en la Ley de Inclusión.' 
              }
            ].map((step, i) => (
              <motion.div 
                key={step.title} 
                {...fadeUp(i * 0.1)} 
                className="p-10 bg-white border border-lael-bd rounded-[40px] shadow-sm hover:border-lael-accent/50 transition-all group"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="text-lael-accent text-[9px] font-bold tracking-[0.2em] uppercase">{step.level}</span>
                  <span className="bg-lael-secondary/10 px-3 py-1 rounded-full text-[9px] text-lael-muted font-bold">{step.duration}</span>
                </div>
                <h4 className="text-xl font-bold text-lael-primary mb-4 group-hover:text-lael-accent transition-colors uppercase">{step.title}</h4>
                <p className="text-lael-muted text-sm leading-relaxed">{step.desc}</p>
                {i === 2 && (
                  <div className="mt-8 pt-8 border-t border-lael-bd text-[9px] text-lael-muted/60 font-bold uppercase tracking-widest">
                    Disponible al completar Nivel 2
                  </div>
                )}
              </motion.div>
            ))}
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
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center font-bold">Inclusión en Acción</motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
             <motion.div {...fadeUp(0.1)} className="p-12 bg-lael-primary rounded-[50px] border border-lael-bd cinematic-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Award size={140} />
                </div>
                <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">Caso Real / Nivel A1</p>
                <h3 className="font-display text-3xl lg:text-4xl text-lael-light mb-10 italic leading-tight relative z-10">
                   "Ahora puedo atender a clientes Sordos en mi local sin intermediarios. La conexión humana es inmediata."
                </h3>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="w-10 h-10 rounded-full bg-lael-accent/20 flex items-center justify-center text-lael-accent font-bold">A</div>
                   <p className="text-lael-muted text-xs uppercase tracking-widest">— Alumna de Nivelación</p>
                </div>
             </motion.div>
             <motion.div 
               {...fadeUp(0.2)} 
               className="p-12 bg-lael-accent rounded-[50px] shadow-2xl relative overflow-hidden flex flex-col justify-center"
             >
                <div className="absolute top-0 right-0 p-10 text-white/10 font-display text-9xl font-bold">LSCh</div>
                <div className="relative z-10">
                   <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8">
                      <Award size={32} />
                   </div>
                   <h3 className="text-white font-bold text-3xl mb-4 leading-tight">Diploma Oficial Lael</h3>
                   <p className="text-white/80 text-lg leading-relaxed max-w-sm">
                      Válido para currículum y cumplimiento de la Ley 21.015 de Inclusión Laboral.
                   </p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. PLANES DE ENTRENAMIENTO ───────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center bg-lael-secondary border-y border-lael-bd">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-lael-accent text-[11px] tracking-[0.5em] uppercase mb-6 font-bold">Inversión Táctica</p>
            <h2 className="font-display text-5xl lg:text-7xl text-lael-primary font-bold mb-8 uppercase tracking-tighter">Elige tu plan.</h2>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] tracking-[0.2em] uppercase font-bold text-lael-muted/60">
               <span>Modalidad Grupal</span>
               <span className="text-lael-accent">·</span>
               <span>Convenio Iglesia/Ministerio</span>
               <span className="text-lael-accent">·</span>
               <span>1 a 1</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {/* Plan Mensual */}
             <motion.div {...fadeUp(0.1)} className="p-12 bg-white border border-lael-bd rounded-[50px] shadow-sm hover:border-lael-accent/30 transition-all duration-700 group relative">
                <div className="mb-10">
                   <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Plan Mensual Flexible</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl lg:text-6xl font-display font-bold text-lael-primary tracking-tighter">$24.990</span>
                      <span className="text-lael-muted text-sm uppercase tracking-widest font-bold">/mes</span>
                   </div>
                   <p className="mt-6 text-lael-muted text-sm italic italic-playfair">Ideal para ir a tu propio ritmo.</p>
                </div>
                
                <div className="space-y-4 mb-12">
                   {[
                      "Clases en vivo vía Zoom",
                      "Material de apoyo en PDF",
                      "Acceso a grabaciones por 7 días",
                      "Diploma de participación"
                   ].map(feat => (
                      <div key={feat} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-lael-accent/40" />
                         <p className="text-[13px] text-lael-muted font-medium tracking-tight">{feat}</p>
                      </div>
                   ))}
                </div>

                <button className="w-full py-6 bg-lael-secondary border border-lael-bd text-lael-primary rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] group-hover:bg-lael-primary group-hover:text-white transition-all duration-500">
                   Seleccionar Plan →
                </button>
             </motion.div>

             {/* Plan Trimestral */}
             <motion.div {...fadeUp(0.2)} className="p-12 bg-lael-primary border border-lael-accent rounded-[50px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 bg-lael-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-3xl">Más Conveniente</div>
                
                <div className="mb-10">
                   <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Plan Trimestral (Ahorro)</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl lg:text-6xl font-display font-bold text-lael-light tracking-tighter">$19.990</span>
                      <span className="text-lael-muted text-sm uppercase tracking-widest font-bold">/mes</span>
                   </div>
                   <p className="mt-6 text-lael-muted text-sm italic italic-playfair">Compromiso real con el aprendizaje.</p>
                </div>
                
                <div className="space-y-4 mb-12">
                   {[
                      "Todo lo del plan mensual",
                      "🔥 Matrícula $0 (Ahorras $15.000)",
                      "Acceso permanente a grabaciones",
                      "Certificado de Nivel aprobado"
                   ].map(feat => (
                      <div key={feat} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-lael-accent" />
                         <p className="text-[13px] text-lael-muted font-bold tracking-tight">{feat}</p>
                      </div>
                   ))}
                </div>

                <button className="w-full py-6 bg-lael-accent text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-lael-rust transition-all duration-500 shadow-xl shadow-lael-accent/20">
                   Activar Entrenamiento →
                </button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSICIÓN */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <h2 className="font-display text-4xl lg:text-6xl text-lael-light font-bold mb-12 uppercase tracking-tighter leading-none">
             Configura tu <br/> <span className="text-lael-accent">Inclusión.</span>
          </h2>
          <button onClick={startDiagnostic} className="bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-12 py-6 rounded-2xl text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-white transition-all duration-500">
            Iniciar diagnóstico táctico →
          </button>
        </motion.div>
        <div className="w-px h-32 bg-gradient-to-b from-lael-accent/30 to-transparent mt-24" />
      </section>
    </div>
  );
}
