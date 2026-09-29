import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import { ClaseEnVivo, Grupo, Grabacion, Graduacion, Escuela, Familia, Empresa } from '../components/icons/LaelIcons';
import HeroCarousel from '../components/HeroCarousel';
import PlanesPaes from '../components/PlanesPaes';
import BrandArcs from '../components/ui/BrandArcs';
import { fadeUp, SectionTitle } from '../components/ui/PageHero';
import { TEACHERS, TESTIMONIALS } from '../data/home';
import { LANDING_FAQS } from '../data/paes';
import { AUDIENCIAS, COLORES } from '../data/catalogo';
import heroImg from '../assets/img/Home/hero_student_lael_1780734180709.webp';

// Orden de la portada (de arriba a abajo): portada rotativa → elige tu
// camino → cómo son las clases → profes → testimonios → precios →
// preguntas → inscríbete. Lo demás vive en su propia página.
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const FORM_URL = '/inscripcion?programa=paes';

// Portada rotativa: cada lámina es un programa, con su color.
const HERO_SLIDES = [
  {
    id: 'paes',
    badge: 'PAES 2027',
    color: COLORES.paes,
    title: [
      { text: 'Tu sueño', breakAfter: 'sm' },
      { text: 'no tiene fecha', breakAfter: 'sm' },
      { text: 'de vencimiento.', className: 'accent-serif', style: { color: COLORES.paes } },
    ],
    text: 'Da lo mismo si vas en cuarto medio, si la PAES te fue mal la primera vez o si dejaste el colegio hace años. Te ayudamos a llegar. Matrícula gratis y becas para quien las necesite.',
    cta: { label: 'Inscribirme gratis', href: FORM_URL },
    more: { label: 'Conocer el preu', href: '/paes' },
  },
  {
    id: 'adultos',
    badge: 'Escuela de Sueños',
    color: COLORES.adultos,
    title: [
      { text: 'El colegio', breakAfter: 'sm' },
      { text: 'no es la meta.', breakAfter: true },
      { text: 'Es el inicio de tu nueva vida.', className: 'accent-serif', style: { color: COLORES.adultos } },
    ],
    text: 'Si eres mayor de 18, te preparamos gratis para los exámenes libres del Mineduc. Clases online en la noche, a tu ritmo.',
    cta: { label: 'Quiero terminar el colegio', href: '/inscripcion?programa=adultos' },
    more: { label: 'Cómo funciona', href: '/adultos' },
  },
  {
    id: 'ingles',
    badge: 'Inglés · Hablar sin miedo',
    color: COLORES.ingles,
    title: [
      { text: 'Habla inglés', breakAfter: true },
      { text: 'sin miedo.', className: 'accent-serif', style: { color: COLORES.ingles } },
    ],
    text: 'Casi todos entendemos más de lo que nos atrevemos a decir. Clases en vivo donde hablas desde el primer día.',
    cta: { label: 'Inscribirme', href: '/inscripcion?programa=ingles' },
    more: { label: 'Hacer el test de nivel', href: '/idiomas/test' },
  },
];

const ICONO_AUDIENCIA = { estudiantes: Graduacion, adultos: Escuela, apoderados: Familia, empresas: Empresa };

const PREGUNTAS_HOME = [
  LANDING_FAQS[0],
  LANDING_FAQS[3],
  { q: '¿Cómo son las clases?', a: 'En vivo por Google Meet, con la cámara prendida y en cursos de máximo 20 personas. El material queda en Classroom y cada semana te compartimos las grabaciones.' },
  { q: '¿Hay becas?', a: 'Sí, becas parciales para quien las necesite. Postulas en tres minutos y revisamos cada caso con calma.' },
];

