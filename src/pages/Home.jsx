import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { X, ChevronRight } from 'lucide-react';

import demre from '../assets/img/Partners/DEMRE.png';
import google from '../assets/img/Partners/GoogleWorkspace.png';
import ino from '../assets/img/Partners/INO.png';
import losOlivos from '../assets/img/Partners/LosOlivos.png';
import mercadoPago from '../assets/img/Partners/MercadoPago.png';
import naama from '../assets/img/Partners/naama-studio.png';
import onepay from '../assets/img/Partners/onepay.png';
import transbank from '../assets/img/Partners/Transbank.png';
import paesBg from '../assets/img/Home/mundo_paes_bg_1777943419260.png';
import idiomasBg from '../assets/img/Home/mundo_idiomas_bg_1777943491283.png';
import lschBg from '../assets/img/Home/mundo_lsch_bg_1777943626827.png';
import adultosBg from '../assets/img/Home/mundo_adultos_bg_1777944001677.png';
import empresasBg from '../assets/img/Home/mundo_empresas_bg_1777944168670.png';

import SignificadoLael from '../components/SignificadoLael';
import CharlaGratuita from '../components/CharlaGratuita';
import InsideLael from '../components/InsideLael';
import ObjectionsFAQ from '../components/ObjectionsFAQ';

const partners = [demre, google, ino, losOlivos, mercadoPago, naama, onepay, transbank];
const ease = [0.16, 1, 0.3, 1];
const WA_NUMBER = '56964626568';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

const SYSTEMS = [
  {
    id: 'paes',
    route: '/paes',
    label: 'MUNDO PAES',
    title: 'Subir puntaje',
    accent: 'de verdad.',
    desc: 'Optimización de rendimiento académico para maximizar tu ingreso a la universidad.',
    bg: paesBg,
    cta: 'Ver mi arquitectura',
  },
  {
    id: 'idiomas',
    route: '/idiomas',
    label: 'MUNDO IDIOMAS',
    title: 'Comunicarte',
    accent: 'sin miedo.',
    desc: 'Inglés, Coreano y Español. No es gramática, es ejecución en escenarios reales.',
    bg: idiomasBg,
    cta: 'Configurar sistema',
  },
  {
    id: 'lsch',
    route: '/lsch',
    label: 'MUNDO LSCH',
    title: 'Inclusión',
    accent: 'real.',
    desc: 'Lengua de Señas Chilena con instructores sordos nativos. Rompe la barrera.',
    bg: lschBg,
    cta: 'Entrar al mundo',
  },
  {
    id: 'adultos',
    route: '/adultos',
    label: 'MUNDO ADULTOS',
    title: 'Terminar lo',
    accent: 'que empezaste.',
    desc: 'Nivelación de estudios flexible para quienes el sistema tradicional ignoró.',
    bg: adultosBg,
    cta: 'Ver mi plan de sueños',
  },
  {
    id: 'empresas',
    route: '/empresas',
    label: 'MUNDO EMPRESAS',
    title: 'Rendimiento',
    accent: 'organizacional.',
    desc: 'Capacitación estratégica y cumplimiento legal con enfoque en resultados.',
    bg: empresasBg,
    cta: 'Entrar al mundo',
  },
];

const METHOD = [
  { step: '01', label: 'Diagnóstico', desc: 'Identificamos tu punto de partida real, no el que crees.' },
  { step: '02', label: 'Estrategia', desc: 'Diseñamos un plan táctico basado en tu objetivo y tiempo disponible.' },
  { step: '03', label: 'Acompañamiento', desc: 'Mentores activos que corrigen tu trayectoria en tiempo real.' },
  { step: '04', label: 'Evaluación', desc: 'Simulacros bajo presión real para que el día de la prueba no sea una sorpresa.' }
];

