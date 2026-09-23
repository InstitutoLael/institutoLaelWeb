import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Sun, Check, ArrowRight, CalendarDays } from 'lucide-react';
import { VERANO_COURSES, VERANO_WHATSAPP } from '../data/verano';

const BLUE = '#071D49';
const YELLOW = '#D7E400';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});

export default function Verano() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-hidden font-sans">
      <Helmet>
        <title>Verano Lael 2027: cursos de enero | Instituto Lael</title>
        <meta name="description" content="Cursos cortos en enero: Arranque PAES (M1 y Competencia Lectora), IA para estudiar gratis, inglés de conversación y charlas gratis para terminar el colegio. Online por Google Meet." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-40 pb-24 px-6 text-white overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] opacity-30" style={{ backgroundColor: YELLOW }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]" style={{ backgroundColor: YELLOW, color: BLUE }}>
            <Sun size={14} /> Verano Lael 2027
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-8">
            Que marzo no te <br /> <span style={{ color: YELLOW }}>pille desprevenido.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            En enero hacemos cursos cortos para partir el año con ventaja. Algunos son gratis. Todos son online, por Google Meet, y puedes combinarlos con tus vacaciones.
          </motion.p>
        </div>
      </section>

      {/* ── CURSOS ───────────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {VERANO_COURSES.map((c, i) => (
            <motion.div
              key={c.id}
              {...fadeUp(i * 0.08)}
              className={`relative rounded-[32px] p-8 flex flex-col border ${c.featured ? 'bg-[#071D49] text-white border-[#071D49] shadow-2xl' : 'bg-white border-[#071D49]/5 shadow-card'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                  style={c.featured ? { backgroundColor: YELLOW, color: BLUE } : { backgroundColor: BLUE, color: YELLOW }}
                >
                  {c.tag}
                </span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.featured ? 'text-white/70' : 'text-[#071D49]/60'}`}>
                  <CalendarDays size={14} /> {c.when}
                </span>
              </div>
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight mb-3">{c.name}</h2>
              <p className={`text-sm leading-relaxed mb-6 ${c.featured ? 'text-white/75' : 'text-[#8D8D8D]'}`}>{c.desc}</p>
              <ul className="space-y-2 mb-8 flex-grow">
                {c.details.map((d) => (
                  <li key={d} className={`flex items-center gap-2 text-sm ${c.featured ? 'text-white/85' : 'text-[#071D49]/80'}`}>
                    <Check size={16} className="flex-shrink-0" style={{ color: c.featured ? YELLOW : BLUE }} /> {d}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="font-display text-3xl font-black" style={{ color: c.featured ? YELLOW : BLUE }}>{c.price}</p>
                  <p className={`text-xs ${c.featured ? 'text-white/60' : 'text-[#8D8D8D]'}`}>{c.priceNote}</p>
                </div>
                <a
                  href={VERANO_WHATSAPP(c.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl transition-all active:scale-95 ${c.featured ? 'bg-[#D7E400] text-[#071D49] hover:bg-white' : 'bg-[#071D49] text-white hover:bg-[#0B2A66]'}`}
                >
                  Inscribirme <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARZO ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center rounded-[32px] bg-white p-10 border border-[#071D49]/5">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4">Y en marzo, partimos de lleno</h2>
          <p className="text-[#8D8D8D] leading-relaxed mb-8">
            La primera semana de marzo empiezan el preu PAES, inglés y la Escuela de Sueños. La matrícula es gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/paes" className="inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl">Preu PAES</Link>
            <Link to="/idiomas" className="inline-flex items-center justify-center gap-2 border border-[#071D49]/20 hover:border-[#071D49] font-display font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl">Inglés</Link>
            <Link to="/adultos" className="inline-flex items-center justify-center gap-2 border border-[#071D49]/20 hover:border-[#071D49] font-display font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl">Escuela de Sueños</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
