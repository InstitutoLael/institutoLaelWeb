// src/pages/LSCh.jsx
// PARTE 1: LÓGICA
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  LSCH_PURPOSES,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* --- 1. Componente SEO Robusto --- */
function SEOHead({ title, description, canonical }) {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
    
    // Función helper para meta tags
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    
    // JSON-LD para Google (Curso)
    const scriptId = "json-ld-lsch";
    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Lengua de Señas Chilena (LSCh) Online",
            "description": description,
            "provider": { "@type": "Organization", "name": "Instituto Lael", "sameAs": "https://www.institutolael.cl" }
        });
        document.head.appendChild(script);
    }
  }, [title, description]);
  return null;
}

/* --- 2. Helper de Scroll Horizontal (Para móviles) --- */
function HScroll({ children }) {
  const ref = useRef(null);
  const scroll = (offset) => ref.current?.scrollBy({ left: offset, behavior: "smooth" });
  return (
    <div className="hscroll-wrap">
      <button className="hscroll-btn left" onClick={() => scroll(-300)}>←</button>
      <div className="hscroll-content" ref={ref}>{children}</div>
      <button className="hscroll-btn right" onClick={() => scroll(300)}>→</button>
    </div>
  );
}

/* --- 3. Componente Principal (Lógica de Negocio) --- */
export default function LSCh() {
  // Estados
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter"); // Default: Trimestral (ticket medio)
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]); // Default: Módulo 1
  const [certSelected, setCertSelected] = useState(false);
  const builderRef = useRef(null);

  // Cálculos de Precio en Tiempo Real
  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0], [selectedGroupId]);
  const onePlan = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);

  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;
  const totalFirstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  // Handlers
  const toggleModule = (id) => {
    setSelectedModules(prev => {
        // Lógica inteligente: Si quita el M1, sugerir mantenerlo o limpiar todo?
        // Aquí dejamos que el usuario elija libremente, pero siempre debe haber 1 seleccionado para vender.
        if (prev.includes(id) && prev.length === 1) return prev; 
        return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  // WhatsApp Link Generador (Venta Consultiva)
  const waLink = useMemo(() => {
    const text = `Hola 👋, estoy en la web de LSCh.
Quiero inscribirme en:
- Plan: ${groupPlan.title} ${church ? '(Convenio Iglesia)' : ''}
- Módulos: ${selectedModules.length} seleccionados
- Total mensual: ${clp(totalMonthly)}
- Primer pago: ${clp(totalFirstPayment)}

¿Me ayudan con el link de pago?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [groupPlan, church, selectedModules, totalMonthly, totalFirstPayment]);

  // ANIMACIÓN DE NÚMEROS (Social Proof)
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-num');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const inc = target / 50;
                const update = () => {
                    count += inc;
                    if(count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        entry.target.innerText = target + (entry.target.getAttribute('data-plus') || "");
                    }
                };
                update();
                observer.unobserve(entry.target);
            }
        });
    });
    counters.forEach(c => observer.observe(c));
  }, []);
// PARTE 2: HTML
  return (
    <section className="lsch-page">
      <SEOHead 
        title="Curso de Lengua de Señas Chilena (LSCh) | Admisión 2025" 
        description="Aprende LSCh con docentes sordas. Clases en vivo, plataforma 24/7 y certificación oficial. Descuento exclusivo para Iglesias." 
        canonical="https://www.institutolael.cl/lsch" 
      />
      
      {/* Insertaremos el CSS al final */}
      <style>{css}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <div className="badge-new">🔥 Matrículas Abiertas</div>
            <h1 className="hero-title">
              La Lengua de Señas <br/>
              <span className="text-gradient">se aprende viviendo.</span>
            </h1>
            <p className="hero-lead">
              Olvídate de memorizar señas sueltas. Entra a un programa de inmersión cultural con <b>docentes sordas nativas</b>, clases en vivo y una plataforma que no te deja solo.
            </p>
            
            <div className="hero-stats">
                <div className="stat-item">
                    <span className="stat-num" data-target="98" data-plus="%">0</span>
                    <span className="stat-label">Satisfacción</span>
                </div>
                <div className="stat-item">
                    <span className="stat-num" data-target="1500" data-plus="+">0</span>
                    <span className="stat-label">Egresados</span>
                </div>
                <div className="stat-item">
                    <span className="stat-num" data-target="100" data-plus="%">0</span>
                    <span className="stat-label">Clases en Vivo</span>
                </div>
            </div>

            <div className="hero-cta-group">
                <button onClick={() => builderRef.current?.scrollIntoView({behavior: 'smooth'})} className="btn btn-primary btn-glow">
                    Ver Planes y Precios
                </button>
                <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-text">
                    Hablar con Asesoría
                </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="image-frame">
                <img src={senasImg} alt="Clase de LSCh en vivo con profesora sorda" loading="eager" />
                <div className="floating-card glass">
                    <span className="icon">👩‍🏫</span>
                    <div>
                        <strong>Docencia Sorda</strong>
                        <small>Inmersión Real Garantizada</small>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SOCIAL PROOF / LOGOS (Opcional, da autoridad) --- */}
      <div className="trust-bar">
        <div className="container">
            <p>El programa elegido por líderes de inclusión en:</p>
            <div className="trust-logos">
                <span>Iglesias</span>
                <span>Colegios</span>
                <span>Salud</span>
                <span>Servicios Públicos</span>
            </div>
        </div>
      </div>

      {/* --- BUILDER (El corazón de la venta) --- */}
      <div ref={builderRef} className="builder-section">
        <div className="container">
            
            {/* 1. TOGGLE IGLESIA (El Gancho) */}
            <div className="church-banner glass">
                <div className="cb-info">
                    <div className="cb-icon">⛪</div>
                    <div>
                        <h3>¿Perteneces a una Iglesia o Ministerio?</h3>
                        <p>Tenemos un compromiso con la accesibilidad. Activa el convenio y accede a precios preferenciales.</p>
                    </div>
                </div>
                <label className="toggle-switch">
                    <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
                    <span className="slider"></span>
                    <span className="label-text">{church ? "Convenio Activado" : "Activar Convenio"}</span>
                </label>
            </div>

            <div className="builder-grid">
                {/* COLUMNA IZQUIERDA: SELECCIÓN */}
                <div className="builder-main">
                    
                    {/* PASO 1: MÓDULOS */}
                    <div className="step-block">
                        <div className="step-header">
                            <span className="step-num">1</span>
                            <h3>Elige tu Nivel</h3>
                        </div>
                        <div className="modules-list">
                            {LSCH_MODULES.map(m => {
                                const isActive = selectedModules.includes(m.id);
                                return (
                                    <div key={m.id} className={`module-card ${isActive ? 'active' : ''}`} onClick={() => toggleModule(m.id)}>
                                        <div className="mc-left">
                                            <div className={`checkbox ${isActive ? 'checked' : ''}`}></div>
                                            <div>
                                                <h4>{m.name}</h4>
                                                <span className="mc-tag">{m.tag}</span>
                                            </div>
                                        </div>
                                        <div className="mc-right">
                                            <ul>{m.bullets.slice(0, 2).map((b,i) => <li key={i}>{b}</li>)}</ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* PASO 2: PLAN DE PAGO */}
                    <div className="step-block">
                        <div className="step-header">
                            <span className="step-num">2</span>
                            <h3>Elige tu Plan</h3>
                        </div>
                        <HScroll>
                            {LSCH_GROUP_PLANS.map(p => {
                                const isActive = selectedGroupId === p.id;
                                const price = priceForGroupPlan(p, { church });
                                return (
                                    <div key={p.id} className={`plan-card ${isActive ? 'active' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                                        {p.badge && <span className="plan-badge">{p.badge}</span>}
                                        <div className="plan-name">{p.title}</div>
                                        <div className="plan-price">
                                            <span className="curr">$</span>
                                            {price.toLocaleString('es-CL')}
                                            <span className="per">/mes</span>
                                        </div>
                                        <div className="plan-desc">
                                            {church ? "Precio Convenio Iglesia" : "Ahorro por pago adelantado"}
                                        </div>
                                        <div className={`plan-radio ${isActive ? 'on' : ''}`}></div>
                                    </div>
                                )
                            })}
                        </HScroll>
                    </div>

                    {/* PASO 3: EXTRAS */}
                    <div className="step-block">
                        <div className="step-header">
                            <span className="step-num">3</span>
                            <h3>Potencia tu aprendizaje</h3>
                        </div>
                        <div className="extras-list">
                            {/* Certificado */}
                            <div className={`extra-item ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                                <span className="ex-icon">🎓</span>
                                <div className="ex-info">
                                    <h4>Certificación Oficial</h4>
                                    <p>Diploma digital verificable para tu CV.</p>
                                </div>
                                <div className="ex-price">
                                    +{clp(CERTIFICATE_FEE)} <small>único</small>
                                </div>
                                <div className={`checkbox ${certSelected ? 'checked' : ''}`}></div>
                            </div>
                            
                            {/* 1:1 */}
                            {LSCH_ONE2ONE_PLANS.map(p => (
                                <div key={p.id} className={`extra-item ${selectedOneId === p.id ? 'active' : ''}`} onClick={() => setSelectedOneId(selectedOneId === p.id ? null : p.id)}>
                                    <span className="ex-icon">💎</span>
                                    <div className="ex-info">
                                        <h4>Clases 1 a 1</h4>
                                        <p>Refuerzo privado con la docente.</p>
                                    </div>
                                    <div className="ex-price">
                                        +{clp(p.monthly)} <small>/mes</small>
                                    </div>
                                    <div className={`checkbox ${selectedOneId === p.id ? 'checked' : ''}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* COLUMNA DERECHA: RESUMEN FLOTANTE (Desktop) */}
                <div className="builder-sidebar">
                    <div className="summary-card glass">
                        <h3>Tu Resumen</h3>
                        <div className="sum-rows">
                            <div className="sum-row">
                                <span>Plan {groupPlan.title}</span>
                                <strong>{clp(monthlyGroup)}/mes</strong>
                            </div>
                            {onePlan && (
                                <div className="sum-row">
                                    <span>Clases 1:1</span>
                                    <strong>+{clp(monthlyOne)}/mes</strong>
                                </div>
                            )}
                            {certSelected && (
                                <div className="sum-row">
                                    <span>Certificación</span>
                                    <strong>{clp(CERTIFICATE_FEE)}</strong>
                                </div>
                            )}
                            <div className="sum-divider"></div>
                            <div className="sum-total">
                                <span>Mensualidad</span>
                                <span className="big-price">{clp(totalMonthly)}</span>
                            </div>
                            <div className="sum-first">
                                <span>Primer pago hoy:</span>
                                <strong>{clp(totalFirstPayment)}</strong>
                                <small>(Incluye matrícula única {clp(LSCH_ENROLLMENT_FEE)})</small>
                            </div>
                        </div>
                        <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-block btn-glow">
                            Inscribirme Ahora
                        </a>
                        <p className="secure-text">🔒 Pago seguro vía Webpay / Transferencia</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- STICKY BAR (Solo Móvil) --- */}
      <div className="sticky-mobile glass">
        <div className="sm-info">
            <span className="sm-label">Total Mensual</span>
            <span className="sm-price">{clp(totalMonthly)}</span>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Inscribirme
        </a>
      </div>

    </section>
  );
}
/* PARTE 3: CSS DE ALTA CONVERSIÓN */
const css = `
:root {
  /* Paleta Luxury Dark */
  --bg-body: #0B1121;       /* Fondo ultra oscuro */
  --bg-card: #151E32;       /* Fondo tarjetas */
  --bg-glass: rgba(21, 30, 50, 0.7);
  --primary: #6366F1;       /* Azul Eléctrico */
  --primary-glow: rgba(99, 102, 241, 0.4);
  --accent: #10B981;        /* Verde Éxito */
  --gold: #F59E0B;          /* Dorado Premium */
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255, 255, 255, 0.08);
  --radius: 16px;
  --nav-clearance: 120px;   /* Espacio para barra móvil */
}

/* --- BASE --- */
.lsch-page {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: var(--nav-clearance);
}

.container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; transition: .2s; }
button { border: none; background: none; cursor: pointer; font-family: inherit; }

/* --- UTILIDADES --- */
.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.text-gradient {
  background: linear-gradient(135deg, #818CF8 0%, #34D399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- HERO SECTION --- */
.hero {
  position: relative;
  padding: 60px 0 80px;
  background: radial-gradient(circle at 80% 20%, rgba(99,102,241,0.15), transparent 50%);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
}

.badge-new {
  display: inline-block;
  background: rgba(16, 185, 129, 0.1);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 24px;
}

.hero-lead {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 540px;
}
.hero-lead b { color: var(--text-main); }

/* Stats Animados */
.hero-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  border-left: 2px solid var(--border);
  padding-left: 20px;
}
.stat-item { display: flex; flex-direction: column; }
.stat-num { font-size: 1.8rem; font-weight: 800; color: var(--text-main); line-height: 1; }
.stat-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; }

/* Botones Hero */
.hero-cta-group { display: flex; gap: 16px; align-items: center; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 14px var(--primary-glow);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--primary-glow);
  background: #4F46E5;
}
.btn-text { color: var(--text-muted); border: 1px solid var(--border); }
.btn-text:hover { border-color: var(--text-main); color: var(--text-main); }
.btn-glow { animation: pulse 3s infinite; }

/* Hero Visual */
.image-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s;
}
.image-frame:hover { transform: perspective(1000px) rotateY(0deg); }
.image-frame img { width: 100%; display: block; }

.floating-card {
  position: absolute; bottom: 20px; right: 20px;
  padding: 12px 20px; border-radius: 16px;
  display: flex; align-items: center; gap: 12px;
}
.floating-card .icon { font-size: 2rem; }
.floating-card div { display: flex; flex-direction: column; }
.floating-card strong { font-size: 0.95rem; line-height: 1.2; }
.floating-card small { font-size: 0.75rem; color: var(--accent); font-weight: 600; }

/* --- TRUST BAR --- */
.trust-bar {
  padding: 30px 0;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  text-align: center;
}
.trust-bar p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.trust-logos {
  display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;
  font-weight: 700; color: #475569; font-size: 1.2rem;
}

/* --- BUILDER SECTION --- */
.builder-section { padding: 60px 0; }

/* Toggle Iglesia */
.church-banner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 32px; border-radius: 20px; margin-bottom: 50px;
  background: linear-gradient(90deg, rgba(30, 41, 59, 0.6) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-color: rgba(16, 185, 129, 0.3);
}
.cb-info { display: flex; gap: 20px; align-items: center; }
.cb-icon { font-size: 2.5rem; }
.cb-info h3 { margin: 0 0 4px; font-size: 1.2rem; }
.cb-info p { margin: 0; font-size: 0.95rem; color: var(--text-muted); }

.toggle-switch { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.toggle-switch input { display: none; }
.slider {
  width: 56px; height: 32px; background: var(--bg-card); border-radius: 32px;
  position: relative; border: 1px solid var(--border); transition: .3s;
}
.slider::before {
  content:''; position: absolute; width: 24px; height: 24px; background: white;
  border-radius: 50%; top: 3px; left: 3px; transition: .3s; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.toggle-switch input:checked + .slider { background: var(--accent); border-color: var(--accent); }
.toggle-switch input:checked + .slider::before { transform: translateX(24px); }
.label-text { font-weight: 700; font-size: 0.9rem; }

/* Grid Layout */
.builder-grid {
  display: grid;
  grid-template-columns: 1fr 380px; /* Sidebar fijo de 380px */
  gap: 40px;
  align-items: start;
}

/* Steps */
.step-block { margin-bottom: 50px; }
.step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.step-num {
  background: var(--primary); color: white; width: 32px; height: 32px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1rem;
}
.step-header h3 { margin: 0; font-size: 1.4rem; }

/* Modules List */
.modules-list { display: grid; gap: 16px; }
.module-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 20px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px;
  cursor: pointer; transition: .2s;
}
.module-card:hover { border-color: var(--text-muted); transform: translateY(-2px); }
.module-card.active {
  border-color: var(--primary); background: rgba(99, 102, 241, 0.08);
  box-shadow: 0 0 0 1px var(--primary);
}
.mc-left { display: flex; gap: 15px; align-items: center; }
.checkbox {
  width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--border);
  flex-shrink: 0; transition: .2s;
}
.checkbox.checked { background: var(--primary); border-color: var(--primary); box-shadow: inset 0 0 0 4px var(--bg-card); }
.mc-left h4 { margin: 0 0 4px; font-size: 1.1rem; }
.mc-tag {
  font-size: 0.75rem; text-transform: uppercase; font-weight: 700;
  color: var(--primary); background: rgba(99,102,241,0.15);
  padding: 2px 8px; border-radius: 4px;
}
.mc-right ul { margin: 0; padding-left: 20px; font-size: 0.9rem; color: var(--text-muted); }

/* Horizontal Scroll Plans */
.hscroll-wrap { position: relative; display: flex; align-items: center; }
.hscroll-content {
  display: flex; gap: 16px; overflow-x: auto; padding: 10px 4px 20px;
  scroll-snap-type: x mandatory; width: 100%; scrollbar-width: none;
}
.hscroll-content::-webkit-scrollbar { display: none; }
.hscroll-btn {
  width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card);
  border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
  position: absolute; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.3); color: var(--text-main);
}
.hscroll-btn:hover { background: var(--primary); }
.hscroll-btn.left { left: -20px; }
.hscroll-btn.right { right: -20px; }

.plan-card {
  min-width: 260px; scroll-snap-align: center;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 24px; display: flex; flex-direction: column; cursor: pointer; transition: .2s;
  position: relative; overflow: hidden;
}
.plan-card.active { border-color: var(--gold); background: #1a202c; box-shadow: 0 0 0 1px var(--gold); }
.plan-badge {
  position: absolute; top: 12px; right: 12px; background: var(--gold); color: black;
  font-size: 0.7rem; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;
}
.plan-name { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
.plan-price { font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 5px; }
.plan-price .curr { font-size: 1.1rem; }
.plan-price .per { font-size: 0.9rem; color: var(--text-muted); font-weight: 400; }
.plan-desc { font-size: 0.85rem; color: var(--accent); margin-bottom: 20px; min-height: 20px; }
.plan-radio {
  width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 50%; margin-top: auto;
}
.plan-radio.on { background: var(--gold); border-color: var(--gold); box-shadow: inset 0 0 0 4px var(--bg-card); }

/* Extras */
.extras-list { display: grid; gap: 16px; }
.extra-item {
  display: flex; align-items: center; gap: 16px; background: var(--bg-card);
  padding: 16px; border-radius: var(--radius); border: 1px solid var(--border); cursor: pointer;
}
.extra-item.active { border-color: var(--primary); background: rgba(99,102,241,0.05); }
.ex-icon { font-size: 1.8rem; }
.ex-info { flex: 1; }
.ex-info h4 { margin: 0; font-size: 1rem; }
.ex-info p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
.ex-price { text-align: right; font-weight: 700; color: var(--primary); font-size: 1rem; margin-right: 15px; }

/* Sidebar Summary */
.builder-sidebar { position: sticky; top: 20px; height: fit-content; }
.summary-card { padding: 30px; border-radius: 24px; }
.summary-card h3 { margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; }
.sum-divider { height: 1px; background: var(--border); margin: 20px 0; }
.sum-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.big-price { font-size: 2rem; font-weight: 800; color: var(--text-main); }
.sum-first {
  background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 8px;
  text-align: center; margin-bottom: 24px; border: 1px solid rgba(16, 185, 129, 0.2);
}
.sum-first span { display: block; font-size: 0.8rem; color: var(--text-muted); }
.sum-first strong { font-size: 1.3rem; color: var(--accent); display: block; margin: 4px 0; }
.sum-first small { font-size: 0.75rem; color: var(--text-muted); display: block; }
.btn-block { width: 100%; text-align: center; padding: 16px; font-size: 1.1rem; }
.secure-text { text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 15px; display: flex; align-items: center; justify-content: center; gap: 6px; }

/* Sticky Mobile Bar */
.sticky-mobile {
  position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
  padding: 16px 24px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(11, 17, 33, 0.9);
}
.sm-info { display: flex; flex-direction: column; }
.sm-label { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); }
.sm-price { font-size: 1.5rem; font-weight: 800; }

/* --- RESPONSIVE --- */
@media (min-width: 901px) {
  .sticky-mobile { display: none; }
}

@media (max-width: 900px) {
  .hero__grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
  .hero-lead { margin-left: auto; margin-right: auto; }
  .hero-stats { justify-content: center; border-left: none; padding-left: 0; border-top: 2px solid var(--border); padding-top: 20px; }
  .hero-cta-group { justify-content: center; }
  .image-frame { max-width: 500px; margin: 0 auto; transform: none; }
  .builder-grid { grid-template-columns: 1fr; }
  .builder-sidebar { display: none; } /* Ocultamos sidebar en móvil y usamos sticky bar */
  .church-banner { flex-direction: column; text-align: center; gap: 20px; }
  .module-card { grid-template-columns: 1fr; }
  .mc-right { display: none; } /* Simplificar en móvil */
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}
`;