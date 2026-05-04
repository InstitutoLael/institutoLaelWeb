import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ADULT_CONTENT } from '../../data/nivelacion';
import { CheckCircle2, Target, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
        <title>Nivelación Adultos | Instituto Lael — Ingeniería del Rendimiento</title>
        <meta name="description" content="Nunca fue tarde. Termina tu educación con estrategia y flexibilidad. Sistema diseñado para adultos que buscan una segunda oportunidad real." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:py-32 flex flex-col items-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-20">
            <div className="absolute top-20 left-10 w-64 h-64 bg-lael-accent/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-lael-rust/10 blur-[150px] rounded-full" />
        </div>

        <motion.div {...fadeUp()} className="text-center max-w-4xl relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-8 font-bold">Arquitectura Educativa</p>
          <h1 className="font-display text-5xl lg:text-7xl text-lael-light mb-8 leading-tight">
            {ADULT_CONTENT.hero.title} <br/>
            <span className="text-lael-accent italic italic-playfair">{ADULT_CONTENT.hero.subtitle}</span>
          </h1>
          <p className="text-lael-muted text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            No es solo terminar el colegio. Es activar tu capacidad de rendimiento para lo que viene después.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={startDiagnostic} className="bg-lael-accent text-white px-10 py-5 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-xl">
              Iniciar Diagnóstico Táctico
            </button>
            <button onClick={() => navigate('/sistema')} className="bg-transparent border border-lael-bd text-lael-light px-10 py-5 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-secondary transition-all duration-500">
              Ver el Sistema
            </button>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-24 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()}>
              <h2 className="font-display text-3xl lg:text-4xl text-lael-light mb-6">
                {ADULT_CONTENT.problem.title}
              </h2>
              <p className="text-lael-muted text-base lg:text-lg leading-relaxed mb-8">
                {ADULT_CONTENT.problem.description}
              </p>
              <div className="p-6 bg-lael-primary/50 border border-lael-accent/20 rounded-2xl italic text-lael-accent">
                "{ADULT_CONTENT.problem.solution}"
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 gap-6">
               <div className="p-8 bg-lael-primary rounded-2xl border border-lael-bd cinematic-shadow">
                  <Users className="text-lael-accent mb-4" size={32} />
                  <h3 className="text-lael-light font-bold mb-2">Contexto Real</h3>
                  <p className="text-lael-muted text-sm">Entendemos que tienes trabajo, familia y responsabilidades. El sistema se dobla, no tú.</p>
               </div>
               <div className="p-8 bg-lael-primary rounded-2xl border border-lael-bd cinematic-shadow">
                  <Target className="text-lael-accent mb-4" size={32} />
                  <h3 className="text-lael-light font-bold mb-2">Estrategia Táctica</h3>
                  <p className="text-lael-muted text-sm">No te llenamos de contenido irrelevante. Vamos a lo que te preguntan en el examen.</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
             <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-4">El Sistema Caminos</p>
             <h2 className="font-display text-4xl text-lael-light">Propuesta Completa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADULT_CONTENT.system.features.map((f, i) => (
              <motion.div key={f.id} {...fadeUp(i * 0.1)} className="p-8 bg-lael-secondary rounded-2xl border border-lael-bd hover:border-lael-accent/50 transition-all duration-500">
                <div className="w-12 h-12 bg-lael-accent/10 rounded-xl flex items-center justify-center text-lael-accent mb-6">
                  {i === 0 && <Clock size={24}/>}
                  {i === 1 && <BookOpen size={24}/>}
                  {i === 2 && <Users size={24}/>}
                  {i === 3 && <Target size={24}/>}
                </div>
                <h3 className="text-lael-light font-bold mb-3 tracking-wide">{f.title}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target & Outcomes */}
      <section className="px-6 py-24 bg-lael-secondary border-t border-lael-bd">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div {...fadeUp()} className="space-y-8">
            <h3 className="font-display text-2xl text-lael-light flex items-center gap-3">
              <CheckCircle2 className="text-lael-accent" />
              Esto es para ti si:
            </h3>
            <ul className="space-y-4">
              {ADULT_CONTENT.target.forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-lael-muted text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-lael-accent mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="space-y-8">
            <h3 className="font-display text-2xl text-lael-light flex items-center gap-3">
              <ArrowRight className="text-lael-accent" />
              Resultados Esperados:
            </h3>
            <ul className="space-y-4">
              {ADULT_CONTENT.target.outcome.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-lael-muted text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-lael-rust mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Message Footer */}
      <section className="py-32 flex flex-col items-center">
         <motion.p {...fadeUp()} className="font-display text-3xl lg:text-5xl text-lael-light text-center px-6">
            {ADULT_CONTENT.message}
         </motion.p>
         <motion.button onClick={startDiagnostic} {...fadeUp(0.2)} className="mt-12 bg-lael-accent text-white px-12 py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold hover:scale-105 transition-all duration-500">
            Iniciar diagnóstico gratuito →
         </motion.button>
      </section>
    </div>
  );
}
