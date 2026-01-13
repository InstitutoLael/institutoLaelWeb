import React, { useState, useMemo, useRef } from "react";
import { useCart } from "../context/CartContext.jsx";
import SEOHead from "../components/SEOHead.jsx";
import MultiHello from "../components/MultiHello"; 

// 📦 ICONOS
import { 
  Check, Globe, MessageCircle, Award, 
  ArrowRight, PlayCircle, ShieldCheck, 
  X, Loader2, Sparkles, Users, ExternalLink,
  ChevronDown, ChevronUp, Zap
} from "lucide-react";

// 📊 DATOS
import { 
  LANGUAGES, 
  ENROLLMENT_FEE, 
  computeLangBundle, 
  clp 
} from "../data/idiomas.js";

const IMG_HERO = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

/* ==========================================================================
   ESTILOS CSS: MODO OSCURO + FIXES MÓVILES
   ========================================================================== */
const css = `
:root {
  /* PALETA DARK MODE */
  --bg-body: #020617;      /* Negro Azulado Profundo */
  --bg-surface: #0F172A;   /* Slate 900 */
  --bg-card: #1E293B;      /* Slate 800 */
  
  --primary: #6366F1;      /* Indigo 500 (Más brillante para dark) */
  --primary-glow: rgba(99, 102, 241, 0.4);
  
  --text-main: #F8FAFC;    /* Blanco Hielo */
  --text-muted: #94A3B8;   /* Gris Plateado */
  
  --border: rgba(255, 255, 255, 0.1);
  --border-hover: rgba(99, 102, 241, 0.5);
  
  --radius-xl: 32px;
  --radius-lg: 20px;
}

/* BASE RESET */
.lang-page { 
  background: var(--bg-body); 
  color: var(--text-main); 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  overflow-x: hidden; 
  padding-bottom: 120px; /* Espacio para la barra móvil */
}

.container { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* 1. HERO SECTION */
.hero { 
  min-height: 90vh; display: flex; align-items: center; position: relative; 
  background: radial-gradient(circle at top right, #1e1b4b 0%, #020617 60%);
  padding-top: 80px; overflow: hidden;
}
/* Blob brillante de fondo */
.hero-blob { 
  position: absolute; width: 60vw; height: 60vw; 
  background: linear-gradient(135deg, var(--primary), #A855F7); 
  filter: blur(120px); opacity: 0.15; border-radius: 50%; z-index: 0; 
}

.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.hero-badge { 
  display: inline-flex; align-items: center; gap: 8px; 
  background: rgba(99, 102, 241, 0.1); color: #818CF8; 
  padding: 8px 16px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; 
  margin-bottom: 24px; border: 1px solid rgba(99, 102, 241, 0.2); 
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.15);
}

.hero-title { 
  font-size: clamp(3rem, 5vw, 5rem); line-height: 1.05; font-weight: 800; 
  color: var(--text-main); margin-bottom: 24px; text-shadow: 0 0 40px rgba(0,0,0,0.5);
}

.hero-subtitle { font-size: clamp(1.1rem, 2vw, 1.3rem); color: var(--text-muted); line-height: 1.6; max-width: 90%; margin-bottom: 40px; }

.hero-stats { display: flex; gap: 40px; border-top: 1px solid var(--border); padding-top: 30px; margin-top: 40px; }
.stat-item strong { display: block; font-size: 2rem; font-weight: 800; color: white; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
.stat-item span { font-size: 0.9rem; color: var(--text-muted); }

.hero-img-wrapper { 
  position: relative; border-radius: var(--radius-xl); overflow: hidden; 
  box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid var(--border);
  transform: rotate(-2deg); transition: 0.5s ease; 
}
.hero-img-wrapper:hover { transform: rotate(0deg) scale(1.02); box-shadow: 0 0 50px var(--primary-glow); }
.hero-img { width: 100%; height: auto; display: block; filter: brightness(0.9); }

/* 2. LOGO STRIP (DARK) */
.logo-strip { padding: 40px 0; background: #0B0F19; border-bottom: 1px solid var(--border); text-align: center; }
.logo-grid { display: flex; justify-content: center; gap: 60px; opacity: 0.4; filter: grayscale(1) invert(1); flex-wrap: wrap; }

/* 3. BUILDER SECTION (Tarjetas) */
.builder-section { padding: 80px 0; background: var(--bg-body); border-top: 1px solid var(--border); }
.builder-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 60px; align-items: start; }
.lang-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }

.lang-card { 
  background: var(--bg-card); border: 2px solid var(--border); border-radius: 24px; padding: 24px; 
  cursor: pointer; transition: all 0.2s ease; position: relative; 
}
.lang-card:hover { border-color: var(--text-muted); transform: translateY(-4px); background: #273549; }
.lang-card.active { 
  border-color: var(--primary); background: rgba(99, 102, 241, 0.1); 
  box-shadow: 0 0 20px var(--primary-glow); 
}
.lang-card.redirect { border-color: #A855F7; background: rgba(168, 85, 247, 0.05); }
.lang-card.disabled { opacity: 0.5; cursor: not-allowed; border-style: dashed; }

.lvl-btn {
  flex: 1; border: none; background: transparent; color: var(--text-muted);
  border-radius: 8px; padding: 6px 0; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s;
}
.lvl-btn.selected { background: var(--primary); color: white; box-shadow: 0 2px 10px var(--primary-glow); }
.lvl-btn:hover:not(.selected) { background: rgba(255,255,255,0.05); color: white; }

/* PANEL RESUMEN (Desktop Sticky) */
.summary-panel { 
  position: sticky; top: 40px; background: var(--bg-surface); 
  border: 1px solid var(--border); border-radius: 32px; padding: 40px; 
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); 
}
.sp-title { font-size: 1.5rem; margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 20px; color: white; }
.sp-row { display: flex; justify-content: space-between; margin-bottom: 16px; color: var(--text-muted); }
.sp-row.highlight { color: #4ADE80; text-shadow: 0 0 10px rgba(74, 222, 128, 0.3); }

/* BOTÓN CTA GLOW */
.btn-cta { 
  width: 100%; background: var(--primary); color: white; border: none; padding: 20px; 
  border-radius: 16px; font-weight: 800; font-size: 1.1rem; cursor: pointer; 
  margin-top: 20px; transition: 0.3s; display: flex; justify-content: center; gap: 10px;
  box-shadow: 0 4px 20px var(--primary-glow);
}
.btn-cta:hover { transform: scale(1.02); background: #818CF8; box-shadow: 0 0 30px var(--primary-glow); }

/* 4. TABLA RESPONSIVE (SOLUCIÓN TABLE CORTADA) */
.comparison-section { padding: 100px 0; background: #050a15; }
.table-wrapper {
  width: 100%;
  overflow-x: auto; /* Scroll horizontal mágico */
  -webkit-overflow-scrolling: touch; /* Suavidad en iPhone */
  border-radius: 24px;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.comp-table { width: 100%; min-width: 600px; /* Ancho mínimo para forzar scroll */ border-collapse: separate; border-spacing: 0; }
.comp-table th, .comp-table td { padding: 20px 30px; text-align: left; border-bottom: 1px solid var(--border); color: var(--text-muted); }
.comp-table th { background: #111827; font-weight: 800; color: white; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
.comp-table td:nth-child(2) { background: rgba(99, 102, 241, 0.1); font-weight: 700; color: #A5B4FC; border-bottom-color: rgba(99, 102, 241, 0.2); }

/* 5. FAQ */
.faq-section { padding: 80px 0; max-width: 800px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-btn { width: 100%; text-align: left; padding: 24px 0; background: none; border: none; font-size: 1.2rem; font-weight: 700; color: white; cursor: pointer; display: flex; justify-content: space-between; }
.faq-content { max-height: 0; overflow: hidden; transition: 0.3s ease; color: var(--text-muted); }
.faq-content.open { max-height: 200px; margin-bottom: 24px; }

/* MODAL OSCURO */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0, 0.8); backdrop-filter: blur(10px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box { background: #1E293B; padding: 40px; border-radius: 24px; width: 100%; max-width: 500px; border: 1px solid var(--border); box-shadow: 0 0 50px rgba(0,0,0,0.8); color: white; }
.input-field { width: 100%; padding: 16px; background: #0F172A; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; color: white; }
.input-field:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3); }

/* BARRA MÓVIL (SOLUCIÓN STICKY) */
.mobile-sticky {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(15, 23, 42, 0.9); /* Transparencia Glass */
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
  padding: 16px 24px;
  z-index: 9990; /* Muy alto */
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

@media (max-width: 1024px) {
  .hero-grid, .builder-layout { grid-template-columns: 1fr; }
  .hero { text-align: center; padding-top: 120px; min-height: auto; padding-bottom: 60px; }
  .hero-img-wrapper { display: none; }
  .hero-stats { justify-content: center; flex-wrap: wrap; }
  .summary-panel { display: none; } /* Ocultar desktop */
  .mobile-sticky { display: flex; } /* Mostrar móvil */
}
`;

