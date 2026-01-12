import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import SEOHead from "../components/SEOHead.jsx";
import MultiHello from "../components/MultiHello"; // Asegúrate de tener este componente o quítalo si da error

// 📦 ICONOS
import { 
  Check, Globe, MessageCircle, Award, Star, 
  ChevronDown, ChevronUp, CreditCard, ArrowRight,
  Zap, PlayCircle, ShieldCheck, X, Loader2
} from "lucide-react";

// 📊 DATOS
import { 
  LANGUAGES, 
  ENROLLMENT_FEE, 
  computeLangBundle, 
  clp 
} from "../data/idiomas.js";

// 🎨 IMAGEN (Usa la misma de PAES o una de idiomas si tienes)
import worldMap from "../assets/img/lael/study-online.jpg"; // Reemplaza si tienes una de "personas hablando"

/* ==========================================================================
   1. ESTILOS CSS (DISEÑO PREMIUM)
   ========================================================================== */
const css = `
:root {
  --bg-body: #f8fafc;
  --bg-card: #ffffff;
  --primary: #4f46e5; /* Indigo vibrante */
  --primary-dark: #4338ca;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --accent-green: #10b981;
  --radius: 20px;
  --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* BASE */
.lang-page { 
  background: var(--bg-body); 
  color: var(--text-main); 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  min-height: 100vh; 
  padding-bottom: 120px;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
h1, h2, h3 { line-height: 1.1; margin: 0; font-weight: 800; letter-spacing: -0.02em; }

/* HERO */
.hero { 
  padding: 140px 0 80px; 
  background: radial-gradient(circle at top right, #e0e7ff 0%, transparent 40%), white;
  border-bottom: 1px solid #e2e8f0;
}
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }
.hero-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; background: #eef2ff; color: var(--primary); border-radius: 50px; font-weight: 700; font-size: 0.85rem; margin-bottom: 24px; }
.hero-title { font-size: clamp(3rem, 5vw, 4.5rem); margin-bottom: 24px; color: #1e293b; }
.hero-desc { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 500px; }

/* FEATURES */
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 80px; }
.feature-card { background: white; padding: 32px; border-radius: var(--radius); border: 1px solid #f1f5f9; transition: 0.3s; box-shadow: var(--shadow-sm); }
.feature-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: #e2e8f0; }
.f-icon { width: 50px; height: 50px; background: #f8fafc; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: var(--primary); }

/* BUILDER LAYOUT */
.builder-section { padding: 60px 0; }
.builder-container { display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px; align-items: start; }

/* TARJETAS DE IDIOMA */
.lang-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }

.lang-card {
  background: white; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;
  cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden; display: flex; flex-direction: column; height: 100%;
}
.lang-card:hover { border-color: #cbd5e1; transform: translateY(-2px); }
.lang-card.active { border-color: var(--primary); background: #f5f3ff; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
.lang-card.coming-soon { opacity: 0.6; pointer-events: none; border-style: dashed; }

.check-circle { position: absolute; top: 16px; right: 16px; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; transition: 0.2s; background: white; }
.lang-card.active .check-circle { background: var(--primary); border-color: var(--primary); color: white; }

.lang-emoji { font-size: 3rem; margin-bottom: 16px; display: block; }
.lang-name { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
.lang-desc { font-size: 0.9rem; color: #64748b; line-height: 1.4; margin-bottom: 20px; flex-grow: 1; }

/* Selector de Nivel */
.level-selector { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 4px; display: flex; gap: 4px; margin-top: auto; }
.lvl-btn { flex: 1; border: none; background: transparent; padding: 6px 0; font-size: 0.75rem; font-weight: 700; color: #94a3b8; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.lvl-btn:hover { background: #f1f5f9; color: #64748b; }
.lvl-btn.selected { background: var(--primary); color: white; box-shadow: 0 2px 5px rgba(79, 70, 229, 0.3); }

/* RESUMEN (TICKET) */
.summary-panel { 
  background: white; border: 1px solid #e2e8f0; border-radius: 24px; padding: 32px; 
  position: sticky; top: 40px; box-shadow: var(--shadow-lg); 
}
.ticket-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: #475569; }
.ticket-row.discount { color: #10b981; font-weight: 600; }
.ticket-total { margin-top: 20px; padding-top: 20px; border-top: 2px dashed #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.big-price { font-size: 2rem; font-weight: 800; color: #1e293b; }

.btn { width: 100%; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: 0.2s; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 8px 20px -5px rgba(79, 70, 229, 0.4); }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }
.btn-ghost { background: transparent; color: #64748b; margin-top: 12px; }
.btn-ghost:hover { color: #1e293b; text-decoration: underline; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { background: white; width: 100%; max-width: 480px; border-radius: 24px; padding: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); animation: popIn 0.3s ease-out; }
@keyframes popIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-input { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 12px; color: #1e293b; margin-bottom: 16px; outline: none; transition: 0.3s; }
.modal-input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
.close-btn { position: absolute; top: 20px; right: 20px; background: #f1f5f9; border: none; padding: 8px; border-radius: 50%; color: #64748b; cursor: pointer; }

/* MOBILE STICKY BAR */
.mobile-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #e2e8f0; padding: 16px 24px; z-index: 900; box-shadow: 0 -4px 20px rgba(0,0,0,0.05); }

@media (max-width: 900px) {
  .hero-grid, .builder-container { grid-template-columns: 1fr; }
  .summary-panel { display: none; } /* Se oculta en móvil, usamos la barra sticky */
  .mobile-bar { display: flex; justify-content: space-between; align-items: center; }
  .hero { text-align: center; padding-top: 100px; }
  .hero-grid img { display: none; }
  .hero-desc { margin: 0 auto 40px; }
}
`;

