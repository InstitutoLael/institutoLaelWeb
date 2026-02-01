import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  FaCheckCircle,
  FaWhatsapp,
  FaArrowRight,
  FaStar,
  FaInfoCircle,
  FaRegPlayCircle,
  FaUsers,
  FaGlobeAmericas
} from "react-icons/fa";

// Centralized Data Imports
import {
  LANGUAGES,
  SYLLABUS_PREVIEW,
  COMPARISON_DATA,
  TEACHERS_LIST,
  computeLangBundle,
  clp
} from "../data/idiomas.js";

// SEO
import SEOHead from "../components/SEOHead.jsx";
import EnrollmentModal from "../components/ui/EnrollmentModal.jsx";

export default function Idiomas() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeSyllabus, setActiveSyllabus] = useState("ingles");
  const [pricing, setPricing] = useState(computeLangBundle(0));
  const [enrollPlan, setEnrollPlan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPricing(computeLangBundle(selectedIds.length));
  }, [selectedIds]);

  const toggleLanguage = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const waLink = (text) => `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <SEOHead 
        title="Idiomas 2026 | Conecta con el Mundo | Inglés y Coreano" 
        description="Aprende Inglés, Coreano o Español con clases en vivo, grupos reducidos y enfoque cultural real."
      />

      <EnrollmentModal 
        isOpen={!!enrollPlan} 
        onClose={() => setEnrollPlan(null)} 
        plan={enrollPlan} 
      />

      {/* ──────────────── A. HERO SECTION (CONECTA) ──────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[130px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[110px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8"
          >
             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
             Matrícula Digital 2026 Abierta
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
          >
            CONECTA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-amber-400">
               CON EL MUNDO.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Domina el idioma. Vive la cultura. Entrenamiento dinámico para <br className="hidden md:block" />
            <strong className="text-white">la vida real, el trabajo y el viaje.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <button 
              onClick={() => scrollToSection('catalogo')}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-600/30 uppercase tracking-widest text-sm"
            >
              ELEGIR DESTINO
            </button>
            <Link 
               to="/lsch"
               className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-2 group"
            >
               ¿Buscas Lengua de Señas (LSCh)? Ir al Depto. de Inclusión <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── B. CATALOGO (NETFLIX STYLE) ──────────────── */}
      <section id="catalogo" className="py-24 bg-slate-900/20 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LANGUAGES.map((lang, i) => (
                 <LanguagePoster 
                   key={lang.id}
                   lang={lang}
                   index={i}
                   toggleLanguage={toggleLanguage}
                   isSelected={selectedIds.includes(lang.id)}
                 />
              ))}
           </div>
        </div>
      </section>

      {/* ──────────────── C. INSIDE THE CLASS (GRID BICOLOR) ──────────────── */}
      <section className="relative py-32 border-b border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
               
               {/* LADO IZQUIERDO: SYLLABUS */}
               <div className="w-full lg:w-3/5 bg-slate-900/50 p-12 md:p-20">
                  <div className="mb-12">
                     <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">¿Qué aprenderás?</h2>
                     <div className="flex gap-4">
                        {LANGUAGES.map(l => (
                           <button 
                              key={l.id}
                              onClick={() => setActiveSyllabus(l.id)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSyllabus === l.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                           >
                              {l.name.split(" ")[0]}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-12">
                     {SYLLABUS_PREVIEW[activeSyllabus === "plan-ingles" ? "ingles" : activeSyllabus === "plan-coreano" ? "coreano" : "espanol"].map((phase, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.1 }}
                        >
                           <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6">{phase.level}</h4>
                           <ul className="space-y-4">
                              {phase.topics.map((topic, j) => (
                                 <li key={j} className="flex items-start gap-4 text-slate-300 font-medium">
                                    <FaRegPlayCircle className="mt-1 shrink-0 text-blue-500" /> {topic}
                                 </li>
                              ))}
                           </ul>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* LADO DERECHO: TEACHERS */}
               <div className="w-full lg:w-2/5 bg-blue-600/5 p-12 md:p-20 border-l border-white/5">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Aprende con <br /> Expertos</h2>
                  <p className="text-slate-400 font-light mb-12">No solo te enseñan un idioma, te enseñan su uso profesional y cotidiano.</p>
                  
                  <div className="space-y-8">
                     {TEACHERS_LIST.map((t, i) => (
                        <div key={i} className="flex items-center gap-6 group">
                           <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110">
                              {t.img}
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                 {t.name} <span className="text-lg grayscale-0">{t.origin}</span>
                              </h4>
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">{t.role}</p>
                              <p className="text-xs text-slate-500 font-medium italic">"{t.bio}"</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-16 p-8 bg-blue-600/10 rounded-[2rem] border border-blue-500/20">
                     <div className="flex items-center gap-4 mb-4">
                        <FaUsers className="text-3xl text-blue-400" />
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Grupos Reducidos</h4>
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed font-light">
                        Máximo <strong className="text-white">12 alumnos</strong> por sección para garantizar que el coach corrija tu pronunciación en cada sesión.
                     </p>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* ──────────────── D. TABLA COMPARATIVA (LA VERDAD) ──────────────── */}
      <section className="py-24 relative">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Comparativa Directa</h2>
               <p className="text-slate-400 font-light">Más que una app, somos una academia de alto rendimiento.</p>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-white/10">
                        <th className="py-6 px-4 text-xs font-black uppercase text-slate-500">Característica</th>
                        <th className="py-6 px-8 text-center bg-blue-600/10 rounded-t-3xl border-x border-t border-blue-500/20 text-white font-black uppercase tracking-widest text-xs">Instituto Lael</th>
                        <th className="py-6 px-4 text-center text-slate-500 font-black uppercase text-[10px]">Aprende Solo (Apps)</th>
                        <th className="py-6 px-4 text-center text-slate-500 font-black uppercase text-[10px]">Tradicional</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                     {COMPARISON_DATA.map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                           <td className="py-6 px-4 text-slate-300">{row.feature}</td>
                           <td className="py-6 px-8 text-center bg-blue-600/5 border-x border-blue-500/10 text-white font-bold">
                              {typeof row.lael === 'boolean' ? (row.lael ? <FaCheckCircle className="inline text-emerald-500 text-xl" /> : '—') : row.lael}
                           </td>
                           <td className="py-6 px-4 text-center text-slate-500 italic">
                              {typeof row.app === 'boolean' ? (row.app ? 'Si' : 'No') : row.app}
                           </td>
                           <td className="py-6 px-4 text-center text-slate-500 italic">
                              {typeof row.institute === 'boolean' ? (row.institute ? 'Si' : 'Tratando') : row.institute}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* ──────────────── E. PRICING BUNDLE (INTELIGENTE) ──────────────── */}
      <section id="pricing" className="py-32 bg-[#020617] relative border-t border-white/5">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Domina más por <span className="text-blue-500">menos.</span></h2>
               <p className="text-slate-400 font-light max-w-xl mx-auto italic">
                  "El bilingüismo abre una puerta, el poliglotismo abre el mundo entero."
               </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-stretch mb-20">
               
               <BundleOption 
                  title="Intensivo 1"
                  desc="Un idioma. Foco total."
                  count={1}
                  total={clp(24990)}
                  isSelected={selectedIds.length === 1}
                  onClick={() => {}}
               />

               <BundleOption 
                  title="Plan Business Dúo"
                  desc="Dos idiomas. Combo ideal."
                  count={2}
                  total={clp(39990)}
                  saving={clp(9990)}
                  isSelected={selectedIds.length === 2}
                  recommended
                  onClick={() => {}}
               />

               <BundleOption 
                  title="Membresía Políglota"
                  desc="Tres idiomas. Sin límites."
                  count={3}
                  total={clp(54990)}
                  saving={clp(19980)}
                  isSelected={selectedIds.length === 3}
                  onClick={() => {}}
               />

            </div>

            {/* Final Calculator Integration Visual */}
            <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-32 bg-blue-600/5 blur-[90px] rounded-full" />
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                  <div>
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Tu Selección</h3>
                     <p className="text-sm text-slate-500 mb-6">Marca abajo los idiomas que quieres incluir en tu plan.</p>
                     
                     <div className="flex flex-wrap gap-3">
                        {LANGUAGES.map(lang => {
                           const active = selectedIds.includes(lang.id);
                           return (
                              <button 
                                 key={lang.id}
                                 onClick={() => toggleLanguage(lang.id)}
                                 className={`px-5 py-3 rounded-2xl border-2 transition-all flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] ${active ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                              >
                                 <span className="text-lg">{lang.emoji}</span> {lang.name.split(" ")[0]}
                              </button>
                           );
                        })}
                     </div>
                  </div>

                  <div className="border-l border-white/10 pl-12">
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center text-xs font-black uppercase text-slate-500 tracking-widest">
                           <span>{pricing.label}</span>
                           <span>{clp(pricing.totalMonthly)}</span>
                        </div>
                        {pricing.saving > 0 && (
                           <div className="flex justify-between items-center text-xs font-black uppercase text-emerald-500 tracking-widest">
                              <span>Bonificación Bundle</span>
                              <span>-{clp(pricing.saving)}</span>
                           </div>
                        )}
                        <div className="flex justify-between items-end pt-4 border-t border-white/10">
                           <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Mensualidad</span>
                           <span className="text-5xl font-black text-white tracking-tighter leading-none">{clp(pricing.totalMonthly)}</span>
                        </div>
                     </div>

                     <button 
                        disabled={selectedIds.length === 0}
                        onClick={() => setEnrollPlan({
                          id: `idiomas-bundle-${selectedIds.join("-")}`,
                          name: `Pack Idiomas (${selectedIds.length})`,
                          paymentUrl: null
                        })}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center transition-all flex items-center justify-center gap-3 ${selectedIds.length > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                     >
                        MATRÍCULA ONLINE
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="py-32 bg-gradient-to-t from-slate-900 to-slate-950 text-center px-6">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
         >
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-10 leading-none">
               HABLA SIN <br /> LÍMITES.
            </h2>
            <p className="text-slate-500 font-medium mb-10">Cupos limitados por sección para garantizar calidad.</p>
            <button 
               onClick={() => setEnrollPlan({ id: 'idiomas-general', name: 'Cursos de Idiomas 2026', paymentUrl: null })} 
               className="inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-950 font-black rounded-[2rem] hover:bg-blue-500 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-xs group"
            >
               Hablar con Coordinación
               <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
         </motion.div>
      </section>

    </div>
  );
}

