import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users, Heart, Target, Star, ChevronRight } from 'lucide-react';
import SignificadoLael from '../components/SignificadoLael';
import HeroCarousel from '../components/HeroCarousel';
import { OBLIGATORIAS, ELECTIVAS, WORLDS, TEACHERS, METRICS, TESTIMONIALS } from '../data/home';
import { SHARE_STORY_URL } from '../data/testimonials';

// Hero image
import heroImg from '../assets/img/Home/hero_student_lael_1780734180709.webp';

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const BLUE   = '#071D49';
const YELLOW = '#D7E400';
const ease   = [0.16, 1, 0.3, 1];
const FORM_URL = '/inscripcion?programa=paes';

// Portada rotativa: cada lámina es un programa. El orden importa: la primera
// es la que se ve al entrar.
const HERO_SLIDES = [
  {
    id: 'paes',
    badge: 'PAES 2027',
    title: [
      { text: 'Tu sueño', breakAfter: 'sm' },
      { text: 'no tiene fecha', breakAfter: 'sm' },
      { text: 'de vencimiento.', style: { color: '#D7E400' } },
    ],
    text: 'Da lo mismo si vas en cuarto medio, si la PAES te fue mal la primera vez o si dejaste el colegio hace años. Te ayudamos a llegar. Matrícula gratis y becas para quien las necesite.',
    cta: { label: 'Inscribirme gratis', href: FORM_URL },
    more: { label: 'Conocer el preu', href: '/paes' },
  },
  {
    id: 'adultos',
    badge: 'Escuela de Sueños',
    title: [
      { text: 'El colegio', breakAfter: 'sm' },
      { text: 'no es la meta.', breakAfter: true },
      { text: 'Es el inicio de tu nueva vida.', style: { color: '#D7E400' } },
    ],
    text: 'Si eres mayor de 18, te preparamos gratis para los exámenes libres del Mineduc. Clases online en la noche, a tu ritmo.',
    cta: { label: 'Quiero terminar el colegio', href: '/inscripcion?programa=adultos' },
    more: { label: 'Cómo funciona', href: '/adultos' },
  },
  {
    id: 'ingles',
    badge: 'Inglés · Hablar sin miedo',
    title: [
      { text: 'Habla inglés', breakAfter: true },
      { text: 'sin miedo.', style: { color: '#D7E400' } },
    ],
    text: 'Casi todos entendemos más de lo que nos atrevemos a decir. Clases en vivo donde hablas desde el primer día.',
    cta: { label: 'Inscribirme', href: '/inscripcion?programa=ingles' },
    more: { label: 'Ver el programa', href: '/idiomas' },
  },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1.8 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  React.useEffect(() => {
    if (inView) animate(count, value, { duration, ease: 'easeOut' });
  }, [inView, count, value, duration]);
  return (
    <span ref={ref} className="transition-opacity duration-300" style={{ opacity: inView ? 1 : 0 }}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

// ─── FADE UP HELPER ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
});

// ─── SHARED BITS ─────────────────────────────────────────────────────────────
// Eyebrow: navy + yellow bar on light backgrounds, yellow on navy.
function Eyebrow({ children, dark = false, className = '' }) {
  return (
    <motion.p
      {...fadeUp(0)}
      className={`inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] mb-4 ${dark ? 'text-[#D7E400]' : 'text-[#071D49]'} ${className}`}
    >
      {!dark && <span aria-hidden="true" className="inline-block w-5 h-1.5 rounded-full bg-[#D7E400]" />}
      {children}
    </motion.p>
  );
}

const H2 = 'font-display font-black uppercase tracking-tight leading-[1.05] text-3xl sm:text-4xl lg:text-5xl';
const SECTION = 'py-16 sm:py-20 lg:py-28 px-5 sm:px-6';
const BTN = 'inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95';

