import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
  { step: '04', label: 'Evaluación', desc: 'Simulacros bajo presión real para que el día de la prueba sea familiar.' },
];

export default function Home() {
  const handleEvaluation = () => {
    const msg = encodeURIComponent('Hola, quiero solicitar una evaluación inicial en Instituto Lael. ¿Por dónde comienzo?');
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-lael-primary text-lael-light overflow-hidden">
      <Helmet>
        <title>Instituto Lael | Educación Online en Chile — PAES Gratis, Idiomas, IA</title>
        <meta name="description" content="No entrenamos para pruebas. Formamos sistemas de rendimiento. PAES, Idiomas (Inglés, Coreano) y Lengua de Señas Chilena. Santiago, Chile." />
      </Helmet>

      {/* Grain texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[0.5px] border-lael-accent/[0.06] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[0.5px] border-lael-accent/[0.04] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.025] rounded-full blur-[100px] pointer-events-none" />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease }}
          className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-10">
          Instituto Lael · Chile
        </motion.p>

        <h1
          className="font-display text-5xl lg:text-7xl xl:text-8xl tracking-[-0.02em] font-bold leading-tight max-w-5xl clip-reveal"
          style={{ opacity: 0, animationDelay: '0.15s' }}
        >
          No entrenamos para pruebas.
          <br />
          <span className="accent-italic">
            Formamos sistemas de rendimiento.
          </span>
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.45, ease }}
          className="mt-10 text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
          PAES · Idiomas · Lengua de Señas Chilena
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.7, ease }}
          className="flex flex-col sm:flex-row gap-4 mt-14">
          <button onClick={handleEvaluation}
            className="bg-lael-accent text-white px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-[0_4px_20px_rgba(196,151,62,0.3)] hover:shadow-[0_4px_30px_rgba(184,92,56,0.4)] hover:-translate-y-1">
            Solicitar evaluación
          </button>
          <Link to="/paes"
            className="bg-lael-secondary border border-lael-bd text-lael-light px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:border-lael-accent transition-all duration-500 text-center hover:shadow-[0_4px_20px_rgba(13,13,13,0.05)] hover:-translate-y-1">
            Explorar sistemas
          </Link>
        </motion.div>
      </section>

      {/* ── 2. ELIGE TU MUNDO ────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-6xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Explora tu sistema</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-20 leading-tight">
            No vendemos programas.<br />Vendemos universos de rendimiento.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PAES */}
            <motion.div {...fadeUp(0.1)} className="group p-10 bg-lael-secondary hover-card rounded-2xl border border-lael-bd">
              <p className="text-lael-accent text-[9px] tracking-[0.2em] uppercase mb-6 font-bold">[ PAES ]</p>
              <h3 className="font-display text-2xl text-lael-light font-bold mb-4">Subir puntaje</h3>
              <p className="text-lael-muted text-sm leading-relaxed mb-10">Optimización de rendimiento académico para maximizar tu ingreso a la universidad.</p>
              <Link to="/paes" className="text-[10px] tracking-[0.2em] uppercase text-lael-accent font-bold group-hover:translate-x-2 transition-transform inline-block">Entrar al mundo →</Link>
            </motion.div>

            {/* IDIOMAS */}
            <motion.div {...fadeUp(0.2)} className="group p-10 bg-lael-secondary hover-card rounded-2xl border border-lael-bd">
              <p className="text-lael-accent text-[9px] tracking-[0.2em] uppercase mb-6 font-bold">[ IDIOMAS ]</p>
              <h3 className="font-display text-2xl text-lael-light font-bold mb-4">Comunicarte globalmente</h3>
              <p className="text-lael-muted text-sm leading-relaxed mb-10">Inglés, Coreano y Español. No es gramática, es ejecución en escenarios reales.</p>
              <Link to="/idiomas" className="text-[10px] tracking-[0.2em] uppercase text-lael-accent font-bold group-hover:translate-x-2 transition-transform inline-block">Entrar al mundo →</Link>
            </motion.div>

            {/* LSCh */}
            <motion.div {...fadeUp(0.3)} className="group p-10 bg-lael-secondary hover-card rounded-2xl border border-lael-bd">
              <p className="text-lael-accent text-[9px] tracking-[0.2em] uppercase mb-6 font-bold">[ LSCh ]</p>
              <h3 className="font-display text-2xl text-lael-light font-bold mb-4">Inclusión real</h3>
              <p className="text-lael-muted text-sm leading-relaxed mb-10">Lengua de Señas Chilena con instructores sordos nativos. Rompe la barrera.</p>
              <Link to="/lsch" className="text-[10px] tracking-[0.2em] uppercase text-lael-accent font-bold group-hover:translate-x-2 transition-transform inline-block">Entrar al mundo →</Link>
            </motion.div>

            {/* ADULTOS */}
            <motion.div {...fadeUp(0.4)} className="group p-10 bg-lael-secondary hover-card rounded-2xl border border-lael-bd">
              <p className="text-lael-accent text-[9px] tracking-[0.2em] uppercase mb-6 font-bold">[ ADULTOS ]</p>
              <h3 className="font-display text-2xl text-lael-light font-bold mb-4">Terminar lo que empezaste</h3>
              <p className="text-lael-muted text-sm leading-relaxed mb-10">Nivelación de estudios flexible para quienes el sistema tradicional ignoró.</p>
              <Link to="/adultos" className="text-[10px] tracking-[0.2em] uppercase text-lael-accent font-bold group-hover:translate-x-2 transition-transform inline-block">Entrar al mundo →</Link>
            </motion.div>

            {/* EMPRESAS */}
            <motion.div {...fadeUp(0.5)} className="group p-10 bg-lael-secondary hover-card rounded-2xl border border-lael-bd">
              <p className="text-lael-accent text-[9px] tracking-[0.2em] uppercase mb-6 font-bold">[ EMPRESAS ]</p>
              <h3 className="font-display text-2xl text-lael-light font-bold mb-4">Rendimiento organizacional</h3>
              <p className="text-lael-muted text-sm leading-relaxed mb-10">Capacitación estratégica y cumplimiento legal con enfoque en resultados.</p>
              <Link to="/empresas" className="text-[10px] tracking-[0.2em] uppercase text-lael-accent font-bold group-hover:translate-x-2 transition-transform inline-block">Entrar al mundo →</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. RESULTADOS REALES ────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd flex flex-col items-center">
        <div className="max-w-4xl text-center">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10">Resultados Reales</motion.p>
          <motion.div {...fadeUp(0.2)} className="relative px-12 py-20 bg-lael-primary rounded-[40px] border border-lael-bd">
             <span className="absolute top-10 left-10 text-8xl font-display text-lael-accent/10">"</span>
             <h3 className="font-display text-3xl lg:text-4xl text-lael-light mb-8 italic">
                Subí de 580 a 710 en 4 meses.
             </h3>
             <p className="text-lael-muted tracking-[0.1em] uppercase text-xs">— Estudiante Lael</p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. PARA QUIÉN ES LAEL ────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8 text-center">Filtro de Compromiso</motion.p>
           <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-24">¿Es esto para ti?</motion.h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div {...fadeUp(0.2)} className="p-10 rounded-3xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                 <h4 className="text-emerald-400 font-bold mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center text-xs">✔</span>
                    Esto es para ti si:
                 </h4>
                 <ul className="space-y-6">
                    <li className="text-lael-muted text-sm flex gap-3"><span className="text-emerald-400">·</span> Quieres resultados medibles</li>
                    <li className="text-lael-muted text-sm flex gap-3"><span className="text-emerald-400">·</span> Estás dispuesto a entrenar</li>
                    <li className="text-lael-muted text-sm flex gap-3"><span className="text-emerald-400">·</span> No buscas clases tradicionales</li>
                 </ul>
              </motion.div>

              <motion.div {...fadeUp(0.3)} className="p-10 rounded-3xl border border-lael-rust/10 bg-lael-rust/[0.02]">
                 <h4 className="text-lael-rust font-bold mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-lael-rust/10 flex items-center justify-center text-xs">✘</span>
                    Esto NO es para ti si:
                 </h4>
                 <ul className="space-y-6">
                    <li className="text-lael-muted text-sm flex gap-3"><span className="text-lael-rust">·</span> Solo quieres "probar"</li>
                    <li className="text-lael-muted text-sm flex gap-3"><span className="text-lael-rust">·</span> No toleras presión</li>
                    <li className="text-lael-muted text-sm flex gap-3"><span className="text-lael-rust">·</span> Buscas clases pasivas</li>
                 </ul>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 5. INVERSIÓN ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-t border-lael-bd flex flex-col items-center">
        <div className="max-w-2xl text-center">
           <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10">Transparencia</motion.p>
           <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold mb-8">Inversión</motion.h2>
           <motion.p {...fadeUp(0.2)} className="text-lael-muted mb-12">
              No vendemos cursos genéricos. Ofrecemos sistemas personalizados según tu punto de partida.
           </motion.p>
           <motion.div {...fadeUp(0.3)} className="inline-block p-1 bg-lael-primary rounded-2xl border border-lael-bd">
              <div className="px-10 py-6">
                 <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-2">Programas desde</p>
                 <p className="font-display text-4xl text-lael-light">$24.990 <span className="text-lg text-lael-muted">/ mensual</span></p>
              </div>
           </motion.div>
           <motion.p {...fadeUp(0.4)} className="mt-8 text-[10px] text-lael-muted uppercase tracking-widest italic">
              Adaptado a tu diagnóstico inicial
           </motion.p>
        </div>
      </section>

      {/* ── 6. MÉTODO ────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Cómo funciona</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-20">
            El proceso que genera resultados.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHOD.map((m, i) => (
              <motion.div key={m.step} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-lael-secondary hover-card border border-lael-bd cinematic-shadow">
                <p className="font-display text-5xl text-lael-accent/40 font-bold mb-4">{m.step}</p>
                <h3 className="text-lael-light font-semibold mb-3 tracking-wide">{m.label}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PARTNERS ──────────────────────────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="separator-gradient top-0" />
        <motion.p {...fadeUp(0)} className="text-lael-muted text-[9px] tracking-[0.3em] uppercase text-center mb-12">
          Aliados y partners
        </motion.p>
        <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
          {[...partners, ...partners].map((src, i) => (
            <img key={i} src={src} alt="partner" loading="lazy" className="h-10 lg:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-500 flex-shrink-0 mix-blend-multiply grayscale hover:grayscale-0" />
          ))}
        </div>
      </section>

      {/* ── 8. CTA FINAL ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Comenzar ahora</p>
          <h2 className="font-display text-4xl lg:text-6xl text-lael-light font-bold leading-tight mb-10">
            Tu sistema de rendimiento comienza con una evaluación.
          </h2>
          <p className="text-lael-muted text-base mb-14 leading-relaxed">
            Sin compromiso. Sin formularios eternos. En 15 minutos sabemos qué sistema necesitas y cómo activarlo.
          </p>
          <button onClick={handleEvaluation}
            className="bg-lael-accent text-white px-14 py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)] hover:shadow-[0_4px_30px_rgba(184,92,56,0.4)]">
            Solicitar evaluación gratuita →
          </button>
          <p className="mt-8 text-[10px] text-lael-muted tracking-[0.1em] uppercase">
            Respuesta en menos de 24 horas
          </p>
        </motion.div>
      </section>
    </div>
  );
}
