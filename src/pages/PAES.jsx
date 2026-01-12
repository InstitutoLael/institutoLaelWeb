import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx"; 
import SEOHead from "../components/SEOHead.jsx"; 

// 📸 IMAGEN DE FONDO
import studyOnline from "../assets/img/lael/study-online.jpg"; 

// 📦 ICONOS
import { 
  X, User, Mail, Phone, CreditCard, 
  CheckCircle, Loader2, ArrowRight, ShieldCheck, FileText, 
  Book, Star, Check, Zap, PlayCircle, Award
} from 'lucide-react';

// 📊 DATOS
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  priceForSubjects,
  clp,
} from "../data/paes.js";

/* ==========================================================================
   1. ESTILOS CSS (DISEÑO MEJORADO)
   ========================================================================== */
const css = `
:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.5);
  --accent: #f43f5e;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --radius: 20px;
}

/* BASE */
.paes-page { 
  background: var(--bg-deep); 
  color: var(--text-main); 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  min-height: 100vh; 
  padding-bottom: 120px;
  background-image: radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(244, 63, 94, 0.08), transparent 25%);
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
h1, h2, h3 { line-height: 1.1; margin: 0; font-weight: 800; letter-spacing: -0.02em; }

/* TEXT GRADIENTS */
.text-gradient { background: linear-gradient(to right, #fff, #a5b4fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.text-rose-grad { background: linear-gradient(to right, #fb7185, #f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* BOTONES */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 32px; border-radius: 50px; font-weight: 700; transition: all 0.3s ease; cursor: pointer; border: none; font-size: 1rem; }
.btn-primary { 
  background: linear-gradient(135deg, var(--primary), #4f46e5); 
  color: white; 
  box-shadow: 0 10px 30px -10px var(--primary-glow);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 40px -10px var(--primary-glow); }

.btn-ghost { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); }
.btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); }

/* HERO */
.hero { padding: 140px 0 80px; position: relative; overflow: hidden; }
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px; }
.hero-desc { font-size: 1.125rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 540px; }

/* BENEFIT CARDS (NUEVO) */
.benefits-section { margin-bottom: 80px; }
.benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-top: 40px; }
.benefit-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 30px; border-radius: 20px; transition: 0.3s; }
.benefit-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-5px); border-color: rgba(255,255,255,0.1); }
.benefit-icon { width: 48px; height: 48px; background: rgba(99, 102, 241, 0.1); color: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }

/* BUILDER LAYOUT */
.builder-section { padding: 60px 0; }
.builder-container { display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px; align-items: start; }

/* TARJETAS DE RAMOS (VISUAL FIX) */
.subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; margin-top: 20px; }

.subject-card {
  position: relative;
  background: rgba(30, 41, 59, 0.6); 
  border: 1px solid rgba(255,255,255,0.08); 
  border-radius: 16px;
  padding: 24px 16px; 
  cursor: pointer; 
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  overflow: hidden;
}

/* Categorías de Colores */
.subject-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom right, var(--card-color), transparent); opacity: 0; transition: 0.3s; z-index: 0; }
.subject-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.2); }
.subject-card:hover::before { opacity: 0.1; }

.subject-card.active { border-color: var(--card-color); background: rgba(15, 23, 42, 0.9); box-shadow: 0 0 20px -5px var(--card-color-glow); }
.subject-card.active::before { opacity: 0.15; }

/* Iconos y Texto en Tarjetas */
.s-icon { font-size: 2rem; z-index: 1; filter: grayscale(1); transition: 0.3s; }
.subject-card.active .s-icon, .subject-card:hover .s-icon { filter: grayscale(0); transform: scale(1.1); }
.s-name { font-weight: 700; font-size: 0.95rem; z-index: 1; color: var(--text-muted); transition: 0.3s; }
.subject-card.active .s-name { color: white; }
.s-check { position: absolute; top: 10px; right: 10px; color: var(--card-color); opacity: 0; transform: scale(0); transition: 0.3s; z-index: 2; }
.subject-card.active .s-check { opacity: 1; transform: scale(1); }

/* SUMMARY PANEL (TICKET DE COMPRA) */
.summary-panel { 
  background: #0f172a; 
  border: 1px solid rgba(255,255,255,0.1); 
  border-radius: 24px; 
  padding: 32px; 
  position: sticky; top: 40px; 
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.ticket-header { border-bottom: 2px dashed rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px; }
.ticket-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: #cbd5e1; }
.ticket-total { margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; }
.big-price { font-size: 2rem; font-weight: 800; color: #fff; text-shadow: 0 0 20px rgba(255,255,255,0.3); }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.9); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { background: #0f172a; border: 1px solid rgba(255,255,255,0.1); width: 100%; max-width: 480px; border-radius: 24px; padding: 32px; color: white; box-shadow: 0 0 50px rgba(0,0,0,0.5); animation: popIn 0.3s ease-out; }
@keyframes popIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 14px; border-radius: 12px; color: white; margin-bottom: 16px; outline: none; transition: 0.3s; }
.modal-input:focus { border-color: var(--primary); background: rgba(99, 102, 241, 0.1); }
.close-btn { position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #64748b; cursor: pointer; }

/* Responsive */
@media (max-width: 900px) {
  .hero-grid, .builder-container { grid-template-columns: 1fr; }
  .summary-panel { order: -1; margin-bottom: 40px; }
  .hero { padding-top: 100px; text-align: center; }
  .hero-grid img { display: none; }
  .hero-desc { margin: 0 auto 40px; }
}
`;

