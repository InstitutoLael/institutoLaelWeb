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

// IMAGES (Using imports for reliable bundling)
import logoLael from "../assets/img/Logos/lael-inst-azul.png";
import logoPartner from "../assets/img/Partners/LosOlivos.png";

// DATA
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

   // CONTACT
   const WHATSAPP_NUM = "56964626568";
   const EMAIL_COORD = "coordinacion@institutolael.cl";

   useEffect(() => {
      const handleScroll = () => setShowSticky(window.scrollY > 900);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const handleEnroll = (pack) => {
      addToCart({
         id: `academy-${pack.id}`,
         title: `Academy: ${pack.title}`,
         price: pack.price,
         detail: `${pack.hours} Horas Cronológicas - Asignaturas a elección (Mix)`,
         type: 'course',
         extraInfo: pack.id === 'academy-p12'
            ? 'Matrícula GRATIS incluida'
            : `+ Matrícula Anual ${clp(ACADEMY_CONFIG.enrollmentFee)}`
      });
      openCart();
   };

   const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-200/50">

         {/* ──────────────── 1. SOLEMN HERO ──────────────── */}
         <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 bg-slate-900 text-white">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-30 z-0 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 opacity-90 z-0"></div>

            {/* Animated Dust/Particles could go here */}

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-5 py-2 rounded-full text-sm font-semibold mb-8 uppercase tracking-widest"
               >
                  <FaBible /> Cosmovisión Cristiana & Excelencia
               </motion.div>

               <motion.h1
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
               >
                  Más que profesores,<br />
                  somos <span className="text-amber-400 italic font-serif">Mentores de Vida</span>.
               </motion.h1>

               <motion.p
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-xl text-blue-100/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
               >
                  El Hub Académico para familias que buscan algo más.
                  Apoyo personalizado para <strong>Homeschoolers</strong> y refuerzo escolar,
                  con la flexibilidad que tú necesitas y los valores que compartimos.
               </motion.p>

               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-5 justify-center"
               >
                  <button
                     onClick={() => scrollToSection('packs')}
                     className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
                  >
                     <FaChalkboardTeacher /> Ver Packs de Clases
                  </button>
                  <button
                     onClick={() => scrollToSection('identidad')}
                     className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition-all"
                  >
                     <FaDove /> Conoce Nuestra Identidad
                  </button>
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. IDENTITY SECTION (The Meaning) ──────────────── */}
         <section id="identidad" className="py-24 bg-white relative">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-900 to-transparent opacity-5 pointer-events-none"></div>
            <div className="container mx-auto px-6">

               <div className="flex flex-col items-center justify-center mb-16 opacity-50">
                  <div className="w-px h-12 bg-amber-500 mb-4"></div>
                  <FaScroll className="text-2xl text-amber-600 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Nuestra Esencia</span>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center text-center lg:text-left">

                  {/* Left Column: Meaning */}
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-6 lg:text-right"
                  >
                     <div>
                        <h3 className="text-4xl font-serif font-bold text-slate-900 mb-1">
                           Lael <span className="text-amber-600 text-3xl font-serif"> (לָאֵל)</span>
                        </h3>
                        <p className="text-lg italic text-slate-500">Del hebreo: <strong className="text-slate-800">"Perteneciente a Dios"</strong>.</p>
                     </div>
                     <p className="text-slate-600 leading-relaxed">
                        No educamos para el mundo, educamos para la eternidad. Entendemos que la mente
                        de tus hijos es un territorio sagrado. Nuestro nombre es nuestra declaración de principios.
                     </p>
                  </motion.div>

                  {/* Center: Logo */}
                  <div className="relative flex justify-center">
                     <div className="w-64 h-64 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center relative z-10 shadow-2xl">
                        <img src={logoLael} alt="Logo Lael" className="w-48 opacity-90" />
                     </div>
                     <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl scale-110 -z-0"></div>
                  </div>

                  {/* Right: Symbols */}
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="space-y-8"
                  >
                     <div className="flex items-start gap-4 lg:flex-row flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                           <FaDove />
                        </div>
                        <div>
                           <strong className="text-slate-900 text-lg block mb-1">La Paloma</strong>
                           <p className="text-slate-600 text-sm">El Espíritu Santo, fuente de toda sabiduría e inteligencia (Éxodo 31:3).</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4 lg:flex-row flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                           <FaPenFancy />
                        </div>
                        <div>
                           <strong className="text-slate-900 text-lg block mb-1">La "É" Acentuada</strong>
                           <p className="text-slate-600 text-sm">Ponemos el acento donde importa: en el carácter y el corazón, no solo en la nota.</p>
                        </div>
                     </div>
                  </motion.div>

               </div>
            </div>
         </section>

         {/* ──────────────── 3. ALLIANCE (LOS OLIVOS) ──────────────── */}
         <section className="py-20 bg-blue-50 border-y border-blue-100">
            <div className="container mx-auto px-6">
               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 flex flex-col-reverse md:flex-row gap-12 items-center">

                  <div className="flex-1 space-y-6">
                     <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                        Alianza Estratégica
                     </div>
                     <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                        Libertad Educativa,<br /> Respaldo Oficial.
                     </h2>
                     <p className="text-slate-600 text-lg leading-relaxed">
                        Instituto Lael es tu equipo de entrenamiento académico (Tutores Expertos),
                        y gracias a nuestra alianza con <strong>{ALLIANCE.name}</strong>, tus hijos
                        pueden certificar sus estudios sin estrés.
                     </p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {ALLIANCE.benefits.map((b, i) => (
                           <div key={i} className="flex items-center gap-2 text-blue-900 font-medium">
                              <FaCheck className="text-blue-500" /> {b}
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center">
                     <img src={logoPartner} alt="Los Olivos" className="max-w-[250px] drop-shadow-lg mb-6 mix-blend-multiply" />
                     <div className="bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold text-slate-600">
                        <MdOutlineVerifiedUser className="text-blue-500" /> Colegio Partner
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 4. ACADEMIC CATALOG ──────────────── */}
         <section className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6">

               <div className="text-center mb-16">
                  <span className="text-slate-400 font-serif italic text-lg mb-2 block">Curriculum Flexible</span>
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">Áreas del Saber</h2>
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                     <BsShuffle /> ¡Mézclalas como quieras! (Ej: 2hrs Mate + 2hrs Inglés)
                  </div>
               </div>

               <div className="flex justify-center flex-wrap gap-4 mb-16">
                  {LEVELS.map(lvl => (
                     <button
                        key={lvl.id}
                        onClick={() => setActiveLevel(lvl.id)}
                        className={`px-6 py-3 rounded-lg border-2 transition-all flex flex-col items-center text-center w-40
                   ${activeLevel === lvl.id
                              ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-105'
                              : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                           }
                 `}
                     >
                        <strong className="block text-lg leading-tight">{lvl.label}</strong>
                        <span className={`text-xs ${activeLevel === lvl.id ? 'text-slate-400' : 'text-slate-400'}`}>{lvl.desc}</span>
                     </button>
                  ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {SUBJECTS.map((sub, idx) => (
                     <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                     >
                        <div className="absolute top-0 left-0 w-1 h-full opacity-60 transition-opacity group-hover:opacity-100" style={{ backgroundColor: sub.color }}></div>

                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 origin-left">
                           {sub.icon}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{sub.name}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{sub.desc}</p>
                     </motion.div>
                  ))}
               </div>

            </div>
         </section>

         {/* ──────────────── 5. PRICING PACKS ──────────────── */}
         <section id="packs" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 relative z-10">
               <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-4xl font-serif font-bold mb-4">Packs de Horas Flexibles</h2>
                  <p className="text-slate-400 text-lg">
                     Tú decides cómo usar tus horas semana a semana.
                     Ideales para preparar pruebas específicas o acompañamiento continuo.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
                  {PACKS.map((pack, idx) => {
                     const isFeatured = pack.badge != null;
                     return (
                        <motion.div
                           key={pack.id}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2 }}
                           className={`relative rounded-2xl p-8 flex flex-col
                       ${isFeatured
                                 ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.15)] transform scale-105 z-10'
                                 : 'bg-slate-900 border border-slate-700 hover:border-slate-600'
                              }
                     `}
                        >
                           {isFeatured && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                 <BsStars /> {pack.badge}
                              </div>
                           )}

                           <div className="text-center mb-6">
                              <h3 className="text-2xl font-bold mb-1">{pack.title}</h3>
                              <p className="text-slate-500 text-sm">{pack.subtitle}</p>
                           </div>

                           <div className="bg-slate-950/50 rounded-lg p-4 flex items-center justify-center gap-3 mb-6 border border-slate-800">
                              <span className="text-4xl font-bold">{pack.hours}</span>
                              <div className="flex flex-col text-left text-xs text-slate-500 uppercase font-bold tracking-wider">
                                 <span className="text-amber-500">Horas</span>
                                 <span>Cronológicas</span>
                              </div>
                           </div>

                           <div className="text-center mb-8">
                              <div className="text-3xl font-bold">{clp(pack.price)}</div>
                           </div>

                           <ul className="space-y-3 mb-8 flex-1">
                              <li className="flex items-start gap-3 text-sm text-slate-300">
                                 <BsShuffle className="text-amber-500 mt-1 shrink-0" />
                                 <strong>Multidisciplinario (Mix)</strong>
                              </li>
                              {pack.features.map((f, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                    <FaCheck className="text-amber-500/50 mt-1 shrink-0" /> {f}
                                 </li>
                              ))}
                           </ul>

                           <button
                              onClick={() => handleEnroll(pack)}
                              className={`w-full py-3 rounded-lg font-bold transition-all
                          ${isFeatured ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' : 'bg-transparent border border-slate-600 text-white hover:bg-slate-800'}
                        `}
                           >
                              Agregar a la Mochila
                           </button>
                        </motion.div>
                     )
                  })}
               </div>

               <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 bg-amber-900/20 border border-amber-900/40 text-amber-500 px-4 py-2 rounded-lg text-sm">
                     <BsShieldCheck className="text-lg" />
                     <span>Matrícula Anual Familiar: <strong>{clp(ACADEMY_CONFIG.enrollmentFee)}</strong> (Se paga solo una vez al año).</span>
                  </div>
               </div>

            </div>
         </section>

         {/* ──────────────── 6. B2B / SCHOOL SERVICES ──────────────── */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="flex flex-col lg:flex-row gap-16 items-start">

                  {/* Left Text */}
                  <div className="lg:w-1/3">
                     <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center text-3xl mb-6">
                        <FaUniversity />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Servicios para Colegios</h2>
                     <p className="text-slate-600 mb-8 leading-relaxed">
                        ¿Eres director o sostenedor? Llevamos la excelencia de Lael y nuestros tutores expertos a tu institución.
                     </p>
                     <div className="flex flex-col gap-3">
                        <a
                           href={`https://wa.me/${WHATSAPP_NUM}?text=Hola, soy representante de un colegio...`}
                           className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg flex items-center gap-2 w-fit hover:bg-green-600 transition-colors"
                        >
                           <FaWhatsapp className="text-xl" /> Contactar por WhatsApp
                        </a>
                        <a
                           href={`mailto:${EMAIL_COORD}`}
                           className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg flex items-center gap-2 w-fit hover:bg-slate-200 transition-colors"
                        >
                           <FaEnvelope className="text-xl" /> Enviar Correo
                        </a>
                     </div>
                  </div>

                  {/* Right Grid */}
                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {SCHOOL_SERVICES.map((serv) => (
                        <div key={serv.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                           <span className="text-3xl mb-4 block">{serv.icon}</span>
                           <h4 className="font-bold text-slate-900 mb-2">{serv.title}</h4>
                           <p className="text-sm text-slate-500 mb-4 h-10">{serv.desc}</p>
                           <div className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 py-1 px-2 rounded w-fit">
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
                  className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-50 py-3"
               >
                  <div className="container mx-auto px-6 flex justify-between items-center text-white">
                     <div>
                        <strong className="text-amber-400 block font-serif">Lael Academy</strong>
                        <span className="text-xs text-slate-400">Perteneciente a Dios</span>
                     </div>
                     <button
                        onClick={() => scrollToSection('packs')}
                        className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors shadow-lg"
                     >
                        Ver Packs Disponibles
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
   );
}