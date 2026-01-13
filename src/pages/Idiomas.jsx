import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import SEOHead from "../components/SEOHead.jsx";

// IMPORTAMOS TUS COMPONENTES Y DATOS REALES
import MultiHello from "../components/MultiHello.jsx";
import { 
  LANGUAGES, 
  computeLangBundle, 
  clp, 
  ENROLLMENT_FEE, 
  LANG_FEATURES 
} from "../data/idiomas.js";

import { 
  Check, Star, Zap, Globe, ArrowRight, 
  Info, ShieldCheck, ShoppingCart 
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS (Luminous Slate - Dark Mode)
   ────────────────────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.4);
  --accent: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.1);
  --radius: 20px;
}

.lael-idiomas {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  padding-bottom: 120px; /* Espacio para la barra sticky */
  overflow-x: hidden;
}

/* UTILIDADES */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.text-gradient {
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 50px;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
}

/* HERO SECTION */
.hero { padding: 100px 0 60px; text-align: center; position: relative; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.hero p { font-size: 1.125rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 32px; }

/* ORBS DE FONDO */
.orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.15; z-index: 0; pointer-events: none; }
.orb-1 { width: 500px; height: 500px; background: var(--primary); top: -100px; left: 50%; transform: translateX(-50%); }

/* GRID DE CURSOS */
.courses-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 24px; 
  position: relative; z-index: 1;
}

.course-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  transition: all 0.3s ease;
  display: flex; flex-direction: column;
  position: relative;
  overflow: hidden;
}

.course-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2); }

.course-card.selected {
  background: linear-gradient(to bottom, rgba(99, 102, 241, 0.1), var(--bg-card));
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}

.course-card.disabled { opacity: 0.6; filter: grayscale(0.8); pointer-events: none; }

