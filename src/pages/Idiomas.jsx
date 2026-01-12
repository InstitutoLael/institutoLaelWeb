import React, { useState, useMemo, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Si no usas contexto, puedes borrar esto
import SEOHead from "../components/SEOHead"; 

// 📦 ICONOS (Lucide React) - Seleccionados para educación y confianza
import { 
  Check, Hand, Heart, GraduationCap, Star, 
  CreditCard, ArrowRight, ShieldCheck, X, 
  Loader2, Users, Video, Calendar
} from "lucide-react";

// 📊 DATOS SIMULADOS (Si tienes un archivo real, importalo, pero esto hace que funcione YA)
// Esto evita errores de importación si tu archivo de datos no tiene la estructura exacta.
const LSCH_DATA = {
  enrollmentFee: 0, // Matrícula GRATIS por promoción
  monthlyPrice: 29990,
  levels: [
    { id: "nv1", name: "Nivel 1: Inicial", desc: "Fundamentos, alfabeto y saludos básicos.", emoji: "🤟" },
    { id: "nv2", name: "Nivel 2: Intermedio", desc: "Estructura gramatical y conversación fluida.", emoji: "🗣️" },
    { id: "nv3", name: "Nivel 3: Avanzado", desc: "Interpretación y cultura sorda profunda.", emoji: "🧠" },
  ],
  schedules: ["Lunes y Miércoles 19:00", "Martes y Jueves 20:00", "Sábados Intensivo"]
};

// Función para formatear dinero chileno
const clp = (amount) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);

// 🎨 IMAGEN (Usa una de tus assets o una url externa por mientras)
import lschBg from "../assets/img/lael/senas.jpg"; // Asegúrate que esta ruta exista o cámbiala

/* ==========================================================================
   1. ESTILOS CSS (DISEÑO PREMIUM - IDÉNTICO AL REFERENTE)
   ========================================================================== */
