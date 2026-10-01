import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import PageHero, { SectionTitle, fadeUp, SECTION, BTN_YELLOW, BTN_BLUE } from '../../components/ui/PageHero';
import BrandArcs from '../../components/ui/BrandArcs';
import CertificateSection from '../../components/CertificateSection';
import { INGLES_NIVELES, INGLES_PARA_QUIEN, INGLES_FAQS, PRICE_MONTHLY, PRICE_QUARTERLY, clp } from '../../data/idiomas';
import { whatsappUrl } from '../../lib/backend';

const FORM = '/inscripcion?programa=ingles';

const PLANES = [
  { id: 'mensual', name: 'Mensual', price: PRICE_MONTHLY, note: 'Pagas mes a mes.' },
  { id: 'trimestral', name: 'Trimestral', price: PRICE_QUARTERLY, note: `Pagas ${clp(PRICE_QUARTERLY * 3)} cada tres meses y ahorras ${clp((PRICE_MONTHLY - PRICE_QUARTERLY) * 3)}.`, best: true },
];
const INCLUYE = ['Clases en vivo por Google Meet con Monse', 'Mucha conversación en cada clase', 'Grabaciones cada semana', 'Material en Classroom', 'Un proyecto práctico al cerrar cada nivel', 'Certificado Lael por nivel'];

export default function Ingles() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Inglés online en vivo: hablar sin miedo | Instituto Lael</title>
        <meta name="description" content="Clases de inglés online y en vivo por Google Meet, del A1 al B2. $19.990 al mes o $16.990 pagando el trimestre. Matrícula gratis. Haz el test de nivel gratis." />
      </Helmet>

      <PageHero eyebrow="Inglés · Hablar sin miedo" title="Habla inglés" accent="sin miedo." size="lg">
        <p>Casi todos entendemos más de lo que nos atrevemos a decir. Con Monse hablas desde la primera clase, te equivocas tranquilo y vas ganando confianza.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a href={FORM} className={BTN_YELLOW}>Inscribirme <ArrowRight size={16} /></a>
          <Link to="/idiomas/test" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white border-2 border-white/30 hover:bg-white/10">
            Test de nivel gratis
          </Link>
        </div>
      </PageHero>

      {/* ── PARA QUIÉN ──────────────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Para quién es" title="¿Te suena" accent="alguna?" className="text-center mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INGLES_PARA_QUIEN.map((p, i) => (
              <motion.div key={p.t} {...fadeUp(i * 0.04)} className="rounded-[24px] p-6 bg-[#F4F4F4] border border-[#071D49]/5">
                <h3 className="font-display font-extrabold text-lg mb-2">{p.t}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NIVELES ─────────────────────────────────────────────────── */}
      <section className={SECTION}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Del A1 al B2" title="Vas nivel" accent="por nivel." className="text-center mb-4" />
          <motion.p {...fadeUp(0.06)} className="text-center text-[#071D49]/70 max-w-xl mx-auto mb-10">Según el Marco Común Europeo. Al cerrar cada nivel haces un proyecto práctico y recibes tu certificado.</motion.p>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {INGLES_NIVELES.map((n, i) => (
              <motion.li key={n.code} {...fadeUp(i * 0.05)} className="relative rounded-[24px] p-6 bg-white border border-[#071D49]/5 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-[#071D49] text-programa font-display font-extrabold flex items-center justify-center">{n.code}</span>
                  <h3 className="font-display font-extrabold text-lg">{n.name}</h3>
                </div>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{n.desc}</p>
              </motion.li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <Link to="/idiomas/test" className="inline-flex items-center gap-2 font-bold underline underline-offset-4 min-h-[44px]"><Sparkles size={16} /> ¿No sabes en cuál estás? Haz el test (3 minutos)</Link>
          </div>
        </div>
      </section>

      {/* ── PROFE ───────────────────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 flex justify-center">
            <div className="grain w-40 h-48 sm:w-52 sm:h-64 rounded-[36px] bg-[#071D49] flex items-center justify-center relative overflow-hidden" data-keep-light>
              <BrandArcs variant="side" />
              <span aria-hidden="true" className="relative font-serif italic text-7xl sm:text-8xl leading-none text-programa">MG</span>
            </div>
          </div>
          <div className="md:col-span-3">
            <SectionTitle eyebrow="Tu profe" title="Monserrat" accent="González." />
            <motion.p {...fadeUp(0.08)} className="text-[#071D49]/75 text-base sm:text-lg leading-relaxed mt-4">
              Monse hace clases donde se habla harto y nadie se ríe de nadie. Te corrige en el momento, con paciencia, y arma las conversaciones según lo que tú necesitas: la pega, un viaje o un examen.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── PRECIOS ─────────────────────────────────────────────────── */}
      <section className={`${SECTION} relative bg-[#071D49] text-white overflow-hidden`}>
        <BrandArcs />
        <div className="relative max-w-4xl mx-auto">
          <SectionTitle eyebrow="Matrícula gratis" title="Elige cómo" accent="pagar." dark className="text-center mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLANES.map((p) => (
              <div key={p.id} className={`rounded-[28px] p-6 sm:p-8 border ${p.best ? 'bg-white text-[#071D49] border-transparent' : 'bg-white/5 border-white/10'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-extrabold text-xl">{p.name}</h3>
                  {p.best && <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D7E400] text-[#071D49]">Conviene</span>}
                </div>
                <p className="font-display font-extrabold text-5xl tracking-tight">{clp(p.price)}<span className={`text-base font-bold ${p.best ? 'text-[#071D49]/60' : 'text-white/60'}`}> /mes</span></p>
                <p className={`text-sm mt-2 mb-6 ${p.best ? 'text-[#071D49]/70' : 'text-white/70'}`}>{p.note}</p>
                <a href={`${FORM}&plan=${p.id}`} className={`${p.best ? BTN_BLUE : BTN_YELLOW} w-full`}>Inscribirme</a>
              </div>
            ))}
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mt-10 max-w-3xl mx-auto">
            {INCLUYE.map((t) => <li key={t} className="flex gap-2 text-white/80 text-sm"><Check size={16} className="text-programa flex-shrink-0 mt-0.5" aria-hidden="true" /> {t}</li>)}
          </ul>
        </div>
      </section>

      <CertificateSection defaultLevel="B1" defaultLanguage="Inglés en Vivo" />

      {/* ── PREGUNTAS ───────────────────────────────────────────────── */}
      <section className={SECTION}>
        <div className="max-w-3xl mx-auto">
          <SectionTitle title="Preguntas" accent="sobre inglés." className="text-center mb-8" />
          <div className="space-y-3">
            {INGLES_FAQS.map((q) => (
              <details key={q.q} className="group rounded-2xl bg-white border border-[#071D49]/5 p-5 open:shadow-card">
                <summary className="font-display font-bold cursor-pointer list-none flex justify-between gap-4">{q.q}<span aria-hidden="true" className="transition-transform group-open:rotate-45 text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#071D49]/75 leading-relaxed">{q.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10 space-y-3">
            <a href={whatsappUrl('Hola! Tengo una duda sobre las clases de inglés.')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold underline">¿Otra duda? Escríbenos por WhatsApp</a>
            <p className="text-sm text-[#071D49]/70">¿Vives en Chile y quieres mejorar tu español? <Link to="/espanol" className="underline font-semibold">Español para extranjeros</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}
