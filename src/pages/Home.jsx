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
    label: 'Sistema PAES',
    headline: 'No es un preuniversitario.',
    sub: 'Es un sistema de rendimiento.',
    desc: 'Diagnóstico táctico, módulos personalizados y mentores estratégicos para maximizar tu puntaje PAES.',
    tags: ['Diagnóstico de precisión', 'Módulos personalizados', 'Simulacros semanales'],
    cta: 'Iniciar diagnóstico',
  },
  {
    id: 'idiomas',
    route: '/idiomas',
    label: 'Programas de Idiomas',
    headline: 'No aprendes idiomas.',
    sub: 'Ejecutas sistemas de comunicación.',
    desc: 'Inglés, Coreano y Español para Expats. Simulación real, no clases pasivas.',
    tags: ['Inglés · Coreano · Español', 'Preparación IELTS / TOPIK', 'Certificación estratégica'],
    cta: 'Configurar programa',
  },
  {
    id: 'lsch',
    route: '/lsch',
    label: 'Lengua de Señas',
    headline: 'El idioma que',
    sub: 'elimina barreras.',
    desc: 'Aprende LSCh con una instructora Sorda nativa. Cultura, metodología y certificación real.',
    tags: ['Instructora Sorda nativa', 'Ley 21.015', 'Cultura Sorda'],
    cta: 'Elegir plan',
  },
];

