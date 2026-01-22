import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
   FaHandHoldingHeart, FaUserGraduate, FaChalkboardTeacher, FaRegCheckCircle,
   FaWhatsapp, FaInfoCircle, FaChevronDown, FaChevronUp, FaHeart, FaHandsHelping, FaCheck
} from "react-icons/fa";
import { MdOutlineWorkOutline, MdSchool, MdTimelapse, MdOutlineFamilyRestroom } from "react-icons/md";
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
   const { addToCart, openCart } = useCart();
   const [activeFaq, setActiveFaq] = useState(null);
   const [showSticky, setShowSticky] = useState(false);

   // SCROLL DETECTION
   useEffect(() => {
      const handleScroll = () => setShowSticky(window.scrollY > 800);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const handleEnroll = (planId) => {
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
      document.getElementById("plans-section").scrollIntoView({ behavior: "smooth" });
   };

   return (
      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-orange-500/30">

         {/* ──────────────── 1. HERO (EMPATHETIC) ──────────────── */}
         <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 bg-[radial-gradient(circle_at_50%_40%,_#451a03_0%,_#050505_80%)]">
            {/* Warm Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
               <motion.div
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="inline-flex flex-col items-center gap-2 mb-6"
               >
                  <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/20 mb-3 animate-pulse">
                     Admisión Pioneros | Lanzamiento 2026
                  </div>
                  <span className="text-orange-400 font-bold tracking-widest uppercase text-xs border-b border-orange-500 pb-1">
                     {CAMINOS_CONTENT.subtitle}
                  </span>
               </motion.div>

               <motion.h1
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter uppercase"
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
         <section className="py-24 bg-[#050505]">
            <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row gap-20 items-center mb-32">
                  <div className="md:w-1/2">
                     <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">El modelo <span className="text-orange-500">"Robin Hood"</span></h2>
                     <p className="text-xl text-slate-400 leading-relaxed mb-8">
                        {CAMINOS_CONTENT.impactQuote}
                     </p>
                     <p className="text-slate-500 leading-relaxed mb-10">
                        Funciona así: quienes pueden pagar un precio justo (Plan Estándar) o solidario (Plan Padrino),
                        subsidian directamente a quienes no tienen recursos (Cupo Social). Es una comunidad de apoyo real diseñada para cambiar destinos.
                     </p>
                     <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="flex -space-x-4">
                           {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 bg-white/5 rounded-full border-2 border-[#050505]"></div>)}
                        </div>
                        +1.200 Vidas Transformadas
                     </div>
                  </div>
                  <div className="md:w-1/2 relative bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] p-12 border border-white/5 shadow-2xl overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 text-orange-500/10 group-hover:text-orange-500/20 transition-colors">
                        <FaHeart size={120} />
                     </div>
                     <h3 className="font-black uppercase tracking-widest text-xs text-orange-500 mb-8 relative z-10">Lo que dicen nuestros alumnos:</h3>
                     <blockquote className="italic text-slate-200 text-2xl font-light leading-relaxed mb-10 relative z-10">
                        "{CAMINOS_CONTENT.heroText.split('.')[0]}..."
                     </blockquote>
                     <div className="text-right relative z-10">
                        <strong className="block text-white font-black uppercase tracking-tight text-lg">Marta G.</strong>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Generación 2024</span>
                     </div>
                  </div>
               </div>

               {/* CYCLES GRID */}
               <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Ciclos Disponibles (Modalidad 2x1)</h3>
                  <p className="text-stone-500">Terminas dos años en uno.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {STUDY_CYCLES.map((cycle, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.03] p-10 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all text-center group backdrop-blur-3xl"
                     >
                        <div className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110 duration-500">{cycle.icon}</div>
                        <h4 className="font-black text-white mb-2 uppercase tracking-tight text-xl">{cycle.name}</h4>
                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] bg-orange-500/10 px-4 py-1.5 rounded-full inline-block border border-orange-500/20">
                           {cycle.equivalence}
                        </span>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 3. PROCESS TIMELINE ──────────────── */}
         <section className="py-24 bg-white/[0.01] border-y border-white/5">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl font-bold text-center mb-16">Tu Camino a la Licenciatura</h2>
               <div className="relative">
                  {/* Line */}
                  <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-stone-300 -translate-y-1/2 z-0"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                     {STEPS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center bg-white/[0.03] lg:bg-transparent p-10 lg:p-0 rounded-[2.5rem] border border-white/5 lg:border-none backdrop-blur-md">
                           <div className="w-16 h-16 bg-white text-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-2xl shadow-white/20">
                              {i + 1}
                           </div>
                           <strong className="text-lg text-white font-black uppercase tracking-tight block mb-3">{step.title}</strong>
                           <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">{step.text}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ──────────────── 4. PRICING CARDS (ROBIN HOOD) ──────────────── */}
         <section id="plans-section" className="py-32 bg-[#050505]">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Únete a la Causa</h2>
                  <p className="text-stone-400">Elige cuánto puedes aportar. Nadie se queda fuera.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
                  {PLANS.map((plan, idx) => {
                     const isStandard = plan.id === 'consciente';
                     const isSocial = plan.id === 'social';
                     const isPadrino = plan.id === 'padrino';

                     return (
                        <motion.div
                           key={plan.id}
                           whileHover={{ y: -10 }}
                           className={`relative rounded-[3rem] p-12 flex flex-col h-full border backdrop-blur-3xl transition-all duration-500
                             ${isStandard ? 'bg-orange-600/10 border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.1)]' : 'bg-white/[0.02] border-white/5'}
                             ${isPadrino ? 'bg-amber-600/10 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.1)]' : ''}
                           `}
                        >
                           <div className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full w-fit mb-8 border border-white/10 text-slate-400">
                              {plan.tag}
                           </div>

                           <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter text-white">{plan.title}</h3>
                           <div className="flex items-baseline gap-2 mb-8">
                              <span className="text-5xl font-black text-white tracking-tighter">{clp(plan.price)}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">/mes</span>
                           </div>

                           <p className="text-sm text-slate-400 mb-10 min-h-[60px] leading-relaxed font-medium">
                              {plan.desc}
                           </p>

                           <ul className="space-y-4 mb-12 flex-1">
                              {plan.features.map((f, i) => (
                                 <li key={i} className="flex items-start gap-4 text-sm font-medium text-slate-300">
                                    <FaCheck className={`mt-1 shrink-0 ${isStandard ? 'text-orange-500' : isPadrino ? 'text-amber-500' : 'text-slate-500'}`} />
                                    <span>{f}</span>
                                 </li>
                              ))}
                           </ul>

                           <button
                              onClick={() => handleEnroll(plan.id)}
                              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl
                                ${isStandard ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-orange-500/20' : ''}
                                ${isPadrino ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20' : ''}
                                ${isSocial ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' : ''}
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
         <section className="py-24 bg-[#050505]">
            <div className="container mx-auto px-6 max-w-3xl">
               <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Preguntas <span className="text-orange-500">Frecuentes</span></h2>

               <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                     <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <button
                           onClick={() => toggleFaq(i)}
                           className="w-full flex justify-between items-center p-8 hover:bg-white/5 transition-colors text-left"
                        >
                           <span className="font-black text-white uppercase tracking-tight text-sm">{faq.q}</span>
                           {activeFaq === i ? <FaChevronUp /> : <FaChevronDown className="text-slate-500" />}
                        </button>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0 }}
                                 animate={{ height: "auto" }}
                                 exit={{ height: 0 }}
                                 className="overflow-hidden bg-white/[0.01]"
                              >
                                 <div className="p-8 text-slate-400 leading-relaxed border-t border-white/5 text-sm font-medium">
                                    {faq.a}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>

               <div className="mt-16 bg-orange-500/5 p-10 rounded-[2.5rem] flex md:flex-row flex-col items-center gap-8 text-center md:text-left border border-orange-500/10">
                  <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center text-3xl shrink-0 border border-orange-500/20 shadow-2xl">
                     <FaInfoCircle />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-black text-white uppercase tracking-tight text-lg mb-2">Requisitos de Matrícula</h4>
                     <p className="text-sm text-slate-500 font-medium">Solo necesitas tu Carnet de Identidad y Certificado de Estudios. Si no los tienes, te brindamos asesoría completa para obtenerlos sin costo.</p>
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
                  className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-2xl border-t border-white/10 z-50 py-5"
               >
                  <div className="container mx-auto px-8 flex justify-between items-center text-white">
                     <div>
                        <strong className="text-orange-500 font-black uppercase tracking-widest text-xs block mb-1">Programa Caminos</strong>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nivelación de Estudios 2026</span>
                     </div>
                     <button
                        onClick={scrollToPlans}
                        className="px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl text-[10px] transition-all shadow-2xl shadow-orange-600/20 uppercase tracking-widest"
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