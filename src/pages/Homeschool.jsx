import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
   FaBible, FaDove, FaScroll, FaUniversity, FaPenFancy,
   FaChalkboardTeacher, FaHandshake, FaCheck, FaStar,
   FaPhoneAlt, FaEnvelope, FaWhatsapp, FaGraduationCap
} from "react-icons/fa";
import {
   MdOutlineVerifiedUser, MdCastForEducation, MdSchool, MdHistoryEdu
} from "react-icons/md";
import { BsStars, BsShieldCheck, BsShuffle, BsFillLightningChargeFill } from "react-icons/bs";
import { IoLibrary } from "react-icons/io5";
import EnrollmentModal from "../components/ui/EnrollmentModal.jsx";
import supabaseClient from "../lib/supabaseClient.js";

// IMAGES (Using imports for reliable bundling)
import logoLael from "../assets/img/Logos/lael-inst-azul.png";
import logoPartner from "../assets/img/Partners/LosOlivos.png";

// DATA
import { CONTACT_INFO } from "../data/contact.js";
import { teachers } from "../data/teachers.js";
import {
   ACADEMY_CONFIG,
   ALLIANCE,
   SUBJECTS,
   LEVELS,
   PACKS,
   SCHOOL_SERVICES,
   clp
} from "../data/homeschool.js";

