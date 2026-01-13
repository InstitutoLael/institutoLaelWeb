import React, { useState, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import SEOHead from "../components/SEOHead.jsx";

// Componentes y Datos
import MultiHello from "../components/MultiHello.jsx";
import { 
  LANGUAGES, 
  computeLangBundle, 
  clp, 
  ENROLLMENT_FEE, 
  LANG_FEATURES 
} from "../data/idiomas.js";

import { 
  Check, Zap, ArrowRight, ShieldCheck, ShoppingCart 
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   1. ESTILOS OPTIMIZADOS (SIN BLURS PESADOS)
   ────────────────────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --primary: #6366f1;
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
  padding-bottom: 140px;
  overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* OPTIMIZACIÓN 1: Gradientes en lugar de Blur para el fondo */
.orb { 
  position: absolute; 
  border-radius: 50%; 
  z-index: 0; 
  pointer-events: none;
  /* Truco: Usar radial-gradient es 10x más rápido que filter: blur() */
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
}
.orb-1 { width: 80vh; height: 80vh; top: -20vh; left: 50%; transform: translateX(-50%); }

.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 50px;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
}

.hero { padding: 80px 0 40px; text-align: center; position: relative; z-index: 1; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.text-gradient {
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* GRID */
.courses-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 20px; 
  position: relative; z-index: 1;
}

/* CARD OPTIMIZADA */
.course-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  display: flex; flex-direction: column;
  position: relative;
  /* Hardware Acceleration para scroll suave */
  will-change: transform; 
  transition: border-color 0.2s, background-color 0.2s;
}

/* Solo animar transform en hover en Desktop para evitar lag en móvil */
@media (hover: hover) {
  .course-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.25); }
}

.course-card.selected {
  background: rgba(99, 102, 241, 0.08); /* Color plano semi-transparente es más rápido que gradiente */
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}

.course-card.disabled { opacity: 0.5; filter: grayscale(1); pointer-events: none; }

