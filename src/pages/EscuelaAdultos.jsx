import React, { useState, useEffect, useRef } from "react";
import SEOHead from "../components/SEOHead"; 

// 📦 ICONOS (Lucide React)
import { 
  BookOpen, Video, Heart, Award, Check, 
  MessageCircle, ChevronDown, GraduationCap, 
  ShieldCheck, X, Loader2, ArrowRight, User
} from "lucide-react";

// 🖼️ IMAGEN
import HeroImg from "../assets/img/lael/study-online.jpg"; 

/* ==========================================================================
   CONFIGURACIÓN Y DATOS
   ========================================================================== */
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev"; // 🔴 URL REAL

const PLANS = [
  {
    id: "solidario",
    title: "Beca 100%",
    subtitle: "Cupos Limitados",
    price: 0,
    desc: "Para quienes tienen ganas de superarse pero hoy no cuentan con los recursos.",
    features: ["Clases Grabadas", "Material al WhatsApp", "Exámenes Libres Mineduc", "Tutoría Grupal"],
    cta: "Postular a Gratuidad",
    color: "#fbbf24", // Dorado
    isScholarship: true
  },
  {
    id: "completo",
    title: "Plan Padrino",
    subtitle: "Tú estudias + Ayudas a otro",
    price: 15000,
    frequency: "mensual",
    desc: "Pagas tu educación y financias los materiales de un estudiante becado.",
    features: ["Clases en Vivo + Grabadas", "Tutoría Personalizada 1 a 1", "Certificado de Participación", "Apoyo Inscripción Mineduc", "Ayudas a la comunidad"],
    cta: "Matricularme",
    color: "#2dd4bf", // Teal
    isScholarship: false
  }
];

const FAQS = [
  { q: "¿Es válido por el Mineduc?", a: "Sí. Nosotros te preparamos para rendir los 'Exámenes Libres'. Al aprobarlos en el colegio examinador que te asigne el Mineduc, obtienes tu Licencia de Enseñanza Media válida para trabajar o estudiar." },
  { q: "¿Qué pasa si trabajo por turnos?", a: "No hay problema. Aunque tenemos clases en vivo (Plan Padrino), todo queda grabado y se envía por WhatsApp para que estudies en tus tiempos libres." },
  { q: "¿Tengo que tener computador?", a: "No es obligatorio. Todo nuestro material está adaptado para verse perfecto en un celular." },
];

const clp = (val) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(val);

/* ==========================================================================
   ESTILOS CSS (DARK MODE & GLASSMORPHISM)
   ========================================================================== */
