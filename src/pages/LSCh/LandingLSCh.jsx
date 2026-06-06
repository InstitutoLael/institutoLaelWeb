import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight, 
  MessageSquare, 
  Users, 
  Star,
  UsersRound,
  GraduationCap,
  VolumeX,
  Volume2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import lschRealidad from '../../assets/img/Home/mundo_lsch_bg_1777943626827.png';
import entenderImg from '../../assets/img/Home/media_lsch_entender_1780735268668.jpg';
import comenzarImg from '../../assets/img/Home/media_lsch_comenzar_1780735268676.jpg';
import avanzarImg from '../../assets/img/Home/media_lsch_avanzar_1780735268706.jpg';

// Visual Brand Colors
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

export default function LandingLSCh() {
  const [activeSlide, setActiveSlide] = useState(0);

  const WA_LINK_MENSUAL = "https://wa.me/56964626568?text=Hola!%20Quiero%20inscribirme%20en%20el%20Plan%20Mensual%20de%20LSCh%20($24.990/mes).";
  const WA_LINK_TRIMESTRAL = "https://wa.me/56964626568?text=Hola!%20Quiero%20inscribirme%20en%20el%20Plan%20Trimestral%20Ahorro%20de%20LSCh%20($19.990/mes).";
  const WA_GENERAL = "https://wa.me/56964626568?text=Hola!%20Tengo%20consultas%20sobre%20el%20curso%20de%20Lengua%20de%20Señas%20Chilena%20(LSCh).";

  const slides = [
    {
      img: entenderImg,
      title: "Aprender señas es entender",
      desc: "Una decisión que transforma la forma de comunicar.",
      badge: "ENTENDER"
    },
    {
      img: comenzarImg,
      title: "Aprender señas es comenzar",
      desc: "Abre nuevas oportunidades de comunicación y conexión.",
      badge: "COMENZAR"
    },
    {
      img: avanzarImg,
      title: "Aprender señas es avanzar",
      desc: "Porque cada persona aprende de manera distinta.",
      badge: "AVANZAR"
    }
  ];

  // Auto rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const levels = [
    {
      code: "A1",
      name: "Nivel Inicial",
      duration: "3 Meses",
      desc: "Comienza desde cero. Aprende el abecedario dactilológico, vocabulario cotidiano, saludos formales e informales, y cómo estructurar tus primeras ideas sin usar la voz.",
      items: ["Abecedario y números", "Familia y entorno social", "Saludos y expresiones básicas", "Estructura espacial inicial"]
    },
    {
      code: "A2",
      name: "Nivel Intermedio",
      duration: "3 Meses",
      desc: "Profundiza tus habilidades comunicativas. Incorpora la gramática espacial tridimensional, clasificadores visuales y verbos direccionales para describir escenas complejas.",
      items: ["Direccionalidad verbal", "Clasificadores espaciales", "Descripción de trayectorias", "Vocabulario extendido"]
    },
    {
      code: "B1",
      name: "Nivel Conversacional",
      duration: "4 Meses",
      desc: "Desarrolla mayor fluidez y confianza. Orientado a contextos profesionales, atención al público y cumplimiento de los parámetros de la Ley de Inclusión Laboral 21.015.",
      items: ["Entornos laborales y de atención", "Léxico técnico de inclusión", "Conversación espontánea", "Inmersión cultural Sorda"]
    }
  ];

  return (
    <div className="w-full bg-[#F4F4F4] overflow-x-hidden font-sans">
      
      {/* ── 1. HERO LSCh ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071D49]/50 via-[#071D49]/80 to-[#071D49] z-10" />
          <div 
            className="w-full h-full bg-cover bg-center opacity-20 mix-blend-luminosity grayscale" 
            style={{ backgroundImage: `url(${lschRealidad})` }} 
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column (Copy and Action) */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <motion.div {...fadeUp(0)} className="inline-flex w-fit items-center gap-2 mb-6 bg-[#D7E400] text-[#071D49] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              <VolumeX size={14} className="animate-pulse" />
              <span>LENGUA DE SEÑAS CHILENA</span>
            </motion.div>

            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white font-extrabold leading-[1] max-w-xl mb-8 uppercase"
            >
              Aprender señas <br />
              es <span className="text-[#D7E400] italic font-normal">avanzar.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.25)} className="text-white/70 text-lg mb-10 leading-relaxed max-w-md">
              Una decisión que transforma la forma de comunicar y abre nuevas oportunidades de conexión. Conéctate con la inclusión real guiado por docentes nativos.
            </motion.p>

            {/* Quick badges */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-3 mb-10 text-white/55 text-xs font-bold uppercase tracking-wider">
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">Instructora Nativa Sorda</span>
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">100% Online en Vivo</span>
              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">Ley 21.015</span>
            </motion.div>

            {/* CTA Button */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a 
                href={WA_LINK_TRIMESTRAL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D7E400] text-[#071D49] hover:bg-white text-center transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 shadow-xl hover:-translate-y-0.5"
              >
                <span>INSCRIBIRME AHORA</span>
                <ChevronRight size={16} />
              </a>
              <a 
                href="#fernanda"
                className="bg-transparent border border-white/20 hover:border-white text-white text-center transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl active:scale-95"
              >
                Conocer Instructora
              </a>
            </motion.div>
          </div>

          {/* Right Column (Instagram creatives Slider / Showcase) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            {/* Interactive Creative Mockup */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-[36px] overflow-hidden border border-white/10 shadow-2xl bg-[#092254]">
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <img 
                    src={slides[activeSlide].img} 
                    alt={slides[activeSlide].title} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay with info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 pt-16 flex flex-col justify-end text-left">
                <span className="text-[#D7E400] text-[9px] font-bold tracking-[0.2em] uppercase mb-2">
                  Creative {slides[activeSlide].badge}
                </span>
                <p className="text-white font-display font-extrabold text-base uppercase leading-tight">
                  {slides[activeSlide].title}
                </p>
                <p className="text-white/60 text-xs mt-1">
                  {slides[activeSlide].desc}
                </p>
              </div>

              {/* Slider indicators */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'bg-[#D7E400] w-6' : 'bg-white/35'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. PERFIL FERNANDA GAETE ────────────────────────────────── */}
      <section id="fernanda" className="py-28 px-6 bg-white flex flex-col items-center border-b border-[#071D49]/5">
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Avatar Area */}
          <motion.div {...fadeUp(0)} className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-[48px] overflow-hidden border border-[#071D49]/10 shadow-lael bg-[#071D49]/5 flex items-center justify-center">
              {/* Profile Image fallback */}
              <div className="absolute inset-0 bg-[#071D49]/5 flex flex-col items-center justify-center text-center p-6">
                <div className="w-24 h-24 rounded-full bg-[#071D49] text-[#D7E400] font-display font-black text-3xl flex items-center justify-center shadow-lg mb-4">
                  FE
                </div>
                <h4 className="text-[#071D49] font-display font-extrabold text-base uppercase">Fernanda Gaete</h4>
                <p className="text-[#8D8D8D] text-2xs uppercase tracking-widest mt-1">Docente Nativa Sorda</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm border border-[#071D49]/10 rounded-2xl p-4 text-center">
                <p className="text-[#071D49] text-xs font-bold uppercase tracking-wider">Foto Real Próximamente</p>
              </div>
            </div>
          </motion.div>

          {/* Description Area */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 mb-6 text-[#071D49] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7E400]" />
              <span>QUIEN TE ENSEÑA</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.15)} className="font-display text-3xl sm:text-4xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase mb-4">
              Fernanda Gaete
            </motion.h2>
            <p className="text-[#D7E400] text-xs font-bold uppercase tracking-widest bg-[#071D49] px-3.5 py-1 rounded-full w-fit mb-8">
              Educadora de Párvulos & Facilitadora LSCh
            </p>

            <motion.p {...fadeUp(0.25)} className="text-[#8D8D8D] text-sm sm:text-base leading-relaxed mb-8">
              Nuestra profesora nativa (Sorda) y Educadora de Párvulos profesional. Combina la cultura sorda con una pedagogía experta, sumamente paciente y estructurada para garantizar tu inmersión.
            </motion.p>

            <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-2.5">
              {["Educadora Sorda", "Educación Párvulos", "Pedagogía LSCh", "Cultura Nativa"].map(badge => (
                <span 
                  key={badge}
                  className="text-[10px] tracking-widest font-bold text-[#071D49] border border-[#071D49]/15 px-3 py-1.5 rounded-full uppercase bg-[#F4F4F4]"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 3. NIVELES A1 / A2 / B1 ─────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#F4F4F4] flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Progresión por Ciclos</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              Ruta Formativa LSCh
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {levels.map((lvl, i) => (
              <motion.div
                key={lvl.code}
                {...fadeUp(i * 0.1)}
                className="group bg-white p-8 rounded-[40px] border border-[#071D49]/10 shadow-sm hover:border-[#D7E400]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="w-10 h-10 rounded-xl bg-[#071D49] text-[#D7E400] font-display font-extrabold text-base flex items-center justify-center shadow-md">
                      {lvl.code}
                    </span>
                    <span className="text-[10px] font-bold text-[#8D8D8D] uppercase tracking-wider bg-[#F4F4F4] px-3.5 py-1 rounded-full">
                      {lvl.duration}
                    </span>
                  </div>

                  <h3 className="text-[#071D49] font-display text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-[#D7E400] transition-colors">
                    {lvl.name}
                  </h3>

                  <p className="text-[#8D8D8D] text-xs sm:text-sm leading-relaxed mb-6">
                    {lvl.desc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3 border-t border-[#071D49]/5 pt-6">
                    {lvl.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs font-semibold text-[#071D49]/80">
                        <CheckCircle2 size={14} className="text-[#D7E400] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PLANES Y PRECIOS ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white flex flex-col items-center border-t border-[#071D49]/5">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Inversión y Matrícula</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              Elige tu Plan de Aprendizaje
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* Plan Mensual */}
            <motion.div {...fadeUp(0.1)} className="p-10 rounded-[40px] bg-white border border-[#071D49]/10 shadow-sm hover:border-[#D7E400]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <p className="text-[#8D8D8D] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Flexibilidad Mensual</p>
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-[#071D49]">$24.990</span>
                  <span className="text-[#8D8D8D] text-xs font-bold uppercase tracking-widest">/mes</span>
                </div>
                
                <ul className="space-y-4 mb-10 border-t border-[#071D49]/5 pt-6">
                  {["Clases en vivo vía Zoom", "Material de apoyo digital (PDF)", "Acceso a grabaciones por 7 días", "Diploma de participación por nivel"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs text-[#8D8D8D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#071D49]/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={WA_LINK_MENSUAL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4.5 bg-[#F4F4F4] hover:bg-[#071D49] text-[#071D49] hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                Seleccionar Plan Mensual
              </a>
            </motion.div>

            {/* Plan Trimestral */}
            <motion.div {...fadeUp(0.2)} className="p-10 rounded-[40px] bg-[#071D49] border border-[#D7E400] shadow-lael flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 bg-[#D7E400] text-[#071D49] text-[9px] font-bold uppercase tracking-widest rounded-bl-2xl">
                Ahorra 20%
              </div>

              <div>
                <p className="text-[#D7E400] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Plan Ahorro Trimestral</p>
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">$19.990</span>
                  <span className="text-white/55 text-xs font-bold uppercase tracking-widest">/mes</span>
                </div>
                
                <ul className="space-y-4 mb-10 border-t border-white/10 pt-6">
                  {[
                    "Todo lo del plan mensual",
                    "🔥 Matrícula $0 (Ahorras $15.000)",
                    "Acceso permanente a grabaciones de por vida",
                    "Certificado formal de Nivel aprobado"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D7E400]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={WA_LINK_TRIMESTRAL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4.5 bg-[#D7E400] hover:bg-white text-[#071D49] rounded-2xl text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md"
              >
                Activar Plan Ahorro
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIO DANIELA ───────────────────────────────────── */}
      <section className="relative py-32 lg:py-40 px-6 text-center overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(215,228,0,0.04),transparent)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.p {...fadeUp(0)} className="text-[#D7E400] text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Experiencia de Alumnos</motion.p>
          
          <motion.div 
            {...fadeUp(0.15)}
            className="w-full max-w-2xl bg-white/[0.03] border border-white/15 rounded-[40px] p-8 sm:p-12 relative"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#D7E400] text-[#D7E400]" />
              ))}
            </div>

            <p className="font-display text-xl sm:text-2xl italic font-medium text-white leading-relaxed mb-8">
              "Fernanda es una profesora excelente. Aprendí cultura sorda con una pedagogía muy paciente."
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D7E400] text-[#071D49] font-display font-black text-sm flex items-center justify-center shadow-lg">
                DA
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-bold">Daniela R.</p>
                <p className="text-white/45 text-[10px] uppercase tracking-wider">Alumna LSCh con Fernanda Gaete</p>
              </div>
            </div>
          </motion.div>

          {/* Simple Contact query link */}
          <motion.div {...fadeUp(0.3)} className="mt-12">
            <a 
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider hover:underline"
            >
              <MessageSquare size={16} className="text-[#D7E400]" />
              <span>¿Tienes dudas? Escríbenos por WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