/* ==========================================================================
   FORMULARIO DE INSCRIPCIÓN (MODAL)
   ========================================================================== */
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev";

function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ fullName: "", rut: "", email: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, program: planTitle, comments: `Detalle: ${selectedDetails} | Total: ${price}` }),
      });
      setStatus("success");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="modal-overlay">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div style={{width:80, height:80, background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
          <Check size={40} color="#16a34a"/>
        </div>
        <h2 style={{color:'#166534', marginBottom:10}}>¡Cupo Reservado!</h2>
        <p style={{color:'#64748b', marginBottom:24}}>Revisa tu correo, te enviamos los datos de acceso y pago.</p>
        <button onClick={onClose} className="btn btn-primary">Entendido</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn"><X size={20}/></button>
        <h3 style={{marginBottom:8, fontSize:'1.5rem'}}>Inscripción</h3>
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
            {status === 'loading' ? <Loader2 className="spin" size={20}/> : "Ir a Pagar"} <ArrowRight size={18}/>
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */
export default function Idiomas() {
  const { addToCart } = useCart();
  const builderRef = useRef(null);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showModal, setShowModal] = useState(false);

  // --- LÓGICA DE NEGOCIO ---
  const safeLanguages = LANGUAGES || [];
  
  const selectedCourses = useMemo(() => {
    return safeLanguages.filter(l => selectedIds.includes(l.id));
  }, [selectedIds, safeLanguages]);

  const pricing = computeLangBundle(selectedCourses.length);
  // Total = Mensualidad (con descuentos) + Matrícula (si hay cursos)
  const totalFirstPayment = pricing.totalMonthly + (selectedIds.length > 0 ? ENROLLMENT_FEE : 0);

  // --- HANDLERS ---
  const toggleCourse = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds(prev => {
      const exists = prev.includes(id);
      if (exists) return prev.filter(x => x !== id);
      
      // Si seleccionamos nuevo, setear nivel A1 si no existe
      if (!selectedLevels[id]) setLevel(id, "A1");
      return [...prev, id];
    });
  };

  const setLevel = (langId, level) => {
    if (!selectedIds.includes(langId)) setSelectedIds(prev => [...prev, langId]);
    setSelectedLevels(prev => ({ ...prev, [langId]: level }));
  };

  const getDetailsString = () => selectedCourses.map(c => `${c.name} (${selectedLevels[c.id] || 'A1'})`).join(', ');

  const handleAddToCart = () => {
    if(selectedCourses.length === 0) return;
    addToCart({
      id: `lang-bundle-${Date.now()}`,
      nombre: `Pack Idiomas (${pricing.label})`,
      precio: pricing.totalMonthly,
      tipo: 'idiomas',
      detalles: getDetailsString()
    });
    // Agregar Matrícula aparte
    addToCart({
        id: `lang-matricula-2026`,
        nombre: 'Matrícula Anual Idiomas',
        precio: ENROLLMENT_FEE,
        tipo: 'matricula',
        detalles: 'Pago único anual'
    });
    alert("¡Agregado al Carrito!");
  };

  return (
    <div className="lang-page">
      <style>{css}</style>
      <SEOHead title="Cursos de Idiomas | Instituto Lael" description="Inglés, Coreano y más. Clases en vivo." />

      {/* MODAL INSCRIPCIÓN */}
      {showModal && (
        <EnrollmentForm 
           planTitle={`Pack Idiomas (${selectedIds.length} Cursos)`}
           price={clp(totalFirstPayment)}
           selectedDetails={getDetailsString()}
           onClose={() => setShowModal(false)}
        />
      )}

      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge">
              <Star size={14} fill="currentColor"/> Matrícula 2026 Abierta
            </div>
            <h1 className="hero-title">
              <span style={{display:'block', fontSize:'0.5em', color:'#4f46e5', fontWeight:700, marginBottom:10}}>
                 <MultiHello />
              </span>
              Rompe la barrera del idioma.
            </h1>
            <p className="hero-desc">
              Deja de estudiar gramática en papel. Empieza a hablar desde la primera clase con nuestra metodología comunicativa y cultural.
            </p>
            <div style={{display:'flex', gap:12}}>
              <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn btn-primary" style={{width:'auto', padding:'16px 32px'}}>
                Ver Cursos <ArrowRight size={20}/>
              </button>
            </div>
          </div>
          <div style={{position:'relative'}}>
             <div style={{position:'absolute', inset:0, background:'linear-gradient(to right, white, transparent)', zIndex:2}}></div>
             <img src={worldMap} alt="Clases Online" style={{width:'100%', borderRadius:24, boxShadow:'0 25px 50px -12px rgba(0,0,0,0.15)'}} />
             
             {/* Floating Card */}
             <div style={{position:'absolute', bottom:-20, left:-20, background:'white', padding:20, borderRadius:16, boxShadow:'0 10px 30px rgba(0,0,0,0.1)', zIndex:3, display:'flex', alignItems:'center', gap:15}}>
                <div style={{background:'#dcfce7', padding:12, borderRadius:'50%', color:'#15803d'}}><Award size={24}/></div>
                <div>
                   <p style={{fontWeight:800, color:'#1e293b'}}>Certificados</p>
                   <p style={{fontSize:'0.8rem', color:'#64748b'}}>Validados por Lael</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES */}
      <section className="container" style={{marginTop:'-40px', position:'relative', zIndex:5}}>
        <div className="features-grid">
           <div className="feature-card">
              <div className="f-icon"><MessageCircle size={28}/></div>
              <h3>100% Conversacional</h3>
              <p style={{fontSize:'0.95rem', color:'#64748b', marginTop:10}}>
                Menos libros, más hablar. Simulamos situaciones reales para que pierdas el miedo.
              </p>
           </div>
           <div className="feature-card">
              <div className="f-icon"><Globe size={28}/></div>
              <h3>Enfoque Cultural</h3>
              <p style={{fontSize:'0.95rem', color:'#64748b', marginTop:10}}>
                No enseñamos solo el idioma, enseñamos cómo piensa y vive la gente nativa.
              </p>
           </div>
           <div className="feature-card">
              <div className="f-icon"><PlayCircle size={28}/></div>
              <h3>Clases Grabadas</h3>
              <p style={{fontSize:'0.95rem', color:'#64748b', marginTop:10}}>
                ¿Faltaste? No hay problema. Accede a las grabaciones en HD desde el aula virtual.
              </p>
           </div>
        </div>
      </section>

      {/* 3. BUILDER (SELECTOR DE CURSOS) */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:50}}>
             <h2 style={{fontSize:'2.5rem', marginBottom:16, color:'#1e293b'}}>Arma tu Plan de Estudio</h2>
             <p style={{color:'#64748b', maxWidth:600, margin:'0 auto'}}>
               Elige los idiomas que quieres dominar. Si seleccionas dos, obtienes un 
               <strong style={{color:'#4f46e5'}}> 50% de descuento</strong> en el segundo curso.
             </p>
          </div>

          <div className="builder-container">
             {/* GRID DE IDIOMAS */}
             <div className="lang-grid">
                {safeLanguages.map(l => {
                   const isActive = selectedIds.includes(l.id);
                   const levels = l.levels || ["A1", "A2", "B1"];
                   const currentLvl = selectedLevels[l.id] || levels[0];

                   return (
                     <div 
                       key={l.id} 
                       onClick={() => toggleCourse(l.id, l.comingSoon)}
                       className={`lang-card ${isActive ? 'active' : ''} ${l.comingSoon ? 'coming-soon' : ''}`}
                     >
                        <div className="check-circle"><Check size={14} strokeWidth={3}/></div>
                        <span className="lang-emoji">{l.emoji}</span>
                        <h3 className="lang-name">
                           {l.name}
                           {l.comingSoon && <span style={{fontSize:'0.6em', background:'#fef3c7', color:'#b45309', padding:'2px 8px', borderRadius:10, verticalAlign:'middle', marginLeft:6}}>PRONTO</span>}
                        </h3>
                        <p className="lang-desc">{l.summary}</p>
                        
                        {!l.comingSoon && (
                           <div className="level-selector" onClick={(e) => e.stopPropagation()}>
                              {levels.slice(0,3).map(lvl => (
                                 <button 
                                   key={lvl} 
                                   className={`lvl-btn ${isActive && currentLvl === lvl ? 'selected' : ''}`}
                                   onClick={() => setLevel(l.id, lvl)}
                                 >
                                   {lvl}
                                 </button>
                              ))}
                           </div>
                        )}
                     </div>
                   )
                })}
             </div>

             {/* TICKET DE RESUMEN (DESKTOP) */}
             <div className="summary-panel">
                <div style={{marginBottom:24, paddingBottom:24, borderBottom:'1px dashed #e2e8f0'}}>
                   <h3 style={{fontSize:'1.25rem', color:'#1e293b', display:'flex', alignItems:'center', gap:10}}>
                      <CreditCard size={20} color="#4f46e5"/> Tu Inversión
                   </h3>
                </div>

                {selectedCourses.length === 0 ? (
                   <div style={{textAlign:'center', padding:'30px 0', color:'#94a3b8'}}>
                      <Globe size={40} style={{marginBottom:10, opacity:0.3}}/>
                      <p>Selecciona un curso para comenzar.</p>
                   </div>
                ) : (
                   <>
                      <div className="ticket-row">
                         <span>Matrícula Anual</span>
                         <span>{clp(ENROLLMENT_FEE)}</span>
                      </div>
                      
                      {selectedCourses.map((c, idx) => (
                         <div key={c.id} className="ticket-row">
                            <span>{c.name} ({selectedLevels[c.id]})</span>
                            {/* Lógica visual simple: 1er curso full, 2do dto */}
                            <span>{idx === 0 ? '$17.990' : idx === 1 ? '$15.000' : 'Gratis'}</span>
                         </div>
                      ))}

                      {selectedCourses.length >= 2 && (
                         <div className="ticket-row discount">
                            <span><Zap size={14} style={{display:'inline'}}/> Pack Dúo aplicado</span>
                            <span>Ahorras $3.000/mes</span>
                         </div>
                      )}

                      <div className="ticket-total">
                         <div>
                            <span style={{fontSize:'0.8rem', color:'#64748b', textTransform:'uppercase', fontWeight:700}}>Total hoy</span>
                            <div className="big-price">{clp(totalFirstPayment)}</div>
                            <div style={{fontSize:'0.8rem', color:'#64748b', marginTop:4}}>Luego {clp(pricing.totalMonthly)} / mes</div>
                         </div>
                      </div>

                      <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{marginTop:24}}>
                         Inscribirme Ahora <ArrowRight size={18}/>
                      </button>
                      
                      <button onClick={handleAddToCart} className="btn btn-ghost">
                         Solo agregar al carrito
                      </button>

                      <div style={{marginTop:20, padding:15, background:'#f0fdf4', borderRadius:12, display:'flex', gap:10, alignItems:'start'}}>
                         <ShieldCheck size={18} color="#16a34a" style={{marginTop:2}}/>
                         <p style={{fontSize:'0.8rem', color:'#166534', lineHeight:1.4}}>
                            <strong>Garantía Total:</strong> Si la primera clase no te gusta, te devolvemos el 100% de tu dinero.
                         </p>
                      </div>
                   </>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* BARRA MÓVIL (STICKY BOTTOM) */}
      {selectedCourses.length > 0 && (
         <div className="mobile-bar">
            <div>
               <p style={{fontSize:'0.75rem', textTransform:'uppercase', color:'#64748b', fontWeight:700}}>Total a Pagar</p>
               <p style={{fontSize:'1.5rem', fontWeight:800, color:'#1e293b', lineHeight:1}}>{clp(totalFirstPayment)}</p>
            </div>
            <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{width:'auto', padding:'12px 24px'}}>
               Inscribirme
            </button>
         </div>
      )}

    </div>
  );
}