// ──────────────── SUB-COMPONENTS ────────────────

const LanguagePoster = ({ lang, index, toggleLanguage, isSelected }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={() => toggleLanguage(lang.id)}
    className={`relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group cursor-pointer border-2 transition-all duration-500 ${isSelected ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-white/5 hover:border-white/20'}`}
  >
    {/* Background Image/Gradient */}
    <div className="absolute inset-0 bg-slate-900">
       <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-b from-transparent via-black/50 to-black" />
       <div className="absolute inset-0 transition-opacity duration-700 opacity-20 group-hover:opacity-40" style={{ background: `radial-gradient(circle at 50% 10%, ${lang.color}, transparent 80%)` }} />
    </div>

    {/* Header Info */}
    <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
       <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
          {lang.badge}
       </span>
       <span className="text-5xl drop-shadow-2xl transition-transform group-hover:scale-110 duration-500">{lang.emoji}</span>
    </div>

    {/* Content */}
    <div className="absolute bottom-8 left-8 right-8 z-10">
       <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-3 leading-tight">{lang.name}</h3>
       <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6 group-hover:text-slate-200 transition-colors uppercase tracking-wide">
          {lang.summary}
       </p>
       
       <div className="flex gap-2 flex-wrap mb-6">
          {lang.features.slice(0, 2).map((f, i) => (
             <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                {f}
             </span>
          ))}
       </div>

       <button className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20'}`}>
          {isSelected ? 'DESTINO ELEGIDO' : 'AÑADIR A MI PLAN'}
       </button>
    </div>

    {/* Selection Overlay */}
    <AnimatePresence>
       {isSelected && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-blue-600/10 pointer-events-none z-20"
          />
       )}
    </AnimatePresence>
  </motion.div>
);

const BundleOption = ({ title, desc, count, total, saving, isSelected, recommended, onClick }) => (
   <div className={`flex-1 relative p-8 rounded-[2.5rem] border-2 transition-all flex flex-col justify-center text-center ${recommended ? 'bg-blue-600/10 border-blue-500 md:scale-105 z-10 shadow-2xl shadow-blue-500/10' : 'bg-slate-900/40 border-white/5 opacity-80'}`}>
      {recommended && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">Recomendado</div>}
      <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{title}</h3>
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">{desc}</p>
      <div className="mb-2">
         <span className="text-3xl font-black text-white tracking-tighter">{total}</span>
         <span className="text-[10px] font-black uppercase text-slate-600 ml-1">/Mes</span>
      </div>
      {saving && <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Ahorras {saving}</span>}
   </div>
);