/* ==========================================================================
   FORMULARIO INSCRIPCIÓN (MODAL)
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
        body: JSON.stringify({
          ...formData,
          program: "Idiomas - " + planTitle,
          comments: `Cursos: ${selectedDetails} | Pago Inicial: ${price}`
        }),
      });
      setStatus("success");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="modal-overlay">
      <div className="modal-box" style={{textAlign:'center'}}>
        <div style={{width:80, height:80, background:'rgba(34, 197, 94, 0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px'}}>
          <Check size={40} color="#4ADE80"/>
        </div>
        <h2 style={{fontSize:'1.8rem', fontWeight:800, color:'#4ADE80', marginBottom:12}}>¡Cupo Reservado!</h2>
        <p style={{color:'#94A3B8', marginBottom:30}}>Te enviamos un correo con los accesos.</p>
        <button onClick={onClose} className="btn-cta" style={{marginTop:0}}>Entendido</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} style={{position:'absolute', top:20, right:20, background:'none', border:'none', cursor:'pointer', color:'white'}}><X size={24}/></button>
        <h3 style={{fontSize:'1.8rem', fontWeight:800, marginBottom:8}}>Finalizar Inscripción</h3>
        <div style={{background:'rgba(255,255,255,0.05)', padding:16, borderRadius:12, marginBottom:24, border:'1px solid var(--border)'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:4, color:'#94A3B8'}}>
             <span>Plan:</span> <strong style={{color:'white'}}>{planTitle}</strong>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', color:'#94A3B8'}}>
             <span>Total:</span> <strong style={{color:'white'}}>{price}</strong>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input className="input-field" placeholder="Nombre Completo" required onChange={e => setFormData({...formData, fullName: e.target.value})}/>
          <input className="input-field" placeholder="RUT / Pasaporte" required onChange={e => setFormData({...formData, rut: e.target.value})}/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
            <input className="input-field" type="email" placeholder="Correo" required onChange={e => setFormData({...formData, email: e.target.value})}/>
            <input className="input-field" type="tel" placeholder="+569..." required onChange={e => setFormData({...formData, phone: e.target.value})}/>
          </div>
          <button type="submit" className="btn-cta" disabled={status === 'loading'}>
            {status === 'loading' ? <Loader2 className="animate-spin"/> : <>Ir a Pagar <ArrowRight/></>}
          </button>
        </form>
      </div>
    </div>
  );
}

const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-btn" onClick={() => setIsOpen(!isOpen)}>
        {q} {isOpen ? <ChevronUp color="#6366F1"/> : <ChevronDown color="#64748B"/>}
      </button>
      <div className={`faq-content ${isOpen ? 'open' : ''}`}>{a}</div>
    </div>
  );
};

/* ==========================================================================
   PÁGINA PRINCIPAL
   ========================================================================== */
