import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";
import { teachers } from "../data/teachers.js";

// Components
import LanguagePlacementQuiz from "../components/LanguagePlacementQuiz.jsx";
import VisualRoadmap from "../components/VisualRoadmap.jsx";

const IDIOMAS_ROADMAP = [
  { title: "Diagnóstico", desc: "Test de nivelación y objetivos.", subinfo: "Día 1", icon: <FaInfoCircle /> },
  { title: "Inmersión", desc: "Clases 100% interactivas.", subinfo: "Semana 1+", icon: <FaGlobe /> },
  { title: "Conversación", desc: "Storytelling y role-play.", subinfo: "Día 15+", icon: <FaUsers /> },
  { title: "Fluidez", desc: "Dominio de estructuras reales.", subinfo: "Mes 3+", icon: <FaBolt /> },
  { title: "Certificación", desc: "Preparación para exámenes intl.", subinfo: "Logro", icon: <FaTrophy /> },
];
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
  FaCheck, FaGlobeAmericas, FaPlaneDeparture, FaPassport, FaHeadphones,
  FaWhatsapp, FaArrowRight, FaStar, FaLock, FaUsers, FaCertificate, FaVideo,
  FaTimes, FaMicrophoneAlt, FaLaptopHouse, FaBriefcase, FaGraduationCap,
  FaInfoCircle, FaGlobe, FaBolt, FaTrophy
} from "react-icons/fa";
import { BiWorld, BiConversation, BiBuildings, BiCoffeeTogo, BiStats } from "react-icons/bi";
import { MdTranslate, MdOutlineFlightTakeoff, MdQuiz, MdOutlineSupportAgent } from "react-icons/md";
import { IoIosInfinite } from "react-icons/io";

// DATA
import {
  LANGUAGES,
  LANG_FEATURES,
  SYLLABUS_PREVIEW,
  COMPARISON_DATA,
  TEACHERS_LIST,
  computeLangBundle,
  clp
} from "../data/idiomas.js";

