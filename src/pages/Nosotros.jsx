import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import diegoAvatar from '../assets/img/Home/paes_mentor_strategy_1777948898105.png';
import SignificadoLael from '../components/SignificadoLael';
import { HERO, HISTORY, PILLARS, TEAM, CLOSING_QUOTE } from '../data/nosotros';

// Brand Design Tokens
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F4F4F4';
const MUTED = '#8D8D8D';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});

export default function Nosotros() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-hidden font-sans">
      <Helmet>
        <title>Nuestra Génesis | Instituto Lael</title>
        <meta name="description" content="Fundado 2021. 600 alumnos. PAES desde $10.000/mes por ramo, becas disponibles. Santiago, Chile. Conoce nuestra historia, misión y equipo de mentores." />
      </Helmet>

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20" style={{ backgroundColor: LIGHT_GRAY }}>
        <div className="max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div {...fadeUp(0)} className="lg:col-span-7 text-left">
            <p className="text-[#071D49] text-[11px] tracking-[0.5em] uppercase mb-8 font-bold flex items-center gap-2">
              <Sparkles size={12} className="text-[#D7E400]" />
              <span>{HERO.eyebrow}</span>
            </p>
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-12 uppercase tracking-tighter"
              style={{ color: BLUE }}
            >
              {HERO.title} <br />
              <span className="italic font-normal text-[#D7E400] capitalize">{HERO.accent}</span>
            </motion.h1>
            <div className="space-y-6 text-[#8D8D8D] text-lg leading-relaxed max-w-xl">
              <p>{HERO.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease }}
            className="lg:col-span-5 relative flex justify-center"
          >
             <div className="aspect-[4/5] rounded-[48px] overflow-hidden border border-[#071D49]/10 shadow-2xl relative w-full max-w-[380px] bg-[#092254]">
                <img
                  src={diegoAvatar}
                  alt="Diego Chaparro - Fundador"
                  className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D49]/90 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-10 right-10 text-left">
                   <p className="text-[#D7E400] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Diego Chaparro</p>
                   <p className="text-white text-2xl font-display font-extrabold leading-tight uppercase">
                     "{HERO.founderQuote.line1} <br/> {HERO.founderQuote.line2}"
                   </p>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D7E400]/10 rounded-full blur-3xl animate-pulse -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. HISTORIA DETALLADA ─────────────────────────────────── */}
      <section className="py-32 px-6 text-white relative" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div {...fadeUp(0)} className="lg:col-span-5 text-left">
                 <h2 className="font-display text-4xl lg:text-5xl font-extrabold leading-tight uppercase tracking-tighter mb-10">
                   {HISTORY.title} <br /> <span className="text-[#D7E400]">{HISTORY.accent}</span>
                 </h2>
                 <div className="w-20 h-1 bg-[#D7E400]/30 mb-10" />
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="lg:col-span-7 space-y-8 text-white/70 text-lg leading-relaxed text-left">
                 {HISTORY.paragraphs.map((p, i) => (
                   <p key={i}>
                     {p.strong && <strong className="text-white font-extrabold">{p.strong}</strong>}
                     {p.rest}
                   </p>
                 ))}
                 <div className="pt-8">
                    <p className="text-[#D7E400] font-display text-xl italic leading-relaxed">
                       "{HISTORY.closingQuote}"
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 3. SIGNIFICADO DE LAEL ────────────────────────────────── */}
      <SignificadoLael />

      {/* ── 4. PILARES / VALORES ───────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8 text-left">
             <div className="max-w-2xl">
                <p className="text-[#071D49] text-[11px] tracking-[0.5em] uppercase mb-6 font-bold">Nuestros Pilares</p>
                <h2 className="font-display text-4xl lg:text-6xl font-extrabold leading-tight uppercase tracking-tighter" style={{ color: BLUE }}>
                  Lo que nos mueve <br/> <span className="italic font-normal text-[#D7E400] capitalize">no es el mercado.</span>
                </h2>
             </div>
             <p className="text-[#8D8D8D] text-base max-w-sm pb-4">Cada decisión, cada clase, pasa por la misión primero.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {PILLARS.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.15)}
                className="flex gap-6 items-start text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#071D49] text-[#D7E400] flex items-center justify-center flex-shrink-0 shadow-md">
                  <v.icon size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 text-[#071D49] tracking-wider font-display uppercase">{v.title}</h4>
                  <p className="text-[#8D8D8D] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EQUIPO COMPLETO ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white border-y border-[#071D49]/5 flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Acompañamiento Profesional</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              EQUIPO DOCENTE
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TEAM.map((t, i) => {
              const isDiego = t.name === "Diego Chaparro";
              const isMonserrat = t.name === "Monserrat González";
              const isPlaceholder = !t.confirmed;

              return (
                <motion.div
                  key={t.name}
                  {...fadeUp(i * 0.08)}
                  className={`rounded-[32px] p-8 border transition-all duration-300 flex flex-col items-center text-center ${isPlaceholder ? 'bg-[#F4F4F4]/50 border-dashed border-[#071D49]/10 opacity-70' : 'bg-white border-[#071D49]/10 shadow-sm hover:shadow-card hover:border-[#D7E400]/40'}`}
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-[#071D49]/10 shadow-md mb-6 flex items-center justify-center bg-[#071D49]/5 relative">
                    {isPlaceholder ? (
                      <span className="text-3xl text-lael-muted font-bold">?</span>
                    ) : (
                      <img src={t.img} alt={`Foto de ${t.name}`} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-center mb-1">
                    <h3 className="text-[#071D49] font-display font-extrabold text-base uppercase tracking-tight">{t.name}</h3>
                    {isDiego && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-[#071D49] text-white px-2 py-0.5 rounded">
                        FUNDADOR
                      </span>
                    )}
                    {isMonserrat && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-[#D7E400] text-[#071D49] px-2 py-0.5 rounded">
                        PROFE INGLÉS
                      </span>
                    )}
                  </div>

                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full ${t.confirmed ? 'bg-[#D7E400] text-[#071D49]' : 'bg-white border border-[#071D49]/15 text-[#8D8D8D]'}`}>
                    {t.subject}
                  </p>

                  <p className="text-[#8D8D8D] text-xs sm:text-sm leading-relaxed">{t.bio}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CIERRE ESPIRITUAL ─────────────────────────────────── */}
      <section className="py-32 px-6 text-center bg-[#F4F4F4]">
         <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto">
            <Quote className="text-[#D7E400]/25 mx-auto mb-10" size={56} />
            <p className="text-2xl sm:text-3xl lg:text-4xl italic text-[#071D49] font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
              {CLOSING_QUOTE.text}
            </p>
            <div className="flex flex-col items-center gap-4">
               <p className="text-[11px] tracking-[0.5em] uppercase font-bold text-[#071D49]">
                 {CLOSING_QUOTE.ref}
               </p>
               <div className="w-px h-20 bg-gradient-to-b from-[#071D49]/30 to-transparent" />
            </div>
         </motion.div>
      </section>
    </div>
  );
}
