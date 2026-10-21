import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageSquare, Star, Pause, Play } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import lschRealidad from '../../assets/img/Home/mundo_lsch_bg_1777943626827.webp';
import CertificateSection from '../../components/CertificateSection';
import AvisameForm from '../../components/AvisameForm';
import PageHero from '../../components/ui/PageHero';
import Duotone from '../../components/ui/Duotone';
import { LANDING_SLIDES, LANDING_LEVELS, SHOW_PRICE, PRECIO_MES, DOCENTE_LSCH, FAQ_LSCH, clp } from '../../data/lsch';
import { Faq, CtaBand } from '../Programas/shared';
import {
  fadeUp,
  SECTION,
  EYEBROW_LIGHT,
  EYEBROW_DARK,
  H2,
  BTN_PRIMARY,
  LevelPath,
} from '../Idiomas/LandingIdiomas';

const LSCH_TESTIMONIALS = TESTIMONIALS.filter((t) => t.area === 'lsch');
const BLUE = '#071D49';
const ease = [0.16, 1, 0.3, 1];

export default function LandingLSCh() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const auto = !pausado && !hover && !reduce;

  // Ya hay docente (de la comunidad Sorda), pero aún no se anuncia. El curso
  // parte cuando se complete el grupo: los botones llevan a guardar cupo (#cupo).
  const WA_GENERAL = "https://wa.me/56964626568?text=Hola!%20Tengo%20consultas%20sobre%20el%20curso%20de%20Lengua%20de%20Señas%20Chilena%20(LSCh).";
  const WA_CUPO = "https://wa.me/56964626568?text=Hola%2C%20quiero%20guardar%20mi%20cupo%20en%20el%20curso%20de%20Lengua%20de%20Se%C3%B1as%20Chilena";
  const docenteListo = Boolean(DOCENTE_LSCH.foto && DOCENTE_LSCH.nombre && DOCENTE_LSCH.frase);
  const videoId = (DOCENTE_LSCH.video.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  const faq = FAQ_LSCH.filter((f) => SHOW_PRICE || !f.precio);

  const slides = LANDING_SLIDES;

  // Cambia sola cada 5 segundos, salvo que esté en pausa, con el mouse o el
  // foco encima, o si la persona pidió menos movimiento.
  useEffect(() => {
    if (!auto) return undefined;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, auto]);

  const levels = LANDING_LEVELS;

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Lengua de Señas Chilena · Próximamente"
        title="Algo se está"
        accent="moviendo."
        desc="Curso de Lengua de Señas Chilena desde cero, con docente de la comunidad Sorda. Guarda tu cupo sin pagar: te avisamos apenas se complete el grupo."
        actions={<>
          <a href="#cupo" className="inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[52px] px-8 rounded-full transition-colors bg-[#D7E400] text-[#071D49] hover:bg-white">Guarda tu cupo sin pagar <ChevronRight size={16} aria-hidden="true" /></a>
          <a href={WA_CUPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider min-h-[52px] px-8 rounded-full transition-colors border border-white/30 text-white hover:bg-white hover:text-[#071D49]">Escríbenos por WhatsApp</a>
        </>}
        stats={[['A1', 'Nivel inicial'], ['3 meses', 'Duración'], ['En vivo', 'Online']]}
        aside={<Duotone src={lschRealidad} color="#6EDDB0" loading="eager" className="group hidden lg:block aspect-[4/5] rounded-[40px]" />}
      >
        <ul className="mt-6 flex flex-wrap gap-2 text-white/80 text-xs font-bold uppercase tracking-wider">
          {['Docente de la comunidad Sorda', 'Certificado por nivel', 'Matrícula gratis'].map((t) => <li key={t} className="border border-white/20 px-4 py-2 rounded-full">{t}</li>)}
        </ul>
      </PageHero>

      {/* ── GUARDA TU CUPO (sin pagar) ──────────────────────────────── */}
      <section className="px-5 sm:px-6 py-14 sm:py-16 bg-white">
        {/* Ancla antigua (#avisame), por si alguien guardó ese link */}
        <span id="avisame" className="block scroll-mt-28" aria-hidden="true" />
        <AvisameForm
          id="cupo"
          programa="Lengua de Señas Chilena (cupo guardado)"
          titulo="Guarda tu cupo"
          texto="No pagas nada todavía. Te avisamos por WhatsApp apenas se complete el grupo."
          boton="Guardar mi cupo"
          horario
          exito={{
            titulo: '¡Listo! Tu cupo quedó guardado',
            texto: 'Te avisamos por WhatsApp apenas se complete el grupo. No tienes que pagar nada todavía.',
            accion: <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-2xl bg-[#071D49] text-white font-display font-extrabold text-xs uppercase tracking-wider"><MessageSquare size={16} aria-hidden="true" /> Escríbenos por WhatsApp</a>,
          }}
          extra={{ label: '¿Para qué quieres aprender LSCh?', options: ['Tengo un familiar o amigo Sordo', 'Para mi trabajo (salud, educación, atención)', 'Para mi iglesia o comunidad', 'Por interés personal', 'Para mi empresa', 'Otro'] }}
        />
      </section>

      {/* ── DOCENTE Y VIDEO (solo se muestran cuando estén en data/lsch.js) ── */}
      {(docenteListo || videoId) && (
        <section className={SECTION} style={{ backgroundColor: '#0B0B0F' }}>
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center text-white">
            {docenteListo && (
              <div>
                <p className={`${EYEBROW_DARK} mb-6`}>Tu docente</p>
                <img src={DOCENTE_LSCH.foto} alt={`Retrato de ${DOCENTE_LSCH.nombre}`} loading="lazy" className="w-40 h-40 rounded-full object-cover grayscale mb-8" />
                <p className="font-serif italic text-3xl sm:text-4xl leading-tight mb-6">“{DOCENTE_LSCH.frase}”</p>
                <p className="font-display font-extrabold uppercase tracking-wider text-sm">{DOCENTE_LSCH.nombre}</p>
                <p className="text-white/70 text-sm">Docente de LSCh · Comunidad Sorda</p>
              </div>
            )}
            {videoId && (
              <div className={docenteListo ? '' : 'lg:col-span-2 max-w-3xl mx-auto w-full'}>
                <div className="aspect-video rounded-[28px] overflow-hidden border border-white/10">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?cc_load_policy=1&rel=0`}
                    title="Video de bienvenida en Lengua de Señas Chilena, con subtítulos"
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-white/70 text-sm mt-3">Bienvenida en LSCh, con subtítulos.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 2. NIVELES A1 / A2 / B1 ─────────────────────────────────── */}
      <section id="programa" className={`${SECTION} scroll-mt-20`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10 sm:mb-16">
            <div className="text-center lg:text-left">
              <motion.p {...fadeUp(0)} className={`${EYEBROW_LIGHT} mb-4`}>Tres niveles</motion.p>
              <motion.h2 {...fadeUp(0.1)} className={`${H2} mb-8`}>Niveles de LSCh</motion.h2>
              <motion.div {...fadeUp(0.2)} className="max-w-xl mx-auto lg:mx-0 text-left">
                <LevelPath
                  title="Tu avance en LSCh"
                  levels={[['A1', 'Inicial'], ['A2', 'Intermedio'], ['B1', 'Conversacional']]}
                  className="bg-white shadow-card"
                />
              </motion.div>
            </div>

            {/* Carrusel de piezas de Instagram */}
            <motion.div {...fadeUp(0.15)} className="flex justify-center">
              <div
                className="relative w-full max-w-[420px] aspect-square rounded-[28px] overflow-hidden border border-[#071D49]/5 shadow-card bg-[#092254]"
                role="region"
                aria-roledescription="carrusel"
                aria-label="Piezas de Lengua de Señas"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onFocusCapture={() => setHover(true)}
                onBlurCapture={() => setHover(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="w-full h-full"
                  >
                    <img
                      src={slides[activeSlide].img}
                      alt={slides[activeSlide].title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 sm:p-6 pt-16 flex flex-col justify-end text-left">
                  <span className="text-[#D7E400] text-xs font-bold tracking-[0.2em] uppercase mb-1.5">
                    {slides[activeSlide].badge}
                  </span>
                  <p className="text-white font-display font-extrabold text-base sm:text-lg uppercase leading-tight">
                    {slides[activeSlide].title}
                  </p>
                  <p className="text-white/75 text-sm mt-1">{slides[activeSlide].desc}</p>
                </div>

                <div className="absolute top-4 right-4 flex items-center bg-black/45 backdrop-blur-md px-1.5 rounded-full border border-white/10">
                  {slides.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Ver: ${s.title}`}
                      aria-current={idx === activeSlide}
                      type="button"
                      className="h-11 min-w-[24px] px-2 flex items-center justify-center"
                    >
                      <span className={`block h-2.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'bg-[#D7E400] w-6' : 'bg-white/50 w-2.5'}`} />
                    </button>
                  ))}
                  {!reduce && (
                    <button
                      type="button"
                      onClick={() => setPausado((v) => !v)}
                      aria-label={pausado ? 'Reanudar carrusel' : 'Pausar carrusel'}
                      className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white"
                    >
                      {pausado ? <Play size={14} /> : <Pause size={14} />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {levels.map((lvl, i) => (
              <motion.div
                key={lvl.code}
                {...fadeUp(i * 0.1)}
                className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#071D49]/5 shadow-card flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="w-11 h-11 rounded-xl bg-[#071D49] text-[#D7E400] font-display font-extrabold text-base flex items-center justify-center">
                    {lvl.code}
                  </span>
                  <span className="text-[11px] font-bold text-[#071D49]/70 uppercase tracking-wider bg-[#F4F4F4] px-3 py-1 rounded-full">
                    {lvl.duration}
                  </span>
                </div>

                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-3">{lvl.name}</h3>

                <p className="text-[#071D49]/70 text-sm leading-relaxed mb-6">{lvl.desc}</p>

                <ul className="space-y-2.5 border-t border-[#071D49]/10 pt-5 mt-auto">
                  {lvl.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#071D49]">
                      <CheckCircle2 size={16} className="text-[#071D49] flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PRECIO (se oculta con SHOW_PRICE) ────────────────────── */}
      {SHOW_PRICE && <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-14">
            <motion.p {...fadeUp(0)} className={`${EYEBROW_LIGHT} mb-4`}>Precio al abrir</motion.p>
            <motion.h2 {...fadeUp(0.1)} className={H2}>Un solo plan mensual</motion.h2>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div {...fadeUp(0.1)} className="p-6 sm:p-10 rounded-[28px] bg-[#071D49] border border-[#D7E400]/60 shadow-lael flex flex-col">
              <p className={`${EYEBROW_DARK} mb-4`}>Plan Único</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">{clp(PRECIO_MES)}</span>
                <span className="text-white/75 text-sm font-bold uppercase tracking-wider">/mes</span>
              </div>
              <p className="text-white/75 text-xs font-bold uppercase tracking-wider mb-6">Matrícula gratis</p>

              <ul className="space-y-3 mb-8 border-t border-white/10 pt-6">
                {[
                  "Clases en vivo por Google Meet",
                  "Material de apoyo digital (PDF)",
                  "Grabación de las clases para repasar",
                  "Certificado al aprobar cada nivel"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7E400] flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white/70 text-xs mb-4">No pagas nada hasta que el grupo esté listo.</p>
              <a href="#cupo" className={`${BTN_PRIMARY} w-full`}>
                Guarda tu cupo sin pagar
              </a>
            </motion.div>
          </div>
        </div>
      </section>}

      {/* ── 4. CERTIFICADOS POR NIVEL ───────────────────────────────── */}
      <CertificateSection defaultLevel="B1" defaultLanguage="Lengua de Señas Chilena (LSCh)" gray />

      {/* ── 5. TESTIMONIOS ──────────────────────────────────────────── */}
      <section className={`${SECTION} text-center`} style={{ backgroundColor: BLUE }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <motion.p {...fadeUp(0)} className={`${EYEBROW_DARK} mb-8`}>Lo que dicen los alumnos</motion.p>

          <div className="w-full space-y-6">
            {LSCH_TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                {...fadeUp(0.1 + idx * 0.1)}
                className="w-full bg-white/5 border border-white/10 rounded-[28px] p-6 sm:p-10"
              >
                <div className="flex justify-center gap-1 mb-6" role="img" aria-label="5 de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#D7E400] text-[#D7E400]" aria-hidden="true" />
                  ))}
                </div>

                <p className="font-display text-lg sm:text-2xl italic font-medium text-white leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D7E400] text-[#071D49] font-display font-black text-sm flex items-center justify-center flex-shrink-0">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-white/60 text-xs uppercase tracking-wider">{t.program}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.2)} className="mt-10">
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] text-white/75 hover:text-white transition-colors text-sm font-semibold hover:underline"
            >
              <MessageSquare size={18} className="text-[#D7E400]" aria-hidden="true" />
              <span>¿Tienes dudas? Escríbenos por WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 6. PREGUNTAS FRECUENTES ─────────────────────────────────── */}
      <Faq items={faq} />

      {/* ── 7. CIERRE ───────────────────────────────────────────────── */}
      <CtaBand title="Las manos también" accent="tienen voz." desc="Te avisamos apenas se complete el grupo. Guardar tu cupo es gratis y sin compromiso.">
        <a href="#cupo" className={BTN_PRIMARY}>Guarda tu cupo sin pagar</a>
        <a href={WA_CUPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-2xl border border-white/30 text-white hover:bg-white hover:text-[#071D49] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors">Escríbenos por WhatsApp</a>
      </CtaBand>
    </div>
  );
}
