import React from "react";
import SEOHead from "../components/SEOHead.jsx";
import { motion } from "framer-motion";

// Icons
import {
   FaRegCheckCircle,
   FaWhatsapp, FaGraduationCap
} from "react-icons/fa";
import { BiBookHeart } from "react-icons/bi";
import { MdSchool, MdOutlineWorkOutline, MdTimelapse } from "react-icons/md";

// DATA (Import only what's needed or keep existing imports if used in logic I might re-add later, 
// but for the "Sales Page" requested, I will simplify to focus on copy)

export default function EscuelaAdultos() {
   
   return (
      <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">
         <SEOHead title="Escuela de Adultos | 2 años en 1" description="Nunca es tarde para terminar el colegio. Programa 100% Online y válido MINEDUC." />

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
         <section className="py-32 bg-[#050505] text-center border-t border-white/5">
             <div className="container mx-auto px-6 max-w-2xl">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">¿Listo para cambiar tu historia?</h2>
                 <p className="text-slate-400 mb-10 text-lg">
                     Nuestras coordinadoras te están esperando para orientarte y resolver todas tus dudas con cariño y paciencia.
                 </p>
                 <a 
                     href="https://wa.me/56964626568?text=Hola,%20quiero%20terminar%20mi%20colegio"
                     target="_blank"
                     rel="noreferrer"
                     className="block w-full sm:w-auto px-12 py-5 bg-white text-slate-950 font-black rounded-xl text-xs shadow-2xl transition-all hover:scale-105 uppercase tracking-widest flex items-center justify-center gap-2"
                 >
                     <FaWhatsapp className="text-[#25D366] text-xl" /> Hablar con Coordinadora
                 </a>
             </div>
         </section>

      </div>
   );
}