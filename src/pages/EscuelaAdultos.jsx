// src/pages/EscuelaAdultos.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- ASSETS (Ajusta los nombres de tus imágenes aquí) ---
// Usa imágenes que evoquen superación: un adulto estudiando en el metro, manos escribiendo, etc.
const HeroImg = new URL("../assets/img/lael/study-online.jpg", import.meta.url).href;

/* ================= DATOS DEL PROYECTO (Configuración) ================= */

const clp = (n) => Number(n).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

const PLANS = [
  {
    id: "beca",
    title: "Beca Reinserción",
    price: 0,
    tag: "Cupos Sociales",
    desc: "Para personas en programas de reinserción, gendarmería o situación de calle.",
    features: [
      "Clases grabadas (YouTube - Bajo consumo)",
      "Guías de estudio en PDF por WhatsApp",
      "Inscripción a exámenes Mineduc",
      "Certificado de participación"
    ],
    cta: "Postular a Gratuidad",
    color: "#34D399", // Verde Esperanza
    isHighlight: false,
    wapp: "Hola Instituto Lael. Necesito información para postular a la Beca de Reinserción Gratuita. Mi situación es..."
  },
  {
    id: "trabajador",
    title: "Plan Solidario",
    price: 12990, // Precio bajo que cubre costos
    period: "mensual",
    tag: "Tú estudias, tú ayudas",
    desc: "Para trabajadores. Tu mensualidad financia tu educación y apoya una beca.",
    features: [
      "Todo lo de la Beca",
      "Campus Virtual 24/7",
      "Resolución de dudas prioritaria",
      "Ayudas a financiar a otros ❤️"
    ],
    cta: "Inscribirme",
    color: "#FBBF24", // Dorado
    isHighlight: true,
    wapp: "Hola, soy trabajador y quiero terminar mis estudios con el Plan Solidario de $12.990."
  },
  {
    id: "tutor",
    title: "Plan Tutoría",
    price: 29990,
    period: "mensual",
    tag: "Clases en Vivo",
    desc: "Para quienes necesitan un profesor en vivo y guía constante.",
    features: [
      "Clases en vivo (Zoom)",
      "Corrección de ensayos",
      "Tutoría personalizada",
      "Donas 2 becas completas ❤️"
    ],
    cta: "Inscribirme",
    color: "#818CF8", // Indigo
    isHighlight: false,
    wapp: "Hola, quiero contratar el Plan Tutoría con clases en vivo."
  }
];

const FAQS = [
  { q: "¿Las clases consumen muchos datos?", a: "No. Usamos YouTube en formato optimizado y enviamos los materiales por WhatsApp para que no gastes tus megas." },
  { q: "¿El certificado es válido?", a: "Sí. Te preparamos para los Exámenes Libres del Mineduc. Al aprobar, obtienes tu Licencia de Enseñanza Media válida para trabajar o estudiar." },
  { q: "¿Cuánto dura el proceso?", a: "Depende de tu ritmo. Tenemos ciclos intensivos de 3 meses y ciclos normales de 6 meses. Tú eliges cuándo rendir." },
  { q: "¿Cómo sé si califico a la beca?", a: "Las becas son para personas sin ingresos formales, derivadas de fundaciones o con antecedentes de reinserción. Escríbenos para evaluar tu caso." }
];

/* ================= COMPONENTE PRINCIPAL ================= */

const SEO = () => {
    useEffect(() => { document.title = "Programa Caminos | Nivelación de Estudios"; }, []);
    return null;
};

