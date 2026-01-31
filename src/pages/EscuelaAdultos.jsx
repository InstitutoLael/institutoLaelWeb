import React from "react";
import SEOHead from "../components/SEOHead.jsx";
import { motion } from "framer-motion";

import { useCart } from "../context/CartContext.jsx";

// Icons
import {
   FaRegCheckCircle, FaCheck,
   FaWhatsapp, FaGraduationCap
} from "react-icons/fa";
import { BiBookHeart } from "react-icons/bi";
import { MdSchool, MdOutlineWorkOutline, MdTimelapse } from "react-icons/md";

// DATA
import { PLANS, REGISTRATION_FEE, clp } from "../data/nivelacion.js";
import { TESTIMONIALS } from "../data/testimonials.js";
import { teachers } from "../data/teachers.js";
import { FaStar } from "react-icons/fa";

export default function EscuelaAdultos() {
   const { addToCart, openCart } = useCart();
   
   return (
      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">
         <SEOHead 
            title="Escuela de Adultos | 2 años en 1" 
            description="Nunca es tarde para terminar el colegio. Programa 100% Online y válido MINEDUC."
            jsonLd={{
               "@context": "https://schema.org",
               "@type": "Course",
               "name": "Nivelación de Estudios 2 en 1",
               "description": "Termina tu Enseñanza Media con nuestros exámenes libres válidos ante el MINEDUC.",
               "provider": {
                  "@type": "EducationalOrganization",
                  "name": "Instituto Lael",
                  "sameAs": "https://institutolael.cl"
               },
               "offers": {
                  "@type": "Offer",
                  "price": "12990",
                  "priceCurrency": "CLP",
                  "category": "Paid"
               }
            }}
         />

         {/* ──────────────── 1. HEADER (Nunca es Tarde) ──────────────── */}
         <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)]">
            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                     Admisión 2026 Abierta
                  </span>
                  
                  <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter uppercase text-white">
                     Nunca es tarde <br />
                     <span className="text-indigo-400">para cumplir tus metas.</span>
                  </h1>

                  <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                     Termina tu Enseñanza Media con nuestro programa <strong className="text-white font-bold">2 en 1</strong> (Dos cursos en un año).
                     100% Online y compatible con tu trabajo.
                  </p>

                  <a 
                     href="https://wa.me/56964626568?text=Hola,%20necesito%20info%20sobre%20Escuela%20de%20Adultos"
                     target="_blank"
                     rel="noreferrer"
                     className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full text-xs shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-widest hover:scale-105"
                  >
                     <FaWhatsapp className="text-lg" /> Matricularme Ahora - Cupos 2026
                  </a>

                  {/* Bullet Points */}
                  <div className="mt-16 flex flex-col md:flex-row justify-center gap-6 text-sm text-slate-400 font-medium">
                      <div className="flex items-center gap-2"><FaRegCheckCircle className="text-emerald-500" /> Exámenes válidos ante el Mineduc</div>
                      <div className="flex items-center gap-2"><FaRegCheckCircle className="text-emerald-500" /> Clases grabadas si no puedes asistir</div>
                      <div className="flex items-center gap-2"><FaRegCheckCircle className="text-emerald-500" /> Apoyo constante de profes</div>
                  </div>
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. LA GRAN DUDA (Validación) ──────────────── */}
         <section className="py-24 bg-[#050505] border-y border-white/5">
             <div className="container mx-auto px-6 text-center max-w-3xl">
                 <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-8 text-indigo-500 shadow-2xl">
                     <FaGraduationCap />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8">
                     ¿Es válido mi certificado?
                 </h2>
                 <p className="text-xl md:text-3xl text-emerald-400 font-black leading-relaxed mb-6 uppercase tracking-tight">
                     ¡SÍ, TOTALMENTE VALIDO!
                 </p>
                 <p className="text-lg text-slate-400 leading-relaxed font-light">
                     Nuestro programa te prepara para rendir los <strong>Exámenes Libres</strong> válidos ante el <strong>MINEDUC</strong>. 
                     Tu licencia de enseñanza media sirve para trabajar, estudiar una carrera técnica o entrar a la Universidad.
                 </p>
             </div>
         </section>

         {/* ──────────────── 3. CÓMO FUNCIONA (Paso a Paso) ──────────────── */}
         <section className="py-24 bg-[#020617]">
             <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Tu Camino al Éxito</h2>
                     <p className="text-slate-500">Simple, claro y acompañado en todo momento.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {[
                         { step: "01", title: "Matrícula Online", desc: "Te inscribes 100% online desde tu teléfono o computador.", icon: <BiBookHeart /> },
                         { step: "02", title: "Clases Flexibles", desc: "Te conectas en la tarde. ¿Trabajas? Ves las grabaciones cuando quieras.", icon: <MdOutlineWorkOutline /> },
                         { step: "03", title: "Inscripción Exámenes", desc: "Te guiamos paso a paso para inscribirte en el Mineduc.", icon: <MdSchool /> },
                         { step: "04", title: "Licencia en Mano", desc: "Apruebas tus exámenes y recibes tu certificado oficial.", icon: <MdTimelapse /> }
                     ].map((item, i) => (
                         <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-colors group">
                             <div className="text-4xl text-slate-600 font-black mb-6 opacity-30 group-hover:text-amber-500 group-hover:opacity-100 transition-all">{item.step}</div>
                             <div className="text-3xl text-indigo-500 mb-4">{item.icon}</div>
                             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{item.title}</h3>
                             <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                         </div>
                     ))}
                 </div>
             </div>
         </section>

         {/* ──────────────── 4. CTA FINAL ──────────────── */}
         {/* ──────────────── 4. MENTORES (EMPATÍA) ──────────────── */}
         <section className="py-24 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                     Profes que te <span className="text-indigo-500">Entienden</span>
                  </h2>
                  <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
                     Sabemos que llevas años sin estudiar. No te preocupes, tenemos paciencia infinita.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {teachers.filter(t => t.tags?.includes('adultos') || t.name === 'Diego Chaparro' || t.name === 'Martín').slice(0, 2).map((t, i) => (
                     <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
                        <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center text-4xl border border-indigo-500/30 shrink-0">
                           {t.id === 'diego' ? '👨🏻‍🏫' : '🧑🏻‍🏫'}
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-white uppercase tracking-tight">{t.name}</h4>
                           <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">{t.role}</span>
                           <p className="text-slate-400 text-xs italic">"{t.bio.substring(0, 80)}..."</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 5. HISTORIAS DE ÉXITO ──────────────── */}
         <section className="py-24 bg-[#020617] border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                     Sí se puede.
                  </h2>
                  <p className="text-slate-500">Muchos pensaron que no podrían. Hoy tienen su licencia.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.filter(t => t.tags?.includes('adultos') || t.program.includes('Laboral')).slice(0, 3).map((t, i) => (
                     <div key={i} className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col hover:bg-white/[0.04] transition-colors">
                        <div className="flex text-amber-500 mb-4 text-xs">
                           {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 italic flex-1">"{t.quote}"</p>
                        <div className="border-t border-white/5 pt-4">
                           <strong className="block text-white text-sm uppercase tracking-tight">{t.name}</strong>
                           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.program}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 6. PRECIOS Y MATRÍCULA ──────────────── */}
         <section id="planes" className="py-24 bg-[#050505] relative border-t border-white/5">
             <div className="container mx-auto px-6">
                 <div className="text-center mb-16 max-w-3xl mx-auto">
                     <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Elige tu Plan</h2>
                     <p className="text-xl text-slate-400 font-light">
                         En Lael funcionamos con un sistema solidario. <br />
                         <span className="text-indigo-400 font-bold">Tú eliges cuánto puedes aportar.</span>
                     </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                     {PLANS.map((plan) => (
                         <div 
                             key={plan.id}
                             className={`relative p-8 rounded-[2.5rem] border transition-all flex flex-col h-full bg-[#0a0a0b]
                                 ${plan.isPopular ? 'border-indigo-500 shadow-2xl shadow-indigo-900/20 scale-105 z-10' : 'border-white/10 hover:border-white/20'}
                             `}
                         >
                             {plan.isPopular && (
                                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                                     Recomendado
                                 </div>
                             )}

                             <div className="text-center mb-8">
                                 <span className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: plan.color }}>{plan.tag}</span>
                                 <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{plan.title}</h3>
                                 <div className="flex items-center justify-center gap-1">
                                     <span className="text-4xl font-black text-white tracking-tighter">{clp(plan.price)}</span>
                                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">/mes</span>
                                 </div>
                                 <p className="text-xs text-slate-500 mt-4 px-4 leading-relaxed">{plan.desc}</p>
                             </div>

                             <ul className="space-y-4 mb-8 flex-1">
                                 {plan.features.map((feat, i) => (
                                     <li key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                                         <FaCheck className="mt-1 shrink-0" style={{ color: plan.color }} />
                                         <span className="leading-tight">{feat}</span>
                                     </li>
                                 ))}
                             </ul>

                             <div className="bg-white/[0.03] p-4 rounded-xl mb-6 text-center border border-white/5">
                                 <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total a Pagar Hoy</span>
                                 <div className="text-lg font-black text-white">
                                     {clp(plan.price + REGISTRATION_FEE)}
                                 </div>
                                 <span className="text-[9px] text-slate-500">(Primer mes + Matrícula {clp(REGISTRATION_FEE)})</span>
                             </div>

                             <button
                                 onClick={() => {
                                     addToCart({
                                         id: `nivelacion-${plan.id}`,
                                         title: `Nivelación: ${plan.title}`,
                                         price: plan.price + REGISTRATION_FEE,
                                         detail: plan.title,
                                         detail_secondary: `Matrícula: ${clp(REGISTRATION_FEE)}`,
                                         type: 'program'
                                     });
                                     openCart();
                                 }}
                                 className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all hover:scale-[1.02] active:scale-95"
                                 style={{ 
                                     backgroundColor: plan.isPopular ? '#4f46e5' : 'rgba(255,255,255,0.05)',
                                     color: plan.isPopular ? '#fff' : '#94a3b8',
                                     border: plan.isPopular ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                 }}
                             >
                                 Inscribirme Ahora
                             </button>
                         </div>
                     ))}
                 </div>
                 
                 <div className="mt-16 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
                     * Al inscribirte aceptas nuestro compromiso de asistencia y participación. 
                     Nuestros cupos son limitados para asegurar la calidad de la enseñanza.
                 </div>
             </div>
         </section>

         {/* ──────────────── 6. DUDAS & CONTACTO ──────────────── */}
         <section className="py-24 border-t border-white/5 bg-[#020617]">
             <div className="container mx-auto px-6 text-center max-w-2xl">
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">¿Aún tienes dudas?</h2>
                 <p className="text-slate-400 mb-10 text-lg">
                     Nuestras coordinadoras te están esperando para orientarte con cariño y paciencia.
                 </p>
                 <a 
                     href="https://wa.me/56964626568?text=Hola,%20tengo%20dudas%20sobre%20la%20Escuela%20de%20Adultos"
                     target="_blank"
                     rel="noreferrer"
                     className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg uppercase tracking-widest transition-all hover:scale-105"
                 >
                     <FaWhatsapp className="text-lg" /> Hablar por WhatsApp
                 </a>
             </div>
         </section>

      </div>
   );
}