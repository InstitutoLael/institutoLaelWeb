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
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease }
});

export default function CasosReales() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-hidden font-sans">
      <Helmet>
        <title>Casos Reales | Instituto Lael</title>
        <meta name="description" content="Lo que dicen alumnos y empresas que estudiaron con Instituto Lael. Solo testimonios reales, con nombre y autorización." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
            Historias reales
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-8"
          >
            Lo que cuentan <br /> <span className="bg-[#071D49] text-[#D7E400] px-3">quienes estudiaron aquí.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#8D8D8D] text-lg max-w-2xl mx-auto leading-relaxed">
            Cada testimonio es de una persona real que nos dio permiso para publicarlo. Preferimos tener pocos y verdaderos que muchos inventados.
          </motion.p>
        </div>
      </section>

      {/* ── ALUMNOS ──────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              {...fadeUp(i * 0.08)}
              className="bg-white rounded-[32px] p-8 border border-[#071D49]/5 shadow-card flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} size={16} fill={YELLOW} color={YELLOW} />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-6 font-medium">"{t.quote}"</p>
              {t.memory && (
                <p className="text-sm leading-relaxed mb-8 text-[#071D49]/70 border-l-2 border-[#D7E400] pl-4">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#071D49]/50 mb-1">Lo que más recuerda</span>
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
                  <p className="text-[11px] uppercase tracking-wider text-[#071D49]/60">{t.program}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EMPRESAS ─────────────────────────────────────────────────── */}
      <section className="px-6 py-24 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-center" style={{ color: YELLOW }}>
            Empresas
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-center mb-14">
            Equipos que capacitamos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_TESTIMONIALS.map((c, i) => (
              <motion.div
                key={c.id}
                {...fadeUp(i * 0.1)}
                className="rounded-[32px] p-8 bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Building2 size={20} style={{ color: YELLOW }} />
                  <div>
                    <p className="font-bold font-display uppercase tracking-tight">{c.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-white/50">{c.program}</p>
                  </div>
                </div>
                <p className="text-white/75 leading-relaxed italic">"{c.quote}"</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="text-center mt-12">
            <Link to="/empresas" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline" style={{ color: YELLOW }}>
              Capacitación para empresas <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-6">
            ¿Estudiaste con nosotros?
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-[#8D8D8D] text-lg leading-relaxed mb-10">
            Cuéntanos cómo te fue. Tu historia puede ayudar a alguien que todavía no se atreve a empezar. Puedes aparecer con tu nombre o solo con iniciales.
          </motion.p>
          <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SHARE_STORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl transition-all active:scale-95"
            >
              <MessageCircle size={16} /> Compartir mi historia
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl transition-all active:scale-95"
            >
              Ver programas <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
