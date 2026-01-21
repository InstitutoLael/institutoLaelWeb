import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
  FaCheck, FaGlobeAmericas, FaPlaneDeparture, FaPassport, FaHeadphones,
  FaWhatsapp, FaArrowRight, FaStar, FaLock, FaUsers, FaCertificate, FaVideo,
  FaTimes, FaMicrophoneAlt, FaLaptopHouse, FaBriefcase, FaGraduationCap
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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">

      {/* ──────────────── 1. CINEMATIC HERO ──────────────── */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0" />

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
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
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
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Olvídate de repetir como un robot. Nuestro método de <strong className="text-white">Inmersión Activa</strong> te
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
      <section className="py-12 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
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
                <stat.icon className="text-3xl text-blue-500 mb-1" />
                <strong className="text-2xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{stat.val}</strong>
                <span className="text-sm text-slate-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 3. THE PROBLEM (APPS VS REALITY) ──────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Por qué las Apps no funcionan?</h2>
            <p className="text-xl text-slate-400">Jugar con un búho verde es divertido, pero no te enseña a sobrevivir una entrevista de trabajo o una emergencia médica.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-red-500/30 hover:bg-slate-800/50 transition-all group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 4. INTERACTIVE BUILDER ──────────────── */}
      <section id="lang-builder" className="py-24 bg-slate-900 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold tracking-widest text-sm uppercase mb-3 block">Tu viaje comienza aquí</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Diseña tu Plan de Estudios</h2>
            <p className="text-slate-400 text-lg">Selecciona los idiomas que te interesan. Activa el <strong className="text-white">Plan Políglota</strong> eligiendo 2 o más.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT: LANGUAGE CARDS */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedIds.includes(lang.id);
                const isComingSoon = lang.comingSoon;

                return (
                  <motion.div
                    key={lang.id}
                    whileHover={!isComingSoon ? { y: -5, borderColor: lang.color } : {}}
                    onClick={() => toggleLanguage(lang.id, isComingSoon)}
                    className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden group
                      ${isSelected ? 'bg-slate-800/80' : 'bg-slate-950/50'}
                      ${isComingSoon ? 'border-slate-800 opacity-60 cursor-default border-dashed' : isSelected ? 'border-transparent ring-2 ring-offset-2 ring-offset-slate-900' : 'border-slate-800 hover:bg-slate-800/50'}
                    `}
                    style={{ '--ring-color': lang.color, boxShadow: isSelected ? `0 0 0 2px ${lang.color}` : 'none' }}
                  >
                    {/* Badge */}
                    {lang.badge && (
                      <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-black rounded-bl-xl" style={{ backgroundColor: lang.color }}>
                        {lang.badge}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl filter drop-shadow-lg">{lang.emoji}</span>
                      <div>
                        <h4 className="text-xl font-bold group-hover:text-white transition-colors">{lang.name}</h4>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {isComingSoon ? 'Lista de Espera' : 'Inscripción Abierta'}
                        </span>
                      </div>
                      <div className="ml-auto">
                        {isComingSoon ? <FaLock className="text-slate-600" /> : (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-white border-white text-black' : 'border-slate-600'}`}>
                            {isSelected && <FaCheck className="text-xs" />}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">{lang.summary}</p>

                    {!isComingSoon && (
                      <div className="flex gap-2 flex-wrap">
                        {lang.levels.slice(0, 2).map((l, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-300 border border-slate-600/50">
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
                className="bg-slate-800 rounded-3xl p-1 shadow-2xl border border-slate-700"
              >
                <div className="bg-slate-950 rounded-[20px] p-6 border border-slate-800/50">
                  <div className="flex items-center justify-center gap-2 mb-6 pb-6 border-b border-slate-800">
                    <FaPassport className="text-blue-400" />
                    <h3 className="font-bold text-lg tracking-wide uppercase">Resumen de Pasaporte</h3>
                  </div>

                  {selectedIds.length === 0 ? (
                    <div className="text-center py-8 text-slate-600 italic">
                      <div className="text-4xl mb-4 opacity-50">👈</div>
                      <p>Selecciona tu destino <br /> en el mapa</p>
                    </div>
                  ) : (
                    <ul className="space-y-3 mb-6">
                      {selectedIds.map(id => {
                        const l = LANGUAGES.find(s => s.id === id);
                        return (
                          <li key={id} className="flex items-center gap-3 text-sm text-slate-300">
                            <span>{l.emoji}</span>
                            <span>{l.name}</span>
                            <FaCheck className="ml-auto text-green-500 text-xs" />
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  <div className="space-y-4 mb-8">
                    {pricing.saving > 0 && (
                      <div className="bg-green-500/10 text-green-400 text-center py-2 rounded-lg text-sm font-bold border border-green-500/20">
                        🎉 ¡Ahorras {clp(pricing.saving)} al mes!
                      </div>
                    )}

                    <div className="flex justify-between items-end">
                      <span className="text-slate-400">Mensualidad</span>
                      <strong className="text-3xl font-bold bg-white text-transparent bg-clip-text">
                        {clp(pricing.totalMonthly)}
                      </strong>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 border-t border-slate-800 pt-3">
                      <span>Matrícula anual única</span>
                      <span>{clp(pricing.enrollment)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddBundle}
                    disabled={pricing.count === 0}
                    className="w-full py-4 bg-white hover:bg-blue-50 text-slate-900 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-white/20 hover:-translate-y-1"
                  >
                    {pricing.count === 0 ? 'Elige Idiomas' : 'INSCRIBIR AHORA'}
                  </button>

                  <div className="mt-6 p-4 bg-slate-900 rounded-xl text-xs space-y-2 border border-slate-800">
                    <p className="font-bold text-slate-300">💡 Tip de Ahorro:</p>
                    <div className={`flex justify-between ${pricing.count === 1 ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>
                      <span>1 Idioma</span>
                      <span>$17.990</span>
                    </div>
                    <div className={`flex justify-between ${pricing.count === 2 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                      <span>2 Idiomas</span>
                      <span>$32.990 (-10%)</span>
                    </div>
                    <div className={`flex justify-between ${pricing.count >= 3 ? 'text-green-400 font-bold' : 'text-slate-500'}`}>
                      <span>3+ Idiomas</span>
                      <span>$45.990 (Dosis)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. SYLLABUS TABS ──────────────── */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="order-2 lg:order-1">
              <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-2 block">Metodología</span>
              <h2 className="text-4xl font-bold mb-6">¿Qué vas a aprender?</h2>
              <p className="text-slate-400 mb-8 text-lg">Nuestro plan de estudios práctico se adapta a situaciones reales, no a libros de texto obsoletos.</p>

              <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
                {Object.keys(SYLLABUS_PREVIEW).map(key => {
                  const lang = LANGUAGES.find(l => l.id === key);
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full border border-slate-800 transition-all font-medium whitespace-nowrap
                        ${isActive ? 'bg-slate-800 text-white shadow-lg' : 'bg-transparent text-slate-500 hover:text-white'}
                      `}
                      style={isActive ? { borderColor: lang.color } : {}}
                    >
                      <span>{lang.emoji}</span> {lang.name}
                    </button>
                  )
                })}
              </div>

              <div className="space-y-6">
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
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Lael vs. El Mercado</h2>
            <p className="text-slate-400">Comparar es de sabios.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-800">
                  <th className="text-left py-6 text-slate-400 font-medium uppercase text-sm">Característica</th>
                  <th className="text-left py-6 text-blue-400 font-bold uppercase text-lg">Instituto Lael</th>
                  <th className="text-left py-6 text-slate-500 font-medium uppercase text-sm">Apps (Duolingo)</th>
                  <th className="text-left py-6 text-slate-500 font-medium uppercase text-sm">Institutos Tradicionales</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-6 font-semibold text-white">{row.feature}</td>
                    <td className="py-6 font-bold text-white relative">
                      <div className="absolute inset-0 bg-blue-500/5 -z-10 w-full h-full left-0 mx-0"></div>
                      {row.lael === true ? <FaCheck className="text-green-400 text-xl" /> : row.lael}
                    </td>
                    <td className="py-6 text-slate-400">
                      {row.app === false ? <FaTimes className="text-red-500/50 text-xl" /> : row.app}
                    </td>
                    <td className="py-6 text-slate-400">
                      {row.institute === true ? <FaCheck className="text-green-500/50" /> : row.institute}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── 7. TEAM SENSEI ──────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Conoce a tus Guías</h2>
            <p className="text-slate-400">Hablantes nativos y expertos lingüistas apasionados por enseñar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEACHERS_LIST.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex items-start gap-4 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-3xl shrink-0">
                  {t.img}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-bold text-white">{t.name}</h4>
                    <span className="text-sm opacity-50 grayscale">{t.origin}</span>
                  </div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 block">{t.role}</span>
                  <p className="text-slate-400 text-sm leading-relaxed">{t.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 8. FINAL CTA ──────────────── */}
      <footer className="py-32 bg-gradient-to-t from-slate-900 to-slate-950 text-center relative overflow-hidden">
        {/* Decorative Plane */}
        <MdOutlineFlightTakeoff className="absolute top-20 left-[10%] text-slate-800 text-9xl -rotate-12 opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            El mundo es demasiado grande para hablar un solo idioma.
          </h2>
          <p className="text-xl text-blue-200/60 mb-12 max-w-2xl mx-auto">
            Únete a más de 800 alumnos que ya están expandiendo sus fronteras con Instituto Lael.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={scrollToBuilder}
              className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              EMPEZAR MI VIAJE
            </button>
            <a
              href="https://wa.me/56964626568"
              className="px-10 py-5 bg-transparent border-2 border-[#25D366] text-[#25D366] rounded-full font-bold text-lg hover:bg-[#25D366] hover:text-black transition-all flex items-center gap-2"
            >
              <FaWhatsapp /> Hablar con Asesor
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
            className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-50 py-4"
          >
            <div className="container mx-auto px-6 flex justify-between items-center">
              <div className="hidden md:block">
                <span className="text-slate-400 text-sm block">Tu Selección:</span>
                <strong className="text-white text-lg">{pricing.label}</strong>
              </div>
              <div className="flex items-center gap-6 ml-auto md:ml-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white leading-none">{clp(pricing.totalMonthly)}</div>
                  <span className="text-xs text-slate-500">/mes</span>
                </div>
                <button
                  onClick={handleAddBundle}
                  disabled={pricing.count === 0}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  INSCRIBIR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}