export default function Home() {
  const navigate = useNavigate();

  const handleEvaluation = () => {
    trackEvent('hero_diagnostic_click');
    navigate('/diagnostico');
  };

  return (
    <div className="bg-lael-primary text-lael-light overflow-hidden">
      <Helmet>
        <title>Instituto Lael | No es un preu, es tu arquitectura de éxito</title>
        <meta name="description" content="Si sientes que estudias y no mejoras, no eres el problema. Es el sistema. Diagnóstico táctico PAES, Idiomas y más en Santiago, Chile." />
      </Helmet>

      {/* Grain texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* ── 1. HERO (CINEMÁTICO & EMOCIONAL) ─────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        {/* Background Cinematic Image (Placeholder for night student study) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-lael-primary/40 via-lael-primary/60 to-lael-primary z-10" />
          <div className="absolute inset-0 bg-lael-primary/20 backdrop-blur-[2px] z-0" />
          {/* Note: When generated, hero_home_emotional will go here */}
          <div className="w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity" 
            style={{ backgroundImage: `url(${paesBg})` }} /> 
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div {...fadeUp()} className="mb-10">
             <h2 className="text-lael-accent font-display text-2xl lg:text-3xl italic italic-playfair font-normal">
                Si sientes que estudias y no mejoras, <br className="hidden md:block" /> no eres el problema.
             </h2>
          </motion.div>

          <h1 className="font-display text-5xl lg:text-7xl xl:text-9xl tracking-[-0.04em] font-bold leading-[0.9] max-w-6xl clip-reveal mb-12">
            Te enseñamos a <br/>
            <span className="accent-italic">subir tu puntaje.</span>
          </h1>

          <motion.p {...fadeUp(0.3)} className="text-lael-muted text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-14">
            Corregimos lo que estás haciendo mal, no solo te damos más materia. <br className="hidden md:block" /> ¿Por dónde quieres empezar?
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/diagnostico', { state: { path: 'stagnation' } })}
              className="bg-lael-accent text-white px-8 py-5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all shadow-xl">
              Estoy estancado
            </button>
            <button onClick={() => navigate('/diagnostico', { state: { path: 'target' } })}
              className="bg-lael-secondary border border-lael-bd text-lael-light px-8 py-5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all">
              Quiero mejorar mi puntaje
            </button>
            <button onClick={() => navigate('/diagnostico', { state: { path: 'lost' } })}
              className="bg-transparent border border-lael-accent/30 text-lael-accent px-8 py-5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all">
              No sé por dónde empezar
            </button>
          </motion.div>
          
          <motion.p {...fadeUp(0.9)} className="mt-8 text-[10px] uppercase tracking-[0.3em] text-lael-rust font-bold">
            ⚠ Si no activas hoy, pierdes 1 semana completa de avance estratégico.
          </motion.p>
        </div>
      </section>

      {/* ── 2. DOLOR DIRECTO (EL QUIEBRE) ─────────────────────────────── */}
      <section className="relative w-full py-32 bg-lael-primary flex flex-col items-center px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl w-full relative z-10 text-center lg:text-left">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.5em] uppercase mb-12 font-bold text-center lg:text-left">La Realidad</motion.p>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="font-display text-4xl lg:text-6xl text-lael-light font-bold leading-tight mb-8">
                  El sistema <br />
                  <span className="accent-italic text-lael-accent">te está fallando.</span>
                </h3>
                <div className="space-y-6 text-lael-muted text-lg">
                  <p>Estudias 8 horas al día. Repites guías. Ves videos. Y el puntaje sigue igual.</p>
                  <p className="font-bold text-lael-light">No es tu capacidad. Es tu arquitectura de rendimiento.</p>
                </div>

                {/* HUMAN VOICE COUNTERWEIGHT */}
                <div className="mt-12 p-8 border border-white/5 bg-white/[0.02] rounded-3xl">
                  <p className="text-lael-muted text-sm leading-relaxed">
                    <span className="text-lael-accent font-bold">Siendo honestos…</span> la mayoría de los alumnos que llegan a Lael ya lo han intentado antes. Llegan cansados, frustrados y con la idea de que "no les da la cabeza". 
                    <br/><br/>
                    No llegas acá porque te falta capacidad. Llegas porque nadie te enseñó cómo mejorar bajo presión.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-lael-accent/5 border-l-2 border-lael-accent rounded-r-2xl">
                  <p className="text-lael-light font-medium italic italic-playfair">"Lo intenté en preuniversitarios masivos y era solo un número más. En Lael encontraron exactamente por qué me bloqueaba."</p>
                  <p className="mt-4 text-[10px] uppercase tracking-widest text-lael-muted font-bold">— Constanza, Puntaje Nacional Matemáticas</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── 3. CTA INTERMEDIO (LAEL CHOICE) ───────────────────────────── */}
      <section className="py-20 flex justify-center border-y border-white/[0.03]">
          <button onClick={() => navigate('/diagnostico')}
            className="group flex items-center gap-4 text-lael-accent text-xs tracking-[0.4em] uppercase font-bold hover:gap-8 transition-all">
            Identificar mis fallos ahora <ChevronRight size={16} />
          </button>
      </section>

      {/* ── 4. MUNDOS (LAEL SYSTEMS) ──────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-20">
             <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Explora tu sistema</motion.p>
             <h2 className="font-display text-4xl lg:text-6xl text-lael-light font-bold">Elige tu mundo.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SYSTEMS.map((system, i) => (
              <motion.div 
                key={system.id} 
                {...fadeUp(i * 0.1)} 
                className="group relative aspect-[4/5] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow hover:scale-[1.02] transition-all duration-700"
              >
                 <img 
                   src={system.bg} 
                   alt={system.label} 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                 
                 <div className="absolute bottom-12 left-10 right-10 z-20">
                    <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">{system.label}</p>
                    <h3 className="font-display text-4xl text-white font-bold leading-tight mb-4">
                      {system.title} <br/> 
                      <span className="text-lael-accent italic italic-playfair font-normal">{system.accent}</span>
                    </h3>
                    <p className="text-lael-muted/90 text-sm leading-relaxed mb-8 max-w-[300px]">
                      {system.desc}
                    </p>
                    <div className="space-y-3">
                      <Link to={system.route} className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-lael-accent transition-all duration-500">
                         {system.cta}
                      </Link>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESO (ARQUITECTURA) ─────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd flex flex-col items-center">
        <div className="max-w-5xl w-full">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-16 text-center">Nuestra Arquitectura</motion.p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {METHOD.map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center lg:text-left space-y-6">
                   <div className="font-display text-7xl text-lael-accent/10 font-bold">{item.step}</div>
                   <h4 className="text-lael-light text-2xl font-bold uppercase tracking-widest">{item.label}</h4>
                   <p className="text-lael-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 6. RESULTADOS (DATA REAL) ─────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="max-w-6xl w-full">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-16 text-center">Resultados Comprobados</motion.p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd text-center">
                 <p className="text-emerald-400 text-5xl font-display font-bold mb-2">+140 pts</p>
                 <p className="text-lael-muted text-[10px] uppercase tracking-widest font-bold">Mejora promedio</p>
              </div>
              <div className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd text-center">
                 <p className="text-emerald-400 text-5xl font-display font-bold mb-2">98.2%</p>
                 <p className="text-lael-muted text-[10px] uppercase tracking-widest font-bold">Precisión de diagnóstico</p>
              </div>
              <div className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd text-center">
                 <p className="text-emerald-400 text-5xl font-display font-bold mb-2">4/5</p>
                 <p className="text-lael-muted text-[10px] uppercase tracking-widest font-bold">Entran a su 1era opción</p>
              </div>
           </div>
           
           <InsideLael />
        </div>
      </section>

      {/* ── 7. CIERRE (CTA FINAL & FAQ) ───────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center bg-lael-secondary border-t border-lael-bd">
        <motion.div {...fadeUp(0)} className="text-center max-w-3xl">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10 font-bold">No es para todos. Es para ti.</p>
          <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold leading-[1] mb-12 uppercase tracking-tight">
            ¿Empezamos <br/> tu activación?
          </h2>
          <button onClick={handleEvaluation}
            className="bg-lael-accent text-white px-16 py-7 rounded-2xl text-xs tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all duration-500 shadow-[0_10px_40px_rgba(196,151,62,0.2)]">
            Iniciar diagnóstico táctico →
          </button>
        </motion.div>

        <div className="w-full max-w-5xl mt-32">
           <ObjectionsFAQ />
        </div>
      </section>

    </div>
  );
}