const css = `
:root {
  --bg-body: #f8fafc;
  --bg-card: #ffffff;
  --primary: #0d9488; /* TEAL: Color muy usado en comunidad sorda/salud/educación */
  --primary-dark: #0f766e;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --radius: 20px;
  --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* BASE */
.lsch-page { 
  background: var(--bg-body); 
  color: var(--text-main); 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  min-height: 100vh; 
  padding-bottom: 120px;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
h1, h2, h3 { line-height: 1.1; margin: 0; font-weight: 800; letter-spacing: -0.02em; }

/* HERO SECTION */
.hero { 
  padding: 140px 0 80px; 
  background: radial-gradient(circle at top right, #ccfbf1 0%, transparent 40%), white;
  border-bottom: 1px solid #e2e8f0;
  overflow: hidden; /* Para que la imagen no rompa el layout */
}
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }

.hero-badge { 
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; 
  background: #f0fdfa; color: var(--primary); border: 1px solid #ccfbf1;
  border-radius: 50px; font-weight: 700; font-size: 0.85rem; margin-bottom: 24px; 
}
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px; color: #1e293b; }
.hero-desc { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 500px; }

/* TEACHER PROFILE CARD (NUEVO: Para destacar a la profe) */
.teacher-highlight {
  background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 20px;
  display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm);
  margin-bottom: 30px;
}
.teacher-avatar {
  width: 60px; height: 60px; border-radius: 50%; background: #e2e8f0;
  display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
}

/* FEATURES */
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 80px; }
.feature-card { background: white; padding: 32px; border-radius: var(--radius); border: 1px solid #f1f5f9; transition: 0.3s; box-shadow: var(--shadow-sm); }
.feature-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: #cbd5e1; }
.f-icon { width: 50px; height: 50px; background: #f0fdfa; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: var(--primary); }

/* BUILDER LAYOUT */
.builder-section { padding: 60px 0; }
.builder-container { display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px; align-items: start; }

/* TARJETAS DE NIVEL (Igual a lang-card) */
.level-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }

.level-card {
  background: white; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;
  cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden; display: flex; flex-direction: column; height: 100%;
}
.level-card:hover { border-color: #94a3b8; transform: translateY(-2px); }
.level-card.active { border-color: var(--primary); background: #f0fdfa; box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1); }

.check-circle { position: absolute; top: 16px; right: 16px; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; transition: 0.2s; background: white; }
.level-card.active .check-circle { background: var(--primary); border-color: var(--primary); color: white; }

.level-emoji { font-size: 3rem; margin-bottom: 16px; display: block; }
.level-name { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
.level-desc { font-size: 0.9rem; color: #64748b; line-height: 1.4; margin-bottom: 20px; flex-grow: 1; }

/* Selector de Horario (Similar al selector de nivel) */
.schedule-select { margin-top: auto; padding-top: 10px; border-top: 1px dashed #e2e8f0; }
.schedule-select select {
  width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1;
  font-size: 0.85rem; color: #334155; outline: none;
}

/* RESUMEN (TICKET) - EL MISMO DEL EJEMPLO */
.summary-panel { 
  background: white; border: 1px solid #e2e8f0; border-radius: 24px; padding: 32px; 
  position: sticky; top: 40px; box-shadow: var(--shadow-lg); 
}
.ticket-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: #475569; }
.ticket-row.highlight { color: var(--primary); font-weight: 700; }
.ticket-total { margin-top: 20px; padding-top: 20px; border-top: 2px dashed #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.big-price { font-size: 2rem; font-weight: 800; color: #1e293b; }

.btn { width: 100%; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: 0.2s; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 8px 20px -5px rgba(13, 148, 136, 0.4); }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }

/* MODAL - ESTILOS EXACTOS DEL REFERENTE */
.modal-overlay { 
  position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); 
  backdrop-filter: blur(4px); z-index: 9999; 
  display: flex; align-items: center; justify-content: center; padding: 20px; 
}
.modal-content { 
  background: white; width: 100%; max-width: 480px; 
  border-radius: 24px; padding: 32px; 
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); 
  animation: popIn 0.3s ease-out; 
  position: relative;
}
@keyframes popIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.modal-input { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 12px; color: #1e293b; margin-bottom: 16px; outline: none; transition: 0.3s; }
.modal-input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1); }
.close-btn { position: absolute; top: 20px; right: 20px; background: #f1f5f9; border: none; padding: 8px; border-radius: 50%; color: #64748b; cursor: pointer; }

/* MOBILE STICKY BAR */
.mobile-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #e2e8f0; padding: 16px 24px; z-index: 900; box-shadow: 0 -4px 20px rgba(0,0,0,0.05); }

@media (max-width: 900px) {
  .hero-grid, .builder-container { grid-template-columns: 1fr; }
  .summary-panel { display: none; } 
  .mobile-bar { display: flex; justify-content: space-between; align-items: center; }
  .hero { text-align: center; padding-top: 100px; }
  .hero-grid img { display: none; }
  .hero-desc { margin: 0 auto 40px; }
}
`;

/* ==========================================================================
   COMPONENTE DE FORMULARIO (MODAL)
   ========================================================================== */
const API_URL = "https://tu-api.workers.dev"; // Reemplaza con tu URL real

