import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// SAFE ICONS
import {
   FaHandHoldingHeart, FaUserGraduate, FaChalkboardTeacher, FaRegCheckCircle,
   FaWhatsapp, FaInfoCircle, FaChevronDown, FaChevronUp, FaHeart, FaHandshake
} from "react-icons/fa";
import { MdWork, MdSchool, MdTimelapse, MdOutlineFamilyRestroom } from "react-icons/md";
import { BiWorld, BiDonateHeart } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

// DATA
import {
   CAMINOS_CONTENT,
   STUDY_CYCLES,
   PLANS,
   STEPS,
   FAQS,
   REQUIREMENTS,
   getNivelacionQuote,
   clp
} from "../data/nivelacion.js";

// ANIMATIONS
const fadeInUp = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function EscuelaAdultos() {
   // HOOK SAFETY
   const cartContext = useCart();
   const addToCart = cartContext?.addToCart || (() => console.warn("Cart Context missing"));
   const openCart = cartContext?.openCart || (() => { });

   const [activeFaq, setActiveFaq] = useState(null);
   const [showSticky, setShowSticky] = useState(false);

   // SCROLL DETECTION
   useEffect(() => {
      const handleScroll = () => setShowSticky(window.scrollY > 800);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const handleEnroll = (planId) => {
      if (!getNivelacionQuote) return;
      const quote = getNivelacionQuote(planId);
      addToCart({
         id: `caminos-${quote.planId}`,
         title: `Programa Caminos: ${quote.title}`,
         price: quote.monthlyPrice,
         detail: quote.isFree ? 'Beca de Gratuidad (Cupo Social)' : 'Mensualidad Estándar',
         type: 'course',
         extraInfo: quote.isFree ? 'Requiere 80% Asistencia' : `+ Matrícula ${clp(quote.registration)}`
      });
      openCart();
   };

   const toggleFaq = (idx) => {
      setActiveFaq(activeFaq === idx ? null : idx);
   };

   const scrollToPlans = () => {
      const section = document.getElementById("plans-section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
   };

   // --- SAFETY CHECK (Rescue Mission) ---
   if (!CAMINOS_CONTENT || !STUDY_CYCLES || !PLANS) {
      return (
         <div className="min-h-screen bg-stone-900 flex items-center justify-center text-orange-500">
            <div className="text-center">
               <FaHandHoldingHeart className="text-5xl mx-auto mb-4 animate-bounce" />
               <h2 className="text-2xl font-bold">Cargando esperanza...</h2>
               <p className="text-stone-400 mt-2">Estamos preparando los cupos para ti.</p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-orange-200/50">

         {/* ──────────────── 1. HERO (EMPATHETIC) ──────────────── */}
         <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 bg-stone-900 text-white">
            {/* Warm Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#451a03_0%,#0c0a09_70%)] opacity-80 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p5.png')] opacity-10 z-0 mix-blend-overlay"></div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="inline-block mb-6"
               >
                  <span className="text-orange-400 font-bold tracking-widest uppercase text-sm border-b-2 border-orange-500 pb-1">
                     {CAMINOS_CONTENT?.subtitle || "Programa Caminos"}
                  </span>
               </motion.div>

               <motion.h1
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
               >
                  {CAMINOS_CONTENT.title}
               </motion.h1>

               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-10 border border-white/5"
               >
                  <p className="text-xl md:text-2xl text-stone-200 font-light italic leading-relaxed">
                     "{CAMINOS_CONTENT.heroText}"
                  </p>
               </motion.div>

               <motion.button
                  initial="hidden" animate="visible" variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToPlans}
                  className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-full text-lg shadow-[0_10px_40px_rgba(234,88,12,0.4)] transition-all flex items-center justify-center gap-2 mx-auto"
               >
                  <FaHandHoldingHeart /> Solicitar Cupo Social
               </motion.button>

            </div>
         </header>

         {/* ──────────────── 2. MANIFESTO & CYCLES ──────────────── */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                  <div className="md:w-1/2">
                     <h2 className="text-4xl font-bold text-stone-900 mb-6">El modelo "Robin Hood"</h2>
                     <p className="text-lg text-stone-600 leading-relaxed mb-6">
                        {CAMINOS_CONTENT.impactQuote}
                     </p>
                     <p className="text-stone-600 leading-relaxed mb-8">
                        Funciona así: quienes pueden pagar un precio justo (Plan Estándar) o solidario (Plan Padrino),
                        subsidian directamente a quienes no tienen recursos (Cupo Social). Es una comunidad de apoyo real.
                     </p>
                     <div className="flex items-center gap-4 text-sm font-bold text-stone-500">
                        <div className="flex -space-x-3">
                           {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 bg-stone-200 rounded-full border-2 border-white"></div>)}
                        </div>
                        +1.200 Graduados
                     </div>
                  </div>
                  <div className="md:w-1/2 relative bg-stone-100 rounded-3xl p-8 border border-stone-200">
                     <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-orange-500 text-white p-3 rounded-full shadow-lg">
                        <FaHeart className="text-xl animate-pulse" />
                     </div>
                     <h3 className="font-bold text-stone-800 mb-4">Lo que dicen nuestros alumnos:</h3>
                     <blockquote className="italic text-stone-600 text-lg">
                        "Pensé que por mi edad me iba a costar mucho, pero los profes tienen una paciencia de oro.
                        Saqué mi 4to medio a los 54 años y ahora estoy estudiando Técnico en Enfermería."
                     </blockquote>
                     <div className="mt-4 text-right">
                        <strong className="block text-stone-900">Marta G.</strong>
                        <span className="text-xs text-stone-500">Generación 2024</span>
                     </div>
                  </div>
               </div>

               {/* CYCLES GRID */}
               <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Ciclos Disponibles (Modalidad 2x1)</h3>
                  <p className="text-stone-500">Terminas dos años en uno.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {STUDY_CYCLES.map((cycle, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-stone-50 p-6 rounded-2xl border border-stone-200 hover:border-orange-300 transition-colors text-center group"
                     >
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{cycle.icon}</div>
                        <h4 className="font-bold text-stone-800 mb-1">{cycle.name}</h4>
                        <span className="text-orange-600 text-sm font-bold bg-orange-100 px-2 py-1 rounded inline-block">
                           {cycle.equivalence}
                        </span>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 3. PROCESS TIMELINE ──────────────── */}
         <section className="py-24 bg-stone-100 border-y border-stone-200">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl font-bold text-center mb-16">Tu Camino a la Licenciatura</h2>
               <div className="relative">
                  {/* Line */}
                  <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-stone-300 -translate-y-1/2 z-0"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                     {STEPS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none">
                           <div className="w-12 h-12 bg-stone-800 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-stone-100">
                              {i + 1}
                           </div>
                           <strong className="text-lg text-stone-900 block mb-2">{step.title}</strong>
                           <p className="text-sm text-stone-500">{step.text}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ──────────────── 4. PRICING CARDS (ROBIN HOOD) ──────────────── */}
         <section id="plans-section" className="py-24 bg-stone-900 text-white">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Únete a la Causa</h2>
                  <p className="text-stone-400">Elige cuánto puedes aportar. Nadie se queda fuera.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                  {PLANS.map((plan, idx) => {
                     const isStandard = plan.id === 'consciente';
                     const isSocial = plan.id === 'social';
                     const isPadrino = plan.id === 'padrino';

                     return (
                        <motion.div
                           key={plan.id}
                           whileHover={{ y: -10 }}
                           className={`relative rounded-3xl p-8 flex flex-col h-full
                       ${isStandard ? 'bg-sky-600 text-white' : 'bg-stone-800 border border-stone-700'}
                       ${isPadrino ? 'bg-gradient-to-br from-amber-600 to-amber-700 border-none' : ''}
                       ${isSocial ? 'bg-stone-800/50' : ''}
                     `}
                        >
                           <div className="bg-black/20 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded w-fit mb-4">
                              {plan.tag}
                           </div>

                           <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                           <div className="flex items-baseline gap-1 mb-4">
                              <span className="text-4xl font-bold">{clp(plan.price)}</span>
                              <span className="text-sm opacity-80">/mes</span>
                           </div>

                           <p className="text-sm opacity-90 mb-8 min-h-[50px] leading-relaxed">
                              {plan.desc}
                           </p>

                           <ul className="space-y-4 mb-8 flex-1">
                              {plan.features.map((f, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm">
                                    <FaCheck className={`mt-1 shrink-0 ${isStandard || isPadrino ? 'text-white' : 'text-stone-400'}`} />
                                    <span>{f}</span>
                                 </li>
                              ))}
                           </ul>

                           <button
                              onClick={() => handleEnroll(plan.id)}
                              className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg
                          ${isStandard ? 'bg-white text-sky-700 hover:bg-sky-50' : ''}
                          ${isPadrino ? 'bg-white text-amber-700 hover:bg-amber-50' : ''}
                          ${isSocial ? 'bg-stone-700 hover:bg-stone-600 border border-stone-600' : ''}
                        `}
                           >
                              {plan.cta}
                           </button>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* ──────────────── 5. PREGUNTAS FRECUENTES ──────────────── */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
               <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>

               <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                     <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                        <button
                           onClick={() => toggleFaq(i)}
                           className="w-full flex justify-between items-center p-6 bg-stone-50 hover:bg-stone-100 transition-colors text-left"
                        >
                           <span className="font-bold text-stone-800">{faq.q}</span>
                           {activeFaq === i ? <FaChevronUp /> : <FaChevronDown className="text-stone-400" />}
                        </button>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0 }}
                                 animate={{ height: "auto" }}
                                 exit={{ height: 0 }}
                                 className="overflow-hidden bg-white"
                              >
                                 <div className="p-6 text-stone-600 leading-relaxed border-t border-stone-100">
                                    {faq.a}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>

               <div className="mt-12 bg-blue-50 p-8 rounded-2xl flex md:flex-row flex-col items-center gap-6 text-center md:text-left">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl shrink-0">
                     <FaInfoCircle />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-blue-900 mb-1">Requisitos de Matrícula</h4>
                     <p className="text-sm text-blue-700">Solo necesitas tu Carnet de Identidad y Certificado de Nacimiento/Estudios. Si no los tienes, te ayudamos a obtenerlos.</p>
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
                  className="fixed bottom-0 left-0 w-full bg-stone-900/95 backdrop-blur-md border-t border-stone-800 z-50 py-3"
               >
                  <div className="container mx-auto px-6 flex justify-between items-center text-white">
                     <div>
                        <strong className="text-orange-400 block">Programa Caminos</strong>
                        <span className="text-xs text-stone-400">Nivelación de Estudios 2026</span>
                     </div>
                     <button
                        onClick={scrollToPlans}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg text-sm transition-colors shadow-lg"
                     >
                        Postular Ahora
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
   );
}