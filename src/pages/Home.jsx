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
    <div className="bg-[#0B0B0B] text-lael-light overflow-hidden">
      <Helmet>
        <title>Instituto Lael | Educación Online en Chile — PAES Gratis, Idiomas, IA</title>
        <meta name="description" content="No entrenamos para pruebas. Formamos sistemas de rendimiento. PAES, Idiomas (Inglés, Coreano) y Lengua de Señas Chilena. Santiago, Chile." />
      </Helmet>

      {/* Grain texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.025] mix-blend-overlay"
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
            className="bg-lael-accent text-lael-primary px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(198,166,107,0.25)]">
            Solicitar evaluación
          </button>
          <Link to="/paes"
            className="bg-white/[0.03] border border-white/10 text-lael-light px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white/[0.06] transition-all duration-500 text-center">
            Explorar sistemas
          </Link>
        </motion.div>
      </section>

      {/* ── 2. SISTEMAS ──────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-6xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Nuestros sistemas</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-6xl text-lael-light font-bold text-center mb-20 leading-tight">
            Tres sistemas.<br />Un solo objetivo: tu resultado.
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SYSTEMS.map((sys, i) => (
              <motion.div key={sys.id} {...fadeUp(i * 0.12)}
                className="group p-10 lg:p-12 bg-[#080808] hover:bg-[#0D0D0D] flex flex-col relative overflow-hidden hover-card rounded-2xl">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lael-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-6">{sys.label}</p>
                <h3 className="font-display text-2xl lg:text-3xl text-lael-light font-bold leading-tight mb-2">{sys.headline}</h3>
                <h3 className="font-display text-2xl lg:text-3xl text-lael-accent font-bold leading-tight mb-6">{sys.sub}</h3>
                <p className="text-lael-muted/60 text-sm leading-relaxed mb-8 flex-1">{sys.desc}</p>
                <div className="space-y-2 mb-10">
                  {sys.tags.map(t => <p key={t} className="text-[10px] tracking-[0.12em] text-lael-muted/40 uppercase">· {t}</p>)}
                </div>
                <Link to={sys.route}
                  className="text-[11px] tracking-[0.2em] uppercase text-lael-accent border border-lael-accent/30 px-6 py-3 rounded-lg text-center hover:bg-lael-accent hover:text-lael-primary transition-all duration-500 font-bold">
                  {sys.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MANIFIESTO ────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-3xl text-center">
          <motion.p {...fadeUp(0)} className="font-display text-3xl lg:text-5xl text-lael-muted/30 leading-tight mb-4">
            La mayoría memoriza.
          </motion.p>
          <motion.p {...fadeUp(0.2)} className="font-display text-3xl lg:text-5xl text-lael-light leading-tight mb-4">
            Nosotros entrenamos criterio.
          </motion.p>
          <motion.div {...fadeUp(0.4)} className="w-16 h-[1px] bg-lael-accent/40 mx-auto mt-10 mb-10" />
          <motion.p {...fadeUp(0.5)} className="text-lael-muted/50 text-sm leading-relaxed max-w-lg mx-auto">
            El sistema educativo premia la repetición. Nosotros premiamos la comprensión estratégica. La diferencia no es cuánto estudias. Es cómo entrenas.
          </motion.p>
        </div>
      </section>

      {/* ── 4. MÉTODO ────────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Cómo funciona</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-20">
            El proceso que genera resultados.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHOD.map((m, i) => (
              <motion.div key={m.step} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl bg-[#080808] hover-card">
                <p className="font-display text-5xl text-lael-accent/20 font-bold mb-4">{m.step}</p>
                <h3 className="text-lael-light font-semibold mb-3 tracking-wide">{m.label}</h3>
                <p className="text-lael-muted/50 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PARTNERS ──────────────────────────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="separator-gradient top-0" />
        <motion.p {...fadeUp(0)} className="text-lael-muted/30 text-[9px] tracking-[0.3em] uppercase text-center mb-12">
          Aliados y partners
        </motion.p>
        <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
          {[...partners, ...partners].map((src, i) => (
            <img key={i} src={src} alt="partner" className="h-7 lg:h-8 object-contain opacity-25 hover:opacity-60 transition-opacity duration-500 grayscale flex-shrink-0" />
          ))}
        </div>
      </section>

      {/* ── 6. CTA FINAL ─────────────────────────────────────────────── */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Comenzar ahora</p>
          <h2 className="font-display text-4xl lg:text-6xl text-lael-light font-bold leading-tight mb-10">
            Tu sistema de rendimiento comienza con una evaluación.
          </h2>
          <p className="text-lael-muted/50 text-base mb-14 leading-relaxed">
            Sin compromiso. Sin formularios eternos. En 15 minutos sabemos qué sistema necesitas y cómo activarlo.
          </p>
          <button onClick={handleEvaluation}
            className="bg-lael-accent text-lael-primary px-14 py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-[0_0_40px_rgba(198,166,107,0.3)] hover:shadow-[0_0_80px_rgba(198,166,107,0.5)]">
            Solicitar evaluación gratuita →
          </button>
          <p className="mt-8 text-[10px] text-lael-muted/30 tracking-[0.1em] uppercase">
            Respuesta en menos de 24 horas
          </p>
        </motion.div>
      </section>
    </div>
  );
}
