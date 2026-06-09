import React from 'react';
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
import igPost2 from '../../assets/img/Home/media_ig_post_1780733562637.png';
import CertificateSection from '../../components/CertificateSection';

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

export default function LandingEspanol() {
  const WA_BASE = "https://wa.me/56964626568?text=";
  const waLink = (message) => `${WA_BASE}${encodeURIComponent(message)}`;

  const reasons = [
    {
      title: "Profesores nativos y especializados",
      desc: "Aprende de docentes chilenos con dominio nativo y amplia experiencia en la enseñanza de español como segunda lengua.",
      icon: <GraduationCap className="w-6 h-6 text-[#071D49]" />
    },
    {
      title: "Progresión por niveles",
      desc: "Estructura alineada al Marco Común Europeo (MCER) con metas de aprendizaje claras para tu inserción en el país.",
      icon: <Bookmark className="w-6 h-6 text-[#071D49]" />
    },
    {
      title: "Certificación Lael",
      desc: "Valida tus competencias comunicativas al finalizar cada nivel con una certificación formal de nuestra institución.",
      icon: <Award className="w-6 h-6 text-[#071D49]" />
    },
    {
      title: "Comunidad de práctica",
      desc: "Sesiones de conversación extra y grupos de interacción dinámica para que uses el español en contextos reales.",
      icon: <Users className="w-6 h-6 text-[#071D49]" />
    }
  ];

  return (
    <div className="w-full bg-[#F4F4F4] overflow-x-hidden font-sans">
      <Helmet>
        <title>Español para Extranjeros | Instituto Lael — Chile</title>
        <meta name="description" content="Domina el español y conéctate con Chile. Programa optimizado para hispanohablantes en el extranjero o extranjeros viviendo en el país. Inmersión práctica." />
      </Helmet>
      
      {/* ── 1. HERO ESPAÑOL ────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-24 px-6 overflow-hidden" style={{ backgroundColor: BLUE }}>
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
              PROGRAMA DE ESPAÑOL PARA EXPATS
            </span>
          </motion.div>

          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[1.05] uppercase mb-8 max-w-4xl"
          >
            Conéctate con Chile <br />
            a través del <span className="text-[#D7E400] italic font-normal">español.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Sin metodologías lentas. Domina modismos, chilenismos y desenvuélvete en el entorno profesional y social con total seguridad.
          </motion.p>

          <motion.div {...fadeUp(0.35)}>
            <button
              onClick={() => document.getElementById('detalles')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#D7E400] text-[#071D49] hover:bg-white hover:text-[#071D49] transition-all duration-300 font-display font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-2"
            >
              <span>CONOCER PROGRAMA</span>
              <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. DETALLES DEL PROGRAMA ────────────────────────────────── */}
      <section id="detalles" className="py-28 px-6 bg-white flex flex-col items-center border-b border-[#071D49]/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text and info */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6 bg-[#071D49] text-[#D7E400] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit">
              <Zap size={12} />
              <span>PROGRAMA DE INMERSIÓN</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase mb-6 leading-[1.05]">
              Español para Extranjeros
            </motion.h2>

            <motion.p {...fadeUp(0.2)} className="text-[#8D8D8D] text-lg mb-8 leading-relaxed max-w-xl">
              Optimizado para extranjeros viviendo en Chile o profesionales trabajando con equipos hispanohablantes. Aprende de forma práctica a navegar situaciones de negocios, reuniones sociales, modismos locales y cultura laboral del país.
            </motion.p>

            {/* Path visualization */}
            <motion.div {...fadeUp(0.3)} className="bg-[#F4F4F4] rounded-[24px] p-6 mb-8 max-w-xl border border-[#071D49]/5">
              <p className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Ruta Formativa de Inmersión</p>
              <div className="flex items-center justify-between">
                {['A1', 'A2', 'B1'].map((level, i, arr) => (
                  <React.Fragment key={level}>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#071D49] text-white flex items-center justify-center text-xs font-extrabold shadow-md">
                        {level}
                      </div>
                      <span className="text-[9px] font-bold text-[#8D8D8D] uppercase tracking-wider mt-1.5">
                        {level === 'B1' ? 'Dominio Expats' : `Nivel ${i+1}`}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-grow h-0.5 bg-[#071D49]/15 mx-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Price badge & Button */}
            <motion.div {...fadeUp(0.35)} className="mb-10">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div>
                  <span className="text-[#071D49] font-display font-extrabold text-4xl sm:text-5xl tracking-tight">$14.990</span>
                  <span className="text-[#8D8D8D] text-sm font-bold uppercase tracking-widest ml-1">/mes</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#071D49] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#D7E400]/30">
                    Matrícula $9.990
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#071D49]">
                    ✨ Trimestral: $11.990/mes
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
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
                  src={igPost2} 
                  alt="Instituto Lael Instagram Post" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* IG Footer/Actions */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] text-[#071D49] font-black uppercase tracking-wider bg-[#D7E400] px-2 py-0.5 rounded">Español</span>
                  <p className="text-[11px] font-bold text-[#071D49]">Destacado de la semana</p>
                </div>
                <p className="text-xs text-[#8D8D8D] leading-relaxed">
                  <span className="font-bold text-[#071D49] mr-2">institutolael</span>
                  Entiende los modismos locales de Chile y desenvuélvete con fluidez en entornos de trabajo. Método dinámico e interactivo.
                </p>
                <div className="mt-4 pt-3 border-t border-[#071D49]/5 flex justify-between items-center text-[10px] text-black/45 uppercase tracking-wider">
                  <span>hace 1 día</span>
                  <a 
                    href="https://forms.gle/H86nFAQ2DJ8CCQ7y6" 
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

      {/* ── 3. ¿POR QUÉ APRENDER ESPAÑOL CON LAEL? ───────────────── */}
      <section className="py-28 px-6 bg-[#F4F4F4] flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Metodología de Inserción</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              ¿POR QUÉ APRENDER CON LAEL?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, i) => (
              <motion.div 
                key={reason.title} 
                {...fadeUp(i * 0.08)}
                className="p-8 rounded-[32px] border border-[#071D49]/10 bg-white hover:border-[#D7E400]/40 hover:bg-[#F4F4F4]/20 transition-all duration-300 shadow-sm"
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

      {/* ── 4. CERTIFICADOS POR NIVEL ─────────────────────────────── */}
      <CertificateSection defaultLevel="B1" defaultLanguage="Español para Extranjeros" />

      {/* ── 5. CTA + PRICING ────────────────────────────────────────── */}
      <section className="relative py-28 px-6 bg-[#071D49] text-center overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <motion.p {...fadeUp(0)} className="text-[#D7E400] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Inversión Conveniente</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-white font-extrabold tracking-[-0.03em] uppercase mb-16">
            PROGRAMA & PRECIOS
          </motion.h2>

          <div className="max-w-md mx-auto rounded-[32px] p-8 border border-white/10 bg-[#0a265b] text-left relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-4xl" role="img" aria-label="Chile">🇨🇱</span>
              <span className="bg-[#D7E400] text-[#071D49] text-[10px] font-black uppercase px-2.5 py-1 rounded">
                Matrícula $9.990
              </span>
            </div>
            <h3 className="text-white font-display font-extrabold text-xl uppercase tracking-tight mb-4">
              Español para Extranjeros
            </h3>
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[#D7E400] font-display font-black text-4xl">$14.990</span>
                <span className="text-white/60 text-xs font-bold">/mes</span>
              </div>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">
                ✨ Trimestral: $11.990/mes (ahorra pagando 3 meses juntos)
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {['Dialectología y Modismos Chilenos', 'Entrevistas de Alto Rendimiento', 'Material de Quiebre Incluido', 'Comunidad y Soporte 24/7'].map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2 text-xs text-white/70">
                  <Check size={14} className="text-[#D7E400] flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#D7E400] hover:bg-white text-[#071D49] font-display font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl text-center transition-all duration-300 active:scale-95 shadow-md block"
            >
              Inscribirme
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
