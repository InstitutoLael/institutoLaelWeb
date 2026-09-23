import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import AlianzasForm from './AlianzasForm';
import { BLUE, YELLOW, fadeUp, waLink, Btn, PageHero, SectionHead } from './shared';
import { ALIANZAS_HERO, ALIANZAS_TIPOS, ALIANZAS_CONVENIOS, ALIANZAS_PAGOS, ALIANZAS_POR_QUE, ALIANZAS_WHATSAPP_TEXT } from '../../data/alianzas';

export default function Alianzas() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Alianzas: sé parte de Lael | Instituto Lael</title>
        <meta name="description" content="Colegios, iglesias, comunidades, empresas y creadores: trabajemos juntos para que más personas estudien. Charlas PAES gratis, ensayos, becas y descuentos." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <PageHero {...ALIANZAS_HERO}>
        <Btn href="#contacto" variant="yellow">Quiero conversar <ArrowRight size={16} aria-hidden="true" /></Btn>
        <Btn href={waLink(ALIANZAS_WHATSAPP_TEXT)} variant="outlineDark"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</Btn>
      </PageHero>

      {/* ── TIPOS DE ALIANZA ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Qué podemos hacer juntos" title="Una alianza para cada comunidad" desc="Elige lo que calce con tu organización. Si tienes otra idea, también la escuchamos." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {ALIANZAS_TIPOS.map((t, i) => (
              <motion.div key={t.id} {...fadeUp(i * 0.08)} className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BLUE }}>
                    <t.icon size={24} style={{ color: YELLOW }} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight">{t.title}</h3>
                </div>
                <p className="text-[#071D49]/70 leading-relaxed mb-6">{t.desc}</p>
                <ul className="space-y-3 flex-grow">
                  {t.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm text-[#071D49]/85 leading-relaxed">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: YELLOW }}>
                        <Check size={13} strokeWidth={3} style={{ color: BLUE }} aria-hidden="true" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {t.link ? (
                    <Btn href={t.link.to} variant="navy">{t.link.label} <ArrowRight size={14} aria-hidden="true" /></Btn>
                  ) : (
                    <Btn href="#contacto" variant="outlineLight">Me interesa <ArrowRight size={14} aria-hidden="true" /></Btn>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ LAEL ─────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead dark eyebrow="Por qué Lael" title="Desde 2021, más de 1000 estudiantes" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {ALIANZAS_POR_QUE.map((p, i) => (
              <motion.div key={p.title} {...fadeUp(i * 0.08)} className="rounded-[28px] p-6 sm:p-8 bg-white/5 border border-white/10">
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3" style={{ color: YELLOW }}>{p.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONVENIOS ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="Convenios vigentes" title="Ya trabajan con nosotros" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {ALIANZAS_CONVENIOS.map((c, i) => (
              <motion.div key={c.name} {...fadeUp(i * 0.08)} className="rounded-[28px] p-6 sm:p-8 bg-[#F4F4F4] flex flex-col items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-6 bg-white rounded-2xl px-6">
                  <img src={c.logo} alt={`Logo ${c.name}`} loading="lazy" className="max-h-16 max-w-[220px] w-auto object-contain" />
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-2">{c.name}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="mt-6 rounded-[24px] border-2 border-dashed border-[#071D49]/15 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img src={ALIANZAS_PAGOS.logo} alt="Mercado Pago" loading="lazy" className="h-8 w-auto flex-shrink-0" />
            <p className="text-[#071D49]/80 text-sm leading-relaxed">{ALIANZAS_PAGOS.text}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────────────────── */}
      <section id="contacto" className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 flex flex-col items-center scroll-mt-24">
        <AlianzasForm />
      </section>
    </div>
  );
}
