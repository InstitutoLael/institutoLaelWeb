import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MessageCircle, ChevronDown, CalendarDays, Heart } from 'lucide-react';
import adultosImg from '../../assets/img/Home/mundo_adultos_bg_1777944001677.webp';
import { ADULT_HERO, ADULT_FREE_NOTE, ADULT_LEVELS, ADULT_CYCLES, ADULT_STEPS, ADULT_FAQS } from '../../data/nivelacion';

const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHATSAPP_URL = 'https://wa.me/56964626568?text=Hola,%20quiero%20terminar%20mis%20estudios%20con%20la%20nivelaci%C3%B3n%20para%20adultos%20de%20Lael';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});

export default function NivelacionAdultos() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-hidden font-sans">
      <Helmet>
        <title>Nivelación de Estudios para Adultos (gratis) | Instituto Lael</title>
        <meta name="description" content="Termina tu enseñanza básica o media siendo mayor de 18. Te preparamos gratis para los exámenes libres del Mineduc, con clases online en vivo." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-40 pb-28 px-6 text-white overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
          <img src={adultosImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#071D49]/60 to-[#071D49]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6" style={{ color: YELLOW }}>
            {ADULT_HERO.eyebrow}
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl sm:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[1] mb-8">
            {ADULT_HERO.title} <br /> <span style={{ color: YELLOW }}>{ADULT_HERO.accent}</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            {ADULT_HERO.desc}
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl transition-all active:scale-95">
              Quiero terminar mis estudios <ArrowRight size={16} />
            </a>
            <a href="#niveles" className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl transition-all active:scale-95">
              Ver niveles
            </a>
          </motion.div>
          <motion.div {...fadeUp(0.4)} className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-14 max-w-xl mx-auto">
            {[['Gratis', 'Preparación'], ['2 veces', 'Al año rindes'], ['+18', 'Años']].map(([v, l]) => (
              <div key={l}>
                <p className="font-display font-extrabold text-xl uppercase" style={{ color: YELLOW }}>{v}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-1">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NIVELES ──────────────────────────────────────────────────── */}
      <section id="niveles" className="px-6 py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Cubrimos todo</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-[-0.03em]">
              ¿Qué nivel te toca?
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADULT_LEVELS.map((lvl, i) => (
              <motion.div key={lvl.id} {...fadeUp(i * 0.1)} className="bg-white rounded-[32px] p-8 border border-[#071D49]/5 shadow-card flex flex-col">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-2">{lvl.title}</h3>
                <p className="text-sm font-semibold mb-6" style={{ color: '#8D8D8D' }}>{lvl.equiv}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#071D49]/50 mb-3">Asignaturas</p>
                <ul className="space-y-2">
                  {lvl.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: BLUE }} /> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CICLOS ───────────────────────────────────────────────────── */}
      <section className="px-6 py-24 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4" style={{ color: YELLOW }}>Un ciclo por semestre</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Dos oportunidades al año
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADULT_CYCLES.map((c, i) => (
              <motion.div key={c.title} {...fadeUp(i * 0.1)} className="rounded-[32px] p-8 bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarDays size={22} style={{ color: YELLOW }} />
                  <h3 className="font-display text-xl font-extrabold uppercase">{c.title}</h3>
                </div>
                <p className="text-white font-semibold">{c.when} · <span style={{ color: YELLOW }}>{c.exam}</span></p>
                <p className="text-white/60 text-sm leading-relaxed mt-3">{c.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASOS ────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Paso a paso</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-[-0.03em]">
              Cómo funciona
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADULT_STEPS.map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.1)} className="rounded-[32px] p-8 bg-[#F4F4F4]">
                <p className="font-display text-4xl font-black mb-4" style={{ color: BLUE }}>{step.num}</p>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="text-[#8D8D8D] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="mt-12 max-w-2xl mx-auto rounded-[24px] border-2 border-dashed border-[#071D49]/15 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#D7E400] flex items-center justify-center flex-shrink-0">
              <Heart size={20} style={{ color: BLUE }} />
            </div>
            <p className="text-[#071D49]/80 text-sm leading-relaxed">{ADULT_FREE_NOTE}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-center mb-12">
            Preguntas frecuentes
          </motion.h2>
          <div className="space-y-4">
            {ADULT_FAQS.map((faq, idx) => (
              <div key={faq.q} className="border border-[#071D49]/10 rounded-[24px] overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold font-display uppercase tracking-tight pr-6">{faq.q}</span>
                  <ChevronDown size={18} className={`flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                      <p className="px-6 pb-6 text-[#8D8D8D] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#8D8D8D] mt-8">
            Información oficial del proceso en{' '}
            <a href="https://www.ayudamineduc.cl" target="_blank" rel="noopener noreferrer" className="underline">ayudamineduc.cl</a>
            {' '}y{' '}
            <a href="https://epja.mineduc.cl" target="_blank" rel="noopener noreferrer" className="underline">epja.mineduc.cl</a>.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center text-white" style={{ backgroundColor: BLUE }}>
        <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight mb-6">
          Tu sueño no tiene <br /> <span style={{ color: YELLOW }}>fecha de vencimiento.</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-white/70 text-lg max-w-xl mx-auto mb-10">
          Escríbenos y vemos juntos por dónde partir.
        </motion.p>
        <motion.a {...fadeUp(0.2)} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all active:scale-95">
          <MessageCircle size={16} /> Escribir por WhatsApp
        </motion.a>
      </section>
    </div>
  );
}
