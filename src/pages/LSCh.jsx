import React, { useState, useEffect } from "react";
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
   const [dbProducts, setDbProducts] = useState([]);
   const [loading, setLoading] = useState(true);

   // FETCH PRODUCTS
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const { data, error } = await supabase
               .from('products')
               .select('*')
               .eq('category', 'LSCH');
            if (error) throw error;
            setDbProducts(data || []);
         } catch (err) {
            console.error("Error fetching LSCh products:", err);
         } finally {
            setLoading(false);
         }
      };
      fetchProducts();
   }, []);

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

      // Match with DB product
      let matchName = "";
      if (isChurch) matchName = "Convenio Iglesia";
      else if (planId.includes('monthly')) matchName = "Mensual";
      else if (planId.includes('quarter')) matchName = "Trimestral";
      else if (planId === 'pack4') matchName = "4 Sesiones";
      else if (planId === 'pack8') matchName = "8 Sesiones";

      const dbProduct = dbProducts.find(p => p.name.includes(matchName));

      addToCart({
         id: cartId,
         db_id: dbProduct ? dbProduct.id : null,
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
      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30">

         {/* ──────────────── 1. HERO SECTION ──────────────── */}
         <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 bg-[radial-gradient(circle_at_50%_40%,_#164e63_0%,_#050505_80%)]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
               <motion.div
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="inline-flex flex-col items-center gap-2 mb-8"
               >
                  <div className="bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg shadow-cyan-500/20 mb-3 animate-pulse">
                     Matrículas Abiertas 2026
                  </div>
                  <span className="text-cyan-400 font-black tracking-widest uppercase text-xs border-b border-cyan-500 pb-1">
                     Lengua de Señas Chilena
                  </span>
               </motion.div>

               <motion.h1
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter uppercase"
               >
                  Rompe la barrera del <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                     Sonido.
                  </span>
               </motion.h1>

               <motion.p
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
               >
                  Aprende <strong className="text-white font-black">Lengua de Señas Chilena (LSCh)</strong> con Fernanda, nuestra educadora nativa.
                  Deja de usar "gestos" y empieza a comunicarte con gramática, cultura y respeto real.
               </motion.p>

               <motion.div
                  initial="hidden" animate="visible" variants={stagger}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
               >
                  <motion.button
                     variants={fadeIn}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToPricing}
                     className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-2xl shadow-cyan-600/20 transition-all flex items-center gap-3"
                  >
                     <FaSignLanguage className="text-lg" /> Ver Planes y Horarios
                  </motion.button>
                  <motion.button
                     variants={fadeIn}
                     whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                     whileTap={{ scale: 0.95 }}
                     className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-2xl font-black text-xs uppercase tracking-widest text-white flex items-center gap-3 hover:border-white/30 transition-all"
                  >
                     <FaVideo className="text-lg text-cyan-400" /> Clase de Muestra
                  </motion.button>
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. IMPACT SECTION ──────────────── */}
         <section className="py-32 bg-[#050505] border-y border-white/5">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                  <div>
                     <h2 className="text-4xl md:text-6xl font-black mb-8 text-white uppercase tracking-tighter">No es mímica.<br /><span className="text-cyan-500">Es Idioma.</span></h2>
                     <p className="text-xl text-slate-400 mb-8 leading-relaxed font-light">
                        Mucha gente cree que la lengua de señas es universal o que basta con mover las manos.
                        La realidad es que la LSCh tiene su propia sintaxis, gramática espacial y cultura.
                     </p>
                     <p className="text-xl text-slate-300 font-bold mb-10 tracking-tight">
                        En el <span className="text-cyan-500">Instituto Lael</span>, no solo aprendes vocabulario; aprendes a
                        <strong className="text-white block mt-2 text-2xl uppercase font-black tracking-tighter">Pensar Visualmente.</strong>
                     </p>
                     <ul className="space-y-6">
                        {[
                           "Abandona el 'español señado' (mal visto).",
                           "Domina la expresión facial (parte de la gramática).",
                           "Entiende la cultura sorda desde adentro."
                        ].map((item, i) => (
                           <li key={i} className="flex items-center gap-4 text-slate-400 font-medium">
                              <FaCheck className="text-cyan-500 shrink-0" /> {item}
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="relative h-[500px] flex items-center justify-center bg-white/[0.01] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 text-cyan-500/10 pointer-events-none">
                        <FaSignLanguage size={200} />
                     </div>
                     {/* Floating Cards Animation */}
                     <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-12 left-12 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] w-72 text-center shadow-2xl z-10"
                     >
                        <MdOutlineHearingDisabled className="text-6xl text-cyan-500 mx-auto mb-6" />
                        <strong className="text-xl block mb-2 text-white font-black uppercase tracking-tight">Cultura Sorda</strong>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Respeto e Identidad</span>
                     </motion.div>

                     <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-12 right-12 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] w-72 text-center shadow-2xl z-20"
                     >
                        <FaHandsHelping className="text-6xl text-blue-500 mx-auto mb-6" />
                        <strong className="text-xl block mb-2 text-white font-black uppercase tracking-tight">Inclusión Real</strong>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Conexión Humana</span>
                     </motion.div>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 3. TEACHER SECTION ──────────────── */}
         <section className="py-32 bg-[#050505]">
            <div className="container mx-auto px-6">
               <div className="flex flex-col lg:flex-row gap-20 items-center">

                  <div className="flex-1 flex justify-center">
                     <div className="relative w-72 h-72 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-cyan-600/20 rounded-[4rem] rotate-6 transform blur-2xl"></div>
                        <div className="absolute inset-0 bg-white/[0.02] rounded-[4.5rem] -rotate-3 transform flex items-center justify-center border border-white/5 shadow-2xl z-10 overflow-hidden backdrop-blur-3xl">
                           <div className="text-[12rem] filter drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700">{TEACHER_PROFILE.img}</div>
                        </div>
                        {/* Badge */}
                        <div className="absolute -bottom-8 -right-8 bg-white text-slate-950 px-8 py-4 rounded-3xl font-black shadow-2xl rotate-3 z-20 flex items-center gap-3 uppercase tracking-widest text-[10px] border border-white/10">
                           <FaAward className="text-cyan-500 text-lg" /> Educadora Titulada
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                     <span className="text-cyan-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">Maestra y Guía</span>
                     <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">Conoce a <span className="text-cyan-500">{TEACHER_PROFILE.name}</span></h2>

                     <div className="flex gap-3 flex-wrap mb-10 justify-center lg:justify-start">
                        {TEACHER_PROFILE.badges.map((b, i) => (
                           <span key={i} className="px-5 py-2 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {b}
                           </span>
                        ))}
                     </div>

                     <div className="border-l-4 border-cyan-600 pl-10 mb-12 py-2">
                        <p className="text-2xl text-slate-400 font-light italic leading-relaxed">
                           "{TEACHER_PROFILE.bio}"
                        </p>
                     </div>

                     <div className="flex gap-12 justify-center lg:justify-start">
                        <div className="text-center lg:text-left">
                           <strong className="text-5xl font-black text-white block tracking-tighter">100%</strong>
                           <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Nativa</span>
                        </div>
                        <div className="text-center lg:text-left">
                           <strong className="text-5xl font-black text-white block tracking-tighter">5+</strong>
                           <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Años</span>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 4. SYLLABUS UI ──────────────── */}
         <section className="py-24 bg-[#050505]">
            <div className="container mx-auto px-6">
               <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Malla <span className="text-cyan-500">Curricular</span></h2>
                  <p className="text-xl text-slate-500 font-light">Un viaje estructurado desde lo básico hasta la fluidez profesional.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">

                  {/* Navigation (Left 4/12) */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                     {LSCH_MODULES.map((mod, idx) => (
                        <button
                           key={mod.id}
                           onClick={() => setActiveModule(idx)}
                           className={`text-left p-8 rounded-[2rem] border transition-all flex items-center gap-6 group relative overflow-hidden
                        ${activeModule === idx
                                 ? 'bg-white/[0.03] border-cyan-500/50 shadow-2xl'
                                 : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                              }
                      `}
                        >
                           <span className={`text-4xl transition-all duration-500 ${activeModule === idx ? 'scale-110 grayscale-0' : 'grayscale opacity-30'}`}>{mod.icon}</span>
                           <div className="relative z-10">
                              <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${activeModule === idx ? 'text-cyan-400' : 'text-slate-600'}`}>{mod.tag}</span>
                              <strong className={`block text-lg uppercase tracking-tight ${activeModule === idx ? 'text-white' : 'text-slate-500'}`}>{mod.name}</strong>
                           </div>
                           {activeModule === idx && (
                              <motion.div layoutId="activeMod" className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
                           )}
                        </button>
                     ))}
                  </div>

                  {/* Content Display (Right 8/12) */}
                  <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                     <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeModule}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           transition={{ duration: 0.4 }}
                        >
                           <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
                              <div>
                                 <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{LSCH_MODULES[activeModule].name}</h3>
                                 <span className="text-cyan-500 font-black uppercase tracking-[0.2em] text-[10px] bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
                                    Nivel Oficial {activeModule + 1}
                                 </span>
                              </div>
                              <div className="bg-white/5 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                                 ⏳ {LSCH_MODULES[activeModule].duration}
                              </div>
                           </div>

                           <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                              {LSCH_MODULES[activeModule].desc}
                           </p>

                           <div className="bg-white/[0.02] rounded-[2.5rem] p-10 border border-white/5">
                              <h4 className="flex items-center gap-3 text-cyan-400 font-black uppercase tracking-widest text-xs mb-8">
                                 <BiBody className="text-xl" /> Objetivos de Aprendizaje:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 {LSCH_MODULES[activeModule].outcomes.map((out, i) => (
                                    <div key={i} className="flex gap-4 text-slate-400 text-sm font-medium leading-relaxed">
                                       <IoMdCheckmarkCircleOutline className="text-cyan-500 text-lg shrink-0" />
                                       {out}
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="mt-12 flex items-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                              <FaInfoCircle className="text-cyan-500" /> Certificación disponible al completar este nivel.
                           </div>

                        </motion.div>
                     </AnimatePresence>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 5. COMPARISON TABLE ──────────────── */}
         <section className="py-24 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6">
               <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">¿Por qué <span className="text-cyan-500">Lael</span>?</h2>
                  <p className="text-xl text-slate-500 font-light">Transparencia y calidad en cada seña.</p>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse bg-white/[0.01] rounded-[2.5rem] overflow-hidden">
                     <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                           <th className="text-left p-10 text-slate-500 font-black uppercase tracking-widest text-[10px]">Característica</th>
                           <th className="text-left p-10 text-cyan-500 font-black uppercase tracking-widest text-xs bg-cyan-500/5">Instituto Lael</th>
                           <th className="text-left p-10 text-slate-600 font-black uppercase tracking-widest text-[10px]">Otros Cursos</th>
                        </tr>
                     </thead>
                     <tbody>
                        {COMPARISON_DATA.map((row, i) => (
                           <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                              <td className="p-10 font-black uppercase tracking-tight text-white text-sm group-hover:text-cyan-400 transition-colors">{row.feature}</td>
                              <td className="p-10 font-bold text-white bg-cyan-500/[0.02] relative">
                                 <div className="flex items-center gap-3">
                                    <FaCheck className="text-cyan-500 text-lg" />
                                    {row.us}
                                 </div>
                              </td>
                              <td className="p-10 text-slate-500 font-medium">{row.others}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </section>

         {/* ──────────────── 6. PRICING SECTION ──────────────── */}
         <section id="pricing-anchor" className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
               <div className="text-center max-w-3xl mx-auto mb-20">
                  <h2 className="text-4xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-none">Inversión en <br /> <span className="text-cyan-500">Inclusión</span></h2>
                  <p className="text-xl text-slate-400 font-light">Clases en vivo, acceso a grabaciones y material digital incluido.</p>
               </div>

               {/* CONTROLS */}
               <div className="flex flex-col items-center gap-10 mb-20">
                  <div className="bg-white/[0.02] p-1.5 rounded-3xl border border-white/5 flex shadow-2xl backdrop-blur-3xl">
                     <button
                        onClick={() => { setPlanType('group'); setIsChurch(false); }}
                        className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all ${planType === 'group' ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/20' : 'text-slate-500 hover:text-white'}`}
                     >
                        <FaUsers className="text-lg" /> Clases Grupales
                     </button>
                     <button
                        onClick={() => { setPlanType('one2one'); setIsChurch(false); }}
                        className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all ${planType === 'one2one' ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/20' : 'text-slate-500 hover:text-white'}`}
                     >
                        <FaUserGraduate className="text-lg" /> Personalizado (1 a 1)
                     </button>
                  </div>

                  {planType === 'group' && (
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setIsChurch(!isChurch)}
                        className={`cursor-pointer border-2 px-8 py-5 rounded-[2rem] flex items-center gap-6 transition-all select-none shadow-2xl
                  ${isChurch ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/10'}
                `}
                     >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isChurch ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/20'}`}>
                           {isChurch && <FaCheck className="text-xs" />}
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest leading-none">Soy de una <strong className="text-white">Iglesia / Fundación</strong></span>
                     </motion.div>
                  )}
               </div>

               {/* PLANS GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  {isChurch ? (
                     <div className="md:col-span-2 bg-gradient-to-br from-indigo-950/40 to-slate-950 border-2 border-indigo-500/50 rounded-[3rem] p-16 relative shadow-2xl overflow-hidden group">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700"></div>

                        <div className="text-center mb-12 relative z-10">
                           <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto text-indigo-400 mb-6 border border-indigo-500/30">
                              <FaChurch />
                           </div>
                           <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Plan Social</h3>
                           <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em]">Convenio para Instituciones</p>
                        </div>

                        <div className="text-center mb-12 relative z-10">
                           <span className="text-7xl font-black text-white tracking-tighter">{clp(CHURCH_PRICE)}</span>
                           <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">/mes</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative z-10">
                           {[
                              "Matrícula Exonerada ($0)",
                              "Acceso completo a niveles",
                              "Certificado Oficial Lael",
                              "Enfoque en Ministerio de Sordos",
                              "Acceso a grabaciones 24/7",
                              "Material digital premium"
                           ].map((f, i) => (
                              <div key={i} className="flex items-center gap-4 text-slate-300 text-sm font-medium">
                                 <div className="w-5 h-5 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
                                    <FaCheck className="text-indigo-500 text-[10px]" />
                                 </div>
                                 {f}
                              </div>
                           ))}
                        </div>

                        <button
                           onClick={() => handleEnroll('church-promo')}
                           className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-2xl shadow-indigo-600/20 relative z-10"
                        >
                           Solicitar Cupo Social
                        </button>
                     </div>
                  ) : (
                     (planType === 'group' ? LSCH_GROUP_PLANS : LSCH_ONE2ONE_PLANS).map((plan) => (
                        <motion.div
                           key={plan.id}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           className={`relative bg-white/[0.01] rounded-[3rem] p-12 border transition-all flex flex-col group overflow-hidden
                       ${plan.highlight ? 'border-cyan-500/50 shadow-2xl bg-white/[0.03]' : 'border-white/5 hover:border-white/10'}
                     `}
                        >
                           {plan.highlight && (
                              <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-6 py-2 rounded-bl-3xl shadow-lg uppercase tracking-widest">
                                 {plan.badge}
                              </div>
                           )}

                           <div className="mb-10">
                              <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">{plan.title}</h3>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed min-h-[40px]">{plan.desc}</p>
                           </div>

                           <div className="mb-10">
                              <div className="flex items-baseline gap-2">
                                 <span className="text-5xl font-black text-white tracking-tighter">{clp(plan.price)}</span>
                                 <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                                    {planType === 'group' ? '/mes' : '/pack'}
                                 </span>
                              </div>
                              {plan.totalPayment && (
                                 <div className="mt-4 inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[10px] font-black uppercase tracking-widest">
                                    Total {clp(plan.totalPayment)}
                                 </div>
                              )}
                           </div>

                           <div className="space-y-5 mb-12 flex-1">
                              {plan.features.map((f, i) => (
                                 <div key={i} className="flex items-start gap-4 text-sm text-slate-400 font-medium">
                                    <FaCheck className="text-cyan-500 mt-1 shrink-0" />
                                    <span className="leading-tight">{f}</span>
                                 </div>
                              ))}
                           </div>

                           {/* Enrollment Info */}
                           {planType === 'group' && (
                              <div className={`mb-8 p-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest border transition-colors ${plan.enrollmentWaived ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                                 {plan.enrollmentWaived ? (
                                    <>¡Matrícula Gratis!</>
                                 ) : (
                                    <>+ {clp(ENROLLMENT_FEE)} Matrícula</>
                                 )}
                              </div>
                           )}

                           <button
                              onClick={() => handleEnroll(plan.id)}
                              className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all
                         ${plan.highlight ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-2xl shadow-cyan-600/20' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}
                       `}
                           >
                              {planType === 'group' ? 'Inscribirme Ahora' : 'Comprar Pack'}
                           </button>
                        </motion.div>
                     ))
                  )}
               </div>

               <p className="text-center mt-20 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  * Todos los planes incluyen Campus Virtual, material PDF y clases grabadas.
               </p>
            </div>
         </section>

         {/* ──────────────── 7. VALUES SECTION ──────────────── */}
         <section className="py-32 border-t border-white/5 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-2xl font-black mb-16 text-center text-slate-500 uppercase tracking-[0.3em]">Compromiso <span className="text-white">LSCh Lael</span></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {LSCH_WHY_US.map((val, i) => (
                     <div key={i} className="bg-white/[0.01] p-10 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group">
                        <div className="text-5xl mb-8 text-cyan-600 group-hover:scale-110 group-hover:text-cyan-400 transition-all">
                           {i === 0 ? <BiWorld /> : i === 1 ? <FaBuilding /> : <FaAward />}
                        </div>
                        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{val.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{val.desc}</p>
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
                  className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-t border-white/5 z-50 py-6"
               >
                  <div className="container mx-auto px-8 flex justify-between items-center">
                     <div>
                        <strong className="text-cyan-500 block text-xs font-black uppercase tracking-widest mb-1">LSCh con Fernanda</strong>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{isChurch ? 'Convenio Social Activo' : 'Admisión 2026'}</span>
                     </div>
                     <button
                        onClick={scrollToPricing}
                        className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-2xl shadow-cyan-600/20"
                     >
                        Ver Planes
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
   );
}