const SECTION = 'py-16 sm:py-20 lg:py-24 px-5 sm:px-6';
const BTN = 'inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95';

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Helmet>
        <title>Instituto Lael - Preuniversitario PAES 2027 | Santiago, Chile</title>
        <meta name="description" content="Tu sueño no tiene fecha de vencimiento. Preuniversitario PAES online desde $12.000/mes por ramo, inglés y nivelación de estudios gratis para adultos. Matrícula gratis y becas. Instituto Lael, Chile." />
      </Helmet>

      {/* ══ 1. PORTADA ══════════════════════════════════════════════════ */}
      <section className="-mt-20 min-h-[100svh] relative flex flex-col justify-center items-center px-5 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
          <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D49] via-[#071D49]/80 to-[#071D49]" />
        </div>
        <BrandArcs className="z-0" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <HeroCarousel
            titleClassName="text-white font-display font-extrabold leading-[0.98] tracking-[-0.03em] mb-6 sm:mb-8 text-[2.4rem] min-[380px]:text-[2.7rem] sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
            slides={HERO_SLIDES}
          />
          <motion.dl {...fadeUp(0.35)} className="mt-10 sm:mt-14 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
            {[
              { label: 'Alumnos desde 2021', value: '+1.000' },
              { label: 'Becas', value: 'Disponibles', accent: true },
              { label: 'Online', value: '100%' },
              { label: 'Matrícula', value: 'Gratis', accent: true },
            ].map((item) => (
              <div key={item.label} className="bg-[#071D49] px-3 py-4 flex flex-col-reverse">
                <dt className="text-white/60 text-xs uppercase tracking-[0.15em] font-bold mt-1.5">{item.label}</dt>
                <dd className={`font-display font-extrabold text-lg sm:text-xl leading-none ${item.accent ? 'text-[#D7E400]' : 'text-white'}`}>{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ══ 2. ELIGE TU CAMINO ══════════════════════════════════════════ */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Programas" title="¿Qué estás" accent="buscando?" className="text-center mb-10 sm:mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {AUDIENCIAS.map((a, i) => {
              const Icono = ICONO_AUDIENCIA[a.id];
              return (
                <motion.div key={a.id} {...fadeUp(i * 0.05)} className="rounded-[28px] bg-[#F4F4F4] border border-[#071D49]/5 p-5 sm:p-7">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#071D49] flex items-center justify-center flex-shrink-0"><Icono size={24} className="text-white" /></div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl leading-tight">Para <span className="accent-serif">{a.title.toLowerCase()}</span></h3>
                      <p className="text-sm text-[#071D49]/65">{a.desc}</p>
                    </div>
                  </div>
                  <ul className="divide-y divide-[#071D49]/10">
                    {a.items.map((p) => (
                      <li key={p.path}>
                        <Link to={p.path} className="group flex items-center gap-3 py-3 min-h-[52px]">
                          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-[#071D49]/10" style={{ backgroundColor: p.color }} />
                          <span className="flex-1 min-w-0">
                            <span className="font-bold text-[#071D49]">{p.name}</span>
                            <span className="text-sm text-[#071D49]/60"> · {p.tag}</span>
                          </span>
                          <ChevronRight size={18} className="text-[#071D49]/40 group-hover:text-[#071D49] transition-colors flex-shrink-0" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 3. CÓMO SON LAS CLASES ══════════════════════════════════════ */}
      <section className={`${SECTION} bg-[#F4F4F4]`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionTitle eyebrow="Cómo trabajamos" title="No eres" accent="un puntaje." />
            <motion.div {...fadeUp(0.08)} className="space-y-4 mt-6 text-base sm:text-lg leading-relaxed text-[#071D49]/75">
              <p>Aquí nadie compite contra nadie. Los cursos son chicos, tu profe sabe cómo te llamas y se da cuenta cuando te estás quedando atrás.</p>
              <p>Hay quien viene saliendo de cuarto medio y quien lleva años sin abrir un cuaderno. A todos los recibimos igual.</p>
            </motion.div>
            <motion.div {...fadeUp(0.12)} className="mt-6">
              <Link to="/metodo" className="inline-flex items-center gap-2 min-h-[44px] font-display text-sm font-bold uppercase tracking-wider text-[#071D49]">
                Así se estudia en Lael <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
          <ul className="grid gap-3">
            {[
              { icon: ClaseEnVivo, t: 'Clases en vivo por Google Meet', d: 'Con un profe al que le puedes preguntar todo, desde las 18:00.' },
              { icon: Grupo, t: 'Máximo 20 por curso', d: 'Para que nadie pase desapercibido.' },
              { icon: Grabacion, t: 'Grabaciones cada semana', d: 'Si faltaste o quieres repasar, la clase te espera.' },
            ].map((item, idx) => (
              <motion.li key={item.t} {...fadeUp(idx * 0.05)} className="flex items-center gap-4 p-5 rounded-[24px] bg-white border border-[#071D49]/5 shadow-card">
                <div className="w-12 h-12 rounded-full bg-[#071D49] flex-shrink-0 flex items-center justify-center"><item.icon className="text-white" size={24} /></div>
                <div>
                  <p className="font-display font-extrabold text-[#071D49]">{item.t}</p>
                  <p className="text-sm text-[#071D49]/65">{item.d}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 4. PROFES ═══════════════════════════════════════════════════ */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Los profes" title="Estos son" accent="tus profes." className="text-center mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {TEACHERS.map((t, i) => (
              <motion.div key={t.id} {...fadeUp(i * 0.04)} className="rounded-[24px] p-5 flex items-center gap-4 bg-[#F4F4F4] border border-[#071D49]/5">
                <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-extrabold font-display overflow-hidden bg-[#071D49] text-[#D7E400]">
                  {t.photo ? <img src={t.photo} alt={`Foto de ${t.name}`} loading="lazy" className="w-full h-full object-cover" /> : t.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-[#071D49]">{t.name}</h3>
                    {t.id === 'diego' && <span className="text-[10px] font-black uppercase tracking-wider bg-[#D7E400] text-[#071D49] px-2 py-0.5 rounded-full">Fundador</span>}
                  </div>
                  <p className="text-sm text-[#071D49]/70">{t.subject}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. TESTIMONIOS ══════════════════════════════════════════════ */}
      <section className={`${SECTION} relative overflow-hidden`} style={{ backgroundColor: BLUE }}>
        <BrandArcs variant="side" />
        <div className="relative max-w-5xl mx-auto">
          <SectionTitle eyebrow="Lo que cuentan los alumnos" title="En sus" accent="palabras." dark className="text-center mb-10 sm:mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure key={t.id} {...fadeUp(i * 0.05)} className="rounded-[28px] p-6 sm:p-8 bg-white/[0.06] border border-white/10 text-white">
                <div className="flex gap-1 mb-5" role="img" aria-label={`${t.rating} de 5 estrellas`}>
                  {Array(t.rating).fill(0).map((_, k) => <Star key={k} size={16} fill={YELLOW} color={YELLOW} />)}
                </div>
                <blockquote className="font-serif text-2xl sm:text-[1.7rem] leading-snug mb-6">“{t.quote}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm font-display bg-[#D7E400] text-[#071D49]">{t.initials}</span>
                  <span>
                    <span className="block font-bold text-sm">{t.name}</span>
                    <span className="block text-xs uppercase tracking-wider text-white/60">{t.program}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-2 sm:gap-8 justify-center items-center">
            <Link to="/casos-reales" className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold uppercase tracking-wider text-white">Ver todas las historias <ArrowRight size={16} /></Link>
            <Link to="/testimonio" className="inline-flex items-center min-h-[44px] text-sm font-semibold text-white/75 hover:text-white underline underline-offset-4">¿Estudiaste con nosotros? Cuéntanos</Link>
          </div>
        </div>
      </section>

      {/* ══ 6. PRECIOS ══════════════════════════════════════════════════ */}
      <section className={`${SECTION} bg-[#F4F4F4]`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <SectionTitle eyebrow="Preu PAES 2027 · Matrícula gratis" title="Pagas solo" accent="lo que tomas." />
            <motion.ul {...fadeUp(0.08)} className="flex flex-wrap justify-center gap-2 mt-6" aria-label="Ramos disponibles">
              {['M1', 'Lectora', 'M2', 'Biología', 'Química', 'Física', 'Historia'].map((r, i) => (
                <li key={r} className={`px-3 py-1.5 rounded-full text-xs font-bold ${i < 2 ? 'bg-[#D7E400] text-[#071D49]' : 'bg-white border border-[#071D49]/10'}`}>{r}</li>
              ))}
            </motion.ul>
          </div>
          <PlanesPaes />
          <p className="text-center text-sm text-[#071D49]/70 mt-8 max-w-2xl mx-auto">
            ¿Otro programa? Inglés desde $16.990 al mes y la Escuela de Sueños es gratis. Si el costo es un problema, <Link to="/becas" className="underline font-semibold">postula a una beca</Link>.
          </p>
        </div>
      </section>

      {/* ══ 7. PREGUNTAS ════════════════════════════════════════════════ */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-3xl mx-auto">
          <SectionTitle eyebrow="Lo que más nos preguntan" title="Antes de" accent="inscribirte." className="text-center mb-8" />
          <div className="space-y-3">
            {PREGUNTAS_HOME.map((q) => (
              <details key={q.q} className="group rounded-2xl bg-[#F4F4F4] border border-[#071D49]/5 p-5 open:bg-white open:shadow-card">
                <summary className="font-display font-bold cursor-pointer list-none flex justify-between gap-4 text-[#071D49]">{q.q}<span aria-hidden="true" className="transition-transform group-open:rotate-45 text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#071D49]/75 leading-relaxed">{q.a}</p>
              </details>
            ))}
          </div>
          <p className="text-center mt-6"><Link to="/preguntas" className="inline-flex items-center gap-2 min-h-[44px] font-bold underline underline-offset-4 text-[#071D49]">Ver todas las preguntas</Link></p>
        </div>
      </section>

      {/* ══ 8. INSCRÍBETE ═══════════════════════════════════════════════ */}
      <section className={`${SECTION} relative overflow-hidden`} style={{ backgroundColor: BLUE }}>
        <BrandArcs />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p {...fadeUp()} className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-4">¿Te animas?</motion.p>
          <motion.h2 {...fadeUp(0.05)} className="font-display font-extrabold tracking-tight leading-[1.02] text-white mb-8 sm:mb-10 text-4xl sm:text-5xl lg:text-6xl">
            Inscríbete. <br /><span className="accent-serif text-[#D7E400]">La matrícula es gratis.</span>
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/inscripcion" className={`${BTN} sm:px-12 sm:py-5 bg-[#D7E400] text-[#071D49] hover:bg-white`} style={{ boxShadow: `0 20px 60px ${YELLOW}40` }}>
              Inscribirme ahora <ArrowRight size={18} />
            </a>
            <Link to="/inscripcion?programa=clase-prueba" className={`${BTN} text-white border-2 border-white/30 hover:bg-white/10`}>Pedir clase de prueba</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
