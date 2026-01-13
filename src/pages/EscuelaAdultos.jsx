import React, { useState, useRef, useEffect } from "react";
import SEOHead from "../components/SEOHead"; 
import { useCart } from "../context/CartContext"; // <--- 1. CONEXIÓN AL CEREBRO

// 📦 ICONOS
import { 
  BookOpen, Video, Heart, Award, Check, 
  MessageCircle, ChevronDown, GraduationCap, 
  ShieldCheck, X, Loader2, ArrowRight, User, Star, ShoppingCart
} from "lucide-react";

// 🖼️ IMAGEN
import HeroImg from "../assets/img/lael/study-online.jpg"; 

/* ==========================================================================
   CONFIGURACIÓN
   ========================================================================== */
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev";

const PLANS = [
  {
    id: "solidario",
    title: "Beca 100%",
    subtitle: "Cupos Limitados",
    price: 0,
    features: ["Clases Grabadas (Cápsulas)", "Material PDF al WhatsApp", "Inscripción a Exámenes Libres", "Tutoría Grupal Mensual"],
    color: "#fbbf24", // Dorado
    isScholarship: true
  },
  {
    id: "completo",
    title: "Plan Padrino",
    subtitle: "Tu matrícula financia una beca",
    price: 15000,
    features: ["Clases en Vivo + Grabadas", "Tutoría Personalizada 1 a 1", "Ensayos de Examen Reales", "Gestión de Trámites Mineduc", "Certificado de Participación"],
    color: "#2dd4bf", // Teal
    isScholarship: false
  }
];

const FAQS = [
  { q: "¿El certificado es válido por el Mineduc?", a: "Absolutamente. Nosotros te preparamos para rendir los 'Exámenes Libres'. Al aprobarlos, obtienes tu Licencia de Enseñanza Media válida para todo." },
  { q: "¿Qué pasa si trabajo por turnos?", a: "El sistema está hecho para ti. Todo queda grabado y se envía por WhatsApp. Puedes estudiar a las 3 de la mañana si lo necesitas." },
  { q: "¿Necesito computador?", a: "No. Todo nuestro material está optimizado para verse perfecto en cualquier celular con internet básico." },
  { q: "¿Cuánto dura el proceso?", a: "Te preparamos intensivamente durante 3 a 5 meses antes de la fecha de exámenes (usualmente junio y octubre)." },
];

const clp = (val) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(val);

/* ==========================================================================
   ESTILOS CSS (DARK MODE & GLASSMORPHISM)
   ========================================================================== */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');

