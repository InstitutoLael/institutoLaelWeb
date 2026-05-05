import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ADULT_CONTENT } from '../../data/nivelacion';
import { CheckCircle2, Target, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import adultosRealidad from '../../assets/img/Home/mundo_adultos_bg_1777944001677.png';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

export default function NivelacionAdultos() {
  const navigate = useNavigate();

  const startDiagnostic = () => {
    navigate('/diagnostico');
  };

  return (
    <div className="bg-lael-primary min-h-screen pt-20">
      <Helmet>
        <title>Escuela de Sueños | Instituto Lael — Nivelación Adultos</title>
        <meta name="description" content="No es solo el colegio. Es tu nueva vida. Escuela de Sueños de Instituto Lael. Nivelación de estudios para adultos con un sistema que sí funciona." />
      </Helmet>

      {/* ── 1. HERO EMOCIONAL ─────────────────────────────────────────── */}
      <section className="relative px-6 py-24 lg:py-48 flex flex-col items-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div {...fadeUp()} className="text-center max-w-5xl relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10 font-bold">Escuela de Sueños</p>
          <h1 className="font-display text-5xl lg:text-8xl text-lael-light mb-12 leading-[0.9] tracking-tighter">
            {ADULT_CONTENT.hero.title} <br/>
            <span className="accent-italic">{ADULT_CONTENT.hero.subtitle}</span>
          </h1>
          <p className="text-lael-muted text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-16 italic italic-playfair">
            {ADULT_CONTENT.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={startDiagnostic} className="bg-lael-accent text-white px-12 py-6 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_10px_40px_rgba(196,151,62,0.2)]">
              ¿Hablamos de tu meta? →
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── 2. MOMENTO DE VERDAD ───────────────────────────────────────── */}
      <section className="px-6 py-32 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="font-display text-4xl lg:text-5xl text-lael-light mb-10 uppercase tracking-widest">
              {ADULT_CONTENT.problem.title}
            </h2>
            <p className="text-lael-muted text-lg lg:text-xl leading-relaxed mb-12">
              {ADULT_CONTENT.problem.description}
            </p>
            <div className="inline-block p-10 bg-lael-primary rounded-[40px] border border-lael-accent/20 italic italic-playfair text-lael-accent text-xl">
              "{ADULT_CONTENT.problem.solution}"
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. EL SISTEMA (CAMINOS) ────────────────────────────────────── */}
      <section className="px-6 py-32 lg:py-48">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Tu Arquitectura de Éxito</p>
             <h2 className="font-display text-5xl text-lael-light uppercase tracking-tighter">Cómo lo logramos.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADULT_CONTENT.system.features.map((f, i) => (
              <motion.div key={f.id} {...fadeUp(i * 0.1)} className="p-10 bg-lael-secondary rounded-[40px] border border-lael-bd hover:border-lael-accent/30 transition-all duration-500 cinematic-shadow group">
                <div className="w-16 h-16 bg-lael-accent/10 rounded-2xl flex items-center justify-center text-lael-accent mb-10 group-hover:scale-110 transition-transform">
                  {i === 0 && <Clock size={28}/>}
                  {i === 1 && <BookOpen size={28}/>}
                  {i === 2 && <Users size={28}/>}
                  {i === 3 && <Target size={28}/>}
                </div>
                <h3 className="text-lael-light font-bold mb-4 tracking-tight text-xl uppercase">{f.title}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.5 REALIDAD DE LOGRO (VISUAL) ───────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow">
             <img 
               src={adultosRealidad} 
               alt="Logro Adultos Lael" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
             <div className="absolute inset-y-0 left-0 flex items-center px-12 lg:px-20 max-w-2xl">
                <motion.div {...fadeUp()}>
                   <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Un Nuevo Comienzo</p>
                   <h3 className="font-display text-4xl lg:text-6xl text-white font-bold leading-tight mb-8">
                     Nunca es tarde <br /> para ser quien eres.
                   </h3>
                   <p className="text-white/70 text-lg leading-relaxed">
                     Terminar tu educación no es solo obtener un papel. Es demostrarte a ti mismo que puedes conquistar lo que el tiempo dejó pendiente. En Lael, te acompañamos hasta la meta.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 4. PARA QUIÉN ES ─────────────────────────────────────────── */}
      <section className="px-6 py-32 bg-lael-secondary border-t border-lael-bd">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div {...fadeUp()} className="space-y-10">
            <h3 className="font-display text-3xl text-lael-light flex items-center gap-4 uppercase tracking-widest">
              <CheckCircle2 className="text-lael-accent" size={32} />
              Esto es para ti:
            </h3>
            <ul className="space-y-6">
              {ADULT_CONTENT.target.forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-lael-muted text-base leading-relaxed">
                  <div className="w-2 h-2 rounded-full bg-lael-accent mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="space-y-10">
            <h3 className="font-display text-3xl text-lael-light flex items-center gap-4 uppercase tracking-widest">
              <ArrowRight className="text-lael-accent" size={32} />
              Tu nueva realidad:
            </h3>
            <ul className="space-y-6">
              {ADULT_CONTENT.target.outcome.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-lael-muted text-base leading-relaxed">
                  <div className="w-2 h-2 rounded-full bg-lael-rust mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── 5. CTA FINAL ─────────────────────────────────────────────── */}
      <section className="py-48 flex flex-col items-center bg-lael-primary relative">
         <div className="separator-gradient top-0" />
         <motion.p {...fadeUp()} className="font-display text-4xl lg:text-6xl text-lael-light text-center px-6 max-w-4xl leading-tight mb-16 italic italic-playfair">
            {ADULT_CONTENT.message}
         </motion.p>
         <motion.button onClick={startDiagnostic} {...fadeUp(0.2)} className="bg-lael-accent text-white px-16 py-7 rounded-2xl text-xs tracking-[0.3em] uppercase font-bold hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_50px_rgba(196,151,62,0.25)]">
            Iniciar mi transformación →
         </motion.button>
      </section>
    </div>
  );
}
