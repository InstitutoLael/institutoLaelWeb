import React, { useState, useMemo, useRef } from "react";
import MultiHello from "../components/MultiHello";
import EnrollmentForm from "../components/EnrollmentForm";
import flagsImg from "../assets/img/lael/flags.png"; 

// --- ICONOS (Lucide React) ---
import { Check, Globe, MessageCircle, Award, Star, ChevronDown, ChevronUp, CreditCard } from "lucide-react";

// --- DATOS ---
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";

export default function Idiomas() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showModal, setShowModal] = useState(false); // Estado para el formulario
  const [showFaq, setShowFaq] = useState(null); // Estado para acordeón de preguntas

  const coursesRef = useRef(null);

  // 1. Filtrar cursos seleccionados y calcular precios
  const safeLanguages = LANGUAGES || [];
  
  const selectedCourses = useMemo(() => {
    return safeLanguages.filter(l => selectedIds.includes(l.id));
  }, [selectedIds, safeLanguages]);

  const pricing = computeLangBundle(selectedCourses.length);
  const totalFirstPayment = pricing.totalMonthly + (selectedIds.length > 0 ? ENROLLMENT_FEE : 0);

  // 2. Manejo de selección
  const toggleCourse = (id, comingSoon) => {
    if (comingSoon) return;
    
    setSelectedIds(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        // Si lo deseleccionamos
        return prev.filter(x => x !== id);
      } else {
        // Si lo seleccionamos y no tiene nivel, asignar A1 por defecto
        if (!selectedLevels[id]) {
          setLevel(id, "A1");
        }
        return [...prev, id];
      }
    });
  };

  const setLevel = (langId, level) => {
    // Asegurar que si cambio nivel, el curso se seleccione
    if (!selectedIds.includes(langId)) {
        setSelectedIds(prev => [...prev, langId]);
    }
    setSelectedLevels(prev => ({ ...prev, [langId]: level }));
  };

  // 3. Generar texto resumen para el Formulario
  const getSelectedDetails = () => {
    if (selectedCourses.length === 0) return "";
    const coursesText = selectedCourses.map(c => 
        `${c.name} (${selectedLevels[c.id] || "A1"})`
    ).join(', ');
    return `Idiomas: ${coursesText}. Mensualidad: ${clp(pricing.totalMonthly)}. Matrícula: ${clp(ENROLLMENT_FEE)}`;
  };

  // --- COMPONENTES VISUALES ---
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-32">
      
      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="max-w-6xl mx-auto px-4 pt-32 pb-20 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide">
              <Star size={14} fill="currentColor" /> ADMISIÓN 2026
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              <span className="block text-indigo-600"><MultiHello /></span>
              Aprende sin límites.
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Metodología comunicativa, profesores expertos y clases en vivo que quedan grabadas. 
              Elige tu idioma y comienza a hablar desde la primera semana.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => coursesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-1"
              >
                Ver Cursos y Precios
              </button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
               <img src={flagsImg} alt="Idiomas" className="w-full object-cover" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Check size={24} />
                </div>
                <div>
                    <p className="font-bold text-gray-900">Certificado</p>
                    <p className="text-xs text-gray-500">Al finalizar cada nivel</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: <Globe className="text-blue-500" />, title: "Enfoque Cultural", desc: "No solo aprendes gramática, entiendes el contexto real." },
                    { icon: <MessageCircle className="text-indigo-500" />, title: "100% Conversacional", desc: "Practica speaking en cada clase con tus compañeros." },
                    { icon: <Award className="text-amber-500" />, title: "Certificación", desc: "Diploma verificable al aprobar tus exámenes." }
                ].map((f, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition">
                        <div className="mb-4 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CURSOS (SELECTOR) */}
      <section ref={coursesRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Arma tu Plan de Estudios</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Selecciona uno o más idiomas. Si tomas dos, el segundo tiene un <span className="font-bold text-indigo-600">50% de descuento</span> en la mensualidad.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safeLanguages.map((l) => {
                    const isActive = selectedIds.includes(l.id);
                    const currentLvl = selectedLevels[l.id] || "A1";
                    const levels = l.levels || ["A1", "A2", "B1", "B2"];

                    return (
                        <div 
                            key={l.id} 
                            onClick={() => !l.comingSoon && toggleCourse(l.id)}
                            className={`
                                relative p-6 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col h-full bg-white
                                ${isActive 
                                    ? "border-indigo-600 shadow-xl ring-4 ring-indigo-50 transform -translate-y-1" 
                                    : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                                }
                                ${l.comingSoon ? "opacity-60 grayscale cursor-not-allowed" : ""}
                            `}
                        >
                            {/* Check Icon */}
                            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-300"}`}>
                                <Check size={14} strokeWidth={4} />
                            </div>

                            <div className="text-4xl mb-4">{l.emoji || "🎓"}</div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {l.name}
                                {l.comingSoon && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase tracking-wider">Pronto</span>}
                            </h3>
                            
                            <p className="text-gray-500 text-sm mb-6 flex-grow">
                                {l.summary || "Curso intensivo enfocado en comunicación."}
                            </p>

                            {!l.comingSoon && (
                                <div className="mt-auto">
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Nivel de inicio:</label>
                                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                                        {levels.slice(0, 4).map(lv => (
                                            <button 
                                                key={lv}
                                                onClick={(e) => { e.stopPropagation(); setLevel(l.id, lv); }}
                                                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                                                    isActive && currentLvl === lv 
                                                    ? "bg-white text-indigo-600 shadow-sm" 
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            >
                                                {lv}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-4">
            {[
                { q: "¿Las clases quedan grabadas?", a: "Sí, el 100% de las clases se suben al aula virtual en alta definición." },
                { q: "¿Entregan certificado?", a: "Sí, al aprobar el examen final de cada nivel recibes un diploma digital verificable." },
                { q: "¿Qué métodos de pago aceptan?", a: "Transferencia bancaria y Webpay (Débito/Crédito)." }
            ].map((faq, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button 
                        onClick={() => setShowFaq(showFaq === i ? null : i)}
                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        {faq.q}
                        {showFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {showFaq === i && (
                        <div className="p-4 pt-0 text-gray-600 text-sm bg-gray-50">
                            {faq.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </section>

      {/* STICKY FOOTER RESUMEN */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 z-50 px-4 py-4 md:py-6 ${selectedIds.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                    <span className="font-bold text-xl">{selectedIds.length}</span>
                </div>
                <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Total Mensual</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-gray-900">{clp(totalFirstPayment)}</span>
                        <span className="text-sm text-gray-400 font-normal">primer mes</span>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition flex items-center justify-center gap-2"
            >
                <CreditCard size={20} />
                Inscribirme Ahora
            </button>
        </div>
      </div>

      {/* --- MODAL DE INSCRIPCIÓN --- */}
      {showModal && (
        <EnrollmentForm 
          planTitle={`Pack Idiomas: ${selectedIds.length} curso(s)`}
          price={clp(totalFirstPayment)}
          selectedDetails={getSelectedDetails()}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}