// src/pages/EscuelaAdultos.jsx
import { useState, useEffect } from "react";
import { PLANS, FAQS, clp } from "../data/nivelacion.js";

// IMPORTANTE: Asegúrate de tener esta imagen o cambiar la ruta
// Si no tienes imagen aún, el código usará un placeholder automático.
import HeroImg from "../assets/img/lael/study-online.jpg"; 

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Grandes, Claros y Empáticos)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Book: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Video: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Diploma: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Heart: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Whatsapp: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  ChevronDown: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "DIGNIDAD DORADA"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  /* Fondo Cálido (Warm Charcoal) - Menos frío que el negro puro */
  --bg-warm: #1c1917;  
  --bg-card: #292524;
  --bg-lighter: #44403c;
  
  /* Dorado / Ámbar (Dignidad y Valor) */
  --gold: #fbbf24;
  --gold-glow: rgba(251, 191, 36, 0.3);
  
  /* Texto */
  --text-main: #f5f5f4; /* Stone 100 */
  --text-muted: #a8a29e; /* Stone 400 */
  
  --font-base: 'Inter', system-ui, sans-serif;
  --radius: 16px;
}

.caminos-page {
  background-color: var(--bg-warm);
  color: var(--text-main);
  font-family: var(--font-base);
  min-height: 100vh;
  line-height: 1.6;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; transition: 0.3s; }
button { border: none; background: none; cursor: pointer; font-family: inherit; }

/* HERO SECTION */
.hero {
  position: relative; padding: 120px 0 100px;
  background: radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.1), transparent 60%);
  overflow: hidden;
}

.hero-grid {
  display: grid; grid-template-columns: 1fr 0.8fr; gap: 60px; align-items: center;
  position: relative; z-index: 2;
}

.badge-hero {
  display: inline-block; background: rgba(251, 191, 36, 0.15); color: var(--gold);
  padding: 8px 16px; border-radius: 50px; font-weight: 700; text-transform: uppercase;
  border: 1px solid rgba(251, 191, 36, 0.3); letter-spacing: 1px; margin-bottom: 24px;
}

h1 { font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; }
.text-gold { 
  color: var(--gold); 
  text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
}

