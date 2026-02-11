import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  FaSignLanguage,
  FaHandsHelping,
  FaUniversalAccess,
  FaWhatsapp,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaInfoCircle,
  FaUsers,
  FaChurch,
  FaGraduationCap,
  FaEye,
  FaBrain
} from "react-icons/fa";

// DATA
import {
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  TEACHER_PROFILE,
  COMPARISON_DATA,
  CHURCH_PRICE,
  clp
} from "../data/lsch.js";

// SEO
import SEOHead from "../components/SEOHead.jsx";
      {/* Enrollment Modal removed in favor of Cart */}

export default function Lsch() {
  const [isChurchMember, setIsChurchMember] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const waLink = (text) => `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <SEOHead 
        title="Lengua de Señas Chilena (LSCh) | Instituto Lael" 
        description="Aprende LSCh con una instructora sorda nativa. Inmersión cultural, gramática visual y empatía real."
      />

      {/* ──────────────── A. HERO SECTION (EL PODER DEL SILENCIO) ──────────────── */}
      <section className="relative min-[90vh] flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-slate-950 to-slate-950 z-0" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-8"
          >
             <FaUniversalAccess className="animate-pulse" />
             Educación Accesible para todos 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
          >
            ROMPE LA BARRERA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400 uppercase">
               DEL SONIDO.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Aprender LSCh no es solo mover las manos. Es abrir los ojos a una cultura <br className="hidden md:block" />
            que ha estado <strong className="text-white">invisible frente a ti.</strong>
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => scrollToSection('planes')}
            className="px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-purple-600/30 uppercase tracking-widest text-sm"
          >
            EMPEZAR EL VIAJE
          </motion.button>
        </div>
      </section>

      {/* ──────────────── B. CONDUCTORA (AUTHORITY BOOST) ──────────────── */}
      <section className="py-24 bg-slate-900/20 border-y border-white/5">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-slate-900/50 rounded-[3rem] p-12 md:p-20 border border-white/5 flex flex-col lg:flex-row gap-16 items-center shadow-2xl overflow-hidden relative">
               {/* Abstract background shape for the card */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />
               
               <div className="w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-[8rem] shadow-xl relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                  <span className="relative z-20 grayscale group-hover:grayscale-0 transition-all duration-700">{TEACHER_PROFILE.img}</span>
               </div>

               <div className="flex-1 relative z-10">
                  <span className="text-cyan-500 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">Tu Instructora</span>
                  <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">{TEACHER_PROFILE.name}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                     {TEACHER_PROFILE.badges.map((b, i) => (
                        <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-purple-300">
                           {b}
                        </span>
                     ))}
                  </div>

                  <div className="border-l-4 border-purple-600 pl-8 mb-8">
                     <p className="text-xl md:text-2xl text-slate-300 font-light italic leading-relaxed">
                        "Combinación única: <strong className="text-white">Paciencia de Educadora de Párvulos</strong> + <strong className="text-white">Autoridad Cultural de una Persona Sorda</strong>."
                     </p>
                  </div>

                  <p className="text-slate-400 leading-relaxed font-light mb-8 max-w-2xl">
                     {TEACHER_PROFILE.bio}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── C. CAMINO DE APRENDIZAJE ──────────────── */}
      <section className="py-32 relative">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Tu Ruta hacia la <span className="text-cyan-500">Fluidez</span></h2>
               <p className="text-slate-500 font-light">Estructura académica diseñada para resultados reales.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               {/* Vertical line connector for desktop */}
               <div className="hidden md:block absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px bg-white/5" />
               
               {LSCH_MODULES.map((mod, i) => (
                  <motion.div 
                     key={mod.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative z-10 backdrop-blur-xl"
                  >
                     <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500" style={{ color: mod.color }}>
                        {i === 0 ? <FaSignLanguage /> : i === 1 ? <FaEye /> : <FaBrain />}
                     </div>
                     
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">{mod.tag}</span>
                     <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{mod.name}</h3>
                     <p className="text-sm text-slate-400 leading-relaxed font-light mb-8">
                        {mod.desc}
                     </p>

                     <div className="space-y-4 border-t border-white/5 pt-8">
                        <span className="text-[10px] font-black uppercase text-cyan-500 tracking-widest block mb-4">Lo que logras:</span>
                        {mod.outcomes.map((item, j) => (
                           <div key={j} className="flex gap-3 text-xs text-slate-300 font-medium">
                              <FaCheckCircle className="text-cyan-600 mt-0.5 shrink-0" /> {item}
                           </div>
                        ))}
                     </div>

                     <div className="mt-10 flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        <span>Duración</span>
                        <span className="text-white">{mod.duration}</span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── D. COMPARATIVA ──────────────── */}
      <section className="py-24 bg-slate-900/40 border-y border-white/5">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">¿Por qué estudiar con nosotros?</h2>
               <p className="text-slate-400 font-light italic">"La Verdad Incómoda" del aprendizaje de LSCh.</p>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-white/10">
                        <th className="py-6 px-4 text-xs font-black uppercase text-slate-500">Diferencia</th>
                        <th className="py-6 px-8 text-center bg-purple-600/10 rounded-t-3xl border-x border-t border-purple-500/20 text-white font-black uppercase tracking-widest text-xs">Instituto Lael</th>
                        <th className="py-6 px-4 text-center text-slate-500 font-black uppercase text-[10px]">Cursos Tradicionales</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                     {COMPARISON_DATA.map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                           <td className="py-6 px-4 text-slate-300">{row.feature}</td>
                           <td className="py-6 px-8 text-center bg-purple-600/5 border-x border-purple-500/10 text-white font-bold">
                              {row.us}
                           </td>
                           <td className="py-6 px-4 text-center text-slate-500 opacity-50">
                              {row.others}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* ──────────────── E. PRICING SECTION (CON TOGGLE) ──────────────── */}
      <section id="planes" className="py-32 relative">
         <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">Elige tu <span className="text-purple-500">Modalidad.</span></h2>
               <p className="text-slate-400 font-light">Clases en vivo, acceso a grabaciones y comunidad exclusiva.</p>
            </div>

            {/* Toggle Switch */}
            <div className="flex flex-col items-center mb-20 gap-8">
               <div 
                  onClick={() => setIsChurchMember(!isChurchMember)}
                  className="flex items-center gap-6 cursor-pointer group"
               >
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors ${!isChurchMember ? 'text-white' : 'text-slate-600'}`}>General</span>
                  <div className="w-16 h-8 bg-white/5 border border-white/10 rounded-full relative p-1 transition-all group-hover:border-purple-500/50">
                     <motion.div 
                        animate={{ x: isChurchMember ? 32 : 0 }}
                        className="w-6 h-6 bg-purple-500 rounded-full"
                     />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors ${isChurchMember ? 'text-white' : 'text-slate-600'}`}>Iglesia / Ministerio</span>
               </div>
               
               {isChurchMember && (
                  <motion.div 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="px-6 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]"
                  >
                     Precio Social Convenio Activo
                  </motion.div>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               
               {isChurchMember ? (
                  /* Single Church Card (Highlighted) */
                  <div className="md:col-span-2 max-w-2xl mx-auto w-full">
                     <PricingCard 
                        title="Convenio Social"
                        price={CHURCH_PRICE}
                        desc="Para ministerios de sordos, fundaciones e iglesias."
                        features={[
                           "Suscripción mensual protegida",
                           "Matrícula 100% Bonificada ($0)",
                           "Acceso a todos los niveles",
                           "Certificación Ministerial Lael",
                           "Material PDF incluido"
                        ]}
                        highlight
                        isChurch
                        onEnroll={() => setEnrollPlan({ id: 'lsch-church', name: 'LSCh Convenio Iglesia', paymentUrl: null })}
                     />
                  </div>
               ) : (
                  /* Standard Plans */
                  <>
                     <PricingCard 
                        title={LSCH_GROUP_PLANS[0].title}
                        price={LSCH_GROUP_PLANS[0].price}
                        desc={LSCH_GROUP_PLANS[0].desc}
                        features={LSCH_GROUP_PLANS[0].features}
                        badge={LSCH_GROUP_PLANS[0].badge}
                        onEnroll={() => setEnrollPlan({ id: LSCH_GROUP_PLANS[0].id, name: LSCH_GROUP_PLANS[0].title, paymentUrl: LSCH_GROUP_PLANS[0].paymentUrl })}
                     />
                     <PricingCard 
                        title={LSCH_GROUP_PLANS[1].title}
                        price={LSCH_GROUP_PLANS[1].price}
                        desc={LSCH_GROUP_PLANS[1].desc}
                        features={LSCH_GROUP_PLANS[1].features}
                        badge={LSCH_GROUP_PLANS[1].badge}
                        highlight
                        onEnroll={() => addToCart({ 
                           id: LSCH_GROUP_PLANS[1].id, 
                           title: LSCH_GROUP_PLANS[1].title, 
                           price: LSCH_GROUP_PLANS[1].price,
                           type: 'Curso LSCh'
                        })}
                     />
                  </>
               )}

            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-gradient-to-t from-slate-900 to-slate-950 text-center px-6 border-t border-white/5">
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
         >
            <FaHandsHelping className="text-7xl text-purple-500 mx-auto mb-10" />
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-10 leading-none">
               TU VOZ <br /> EN TUS MANOS.
            </h2>
            <p className="text-slate-500 font-medium mb-12 max-w-xl mx-auto">
               Inicia hoy tu formación en LSCh y sé parte de la solución de inclusión en Chile.
            </p>
            <button 
               onClick={() => addToCart({ id: 'lsch-consulting', title: 'Consultoría Especializada LSCh', price: 15000, type: 'LSCh' })} 
               className="inline-flex items-center gap-4 px-12 py-6 bg-purple-600 text-white font-black rounded-[2rem] hover:bg-purple-500 transition-all shadow-2xl shadow-purple-600/30 uppercase tracking-widest text-xs group"
            >
               Hablar con Fernanda
               <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
            </button>
         </motion.div>
      </section>

    </div>
  );
}

// ──────────────── SUB-COMPONENTS ────────────────

const PricingCard = ({ title, price, desc, features, badge, highlight, isChurch, onEnroll }) => (
   <div className={`relative p-12 rounded-[3rem] border transition-all flex flex-col h-full bg-white/[0.01] ${highlight ? 'border-purple-500/50 shadow-2xl bg-white/[0.03]' : 'border-white/5'}`}>
      {badge && (
         <div className="absolute top-0 right-10 -translate-y-1/2 bg-purple-600 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
            {badge}
         </div>
      )}
      
      <div className="mb-10">
         <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{title}</h3>
         <p className="text-xs text-slate-500 font-medium">{desc}</p>
      </div>

      <div className="mb-10">
         <span className="text-6xl font-black text-white tracking-tighter">{clp(price)}</span>
         <span className="text-[10px] font-black uppercase text-slate-600 ml-2">/Mes</span>
         {!isChurch && !highlight && (
            <div className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
               + Matrícula Anual
            </div>
         )}
         {highlight && !isChurch && (
            <div className="mt-4 text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
               <FaCheckCircle /> Matrícula $0
            </div>
         )}
      </div>

      <div className="space-y-5 flex-1 mb-12">
         {features.map((f, i) => (
            <div key={i} className="flex gap-4 text-sm text-slate-400 font-medium leading-tight">
               <FaCheckCircle className="text-purple-600 mt-1 shrink-0" /> {f}
            </div>
         ))}
      </div>

      <button 
         onClick={onEnroll}
         className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center transition-all ${highlight ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
      >
         Solicitar Matrícula
      </button>
   </div>
);