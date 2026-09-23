import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, X, Radio, CalendarCheck } from 'lucide-react';
import CTASection from '../components/CTASection';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease }
});

const SECTION = 'px-5 sm:px-6 py-16 sm:py-20 lg:py-28';
const H2 = 'font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight';
const EYEBROW = 'text-xs font-bold uppercase tracking-[0.2em] mb-3';

const NO_FUNCIONA = [
  "Clases donde solo escuchas y nunca practicas.",
  "Ensayos que nadie revisa contigo.",
  "Memorizar sin entender para qué sirve.",
  "Estudiar horas seguidas, sin pausas ni orden."
];

const SI_HACEMOS = [
  { t: "Repaso Espaciado", d: "Volvemos a los temas cada cierto tiempo para que no se te olviden." },
  { t: "Práctica Activa", d: "En clase te toca resolver ejercicios. La materia se queda cuando la haces tú." },
  { t: "Seguimiento", d: "Con el ensayo de cada mes vemos en qué preguntas fallas y dónde se te va el tiempo." }
];

const COMO_PARTES = [
  { t: "Paso 1: Ver dónde estás", d: "Un primer diagnóstico para saber qué te cuesta más." },
  { t: "Paso 2: Armar tu plan", d: "Ordenamos qué ramos y temas priorizar según tu tiempo." },
  { t: "Paso 3: Practicar", d: "Clases en vivo por Google Meet desde las 18:00 y un ensayo PAES cada mes." }
];

export default function MetodoLael() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Cómo enseñamos | Instituto Lael</title>
        <meta name="description" content="Así trabajamos en Lael: clases en vivo por Google Meet, un ensayo PAES cada mes y un profe que sigue tu avance." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-36 sm:pt-44 pb-16 sm:pb-20 px-5 sm:px-6 bg-[#071D49] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p {...fadeUp()} className={`${EYEBROW} text-[#D7E400]`}>Cómo trabajamos</motion.p>
          <motion.h1 {...fadeUp(0.05)} className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.05] mb-6 text-white">
            Nuestra forma <br />
            <span className="text-[#D7E400]">de enseñar</span>
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Explicamos hasta que se entienda, con paciencia y sin apuro. Después tienes la grabación para repasar y, cada mes, un ensayo para ver cómo vas.
          </motion.p>
        </div>
      </section>

      {/* ── 1. LO QUE NO FUNCIONA ────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div {...fadeUp()}>
            <h2 className={`${H2} mb-5`}>Lo que no funciona.</h2>
            <p className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed mb-6">
              Mucha gente cree que para mejorar necesita "más materia". Se inscribe en cursos con cientos de videos y termina <strong className="text-[#071D49]">saturada</strong>, sin saber por dónde seguir.
            </p>
            <ul className="space-y-3">
              {NO_FUNCIONA.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[#071D49]/80 text-sm sm:text-base leading-snug">
                  <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <X size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="p-6 sm:p-10 bg-[#071D49] rounded-[28px] shadow-lael">
            <p className={`${EYEBROW} text-[#D7E400]`}>Lo que pasa:</p>
            <p className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">"Estudias 8 horas, el puntaje no se mueve y terminas agotado."</p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. LO QUE SÍ FUNCIONA ────────────────────────────────────── */}
      <section className={SECTION}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <motion.h2 {...fadeUp()} className={`${H2} mb-4`}>Lo que sí hacemos.</motion.h2>
            <motion.p {...fadeUp(0.05)} className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">Estudiar más horas sirve poco si nadie te muestra en qué te estás equivocando.</motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {SI_HACEMOS.map((item, i) => (
              <motion.div key={item.t} {...fadeUp(i * 0.06)} className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-[#071D49] text-[#D7E400] font-display font-extrabold text-base flex items-center justify-center mb-5">0{i + 1}</div>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-2">{item.t}</h3>
                <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CÓMO PARTES ───────────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp()}>
            <p className={`${EYEBROW} inline-flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-[#D7E400] ring-2 ring-[#071D49]/10" aria-hidden="true" />
              Paso a paso
            </p>
            <h2 className={`${H2} mb-8`}>Cómo partes.</h2>
            <div className="space-y-4">
              {COMO_PARTES.map((f, i) => (
                <div key={f.t} className="flex gap-4 bg-[#F4F4F4] rounded-[24px] p-5 border border-[#071D49]/5">
                  <div className="w-11 h-11 bg-[#D7E400] text-[#071D49] flex items-center justify-center rounded-2xl font-display font-extrabold flex-shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-display font-extrabold text-base sm:text-lg mb-1">{f.t}</h3>
                    <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="hidden lg:flex relative w-full max-w-[440px] justify-self-center h-[420px] rounded-[32px] bg-[#071D49] items-center justify-center shadow-lael" aria-hidden="true">
            <Target size={140} className="text-[#D7E400]/30" />
          </motion.div>
        </div>
      </section>

      {/* ── 4. EN CORTO ──────────────────────────────────────────────── */}
      <section className={`${SECTION} bg-[#071D49] text-white`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeUp()} className={`${H2} mb-10`}>En corto, <br /> esto es lo que hay.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            {[
              { icon: Radio, t: 'En vivo', d: 'Clases por Google Meet desde las 18:00, con un profe al que le puedes preguntar.' },
              { icon: CalendarCheck, t: 'Mensual', d: 'Un ensayo PAES cada mes para medir cómo vas y qué te falta.' },
            ].map((c, i) => (
              <motion.div key={c.t} {...fadeUp(i * 0.06)} className="p-6 sm:p-8 bg-white/5 rounded-[28px] border border-white/10">
                <c.icon size={26} className="text-[#D7E400] mb-4" aria-hidden="true" />
                <p className="font-display text-[#D7E400] font-extrabold text-2xl sm:text-3xl uppercase mb-2">{c.t}</p>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Parte por saber dónde estás."
        subtitle="Haz el diagnóstico gratis y te decimos por dónde empezar."
        btnText="Hacer el diagnóstico"
        btnLink="/diagnostico"
      />
    </div>
  );
}