// ANIMATIONS
const fadeInUp = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Academy() {
   const { addToCart, openCart } = useCart();
   const [activeLevel, setActiveLevel] = useState("media");
   const [showSticky, setShowSticky] = useState(false);
   const [dbProducts, setDbProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [enrollPlan, setEnrollPlan] = useState(null);

   // FETCH PRODUCTS
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const { data, error } = await supabaseClient
               .from('products')
               .select('*')
               .eq('category', 'TALLER');
            if (error) throw error;
            setDbProducts(data || []);
         } catch (err) {
            console.error("Error fetching Academy products:", err);
         } finally {
            setLoading(false);
         }
      };
      fetchProducts();
   }, []);

   useEffect(() => {
      const handleScroll = () => setShowSticky(window.scrollY > 900);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const handleEnroll = (pack) => {
      setEnrollPlan({
         id: pack.id,
         name: `Academy: ${pack.title}`,
         paymentUrl: pack.id === 'academy-p12' 
            ? 'https://buy.stripe.com/test_id_premium' // Placeholder o real si lo tienes
            : 'https://buy.stripe.com/test_id_standard'
      });
   };

   const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden">
         <EnrollmentModal 
            isOpen={!!enrollPlan} 
            onClose={() => setEnrollPlan(null)} 
            plan={enrollPlan} 
         />

         {/* ──────────────── 1. SOLEMN HERO ──────────────── */}
         <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)]">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/textures/cubes.png')] opacity-[0.03] z-0 mix-blend-overlay"></div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl"
               >
                  <FaBible /> Cosmovisión Cristiana & Excelencia
               </motion.div>

               <motion.h1
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter uppercase"
               >
                  Más que profesores,<br />
                  somos <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent italic px-2">Mentores de Vida.</span>
               </motion.h1>

               <motion.p
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
               >
                  El Hub Académico para familias que buscan algo más.
                  Apoyo personalizado para <strong>Homeschoolers</strong> y refuerzo escolar,
                  con la flexibilidad que tú necesitas y los valores que compartimos.
               </motion.p>

               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
               >
                  <button
                     onClick={() => scrollToSection('packs')}
                     className="px-10 py-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3"
                  >
                     <FaChalkboardTeacher className="text-lg" /> Ver Packs de Clases
                  </button>
                  <button
                     onClick={() => scrollToSection('identidad')}
                     className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-2xl font-black text-[10px] uppercase tracking-widest text-white flex items-center justify-center gap-3 hover:border-white/30 transition-all"
                  >
                     <FaDove className="text-lg text-amber-500" /> Nuestra Identidad
                  </button>
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. IDENTITY SECTION (The Meaning) ──────────────── */}
         <section id="identidad" className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/5 to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">

               <div className="flex flex-col items-center justify-center mb-20 opacity-30">
                  <div className="w-px h-16 bg-amber-500 mb-6"></div>
                  <FaScroll className="text-3xl text-amber-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-700">Nuestra Esencia</span>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center text-center lg:text-left">

                  {/* Left Column: Meaning */}
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-8 lg:text-right"
                  >
                     <div>
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter">
                           Lael <span className="text-amber-500 italic"> (לָאֵל)</span>
                        </h3>
                        <p className="text-lg text-slate-400 font-light italic">Del hebreo: <strong className="text-white font-black uppercase tracking-tight">"Perteneciente a Dios"</strong>.</p>
                     </div>
                     <p className="text-slate-500 text-lg leading-relaxed font-light">
                        No educamos para el mundo, educamos para la eternidad. Entendemos que la mente
                        de tus hijos es un territorio sagrado. Nuestro nombre es nuestra declaración de principios.
                     </p>
                  </motion.div>

                  {/* Center: Logo */}
                  <div className="relative flex justify-center">
                     <div className="w-64 h-64 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center relative z-10 shadow-2xl rotate-3">
                        <img src={logoLael} alt="Logo Lael" loading="lazy" className="w-48 filter brightness-150 grayscale group-hover:grayscale-0 transition-all" />
                     </div>
                     <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[100px] scale-110 -z-0"></div>
                  </div>

                  {/* Right: Symbols */}
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-12"
                  >
                     <div className="flex items-center gap-6 lg:flex-row flex-col text-center lg:text-left">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 shadow-2xl">
                           <FaDove size={24} />
                        </div>
                        <div>
                           <strong className="text-white text-xl font-black uppercase tracking-tight block mb-1">La Paloma</strong>
                           <p className="text-slate-500 text-sm italic font-light">El Espíritu Santo, fuente de toda sabiduría e inteligencia.</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-6 lg:flex-row flex-col text-center lg:text-left">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 shadow-2xl">
                           <FaPenFancy size={24} />
                        </div>
                        <div>
                           <strong className="text-white text-xl font-black uppercase tracking-tight block mb-1">La "É" Acentuada</strong>
                           <p className="text-slate-500 text-sm italic font-light">Ponemos el acento donde importa: en el carácter y el corazón.</p>
                        </div>
                     </div>
                  </motion.div>

               </div>
            </div>
         </section>

         {/* ──────────────── 3. ALLIANCE (LOS OLIVOS) ──────────────── */}
         <section className="py-32 bg-[#050505] border-y border-white/5">
            <div className="container mx-auto px-6">
               <div className="bg-white/[0.01] backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 border border-white/5 flex flex-col-reverse lg:flex-row gap-20 items-center shadow-2xl">

                  <div className="flex-1 space-y-10">
                     <span className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em]">
                        Alianza Estratégica 2026
                     </span>
                     <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        Libertad Educativa,<br /> <span className="text-indigo-400">Respaldo Oficial.</span>
                     </h2>
                     <p className="text-slate-400 text-xl font-light leading-relaxed">
                        Instituto Lael es tu centro de mando académico con tutores expertos,
                        y gracias a nuestra alianza con <strong className="text-white font-black uppercase tracking-tight">{ALLIANCE.name}</strong>, tus hijos
                        pueden certificar sus estudios con total validez.
                     </p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        {ALLIANCE.benefits.map((b, i) => (
                           <div key={i} className="flex items-center gap-4 text-slate-300 font-bold tracking-tight">
                              <FaCheck className="text-indigo-500" /> {b}
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center relative">
                     <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full"></div>
                     <img src={logoPartner} alt="Los Olivos" loading="lazy" className="max-w-[300px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-10 filter brightness-110 relative z-10" />
                     <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 backdrop-blur-2xl relative z-10">
                        <MdOutlineVerifiedUser className="text-indigo-400" /> Colegio Partner Certificado
                     </div>
                  </div>
            </div>
         </div>
         </section>

         {/* ──────────────── 3.5. MENOTORES DE EXCELENCIA ──────────────── */}
         <section className="py-24 bg-[#050505]">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Equipo Docente</span>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                     Mentores de <span className="text-amber-500">Vida</span>
                  </h2>
                  <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
                     Seleccionamos tutores que no solo dominan su materia, sino que comparten nuestros principios.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teachers.filter(t => t.tags?.includes('paes') || t.tags?.includes('homeschool') || t.id === 'diego').slice(0, 4).map((t, i) => (
                     <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:border-amber-500/30 transition-all group text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                           {t.id === 'diego' ? '👨🏻‍🏫' : t.id === 'javiera' ? '👩🏼‍🏫' : '🧑🏻‍🏫'}
                        </div>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">{t.name}</h4>
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-4">{t.subject || t.role}</span>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 4. ACADEMIC CATALOG ──────────────── */}
         <section className="py-32 bg-[#050505] relative">
            <div className="container mx-auto px-6">

               <div className="text-center mb-24">
                  <span className="text-amber-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">Curriculum Flexible</span>
                  <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">Áreas del <span className="text-amber-500">Saber</span></h2>
                  <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-xl">
                     <BsShuffle className="text-amber-500" /> ¡Combina tus materias como quieras!
                  </div>
               </div>

               <div className="flex justify-center flex-wrap gap-4 mb-20">
                  {LEVELS.map(lvl => (
                     <button
                        key={lvl.id}
                        onClick={() => setActiveLevel(lvl.id)}
                        className={`px-8 py-4 rounded-[1.5rem] border transition-all flex flex-col items-center text-center w-48
                   ${activeLevel === lvl.id
                               ? 'bg-amber-600 border-amber-600 text-white shadow-2xl shadow-amber-600/20 scale-105'
                               : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/20'
                            }
                 `}
                     >
                        <strong className="block text-sm uppercase tracking-widest font-black leading-tight mb-1">{lvl.label}</strong>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${activeLevel === lvl.id ? 'text-amber-200' : 'text-slate-600'}`}>{lvl.desc}</span>
                     </button>
                  ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {SUBJECTS.map((sub, idx) => (
                     <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/[0.02] p-10 rounded-[3rem] border border-white/5 hover:border-amber-500/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-3xl"
                     >
                        {/* Highlight Orb */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-[50px] pointer-events-none" />

                        <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110 origin-left filter drop-shadow-2xl">
                           {sub.icon}
                        </div>
                        <h4 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">{sub.name}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-light italic">"{sub.desc}"</p>
                     </motion.div>
                  ))}
               </div>

            </div>
         </section>

         {/* ──────────────── 5. PRICING PACKS ──────────────── */}
         <section id="packs" className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-amber-600/5 blur-[150px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
               <div className="text-center max-w-3xl mx-auto mb-20">
                  <h2 className="text-4xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-none text-white">Inversión en <br /> <span className="text-amber-500">Excelencia</span></h2>
                  <p className="text-xl text-slate-400 font-light">Tú decides cómo usar tus horas. Flexibilidad total para tu éxito académico.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
                  {PACKS.map((pack, idx) => {
                     const isFeatured = pack.badge != null;
                     return (
                        <motion.div
                           key={pack.id}
                           initial={{ opacity: 0, scale: 0.9 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2 }}
                           whileHover={{ y: -10 }}
                           className={`relative rounded-[3rem] p-12 flex flex-col backdrop-blur-3xl transition-all duration-500
                       ${isFeatured
                                 ? 'bg-amber-600/10 border-amber-500/50 shadow-2xl scale-105 z-10'
                                 : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                              }
                     `}
                        >
                           {isFeatured && (
                              <div className="absolute top-0 right-10 bg-amber-500 text-slate-950 text-[10px] font-black px-6 py-2 rounded-b-2xl shadow-lg uppercase tracking-widest">
                                 {pack.badge}
                              </div>
                           )}

                           <div className="mb-10">
                              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{pack.title}</h3>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-[0.2em]">{pack.subtitle}</p>
                           </div>

                           <div className="bg-white/5 rounded-[2rem] p-8 flex items-center justify-center gap-4 mb-10 border border-white/10">
                              <span className="text-6xl font-black text-white tracking-tighter">{pack.hours}</span>
                              <div className="flex flex-col text-left text-[10px] text-slate-500 font-black uppercase tracking-widest leading-tight">
                                 <span className="text-amber-500">Horas</span>
                                 <span>Docentes</span>
                              </div>
                           </div>

                           <div className="text-center mb-10">
                              <div className="text-5xl font-black text-white tracking-tighter">{clp(pack.price)}</div>
                           </div>

                           <div className="space-y-5 mb-12 flex-1">
                              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-amber-500/80">
                                 <BsShuffle className="text-lg" />
                                 <span>Malla Multidisciplinaria</span>
                              </div>
                              {pack.features.map((f, i) => (
                                 <div key={i} className="flex items-baseline gap-4 text-sm text-slate-400 font-medium">
                                    <FaCheck className="text-amber-500 mt-1 shrink-0" />
                                    <span className="leading-tight">{f}</span>
                                 </div>
                              ))}
                           </div>

                           <button
                              onClick={() => handleEnroll(pack)}
                              className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl
                          ${isFeatured ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}
                        `}
                           >
                              Adquirir Plan
                           </button>
                        </motion.div>
                     )
                  })}
               </div>

               <div className="mt-20 text-center">
                  <div className="inline-flex items-center gap-4 bg-white/[0.02] border border-white/10 text-slate-500 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest backdrop-blur-3xl">
                     <BsShieldCheck className="text-amber-500 text-xl" />
                     <span>Matrícula Anual Familiar: <strong className="text-white text-lg ml-2">{clp(ACADEMY_CONFIG.enrollmentFee)}</strong></span>
                  </div>
               </div>

            </div>
         </section>

         {/* ──────────────── 6. B2B / SCHOOL SERVICES ──────────────── */}
         <section className="py-40 bg-[#050505] relative border-t border-white/5">
            <div className="container mx-auto px-6">
               <div className="flex flex-col lg:flex-row gap-24 items-start">

                  {/* Left Text */}
                  <div className="lg:w-1/3 sticky top-32">
                     <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-4xl mb-10 shadow-2xl shadow-indigo-500/10">
                        <FaUniversity />
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Área<br /><span className="text-indigo-500">Corporativa</span></h2>
                     <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed">
                        Llevamos la excelencia de Lael y nuestros tutores expertos a tu colegio o institución educativa.
                     </p>
                     <div className="flex flex-col gap-4">
                        <a
                           href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=Hola, soy representante de un colegio...`}
                           className="px-8 py-5 bg-green-600 hover:bg-green-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-green-600/20 uppercase tracking-widest text-[10px]"
                        >
                           <FaWhatsapp className="text-lg" /> Contactar Consultor
                        </a>
                        <a
                           href={`mailto:${CONTACT_INFO.email.address}`}
                           className="px-8 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                        >
                           <FaEnvelope className="text-lg" /> Canal Oficial
                        </a>
                     </div>
                  </div>

                  {/* Right Grid */}
                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                     {SCHOOL_SERVICES.map((serv) => (
                        <div key={serv.id} className="bg-white/[0.01] p-12 rounded-[3.5rem] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-3xl">
                           <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-[50px] pointer-events-none" />
                           <span className="text-5xl mb-8 block grayscale group-hover:grayscale-0 transition-all duration-700">{serv.icon}</span>
                           <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{serv.title}</h4>
                           <p className="text-slate-500 text-sm mb-10 min-h-[48px] font-light italic leading-relaxed">"{serv.desc}"</p>
                           <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 py-2 px-6 rounded-full border border-indigo-500/20 w-fit">
                              {serv.priceRef}
                           </div>
                        </div>
                     ))}
                  </div>

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
                  className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-t border-white/10 z-50 py-6"
               >
                  <div className="container mx-auto px-8 flex justify-between items-center text-white">
                     <div>
                        <strong className="text-amber-500 block text-xs font-black uppercase tracking-widest mb-1 leading-none">Lael Academy 2026</strong>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Perteneciente a Dios</span>
                     </div>
                     <button
                        onClick={() => scrollToSection('packs')}
                        className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-[10px] transition-all shadow-2xl shadow-amber-500/20 uppercase tracking-widest"
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