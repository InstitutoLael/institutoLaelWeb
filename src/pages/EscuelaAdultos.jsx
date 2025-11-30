// src/pages/EscuelaAdultos.jsx
import { useState, useEffect } from "react";
// Importamos los datos que creaste
import { PLANS, FAQS, clp } from "../data/nivelacion.js";

// --- ASSETS ---
// Usamos el patrón de Vite que tenías en tu código original
const HeroImg = new URL("../assets/img/lael/study-online.jpg", import.meta.url).href;
const LogoMark = new URL("../assets/img/Logos/lael-inst-blanco.png", import.meta.url).href;

/* --- SEO COMPONENT (Integrado) --- */
const SEOHead = () => {
  useEffect(() => {
    document.title = "Programa Caminos | Nivelación de Estudios 2025";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Termina tu enseñanza básica o media. Programa flexible para adultos con clases en vivo y grabadas. Beca solidaria y planes accesibles.");
    }
  }, []);
  return null;
};

/* --- COMPONENTE PRINCIPAL --- */
export default function EscuelaAdultos() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Generador de Link de WhatsApp
  const getWaLink = (plan) => {
    // Si el plan ya trae un mensaje predefinido en data/nivelacion.js, úsalo
    const message = plan.wapp || `Hola, me interesa el plan ${plan.title}.`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="caminos-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <img src={HeroImg} alt="Adulto estudiando" className="hero-bg" />
        
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-pill">Programa Caminos 2025</div>
            <h1>
              Tu historia no define <br/>
              <span className="text-highlight">tu futuro.</span>
            </h1>
            <p className="lead">
              Termina tu enseñanza básica o media con dignidad. 
              <strong> Clases en vivo</strong> que quedan grabadas, sin gastar todos tus datos móviles. 
              Un espacio seguro para volver a estudiar.
            </p>
            
            <div className="hero-actions">
              <a href="#planes" className="btn-primary">Ver Planes y Becas</a>
              <a href="#metodo" className="btn-outline">¿Cómo funciona?</a>
            </div>
          </div>
          
          {/* Logo sutil en desktop */}
          <div className="hero-logo-box">
             <img src={LogoMark} alt="Instituto Lael" />
          </div>
        </div>
      </header>

      {/* --- MÉTODO (Tecnología Social) --- */}
      <section id="metodo" className="method-section">
        <div className="container">
          <div className="sec-title">
            <h2>Tecnología que incluye</h2>
            <p>Diseñamos este programa pensando en tu tiempo y tu bolsillo.</p>
          </div>
          
          <div className="grid-3">
            <div className="feature-card">
              <span className="icon">🔴</span>
              <h3>En Vivo + Grabado</h3>
              <p>Conéctate a la clase real para compartir, o mira la grabación en YouTube (privado) si tuviste turno laboral.</p>
            </div>
            <div className="feature-card">
              <span className="icon">📱</span>
              <h3>Ahorro de Datos</h3>
              <p>Optimizamos todo. Videos ligeros y guías PDF por WhatsApp para que estudiar no te consuma el plan del celular.</p>
            </div>
            <div className="feature-card">
              <span className="icon">📜</span>
              <h3>Validez Mineduc</h3>
              <p>Te preparamos específicamente para rendir los Exámenes Libres. Tu certificado es oficial y válido para todo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PLANES (Renderizado desde tu data/nivelacion.js) --- */}
      <section id="planes" className="pricing-section">
        <div className="container">
          <div className="sec-title">
            <h2>Modelo Solidario 1x1</h2>
            <p>Al elegir un plan de pago, ayudas a financiar la beca de quien lo necesita.</p>
          </div>

          <div className="plans-container">
            {PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`plan-card ${plan.id === 'trabajador' ? 'featured' : ''}`}
                style={{ '--theme-color': plan.color || '#fff' }}
              >
                {/* Header del Plan */}
                <div className="plan-header">
                  <span className="tag">{plan.tag}</span>
                  <h3>{plan.title}</h3>
                  <div className="price-box">
                    <span className="amount">
                      {plan.price === 0 ? 'GRATIS' : clp(plan.price)}
                    </span>
                    {plan.frequency && <span className="freq">/{plan.frequency}</span>}
                  </div>
                  <p className="desc">{plan.desc || plan.for}</p>
                </div>

                {/* Cuerpo del Plan */}
                <div className="plan-body">
                  <ul>
                    {plan.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                  <a 
                    href={getWaLink(plan)} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-plan"
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RSE / EMPRESAS --- */}
      <section className="sponsor-section">
        <div className="container sponsor-box">
          <div className="sp-content">
            <h3>🤝 Para Empresas y Fundaciones</h3>
            <p>
              ¿Buscas nivelar estudios de tus colaboradores o apadrinar un grupo? 
              <br/>Entregamos reportes de avance y certificado de impacto social.
            </p>
          </div>
          <div className="sp-action">
            <a href="https://wa.me/56964626568?text=Hola,%20soy%20empresa%20y%20quiero%20apadrinar" target="_blank" rel="noreferrer" className="btn-sponsor">
              Quiero ser Padrino
            </a>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'open' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="faq-question">
                  {faq.q}
                  <span className="toggle">{activeFaq === i ? '−' : '+'}</span>
                </div>
                {activeFaq === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ================= ESTILOS (DARK & DIGNITY) ================= */
const css = `
:root {
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #F59E0B;
  --success: #34D399;
}

.caminos-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  line-height: 1.6;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
a { text-decoration: none; color: inherit; }
button { border: none; background: none; cursor: pointer; }

/* HERO */
.hero {
  position: relative; height: 80vh; min-height: 600px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover; z-index: 0; opacity: 0.4; filter: contrast(1.1) grayscale(20%);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a);
  z-index: 1;
}
.hero-grid {
  position: relative; z-index: 2; width: 100%;
  display: grid; grid-template-columns: 1.2fr 0.8fr; align-items: center; gap: 40px;
}
@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; text-align: center; } .hero-logo-box { display: none; } }

.hero-content { padding-top: 20px; }

.badge-pill {
  display: inline-block; background: rgba(245, 158, 11, 0.15); color: var(--accent);
  padding: 6px 16px; border-radius: 50px; font-weight: 700; text-transform: uppercase;
  font-size: 0.85rem; margin-bottom: 24px; border: 1px solid rgba(245, 158, 11, 0.4);
  backdrop-filter: blur(4px);
}

h1 { font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; }
.text-highlight { 
    color: var(--accent); 
    background: linear-gradient(120deg, #FCD34D, #F59E0B);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.lead { font-size: 1.2rem; line-height: 1.6; color: #e2e8f0; margin-bottom: 40px; max-width: 600px; }
@media (max-width: 900px) { .lead { margin-left: auto; margin-right: auto; } }

.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
@media (max-width: 900px) { .hero-actions { justify-content: center; } }

.btn-primary {
  background: var(--accent); color: #000; padding: 14px 32px; border-radius: 50px;
  font-weight: 700; text-decoration: none; transition: .2s; box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.5); }
.btn-outline {
  background: rgba(255,255,255,0.05); color: #fff; padding: 14px 32px; border-radius: 50px;
  font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(4px);
}
.btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

.hero-logo-box { display: flex; justify-content: center; }
.hero-logo-box img { width: 180px; opacity: 0.8; }

/* SECTIONS */
.sec-title { text-align: center; margin-bottom: 60px; }
.sec-title h2 { font-size: 2.5rem; margin-bottom: 12px; font-weight: 800; }
.sec-title p { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

/* METHOD */
.method-section { padding: 80px 0; background: var(--bg-dark); }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

.feature-card {
  background: var(--bg-card); padding: 35px 30px; border-radius: 20px; text-align: center;
  border: 1px solid rgba(255,255,255,0.05); transition: .3s;
}
.feature-card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.feature-card .icon { font-size: 3.5rem; display: block; margin-bottom: 20px; }
.feature-card h3 { font-size: 1.5rem; margin-bottom: 12px; color: var(--text-main); }
.feature-card p { color: var(--text-muted); line-height: 1.6; }

/* PRICING */
.pricing-section { padding: 80px 0; background: #0b1120; }
.plans-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; align-items: start; }

.plan-card {
  background: var(--bg-card); border-radius: 24px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column;
  position: relative; transition: .3s;
}
.plan-card.featured { 
  transform: scale(1.05); z-index: 2; border-color: var(--accent); 
  box-shadow: 0 20px 50px rgba(0,0,0,0.4); background: #162032;
}
@media (max-width: 900px) { .plan-card.featured { transform: none; margin: 20px 0; } }

.plan-header { 
    padding: 40px 30px; text-align: center; border-top: 6px solid; 
    border-top-color: var(--theme-color); background: rgba(0,0,0,0.2); 
}
.plan-header .tag { 
    display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; 
    font-weight: 800; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 0.5px; 
    background: var(--theme-color); color: #000;
}
.plan-header h3 { font-size: 1.8rem; margin-bottom: 15px; font-weight: 800; }
.price-box { margin-bottom: 15px; display: flex; justify-content: center; align-items: baseline; gap: 4px; }
.currency { font-size: 1.5rem; color: var(--text-muted); }
.amount { font-size: 3rem; font-weight: 800; color: var(--text-main); }
.freq { color: var(--text-muted); font-size: 1rem; }
.desc { font-size: 0.95rem; color: var(--text-muted); font-style: italic; line-height: 1.5; }

.plan-body { padding: 30px; display: flex; flex-direction: column; height: 100%; flex-grow: 1; }
.plan-body ul { list-style: none; padding: 0; margin-bottom: 40px; flex-grow: 1; }
.plan-body li { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; display: flex; align-items: start; gap: 10px; font-size: 0.95rem; }
.plan-body li::before { content: "✓"; color: var(--theme-color); font-weight: bold; flex-shrink: 0; }

.btn-plan {
  display: block; text-align: center; padding: 16px; border-radius: 12px;
  font-weight: 700; text-decoration: none; border: 2px solid; 
  transition: .2s; font-size: 1.1rem;
  background: transparent; color: var(--theme-color); border-color: var(--theme-color);
}
.btn-plan:hover { background: var(--theme-color); color: #000; box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
/* Estilo específico para el destacado para que se vea lleno por defecto */
.featured .btn-plan { background: var(--theme-color); color: #000; }
.featured .btn-plan:hover { filter: brightness(1.1); }

/* SPONSOR */
.sponsor-section { margin: 80px 0; }
.sponsor-box {
  background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155;
  padding: 50px; border-radius: 24px; display: flex; align-items: center; justify-content: space-between; gap: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
@media (max-width: 800px) { .sponsor-box { flex-direction: column; text-align: center; padding: 30px; } }
.sp-content h3 { font-size: 2rem; margin-bottom: 15px; color: var(--text-main); }
.sp-content p { font-size: 1.1rem; color: var(--text-muted); }
.btn-sponsor {
  background: transparent; color: var(--text-main); padding: 16px 36px; border-radius: 50px;
  font-weight: 700; text-decoration: none; border: 2px solid var(--text-muted); white-space: nowrap; transition: .2s;
}
.btn-sponsor:hover { border-color: var(--text-main); background: rgba(255,255,255,0.05); }

/* FAQ */
.faq-section { padding-bottom: 100px; }
.faq-list { max-width: 800px; margin: 0 auto; }
.faq-item { background: var(--bg-card); border-radius: 12px; margin-bottom: 15px; overflow: hidden; cursor: pointer; border: 1px solid rgba(255,255,255,0.05); transition: .2s; }
.faq-item:hover { border-color: var(--text-muted); }
.faq-question { padding: 24px; font-weight: 700; font-size: 1.1rem; display: flex; justify-content: space-between; align-items: center; }
.faq-answer { padding: 0 24px 24px; color: var(--text-muted); line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.05); margin-top: -5px; padding-top: 20px; }
.toggle { font-size: 1.5rem; color: var(--accent); font-weight: 300; }
`;