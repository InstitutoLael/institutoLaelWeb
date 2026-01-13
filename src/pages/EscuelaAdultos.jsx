import React, { useState, useRef } from "react";
import SEOHead from "../components/SEOHead"; 

// 📦 ICONOS (Lucide React)
import { 
  BookOpen, Video, Heart, Award, Check, 
  MessageCircle, ChevronDown, GraduationCap, 
  ShieldCheck, X, Loader2, ArrowRight, User, Star
} from "lucide-react";

// 🖼️ IMAGEN (Asegúrate de que la ruta sea correcta)
import HeroImg from "../assets/img/lael/study-online.jpg"; 

/* ==========================================================================
   CONFIGURACIÓN Y DATOS
   ========================================================================== */
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev";

const PLANS = [
  {
    id: "solidario",
    title: "Beca 100%",
    subtitle: "Cupos Limitados",
    price: 0,
    desc: "Para quienes tienen el coraje de volver a intentar, pero hoy no cuentan con los recursos económicos.",
    features: ["Clases Grabadas (Cápsulas)", "Material PDF al WhatsApp", "Inscripción a Exámenes Libres", "Tutoría Grupal Mensual"],
    cta: "Postular a Gratuidad",
    color: "#fbbf24", // Dorado
    isScholarship: true
  },
  {
    id: "completo",
    title: "Plan Padrino",
    subtitle: "Tu matrícula financia una beca",
    price: 15000,
    frequency: "mensual",
    desc: "Recibes una preparación premium y permites que un estudiante sin recursos pueda estudiar gratis.",
    features: ["Clases en Vivo + Grabadas", "Tutoría Personalizada 1 a 1", "Ensayos de Examen Reales", "Gestión de Trámites Mineduc", "Certificado de Participación"],
    cta: "Quiero ser Padrino",
    color: "#2dd4bf", // Teal
    isScholarship: false
  }
];

const FAQS = [
  { q: "¿El certificado es válido por el Mineduc?", a: "Absolutamente. Nosotros te preparamos para rendir los 'Exámenes Libres'. Al aprobarlos en el colegio examinador que te asigne el Mineduc, obtienes tu Licencia de Enseñanza Media válida para trabajar, estudiar técnico o universidad." },
  { q: "¿Qué pasa si trabajo por turnos?", a: "El sistema está hecho para ti. Aunque el Plan Padrino tiene clases en vivo, TODO queda grabado y se envía por WhatsApp. Puedes estudiar a las 3 de la mañana si lo necesitas." },
  { q: "¿Necesito computador?", a: "No. Sabemos que no todos tienen uno. Todo nuestro material (PDFs, Videos, Guías) está optimizado para verse perfecto en cualquier celular con internet básico." },
  { q: "¿Cuánto dura el proceso?", a: "Los exámenes del Mineduc suelen ser en dos fechas al año (aprox. junio y octubre). Nosotros te preparamos intensivamente durante 3 a 5 meses antes de la fecha." },
];

const clp = (val) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(val);

/* ==========================================================================
   ESTILOS CSS (DARK MODE & GLASSMORPHISM PREMIUM)
   ========================================================================== */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');

:root {
  --bg-deep: #050505;
  --bg-panel: #18181b;
  --text-main: #ffffff;
  --text-muted: #a1a1aa;
  --gold: #fbbf24;
  --teal: #2dd4bf;
  --border: rgba(255, 255, 255, 0.1);
  --font-main: 'Plus Jakarta Sans', system-ui, sans-serif;
}

* { box-sizing: border-box; }

