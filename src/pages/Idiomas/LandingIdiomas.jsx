import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Zap, Instagram, Check } from 'lucide-react';
import languagesBg from '../../assets/img/Home/idiomas_execution_bg_1777948997295.webp';
import igPost1 from '../../assets/img/Home/media_ig_post_1780732980390.webp';
import igPost2 from '../../assets/img/Home/media_ig_post_1780733562637.webp';
import CertificateSection from '../../components/CertificateSection';
import { LANDING_SELECTOR, LANDING_REASONS, LANDING_PLANS } from '../../data/idiomas';

const BLUE = '#071D49';
const FORM_URL = 'https://forms.gle/H86nFAQ2DJ8CCQ7y6';

const ease = [0.16, 1, 0.3, 1];
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease },
});

// Estilos compartidos por las páginas de programas (Idiomas / Español)
export const SECTION = 'px-5 sm:px-6 py-16 sm:py-20 lg:py-28';
export const EYEBROW_LIGHT = 'text-xs font-bold uppercase tracking-[0.2em] text-[#071D49]';
export const EYEBROW_DARK = 'text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400]';
export const H2 = 'font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] uppercase leading-[1.05]';
export const BTN_PRIMARY = 'inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all active:scale-95';
export const BTN_NAVY = 'inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all active:scale-95';

/* Hero azul común: eyebrow + H1 + párrafo + acciones */
export function ProgramHero({ eyebrow, heading, desc, bg, children }) {
  return (
    <section className="relative -mt-20 pt-36 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-6 text-white overflow-hidden" style={{ backgroundColor: BLUE }}>
      <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
        <img src={bg} alt="" className="w-full h-full object-cover grayscale" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#071D49]/60 to-[#071D49]" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p {...fadeUp(0)} className={`${EYEBROW_DARK} mb-6`}>{eyebrow}</motion.p>
        <motion.h1 {...fadeUp(0.1)} className="font-display text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-6 sm:mb-8">
          {heading}
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {desc}
        </motion.p>
        <motion.div {...fadeUp(0.3)}>{children}</motion.div>
      </div>
    </section>
  );
}

