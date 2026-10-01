import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Plus } from 'lucide-react';
import { ClaseEnVivo, Grupo, Grabacion } from '../components/icons/LaelIcons';
import HomeHero from '../components/home/HomeHero';
import ProgramStack from '../components/home/ProgramStack';
import Herramientas from '../components/home/Herramientas';
import PlanesPaes from '../components/PlanesPaes';
import Marquee from '../components/ui/Marquee';
import ScrollWords from '../components/ui/ScrollWords';
import CountUp from '../components/ui/CountUp';
import Magnetic from '../components/experience/Magnetic';
import { fadeUp } from '../components/ui/PageHero';
import { TEACHERS, TESTIMONIALS } from '../data/home';
import { LANDING_FAQS } from '../data/paes';
import heroImg from '../assets/img/Home/hero_student_lael_1780734180709.webp';

// Orden de la portada (de arriba a abajo): portada con la onda y la paloma →
// cinta → manifiesto → los tres caminos + índice → números → profes →
// testimonios → precios → preguntas → inscríbete.
const PREGUNTAS_HOME = [
  LANDING_FAQS[0],
  LANDING_FAQS[3],
  { q: '¿Cómo son las clases?', a: 'En vivo por Google Meet, con la cámara prendida y en cursos de máximo 20 personas. El material queda en Classroom y cada semana te compartimos las grabaciones.' },
  { q: '¿Hay becas?', a: 'Sí, becas parciales para quien las necesite. Postulas en tres minutos y revisamos cada caso con calma.' },
];

const WRAP = 'max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12';

// Cada sección bajo la portada va en su propio bloque: así, al adoptar la
// página pre-dibujada, el celular la activa por partes y no se traba.
const Parte = ({ children }) => <Suspense fallback={null}>{children}</Suspense>;

// Etiqueta de sección numerada, estilo editorial: (02) — Cómo trabajamos
function Etiqueta({ n, children, dark = false, className = '' }) {
  return (
    <motion.p {...fadeUp()} className={`flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] ${dark ? 'text-white/70' : 'text-[#071D49]/75'} ${className}`}>
      <span className={dark ? 'text-[#D7E400]' : 'text-[#071D49]'}>({n})</span>
      <span aria-hidden="true" className={`w-8 h-px ${dark ? 'bg-white/30' : 'bg-[#071D49]/30'}`} />
      {children}
    </motion.p>
  );
}

const FORMA = [
  { icon: ClaseEnVivo, t: 'Clases en vivo por Google Meet', d: 'Con un profe al que le puedes preguntar todo, desde las 18:00.' },
  { icon: Grupo, t: 'Máximo 20 por curso', d: 'Para que nadie pase desapercibido.' },
  { icon: Grabacion, t: 'Grabaciones cada semana', d: 'Si faltaste o quieres repasar, la clase te espera.' },
];

