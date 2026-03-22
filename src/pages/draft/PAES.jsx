import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

// UI Components
import Button from "../components/ui/Button";
import BackgroundAurora from "../components/BackgroundAurora";
import Breadcrumbs from "../components/Breadcrumbs";
import FAQAccordion from "../components/FAQAccordion";
import PlanComparator from "../components/PlanComparator";

// Icons
import {
  FaCheckCircle,
  FaTimesCircle,
  FaWhatsapp,
  FaRobot,
  FaBrain,
  FaChartLine,
  FaChevronDown,
  FaPlus,
  FaMinus,
  FaArrowRight
} from "react-icons/fa";

// Centralized Data Imports
import {
  PAES_SUBJECTS,
  PAES_COMBOS,
  PAES_FEATURES,
  PAES_COMPARISON,
  PAES_FAQS,
  computePaesPrice,
  clp
} from "../data/paes.js";

// SEO
import SEOHead from "../components/SEOHead.jsx";

export default function Paes() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computePaesPrice([]));
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPricing(computePaesPrice(selectedIds));
  }, [selectedIds]);

  const toggleSubject = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      <SEOHead 
        title="PAES 2026 | Domina la Prueba con IA y Estrategia" 
        description="Asegura tu universidad con nuestro Preuniversitario especializado. Simuladores IA, coaching estratégico y resultados reales."
      />

      <BackgroundAurora />

      {/* ──────────────── A. HERO SECTION (LA PROMESA) ──────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="flex justify-center mb-8">
            <Breadcrumbs />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
          >
            DOMINA LA PAES. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-violet-400">
               ASEGURA TU U.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Olvídate de memorizar. Aquí hackeamos la prueba con 
            <strong className="text-white"> Estrategia + Inteligencia Artificial</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <Button 
              onClick={() => scrollToSection('pricing')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
            >
              VER PLANES 2026
            </Button>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
               ⭐ +1200 Alumnos ingresaron en 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── B. PROBLEM/SOLUTION (LA DIFERENCIA) ──────────────── */}
      <section className="py-24 bg-slate-900/40 relative border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                ¿Por qué Preu Lael?
             </h2>
             <p className="text-slate-400 max-w-xl mx-auto font-light">
                No somos un preu tradicional. Somos un centro de alto rendimiento educativo.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<FaRobot />}
              title="Simuladores IA"
              desc="Practica con dificultad adaptativa real que se ajusta a tu nivel automáticamente."
              color="text-blue-500"
            />
            <FeatureCard 
              icon={<FaBrain />}
              title="Estrategia, no memoria"
              desc="Te enseñamos a pensar, identificar patrones y descartar como un experto."
              color="text-violet-500"
            />
            <FeatureCard 
              icon={<FaChartLine />}
              title="Resultados Reales"
              desc="Seguimiento personalizado de tu puntaje proyectado clase a clase."
              color="text-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* ──────────────── C. COMPARATIVA (LA TABLA DE LA VERDAD) ──────────────── */}
      <PlanComparator 
        title="La comparativa real" 
        subtitle="No todas las preparaciones son iguales."
        headers={["Beneficio", "Instituto Lael", "Preu Tradicional", "Prof. Particular"]}
        data={PAES_COMPARISON}
        keys={["feature", "lael", "other", "tutor"]}
        highlightColumn={1}
      />

      {/* ──────────────── D. PRICING (LA OFERTA IRRESISTIBLE) ──────────────── */}
      <section id="pricing" className="py-32 bg-slate-900/20 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                ELIGE TU <span className="text-blue-500">PACK DE CARRERA</span>
             </h2>
             <p className="text-slate-400 font-light">Seleccionamos los ramos ideales para tu objetivo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {PAES_COMBOS.map((combo, i) => (
                <PricingCard 
                  key={combo.id}
                  combo={combo}
                  recommended={combo.id === 'cientifico' || combo.id === 'full'}
                  onEnroll={() => addToCart({
                    id: combo.id,
                    title: combo.title,
                    price: combo.price,
                    type: 'Pack PAES'
                  })}
                  index={i}
                />
             ))}
          </div>
        </div>
      </section>

      {/* ──────────────── E. CALCULADORA (ARMA TU HORARIO) ──────────────── */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
                Arma tu horario a medida
             </h2>
             <p className="text-slate-400 font-light">¿Necesitas algo específico? Selecciona tus ramos y el descuento se aplicará solo.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
             
             {/* Subjects List */}
             <div className="lg:col-span-2 space-y-4">
                {PAES_SUBJECTS.map((sub, i) => {
                   const isSelected = selectedIds.includes(sub.id);
                   return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => toggleSubject(sub.id)}
                        className={`group relative p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6 ${isSelected ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                      >
                         <div className={`text-4xl transition-transform group-hover:scale-110 ${isSelected ? 'grayscale-0' : 'grayscale'}`}>{sub.icon}</div>
                         <div className="flex-1">
                            <h4 className="text-xl font-black text-white uppercase tracking-tight">{sub.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{sub.category}</p>
                         </div>
                         <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700 text-slate-700 group-hover:border-slate-500'}`}>
                            {isSelected ? <FaMinus size={12} /> : <FaPlus size={12} />}
                         </div>
                      </motion.div>
                   );
                })}
             </div>

             {/* Calculation Summary */}
             <div className="sticky top-24">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-12 bg-blue-600/5 blur-[60px] rounded-full pointer-events-none" />
                   
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Resumen de Selección</h3>
                   
                   {selectedIds.length > 0 ? (
                      <div className="space-y-4 mb-10 relative z-10 transition-all">
                         {selectedIds.map(id => {
                            const s = PAES_SUBJECTS.find(x => x.id === id);
                            return (
                               <div key={id} className="flex justify-between items-center text-sm">
                                  <span className="text-slate-300 font-bold">• {s.name}</span>
                                  <span className="text-slate-500 text-xs">{clp(14990)}</span>
                               </div>
                            );
                         })}
                      </div>
                   ) : (
                      <div className="py-12 text-center text-slate-600 italic text-sm mb-4">
                         Selecciona una o más asignaturas para ver el plan...
                      </div>
                   )}

                   <div className="border-t border-white/10 pt-8 space-y-4 relative z-10">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
                         <span>Subtotal</span>
                         <span>{clp(selectedIds.length * 14990)}</span>
                      </div>
                      {pricing.saving > 0 && (
                         <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-emerald-500">
                            <span>Descuento Pack</span>
                            <span>-{clp(pricing.saving)}</span>
                         </div>
                      )}
                      <div className="flex justify-between items-end pt-4">
                         <span className="text-xs font-black uppercase tracking-widest text-white">Total Mensual</span>
                         <span className="text-4xl font-black text-white tracking-tighter">{clp(pricing.totalMonthly)}</span>
                      </div>
                   </div>

                   <Button 
                      disabled={selectedIds.length === 0}
                      onClick={() => addToCart({
                        id: `custom-paes-${selectedIds.join("-")}`,
                        title: "Plan PAES Personalizado",
                        price: pricing.totalMonthly,
                        type: 'Plan PAES'
                      })}
                      className={`w-full mt-10 ${selectedIds.length > 0 ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-slate-800 text-slate-500 opacity-50'}`}
                   >
                      INICIAR MATRÍCULA
                   </Button>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* ──────────────── F. FAQ (ELIMINAR OBJECIONES) ──────────────── */}
      <FAQAccordion 
        title="Despeja tus dudas" 
        subtitle="Todo lo que necesitas saber antes de dar el primer paso."
        items={PAES_FAQS}
      />

      {/* Final CTA Strip */}
      <section className="py-32 bg-gradient-to-b from-slate-950 to-blue-900/20 text-center px-6">
         <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-10 leading-none">
            TU CUPO <br /> TE ESPERA.
         </h2>
          <Button 
            onClick={() => addToCart({ id: 'paes-general', title: 'Consultoría PAES 2026', price: 14990, type: 'PAES' })} 
            variant="secondary"
            size="lg"
            className="group"
         >
            Consultar Cupos Disponibles
            <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
         </Button>
      </section>

    </div>
  );
}