function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ fullName: "", rut: "", email: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulación de envío exitoso
    setTimeout(() => setStatus("success"), 1500); 
    
    // Aquí iría tu fetch real:
    /*
    try {
      await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, program: planTitle, detail: selectedDetails }),
      });
      setStatus("success");
    } catch { setStatus("error"); }
    */
  };

  if (status === "success") return (
    <div className="modal-content" style={{textAlign:'center'}}>
      <div style={{width:80, height:80, background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
        <Check size={40} color="#16a34a"/>
      </div>
      <h2 style={{color:'#166534', marginBottom:10}}>¡Solicitud Enviada!</h2>
      <p style={{color:'#64748b', marginBottom:24}}>Nos contactaremos contigo para finalizar la matrícula con la profesora.</p>
      <button onClick={onClose} className="btn btn-primary">Cerrar</button>
    </div>
  );

  return (
    <div className="modal-content">
      <button onClick={onClose} className="close-btn"><X size={20}/></button>
      <h3 style={{marginBottom:8, fontSize:'1.5rem'}}>Inscripción LSCh</h3>
      <p style={{fontSize:'0.9rem', color:'#64748b', marginBottom:24}}>
        Estás reservando: <strong style={{color:'#1e293b'}}>{planTitle}</strong>
      </p>
      
      <form onSubmit={handleSubmit}>
        <input className="modal-input" name="fullName" placeholder="Nombre Completo" required onChange={e => setFormData({...formData, fullName: e.target.value})}/>
        <input className="modal-input" name="rut" placeholder="RUT" required onChange={e => setFormData({...formData, rut: e.target.value})}/>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
           <input className="modal-input" name="email" type="email" placeholder="Correo" required onChange={e => setFormData({...formData, email: e.target.value})}/>
           <input className="modal-input" name="phone" type="tel" placeholder="+569..." required onChange={e => setFormData({...formData, phone: e.target.value})}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? <Loader2 className="animate-spin" size={20}/> : "Continuar"} <ArrowRight size={18}/>
        </button>
      </form>
      <p style={{fontSize:'0.75rem', color:'#94a3b8', marginTop:15, textAlign:'center'}}>
        Tus datos son privados. Nos comunicaremos vía WhatsApp/Correo.
      </p>
    </div>
  );
}

/* ==========================================================================
   COMPONENTE PRINCIPAL (PÁGINA LSCH)
   ========================================================================== */
