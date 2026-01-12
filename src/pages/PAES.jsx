import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx"; 
import SEOHead from "../components/SEOHead.jsx"; 

// 📸 IMAGEN DE FONDO (Asegúrate de tener esta ruta o cambia la imagen)
import studyOnline from "../assets/img/lael/study-online.jpg"; 

// 📦 ICONOS (Lucide React)
// Si no tienes 'lucide-react' instalado, avísame. 
// He incluido una versión SVG manual abajo para que funcione SIN instalar nada extra.
import { 
  X, User, Mail, Phone, CreditCard, 
  CheckCircle, Loader2, ArrowRight, ShieldCheck, FileText, 
  Book, Star, Check
} from 'lucide-react';

// 📊 DATOS
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  priceForSubjects,
  priceForCount,
  clp,
} from "../data/paes.js";

/* ==========================================================================
   FORMULARIO DE INSCRIPCIÓN (MODAL)
   Integrado aquí mismo para que reciba las props directamente
   ========================================================================== */
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev"; // 🔴 TU CLOUDFLARE

function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [status, setStatus] = useState("idle"); 
  const [formData, setFormData] = useState({ fullName: "", rut: "", email: "", phone: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      ...formData,
      program: planTitle,
      comments: `Detalle: ${selectedDetails} | Monto Inicial: ${price}`
    };

    try {
      const response = await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) setStatus("success");
      else throw new Error("Error en el servidor");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // --- VISTA DE ÉXITO ---
  if (status === "success") {
    return (
      <div className="modal-overlay">
        <div className="modal-content success-animate">
          <div className="success-header">
            <div className="success-icon"><CheckCircle size={40} /></div>
            <h2>¡Cupo Reservado!</h2>
            <p>Ya estás a un paso de comenzar.</p>
          </div>
          <div className="modal-body">
            <div className="summary-box">
              <div className="sb-row"><span>Plan</span> <strong>{planTitle}</strong></div>
              <div className="sb-row total"><span>Total Hoy</span> <strong className="text-rose">{price}</strong></div>
            </div>
            <div className="action-buttons">
              <a href="#" className="btn-modal-primary"><CreditCard size={20}/> Pagar Ahora (Webpay)</a>
              <button onClick={onClose} className="btn-modal-secondary">Pagaré más tarde</button>
            </div>
            <p className="tiny-text">Te hemos enviado un correo con estos datos.</p>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA FORMULARIO ---
  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in">
        <button onClick={onClose} className="close-btn"><X size={24}/></button>
        
        <div className="modal-header">
          <div className="badge"><ShieldCheck size={14}/> Matrícula Segura 2026</div>
          <h2>Inscripción en <span className="text-rose">{planTitle}</span></h2>
        </div>

        <div className="modal-body scrollable">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="input-group">
              <label>Nombre Completo</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18}/>
                <input required name="fullName" onChange={handleChange} placeholder="Ej: Sofía Valdés" />
              </div>
            </div>

            <div className="row-2">
              <div className="input-group">
                <label>RUT</label>
                <div className="input-wrapper">
                  <FileText className="input-icon" size={18}/>
                  <input required name="rut" onChange={handleChange} placeholder="12.345.678-9" />
                </div>
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={18}/>
                  <input required name="phone" type="tel" onChange={handleChange} placeholder="+569..." />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18}/>
                <input required name="email" type="email" onChange={handleChange} placeholder="hola@ejemplo.com" />
              </div>
            </div>

            <div className="price-summary">
              <div>
                <p className="label">Total a Pagar Hoy</p>
                <p className="desc">{selectedDetails}</p>
              </div>
              <div className="price-big">{price}</div>
            </div>

            <button type="submit" disabled={status === "loading"} className="btn-submit">
              {status === "loading" ? <Loader2 className="spin"/> : <>Confirmar Inscripción <ArrowRight size={20}/></>}
            </button>
            
            <p className="tiny-text">Al confirmar, aceptas nuestros términos y condiciones.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PÁGINA PRINCIPAL PAES
   ========================================================================== */

/* 1. CSS IN-JS (Para asegurar diseño consistente sin config externa) */
const css = `
:root {
  --bg-deep: #050505;
  --bg-panel: #0F1115;
  --primary: #6366f1;
  --rose: #f43f5e;
  --amber: #f59e0b;
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --radius-lg: 24px;
}

/* BASE */
.paes-page { background: var(--bg-deep); color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; overflow-x: hidden; padding-bottom: 120px; }
.container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
h1, h2, h3 { line-height: 1.1; margin: 0; font-weight: 800; }
.text-gradient { background: linear-gradient(135deg, #fff 30%, #a5b4fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 50px; font-weight: 700; transition: 0.3s; cursor: pointer; border: none; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 8px 25px -5px rgba(99,102,241,0.4); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 35px -5px rgba(99,102,241,0.5); }
.btn-ghost { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); }
.btn-ghost:hover { background: rgba(255,255,255,0.1); }

/* HERO */
.hero { padding: 160px 0 80px; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.hero-title { font-size: clamp(3rem, 5vw, 4.5rem); margin-bottom: 24px; }
.hero-visual img { width: 100%; border-radius: var(--radius-lg); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.8); }

/* BUILDER */
.section-builder { padding: 80px 0; }
.builder-container { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
.selector-panel { background: var(--bg-panel); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-lg); padding: 40px; }
.subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin-top: 30px; }

.subject-card {
  background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 20px 10px; cursor: pointer; transition: 0.2s; text-align: center;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; height: 120px;
}
.subject-card:hover { background: rgba(255,255,255,0.05); }
.subject-card.active { background: var(--primary); border-color: var(--primary); color: white; }

/* SUMMARY (INVOICE STYLE) */
.summary-panel { background: #000; border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-lg); padding: 30px; position: sticky; top: 40px; }
.invoice-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; }
.invoice-row.total { border-top: 1px solid rgba(255,255,255,0.15); padding-top: 20px; margin-top: 20px; align-items: flex-end; }
.total-amount { font-size: 2.2rem; font-weight: 800; color: white; line-height: 1; }
.enrollment-row { color: var(--amber); }

/* --- ESTILOS DEL MODAL (ENROLLMENT FORM) --- */
.modal-overlay { position: fixed; inset: 0; background: rgba(5, 5, 5, 0.85); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { background: white; width: 100%; max-width: 500px; border-radius: 24px; position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); color: #1e293b; }
.fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.close-btn { position: absolute; top: 16px; right: 16px; background: #f1f5f9; border: none; padding: 8px; border-radius: 50%; cursor: pointer; color: #64748b; }
.close-btn:hover { background: #e2e8f0; color: #0f172a; }

.modal-header { background: #0f172a; color: white; padding: 32px; }
.badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(244, 63, 94, 0.15); color: #fb7185; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
.text-rose { color: #f43f5e; }

.modal-body { padding: 32px; max-height: 60vh; overflow-y: auto; }
.form-grid { display: flex; flex-direction: column; gap: 20px; }
.input-group label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
.input-wrapper { position: relative; }
.input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
.input-wrapper input { width: 100%; padding: 12px 16px 12px 48px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 1rem; outline: none; transition: 0.2s; background: #f8fafc; color: #334155; box-sizing: border-box; }
.input-wrapper input:focus { background: white; border-color: #f43f5e; box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.1); }
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.price-summary { background: #fff1f2; border: 1px solid #ffe4e6; padding: 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; }
.price-summary .label { font-size: 0.75rem; font-weight: 700; color: #e11d48; text-transform: uppercase; }
.price-summary .desc { font-size: 0.85rem; color: #9f1239; margin-top: 4px; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.price-big { font-size: 1.5rem; font-weight: 800; color: #e11d48; }

.btn-submit { width: 100%; background: #0f172a; color: white; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 1.1rem; border: none; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.2s; }
.btn-submit:hover { background: #1e293b; transform: translateY(-2px); }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

.tiny-text { font-size: 0.75rem; text-align: center; color: #94a3b8; margin-top: 16px; }

/* Modal Success */
.success-header { background: #f0fdf4; padding: 40px; text-align: center; border-bottom: 1px solid #dcfce7; }
.success-icon { width: 80px; height: 80px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.success-header h2 { color: #14532d; font-size: 1.8rem; margin-bottom: 8px; }
.success-header p { color: #15803d; }
.summary-box { background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
.sb-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; color: #64748b; }
.sb-row.total { border-top: 1px solid #e2e8f0; paddingTop: 12px; margin-top: 12px; font-size: 1.1rem; color: #0f172a; }
.btn-modal-primary { display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%; padding: 16px; background: #0f172a; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; margin-bottom: 12px; }
.btn-modal-secondary { width: 100%; padding: 14px; background: white; border: 1px solid #e2e8f0; color: #64748b; border-radius: 12px; font-weight: 600; cursor: pointer; }

@media (max-width: 900px) {
  .hero-grid, .builder-container { grid-template-columns: 1fr; }
  .summary-panel { order: -1; position: relative; top: 0; }
  .row-2 { grid-template-columns: 1fr; }
}
`;

export default function PAES() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const builderRef = useRef(null);

  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [toast, setToast] = useState(null);
  
  // ESTADO PARA EL MODAL DE INSCRIPCIÓN
  const [showEnrollment, setShowEnrollment] = useState(false);

  // Cálculos en tiempo real
  const selectedSubjects = useMemo(
    () => PAES_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id)),
    [selectedSubjectIds]
  );
  const subjectCount = selectedSubjects.length;
  const monthlyPrice = subjectCount ? priceForSubjects(selectedSubjectIds) : 0;
  
  // LÓGICA CLAVE: Mensualidad + Matrícula
  const firstPaymentTotal = subjectCount > 0 ? monthlyPrice + ENROLLMENT_FEE : 0;

  useEffect(() => { window.scrollTo(0,0); }, []);

  const toggleSubject = (id) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const scrollToBuilder = (presetIds) => {
      if(presetIds) setSelectedSubjectIds(presetIds);
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  /* --- AÑADIR AL CARRITO (Carrito Web) --- */
  const handleAddToCart = () => {
      if(subjectCount === 0) return;
      
      addToCart({
          id: `paes-plan-${Date.now()}`, 
          nombre: `Plan PAES (${subjectCount} Ramos)`,
          precio: monthlyPrice,
          tipo: 'paes_plan',
          detalles: selectedSubjects.map(s => s.name).join(', ') 
      });

      addToCart({
          id: `paes-matricula-2026`, 
          nombre: 'Matrícula Admisión 2026',
          precio: ENROLLMENT_FEE,
          tipo: 'matricula',
          detalles: 'Pago único anual'
      });
      
      setToast("¡Agregado al Carrito!");
      setTimeout(() => setToast(null), 3000);
  };

  /* --- ABRIR MODAL DE PAGO INMEDIATO --- */
  const handleOpenEnrollment = () => {
    if(subjectCount === 0) return;
    setShowEnrollment(true);
  };

  return (
    <div className="paes-page">
      <style>{css}</style>
      <SEOHead title="Planes PAES 2026 | Instituto Lael" description="Preuniversitario personalizado." />

      {/* RENDERIZAR MODAL SI ESTÁ ACTIVO */}
      {showEnrollment && (
        <EnrollmentForm 
          planTitle={`Plan PAES (${subjectCount} Ramos)`}
          price={clp(firstPaymentTotal)}
          selectedDetails={`Incluye: Matrícula + ${selectedSubjects.map(s => s.name).join(', ')}`}
          onClose={() => setShowEnrollment(false)}
        />
      )}

      {toast && (
        <div style={{position:'fixed', top:20, right:20, background:'#10b981', color:'#000', padding:'12px 24px', borderRadius:50, fontWeight:700, zIndex:99, display:'flex', gap:8, alignItems:'center'}}>
          <Check size={20}/> {toast}
        </div>
      )}

      {/* BACKGROUND ORBS */}
      <div style={{position:'absolute', width:600, height:600, top:-200, left:-100, background:'#6366f1', filter:'blur(120px)', opacity:0.12, borderRadius:'50%', pointerEvents:'none'}} />
      <div style={{position:'absolute', width:500, height:500, bottom:'20%', right:-100, background:'#f43f5e', filter:'blur(120px)', opacity:0.08, borderRadius:'50%', pointerEvents:'none'}} />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div style={{display:'inline-block', padding:'6px 16px', background:'rgba(245, 158, 11, 0.15)', color:'#fbbf24', borderRadius:'20px', fontSize:'0.85rem', fontWeight:'700', marginBottom:'20px', border:'1px solid rgba(245, 158, 11, 0.3)'}}>
              ⚡️ Matrícula {clp(ENROLLMENT_FEE)}
            </div>
            <h1 className="hero-title">Tu puntaje nacional <span className="text-gradient">se construye aquí.</span></h1>
            <p style={{fontSize:'1.2rem', color:'#cbd5e1', marginBottom:40, maxWidth:540}}>
              Sin cláusulas abusivas. Educación de alto rendimiento con garantía total.
            </p>
            
            <div style={{display:'flex', gap:'15px', flexWrap:'wrap'}}>
              <button onClick={() => scrollToBuilder([])} className="btn btn-primary">
                Configurar mi Plan <ArrowRight size={18}/>
              </button>
              <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="btn btn-ghost">
                Consultar Horarios
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img src={studyOnline} alt="Clases Online" />
          </div>
        </div>
      </section>

      {/* BUILDER INTERACTIVO */}
      <section ref={builderRef} className="section-builder">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:'50px'}}>
            <h2>Arma tu Plan a Medida</h2>
            <p style={{color:'#94a3b8'}}>Selecciona las asignaturas. El precio se calcula automáticamente.</p>
          </div>

          <div className="builder-container">
            {/* IZQUIERDA: SELECCIÓN */}
            <div className="selector-panel">
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                 <h3 style={{fontSize:'1.2rem'}}>Asignaturas Disponibles</h3>
                 {subjectCount > 0 && 
                    <button onClick={() => setSelectedSubjectIds([])} style={{background:'none', border:'none', color:'#94a3b8', fontSize:'0.9rem', textDecoration:'underline', cursor:'pointer'}}>Limpiar</button>
                 }
               </div>

               <div className="subjects-grid">
                  {PAES_SUBJECTS.map((s) => {
                    const isActive = selectedSubjectIds.includes(s.id);
                    return (
                      <div 
                        key={s.id} 
                        onClick={() => toggleSubject(s.id)} 
                        className={`subject-card ${isActive ? 'active' : ''}`}
                      >
                         <div style={{fontSize:'1.5rem'}}>{isActive ? <Check /> : <Book />}</div>
                         <span style={{fontWeight:'700', fontSize:'0.9rem'}}>{s.name}</span>
                      </div>
                    )
                  })}
               </div>
               
               <div style={{marginTop:'30px', padding:'20px', background:'rgba(255,255,255,0.03)', borderRadius:'12px', display:'flex', gap:10}}>
                  <ShieldCheck size={20} color="#10b981" />
                  <div>
                    <h4 style={{marginBottom:'5px', fontSize:'0.95rem'}}>Garantía Lael</h4>
                    <p style={{fontSize:'0.85rem', color:'#94a3b8', lineHeight:1.4}}>Si no te gusta la metodología durante la primera semana, te devolvemos el 100% de tu mensualidad.</p>
                  </div>
               </div>
            </div>

            {/* DERECHA: RESUMEN DE COMPRA */}
            <div className="summary-panel">
               <h3 style={{borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom:20, marginBottom:20}}>Resumen de Pago</h3>

               {subjectCount === 0 ? (
                 <div style={{textAlign:'center', padding:'40px 0', color:'#94a3b8'}}>
                    <p>Selecciona al menos un ramo para ver el detalle.</p>
                 </div>
               ) : (
                 <>
                   {/* Desglose */}
                   <div className="invoice-row">
                      <span>Plan Mensual ({subjectCount} ramos)</span>
                      <span style={{fontWeight:'700'}}>{clp(monthlyPrice)}</span>
                   </div>
                   <div style={{fontSize:'0.8rem', color:'#94a3b8', marginBottom:'15px', paddingLeft:'10px'}}>
                      {selectedSubjects.map(s => s.name).join(', ')}
                   </div>

                   <div className="invoice-row enrollment-row">
                      <span>+ Matrícula 2026</span>
                      <span style={{fontWeight:'700'}}>{clp(ENROLLMENT_FEE)}</span>
                   </div>

                   {/* Total */}
                   <div className="invoice-row total">
                      <span style={{textTransform:'uppercase', letterSpacing:1, fontSize:'0.8rem', color:'#94a3b8'}}>Total Primer Pago</span>
                      <div style={{textAlign:'right'}}>
                          <div className="total-amount">{clp(firstPaymentTotal)}</div>
                          <div style={{fontSize:'0.8rem', color:'#94a3b8', marginTop:5}}>Luego {clp(monthlyPrice)} / mes</div>
                      </div>
                   </div>

                   {/* Botones de Acción */}
                   <div style={{display:'grid', gap:'12px', marginTop:'30px'}}>
                      
                      {/* ESTE BOTÓN ABRE EL MODAL */}
                      <button onClick={handleOpenEnrollment} className="btn btn-primary" style={{width:'100%', justifyContent:'center'}}>
                        Pagar e Inscribirme <ArrowRight size={18}/>
                      </button>

                      {/* ESTE BOTÓN ES PARA CARRITO (SEGUIR NAVEGANDO) */}
                      <button onClick={handleAddToCart} className="btn btn-ghost" style={{width:'100%', justifyContent:'center'}}>
                        Agregar al Carrito
                      </button>
                   </div>
                   
                   <p style={{textAlign:'center', fontSize:'0.75rem', marginTop:'15px', color:'#94a3b8'}}>
                     Pagos seguros vía WebPay / MercadoPago
                   </p>
                 </>
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}