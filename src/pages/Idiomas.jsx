import React, { useState, useRef, useMemo, useCallback } from "react";
import { useCart } from "../context/CartContext"; 
import SEOHead from "../components/SEOHead.jsx";

// Componentes y Datos
import MultiHello from "../components/MultiHello.jsx";
import { 
  LANGUAGES, 
  computeLangBundle, 
  clp, 
  LANG_FEATURES 
} from "../data/idiomas.js";

import { 
  Zap, ArrowRight, ShieldCheck, ShoppingCart, X, Loader2, Plus, CheckCircle
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   1. ESTILOS OPTIMIZADOS
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
  padding-bottom: 160px; /* Espacio extra para barra móvil */
  overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* OPTIMIZACIÓN: Gradient estático */
.orb { 
  position: absolute; border-radius: 50%; z-index: 0; pointer-events: none;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
}
.orb-1 { width: 80vh; height: 80vh; top: -20vh; left: 50%; transform: translateX(-50%); }

.badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }

.hero { padding: 80px 0 40px; text-align: center; position: relative; z-index: 1; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.text-gradient { background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* GRID */
.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; position: relative; z-index: 1; }

/* CARD */
.course-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 24px; display: flex; flex-direction: column; position: relative;
  transition: border-color 0.2s, background-color 0.2s; will-change: transform;
}
.course-card.selected { background: rgba(99, 102, 241, 0.08); border-color: var(--primary); box-shadow: inset 0 0 0 1px var(--primary); }
.course-card.disabled { opacity: 0.5; filter: grayscale(1); pointer-events: none; }

/* NIVELES */
.level-select { margin-top: auto; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 12px; margin-bottom: 16px; }
.level-options { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.lvl-btn { flex: 1; min-width: 50px; font-size: 0.75rem; padding: 8px 4px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); cursor: pointer; }
.lvl-btn.active { background: white; color: black; border-color: white; font-weight: 800; }