/* NIVEL SELECTOR */
.level-select {
  margin-top: auto;
  background: rgba(0,0,0,0.3);
  padding: 10px; border-radius: 12px;
  margin-bottom: 16px;
}
.level-options { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.lvl-btn {
  flex: 1; min-width: 50px;
  font-size: 0.75rem; padding: 8px 4px;
  border-radius: 8px; border: 1px solid var(--border);
  background: transparent; color: var(--text-muted);
  cursor: pointer;
  /* Mejorar tacto en celular */
  touch-action: manipulation; 
}
.lvl-btn.active {
  background: white; color: black; border-color: white; font-weight: 800;
}

/* BOTONES */
.btn-action {
  width: 100%; padding: 14px; border-radius: 12px;
  font-weight: 700; cursor: pointer; border: none;
  font-size: 0.95rem; touch-action: manipulation;
}
.btn-add { background: var(--bg-deep); color: white; border: 1px solid var(--border); }
.btn-remove { background: #3b0707; color: #fca5a5; border: 1px solid #7f1d1d; }

/* STICKY BAR OPTIMIZADA */
.sticky-bar {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  width: 90%; max-width: 900px;
  /* OPTIMIZACIÓN 2: Fondo sólido semi-transparente en vez de blur */
  background: #0f172a; 
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px 24px;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 10px 40px rgba(0,0,0,0.6);
  z-index: 100;
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp { from { transform: translate(-50%, 100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }

.checkout-btn {
  background: var(--primary); color: white;
  padding: 12px 24px; border-radius: 50px;
  font-weight: 700; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  touch-action: manipulation;
}

@media (max-width: 768px) {
  .hero { padding: 60px 0 20px; }
  .sticky-bar {
    bottom: 0; left: 0; transform: none; width: 100%; max-width: 100%;
    border-radius: 20px 20px 0 0; border-bottom: none;
    flex-direction: column; gap: 12px; padding: 16px 24px 24px;
    background: #0f172a; /* Color sólido asegura 60fps */
  }
  .sticky-info { width: 100%; display: flex; justify-content: space-between; align-items: center; }
  .checkout-btn { width: 100%; justify-content: center; padding: 14px; font-size: 1rem; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTE MEMOIZADO (Clave para velocidad)
   Esto evita que TODOS los cursos se repinten cuando tocas UNO.
   ────────────────────────────────────────────────────────────────────────── */
const CourseCardItem = React.memo(({ course, isSelected, currentLevel, onToggle, onSetLevel }) => {
  return (
    <div 
      className={`course-card ${isSelected ? 'selected' : ''} ${course.comingSoon ? 'disabled' : ''}`}
      onClick={() => !course.comingSoon && !isSelected && onToggle(course.id, course.levels)}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12}}>
        <span style={{fontSize: '2.5rem'}}>{course.emoji}</span>
        {course.badge && (
          <span className="badge" style={{background: course.color + '20', color: course.color, border: `1px solid ${course.color}40`}}>
            {course.badge}
          </span>
        )}
      </div>

      <h3 style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: 6}}>{course.name}</h3>
      <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, flexGrow: 1, marginBottom: 16}}>
        {course.summary}
      </p>

      {!course.comingSoon && (
        <div className="level-select">
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', fontWeight:700, color:'var(--text-muted)'}}>
              <span>NIVEL DE INGRESO</span>
          </div>
          <div className="level-options">
            {course.levels.map((lvl) => (
              <button
                key={lvl}
                className={`lvl-btn ${isSelected && currentLevel === lvl ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSetLevel(course.id, lvl);
                }}
              >
                {lvl.split(" ")[0]} 
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        className={`btn-action ${isSelected ? 'btn-remove' : 'btn-add'}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(course.id, course.levels, course.comingSoon);
        }}
        disabled={course.comingSoon}
      >
        {course.comingSoon ? "Próximamente" : isSelected ? "Quitar del plan" : "Agregar Curso"}
      </button>
    </div>
  );
});

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Idiomas() {
  const { addToCart } = useCart ? useCart() : { addToCart: () => {} };
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [selectedIds, setSelectedIds] = useState([]); 
  const [selectedLevels, setSelectedLevels] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Cálculos
  const pricing = useMemo(() => computeLangBundle(selectedIds.length), [selectedIds.length]);
  const totalPayNow = pricing.totalFirstMonth;

  // Handlers Optimizado con useCallback (Para que React.memo funcione)
  const toggleCourse = useCallback((id, levels, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter((item) => item !== id);
      } else {
        if (levels?.length > 0) {
          // Usamos callback form en setSelectedLevels también para evitar dependencias
          setSelectedLevels(curr => curr[id] ? curr : ({ ...curr, [id]: levels[0] }));
        }
        return [...prev, id];
      }
    });
  }, []); // Sin dependencias, nunca cambia

  const setLevel = useCallback((courseId, levelName) => {
    setSelectedIds(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
    setSelectedLevels(prev => ({ ...prev, [courseId]: levelName }));
  }, []);

  const handleCheckout = () => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);

    const cartItem = {
      id: `pack-${selectedIds.join("-")}-${Date.now()}`,
      name: pricing.label,
      price: totalPayNow,
      recurrence: 'monthly',
      recurringPrice: pricing.totalMonthly,
      category: "Idiomas",
      image: LANGUAGES.find(l => l.id === selectedIds[0])?.emoji || "🌍",
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
      navigate("/carrito");
    }, 400);
  };

  return (
    <div className="lael-idiomas">
      <SEOHead title="Idiomas | Lael" description="Cursos de idiomas online" />
      <style>{styles}</style>

      {/* Orbs sin Blur pesado */}
      <div className="orb orb-1"></div>

      {/* HERO */}
      <section className="hero container">
        <div style={{marginBottom: 20}}>
          <span className="badge" style={{background: 'rgba(6,182,212,0.1)', color: 'var(--accent)', border:'1px solid rgba(6,182,212,0.3)'}}>
            <Zap size={12}/> Matrículas 2026
          </span>
        </div>
        
        <h1 className="hero-title">
          Aprende a decir <br/>
          <span className="text-gradient">
            <MultiHello variant="idiomas" intervalMs={3000} />
          </span>
        </h1>
        
        <p style={{maxWidth: '500px', margin: '0 auto 30px', color:'var(--text-muted)', fontSize: '1.1rem'}}>
          Clases en vivo y metodología conversacional.
        </p>

        <button 
          onClick={() => scrollRef.current?.scrollIntoView({behavior: 'smooth'})}
          style={{background: 'white', color: 'black', padding: '12px 24px', borderRadius: 50, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8}}
        >
          Ver Cursos <ArrowRight size={18}/>
        </button>
      </section>

      {/* Features - Renderizado simple */}
      <div className="container" style={{display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap', marginBottom: 40}}>
        {LANG_FEATURES && LANG_FEATURES.map((feat, idx) => (
            <div key={idx} style={{display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)', fontSize:'0.85rem'}}>
               <span>{feat.icon}</span> {feat.title}
            </div>
        ))}
      </div>

      {/* GRID OPTIMIZADO */}
      <section className="container" ref={scrollRef}>
        <div className="courses-grid">
          {LANGUAGES.map((course) => (
            <CourseCardItem 
              key={course.id}
              course={course}
              isSelected={selectedIds.includes(course.id)}
              currentLevel={selectedLevels[course.id] || (course.levels ? course.levels[0] : "")}
              onToggle={toggleCourse}
              onSetLevel={setLevel}
            />
          ))}
        </div>
      </section>

      {/* STICKY BAR */}
      {selectedIds.length > 0 && (
        <div className="sticky-bar">
          <div className="sticky-info">
            <div>
              <span style={{fontSize:'0.7rem', textTransform:'uppercase', color:'var(--text-muted)', letterSpacing:1}}>Tu Plan</span>
              <strong style={{color:'var(--accent)', fontSize:'1rem', display:'block'}}>{pricing.label}</strong>
            </div>
            
            <div style={{textAlign: 'right'}}>
              <span style={{fontSize: '1.3rem', fontWeight: 800, color: 'white', display:'block'}}>
                {clp(totalPayNow)}
              </span>
              {pricing.saving > 0 && (
                <span style={{fontSize: '0.7rem', color: '#4ade80', fontWeight: 700}}>
                  Ahorras {clp(pricing.saving)}
                </span>
              )}
            </div>
          </div>

          <button className="checkout-btn" onClick={handleCheckout} disabled={isProcessing}>
            {isProcessing ? "..." : (
              <>
                Inscribirme <ShoppingCart size={16}/>
              </>
            )}
          </button>
        </div>
      )}

      {/* FOOTER SIMPLE */}
      <div className="container" style={{textAlign:'center', marginTop: 60, color: 'var(--text-muted)', fontSize: '0.85rem', opacity: 0.7}}>
         <ShieldCheck size={20} style={{display:'block', margin:'0 auto 8px'}}/>
         Garantía de satisfacción 7 días.
      </div>

    </div>
  );
}