import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Copy, Check, MessageCircle } from 'lucide-react';
import { Regalo } from '../../components/icons/LaelIcons';
import { BLUE, YELLOW, fadeUp, waLink, Btn, PageHero, SectionHead, Faq, CtaBand } from './shared';
import { REFERIDO_HERO, REFERIDO_STEPS, REFERIDO_FAQS, REFERIDO_MENSAJE, REFERIDO_SHARE_URL, REFERIDO_MES_GRATIS } from '../../data/trae-un-amigo';

export default function TraeUnAmigo() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(REFERIDO_MENSAJE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Trae un amigo: 20% de descuento | Instituto Lael</title>
        <meta name="description" content="Invita a un amigo a Lael: por cada amigo que se inscribe y paga su primer mes, tienes 20% de descuento en tu siguiente mensualidad. Con 5, tu mes es gratis." />
      </Helmet>

      <PageHero {...REFERIDO_HERO}>
        <Btn href={REFERIDO_SHARE_URL} variant="yellow"><MessageCircle size={16} aria-hidden="true" /> Invitar por WhatsApp</Btn>
        <Btn href="#como-funciona" variant="outlineDark">Cómo funciona</Btn>
      </PageHero>

      {/* ── MENSAJE LISTO ────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto">
          <SectionHead eyebrow="Mensaje listo" title="Solo tienes que enviarlo" desc="Lo puedes mandar tal cual o cambiarle lo que quieras antes de enviarlo." />
          <motion.div {...fadeUp(0.1)} className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card">
            <div className="rounded-2xl rounded-tl-sm bg-[#E7F8D7] p-5 text-[#071D49] leading-relaxed">
              {REFERIDO_MENSAJE}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Btn href={REFERIDO_SHARE_URL} variant="yellowOnLight" className="sm:flex-1"><MessageCircle size={16} aria-hidden="true" /> Enviar por WhatsApp</Btn>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:flex-1 min-h-[48px] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl border-2 border-[#071D49]/20 hover:border-[#071D49] transition-all active:scale-95"
              >
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copiado' : 'Copiar mensaje'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PASOS ────────────────────────────────────────────────────── */}
      <section id="como-funciona" className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Cómo funciona" title="Cuatro pasos" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {REFERIDO_STEPS.map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.1)} className="rounded-[28px] p-6 sm:p-8 bg-[#F4F4F4]">
                <p className="font-display text-4xl font-black mb-4" style={{ color: BLUE }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{s.title}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Contador visual: 5 amigos = mes gratis */}
          <motion.div {...fadeUp(0.2)} className="mt-10 sm:mt-12 rounded-[28px] p-6 sm:p-10 text-white text-center" style={{ backgroundColor: BLUE }}>
            <div className="flex justify-center gap-2 sm:gap-3 mb-6" aria-hidden="true">
              {Array.from({ length: REFERIDO_MES_GRATIS }).map((_, i) => (
                <div key={i} className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base" style={{ backgroundColor: YELLOW, color: BLUE }}>
                  20%
                </div>
              ))}
            </div>
            <p className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              <Regalo size={28} className="inline -mt-1 mr-2" />
              {REFERIDO_MES_GRATIS} amigos = <span style={{ color: YELLOW }}>un mes gratis</span>
            </p>
            <p className="text-white/75 text-sm leading-relaxed mt-4 max-w-xl mx-auto">
              El descuento lo pone Lael. Tu amigo paga lo mismo que cualquier alumno y los profes reciben su pago completo.
            </p>
          </motion.div>
        </div>
      </section>

      <Faq items={REFERIDO_FAQS} />

      <CtaBand title="Nadie se queda afuera," accent="y menos tus amigos." desc="Si tienes dudas sobre tu descuento, escríbenos.">
        <Btn href={REFERIDO_SHARE_URL} variant="yellow"><MessageCircle size={16} aria-hidden="true" /> Invitar a un amigo</Btn>
        <Btn href={waLink('Hola, tengo una consulta sobre Trae un amigo')} variant="outlineDark">Consultar mi descuento</Btn>
      </CtaBand>
    </div>
  );
}
