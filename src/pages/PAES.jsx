import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import SEOHead from "../components/SEOHead.jsx";
import { supabase } from "../supabaseClient";

// Icons
import {
  FaCheck, FaArrowRight, FaStar, FaUserGraduate, FaUniversity,
  FaWhatsapp, FaPlayCircle, FaShieldAlt
} from "react-icons/fa";
import { MdQuiz, MdOutlineSupportAgent } from "react-icons/md";
import { BiChalkboard } from "react-icons/bi";

// Centralized Data Imports
import {
  PAES_SUBJECTS,
  PAES_COMBOS,
  computePaesPrice,
  clp
} from "../data/paes.js";
import { TESTIMONIALS } from "../data/testimonials.js";

import PaesSimulator from "../components/PaesSimulator.jsx";
import VisualRoadmap from "../components/VisualRoadmap.jsx";

const ROADMAP_STEPS = [
  { title: "Inscripción", desc: "Matrícula digital y diagnóstico inicial.", subinfo: "Paso 1", icon: <FaUserGraduate /> },
  { title: "Diagnóstico", desc: "Evaluamos tu base para nivelación.", subinfo: "Semana 1", icon: <FaPlayCircle /> },
  { title: "Nivelación", desc: "Clases base para cerrar brechas.", subinfo: "Mes 1-2", icon: <BiChalkboard /> },
  { title: "Estrategia", desc: "Dominio de temario y atajos PAES.", subinfo: "Mes 3-8", icon: <MdQuiz /> },
  { title: "Simulacros", desc: "Ensayos intensivos reales.", subinfo: "Final", icon: <FaUniversity /> },
];

