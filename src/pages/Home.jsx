import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Users, BookOpen, Heart, Target, Star, ChevronRight, Globe, HandHeart, Sparkles } from 'lucide-react';
import SignificadoLael from '../components/SignificadoLael';

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
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 1, delay, ease },
});

// ─── DATA ────────────────────────────────────────────────────────────────────
const OBLIGATORIAS = [
  { code: 'M1', name: 'Matemática M1', doc: 'Diego Chaparro' },
  { code: 'CL', name: 'Competencia Lectora', doc: 'Por confirmar' }
];

const ELECTIVAS = [
  { code: 'M2', name: 'Matemática M2', doc: 'Diego / Kathy' },
  { code: 'BIO', name: 'Biología', doc: 'Martín' },
  { code: 'QUI', name: 'Química', doc: 'Martín' },
  { code: 'FIS', name: 'Física', doc: 'Por confirmar' },
  { code: 'HIS', name: 'Historia', doc: 'Por confirmar' }
];

const WORLDS = [
  { id: 'ingles', label: 'INGLÉS', title: 'Habla con', accent: 'seguridad.', desc: 'Clases en vivo por Google Meet. Fluidez real sin atajos. Plan Trimestral: $11.990/mes.', bg: idiomasBg, cta: 'Ver programa', route: '/idiomas', active: true, price: '$14.990/mes' },
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
        <title>Instituto Lael — PAES Gratuita 2027 | Santiago, Chile</title>
        <meta name="description" content="Tu futuro no empieza después. Empieza ahora. PAES 100% gratuita, Inglés y LSCh. Acompañamiento real. Instituto Lael, Chile." />
      </Helmet>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 1 — HERO REDISEÑADO
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="min-h-screen relative flex flex-col justify-center items-center px-6 py-32 lg:py-40 text-center overflow-hidden"
        style={{ backgroundColor: BLUE }}
      >
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
          <img
            src={heroImg}
            alt="Estudiante Instituto Lael"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D49] via-[#071D49]/80 to-[#071D49]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-6">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full"
              style={{ backgroundColor: YELLOW, color: BLUE }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              PAES 2027
            </span>
          </motion.div>

          {/* Headline ENORME */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            className="text-white leading-[0.9] mb-8 font-display font-black text-5xl sm:text-7xl lg:text-[7.5rem] tracking-tight max-w-4xl"
          >
            TU FUTURO<br />
            NO EMPIEZA<br />
            <span style={{ color: YELLOW }}>DESPUÉS.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-center"
          >
            <span className="text-white font-extrabold">Empieza ahora.</span> Clases en vivo, profesores reales y comunidad. Sin costo, sin barreras. Solo tu esfuerzo y nuestra guía.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <a
              href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95 shadow-xl"
              style={{ backgroundColor: YELLOW, color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
            >
              Inscribirme gratis
              <ArrowRight size={16} />
            </a>
            <Link
              to="/paes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/10 active:scale-95"
              style={{ border: `2px solid rgba(255,255,255,0.25)`, color: 'white', fontFamily: 'Montserrat, sans-serif' }}
            >
              Conocer el programa
            </Link>
          </motion.div>
        </div>

        {/* Right Costado — Métricas Verticales en Desktop */}
        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 z-10 border-l border-white/10 pl-6 py-4">
          {[
            { label: 'Alumnos', value: '+600' },
            { label: 'Costo PAES', value: '$0' },
            { label: 'Online', value: '100%' },
            { label: 'Matrícula', value: 'GRATIS' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(0.4 + idx * 0.1)}
              className="text-left"
            >
              <p className="text-white font-black text-2xl leading-none" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {item.value === '$0' || item.value === 'GRATIS' ? (
                  <span style={{ color: YELLOW }}>{item.value}</span>
                ) : (
                  item.value
                )}
              </p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 2 — NO ERES UN PUNTAJE (MEJORADO)
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
          <motion.div {...fadeUp(0.2)} className="max-w-3xl mx-auto space-y-4 mb-16 text-lg md:text-xl leading-relaxed text-lael-primary/80">
            <p>
              Eres esfuerzo, constancia, aprendizaje y sueños — y eso no se mide con números.
            </p>
            <p>
              Detrás de cada estudiante hay una historia única, y cada proceso importa.
            </p>
          </motion.div>

          {/* 3 Columnas de iconos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { icon: <Users className="text-lael-primary" size={24} />, text: 'Detrás de cada estudiante hay una historia.' },
              { icon: <Target className="text-lael-primary" size={24} />, text: 'Cada proceso importa.' },
              { icon: <Heart className="text-lael-primary" size={24} />, text: 'Tu potencial es más grande de lo que imaginas.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeUp(0.3 + idx * 0.1)}
                className="flex flex-col items-center p-6 rounded-2xl bg-lael-secondary/50 border border-lael-primary/5 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-lael-accent/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-lael-primary max-w-[200px] leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.5)}>
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
          BLOQUE 3 — PROGRAMA PAES (DISEÑO EDITORIAL 2 COLUMNAS)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-lael-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="rounded-[40px] overflow-hidden shadow-lael grid grid-cols-1 lg:grid-cols-10"
          >
            {/* Columna Izquierda (60%) */}
            <div className="lg:col-span-6 p-8 md:p-16 flex flex-col justify-center text-left" style={{ backgroundColor: BLUE }}>
              <span className="text-lael-accent text-xs font-black uppercase tracking-[0.3em] mb-4">
                100% GRATUITO
              </span>
              <h2
                className="text-white mb-6 leading-tight"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
              >
                PROGRAMA PAES<br />GRATUITO 2027
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed italic">
                "Creamos el preu que nos habría gustado tener."
              </p>
              <div>
                <a
                  href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90 active:scale-95 shadow-xl"
                  style={{ backgroundColor: YELLOW, color: BLUE, fontFamily: 'Montserrat, sans-serif' }}
                >
                  Inscribirme ahora <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Columna Derecha (40%) */}
            <div className="lg:col-span-4 p-8 md:p-16 flex flex-col justify-center" style={{ backgroundColor: YELLOW }}>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: 'INICIO', value: 'Agosto 2026' },
                  { label: 'MODALIDAD', value: 'Online' },
                  { label: 'CUPOS', value: 'Limitados' },
                  { label: 'COSTO', value: '$0 / mes' },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-lael-primary/10 pb-4">
                    <p className="text-[10px] font-black tracking-widest text-lael-primary/50 mb-1">{item.label}</p>
                    <p className="text-lael-primary font-black text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
          BLOQUE 4 — DASHBOARD ASIGNATURAS (LISTADO 2 COLUMNAS)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
              style={{ color: YELLOW, fontFamily: 'Montserrat, sans-serif' }}
            >
              Plan de Estudios PAES 2027
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="text-white"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
            >
              TUS ASIGNATURAS. TU ELECCIÓN.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
            {/* Columna Izquierda: OBLIGATORIAS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-white font-black text-lg tracking-wider font-display">PRUEBAS OBLIGATORIAS</h3>
                <span className="text-[10px] bg-lael-accent text-lael-primary font-bold px-3 py-1 rounded-full">COMÚN</span>
              </div>
              <div className="space-y-4">
                {OBLIGATORIAS.map((sub, idx) => (
                  <motion.div
                    key={sub.code}
                    {...fadeUp(idx * 0.1)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-lael-accent/40 transition-all gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-lael-accent text-lael-primary flex items-center justify-center font-black text-sm font-display">
                        {sub.code}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base font-display">{sub.name}</h4>
                        <p className="text-white/40 text-xs">Docente: {sub.doc}</p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to="/paes"
                        className="inline-flex items-center gap-1.5 text-xs text-lael-accent font-bold hover:underline"
                      >
                        Ver detalles <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Separador visual en Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            {/* Columna Derecha: ELECTIVAS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-white font-black text-lg tracking-wider font-display">PRUEBAS ELECTIVAS</h3>
                <span className="text-[10px] bg-white/10 text-white/60 font-bold px-3 py-1 rounded-full">ELIGE TUS ELECTIVAS</span>
              </div>
              <div className="space-y-4">
                {ELECTIVAS.map((sub, idx) => (
                  <motion.div
                    key={sub.code}
                    {...fadeUp(idx * 0.1)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-lael-accent/40 transition-all gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 text-white/80 flex items-center justify-center font-black text-sm font-display">
                        {sub.code}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base font-display">{sub.name}</h4>
                        <p className="text-white/40 text-xs">Docente: {sub.doc}</p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to="/paes"
                        className="inline-flex items-center gap-1.5 text-xs text-lael-accent font-bold hover:underline"
                      >
                        Ver detalles <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
                  <div className="flex justify-between items-center mb-3">
                    <p
                      className="text-[9px] font-bold uppercase tracking-[0.3em]"
                      style={{ color: world.active ? YELLOW : 'rgba(255,255,255,0.4)' }}
                    >
                      {world.label}
                    </p>
                    {world.price ? (
                      <span className="bg-lael-accent text-lael-primary text-[10px] font-black px-2.5 py-1 rounded">
                        {world.price}
                      </span>
                    ) : (
                      !world.active && (
                        <span className="bg-white/10 text-white/50 text-[9px] font-bold px-2 py-0.5 rounded">
                          PRÓXIMAMENTE
                        </span>
                      )
                    )}
                  </div>
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
                    </div>
                  ) : (
                    <span
                      className="inline-block py-3 px-6 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center w-full"
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
          BLOQUE 6 — DOCENTES (CARDS HORIZONTALES CON BADGES)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-lael-secondary">
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
              PERSONAS REALES. RESULTADOS REALES.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEACHERS.map((t, i) => {
              const isDiego = t.id === 'diego';
              const isFernanda = t.id === 'fernanda';
              const isPlaceholder = t.placeholder;

              return (
                <motion.div
                  key={t.id}
                  {...fadeUp(i * 0.08)}
                  className={`rounded-[24px] p-6 flex items-center gap-6 transition-all ${
                    isPlaceholder ? 'border border-dashed border-lael-primary/20 bg-transparent' : 'bg-white border border-lael-primary/5 shadow-card hover:shadow-lael'
                  }`}
                >
                  {/* Left: Avatar */}
                  <div
                    className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-black shadow-md font-display"
                    style={{
                      backgroundColor: isPlaceholder ? '#e5e7eb' : BLUE,
                      color: isPlaceholder ? '#9ca3af' : YELLOW,
                    }}
                  >
                    {isPlaceholder ? '?' : t.initials}
                  </div>

                  {/* Right: Info */}
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-bold text-lael-primary text-base truncate font-display">
                        {isPlaceholder ? 'Buscando al mejor' : t.name}
                      </h4>
                      {isDiego && (
                        <span className="text-[8px] font-black uppercase tracking-wider bg-lael-accent text-lael-primary px-2 py-0.5 rounded">
                          FUNDADOR
                        </span>
                      )}
                      {isFernanda && (
                        <span className="text-[8px] font-black uppercase tracking-wider bg-lael-primary text-white px-2 py-0.5 rounded">
                          DOCENTE NATIVA SORDA
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-lael-accent font-black uppercase tracking-wide mb-1">
                      {t.subject}
                    </p>
                    <p className="text-xs text-lael-muted">
                      {isPlaceholder ? 'Preparando Comprensión Lectora' : t.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE NUEVO — SIGNIFICADO LAEL
      ══════════════════════════════════════════════════════════════════ */}
      <SignificadoLael />

      {/* ══════════════════════════════════════════════════════════════════
          BLOQUE 8 — MÉTRICAS ANIMADAS (ANIMACIÓN REPARADA)
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
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm font-display"
                    style={{ backgroundColor: BLUE, color: YELLOW }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm font-display" style={{ color: BLUE }}>{t.name}</p>
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
                className="font-bold text-base mb-2 font-display"
                style={{ color: BLUE }}
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
                className="mt-6 text-[11px] font-bold uppercase tracking-wider hover:underline transition-all font-display"
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
            <a
              href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
              target="_blank"
              rel="noopener noreferrer"
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
            </a>
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
