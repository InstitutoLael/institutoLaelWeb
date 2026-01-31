import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   FaBuilding, FaChartLine, FaHandshake, FaUserTie,
   FaWhatsapp, FaEnvelope, FaCalculator, FaArrowRight,
   FaAward, FaTrophy, FaRocket, FaCheckCircle, FaMoneyBillWave,
   FaUsers, FaHeartbeat, FaLeaf
} from "react-icons/fa";
import { MdVerified, MdCompareArrows } from "react-icons/md";
import { BsLightningChargeFill, BsArrowRepeat } from "react-icons/bs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from "recharts";
import SEOHead from "../components/SEOHead.jsx";

// ASSETS
import logoBlanco from "../assets/img/Logos/lael-inst-blanco.png";

// DATA
import {
   SERVICE_LINES,
   EMP_PACKS,
   WAPP_INTL,
   calcQuote,
   clp
} from "../data/empresas.js";

// ANIMATIONS
const fadeInUp = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};


export default function Business() {
   // Calculator State
   const [selectedServiceId, setSelectedServiceId] = useState("ingles");
   const [headcount, setHeadcount] = useState(10);
   const [months, setMonths] = useState(3);
   const [modality, setModality] = useState("online");
   const [quote, setQuote] = useState(null);
   const [viewMode, setViewMode] = useState("financial"); // 'financial' | 'impact'

   useEffect(() => { window.scrollTo(0, 0); }, []);

   // Recalculate whenever inputs change
   useEffect(() => {
      const result = calcQuote({
         lineId: selectedServiceId,
         headcount: Number(headcount),
         durationMonths: Number(months),
         modality: modality
      });
      setQuote(result);
   }, [selectedServiceId, headcount, months, modality]);

   const handleWappClick = () => {
      if (!quote) return;
      const msg = `Hola Lael Corporate. Cotización Web Experience 2.0:%0A%0A` +
         `📌 *Servicio:* ${quote.service.label}%0A` +
         `👥 *Equipo:* ${headcount} p.%0A` +
         `⏳ *Duración:* ${months} meses (${modality})%0A` +
         `💰 *Total Estimado:* ${clp(quote.financials.total)} + IVA%0A` +
         `🚀 *ROI Proyectado:* ${(quote.impact.totalROI).toFixed(1)}x%0A` +
         `Deseo agendar una consultoría de impacto.`;
      window.open(`https://wa.me/${WAPP_INTL}?text=${msg}`, '_blank');
   };

   const scrollToCalculator = () => {
      document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
         <SEOHead title="Lael Corporate | B2B Experience 2.0" description="ROI proyectado, capacitación de élite y beneficios educativos de alto impacto." />


         {/* ──────────────── 1. HERO RE-ENGINEERED ──────────────── */}
         <header className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Architecture */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.15),transparent)]"></div>
               <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(251,191,36,0.05),transparent)]"></div>
               <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-10">
               <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                  <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8">
                     <MdVerified className="animate-pulse" /> Corporate Solution 2.0
                  </div>

                  <h1 className="text-6xl md:text-8xl font-serif font-black mb-6 leading-[0.9] tracking-tight">
                     Tu Equipo, <br />
                     <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">Tu Activo.</span>
                  </h1>

                  <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                     Capacitación corporativa que se paga sola. Aumenta la retención, mejora el clima laboral y maximiza la productividad con beneficios tributarios (SENCE).
                  </p>

                  <div className="flex flex-wrap gap-4">
                     <button
                        onClick={scrollToCalculator}
                        className="group px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.05)] flex items-center gap-3 active:scale-95"
                     >
                        <FaCalculator className="group-hover:rotate-12 transition-transform" />
                        Proyectar ROI
                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                     </button>
                     <button
                        className="px-10 py-5 bg-slate-900/50 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
                     >
                        Brochure PDF
                     </button>
                  </div>
               </motion.div>

               {/* Visual: The Glass Dashboard Preview */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="hidden lg:block relative"
               >
                  <div className="relative z-10 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-1000 group">
                     <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Analytics Dashboard_v2</div>
                     </div>
                     <div className="space-y-6">
                        <div className="h-24 bg-indigo-500/10 rounded-2xl border border-white/5 flex items-center px-6 gap-6 group-hover:bg-indigo-500/20 transition-colors">
                           <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><FaChartLine /></div>
                           <div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase">Proyección ROI</div>
                              <div className="text-2xl font-black">+340%</div>
                           </div>
                        </div>
                        <div className="h-24 bg-emerald-500/10 rounded-2xl border border-white/5 flex items-center px-6 gap-6 group-hover:bg-emerald-500/20 transition-colors">
                           <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><FaHandshake /></div>
                           <div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase">Employee Retention</div>
                              <div className="text-2xl font-black">+25%</div>
                           </div>
                        </div>
                     </div>
                     {/* Floating Glow */}
                     <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  </div>
               </motion.div>
            </div>
         </header>


         {/* ──────────────── 3. COTIZADOR EXPERIENCE 2.0 ──────────────── */}
         <section id="cotizador" className="py-32 bg-[#020617] relative">
            {/* Immersive Background */}
            <div className="absolute inset-0 bg-[url('/textures/carbon-fibre.png')] opacity-[0.03]"></div>

            <div className="container mx-auto px-6">
               <div className="max-w-7xl mx-auto">

                  {/* Grid Layout */}
                  <div className="bg-slate-900/40 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">

                     {/* LEFT PANEL: CONFIGURATOR (4 Cols) */}
                     <div className="lg:col-span-5 p-12 lg:p-16 bg-slate-900/50 border-b lg:border-b-0 lg:border-r border-white/5">
                        <div className="flex items-center gap-3 mb-12">
                           <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><FaCalculator /></div>
                           <h3 className="font-black uppercase tracking-widest text-sm">Configurador Pro</h3>
                        </div>

                        <div className="space-y-10">
                           {/* 1. Service Selection with Visual Radio Icons */}
                           <div>
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Vertical de Impacto</label>
                              <div className="grid grid-cols-2 gap-3">
                                 {SERVICE_LINES.map(s => (
                                    <button
                                       key={s.id}
                                       onClick={() => setSelectedServiceId(s.id)}
                                       className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-2
                                          ${selectedServiceId === s.id
                                             ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                             : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                                          }
                                       `}
                                    >
                                       <span className="text-xl">{s.icon}</span>
                                       <span className="text-[11px] font-bold leading-tight">{s.label}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>

                           {/* 2. Headcount Interactive Slider */}
                           <div className="p-8 bg-black/30 rounded-[2rem] border border-white/5 shadow-inner">
                              <div className="flex justify-between items-end mb-6">
                                 <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Equipo</label>
                                    <span className="text-3xl font-black text-white">{headcount}</span>
                                    <span className="text-slate-500 font-bold ml-2">Pers.</span>
                                 </div>
                                 <div className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                                    {(headcount >= 10) ? 'VOLUMEN APL.' : 'MIN.'}
                                 </div>
                              </div>
                              <input
                                 type="range" min="1" max="100" step="1"
                                 value={headcount}
                                 onChange={(e) => setHeadcount(e.target.value)}
                                 className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                              />
                           </div>

                           {/* 3. Time & Modality */}
                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Plazo</label>
                                 <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                    {[3, 6, 12].map(m => (
                                       <button
                                          key={m}
                                          onClick={() => setMonths(m)}
                                          className={`flex-1 py-2 rounded-lg text-xs font-black transition-all
                                             ${months === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}
                                          `}
                                       >
                                          {m}M
                                       </button>
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Modalidad</label>
                                 <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                    {['online', 'onsite'].map(mod => (
                                       <button
                                          key={mod}
                                          onClick={() => setModality(mod)}
                                          className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all
                                             ${modality === mod ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}
                                          `}
                                       >
                                          {mod === 'online' ? 'Global' : 'Local'}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* RIGHT PANEL: DUAL DASHBOARD (7 Cols) */}
                     <div className="lg:col-span-7 bg-slate-950 flex flex-col relative overflow-hidden">

                        {/* Selector de Modo (Financial vs Impact) */}
                        <div className="flex border-b border-white/5">
                           <button
                              onClick={() => setViewMode('financial')}
                              className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all
                                 ${viewMode === 'financial' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-600 hover:text-slate-400'}
                              `}
                           >
                              <FaMoneyBillWave /> Vista Financiera
                           </button>
                           <button
                              onClick={() => setViewMode('impact')}
                              className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all
                                 ${viewMode === 'impact' ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-600 hover:text-slate-400'}
                              `}
                           >
                              <FaHeartbeat /> Impacto ROI
                           </button>
                        </div>

                        <div className="flex-1 p-12 relative">
                           <AnimatePresence mode="wait">
                              {quote && viewMode === 'financial' && (
                                 <motion.div
                                    key="financial"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                 >
                                    <div className="text-center">
                                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Investment Total_Final</span>
                                       <div className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
                                          {clp(quote.financials.total)}
                                       </div>
                                       <span className="text-slate-600 font-mono text-xs">+ IVA / Período {months}M</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                       <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5">
                                          <div className="text-[10px] font-black text-slate-500 uppercase mb-2">Costo Mensual Unitario</div>
                                          <div className="text-3xl font-black text-white">{clp(quote.financials.perPersonMonth)}</div>
                                       </div>
                                       <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5">
                                          <div className="text-[10px] font-black text-slate-500 uppercase mb-2">Descuento Volumen</div>
                                          <div className="text-3xl font-black text-emerald-400">-{quote.financials.discountPercent}%</div>
                                       </div>
                                    </div>

                                    {/* Financial Mini Chart */}
                                    <div className="h-40 w-full mt-8 bg-black/40 rounded-3xl border border-white/5 p-6 shadow-inner">
                                       <ResponsiveContainer width="100%" height="100%">
                                          <AreaChart data={[
                                             { x: 0, y: 0 },
                                             { x: 1, y: quote.financials.total * 0.4 },
                                             { x: 2, y: quote.financials.total * 0.7 },
                                             { x: 3, y: quote.financials.total }
                                          ]}>
                                             <defs>
                                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                   <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                   <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                             </defs>
                                             <Area type="monotone" dataKey="y" stroke="#6366f1" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
                                          </AreaChart>
                                       </ResponsiveContainer>
                                    </div>
                                 </motion.div>
                              )}

                              {quote && viewMode === 'impact' && (
                                 <motion.div
                                    key="impact"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                 >
                                    <div className="text-center">
                                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">ROI Proyectado del Proyecto</span>
                                       <div className="text-6xl md:text-8xl font-black text-emerald-400 tracking-tighter mb-2">
                                          {(quote.impact.totalROI).toFixed(1)}x
                                       </div>
                                       <span className="text-slate-600 font-mono text-xs">Retorno mínimo estimado sobre la inversión</span>
                                    </div>

                                    <div className="space-y-6">
                                       <div className="flex justify-between items-center p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                          <div className="flex items-center gap-4">
                                             <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400"><BsArrowRepeat className="animate-spin-slow" /></div>
                                             <div>
                                                <div className="text-xs font-bold text-white">Ahorro x Retención</div>
                                                <div className="text-[10px] text-slate-500">Reducción de rotación estimada</div>
                                             </div>
                                          </div>
                                          <div className="text-2xl font-black text-emerald-400">+{clp(quote.impact.retentionSavings)}</div>
                                       </div>
                                       <div className="flex justify-between items-center p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                          <div className="flex items-center gap-4">
                                             <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><FaRocket /></div>
                                             <div>
                                                <div className="text-xs font-bold text-white">Ganancia Productividad</div>
                                                <div className="text-[10px] text-slate-500">Efectividad operacional proyectada</div>
                                             </div>
                                          </div>
                                          <div className="text-2xl font-black text-blue-400">+{clp(quote.impact.productivityGain)}</div>
                                       </div>
                                    </div>

                                    <p className="text-[10px] text-slate-600 font-mono text-center">
                                       *Cálculos basados en estándares de la industria (SHRM & ROI Institute) adaptados al mercado local.
                                    </p>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>

                        {/* FINAL CTA ACTION */}
                        <div className="p-12 border-t border-white/5">
                           <button
                              onClick={handleWappClick}
                              className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
                           >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                              <FaWhatsapp className="text-2xl" />
                              Solicitar Consultoría de Impacto
                              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ──────────────── 4. VALUE PROPOSITION: WHY LAEL? ──────────────── */}
         <section className="py-32 bg-slate-950">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mb-20">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">¿Por qué confiar <br />en Lael?</h2>
                  <p className="text-xl text-slate-400">Construimos puentes entre el potencial humano y los objetivos de negocio.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     {
                        title: "Medición de Impacto Real",
                        desc: "No solo entregamos certificados; entregamos reportes de ROI basados en productividad y retención.",
                        icon: <FaChartLine className="text-indigo-400" />
                     },
                     {
                        title: "Cultura de Aprendizaje",
                        desc: "Transformamos la capacitación en un beneficio aspiracional que eleva el orgullo de pertenencia.",
                        icon: <FaUsers className="text-emerald-400" />
                     },
                     {
                        title: "Personalización Extrema",
                        desc: "Diseñamos el contenido en base a los desafíos específicos de tu industria y KPIs.",
                        icon: <FaRocket className="text-amber-400" />
                     }
                  ].map((item, i) => (
                     <div key={i} className="bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] hover:border-white/20 transition-all">
                        <div className="text-3xl mb-6">{item.icon}</div>
                        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 5. FINAL DECISION ──────────────── */}
         <section className="py-40 bg-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-6 relative z-10 text-center text-white">
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12">¿Listo para elevar <br />el estándar?</h2>
               <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <button
                     onClick={handleWappClick}
                     className="px-12 py-6 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                  >
                     <FaHandshake /> Agenda Sesión Comercial
                  </button>
                  <a
                     href="mailto:corporate@institutolael.cl"
                     className="px-12 py-6 bg-transparent border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all"
                  >
                     Solicitar Factibilidad SENCE
                  </a>
               </div>
            </div>
         </section>

      </div>
   );
}