/* BOTONES */
.btn-action { width: 100%; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 0.9rem; }
.btn-add { background: var(--bg-deep); color: white; border: 1px solid var(--border); }
.btn-remove { background: #3b0707; color: #fca5a5; border: 1px solid #7f1d1d; }

/* STICKY BAR (FLOTANTE) */
.sticky-bar {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  width: 90%; max-width: 900px;
  background: #0f172a; border: 1px solid var(--border); border-radius: 20px;
  padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 10px 40px rgba(0,0,0,0.6); z-index: 100;
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp { from { transform: translate(-50%, 100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }

.bar-actions { display: flex; gap: 10px; align-items: center; }

.btn-primary { background: var(--primary); color: white; padding: 12px 24px; border-radius: 50px; font-weight: 700; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
.btn-secondary { background: rgba(255,255,255,0.1); color: white; padding: 12px; border-radius: 50px; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px); }
.modal-content { background: #0f172a; border: 1px solid var(--border); width: 100%; max-width: 450px; border-radius: 24px; padding: 24px; animation: popIn 0.3s ease-out; position: relative; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-input { width: 100%; background: #1e293b; border: 1px solid var(--border); padding: 14px; border-radius: 12px; color: white; margin-bottom: 12px; outline: none; }

@media (max-width: 768px) {
  .hero { padding: 60px 0 20px; }
  .sticky-bar {
    bottom: 0; left: 0; transform: none; width: 100%; max-width: 100%;
    border-radius: 20px 20px 0 0; border-bottom: none;
    flex-direction: column; gap: 12px; padding: 16px 24px 24px; align-items: stretch;
  }
  .sticky-info { display: flex; justify-content: space-between; align-items: flex-end; width: 100%; }
  .bar-actions { display: grid; grid-template-columns: auto 1fr; width: 100%; }
  .btn-primary { width: 100%; justify-content: center; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTES AUXILIARES (Memoizados para velocidad)
   ────────────────────────────────────────────────────────────────────────── */

// CARD DE CURSO
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
          <div style={{fontSize:'0.7rem', fontWeight:700, color:'var(--text-muted)', marginBottom:6}}>NIVEL DE INGRESO</div>
          <div className="level-options">
            {course.levels.map((lvl) => (
              <button
                key={lvl}
                className={`lvl-btn ${isSelected && currentLevel === lvl ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); onSetLevel(course.id, lvl); }}
              >
                {lvl.split(" ")[0]} 
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        className={`btn-action ${isSelected ? 'btn-remove' : 'btn-add'}`}
        onClick={(e) => { e.stopPropagation(); onToggle(course.id, course.levels, course.comingSoon); }}
        disabled={course.comingSoon}
      >
        {course.comingSoon ? "Próximamente" : isSelected ? "Quitar" : "Seleccionar"}
      </button>
    </div>
  );
});

// MODAL DE INSCRIPCIÓN (Worker)
const WORKER_URL = "https://instituto-lael-web.contacto-c10.workers.dev/inscribir";

const EnrollmentForm = ({ planDetails, price, onClose }) => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", rut: "", email: "", phone: "" });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          program: "Idiomas Lael 2026",
          details: planDetails,
          amount: price
        })
      });
      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="modal-overlay">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div style={{color:'#22c55e', marginBottom:16}}><CheckCircle size={50} style={{margin:'0 auto'}}/></div>
        <h3>¡Recibido!</h3>
        <p style={{color:'var(--text-muted)', marginBottom:20}}>Te enviamos la info de pago a <strong>{formData.email}</strong>.</p>
        <button onClick={onClose} className="btn-primary" style={{width:'100%', justifyContent:'center'}}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{position:'absolute', top:20, right:20, background:'none', border:'none', color:'#64748b'}}><X/></button>
        <h3 style={{marginBottom:10}}>Inscripción Express</h3>
        <p style={{fontSize:'0.9rem', color:'var(--text-muted)', marginBottom:20}}>
          Reservando: <strong style={{color:'white'}}>{planDetails}</strong><br/>
          Total Hoy: <span style={{color:'var(--accent)'}}>{price}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <input className="modal-input" name="name" placeholder="Nombre Completo" required onChange={handleChange}/>
          <input className="modal-input" name="rut" placeholder="RUT" required onChange={handleChange}/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
             <input className="modal-input" name="email" type="email" placeholder="Correo" required onChange={handleChange}/>
             <input className="modal-input" name="phone" type="tel" placeholder="Teléfono" required onChange={handleChange}/>
          </div>
          <button disabled={status === 'loading'} className="btn-primary" style={{width:'100%', marginTop:10, justifyContent:'center'}}>
            {status === 'loading' ? <Loader2 className="spin" style={{animation:'spin 1s linear infinite'}}/> : "Confirmar e Ir a Pagar"}
          </button>
        </form>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   3. PÁGINA PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Idiomas() {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);
  
  const [selectedIds, setSelectedIds] = useState([]); 
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [toast, setToast] = useState(null); // NUEVO ESTADO PARA TOAST

  // Lógica de Precios
  const pricing = useMemo(() => computeLangBundle(selectedIds.length), [selectedIds.length]);

  // Handlers
  const toggleCourse = useCallback((id, levels, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) return prev.filter((item) => item !== id);
      else {
        setSelectedLevels(curr => curr[id] ? curr : ({ ...curr, [id]: levels[0] }));
        return [...prev, id];
      }
    });
  }, []);

  const setLevel = useCallback((courseId, levelName) => {
    setSelectedIds(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
    setSelectedLevels(prev => ({ ...prev, [courseId]: levelName }));
  }, []);

  // Opción 1: Solo Carrito (CON TOAST)
  const handleAddToCart = () => {
    const detailsText = selectedIds.map(id => {
      const course = LANGUAGES.find(l => l.id === id);
      return `${course.name} (${selectedLevels[id] || 'General'})`;
    }).join(", ");

    addToCart({
      id: `pack-${selectedIds.join("-")}-${Date.now()}`,
      name: pricing.label,
      price: pricing.totalFirstMonth,      // Precio HOY (Incluye Matrícula)
      recurringPrice: pricing.totalMonthly, // Precio FUTURO (Solo Mensualidad)
      recurrence: 'monthly',
      category: "Idiomas",
      details: [detailsText]
    });
    
    // Feedback visual (Toast) en lugar de Alert
    setToast("¡Curso agregado al Carrito!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="lael-idiomas">
      <SEOHead title="Idiomas | Lael" description="Cursos de idiomas online" />
      <style>{styles}</style>
      <div className="orb orb-1"></div>

      {/* TOAST DE NOTIFICACIÓN (NUEVO) */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 120, left: '50%', transform: 'translateX(-50%)',
          background: '#10b981', color: 'white', padding: '10px 20px', borderRadius: 50,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)', zIndex: 9999, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8, animation: 'slideUpToast 0.3s ease-out'
        }}>
           <CheckCircle size={18}/> {toast}
           <style>{`@keyframes slideUpToast { from { opacity:0; transform: translate(-50%, 20px); } to { opacity:1; transform: translate(-50%, 0); } }`}</style>
        </div>
      )}

      {showEnrollment && (
        <EnrollmentForm 
          planDetails={`${pricing.label} (${selectedIds.length} Cursos)`}
          price={clp(pricing.totalFirstMonth)}
          onClose={() => setShowEnrollment(false)}
        />
      )}

      {/* HERO */}
      <section className="hero container">
        <div style={{marginBottom: 20}}>
          <span className="badge" style={{background: 'rgba(6,182,212,0.1)', color: 'var(--accent)', border:'1px solid rgba(6,182,212,0.3)'}}>
            <Zap size={12}/> Matrículas 2026
          </span>
        </div>
        <h1 className="hero-title">
          Aprende a decir <br/>
          <span className="text-gradient"><MultiHello variant="idiomas" intervalMs={3000} /></span>
        </h1>
        <p style={{maxWidth: '500px', margin: '0 auto 30px', color:'var(--text-muted)', fontSize: '1.1rem'}}>
          Clases en vivo, sin contratos forzosos.
        </p>
        <button onClick={() => scrollRef.current?.scrollIntoView({behavior: 'smooth'})} style={{background: 'white', color: 'black', padding: '12px 24px', borderRadius: 50, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, border:'none', cursor:'pointer'}}>
          Ver Cursos <ArrowRight size={18}/>
        </button>
      </section>

      {/* FEATURES */}
      <div className="container" style={{display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap', marginBottom: 40}}>
        {LANG_FEATURES && LANG_FEATURES.map((feat, idx) => (
            <div key={idx} style={{display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)', fontSize:'0.85rem'}}>
               <span>{feat.icon}</span> {feat.title}
            </div>
        ))}
      </div>

      {/* GRID CURSOS */}
      <section className="container" ref={scrollRef}>
        <div className="courses-grid">
          {LANGUAGES.map((course) => (
            <CourseCardItem 
              key={course.id} course={course}
              isSelected={selectedIds.includes(course.id)}
              currentLevel={selectedLevels[course.id] || (course.levels ? course.levels[0] : "")}
              onToggle={toggleCourse}
              onSetLevel={setLevel}
            />
          ))}
        </div>
      </section>

      {/* STICKY BAR CON DOS BOTONES */}
      {selectedIds.length > 0 && (
        <div className="sticky-bar">
          <div className="sticky-info">
            <div>
              <span style={{fontSize:'0.7rem', textTransform:'uppercase', color:'var(--text-muted)', letterSpacing:1}}>Tu Plan</span>
              <strong style={{color:'var(--accent)', fontSize:'1rem', display:'block'}}>{pricing.label}</strong>
            </div>
            <div style={{textAlign: 'right'}}>
              <span style={{fontSize: '1.4rem', fontWeight: 800, color: 'white', display:'block', lineHeight:1}}>
                {clp(pricing.totalFirstMonth)}
              </span>
              <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Mensual: {clp(pricing.totalMonthly)}</span>
            </div>
          </div>

          <div className="bar-actions">
            {/* 1. Botón Carrito */}
            <button className="btn-secondary" onClick={handleAddToCart} aria-label="Agregar al carrito">
               <Plus size={18}/> <ShoppingCart size={18}/>
            </button>
            
            {/* 2. Botón Inscribir (Excel) */}
            <button className="btn-primary" onClick={() => setShowEnrollment(true)}>
              Inscribirme Ahora
            </button>
          </div>
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