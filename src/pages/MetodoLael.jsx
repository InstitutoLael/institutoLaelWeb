import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle, Video, BookOpen, PlayCircle, ClipboardCheck, Coffee, Flame } from 'lucide-react';
import { Diagnostico, Lista, ClaseEnVivo, Reloj, Dispositivo, Conexion, Cuenta } from '../components/icons/LaelIcons';
import PageHero, { SectionTitle, fadeUp, SECTION, BTN_YELLOW, BTN_BLUE } from '../components/ui/PageHero';
import BrandArcs from '../components/ui/BrandArcs';
import { whatsappUrl } from '../lib/backend';

// Una sola página para "cómo funciona", "cómo enseñamos" y "cómo es una
// clase" (antes eran /sistema y /metodo por separado). /sistema y
// /como-es-una-clase muestran esta misma página.

const PASOS = [
  { icon: Diagnostico, t: 'Nos cuentas dónde estás', d: 'Haz el diagnóstico gratis o escríbenos por WhatsApp. Con eso sabemos qué te cuesta y qué necesitas.' },
  { icon: Lista, t: 'Eliges tus ramos', d: 'La matrícula es gratis y pagas solo los ramos que tomas. Si el costo es un problema, postula a una beca.' },
  { icon: ClaseEnVivo, t: 'Vas a clases en vivo', d: 'Por Google Meet, desde las 18:00, en cursos de máximo 20 personas.' },
  { icon: Reloj, t: 'Practicas y revisamos', d: 'Cada mes haces un ensayo con el tiempo de la PAES y vemos juntos qué ajustar.' },
];

// Una semana cualquiera en Lael
const SEMANA = [
  { icon: Video, t: 'Clase en vivo por Meet', d: 'Dos clases de una hora a la semana por ramo. Entras con tu cuenta de Google y con la cámara prendida: así el profe ve cuando algo no se entendió.' },
  { icon: BookOpen, t: 'Material en Classroom', d: 'Guías, ejercicios y avisos quedan ordenados por ramo en Google Classroom. No se pierde nada en un chat.' },
  { icon: PlayCircle, t: 'La grabación, esa misma semana', d: 'Si faltaste o quieres repasar, cada semana te compartimos las grabaciones de tus clases.' },
  { icon: MessageCircle, t: 'Dudas por escrito', d: 'Si algo no te quedó claro, le escribes a tu profe. Nadie te va a mirar raro por preguntar lo mismo dos veces.' },
];

// Cómo se ve el año del preu
const ANIO = [
  { mes: 'Marzo', t: 'Ensayo diagnóstico', d: 'La primera semana haces un ensayo para saber desde dónde partes. La segunda lo revisamos contigo.', icon: ClipboardCheck },
  { mes: 'Abril a octubre', t: 'Materia y un ensayo al mes', d: 'Avanzamos por todos los contenidos de la PAES. Cada mes, un ensayo hecho por nosotros para medir cómo vas.', icon: BookOpen },
  { mes: 'Mayo, julio y septiembre', t: 'Semanas de descanso', d: 'Hay una semana de receso en mayo, las vacaciones de invierno y Fiestas Patrias. Descansar también es parte del plan.', icon: Coffee },
  { mes: 'Antes de la PAES', t: 'Intensivo', d: 'Terminada la materia, repasamos lo que más cuesta y practicamos con el reloj encima.', icon: Flame },
];

const METODO = [
  { t: 'Repaso espaciado', d: 'Volvemos a los temas cada cierto tiempo para que no se te olviden.' },
  { t: 'Práctica activa', d: 'En clase te toca resolver ejercicios. La materia se queda cuando la haces tú.' },
  { t: 'Seguimiento', d: 'Con el ensayo de cada mes vemos en qué preguntas fallas y dónde se te va el tiempo.' },
];

const NECESITAS = [
  { icon: Dispositivo, t: 'Un computador, tablet o celular' },
  { icon: Conexion, t: 'Conexión a internet' },
  { icon: Cuenta, t: 'Una cuenta de Google' },
];