const METHOD = [
  { step: '01', label: 'Diagnóstico', desc: 'Identificamos tu punto de partida real, no el que crees.' },
  { step: '02', label: 'Estrategia', desc: 'Diseñamos un plan táctico basado en tu objetivo y tiempo disponible.' },
  { step: '03', label: 'Acompañamiento', desc: 'Mentores activos que corrigen tu trayectoria en tiempo real.' },
  { step: '04', label: 'Evaluación', desc: 'Simulacros bajo presión real para que el día de la export default function Home() {
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

      {/* ── 1. HERO (CONEXIÓN EMOCIONAL) ────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[0.5px] border-lael-accent/[0.06] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.025] rounded-full blur-[100px] pointer-events-none" />

        <motion.div {...fadeUp()} className="mb-10">
           <h2 className="text-lael-accent font-display text-2xl lg:text-3xl italic italic-playfair font-normal">
              Si sientes que estudias y no mejoras, <br className="hidden md:block" /> no eres el problema.
           </h2>
        </motion.div>

        <h1
          className="font-display text-5xl lg:text-7xl xl:text-9xl tracking-[-0.04em] font-bold leading-[0.9] max-w-6xl clip-reveal"
          style={{ opacity: 0, animationDelay: '0.15s' }}
        >
          Ingeniería del <br/>
          <span className="accent-italic">Rendimiento.</span>
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.45, ease }}
          className="mt-12 text-lael-muted text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          No es un preu. Es lo que nos habría gustado tener <br className="hidden md:block" /> cuando estábamos en tu lugar.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.7, ease }}
          className="flex flex-col sm:flex-row gap-6 mt-14">
          <button onClick={handleEvaluation}
            className="bg-lael-accent text-white px-12 py-6 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_4px_30px_rgba(196,151,62,0.25)] hover:shadow-[0_4px_40px_rgba(184,92,56,0.35)] hover:-translate-y-1">
            ¿Quieres saber qué está fallando? →
          </button>
        </motion.div>
      </section>

      {/* ── 2. MUNDOS (VISUAL & PROTAGONISTA) ────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* PAES */}
            <motion.div {...fadeUp(0.1)} className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-lael-bd cinematic-shadow">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
               <div className="absolute inset-0 bg-lael-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-5" />
               <div className="absolute bottom-12 left-10 right-10 z-20">
                  <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Mundo PAES</p>
                  <h3 className="font-display text-4xl text-white font-bold mb-6">Subir puntaje <br/> <span className="text-lael-accent italic italic-playfair font-normal">de verdad.</span></h3>
                  <Link to="/paes" className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 group-hover:bg-lael-accent transition-all">
                     Entrar al mundo
                  </Link>
               </div>
            </motion.div>

            {/* IDIOMAS */}
            <motion.div {...fadeUp(0.2)} className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-lael-bd cinematic-shadow">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
               <div className="absolute bottom-12 left-10 right-10 z-20">
                  <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Mundo Idiomas</p>
                  <h3 className="font-display text-4xl text-white font-bold mb-6">Comunicarte <br/> <span className="text-lael-accent italic italic-playfair font-normal">sin miedo.</span></h3>
                  <Link to="/idiomas" className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 group-hover:bg-lael-accent transition-all">
                     Entrar al mundo
                  </Link>
               </div>
            </motion.div>

            {/* ADULTOS */}
            <motion.div {...fadeUp(0.3)} className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-lael-bd cinematic-shadow">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
               <div className="absolute bottom-12 left-10 right-10 z-20">
                  <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Mundo Adultos</p>
                  <h3 className="font-display text-4xl text-white font-bold mb-6">Terminar lo <br/> <span className="text-lael-accent italic italic-playfair font-normal">que empezaste.</span></h3>
                  <Link to="/adultos" className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 group-hover:bg-lael-accent transition-all">
                     Entrar al mundo
                  </Link>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. CÓMO FUNCIONA (EL PROCESO) ───────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd flex flex-col items-center">
        <div className="max-w-5xl w-full">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10 text-center">El Proceso</motion.p>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                { t: "Diagnóstico", d: "Encontramos el fallo táctico que hoy te tiene estancado.", icon: "01" },
                { t: "Estrategia", d: "No estudias más. Estudias lo que tu diagnóstico detectó.", icon: "02" },
                { t: "Activación", d: "Entrenas bajo presión real con feedback inmediato.", icon: "03" }
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center lg:text-left space-y-6">
                   <div className="font-display text-7xl text-lael-accent/10 font-bold">{item.icon}</div>
                   <h4 className="text-lael-light text-2xl font-bold uppercase tracking-widest">{item.t}</h4>
                   <p className="text-lael-muted leading-relaxed">{item.d}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 4. HISTORIA FILTRADA (CONEXIÓN HUMANA) ────────────────────── */}
      <section className="py-24 px-6 text-center">
         <motion.div {...fadeUp()} className="max-w-3xl mx-auto">
            <p className="text-lael-muted text-lg italic leading-relaxed">
               “Partimos con clases gratis en pandemia. No porque fuera negocio... sino porque era necesario. 
               Hoy somos un sistema tecnológico, pero seguimos teniendo el mismo objetivo: <span className="text-lael-accent font-bold">que nadie se quede atrás por falta de método.</span>”
            </p>
         </motion.div>
      </section>

      {/* ── 5. FILTRO DE COMPROMISO ─────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
           <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-24 uppercase tracking-widest">¿Es esto para ti?</motion.h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div {...fadeUp(0.2)} className="p-12 rounded-[40px] border border-emerald-500/10 bg-emerald-500/[0.02]">
                 <h4 className="text-emerald-400 font-bold mb-8 text-xs uppercase tracking-widest flex items-center gap-3">
                    ✔ Esto es para ti si:
                 </h4>
                 <ul className="space-y-6">
                    <li className="text-lael-muted text-sm flex gap-3">Buscas resultados, no solo asistir a clase.</li>
                    <li className="text-lael-muted text-sm flex gap-3">Estás dispuesto a que te mostremos tus fallos.</li>
                    <li className="text-lael-muted text-sm flex gap-3">Sabes que estudiar más no es la solución.</li>
                 </ul>
              </motion.div>

              <motion.div {...fadeUp(0.3)} className="p-12 rounded-[40px] border border-lael-rust/10 bg-lael-rust/[0.02]">
                 <h4 className="text-lael-rust font-bold mb-8 text-xs uppercase tracking-widest flex items-center gap-3">
                    ✘ Esto NO es para ti si:
                 </h4>
                 <ul className="space-y-6">
                    <li className="text-lael-muted text-sm flex gap-3">Buscas una receta mágica sin esfuerzo.</li>
                    <li className="text-lael-muted text-sm flex gap-3">Prefieres ser un número más en un preu masivo.</li>
                    <li className="text-lael-muted text-sm flex gap-3">No tienes compromiso real con tu futuro.</li>
                 </ul>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 6. RESULTADOS REALES (CON DATA) ─────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd flex flex-col items-center">
        <div className="max-w-6xl w-full">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-16 text-center">Resultados de nuestro sistema</motion.p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-lael-primary rounded-3xl border border-lael-bd text-center">
                 <p className="text-emerald-400 text-5xl font-display font-bold mb-2">+140 pts</p>
                 <p className="text-lael-muted text-[10px] uppercase tracking-widest font-bold">Mejora promedio en 12 semanas</p>
              </div>
              <div className="p-10 bg-lael-primary rounded-3xl border border-lael-bd text-center">
                 <p className="text-emerald-400 text-5xl font-display font-bold mb-2">98.2%</p>
                 <p className="text-lael-muted text-[10px] uppercase tracking-widest font-bold">Precisión de diagnóstico</p>
              </div>
              <div className="p-10 bg-lael-primary rounded-3xl border border-lael-bd text-center">
                 <p className="text-emerald-400 text-5xl font-display font-bold mb-2">4/5</p>
                 <p className="text-lael-muted text-[10px] uppercase tracking-widest font-bold">Alumnos entran a su primera opción</p>
              </div>
           </div>
           <motion.div {...fadeUp(0.4)} className="mt-16 text-center p-10 bg-lael-accent/5 rounded-[40px] border border-lael-accent/10">
              <h3 className="font-display text-2xl lg:text-3xl text-lael-light italic italic-playfair">"Pasé de 580 a 710 puntos. El sistema me enseñó a no tenerle miedo al tiempo."</h3>
              <p className="mt-6 text-lael-muted text-xs uppercase tracking-widest font-bold">— Diego, Medicina UC</p>
           </motion.div>
        </div>
      </section>

      {/* ── 7. ANTES VS DESPUÉS (LENGUAJE REAL) ─────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div {...fadeUp()} className="p-12 bg-lael-secondary rounded-[40px] border border-lael-bd">
                 <h4 className="text-lael-muted text-[10px] tracking-[0.3em] uppercase mb-10 font-bold">Sin el Sistema Lael</h4>
                 <ul className="space-y-8">
                    <li className="flex gap-4 text-lael-muted/50 text-sm italic">"Estudio harto pero en los ensayos saco lo mismo."</li>
                    <li className="flex gap-4 text-lael-muted/50 text-sm italic">"No entiendo por qué me equivoco en estas preguntas."</li>
                    <li className="flex gap-4 text-lael-muted/50 text-sm italic">"El tiempo me come y entro en pánico."</li>
                 </ul>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="p-12 bg-lael-accent/5 rounded-[40px] border border-lael-accent/20">
                 <h4 className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-10 font-bold">Con tu Arquitectura Lael</h4>
                 <ul className="space-y-8">
                    <li className="flex gap-4 text-lael-light text-sm font-bold">Entiendes exactamente en qué fallas y por qué.</li>
                    <li className="flex gap-4 text-lael-light text-sm font-bold">Tienes un estratega que te guía paso a paso.</li>
                    <li className="flex gap-4 text-lael-light text-sm font-bold">El día de la prueba es el más fácil de tu semana.</li>
                 </ul>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 8. INVERSIÓN (DESPUÉS DE CONVENCER) ──────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-t border-lael-bd flex flex-col items-center">
        <div className="max-w-2xl text-center">
           <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold mb-8 uppercase tracking-widest">Inversión Táctica</motion.h2>
           <motion.p {...fadeUp(0.2)} className="text-lael-muted mb-12">
              ¿Trabajas? ¿Tienes poco tiempo? Perfecto. El sistema se arma contigo, no al revés.
           </motion.p>
           <motion.div {...fadeUp(0.3)} className="inline-block p-1 bg-lael-primary rounded-3xl border border-lael-bd">
              <div className="px-12 py-8 text-center">
                 <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-2 font-bold">Planes desde</p>
                 <p className="font-display text-5xl text-lael-light font-bold">$24.990 <span className="text-lg text-lael-muted font-normal">/ mes</span></p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ── 9. INSIDE LAEL (VISUALIZACIÓN) ─────────────────────────── */}
      <InsideLael />

      {/* ── 10. FAQ DIVIDIDO ───────────────────────────────────────── */}
      <ObjectionsFAQ />

      {/* ── 11. CTA FINAL (NATURAL) ─────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center bg-lael-primary">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-3xl">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10 font-bold">El Momento es Ahora</p>
          <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold leading-[1] mb-12 uppercase tracking-tight">
            ¿Quieres saber <br/> qué está fallando?
          </h2>
          <p className="text-lael-muted text-lg mb-14 leading-relaxed italic italic-playfair">
            Si llegaste hasta acá, ya sabes que estudiar más no es la solución. <br className="hidden md:block" /> Ahora necesitas saber qué corregir.
          </p>
          <button onClick={handleEvaluation}
            className="bg-lael-accent text-white px-16 py-7 rounded-2xl text-xs tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all duration-500 shadow-[0_10px_40px_rgba(196,151,62,0.2)] hover:shadow-[0_10px_50px_rgba(184,92,56,0.3)]">
            Iniciar diagnóstico táctico →
          </button>
        </motion.div>
      </section>

    </div>
  );
}

