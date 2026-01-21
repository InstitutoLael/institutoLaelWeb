import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   FaBuilding, FaChartLine, FaHandshake, FaUserTie,
   FaWhatsapp, FaEnvelope, FaCalculator, FaArrowRight
} from "react-icons/fa";
import { MdVerified, MdDashboardCustomize } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";
import SEOHead from "../components/SEOHead.jsx";

// ASSETS (Importing logos for branding)
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
      const msg = `Hola Lael Corporate. Cotización Web:%0A%0A` +
         `📌 *Servicio:* ${quote.service.label}%0A` +
         `👥 *Equipo:* ${headcount} p.%0A` +
         `⏳ *Duración:* ${months} meses (${modality})%0A` +
         `💰 *Total Estimado:* ${clp(quote.financials.total)} + IVA%0A` +
         `Me gustaría agendar una reunión comercial.`;
      window.open(`https://wa.me/${WAPP_INTL}?text=${msg}`, '_blank');
   };

   const scrollToCalculator = () => {
      document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
         <SEOHead title="Lael Corporate | Soluciones B2B" description="Capacitación de alto impacto y beneficios educativos para empresas líderes." />

         {/* ──────────────── 1. HERO DARK CORPORATE ──────────────── */}
         <header className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-white/5">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-slate-950 z-0">
               <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-[#0f172a] to-transparent opacity-80"></div>
               <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

               {/* Text Side */}
               <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                     <MdVerified /> Soluciones Corporativas B2B
                  </div>

                  <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                     Transforma tu equipo,<br />
                     <span className="bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">Eleva tu Cultura.</span>
                  </h1>

                  <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                     Capacitación de alto impacto y beneficios educativos para empresas que buscan más que resultados: buscan trascendencia.
                  </p>

                  <div className="flex flex-wrap gap-4">
                     <button
                        onClick={scrollToCalculator}
                        className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2"
                     >
                        <FaCalculator /> Cotizar Online
                     </button>
                     <a
                        href="#servicios"
                        className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors"
                     >
                        Ver Servicios
                     </a>
                  </div>
               </motion.div>

               {/* Visual Side (Floating Logo) */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="flex justify-center items-center relative"
               >
                  <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 flex items-center justify-center animate-[spin_60s_linear_infinite]">
                     <div className="absolute inset-0 rounded-full border border-white/5 scale-75"></div>
                     <div className="absolute inset-0 rounded-full border border-white/5 scale-50"></div>
                  </div>
                  <img
                     src={logoBlanco}
                     alt="Lael Corporate"
                     className="absolute w-40 md:w-64 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                  />
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. METRICS BAR ──────────────── */}
         <section className="border-b border-white/5 bg-[#020617]">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
               <div className="px-4">
                  <span className="block text-4xl font-bold text-white mb-1">+15</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Programas a Medida</span>
               </div>
               <div className="px-4 pt-8 md:pt-0">
                  <span className="block text-4xl font-bold text-white mb-1">ROI</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reportes Mensuales de Avance</span>
               </div>
               <div className="px-4 pt-8 md:pt-0">
                  <span className="block text-4xl font-bold text-emerald-400 mb-1">100%</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Deducible SENCE (Consultar)</span>
               </div>
            </div>
         </section>

         {/* ──────────────── 3. SERVICIOS (NEON CARDS) ──────────────── */}
         <section id="servicios" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold font-serif text-white mb-4">Ecosistema de Formación</h2>
                  <p className="text-slate-400">Selecciona una vertical para proyectar tu inversión.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICE_LINES.map((srv) => (
                     <motion.div
                        key={srv.id}
                        layoutId={`card-${srv.id}`}
                        onClick={() => {
                           setSelectedServiceId(srv.id);
                           scrollToCalculator();
                        }}
                        whileHover={{ y: -8 }}
                        className={`relative p-8 rounded-2xl border cursor-pointer transition-all overflow-hidden group h-full flex flex-col
                       ${selectedServiceId === srv.id
                              ? 'bg-slate-900 border-white/20 shadow-2xl scale-[1.02] ring-1 ring-white/20'
                              : 'bg-slate-900/50 border-white/5 hover:border-white/10 hover:bg-slate-900'
                           }
                    `}
                        style={{ '--brand': srv.brandColor }}
                     >
                        {/* Glow Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                        <div className="text-4xl mb-6 relative z-10">{srv.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">{srv.label}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 relative z-10 group-hover:text-slate-300">
                           {srv.desc}
                        </p>

                        <div className="mt-auto flex justify-between items-center text-[var(--brand)] relative z-10">
                           <span className="text-xs font-bold uppercase tracking-wider">Cotizar</span>
                           <FaArrowRight className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 4. CALCULATOR (BLACK EDITION) ──────────────── */}
         <section id="cotizador" className="py-24 bg-[#080B14] relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
               <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

                  {/* --- PANEL A: CONTROLS --- */}
                  <div className="p-10 border-b lg:border-b-0 lg:border-r border-slate-800">
                     <div className="flex items-center gap-3 mb-10 text-amber-500">
                        <FaCalculator className="text-xl" />
                        <h3 className="font-bold uppercase tracking-widest text-sm text-white">Configurador de Plan</h3>
                     </div>

                     {/* 1. Service Selector */}
                     <div className="mb-8">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Línea de Servicio</label>
                        <select
                           value={selectedServiceId}
                           onChange={(e) => setSelectedServiceId(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
                        >
                           {SERVICE_LINES.map(s => (
                              <option key={s.id} value={s.id}>{s.label}</option>
                           ))}
                        </select>
                     </div>

                     {/* 2. Headcount Slider */}
                     <div className="mb-8 p-6 bg-slate-950/50 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-4">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Colaboradores</label>
                           <span className="bg-amber-500 text-slate-900 font-bold px-3 py-1 rounded text-sm">
                              {headcount} pers.
                           </span>
                        </div>
                        <input
                           type="range" min="1" max="50" step="1"
                           value={headcount}
                           onChange={(e) => setHeadcount(e.target.value)}
                           className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-mono">
                           <span>1</span>
                           <span>50+</span>
                        </div>
                     </div>

                     {/* 3. Duration & Modality */}
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Duración</label>
                           <div className="flex gap-2">
                              {[1, 3, 6, 12].map(m => (
                                 <button
                                    key={m}
                                    onClick={() => setMonths(m)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all
                                    ${months === m ? 'bg-amber-500 border-amber-500 text-slate-900' : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500'}
                                 `}
                                 >
                                    {m}M
                                 </button>
                              ))}
                           </div>
                        </div>

                        {quote?.service.type !== 'flat' && (
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Modalidad</label>
                              <div className="flex gap-2">
                                 <button
                                    onClick={() => setModality('online')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all
                                   ${modality === 'online' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500'}
                                `}
                                 >
                                    Online
                                 </button>
                                 <button
                                    onClick={() => setModality('onsite')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all
                                   ${modality === 'onsite' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500'}
                                `}
                                 >
                                    Presen.
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* --- PANEL B: RESULTS --- */}
                  <div className="relative p-10 bg-slate-950 flex flex-col justify-center">
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

                     <AnimatePresence mode="wait">
                        {quote && (
                           <motion.div
                              key={`${selectedServiceId}-${headcount}-${months}-${modality}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="relative z-10 text-center"
                           >
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">
                                 Inversión Total Estimada
                              </span>

                              <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                                 {clp(quote.financials.total)}
                              </div>
                              <span className="text-slate-500 text-sm font-mono">+ IVA</span>

                              {quote.financials.discountPercent > 0 && (
                                 <div className="inline-block mt-6 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Ahorro por volumen: {quote.financials.discountPercent}%
                                 </div>
                              )}

                              <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-900 text-left">
                                 <div>
                                    <span className="text-xs text-slate-500 block mb-1">Por Persona/Mes</span>
                                    <strong className="text-white text-lg">{clp(quote.financials.perPersonMonth)}</strong>
                                 </div>
                                 <div>
                                    <span className="text-xs text-slate-500 block mb-1">Total Bruto</span>
                                    <strong className="text-slate-400 text-lg line-through">{clp(quote.financials.totalBeforeDiscount)}</strong>
                                 </div>
                              </div>

                              <button
                                 onClick={handleWappClick}
                                 className="w-full mt-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 group"
                              >
                                 <FaWhatsapp className="text-xl" /> Confirmar Disponibilidad
                                 <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </button>

                              <p className="mt-4 text-[10px] text-slate-600">
                                 *Precios referenciales sujetos a confirmación de agenda docente.
                              </p>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </section>

         {/* ──────────────── 5. QUICK WINS PACKS ──────────────── */}
         <section className="py-24 bg-slate-950 border-t border-white/5">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl font-bold font-serif text-white mb-2">Packs "Quick Win"</h2>
               <p className="text-slate-400 mb-12">Soluciones empaquetadas de rápida implementación.</p>

               <div className="flex flex-wrap gap-6 justify-center">
                  {EMP_PACKS.map((pack) => (
                     <div key={pack.id} className="w-full md:w-80 bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-4 text-amber-500">
                           <BsLightningChargeFill />
                           <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">{pack.title}</h4>
                        </div>
                        <p className="text-sm text-slate-400 mb-6 min-h-[40px]">{pack.subtitle}</p>

                        <div className="pt-6 border-t border-slate-800">
                           <span className="block font-bold text-white mb-4">{pack.priceLabel}</span>
                           <a
                              href={`https://wa.me/${WAPP_INTL}?text=Hola, me interesa el pack: ${pack.title}`}
                              target="_blank" rel="noreferrer"
                              className="text-sm font-bold text-amber-500 flex items-center gap-2 hover:underline"
                           >
                              Contratar Pack <FaArrowRight />
                           </a>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 6. CTA CONTACT ──────────────── */}
         <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 text-center">
            <div className="container mx-auto px-6 max-w-2xl">
               <h2 className="text-3xl font-bold text-white mb-6">Hablemos de Negocios</h2>
               <p className="text-slate-400 mb-10">
                  ¿Necesitas una propuesta formal en PDF? ¿O una reunión con el Director?
                  Escríbenos y te respondemos en menos de 2 horas.
               </p>
               <div className="flex justify-center gap-4">
                  <a
                     href="mailto:contacto@institutolael.cl"
                     className="px-6 py-3 border border-slate-600 text-white font-bold rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                     <FaEnvelope /> Correo Corporativo
                  </a>
                  <a
                     href={`https://wa.me/${WAPP_INTL}`}
                     className="px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-lg"
                  >
                     <FaWhatsapp /> Chat Directo
                  </a>
               </div>
            </div>
         </section>

      </div>
   );
}