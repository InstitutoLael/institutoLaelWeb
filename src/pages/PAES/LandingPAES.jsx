import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Calendar,
  Monitor,
  UsersRound,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import inoLogo from '../../assets/img/Partners/INO.png';
import studentImg from '../../assets/img/Home/hero_student_lael_1780734180709.webp';
import { LANDING_FEATURES, LANDING_SUBJECTS, LANDING_TEACHERS, LANDING_STEPS, LANDING_FAQS, PAES_PLANS, PAES_PLAN_INCLUDES, PAES_FORM_URL, BECAS_FORM_URL, REFERRAL } from '../../data/paes';

// Design System Tokens (Local references matching tailwind.config.js / index.css)
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F4F4F4';
const MUTED = '#8D8D8D';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});

export default function LandingPAES() {
  const [openFaq, setOpenFaq] = useState(null);

  const WA_LINK = PAES_FORM_URL;
  const WHATSAPP_LINK = "https://wa.me/56964626568?text=Hola,%20tengo%20dudas%20sobre%20el%20preu%20PAES";

  const features = LANDING_FEATURES;
  const subjects = LANDING_SUBJECTS;
  const teachers = LANDING_TEACHERS;
  const steps = LANDING_STEPS;
  const faqs = LANDING_FAQS;

  return (
    <div className="w-full bg-[#F4F4F4] overflow-x-hidden font-sans">
      
      {/* ── 1. HERO PAES REDISEÑADO ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-white rounded-full filter blur-[150px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D7E400] rounded-full filter blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Copy and Actions) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.div {...fadeUp(0)} className="mb-4 flex flex-wrap items-center gap-3">
              <span className="bg-[#D7E400] text-[#071D49] text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-md animate-pulse">
                Desde $10.000/mes - Partimos en marzo 2027
              </span>
            </motion.div>

            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-white font-black leading-[1.05] max-w-2xl mb-8 uppercase animate-fade-in"
            >
              CREAMOS EL PREU <br />
              QUE NOS HABRÍA <br />
              GUSTADO TENER. <br />
              <span className="text-[#D7E400] font-bold">Y LO MEJOR: NADIE SE QUEDA AFUERA.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-white/70 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed">
              Clases en vivo por Google Meet, grabaciones para repasar y un ensayo cronometrado cada mes. Sin matrícula. Desde $10.000/mes por ramo, con becas para quien lo necesite.
            </motion.p>

            {/* Key Data grid */}
            <motion.div {...fadeUp(0.3)} className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 mb-10 max-w-xl">
              <div>
                <p className="text-[#D7E400] font-display font-extrabold text-lg sm:text-xl uppercase">Marzo</p>
                <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Inicio de Clases</p>
              </div>
              <div>
                <p className="text-white font-display font-extrabold text-lg sm:text-xl uppercase">100% Online</p>
                <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Clases en Vivo</p>
              </div>
              <div>
                <p className="text-[#D7E400] font-display font-extrabold text-lg sm:text-xl uppercase">20 máx.</p>
                <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Alumnos por curso</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a 
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D7E400] text-[#071D49] hover:bg-white text-center transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl flex items-center justify-center gap-3 group active:scale-95 shadow-xl hover:-translate-y-0.5"
              >
                <span>INSCRIBIRME GRATIS</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://www.youtube.com/@Laelinstituto/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white text-center transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Video size={16} />
                <span>CLASES EN YOUTUBE</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column (Image Student) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease }}
            className="lg:col-span-5 relative flex justify-center items-center h-full min-h-[350px] lg:min-h-[500px]"
          >
            <div className="absolute inset-0 bg-[#D7E400]/5 rounded-[40px] border border-white/5 -rotate-3 translate-x-2 translate-y-2" />
            <div className="relative w-full h-full max-w-[450px] aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#092254]">
              <img 
                src={studentImg} 
                alt="Estudiante Preparando PAES con Instituto Lael" 
                className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D49] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-white text-xs font-semibold tracking-wide">Inscripciones abiertas · Ciclo 2027</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. ¿QUÉ INCLUYE EL PROGRAMA? ───────────────────────────── */}
      <section id="estructura" className="py-28 px-6 bg-white flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Lo que recibes</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              ¿QUÉ INCLUYE EL PROGRAMA?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title} 
                {...fadeUp(i * 0.08)} 
                whileHover={{ y: -8 }}
                className="group p-8 rounded-[32px] bg-white border border-[#071D49]/10 hover:border-[#D7E400] hover:shadow-lael transition-all duration-500 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-[#071D49]/5 group-hover:bg-[#D7E400]/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-[#071D49]" />
                </div>
                <h3 className="text-[#071D49] text-lg font-bold mb-3 font-display uppercase tracking-tight">{feature.title}</h3>
                <p className="text-[#8D8D8D] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DASHBOARD DE ASIGNATURAS (LAYOUT 2 COLUMNAS) ─────────── */}
      <section className="py-28 px-6 overflow-hidden relative" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#D7E400] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Elige tus ramos</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-white font-extrabold tracking-[-0.03em] uppercase">
              ASIGNATURAS
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
            
            {/* Columna Izquierda: Obligatorias */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-white font-black text-lg tracking-wider font-display uppercase">PRUEBAS OBLIGATORIAS</h3>
                <span className="text-[10px] bg-[#D7E400] text-[#071D49] font-bold px-3 py-1 rounded-full uppercase">Común</span>
              </div>
              <div className="space-y-4">
                {subjects.filter(s => s.type === "Obligatoria").map((subj, i) => (
                  <motion.div 
                    key={subj.code} 
                    {...fadeUp(i * 0.06)} 
                    className="group rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-[#D7E400]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm flex items-center justify-center shadow-lg">
                          {subj.code}
                        </div>
                      </div>
                      <h3 className="text-white font-display text-base font-bold mb-2 uppercase tracking-tight">{subj.name}</h3>
                      <p className="text-white/60 text-xs leading-relaxed mb-4">{subj.desc}</p>
                    </div>
                    
                    {subj.teacher && (
                    <div className="border-t border-white/5 pt-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D7E400] text-[#071D49] font-display font-black text-[9px] flex items-center justify-center shadow-inner">
                        {subj.teacher.split(/ & | /).map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">{subj.teacher}</p>
                        <p className="text-white/45 text-[8px] uppercase tracking-wider">Docente Asignado</p>
                      </div>
                    </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Electivas */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-white font-black text-lg tracking-wider font-display uppercase">PRUEBAS ELECTIVAS</h3>
                <span className="text-[10px] bg-white/10 text-white/60 font-bold px-3 py-1 rounded-full uppercase">Selección</span>
              </div>
              <div className="space-y-4">
                {subjects.filter(s => s.type !== "Obligatoria").map((subj, i) => (
                  <motion.div 
                    key={subj.code} 
                    {...fadeUp(i * 0.06)} 
                    className="group rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-[#D7E400]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-white/15 text-white/80 font-display font-extrabold text-sm flex items-center justify-center shadow-lg">
                          {subj.code}
                        </div>
                      </div>
                      <h3 className="text-white font-display text-base font-bold mb-2 uppercase tracking-tight">{subj.name}</h3>
                      <p className="text-white/60 text-xs leading-relaxed mb-4">{subj.desc}</p>
                    </div>
                    
                    {subj.teacher && (
                    <div className="border-t border-white/5 pt-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D7E400] text-[#071D49] font-display font-black text-[9px] flex items-center justify-center shadow-inner">
                        {subj.teacher.split(/ & | /).map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">{subj.teacher}</p>
                        <p className="text-white/45 text-[8px] uppercase tracking-wider">Docente Asignado</p>
                      </div>
                    </div>
                    )}
                  </motion.div>
                ))}

                {/* Comunidad & Soporte Card at the end */}
                <motion.div 
                  {...fadeUp(0.3)}
                  className="rounded-2xl p-6 border border-dashed border-white/20 hover:border-[#D7E400]/40 transition-all flex items-center gap-4 bg-white/[0.02]"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40 flex-shrink-0">
                    <UsersRound size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white/80 font-display font-bold text-sm uppercase">Comunidad & Soporte</h4>
                    <p className="text-white/45 text-xs mt-1 leading-relaxed">Orientación vocacional, acompañamiento cercano y dudas resueltas por WhatsApp.</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3.5 PLANES Y PRECIOS ──────────────────────────────────────── */}
      <section id="planes" className="py-28 px-6 bg-[#F4F4F4] flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Matrícula gratis</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              PLANES Y PRECIOS
            </motion.h2>
            <motion.p {...fadeUp(0.15)} className="text-[#8D8D8D] text-base max-w-xl mx-auto mt-6 leading-relaxed">
              Pagas solo por los ramos que tomas. Desde el cuarto ramo, el precio deja de subir.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PAES_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                {...fadeUp(i * 0.08)}
                className={`relative rounded-[32px] p-8 flex flex-col border transition-all duration-300 ${plan.featured ? 'bg-[#071D49] border-[#071D49] text-white shadow-2xl md:-translate-y-3' : 'bg-white border-[#071D49]/10 text-[#071D49] shadow-sm'}`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 bg-[#D7E400] text-[#071D49] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                    Más conveniente
                  </span>
                )}
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight mb-2">{plan.name}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-white/70' : 'text-[#8D8D8D]'}`}>{plan.desc}</p>
                <p className="mb-6">
                  <span className={`font-display text-4xl font-black ${plan.featured ? 'text-[#D7E400]' : ''}`}>{plan.priceLabel}</span>
                  <span className={`text-xs font-semibold ml-1 ${plan.featured ? 'text-white/60' : 'text-[#8D8D8D]'}`}>{plan.period}</span>
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm leading-snug">
                      <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${plan.featured ? 'text-[#D7E400]' : 'text-[#071D49]'}`} />
                      <span className={plan.featured ? 'text-white/85' : 'text-[#071D49]/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center font-display font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl transition-all duration-300 active:scale-95 ${plan.featured ? 'bg-[#D7E400] text-[#071D49] hover:bg-white' : 'bg-[#071D49] text-white hover:bg-[#0B2A66]'}`}
                >
                  Inscribirme
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.2)} className="text-center text-[#8D8D8D] text-sm mt-12 max-w-2xl mx-auto leading-relaxed">
            {PAES_PLAN_INCLUDES}{' '}
            ¿No te alcanza?{' '}
            <a href={BECAS_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-[#071D49] font-bold underline underline-offset-4 hover:text-[#0B2A66]">
              Postula a una beca parcial
            </a>
            , la revisamos caso a caso. Parte de lo que pagan los alumnos financia esas becas.
          </motion.p>

          <motion.div {...fadeUp(0.25)} className="mt-10 max-w-2xl mx-auto rounded-[24px] border-2 border-dashed border-[#071D49]/15 bg-white p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#D7E400] text-[#071D49] flex items-center justify-center flex-shrink-0">
              <UsersRound size={20} />
            </div>
            <div>
              <p className="text-[#071D49] font-display font-extrabold uppercase tracking-tight">{REFERRAL.title}</p>
              <p className="text-[#8D8D8D] text-sm leading-relaxed">{REFERRAL.desc}</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="mt-4 max-w-2xl mx-auto rounded-[24px] border border-[#071D49]/10 bg-white p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img src={inoLogo} alt="Instituto Nacional de Ortodoncia (INO)" loading="lazy" className="h-10 w-auto flex-shrink-0" />
            <div>
              <p className="text-[#071D49] font-display font-extrabold uppercase tracking-tight">Beneficio para alumnos</p>
              <p className="text-[#8D8D8D] text-sm leading-relaxed">Por ser alumno de Lael tienes descuento en el Instituto Nacional de Ortodoncia (INO).</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. NUESTROS DOCENTES ───────────────────────────────────── */}
      <section className="py-28 px-6 bg-white flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Gente Real, No un Call Center</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              NUESTROS DOCENTES
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teachers.map((t, i) => {
              const isDiego = t.name === "Diego Chaparro";

              return (
                <motion.div 
                  key={t.name} 
                  {...fadeUp(i * 0.1)}
                  className="rounded-[32px] p-8 border transition-all duration-300 flex flex-col items-center text-center bg-white border-[#071D49]/10 shadow-card hover:shadow-lael"
                >
                  {/* Photo / Avatar */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-[#071D49]/15 shadow-md mb-6 flex items-center justify-center bg-[#071D49]/5 relative">
                    <img src={t.img} alt={`Foto de ${t.name}`} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-center mb-1">
                    <h3 className="text-[#071D49] font-display font-extrabold text-lg uppercase tracking-tight">{t.name}</h3>
                    {isDiego && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-lael-primary text-white px-2 py-0.5 rounded">
                        FUNDADOR
                      </span>
                    )}
                  </div>
                  
                  {/* Asignatura in yellow (#D7E400) */}
                  <p 
                    className="text-xs font-black uppercase tracking-wider mb-4 px-3 py-1 rounded-full w-fit"
                    style={{ backgroundColor: BLUE, color: YELLOW }}
                  >
                    {t.subject}
                  </p>
                  
                  <p className="text-[#8D8D8D] text-sm leading-relaxed">{t.bio}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. ¿CÓMO FUNCIONA? - PROCESO EN 3 PASOS ─────────────────── */}
      <section className="py-28 px-6 bg-[#F4F4F4] flex flex-col items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Así de simple</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              ¿CÓMO FUNCIONA?
            </motion.h2>
          </div>

          {/* Stepper Timeline Layout */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            {/* Visual connector line for large screens */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#071D49]/5 via-[#071D49]/20 to-[#071D49]/5 transform -translate-y-1/2 hidden lg:block -z-10" />
            
            {steps.map((step, i) => (
              <motion.div 
                key={step.num} 
                {...fadeUp(i * 0.12)}
                className="relative bg-white rounded-[32px] p-8 border border-[#071D49]/10 shadow-sm flex flex-col items-center text-center group overflow-hidden"
              >
                {/* Huge Number in the background in primary color */}
                <div 
                  className="absolute right-4 bottom-2 text-lael-primary/5 font-display font-black text-8xl pointer-events-none select-none"
                  style={{ fontSize: '10rem' }}
                >
                  {step.num}
                </div>

                {/* Step circle */}
                <div className="w-16 h-16 rounded-full bg-[#071D49] text-[#D7E400] font-display font-extrabold text-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {step.num}
                </div>
                
                <h3 className="text-[#071D49] font-display text-xl font-bold uppercase tracking-tight mb-4 relative z-10">{step.title}</h3>
                <p className="text-[#8D8D8D] text-sm leading-relaxed max-w-xs relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5.5 YOUTUBE CHANNEL BANNER ──────────────────────────────── */}
      <section className="py-20 px-6 bg-[#071D49] text-white flex flex-col items-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
          <motion.div {...fadeUp(0)} className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/25">
            <Video className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h3 {...fadeUp(0.1)} className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4">
            Mira nuestras clases grabadas en YouTube
          </motion.h3>
          <motion.p {...fadeUp(0.2)} className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            ¿Quieres ver cómo son nuestras clases de matemáticas y ciencias antes de inscribirte? Subimos resoluciones de ensayos, explicaciones rápidas de contenido y consejos estratégicos en nuestro canal oficial. ¡Acceso 100% libre y gratuito!
          </motion.p>
          <motion.div {...fadeUp(0.3)}>
            <a 
              href="https://www.youtube.com/@Laelinstituto/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-display font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-2 active:scale-95 transition-all duration-300 shadow-md"
            >
              <span>VISITAR CANAL DE YOUTUBE</span>
              <ChevronRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FAQ PAES ─────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white flex flex-col items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Preguntas Frecuentes</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              PREGUNTAS FRECUENTES
            </motion.h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                {...fadeUp(idx * 0.06)}
                className="border border-[#071D49]/10 rounded-[24px] overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-[#F4F4F4]/40 transition-colors duration-300 focus:outline-none"
                >
                  <span className="text-[#071D49] font-bold text-base sm:text-lg font-display uppercase tracking-tight pr-6">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#071D49]/10 flex items-center justify-center text-[#071D49] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 bg-[#071D49] text-white' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-[#8D8D8D] text-sm sm:text-base leading-relaxed border-t border-[#071D49]/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINAL PAES REDISEÑADO ────────────────────────────── */}
      <section className="relative py-32 lg:py-48 px-6 text-center overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(215,228,0,0.06),transparent)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.p 
            {...fadeUp(0)} 
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-8"
            style={{ color: YELLOW }}
          >
            TU MOMENTO ES AHORA
          </motion.p>

          <motion.h2 
            {...fadeUp(0.1)} 
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-4 uppercase"
          >
            EL PRÓXIMO <br /> PASO ES TUYO.
          </motion.h2>

          <motion.p {...fadeUp(0.15)} className="text-white/70 text-lg sm:text-xl max-w-lg mb-12 leading-relaxed">
            No importa dónde estés hoy. Lo importante es dónde quieres llegar.
          </motion.p>

          {/* Inscription yellow button */}
          <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#D7E400] text-[#071D49] hover:bg-white transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-12 py-6 rounded-2xl flex items-center justify-center gap-3 active:scale-95 shadow-2xl hover:-translate-y-1"
              style={{ boxShadow: '0 20px 50px rgba(215, 228, 0, 0.2)' }}
            >
              <span>INSCRIBIRME GRATIS</span>
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Secondary WhatsApp link for questions */}
          <motion.div {...fadeUp(0.35)} className="mt-8">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider hover:underline"
            >
              <MessageCircle size={16} className="text-[#D7E400]" />
              <span>¿Tienes dudas? Escríbenos por WhatsApp</span>
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="mt-16 text-white/20 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">
            INSTITUTO LAEL · SIN COSTO DE MATRÍCULA · CLASES 100% ONLINE
          </motion.p>
        </div>
      </section>

    </div>
  );
}