/* ==========================================================================
   FORMULARIO DE INSCRIPCIÓN (MODAL OSCURO)
   ========================================================================== */
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev"; 

function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [status, setStatus] = useState("idle"); 
  const [formData, setFormData] = useState({ fullName: "", rut: "", email: "", phone: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          program: planTitle,
          comments: `Detalle: ${selectedDetails} | Monto Inicial: ${price}`
        }),
      });
      setStatus("success");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="modal-overlay">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div style={{width:80, height:80, background:'#22c55e', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
          <CheckCircle size={40} color="white"/>
        </div>
        <h2>¡Todo Listo!</h2>
        <p style={{color:'#94a3b8', marginBottom:20}}>Te hemos enviado los datos de acceso y pago a tu correo.</p>
        <button onClick={onClose} className="btn btn-primary" style={{width:'100%'}}>Entendido</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn"><X/></button>
        <h3 style={{marginBottom:20}}>Finalizar Inscripción</h3>
        <p style={{fontSize:'0.9rem', color:'#94a3b8', marginBottom:24}}>
          Estás reservando: <strong style={{color:'white'}}>{planTitle}</strong> por <span style={{color:'#fb7185'}}>{price}</span>
        </p>
        
        <form onSubmit={handleSubmit}>
          <input className="modal-input" name="fullName" placeholder="Nombre Completo" required onChange={handleChange}/>
          <input className="modal-input" name="rut" placeholder="RUT (12.345.678-9)" required onChange={handleChange}/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
             <input className="modal-input" name="email" type="email" placeholder="Correo" required onChange={handleChange}/>
             <input className="modal-input" name="phone" type="tel" placeholder="+569..." required onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:10}} disabled={status === 'loading'}>
            {status === 'loading' ? <Loader2 className="spin"/> : "Ir a Pagar"} <ArrowRight size={18}/>
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */
export default function PAES() {
  const { addToCart } = useCart();
  const builderRef = useRef(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [showEnrollment, setShowEnrollment] = useState(false);

  // Cálculos desde src/data/paes.js
  const selectedSubjects = useMemo(() => PAES_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id)), [selectedSubjectIds]);
  const subjectCount = selectedSubjects.length;
  const monthlyPrice = subjectCount ? priceForSubjects(selectedSubjectIds) : 0;
  const firstPaymentTotal = subjectCount > 0 ? monthlyPrice + ENROLLMENT_FEE : 0;

  // Helpers de color para las tarjetas
  const getCardColor = (cat) => {
    if(cat === 'Ciencias') return '#10b981'; // Green
    if(cat === 'Electivo') return '#f59e0b'; // Amber
    return '#3b82f6'; // Blue default
  };

  const toggleSubject = (id) => {
    setSelectedSubjectIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="paes-page">
      <style>{css}</style>
      <SEOHead title="Preu PAES 2026 | Lael" description="Arma tu plan a medida." />

      {/* Modal Form */}
      {showEnrollment && (
        <EnrollmentForm 
          planTitle={`Plan Personalizado (${subjectCount} Ramos)`} 
          price={clp(firstPaymentTotal)} 
          selectedDetails={selectedSubjects.map(s => s.name).join(', ')}
          onClose={() => setShowEnrollment(false)} 
        />
      )}

      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', background:'rgba(244, 63, 94, 0.1)', border:'1px solid rgba(244, 63, 94, 0.2)', borderRadius:20, color:'#fb7185', fontSize:'0.85rem', fontWeight:'700', marginBottom:24}}>
              <span style={{position:'relative', display:'flex', height:8, width:8}}><span style={{animation:'ping 1.5s cubic-bezier(0,0,0.2,1) infinite', position:'absolute', display:'inline-flex', height:'100%', width:'100%', borderRadius:'50%', background:'#fb7185', opacity:0.75}}></span><span style={{position:'relative', display:'inline-flex', borderRadius:'50%', height:8, width:8, background:'#f43f5e'}}></span></span>
              Admisión 2026 Abierta
            </div>
            <h1 className="hero-title">
              No estudies más.<br/>
              <span className="text-gradient">Estudia Mejor.</span>
            </h1>
            <p className="hero-desc">
              Olvídate de las clases masivas de 100 personas. En Lael personalizamos tu estrategia 
              para que asegures tu puntaje sin perder la vida en el intento.
            </p>
            <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
               <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn btn-primary">
                 Armar mi Horario <ArrowRight size={20}/>
               </button>
               <a href="#benefits" className="btn btn-ghost">¿Por qué Lael?</a>
            </div>
          </div>
          {/* Imagen Hero (Desktop) */}
          <div style={{position:'relative'}}>
             <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, var(--bg-deep), transparent)', zIndex:2}}></div>
             <img src={studyOnline} alt="Estudiantes Lael" style={{width:'100%', borderRadius:24, opacity:0.8, transform:'rotate(2deg)', border:'1px solid rgba(255,255,255,0.1)'}} />
          </div>
        </div>
      </section>

      {/* 2. BENEFICIOS (EXPLICACIÓN) */}
      <section id="benefits" className="container benefits-section">
        <div style={{textAlign:'center', maxWidth:700, margin:'0 auto'}}>
          <h2 style={{fontSize:'2rem', marginBottom:16}}>¿Por qué nos eligen?</h2>
          <p style={{color:'#94a3b8'}}>No somos una fábrica de alumnos. Somos un centro de alto rendimiento.</p>
        </div>
        <div className="benefits-grid">
           <div className="benefit-card">
              <div className="benefit-icon"><PlayCircle size={24}/></div>
              <h3>Clases Grabadas 24/7</h3>
              <p style={{fontSize:'0.9rem', color:'#94a3b8', marginTop:10}}>¿Faltaste? No importa. Todas las clases en vivo quedan en HD en tu aula virtual.</p>
           </div>
           <div className="benefit-card">
              <div className="benefit-icon"><Zap size={24}/></div>
              <h3>Ensayos Inteligentes</h3>
              <p style={{fontSize:'0.9rem', color:'#94a3b8', marginTop:10}}>Plataforma que detecta tus vacíos. No ensayes lo que ya sabes, ataca lo que te falta.</p>
           </div>
           <div className="benefit-card">
              <div className="benefit-icon"><Award size={24}/></div>
              <h3>Garantía de Calidad</h3>
              <p style={{fontSize:'0.9rem', color:'#94a3b8', marginTop:10}}>Si la metodología no te convence la primera semana, te devolvemos el dinero.</p>
           </div>
        </div>
      </section>

      {/* 3. CONFIGURADOR (BUILDER) */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <h2 style={{fontSize:'2.5rem', marginBottom:10}}>Diseña tu Estrategia</h2>
          <p style={{color:'#94a3b8', fontSize:'1.1rem', marginBottom:40}}>Elige tus batallas. Paga solo lo que necesitas.</p>

          <div className="builder-container">
            {/* GRID DE RAMOS */}
            <div>
               <div className="subjects-grid">
                  {PAES_SUBJECTS.map((s) => {
                    const isActive = selectedSubjectIds.includes(s.id);
                    const color = getCardColor(s.category);
                    return (
                      <div 
                        key={s.id} 
                        onClick={() => toggleSubject(s.id)} 
                        className={`subject-card ${isActive ? 'active' : ''}`}
                        style={{'--card-color': color, '--card-color-glow': color}}
                      >
                         <div className="s-check"><CheckCircle fill={color} color="white" /></div>
                         <div className="s-icon">{s.icon}</div>
                         <span className="s-name">{s.name}</span>
                      </div>
                    )
                  })}
               </div>
               
               {/* Mensaje de ahorro */}
               {subjectCount >= 4 && (
                 <div style={{marginTop:24, padding:16, background:'rgba(16, 185, 129, 0.1)', border:'1px solid rgba(16, 185, 129, 0.2)', borderRadius:16, display:'flex', gap:12, alignItems:'center', color:'#34d399'}}>
                    <Award size={20}/>
                    <span><strong>¡Excelente jugada!</strong> Con 4+ ramos activaste la Tarifa Plana. Agrega más sin costo extra.</span>
                 </div>
               )}
            </div>

            {/* TICKET DE RESUMEN */}
            <div className="summary-panel">
               <div className="ticket-header">
                 <h3 style={{fontSize:'1.2rem', display:'flex', alignItems:'center', gap:10}}>
                   <CreditCard size={20} color="#fb7185"/> Resumen de Pago
                 </h3>
               </div>

               {subjectCount === 0 ? (
                 <div style={{textAlign:'center', padding:'40px 0', color:'#64748b'}}>
                    <Book size={40} style={{marginBottom:10, opacity:0.5}}/>
                    <p>Selecciona asignaturas para calcular tu inversión.</p>
                 </div>
               ) : (
                 <>
                   <div className="ticket-row">
                      <span>Matrícula Anual 2026</span>
                      <span>{clp(ENROLLMENT_FEE)}</span>
                   </div>
                   <div className="ticket-row">
                      <span>Plan Mensual ({subjectCount} ramos)</span>
                      <span>{clp(monthlyPrice)}</span>
                   </div>
                   
                   <div style={{margin:'15px 0', fontSize:'0.85rem', color:'#64748b', paddingLeft:10, borderLeft:'2px solid #334155'}}>
                     {selectedSubjects.map(s => <div key={s.id}>• {s.name}</div>)}
                   </div>

                   <div className="ticket-total">
                      <div>
                        <span style={{display:'block', fontSize:'0.8rem', textTransform:'uppercase', color:'#94a3b8', letterSpacing:1}}>Total a Pagar Hoy</span>
                        <span className="big-price">{clp(firstPaymentTotal)}</span>
                      </div>
                   </div>
                   <p style={{fontSize:'0.8rem', color:'#64748b', marginTop:5, marginBottom:24}}>
                     Incluye acceso inmediato a plataforma.
                   </p>

                   <button onClick={() => setShowEnrollment(true)} className="btn btn-primary" style={{width:'100%'}}>
                     Pagar e Inscribirme <ArrowRight size={20}/>
                   </button>
                   
                   <div style={{textAlign:'center', marginTop:16}}>
                     <button onClick={() => {
                        addToCart({
                          id: `paes-${Date.now()}`,
                          nombre: `Plan PAES (${subjectCount} Ramos)`,
                          precio: monthlyPrice,
                          tipo: 'paes',
                          detalles: selectedSubjects.map(s=>s.name).join(', ')
                        });
                        alert("Agregado al carrito");
                     }} style={{background:'none', border:'none', color:'#94a3b8', textDecoration:'underline', cursor:'pointer', fontSize:'0.9rem'}}>
                        Solo agregar al carrito
                     </button>
                   </div>
                 </>
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}