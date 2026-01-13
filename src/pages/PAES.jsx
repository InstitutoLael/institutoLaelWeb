import React, { useMemo, useRef, useState, useCallback } from "react";
import { useCart } from "../context/CartContext.jsx"; 
import SEOHead from "../components/SEOHead.jsx"; 

// 📸 IMAGEN
import studyOnline from "../assets/img/lael/study-online.jpg"; 

// 📦 ICONOS
import { 
  X, CheckCircle, Loader2, ArrowRight, 
  CreditCard, Book, Zap, PlayCircle, Award, ShoppingCart, Plus
} from 'lucide-react';

// 📊 DATOS
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  computePaesPrice,
  clp,
} from "../data/paes.js";

/* ==========================================================================
   1. ESTILOS OPTIMIZADOS
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
  padding-bottom: 140px; 
  overflow-x: hidden;
}

.bg-glow {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08), transparent 40%), 
              radial-gradient(circle at 90% 50%, rgba(244, 63, 94, 0.08), transparent 40%);
  z-index: 0; pointer-events: none;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
h1, h2, h3 { line-height: 1.1; margin: 0; font-weight: 800; }

/* BOTONES */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border-radius: 50px; font-weight: 700; transition: transform 0.2s; cursor: pointer; border: none; font-size: 0.95rem; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
.btn-primary:active { transform: scale(0.98); }
.btn-secondary { background: rgba(255,255,255,0.1); color: white; }
.btn-ghost { background: transparent; color: var(--text-muted); text-decoration: underline; padding: 8px; font-size: 0.9rem; }

/* HERO */
.hero { padding: 120px 0 60px; }
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; }
.hero-img { width: 100%; border-radius: 24px; opacity: 0.9; transform: rotate(2deg); border: 1px solid var(--border); display: block; }
.text-gradient { background: linear-gradient(to right, #fff, #a5b4fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* BENEFIT CARDS */
.benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin: 60px 0; }
.benefit-card { background: var(--bg-card); border: 1px solid var(--border); padding: 24px; border-radius: 20px; }

/* BUILDER */
.builder-container { display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px; align-items: start; margin-top: 40px; }
.subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; }

