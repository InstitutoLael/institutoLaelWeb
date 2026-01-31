import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import SEOHead from "../components/SEOHead.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";

// Components
import VisualRoadmap from "../components/VisualRoadmap.jsx";

// Icons
import {
  FaCheck, FaUsers, FaVideo,
  FaWhatsapp, FaGraduationCap, FaArrowRight, FaHeadset
} from "react-icons/fa";
import { BiWorld, BiConversation } from "react-icons/bi";
import { MdOutlineFlightTakeoff, MdQuiz } from "react-icons/md";
import { IoIosInfinite } from "react-icons/io";

// DATA
import {
  LANGUAGES,
  computeLangBundle,
  clp
} from "../data/idiomas.js";
import { TESTIMONIALS } from "../data/testimonials.js";

const IDIOMAS_ROADMAP = [
  { title: "Diagnóstico", desc: "Test de nivelación y objetivos.", subinfo: "Día 1", icon: <BiWorld /> },
  { title: "Inmersión", desc: "Clases 100% interactivas.", subinfo: "Semana 1+", icon: <BiConversation /> },
  { title: "Conversación", desc: "Storytelling y role-play.", subinfo: "Día 15+", icon: <FaUsers /> },
];

export default function Idiomas() {
  const { addToCart, openCart } = useCart();

  // --- STATES ---
  const [dbProducts, setDbProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computeLangBundle(0));
  const [showSticky, setShowSticky] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('category', 'Idioma');
      if (!error) setDbProducts(data || []);
    } catch (err) {
      console.error("Error fetching Idioma products:", err);
    }
  };

  useEffect(() => {
    setPricing(computeLangBundle(selectedIds.length));
  }, [selectedIds]);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const toggleLanguage = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAddBundle = () => {
    if (selectedIds.length === 0) {
      document.getElementById('lang-builder')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
     const names = selectedIds.map(id => LANGUAGES.find(l => l.id === id).name).join(" + ");
    
    // Improved matching logic
    const dbProduct = dbProducts.find(p => 
      p.name.toLowerCase().includes(pricing.label.toLowerCase()) ||
      (pricing.count >= 3 && p.name.includes("Políglota"))
    );

    addToCart({
      id: `lang-bundle-${selectedIds.join('-')}`,
      db_id: dbProduct ? dbProduct.id : null,
      title: pricing.label,
      price: pricing.totalMonthly,
      detail: names,
      detail_secondary: "Matrícula Única: " + clp(pricing.enrollment), // Add secondary detail
      type: 'plan'
    });
    openCart();
  };

  const scrollToBuilder = () => {
    document.getElementById('lang-builder').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30 pb-20">
      <SEOHead 
        title="Cursos de Idiomas Online | Instituto Lael" 
        description="Inglés y Coreano con metodología comunicativa."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": LANGUAGES.filter(l => !l.comingSoon).map((lang, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Course",
              "name": lang.name,
              "description": lang.summary,
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Instituto Lael",
                "sameAs": "https://institutolael.cl"
              },
              "offers": {
                "@type": "Offer",
                "price": "24990",
                "priceCurrency": "CLP"
              }
            }
          }))
        }} 
      />

      {/* ──────────────── SECCIÓN 1: HEADER (Aspiracional) ──────────────── */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#1e1b4b_0%,_#050505_70%)] opacity-80" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-300 mb-8"
          >
             <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
             Matrícula Abierta 2026
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight uppercase">
             Un nuevo idioma<br />
            <span className="bg-gradient-to-r from-white via-blue-200 to-amber-200 bg-clip-text text-transparent italic">
               es una nueva vida.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
             Deja de traducir en tu mente. Nuestra metodología comunicativa te hará hablar desde las primeras clases.
          </p>

          <button
              onClick={scrollToBuilder}
              className="px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform"
            >
              Comenzar Ahora
          </button>
        </div>
      </header>

      {/* ──────────────── SECCIÓN 2: TEACHERS (EXPERTOS) ──────────────── */}
      <section className="py-20 bg-[#050505] border-b border-white/5">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                  Expertos <span className="text-blue-500">Nativos</span>
               </h2>
               <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
                  Aprende la cultura, no solo el idioma. Nuestros docentes viven lo que enseñan.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Javiera - English */}
               <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl border border-blue-500/30">
                        👩🏼‍🏫
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Javiera</h4>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Head of English 🇺🇸</span>
                     </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                     "Mi foco es que pierdas el miedo. Corregimos pronunciación desde el día 1 para que suenes profesional, no como robot."
                  </p>
               </div>

               {/* Fernanda - Korean */}
               <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-pink-500/30 transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-3xl border border-pink-500/30">
                        👩🏻‍🏫
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Fernanda</h4>
                        <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Lead Korean 🇰🇷</span>
                     </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                     "Usamos K-Pop y Dramas para entender el contexto real. El Coreano es jerarquía y respeto, y eso se enseña viviendo la cultura."
                  </p>
               </div>

               {/* Diego - Spanish */}
               <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-amber-500/30 transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center text-3xl border border-amber-500/30">
                        👨🏻‍🏫
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Diego</h4>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Spanish Coach 🇨🇱</span>
                     </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                     "Chilean Spanish is tricky. I'll help you navigate 'modismos', survive the Metro, and master business etiquette in Santiago."
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── SECCIÓN 3: ROADMAP (TU VIAJE) ──────────────── */}
      <section className="py-20 bg-[#020617] border-b border-white/5">
         <div className="container mx-auto px-6">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                  Tu Ruta de <span className="text-amber-500">Fluidez</span>
               </h2>
               <p className="text-slate-500">Metodología paso a paso sin rellenos.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
               <VisualRoadmap steps={IDIOMAS_ROADMAP} color="blue" />
            </div>
         </div>
      </section>

      {/* ──────────────── SECCIÓN 4: SELECTOR VISUAL ──────────────── */}
      <section id="lang-builder" className="py-24 bg-[#050505] border-t border-white/5">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Elige tu destino</h2>
               <p className="text-slate-500">Haz clic para seleccionar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
               
               {/* INGLÉS CARD */}
               {LANGUAGES.filter(l => l.id === 'ingles').map(lang => {
                  const isSelected = selectedIds.includes('ingles');
                  return (
                     <div 
                        key={lang.id} 
                        onClick={() => toggleLanguage('ingles', false)}
                        className={`group relative p-10 rounded-[2.5rem] border-2 cursor-pointer transition-all overflow-hidden ${isSelected ? 'bg-blue-900/10 border-blue-500' : 'bg-white/[0.02] border-white/5 hover:border-blue-500/30'}`}
                     >
                        <div className="absolute top-4 right-6 text-6xl opacity-20 grayscale group-hover:grayscale-0 transition-grayscale">🇺🇸</div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Inglés</h3>
                        <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">Para el Mundo Real</p>
                        
                        <ul className="space-y-3 mb-8">
                           <li className="flex gap-3 text-slate-400 text-sm font-medium"><FaCheck className="text-blue-500 mt-1" /> Enfoque conversacional</li>
                           <li className="flex gap-3 text-slate-400 text-sm font-medium"><FaCheck className="text-blue-500 mt-1" /> Preparación para el trabajo</li>
                           <li className="flex gap-3 text-slate-400 text-sm font-medium"><FaCheck className="text-blue-500 mt-1" /> Certificación por niveles</li>
                        </ul>

                        <div className="text-right">
                           {/* Using static price from data for display, logic uses state */}
                           <span className="block text-2xl font-black text-white tracking-tighter">{clp(35000)}</span>
                           <span className="text-[10px] uppercase font-black tracking-widest text-slate-600">Mensual</span>
                        </div>

                        {isSelected && <div className="absolute bottom-6 left-6 text-blue-500"><FaCheck size={24} /></div>}
                     </div>
                  )
               })}

               {/* LSCh CARD (NEW PROMOTED) */}
               <div 
                  onClick={() => window.location.href = '/lsch'}
                  className="group relative p-10 rounded-[2.5rem] border-2 cursor-pointer transition-all overflow-hidden bg-white/[0.02] border-white/5 hover:border-teal-500/30"
               >
                  <div className="absolute top-4 right-6 text-6xl opacity-20 grayscale group-hover:grayscale-0 transition-grayscale">🤟</div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Lengua de Señas</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-teal-400 mb-6">Inclusión Real</p>
                  
                  <ul className="space-y-3 mb-8">
                     <li className="flex gap-3 text-slate-400 text-sm font-medium"><FaCheck className="text-teal-500 mt-1" /> Cultura Sorda (No mímica)</li>
                     <li className="flex gap-3 text-slate-400 text-sm font-medium"><FaCheck className="text-teal-500 mt-1" /> Gramática Visual</li>
                     <li className="flex gap-3 text-slate-400 text-sm font-medium"><FaCheck className="text-teal-500 mt-1" /> Docentes Nativos</li>
                  </ul>

                  <div className="text-right">
                     <span className="block text-xl font-bold text-white tracking-tight">Ver Programa</span>
                     <span className="text-[10px] uppercase font-black tracking-widest text-slate-600">Ir a Sitio Exclusivo</span>
                  </div>

                  <div className="absolute bottom-6 left-6 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"><FaArrowRight size={24} /></div>
               </div>
            </div>
            
            {/* OTHER LANGUAGES (SMALLER) */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
               {LANGUAGES.filter(l => l.id !== 'ingles' && l.id !== 'coreano' && l.id !== 'lsch').map(lang => (
                   <div key={lang.id} className="px-6 py-3 rounded-xl border border-white/5 bg-white/[0.02] opacity-50 flex items-center gap-2 grayscale">
                      <span className="text-xl">{lang.emoji}</span>
                      <span className="text-xs font-bold uppercase text-slate-500">{lang.name} (Pronto)</span>
                   </div>
               ))}
            </div>

            {/* ACTION BAR */}
            <div className="mt-16 text-center max-w-2xl mx-auto bg-[#0f172a] p-8 rounded-[2rem] border border-white/10 sticky bottom-6 shadow-2xl z-40">
               <div className="flex justify-between items-center mb-6">
                  <div className="text-left">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Mensual</span>
                     <div className="text-3xl font-black text-white tracking-tighter">{clp(pricing.totalMonthly)}</div>
                  </div>
                   <div className="text-right">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Matrícula</span>
                     <div className="text-xl font-bold text-slate-300">{clp(pricing.enrollment)}</div>
                  </div>
               </div>
               <button 
                  onClick={handleAddBundle}
                  disabled={selectedIds.length === 0}
                  className="w-full py-4 bg-white text-slate-950 font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
               >
                  {selectedIds.length === 0 ? "Selecciona un Idioma" : "Inscribirme Ahora"}
               </button>
            </div>

         </div>
      </section>

       {/* ──────────────── SECCIÓN 5: RESULTADOS REALES ──────────────── */}
       <section className="py-24 bg-[#020617] border-t border-white/5">
          <div className="container mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                   Ellos ya <span className="text-blue-500">Hablan</span>
                </h2>
                <p className="text-xl text-slate-400 font-light">
                   No te quedes con la duda. Mira lo que nuestros alumnos han logrado.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.filter(t => t.tags?.includes('idiomas')).slice(0, 3).map((t, i) => (
                   <div key={i} className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col">
                      <div className="flex text-amber-500 mb-4 text-lg">
                         {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 italic flex-1">"{t.quote}"</p>
                      <div className="flex items-center gap-4 mt-auto">
                         <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-black text-blue-400 border border-blue-500/30">
                            {t.name.charAt(0)}
                         </div>
                         <div>
                            <strong className="block text-white text-sm uppercase tracking-tight">{t.name}</strong>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.program}</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </section>

      <div className="pb-20"></div>

    </div>
  );