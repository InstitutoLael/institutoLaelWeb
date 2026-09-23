import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Star, Building2, MessageCircle, ArrowRight } from 'lucide-react';
import { TESTIMONIALS, COMPANY_TESTIMONIALS, SHARE_STORY_URL } from '../data/testimonials';

const BLUE = '#071D49';
const YELLOW = '#D7E400';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease }
});

export default function CasosReales() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Casos Reales | Instituto Lael</title>
        <meta name="description" content="Lo que dicen alumnos y empresas que estudiaron con Instituto Lael. Cada testimonio tiene nombre y autorización de quien lo dio." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span aria-hidden="true" className="inline-block w-5 h-1.5 rounded-full bg-[#D7E400]" />
            Testimonios
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.1] mb-6"
          >
            Lo que cuentan <br /> <span className="bg-[#071D49] text-[#D7E400] px-3 box-decoration-clone">quienes estudiaron aquí.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#071D49]/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Cada testimonio es de una persona real que nos dio permiso para publicarlo. Preferimos tener pocos y verdaderos que muchos inventados.
          </motion.p>
        </div>
      </section>

      {/* ── ALUMNOS ──────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              {...fadeUp(i * 0.08)}
              className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card flex flex-col"
            >
              <div className="flex gap-1 mb-5" aria-label={`${t.rating} de 5 estrellas`}>
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} size={18} fill={YELLOW} color={BLUE} strokeWidth={1.5} />
                ))}
              </div>
              <p className="text-base sm:text-lg leading-relaxed mb-6 font-medium">"{t.quote}"</p>
              {t.memory && (
                <p className="text-sm leading-relaxed mb-6 text-[#071D49]/70 border-l-4 border-[#D7E400] pl-4">
                  <span className="block font-display text-xs font-bold uppercase tracking-[0.15em] text-[#071D49] mb-1">Lo que más recuerda</span>
                  {t.memory}
                </p>
              )}
              <div className="flex-grow" />
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm font-display"
                  style={{ backgroundColor: BLUE, color: YELLOW }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm font-display">{t.name}</p>
                  <p className="text-xs uppercase tracking-wider text-[#071D49]/70">{t.program}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EMPRESAS ─────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-display text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center" style={{ color: YELLOW }}>
            Empresas
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-8 sm:mb-12">
            Equipos que capacitamos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {COMPANY_TESTIMONIALS.map((c, i) => (
              <motion.div
                key={c.id}
                {...fadeUp(i * 0.1)}
                className="rounded-[28px] p-6 sm:p-8 bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Building2 size={20} style={{ color: YELLOW }} />
                  <div>
                    <p className="font-bold font-display uppercase tracking-tight">{c.name}</p>
                    <p className="text-xs uppercase tracking-wider text-white/60">{c.program}</p>
                  </div>
                </div>
                <p className="text-white/75 leading-relaxed italic">"{c.quote}"</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="text-center mt-8 sm:mt-10">
            <Link to="/empresas" className="inline-flex items-center gap-2 min-h-[44px] font-display text-xs sm:text-sm font-bold uppercase tracking-wider hover:underline" style={{ color: YELLOW }}>
              Capacitación para empresas <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4 sm:mb-6">
            ¿Estudiaste con nosotros?
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed mb-8">
            Cuéntanos cómo te fue. Tu historia puede ayudar a alguien que todavía no se atreve a empezar. Puedes aparecer con tu nombre o solo con iniciales.
          </motion.p>
          <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SHARE_STORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-8 py-4 rounded-2xl transition-all active:scale-95"
            >
              <MessageCircle size={16} /> Compartir mi historia
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-8 py-4 rounded-2xl transition-all active:scale-95"
            >
              Ver programas <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
