import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BLUE, YELLOW, fadeUp, Btn, PageHero, SectionHead } from './shared';
import { ALUMNOS_HERO, ALUMNOS_CARDS, ALUMNOS_CONTACTO } from '../../data/alumnos';

function CardLink({ href, children }) {
  const cls = 'inline-flex items-center gap-2 min-h-[44px] mt-5 font-display font-extrabold text-xs uppercase tracking-wider underline underline-offset-4 decoration-2 decoration-[#D7E400] hover:text-[#0B2A66]';
  if (href.startsWith('/')) return <Link to={href} className={cls}>{children}</Link>;
  if (href.startsWith('mailto:')) return <a href={href} className={cls}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
}

export default function Alumnos() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Alumnos Lael: clases, grabaciones y pagos | Instituto Lael</title>
        <meta name="description" content="Centro de ayuda para alumnos de Lael: clases por Google Meet, grabaciones en Classroom, ensayos, recuperativas, pagos, becas y contacto." />
      </Helmet>

      <PageHero {...ALUMNOS_HERO}>
        <Btn href="#ayuda" variant="yellow">Ver la guía <ArrowRight size={16} aria-hidden="true" /></Btn>
        <Btn href={ALUMNOS_CONTACTO[0].href} variant="outlineDark"><MessageCircle size={16} aria-hidden="true" /> Escribir por WhatsApp</Btn>
      </PageHero>

      {/* ── GUÍA ─────────────────────────────────────────────────────── */}
      <section id="ayuda" className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Guía del alumno" title="Lo que más nos preguntan" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ALUMNOS_CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp((i % 4) * 0.08)}
                className={`rounded-[28px] p-6 sm:p-8 flex flex-col border ${c.soon ? 'border-dashed border-[#071D49]/20 bg-transparent' : 'bg-white border-[#071D49]/5 shadow-card'}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: BLUE }}>
                    <c.icon size={22} style={{ color: YELLOW }} aria-hidden="true" />
                  </div>
                  {c.soon && (
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full" style={{ backgroundColor: YELLOW, color: BLUE }}>
                      Pronto
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-3">{c.title}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed flex-grow">{c.desc}</p>
                {c.link && <CardLink href={c.link.href}>{c.link.label} <ArrowRight size={14} aria-hidden="true" /></CardLink>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead dark eyebrow="¿Algo no anda?" title="Escríbenos" desc="Si no puedes entrar a una clase, te falta una grabación o tienes dudas con un pago, avísanos y lo vemos." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ALUMNOS_CONTACTO.map((c, i) => (
              <motion.a
                key={c.label}
                {...fadeUp(i * 0.06)}
                href={c.href}
                {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="rounded-[24px] p-5 sm:p-6 bg-white/5 border border-white/10 hover:border-[#D7E400]/60 transition-colors flex items-center justify-between gap-4 min-h-[72px]"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-1">{c.label}</span>
                  <span className="block font-semibold text-white break-words">{c.value}</span>
                </span>
                <ArrowRight size={18} className="flex-shrink-0" style={{ color: YELLOW }} aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁS PARA TI ──────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            { to: '/orientacion', title: 'Orientación vocacional', desc: 'Si estás en el Plan Completo del preu PAES, tu sesión es gratis.', label: 'Ver orientación' },
            { to: '/calculadora', title: 'Calculadora PAES', desc: 'Calcula tu puntaje ponderado con las ponderaciones oficiales.', label: 'Ir a la calculadora' },
          ].map((r, i) => (
            <motion.div key={r.to} {...fadeUp(i * 0.08)} className="rounded-[28px] p-6 sm:p-8 bg-white border border-[#071D49]/5 shadow-card flex flex-col">
              <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-2">{r.title}</h3>
              <p className="text-[#071D49]/70 text-sm leading-relaxed mb-6 flex-grow">{r.desc}</p>
              <Btn href={r.to} variant="navy" className="sm:self-start">{r.label} <ArrowRight size={14} aria-hidden="true" /></Btn>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