const css = `
:root {
  --bg-deep: #0f0f11;       /* Casi negro */
  --bg-panel: #18181b;      /* Zinc 900 */
  --text-main: #f4f4f5;     /* Zinc 100 */
  --text-muted: #a1a1aa;    /* Zinc 400 */
  --gold: #fbbf24;          /* Amber 400 */
  --teal: #2dd4bf;
  --border: rgba(255, 255, 255, 0.08);
}

.adultos-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  min-height: 100vh;
  padding-bottom: 100px;
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { all: unset; cursor: pointer; box-sizing: border-box; }

/* ANIMACIONES */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

/* EFECTO VIDRIO FLOTANTE */
.glass-card {
  background: rgba(24, 24, 27, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
}

/* HERO */
.hero {
  padding: 140px 0 80px;
  position: relative;
  background: radial-gradient(circle at top right, rgba(45, 212, 191, 0.1), transparent 40%);
}
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.badge-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2);
  color: var(--gold); padding: 8px 16px; border-radius: 50px;
  font-weight: 700; font-size: 0.85rem; letter-spacing: 0.5px; margin-bottom: 24px;
}

h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; color: white; }
.hero p { font-size: 1.15rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 40px; max-width: 500px; }

.img-wrapper { position: relative; padding: 10px; }
.img-wrapper img { width: 100%; border-radius: 24px; display: block; filter: brightness(0.9); }
.floating-badge {
  position: absolute; bottom: 40px; left: -30px;
  padding: 20px; display: flex; align-items: center; gap: 15px;
  animation: float 6s ease-in-out infinite;
}

/* CARDS */
.grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.feature-box { padding: 30px; transition: 0.3s; }
.feature-box:hover { border-color: var(--gold); transform: translateY(-5px); background: rgba(251, 191, 36, 0.05); }

/* PRICING */
.pricing-section { padding: 80px 0; }
.plan-card {
  display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden; padding: 32px;
  transition: 0.3s;
}
.plan-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2); }
.plan-tag {
  position: absolute; top: 0; right: 0; padding: 6px 12px;
  background: var(--gold); color: black; font-weight: 800; font-size: 0.75rem;
  border-bottom-left-radius: 12px;
}
.plan-price { font-size: 2.5rem; font-weight: 800; color: white; margin: 20px 0 5px; }
.plan-features { list-style: none; padding: 0; margin: 30px 0; flex-grow: 1; }
.plan-features li { display: flex; gap: 10px; margin-bottom: 12px; color: var(--text-muted); font-size: 0.95rem; }

.btn-main {
  width: 100%; padding: 16px; border-radius: 14px; font-weight: 700; font-size: 1rem;
  display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.3s;
  background: var(--gold); color: black;
}
.btn-main:hover { background: #fcd34d; transform: translateY(-2px); }
.btn-outline { background: transparent; border: 2px solid var(--border); color: white; }
.btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
  z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: popIn 0.2s ease-out;
}
.modal-form { width: 100%; max-width: 500px; position: relative; max-height: 90vh; overflow-y: auto; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem; }
.form-input { 
  width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); 
  padding: 14px; border-radius: 12px; color: white; outline: none; transition: 0.3s;
}
.form-input:focus { border-color: var(--gold); background: rgba(0,0,0,0.5); }
.close-btn { position: absolute; top: 20px; right: 20px; color: var(--text-muted); padding: 5px; }
.close-btn:hover { color: white; }

/* FAQ */
.faq-item { border: 1px solid var(--border); border-radius: 16px; background: rgba(255,255,255,0.02); margin-bottom: 12px; overflow: hidden; }
.faq-head { padding: 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: white; font-weight: 600; }
.faq-body { padding: 0 20px 20px; color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .img-wrapper { display: none; } 
  .hero { padding-top: 100px; }
}
`;

/* ==========================================================================
   FORMULARIO DE REGISTRO (CONECTADO A GOOGLE SHEETS)
   ========================================================================== */
