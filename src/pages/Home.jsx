import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Users, BookOpen, Heart, Target, Star, ChevronRight, Globe, HandHeart } from 'lucide-react';

// Hero image
import heroImg from '../assets/img/Home/hero_student_lael.png';

// World backgrounds
import idiomasBg from '../assets/img/Home/mundo_idiomas_bg_1777943491283.png';
import lschBg from '../assets/img/Home/mundo_lsch_bg_1777943626827.png';
import adultosBg from '../assets/img/Home/mundo_adultos_bg_1777944001677.png';
import empresasBg from '../assets/img/Home/mundo_empresas_bg_1777944168670.png';

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const BLUE   = '#071D49';
const YELLOW = '#D7E400';
const GRAY   = '#F4F4F4';
const ease   = [0.16, 1, 0.3, 1];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1.8 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  React.useEffect(() => {
    if (inView) animate(count, value, { duration, ease: 'easeOut' });
  }, [inView, count, value, duration]);
  return (
    <span ref={ref}>{prefix}<motion.span>{rounded}</motion.span>{suffix}</span>
  );
}

// ─── FADE UP HELPER ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 1, delay, ease },
});

// ─── DATA ────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  { code: 'M1',  name: 'Matemática 1',          type: 'Obligatoria' },
  { code: 'M2',  name: 'Matemática 2',          type: 'Electiva' },
  { code: 'CL',  name: 'Comprensión Lectora',   type: 'Obligatoria' },
  { code: 'BIO', name: 'Biología',              type: 'Electiva' },
  { code: 'QUI', name: 'Química',               type: 'Electiva' },
  { code: 'FIS', name: 'Física',                type: 'Electiva' },
  { code: 'HIS', name: 'Historia',              type: 'Electiva' },
];

const WORLDS = [
  { id: 'ingles', label: 'INGLÉS', title: 'Habla con', accent: 'seguridad.', desc: 'Clases en vivo por Google Meet. Fluidez real sin atajos.', bg: idiomasBg, cta: 'Ver programa', route: '/idiomas', active: true, price: '$9.990/mes' },
  { id: 'lsch',   label: 'LSCh',   title: 'Inclusión', accent: 'para todos.', desc: 'Lengua de Señas Chilena con instructores nativos. Cultura Sorda.', bg: lschBg,    cta: 'Aprender LSCh', route: '/lsch',   active: true, price: '$19.990/mes' },
  { id: 'adultos', label: 'NIVELACIÓN', title: 'Tu segunda', accent: 'oportunidad.', desc: 'Termina tus estudios con un programa flexible. Próximamente.', bg: adultosBg, cta: 'Próximamente', route: '/adultos', active: false, price: null },
];

const TEACHERS = [
  { id: 'diego',    name: 'Diego Chaparro', role: 'Director & Profe', subject: 'Matemática M1 + M2',    initials: 'DC', color: YELLOW },
  { id: 'martin',   name: 'Martín',         role: 'Profe de Ciencias', subject: 'Biología + Química',   initials: 'MA', color: YELLOW },
  { id: 'kathy',    name: 'Kathy',           role: 'Profe de Matemáticas', subject: 'Matemática M2',    initials: 'KA', color: YELLOW },
  { id: 'fernanda', name: 'Fernanda',        role: 'Instructora LSCh', subject: 'Lengua de Señas Chilena', initials: 'FE', color: YELLOW },
  { id: 'cl',       name: 'Próximamente',    role: 'Profe de Lenguaje', subject: 'Comprensión Lectora',  initials: '?',  color: '#8D8D8D', placeholder: true },
];

const WHY_LAEL = [
  { icon: <Users size={28} />,    title: 'Acompañamiento real',  desc: 'No estudias solo. Profesores que te conocen por tu nombre y se preocupan por tu avance.' },
  { icon: <Target size={28} />,   title: 'Ensayos y práctica',   desc: 'Preparación constante con simulacros reales para que llegues tranquilo el día de la PAES.' },
  { icon: <Heart size={28} />,    title: 'Comunidad',            desc: 'Aprende junto a otros estudiantes con el mismo objetivo. Nunca estás solo en el proceso.' },
  { icon: <BookOpen size={28} />, title: 'Formación integral',   desc: 'Más que puntajes. Desarrollamos tu potencial como persona, no solo como estudiante.' },
];