/* CARD RAMO */
.subject-card {
  position: relative; background: var(--bg-card); border: 1px solid var(--border); 
  border-radius: 16px; padding: 20px 12px; cursor: pointer; 
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  text-align: center; transition: background 0.2s; touch-action: manipulation;
}
.subject-card.active { background: #1e293b; border-color: var(--card-color); box-shadow: inset 0 0 0 1px var(--card-color); }
.s-check { position: absolute; top: 8px; right: 8px; opacity: 0; transform: scale(0.5); transition: 0.2s; }
.subject-card.active .s-check { opacity: 1; transform: scale(1); }

/* SIDEBAR PC */
.summary-desktop { 
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 24px; 
  position: sticky; top: 20px; 
}

/* BARRA MÓVIL (Fixed Bottom) */
.mobile-sticky-bar {
  display: none; position: fixed; bottom: 0; left: 0; width: 100%;
  background: #0f172a; border-top: 1px solid var(--border);
  padding: 12px 20px 24px; z-index: 100;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
  flex-direction: column; gap: 12px;
}
.mobile-actions { display: grid; grid-template-columns: auto 1fr; gap: 10px; }

/* MODAL OVERLAY */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px); }
.modal-content { background: #0f172a; border: 1px solid var(--border); width: 100%; max-width: 450px; border-radius: 24px; padding: 24px; animation: popIn 0.3s ease-out; position: relative; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-input { width: 100%; background: #1e293b; border: 1px solid var(--border); padding: 14px; border-radius: 12px; color: white; margin-bottom: 12px; outline: none; }
.modal-input:focus { border-color: var(--primary); }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-img { display: none; }
  .builder-container { grid-template-columns: 1fr; }
  .summary-desktop { display: none; }
  .mobile-sticky-bar { display: flex; }
}
`;

/* ==========================================================================
   COMPONENTES LOGICOS
   ========================================================================== */

// 1. Tarjeta Memoizada
const SubjectCardItem = React.memo(({ subject, isSelected, onToggle }) => {
  const color = subject.category === 'Ciencias' ? '#10b981' : subject.category === 'Electivo' ? '#f59e0b' : '#3b82f6';
  return (
    <div onClick={() => onToggle(subject.id)} className={`subject-card ${isSelected ? 'active' : ''}`} style={{'--card-color': color}}>
       <div className="s-check"><CheckCircle size={16} fill={color} color="var(--bg-card)" /></div>
       <div style={{fontSize: '2rem', filter: isSelected ? 'none' : 'grayscale(1)', transition:'0.3s'}}>{subject.icon}</div>
       <span style={{fontWeight: 700, fontSize: '0.9rem', color: isSelected ? 'white' : 'var(--text-muted)'}}>{subject.name}</span>
    </div>
  );
});

// 2. Modal Formulario (Conexión REAL a tu Worker)
const WORKER_URL = "https://instituto-lael-web.contacto-c10.workers.dev/inscribir";

const EnrollmentForm = ({ planTitle, price, selectedDetails, onClose }) => {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [formData, setFormData] = useState({ name: "", rut: "", email: "", phone: "" });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Envío real al Worker para Excel/CRM
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          program: "Preu PAES 2026",
          details: `Plan: ${planTitle} | ${selectedDetails}`,
          amount: price
        })
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error enviando:", error);
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div className="modal-overlay">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div style={{color:'#22c55e', marginBottom:16}}><CheckCircle size={50} style={{margin:'0 auto'}}/></div>
        <h3>¡Datos Recibidos!</h3>
        <p style={{color:'var(--text-muted)', marginBottom:20}}>Te hemos enviado la información de pago y acceso a tu correo <strong>{formData.email}</strong>.</p>
        <button onClick={onClose} className="btn btn-primary" style={{width:'100%'}}>Entendido</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{position:'absolute', top:20, right:20, background:'none', border:'none', color:'#64748b'}}><X/></button>
        <h3 style={{marginBottom:10}}>Finalizar Inscripción</h3>
        <p style={{fontSize:'0.9rem', color:'var(--text-muted)', marginBottom:20}}>
          Reservando: <strong style={{color:'white'}}>{planTitle}</strong> <br/>
          Inversión Inicial: <span style={{color:'var(--accent)'}}>{price}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input className="modal-input" name="name" placeholder="Nombre Completo" required onChange={handleChange}/>
          <input className="modal-input" name="rut" placeholder="RUT (12.345.678-9)" required onChange={handleChange}/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
             <input className="modal-input" name="email" type="email" placeholder="Correo" required onChange={handleChange}/>
             <input className="modal-input" name="phone" type="tel" placeholder="+569..." required onChange={handleChange}/>
          </div>
          
          <button disabled={status === 'loading'} className="btn btn-primary" style={{width:'100%', marginTop:10}}>
            {status === 'loading' ? <Loader2 className="spin"/> : "Confirmar e Ir a Pagar"}
          </button>
          
          {status === 'error' && <p style={{color:'#ef4444', fontSize:'0.8rem', marginTop:10, textAlign:'center'}}>Hubo un error. Intenta nuevamente.</p>}
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

  // Cálculos Memoizados
  const pricing = useMemo(() => computePaesPrice(selectedSubjectIds), [selectedSubjectIds]);

  const toggleSubject = useCallback((id) => {
    setSelectedSubjectIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  // 1. Acción: Agregar al Carro (Sin Modal)
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
    // Feedback visual simple (alert o toast)
    alert("¡Agregado al carrito correctamente!");
  };

  return (
    <div className="paes-page">
      <style>{styles}</style>
      <SEOHead title="Preu PAES 2026 | Lael" description="Personaliza tu preparación." />
      <div className="bg-glow"></div>

      {/* MODAL DE INSCRIPCIÓN DIRECTA */}
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
              Tu puntaje, <br/>
              <span className="text-gradient">tu estrategia.</span>
            </h1>
            <p style={{fontSize:'1.1rem', color:'var(--text-muted)', marginBottom: 30, maxWidth:'500px'}}>
              Elige exactamente lo que necesitas. Sin rellenos, sin costos ocultos.
            </p>
            <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn btn-primary">
              Armar Horario <ArrowRight size={20}/>
            </button>
          </div>
          <div><img src={studyOnline} alt="Lael" className="hero-img" /></div>
        </div>
      </section>

      {/* BUILDER */}
      <section ref={builderRef} className="container" style={{paddingBottom: 60}}>
        <h2 style={{fontSize:'2rem', marginBottom:10}}>Selecciona tus Ramos</h2>
        <p style={{color:'var(--text-muted)', marginBottom:30}}>Si eliges 4 o más, activas la Tarifa Plana Full.</p>

        <div className="builder-container">
          {/* GRID IZQUIERDA */}
          <div className="subjects-grid">
             {PAES_SUBJECTS.map((s) => (
               <SubjectCardItem 
                 key={s.id} subject={s} 
                 isSelected={selectedSubjectIds.includes(s.id)}
                 onToggle={toggleSubject}
               />
             ))}
          </div>

          {/* SIDEBAR DERECHA (PC) */}
          <div className="summary-desktop">
             <h3 style={{fontSize:'1.2rem', marginBottom:16, display:'flex', alignItems:'center', gap:8}}>
               <CreditCard size={20} color="var(--accent)"/> Resumen
             </h3>

             {pricing.count === 0 ? (
               <div style={{textAlign:'center', padding:'30px 0', color:'var(--text-muted)'}}>
                  <Book size={32} style={{opacity:0.5, margin:'0 auto 10px'}}/>
                  Elige asignaturas para cotizar.
               </div>
             ) : (
               <>
                 <div style={{marginBottom:20}}>
                    <div style={{display:'flex', justifyContent:'space-between', color:'var(--text-muted)', fontSize:'0.9rem'}}>
                       <span>Plan Mensual</span> <span>{clp(pricing.totalMonthly)}</span>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', color:'var(--text-muted)', fontSize:'0.9rem'}}>
                       <span>Matrícula 2026</span> <span>{clp(pricing.enrollment)}</span>
                    </div>
                 </div>
                 
                 <div style={{borderTop:'1px solid var(--border)', paddingTop:16, marginBottom:20}}>
                    <span style={{fontSize:'0.8rem', color:'var(--text-muted)', textTransform:'uppercase'}}>Primer Pago</span>
                    <div style={{fontSize:'2rem', fontWeight:800}}>{clp(pricing.totalFirstMonth)}</div>
                 </div>

                 {/* OPCIÓN 1: MODAL (Directo a Excel) */}
                 <button onClick={() => setShowEnrollment(true)} className="btn btn-primary" style={{width:'100%', marginBottom:12}}>
                   Inscribirme Ahora <ArrowRight size={18}/>
                 </button>

                 {/* OPCIÓN 2: CARRITO (Shopping Cart) */}
                 <button onClick={handleAddToCart} className="btn btn-ghost" style={{width:'100%', textDecoration:'none', border:'1px solid var(--border)', borderRadius:50}}>
                   Solo agregar al carro <ShoppingCart size={16} style={{marginLeft:6}}/>
                 </button>
               </>
             )}
          </div>
        </div>
      </section>

      {/* BARRA STICKY MÓVIL (Con DOBLE BOTÓN) */}
      {pricing.count > 0 && (
        <div className="mobile-sticky-bar">
           <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
             <div>
                <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--text-muted)'}}>{pricing.label}</span>
                <div style={{fontSize:'1.5rem', fontWeight:800, lineHeight:1}}>{clp(pricing.totalFirstMonth)}</div>
             </div>
             <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Mensual: {clp(pricing.totalMonthly)}</div>
           </div>
           
           <div className="mobile-actions">
              {/* Botón Carrito */}
              <button onClick={handleAddToCart} className="btn btn-secondary" aria-label="Agregar al carrito">
                 <Plus size={18}/> <ShoppingCart size={18}/>
              </button>

              {/* Botón Inscripción (Excel) */}
              <button onClick={() => setShowEnrollment(true)} className="btn btn-primary" style={{width:'100%'}}>
                 Inscribirme Ahora
              </button>
           </div>
        </div>
      )}

    </div>
  );
}