import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { 
  FaHandHoldingHeart, 
  FaCheckCircle, 
  FaArrowRight, 
  FaWhatsapp, 
  FaQrcode,
  FaUserGraduate,
  FaShieldAlt,
  FaHeart,
  FaPlus,
  FaChevronDown
} from "react-icons/fa";

// DATA
import { 
  CAMINOS_CONTENT, 
  PLANS, 
  STUDY_CYCLES, 
  STEPS, 
  FAQS, 
  REQUIREMENTS, 
  REGISTRATION_FEE,
  clp 
} from "../data/nivelacion.js";

// COMPONENTS
import SEOHead from "../components/SEOHead.jsx";
import EnrollmentModal from "../components/ui/EnrollmentModal.jsx";

export default function EscuelaAdultos() {
  const [openFaq, setOpenFaq] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const waLink = (text) => `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <SEOHead 
        title="Escuela de Adultos | Programa Caminos | Instituto Lael" 
        description="Termina tu 4to medio con el Programa Caminos. Modelo solidario 'Robin Hood' para que nadie se quede fuera."
      />

      <EnrollmentModal 
        isOpen={!!enrollPlan} 
        onClose={() => setEnrollPlan(null)} 
        plan={enrollPlan} 
      />

      {/* ──────────────── 1. HERO SECTION (SEGUNDA OPORTUNIDAD) ──────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-slate-900 border-b border-white/5">
        {/* Warm Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-900/20 z-0" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-10 shadow-xl shadow-amber-500/5"
          >
             Matrículas 2026 Abiertas • Cupos Limitados
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
          >
            TU SEGUNDA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-orange-400">
               OPORTUNIDAD.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {CAMINOS_CONTENT.heroText}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => scrollToSection('precios')}
            className="px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-amber-600/30 uppercase tracking-widest text-sm"
          >
            VER BECAS DISPONIBLES
          </motion.button>
        </div>
      </section>

      {/* ──────────────── 2. IMPACT MANIFESTO (QUOTE) ──────────────── */}
      <section className="py-24 bg-stone-100 flex items-center justify-center px-6">
         <div className="container max-w-4xl text-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center"
            >
               <FaHandHoldingHeart className="text-6xl text-amber-600 mb-12 opacity-50" />
               <blockquote className="text-3xl md:text-5xl font-serif italic text-slate-800 leading-snug mb-8">
                  "{CAMINOS_CONTENT.impactQuote}"
               </blockquote>
               <div className="h-1 w-24 bg-amber-500/30 rounded-full" />
            </motion.div>
         </div>
      </section>

      {/* ──────────────── 3. EL MODELO ROBIN HOOD (PRICING) ──────────────── */}
      <section id="precios" className="py-32 bg-stone-50 overflow-hidden">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4"> Una Educación <span className="text-amber-600">Solidaria</span></h2>
               <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Elige tu compromiso. Nadie se queda fuera por dinero.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
               {PLANS.map((plan, i) => (
                  <motion.div
                     key={plan.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className={`relative p-10 rounded-[2.5rem] border-2 transition-all flex flex-col h-full bg-white shadow-xl shadow-slate-200/50 group overflow-hidden ${plan.isPopular ? 'border-amber-500 scale-105 z-10' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                     {/* Background Glow */}
                     <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" style={{ backgroundColor: plan.color }} />

                     {plan.id === 'padrino' && (
                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-amber-500 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                           Conviértete en Héroe
                        </div>
                     )}

                     <div className="mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block" style={{ color: plan.color }}>{plan.tag}</span>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">{plan.title}</h3>
                        <div className="flex items-baseline gap-2">
                           <span className="text-5xl font-black text-slate-900 tracking-tighter">{clp(plan.price)}</span>
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">/Mes</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-6 font-medium leading-relaxed">
                           {plan.desc}
                        </p>
                     </div>

                     <div className="flex-1 space-y-4 mb-10 border-t border-slate-100 pt-8">
                        {plan.features.map((f, j) => (
                           <div key={j} className="flex gap-3 text-xs text-slate-600 font-medium">
                              <FaCheckCircle className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                              {f}
                           </div>
                        ))}
                     </div>

                     <button
                        onClick={() => setEnrollPlan({ id: plan.id, name: plan.title, paymentUrl: plan.paymentUrl })}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center transition-all ${plan.isPopular ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/30'}`}
                     >
                        {plan.cta}
                     </button>
                  </motion.div>
               ))}
            </div>

            <p className="text-center mt-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
               * Matrícula única de inscripción: <strong className="text-slate-600">{clp(REGISTRATION_FEE)}</strong>. Pago por derecho de plataforma y gestión Mineduc.
            </p>
         </div>
      </section>

      {/* ──────────────── 4. CICLOS DE ESTUDIO (GRID) ──────────────── */}
      <section className="py-32 bg-slate-900 text-white">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">¿Qué necesitas <span className="text-amber-500">terminar?</span></h2>
               <p className="text-slate-400 font-light">Nivelamos desde educación básica hasta enseñanza media.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {STUDY_CYCLES.map((cycle, i) => (
                  <div key={cycle.id} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                     <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{cycle.icon}</div>
                     <h3 className="text-xl font-black uppercase tracking-tight mb-2 leading-tight">{cycle.name}</h3>
                     <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">{cycle.equivalence}</p>
                     <div className="mt-10 pt-8 border-t border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Licencia Oficial</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 5. RUTA DE EGRESO (TIMELINE) ──────────────── */}
      <section className="py-32 bg-stone-50">
         <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Ruta hacia tu <span className="text-amber-600">Título</span></h2>
               <p className="text-slate-500 font-medium">Del primer paso hasta el certificado legal.</p>
            </div>

            <div className="relative space-y-16">
               <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-amber-500/20 md:-translate-x-1/2" />
               
               {STEPS.map((step, i) => (
                  <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                     {/* Point */}
                     <div className="absolute left-[20px] md:left-1/2 w-10 h-10 bg-amber-500 border-4 border-white rounded-full md:-translate-x-1/2 shadow-xl z-10 flex items-center justify-center text-white font-black text-xs">
                        {i + 1}
                     </div>

                     <div className="flex-1 pl-16 md:pl-0 md:text-right">
                        {i % 2 !== 0 && (
                           <motion.div 
                              initial={{ opacity: 0, x: -30 }} 
                              whileInView={{ opacity: 1, x: 0 }}
                              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl inline-block max-w-md text-left"
                           >
                              <h4 className="text-xl font-black text-slate-900 uppercase mb-2 tracking-tight">{step.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.text}</p>
                           </motion.div>
                        )}
                     </div>

                     <div className="flex-1 pl-16 md:pl-0 text-left">
                        {i % 2 === 0 && (
                           <motion.div 
                              initial={{ opacity: 0, x: 30 }} 
                              whileInView={{ opacity: 1, x: 0 }}
                              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl inline-block max-w-md"
                           >
                              <h4 className="text-xl font-black text-slate-900 uppercase mb-2 tracking-tight">{step.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.text}</p>
                           </motion.div>
                        )}
                     </div>
                  </div>
               ))}
               
               {/* Final badge in timeline */}
               <div className="relative flex justify-center pt-10">
                  <div className="bg-amber-600 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl z-20 animate-bounce">
                     ¡Certificado Oficial!
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── 6. REQUISITOS Y DUDAS ──────────────── */}
      <section className="py-32 border-t border-slate-200 bg-stone-100">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               
               {/* Requirements */}
               <div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-10">Requisitos para <span className="text-amber-600">Empezar</span></h2>
                  <div className="space-y-6">
                     {REQUIREMENTS.map((req, i) => (
                        <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
                           <FaCheckCircle className="text-emerald-500 text-2xl shrink-0" />
                           <p className="text-slate-700 font-bold text-sm">{req}</p>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-center gap-6">
                     <FaShieldAlt className="text-4xl text-blue-600 shrink-0" />
                     <p className="text-xs text-blue-800 font-medium leading-relaxed">
                        <strong>¿Dudas con el trámite?</strong> Nuestro equipo académico se encarga de gestionar tus certificados ante el Mineduc sin costo adicional para ti.
                     </p>
                  </div>
               </div>

               {/* FAQs Accordion */}
               <div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-10">Preguntas <span className="text-cyan-600">Frecuentes</span></h2>
                  <div className="space-y-4">
                     {FAQS.map((faq, i) => (
                        <div key={i} className="border border-slate-200 rounded-3xl bg-white overflow-hidden transition-all shadow-sm">
                           <button 
                              onClick={() => setOpenFaq(openFaq === i ? null : i)}
                              className="w-full p-6 text-left flex justify-between items-center group"
                           >
                              <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{faq.q}</span>
                              <FaChevronDown className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                           </button>
                           <AnimatePresence>
                              {openFaq === i && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6"
                                 >
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                                       {faq.a}
                                    </p>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     ))}
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="py-12 bg-amber-600">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">¿Listo para el cambio?</h3>
               <p className="text-amber-100 font-medium">Hablemos por WhatsApp y aseguremos tu cupo social.</p>
            </div>
            <button 
            onClick={() => addToCart({ id: 'adultos-consulting', title: 'Consultoría Adultos', price: 10000, type: 'Adultos' })} 
               className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl transition-all shadow-2xl hover:bg-stone-100 uppercase tracking-widest text-[10px] flex items-center gap-3"
            >
               <FaWhatsapp className="text-lg text-emerald-600" /> CONTACTAR COORDINACIÓN
            </button>
         </div>
      </section>

    </div>
  );
}