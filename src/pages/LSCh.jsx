// src/pages/LSCh.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  LSCH_PURPOSES,
  CHURCH_CONVENIO,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import { Link, useLocation } from "react-router-dom";
import senasImg from "../assets/img/lael/senas.jpg";
import laelLogoWhite from "../assets/img/Logos/lael-inst-blanco.png";

const CERTIFICATE_FEE = 19990;

/* --------- SEO Component (Integrado) --------- */
function SEOHead({ title, description, canonical, keywords = [], image, jsonLd = [] }) {
    const location = useLocation();
    useEffect(() => {
      document.title = title;
      // ... (Lógica simplificada de meta tags para este ejemplo)
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
      return () => { document.head.removeChild(script); }
    }, [title, description, jsonLd]);
    return null;
}

/* --------- UI: Horizontal Scroll --------- */
function HScroll({ children, ariaLabel }) {
  const ref = useRef(null);
  const slide = (dir) => {
    const el = ref.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.8) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };
  return (
    <div className="hscroll-wrapper">
      <button className="hs-nav prev" onClick={() => slide("prev")} aria-label="Anterior">←</button>
      <div className="hscroll-track" ref={ref} aria-label={ariaLabel}>{children}</div>
      <button className="hs-nav next" onClick={() => slide("next")} aria-label="Siguiente">→</button>
    </div>
  );
}