export default function Idiomas() {
  const { addToCart } = useCart ? useCart() : { addToCart: ()=>{} };
  const builderRef = useRef(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showModal, setShowModal] = useState(false);

  const safeLanguages = LANGUAGES && LANGUAGES.length > 0 ? LANGUAGES : [];
  
  const selectedCourses = useMemo(() => safeLanguages.filter(l => selectedIds.includes(l.id)), [selectedIds, safeLanguages]);
  const pricing = computeLangBundle(selectedCourses.length);
  const totalFirstPayment = pricing.totalMonthly + (selectedIds.length > 0 ? ENROLLMENT_FEE : 0);

  const toggleCourse = (l) => {
    if (l.comingSoon) return;
    if (l.isRedirect) {
      window.location.href = l.url;
      return;
    }
    setSelectedIds(prev => {
      if (prev.includes(l.id)) return prev.filter(x => x !== l.id);
      if (!selectedLevels[l.id]) setLevel(l.id, "A1");
      return [...prev, l.id];
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
      id: `pack-idiomas-${Date.now()}`,
      name: `Pack Idiomas: ${pricing.label}`,
      price: totalFirstPayment,
      category: 'Idiomas',
      details: [getDetailsString(), "Matrícula Incluida"]
    });
    alert("Agregado al Carrito");
  };

  return (
    <div className="lang-page">
      <style>{css}</style>
      <SEOHead title="Cursos de Idiomas | Lael Academy" description="Aprende Inglés, Coreano y LSCH." />

      {showModal && (
        <EnrollmentForm 
          planTitle={`Pack ${selectedCourses.length} Idiomas`}
          price={clp(totalFirstPayment)}
          selectedDetails={getDetailsString()}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* HERO DARK */}
      <section className="hero">
        <div className="hero-blob" style={{top:'-10%', right:'-10%'}}></div>
        <div className="container hero-grid">
          <div className="animate-in delay-100">
            <div className="hero-badge"><Zap size={16}/> Matrícula Anual 2026 Abierta</div>
            
            <h1 className="hero-title">
              <span style={{display:'block', fontSize:'0.4em', color:'#818CF8', fontWeight:700, marginBottom:10}}>
                <MultiHello />
              </span>
              No estudies idiomas, <br/>
              <span style={{background:'linear-gradient(to right, #818CF8, #C084FC)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Vívelos.</span>
            </h1>
            
            <p className="hero-subtitle">
              Inglés, Coreano, Lengua de Señas y más. Rompe barreras culturales con nuestra metodología de 
              <strong style={{color:'white'}}> Inmersión Cultural Activa</strong>.
            </p>
            
            <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
              <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-cta" style={{width:'auto', padding:'18px 40px', marginTop:0}}>
                Elegir Curso <ArrowRight/>
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item"><strong>+2.5k</strong> <span>Alumnos</span></div>
              <div className="stat-item"><strong>4.9/5</strong> <span>Valoración</span></div>
              <div className="stat-item"><strong>100%</strong> <span>Online</span></div>
            </div>
          </div>

          <div className="hero-img-wrapper animate-in delay-300">
            <img src={IMG_HERO} alt="Comunidad Global" className="hero-img" />
            
            {/* Elemento flotante oscuro */}
            <div style={{position:'absolute', bottom:40, left:-30, background:'#0F172A', border:'1px solid rgba(255,255,255,0.1)', padding:'20px 24px', borderRadius:20, boxShadow:'0 20px 40px rgba(0,0,0,0.5)', display:'flex', alignItems:'center', gap:15}}>
               <div style={{background:'rgba(22, 163, 74, 0.2)', padding:12, borderRadius:'50%', color:'#4ADE80'}}><Award size={24}/></div>
               <div>
                 <strong style={{display:'block', color:'white'}}>Certificado Oficial</strong>
                 <span style={{fontSize:'0.85rem', color:'#94A3B8'}}>Al completar nivel</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="logo-strip">
        <div className="container">
          <div className="logo-grid">
            <h3>GOOGLE</h3> <h3>LATAM</h3> <h3>MICROSOFT</h3> <h3>SAMSUNG</h3>
          </div>
        </div>
      </section>

      {/* BUILDER SECTION */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:60}}>
            <span style={{color:'#818CF8', fontWeight:800, textTransform:'uppercase', letterSpacing:2}}>Arma tu Pack</span>
            <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', margin:'10px 0'}}>Elige tu Desafío</h2>
          </div>

          <div className="builder-layout">
            <div className="lang-grid">
              {safeLanguages.map(l => {
                const isActive = selectedIds.includes(l.id);
                const levels = l.levels || [];
                const currentLvl = selectedLevels[l.id] || levels[0];

                return (
                  <div 
                    key={l.id} 
                    onClick={() => toggleCourse(l)}
                    className={`lang-card ${isActive ? 'active' : ''} ${l.comingSoon ? 'disabled' : ''} ${l.isRedirect ? 'redirect' : ''}`}
                  >
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:15}}>
                      <span style={{fontSize:'3rem'}}>{l.emoji}</span>
                      {isActive && <div style={{background:'var(--primary)', color:'white', borderRadius:'50%', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center'}}><Check size={14}/></div>}
                      {l.isRedirect && <div style={{background:'#A855F7', color:'white', borderRadius:'50%', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center'}}><ExternalLink size={14}/></div>}
                    </div>
                    
                    <h3 style={{fontSize:'1.4rem', fontWeight:800, marginBottom:8, color:'white'}}>{l.name}</h3>
                    <p style={{fontSize:'0.9rem', color:'#94A3B8', lineHeight:1.4, flexGrow:1, marginBottom:20}}>{l.summary}</p>

                    {!l.comingSoon && !l.isRedirect ? (
                      <div style={{background:'rgba(255,255,255,0.05)', borderRadius:10, padding:4, display:'flex', gap:4}} onClick={e => e.stopPropagation()}>
                        {levels.slice(0,3).map(lvl => (
                          <button key={lvl} className={`lvl-btn ${isActive && currentLvl === lvl ? 'selected' : ''}`} onClick={() => setLevel(l.id, lvl)}>
                            {lvl}
                          </button>
                        ))}
                      </div>
                    ) : l.isRedirect ? (
                      <div style={{background:'rgba(168, 85, 247, 0.1)', color:'#C084FC', padding:'8px', borderRadius:8, textAlign:'center', fontSize:'0.8rem', fontWeight:700}}>
                        VER DETALLES <ArrowRight size={12}/>
                      </div>
                    ) : (
                      <div style={{background:'rgba(245, 158, 11, 0.1)', color:'#FBBF24', padding:'8px', borderRadius:8, textAlign:'center', fontSize:'0.8rem', fontWeight:700}}>PRÓXIMAMENTE</div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* PANEL RESUMEN DESKTOP */}
            <div className="summary-panel">
               <h3 className="sp-title">Tu Resumen</h3>
               {selectedCourses.length === 0 ? (
                 <div style={{textAlign:'center', padding:'40px 0', opacity:0.5}}>
                   <Globe size={48} color="white" style={{margin:'0 auto 20px', opacity:0.5}}/>
                   <p style={{color:'#94A3B8'}}>Selecciona un curso</p>
                 </div>
               ) : (
                 <>
                   <div className="sp-row"><span>Matrícula</span><span>{clp(ENROLLMENT_FEE)}</span></div>
                   {selectedCourses.map((c, i) => (
                     <div key={c.id} className="sp-row">
                       <span>{c.name} ({selectedLevels[c.id]})</span>
                       <span>{i === 0 ? '$17.990' : '$15.000'}</span>
                     </div>
                   ))}
                   {pricing.saving > 0 && <div className="sp-row highlight"><span>Ahorro</span><span>-{clp(pricing.saving)}</span></div>}
                   
                   <div style={{marginTop:30, paddingTop:30, borderTop:'1px solid var(--border)', textAlign:'right'}}>
                     <span style={{fontSize:'0.8rem', opacity:0.7, color:'#94A3B8'}}>TOTAL HOY</span>
                     <span style={{fontSize:'3rem', fontWeight:800, display:'block', color:'white', textShadow:'0 0 20px rgba(255,255,255,0.2)'}}>{clp(totalFirstPayment)}</span>
                     <span style={{fontSize:'0.9rem', color:'#94A3B8'}}>Luego {clp(pricing.totalMonthly)}/mes</span>
                   </div>

                   <button onClick={() => setShowModal(true)} className="btn-cta">Inscribirme</button>
                   <button onClick={handleAddToCart} style={{width:'100%', padding:'15px', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'white', borderRadius:16, marginTop:12, cursor:'pointer'}}>Agregar al Carrito</button>
                 </>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE (CON SCROLL FIXED) */}
      <section className="comparison-section">
        <div className="container" style={{maxWidth:900}}>
          <h2 style={{fontSize:'2rem', fontWeight:800, color:'white', textAlign:'center', marginBottom:40}}>Lael vs Tradicional</h2>
          
          <div className="table-wrapper">
            <table className="comp-table">
              <thead>
                <tr>
                  <th style={{width:'40%'}}>Característica</th>
                  <th style={{width:'30%', color:'#818CF8'}}>LAEL ACADEMY</th>
                  <th style={{width:'30%', opacity:0.5}}>OTROS</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Enfoque</strong></td><td>Conversacional</td><td>Gramática</td></tr>
                <tr><td><strong>Alumnos</strong></td><td>Max 10-12</td><td>25+</td></tr>
                <tr><td><strong>Grabaciones</strong></td><td>Sí, HD 24/7</td><td>No</td></tr>
                <tr><td><strong>Certificación</strong></td><td>Incluida</td><td>Pago Extra</td></tr>
              </tbody>
            </table>
          </div>
          <p style={{textAlign:'center', marginTop:10, fontSize:'0.8rem', color:'#64748B', display:'block', opacity:0.7}}>Desliza para ver más →</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 style={{textAlign:'center', marginBottom:40, fontSize:'2rem', fontWeight:800, color:'white'}}>Preguntas Frecuentes</h2>
          <FaqItem q="¿Cómo funcionan las clases?" a="100% en vivo por Zoom con profesores expertos." />
          <FaqItem q="¿Entregan certificado?" a="Sí, digital y verificable al aprobar cada nivel." />
        </div>
      </section>

      {/* BARRA MÓVIL STICKY (CORREGIDA) */}
      {selectedCourses.length > 0 && (
         <div className="mobile-sticky">
            <div>
               <span style={{display:'block', fontSize:'0.7rem', textTransform:'uppercase', color:'#94A3B8', fontWeight:700}}>Total a Pagar</span>
               <span style={{fontSize:'1.5rem', fontWeight:800, color:'white', lineHeight:1, textShadow:'0 0 10px rgba(255,255,255,0.3)'}}>{clp(totalFirstPayment)}</span>
            </div>
            <button onClick={() => setShowModal(true)} style={{background:'var(--primary)', color:'white', border:'none', padding:'12px 24px', borderRadius:50, fontWeight:700, boxShadow:'0 0 15px var(--primary-glow)'}}>
               Inscribirme
            </button>
         </div>
      )}
    </div>
  );
}