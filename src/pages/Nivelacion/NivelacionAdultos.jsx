import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '../../components/ui/PageHero';
import Duotone from '../../components/ui/Duotone';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
import { Calendario, Corazon } from '../../components/icons/LaelIcons';
import adultosImg from '../../assets/img/Home/mundo_adultos_bg_1777944001677.webp';
import { ADULT_HERO, ADULT_FREE_NOTE, ADULT_LEVELS, ADULT_CYCLES, ADULT_STEPS, ADULT_FAQS, ADULT_PAES_PACK } from '../../data/nivelacion';

const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHATSAPP_URL = 'https://wa.me/56964626568?text=Hola,%20quiero%20terminar%20mis%20estudios%20con%20la%20nivelaci%C3%B3n%20para%20adultos%20de%20Lael';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease },
});

// Pasos 01 → 04 unidos por una línea que se dibuja al llegar a la sección:
// el camino desde que nos escribes hasta que apruebas. Horizontal en
// computador, vertical en celular.
function CaminoPasos({ pasos }) {
  const linea = { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true, margin: '-120px' }, transition: { duration: 1.4, ease } };
  return (
    <div className="relative">
      <motion.div aria-hidden="true" {...linea} className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[3px] rounded-full bg-programa origin-left" />
      <motion.div aria-hidden="true" {...linea} className="lg:hidden absolute top-7 bottom-7 left-7 w-[3px] rounded-full bg-programa origin-top" />
      <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-6">
        {pasos.map((step, i) => (
          <li key={step.num} className="flex lg:flex-col lg:items-center gap-5 lg:gap-0 lg:text-center">
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.25 + i * 0.3 }}
              className="relative z-10 w-14 h-14 rounded-full bg-[#071D49] text-programa font-display font-extrabold text-lg flex items-center justify-center flex-shrink-0 ring-8 ring-white lg:mb-6"
            >
              {step.num}
            </motion.span>
            <motion.div {...fadeUp(0.3 + i * 0.3)} className="pt-2 lg:pt-0">
              <h3 className="font-display text-lg font-extrabold tracking-tight mb-2">{step.title}</h3>
              <p className="text-[#071D49]/70 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function NivelacionAdultos() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Escuela de Sueños: Nivelación de Estudios para Adultos (gratis) | Instituto Lael</title>
        <meta name="description" content="Termina tu enseñanza básica o media siendo mayor de 18. Te preparamos gratis para los exámenes libres del Mineduc, con clases online en vivo." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow={ADULT_HERO.eyebrow}
        title={ADULT_HERO.title}
        accent={ADULT_HERO.accent}
        desc={ADULT_HERO.desc}
        stats={[['Gratis', 'Preparación'], ['20:00', 'Clases en la noche'], ['+18', 'Años']]}
        actions={<>
          <a href="/inscripcion?programa=adultos" data-cursor="Vamos" className="inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[52px] px-8 rounded-full transition-colors bg-[#D7E400] text-[#071D49] hover:bg-white">
            Quiero terminar mis estudios <ArrowRight size={16} />
          </a>
          <a href="#niveles" className="inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[52px] px-8 rounded-full transition-colors border border-white/30 text-white hover:bg-white hover:text-[#071D49]">Ver niveles</a>
        </>}
        aside={<Duotone src={adultosImg} color="#FF9F7A" loading="eager" className="group hidden lg:block aspect-[4/5] rounded-[40px]" />}
      />

      {/* ── NIVELES ──────────────────────────────────────────────────── */}
      <section id="niveles" className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Básica y media</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[-0.03em]">
              ¿Qué nivel <span className="accent-serif">te toca?</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADULT_LEVELS.map((lvl, i) => (
              <motion.div key={lvl.id} {...fadeUp(i * 0.1)} className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card flex flex-col">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-2">{lvl.title}</h3>
                <p className="text-sm font-semibold mb-6 text-[#071D49]/70">{lvl.equiv}</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#071D49]/70 mb-3">Asignaturas</p>
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
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-programa">Un ciclo por semestre</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              Dos oportunidades <span className="accent-serif text-programa">al año.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADULT_CYCLES.map((c, i) => (
              <motion.div key={c.title} {...fadeUp(i * 0.1)} className="rounded-[28px] p-6 sm:p-8 bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendario size={24} className="text-white flex-shrink-0" />
                  <h3 className="font-display text-xl font-extrabold uppercase">{c.title}</h3>
                </div>
                <p className="text-white font-semibold">{c.when} · <span className="text-programa">{c.exam}</span></p>
                <p className="text-white/75 text-sm leading-relaxed mt-3">{c.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASOS ────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Paso a paso</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[-0.03em]">
              Cómo <span className="accent-serif">funciona.</span>
            </motion.h2>
          </div>
          <CaminoPasos pasos={ADULT_STEPS} />
          <motion.div {...fadeUp(0.2)} className="mt-12 max-w-2xl mx-auto rounded-[24px] border-2 border-dashed border-[#071D49]/15 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#D7E400] flex items-center justify-center flex-shrink-0">
              <Corazon size={24} accent="#FFFFFF" style={{ color: BLUE }} />
            </div>
            <p className="text-[#071D49]/80 text-sm leading-relaxed">{ADULT_FREE_NOTE}</p>
          </motion.div>
        </div>
      </section>

      {/* ── NIVELACIÓN + PAES ────────────────────────────────────────── */}
      <section id="nivelacion-paes" className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 scroll-mt-24">
        <motion.div {...fadeUp(0)} className="max-w-5xl mx-auto rounded-[28px] p-6 sm:p-10 lg:p-14 text-white shadow-lael grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" style={{ backgroundColor: BLUE }}>
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: YELLOW }}>{ADULT_PAES_PACK.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-5">
              {ADULT_PAES_PACK.title} <span style={{ color: YELLOW }}>{ADULT_PAES_PACK.accent}</span>
            </h2>
            <p className="text-white/75 leading-relaxed">{ADULT_PAES_PACK.desc}</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-left" style={{ backgroundColor: YELLOW, color: BLUE }}>
              <span className="font-display text-4xl font-black leading-none">{ADULT_PAES_PACK.discount}</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight">de descuento en el<br />primer semestre</span>
            </div>
          </div>
          <div>
            <ol className="space-y-4 mb-8">
              {ADULT_PAES_PACK.steps.map((s, i) => (
                <li key={s.title} className="rounded-[24px] p-5 sm:p-6 bg-white/5 border border-white/10 flex gap-4">
                  <span className="font-display text-2xl font-black flex-shrink-0" style={{ color: YELLOW }}>{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block font-display font-extrabold uppercase tracking-tight mb-1">{s.title}</span>
                    <span className="block text-white/75 text-sm leading-relaxed">{s.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href={`https://wa.me/56964626568?text=${encodeURIComponent(ADULT_PAES_PACK.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-6 py-4 rounded-2xl transition-all active:scale-95">
                <MessageCircle size={16} /> Quiero este camino
              </a>
              <Link to="/paes" className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-6 py-4 rounded-2xl transition-all active:scale-95">
                Ver preu PAES <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-12">
            Preguntas <span className="accent-serif">frecuentes.</span>
          </motion.h2>
          <div className="space-y-4">
            {ADULT_FAQS.map((faq, idx) => (
              <div key={faq.q} className="border border-[#071D49]/10 rounded-[24px] overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left min-h-[56px]"
                >
                  <span className="font-bold font-display tracking-tight pr-4 sm:pr-6">{faq.q}</span>
                  <ChevronDown size={18} className={`flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                      <p className="px-5 sm:px-6 pb-6 text-[#071D49]/70 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#071D49]/70 mt-8">
            Información oficial del proceso en{' '}
            <a href="https://www.ayudamineduc.cl" target="_blank" rel="noopener noreferrer" className="underline">ayudamineduc.cl</a>
            {' '}y{' '}
            <a href="https://epja.mineduc.cl" target="_blank" rel="noopener noreferrer" className="underline">epja.mineduc.cl</a>.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white" style={{ backgroundColor: BLUE }}>
        <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-6">
          Nunca es tarde para ser <br /> <span className="accent-serif text-programa">lo que podrías haber sido.</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10">
          Escríbenos y vemos juntos por dónde partir.
        </motion.p>
        <motion.a {...fadeUp(0.2)} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-10 py-4 rounded-2xl transition-all active:scale-95">
          <MessageCircle size={16} /> Escribir por WhatsApp
        </motion.a>
      </section>
    </div>
  );
}