// ANIMATIONS
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Idiomas() {
  const { addToCart, openCart } = useCart();

  // --- STATES ---
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computeLangBundle(0));
  const [activeTab, setActiveTab] = useState("ingles");
  const [showSticky, setShowSticky] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    setPricing(computeLangBundle(selectedIds.length));
  }, [selectedIds]);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const toggleLanguage = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAddBundle = () => {
    if (selectedIds.length === 0) {
      document.getElementById('lang-builder')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const names = selectedIds.map(id => LANGUAGES.find(l => l.id === id).name).join(" + ");
    addToCart({
      id: `lang-bundle-${selectedIds.join('-')}`,
      title: pricing.label,
      price: pricing.totalMonthly,
      detail: names,
      type: 'plan'
    });
    openCart();
  };

  const scrollToBuilder = () => {
    document.getElementById('lang-builder').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">

      {/* ──────────────── 1. CINEMATIC HERO ──────────────── */}
      <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)] pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 mix-blend-overlay" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-full text-sm font-medium text-blue-300 mb-8"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            Matrículas Abiertas 2026
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight uppercase"
          >
            No estudies idiomas.<br />
            <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Vive la cultura.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Olvídate de repetir como un robot. Nuestro método de <strong className="text-white font-black uppercase tracking-tight">Inmersión Activa</strong> te
            prepara para hablar, trabajar y desenvolverte en el mundo real desde el primer mes.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToBuilder}
              className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all"
            >
              <FaPassport /> Obtener mi Pasaporte
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:border-white/30 transition-all"
            >
              <FaVideo /> Ver Clase de Prueba
            </motion.button>
          </motion.div>

          {/* Social Proof Flags */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-4">
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Comunidad Global de Aprendizaje</p>
            <div className="flex gap-4 flex-wrap justify-center">
              {['🇺🇸 English', '🇰🇷 한국어', '🇨🇱 Español', '🇯🇵 日本語'].map((flag, idx) => (
                <span key={idx} className={`px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-semibold ${idx === 3 ? 'opacity-50' : ''}`}>
                  {flag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ──────────────── 2. STATS BAR ──────────────── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02] backdrop-blur-3xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BiWorld, val: "100%", label: "Clases en Vivo" },
              { icon: IoIosInfinite, val: "Ilimitado", label: "Acceso a material" },
              { icon: FaUsers, val: "+800", label: "Alumnos Activos" },
              { icon: FaStar, val: "4.9/5", label: "Valoración Alumnos" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <stat.icon className="text-4xl text-blue-500 mb-2" />
                <strong className="text-3xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent tracking-tighter">{stat.val}</strong>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── VISUAL ROADMAP: TRAVESÍA GLOBAL ──────────────── */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <VisualRoadmap steps={IDIOMAS_ROADMAP} title="Travesía hacia la Fluidez" color="emerald" />
        </div>
      </section>

      {/* ──────────────── LANGUAGE PLACEMENT QUIZ ──────────────── */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <LanguagePlacementQuiz />
        </div>
      </section>

      {/* ──────────────── 3. THE PROBLEM (APPS VS REALITY) ──────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#050505]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">¿Por qué las <span className="text-red-500">Apps</span> no funcionan?</h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">Jugar con un búho verde es divertido, pero no te enseña a sobrevivir una entrevista de trabajo o una emergencia médica.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "🦜", title: "Frases sin contexto", desc: "\"El gato bebe leche\". Bien, pero ¿cómo preguntas direcciones o pides ayuda médica?" },
              { icon: "🤖", title: "Audio Robótico", desc: "Acostumbras tu oído a una IA perfecta. En la vida real, la gente habla rápido, con acentos y jerga." },
              { icon: "😶", title: "Miedo a Hablar", desc: "Puedes leer muy bien, pero te congelas cuando alguien te saluda. Falta práctica real." }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-12 hover:border-red-500/30 hover:bg-white/[0.04] transition-all group backdrop-blur-3xl"
              >
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">{card.icon}</div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 4. INTERACTIVE BUILDER ──────────────── */}
      <section id="lang-builder" className="py-32 bg-[#050505] relative border-t border-white/5">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">Tu viaje comienza aquí</span>
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Diseña tu Plan de <span className="text-blue-500">Estudios</span></h2>
            <p className="text-slate-400 text-xl font-light">Selecciona los idiomas que te interesan. Activa el <strong className="text-white font-black uppercase tracking-tight">Plan Políglota</strong> eligiendo 2 o más.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT: LANGUAGE CARDS */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedIds.includes(lang.id);
                const isComingSoon = lang.comingSoon;

                return (
                  <motion.div
                    key={lang.id}
                    whileHover={!isComingSoon ? { y: -8, scale: 1.02 } : {}}
                    onClick={() => toggleLanguage(lang.id, isComingSoon)}
                    className={`relative p-10 rounded-[2.5rem] border-2 transition-all cursor-pointer overflow-hidden group backdrop-blur-3xl
                      ${isSelected ? 'bg-white/[0.05]' : 'bg-white/[0.02]'}
                      ${isComingSoon ? 'border-white/5 opacity-50 cursor-default border-dashed' : isSelected ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.1)]' : 'border-white/5 hover:border-blue-500/30'}
                    `}
                  >
                    {/* Highlight Orb */}
                    {isSelected && (
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />
                    )}

                    {/* Badge */}
                    {lang.badge && (
                      <div className="absolute top-0 right-10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white rounded-b-xl shadow-lg" style={{ backgroundColor: lang.color }}>
                        {lang.badge}
                      </div>
                    )}

                    <div className="flex items-center gap-6 mb-8">
                      <span className="text-6xl filter drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500">{lang.emoji}</span>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors">{lang.name}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          {isComingSoon ? 'Lista de Espera' : 'Inscripción Abierta'}
                        </span>
                      </div>
                      <div className="ml-auto">
                        {isComingSoon ? <FaLock className="text-slate-700" /> : (
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/10'}`}>
                            {isSelected && <FaCheck className="text-sm" />}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">{lang.summary}</p>

                    {!isComingSoon && (
                      <div className="flex gap-3 flex-wrap">
                        {lang.levels.slice(0, 2).map((l, i) => (
                          <span key={i} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/5">
                            {l}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* RIGHT: FLOATING TICKET */}
            <div className="lg:col-span-4 sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] p-12 border border-white/5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-10 pb-10 border-b border-white/5">
                    <FaPassport className="text-blue-500 text-2xl" />
                    <h3 className="font-black text-xl tracking-tighter uppercase text-white">Boarding Pass</h3>
                  </div>

                  {selectedIds.length === 0 ? (
                    <div className="text-center py-12 text-slate-600 italic">
                      <div className="text-6xl mb-6 opacity-20">🌍</div>
                      <p className="font-medium text-sm">Selecciona tu próximo <br /> destino en el mapa</p>
                    </div>
                  ) : (
                    <ul className="space-y-4 mb-10">
                      {selectedIds.map(id => {
                        const l = LANGUAGES.find(s => s.id === id);
                        return (
                          <li key={id} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                            <span className="text-2xl grayscale group-hover:grayscale-0">{l.emoji}</span>
                            <span>{l.name}</span>
                            <FaCheck className="ml-auto text-blue-500" />
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  <div className="space-y-6 mb-12">
                    {pricing.saving > 0 && (
                      <div className="bg-blue-500/10 text-blue-400 text-center py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                        🎉 Pack Políglota: -{clp(pricing.saving)}
                      </div>
                    )}

                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inversión Mensual</span>
                      <strong className="text-4xl font-black text-white tracking-tighter">
                        {clp(pricing.totalMonthly)}
                      </strong>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 border-t border-white/5 pt-6">
                      <span>Matrícula única</span>
                      <span>{clp(pricing.enrollment)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddBundle}
                    disabled={pricing.count === 0}
                    className="w-full py-6 bg-white hover:bg-blue-50 text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-[1.5rem] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl shadow-white/10"
                  >
                    {pricing.count === 0 ? 'Elige tus Idiomas' : 'Confirmar Inscripción'}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. SYLLABUS TABS ──────────────── */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            <div className="order-2 lg:order-1">
              <span className="text-blue-500 font-black tracking-widest text-[10px] uppercase mb-4 block">Metodología de Alto Impacto</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">¿Qué vas a <span className="text-blue-500">dominar?</span></h2>
              <p className="text-xl text-slate-400 mb-10 font-light leading-relaxed">Nuestro plan de estudios práctico se adapta a situaciones reales, no a libros de texto obsoletos.</p>

              <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                {Object.keys(SYLLABUS_PREVIEW).map(key => {
                  const lang = LANGUAGES.find(l => l.id === key);
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center gap-3 px-8 py-3 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-[10px] whitespace-nowrap
                        ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-600/20' : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-white hover:border-white/10'}
                      `}
                    >
                      <span className="text-xl grayscale group-hover:grayscale-0">{lang.emoji}</span> {lang.name}
                    </button>
                  )
                })}
              </div>

              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {SYLLABUS_PREVIEW[activeTab]?.map((level, i) => (
                      <div key={i} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">{level.level}</span>
                          <div className="h-px bg-slate-800 flex-1"></div>
                        </div>
                        <ul className="space-y-3 pl-2">
                          {level.topics.map((t, j) => (
                            <li key={j} className="flex gap-3 text-slate-300">
                              <FaCheck className="mt-1 text-green-500 text-xs shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="order-1 lg:order-2 perspective-1000">
              <motion.div
                animate={{ rotateY: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-2xl relative"
              >
                {/* Mockup UI */}
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-slate-950 rounded-xl mt-8 aspect-video flex flex-col items-center justify-center relative overflow-hidden group border border-slate-800/50">
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded animate-pulse">En Vivo</span>
                  <FaVideo className="text-6xl text-slate-800 group-hover:text-slate-700 transition-colors" />
                  <p className="mt-4 text-slate-600 font-mono">Roleplay: "At the Airport"</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="h-10 bg-slate-800 rounded-lg flex items-center justify-center gap-2 text-slate-500 text-sm hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                    <FaMicrophoneAlt /> Practicar
                  </div>
                  <div className="h-10 bg-slate-800 rounded-lg flex items-center justify-center gap-2 text-slate-500 text-sm hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                    <MdQuiz /> Quiz
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────── 6. COMPARISON TABLE ──────────────── */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Lael vs. <span className="text-blue-500">El Mercado</span></h2>
            <p className="text-xl text-slate-500 font-light mt-4">Comparar es de sabios. Transparencia total.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse bg-white/[0.01] rounded-[2.5rem] overflow-hidden">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="text-left p-10 text-slate-500 font-black uppercase tracking-widest text-[10px]">Característica</th>
                  <th className="text-left p-10 text-blue-500 font-black uppercase tracking-widest text-xs">Instituto Lael</th>
                  <th className="text-left p-10 text-slate-600 font-black uppercase tracking-widest text-[10px]">Apps (Duolingo)</th>
                  <th className="text-left p-10 text-slate-600 font-black uppercase tracking-widest text-[10px]">Institutos Tradicionales</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-10 font-black uppercase tracking-tight text-white text-sm">{row.feature}</td>
                    <td className="p-10 font-bold text-white relative">
                      <div className="absolute inset-0 bg-blue-500/5 -z-10 w-full h-full left-0 mx-0"></div>
                      {row.lael === true ? <FaCheck className="text-blue-400 text-xl" /> : row.lael}
                    </td>
                    <td className="p-10 text-slate-500 font-medium">
                      {row.app === false ? <FaTimes className="text-red-500/20 text-xl" /> : row.app}
                    </td>
                    <td className="p-10 text-slate-500 font-medium">
                      {row.institute === true ? <FaCheck className="text-white/20" /> : row.institute}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── 7. TEAM SENSEI ──────────────── */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Conoce a tus <span className="text-blue-500">Guías</span></h2>
            <p className="text-xl text-slate-400 font-light">Hablantes nativos y expertos lingüistas apasionados por enseñar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TEACHERS_LIST.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] flex flex-col items-center text-center gap-8 hover:border-blue-500/50 transition-all backdrop-blur-3xl group"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 group-hover:scale-110 shadow-2xl">
                  {t.img}
                </div>
                <div>
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight">{t.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">{t.role}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6 italic">"{t.bio}"</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Origen: {t.origin}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 8. FINAL CTA ──────────────── */}
      <footer className="py-40 bg-[#050505] text-center relative overflow-hidden">
        {/* Decorative Plane */}
        <MdOutlineFlightTakeoff className="absolute top-20 left-[10%] text-white/5 text-[15rem] -rotate-12 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_#1e1b4b_0%,_transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">
            El mundo es <br /> <span className="text-blue-500">demasiado grande</span> <br /> para un solo idioma.
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Únete a más de 800 alumnos que ya están expandiendo sus fronteras con Instituto Lael.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={scrollToBuilder}
              className="px-12 py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-white/10"
            >
              EMPEZAR MI VIAJE
            </button>
            <a
              href="https://wa.me/56964626568"
              target="_blank" rel="noopener noreferrer"
              className="px-12 py-6 bg-white/[0.02] border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/[0.05] transition-all flex items-center justify-center gap-3"
            >
              <FaWhatsapp className="text-[#25D366] text-lg" /> Hablar con Asesor
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────── STICKY BAR ──────────────── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-t border-white/5 z-50 py-6"
          >
            <div className="container mx-auto px-8 flex justify-between items-center">
              <div>
                <strong className="text-blue-500 font-black uppercase tracking-widest text-xs block mb-1">Pasaporte Cultural</strong>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{pricing.label}</span>
              </div>
              <div className="flex items-center gap-10">
                <div className="text-right hidden sm:block">
                  <div className="text-2xl font-black text-white tracking-tighter">{clp(pricing.totalMonthly)}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">/mes</span>
                </div>
                <button
                  onClick={handleAddBundle}
                  disabled={pricing.count === 0}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-2xl shadow-blue-600/20 disabled:opacity-30"
                >
                  Inscribir Ahora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}