.lead { font-size: 1.25rem; color: #e7e5e4; margin-bottom: 40px; max-width: 550px; }
.lead strong { color: white; font-weight: 700; border-bottom: 2px solid var(--gold); }

.hero-actions { display: flex; gap: 20px; flex-wrap: wrap; }
.btn-primary {
  background: var(--gold); color: #292524; padding: 16px 36px; border-radius: 50px;
  font-weight: 800; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.btn-primary:hover { transform: translateY(-3px); background: #fcd34d; box-shadow: 0 15px 40px var(--gold-glow); }

.btn-outline {
  background: transparent; color: var(--text-main); padding: 16px 36px; border-radius: 50px;
  font-weight: 700; font-size: 1.1rem; border: 2px solid rgba(255,255,255,0.2);
}
.btn-outline:hover { border-color: var(--text-main); background: rgba(255,255,255,0.05); }

/* Hero Image Frame */
.image-frame {
  position: relative; border-radius: 30px; padding: 12px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
}
.image-frame img { width: 100%; border-radius: 20px; display: block; filter: sepia(20%) contrast(1.1); }
.float-badge {
  position: absolute; bottom: 30px; left: -20px;
  background: #292524; padding: 15px 25px; border-radius: 16px; border: 1px solid var(--gold);
  display: flex; gap: 15px; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

/* STEPS / METHOD */
.method-sec { padding: 80px 0; background: var(--bg-card); }
.sec-title { text-align: center; margin-bottom: 60px; max-width: 700px; margin-inline: auto; }
.sec-title h2 { font-size: 2.5rem; margin-bottom: 15px; color: white; }
.sec-title p { font-size: 1.1rem; color: var(--text-muted); }

.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.feature-card {
  background: var(--bg-warm); padding: 40px 30px; border-radius: 20px; text-align: center;
  border: 1px solid rgba(255,255,255,0.05); transition: 0.3s;
}
.feature-card:hover { transform: translateY(-5px); border-color: var(--gold); }
.icon-circle {
  width: 70px; height: 70px; background: rgba(251, 191, 36, 0.1); color: var(--gold);
  border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
}
.feature-card h3 { font-size: 1.4rem; margin-bottom: 15px; color: white; font-weight: 700; }
.feature-card p { color: var(--text-muted); line-height: 1.6; }

/* PRICING */
.pricing-sec { padding: 100px 0; }
.plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; align-items: start; }

.plan-card {
  background: var(--bg-card); border-radius: 24px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; position: relative;
  display: flex; flex-direction: column;
}
.plan-card:hover { border-color: var(--theme-color); transform: translateY(-5px); }
.plan-card.featured { transform: scale(1.05); border: 2px solid var(--gold); box-shadow: 0 20px 60px -10px rgba(0,0,0,0.5); z-index: 2; }

.plan-head { padding: 30px; text-align: center; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05); }
.tag { 
    display: inline-block; background: var(--theme-color); color: #1c1917; 
    padding: 6px 12px; border-radius: 50px; font-weight: 800; font-size: 0.75rem; 
    text-transform: uppercase; margin-bottom: 15px; 
}
.plan-head h3 { font-size: 1.6rem; margin-bottom: 10px; color: white; font-weight: 700; }
.price { font-size: 2.5rem; font-weight: 800; color: white; display: block; }
.freq { font-size: 0.9rem; color: var(--text-muted); font-weight: 400; }
.desc { margin-top: 15px; color: #d6d3d1; font-size: 0.95rem; line-height: 1.4; }

.plan-body { padding: 30px; flex-grow: 1; display: flex; flex-direction: column; }
.plan-body ul { list-style: none; padding: 0; margin-bottom: 30px; flex-grow: 1; }
.plan-body li { display: flex; gap: 10px; margin-bottom: 12px; color: #d6d3d1; font-size: 0.95rem; text-align: left; }
.check { color: var(--theme-color); font-weight: bold; flex-shrink: 0; }

.btn-plan {
  width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px;
  padding: 14px; border-radius: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
  background: transparent; color: var(--theme-color); border: 2px solid var(--theme-color); transition: 0.3s;
}
.btn-plan:hover { background: var(--theme-color); color: #1c1917; }
/* Estilo botón destacado */
.featured .btn-plan { background: var(--theme-color); color: #1c1917; }
.featured .btn-plan:hover { filter: brightness(1.1); box-shadow: 0 0 20px var(--theme-color); }

/* SPONSOR & TRUST */
.trust-sec { background: var(--gold); color: #1c1917; padding: 80px 0; text-align: center; }
.trust-content h3 { font-size: 2rem; margin-bottom: 15px; font-weight: 800; }
.trust-content p { font-size: 1.2rem; max-width: 700px; margin: 0 auto 30px; font-weight: 600; line-height: 1.5; }
.btn-dark { background: #1c1917; color: white; padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1rem; }
.btn-dark:hover { transform: scale(1.05); }

/* FAQ */
.faq-sec { padding: 80px 0; max-width: 800px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
.faq-list { display: flex; flex-direction: column; gap: 15px; }
.faq-item { background: var(--bg-card); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; transition: 0.3s; }
.faq-head { padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.1rem; color: #e7e5e4; }
.faq-body { padding: 0 24px 24px; color: var(--text-muted); line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.05); margin-top: -10px; padding-top: 20px; }
.icon-rotate { transition: 0.3s; }
.open .icon-rotate { transform: rotate(180deg); }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .image-frame { margin-top: 40px; }
  .float-badge { left: 50%; transform: translateX(-50%); bottom: -20px; width: max-content; }
  .lead { margin-inline: auto; }
  .hero-actions { justify-content: center; }
  .plan-card.featured { transform: scale(1); }
  h1 { font-size: 2.8rem; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => {
    document.title = "Programa Caminos | Nivelación de Estudios 2025";
    window.scrollTo(0, 0);
  }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL (ESCUELA ADULTOS)
   ────────────────────────────────────────────────────────────────────────── */
export default function EscuelaAdultos() {
  const [activeFaq, setActiveFaq] = useState(null);

  const getWaLink = (plan) => {
    // Texto personalizado para WhatsApp según el plan
    const message = plan.wapp || `Hola Instituto Lael, me interesa el plan ${plan.title} del Programa Caminos.`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="caminos-page">
      <SEOHead />
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-hero">Programa Caminos 2025</div>
            <h1>
              Tu historia no define <br/>
              <span className="text-gold">tu futuro.</span>
            </h1>
            <p className="lead">
              Nunca es tarde para terminar tu enseñanza básica o media. 
              <strong> Sin juicios. Sin miedo. A tu propio ritmo.</strong>
              <br/>Clases diseñadas para adultos que trabajan o cuidan familia.
            </p>
            
            <div className="hero-actions">
              <a href="#planes" className="btn-primary">Ver Becas y Planes</a>
              <a href="#metodo" className="btn-outline">¿Cómo funciona?</a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="image-frame">
              {/* Usa la imagen importada o un placeholder si falla la carga */}
              <img 
                src={HeroImg || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop"} 
                alt="Estudiante Adulto logrando sus metas" 
              />
              <div className="float-badge">
                <div style={{color:'var(--gold)'}}><Icons.Diploma/></div>
                <div>
                  <strong style={{color:'white', display:'block', fontSize:'0.9rem'}}>Validez Oficial</strong>
                  <small style={{color:'#a8a29e', fontSize:'0.8rem'}}>Exámenes Libres Mineduc</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* METODO */}
      <section id="metodo" className="method-sec">
        <div className="container">
          <div className="sec-title">
            <h2>Tecnología con Sentido Social</h2>
            <p>Sabemos que tienes poco tiempo y quizás llevas años sin estudiar. Adaptamos todo para ti.</p>
          </div>
          
          <div className="grid-3">
            <div className="feature-card">
              <div className="icon-circle"><Icons.Video/></div>
              <h3>Clases Flexibles</h3>
              <p>¿Tuviste turno en el trabajo? No te preocupes. Todas las clases quedan grabadas para que las veas cuando puedas.</p>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><Icons.Book/></div>
              <h3>Material al Celular</h3>
              <p>Te enviamos las guías y lecturas directo a WhatsApp en formato liviano. No es obligación tener computador.</p>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><Icons.Heart/></div>
              <h3>Acompañamiento Real</h3>
              <p>No eres un número más. Tenemos tutores pacientes que te ayudan a perder el miedo a equivocarte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="pricing-sec">
        <div className="container">
          <div className="sec-title">
            <h2>Modelo Solidario 1x1</h2>
            <p>Nadie debería quedarse fuera de la educación por dinero. Elige el plan que se adapte a tu realidad actual.</p>
          </div>

          <div className="plans-grid">
            {PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`plan-card ${plan.id === 'trabajador' ? 'featured' : ''}`}
                style={{ '--theme-color': plan.color }}
              >
                <div className="plan-head">
                  <span className="tag">{plan.tag}</span>
                  <h3>{plan.title}</h3>
                  <div className="price-box">
                    <span className="price">
                      {plan.price === 0 ? 'GRATIS' : clp(plan.price)}
                    </span>
                    {plan.frequency && <span className="freq">/{plan.frequency}</span>}
                  </div>
                  <p className="desc">{plan.desc}</p>
                </div>

                <div className="plan-body">
                  <ul>
                    {plan.features.map((feat, i) => (
                      <li key={i}><span className="check">✓</span> {feat}</li>
                    ))}
                  </ul>
                  <a href={getWaLink(plan)} target="_blank" rel="noreferrer" className="btn-plan">
                    <Icons.Whatsapp/> {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / EMPRESAS */}
      <section className="trust-sec">
        <div className="container trust-content">
          <h3>🤝 Para Empresas y Fundaciones</h3>
          <p>
            ¿Quieres nivelar estudios de tus colaboradores o apadrinar un grupo de reinserción social?
            Entregamos reportes de asistencia y certificados de impacto para tu RSE.
          </p>
          <a href="https://wa.me/56964626568?text=Hola,%20soy%20empresa%20y%20quiero%20apadrinar%20estudiantes" target="_blank" rel="noreferrer" className="btn-dark">
            Hablar con Dirección
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-sec">
        <div className="sec-title"><h2>Preguntas Frecuentes</h2></div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item ${activeFaq === i ? 'open' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
              <div className="faq-head">
                {faq.q}
                <div className="icon-rotate" style={{color:'var(--gold)'}}>
                    <Icons.ChevronDown/>
                </div>
              </div>
              {activeFaq === i && <div className="faq-answer faq-body">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}