// ─── HOME ────────────────────────────────────────────────────────────────────
export default function Home() {
  const activeWorlds = WORLDS.filter((w) => w.active);
  const soonWorlds = WORLDS.filter((w) => !w.active);

  return (
    <div className="overflow-x-clip">
      <Helmet>
        <title>Instituto Lael - Preuniversitario PAES 2027 | Santiago, Chile</title>
        <meta name="description" content="Tu sueño no tiene fecha de vencimiento. Preuniversitario PAES online desde $10.000/mes por ramo, inglés y nivelación de estudios gratis para adultos. Matrícula gratis y becas. Instituto Lael, Chile." />
      </Helmet>

      {/* ══ 1. HERO ═════════════════════════════════════════════════════════ */}
      <section
        className="-mt-20 min-h-[100svh] relative flex flex-col justify-center items-center px-5 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center overflow-hidden"
        style={{ backgroundColor: BLUE }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D49] via-[#071D49]/80 to-[#071D49]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <HeroCarousel
            titleClassName="text-white font-display font-black uppercase leading-[0.95] tracking-tight mb-6 sm:mb-8 text-[2rem] min-[380px]:text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            slides={HERO_SLIDES}
          />

          {/* Stats row (was a vertical column that collided with the headline) */}
          <motion.div
            {...fadeUp(0.35)}
            className="mt-10 sm:mt-14 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10"
          >
            {[
              { label: 'Alumnos', value: '+1000' },
              { label: 'Becas', value: 'DISPONIBLES', accent: true },
              { label: 'Online', value: '100%' },
              { label: 'Matrícula', value: 'GRATIS', accent: true },
            ].map((item) => (
              <div key={item.label} className="bg-[#071D49] px-3 py-4">
                <p className={`font-display font-black text-lg sm:text-xl leading-none ${item.accent ? 'text-[#D7E400]' : 'text-white'}`}>
                  {item.value}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-[0.15em] font-bold mt-1.5">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 2. NO ERES UN PUNTAJE ══════════════════════════════════════════ */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-5xl mx-auto text-center">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <motion.h2 {...fadeUp(0.05)} className={`${H2} text-[#071D49] mb-6 sm:mb-8`}>
            NO ERES<br />UN PUNTAJE.
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="max-w-3xl mx-auto space-y-4 mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed text-[#071D49]/70">
            <p>
              Aquí nadie compite contra nadie. Los cursos son chicos, tu profe sabe cómo te llamas y se da cuenta cuando te estás quedando atrás.
            </p>
            <p>
              Hay quien viene saliendo de cuarto medio y quien lleva años sin abrir un cuaderno. A todos los recibimos igual.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto mb-10">
            {[
              { icon: Users, text: 'Clases en vivo por Google Meet.' },
              { icon: Target, text: 'Máximo 20 alumnos por curso.' },
              { icon: Heart, text: 'Si faltas, cada semana te compartimos las grabaciones.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeUp(0.1 + idx * 0.05)}
                className="flex md:flex-col items-center gap-4 p-4 md:p-6 rounded-[24px] bg-[#F4F4F4] border border-[#071D49]/5 text-left md:text-center"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#071D49] flex-shrink-0 flex items-center justify-center">
                  <item.icon className="text-[#D7E400]" size={22} />
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#071D49] leading-snug md:max-w-[220px]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.2)}>
            <Link
              to="/nosotros"
              className="inline-flex items-center gap-2 min-h-[44px] font-display text-sm font-bold uppercase tracking-wider text-[#071D49] hover:gap-4 transition-all"
            >
              Conoce quiénes somos <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ 3. PROGRAMA PAES + RAMOS ═══════════════════════════════════════ */}
      <section className={`${SECTION} bg-[#F4F4F4]`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="rounded-[28px] overflow-hidden shadow-lael grid grid-cols-1 lg:grid-cols-10"
          >
            {/* Left */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-center text-left" style={{ backgroundColor: BLUE }}>
              <span className="font-display text-[#D7E400] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                DESDE $10.000/MES
              </span>
              <h2 className={`${H2} text-white mb-4`}>
                PROGRAMA PAES<br />2027
              </h2>
              <p className="text-white/75 text-base sm:text-lg mb-8 leading-relaxed italic">
                "Creamos el preu que nos habría gustado tener."
              </p>
              <div>
                <a
                  href={FORM_URL}
                  className={`${BTN} w-full sm:w-auto bg-[#D7E400] text-[#071D49] hover:opacity-90 shadow-xl`}
                >
                  Inscribirme ahora <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-4 p-6 sm:p-10 lg:p-14 flex flex-col justify-center" style={{ backgroundColor: YELLOW }}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  { label: 'INICIO', value: 'Marzo 2027' },
                  { label: 'MODALIDAD', value: 'Online' },
                  { label: 'CUPOS', value: '20 por curso' },
                  { label: 'COSTO', value: 'Desde $10.000' },
                ].map((item) => (
                  <div key={item.label} className="border-b border-[#071D49]/15 pb-3">
                    <dt className="text-xs font-bold tracking-[0.15em] text-[#071D49]/70 mb-1">{item.label}</dt>
                    <dd className="font-display text-[#071D49] font-black text-lg sm:text-xl leading-tight">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* Ramos: compact list (the full detail lives on /paes) */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-8 sm:mb-10">
              <Eyebrow>Ramos PAES 2027</Eyebrow>
              <motion.h2 {...fadeUp(0.05)} className={`${H2} text-[#071D49]`}>
                TOMA SOLO LOS RAMOS QUE NECESITAS.
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { title: 'PRUEBAS OBLIGATORIAS', badge: 'COMÚN', items: OBLIGATORIAS, strong: true, span: 'lg:col-span-2' },
                { title: 'PRUEBAS ELECTIVAS', badge: 'ELIGE TUS ELECTIVAS', items: ELECTIVAS, strong: false, span: 'lg:col-span-3' },
              ].map((group, gi) => (
                <motion.div
                  key={group.title}
                  {...fadeUp(gi * 0.08)}
                  className={`${group.span} bg-white rounded-[28px] border border-[#071D49]/5 shadow-card p-5 sm:p-6`}
                >
                  <div className="flex items-center justify-between gap-3 pb-4 mb-2 border-b border-[#071D49]/10">
                    <h3 className="font-display text-[#071D49] font-black text-sm sm:text-base tracking-wide">{group.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap ${group.strong ? 'bg-[#D7E400] text-[#071D49]' : 'bg-[#071D49] text-white'}`}>
                      {group.badge}
                    </span>
                  </div>
                  <ul className={`grid grid-cols-1 ${group.strong ? '' : 'sm:grid-cols-2'} gap-x-6`}>
                    {group.items.map((sub) => (
                      <li key={sub.code} className="flex items-center gap-3 py-2.5 border-b border-[#071D49]/5 last:border-b-0">
                        <span
                          className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-display font-black text-xs ${group.strong ? 'bg-[#D7E400] text-[#071D49]' : 'bg-[#071D49] text-white'}`}
                        >
                          {sub.code}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display font-bold text-sm sm:text-base text-[#071D49] leading-tight">{sub.name}</span>
                          {sub.doc && <span className="block text-xs text-[#071D49]/70 mt-0.5">Docente: {sub.doc}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.1)} className="text-center mt-6">
              <Link
                to="/paes"
                className="inline-flex items-center gap-2 min-h-[44px] font-display text-sm font-bold uppercase tracking-wider text-[#071D49] hover:gap-3 transition-all"
              >
                Ver detalles <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 4. OTROS PROGRAMAS ═════════════════════════════════════════════ */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Eyebrow>Además del preu</Eyebrow>
            <motion.h2 {...fadeUp(0.05)} className={`${H2} text-[#071D49]`}>
              OTROS PROGRAMAS.
            </motion.h2>
          </div>

          {/* Active programs: big image cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeWorlds.map((world, i) => (
              <motion.div
                key={world.id}
                {...fadeUp(i * 0.08)}
                className="relative min-h-[340px] sm:min-h-[400px] rounded-[28px] overflow-hidden group flex flex-col justify-end shadow-card"
              >
                <img
                  src={world.bg}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,29,73,0.97) 0%, rgba(7,29,73,0.75) 45%, rgba(7,29,73,0.15) 100%)' }} />

                <div className="relative z-10 p-6 sm:p-8">
                  <div className="flex justify-between items-center gap-3 mb-3">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400]">
                      {world.label}
                    </p>
                    {world.price && (
                      <span className="bg-[#D7E400] text-[#071D49] text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                        {world.price}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl leading-tight mb-2">
                    {world.title}<br />
                    <span className="text-[#D7E400]">{world.accent}</span>
                  </h3>
                  <p className="text-white/75 text-sm sm:text-base mb-5 leading-relaxed">{world.desc}</p>
                  <Link
                    to={world.route}
                    className={`${BTN} w-full sm:w-auto bg-[#D7E400] text-[#071D49] hover:opacity-90`}
                  >
                    {world.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon: compact, legible cards */}
          {soonWorlds.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              {soonWorlds.map((world, i) => (
                <motion.div
                  key={world.id}
                  {...fadeUp(i * 0.08)}
                  className="flex items-start gap-4 p-5 sm:p-6 rounded-[28px] bg-[#F4F4F4] border border-dashed border-[#071D49]/20"
                >
                  <img
                    src={world.bg}
                    alt=""
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0 grayscale"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#071D49]">{world.label}</p>
                      <span className="bg-[#071D49] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Próximamente
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-[#071D49] text-lg leading-tight mb-1">
                      {world.title} {world.accent}
                    </h3>
                    <p className="text-[#071D49]/70 text-sm leading-relaxed">{world.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ 5. DOCENTES ════════════════════════════════════════════════════ */}
      <section className={`${SECTION} bg-[#F4F4F4]`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Eyebrow>Los profes</Eyebrow>
            <motion.h2 {...fadeUp(0.05)} className={`${H2} text-[#071D49]`}>
              ESTOS SON TUS PROFES.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {TEACHERS.map((t, i) => {
              const isDiego = t.id === 'diego';
              const isMonserrat = t.id === 'monserrat';
              const isPlaceholder = t.placeholder;

              return (
                <motion.div
                  key={t.id}
                  {...fadeUp(i * 0.05)}
                  className={`rounded-[24px] p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-shadow ${
                    isPlaceholder ? 'border border-dashed border-[#071D49]/20 bg-transparent' : 'bg-white border border-[#071D49]/5 shadow-card hover:shadow-lael'
                  }`}
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-black font-display overflow-hidden"
                    style={{
                      backgroundColor: isPlaceholder ? '#e5e7eb' : BLUE,
                      color: isPlaceholder ? BLUE : YELLOW,
                    }}
                  >
                    {t.photo ? (
                      <img src={t.photo} alt={`Foto de ${t.name}`} loading="lazy" className="w-full h-full object-cover" />
                    ) : isPlaceholder ? '?' : t.initials}
                  </div>

                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-bold text-[#071D49] text-base">
                        {isPlaceholder ? 'Profe por confirmar' : t.name}
                      </h3>
                      {isDiego && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#D7E400] text-[#071D49] px-2 py-0.5 rounded-full">
                          FUNDADOR
                        </span>
                      )}
                      {isMonserrat && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#071D49] text-white px-2 py-0.5 rounded-full">
                          DOCENTE DE INGLÉS
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#071D49] mb-0.5">
                      {t.subject}
                    </p>
                    <p className="text-sm text-[#071D49]/70">
                      {isPlaceholder ? 'Estamos buscando profe de Lectora' : t.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 6. SIGNIFICADO LAEL ════════════════════════════════════════════ */}
      <SignificadoLael />

      {/* ══ 7. MÉTRICAS ════════════════════════════════════════════════════ */}
      <section className={SECTION} style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto text-center">
          <Eyebrow dark className="mb-8 sm:mb-10">Desde 2021</Eyebrow>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                className="text-center px-3 py-6 sm:p-8 rounded-[24px] bg-white/5 border border-white/10"
              >
                <p
                  className="font-display font-black leading-none mb-3 text-4xl sm:text-5xl lg:text-6xl"
                  style={{ color: m.color }}
                >
                  <AnimatedNumber value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <div className="w-8 h-0.5 mx-auto mb-3 bg-[#D7E400]/40" />
                <p className="text-white/75 text-xs font-bold uppercase tracking-[0.15em] leading-snug">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. TESTIMONIOS ═════════════════════════════════════════════════ */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Eyebrow>Lo que cuentan los alumnos</Eyebrow>
            <motion.h2 {...fadeUp(0.05)} className={`${H2} text-[#071D49]`}>
              EN SUS PALABRAS.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                {...fadeUp(0)}
                className="rounded-[28px] p-6 sm:p-8 bg-[#F4F4F4] border border-[#071D49]/5"
              >
                <div className="flex gap-1 mb-5" aria-label={`${t.rating} de 5 estrellas`}>
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} size={18} fill={YELLOW} color={BLUE} strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-base sm:text-lg leading-relaxed mb-6 font-medium text-[#071D49]">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm font-display bg-[#071D49] text-[#D7E400]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm font-display text-[#071D49]">{t.name}</p>
                    <p className="text-xs uppercase tracking-wider text-[#071D49]/70">{t.program}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Share your story */}
            <motion.div
              {...fadeUp(0.05)}
              className={`${TESTIMONIALS.length % 2 === 0 ? 'md:col-span-2' : ''} rounded-[28px] p-6 sm:p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#071D49]/15`}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[#071D49]">
                <Star size={20} color={YELLOW} fill={YELLOW} />
              </div>
              <p className="font-bold text-base mb-2 font-display text-[#071D49]">
                ¿Estudiaste con nosotros?
              </p>
              <p className="text-sm leading-relaxed max-w-md text-[#071D49]/70">
                Estamos juntando más historias de alumnos, con nombre y autorización. Si quieres contar la tuya, escríbenos.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-1 sm:gap-8 items-center">
                <a
                  href={SHARE_STORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center min-h-[44px] text-xs font-bold uppercase tracking-wider hover:underline font-display text-[#071D49]"
                >
                  Comparte tu historia →
                </a>
                <Link
                  to="/casos-reales"
                  className="inline-flex items-center min-h-[44px] text-xs font-bold uppercase tracking-wider hover:underline font-display text-[#071D49]"
                >
                  Ver todas las historias →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 9. CTA FINAL ═══════════════════════════════════════════════════ */}
      <section className={SECTION} style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow dark>¿Te animas?</Eyebrow>
          <motion.h2
            {...fadeUp(0.05)}
            className="font-display font-black uppercase tracking-tight leading-[1.02] text-white mb-8 sm:mb-10 text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-6xl"
          >
            INSCRÍBETE.<br />LA MATRÍCULA ES GRATIS.
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={FORM_URL}
              className={`${BTN} w-full sm:w-auto sm:px-12 sm:py-5 bg-[#D7E400] text-[#071D49] hover:opacity-90 hover:-translate-y-0.5`}
              style={{ boxShadow: `0 20px 60px ${YELLOW}40` }}
            >
              INSCRIBIRME AHORA
              <ArrowRight size={18} />
            </a>
          </motion.div>
          <motion.p
            {...fadeUp(0.15)}
            className="mt-8 text-white/60 text-sm tracking-wide"
          >
            institutolael.cl · Matrícula gratis · 100% online
          </motion.p>
        </div>
      </section>
    </div>
  );
}