export default function Paes() {
  const { addToCart, openCart } = useCart();

  // --- ESTADOS ---
  const [dbProducts, setDbProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computePaesPrice([]));
  const [showSticky, setShowSticky] = useState(false);

  // --- EFECTOS ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('category', 'PAES');
      if (!error) setDbProducts(data || []);
    } catch (err) {
      console.error("Error fetching PAES:", err);
    }
  };

  useEffect(() => {
    setPricing(computePaesPrice(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const toggleSubject = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleAddCustom = () => {
    if (selectedIds.length === 0) return;
    const names = selectedIds.map(id => PAES_SUBJECTS.find(s => s.id === id).name).join(", ");
    const dbProduct = dbProducts.find(p => p.name.toLowerCase().includes(pricing.label.toLowerCase()) || (pricing.count >= 4 && p.name.includes("Full Intensivo")));
    
    addToCart({
      id: `custom-paes-${selectedIds.join('-')}`,
      db_id: dbProduct ? dbProduct.id : null,
      title: `${pricing.label} (${selectedIds.length} ramos)`,
      price: pricing.totalMonthly,
      detail: names,
      type: 'plan'
    });
    openCart();
  };

  const handleAddCombo = (combo) => {
    const dbProduct = dbProducts.find(p => p.name.toLowerCase().includes(combo.title.toLowerCase()));
    addToCart({
      id: dbProduct ? dbProduct.id : `combo-${combo.id}`,
      db_id: dbProduct ? dbProduct.id : null,
      title: dbProduct ? dbProduct.name : combo.title,
      price: dbProduct ? dbProduct.price : combo.price,
      detail: dbProduct ? dbProduct.description : combo.features.join(", "),
      type: 'pack'
    });
    openCart();
  };

  const scrollToBuilder = () => document.getElementById('planes').scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30 pb-20">
      <SEOHead title="Preuniversitario Online PAES" description="Domina la PAES. Asegura tu Universidad con estrategia y simuladores." />

      {/* ──────────────── SECCIÓN 1: HEADER (Venta Agresiva) ──────────────── */}
      <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold uppercase tracking-widest mb-6">
            Admisión 2026 Abierta
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
            Domina la PAES. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400">
              Asegura tu Universidad.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Olvídate de los preus aburridos. Aquí estudias con estrategia, simuladores y profesores que sí te entienden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToBuilder} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-full text-lg shadow-lg shadow-indigo-600/30 transition-all uppercase tracking-widest">
              Ver Planes 2026
            </button>
            <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full text-lg border border-white/10 transition-all flex items-center gap-2 justify-center">
              <FaWhatsapp /> Hablar con Profe
            </a>
          </div>
        </div>
      </header>

      {/* ──────────────── SECCIÓN 2: METODOLOGÍA (3 ICONOS) ──────────────── */}
      <section className="py-20 bg-[#020617] border-y border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: <BiChalkboard />, 
              title: "Clases en Vivo", 
              desc: "Interactúa en tiempo real. Si faltas, todo queda grabado en tu Aula Virtual." 
            },
            { 
              icon: <MdQuiz />, 
              title: "Ensayos y Simulacros", 
              desc: "Plataforma idéntica a la real. Mide tu puntaje y detecta tus fallas." 
            },
            { 
              icon: <FaUserGraduate />, 
              title: "Orientación Vocacional", 
              desc: "No solo te preparamos para la prueba, te ayudamos a elegir tu carrera." 
            }
          ].map((item, i) => (
            <div key={i} className="text-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group">
              <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-4xl text-indigo-400 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── SECCIÓN 3: PRECIOS Y PLANES (PACKS FIRST) ──────────────── */}
      <section id="planes" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
              Elige tu <span className="text-indigo-500">Pack de Carrera</span>
            </h2>
            <p className="text-slate-400 text-lg">Combinaciones optimizadas para asegurar tu puntaje.</p>
          </div>

          {/* PACKS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
            {PAES_COMBOS.map((combo) => {
              const gradients = {
                humanista: "from-amber-500/20 to-amber-900/0 border-amber-500/50",
                salud: "from-teal-500/20 to-teal-900/0 border-teal-500/50",
                ingenieria: "from-indigo-500/20 to-indigo-900/0 border-indigo-500/50",
              };
              
              // Custom copy override based on User Request
              let customSubtitle = combo.subtitle;
              if (combo.id === 'humanista') customSubtitle = "Lenguaje + Historia + Filosofía";
              if (combo.id === 'salud' || combo.id === 'cientifico') customSubtitle = "Matemáticas + Ciencias + Biología/Física";

              return (
                <div key={combo.id} className={`relative bg-gradient-to-b ${gradients[combo.id] || "from-white/10"} p-10 rounded-[2.5rem] border backdrop-blur-md group hover:-translate-y-2 transition-transform duration-500`}>
                  <div className="absolute top-0 right-0 p-4">
                     <span className="bg-white/10 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white">Recomendado</span>
                  </div>
                  
                  <div className="mt-4 mb-8">
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{combo.title}</h3>
                    <p className="text-sm font-bold text-slate-300 uppercase tracking-wide min-h-[40px]">{customSubtitle || combo.features[0]}</p>
                  </div>

                  <div className="mb-8">
                    <span className="text-5xl font-black text-white tracking-tighter">{clp(combo.price)}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">/mes</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                     {combo.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                           <FaCheck className="text-emerald-500 mt-1 shrink-0" /> {f}
                        </li>
                     ))}
                  </ul>

                  <button 
                    onClick={() => handleAddCombo(combo)}
                    className="w-full py-4 bg-white text-slate-950 font-black rounded-xl uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    Elegir Pack
                  </button>
                </div>
              );
            })}
          </div>

          {/* BUILDER (RAMOS SUELTOS) */}
          <div id="builder-section" className="bg-[#0f172a]/50 rounded-[3rem] border border-white/5 p-8 md:p-16">
            <div className="text-center mb-12">
               <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">¿Prefieres armar tu horario?</h3>
               <p className="text-slate-400">Selecciona tus ramos sueltos a medida.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                 {/* SELECTOR */}
                 <div className="lg:col-span-3 space-y-4">
                    {PAES_SUBJECTS.map((sub) => {
                       const isActive = selectedIds.includes(sub.id);
                       return (
                          <div 
                             key={sub.id} 
                             onClick={() => toggleSubject(sub.id)}
                             className={`flex items-center gap-6 p-6 rounded-[2rem] border transition-all cursor-pointer ${isActive ? 'bg-indigo-500/20 border-indigo-500' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}
                          >
                             <div className="text-2xl">{sub.icon}</div>
                             <div className="flex-1">
                                <h4 className="text-lg font-black text-white uppercase">{sub.name}</h4>
                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">{sub.category}</span>
                             </div>
                             <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isActive ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-600 text-slate-600'}`}>
                                {isActive ? <FaCheck size={12} /> : '+'}
                             </div>
                          </div>
                       )
                    })}
                 </div>

                 {/* TICKET */}
                 <div className="lg:col-span-2">
                    <div className="bg-[#050505] p-8 rounded-[2rem] border border-white/10 sticky top-10">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Tu Configuración</h4>
                       
                       {pricing.count > 0 ? (
                          <ul className="space-y-2 mb-6 text-sm text-slate-300">
                             {selectedIds.map(id => <li key={id}>• {PAES_SUBJECTS.find(s=>s.id===id).name}</li>)}
                          </ul>
                       ) : (
                          <p className="text-slate-600 italic mb-6 text-sm">Selecciona asignaturas...</p>
                       )}

                       <div className="pt-6 border-t border-white/10 flex justify-between items-end mb-6">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-500">Total Mensual</span>
                          <span className="text-3xl font-black text-white tracking-tighter">{clp(pricing.totalMonthly)}</span>
                       </div>

                       <button 
                          onClick={handleAddCustom}
                          disabled={pricing.count === 0}
                          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl uppercase tracking-widest text-xs transition-colors"
                       >
                          Inscribir Ramos
                       </button>
                    </div>
                 </div>
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────── SECCIÓN 4: FAQ (PREGUNTAS) ──────────────── */}
      <section className="py-24 bg-[#020617] border-t border-white/5">
         <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-3xl font-black text-center text-white uppercase tracking-tighter mb-12">Preguntas Frecuentes</h2>
            
            <div className="space-y-4">
               {[
                  { q: "¿Las clases quedan grabadas?", a: "Sí, acceso 24/7 a través de tu Aula Virtual para que repases cuando quieras." },
                  { q: "¿Cómo pago?", a: "Tarjeta de Crédito, Débito o Transferencia vía Mercado Pago. Seguro y rápido." },
                  { q: "¿Cuándo empiezan?", a: "Marzo 2026. ¡Las inscripciones ya están abiertas y los cupos vuelan!" },
                  { q: "¿Tienen material propio?", a: "Sí. Guías, ensayos y libros digitales exclusivos de Instituto Lael incluidos en tu plan." } 
               ].map((faq, i) => (
                  <details key={i} className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden open:bg-white/[0.05] transition-colors">
                     <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-white text-sm uppercase tracking-wide select-none">
                        {faq.q}
                        <span className="transition-transform group-open:rotate-180 text-indigo-500">▼</span>
                     </summary>
                     <p className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </details>
               ))}
            </div>
         </div>
      </section>

      {/* Call to Action Final */}
      <div className="text-center py-20 bg-[#050505]">
         <p className="text-slate-500 mb-6 font-medium">¿Aún con dudas?</p>
         <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest hover:text-emerald-300 transition-colors">
            <FaWhatsapp text-xl /> Háblanos al WhatsApp
         </a>
      </div>

    </div>
  );
}