import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx"; 
import SEOHead from "../components/SEOHead.jsx"; 

// 📸 IMAGEN (Asegúrate que la ruta sea correcta)
import studyOnline from "../assets/img/lael/study-online.jpg"; 

// 📦 ICONOS
import { 
  X, CheckCircle, Loader2, ArrowRight, ShieldCheck, 
  CreditCard, Book, Zap, PlayCircle, Award, ShoppingCart
} from 'lucide-react';

// 📊 DATOS
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  computePaesPrice, // Usaremos la función inteligente que ya tienes
  clp,
} from "../data/paes.js";

/* ==========================================================================
   1. ESTILOS OPTIMIZADOS (Responsive Real + 60FPS)
   ========================================================================== */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --primary: #6366f1;
  --accent: #f43f5e;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.1);
}

.paes-page { 
  background: var(--bg-deep); 
  color: var(--text-main); 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  min-height: 100vh; 
  padding-bottom: 140px; /* Espacio para barra móvil */
  overflow-x: hidden;
}

/* OPTIMIZACIÓN DE FONDO: Radial estático en vez de blur */
.bg-glow {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08), transparent 40%), 
              radial-gradient(circle at 90% 50%, rgba(244, 63, 94, 0.08), transparent 40%);
  z-index: 0; pointer-events: none;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

/* TEXTOS */
.text-gradient { background: linear-gradient(to right, #fff, #a5b4fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
h1, h2, h3 { line-height: 1.1; margin: 0; font-weight: 800; }

/* BOTONES */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border-radius: 50px; font-weight: 700; transition: transform 0.2s; cursor: pointer; border: none; font-size: 1rem; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
.btn-primary:hover { transform: translateY(-2px); }
.btn-ghost { background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border); }

/* HERO SECTION */
.hero { padding: 120px 0 60px; }
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; }
.hero-img-container { position: relative; border-radius: 24px; overflow: hidden; transform: rotate(2deg); border: 1px solid var(--border); }
.hero-img { width: 100%; display: block; opacity: 0.9; }

/* BENEFIT CARDS */
.benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin: 60px 0; }
.benefit-card { background: var(--bg-card); border: 1px solid var(--border); padding: 24px; border-radius: 20px; }

/* BUILDER SECTION */
.builder-container { display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px; align-items: start; margin-top: 40px; }

/* GRID DE RAMOS */
.subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; }

/* CARD DE RAMO OPTIMIZADA */
.subject-card {
  position: relative;
  background: var(--bg-card); 
  border: 1px solid var(--border); 
  border-radius: 16px;
  padding: 20px 12px; 
  cursor: pointer; 
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  text-align: center;
  transition: border-color 0.2s, background-color 0.2s;
  /* Optimización Táctil */
  touch-action: manipulation;
}

.subject-card.active {
  border-color: var(--card-color);
  background: rgba(15, 23, 42, 1); /* Fondo sólido para evitar recálculos alpha */
  box-shadow: inset 0 0 0 1px var(--card-color);
}

.s-check { 
  position: absolute; top: 8px; right: 8px; 
  opacity: 0; transform: scale(0.5); transition: 0.2s; 
}
.subject-card.active .s-check { opacity: 1; transform: scale(1); }

/* SIDEBAR DESKTOP (Resumen) */
.summary-desktop { 
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 24px; 
  position: sticky; top: 20px; 
}

