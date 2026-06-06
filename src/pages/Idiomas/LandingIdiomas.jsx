import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Globe, 
  MessageSquare, 
  Heart, 
  Users, 
  ChevronRight, 
  Award, 
  GraduationCap, 
  Bookmark, 
  Zap, 
  Instagram,
  Check,
  CheckCircle2
} from 'lucide-react';
import languagesBg from '../../assets/img/Home/idiomas_execution_bg_1777948997295.png';
import igPost1 from '../../assets/img/Home/media_ig_post_1780732980390.png';
import igPost2 from '../../assets/img/Home/media_ig_post_1780733562637.png';

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

export default function LandingIdiomas() {
  const WA_BASE = "https://wa.me/56964626568?text=";
  const waLink = (message) => `${WA_BASE}${encodeURIComponent(message)}`;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectorLanguages = [
    { id: 'ingles', label: 'Inglés', flag: '🇬🇧', tag: 'Programa Principal' },
    { id: 'coreano', label: 'Coreano', flag: '🇰🇷', tag: 'Nivel Inicial-Intermedio' },
    { id: 'espanol', label: 'Español para Expats', flag: '🇨🇱', tag: 'Card Nicho' }
  ];

  const reasons = [
    {
      title: "Profesores nativos y especializados",
      desc: "Aprende de docentes con dominio nativo o bilingües certificados con amplia experiencia y pedagogía activa.",
      icon: <GraduationCap className="w-6 h-6 text-[#071D49]" />
    },
    {
      title: "Progresión por niveles",
      desc: "Estructura alineada al Marco Común Europeo (MCER) con metas de aprendizaje y fluidez claras en cada etapa.",
      icon: <Bookmark className="w-6 h-6 text-[#071D49]" />
    },
    {
      title: "Certificación Lael",
      desc: "Valida tus competencias comunicativas al finalizar cada nivel con una certificación formal de nuestra institución.",
      icon: <Award className="w-6 h-6 text-[#071D49]" />
    },
    {
      title: "Comunidad de práctica",
      desc: "Sesiones de conversación extra y grupos de interacción dinámica para que uses el idioma en contextos reales.",
      icon: <Users className="w-6 h-6 text-[#071D49]" />
    }
  ];

  return (
    <div className="w-full bg-[#F4F4F4] overflow-x-hidden font-sans">
      
      {/* ── 1. HERO IDIOMAS ────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden" style={{ backgroundColor: BLUE }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071D49]/50 via-[#071D49]/80 to-[#071D49] z-10" />
          <div 
            className="w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" 
            style={{ backgroundImage: `url(${languagesBg})` }} 
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="text-[#D7E400] text-xs font-bold tracking-[0.3em] uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              MUNDO IDIOMAS LAEL
            </span>
          </motion.div>

          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[1.05] uppercase mb-10 max-w-4xl"
          >
            Abre tu mundo <br />
            con el <span className="text-[#D7E400] italic font-normal">idioma correcto.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mb-16 leading-relaxed">
            Elige el programa estratégico que impulsará tu perfil global. Sin metodologías lentas de pizarrón: inmersión práctica desde el primer día.
          </motion.p>

          {/* Visual Selector Cards */}
          <motion.div {...fadeUp(0.4)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
            {selectorLanguages.map((lang, i) => (
              <button
                key={lang.id}
                onClick={() => scrollToSection(lang.id)}
                className="group p-6 rounded-[24px] bg-white/5 border border-white/10 hover:border-[#D7E400]/40 hover:bg-white/10 transition-all duration-300 text-left flex flex-col justify-between items-start cursor-pointer active:scale-95"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-3xl" role="img" aria-label={lang.label}>{lang.flag}</span>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-[#D7E400] group-hover:translate-x-1 transition-all" />
                </div>
                <div className="mt-8">
                  <p className="text-white font-display font-bold text-base uppercase tracking-tight">{lang.label}</p>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-wider mt-1">{lang.tag}</p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. INGLÉS — PROGRAMA PRINCIPAL ──────────────────────────── */}
      <section id="ingles" className="py-28 px-6 bg-white flex flex-col items-center border-b border-[#071D49]/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text and info */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6 bg-[#071D49] text-[#D7E400] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit">
              <Zap size={12} />
              <span>PROGRAMA PRINCIPAL</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase mb-6 leading-[1.05]">
              Inglés Estratégico Pro
            </motion.h2>

            <motion.p {...fadeUp(0.2)} className="text-[#8D8D8D] text-lg mb-8 leading-relaxed max-w-xl">
              Desarrolla las competencias necesarias para comunicarte fluidamente en el entorno corporativo y digital global. Olvida las clases pasivas y entrena con situaciones reales de networking y trabajo.
            </motion.p>

            {/* Path visualization */}
            <motion.div {...fadeUp(0.3)} className="bg-[#F4F4F4] rounded-[24px] p-6 mb-8 max-w-xl border border-[#071D49]/5">
              <p className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Ruta Formativa de Fluidez</p>
              <div className="flex items-center justify-between">
                {['A1', 'A2', 'B1', 'B2'].map((level, i, arr) => (
                  <React.Fragment key={level}>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#071D49] text-white flex items-center justify-center text-xs font-extrabold shadow-md">
                        {level}
                      </div>
                      <span className="text-[9px] font-bold text-[#8D8D8D] uppercase tracking-wider mt-1.5">
                        {level === 'B2' ? 'Fluidez' : `Nivel ${i+1}`}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-grow h-0.5 bg-[#071D49]/15 mx-2" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Price badge & Button */}
            <motion.div {...fadeUp(0.35)} className="flex items-baseline gap-2 mb-10">
              <span className="text-[#071D49] font-display font-extrabold text-4xl sm:text-5xl tracking-tight">$9.990</span>
              <span className="text-[#8D8D8D] text-sm font-bold uppercase tracking-widest">/mes</span>
              <span className="ml-3 text-[10px] font-bold text-[#071D49] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#D7E400]/25">Matrícula $0</span>
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href={waLink("Hola! Quiero inscribirme al curso de Inglés Estratégico Pro ($9.990/mes).")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#071D49] text-white hover:bg-[#D7E400] hover:text-[#071D49] text-center transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 shadow-lg"
              >
                <span>INSCRIBIRME AHORA</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Instagram Mockup Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 flex justify-center"
          >
            {/* Visual Hero Instagram post mockup */}
            <div className="w-full max-w-[380px] bg-white rounded-[32px] border border-black/5 shadow-lael overflow-hidden flex flex-col">
              {/* IG Header */}
              <div className="p-4 border-b border-[#071D49]/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D7E400] to-[#071D49] p-0.5 flex items-center justify-center text-[8px] font-black text-white">
                    LAEL
                  </div>
                  <div>
                    <p className="text-[#071D49] text-xs font-bold tracking-tight">institutolael</p>
                    <p className="text-[#8D8D8D] text-[9px]">Santiago, Chile</p>
                  </div>
                </div>
                <Instagram size={18} className="text-[#071D49]/40" />
              </div>
              
              {/* IG Image */}
              <div className="w-full aspect-square overflow-hidden bg-[#071D49]/5">
                <img 
                  src={igPost1} 
                  alt="Instituto Lael Instagram Post" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* IG Footer/Actions */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] text-[#071D49] font-black uppercase tracking-wider bg-[#D7E400] px-2 py-0.5 rounded">Recomendado</span>
                  <p className="text-[11px] font-bold text-[#071D49]">Destacado de la semana</p>
                </div>
                <p className="text-xs text-[#8D8D8D] leading-relaxed">
                  <span className="font-bold text-[#071D49] mr-2">institutolael</span>
                  Entrena tu oído, formula tus ideas y habla con confianza. Programa 100% online y en vivo.
                </p>
                <div className="mt-4 pt-3 border-t border-[#071D49]/5 flex justify-between items-center text-[10px] text-black/45 uppercase tracking-wider">
                  <span>hace 2 días</span>
                  <a 
                    href={waLink("Hola! Vi su post de Instagram de inglés y quiero más información.")} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#071D49] font-bold hover:underline"
                  >
                    Ver detalles en chat →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 & 4. COREANO + ESPAÑOL (SIDE-BY-SIDE GRID) ─────────────── */}
      <section className="py-24 px-6 bg-[#F4F4F4] flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 3. COREANO (Card Secundaria) */}
            <motion.div 
              id="coreano"
              {...fadeUp(0)}
              className="lg:col-span-7 rounded-[40px] bg-white border border-[#071D49]/10 p-10 sm:p-12 flex flex-col justify-between shadow-sm hover:shadow-card transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-[#071D49] text-white">
                    Coreano Estructural
                  </span>
                  <span className="text-4xl" role="img" aria-label="Corea">🇰🇷</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#071D49] uppercase tracking-tight mb-4">
                  Coreano Inicial-Intermedio
                </h3>

                <p className="text-[#8D8D8D] text-sm sm:text-base leading-relaxed mb-8">
                  Decodificamos el idioma coreano desde su lógica interna de construcción. Aprende a leer Hangul con soltura, entabla conversaciones estructuradas y sumérgete en la cultura contemporánea y corporativa de Corea.
                </p>

                {/* Coreano path */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {['Nivel 1 (Inicial)', 'Nivel 2 (Básico)', 'Nivel 3 (Intermedio)'].map((lvl, idx) => (
                    <div key={lvl} className="flex items-center gap-2 bg-[#F4F4F4] border border-[#071D49]/5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#071D49]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D7E400]" />
                      <span>{lvl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="border-t border-[#071D49]/5 pt-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6">
                  <div>
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#071D49]">$9.990</span>
                    <span className="text-[#8D8D8D] text-xs font-bold uppercase tracking-widest ml-1">/mes</span>
                  </div>
                  <a
                    href={waLink("Hola! Quiero inscribirme al curso de Coreano Estructural ($9.990/mes).")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#071D49] text-white hover:bg-[#D7E400] hover:text-[#071D49] text-center font-display font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all duration-300 active:scale-95"
                  >
                    Inscribirme
                  </a>
                </div>
              </div>
            </motion.div>

            {/* 4. ESPAÑOL PARA EXPATS (Card Nicho) */}
            <motion.div 
              id="espanol"
              {...fadeUp(0.15)}
              className="lg:col-span-5 rounded-[40px] bg-white border border-[#071D49]/10 p-10 flex flex-col justify-between shadow-sm opacity-90 hover:opacity-100 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-white text-[#071D49] border border-[#071D49]/10">
                    Card Nicho
                  </span>
                  <span className="text-4xl" role="img" aria-label="Chile">🇨🇱</span>
                </div>

                <h3 className="font-display text-2xl font-extrabold text-[#071D49] uppercase tracking-tight mb-4">
                  Español para Expats
                </h3>

                <p className="text-[#8D8D8D] text-sm leading-relaxed mb-8">
                  Programa optimizado para hispanohablantes en el extranjero o extranjeros viviendo en Chile. Domina modismos locales, entonación, léxico formal de negocios y navega la vida cultural con soltura y seguridad.
                </p>

                {/* Expats items */}
                <ul className="space-y-2 mb-8">
                  {['Inmersión en chilenismos', 'Navegación laboral y social', 'Orientación de modismos'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#8D8D8D]">
                      <CheckCircle2 size={14} className="text-[#D7E400]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="border-t border-[#071D49]/5 pt-6 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-2xl font-display font-extrabold text-[#071D49]">$9.990</span>
                    <span className="text-[#8D8D8D] text-xs font-bold uppercase tracking-widest ml-1">/mes</span>
                  </div>
                  <a
                    href={waLink("Hola! Quiero inscribirme al curso de Español para Expats ($9.990/mes).")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F4F4F4] text-[#071D49] border border-[#071D49]/10 hover:bg-[#071D49] hover:text-white hover:border-[#071D49] text-center font-display font-extrabold text-xs uppercase tracking-widest px-6 py-4.5 rounded-xl transition-all duration-300 active:scale-95"
                  >
                    Inscribirme
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5. ¿POR QUÉ APRENDER UN IDIOMA CON LAEL? ───────────────── */}
      <section className="py-28 px-6 bg-white flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Metodología Comprobada</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              ¿POR QUÉ APRENDER CON LAEL?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, i) => (
              <motion.div 
                key={reason.title} 
                {...fadeUp(i * 0.08)}
                className="p-8 rounded-[32px] border border-[#071D49]/10 hover:border-[#D7E400]/40 hover:bg-[#F4F4F4]/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#071D49]/5 flex items-center justify-center mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-[#071D49] font-display font-bold text-base uppercase tracking-tight mb-3">
                  {reason.title}
                </h3>
                <p className="text-[#8D8D8D] text-xs sm:text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA + PRICING (COMPARATIVA) ──────────────────────────── */}
      <section className="relative py-28 px-6 bg-[#071D49] text-center overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <motion.p {...fadeUp(0)} className="text-[#D7E400] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Inversión Uniforme</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-white font-extrabold tracking-[-0.03em] uppercase mb-16">
            PROGRAMAS & MATRICULA
          </motion.h2>

          {/* Pricing Comparison Table */}
          <motion.div {...fadeUp(0.25)} className="w-full overflow-x-auto rounded-[32px] border border-white/10 shadow-2xl bg-[#0a265b] mb-12">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-6 text-xs font-bold text-white uppercase tracking-widest">Programa</th>
                  <th className="p-6 text-xs font-bold text-[#D7E400] uppercase tracking-widest">Inversión</th>
                  <th className="p-6 text-xs font-bold text-white/60 uppercase tracking-widest">Ruta / Niveles</th>
                  <th className="p-6 text-xs font-bold text-white/60 uppercase tracking-widest">Frecuencia</th>
                  <th className="p-6 text-xs font-bold text-white/60 uppercase tracking-widest">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    name: 'Inglés Estratégico Pro',
                    price: '$9.990/mes',
                    route: 'A1 → B2 (4 Niveles)',
                    freq: 'Vespertino (Meet)',
                    link: waLink("Hola! Quiero inscribirme al curso de Inglés Estratégico Pro ($9.990/mes).")
                  },
                  {
                    name: 'Coreano Estructural',
                    price: '$9.990/mes',
                    route: 'Inicial a Intermedio (3 Niveles)',
                    freq: 'Vespertino (Meet)',
                    link: waLink("Hola! Quiero inscribirme al curso de Coreano Estructural ($9.990/mes).")
                  },
                  {
                    name: 'Español para Expats',
                    price: '$9.990/mes',
                    route: 'Inmersión local / Chilenismos',
                    freq: 'Flexible (Meet)',
                    link: waLink("Hola! Quiero inscribirme al curso de Español para Expats ($9.990/mes).")
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-display font-bold text-sm text-white uppercase tracking-tight">
                      {row.name}
                    </td>
                    <td className="p-6">
                      <span className="font-display font-extrabold text-base text-[#D7E400]">{row.price}</span>
                      <span className="text-white/40 text-[9px] uppercase tracking-widest ml-1">Matrícula $0</span>
                    </td>
                    <td className="p-6 text-xs text-white/70 font-semibold">{row.route}</td>
                    <td className="p-6 text-xs text-white/55">{row.freq}</td>
                    <td className="p-6">
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#D7E400] hover:bg-white text-[#071D49] rounded-xl font-display font-extrabold text-[10px] uppercase tracking-widest transition-all duration-300 active:scale-95"
                      >
                        Inscribirme
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div {...fadeUp(0.35)} className="text-white/45 text-xs">
            Todos los cursos se realizan de forma 100% online con profesores reales. Consulta por precios de clases 1 a 1 personalizadas.
          </motion.div>
        </div>
      </section>

    </div>
  );
}