/* SELECCIÓN DE NIVEL */
.level-select {
  margin-top: auto;
  background: rgba(0,0,0,0.2);
  padding: 12px; border-radius: 12px;
  margin-bottom: 16px;
}
.level-options { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.lvl-btn {
  flex: 1; min-width: 60px;
  font-size: 0.75rem; padding: 6px;
  border-radius: 6px; border: 1px solid var(--border);
  background: transparent; color: var(--text-muted);
  cursor: pointer; transition: 0.2s;
}
.lvl-btn.active {
  background: white; color: black; border-color: white; font-weight: 700;
}

/* BOTONES */
.btn-action {
  width: 100%; padding: 14px; border-radius: 12px;
  font-weight: 700; cursor: pointer; border: none;
  transition: 0.2s; font-size: 0.95rem;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-add { background: var(--bg-deep); color: white; border: 1px solid var(--border); }
.btn-add:hover { background: rgba(255,255,255,0.05); color: white; }

.btn-remove { background: rgba(239, 68, 68, 0.1); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
.btn-remove:hover { background: rgba(239, 68, 68, 0.2); }

/* STICKY BAR (MÓVIL Y DESKTOP) */
.sticky-bar {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  width: 90%; max-width: 900px;
  background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px 24px;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  z-index: 100;
  animation: slideUp 0.4s ease-out;
}
@keyframes slideUp { from { transform: translate(-50%, 100px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }

.checkout-btn {
  background: var(--primary); color: white;
  padding: 12px 24px; border-radius: 50px;
  font-weight: 700; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  transition: 0.2s;
  box-shadow: 0 0 20px var(--primary-glow);
}
.checkout-btn:hover { transform: scale(1.05); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero { padding: 80px 0 40px; }
  .hero-title { font-size: 2.5rem; }
  
  .sticky-bar {
    bottom: 0; left: 0; transform: none; width: 100%; max-width: 100%;
    border-radius: 20px 20px 0 0; border-bottom: none;
    flex-direction: column; gap: 12px; padding: 20px;
  }
  .sticky-info { width: 100%; display: flex; justify-content: space-between; align-items: center; }
  .checkout-btn { width: 100%; justify-content: center; padding: 16px; font-size: 1rem; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Idiomas() {
  const { addToCart } = useCart ? useCart() : { addToCart: () => console.log("Demo Mode") };
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Estados
  const [selectedIds, setSelectedIds] = useState([]); // IDs seleccionados ['ingles', 'coreano']
  const [selectedLevels, setSelectedLevels] = useState({}); // { ingles: 'A1', coreano: 'Nivel 1' }
  const [isProcessing, setIsProcessing] = useState(false);

  // Lógica de Precios (Usando tu data/idiomas.js)
  const pricing = computeLangBundle(selectedIds.length);
  const totalPayNow = pricing.totalFirstMonth; // Matrícula + Mes 1

  // Handlers
  const toggleCourse = (id, levels, comingSoon) => {
    if (comingSoon) return;

    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter((item) => item !== id);
      } else {
        // Al seleccionar, pre-seleccionar el primer nivel si no existe
        if (!selectedLevels[id] && levels?.length > 0) {
          setSelectedLevels(curr => ({ ...curr, [id]: levels[0] }));
        }
        return [...prev, id];
      }
    });
  };

  const setLevel = (courseId, levelName) => {
    // Si cambio nivel, aseguro que el curso esté seleccionado
    if (!selectedIds.includes(courseId)) {
      setSelectedIds(prev => [...prev, courseId]);
    }
    setSelectedLevels((prev) => ({ ...prev, [courseId]: levelName }));
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);

    // Construir el objeto para el carrito
    const cartItem = {
      id: `pack-${selectedIds.join("-")}-${Date.now()}`,
      name: pricing.label, // "Plan Dúo", "Plan Mensual", etc.
      price: totalPayNow,
      recurrence: 'monthly',
      recurringPrice: pricing.totalMonthly, // Lo que pagará el mes 2 en adelante
      category: "Idiomas",
      image: LANGUAGES.find(l => l.id === selectedIds[0])?.emoji || "🌍", // Emoji del primer curso como img
      details: [
        ...selectedIds.map(id => {
          const course = LANGUAGES.find(l => l.id === id);
          const lvl = selectedLevels[id] || "Nivel General";
          return `${course.name} (${lvl})`;
        }),
        `Matrícula: ${clp(pricing.enrollment)}`
      ]
    };

    addToCart(cartItem);

    setTimeout(() => {
      setIsProcessing(false);
      navigate("/carrito"); // O alert("Agregado")
    }, 600);
  };

  return (
    <div className="lael-idiomas">
      <SEOHead title="Cursos de Idiomas | Lael" description="Inglés, Coreano, Portugués y más." />
      <style>{styles}</style>

      <div className="orb orb-1"></div>

      {/* HERO */}
      <section className="hero container">
        <div style={{marginBottom: 20}}>
          <span className="badge" style={{background: 'rgba(6,182,212,0.1)', color: 'var(--accent)', border:'1px solid rgba(6,182,212,0.3)'}}>
            <Zap size={12}/> Matrículas 2026 Abiertas
          </span>
        </div>
        
        <h1 className="hero-title">
          Aprende a decir <br/>
          <span className="text-gradient">
            <MultiHello variant="idiomas" intervalMs={3000} />
          </span>
        </h1>
        
        <p>
          Rompe la barrera del idioma con nuestra metodología conversacional. 
          Clases en vivo, profesores nativos y certificación académica.
        </p>

        <button 
          onClick={() => scrollRef.current?.scrollIntoView({behavior: 'smooth'})}
          style={{background: 'white', color: 'black', padding: '12px 24px', borderRadius: 50, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8}}
        >
          Ver Cursos Disponibles <ArrowRight size={18}/>
        </button>
      </section>

      {/* FEATURE ICONS (Importados de tu Data) */}
      <div className="container" style={{display:'flex', justifyContent:'center', gap:30, flexWrap:'wrap', marginBottom: 60}}>
        {LANG_FEATURES && LANG_FEATURES.map((feat, idx) => (
            <div key={idx} style={{display:'flex', alignItems:'center', gap:10, color:'var(--text-muted)', fontSize:'0.9rem'}}>
               <span style={{fontSize:'1.2rem'}}>{feat.icon}</span> {feat.title}
            </div>
        ))}
      </div>

      {/* GRID SELECCIONADOR */}
      <section className="container" ref={scrollRef}>
        <div className="courses-grid">
          {LANGUAGES.map((course) => {
            const isSelected = selectedIds.includes(course.id);
            const currentLevel = selectedLevels[course.id] || (course.levels ? course.levels[0] : "");

            return (
              <div 
                key={course.id} 
                className={`course-card ${isSelected ? 'selected' : ''} ${course.comingSoon ? 'disabled' : ''}`}
                onClick={() => !course.comingSoon && !isSelected && toggleCourse(course.id, course.levels)}
              >
                {/* Header Card */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16}}>
                  <span style={{fontSize: '2.5rem'}}>{course.emoji}</span>
                  {course.badge && (
                    <span className="badge" style={{background: course.color + '20', color: course.color, border: `1px solid ${course.color}40`}}>
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 style={{fontSize: '1.4rem', fontWeight: 700, marginBottom: 8}}>{course.name}</h3>
                <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1}}>
                  {course.summary}
                </p>

                {/* Level Selector (Solo si no es Coming Soon) */}
                {!course.comingSoon && (
                  <div className="level-select">
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.75rem', fontWeight:700, color:'var(--text-muted)'}}>
                       <span>NIVEL</span>
                       {isSelected && <span style={{color:'var(--primary)'}}><Check size={12} style={{verticalAlign:'middle'}}/> Seleccionado</span>}
                    </div>
                    <div className="level-options">
                      {course.levels.map((lvl) => (
                        <button
                          key={lvl}
                          className={`lvl-btn ${isSelected && currentLevel === lvl ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation(); // Evitar togglear el curso al cambiar nivel
                            setLevel(course.id, lvl);
                          }}
                        >
                          {lvl.split(" ")[0]} {/* Muestra solo "A1" o "Nivel" para ahorrar espacio */}
                        </button>
                      ))}
                    </div>
                    {isSelected && <div style={{marginTop:8, fontSize:'0.8rem', color:'white'}}>Has elegido: <strong>{currentLevel}</strong></div>}
                  </div>
                )}

                {/* Botón Acción */}
                <button 
                  className={`btn-action ${isSelected ? 'btn-remove' : 'btn-add'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCourse(course.id, course.levels, course.comingSoon);
                  }}
                  disabled={course.comingSoon}
                >
                  {course.comingSoon ? "Próximamente" : isSelected ? "Quitar del plan" : "Agregar Curso"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* STICKY BAR (Solo aparece si hay cursos seleccionados) */}
      {selectedIds.length > 0 && (
        <div className="sticky-bar animate-in">
          <div className="sticky-info">
            <div>
              <span style={{display:'block', fontSize:'0.75rem', textTransform:'uppercase', color:'var(--text-muted)', letterSpacing:1}}>Tu Plan</span>
              <strong style={{color:'var(--accent)', fontSize:'1.1rem'}}>{pricing.label}</strong>
            </div>
            
            <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column'}}>
              {pricing.saving > 0 && (
                <span style={{fontSize: '0.75rem', color: '#4ade80', fontWeight: 700}}>
                  Ahorras {clp(pricing.saving)} mes
                </span>
              )}
              <span style={{fontSize: '1.4rem', fontWeight: 800, lineHeight: 1}}>
                {clp(totalPayNow)}
              </span>
              <span style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Total primer pago</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={handleCheckout} disabled={isProcessing}>
            {isProcessing ? "Procesando..." : (
              <>
                Inscribirme <ShoppingCart size={18}/>
              </>
            )}
          </button>
        </div>
      )}

      {/* GARANTIA FOOTER */}
      <div className="container" style={{textAlign:'center', marginTop: 80, color: 'var(--text-muted)', fontSize: '0.9rem'}}>
         <ShieldCheck size={24} style={{display:'block', margin:'0 auto 10px', color: 'var(--text-muted)'}}/>
         <p>Todos nuestros cursos incluyen garantía de satisfacción.<br/>
         Si la primera semana no es lo que esperabas, te devolvemos el 100%.</p>
      </div>

    </div>
  );
}