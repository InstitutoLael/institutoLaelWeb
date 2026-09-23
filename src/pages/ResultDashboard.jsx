import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDiagnosticResult } from '../data/diagnostic';
import { Helmet } from 'react-helmet-async';
import { BarChart3, Zap, MessageCircle, Video } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { trackFunnelEvent } from '../utils/funnel';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease }
});

const NEXT_STEPS = [
  { title: "Conversamos", desc: "Por WhatsApp resolvemos tus dudas y vemos qué te conviene tomar." },
  { title: "Te inscribes", desc: "Completas el formulario. La matrícula es gratis." },
  { title: "Primera clase", desc: "Te conectas a tu primera clase en vivo por Google Meet." }
];

export default function ResultDashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers = state?.answers;

  useEffect(() => {
    if (!answers) {
      navigate('/diagnostico');
    } else {
      trackEvent('diagnostic_complete', { category: answers.category });
    }
  }, [answers, navigate]);

  if (!answers) return null;

  const result = getDiagnosticResult(answers);

  const handleContact = (type) => {
    trackEvent('contact_click', { type, profile: result.title });
    if (type === 'whatsapp') {
      trackFunnelEvent('whatsapp');
      const msg = encodeURIComponent(result.wa_msg || `Hola, acabo de completar mi diagnóstico Lael. Mi perfil es: ${result.title}. Quiero más información.`);
      window.open(`https://wa.me/56964626568?text=${msg}`, '_blank');
    }
  };

  const whatsappButton = (
    <button
      type="button"
      onClick={() => handleContact('whatsapp')}
      className="w-full min-h-[56px] px-6 bg-[#D7E400] text-[#071D49] hover:bg-[#E4EF3A] rounded-2xl font-display font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-3 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D7E400]/50 transition-colors shadow-lg"
    >
      <MessageCircle size={20} /> Escribir por WhatsApp
    </button>
  );

  const statCols = result.stats.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] min-h-screen overflow-x-clip font-sans">
      <Helmet>
        <title>Tu Resultado | Instituto Lael</title>
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-32 sm:pt-40 pb-14 sm:pb-20 px-5 sm:px-6 text-white text-center" style={{ backgroundColor: '#071D49' }}>
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto">
          <p className="text-[#D7E400] text-xs tracking-[0.2em] uppercase mb-5 font-bold">Diagnóstico listo</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.08] mb-6 text-white">
            Tu perfil: <br />
            <span className="text-[#D7E400]">{result.title}</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {result.subtitle}
          </p>
        </motion.div>
      </section>

      {/* ── RESULTADO ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Lo que vemos */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 p-6 sm:p-8 bg-white rounded-[28px] border border-[#071D49]/5 shadow-card">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-5 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#071D49] text-[#D7E400] flex items-center justify-center flex-shrink-0">
                <Zap size={20} />
              </span>
              Lo que vemos
            </h2>
            <p className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed mb-8">
              {result.description}
            </p>

            <div className={`grid grid-cols-1 ${statCols} gap-3 sm:gap-4`}>
              {result.stats.map((stat, i) => (
                <div key={i} className="px-5 py-4 sm:p-5 bg-[#F4F4F4] rounded-2xl flex sm:flex-col-reverse items-center justify-between sm:justify-center gap-3 sm:gap-1 sm:text-center">
                  <p className="text-xs font-bold text-[#071D49]/70 uppercase tracking-wider">{stat.label}</p>
                  <p className="font-display text-lg sm:text-2xl font-extrabold text-[#071D49] text-right sm:text-center">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA WhatsApp */}
          <motion.div {...fadeUp(0.15)} className="lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-[28px] text-white shadow-lael relative overflow-hidden" style={{ backgroundColor: '#071D49' }}>
              <span className="inline-flex items-center rounded-full bg-[#D7E400] text-[#071D49] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider mb-5">
                Matrícula gratis
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight mb-4">{result.entry_product}</h3>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Escríbenos por WhatsApp y te contamos horarios, precios y cómo partir. La matrícula es gratis y, si no te alcanza, puedes postular a una beca.
              </p>
              {whatsappButton}
              <p className="text-center text-xs text-white/60 mt-4 font-semibold">Te respondemos y resolvemos tus dudas</p>
            </div>

            {/* CASE STUDY */}
            {result.case_study && (
              <div className="p-6 sm:p-8 bg-white rounded-[28px] border border-[#071D49]/5 shadow-card">
                <p className="text-[#071D49] text-xs tracking-[0.2em] uppercase mb-4 font-bold flex items-center gap-2">
                  <BarChart3 size={14} /> Un caso parecido
                </p>
                <p className="text-[#071D49] text-base italic mb-4 leading-relaxed">"{result.case_study.text}"</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-[#D7E400] rounded-full text-[#071D49] text-xs font-bold">{result.case_study.metrics}</span>
                  <span className="text-[#071D49]/70 text-xs font-semibold uppercase tracking-wider">{result.case_study.name}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Según tus respuestas */}
          {result.attributes && result.attributes.length > 0 && (
            <motion.div {...fadeUp(0.2)} className="lg:col-span-2 p-6 sm:p-8 bg-white rounded-[28px] border border-[#071D49]/5 shadow-card">
              <h4 className="text-[#071D49] text-xs tracking-[0.2em] uppercase mb-6 font-bold flex items-center gap-2">
                <span className="w-4 h-1 rounded-full bg-[#D7E400]" aria-hidden="true" />
                Según tus respuestas
              </h4>
              <div className="space-y-6">
                {result.attributes.map((attr, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center gap-3 mb-2.5">
                      <span className="text-sm sm:text-base font-bold text-[#071D49]">{attr.label}</span>
                      <span className="flex-shrink-0 rounded-full bg-[#071D49] text-[#D7E400] px-3 py-1 text-xs font-bold">{attr.value}</span>
                    </div>
                    <div className="h-2.5 bg-[#071D49]/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${attr.score}%` }}
                        transition={{ duration: 0.6, delay: 0.4, ease }}
                        className="h-full bg-[#071D49] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── QUÉ PASA DESPUÉS ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-28">
        <motion.div {...fadeUp(0.25)} className="max-w-6xl mx-auto bg-white rounded-[28px] border border-[#071D49]/5 shadow-card p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-6">¿Qué pasa después?</h4>
            <ul className="space-y-5 mb-8">
              {NEXT_STEPS.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-[#071D49] text-[#D7E400] flex items-center justify-center font-display text-sm font-extrabold flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="text-[#071D49] font-bold text-base mb-1">{item.title}</p>
                    <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sm:max-w-xs">{whatsappButton}</div>
          </div>
          <div className="min-h-[200px] sm:aspect-video rounded-[24px] py-8 flex flex-col items-center justify-center text-center px-6 gap-4" style={{ backgroundColor: '#071D49' }}>
            <span className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <Video size={26} className="text-[#D7E400]" />
            </span>
            <p className="text-white/75 font-semibold text-base">Clases en vivo por Google Meet</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