/* ====================== PAGE ====================== */
export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState(LSCH_PURPOSES?.[0] ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]);
  const [certSelected, setCertSelected] = useState(false);

  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId), [selectedGroupId]);
  const onePlan   = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);

  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne   = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;

  const selectedModulesLabels = useMemo(
    () => LSCH_MODULES.filter(m => selectedModules.includes(m.id)).map(m => m.name),
    [selectedModules]
  );

  const toggleModule = (id) => {
    setSelectedModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const whatsappText = encodeURIComponent([
    "Hola 👋, quiero info de LSCh.",
    `Convenio iglesias: ${church ? "Sí" : "No"}`,
    `Plan: ${groupPlan?.title || "—"} (${clp(monthlyGroup)}/mes)`,
    `1:1: ${onePlan ? "Sí" : "No"}`,
    `Módulos: ${selectedModules.length}`,
    `Certificado: ${certSelected ? "Sí" : "No"}`,
    `Total aprox: ${clp(totalMonthly)}/mes`
  ].join("\n"));

  /* ======= SEO Data ======= */
  const faqEntities = [
    { "@type": "Question", name: "¿Quedan grabadas?", acceptedAnswer: { "@type": "Answer", text: "Sí, el mismo día." } },
    { "@type": "Question", name: "¿Certificado?", acceptedAnswer: { "@type": "Answer", text: `Sí, opcional (+${clp(CERTIFICATE_FEE)}).` } }
  ];

  return (
    <section className="lsch-page">
      <SEOHead
        title="Curso de Lengua de Señas Chilena Online | Instituto Lael"
        description="Aprende LSCh con docentes sordas y clases en vivo. Precio especial para iglesias."
        canonical="https://www.institutolael.cl/lsch"
        keywords={["LSCh", "Lengua de Señas", "Curso Sense", "Inclusión"]}
        jsonLd={[{ "@context": "https://schema.org", "@type": "Course", "name": "LSCh Online", "provider": "Instituto Lael" }, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqEntities }]}
      />

      <style>{css}</style>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-bg-glow"></div>
        <div className="container hero__grid">
          <div className="hero__content">
            <div className="pill-badge">🤟 Admisión 2025</div>
            <h1 className="hero-title">
              Lengua de Señas <br/>
              <span className="text-gradient">Real y Sin Enredos.</span>
            </h1>

            <p className="hero-desc">
              Deja de aprender palabras sueltas. Domina la gramática y la cultura con <b>docentes sordas</b> y clases en vivo.
              <br/>Precio especial para <b>iglesias y grupos</b>.
            </p>

            <div className="hero-badges">
                <span className="icon-tag">🔴 Clases en vivo</span>
                <span className="icon-tag">📹 Grabaciones 24/7</span>
                <span className="icon-tag">🎓 Certificado</span>
            </div>

            <div className="hero-actions">
                <button onClick={() => document.getElementById('builder').scrollIntoView({behavior: 'smooth'})} className="btn btn-primary btn-glow">
                    Ver Precios y Horarios
                </button>
                <a className="btn btn-text" href={`https://wa.me/56964626568?text=${whatsappText}`} target="_blank" rel="noreferrer">
                    Hablar con un asesor →
                </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="img-frame">
              <img src={senasImg} alt="Clase LSCh" loading="eager" />
              <div className="floating-card glass">
                 <span>👩‍🏫</span>
                 <div>
                    <strong>Docentes Sordas</strong>
                    <small>Inmersión cultural real</small>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BUILDER SECTION */}
      <div id="builder" className="builder-bg">
        <div className="container">
            
            {/* CONVENIO TOGGLE */}
            <div className="convenio-banner glass">
                <div className="conv-info">
                    <div className="conv-icon">⛪</div>
                    <div>
                        <h3>¿Perteneces a una Iglesia?</h3>
                        <p>Activa el convenio para acceder a precios preferenciales.</p>
                    </div>
                </div>
                <label className="toggle-switch">
                    <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
                    <span className="slider"></span>
                    <span className="label-text">{church ? "Convenio Activado" : "Activar Convenio"}</span>
                </label>
            </div>

            {/* MÓDULOS */}
            <section className="section-block">
                <div className="sec-header">
                    <h2>1. Elige tus Módulos</h2>
                    <p>Arma tu ruta de aprendizaje a tu ritmo.</p>
                </div>
                
                <div className="modules-grid">
                    {LSCH_MODULES.map(m => {
                        const active = selectedModules.includes(m.id);
                        return (
                            <div key={m.id} className={`module-card ${active ? 'active' : ''}`} onClick={() => toggleModule(m.id)}>
                                <div className="mc-head">
                                    <span className="mc-tag">{m.tag}</span>
                                    <div className={`checkbox ${active ? 'checked' : ''}`}></div>
                                </div>
                                <h3>{m.name}</h3>
                                <ul className="mc-list">
                                    {m.bullets.slice(0,3).map((b,i) => <li key={i}>{b}</li>)}
                                </ul>
                                <div className="mc-foot">
                                    <span className="mini-chip">{m.servesFor[0]}</span>
                                    {active ? <span className="status-text on">Seleccionado</span> : <span className="status-text">Agregar</span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* PLANES */}
            <section className="section-block">
                <div className="sec-header">
                    <h2>2. Elige tu Plan de Pago</h2>
                    <p>{church ? "Precios de convenio eclesiástico aplicados." : "Ahorra pagando trimestral o semestral."}</p>
                </div>

                <HScroll>
                    {LSCH_GROUP_PLANS.map(p => {
                        const active = selectedGroupId === p.id;
                        const monthly = priceForGroupPlan(p, { church });
                        return (
                            <div key={p.id} className={`plan-card ${active ? 'active' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                                {p.badge && <span className="plan-badge">{p.badge}</span>}
                                <h3 className="plan-title">{p.title}</h3>
                                <div className="plan-price">
                                    <span className="currency">$</span>
                                    {monthly.toLocaleString('es-CL')}
                                    <small>/mes</small>
                                </div>
                                <div className="plan-check">
                                    <div className={`radio-circle ${active ? 'on' : ''}`}></div>
                                    {active ? "Elegido" : "Seleccionar"}
                                </div>
                            </div>
                        )
                    })}
                </HScroll>
            </section>

             {/* EXTRAS */}
             <section className="section-block">
                <div className="sec-header">
                    <h2>3. Personaliza tu experiencia</h2>
                </div>
                <div className="extras-grid">
                    {/* 1:1 */}
                    <div className={`extra-card ${selectedOneId ? 'active' : ''}`}>
                         <div className="ex-icon">💎</div>
                         <div className="ex-info">
                            <h4>Clases Particulares 1:1</h4>
                            <p>Refuerzo personalizado con docente.</p>
                         </div>
                         <div className="ex-action">
                             {LSCH_ONE2ONE_PLANS.map(p => (
                                 <button key={p.id} onClick={() => setSelectedOneId(selectedOneId === p.id ? null : p.id)} className={`btn-outline ${selectedOneId === p.id ? 'on' : ''}`}>
                                    {selectedOneId === p.id ? 'Quitar' : `Agregar (+${clp(p.monthly)})`}
                                 </button>
                             ))}
                         </div>
                    </div>

                    {/* CERTIFICADO */}
                    <div className={`extra-card ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                        <div className="ex-icon">📜</div>
                        <div className="ex-info">
                            <h4>Certificación Oficial</h4>
                            <p>Diploma digital verificable.</p>
                        </div>
                        <div className="ex-action">
                            <div className={`toggle-btn ${certSelected ? 'on' : ''}`}>
                                {certSelected ? `Agregado (+${clp(CERTIFICATE_FEE)})` : 'Agregar'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="purposes-row">
                    <span>Mi objetivo es:</span>
                    <div className="chips-row">
                        {LSCH_PURPOSES.map(p => (
                            <button key={p} className={`chip-btn ${purpose === p ? 'active' : ''}`} onClick={() => setPurpose(p)}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
             </section>
        </div>
      </div>

      {/* STICKY BAR (MÓVIL Y DESKTOP) */}
      <div className="sticky-wrapper">
         <div className="sticky-bar glass">
            <div className="sb-info">
                <div className="sb-label">Tu Inversión Mensual</div>
                <div className="sb-price">
                    {clp(totalMonthly)} <small>/ mes</small>
                </div>
                <div className="sb-detail">
                    {selectedModules.length} Módulos + {groupPlan?.title} {church && "· Iglesia"}
                </div>
            </div>
            <div className="sb-actions">
                <div className="sb-matricula">
                    + matrícula única {clp(LSCH_ENROLLMENT_FEE)}
                </div>
                <Link to="/inscripcion" className="btn btn-primary btn-wide">
                    Inscribirme Ahora
                </Link>
            </div>
         </div>
      </div>

    </section>
  );
}

/* ===================== ESTILOS MODERNOS (PREMIUM DARK) ===================== */
const css = `
:root {
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --bg-card-hover: #334155;
  --primary: #3b82f6;      /* Azul Eléctrico */
  --primary-glow: rgba(59, 130, 246, 0.5);
  --accent: #10b981;       /* Verde Éxito */
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --gold: #f59e0b;
  --border: rgba(255,255,255,0.1);
  --radius: 16px;
  --nav-clearance: 140px;
}

/* BASE */
.lsch-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: var(--nav-clearance);
}
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* HERO */
.hero { position: relative; padding: 60px 0 40px; overflow: hidden; }
.hero-bg-glow {
    position: absolute; top: -20%; right: -10%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
    pointer-events: none;
}
.hero__grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; position: relative; z-index: 1; }
@media (max-width: 900px) { .hero__grid { grid-template-columns: 1fr; text-align: center; } }

.pill-badge { 
    display: inline-block; background: rgba(59,130,246,0.1); color: #60a5fa; 
    border: 1px solid rgba(59,130,246,0.3); padding: 6px 14px; border-radius: 50px; 
    font-size: 0.85rem; font-weight: 700; margin-bottom: 20px;
}
.hero-title { font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 20px; font-weight: 800; }
.text-gradient { 
    background: linear-gradient(90deg, #60a5fa, #34d399); 
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
}
.hero-desc { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; }
.hero-desc b { color: var(--text-main); }

.hero-badges { display: flex; gap: 12px; margin-bottom: 30px; flex-wrap: wrap; }
@media (max-width: 900px) { .hero-badges { justify-content: center; } }
.icon-tag { background: var(--bg-card); padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; border: 1px solid var(--border); }

.hero-actions { display: flex; gap: 15px; align-items: center; }
@media (max-width: 900px) { .hero-actions { justify-content: center; flex-direction: column; } }

.btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 15px var(--primary-glow); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px var(--primary-glow); }
.btn-glow { animation: pulse 3s infinite; }
.btn-text { color: var(--text-muted); }
.btn-text:hover { color: var(--text-main); }
.btn-wide { width: 100%; }

/* HERO IMAGE */
.img-frame { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.img-frame img { width: 100%; display: block; }
.floating-card { 
    position: absolute; bottom: 20px; left: -20px; background: rgba(30,41,59,0.9); 
    padding: 12px 18px; border-radius: 12px; display: flex; gap: 10px; align-items: center;
    border: 1px solid var(--border); backdrop-filter: blur(10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
@media (max-width: 900px) { .floating-card { left: 50%; transform: translateX(-50%); bottom: -15px; width: max-content; } }

/* BUILDER AREA */
.builder-bg { padding: 40px 0; }
.glass { background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(12px); border: 1px solid var(--border); }

/* CONVENIO BANNER */
.convenio-banner { 
    display: flex; justify-content: space-between; align-items: center; padding: 20px; 
    border-radius: 16px; margin-bottom: 40px; background: linear-gradient(90deg, rgba(30,41,59,0.8), rgba(16,185,129,0.1));
    border: 1px solid rgba(16,185,129,0.3);
}
@media (max-width: 700px) { .convenio-banner { flex-direction: column; gap: 20px; text-align: center; } }

.conv-info { display: flex; gap: 15px; align-items: center; }
.conv-icon { font-size: 2rem; }
.conv-info h3 { margin: 0 0 4px; font-size: 1.1rem; }
.conv-info p { margin: 0; color: var(--text-muted); font-size: 0.9rem; }

.toggle-switch { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.toggle-switch input { display: none; }
.toggle-switch .slider { width: 50px; height: 28px; background: var(--bg-card); border-radius: 30px; position: relative; transition: .3s; border: 1px solid var(--border); }
.toggle-switch .slider::before { content: ""; position: absolute; width: 22px; height: 22px; background: white; border-radius: 50%; top: 2px; left: 2px; transition: .3s; }
.toggle-switch input:checked + .slider { background: var(--accent); border-color: var(--accent); }
.toggle-switch input:checked + .slider::before { transform: translateX(22px); }
.toggle-switch .label-text { font-weight: 700; font-size: 0.9rem; }

/* SECTIONS */
.section-block { margin-bottom: 50px; }
.sec-header { margin-bottom: 20px; }
.sec-header h2 { font-size: 1.5rem; margin-bottom: 5px; }

/* MODULES GRID */
.modules-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.module-card { 
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; 
    transition: all 0.2s; cursor: pointer; position: relative; overflow: hidden;
}
.module-card:hover { transform: translateY(-4px); border-color: var(--text-muted); }
.module-card.active { border-color: var(--primary); background: rgba(59,130,246,0.1); box-shadow: 0 0 0 1px var(--primary); }

.mc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.mc-tag { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--primary); background: rgba(59,130,246,0.1); padding: 4px 8px; border-radius: 6px; }
.checkbox { width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--border); transition: .2s; }
.checkbox.checked { background: var(--primary); border-color: var(--primary); box-shadow: inset 0 0 0 4px var(--bg-card); }

.mc-list { padding-left: 20px; margin: 10px 0; color: var(--text-muted); font-size: 0.9rem; }
.mc-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; border-top: 1px solid var(--border); padding-top: 10px; }
.mini-chip { font-size: 0.75rem; color: var(--text-muted); background: var(--bg-dark); padding: 2px 8px; border-radius: 4px; }
.status-text { font-weight: 700; font-size: 0.85rem; color: var(--text-muted); }
.status-text.on { color: var(--primary); }

/* SCROLL PLANS */
.hscroll-wrapper { position: relative; }
.hscroll-track { display: flex; gap: 15px; overflow-x: auto; padding: 10px 5px 20px; scroll-snap-type: x mandatory; scrollbar-width: none; }
.hscroll-track::-webkit-scrollbar { display: none; }
.hs-nav { 
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; 
    width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border); 
    color: var(--text-main); font-size: 1.2rem; display: grid; place-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
.hs-nav:hover { background: var(--primary); border-color: var(--primary); }
.hs-nav.prev { left: -10px; }
.hs-nav.next { right: -10px; }

.plan-card { 
    min-width: 260px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; 
    scroll-snap-align: start; cursor: pointer; transition: .2s; display: flex; flex-direction: column;
}
.plan-card.active { border-color: var(--gold); background: rgba(245,158,11,0.05); box-shadow: 0 0 0 1px var(--gold); }
.plan-badge { background: var(--gold); color: black; font-weight: 800; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; align-self: flex-start; margin-bottom: 8px; text-transform: uppercase; }
.plan-title { margin: 0 0 10px; font-size: 1.1rem; }
.plan-price { font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px; }
.plan-price small { font-size: 0.9rem; color: var(--text-muted); font-weight: 400; }
.plan-check { margin-top: auto; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.9rem; color: var(--text-muted); }
.radio-circle { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 50%; }
.radio-circle.on { background: var(--gold); border-color: var(--gold); box-shadow: inset 0 0 0 4px var(--bg-card); }

/* EXTRAS & PURPOSES */
.extras-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
.extra-card { 
    display: flex; gap: 15px; background: var(--bg-card); padding: 16px; border-radius: 16px; border: 1px solid var(--border); align-items: center; 
    transition: .2s;
}
.extra-card.active { border-color: var(--accent); background: rgba(16,185,129,0.05); }
.ex-icon { font-size: 2rem; }
.ex-info h4 { margin: 0; font-size: 1rem; }
.ex-info p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
.ex-action { margin-left: auto; }
.btn-outline { border: 1px solid var(--border); color: var(--text-muted); padding: 6px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
.btn-outline.on { background: var(--bg-dark); color: var(--text-main); border-color: var(--text-main); }
.toggle-btn { font-size: 0.85rem; font-weight: 700; color: var(--primary); cursor: pointer; }
.toggle-btn.on { color: var(--accent); }

.purposes-row { display: flex; flex-direction: column; gap: 10px; align-items: center; text-align: center; margin-top: 20px; }
.chips-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.chip-btn { border: 1px solid var(--border); padding: 6px 14px; border-radius: 20px; color: var(--text-muted); font-size: 0.9rem; transition: .2s; }
.chip-btn:hover { background: var(--bg-card-hover); }
.chip-btn.active { background: var(--text-main); color: var(--bg-dark); font-weight: 700; }

/* STICKY BAR */
.sticky-wrapper { position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100; padding: 20px; pointer-events: none; }
.sticky-bar { 
    max-width: 900px; margin: 0 auto; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(16px); 
    border-radius: 20px; padding: 16px 24px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    display: flex; justify-content: space-between; align-items: center; pointer-events: all;
}
@media (max-width: 700px) { .sticky-bar { flex-direction: column; gap: 15px; width: 100%; border-radius: 16px; padding: 15px; } .sb-info { text-align: center; } }

.sb-label { font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }
.sb-price { font-size: 1.6rem; font-weight: 800; color: var(--text-main); line-height: 1; margin: 4px 0; }
.sb-price small { font-size: 0.9rem; color: var(--text-muted); font-weight: 400; }
.sb-detail { font-size: 0.85rem; color: var(--primary); font-weight: 600; }
.sb-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
@media (max-width: 700px) { .sb-actions { width: 100%; align-items: center; } }
.sb-matricula { font-size: 0.75rem; color: var(--text-muted); }

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
`;