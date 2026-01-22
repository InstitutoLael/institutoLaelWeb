import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import {
  FaCheck, FaTimes, FaInfoCircle, FaBookOpen, FaLaptopCode,
  FaWhatsapp, FaArrowRight, FaStar, FaUserGraduate, FaUniversity,
  FaBrain, FaChartLine, FaShieldAlt, FaPlayCircle, FaDownload,
  FaChalkboardTeacher
} from "react-icons/fa";
import { BiMath, BiBookReader } from "react-icons/bi";
import { MdOutlineSupportAgent, MdQuiz } from "react-icons/md";

// Centralized Data Imports
import {
  PAES_SUBJECTS,
  PAES_COMBOS,
  computePaesPrice,
  clp,
  PAES_SYLLABUS,
  PAES_COMPARISON
} from "../data/paes.js";
import { teachers } from "../data/teachers.js";
import { TESTIMONIALS } from "../data/testimonials.js";

import PaesSimulator from "../components/PaesSimulator.jsx";
import VisualRoadmap from "../components/VisualRoadmap.jsx";
import { supabase } from "../supabaseClient";

const ROADMAP_STEPS = [
  { title: "Inscripción", desc: "Matrícula digital y diagnóstico inicial.", subinfo: "Paso 1", icon: <FaUserGraduate /> },
  { title: "Diagnóstico", desc: "Evaluamos tu base para nivelación.", subinfo: "Semana 1", icon: <FaInfoCircle /> },
  { title: "Nivelación", desc: "Clases base para cerrar brechas.", subinfo: "Mes 1-2", icon: <FaBookOpen /> },
  { title: "Estrategia", desc: "Dominio de temario y atajos PAES.", subinfo: "Mes 3-8", icon: <FaLaptopCode /> },
  { title: "Simulacros", desc: "Ensayos intensivos reales.", subinfo: "Final", icon: <FaUniversity /> },
];

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Paes() {
  const { addToCart, openCart } = useCart();

  // --- ESTADOS ---
  const [dbProducts, setDbProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computePaesPrice([]));
  const [activeTab, setActiveTab] = useState("m1"); // Para el Syllabus
  const [showSticky, setShowSticky] = useState(false); // Barra inferior pegajosa
  const [loading, setLoading] = useState(true);

  // --- EFECTOS ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'PAES');

      if (error) throw error;
      setDbProducts(data || []);
    } catch (err) {
      console.error("Error fetching PAES products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // We still use computePaesPrice for the logic of tiers, 
    // but in a real e-commerce, the price would come from the specific item.
    // However, if the user builds a custom plan, we apply the tier logic.
    setPricing(computePaesPrice(selectedIds));
  }, [selectedIds]);

  // Detector de Scroll para barra pegajosa
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const toggleSubject = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleAddCustom = () => {
    if (selectedIds.length === 0) return;

    // Find matching subjects in DB products to get their real IDs if available
    // For now, we keep the custom plan logic, but using the calculated price.
    const names = selectedIds.map(id => PAES_SUBJECTS.find(s => s.id === id).name).join(", ");
    const dbProduct = dbProducts.find(p => p.name.includes("PAES"));

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
    // Find the corresponding product in DB by name or matching criteria
    const dbProduct = dbProducts.find(p => p.name.includes(combo.title));

    addToCart({
      id: dbProduct ? dbProduct.id : `combo-${combo.id}`,
      db_id: dbProduct ? dbProduct.id : null,
      title: dbProduct ? dbProduct.name : `Pack ${combo.title}`,
      price: dbProduct ? dbProduct.price : combo.price,
      detail: dbProduct ? dbProduct.description : combo.features.join(", "),
      image_url: dbProduct ? dbProduct.image_url : null,
      type: 'pack'
    });
    openCart();
  };

  const scrollToBuilder = () => {
    document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Filter data for PAES page
  const paesTestimonials = TESTIMONIALS.filter(t => t.program.toLowerCase().includes("paes"));
  // Use first 3 teachers as featured (or filter by specific criteria if added later)
  const featuredTeachers = teachers.slice(0, 3);

  return (
    <div className="bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30 pb-20">

      {/* ──────────────── SECTION 1: HERO MASIVO ──────────────── */}
      <header className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)]">
        {/* Ambient Effects */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-indigo-300 text-sm font-bold mb-8 backdrop-blur-md animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]"></span>
            Admisión 2026 Abierta
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Tu Puntaje Nacional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-500">
              no es suerte.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Olvídate de los preus del siglo pasado. Entrena con Inteligencia Artificial,
            tutores expertos y una metodología diseñada para maximizar tu puntaje.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <button onClick={scrollToBuilder} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-lg shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(99,102,241,0.6)] transition-all flex items-center gap-2">
              Armar mi Plan <FaArrowRight />
            </button>
            <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-full text-lg backdrop-blur-md hover:bg-white/20 transition-all flex items-center gap-2">
              <FaPlayCircle /> Ver cómo funciona
            </button>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8">
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-4 font-semibold">Nuestros alumnos estudian en:</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="flex items-center gap-2 text-slate-300 font-bold"><span className="text-xl">🏛️</span> U. de Chile</span>
              <span className="flex items-center gap-2 text-slate-300 font-bold"><span className="text-xl">⛪</span> PUC</span>
              <span className="flex items-center gap-2 text-slate-300 font-bold"><span className="text-xl">🏗️</span> USACH</span>
              <span className="flex items-center gap-2 text-slate-300 font-bold"><span className="text-xl">🌲</span> U. de Concepción</span>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────── SECTION 2: DATOS DUROS (STATS) ──────────────── */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5 backdrop-blur-3xl">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <FaChartLine />, val: "+180 pts", label: "Alza promedio" },
            { icon: <FaUserGraduate />, val: "85%", label: "Entra a su 1ª opción" },
            { icon: <MdQuiz />, val: "15k+", label: "Ensayos rendidos" },
            { icon: <FaStar />, val: "4.9/5", label: "Valoración alumnos" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <span className="text-4xl text-indigo-500/80">{stat.icon}</span>
              <div>
                <strong className="block text-2xl text-white font-bold">{stat.val}</strong>
                <span className="text-slate-500 text-sm uppercase tracking-wide">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── SECTION 3: EL PROBLEMA (PAIN POINTS) ──────────────── */}
      <section className="py-24 bg-[#020617]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">¿Por qué la mayoría falla en la PAES?</h2>
            <p className="text-slate-400 text-xl">No es falta de capacidad, es falta de estrategia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📉", title: "Estudian de memoria", desc: "La PAES mide habilidades. Memorizar fórmulas no sirve si no sabes aplicarlas a problemas nuevos." },
              { icon: "🥱", title: "Clases aburridas", desc: "Estar sentado 2 horas escuchando a un profesor dictar materia es la forma menos eficiente de aprender." },
              { icon: "😰", title: "Ansiedad y Estrés", desc: "Llegar a la prueba sin haber ensayado bajo presión real provoca bloqueos mentales el día D." }
            ].map((card, i) => (
              <div key={i} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500 group backdrop-blur-sm">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 4: LA SOLUCIÓN (MÉTODO LAEL) ──────────────── */}
      <section className="py-24 bg-[#050510] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="text-indigo-400 font-bold tracking-widest text-sm mb-2 block">METODOLOGÍA LAEL</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">El camino científico hacia los 1000 puntos</h2>
            <p className="text-slate-400 text-lg mb-12">Hemos deconstruido la prueba para crear un sistema de 4 pilares que garantiza resultados.</p>

            <ul className="space-y-8">
              {[
                { title: "Diagnóstico Inteligente", desc: "Detectamos tus vacíos base desde el día 1 para no perder tiempo en lo que ya sabes." },
                { title: "Nivelación Acelerada", desc: "Clases intensivas para cubrir las lagunas de 1° a 4° medio en tiempo récord." },
                { title: "Dominio del Contenido", desc: "Clases en vivo enfocadas en 'saber hacer', con trucos y atajos matemáticos." },
                { title: "Simulación de Guerra", desc: "Ensayos contrarreloj semanales que replican las condiciones reales de la prueba." }
              ].map((step, i) => (
                <li key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xl shrink-0 border border-indigo-500/20">{i + 1}</div>
                  <div>
                    <strong className="block text-white text-lg mb-1">{step.title}</strong>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 backdrop-blur-sm h-[500px] flex items-end justify-center relative shadow-2xl">
              <div className="absolute top-10 right-[-20px] bg-white text-black px-6 py-3 rounded-2xl font-bold shadow-xl transform rotate-3 flex items-center gap-2">
                🚀 Proyección Exponencial
              </div>

              {/* Mockup Chart */}
              <div className="flex items-end gap-6 h-[60%] w-full px-8 pb-4">
                {[30, 50, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-500 rounded-t-xl relative group" style={{ height: `${h}%`, opacity: 0.3 + (i * 0.2) }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Mes {i * 2 + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── VISUAL ROADMAP: CAMINO A LA U ──────────────── */}
      <section className="py-24 bg-[#050510] border-t border-white/5">
        <div className="container mx-auto px-6">
          <VisualRoadmap steps={ROADMAP_STEPS} title="Tu Ruta hacia el Puntaje Nacional" color="indigo" />
        </div>
      </section>

      {/* ──────────────── PAES SCORE SIMULATOR ──────────────── */}
      <section className="py-24 bg-[#020617] relative">
        <div className="container mx-auto px-6">
          <PaesSimulator />
        </div>
      </section>

      {/* ──────────────── SECTION 5: CALCULADORA (CORE) ──────────────── */}
      <section id="builder-section" className="py-32 bg-[#050505] scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Arma tu Horario y Ahorra</h2>
            <p className="text-slate-400">Selecciona las materias que necesitas. El descuento se aplica automáticamente.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* IZQUIERDA: SELECTOR (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              {PAES_SUBJECTS.map((sub) => {
                const isActive = selectedIds.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`flex items-center gap-6 p-6 rounded-[2rem] border transition-all cursor-pointer ${isActive
                      ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/5 hover:border-white/10'
                      }`}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 text-white shadow-xl"
                      style={{ backgroundColor: sub.color }}
                    >
                      {sub.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">{sub.name}</h4>
                      <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest leading-none">{sub.category} • {sub.hoursPerWeek} hrs/sem</span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {isActive ? (
                        <FaCheck className="text-emerald-400 text-xl" />
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center text-slate-400 font-bold pb-1 group-hover:border-white group-hover:text-white">+</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* DERECHA: TICKET FLOTANTE (2 cols) */}
            <div className="lg:col-span-2 relative">
              <div className="sticky top-28 bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-3xl">
                <div className="bg-white/[0.02] px-8 py-6 border-b border-white/5 text-center">
                  <h3 className="font-black uppercase tracking-widest text-xs text-slate-500">Resumen de Matrícula</h3>
                </div>

                <div className="p-10">
                  {pricing.count === 0 ? (
                    <div className="text-center py-8 text-slate-500 italic flex flex-col items-center gap-2">
                      <FaArrowRight className="animate-bounce-x" /> Selecciona tus ramos
                    </div>
                  ) : (
                    <ul className="mb-6 space-y-2">
                      {selectedIds.map(id => (
                        <li key={id} className="text-slate-300 text-sm border-b border-white/5 pb-2">
                          {PAES_SUBJECTS.find(s => s.id === id).name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="space-y-4">
                    {pricing.saving > 0 && (
                      <div className="bg-emerald-500/10 text-emerald-400 text-center py-2 rounded-lg text-sm font-bold border border-emerald-500/20">
                        Ahorras <span className="underline">{clp(pricing.saving)}</span> al mes
                      </div>
                    )}

                    <div className="flex justify-between items-end">
                      <span className="text-slate-400 text-sm">Total Mensual</span>
                      <strong className="text-3xl text-white font-bold tracking-tight">{clp(pricing.totalMonthly)}</strong>
                    </div>

                    <div className="flex justify-between text-xs text-slate-500 border-t border-white/5 pt-4">
                      <span>Matrícula anual única:</span>
                      <span>{clp(pricing.enrollment)}</span>
                    </div>
                  </div>

                  <button
                    disabled={pricing.count === 0}
                    onClick={handleAddCustom}
                    className="w-full mt-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-indigo-50 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {pricing.count === 0 ? 'Elige Ramos' : 'INSCRIBIR AHORA'}
                  </button>

                  <p className="text-center text-[10px] text-slate-600 mt-4 flex justify-center items-center gap-2">
                    <FaShieldAlt /> Garantía de satisfacción 7 días.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 6: PACKS RECOMENDADOS ──────────────── */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">O elige un <span className="text-amber-500">Pack de Carrera</span></h2>
            <p className="text-slate-500 font-medium">Combinaciones optimizadas para las carreras más demandadas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAES_COMBOS.map((combo) => {
              // Color base on combo ID kind of logic? Or just simple classes
              const borderColors = {
                humanista: "border-t-amber-500",
                salud: "border-t-teal-400",
                ingenieria: "border-t-indigo-500"
              };

              return (
                <div key={combo.id} className={`bg-slate-900/40 rounded-[2.5rem] border border-white/5 p-10 relative hover:-translate-y-2 transition-transform duration-500 border-t-4 ${borderColors[combo.id] || "border-t-white"} backdrop-blur-3xl shadow-2xl overflow-hidden group`}>
                  {combo.tag && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-600/20">
                      {combo.tag}
                    </div>
                  )}

                  <div className="text-center mb-8 pt-2">
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{combo.title}</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{combo.subtitle}</p>
                  </div>

                  <div className="text-center mb-10">
                    <span className="text-5xl font-black text-white tracking-tighter">{clp(combo.price)}</span>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">/mes</span>
                  </div>

                  <ul className="space-y-4 mb-10 min-h-[160px]">
                    {combo.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-400 text-sm font-medium">
                        <FaCheck className="text-emerald-500 mt-1 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white hover:text-slate-950 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Seleccionar Pack
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 7: VISTAZO AL AULA (SYLLABUS) ──────────────── */}
      <section className="py-24 bg-[#0c0c0e]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-serif text-white mb-4">¿Qué aprenderás?</h2>
            <p className="text-slate-400 mb-8">Un vistazo a nuestros contenidos estrella.</p>

            <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
              <button
                className={`px-6 py-4 font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'm1' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white'}`}
                onClick={() => setActiveTab('m1')}
              >
                <BiMath className="text-xl" /> Matemática M1
              </button>
              <button
                className={`px-6 py-4 font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'len' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white'}`}
                onClick={() => setActiveTab('len')}
              >
                <BiBookReader className="text-xl" /> Lenguaje
              </button>
            </div>

            <div className="min-h-[200px]">
              <ul className="grid gap-4">
                {(activeTab === 'm1' ? PAES_SYLLABUS.m1 : PAES_SYLLABUS.len).map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-[#1e1e24] p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                      <FaCheck className="text-sm" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2 text-amber-500 text-sm font-bold">
                <FaInfoCircle /> Y mucho más en la plataforma online.
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md bg-[#18181b] rounded-2xl p-4 shadow-2xl border border-white/10 transform hover:rotate-0 rotate-3 transition-transform duration-500">
              <div className="bg-[#27272a] h-64 rounded-xl flex items-center justify-center relative overflow-hidden group mb-4">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlayCircle className="text-6xl text-white" />
                </div>
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded">CLASE EN VIVO</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm px-2">
                <span className="flex items-center gap-2"><FaDownload /> Guía PDF</span>
                <span className="flex items-center gap-2"><MdOutlineSupportAgent /> Chat Tutor</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────── SECTION 8: COMPARATIVA ──────────────── */}
      <section className="py-24 bg-[#020617] border-y border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-16 text-white">Lael vs. El Resto</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-6 border-b border-white/10 text-slate-500 font-bold uppercase text-sm">Beneficio</th>
                  <th className="text-center p-6 border-b border-indigo-500/50 bg-indigo-500/5 text-indigo-300 font-bold text-lg rounded-t-xl">Instituto Lael</th>
                  <th className="text-center p-6 border-b border-white/10 text-slate-400 font-bold">Preu Tradicional</th>
                  <th className="text-center p-6 border-b border-white/10 text-slate-400 font-bold">Profe Particular</th>
                </tr>
              </thead>
              <tbody>
                {PAES_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 border-b border-white/5 font-bold text-white">{row.feature}</td>
                    <td className="p-6 border-b border-white/5 bg-indigo-500/5 text-center font-bold text-lg text-white">
                      {row.lael === true ? <FaCheck className="mx-auto text-emerald-400" /> : row.lael}
                    </td>
                    <td className="p-6 border-b border-white/5 text-center text-slate-400">
                      {row.other === true ? <FaCheck className="mx-auto" /> : row.other === false ? <FaTimes className="mx-auto text-rose-500/50" /> : row.other}
                    </td>
                    <td className="p-6 border-b border-white/5 text-center text-slate-400">
                      {row.tutor === true ? <FaCheck className="mx-auto" /> : row.tutor === false ? <FaTimes className="mx-auto text-rose-500/50" /> : row.tutor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 9: EQUIPO DOCENTE ──────────────── */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Aprende de los <span className="text-white/20">Mejores</span></h2>
          <p className="text-slate-500 font-medium mb-20 max-w-2xl mx-auto">Nuestros mentores no solo dominan la materia, dominan el arte de la enseñanza estratégica.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredTeachers.map((t, i) => (
              <div key={i} className="bg-white/[0.02] rounded-[3rem] p-10 border border-white/5 hover:border-white/10 transition-all group backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-white/10 transition-colors">
                  <FaUserGraduate size={100} />
                </div>
                <div className="relative z-10">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-indigo-500/20 to-transparent rounded-3xl flex items-center justify-center text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-white/5">
                    {t.img && t.img.startsWith("http") ? (
                      <img
                        src={t.img}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      t.img || <FaChalkboardTeacher className="text-indigo-400" />
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">{t.name}</h4>
                  <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] block mb-6">{t.subject}</span>
                  <div className="flex flex-col gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 items-center">
                    <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      {t.title || t.role}
                    </span>
                    {t.uni && <span className="flex items-center gap-2 opacity-60"><FaUniversity /> {t.uni}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <button className="text-white underline hover:text-indigo-400">Ver todo el equipo docente</button>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 10: TESTIMONIOS ──────────────── */}
      <section className="py-32 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-24 text-white uppercase tracking-tighter">Voces de <span className="text-amber-500">Éxito</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {paesTestimonials.map((r, i) => (
              <div key={i} className="bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 relative backdrop-blur-3xl group hover:border-white/10 transition-all">
                <div className="flex gap-1 text-amber-500 mb-6 text-xs">
                  {[...Array(r.rating || 5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-400 font-medium italic mb-10 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">"{r.quote}"</p>
                <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white text-xl">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <strong className="block text-white text-sm font-black uppercase tracking-tight">{r.name}</strong>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{r.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 11: PREGUNTAS FRECUENTES ──────────────── */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-serif text-white mb-12 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <details className="group bg-[#0f172a] rounded-xl border border-white/5 overflow-hidden open:ring-1 open:ring-indigo-500/50">
              <summary className="p-6 font-bold cursor-pointer list-none flex justify-between items-center text-white hover:bg-white/5">
                ¿Qué pasa si me pierdo una clase?
                <span className="text-indigo-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                ¡Tranquilo! Todas las clases se graban en alta definición y se suben a tu aula virtual en menos de 24 horas. Puedes verlas las veces que quieras.
              </div>
            </details>
            <details className="group bg-[#0f172a] rounded-xl border border-white/5 overflow-hidden open:ring-1 open:ring-indigo-500/50">
              <summary className="p-6 font-bold cursor-pointer list-none flex justify-between items-center text-white hover:bg-white/5">
                ¿Cómo funcionan los ensayos?
                <span className="text-indigo-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                Tienes ensayos semanales obligatorios y ensayos libres ilimitados. La plataforma te entrega el puntaje inmediatamente con el desglose de tus errores.
              </div>
            </details>
            <details className="group bg-[#0f172a] rounded-xl border border-white/5 overflow-hidden open:ring-1 open:ring-indigo-500/50">
              <summary className="p-6 font-bold cursor-pointer list-none flex justify-between items-center text-white hover:bg-white/5">
                ¿Puedo pagar con tarjeta de crédito?
                <span className="text-indigo-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                Sí, aceptamos tarjetas de débito, crédito y transferencia bancaria. Puedes pagar la mensualidad mes a mes sin amarrarte todo el año.
              </div>
            </details>
            <details className="group bg-[#0f172a] rounded-xl border border-white/5 overflow-hidden open:ring-1 open:ring-indigo-500/50">
              <summary className="p-6 font-bold cursor-pointer list-none flex justify-between items-center text-white hover:bg-white/5">
                ¿Tienen material impreso?
                <span className="text-indigo-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                Nuestro enfoque es digital y ecológico. Todo el material (guías, libros, ensayos) es PDF descargable optimizado para tablets y pantallas, pero puedes imprimirlo si prefieres.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <footer className="py-40 bg-gradient-to-t from-[#1e1b4b]/20 to-[#050505] text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">Tu Futuro <br /><span className="text-white/20">Comienza Hoy</span></h2>
          <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">No dejes que pase otro mes sin prepararte con la élite académica. Los cupos son limitados para garantizar personalización extrema.</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={scrollToBuilder} className="px-12 py-6 bg-white text-slate-950 font-black rounded-3xl text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-white/10 uppercase tracking-widest">
              INSCRIBIRME AHORA
            </button>
            <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-12 py-6 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 font-black rounded-3xl hover:bg-emerald-600 hover:text-white transition-all text-xl uppercase tracking-widest">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────── STICKY BOTTOM BAR (MÓVIL/DESKTOP) ──────────────── */}
      <div className={`fixed bottom-0 left-0 w-full bg-[#0a0a0b]/95 backdrop-blur-2xl border-t border-white/10 z-50 transition-transform duration-500 px-8 py-6 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Tu Plan Seleccionado</span>
            <strong className="text-white text-2xl font-black uppercase tracking-tighter">{pricing.label}</strong>
          </div>

          <div className="flex items-center gap-8 ml-auto md:ml-0 w-full md:w-auto justify-between md:justify-end">
            <div className="text-right">
              <div className="text-3xl font-black text-amber-500 tracking-tighter leading-none">{clp(pricing.totalMonthly)}</div>
              <small className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Inversión Mensual</small>
            </div>
            <button
              onClick={handleAddCustom}
              disabled={pricing.count === 0}
              className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-indigo-50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
            >
              Matricularme
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}