// ──────────────── SUB-COMPONENTS ────────────────

const FeatureCard = ({ icon, title, desc, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:border-white/20 transition-all flex flex-col items-center text-center group backdrop-blur-sm"
  >
    <div className={`text-6xl mb-8 ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-light">{desc}</p>
  </motion.div>
);

const PricingCard = ({ combo, recommended, onEnroll, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`relative p-12 rounded-[3rem] border-2 transition-all flex flex-col ${recommended ? 'bg-blue-600/10 border-blue-500 scale-105 shadow-2xl shadow-blue-500/10 z-10 backdrop-blur-xl' : 'bg-slate-900/40 border-white/5 backdrop-blur-md'}`}
  >
    {recommended && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">
         EL MÁS VOTADO
      </div>
    )}

    <div className="mb-10">
       <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{combo.title}</h3>
       <p className="text-xs font-black uppercase tracking-widest text-blue-400">{combo.subtitle}</p>
    </div>

    <div className="mb-10">
       <span className="text-6xl font-black text-white tracking-tighter">{clp(combo.price)}</span>
       <span className="text-xs font-black uppercase tracking-widest text-slate-600 ml-2">Men / Plan</span>
    </div>

    <ul className="space-y-4 mb-12 flex-1">
       {combo.features.map((f, i) => (
          <li key={i} className="flex items-start gap-4 text-slate-300 font-medium text-sm">
             <FaCheckCircle className="text-blue-500 mt-1 shrink-0" /> {f}
          </li>
       ))}
    </ul>

    <Button 
      onClick={onEnroll}
      className={`w-full ${recommended ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-white/5 border-white/10'}`}
    >
      ELEGIR PACK
    </Button>
  </motion.div>
);