/* STICKY BAR MÓVIL (Solo aparece en < 900px) */
.mobile-sticky-bar {
  display: none; /* Oculto por defecto */
  position: fixed; bottom: 0; left: 0; width: 100%;
  background: #0f172a; border-top: 1px solid var(--border);
  padding: 16px 24px 24px; z-index: 100;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
}

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { background: #0f172a; border: 1px solid var(--border); width: 100%; max-width: 450px; border-radius: 24px; padding: 24px; animation: popIn 0.3s ease-out; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-input { width: 100%; background: #1e293b; border: 1px solid var(--border); padding: 12px; border-radius: 10px; color: white; margin-bottom: 12px; }

/* MEDIA QUERIES */
@media (max-width: 900px) {
  .hero { padding-top: 100px; text-align: center; }
  .hero-grid { grid-template-columns: 1fr; gap: 30px; }
  .hero-img-container { display: none; } /* Ocultar imagen pesada en móvil si deseas, o ajustar */
  
  .builder-container { grid-template-columns: 1fr; }
  
  /* Ocultar Sidebar Desktop y mostrar Barra Móvil */
  .summary-desktop { display: none; }
  .mobile-sticky-bar { display: flex; flex-direction: column; gap: 12px; }
  .mobile-bar-row { display: flex; justify-content: space-between; align-items: center; }
}
`;

/* ==========================================================================
   COMPONENTES AUXILIARES
   ========================================================================== */

// 1. Tarjeta Ramo (Memoizada para evitar lag al seleccionar)
const SubjectCardItem = React.memo(({ subject, isSelected, onToggle }) => {
  // Color por categoría
  const color = 
    subject.category === 'Ciencias' ? '#10b981' : 
    subject.category === 'Electivo' ? '#f59e0b' : '#3b82f6';

  return (
    <div 
      onClick={() => onToggle(subject.id)} 
      className={`subject-card ${isSelected ? 'active' : ''}`}
      style={{'--card-color': color}}
    >
       <div className="s-check">
         <CheckCircle size={16} fill={color} color="var(--bg-card)" />
       </div>
       <div style={{fontSize: '2rem', filter: isSelected ? 'none' : 'grayscale(1)', transition:'0.3s'}}>
         {subject.icon}
       </div>
       <span style={{fontWeight: 700, fontSize: '0.9rem', color: isSelected ? 'white' : 'var(--text-muted)'}}>
         {subject.name}
       </span>
    </div>
  );
});

// 2. Modal Formulario
const EnrollmentForm = ({ planTitle, price, selectedDetails, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  if (done) return (
    <div className="modal-overlay">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div style={{color:'#22c55e', marginBottom:16}}><CheckCircle size={48} style={{margin:'0 auto'}}/></div>
        <h3>¡Solicitud Enviada!</h3>
        <p style={{color:'var(--text-muted)', marginBottom:20}}>Revisa tu correo con las instrucciones de pago.</p>
        <button onClick={onClose} className="btn btn-primary" style={{width:'100%'}}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
          <h3>Inscripción Rápida</h3>
          <button onClick={onClose} style={{background:'none', border:'none', color:'white'}}><X/></button>
        </div>
        <p style={{fontSize:'0.9rem', color:'var(--text-muted)', marginBottom:20}}>
          Estás reservando: <strong style={{color:'white'}}>{planTitle}</strong><br/>
          Primer pago: <span style={{color:'var(--accent)'}}>{price}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <input className="modal-input" placeholder="Nombre Completo" required />
          <input className="modal-input" placeholder="RUT" required />
          <input className="modal-input" placeholder="Correo electrónico" type="email" required />
          <input className="modal-input" placeholder="Teléfono" type="tel" required />
          <button disabled={loading} className="btn btn-primary" style={{width:'100%'}}>
            {loading ? <Loader2 className="spin"/> : "Ir a Pagar"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ==========================================================================
   PÁGINA PRINCIPAL
   ========================================================================== */
export default function PAES() {
  const { addToCart } = useCart();
  const builderRef = useRef(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [showEnrollment, setShowEnrollment] = useState(false);

  // Lógica de Precios (Memoizada)
  const pricing = useMemo(() => computePaesPrice(selectedSubjectIds), [selectedSubjectIds]);
  
  const toggleSubject = useCallback((id) => {
    setSelectedSubjectIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: `paes-${Date.now()}`,
      name: `Preu PAES - ${pricing.label}`,
      price: pricing.totalFirstMonth,
      recurrence: 'monthly',
      recurringPrice: pricing.totalMonthly,
      category: "Preuniversitario",
      details: PAES_SUBJECTS.filter(s => selectedSubjectIds.includes(s.id)).map(s => s.name)
    });
    alert("Agregado al carrito"); // Feedback simple
  };

  return (
    <div className="paes-page">
      <style>{styles}</style>
      <SEOHead title="Preu PAES 2026 | Lael" description="Personaliza tu preparación." />
      <div className="bg-glow"></div>

      {showEnrollment && (
        <EnrollmentForm 
          planTitle={pricing.label} 
          price={clp(pricing.totalFirstMonth)} 
          selectedDetails={pricing.count + " Ramos"}
          onClose={() => setShowEnrollment(false)} 
        />
      )}

      {/* HERO */}
      <section className="hero container">
        <div className="hero-grid">
          <div>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', background:'rgba(244, 63, 94, 0.15)', borderRadius:20, color:'#fb7185', fontSize:'0.8rem', fontWeight:'700', marginBottom:20}}>
              <Zap size={14}/> Admisión 2026
            </div>
            <h1 style={{fontSize:'clamp(2.5rem, 5vw, 4rem)', marginBottom: 20}}>
              No estudies más.<br/>
              <span className="text-gradient">Estudia Mejor.</span>
            </h1>
            <p style={{fontSize:'1.1rem', color:'var(--text-muted)', marginBottom: 30, maxWidth:'500px'}}>
              Olvídate de las clases masivas. En Lael personalizamos tu estrategia para que asegures tu puntaje.
            </p>
            <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn btn-primary">
              Armar Horario <ArrowRight size={20}/>
            </button>
          </div>
          
          <div className="hero-img-container">
             <img src={studyOnline} alt="Estudiantes" className="hero-img" />
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="container">
        <div className="benefits-grid">
           <div className="benefit-card">
              <PlayCircle size={32} color="var(--primary)" style={{marginBottom:10}}/>
              <h3>Clases Grabadas</h3>
              <p style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>Acceso 24/7 a todo el contenido.</p>
           </div>
           <div className="benefit-card">
              <Award size={32} color="var(--accent)" style={{marginBottom:10}}/>
              <h3>Garantía Total</h3>
              <p style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>Si no te gusta, devolución del 100%.</p>
           </div>
        </div>
      </section>

      {/* BUILDER (Lógica Principal) */}
      <section ref={builderRef} className="container" style={{paddingBottom: 60}}>
        <h2 style={{fontSize:'2rem'}}>Elige tus Batallas</h2>
        <p style={{color:'var(--text-muted)', marginBottom:20}}>Arma tu pack de asignaturas a medida.</p>

        <div className="builder-container">
          
          {/* COLUMNA IZQUIERDA: GRID RAMOS */}
          <div>
             <div className="subjects-grid">
                {PAES_SUBJECTS.map((s) => (
                  <SubjectCardItem 
                    key={s.id} 
                    subject={s} 
                    isSelected={selectedSubjectIds.includes(s.id)}
                    onToggle={toggleSubject}
                  />
                ))}
             </div>
             {pricing.count >= 4 && (
               <div style={{marginTop:20, padding:12, background:'rgba(16, 185, 129, 0.15)', borderRadius:12, color:'#34d399', fontSize:'0.9rem', display:'flex', gap:8}}>
                  <CheckCircle size={18}/> <strong>Tarifa Plana Activada:</strong> Agrega más ramos sin costo extra.
               </div>
             )}
          </div>

          {/* COLUMNA DERECHA: RESUMEN DESKTOP (Oculto en móvil) */}
          <div className="summary-desktop">
             <h3 style={{fontSize:'1.2rem', marginBottom:16, display:'flex', alignItems:'center', gap:8}}>
               <CreditCard size={20} color="var(--accent)"/> Resumen
             </h3>

             {pricing.count === 0 ? (
               <div style={{textAlign:'center', padding:'30px 0', color:'var(--text-muted)'}}>
                  <Book size={32} style={{opacity:0.5, margin:'0 auto 10px'}}/>
                  Selecciona ramos
               </div>
             ) : (
               <>
                 <div style={{display:'flex', justifyContent:'space-between', marginBottom:8, color:'var(--text-muted)', fontSize:'0.9rem'}}>
                    <span>Plan Mensual</span>
                    <span>{clp(pricing.totalMonthly)}</span>
                 </div>
                 <div style={{display:'flex', justifyContent:'space-between', marginBottom:20, color:'var(--text-muted)', fontSize:'0.9rem'}}>
                    <span>Matrícula</span>
                    <span>{clp(pricing.enrollment)}</span>
                 </div>
                 
                 <div style={{borderTop:'1px solid var(--border)', paddingTop:16}}>
                    <span style={{fontSize:'0.8rem', color:'var(--text-muted)', textTransform:'uppercase'}}>Total Hoy</span>
                    <div style={{fontSize:'2rem', fontWeight:800}}>{clp(pricing.totalFirstMonth)}</div>
                 </div>

                 <button onClick={() => setShowEnrollment(true)} className="btn btn-primary" style={{width:'100%', marginTop:20}}>
                   Inscribirme <ArrowRight size={18}/>
                 </button>
                 <div style={{textAlign:'center', marginTop:12}}>
                    <button onClick={handleAddToCart} style={{background:'transparent', border:'none', color:'var(--text-muted)', textDecoration:'underline', cursor:'pointer'}}>
                      Solo agregar al carro
                    </button>
                 </div>
               </>
             )}
          </div>

        </div>
      </section>

      {/* BARRA STICKY MÓVIL (Solo visible en celular) */}
      {selectedSubjectIds.length > 0 && (
        <div className="mobile-sticky-bar">
           <div className="mobile-bar-row">
              <div>
                <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--text-muted)'}}>
                   {pricing.label}
                </span>
                <div style={{fontSize:'1.4rem', fontWeight:800, color:'white'}}>
                   {clp(pricing.totalFirstMonth)}
                </div>
              </div>
              <div style={{textAlign:'right', fontSize:'0.8rem', color:'var(--text-muted)'}}>
                 Mensual: {clp(pricing.totalMonthly)}
              </div>
           </div>
           
           <button onClick={() => setShowEnrollment(true)} className="btn btn-primary" style={{width:'100%'}}>
              Inscribirme <ShoppingCart size={18}/>
           </button>
        </div>
      )}

    </div>
  );
}