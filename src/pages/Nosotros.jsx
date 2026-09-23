import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import diegoAvatar from '../assets/img/Equipo/diego-chaparro.webp';
import SignificadoLael from '../components/SignificadoLael';
import { HERO, HISTORY, PILLARS, TEAM, TIMELINE, CLOSING_QUOTE } from '../data/nosotros';

// Brand Design Tokens
const BLUE = '#071D49';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
});

// Eyebrow on light backgrounds: navy text + small yellow bar.
function Eyebrow({ children, className = '' }) {
  return (
    <p className={`inline-flex items-center gap-2 font-display text-[#071D49] text-xs tracking-[0.2em] uppercase font-bold mb-4 ${className}`}>
      <span aria-hidden="true" className="inline-block w-5 h-1.5 rounded-full bg-[#D7E400] flex-shrink-0" />
      <span>{children}</span>
    </p>
  );
}

// Yellow highlight (navy text on yellow fill), replaces yellow text on light bg.
const HIGHLIGHT = 'bg-[#D7E400] text-[#071D49] px-2 box-decoration-clone';

export default function Nosotros() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Nosotros | Instituto Lael</title>
        <meta name="description" content="Fundado en 2021. Más de 1000 alumnos. PAES desde $10.000/mes por ramo, becas disponibles. Santiago, Chile. Cómo partimos y quiénes son los profes." />
      </Helmet>

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 lg:min-h-[80vh] bg-[#F4F4F4]">
        <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp(0)} className="lg:col-span-7 text-left">
            <Eyebrow className="mb-6">{HERO.eyebrow}</Eyebrow>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.08] mb-6 sm:mb-8 uppercase tracking-tight"
              style={{ color: BLUE }}
            >
              {HERO.title} <br />
              <span className={`italic ${HIGHLIGHT}`}>{HERO.accent}</span>
            </h1>
            <p className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed max-w-xl">
              {HERO.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-[#071D49]/10 shadow-lael relative w-full max-w-[340px] bg-[#092254]">
              <img
                src={diegoAvatar}
                alt="Diego Chaparro - Fundador"
                className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D49] via-[#071D49]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-left">
                <p className="font-display text-[#D7E400] text-xs tracking-[0.2em] uppercase font-bold mb-2">Diego Chaparro</p>
                <p className="text-white text-xl sm:text-2xl font-display font-extrabold leading-tight uppercase">
                  "{HERO.founderQuote.line1} <br/> {HERO.founderQuote.line2}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. HISTORIA DETALLADA ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-5 sm:px-6 text-white relative" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <motion.div {...fadeUp(0)} className="lg:col-span-5 text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] uppercase tracking-tight mb-6">
                {HISTORY.title} <br /> <span className="text-[#D7E400]">{HISTORY.accent}</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-[#D7E400]/40" />
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="lg:col-span-7 space-y-5 text-white/75 text-base sm:text-lg leading-relaxed text-left">
              {HISTORY.paragraphs.map((p, i) => (
                <p key={i}>
                  {p.strong && <strong className="text-white font-extrabold">{p.strong}</strong>}
                  {p.rest}
                </p>
              ))}
              <p className="pt-4 text-[#D7E400] font-display text-lg sm:text-xl italic leading-relaxed">
                "{HISTORY.closingQuote}"
              </p>
            </motion.div>
          </div>

          {/* Línea de tiempo */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 border-t border-white/10 pt-10">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} {...fadeUp(i * 0.05)} className="text-left">
                <p className="font-display text-2xl sm:text-3xl font-black text-[#D7E400] mb-1">{item.year}</p>
                <h3 className="font-display text-white font-bold uppercase tracking-tight mb-1">{item.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SIGNIFICADO DE LAEL (el versículo va al cierre de la página) ── */}
      <SignificadoLael showVerse={false} />

      {/* ── 4. PILARES / VALORES ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-5 sm:px-6 bg-[#F4F4F4]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-4 lg:gap-8 text-left">
            <motion.div {...fadeUp(0)} className="max-w-2xl">
              <Eyebrow>En qué creemos</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] uppercase tracking-tight" style={{ color: BLUE }}>
                Por qué hacemos <br/> <span className={`italic ${HIGHLIGHT}`}>lo que hacemos.</span>
              </h2>
            </motion.div>
            <p className="text-[#071D49]/70 text-base max-w-sm lg:pb-2">Son cuatro cosas que tratamos de cuidar en cada clase.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {PILLARS.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.05)}
                className="flex gap-4 sm:gap-5 items-start text-left bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#071D49] text-white flex items-center justify-center flex-shrink-0">
                  <v.icon size={26} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black mb-1.5 text-[#071D49] tracking-wide font-display uppercase">{v.title}</h3>
                  <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EQUIPO COMPLETO ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-5 sm:px-6 bg-white border-y border-[#071D49]/5">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-14">
            <motion.div {...fadeUp(0)}><Eyebrow>Quiénes hacen las clases</Eyebrow></motion.div>
            <motion.h2 {...fadeUp(0.05)} className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#071D49] font-extrabold tracking-tight uppercase">
              LOS PROFES
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEAM.filter((t) => t.confirmed).map((t, i) => {
              const isDiego = t.name === "Diego Chaparro";
              const isMonserrat = t.name === "Monserrat González";
              const isPlaceholder = !t.confirmed;

              return (
                <motion.div
                  key={t.name}
                  {...fadeUp(i * 0.05)}
                  className={`rounded-[28px] p-6 border transition-all duration-300 flex flex-col items-center text-center ${isPlaceholder ? 'bg-[#F4F4F4]/50 border-dashed border-[#071D49]/20' : 'bg-[#F4F4F4] border-[#071D49]/5 hover:shadow-card'}`}
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-[#071D49]/10 shadow-md mb-4 flex items-center justify-center bg-[#071D49]/5 relative">
                    {isPlaceholder ? (
                      <span className="text-3xl text-[#071D49]/70 font-bold">?</span>
                    ) : (
                      <img src={t.img} alt={`Foto de ${t.name}`} loading="lazy" className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-center mb-2">
                    <h3 className="text-[#071D49] font-display font-extrabold text-base uppercase tracking-tight">{t.name}</h3>
                    {isDiego && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#071D49] text-white px-2 py-0.5 rounded-full">
                        FUNDADOR
                      </span>
                    )}
                    {isMonserrat && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#071D49] text-white px-2 py-0.5 rounded-full">
                        PROFE INGLÉS
                      </span>
                    )}
                  </div>

                  <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full ${t.confirmed ? 'bg-[#D7E400] text-[#071D49]' : 'bg-white border border-[#071D49]/15 text-[#071D49]/70'}`}>
                    {t.subject}
                  </p>

                  <p className="text-[#071D49]/70 text-sm leading-relaxed">{t.bio}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CIERRE ESPIRITUAL ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-5 sm:px-6 text-center bg-[#F4F4F4]">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto">
          <Quote className="text-[#071D49]/15 mx-auto mb-6" size={48} aria-hidden="true" />
          <p className="text-xl sm:text-2xl lg:text-3xl italic text-[#071D49] font-medium leading-relaxed mb-8">
            {CLOSING_QUOTE.text}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="w-8 h-1.5 rounded-full bg-[#D7E400]" />
            <p className="font-display text-xs tracking-[0.2em] uppercase font-bold text-[#071D49]">
              {CLOSING_QUOTE.ref}
            </p>
            <span aria-hidden="true" className="w-8 h-1.5 rounded-full bg-[#D7E400]" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