export default function MetodoLael() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Así se estudia en Lael | Instituto Lael</title>
        <meta name="description" content="Cómo funciona Lael paso a paso: clases en vivo por Google Meet, material en Classroom, grabaciones cada semana, un ensayo PAES al mes y un profe que sigue tu avance." />
      </Helmet>

      <PageHero eyebrow="Cómo funciona" title="Así se estudia" accent="en Lael.">
        Desde que nos escribes hasta el día de la PAES, contado simple. Explicamos hasta que se entienda, con paciencia y sin apuro.
      </PageHero>

      {/* ── PASOS ───────────────────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Paso a paso" title="Cómo" accent="partes." className="text-center mb-10 sm:mb-14" />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PASOS.map((p, i) => (
              <motion.li key={p.t} {...fadeUp(i * 0.05)} className="relative bg-[#F4F4F4] rounded-[28px] p-6 sm:p-7 border border-[#071D49]/5 overflow-hidden">
                <span className="absolute right-5 top-2 font-serif italic text-7xl text-[#071D49]/[0.07] select-none" aria-hidden="true">{i + 1}</span>
                <div className="w-12 h-12 rounded-2xl bg-[#071D49] flex items-center justify-center mb-5"><p.icon size={24} className="text-white" /></div>
                <h3 className="font-display text-lg font-extrabold tracking-tight mb-2">{p.t}</h3>
                <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{p.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── UNA SEMANA ──────────────────────────────────────────────── */}
      <section id="clase" className={SECTION}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <SectionTitle eyebrow="Una semana en Lael" title="Así es" accent="una clase." />
            <motion.p {...fadeUp(0.08)} className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed mt-5">
              Si nunca has estudiado online, es normal tener dudas. Esto es lo que pasa en una semana cualquiera.
            </motion.p>
            <motion.div {...fadeUp(0.12)} className="mt-6">
              <Link to="/inscripcion?programa=clase-prueba" className={BTN_BLUE}>Pedir una clase de prueba <ArrowRight size={16} /></Link>
            </motion.div>
          </div>
          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SEMANA.map((s, i) => (
              <motion.li key={s.t} {...fadeUp(i * 0.05)} className="bg-white rounded-[24px] p-6 border border-[#071D49]/5 shadow-card">
                <s.icon size={26} className="mb-4" aria-hidden="true" />
                <h3 className="font-display font-extrabold text-base sm:text-lg mb-2">{s.t}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{s.d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── EL AÑO ──────────────────────────────────────────────────── */}
      <section className={`${SECTION} relative bg-[#071D49] text-white overflow-hidden`}>
        <BrandArcs variant="side" />
        <div className="relative max-w-4xl mx-auto">
          <SectionTitle eyebrow="El año del preu" title="De marzo" accent="a la PAES." dark className="text-center mb-10 sm:mb-14" />
          <ol className="relative border-l-2 border-white/15 ml-3 sm:ml-6 space-y-8">
            {ANIO.map((a, i) => (
              <motion.li key={a.t} {...fadeUp(i * 0.06)} className="pl-8 sm:pl-10 relative">
                <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#071D49] border-2 border-programa flex items-center justify-center">
                  <a.icon size={15} className="text-programa" aria-hidden="true" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-programa mb-1">{a.mes}</p>
                <h3 className="font-display text-xl font-extrabold mb-1.5">{a.t}</h3>
                <p className="text-white/75 leading-relaxed">{a.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── MÉTODO ──────────────────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <SectionTitle eyebrow="Cómo enseñamos" title="Estudiar más horas" accent="sirve poco." />
            <motion.p {...fadeUp(0.08)} className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mt-4">
              Sirve más saber en qué te estás equivocando. Por eso trabajamos así:
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {METODO.map((m, i) => (
              <motion.div key={m.t} {...fadeUp(i * 0.05)} className="rounded-[28px] p-6 sm:p-8 bg-[#F4F4F4] border border-[#071D49]/5">
                <p className="font-serif italic text-4xl text-[#071D49]/40 mb-3">0{i + 1}</p>
                <h3 className="font-display text-lg font-extrabold mb-2">{m.t}</h3>
                <p className="text-[#071D49]/70 text-sm sm:text-base leading-relaxed">{m.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LO QUE NECESITAS + CTA ──────────────────────────────────── */}
      <section className={SECTION}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="Lo único" accent="que necesitas." />
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mt-8 mb-12 text-left sm:text-center">
            {NECESITAS.map((r) => (
              <li key={r.t} className="rounded-[24px] p-5 bg-white border border-[#071D49]/5 shadow-card flex sm:flex-col items-center gap-4">
                <r.icon size={28} className="flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold">{r.t}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/inscripcion?programa=paes" className={BTN_YELLOW}>Inscribirme gratis <ArrowRight size={16} /></a>
            <Link to="/diagnostico" className={BTN_BLUE}>Hacer el diagnóstico</Link>
          </div>
          <a href={whatsappUrl('Hola, quiero saber cómo funciona Instituto Lael')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 min-h-[44px] text-sm font-semibold text-[#071D49]/75 hover:text-[#071D49] hover:underline">
            <Check size={16} /> ¿Dudas? Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
