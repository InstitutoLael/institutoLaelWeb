import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBuilding, 
  FaChartLine, 
  FaHandshake, 
  FaCalculator, 
  FaWhatsapp, 
  FaArrowRight, 
  FaCheckCircle, 
  FaUsers, 
  FaRocket, 
  FaFileAlt,
  FaShieldAlt,
  FaChartBar,
  FaCogs,
  FaBriefcase
} from "react-icons/fa";
import { MdVerified, MdBusinessCenter } from "react-icons/md";

// DATA
import { 
  SERVICE_LINES, 
  EMP_PACKS, 
  calcQuote, 
  clp, 
  WAPP_INTL 
} from "../data/empresas.js";

// COMPONENTS
import SEOHead from "../components/SEOHead.jsx";

export default function Empresas() {
  // Configurator State
  const [selectedServiceId, setSelectedServiceId] = useState("ingles");
  const [headcount, setHeadcount] = useState(10);
  const [months, setMonths] = useState(3);
  const [modality, setModality] = useState("online");
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Recalculate quote
  useEffect(() => {
    const result = calcQuote({
      lineId: selectedServiceId,
      headcount: Number(headcount),
      durationMonths: Number(months),
      modality: modality
    });
    setQuote(result);
  }, [selectedServiceId, headcount, months, modality]);

  const handleWappClick = (customMsg = null) => {
    if (!quote && !customMsg) return;
    
    let msg = customMsg;
    if (!msg) {
      msg = `Hola Lael Corporate. Me interesa una propuesta para:\n\n` +
            `📌 Servicio: ${quote.service.label}\n` +
            `👥 Equipo: ${headcount} personas\n` +
            `⏳ Plazo: ${months} meses (${modality})\n` +
            `💰 Inversión mensual p/p: ${clp(quote.financials.perPersonMonth)}\n` +
            `🚀 ROI Proyectado: ${quote.impact.totalROI.toFixed(1)}x\n\n` +
            `Quedo atento a su contacto técnico.`;
    }
    
    window.open(`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <SEOHead 
        title="Lael Corporate | Capacitación B2B con ROI Medible" 
        description="Soluciones de capacitación para empresas con franquicia SENCE. Inglés, LSCh y Beneficios Familiares con retorno inversión garantizado."
      />

      {/* ──────────────── 1. HERO SECTION (B2B TECH) ──────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-slate-950">
        {/* Deep Slate/Indigo Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#020617_100%)] z-0" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/textures/grid.svg')] opacity-10 pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10 shadow-xl"
          >
             <MdVerified className="animate-pulse" /> Soluciones B2B de Alto Impacto
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
          >
            POTENCIA TU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">
               CAPITAL HUMANO.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Capacitación estratégica con franquicia SENCE y ROI medible. <br className="hidden md:block" />
            Optimizamos el rendimiento de tu equipo con resultados basados en datos.
          </motion.p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollToSection('cotizador')}
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-600/30 uppercase tracking-widest text-sm w-full md:w-auto"
            >
              SIMULAR PRESUPUESTO
            </motion.button>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500 border-l border-white/10 pl-8">
               <div className="flex flex-col items-center gap-2">
                  <FaFileAlt className="text-lg text-slate-400" />
                  Factura Exenta
               </div>
               <div className="flex flex-col items-center gap-2">
                  <FaShieldAlt className="text-lg text-slate-400" />
                  Código SENCE
               </div>
               <div className="flex flex-col items-center gap-2">
                  <FaChartBar className="text-lg text-slate-400" />
                  Reportes ROI
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 2. GRID DE SOLUCIONES (SERVICES) ──────────────── */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Soluciones de <span className="text-indigo-600">Aprendizaje</span></h2>
               <p className="text-slate-500 font-medium text-lg">Programas diseñados para el mundo corporativo moderno.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {SERVICE_LINES.map((service, i) => (
                  <motion.div 
                     key={service.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="group bg-slate-50 border border-slate-200 p-10 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all border-b-4"
                     style={{ borderBottomColor: service.brandColor }}
                  >
                     <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">{service.icon}</div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">{service.label}</h3>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {service.desc}
                     </p>
                     <div className="mt-10 pt-8 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacitación Pro</span>
                        <FaArrowRight className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all" />
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 3. EL COTIZADOR (JOY RECENT) ──────────────── */}
      <section id="cotizador" className="py-32 bg-slate-900 relative">
         <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-20 pointer-events-none" />
         
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-20 relative z-10">
               <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Explorador de <span className="text-emerald-500">Valor</span></h2>
               <p className="text-slate-400 font-medium">Simula tu presupuesto y proyecta el impacto en tu organización.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
               
               {/* CONTROLS (LEFT PANEL) */}
               <div className="lg:col-span-5 bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl">
                  <div className="space-y-12">
                     {/* 1. Selector de Servicio */}
                     <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Línea de Servicio</label>
                        <div className="grid grid-cols-2 gap-3">
                           {SERVICE_LINES.map(s => (
                              <button
                                 key={s.id}
                                 onClick={() => setSelectedServiceId(s.id)}
                                 className={`p-4 rounded-xl border text-left transition-all ${selectedServiceId === s.id ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'}`}
                              >
                                 <div className="text-xl mb-1">{s.icon}</div>
                                 <div className="text-[10px] font-black uppercase leading-tight">{s.label}</div>
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* 2. Slider de Personas */}
                     <div>
                        <div className="flex justify-between items-center mb-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Headcount</label>
                           <span className="text-2xl font-black text-white">{headcount} <span className="text-[10px] text-slate-500">PERS.</span></span>
                        </div>
                        <input 
                           type="range" min="5" max="100" step="1" 
                           value={headcount}
                           onChange={(e) => setHeadcount(e.target.value)}
                           className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="flex justify-between mt-2 text-[9px] font-black text-slate-600 uppercase">
                           <span>5 min.</span>
                           <span>100+ corporativo</span>
                        </div>
                     </div>

                     {/* 3. Slider de Duración */}
                     <div>
                        <div className="flex justify-between items-center mb-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Duración</label>
                           <span className="text-2xl font-black text-white">{months} <span className="text-[10px] text-slate-500">MESES</span></span>
                        </div>
                        <input 
                           type="range" min="1" max="12" step="1" 
                           value={months}
                           onChange={(e) => setMonths(e.target.value)}
                           className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between mt-2 text-[9px] font-black text-slate-600 uppercase">
                           <span>1 mes</span>
                           <span>Anual</span>
                        </div>
                     </div>

                     {/* 4. Modalidad Toggle */}
                     <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Modalidad</label>
                        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                           {['online', 'onsite'].map(m => (
                              <button
                                 key={m}
                                 onClick={() => setModality(m)}
                                 className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${modality === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                              >
                                 {m === 'online' ? 'Remoto / Zoom' : 'Presencial / In-house'}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* FACTURA PROYECTADA (RIGHT PANEL) */}
               <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col justify-between h-full border border-slate-200">
                  <AnimatePresence mode="wait">
                     {quote && (
                        <motion.div
                           key={`${selectedServiceId}-${headcount}-${months}-${modality}`}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="w-full"
                        >
                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-12 border-b border-slate-100">
                              <div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Presupuesto Estimado</span>
                                 <h3 className="text-xl font-black text-slate-900 uppercase">{quote.service.label}</h3>
                              </div>
                              <div className="text-right">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Costo p/p Mes</span>
                                 <div className="text-3xl font-black text-indigo-600">{clp(quote.financials.perPersonMonth)}</div>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                              <div>
                                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-6">Detalle Financiero</span>
                                 <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-medium">
                                       <span className="text-slate-500">Inversión Bruta</span>
                                       <span className="text-slate-900 line-through opacity-40">{clp(quote.financials.totalBeforeDiscount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-black">
                                       <span className="text-emerald-600">Ahorro Vol. ({quote.financials.discountPercent}%)</span>
                                       <span className="text-emerald-600">-{clp(quote.financials.discountAmount)}</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                                       <span className="text-xs font-black uppercase text-slate-900">Total Neto</span>
                                       <span className="text-4xl font-black text-slate-900 tracking-tighter">{clp(quote.financials.total)}</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-6 flex items-center gap-2">
                                    <FaChartLine /> Impacto ROI Proyectado
                                 </span>
                                 <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                       <span>Ahorro en Retención</span>
                                       <span className="text-emerald-600">+{clp(quote.impact.retentionSavings)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                       <span>Productividad Estimada</span>
                                       <span className="text-emerald-600">+{clp(quote.impact.productivityGain)}</span>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-emerald-200 flex justify-between items-center">
                                       <span className="text-[10px] font-black text-emerald-800 uppercase">Retorno Mín.</span>
                                       <span className="text-2xl font-black text-emerald-700">{quote.impact.totalROI.toFixed(1)}x</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  <button
                     onClick={() => handleWappClick()}
                     className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-4 uppercase tracking-widest text-xs group"
                  >
                     <FaWhatsapp className="text-xl text-emerald-400 group-hover:scale-110 transition-transform" />
                     SOLICITAR COTIZACIÓN FORMAL
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── 4. PACKS DE ENTRADA RÁPIDA ──────────────── */}
      <section className="py-32 bg-stone-50">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Soluciones <span className="text-amber-600">Express</span></h2>
               <p className="text-slate-500 font-medium text-lg">Formatos cerrados para decisiones ágiles y resultados inmediatos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {EMP_PACKS.map((pack, i) => (
                  <div key={pack.id} className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl hover:scale-[1.02] transition-all">
                     <div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-4">Pack Destacado</span>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{pack.title}</h3>
                        <p className="text-sm text-slate-400 mb-8 font-medium">{pack.subtitle}</p>
                        
                        <ul className="space-y-4 mb-12">
                           {pack.bullets.map((b, j) => (
                              <li key={j} className="flex gap-3 text-xs font-bold text-slate-300">
                                 <FaCheckCircle className="text-amber-500 shrink-0 mt-0.5" />
                                 {b}
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="pt-8 border-t border-white/10 text-center">
                        <div className="text-xl font-black text-white mb-6">{pack.priceLabel}</div>
                        <button 
                           onClick={() => handleWappClick(`Hola! Me interesa el pack express: ${pack.title}.`)}
                           className="w-full py-4 border-2 border-white/20 hover:border-white/50 text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-all"
                        >
                           Comprar Pack
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 5. SENCE & CIERRE ──────────────── */}
      <section className="py-32 bg-indigo-600 text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-0" />
         
         <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">Gestión <br />Estratégica SENCE.</h2>
                  <p className="text-xl md:text-2xl text-indigo-100 font-light leading-relaxed mb-10">
                     No pierdas tu inversión tributaria. <br />
                     Ayudamos a las empresas a maximizar el uso de su <strong className="text-white font-bold">Franquicia Tributaria</strong> mediante códigos SENCE vigentes y facturación exenta.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                     <button 
                        onClick={() => handleWappClick("Hola! Quiero agendar una reunión comercial para mi empresa.")}
                        className="px-10 py-6 bg-white text-indigo-600 font-black rounded-2xl shadow-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                     >
                        <FaHandshake /> AGENDAR REUNIÓN EJECUTIVA
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                     { label: "Cumplimiento 100%", icon: <FaShieldAlt /> },
                     { label: "Reportes Digitales", icon: <FaFileAlt /> },
                     { label: "Control Asistencia", icon: <FaUsers /> },
                     { label: "Escalabilidad", icon: <FaCogs /> }
                  ].map((item, i) => (
                     <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl flex flex-col items-center text-center">
                        <div className="text-3xl mb-4 opacity-50">{item.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="mt-24 pt-12 border-t border-white/10 text-center text-indigo-200">
               <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Estás en el área corporativa de Instituto Lael • No somos SENCE • Somos Organismo Capacitador
               </p>
            </div>
         </div>
      </section>

    </div>
  );
}