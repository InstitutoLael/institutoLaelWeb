import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle, Scale, Eye, FileText, Lock } from 'lucide-react';

const BLUE = '#071D49';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease }
});

const DO = [
  { t: "Te decimos qué te falta", d: "Si hay algo que te cuesta, te lo decimos claro, aunque no sea lo que quieres escuchar." },
  { t: "Ensayos con revisión", d: "Hacemos un ensayo PAES cada mes y revisamos contigo en qué preguntas pierdes puntos." },
  { t: "Material al día", d: "Seguimos los temarios oficiales del DEMRE y actualizamos el material cuando cambian." },
  { t: "Ensayos con reloj", d: "Los ensayos se hacen con el tiempo de la prueba, para que llegues acostumbrado al reloj." }
];

const DONT = [
  { t: "Sin promesas de puntaje", d: "Nadie te puede asegurar un puntaje. Depende de cuánto trabajes tú, y nosotros te ayudamos a que ese trabajo rinda." },
  { t: "No son solo videos", d: "Las clases son en vivo por Google Meet, con un profe al que le puedes preguntar en el momento." },
  { t: "Sin presión para inscribirte", d: "Si después de conversar vemos que Lael no es lo que necesitas, te lo vamos a decir." },
  { t: "Sin atajos mágicos", d: "No hay truco que reemplace estudiar seguido. Te enseñamos técnicas, pero igual hay que practicar harto." }
];

const PILLARS = [
  { icon: Scale, title: "Lo que pagas", desc: "Pagas tu mensualidad y nada más. No hay cobros escondidos y el material no se cobra aparte." },
  { icon: Eye, title: "Tus datos", desc: "Tus datos son tuyos. Los usamos solo para tus clases y para contactarte, y puedes pedirnos que los borremos. El detalle está en nuestra política de privacidad (institutolael.cl/privacidad)." },
  { icon: Lock, title: "Quiénes somos", desc: "Instituto Lael SpA es una empresa constituida bajo las leyes chilenas, con domicilio en Santiago de Chile." }
];

function ListCard({ tone, icon: Icon, ItemIcon, title, items, delay }) {
  const green = tone === 'green';
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`p-6 sm:p-10 rounded-[28px] border shadow-card ${green ? 'bg-emerald-50 border-emerald-600/10' : 'bg-rose-50 border-rose-600/10'}`}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${green ? 'bg-emerald-600/10 text-emerald-700' : 'bg-rose-600/10 text-rose-700'}`}>
          <Icon size={22} />
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#071D49]">{title}</h2>
      </div>
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.t} className="flex gap-4">
            <ItemIcon className={`flex-shrink-0 mt-0.5 ${green ? 'text-emerald-700' : 'text-rose-700'}`} size={22} />
            <div>
              <p className="text-[#071D49] font-bold text-base mb-1">{item.t}</p>
              <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{item.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Transparencia() {
  return (
    <div className="w-full bg-white text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Transparencia | Instituto Lael</title>
        <meta name="description" content="Qué hacemos y qué no hacemos en Instituto Lael: no prometemos puntajes, no cobramos extras y te decimos dónde reclamar." />
      </Helmet>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center bg-[#F4F4F4]">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-4 h-1 rounded-full bg-[#D7E400]" aria-hidden="true" />
            Transparencia
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-8"
          >
            Hablemos <br />
            <span className="bg-[#071D49] text-[#D7E400] px-3">claro.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#071D49]/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto italic font-medium">
            "Preferimos decirte la verdad antes que prometerte algo que no podemos cumplir."
          </motion.p>
        </div>
      </section>

      {/* ── 2. LO QUE SÍ / LO QUE NO ─────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16 text-left">
            <ListCard tone="green" icon={ShieldCheck} ItemIcon={CheckCircle2} title="Lo que sí hacemos" items={DO} delay={0} />
            <ListCard tone="red" icon={AlertTriangle} ItemIcon={XCircle} title="Lo que NO hacemos" items={DONT} delay={0.1} />
          </div>

          {/* ── 3. PILARES LEGALES & PRIVACIDAD ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {PILLARS.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.08)} className="p-6 sm:p-8 rounded-[28px] border border-[#071D49]/5 bg-[#F4F4F4]">
                <div className="w-11 h-11 rounded-xl bg-[#071D49] flex items-center justify-center mb-5">
                  <item.icon className="text-[#D7E400]" size={20} />
                </div>
                <h3 className="text-[#071D49] font-display font-extrabold text-base uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed break-words">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DUDAS Y RECLAMOS ──────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-white text-center" style={{ backgroundColor: BLUE }}>
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto">
          <FileText className="text-[#D7E400] mx-auto mb-6" size={40} />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 uppercase tracking-tight">Dudas y reclamos</h2>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Si tienes dudas sobre pagos, términos del servicio o reembolsos, escríbele a la dirección del instituto o háblanos por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4">
            <a href="mailto:director@institutolael.cl" className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center px-8 border-2 border-white/30 text-white hover:border-white hover:bg-white/5 rounded-2xl font-display font-extrabold text-sm tracking-wide transition-colors">director@institutolael.cl</a>
            <a href="https://wa.me/56964626568" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center px-8 bg-[#D7E400] text-[#071D49] hover:bg-white rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors">Escribir por WhatsApp</a>
          </div>
        </motion.div>
      </section>

      {/* ── 5. CIERRE ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 text-center">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-[#071D49] text-xl sm:text-2xl font-display font-semibold leading-relaxed italic max-w-2xl">
            "Va a costar, eso te lo decimos de entrada. Nosotros preparamos bien cada clase y estamos pendientes de ti. El resto lo pones tú."
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="w-12 h-1 rounded-full bg-[#D7E400]" />
            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#071D49]/70">Instituto Lael SpA</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