export default function EscuelaAdultos() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="caminos-page">
      <SEO />
      <style>{css}</style>

      {/* --- HERO: DIGNIDAD Y FUTURO --- */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <img src={HeroImg} alt="Adulto estudiando" className="hero-bg" />
        
        <div className="container hero-content">
            <div className="badge-pill">Programa Caminos 2025</div>
            <h1>
                Tu pasado no define <br/>
                <span className="text-highlight">tu futuro.</span>
            </h1>
            <p className="lead">
                Termina tu enseñanza básica o media a tu ritmo, desde tu celular.
                Un programa diseñado para trabajadores y personas que buscan una 
                <strong> segunda oportunidad real</strong>.
            </p>
            <div className="hero-actions">
                <a href="#planes" className="btn-primary">Ver Planes y Becas</a>
                <a href="#metodo" className="btn-outline">¿Cómo funciona?</a>
            </div>
        </div>
      </header>

      {/* --- EL MÉTODO (Accesibilidad) --- */}
      <section id="metodo" className="method-section">
        <div className="container">
            <div className="sec-title">
                <h2>Estudia sin barreras</h2>
                <p>Sabemos que tu tiempo y tus recursos son valiosos. Creamos esto pensando en ti.</p>
            </div>
            
            <div className="grid-3">
                <div className="feature-card">
                    <span className="icon">📱</span>
                    <h3>Desde tu Celular</h3>
                    <p>Plataforma ligera. Clases grabadas en formato YouTube (privado) para que estudies en el trayecto al trabajo sin gastar de más.</p>
                </div>
                <div className="feature-card">
                    <span className="icon">🕒</span>
                    <h3>A tu Ritmo</h3>
                    <p>Sin horarios fijos obligatorios. Tú decides si estudias de noche, de mañana o los fines de semana. El contenido siempre está ahí.</p>
                </div>
                <div className="feature-card">
                    <span className="icon">📜</span>
                    <h3>Validez Oficial</h3>
                    <p>Te preparamos específicamente para aprobar los Exámenes Libres. Obtén tu licencia de enseñanza media válida por el Estado.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- PLANES (Modelo Solidario) --- */}
      <section id="planes" className="pricing-section">
        <div className="container">
            <div className="sec-title">
                <h2>Elige tu Camino</h2>
                <p>Nuestro modelo es solidario: Quien puede pagar un poco, ayuda a quien no tiene nada.</p>
            </div>

            <div className="plans-container">
                {PLANS.map(plan => (
                    <div key={plan.id} className={`plan-card ${plan.isHighlight ? 'featured' : ''}`}>
                        <div className="plan-header" style={{borderTopColor: plan.color}}>
                            <span className="tag" style={{background: plan.color, color: '#000'}}>{plan.tag}</span>
                            <h3>{plan.title}</h3>
                            <div className="price-box">
                                <span className="currency">{plan.price === 0 ? '' : '$'}</span>
                                <span className="amount">{plan.price === 0 ? 'GRATIS' : plan.price.toLocaleString('es-CL')}</span>
                                {plan.period && <span className="freq">/{plan.period}</span>}
                            </div>
                            <p className="desc">{plan.desc}</p>
                        </div>
                        <div className="plan-body">
                            <ul>
                                {plan.features.map((feat, i) => (
                                    <li key={i}>{feat}</li>
                                ))}
                            </ul>
                            <a 
                                href={`https://wa.me/56964626568?text=${encodeURIComponent(plan.wapp)}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn-plan"
                                style={{
                                    background: plan.isHighlight ? plan.color : 'transparent', 
                                    borderColor: plan.color, 
                                    color: plan.isHighlight ? '#000' : plan.color
                                }}
                            >
                                {plan.cta}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- EMPRESAS (RSE) --- */}
      <section className="sponsor-section">
        <div className="container sponsor-box">
            <div className="sp-content">
                <h3>🤝 Para Empresas y Fundaciones</h3>
                <p>
                    ¿Buscas nivelar estudios de tus colaboradores o apadrinar un grupo de reinserción? 
                    <br/>Gestionamos el proceso completo. Entregamos reportes de avance y certificado de impacto social.
                </p>
            </div>
            <div className="sp-action">
                <a href="https://wa.me/56964626568?text=Hola,%20soy%20empresa%20y%20quiero%20apadrinar%20un%20curso" target="_blank" rel="noreferrer" className="btn-sponsor">
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

/* ================= ESTILOS (DARK PREMIUM & ACCESIBLE) ================= */
const css = `
:root {
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #F59E0B; /* Dorado Esperanza */
  --success: #34D399;
  --radius: 16px;
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
  text-align: center; overflow: hidden;
}
.hero-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover; z-index: 0; opacity: 0.5; filter: contrast(1.1);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(15,23,42,0.6), #0f172a);
  z-index: 1;
}
.hero-content { position: relative; z-index: 2; max-width: 800px; padding-top: 40px; }

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

.lead { font-size: 1.2rem; line-height: 1.6; color: #e2e8f0; margin-bottom: 40px; max-width: 650px; margin-left: auto; margin-right: auto; }

.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
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

/* SECTIONS */
.sec-title { text-align: center; margin-bottom: 60px; }
.sec-title h2 { font-size: 2.5rem; margin-bottom: 12px; font-weight: 800; }
.sec-title p { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

/* METHOD */
.method-section { padding: 80px 0; background: var(--bg-dark); }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

.feature-card {
  background: var(--bg-card); padding: 35px 30px; border-radius: var(--radius); text-align: center;
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

.plan-header { padding: 40px 30px; text-align: center; border-top: 6px solid transparent; background: rgba(0,0,0,0.2); }
.plan-header .tag { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 0.5px; }
.plan-header h3 { font-size: 1.8rem; margin-bottom: 15px; font-weight: 800; }
.price-box { margin-bottom: 15px; display: flex; justify-content: center; align-items: baseline; gap: 4px; }
.currency { font-size: 1.5rem; color: var(--text-muted); }
.amount { font-size: 3rem; font-weight: 800; color: var(--text-main); }
.freq { color: var(--text-muted); font-size: 1rem; }
.desc { font-size: 0.95rem; color: var(--text-muted); font-style: italic; line-height: 1.5; }

.plan-body { padding: 30px; display: flex; flex-direction: column; height: 100%; flex-grow: 1; }
.plan-body ul { list-style: none; padding: 0; margin-bottom: 40px; flex-grow: 1; }
.plan-body li { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; display: flex; align-items: start; gap: 10px; font-size: 0.95rem; }
.plan-body li::before { content: "✓"; color: var(--success); font-weight: bold; flex-shrink: 0; }

.btn-plan {
  display: block; text-align: center; padding: 16px; border-radius: 12px;
  font-weight: 700; text-decoration: none; border: 2px solid; transition: .2s;
  font-size: 1.1rem;
}
.btn-plan:hover { filter: brightness(1.1); transform: translateY(-2px); }

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