.adultos-page {
  background-color: var(--bg-deep);
  background-image: radial-gradient(circle at 50% 0%, #1a1a2e 0%, var(--bg-deep) 60%);
  color: var(--text-main);
  font-family: var(--font-main);
  min-height: 100vh;
  padding-bottom: 120px;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { all: unset; cursor: pointer; box-sizing: border-box; transition: all 0.2s ease; }

/* ANIMACIONES */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* EFECTO VIDRIO FLOTANTE */
.glass-card {
  background: rgba(20, 20, 23, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* HERO */
.hero {
  padding: 160px 0 100px;
  position: relative;
}
.hero::before {
  content: ''; position: absolute; top: -100px; right: -100px; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.badge-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border);
  color: var(--gold); padding: 8px 16px; border-radius: 50px;
  font-weight: 700; font-size: 0.8rem; letter-spacing: 0.5px; margin-bottom: 24px;
  text-transform: uppercase;
}

h1 { 
  font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 24px; 
  font-weight: 800; color: white; letter-spacing: -0.02em;
}
.hero p { 
  font-size: 1.15rem; color: var(--text-muted); line-height: 1.7; 
  margin-bottom: 40px; max-width: 520px; 
}

.img-wrapper { position: relative; padding: 10px; animation: fadeIn 1s ease-out; }
.img-wrapper img { 
  width: 100%; border-radius: 24px; display: block; 
  filter: brightness(0.9) contrast(1.1); 
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  border: 1px solid var(--border);
}
.floating-badge {
  position: absolute; bottom: 40px; left: -30px;
  padding: 16px 24px; display: flex; align-items: center; gap: 15px;
  animation: float 6s ease-in-out infinite; background: rgba(10,10,10,0.9);
}

/* CARDS */
.grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-box { padding: 32px; transition: 0.3s; height: 100%; display: flex; flex-direction: column; }
.feature-box:hover { 
  border-color: rgba(255,255,255,0.2); 
  transform: translateY(-5px); 
  background: rgba(255,255,255,0.03); 
}

/* PRICING */
.pricing-section { padding: 80px 0; position: relative; }
.plan-card {
  display: flex; flex-direction: column; height: 100%; position: relative; 
  overflow: hidden; padding: 40px 32px; transition: 0.3s;
}
.plan-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }

.plan-tag {
  position: absolute; top: 0; right: 0; padding: 8px 16px;
  background: var(--gold); color: black; font-weight: 800; font-size: 0.75rem;
  border-bottom-left-radius: 16px; text-transform: uppercase; letter-spacing: 0.05em;
}

.plan-header { margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 30px; }
.plan-price { font-size: 3rem; font-weight: 800; color: white; margin: 10px 0 0; line-height: 1; }
.plan-freq { font-size: 0.9rem; color: var(--text-muted); font-weight: 500; }
.plan-features { list-style: none; padding: 0; margin: 0 0 30px 0; flex-grow: 1; }
.plan-features li { display: flex; gap: 12px; margin-bottom: 16px; color: #d4d4d8; font-size: 0.95rem; align-items: flex-start; line-height: 1.4; }

.btn-main {
  width: 100%; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 1rem;
  display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.3s;
  background: white; color: black; letter-spacing: -0.01em;
}
.btn-main:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: white; }
.btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
  z-index: 999; display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: fadeIn 0.3s ease-out;
}
.modal-form { width: 100%; max-width: 480px; position: relative; max-height: 90vh; overflow-y: auto; background: #121212; border: 1px solid rgba(255,255,255,0.1); }
.form-group { margin-bottom: 20px; }
.form-label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.form-input { 
  width: 100%; background: #0a0a0a; border: 1px solid var(--border); 
  padding: 16px; border-radius: 12px; color: white; outline: none; transition: 0.3s;
  font-family: inherit; font-size: 0.95rem;
}
.form-input:focus { border-color: var(--teal); background: black; }
.close-btn { position: absolute; top: 20px; right: 20px; color: var(--text-muted); padding: 5px; border-radius: 50%; background: rgba(255,255,255,0.05); }
.close-btn:hover { color: white; background: rgba(255,255,255,0.1); }

/* FAQ */
.faq-item { border: 1px solid var(--border); border-radius: 16px; background: rgba(255,255,255,0.02); margin-bottom: 12px; overflow: hidden; transition: 0.3s; }
.faq-item:hover { background: rgba(255,255,255,0.04); }
.faq-head { padding: 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: white; font-weight: 600; font-size: 1.05rem; }
.faq-body { padding: 0 24px 24px; color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; border-top: 1px solid transparent; }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
  .img-wrapper { display: none; } 
  .hero { padding-top: 120px; }
  .floating-badge { display: none; }
  h1 { font-size: 2.5rem; }
}
`;

/* ==========================================================================
   FORMULARIO DE REGISTRO (CONECTADO A WORKER)
   ========================================================================== */
const EnrollmentForm = ({ plan, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    comments: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        rut: formData.rut,
        email: formData.email,
        phone: formData.phone,
        program: `Caminos - ${plan.title}`,
        comments: `Motivo/Situación: ${formData.comments || 'No especificado'}`
      };

      const response = await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStep(3); // Éxito
      } else {
        alert("Ocurrió un error temporal. Por favor intenta nuevamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Revisa tu internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    // Mensaje personalizado según el plan
    const msg = plan.isScholarship 
      ? `Hola, acabo de postular a la Beca 100% del Programa Caminos (Adultos). Mi nombre es ${formData.fullName}. Quedo atento/a.`
      : `Hola, me inscribí en el Plan Padrino del Programa Caminos. Quiero coordinar mi matrícula para empezar. Mi nombre es ${formData.fullName}.`;
      
    window.open(`https://wa.me/56964626568?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-form">
        <button onClick={onClose} className="close-btn"><X size={20}/></button>

        <div style={{padding: '32px'}}>
          {/* PASO 1: Formulario */}
          {step === 1 && (
            <form onSubmit={handleSubmit}>
              <div style={{textAlign:'center', marginBottom:30}}>
                <div style={{
                    width:64, height:64, background: `linear-gradient(135deg, ${plan.color}20, transparent)`, 
                    border: `1px solid ${plan.color}40`, borderRadius:'50%', 
                    display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color: plan.color
                }}>
                  {plan.isScholarship ? <Heart size={30} fill="currentColor" fillOpacity={0.2}/> : <Star size={30} fill="currentColor" fillOpacity={0.2}/>}
                </div>
                <h2 style={{fontSize:'1.6rem', fontWeight:800, margin:0, color:'white', letterSpacing:'-0.02em'}}>
                  {plan.isScholarship ? "Postulación a Beca" : "Matrícula Solidaria"}
                </h2>
                <p style={{color:'var(--text-muted)', fontSize:'0.9rem', marginTop:8, lineHeight:1.5}}>
                  {plan.isScholarship 
                    ? "Completa tus datos con honestidad. Los cupos son limitados." 
                    : "Gracias por invertir en tu futuro y apoyar a la comunidad."}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input required className="form-input" placeholder="Tu nombre real" 
                  onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div className="form-group">
                 <label className="form-label">RUT</label>
                 <input required className="form-input" placeholder="12.345.678-9" 
                  onChange={e => setFormData({...formData, rut: e.target.value})} />
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20}}>
                <div>
                  <label className="form-label">Correo</label>
                  <input required type="email" className="form-input" placeholder="nombre@mail.com" 
                    onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">WhatsApp</label>
                  <input required type="tel" className="form-input" placeholder="+569..." 
                    onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                    {plan.isScholarship ? "Cuéntanos tu situación (Importante)" : "¿Alguna duda antes de partir?"}
                </label>
                <textarea 
                  required={plan.isScholarship} 
                  className="form-input" rows="3" 
                  placeholder={plan.isScholarship ? "Ej: Estoy cesante, cuido a mis hijos sola, necesito el certificado para trabajar..." : "Opcional"} 
                  onChange={e => setFormData({...formData, comments: e.target.value})} 
                />
              </div>

              <button type="submit" className="btn-main" disabled={loading} style={{background: plan.color, color: 'black', width:'100%'}}>
                {loading ? <Loader2 className="animate-spin" size={20}/> : (plan.isScholarship ? "Enviar Postulación" : "Continuar")}
              </button>
            </form>
          )}

          {/* PASO 3: Éxito */}
          {step === 3 && (
            <div style={{textAlign:'center', padding:'30px 0'}}>
              <div style={{width:80, height:80, background:'rgba(34, 197, 94, 0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', border:'1px solid rgba(34, 197, 94, 0.3)'}}>
                <Check size={40} color="#22c55e"/>
              </div>
              <h3 style={{color:'white', fontSize:'1.8rem', margin:0, fontWeight:800}}>¡Recibido!</h3>
              
              <p style={{color:'var(--text-muted)', margin:'16px 0 30px', lineHeight:1.6}}>
                {plan.isScholarship 
                  ? "Tus antecedentes han entrado a revisión por nuestro comité social. Te contactaremos al WhatsApp ingresado si eres seleccionado/a."
                  : "Ya tenemos tus datos. El siguiente paso es formalizar tu matrícula a través de nuestro WhatsApp oficial."}
              </p>

              <button onClick={handleWhatsAppRedirect} className="btn-main" style={{background:'#25D366', color:'white', border:'none'}}>
                 <MessageCircle size={20}/> {plan.isScholarship ? "Consultar Estado" : "Finalizar Matrícula"}
              </button>
              
              <button onClick={onClose} style={{marginTop:16, fontSize:'0.9rem', color:'var(--text-muted)', textDecoration:'underline'}}>
                Volver al sitio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */
export default function EscuelaAdultos() {
  const [selectedPlan, setSelectedPlan] = useState(null); 
  const [activeFaq, setActiveFaq] = useState(null);
  const pricingRef = useRef(null);

  return (
    <div className="adultos-page">
      <style>{css}</style>
      <SEOHead title="Nivelación de Estudios Adultos | Programa Caminos" description="Termina tu 4to medio gratis o pagando. Clases flexibles y humanas." />

      {selectedPlan && (
        <EnrollmentForm 
            plan={selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
        />
      )}

      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge-pill animate-fade">
              <GraduationCap size={16}/> Programa Caminos 2026
            </div>
            <h1>
              Tu historia no define<br/>
              <span style={{background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>tu futuro.</span>
            </h1>
            <p>
              Nunca es tarde para terminar tu enseñanza básica o media. 
              Sin juicios, sin miedo y a tu propio ritmo. Diseñado por humanos, para humanos que trabajan o cuidan familia.
            </p>
            <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
              <button 
                onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} 
                className="btn-main" 
                style={{width:'auto', padding:'16px 32px', background: 'white', color:'black'}}
              >
                Ver Opciones de Ingreso <ArrowRight size={18}/>
              </button>
            </div>
          </div>
          
          <div className="img-wrapper">
             <img src={HeroImg} alt="Estudiante Adulto logrando sus metas" onError={(e) => e.target.style.display = 'none'} />
             <div className="glass-card floating-badge">
                <div style={{background:'rgba(255,255,255,0.1)', padding:12, borderRadius:12, color:'var(--gold)'}}>
                  <ShieldCheck size={28} />
                </div>
                <div>
                   <strong style={{color:'white', display:'block', fontSize:'0.95rem'}}>Validez Oficial</strong>
                   <span style={{color:'var(--text-muted)', fontSize:'0.75rem'}}>Exámenes Libres Mineduc</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS (CARDS FLOTANTES) */}
      <section className="container" style={{marginTop:'-80px', position:'relative', zIndex:5, marginBottom:120}}>
        <div className="grid-cards">
          <div className="glass-card feature-box">
             <div style={{marginBottom:24, color:'var(--teal)'}}><Video size={36}/></div>
             <h3 style={{color:'white', marginBottom:12, fontSize:'1.25rem'}}>Clases a tu Ritmo</h3>
             <p style={{color:'var(--text-muted)', lineHeight:1.6, flexGrow:1}}>
               ¿Turnos rotativos? ¿Hijos en casa? No importa. Las clases quedan grabadas y se envían cortas y precisas. Estudia cuando puedas.
             </p>
          </div>
          <div className="glass-card feature-box">
             <div style={{marginBottom:24, color:'var(--gold)'}}><MessageCircle size={36}/></div>
             <h3 style={{color:'white', marginBottom:12, fontSize:'1.25rem'}}>Todo por WhatsApp</h3>
             <p style={{color:'var(--text-muted)', lineHeight:1.6, flexGrow:1}}>
               No necesitas un computador costoso. Te enviamos las guías, lecturas y videos directo a tu celular de forma ordenada.
             </p>
          </div>
          <div className="glass-card feature-box">
             <div style={{marginBottom:24, color:'#f472b6'}}><Heart size={36}/></div>
             <h3 style={{color:'white', marginBottom:12, fontSize:'1.25rem'}}>Pedagogía del Afecto</h3>
             <p style={{color:'var(--text-muted)', lineHeight:1.6, flexGrow:1}}>
               Tutores pacientes que entienden que llevas años sin estudiar. Aquí nadie se burla si te equivocas; aquí celebramos que lo intentes.
             </p>
          </div>
        </div>
      </section>

      {/* 3. PLANES (SOLIDARIDAD) */}
      <section ref={pricingRef} className="pricing-section container">
        <div style={{textAlign:'center', marginBottom:60}}>
          <h2 style={{fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:800, color:'white', marginBottom:20}}>Modelo Solidario</h2>
          <p style={{color:'var(--text-muted)', maxWidth:'650px', margin:'0 auto', fontSize:'1.1rem'}}>
            Creemos que la educación es un derecho humano. Hemos creado un sistema donde 
            quienes pueden pagar, apadrinan a quienes no pueden.
          </p>
        </div>

        <div className="grid-cards" style={{maxWidth:960, margin:'0 auto'}}>
          
          {/* PLAN BECA */}
          <div className="glass-card plan-card" style={{borderStyle:'dashed', borderColor: 'rgba(251, 191, 36, 0.3)'}}>
             <div className="plan-header">
                <h3 style={{color: '#fbbf24', fontSize:'1.5rem', fontWeight:800, display:'flex', alignItems:'center', gap:10}}>
                  <Award size={24}/> Beca Social
                </h3>
                <p style={{color:'#d4d4d8', fontSize:'0.9rem', marginTop:8}}>Para luchadores sin recursos actuales.</p>
                <div className="plan-price" style={{color:'#fbbf24'}}>$0</div>
                <div className="plan-freq">Costo $0 / mes</div>
             </div>
             
             <ul className="plan-features">
                <li><Check size={18} color="#fbbf24" style={{minWidth:18}}/> Cápsulas grabadas al WhatsApp</li>
                <li><Check size={18} color="#fbbf24" style={{minWidth:18}}/> Guías de estudio en PDF</li>
                <li><Check size={18} color="#fbbf24" style={{minWidth:18}}/> Tutoría Grupal 1 vez al mes</li>
                <li><Check size={18} color="#fbbf24" style={{minWidth:18}}/> Inscripción Exámenes Mineduc</li>
             </ul>

             <button 
               onClick={() => setSelectedPlan(PLANS[0])}
               className="btn-main btn-outline"
               style={{borderColor: '#fbbf24', color: '#fbbf24'}}
             >
               Postular a Gratuidad
             </button>
          </div>

          {/* PLAN PADRINO */}
          <div className="glass-card plan-card" style={{borderColor: '#2dd4bf', background:'rgba(45, 212, 191, 0.05)'}}>
             <div className="plan-tag">RECOMENDADO</div>
             <div className="plan-header">
                <h3 style={{color: '#2dd4bf', fontSize:'1.5rem', fontWeight:800, display:'flex', alignItems:'center', gap:10}}>
                  <User size={24}/> Plan Padrino
                </h3>
                <p style={{color:'#d4d4d8', fontSize:'0.9rem', marginTop:8}}>Estudias tú + ayudas a otro.</p>
                <div className="plan-price">{clp(15000)}</div>
                <div className="plan-freq">Mensual</div>
             </div>
             
             <ul className="plan-features">
                <li><Check size={18} color="#2dd4bf" style={{minWidth:18}}/> <strong>Todo lo de la Beca +</strong></li>
                <li><Check size={18} color="#2dd4bf" style={{minWidth:18}}/> Clases en VIVO con Profesores</li>
                <li><Check size={18} color="#2dd4bf" style={{minWidth:18}}/> Tutoría Personal (WhatsApp directo)</li>
                <li><Check size={18} color="#2dd4bf" style={{minWidth:18}}/> Certificado de Participación</li>
             </ul>

             <button 
               onClick={() => setSelectedPlan(PLANS[1])}
               className="btn-main"
               style={{background: '#2dd4bf', color:'#000', border:'none'}}
             >
               Quiero ser Padrino
             </button>
             <div style={{textAlign:'center', marginTop:12, fontSize:'0.75rem', color:'var(--teal)', opacity:0.8}}>
               <Heart size={10} style={{display:'inline', marginRight:4}}/> Tu pago financia materiales de becados
             </div>
          </div>

        </div>
      </section>

      {/* 4. FAQ */}
      <section className="container" style={{maxWidth:800}}>
        <div style={{marginBottom:40, textAlign:'center'}}>
           <h2 style={{color:'white', fontSize:'2rem', fontWeight:700}}>Preguntas Frecuentes</h2>
           <p style={{color:'var(--text-muted)'}}>Resolvemos tus dudas con transparencia.</p>
        </div>
        <div>
           {FAQS.map((faq, i) => (
             <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="faq-head">
                   {faq.q}
                   <ChevronDown size={20} style={{transform: activeFaq === i ? 'rotate(180deg)' : 'none', transition:'0.3s', color:'var(--text-muted)'}}/>
                </div>
                {activeFaq === i && <div className="faq-body animate-fade">{faq.a}</div>}
             </div>
           ))}
        </div>
      </section>

    </div>
  );
}