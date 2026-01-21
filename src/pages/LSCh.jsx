import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
   FaSignLanguage, FaHandsHelping, FaUniversalAccess, FaUserGraduate,
   FaChurch, FaVideo, FaWhatsapp, FaCheck, FaStar, FaAward, FaBuilding,
   FaUsers, FaLaptopHouse, FaRegLightbulb, FaBookReader, FaInfoCircle
} from "react-icons/fa";
import {
   MdOutlineHearingDisabled, MdRecordVoiceOver, MdOutlinePsychology,
   MdSchool, MdWorkspacePremium, MdGTranslate
} from "react-icons/md";
import { BiWorld, BiBody, BiHappyBeaming } from "react-icons/bi";
import { IoIosInfinite, IoMdCheckmarkCircleOutline } from "react-icons/io";

// DATA
import {
   LSCH_MODULES,
   LSCH_GROUP_PLANS,
   LSCH_ONE2ONE_PLANS,
   LSCH_WHY_US,
   TEACHER_PROFILE,
   COMPARISON_DATA,
   ENROLLMENT_FEE,
   CHURCH_PRICE,
   calculateLschPrice,
   clp
} from "../data/lsch.js";

// ANIMATIONS
const fadeIn = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
   visible: { transition: { staggerChildren: 0.1 } }
};

