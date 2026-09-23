import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, MessageCircle, Check } from 'lucide-react';
import EmpresasForm from './EmpresasForm';
import empresasImg from '../../assets/img/Home/mundo_empresas_bg_1777944168670.webp';
import { EMPRESAS_SERVICES, EMPRESAS_STEPS } from '../../data/empresas';
import { COMPANY_TESTIMONIALS } from '../../data/testimonials';

const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHATSAPP_URL = 'https://wa.me/56964626568?text=Hola,%20quiero%20cotizar%20una%20capacitaci%C3%B3n%20para%20mi%20empresa';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
});

export default function Empresas() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Capacitación para Empresas | Instituto Lael</title>
        <meta name="description" content="Capacitación para equipos: talleres de IA, inglés, nivelación de estudios para trabajadores y preu PAES para sus hijos. Online o presencial, cotización a medida." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-36 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-6 text-white overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity">
          <img src={empresasImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#071D49]/70 to-[#071D49]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: YELLOW }}>
            Lael Empresas · Crecer juntos
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-6 sm:mb-8">
            Capacitación que <br /> <span style={{ color: YELLOW }}>tu equipo sí usa.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Talleres de inteligencia artificial, inglés y nivelación de estudios para tus trabajadores. Online, o presencial en Santiago. Nos cuentas qué necesitas y armamos la propuesta.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#cotizar" className="inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-8 py-4 rounded-2xl transition-all active:scale-95">
              Pedir una propuesta <ArrowRight size={16} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[48px] px-8 py-4 rounded-2xl transition-all active:scale-95">
              <MessageCircle size={16} /> Hablar por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICIOS ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Qué hacemos</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[-0.03em]">
              Programas para equipos
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPRESAS_SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                {...fadeUp(i * 0.08)}
                className={`rounded-[28px] p-6 sm:p-8 border flex flex-col ${s.soon ? 'bg-transparent border-dashed border-[#071D49]/20' : 'bg-white border-[#071D49]/5 shadow-card'}`}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: BLUE }}>
                  <s.icon size={24} style={{ color: YELLOW }} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{s.title}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed mb-6 flex-grow">{s.desc}</p>
                <ul className="space-y-2">
                  {s.tags.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs font-semibold text-[#071D49]/80">
                      <Check size={14} className="flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO TRABAJAMOS ──────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Así trabajamos</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[-0.03em]">
              En cuatro pasos
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EMPRESAS_STEPS.map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.1)} className="rounded-[28px] p-6 sm:p-8 bg-[#F4F4F4]">
                <p className="font-display text-4xl font-black mb-4" style={{ color: BLUE }}>{step.num}</p>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp(0.2)} className="text-center text-[#071D49]/70 text-sm mt-10 sm:mt-12 max-w-2xl mx-auto leading-relaxed">
            Lo que pagan las empresas nos ayuda a mantener gratis la nivelación de estudios para adultos que no pueden pagarla.
          </motion.p>
        </div>
      </section>

      {/* ── EMPRESAS QUE CONFÍAN ─────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-center mb-10 sm:mb-14">
            Empresas que ya trabajaron con nosotros
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_TESTIMONIALS.map((c, i) => (
              <motion.div key={c.id} {...fadeUp(i * 0.1)} className="rounded-[28px] p-6 sm:p-8 bg-white/5 border border-white/10">
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
        </div>
      </section>

      {/* ── COTIZAR ──────────────────────────────────────────────────── */}
      <section id="cotizar" className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 flex flex-col items-center scroll-mt-24">
        <EmpresasForm />
      </section>
    </div>
  );
}
