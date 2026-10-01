import React from 'react';
import { motion } from 'framer-motion';
import NoticiasDestacadas from '../../components/NoticiasDestacadas';
import PlanesPaes, { DescuentosPaes } from '../../components/PlanesPaes';
import IntensivoPaes from '../../components/IntensivoPaes';
import { PaesEsteAnio } from '../../components/PaesCountdown';
import PageHero from '../../components/ui/PageHero';
import { Faq } from '../Programas/shared';
import Duotone from '../../components/ui/Duotone';
import Magnetic from '../../components/experience/Magnetic';
import {
  Video,
  ChevronRight,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { Mensaje } from '../../components/icons/LaelIcons';
import inoLogo from '../../assets/img/Partners/INO.png';
import studentImg from '../../assets/img/Home/hero_student_lael_1780734180709.webp';
import { LANDING_FEATURES, LANDING_SUBJECTS, LANDING_TEACHERS, LANDING_STEPS, LANDING_FAQS, PAES_PLAN_INCLUDES, PAES_FORM_URL, BECAS_FORM_URL, intensivoAbierto } from '../../data/paes';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease },
});

// Clases compartidas (tokens del spec)
const SECTION = 'py-16 sm:py-20 lg:py-28 px-5 sm:px-6';
const H2 = 'font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]';
const EYEBROW = 'text-xs font-bold uppercase tracking-[0.2em] mb-3';
const BTN = 'min-h-[48px] inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all duration-300 active:scale-95';

function EyebrowLight({ children }) {
  return (
    <motion.p {...fadeUp(0)} className={`${EYEBROW} text-[#071D49] inline-flex items-center gap-2`}>
      <span className="w-2 h-2 rounded-full bg-[#D7E400] ring-2 ring-[#071D49]/10" aria-hidden="true" />
      {children}
    </motion.p>
  );
}

const initials = (name) => name.split(/ & | /).map(n => n[0]).join('').slice(0, 2);

