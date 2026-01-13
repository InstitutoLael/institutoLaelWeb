import React, { useState, useMemo, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import SEOHead from "../components/SEOHead.jsx";
import MultiHello from "../components/MultiHello"; // Tu componente existente

// 📦 ICONOS
import { 
  Check, Globe, MessageCircle, Award, Star, 
  ArrowRight, Zap, PlayCircle, ShieldCheck, 
  X, Loader2, Sparkles, Languages, Users,
  BookOpen, Clock, HelpCircle, ChevronDown, ChevronUp
} from "lucide-react";

// 📊 DATOS
import { 
  LANGUAGES, 
  ENROLLMENT_FEE, 
  computeLangBundle, 
  clp,
  LANG_FEATURES // Asegúrate de tener esto en tu data o bórralo si da error (lo uso abajo)
} from "../data/idiomas.js";

// 🖼️ IMAGENES (Placeholders de alta calidad)
const IMG_HERO = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
const IMG_COMMUNITY = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

/* ==========================================================================
   ESTILOS CSS AVANZADOS (RESPONSIVE + TV + PROYECTOR)
   ========================================================================== */
const css = `
:root {
  --bg-body: #F8FAFC;
  --bg-surface: #FFFFFF;
  --primary: #4F46E5;
  --primary-dark: #4338CA;
  --text-main: #0F172A;
  --text-muted: #64748B;
  --accent: #8B5CF6;
  --success: #10B981;
  --radius-xl: 32px;
  --radius-lg: 20px;
  --shadow-card: 0 10px 30px -10px rgba(0,0,0,0.08);
  --shadow-glow: 0 0 40px rgba(79, 70, 229, 0.15);
}

/* BASE RESET */
.lang-page { background: var(--bg-body); color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
.container { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* ANIMACIONES */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-in { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

/* 1. HERO SECTION (Immersive) */
.hero { 
  min-height: 90vh; display: flex; align-items: center; position: relative; 
  background: radial-gradient(circle at top right, #EEF2FF 0%, #FFFFFF 60%);
  padding-top: 80px; overflow: hidden;
}
.hero-blob { position: absolute; width: 60vw; height: 60vw; background: linear-gradient(135deg, rgba(79,70,229,0.1), rgba(139,92,246,0.1)); filter: blur(80px); border-radius: 50%; z-index: 0; animation: pulse 10s infinite alternate; }
@keyframes pulse { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }

.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(79, 70, 229, 0.08); color: var(--primary); padding: 8px 16px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; margin-bottom: 24px; border: 1px solid rgba(79, 70, 229, 0.1); }
.hero-title { font-size: clamp(3.5rem, 6vw, 5.5rem); line-height: 1.05; font-weight: 800; letter-spacing: -0.03em; color: var(--text-main); margin-bottom: 24px; }
.hero-subtitle { font-size: clamp(1.1rem, 2vw, 1.35rem); color: var(--text-muted); line-height: 1.6; max-width: 90%; margin-bottom: 40px; }

.hero-stats { display: flex; gap: 40px; border-top: 1px solid #E2E8F0; padding-top: 30px; margin-top: 40px; }
.stat-item strong { display: block; font-size: 2rem; font-weight: 800; color: var(--text-main); line-height: 1; }
.stat-item span { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }

.hero-img-wrapper { position: relative; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-card); transform: rotate(-2deg); transition: 0.5s ease; }
.hero-img-wrapper:hover { transform: rotate(0deg) scale(1.02); box-shadow: var(--shadow-glow); }
.hero-img { width: 100%; height: auto; display: block; }

/* 2. LOGO STRIP (Social Proof) */
.logo-strip { padding: 40px 0; background: white; border-bottom: 1px solid #E2E8F0; text-align: center; }
.logo-text { font-size: 0.85rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; display: block; }
.logo-grid { display: flex; justify-content: center; gap: 60px; opacity: 0.5; filter: grayscale(1); flex-wrap: wrap; }

/* 3. VALUE PROPOSITION (Cards) */
.value-section { padding: 100px 0; background: var(--bg-body); }
.section-header { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.section-tag { color: var(--primary); font-weight: 800; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px; display: block; }
.section-title { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 16px; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.feature-card { background: white; padding: 40px; border-radius: var(--radius-lg); border: 1px solid #F1F5F9; transition: 0.3s; position: relative; overflow: hidden; }
.feature-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-card); border-color: var(--primary); }
.fc-icon { width: 60px; height: 60px; background: #EEF2FF; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--primary); margin-bottom: 24px; font-size: 24px; }
.fc-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 12px; }
.fc-desc { font-size: 1rem; color: var(--text-muted); line-height: 1.6; }

/* 4. THE BUILDER (Sticky Layout) */
.builder-section { padding: 80px 0; background: white; border-top: 1px solid #E2E8F0; }
.builder-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 60px; align-items: start; }

.lang-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.lang-card { 
  background: white; border: 2px solid #E2E8F0; border-radius: 24px; padding: 24px; cursor: pointer; 
  transition: all 0.2s ease; position: relative; display: flex; flex-direction: column; height: 100%;
}
.lang-card:hover { border-color: #CBD5E1; transform: translateY(-4px); }
.lang-card.active { border-color: var(--primary); background: #F5F3FF; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
.lang-card.disabled { opacity: 0.5; cursor: not-allowed; border-style: dashed; }

.summary-panel { position: sticky; top: 40px; background: #0F172A; color: white; border-radius: 32px; padding: 40px; box-shadow: 0 30px 60px -10px rgba(0,0,0,0.3); }
.sp-title { font-size: 1.5rem; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
.sp-row { display: flex; justify-content: space-between; margin-bottom: 16px; color: #94A3B8; font-size: 1rem; }
.sp-row.highlight { color: #4ADE80; font-weight: 600; }
.sp-total { margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); text-align: right; }
.sp-total-price { font-size: 3rem; font-weight: 800; line-height: 1; color: white; display: block; }

.btn-cta { width: 100%; background: var(--primary); color: white; border: none; padding: 20px; border-radius: 16px; font-weight: 800; font-size: 1.1rem; cursor: pointer; margin-top: 30px; transition: 0.2s; display: flex; justify-content: center; gap: 10px; }
.btn-cta:hover { background: var(--primary-dark); transform: scale(1.02); }

/* 5. COMPARISON TABLE */
.comparison-section { padding: 100px 0; background: #F8FAFC; }
.comp-table { width: 100%; border-collapse: separate; border-spacing: 0; background: white; border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-card); }
.comp-table th, .comp-table td { padding: 20px 30px; text-align: left; border-bottom: 1px solid #F1F5F9; }
.comp-table th { background: #F8FAFC; font-weight: 800; color: #1E293B; text-transform: uppercase; font-size: 0.8rem; }
.comp-table td:nth-child(2) { background: #F5F3FF; font-weight: 700; color: var(--primary); border-bottom-color: rgba(79,70,229,0.1); }

/* 6. FAQ (Acordeón) */
.faq-section { padding: 80px 0 120px; max-width: 800px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid #E2E8F0; }
.faq-btn { width: 100%; text-align: left; padding: 24px 0; background: none; border: none; font-size: 1.2rem; font-weight: 700; color: var(--text-main); cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.faq-content { max-height: 0; overflow: hidden; transition: 0.3s ease; color: var(--text-muted); line-height: 1.6; }
.faq-content.open { max-height: 200px; margin-bottom: 24px; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box { background: white; padding: 40px; border-radius: 24px; width: 100%; max-width: 500px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
.input-field { width: 100%; padding: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 16px; font-size: 1rem; }

/* MEDIA QUERIES PARA PANTALLAS GRANDES (TV/PROYECTOR) */
@media (min-width: 1800px) {
  .container { max-width: 1600px; }
  .hero-title { font-size: 6rem; }
  .hero-subtitle, .fc-desc, .comp-table td { font-size: 1.2rem; }
  .lang-grid { grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); }
}

/* RESPONSIVE MÓVIL */
@media (max-width: 1024px) {
  .hero-grid, .builder-layout { grid-template-columns: 1fr; }
  .hero { text-align: center; padding-top: 120px; min-height: auto; padding-bottom: 60px; }
  .hero-img-wrapper { display: none; } /* Ocultar imagen principal en móvil para limpiar */
  .hero-stats { justify-content: center; }
  .summary-panel { display: none; } /* Usar barra sticky móvil */
  .mobile-sticky { display: flex; }
}

.mobile-sticky { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #E2E8F0; padding: 16px 24px; z-index: 900; align-items: center; justify-content: space-between; box-shadow: 0 -5px 20px rgba(0,0,0,0.05); }
`;

/* ==========================================================================
   FORMULARIO DE INSCRIPCIÓN (Lógica Conectada)
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
        <div style={{width:80, height:80, background:'#DCFCE7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px'}}>
          <Check size={40} color="#16A34A"/>
        </div>
        <h2 style={{fontSize:'1.8rem', fontWeight:800, color:'#14532D', marginBottom:12}}>¡Cupo Reservado!</h2>
        <p style={{color:'#64748B', marginBottom:30, fontSize:'1.1rem'}}>
          Te enviamos un correo a <strong>{formData.email}</strong> con los accesos al aula y link de pago.
        </p>
        <button onClick={onClose} className="btn-cta" style={{marginTop:0}}>Entendido</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} style={{position:'absolute', top:20, right:20, background:'none', border:'none', cursor:'pointer'}}><X size={24} color="#94A3B8"/></button>
        <h3 style={{fontSize:'1.8rem', fontWeight:800, marginBottom:8}}>Finalizar Inscripción</h3>
        <div style={{background:'#F1F5F9', padding:16, borderRadius:12, marginBottom:24, fontSize:'0.95rem', color:'#475569'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
            <span>Plan Seleccionado:</span>
            <strong>{planTitle}</strong>
          </div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <span>Total a Pagar Hoy:</span>
            <strong style={{color:'#0F172A'}}>{price}</strong>
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

/* ==========================================================================
   COMPONENTES DE SECCIÓN (Para mantener orden)
   ========================================================================== */
const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-btn" onClick={() => setIsOpen(!isOpen)}>
        {q} {isOpen ? <ChevronUp color="#4F46E5"/> : <ChevronDown color="#CBD5E1"/>}
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

  // ESTADOS
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showModal, setShowModal] = useState(false);

  // LÓGICA DE NEGOCIO
  const safeLanguages = LANGUAGES || [];
  const selectedCourses = useMemo(() => safeLanguages.filter(l => selectedIds.includes(l.id)), [selectedIds, safeLanguages]);
  const pricing = computeLangBundle(selectedCourses.length);
  const totalFirstPayment = pricing.totalMonthly + (selectedIds.length > 0 ? ENROLLMENT_FEE : 0);

  // HANDLERS
  const toggleCourse = (id, isComingSoon) => {
    if (isComingSoon) return;
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
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
      <SEOHead title="Cursos de Idiomas Premium | Lael Academy" description="Aprende Inglés, Coreano y más con metodología inmersiva." />

      {/* MODAL INSCRIPCIÓN */}
      {showModal && (
        <EnrollmentForm 
          planTitle={`Pack ${selectedCourses.length} Idiomas`}
          price={clp(totalFirstPayment)}
          selectedDetails={getDetailsString()}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* 1. HERO MASSIVE SECTION */}
      <section className="hero">
        <div className="hero-blob" style={{top:'-10%', right:'-10%'}}></div>
        <div className="container hero-grid">
          <div className="animate-in delay-100">
            <div className="hero-badge">
              <Sparkles size={16}/> Matrícula Anual 2026 Abierta
            </div>
            <h1 className="hero-title">
              <span style={{display:'block', fontSize:'0.4em', color:'#4F46E5', fontWeight:700, marginBottom:10}}>
                <MultiHello />
              </span>
              No estudies inglés, <br/>
              <span style={{background:'linear-gradient(to right, #4F46E5, #9333EA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Vívelo.</span>
            </h1>
            <p className="hero-subtitle">
              La metodología tradicional de gramática ha fallado. En Lael usamos 
              <strong> Inmersión Cultural Activa</strong>. Aprende hablando de lo que amas: 
              Negocios, Viajes, Cine y Cultura.
            </p>
            
            <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
              <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-cta" style={{width:'auto', padding:'18px 40px', marginTop:0}}>
                Empezar Ahora <ArrowRight/>
              </button>
              <button className="btn-cta" style={{width:'auto', background:'white', color:'#0F172A', border:'1px solid #E2E8F0', padding:'18px 30px', marginTop:0}}>
                <PlayCircle size={20}/> Ver Clase Demo
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <strong>+2.5k</strong> <span>Alumnos</span>
              </div>
              <div className="stat-item">
                <strong>4.9/5</strong> <span>Valoración</span>
              </div>
              <div className="stat-item">
                <strong>100%</strong> <span>Online</span>
              </div>
            </div>
          </div>

          <div className="hero-img-wrapper animate-in delay-300">
            <img src={IMG_HERO} alt="Comunidad Global" className="hero-img" />
            
            {/* Floating Elements */}
            <div style={{position:'absolute', bottom:40, left:-30, background:'white', padding:'20px 24px', borderRadius:20, boxShadow:'0 20px 40px rgba(0,0,0,0.1)', display:'flex', alignItems:'center', gap:15}}>
               <div style={{background:'#DCFCE7', padding:12, borderRadius:'50%', color:'#16A34A'}}><Award size={24}/></div>
               <div>
                 <strong style={{display:'block', color:'#0F172A'}}>Certificado Oficial</strong>
                 <span style={{fontSize:'0.85rem', color:'#64748B'}}>Al completar nivel</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO STRIP */}
      <section className="logo-strip">
        <div className="container">
          <span className="logo-text">Nuestros alumnos trabajan en</span>
          <div className="logo-grid">
            <h3>GOOGLE</h3> <h3>LATAM</h3> <h3>MICROSOFT</h3> <h3>SAMSUNG</h3> <h3>UBER</h3>
          </div>
        </div>
      </section>

      {/* 3. VALUE / METHODOLOGY */}
      <section className="value-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Metodología Lael</span>
            <h2 className="section-title">¿Por qué es diferente?</h2>
            <p style={{color:'#64748B', fontSize:'1.1rem'}}>
              Rompemos el esquema de "Libro de Texto" para enfocarnos en la competencia comunicativa real.
            </p>
          </div>

          <div className="features-grid">
             <div className="feature-card">
               <div className="fc-icon"><MessageCircle/></div>
               <h3 className="fc-title">Speaking First</h3>
               <p className="fc-desc">Desde el día 1, el 70% de la clase es conversación. La gramática se deduce, no se memoriza.</p>
             </div>
             <div className="feature-card">
               <div className="fc-icon"><Globe/></div>
               <h3 className="fc-title">Cultural Intelligence</h3>
               <p className="fc-desc">No solo idioma. Aprende etiqueta de negocios en Asia o slang callejero en USA.</p>
             </div>
             <div className="feature-card">
               <div className="fc-icon"><Users/></div>
               <h3 className="fc-title">Grupos Reducidos</h3>
               <p className="fc-desc">Máximo 10 personas por sala para asegurar tu participación activa en cada sesión.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. THE BUILDER (CORE) */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Arma tu Pack</span>
            <h2 className="section-title">Elige tus Idiomas</h2>
            <p style={{fontSize:'1.1rem', color:'#64748B'}}>
              Selecciona 1 o más cursos. Si eliges 2, obtienes tarifa preferencial de <strong>Bundle Dúo</strong>.
            </p>
          </div>

          <div className="builder-layout">
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
                    className={`lang-card ${isActive ? 'active' : ''} ${l.comingSoon ? 'disabled' : ''}`}
                  >
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:15}}>
                      <span style={{fontSize:'3rem'}}>{l.emoji}</span>
                      {isActive && <div style={{background:'var(--primary)', color:'white', borderRadius:'50%', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center'}}><Check size={14}/></div>}
                    </div>
                    
                    <h3 style={{fontSize:'1.4rem', fontWeight:800, marginBottom:8}}>{l.name}</h3>
                    <p style={{fontSize:'0.9rem', color:'#64748B', lineHeight:1.4, flexGrow:1, marginBottom:20}}>{l.summary}</p>

                    {!l.comingSoon ? (
                       <div style={{background:'#F1F5F9', borderRadius:10, padding:4, display:'flex', gap:4}} onClick={e => e.stopPropagation()}>
                         {levels.slice(0,3).map(lvl => (
                           <button 
                             key={lvl} 
                             className={`lvl-btn ${isActive && currentLvl === lvl ? 'selected' : ''}`}
                             style={{
                               flex:1, border:'none', background: isActive && currentLvl === lvl ? 'var(--primary)' : 'transparent', 
                               color: isActive && currentLvl === lvl ? 'white' : '#64748B', borderRadius:8, padding:'6px 0', fontSize:'0.75rem', fontWeight:700, cursor:'pointer'
                             }}
                             onClick={() => setLevel(l.id, lvl)}
                           >
                             {lvl}
                           </button>
                         ))}
                       </div>
                    ) : (
                      <div style={{background:'#FEF3C7', color:'#B45309', padding:'8px', borderRadius:8, textAlign:'center', fontSize:'0.8rem', fontWeight:700}}>PRÓXIMAMENTE</div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* PANEL RESUMEN (STICKY DESKTOP) */}
            <div className="summary-panel">
               <h3 className="sp-title">Tu Resumen</h3>
               
               {selectedCourses.length === 0 ? (
                 <div style={{textAlign:'center', padding:'40px 0', opacity:0.5}}>
                   <Globe size={48} style={{margin:'0 auto 20px'}}/>
                   <p>Selecciona un curso a la izquierda</p>
                 </div>
               ) : (
                 <>
                   <div className="sp-row">
                     <span>Matrícula Anual</span>
                     <span>{clp(ENROLLMENT_FEE)}</span>
                   </div>
                   {selectedCourses.map((c, i) => (
                     <div key={c.id} className="sp-row">
                       <span>{c.name} ({selectedLevels[c.id]})</span>
                       <span>{i === 0 ? '$17.990' : '$15.000'}</span>
                     </div>
                   ))}
                   {pricing.saving > 0 && (
                     <div className="sp-row highlight">
                       <span>Ahorro Bundle</span>
                       <span>-{clp(pricing.saving)}</span>
                     </div>
                   )}
                   
                   <div className="sp-total">
                     <span style={{textTransform:'uppercase', fontSize:'0.8rem', opacity:0.7, letterSpacing:1}}>Total a Pagar Hoy</span>
                     <span className="sp-total-price">{clp(totalFirstPayment)}</span>
                     <span style={{fontSize:'0.9rem', opacity:0.7, display:'block', marginTop:5}}>Luego {clp(pricing.totalMonthly)} / mes</span>
                   </div>

                   <button onClick={() => setShowModal(true)} className="btn-cta">
                     Inscribirme Ahora
                   </button>
                   <button onClick={handleAddToCart} style={{width:'100%', padding:'15px', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'white', borderRadius:16, marginTop:12, cursor:'pointer'}}>
                     Agregar al Carrito
                   </button>
                 </>
               )}
               
               <div style={{marginTop:24, fontSize:'0.85rem', opacity:0.6, lineHeight:1.5, display:'flex', gap:10}}>
                 <ShieldCheck size={24}/>
                 <p>Garantía de Satisfacción de 7 días. Si no te gusta, te devolvemos el dinero.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE */}
      <section className="comparison-section">
        <div className="container" style={{maxWidth:900}}>
          <div className="section-header">
            <h2 className="section-title">Lael vs Tradicional</h2>
          </div>
          <table className="comp-table">
            <thead>
              <tr>
                <th style={{width:'40%'}}>Característica</th>
                <th style={{width:'30%', color:'var(--primary)', fontSize:'1rem'}}>LAEL ACADEMY</th>
                <th style={{width:'30%', opacity:0.5}}>OTROS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Enfoque</strong></td>
                <td>100% Conversacional</td>
                <td>Gramática y Libros</td>
              </tr>
              <tr>
                <td><strong>Alumnos por clase</strong></td>
                <td>Max 10-12</td>
                <td>25 a 40</td>
              </tr>
              <tr>
                <td><strong>Grabaciones</strong></td>
                <td>HD Disponible 24/7</td>
                <td>No Disponible</td>
              </tr>
              <tr>
                <td><strong>Certificación</strong></td>
                <td>Incluida</td>
                <td>Pago Extra</td>
              </tr>
              <tr>
                <td><strong>Materiales</strong></td>
                <td>Digital Interactivo</td>
                <td>Fotocopias / PDF</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom:40}}>Preguntas Frecuentes</h2>
          <FaqItem q="¿Cómo funcionan las clases en vivo?" a="Todas las clases son por Zoom o Google Meet en tiempo real. Interactúas con el profesor y compañeros, haces ejercicios en vivo y recibes feedback inmediato." />
          <FaqItem q="¿Qué pasa si falto a una clase?" a="No te preocupes. Todas las sesiones quedan grabadas en tu Aula Virtual y puedes verlas cuando quieras para ponerte al día." />
          <FaqItem q="¿Entregan certificado?" a="Sí, al finalizar cada nivel y aprobar el examen final, recibes un certificado digital verificable que puedes añadir a tu LinkedIn." />
          <FaqItem q="¿Cómo funciona el pago mensual?" a="Pagas tu matrícula y primer mes al inscribirte. Luego, te enviaremos un link de pago seguro cada mes. Sin contratos forzosos, puedes cancelar cuando quieras avisando con 15 días de anticipación." />
        </div>
      </section>

      {/* BARRA MÓVIL STICKY */}
      {selectedCourses.length > 0 && (
         <div className="mobile-sticky">
            <div>
               <span style={{display:'block', fontSize:'0.7rem', textTransform:'uppercase', color:'#64748B', fontWeight:700}}>Total Hoy</span>
               <span style={{fontSize:'1.4rem', fontWeight:800, color:'#1E293B', lineHeight:1}}>{clp(totalFirstPayment)}</span>
            </div>
            <button onClick={() => setShowModal(true)} style={{background:'var(--primary)', color:'white', border:'none', padding:'12px 24px', borderRadius:50, fontWeight:700, boxShadow:'0 4px 12px rgba(79,70,229,0.3)'}}>
               Inscribirme
            </button>
         </div>
      )}
    </div>
  );
}