:root {
  --bg-deep: #050505;
  --text-main: #ffffff;
  --text-muted: #a1a1aa;
  --gold: #fbbf24;
  --teal: #2dd4bf;
  --border: rgba(255, 255, 255, 0.1);
  --font-main: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.adultos-page {
  background-color: var(--bg-deep);
  background-image: radial-gradient(circle at 50% 0%, #1a1a2e 0%, var(--bg-deep) 60%);
  color: var(--text-main);
  font-family: var(--font-main);
  min-height: 100vh;
  padding-bottom: 120px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { all: unset; cursor: pointer; box-sizing: border-box; transition: all 0.2s ease; }

/* ANIMACIONES */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.glass-card {
  background: rgba(20, 20, 23, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero { padding: 160px 0 100px; position: relative; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; color: white; letter-spacing: -0.02em; }
.hero p { font-size: 1.15rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 40px; max-width: 520px; }

.img-wrapper { position: relative; padding: 10px; animation: fadeIn 1s ease-out; }
.img-wrapper img { width: 100%; border-radius: 24px; display: block; filter: brightness(0.9); box-shadow: 0 20px 40px rgba(0,0,0,0.5); border: 1px solid var(--border); }
.floating-badge { position: absolute; bottom: 40px; left: -30px; padding: 16px 24px; display: flex; align-items: center; gap: 15px; animation: float 6s ease-in-out infinite; background: rgba(10,10,10,0.9); }

.grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-box { padding: 32px; transition: 0.3s; height: 100%; display: flex; flex-direction: column; }
.feature-box:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-5px); background: rgba(255,255,255,0.03); }

.plan-card { display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden; padding: 40px 32px; transition: 0.3s; }
.plan-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
.plan-price { font-size: 3rem; font-weight: 800; color: white; margin: 10px 0 0; line-height: 1; }
.plan-features li { display: flex; gap: 12px; margin-bottom: 16px; color: #d4d4d8; font-size: 0.95rem; align-items: flex-start; }

.btn-main { width: 100%; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 1rem; display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.3s; background: white; color: black; }
.btn-main:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: white; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.3s ease-out; }
.modal-form { width: 100%; max-width: 480px; position: relative; max-height: 90vh; overflow-y: auto; background: #121212; border: 1px solid rgba(255,255,255,0.1); }
.form-input { width: 100%; background: #0a0a0a; border: 1px solid var(--border); padding: 16px; border-radius: 12px; color: white; outline: none; margin-top: 8px; }
.form-input:focus { border-color: var(--teal); }

.faq-item { border: 1px solid var(--border); border-radius: 16px; background: rgba(255,255,255,0.02); margin-bottom: 12px; }
.faq-head { padding: 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: white; font-weight: 600; }
.faq-body { padding: 0 24px 24px; color: var(--text-muted); line-height: 1.6; }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
  .img-wrapper { display: none; } 
  .hero { padding-top: 120px; }
}
`;

/* ==========================================================================
   FORMULARIO DE REGISTRO
   ========================================================================== */
const EnrollmentForm = ({ plan, onClose }) => {
  const { addToCart } = useCart(); // <--- USAMOS EL CARRITO
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", rut: "", email: "", phone: "", comments: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Enviamos los datos a tu Google Sheet (Worker)
      const payload = {
        fullName: formData.fullName,
        rut: formData.rut,
        email: formData.email,
        phone: formData.phone,
        program: `Caminos - ${plan.title}`,
        comments: `Motivo: ${formData.comments || 'Sin comentarios'}`
      };

      await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Si todo sale bien, pasamos al paso final
      setStep(3);
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Revisa tu internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const msg = `Hola, postulé a la Beca Caminos (Adultos). Mi nombre es ${formData.fullName}.`;
    window.open(`https://wa.me/56964626568?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // <--- LÓGICA DE INTEGRACIÓN AL CARRITO --->
  const handleAddToCart = () => {
    addToCart({
      id: `adultos-${plan.id}`,
      name: `Programa Caminos: ${plan.title}`,
      price: plan.price,
      image: HeroImg,
      category: "Educación Adultos",
      desc: "Matrícula Nivelación de Estudios"
    });
    onClose(); // Cerramos el modal (el carrito se abrirá solo gracias al Context)
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-form">
        <button onClick={onClose} className="close-btn" style={{position:'absolute', top:20, right:20, color:'white'}}><X size={20}/></button>

        <div style={{padding: '32px'}}>
          {step === 1 && (
            <form onSubmit={handleSubmit}>
              <div style={{textAlign:'center', marginBottom:30}}>
                <div style={{width:64, height:64, background: `linear-gradient(135deg, ${plan.color}20, transparent)`, border: `1px solid ${plan.color}40`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color: plan.color}}>
                  {plan.isScholarship ? <Heart size={30}/> : <Star size={30}/>}
                </div>
                <h2 style={{fontSize:'1.5rem', fontWeight:800, margin:0, color:'white'}}>{plan.isScholarship ? "Postulación a Beca" : "Registro de Matrícula"}</h2>
                <p style={{color:'var(--text-muted)', fontSize:'0.9rem', marginTop:8}}>
                  {plan.isScholarship ? "Cupos limitados. Cuéntanos tu historia." : "Paso 1: Ingresa tus datos del alumno."}
                </p>
              </div>

              <div style={{marginBottom:15}}>
                <label style={{color:'var(--text-muted)', fontSize:'0.8rem', textTransform:'uppercase'}}>Nombre Completo</label>
                <input required className="form-input" onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div style={{marginBottom:15}}>
                <label style={{color:'var(--text-muted)', fontSize:'0.8rem', textTransform:'uppercase'}}>RUT</label>
                <input required className="form-input" onChange={e => setFormData({...formData, rut: e.target.value})} />
              </div>
              <div style={{marginBottom:15}}>
                <label style={{color:'var(--text-muted)', fontSize:'0.8rem', textTransform:'uppercase'}}>Email</label>
                <input required type="email" className="form-input" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div style={{marginBottom:15}}>
                <label style={{color:'var(--text-muted)', fontSize:'0.8rem', textTransform:'uppercase'}}>WhatsApp</label>
                <input required type="tel" className="form-input" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div style={{marginBottom:20}}>
                <label style={{color:'var(--text-muted)', fontSize:'0.8rem', textTransform:'uppercase'}}>
                    {plan.isScholarship ? "Cuéntanos tu situación" : "Comentarios (Opcional)"}
                </label>
                <textarea required={plan.isScholarship} className="form-input" rows="2" onChange={e => setFormData({...formData, comments: e.target.value})} />
              </div>

              <button type="submit" className="btn-main" disabled={loading} style={{background: plan.color, color: 'black', width:'100%'}}>
                {loading ? <Loader2 className="animate-spin" size={20}/> : "Continuar"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div style={{textAlign:'center', padding:'30px 0'}}>
              <div style={{width:80, height:80, background:'rgba(34, 197, 94, 0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', border:'1px solid rgba(34, 197, 94, 0.3)'}}>
                <Check size={40} color="#22c55e"/>
              </div>
              <h3 style={{color:'white', fontSize:'1.8rem', margin:0, fontWeight:800}}>¡Datos Recibidos!</h3>
              
              {!plan.isScholarship ? (
                /* OPCIÓN DE PAGO (PLAN PADRINO) */
                <>
                  <p style={{color:'var(--text-muted)', margin:'16px 0 30px'}}>
                    Tus datos ya están guardados. Ahora, para confirmar tu cupo, agrega la matrícula al carrito y finaliza tu pago seguro.
                  </p>
                  <button onClick={handleAddToCart} className="btn-main" style={{background:'#2dd4bf', color:'black', marginBottom:12}}>
                     <ShoppingCart size={20}/> Ir a Pagar Matrícula ({clp(plan.price)})
                  </button>
                  <button onClick={handleWhatsAppRedirect} style={{color:'var(--text-muted)', fontSize:'0.85rem', textDecoration:'underline'}}>
                    Tengo problemas para pagar, prefiero WhatsApp
                  </button>
                </>
              ) : (
                /* OPCIÓN BECA (SOLO WHATSAPP) */
                <>
                  <p style={{color:'var(--text-muted)', margin:'16px 0 30px'}}>
                    Tu postulación ha entrado a revisión. Te contactaremos si eres seleccionado/a.
                  </p>
                  <button onClick={handleWhatsAppRedirect} className="btn-main" style={{background:'#25D366', color:'white'}}>
                     <MessageCircle size={20}/> Consultar Estado
                  </button>
                </>
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
  const [selectedPlan, setSelectedPlan] = useState(null); 
  const [activeFaq, setActiveFaq] = useState(null);
  const pricingRef = useRef(null);

  return (
    <div className="adultos-page">
      <style>{css}</style>
      <SEOHead title="Nivelación de Estudios Adultos | Programa Caminos" description="Termina tu 4to medio gratis o pagando. Clases flexibles y humanas." />

      {selectedPlan && <EnrollmentForm plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', color:'var(--gold)', padding:'8px 16px', borderRadius:50, fontWeight:700, fontSize:'0.8rem', marginBottom:24}}>
              <GraduationCap size={16}/> Programa Caminos 2026
            </div>
            <h1>Tu historia no define<br/><span style={{background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>tu futuro.</span></h1>
            <p>Nunca es tarde para terminar tu enseñanza media. Sin juicios, sin miedo y a tu propio ritmo.</p>
            <button onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-main" style={{width:'auto', padding:'16px 32px'}}>
              Ver Opciones de Ingreso <ArrowRight size={18}/>
            </button>
          </div>
          <div className="img-wrapper">
             <img src={HeroImg} alt="Estudiante Adulto" onError={(e) => e.target.style.display = 'none'} />
             <div className="floating-badge">
                <div style={{background:'rgba(255,255,255,0.1)', padding:12, borderRadius:12, color:'var(--gold)'}}><ShieldCheck size={28} /></div>
                <div><strong style={{color:'white', display:'block', fontSize:'0.95rem'}}>Validez Oficial</strong><span style={{color:'var(--text-muted)', fontSize:'0.75rem'}}>Exámenes Libres Mineduc</span></div>
             </div>
          </div>
        </div>
      </section>

      {/* CARDS FLOTANTES */}
      <section className="container" style={{marginTop:'-80px', position:'relative', zIndex:5, marginBottom:120}}>
        <div className="grid-cards">
          <div className="glass-card feature-box">
             <div style={{marginBottom:24, color:'var(--teal)'}}><Video size={36}/></div>
             <h3 style={{color:'white', marginBottom:12}}>Clases a tu Ritmo</h3>
             <p style={{color:'var(--text-muted)'}}>Las clases quedan grabadas y se envían cortas y precisas.</p>
          </div>
          <div className="glass-card feature-box">
             <div style={{marginBottom:24, color:'var(--gold)'}}><MessageCircle size={36}/></div>
             <h3 style={{color:'white', marginBottom:12}}>Todo por WhatsApp</h3>
             <p style={{color:'var(--text-muted)'}}>Te enviamos las guías, lecturas y videos directo a tu celular.</p>
          </div>
          <div className="glass-card feature-box">
             <div style={{marginBottom:24, color:'#f472b6'}}><Heart size={36}/></div>
             <h3 style={{color:'white', marginBottom:12}}>Pedagogía del Afecto</h3>
             <p style={{color:'var(--text-muted)'}}>Tutores pacientes que entienden que llevas años sin estudiar.</p>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section ref={pricingRef} className="container" style={{padding:'80px 0'}}>
        <div style={{textAlign:'center', marginBottom:60}}>
          <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', marginBottom:20}}>Modelo Solidario</h2>
          <p style={{color:'var(--text-muted)', maxWidth:'600px', margin:'0 auto'}}>Quienes pueden pagar, apadrinan a quienes no pueden.</p>
        </div>

        <div className="grid-cards" style={{maxWidth:960, margin:'0 auto'}}>
          {/* BECA */}
          <div className="glass-card plan-card" style={{borderStyle:'dashed', borderColor: '#fbbf2440'}}>
             <div style={{marginBottom:30, borderBottom:'1px solid var(--border)', paddingBottom:30}}>
                <h3 style={{color: '#fbbf24', fontSize:'1.5rem', fontWeight:800, display:'flex', gap:10}}><Award size={24}/> Beca Social</h3>
                <div className="plan-price" style={{color:'#fbbf24'}}>$0</div>
             </div>
             <ul className="plan-features">
                {PLANS[0].features.map((f,i)=><li key={i}><Check size={18} color="#fbbf24"/> {f}</li>)}
             </ul>
             <button onClick={() => setSelectedPlan(PLANS[0])} className="btn-main btn-outline" style={{borderColor: '#fbbf24', color: '#fbbf24'}}>Postular a Gratuidad</button>
          </div>

          {/* PADRINO */}
          <div className="glass-card plan-card" style={{borderColor: '#2dd4bf', background:'rgba(45, 212, 191, 0.05)'}}>
             <div style={{position:'absolute', top:0, right:0, padding:'8px 16px', background:'#fbbf24', color:'black', fontWeight:800, fontSize:'0.75rem', borderBottomLeftRadius:16}}>POPULAR</div>
             <div style={{marginBottom:30, borderBottom:'1px solid var(--border)', paddingBottom:30}}>
                <h3 style={{color: '#2dd4bf', fontSize:'1.5rem', fontWeight:800, display:'flex', gap:10}}><User size={24}/> Plan Padrino</h3>
                <div className="plan-price">{clp(15000)}</div>
                <div style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>Mensual</div>
             </div>
             <ul className="plan-features">
                {PLANS[1].features.map((f,i)=><li key={i}><Check size={18} color="#2dd4bf"/> {f}</li>)}
             </ul>
             <button onClick={() => setSelectedPlan(PLANS[1])} className="btn-main" style={{background: '#2dd4bf', color:'black', border:'none'}}>Quiero ser Padrino</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container" style={{maxWidth:800}}>
        <h2 style={{color:'white', textAlign:'center', marginBottom:40}}>Preguntas Frecuentes</h2>
        {FAQS.map((faq, i) => (
          <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
             <div className="faq-head">{faq.q} <ChevronDown size={20} style={{transform: activeFaq === i ? 'rotate(180deg)' : 'none', transition:'0.3s'}}/></div>
             {activeFaq === i && <div className="faq-body animate-fade">{faq.a}</div>}
          </div>
        ))}
      </section>
    </div>
  );
}