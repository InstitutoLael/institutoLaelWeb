import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ListChecks, Video, Timer, Laptop, Wifi, UserCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { PAES_FORM_URL } from '../data/paes';

const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHATSAPP_URL = 'https://wa.me/56964626568?text=Hola,%20quiero%20saber%20c%C3%B3mo%20funciona%20Instituto%20Lael';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease }
});

const STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Nos cuentas dónde estás',
    desc: 'Haz el diagnóstico gratis o escríbenos por WhatsApp. Con eso sabemos qué te cuesta y qué necesitas.',
  },
  {
    icon: ListChecks,
    title: 'Eliges tus ramos',
    desc: 'La matrícula es gratis y pagas solo por los ramos que tomas. Si el costo es un problema, puedes postular a una beca.',
  },
  {
    icon: Video,
    title: 'Vas a clases en vivo',
    desc: 'Dos clases de una hora a la semana por ramo, por Google Meet, desde las 18:00. Cada semana recibes las grabaciones para repasar.',
  },
  {
    icon: Timer,
    title: 'Practicas y revisamos',
    desc: 'Cada mes haces un ensayo con el mismo tiempo que da la PAES. Vemos tus resultados y ajustamos en qué poner el foco.',
  },
];

const REQUIREMENTS = [
  { icon: Laptop, text: 'Un computador, tablet o celular' },
  { icon: Wifi, text: 'Conexión a internet' },
  { icon: UserCircle, text: 'Una cuenta de Google para entrar a Meet' },
];

export default function SistemaLael() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Cómo Funciona | Instituto Lael</title>
        <meta name="description" content="Cómo funciona Instituto Lael paso a paso: diagnóstico gratis, eliges tus ramos, clases en vivo por Google Meet, grabaciones y ensayo mensual. Matrícula gratis." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D7E400] ring-2 ring-[#071D49]/10" aria-hidden="true" />
            Paso a paso
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] mb-6"
          >
            Así funciona <br /> <span className="bg-[#071D49] text-[#D7E400] px-3">Lael.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#071D49]/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Desde que nos escribes hasta tu primer ensayo, contado simple.
          </motion.p>
        </div>
      </section>

      {/* ── PASOS ────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUp(i * 0.1)}
              className="relative bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card overflow-hidden"
            >
              <span className="absolute right-5 top-3 font-display font-black text-7xl text-[#071D49]/5 select-none pointer-events-none">
                {i + 1}
              </span>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: BLUE }}>
                <step.icon size={24} style={{ color: YELLOW }} />
              </div>
              <h2 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{step.title}</h2>
              <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LO QUE NECESITAS ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-8 sm:mb-12">
            Lo único que necesitas
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {REQUIREMENTS.map((r, i) => (
              <motion.div key={r.text} {...fadeUp(i * 0.1)} className="rounded-[24px] p-5 sm:p-6 bg-white/5 border border-white/10 flex sm:flex-col items-center gap-4 text-left sm:text-center">
                <r.icon size={28} style={{ color: YELLOW }} />
                <p className="text-white/85 text-sm sm:text-base font-semibold">{r.text}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp(0.3)} className="text-white/75 text-sm sm:text-base mt-8 sm:mt-12">
            ¿Quieres saber cómo enseñamos en clases?{' '}
            <Link to="/metodo" className="font-bold underline underline-offset-4" style={{ color: YELLOW }}>
              Conoce nuestro método
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-8">
            ¿Partimos?
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] min-h-[48px] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all active:scale-95"
            >
              Hacer el diagnóstico gratis <ArrowRight size={16} />
            </Link>
            <a
              href={PAES_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white min-h-[48px] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all active:scale-95"
            >
              Inscribirme gratis
            </a>
          </motion.div>
          <motion.a
            {...fadeUp(0.2)}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 min-h-[44px] text-sm font-semibold text-[#071D49]/75 hover:text-[#071D49] hover:underline"
          >
            <MessageCircle size={16} /> ¿Dudas? Escríbenos por WhatsApp
          </motion.a>
        </div>
      </section>
    </div>
  );
}