function SubjectCard({ subj, i, obligatoria }) {
  return (
    <motion.div
      {...fadeUp(i * 0.05)}
      className="rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 hover:border-[#D7E400]/40 transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-11 h-11 rounded-xl font-display font-extrabold text-sm flex items-center justify-center flex-shrink-0 ${obligatoria ? 'bg-[#D7E400] text-[#071D49]' : 'bg-white/15 text-white'}`}>
          {subj.code}
        </div>
        <h3 className="text-white font-display text-base font-bold uppercase tracking-tight leading-tight">{subj.name}</h3>
      </div>
      <p className="text-white/75 text-sm leading-relaxed">{subj.desc}</p>
      {subj.teacher && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#D7E400] text-[#071D49] font-display font-black text-[10px] flex items-center justify-center flex-shrink-0" aria-hidden="true">
            {initials(subj.teacher)}
          </div>
          <p className="text-white text-xs font-semibold">
            <span className="text-white/60 font-normal">Profe · </span>{subj.teacher}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function LandingPAES() {

  const WA_LINK = PAES_FORM_URL;
  const WHATSAPP_LINK = "https://wa.me/56964626568?text=Hola,%20tengo%20dudas%20sobre%20el%20preu%20PAES";

  const features = LANDING_FEATURES;
  const subjects = LANDING_SUBJECTS;
  const teachers = LANDING_TEACHERS;
  const steps = LANDING_STEPS;
  const faqs = LANDING_FAQS;

  return (
    <div className="w-full bg-[#F4F4F4] overflow-x-clip font-sans text-[#071D49]">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Preu PAES 2027 · Desde $12.000/mes"
        title="Creamos el preu que nos habría gustado tener."
        accent="Nadie se queda afuera."
        desc="Cursos de máximo 20, clases en vivo que después puedes volver a ver y un profe al que le puedes preguntar todo. Pagas solo los ramos que tomas. Y si no te alcanza, postulas a una beca."
        stats={[['Marzo', 'Inicio de clases'], ['En vivo', 'Por Google Meet'], ['20 máx.', 'Por curso']]}
        actions={<>
          <Magnetic>
            <a href={WA_LINK} data-cursor="Vamos" className={`${BTN} w-full sm:w-auto bg-[#D7E400] text-[#071D49] hover:bg-white`}>
              Inscribirme gratis <ArrowRight size={16} />
            </a>
          </Magnetic>
          <a href="https://www.youtube.com/@Laelinstituto/videos" target="_blank" rel="noopener noreferrer" className={`${BTN} border border-white/30 text-white hover:bg-white hover:text-[#071D49]`}>
            <Video size={16} /> Clases en YouTube
          </a>
        </>}
        aside={
          <div className="relative hidden lg:block">
            <Duotone src={studentImg} alt="Estudiante preparando la PAES con Instituto Lael" color="#D7E400" loading="eager" className="group aspect-[4/5] rounded-[40px]" />
            <p className="absolute -left-6 bottom-10 bg-[#D7E400] text-[#071D49] rounded-full px-5 py-3 font-display font-extrabold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#071D49] motion-safe:animate-pulse" aria-hidden="true" /> Inscripciones abiertas · 2027
            </p>
          </div>
        }
      />

      {intensivoAbierto() ? <IntensivoPaes /> : <PaesEsteAnio />}

      {/* ── 2. ¿QUÉ INCLUYE EL PROGRAMA? ─────────────────────────────── */}
      <section id="estructura" className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-14">
            <EyebrowLight>Lo que recibes</EyebrowLight>
            <motion.h2 {...fadeUp(0.05)} className={H2}>
              ¿Qué incluye <span className="accent-serif">el preu?</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeUp(i * 0.05)}
                className="p-5 sm:p-6 rounded-[24px] bg-[#F4F4F4] border border-[#071D49]/5 flex sm:flex-col gap-4 sm:gap-0"
              >
                <div className="w-12 h-12 bg-[#071D49] rounded-2xl flex items-center justify-center sm:mb-5 flex-shrink-0">
                  <feature.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[#071D49] text-base sm:text-lg font-bold mb-1.5 sm:mb-2 font-display uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-[#071D49]/70 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PLANES Y PRECIOS ──────────────────────────────────────── */}
      <section id="planes" className={`${SECTION} bg-[#F4F4F4]`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-14">
            <EyebrowLight>Matrícula gratis</EyebrowLight>
            <motion.h2 {...fadeUp(0.05)} className={H2}>
              Planes <span className="accent-serif">y precios.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-[#071D49]/70 text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              Pagas solo por los ramos que tomas. Desde el cuarto ramo, el precio deja de subir.
            </motion.p>
          </div>

          <PlanesPaes />

          <motion.p {...fadeUp(0.1)} className="text-center text-[#071D49]/70 text-sm sm:text-base mt-8 sm:mt-10 max-w-2xl mx-auto leading-relaxed">
            {PAES_PLAN_INCLUDES}{' '}
            ¿No te alcanza?{' '}
            <a href={BECAS_FORM_URL} className="text-[#071D49] font-bold underline underline-offset-4 hover:text-[#0B2A66]">
              Postula a una beca parcial
            </a>
            , la revisamos caso a caso. Parte de lo que pagan los alumnos financia esas becas.
          </motion.p>

          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-6">Formas de <span className="accent-serif">pagar menos</span></h3>
            <DescuentosPaes />
          </div>

          <div className="mt-4 max-w-4xl mx-auto">
            <motion.div {...fadeUp(0.15)} className="rounded-[24px] border border-[#071D49]/5 bg-white p-5 flex items-start gap-4">
              <img src={inoLogo} alt="Instituto Nacional de Ortodoncia (INO)" loading="lazy" className="h-10 w-auto flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#071D49] font-display font-extrabold uppercase tracking-tight">Beneficio para alumnos</p>
                <p className="text-[#071D49]/70 text-sm leading-relaxed mt-1">Por ser alumno de Lael tienes descuento en el Instituto Nacional de Ortodoncia (INO).</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. ASIGNATURAS ───────────────────────────────────────────── */}
      <section className={`${SECTION} relative bg-[#071D49]`}>
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <motion.p {...fadeUp(0)} className={`${EYEBROW} text-[#D7E400]`}>Elige tus ramos</motion.p>
            <motion.h2 {...fadeUp(0.05)} className={`${H2} text-white`}>
              Tus <span className="accent-serif text-programa">ramos.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
                <h3 className="text-white font-black text-base sm:text-lg tracking-wide font-display uppercase">PRUEBAS OBLIGATORIAS</h3>
                <span className="text-[11px] bg-[#D7E400] text-[#071D49] font-bold px-3 py-1 rounded-full uppercase flex-shrink-0">Común</span>
              </div>
              <div className="space-y-3">
                {subjects.filter(s => s.type === "Obligatoria").map((subj, i) => (
                  <SubjectCard key={subj.code} subj={subj} i={i} obligatoria />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
                <h3 className="text-white font-black text-base sm:text-lg tracking-wide font-display uppercase">PRUEBAS ELECTIVAS</h3>
                <span className="text-[11px] bg-white/15 text-white font-bold px-3 py-1 rounded-full uppercase flex-shrink-0">Eliges tú</span>
              </div>
              <div className="space-y-3">
                {subjects.filter(s => s.type !== "Obligatoria").map((subj, i) => (
                  <SubjectCard key={subj.code} subj={subj} i={i} />
                ))}

                <motion.div
                  {...fadeUp(0.1)}
                  className="rounded-2xl p-5 border border-dashed border-white/20 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D7E400] flex-shrink-0">
                    <Mensaje size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-display font-bold text-sm uppercase">Dudas y orientación</h4>
                    <p className="text-white/75 text-sm mt-1 leading-relaxed">Si te queda una duda fuera de clase o no sabes qué carrera elegir, nos escribes por WhatsApp.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TUS PROFES ────────────────────────────────────────────── */}
      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-14">
            <EyebrowLight>Quiénes te hacen clases</EyebrowLight>
            <motion.h2 {...fadeUp(0.05)} className={H2}>
              Tus <span className="accent-serif">profes.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {teachers.map((t, i) => {
              const isDiego = t.name === "Diego Chaparro";
              return (
                <motion.div
                  key={t.name}
                  {...fadeUp(i * 0.06)}
                  className="rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 bg-[#F4F4F4] flex md:flex-col items-start md:items-center gap-4 md:gap-0 text-left md:text-center"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden md:mb-5 flex-shrink-0 bg-[#071D49] flex items-center justify-center" data-keep-light>
                    {t.img ? (
                      <img src={t.img} alt={`Foto de ${t.name}`} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <span aria-hidden="true" className="font-serif italic text-[#D7E400] text-3xl md:text-5xl leading-none">{t.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:items-center min-w-0">
                    <div className="flex items-center gap-2 flex-wrap md:justify-center mb-1.5">
                      <h3 className="text-[#071D49] font-display font-extrabold text-lg uppercase tracking-tight">{t.name}</h3>
                      {isDiego && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#071D49] text-white px-2 py-0.5 rounded">
                          FUNDADOR
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3 px-3 py-1 rounded-full w-fit bg-[#071D49] text-[#D7E400]">
                      {t.subject}
                    </p>
                    <p className="text-[#071D49]/70 text-sm leading-relaxed">{t.bio}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. ¿CÓMO FUNCIONA? ───────────────────────────────────────── */}
      <section className={`${SECTION} bg-[#F4F4F4]`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-14">
            <EyebrowLight>Así de simple</EyebrowLight>
            <motion.h2 {...fadeUp(0.05)} className={H2}>
              ¿Cómo <span className="accent-serif">funciona?</span>
            </motion.h2>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#071D49]/5 via-[#071D49]/20 to-[#071D49]/5 -translate-y-1/2 hidden lg:block" aria-hidden="true" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(i * 0.08)}
                className="relative bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 text-left lg:text-center overflow-hidden"
              >
                <div className="hidden lg:block absolute right-4 bottom-0 text-[#071D49]/5 font-display font-black text-[8rem] leading-none pointer-events-none select-none" aria-hidden="true">
                  {step.num}
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#071D49] text-[#D7E400] font-display font-extrabold text-base lg:text-xl flex items-center justify-center lg:mb-6 flex-shrink-0 relative z-10">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <h3 className="text-[#071D49] font-display text-lg lg:text-xl font-bold uppercase tracking-tight mb-1.5 lg:mb-3">{step.title}</h3>
                  <p className="text-[#071D49]/70 text-sm leading-relaxed lg:max-w-xs">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. YOUTUBE ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-[#071D49] text-white">
        <div className="max-w-3xl mx-auto w-full text-center flex flex-col items-center">
          <motion.div {...fadeUp(0)} className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-5">
            <Video className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h3 {...fadeUp(0.05)} className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Mira cómo explicamos, <span className="accent-serif">gratis en YouTube.</span>
          </motion.h3>
          <motion.p {...fadeUp(0.1)} className="text-white/75 text-base leading-relaxed max-w-2xl mb-7">
            Antes de inscribirte, mira cómo explicamos matemática y ciencias. En el canal subimos ensayos resueltos, explicaciones cortas de materia y consejos para el día de la prueba. Es gratis.
          </motion.p>
          <motion.a
            {...fadeUp(0.15)}
            href="https://www.youtube.com/@Laelinstituto/videos"
            target="_blank"
            rel="noopener noreferrer"
            className={`${BTN} w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white`}
          >
            <span>VISITAR CANAL DE YOUTUBE</span>
            <ChevronRight size={16} />
          </motion.a>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────── */}
      <div className="bg-white">
        <Faq items={faqs} title={<>Preguntas <span className="accent-serif">frecuentes.</span></>} />
      </div>

      {/* ── 8.5 GUÍAS PAES ───────────────────────────────────────────── */}
      <NoticiasDestacadas category="PAES" title="Guías para tu PAES" />

      {/* ── 9. CTA FINAL ─────────────────────────────────────────────── */}
      <section className={`${SECTION} relative text-center overflow-hidden bg-[#071D49]`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(215,228,0,0.06),transparent)] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <motion.p {...fadeUp(0)} className={`${EYEBROW} text-[#D7E400] mb-5`}>
            PARTIMOS EN MARZO 2027
          </motion.p>

          <motion.h2
            {...fadeUp(0.05)}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-5"
          >
            Reserva <br /> <span className="accent-serif text-programa">tu cupo.</span>
          </motion.h2>

          <motion.p {...fadeUp(0.1)} className="text-white/75 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            Cada curso es de máximo 20 alumnos. La matrícula es gratis y el formulario es corto.
          </motion.p>

          <motion.div {...fadeUp(0.15)} className="w-full max-w-md">
            <a
              href={WA_LINK}
              className={`${BTN} w-full py-5 bg-[#D7E400] text-[#071D49] hover:bg-white`}
              style={{ boxShadow: '0 20px 50px rgba(215, 228, 0, 0.2)' }}
            >
              <span>INSCRIBIRME GRATIS</span>
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="mt-6">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] text-white/75 hover:text-white transition-colors text-sm font-semibold hover:underline"
            >
              <MessageCircle size={18} className="text-[#D7E400]" />
              <span>¿Tienes dudas? Escríbenos por WhatsApp</span>
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.25)} className="mt-10 text-white/60 text-xs uppercase tracking-wider font-bold">
            INSTITUTO LAEL · SIN COSTO DE MATRÍCULA · CLASES 100% ONLINE
          </motion.p>
        </div>
      </section>

    </div>
  );
}