const NUMEROS = [
  { to: 1000, prefix: '+', t: 'alumnos han pasado por Lael desde 2021' },
  { to: 20, t: 'personas como máximo en cada curso' },
  { to: 7, t: 'ramos PAES, cada uno por separado' },
  { to: 0, prefix: '$', t: 'cuesta la matrícula. Siempre.' },
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Helmet>
        <title>Instituto Lael - Preuniversitario PAES 2027 | Santiago, Chile</title>
        <meta name="description" content="Tu sueño no tiene fecha de vencimiento. Preuniversitario PAES online desde $12.000/mes por ramo, inglés y nivelación de estudios gratis para adultos. Matrícula gratis y becas. Instituto Lael, Chile." />
      </Helmet>

      {/* ══ 1. PORTADA ══════════════════════════════════════════════════ */}
      <HomeHero />

      <Parte>
      {/* ══ 2. CINTA ════════════════════════════════════════════════════ */}
      <div className="relative z-10 -mt-6 sm:-mt-8 -rotate-[1.5deg] scale-[1.02] bg-[#D7E400] text-[#071D49] py-4 sm:py-5 shadow-[0_20px_50px_-20px_rgba(7,29,73,0.6)]" data-keep-light>
        <Marquee
          items={['Preu PAES 2027', 'Escuela de Sueños', 'Inglés sin miedo', 'Español para extranjeros', 'Clases particulares', 'Matrícula gratis', 'Becas']}
          itemClassName="font-display font-extrabold uppercase tracking-tight text-2xl sm:text-4xl lg:text-5xl"
        />
      </div>

      </Parte>
      <Parte>
      {/* ══ 3. MANIFIESTO ═══════════════════════════════════════════════ */}
      <section className="bg-white pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
        <div className={WRAP}>
          <Etiqueta n="01">Cómo trabajamos</Etiqueta>
          <ScrollWords
            as="h2"
            className="mt-8 font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-[#071D49] text-[2rem] sm:text-5xl lg:text-[4.6rem] max-w-[22ch] lg:max-w-[24ch]"
            parts={[
              { text: 'No eres' },
              { text: 'un puntaje.', className: 'accent-serif' },
              { text: 'Aquí nadie compite contra nadie. Los cursos son chicos' },
              { node: <span className="inline-block align-middle w-[1.7em] h-[0.95em] rounded-full overflow-hidden -mt-[0.15em]"><img src={heroImg} alt="" className="w-full h-full object-cover" loading="lazy" /></span> },
              { text: 'y tu profe sabe cómo te llamas.' },
            ]}
          />
          <div className="mt-16 sm:mt-24 grid md:grid-cols-3 gap-px bg-[#071D49]/10 border-y border-[#071D49]/10">
            {FORMA.map((f, i) => (
              <motion.div key={f.t} {...fadeUp(i * 0.08)} className="bg-white py-8 md:px-8 first:md:pl-0 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xs tracking-[0.2em] text-[#071D49]/70">0{i + 1}</span>
                  <f.icon size={30} className="text-[#071D49]" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#071D49]">{f.t}</h3>
                  <p className="mt-2 text-[#071D49]/70 leading-relaxed">{f.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp()} className="mt-8">
            <Link to="/metodo" className="group inline-flex items-center gap-3 min-h-[44px] font-display text-sm font-extrabold uppercase tracking-wider text-[#071D49]">
              <span className="w-10 h-10 rounded-full bg-[#071D49] text-white flex items-center justify-center group-hover:bg-[#D7E400] group-hover:text-[#071D49] transition-colors"><ArrowRight size={16} /></span>
              Así se estudia en Lael
            </Link>
          </motion.div>
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 4. LOS CAMINOS ══════════════════════════════════════════════ */}
      <section id="caminos" className="bg-[#F4F4F4] pt-20 sm:pt-28 pb-16 sm:pb-24 scroll-mt-20">
        <div className={WRAP}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <Etiqueta n="02">Programas</Etiqueta>
              <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
                Tres caminos, <span className="accent-serif">un mismo sueño.</span>
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.1)} className="max-w-sm text-[#071D49]/70 leading-relaxed">
              Para quien va a dar la PAES, para quien quiere terminar el colegio y para quien quiere hablar inglés. Y si no sabes cuál es el tuyo, está el índice al final.
            </motion.p>
          </div>
          <ProgramStack />
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 5. NÚMEROS ══════════════════════════════════════════════════ */}
      <section className="grain bg-[#071D49] text-white py-20 sm:py-28">
        <div className={WRAP}>
          <Etiqueta n="03" dark>Lael en números</Etiqueta>
          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/15">
            {NUMEROS.map((x, i) => (
              <motion.div key={x.t} {...fadeUp(i * 0.08)} className="py-8 sm:py-10 lg:pr-8 border-b lg:border-b-0 lg:border-r last:border-r-0 border-white/15 lg:pl-8 first:lg:pl-0 flex flex-col-reverse gap-4">
                <dt className="text-white/65 leading-snug max-w-[16rem]">{x.t}</dt>
                <dd className={`font-display font-extrabold tracking-[-0.05em] leading-none text-7xl sm:text-8xl ${i === 3 ? 'text-[#D7E400]' : ''}`}>
                  <CountUp to={x.to} prefix={x.prefix} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 5b. HERRAMIENTAS GRATIS ═════════════════════════════════════ */}
      <section className="bg-white pt-20 sm:pt-28 lg:pt-32">
        <div className={WRAP}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <Etiqueta n="04">Herramientas gratis</Etiqueta>
              <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
                Gratis, para que <span className="accent-serif">decidas mejor.</span>
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.1)} className="max-w-sm text-[#071D49]/70 leading-relaxed">
              No tienes que inscribirte para usarlas. La calculadora usa las ponderaciones oficiales del DEMRE y el calendario, sus fechas.
            </motion.p>
          </div>
          <Herramientas />
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 6. PROFES ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className={WRAP}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <Etiqueta n="05">Los profes</Etiqueta>
              <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
                Estos son <span className="accent-serif">tus profes.</span>
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.1)} className="max-w-sm text-[#071D49]/70 leading-relaxed">
              Personas que saben tu nombre, te responden y se dan cuenta cuando algo no está saliendo.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {TEACHERS.map((t, i) => (
              <motion.figure key={t.id} {...fadeUp(i * 0.06)} className="group">
                <div className="relative aspect-[3/4] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#071D49]" data-keep-light>
                  {t.photo ? (
                    <img src={t.photo} alt={`Foto de ${t.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
                  ) : (
                    <div className="grain absolute inset-0 flex items-center justify-center">
                      <span aria-hidden="true" className="font-serif italic text-[#D7E400] text-[5rem] sm:text-[8rem] leading-none transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 group-hover:-rotate-6">{t.initials}</span>
                    </div>
                  )}
                  {t.id === 'diego' && <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-[#D7E400] text-[#071D49] px-2.5 py-1 rounded-full">Fundador</span>}
                </div>
                <figcaption className="mt-4">
                  <p className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#071D49]">{t.name}</p>
                  <p className="text-sm text-[#071D49]/65">{t.subject}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 7. TESTIMONIOS ══════════════════════════════════════════════ */}
      <section className="grain bg-[#071D49] text-white py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div className={WRAP}>
          <Etiqueta n="06" dark>Lo que cuentan los alumnos</Etiqueta>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure key={t.id} {...fadeUp(i * 0.08)} className={`relative pt-10 ${i % 2 ? 'lg:mt-24' : ''}`}>
                <span aria-hidden="true" className="absolute -top-14 -left-1 font-serif italic text-[#D7E400] text-[7rem] leading-none">“</span>
                <blockquote className="relative font-serif text-[1.6rem] sm:text-[2.1rem] leading-[1.18]">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4 pt-6 border-t border-white/15">
                  <span className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm font-display bg-[#D7E400] text-[#071D49]">{t.initials}</span>
                  <span>
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-xs uppercase tracking-[0.15em] text-white/60">{t.program}</span>
                  </span>
                  <span className="ml-auto text-[#D7E400] text-sm tracking-[0.3em]" role="img" aria-label={`${t.rating} de 5 estrellas`}>{'★'.repeat(t.rating)}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-16 flex flex-col sm:flex-row gap-3 sm:gap-8 sm:items-center">
            <Link to="/casos-reales" className="group inline-flex items-center gap-3 min-h-[44px] font-display text-sm font-extrabold uppercase tracking-wider text-white">
              <span className="w-10 h-10 rounded-full bg-[#D7E400] text-[#071D49] flex items-center justify-center group-hover:bg-white transition-colors"><ArrowRight size={16} /></span>
              Ver todas las historias
            </Link>
            <Link to="/testimonio" className="inline-flex items-center min-h-[44px] text-sm font-semibold text-white/75 hover:text-white underline underline-offset-4">¿Estudiaste con nosotros? Cuéntanos</Link>
          </div>
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 8. PRECIOS ══════════════════════════════════════════════════ */}
      <section className="bg-[#F4F4F4] py-20 sm:py-28">
        <div className={WRAP}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <Etiqueta n="07">Preu PAES 2027 · Matrícula gratis</Etiqueta>
              <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
                Pagas solo <span className="accent-serif">lo que tomas.</span>
              </motion.h2>
            </div>
            <motion.ul {...fadeUp(0.08)} className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end" aria-label="Ramos disponibles">
              {['M1', 'Lectora', 'M2', 'Biología', 'Química', 'Física', 'Historia'].map((r, i) => (
                <li key={r} className={`px-4 py-2 rounded-full text-sm font-bold ${i < 2 ? 'bg-[#D7E400] text-[#071D49]' : 'bg-white border border-[#071D49]/10'}`}>{r}</li>
              ))}
            </motion.ul>
          </div>
          <div className="max-w-6xl mx-auto">
            <PlanesPaes />
          </div>
          <p className="text-center text-sm text-[#071D49]/70 mt-10 max-w-2xl mx-auto">
            ¿Otro programa? Inglés desde $16.990 al mes y la Escuela de Sueños es gratis. Si el costo es un problema, <Link to="/becas" className="underline font-semibold">postula a una beca</Link>.
          </p>
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 9. PREGUNTAS ════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className={`${WRAP} grid lg:grid-cols-12 gap-10`}>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Etiqueta n="08">Lo que más nos preguntan</Etiqueta>
              <motion.h2 {...fadeUp(0.05)} className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[#071D49] display-lg">
                Antes de <span className="accent-serif">inscribirte.</span>
              </motion.h2>
              <Link to="/preguntas" className="mt-8 inline-flex items-center gap-2 min-h-[44px] font-bold underline underline-offset-4 text-[#071D49]">Ver todas las preguntas</Link>
            </div>
          </div>
          <div className="lg:col-span-7 border-t border-[#071D49]/15">
            {PREGUNTAS_HOME.map((q, i) => (
              <details key={q.q} className="group border-b border-[#071D49]/15">
                <summary className="cursor-pointer list-none flex items-center gap-5 py-6 sm:py-7 font-display font-extrabold text-lg sm:text-2xl tracking-tight text-[#071D49]">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#071D49]/70 w-6">0{i + 1}</span>
                  <span className="flex-1">{q.q}</span>
                  <span aria-hidden="true" className="w-10 h-10 rounded-full border border-[#071D49]/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-open:rotate-45 group-open:bg-[#D7E400] group-open:border-[#D7E400] group-open:text-[#071D49]"><Plus size={18} /></span>
                </summary>
                <p className="pb-7 pl-11 pr-14 text-base sm:text-lg text-[#071D49]/75 leading-relaxed">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      </Parte>
      <Parte>
      {/* ══ 10. INSCRÍBETE ══════════════════════════════════════════════ */}
      <section className="grain bg-[#071D49] text-white pt-24 sm:pt-32 pb-20 overflow-hidden">
        <div className={`${WRAP} relative`}>
          <Etiqueta n="09" dark>¿Te animas?</Etiqueta>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.h2 {...fadeUp(0.05)} className="font-display font-extrabold display-xl">
              Inscríbete.<br />
              <span className="accent-serif text-[#D7E400]">La matrícula es gratis.</span>
            </motion.h2>
            <Magnetic strength={0.4} className="self-start lg:self-end flex-shrink-0">
              <a href="/inscripcion" data-cursor="Vamos" className="group w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-[#D7E400] text-[#071D49] flex flex-col items-center justify-center gap-2 font-display font-extrabold uppercase tracking-wider text-sm sm:text-base hover:bg-white transition-colors">
                <ArrowRight size={28} className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                Inscribirme
              </a>
            </Magnetic>
          </div>
          <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:gap-8">
            <Link to="/inscripcion?programa=clase-prueba" className="inline-flex items-center min-h-[44px] font-bold text-white/80 hover:text-white underline underline-offset-4">Pedir una clase de prueba</Link>
            <Link to="/becas" className="inline-flex items-center min-h-[44px] font-bold text-white/80 hover:text-white underline underline-offset-4">Postular a una beca</Link>
          </div>
        </div>
      </section>
      </Parte>
    </div>
  );
}