export default function Lsch() {
   const { addToCart, openCart } = useCart();

   // STATES
   const [activeModule, setActiveModule] = useState(0);
   const [planType, setPlanType] = useState("group"); // 'group' | 'one2one'
   const [isChurch, setIsChurch] = useState(false);
   const [showSticky, setShowSticky] = useState(false);

   // SCROLL LISTENER
   useEffect(() => {
      const handleScroll = () => setShowSticky(window.scrollY > 900);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // CART HANDLER
   const handleEnroll = (planId) => {
      const calc = calculateLschPrice(planId, isChurch);
      const cartId = `lsch-${planId}-${isChurch ? 'church' : 'std'}`;

      addToCart({
         id: cartId,
         title: isChurch ? `LSCh Social: ${calc.label}` : `LSCh: ${calc.label}`,
         price: calc.price,
         detail: isChurch ? 'Convenio Iglesia/Social' : (planId.includes('quarter') ? 'Plan Trimestral' : 'Plan Mensual'),
         type: 'course',
         extraInfo: calc.enrollment > 0 ? `+ Matrícula ${clp(calc.enrollment)}` : 'Matrícula Gratis'
      });
      openCart();
   };

   const scrollToPricing = () => {
      document.getElementById("pricing-anchor").scrollIntoView({ behavior: "smooth" });
   };

   return (
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">

         {/* ──────────────── 1. HERO SECTION ──────────────── */}
         <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6">
            {/* Background - Deep Ocean Vibe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#164e63_0%,#080a0f_60%)] z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] z-0" />

            <div className="relative z-10 max-w-4xl text-center">
               <motion.div
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="inline-flex items-center gap-2 bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm"
               >
                  <FaUniversalAccess className="animate-pulse" /> Admisión Abierta 2026
               </motion.div>

               <motion.h1
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
               >
                  Rompe la barrera del <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                     Sonido.
                     <span className="absolute inset-0 blur-2xl opacity-50 bg-cyan-400 -z-10"></span>
                  </span>
               </motion.h1>

               <motion.p
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
               >
                  Aprende <strong>Lengua de Señas Chilena (LSCh)</strong> con Fernanda, nuestra educadora nativa.
                  Deja de usar "gestos" y empieza a comunicarte con gramática, cultura y respeto real.
               </motion.p>

               <motion.div
                  initial="hidden" animate="visible" variants={stagger}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
               >
                  <motion.button
                     variants={fadeIn}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToPricing}
                     className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                  >
                     <FaSignLanguage /> Ver Planes y Horarios
                  </motion.button>
                  <motion.button
                     variants={fadeIn}
                     whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                     whileTap={{ scale: 0.95 }}
                     className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full font-bold flex items-center justify-center gap-2 hover:border-white/30 transition-all"
                  >
                     <FaVideo /> Ver Clase de Muestra
                  </motion.button>
               </motion.div>

               <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-16 flex items-center justify-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
                  <div className="flex flex-col items-center">
                     <span className="text-2xl text-white block mb-1">+500</span>
                     Alumnos Certificados
                  </div>
                  <div className="w-px h-10 bg-slate-800"></div>
                  <div className="flex flex-col items-center">
                     <span className="text-2xl text-white block mb-1">Ley 21.015</span>
                     Cumplimiento Inclusión
                  </div>
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. IMPACT SECTION ──────────────── */}
         <section className="py-24 bg-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                  <div>
                     <h2 className="text-4xl font-bold mb-6 text-cyan-400">No es mímica.<br />Es un idioma completo.</h2>
                     <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                        Mucha gente cree que la lengua de señas es universal o que basta con mover las manos.
                        La realidad es que la LSCh tiene su propia sintaxis, gramática espacial y cultura.
                     </p>
                     <p className="text-lg text-slate-300 font-medium mb-8">
                        En el <strong>Instituto Lael</strong>, no solo aprendes vocabulario; aprendes a
                        <strong>pensar visualmente</strong>.
                     </p>
                     <ul className="space-y-4">
                        {[
                           "Abandona el 'español señado' (mal visto).",
                           "Domina la expresión facial (parte de la gramática).",
                           "Entiende la cultura sorda desde adentro."
                        ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-slate-300">
                              <FaCheck className="text-cyan-500 shrink-0" /> {item}
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="relative h-[400px] flex items-center justify-center">
                     {/* Floating Cards Animation */}
                     <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 bg-slate-800 border border-slate-700 p-6 rounded-2xl w-64 text-center shadow-2xl z-10"
                     >
                        <MdOutlineHearingDisabled className="text-5xl text-cyan-500 mx-auto mb-4" />
                        <strong className="text-lg block mb-1">Cultura Sorda</strong>
                        <span className="text-sm text-slate-400">Respeto e Identidad</span>
                     </motion.div>

                     <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-10 bg-slate-900 border border-slate-800 p-6 rounded-2xl w-64 text-center shadow-2xl z-20"
                     >
                        <FaHandsHelping className="text-5xl text-blue-500 mx-auto mb-4" />
                        <strong className="text-lg block mb-1">Inclusión Real</strong>
                        <span className="text-sm text-slate-400">Conexión Humana</span>
                     </motion.div>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 3. TEACHER SECTION ──────────────── */}
         <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-950">
            <div className="container mx-auto px-6">
               <div className="flex flex-col lg:flex-row gap-12 items-center">

                  <div className="flex-1 flex justify-center">
                     <div className="relative w-72 h-72 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-cyan-900 rounded-[3rem] rotate-3 transform"></div>
                        <div className="absolute inset-0 bg-slate-800 rounded-[3rem] -rotate-3 transform flex items-center justify-center border border-slate-700 shadow-2xl z-10 overflow-hidden">
                           <div className="text-9xl filter drop-shadow-lg">{TEACHER_PROFILE.img}</div>
                        </div>
                        {/* Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl rotate-3 z-20 flex items-center gap-2">
                           <FaAward className="text-yellow-500" /> Educadora Titulada
                        </div>
                     </div>
                  </div>

                  <div className="flex-1">
                     <span className="text-cyan-500 font-bold tracking-widest text-sm uppercase mb-2 block">Tu Instructora</span>
                     <h2 className="text-4xl md:text-5xl font-bold mb-6">Conoce a {TEACHER_PROFILE.name}</h2>

                     <div className="flex gap-2 flex-wrap mb-8">
                        {TEACHER_PROFILE.badges.map((b, i) => (
                           <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs md:text-sm text-slate-300">
                              {b}
                           </span>
                        ))}
                     </div>

                     <div className="border-l-4 border-cyan-500 pl-6 mb-8">
                        <p className="text-lg text-slate-400 italic leading-relaxed">
                           "{TEACHER_PROFILE.bio}"
                        </p>
                     </div>

                     <div className="flex gap-8">
                        <div>
                           <strong className="text-3xl font-bold text-white block">100%</strong>
                           <span className="text-slate-500 text-sm uppercase">Nativa</span>
                        </div>
                        <div>
                           <strong className="text-3xl font-bold text-white block">5+</strong>
                           <span className="text-slate-500 text-sm uppercase">Años Enseñando</span>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 4. SYLLABUS UI ──────────────── */}
         <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Malla Curricular</h2>
                  <p className="text-slate-400">Un viaje estructurado desde lo básico hasta la fluidez profesional.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                  {/* Navigation (Left 1/3) */}
                  <div className="flex flex-col gap-4">
                     {LSCH_MODULES.map((mod, idx) => (
                        <button
                           key={mod.id}
                           onClick={() => setActiveModule(idx)}
                           className={`text-left p-6 rounded-2xl border transition-all flex items-center gap-4 group
                        ${activeModule === idx
                                 ? 'bg-cyan-900/20 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                                 : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                              }
                      `}
                        >
                           <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{mod.icon}</span>
                           <div>
                              <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${activeModule === idx ? 'text-cyan-400' : 'text-slate-500'}`}>{mod.tag}</span>
                              <strong className={`block text-lg ${activeModule === idx ? 'text-white' : 'text-slate-400'}`}>{mod.name}</strong>
                           </div>
                        </button>
                     ))}
                  </div>

                  {/* Content Display (Right 2/3) */}
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeModule}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.4 }}
                        >
                           <div className="flex items-start justify-between mb-6">
                              <h3 className="text-3xl font-bold text-white">{LSCH_MODULES[activeModule].name}</h3>
                              <span className="bg-slate-800 text-slate-300 px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap border border-slate-700">
                                 ⏳ {LSCH_MODULES[activeModule].duration}
                              </span>
                           </div>

                           <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                              {LSCH_MODULES[activeModule].desc}
                           </p>

                           <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50">
                              <h4 className="flex items-center gap-2 text-cyan-400 font-bold mb-4">
                                 <BiBody className="text-xl" /> Resultados de Aprendizaje:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {LSCH_MODULES[activeModule].outcomes.map((out, i) => (
                                    <div key={i} className="flex gap-3 text-slate-300 text-sm">
                                       <IoMdCheckmarkCircleOutline className="text-cyan-500 mt-1 shrink-0" />
                                       {out}
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="mt-8 flex items-center gap-2 text-slate-500 text-sm">
                              <FaInfoCircle /> Certificación disponible al completar este nivel.
                           </div>

                        </motion.div>
                     </AnimatePresence>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 5. COMPARISON TABLE ──────────────── */}
         <section className="py-24 bg-black">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl font-bold mb-12 text-center text-slate-200">¿Por qué Lael es diferente?</h2>
               <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                     <thead>
                        <tr>
                           <th className="text-left py-4 border-b-2 border-slate-800 text-slate-500 uppercase text-xs font-bold w-1/3">Característica</th>
                           <th className="text-left py-4 border-b-2 border-cyan-500/30 text-cyan-400 uppercase text-xs font-bold w-1/3 bg-cyan-900/10 px-4">Instituto Lael</th>
                           <th className="text-left py-4 border-b-2 border-slate-800 text-slate-500 uppercase text-xs font-bold w-1/3 px-4">Otros Cursos</th>
                        </tr>
                     </thead>
                     <tbody>
                        {COMPARISON_DATA.map((row, i) => (
                           <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors group">
                              <td className="py-5 font-bold text-slate-300 group-hover:text-white transition-colors">{row.feature}</td>
                              <td className="py-5 font-medium text-cyan-100 bg-cyan-900/5 px-4 flex items-center gap-2">
                                 <FaCheck className="text-cyan-500" /> {row.us}
                              </td>
                              <td className="py-5 text-slate-500 px-4">{row.others}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </section>

         {/* ──────────────── 6. PRICING SECTION ──────────────── */}
         <section id="pricing-anchor" className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-6 relative z-10">
               <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-4xl font-bold mb-4">Elige tu modalidad</h2>
                  <p className="text-slate-400">Clases en vivo, acceso a grabaciones y material digital incluido.</p>
               </div>

               {/* CONTROLS */}
               <div className="flex flex-col items-center gap-6 mb-16">
                  <div className="bg-slate-900 p-1 rounded-full border border-slate-800 flex shadow-lg">
                     <button
                        onClick={() => { setPlanType('group'); setIsChurch(false); }}
                        className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${planType === 'group' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                     >
                        <FaUsers /> Clases Grupales
                     </button>
                     <button
                        onClick={() => { setPlanType('one2one'); setIsChurch(false); }}
                        className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${planType === 'one2one' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                     >
                        <FaUserGraduate /> Personalizado (1 a 1)
                     </button>
                  </div>

                  {planType === 'group' && (
                     <div
                        onClick={() => setIsChurch(!isChurch)}
                        className={`cursor-pointer border px-4 py-2 rounded-lg flex items-center gap-3 transition-all select-none
                  ${isChurch ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700'}
                `}
                     >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isChurch ? 'bg-purple-500 border-purple-500 text-white' : 'border-slate-600'}`}>
                           {isChurch && <FaCheck className="text-xs" />}
                        </div>
                        <span className="text-sm font-medium">Soy de una <strong>Iglesia / Fundación</strong> (Tarifa Social)</span>
                     </div>
                  )}
               </div>

               {/* PLANS GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {isChurch ? (
                     <div className="md:col-span-2 max-w-md mx-auto w-full bg-slate-900 border-2 border-purple-500 rounded-3xl p-8 relative shadow-[0_0_50px_rgba(168,85,247,0.15)]">
                        <div className="absolute top-0 inset-x-0 h-1 bg-purple-500 mx-auto w-1/2 rounded-b-full shadow-[0_0_20px_#a855f7]"></div>
                        <div className="text-center mb-6">
                           <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-3xl mx-auto text-purple-400 mb-4">
                              <FaChurch />
                           </div>
                           <h3 className="text-2xl font-bold text-white mb-2">Convenio Social</h3>
                           <p className="text-purple-300 text-sm">Para iglesias, fundaciones y ONGs.</p>
                        </div>
                        <div className="text-center mb-8">
                           <span className="text-5xl font-black text-white tracking-tighter">{clp(CHURCH_PRICE)}</span>
                           <span className="text-slate-500 text-sm">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                           {[
                              "Matrícula Exonerada ($0)",
                              "Acceso completo a cursos grupales",
                              "Certificado de participación",
                              "Enfoque en Ministerio de Sordos"
                           ].map((f, i) => (
                              <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                 <FaCheck className="text-purple-500 shrink-0" /> {f}
                              </li>
                           ))}
                        </ul>
                        <button
                           onClick={() => handleEnroll('church-promo')}
                           className="w-full py-4 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg hover:shadow-purple-500/25"
                        >
                           Solicitar Cupo Social
                        </button>
                     </div>
                  ) : (
                     (planType === 'group' ? LSCH_GROUP_PLANS : LSCH_ONE2ONE_PLANS).map((plan) => (
                        <motion.div
                           key={plan.id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           className={`relative bg-slate-900 rounded-3xl p-8 border hover:border-cyan-500/50 transition-all flex flex-col group
                       ${plan.highlight ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-gradient-to-b from-slate-900 to-slate-950' : 'border-slate-800'}
                     `}
                        >
                           {plan.highlight && (
                              <div className="absolute top-0 right-0 bg-cyan-500 text-black text-xs font-bold px-4 py-1 rounded-bl-xl shadow-lg">
                                 {plan.badge}
                              </div>
                           )}

                           <div className="text-center mb-6">
                              <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                              <p className="text-sm text-slate-400 min-h-[40px]">{plan.desc}</p>
                           </div>

                           <div className="text-center mb-2">
                              <span className="text-4xl font-black text-white tracking-tighter block">{clp(plan.price)}</span>
                              <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">
                                 {planType === 'group' ? (plan.id === 'g-quarter' ? '/mes' : '/mes') : '/pack'}
                              </span>
                           </div>

                           {plan.totalPayment && (
                              <div className="text-center text-green-400 text-xs font-bold mb-6 bg-green-900/20 py-1 rounded-lg border border-green-900/50">
                                 Pago único de {clp(plan.totalPayment)}
                              </div>
                           )}
                           {!plan.totalPayment && <div className="mb-6"></div>}

                           <ul className="space-y-3 mb-8 flex-1">
                              {plan.features.map((f, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                    <FaCheck className="text-cyan-500 mt-1 shrink-0" />
                                    <span className="leading-tight">{f}</span>
                                 </li>
                              ))}
                           </ul>

                           {/* Enrollment Info */}
                           {planType === 'group' && (
                              plan.enrollmentWaived ? (
                                 <div className="mb-6 text-center text-green-400 text-xs font-bold p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                                    ¡Matrícula GRATIS! (Ahorras {clp(ENROLLMENT_FEE)})
                                 </div>
                              ) : (
                                 <div className="mb-6 text-center text-slate-500 text-xs p-2 bg-slate-800 border border-slate-700 rounded-lg">
                                    + {clp(ENROLLMENT_FEE)} Matrícula Anual
                                 </div>
                              )
                           )}

                           <button
                              onClick={() => handleEnroll(plan.id)}
                              className={`w-full py-3 rounded-xl font-bold transition-all
                         ${plan.highlight ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-lg' : 'bg-transparent border border-slate-600 text-white hover:border-cyan-400 hover:text-cyan-300'}
                       `}
                           >
                              {planType === 'group' ? 'Inscribirme' : 'Comprar Pack'}
                           </button>
                        </motion.div>
                     ))
                  )}
               </div>

               <p className="text-center mt-12 text-slate-500 text-sm">
                  * Todos los planes incluyen acceso al Campus Virtual, material PDF y grabaciones.
               </p>
            </div>
         </section>

         {/* ──────────────── 7. VALUES SECTION ──────────────── */}
         <section className="py-20 border-t border-slate-800 bg-slate-950">
            <div className="container mx-auto px-6">
               <h2 className="text-2xl font-bold mb-8 text-center text-slate-300">Compromiso LSCh Lael</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {LSCH_WHY_US.map((val, i) => (
                     <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                        <div className="text-3xl mb-4 text-cyan-600">
                           {i === 0 ? <BiWorld /> : i === 1 ? <FaBuilding /> : <FaAward />}
                        </div>
                        <h3 className="font-bold text-white mb-2">{val.title}</h3>
                        <p className="text-slate-400 text-sm">{val.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── STICKY BAR ──────────────── */}
         <AnimatePresence>
            {showSticky && (
               <motion.div
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 z-50 py-3"
               >
                  <div className="container mx-auto px-6 flex justify-between items-center">
                     <div>
                        <strong className="text-cyan-400 block text-sm md:text-base">LSCh con Fernanda</strong>
                        <span className="text-xs text-slate-500">{isChurch ? 'Tarifa Social Activa' : 'Matrículas 2026'}</span>
                     </div>
                     <button
                        onClick={scrollToPricing}
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-sm transition-colors"
                     >
                        Ver Precios
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
   );
}