const METRICS = [
  { value: 600, prefix: '+', suffix: '',  label: 'Alumnos activos',  color: YELLOW },
  { value: 0,   prefix: '$', suffix: '',  label: 'Costo PAES',       color: '#FFFFFF' },
  { value: 3,   prefix: '',  suffix: '',  label: 'Idiomas activos',  color: YELLOW },
  { value: 100, prefix: '',  suffix: '%', label: '100% Online',      color: '#FFFFFF' },
];

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Daniela R.',
    program: 'LSCh con Fernanda',
    quote: 'Fernanda es una profesora excelente. Aprendí cultura sorda con una pedagogía muy paciente y estructurada.',
    rating: 5,
    initials: 'DR',
    real: true,
  },
];

// ─── HOME ────────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Instituto Lael | PAES Gratuita + Idiomas + LSCh — Chile</title>
        <meta name="description" content="Tu futuro no empieza después. Empieza ahora. PAES 100% gratuita, Inglés, Coreano y LSCh. Acompañamiento real. Instituto Lael, Chile." />
      </Helmet>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 1 — HERO 50/50
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden"
        style={{ backgroundColor: BLUE }}
      >
        {/* Left — Copy */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-32 lg:py-0 relative z-10">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full"
              style={{ backgroundColor: YELLOW, color: BLUE }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              PAES 2027 — 100% Gratuita
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            className="text-white leading-[0.92] mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            TU FUTURO<br />
            NO EMPIEZA<br />
            <span style={{ color: YELLOW }}>DESPUÉS.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-white/60 text-lg leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <em style={{ color: YELLOW, fontStyle: 'normal', fontWeight: 600 }}>Empieza ahora.</em>{' '}
            Clases en vivo, profesores reales y comunidad. Sin costo, sin barreras. Solo tu esfuerzo y nuestra guía.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/paes"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95 shadow-xl"
              style={{ backgroundColor: YELLOW, color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
            >
              Inscribirme gratis
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/paes"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10 active:scale-95"
              style={{ border: `2px solid rgba(255,255,255,0.25)`, color: 'white', fontFamily: 'Montserrat, sans-serif' }}
            >
              Conocer el programa
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div {...fadeUp(0.5)} className="flex items-center gap-6 mt-12 pt-12 border-t border-white/10">
            <div className="text-center">
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>+600</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Alumnos</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="font-bold text-2xl" style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}>$0</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Costo PAES</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>100%</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Online</p>
            </div>
          </motion.div>
        </div>

        {/* Right — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="relative hidden lg:block"
        >
          {/* Gradient overlay on left edge to blend with blue */}
          <div
            className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${BLUE}, transparent)` }}
          />
          <img
            src={heroImg}
            alt="Estudiante Instituto Lael"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${BLUE}CC, transparent)` }}
          />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="absolute top-12 right-12 z-20 rounded-2xl p-5 shadow-2xl"
            style={{ backgroundColor: YELLOW }}
          >
            <p className="font-black text-3xl leading-none" style={{ color: BLUE, fontFamily: 'Montserrat, sans-serif' }}>100%</p>
            <p className="font-bold text-[10px] uppercase tracking-widest mt-1" style={{ color: BLUE }}>Gratuito</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 2 — NO ERES UN PUNTAJE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            {...fadeUp(0)}
            className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
            style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
          >
            Nuestra Creencia
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="leading-[0.9] mb-10"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: BLUE,
              letterSpacing: '-0.03em',
            }}
          >
            NO ERES<br />UN PUNTAJE.
          </motion.h2>
          <motion.div {...fadeUp(0.2)} className="max-w-2xl mx-auto space-y-5">
            <p className="text-xl leading-relaxed" style={{ color: '#071D49CC' }}>
              La PAES es importante. Pero detrás de cada resultado hay una historia, esfuerzo y sueños.
            </p>
            <p className="text-xl leading-relaxed" style={{ color: '#071D49CC' }}>
              En Instituto LAEL trabajamos para <strong style={{ color: BLUE }}>desarrollar tu potencial académico y personal.</strong>
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.3)} className="mt-12">
            <Link
              to="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:gap-4 transition-all"
              style={{ color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
            >
              Conoce quiénes somos <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 3 — CARD PAES GRATUITO 2027
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: GRAY }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="rounded-[40px] overflow-hidden shadow-2xl"
            style={{ backgroundColor: BLUE }}
          >
            <div className="p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <span
                  className="inline-block text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full mb-8 shadow-lg"
                  style={{ backgroundColor: YELLOW, color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
                >
                  100% GRATUITO
                </span>
                <h2
                  className="text-white mb-6 leading-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  PROGRAMA PAES<br />GRATUITO 2027
                </h2>
                <p className="text-white/60 text-lg mb-10 leading-relaxed">
                  Clases en vivo, simulacros semanales y profesores reales. Sin matrícula, sin mensualidades, sin sorpresas.
                </p>
                <Link
                  to="/paes"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: YELLOW, color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
                >
                  Inscribirme ahora <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right — Details */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Inicio', value: 'Agosto 2025' },
                  { label: 'Modalidad', value: 'Online' },
                  { label: 'Cupos', value: 'Limitados' },
                  { label: 'Costo', value: '$0 / mes' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-6 rounded-3xl flex flex-col gap-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</p>
                    <p
                      className="font-black text-white text-xl leading-tight"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 4 — DASHBOARD ASIGNATURAS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
            >
              Asignaturas PAES 2027
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="text-white"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
            >
              TODO LO QUE NECESITAS.
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SUBJECTS.map((subject, i) => (
              <motion.div
                key={subject.code}
                {...fadeUp(i * 0.06)}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="group rounded-[28px] p-6 cursor-pointer transition-all"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Badge code */}
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-xl font-black group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: YELLOW,
                    color: BLUE,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {subject.code}
                </div>
                <h3
                  className="text-white font-bold text-base leading-tight mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {subject.name}
                </h3>
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: subject.type === 'Obligatoria' ? `${YELLOW}20` : 'rgba(255,255,255,0.08)',
                    color: subject.type === 'Obligatoria' ? YELLOW : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {subject.type}
                </span>
              </motion.div>
            ))}

            {/* Coming soon card */}
            <motion.div
              {...fadeUp(SUBJECTS.length * 0.06)}
              className="rounded-[28px] p-6 flex flex-col justify-center items-center text-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.15)',
              }}
            >
              <p className="text-white/30 text-sm font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Más asignaturas</p>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mt-1">Próximamente</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 5 — MUNDOS / OTROS PROGRAMAS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
            >
              Más en Instituto Lael
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: BLUE, letterSpacing: '-0.03em' }}
            >
              ELIGE TU PROGRAMA.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORLDS.map((world, i) => (
              <motion.div
                key={world.id}
                {...fadeUp(i * 0.1)}
                whileHover={world.active ? { y: -6 } : {}}
                className={`relative aspect-[3/4] rounded-[40px] overflow-hidden group ${world.active ? 'cursor-pointer' : 'cursor-default opacity-60'}`}
              >
                <img
                  src={world.bg}
                  alt={world.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,29,73,0.95) 0%, rgba(7,29,73,0.4) 50%, transparent 100%)' }} />

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-8 z-10">
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3"
                    style={{ color: world.active ? YELLOW : 'rgba(255,255,255,0.4)' }}
                  >
                    {world.label}
                  </p>
                  <h3
                    className="text-white mb-2 leading-tight"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.7rem' }}
                  >
                    {world.title}<br />
                    <span style={{ color: world.active ? YELLOW : 'rgba(255,255,255,0.5)' }}>{world.accent}</span>
                  </h3>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">{world.desc}</p>
                  {world.active ? (
                    <div className="flex items-center gap-3">
                      <Link
                        to={world.route}
                        className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-all group-hover:opacity-90"
                        style={{ backgroundColor: YELLOW, color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {world.cta}
                      </Link>
                      {world.price && (
                        <span className="text-white/40 text-[10px] font-bold">{world.price}</span>
                      )}
                    </div>
                  ) : (
                    <span
                      className="inline-block py-3 px-6 rounded-xl text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      Próximamente
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 6 — DOCENTES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ backgroundColor: GRAY }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
            >
              Equipo Docente
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: BLUE, letterSpacing: '-0.03em' }}
            >
              PERSONAS REALES.<br />RESULTADOS REALES.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {TEACHERS.map((t, i) => (
              <motion.div
                key={t.id}
                {...fadeUp(i * 0.08)}
                className={`rounded-[32px] p-8 flex flex-col items-center text-center transition-all ${t.placeholder ? 'opacity-50' : ''}`}
                style={{
                  backgroundColor: t.placeholder ? 'transparent' : 'white',
                  border: t.placeholder ? `2px dashed rgba(7,29,73,0.15)` : '1px solid rgba(7,29,73,0.08)',
                  boxShadow: t.placeholder ? 'none' : '0 4px 24px rgba(7,29,73,0.06)',
                }}
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-5 shadow-lg"
                  style={{
                    backgroundColor: t.placeholder ? '#e5e7eb' : BLUE,
                    color: t.placeholder ? '#9ca3af' : YELLOW,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {t.initials}
                </div>
                <h3
                  className="font-bold text-lg mb-1 leading-tight"
                  style={{ color: t.placeholder ? '#9ca3af' : BLUE, fontFamily: 'Montserrat, sans-serif' }}
                >
                  {t.name}
                </h3>
                <p
                  className="text-[11px] font-bold uppercase tracking-wider mb-3"
                  style={{ color: t.placeholder ? '#9ca3af' : YELLOW }}
                >
                  {t.subject}
                </p>
                <p
                  className="text-[11px] uppercase tracking-widest"
                  style={{ color: t.placeholder ? '#9ca3af' : `${BLUE}80` }}
                >
                  {t.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 7 — ¿POR QUÉ LAEL?
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
            >
              La diferencia
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: BLUE, letterSpacing: '-0.03em' }}
            >
              ¿POR QUÉ LAEL?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_LAEL.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                className="rounded-[32px] p-8 group transition-all cursor-default"
                style={{
                  border: `2px solid rgba(7,29,73,0.08)`,
                  backgroundColor: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = YELLOW;
                  e.currentTarget.style.backgroundColor = `${YELLOW}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(7,29,73,0.08)';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${YELLOW}20`, color: BLUE }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-bold text-xl mb-3 leading-tight"
                  style={{ color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: `${BLUE}80` }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 8 — MÉTRICAS ANIMADAS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto">
          <motion.p
            {...fadeUp(0)}
            className="text-center text-[10px] font-bold uppercase tracking-[0.4em] mb-16"
            style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
          >
            Nuestro impacto
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="text-center p-10 rounded-[32px]"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p
                  className="font-black leading-none mb-4"
                  style={{ color: m.color, fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  <AnimatedNumber value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <div className="w-8 h-0.5 mx-auto mb-3" style={{ backgroundColor: `${YELLOW}40` }} />
                <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.2em]">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 9 — TESTIMONIOS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
            >
              Lo que dicen nuestros alumnos
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: BLUE, letterSpacing: '-0.02em' }}
            >
              HISTORIAS REALES.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Real testimonial */}
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                {...fadeUp(0)}
                className="rounded-[32px] p-8"
                style={{ backgroundColor: GRAY, border: `2px solid rgba(7,29,73,0.06)` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} fill={YELLOW} color={YELLOW} />
                  ))}
                </div>
                <p
                  className="text-lg leading-relaxed mb-8 font-medium"
                  style={{ color: BLUE }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ backgroundColor: BLUE, color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: BLUE, fontFamily: 'Montserrat, sans-serif' }}>{t.name}</p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: `${BLUE}60` }}>{t.program}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Placeholder — próximamente */}
            <motion.div
              {...fadeUp(0.1)}
              className="rounded-[32px] p-8 flex flex-col items-center justify-center text-center"
              style={{
                border: `2px dashed rgba(7,29,73,0.12)`,
                backgroundColor: 'transparent',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: `${YELLOW}20` }}
              >
                <Star size={24} color={YELLOW} />
              </div>
              <p
                className="font-bold text-base mb-2"
                style={{ color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
              >
                Próximamente más historias
              </p>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${BLUE}60` }}>
                Estamos recopilando las historias de nuestros estudiantes. ¿Estudiaste con nosotros? Cuéntanos.
              </p>
              <a
                href="https://wa.me/56964626568?text=Hola,%20quiero%20compartir%20mi%20testimonio%20con%20Instituto%20Lael"
                target="_blank"
                rel="noreferrer"
                className="mt-6 text-[11px] font-bold uppercase tracking-wider hover:underline transition-all"
                style={{ color: BLUE }}
              >
                Comparte tu historia →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 10 — CTA FINAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 lg:py-48 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            {...fadeUp(0)}
            className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10"
            style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
          >
            Tu momento es ahora
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-white mb-12 leading-[0.9]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              letterSpacing: '-0.03em',
            }}
          >
            EL PRÓXIMO<br />PASO ES TUYO.
          </motion.h2>
          <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/paes"
              className="inline-flex items-center justify-center gap-2 px-12 py-6 rounded-2xl font-black text-base uppercase tracking-wider transition-all hover:opacity-90 hover:-translate-y-1 active:scale-95 shadow-2xl"
              style={{
                backgroundColor: YELLOW,
                color: BLUE,
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: `0 20px 60px ${YELLOW}40`,
              }}
            >
              INSCRIBIRME AHORA
              <ArrowRight size={20} />
            </Link>
          </motion.div>
          <motion.p
            {...fadeUp(0.4)}
            className="mt-10 text-white/30 text-sm tracking-wider"
          >
            institutolael.cl · Sin costos · 100% online
          </motion.p>
        </div>
      </section>
    </div>
  );
}