const EnrollmentForm = ({ plan, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    comments: "" // Usaremos esto para situacion/motivo
  });

  // 👇 AQUÍ ESTÁ LA MAGIA: Envío real a tu Worker
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Preparamos datos
      const payload = {
        fullName: formData.fullName,
        rut: formData.rut,
        email: formData.email,
        phone: formData.phone,
        program: `Caminos - ${plan.title}`, // Ej: Caminos - Beca 100%
        comments: `Detalle: ${formData.comments || 'Sin comentarios'}`
      };

      // 2. Enviamos al Worker (que lo manda a Google Sheets)
      const response = await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStep(3); // Éxito
      } else {
        alert("Hubo un error al enviar. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Revisa tu internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const msg = `Hola, ya llené el formulario para el ${plan.title}. Quiero finalizar mi inscripción.`;
    window.open(`https://wa.me/56964626568?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-form">
        <button onClick={onClose} className="close-btn"><X size={24}/></button>

        <div style={{padding: '30px'}}>
          {/* PASO 1: Formulario */}
          {step === 1 && (
            <form onSubmit={handleSubmit}>
              <div style={{textAlign:'center', marginBottom:24}}>
                <div style={{width:60, height:60, background:'rgba(251, 191, 36, 0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 15px', color: plan.color}}>
                  <User size={30}/>
                </div>
                <h2 style={{fontSize:'1.5rem', fontWeight:700, margin:0, color:'white'}}>
                  {plan.isScholarship ? "Postular a Beca" : "Inscripción"}
                </h2>
                <p style={{color:'var(--text-muted)', fontSize:'0.9rem', marginTop:8}}>
                  {plan.isScholarship 
                    ? "Completa tus datos para evaluar tu gratuidad." 
                    : "Regístrate para asegurar tu cupo."}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input required className="form-input" placeholder="Ej: Juan Pérez" 
                  onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div className="form-group">
                 <label className="form-label">RUT</label>
                 <input required className="form-input" placeholder="12.345.678-9" 
                  onChange={e => setFormData({...formData, rut: e.target.value})} />
              </div>

              <div className="form-group">
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:15}}>
                  <div>
                    <label className="form-label">Correo</label>
                    <input required type="email" className="form-input" placeholder="juan@gmail.com" 
                      onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="form-label">Teléfono</label>
                    <input required type="tel" className="form-input" placeholder="+569..." 
                      onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Pregunta condicional según el plan */}
              <div className="form-group">
                <label className="form-label">
                    {plan.isScholarship ? "¿Cuál es tu situación actual? (Breve)" : "¿Dudas o comentarios?"}
                </label>
                <textarea 
                  required={plan.isScholarship} 
                  className="form-input" rows="2" 
                  placeholder={plan.isScholarship ? "Busco trabajo, cuido familia, etc..." : "Opcional"} 
                  onChange={e => setFormData({...formData, comments: e.target.value})} 
                />
              </div>

              <button type="submit" className="btn-main" disabled={loading} style={{background: plan.color, color: 'black'}}>
                {loading ? <Loader2 className="animate-spin"/> : "Enviar Datos"}
              </button>
            </form>
          )}

          {/* PASO 3: Éxito */}
          {step === 3 && (
            <div style={{textAlign:'center', padding:'20px 0'}}>
              <div style={{width:80, height:80, background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
                <Check size={40} color="#16a34a"/>
              </div>
              <h3 style={{color:'white', fontSize:'1.5rem', margin:0}}>¡Datos Recibidos!</h3>
              
              <p style={{color:'var(--text-muted)', margin:'15px 0 25px', lineHeight:1.5}}>
                {plan.isScholarship 
                  ? "Tu postulación ha sido enviada al comité. Te contactaremos si eres seleccionado/a."
                  : "Tus datos están seguros. Para finalizar tu matrícula, contáctanos para coordinar el pago."}
              </p>

              {/* Botón condicional: Si paga, va a WhatsApp. Si es beca, solo cierra */}
              {!plan.isScholarship ? (
                  <button onClick={handleWhatsAppRedirect} className="btn-main" style={{background:'#25D366', color:'white'}}>
                     <MessageCircle size={20}/> Ir a Pagar / Coordinar
                  </button>
              ) : (
                  <button onClick={onClose} className="btn-main btn-outline">Entendido</button>
              )}
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
  const [selectedPlan, setSelectedPlan] = useState(null); // Estado para el modal
  const [activeFaq, setActiveFaq] = useState(null);
  const pricingRef = useRef(null);

  return (
    <div className="adultos-page">
      <style>{css}</style>
      <SEOHead title="Nivelación de Estudios Adultos | Programa Caminos" description="Termina tu 4to medio gratis o pagando. Clases flexibles." />

      {/* Renderizado condicional del Modal */}
      {selectedPlan && (
        <EnrollmentForm 
            plan={selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
        />
      )}

      {/* 1. HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge-pill"><GraduationCap size={16}/> Programa Caminos 2026</div>
            <h1>
              Tu historia no define<br/>
              <span style={{color:'var(--gold)'}}>tu futuro.</span>
            </h1>
            <p>
              Nunca es tarde para terminar tu enseñanza básica o media. 
              Sin juicios, sin miedo y a tu propio ritmo. Diseñado para adultos que trabajan o cuidan familia.
            </p>
            <div style={{display:'flex', gap:15, flexWrap:'wrap'}}>
              <button onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-main" style={{width:'auto', padding:'16px 40px'}}>
                Ver Planes y Becas <ArrowRight size={20}/>
              </button>
            </div>
          </div>
          
          <div className="img-wrapper">
             <img src={HeroImg} alt="Estudiante Adulto" />
             <div className="glass-card floating-badge">
                <div style={{background:'rgba(251, 191, 36, 0.2)', padding:10, borderRadius:12, color:'var(--gold)'}}>
                  <ShieldCheck size={28} />
                </div>
                <div>
                   <strong style={{color:'white', display:'block', fontSize:'1rem'}}>Validez Oficial</strong>
                   <span style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>Exámenes Libres Mineduc</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. POR QUÉ NOSOTROS (CARDS FLOTANTES) */}
      <section className="container" style={{marginTop:'-50px', position:'relative', zIndex:5, marginBottom:100}}>
        <div className="grid-cards">
          <div className="glass-card feature-box">
             <div style={{marginBottom:20, color:'var(--teal)'}}><Video size={32}/></div>
             <h3 style={{color:'white', marginBottom:10, fontSize:'1.2rem'}}>Clases Flexibles</h3>
             <p style={{color:'var(--text-muted)', lineHeight:1.5}}>
               ¿Turnos rotativos? No importa. Las clases quedan grabadas y se envían cortas y precisas.
             </p>
          </div>
          <div className="glass-card feature-box">
             <div style={{marginBottom:20, color:'var(--gold)'}}><MessageCircle size={32}/></div>
             <h3 style={{color:'white', marginBottom:10, fontSize:'1.2rem'}}>Todo por WhatsApp</h3>
             <p style={{color:'var(--text-muted)', lineHeight:1.5}}>
               No necesitas computador. Te enviamos las guías y lecturas directo a tu celular.
             </p>
          </div>
          <div className="glass-card feature-box">
             <div style={{marginBottom:20, color:'#f472b6'}}><Heart size={32}/></div>
             <h3 style={{color:'white', marginBottom:10, fontSize:'1.2rem'}}>Sin Miedo</h3>
             <p style={{color:'var(--text-muted)', lineHeight:1.5}}>
               Tutores pacientes que entienden que llevas años sin estudiar. Aquí nadie se burla.
             </p>
          </div>
        </div>
      </section>

      {/* 3. PLANES (SOLIDARIDAD) */}
      <section ref={pricingRef} className="pricing-section container">
        <div style={{textAlign:'center', marginBottom:60}}>
          <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', marginBottom:15}}>Modelo Solidario</h2>
          <p style={{color:'var(--text-muted)', maxWidth:'600px', margin:'0 auto'}}>
            Creemos que la educación es un derecho. Si puedes pagar, ayudas a alguien más. Si no puedes, te becamos.
          </p>
        </div>

        <div className="grid-cards" style={{maxWidth:900, margin:'0 auto'}}>
          {PLANS.map((plan) => (
            <div key={plan.id} className="glass-card plan-card" style={plan.isScholarship ? {borderStyle:'dashed'} : {borderColor: plan.color}}>
               {plan.subtitle && <div className="plan-tag">{plan.subtitle}</div>}
               
               <h3 style={{color: plan.color, fontSize:'1.4rem', fontWeight:700}}>{plan.title}</h3>
               <div className="plan-price">{plan.price === 0 ? "GRATIS" : clp(plan.price)}</div>
               <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>{plan.desc}</p>
               
               <ul className="plan-features">
                  {plan.features.map((ft, i) => (
                    <li key={i}><Check size={18} color={plan.color} style={{minWidth:18}}/> {ft}</li>
                  ))}
               </ul>

               <button 
                 onClick={() => setSelectedPlan(plan)}
                 className={plan.isScholarship ? "btn-main btn-outline" : "btn-main"}
                 style={!plan.isScholarship ? {background: plan.color, color:'#000'} : {}}
               >
                 {plan.cta}
               </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="container" style={{maxWidth:800}}>
        <div style={{marginBottom:40, textAlign:'center'}}>
           <h2 style={{color:'white', fontSize:'2rem', fontWeight:700}}>Preguntas Frecuentes</h2>
        </div>
        <div>
           {FAQS.map((faq, i) => (
             <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="faq-head">
                   {faq.q}
                   <ChevronDown size={20} style={{transform: activeFaq === i ? 'rotate(180deg)' : 'none', transition:'0.3s'}}/>
                </div>
                {activeFaq === i && <div className="faq-body">{faq.a}</div>}
             </div>
           ))}
        </div>
      </section>

    </div>
  );
}