/* Barra de niveles A1 → B2 */
export function LevelPath({ title, levels, className = '' }) {
  return (
    <div className={`rounded-[24px] p-5 sm:p-6 border border-[#071D49]/5 ${className}`}>
      <p className={`${EYEBROW_LIGHT} mb-4`}>{title}</p>
      <div className="flex items-start justify-between">
        {levels.map(([code, label], i) => (
          <React.Fragment key={code}>
            <div className="flex flex-col items-center min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#071D49] text-white flex items-center justify-center text-xs font-extrabold">
                {code}
              </div>
              <span className="text-xs font-semibold text-[#071D49]/70 mt-1.5 whitespace-nowrap">{label}</span>
            </div>
            {i < levels.length - 1 && <div className="flex-grow h-0.5 bg-[#071D49]/15 mx-2 mt-5" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* Bloque de programa: texto + precio + mockup de Instagram */
export function ProgramBlock({ id, gray, badge, title, teacher, desc, levelsTitle, levels, ig }) {
  return (
    <section id={id} className={`${SECTION} scroll-mt-20 ${gray ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col text-left">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-5 bg-[#071D49] text-[#D7E400] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase w-fit">
            <Zap size={12} aria-hidden="true" />
            <span>{badge}</span>
          </motion.div>

          <motion.h2 {...fadeUp(0.1)} className={`${H2} text-[#071D49] mb-5`}>{title}</motion.h2>

          {teacher && (
            <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-5 bg-[#071D49]/5 border border-[#071D49]/10 rounded-2xl p-3 w-fit">
              <div className="w-10 h-10 rounded-full bg-[#071D49] text-[#D7E400] font-display font-black text-xs flex items-center justify-center flex-shrink-0">
                {teacher.initials}
              </div>
              <div className="text-left">
                <p className="text-[#071D49] text-sm font-bold">{teacher.name}</p>
                <p className="text-[#071D49]/70 text-xs font-semibold">{teacher.role}</p>
              </div>
            </motion.div>
          )}

          <motion.p {...fadeUp(0.2)} className="text-[#071D49]/70 text-base sm:text-lg mb-6 leading-relaxed max-w-xl">{desc}</motion.p>

          <motion.div {...fadeUp(0.25)} className="max-w-xl mb-6">
            <LevelPath title={levelsTitle} levels={levels} className={gray ? 'bg-white' : 'bg-[#F4F4F4]'} />
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8">
            <div>
              <span className="text-[#071D49] font-display font-extrabold text-4xl sm:text-5xl tracking-tight">$14.990</span>
              <span className="text-[#071D49]/70 text-sm font-bold uppercase tracking-wider ml-1">/mes</span>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-[11px] font-bold text-[#071D49] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D7E400]">
                Matrícula gratis
              </span>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#071D49]">
                ✨ Trimestral: $11.990/mes
              </span>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.35)}>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className={`${BTN_NAVY} w-full sm:w-auto px-10`}>
              <span>INSCRIBIRME AHORA</span>
              <ChevronRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.15)} className="lg:col-span-5 flex justify-center">
          <InstagramCard {...ig} />
        </motion.div>
      </div>
    </section>
  );
}

function InstagramCard({ img, tag, caption, ago }) {
  return (
    <div className="w-full max-w-[340px] lg:max-w-[380px] bg-white rounded-[28px] border border-[#071D49]/5 shadow-card overflow-hidden flex flex-col">
      <div className="p-4 border-b border-[#071D49]/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D7E400] to-[#071D49] flex items-center justify-center text-[10px] font-black text-white" aria-hidden="true">
            LAEL
          </div>
          <div>
            <p className="text-[#071D49] text-sm font-bold tracking-tight">institutolael</p>
            <p className="text-[#071D49]/70 text-xs">Santiago, Chile</p>
          </div>
        </div>
        <Instagram size={18} className="text-[#071D49]/50" aria-hidden="true" />
      </div>
      <div className="w-full aspect-square overflow-hidden bg-[#071D49]/5">
        <img src={img} alt="Instituto Lael Instagram Post" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-[#071D49] font-black uppercase tracking-wider bg-[#D7E400] px-2 py-0.5 rounded">{tag}</span>
          <p className="text-xs font-bold text-[#071D49]">Destacado de la semana</p>
        </div>
        <p className="text-sm text-[#071D49]/70 leading-relaxed">
          <span className="font-bold text-[#071D49] mr-2">institutolael</span>
          {caption}
        </p>
        <div className="mt-4 pt-3 border-t border-[#071D49]/5 flex justify-between items-center text-xs text-[#071D49]/60">
          <span>{ago}</span>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="text-[#071D49] font-bold hover:underline py-2">
            Ver detalles en chat →
          </a>
        </div>
      </div>
    </div>
  );
}

/* Tarjetas "¿Por qué aprender con Lael?" */
export function ReasonsSection({ reasons, gray }) {
  return (
    <section className={`${SECTION} ${gray ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10 sm:mb-16">
          <motion.p {...fadeUp(0)} className={`${EYEBROW_LIGHT} mb-4`}>Cómo trabajamos</motion.p>
          <motion.h2 {...fadeUp(0.1)} className={`${H2} text-[#071D49]`}>¿POR QUÉ APRENDER CON LAEL?</motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              {...fadeUp(i * 0.08)}
              className={`p-6 sm:p-8 rounded-[28px] border border-[#071D49]/5 ${gray ? 'bg-white shadow-card' : 'bg-[#F4F4F4]'}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#071D49] flex items-center justify-center mb-5">
                <reason.icon className="w-6 h-6 text-[#D7E400]" aria-hidden="true" />
              </div>
              <h3 className="text-[#071D49] font-display font-extrabold text-base uppercase tracking-tight mb-2">{reason.title}</h3>
              <p className="text-[#071D49]/70 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Tarjeta de precio sobre fondo azul */
export function PriceCard({ plan, delay = 0, note }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-[28px] p-6 sm:p-8 border border-white/10 bg-white/5 flex flex-col justify-between text-left"
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          <span className="text-3xl text-white" role="img" aria-label={plan.name}>{plan.flag}</span>
          <span className="bg-[#D7E400] text-[#071D49] text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
            Matrícula {plan.enrollment}
          </span>
        </div>
        <h3 className="text-white font-display font-extrabold text-xl uppercase tracking-tight mb-3">{plan.name}</h3>
        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[#D7E400] font-display font-black text-4xl">{plan.priceMonthly}</span>
            <span className="text-white/75 text-sm font-bold">/mes</span>
          </div>
          <p className="text-white/75 text-xs font-semibold leading-relaxed">{note}</p>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm text-white/75">
              <Check size={16} className="text-[#D7E400] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href={plan.link} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} w-full`}>
        Inscribirme
      </a>
    </motion.div>
  );
}

export default function LandingIdiomas() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Instituto Lael | Programas de Idiomas - Chile</title>
        <meta name="description" content="Cursos online de Inglés y Español para Expats con clases en vivo. Hablas y practicas desde la primera clase." />
      </Helmet>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <ProgramHero
        bg={languagesBg}
        eyebrow="INGLÉS EN LAEL · HABLAR SIN MIEDO"
        heading={<>Habla inglés <br /> sin <span className="text-[#D7E400]">miedo.</span></>}
        desc="Casi todos entendemos más de lo que nos atrevemos a decir. Con Monse hablas desde la primera clase, te equivocas tranquilo y vas ganando confianza."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl mx-auto">
          {LANDING_SELECTOR.map((lang) => (
            <button
              key={lang.id}
              onClick={() => scrollToSection(lang.id)}
              className="group min-h-[48px] p-4 sm:p-5 rounded-[24px] bg-white/5 border border-white/15 hover:border-[#D7E400] hover:bg-white/10 transition-all duration-300 text-left flex items-center gap-4 cursor-pointer active:scale-[0.98]"
            >
              <span className="text-3xl flex-shrink-0" role="img" aria-label={lang.label}>{lang.flag}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-white font-display font-extrabold text-base uppercase tracking-tight group-hover:text-[#D7E400] transition-colors">{lang.label}</span>
                <span className="block text-white/60 text-xs font-bold uppercase tracking-wider mt-0.5">{lang.tag}</span>
              </span>
              <ChevronRight size={18} className="text-white/60 group-hover:text-[#D7E400] group-hover:translate-x-1 transition-all flex-shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      </ProgramHero>

      {/* ── 2. INGLÉS ───────────────────────────────────────────────── */}
      <ProgramBlock
        id="ingles"
        badge="PROGRAMA PRINCIPAL"
        title="Inglés en Vivo"
        teacher={{ initials: 'MG', name: 'Docente principal: Monserrat González', role: 'Profesora de inglés' }}
        desc="Para que te puedas defender en una entrevista, en una reunión de pega o viajando. En cada clase practicas conversaciones parecidas a las que vas a tener afuera."
        levelsTitle="Tus niveles de inglés"
        levels={[['A1', 'Nivel 1'], ['A2', 'Nivel 2'], ['B1', 'Nivel 3'], ['B2', 'Fluidez']]}
        ig={{ img: igPost1, tag: 'Recomendado', caption: 'Si entiendes inglés pero te bloqueas al hablar, esto es para ti. Clases online y en vivo.', ago: 'hace 2 días' }}
      />

      {/* ── 3. ESPAÑOL PARA EXTRANJEROS ─────────────────────────────── */}
      <ProgramBlock
        id="espanol"
        gray
        badge="ESPAÑOL EN CHILE"
        title="Español para Extranjeros"
        desc="Es para ti si vives en Chile o trabajas con un equipo chileno. En clase practicamos reuniones de pega, conversaciones del día a día, modismos y cómo se trabaja acá."
        levelsTitle="Tus niveles de español"
        levels={[['A1', 'Nivel 1'], ['A2', 'Nivel 2'], ['B1', 'Intermedio']]}
        ig={{ img: igPost2, tag: 'Español', caption: '¿Te perdiste con un "cachai" o un "al tiro"? Te lo explicamos. Clases en vivo, con harta conversación.', ago: 'hace 1 día' }}
      />

      {/* ── 4. ¿POR QUÉ APRENDER CON LAEL? ──────────────────────────── */}
      <ReasonsSection reasons={LANDING_REASONS} />

      {/* ── 5. CERTIFICADOS POR NIVEL ───────────────────────────────── */}
      <CertificateSection defaultLevel="B2" defaultLanguage="Inglés en Vivo" gray />

      {/* ── 6. PRECIOS ──────────────────────────────────────────────── */}
      <section className={`${SECTION} text-center`} style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <motion.p {...fadeUp(0)} className={`${EYEBROW_DARK} mb-4`}>Mismo precio para ambos</motion.p>
          <motion.h2 {...fadeUp(0.1)} className={`${H2} text-white mb-10 sm:mb-14`}>PRECIOS</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mx-auto mb-10">
            {LANDING_PLANS.map((plan, idx) => (
              <PriceCard
                key={plan.name}
                plan={plan}
                delay={idx * 0.1}
                note={`✨ Trimestral: ${plan.priceQuarterly}/mes (ahorra pagando 3 meses)`}
              />
            ))}
          </div>

          <motion.p {...fadeUp(0.2)} className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
            Todos los cursos son online y en vivo, con un docente. Pregúntanos por el precio de clases 1 a 1.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