export default function LSCh() {
  const { addToCart } = useCart ? useCart() : { addToCart: () => {} }; // Fallback seguro
  const builderRef = useRef(null);
  
  // ESTADO: Solo se puede elegir UN nivel a la vez para este flujo simple
  const [selectedLevelId, setSelectedLevelId] = useState("nv1");
  const [selectedSchedule, setSelectedSchedule] = useState(LSCH_DATA.schedules[0]);
  const [showModal, setShowModal] = useState(false);

  // --- LÓGICA DE PRECIOS ---
  const currentLevel = LSCH_DATA.levels.find(l => l.id === selectedLevelId);
  const totalPayNow = LSCH_DATA.monthlyPrice + LSCH_DATA.enrollmentFee;

  // --- HANDLER CARRITO ---
  const handleAddToCart = () => {
    addToCart({
      id: `lsch-${selectedLevelId}`,
      nombre: `Curso LSCh - ${currentLevel.name}`,
      precio: LSCH_DATA.monthlyPrice,
      tipo: 'curso',
      detalles: `Horario: ${selectedSchedule}`
    });
    alert("¡Agregado al Carrito!");
  };

  return (
    <div className="lsch-page">
      <style>{css}</style>
      <SEOHead title="Curso Lengua de Señas Chilena | LSCh" description="Aprende con educadora sorda nativa." />

      {/* MODAL (Renderizado condicional) */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            {/* onClick stopPropagation evita que se cierre al hacer click dentro del modal */}
            <div onClick={e => e.stopPropagation()} style={{width:'100%', maxWidth:'480px'}}>
                <EnrollmentForm 
                    planTitle={`LSCh - ${currentLevel.name}`}
                    price={clp(totalPayNow)}
                    selectedDetails={`Horario: ${selectedSchedule}`}
                    onClose={() => setShowModal(false)}
                />
            </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">
              <Star size={14} fill="currentColor"/> Matrículas Abiertas
            </div>
            <h1 className="hero-title">
              Conecta manos,<br/>
              <span style={{color:'var(--primary)'}}>Crea puentes.</span>
            </h1>
            
            {/* TARJETA DE LA PROFE (DESTACADO) */}
            <div className="teacher-highlight">
                <div className="teacher-avatar">👩‍🏫</div>
                <div>
                    <h4 style={{margin:0, fontSize:'1rem', color:'#1e293b'}}>Docente Nativa Experta</h4>
                    <p style={{margin:0, fontSize:'0.9rem', color:'#64748b'}}>
                       Clases impartidas por <strong style={{color:'var(--primary)'}}>Educadora de Párvulos Sorda</strong>. 
                       Aprende gramática real y cultura, no solo señas sueltas.
                    </p>
                </div>
            </div>

            <p className="hero-desc">
              Curso 100% online y en vivo. Metodología visual y práctica diseñada para romper las barreras de comunicación desde la primera clase.
            </p>
            
            <div style={{display:'flex', gap:12}}>
              <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn btn-primary" style={{width:'auto', padding:'16px 32px'}}>
                Ver Horarios <ArrowRight size={20}/>
              </button>
            </div>
          </div>

          <div style={{position:'relative'}}>
             <div style={{position:'absolute', inset:0, background:'linear-gradient(to right, white, transparent)', zIndex:2}}></div>
             {/* IMAGEN PRINCIPAL */}
             <img 
               src={lschBg} 
               alt="Clase LSCh" 
               style={{width:'100%', borderRadius:24, boxShadow:'0 25px 50px -12px rgba(0,0,0,0.15)', filter:'brightness(0.95)'}} 
             />
             
             {/* Floating Card: Enfoque Inclusivo */}
             <div style={{position:'absolute', bottom:-20, left:-20, background:'white', padding:20, borderRadius:16, boxShadow:'0 10px 30px rgba(0,0,0,0.1)', zIndex:3, display:'flex', alignItems:'center', gap:15}}>
                <div style={{background:'#fef3c7', padding:12, borderRadius:'50%', color:'#d97706'}}><Hand size={24}/></div>
                <div>
                   <p style={{fontWeight:800, color:'#1e293b'}}>Inmersión Total</p>
                   <p style={{fontSize:'0.8rem', color:'#64748b'}}>Sin uso de voz</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES (Adaptado a LSCh) */}
      <section className="container" style={{marginTop:'-40px', position:'relative', zIndex:5}}>
        <div className="features-grid">
           <div className="feature-card">
              <div className="f-icon"><Users size={28}/></div>
              <h3>Comunidad Sorda</h3>
              <p style={{fontSize:'0.95rem', color:'#64748b', marginTop:10}}>
                No aprendes de un libro, aprendes de una persona sorda. Entenderás la cultura, la identidad y el respeto necesario.
              </p>
           </div>
           <div className="feature-card">
              <div className="f-icon"><GraduationCap size={28}/></div>
              <h3>Pedagogía Real</h3>
              <p style={{fontSize:'0.95rem', color:'#64748b', marginTop:10}}>
                Nuestra docente es Educadora de Párvulos titulada. Sabe cómo enseñar, tiene paciencia y metodología adaptada.
              </p>
           </div>
           <div className="feature-card">
              <div className="f-icon"><Video size={28}/></div>
              <h3>Aula Virtual 24/7</h3>
              <p style={{fontSize:'0.95rem', color:'#64748b', marginTop:10}}>
                Acceso a grabaciones de las clases, material visual de apoyo y tareas para practicar tus señas en casa.
              </p>
           </div>
        </div>
      </section>

      {/* 3. BUILDER (SELECTOR DE NIVELES) */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:50}}>
             <h2 style={{fontSize:'2.5rem', marginBottom:16, color:'#1e293b'}}>Elige tu Nivel</h2>
             <p style={{color:'#64748b', maxWidth:600, margin:'0 auto'}}>
               Comienza desde cero o perfecciona tu técnica. Todos los cursos incluyen certificación de participación.
             </p>
          </div>

          <div className="builder-container">
             {/* GRID DE NIVELES */}
             <div className="level-grid">
                {LSCH_DATA.levels.map(lvl => {
                   const isActive = selectedLevelId === lvl.id;
                   return (
                     <div 
                       key={lvl.id} 
                       onClick={() => setSelectedLevelId(lvl.id)}
                       className={`level-card ${isActive ? 'active' : ''}`}
                     >
                        <div className="check-circle"><Check size={14} strokeWidth={3}/></div>
                        <span className="level-emoji">{lvl.emoji}</span>
                        <h3 className="level-name">{lvl.name}</h3>
                        <p className="level-desc">{lvl.desc}</p>
                        
                        {/* Selector de horario dentro de la tarjeta */}
                        {isActive && (
                            <div className="schedule-select" onClick={e => e.stopPropagation()}>
                                <label style={{fontSize:'0.75rem', fontWeight:700, color:'var(--primary)', marginBottom:4, display:'block'}}>
                                    <Calendar size={12} style={{display:'inline', marginRight:4}}/> Elige horario:
                                </label>
                                <select 
                                    value={selectedSchedule} 
                                    onChange={(e) => setSelectedSchedule(e.target.value)}
                                >
                                    {LSCH_DATA.schedules.map(sch => (
                                        <option key={sch} value={sch}>{sch}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                     </div>
                   )
                })}
             </div>

             {/* TICKET DE RESUMEN (DESKTOP) - Sticky a la derecha */}
             <div className="summary-panel">
                <div style={{marginBottom:24, paddingBottom:24, borderBottom:'1px dashed #e2e8f0'}}>
                   <h3 style={{fontSize:'1.25rem', color:'#1e293b', display:'flex', alignItems:'center', gap:10}}>
                      <CreditCard size={20} color="var(--primary)"/> Resumen
                   </h3>
                </div>

                <div className="ticket-row">
                    <span>Curso Seleccionado</span>
                    <strong style={{color:'#1e293b'}}>{currentLevel.name}</strong>
                </div>
                <div className="ticket-row" style={{fontSize:'0.85rem'}}>
                    <span>Horario</span>
                    <span>{selectedSchedule}</span>
                </div>
                
                <div style={{margin:'20px 0', height:1, background:'#e2e8f0'}}></div>

                <div className="ticket-row">
                    <span>Mensualidad</span>
                    <span>{clp(LSCH_DATA.monthlyPrice)}</span>
                </div>
                <div className="ticket-row highlight">
                    <span>Matrícula</span>
                    <span>{LSCH_DATA.enrollmentFee === 0 ? "GRATIS" : clp(LSCH_DATA.enrollmentFee)}</span>
                </div>

                <div className="ticket-total">
                    <div>
                    <span style={{fontSize:'0.8rem', color:'#64748b', textTransform:'uppercase', fontWeight:700}}>Total a pagar hoy</span>
                    <div className="big-price">{clp(totalPayNow)}</div>
                    <div style={{fontSize:'0.8rem', color:'#64748b', marginTop:4}}>Mensualidad fija</div>
                    </div>
                </div>

                <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{marginTop:24}}>
                    Inscribirme Ahora <ArrowRight size={18}/>
                </button>
                
                <button onClick={handleAddToCart} style={{width:'100%', textAlign:'center', padding:15, color:'#64748b', fontSize:'0.9rem', background:'transparent', border:'none', cursor:'pointer', textDecoration:'underline'}}>
                    Agregar al carrito y seguir viendo
                </button>

                <div style={{marginTop:20, padding:15, background:'#f0fdf4', borderRadius:12, display:'flex', gap:10, alignItems:'start'}}>
                    <ShieldCheck size={18} color="#16a34a" style={{marginTop:2}}/>
                    <p style={{fontSize:'0.8rem', color:'#166534', lineHeight:1.4}}>
                    <strong>Certificado Incluido:</strong> Al finalizar y aprobar el nivel, recibes tu diploma digital.
                    </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* BARRA MÓVIL (STICKY BOTTOM) - Para celulares */}
      <div className="mobile-bar">
         <div>
            <p style={{fontSize:'0.75rem', textTransform:'uppercase', color:'#64748b', fontWeight:700}}>Total Hoy</p>
            <p style={{fontSize:'1.5rem', fontWeight:800, color:'#1e293b', lineHeight:1}}>{clp(totalPayNow)}</p>
         </div>
         <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{width:'auto', padding:'12px 24px'}}>
            Inscribirme
         </button>
      </div>

    </div>
  );
}