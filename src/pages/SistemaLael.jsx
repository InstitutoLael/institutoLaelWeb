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
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease }
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
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-hidden font-sans">
      <Helmet>
        <title>Cómo Funciona | Instituto Lael</title>
        <meta name="description" content="Cómo funciona Instituto Lael paso a paso: diagnóstico gratis, eliges tus ramos, clases en vivo por Google Meet, grabaciones y ensayo mensual. Matrícula gratis." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
            Paso a paso
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-8"
          >
            Así funciona <br /> <span className="bg-[#071D49] text-[#D7E400] px-3">Lael.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#8D8D8D] text-lg max-w-2xl mx-auto leading-relaxed">
            Desde que nos escribes hasta tu primer ensayo, contado simple.
          </motion.p>
        </div>
      </section>

      {/* ── PASOS ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUp(i * 0.1)}
              className="relative bg-white rounded-[32px] p-8 border border-[#071D49]/5 shadow-card overflow-hidden"
            >
              <span className="absolute right-5 top-3 font-display font-black text-7xl text-[#071D49]/5 select-none pointer-events-none">
                {i + 1}
              </span>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: BLUE }}>
                <step.icon size={24} style={{ color: YELLOW }} />
              </div>
              <h2 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{step.title}</h2>
              <p className="text-[#8D8D8D] text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LO QUE NECESITAS ─────────────────────────────────────────── */}
      <section className="px-6 py-24 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-12">
            Lo único que necesitas
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REQUIREMENTS.map((r, i) => (
              <motion.div key={r.text} {...fadeUp(i * 0.1)} className="rounded-[24px] p-6 bg-white/5 border border-white/10 flex flex-col items-center gap-4">
                <r.icon size={28} style={{ color: YELLOW }} />
                <p className="text-white/80 text-sm font-semibold">{r.text}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp(0.3)} className="text-white/60 text-sm mt-12">
            ¿Quieres saber cómo enseñamos en clases?{' '}
            <Link to="/metodo" className="font-bold underline underline-offset-4" style={{ color: YELLOW }}>
              Conoce nuestro método
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight mb-10">
            ¿Partimos?
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl transition-all active:scale-95"
            >
              Hacer el diagnóstico gratis <ArrowRight size={16} />
            </Link>
            <a
              href={PAES_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl transition-all active:scale-95"
            >
              Inscribirme gratis
            </a>
          </motion.div>
          <motion.a
            {...fadeUp(0.2)}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-xs font-semibold uppercase tracking-wider text-[#071D49]/60 hover:text-[#071D49] hover:underline"
          >
            <MessageCircle size={16} /> ¿Dudas? Escríbenos por WhatsApp
          </motion.a>
        </div>
      </section>
    </div>
  );
}
