import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { BLUE, YELLOW, fadeUp, waLink, inscripcionLink, Btn, PageHero, SectionHead, Faq, CtaBand } from './shared';

// Plantilla para las páginas de programa. Todo el contenido viene de un
// archivo en src/data/ (ver src/data/reforzamiento.js como ejemplo).
export default function ProgramaLanding({ data }) {
  const { id, seo, hero, cta, includes, audience, steps, price, related, faqs, closing } = data;
  const inscribir = inscripcionLink(id);
  const whatsapp = waLink(cta.whatsapp);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <PageHero {...hero}>
        <Btn href={inscribir} variant="yellow">{cta.label} <ArrowRight size={16} aria-hidden="true" /></Btn>
        <Btn href={whatsapp} variant="outlineDark"><MessageCircle size={16} aria-hidden="true" /> Preguntar por WhatsApp</Btn>
      </PageHero>

      {/* ── QUÉ INCLUYE ──────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow={includes.eyebrow} title={includes.title} desc={includes.desc} />
          {includes.chips && (
            <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
              {includes.chips.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider" style={{ backgroundColor: BLUE, color: YELLOW }}>
                  {c}
                </span>
              ))}
            </motion.div>
          )}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${includes.items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
            {includes.items.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.08)} className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: BLUE }}>
                  <item.icon size={24} style={{ color: YELLOW }} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ───────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="text-center lg:text-left">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] mb-4">{audience.eyebrow}</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05]">
              {audience.title}
            </motion.h2>
            {audience.desc && (
              <motion.p {...fadeUp(0.15)} className="mt-5 text-[#071D49]/70 text-base sm:text-lg leading-relaxed">{audience.desc}</motion.p>
            )}
          </div>
          <ul className="space-y-3 sm:space-y-4">
            {audience.items.map((a, i) => (
              <motion.li key={a} {...fadeUp(i * 0.06)} className="flex items-start gap-4 rounded-[24px] bg-[#F4F4F4] p-5 sm:p-6">
                <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: YELLOW }}>
                  <Check size={16} strokeWidth={3} style={{ color: BLUE }} aria-hidden="true" />
                </span>
                <span className="text-[#071D49]/85 leading-relaxed pt-0.5">{a}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow={steps.eyebrow} title={steps.title} />
          <div className={`grid grid-cols-1 md:grid-cols-2 ${steps.items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
            {steps.items.map((step, i) => (
              <motion.div key={step.title} {...fadeUp(i * 0.1)} className="rounded-[28px] p-6 sm:p-8 bg-white border border-[#071D49]/5 shadow-card">
                <p className="font-display text-4xl font-black mb-4" style={{ color: BLUE }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALOR ────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHead eyebrow={price.eyebrow} title={price.title} />
          <motion.div {...fadeUp(0.1)} className="rounded-[28px] p-6 sm:p-10 text-white shadow-lael grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center" style={{ backgroundColor: BLUE }}>
            <div className="text-center md:text-left">
              <p className="font-display text-5xl sm:text-6xl font-black leading-none" style={{ color: YELLOW }}>{price.amount}</p>
              {price.period && <p className="text-white/75 text-sm font-semibold mt-3">{price.period}</p>}
              {price.note && <p className="text-white/75 text-sm leading-relaxed mt-5">{price.note}</p>}
            </div>
            <div>
              <ul className="space-y-3 mb-8">
                {price.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/85 leading-relaxed">
                    <Check size={18} className="flex-shrink-0 mt-0.5" style={{ color: YELLOW }} aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
              <Btn href={inscribir} variant="yellow" className="sm:w-full">{cta.label} <ArrowRight size={16} aria-hidden="true" /></Btn>
            </div>
          </motion.div>

          {related && related.length > 0 && (
            <div className={`grid grid-cols-1 ${related.length > 1 ? 'md:grid-cols-2' : ''} gap-4 sm:gap-6 mt-6`}>
              {related.map((r, i) => (
                <motion.div key={r.to} {...fadeUp(0.1 + i * 0.08)} className="rounded-[28px] p-6 sm:p-8 bg-[#F4F4F4] flex flex-col gap-5 justify-between">
                  <div>
                    <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-2">{r.title}</h3>
                    <p className="text-[#071D49]/70 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                  <Btn href={r.to} variant="outlineLight" className="sm:self-start px-6">{r.label} <ArrowRight size={14} aria-hidden="true" /></Btn>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <Faq items={faqs} />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <CtaBand title={closing.title} accent={closing.accent} desc={closing.desc}>
        <Btn href={inscribir} variant="yellow">{cta.label} <ArrowRight size={16} aria-hidden="true" /></Btn>
        <Btn href={whatsapp} variant="outlineDark"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</Btn>
      </CtaBand>
    </div>
  );
}
