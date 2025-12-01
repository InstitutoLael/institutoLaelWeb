import { useState, useMemo, useRef, useEffect } from "react";
// Asegúrate de que este archivo exista con la data actualizada que creamos
import { 
  ENROLLMENT_FEE, 
  SUBJECTS, 
  LEVELS, 
  PACKS, 
  SCHOOL_SERVICES, 
  ALLIANCE,
  clp 
} from "../data/homeschool.js";

/* --- IMÁGENES --- */
// 1. Imagen Principal (Hero): Puedes usar tu archivo local o esta URL de alta calidad
// import heroImg from "../assets/img/lael/hs.jpg"; 
const heroImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop";

// 2. Logo Partner (Los Olivos): Ruta exacta que me diste
import losOlivosLogo from "../assets/img/Partners/LosOlivos.png"; 

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Clean Tech)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  School: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v9"/><path d="M12 2v4"/><path d="M22 6l-4-3.5L14 6"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "BENTO HUB" (Silicon Valley Style)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-body: #050505;
  --bg-card: #0f0f0f;
  --bg-hover: #1a1a1a;
  
  --accent-violet: #8b5cf6;
  --accent-blue: #3b82f6;
  --accent-lime: #84cc16;
  
  --text-main: #fff;
  --text-muted: #a1a1aa;
  
  --border: rgba(255,255,255,0.08);
  --radius: 20px;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

.academy-page {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: 120px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { cursor: pointer; border: none; font-family: inherit; -webkit-tap-highlight-color: transparent; }
a { text-decoration: none; color: inherit; }

/* HERO */
.hero-section { padding: 120px 0 60px; position: relative; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: center; }

.badge-new {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(139, 92, 246, 0.1); color: #a78bfa;
  padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem;
  border: 1px solid rgba(139, 92, 246, 0.2); margin-bottom: 24px;
}

h1 { font-size: clamp(2.8rem, 6vw, 4.2rem); line-height: 1.05; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 20px; }
.highlight { 
  background: linear-gradient(to right, #a78bfa, #3b82f6); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.lead { font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; max-width: 500px; margin-bottom: 30px; }

/* TOGGLE SWITCH (B2C / B2B) */
.toggle-pill {
  display: inline-flex; background: #161616; padding: 5px; border-radius: 50px; border: 1px solid var(--border);
  margin-bottom: 30px;
}
.t-btn {
  display: flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 50px;
  color: var(--text-muted); font-weight: 600; font-size: 0.9rem; transition: 0.3s;
}
.t-btn:hover { color: white; }
.t-btn.active { background: white; color: black; box-shadow: 0 4px 15px rgba(255,255,255,0.1); }

/* VISUAL BENTO */
.visual-bento { position: relative; }
.bento-card {
  background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);
  overflow: hidden; position: relative; height: 400px;
}
.hero-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; filter: contrast(1.1); }

/* PARTNER FLOAT (LOS OLIVOS) */
.partner-float {
  position: absolute; bottom: 20px; left: -30px;
  background: rgba(20, 20, 20, 0.95); backdrop-filter: blur(12px);
  padding: 16px 24px; border-radius: 16px; border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6); display: flex; align-items: center; gap: 15px;
  animation: float 6s ease-in-out infinite; max-width: 280px;
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.partner-logo { width: 45px; height: 45px; border-radius: 50%; object-fit: contain; background: white; padding: 2px; }
.partner-info strong { display: block; font-size: 0.9rem; color: white; margin-bottom: 2px; }
.partner-info span { display: block; font-size: 0.75rem; color: var(--accent-lime); font-weight: 700; text-transform: uppercase; }

/* --- B2C CONTENT --- */
.step-section { padding: 40px 0; }
.step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
.step-num { 
  width: 28px; height: 28px; background: var(--border); border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: white;
}
.step-header h3 { font-size: 1.4rem; margin: 0; }

.grid-subjects { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
.subject-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;
  cursor: pointer; transition: 0.2s; position: relative; overflow: hidden;
}
.subject-card:hover { transform: translateY(-3px); border-color: var(--accent-color); }
.subject-card.active { background: rgba(255,255,255,0.05); border-color: var(--accent-color); box-shadow: inset 0 0 0 1px var(--accent-color); }
.s-icon { font-size: 2rem; margin-bottom: 10px; display: block; }
.s-name { font-weight: 700; color: white; }

.grid-levels { display: flex; gap: 10px; flex-wrap: wrap; }
.level-pill {
  background: var(--bg-card); border: 1px solid var(--border); padding: 12px 24px; border-radius: 50px;
  color: var(--text-muted); font-weight: 600; transition: 0.2s;
}
.level-pill:hover { color: white; border-color: white; }
.level-pill.active { background: white; color: black; border-color: white; }

.grid-packs { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.pack-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 24px;
  cursor: pointer; transition: 0.2s; position: relative; display: flex; flex-direction: column;
}
.pack-card:hover { border-color: var(--accent-violet); transform: translateY(-5px); }
.pack-card.active { border-color: var(--accent-violet); background: rgba(139, 92, 246, 0.05); }

.badge-pop { 
  position: absolute; top: 15px; right: 15px; background: var(--accent-violet); color: white;
  font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; text-transform: uppercase;
}
.pack-hrs { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 5px; display: block; }
.pack-title { font-size: 1.4rem; font-weight: 700; color: white; margin-bottom: 5px; display: block; }
.pack-price { font-size: 1.8rem; font-weight: 800; color: white; margin: 15px 0; display: block; }
.pack-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

/* SUMMARY CARD (Right Side) */
.config-container { display: grid; grid-template-columns: 1fr 400px; gap: 60px; }
.summary-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 30px; position: sticky; top: 30px;
}
.sum-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; display: flex; justify-content: space-between; }
.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: var(--text-muted); }
.sum-row strong { color: white; }
.sum-total { 
  margin-top: 20px; padding-top: 20px; border-top: 1px dashed var(--border);
  display: flex; justify-content: space-between; align-items: center;
}
.total-price { font-size: 2rem; font-weight: 800; color: white; }

.btn-checkout {
  background: white; color: black; width: 100%; padding: 16px; border-radius: 16px;
  font-weight: 800; font-size: 1.1rem; margin-top: 24px; transition: 0.2s; display: block; text-align: center;
}
.btn-checkout:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(255,255,255,0.2); }

/* --- B2B CONTENT --- */
.b2b-container { 
  background: #0a0a0a; border: 1px solid var(--border); border-radius: 24px; padding: 60px;
  text-align: center; margin-top: 40px;
}
.b2b-header h2 { font-size: 2.5rem; margin-bottom: 15px; }
.b2b-header p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 50px; }

.b2b-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: left; }
.serv-item { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); transition: 0.2s; }
.serv-item:hover { border-color: var(--accent-blue); }
.serv-icon { font-size: 2rem; margin-bottom: 15px; display: block; }
.serv-item h3 { font-size: 1.2rem; color: white; margin-bottom: 10px; }
.serv-item p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

.btn-b2b {
  background: white; color: black; padding: 16px 32px; border-radius: 12px; font-weight: 800;
  display: inline-block; margin-top: 50px; transition: 0.2s;
}
.btn-b2b:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.3); }

/* --- MOBILE BAR --- */
.mobile-bar {
  position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
  background: rgba(10,10,10,0.95); backdrop-filter: blur(20px); border-top: 1px solid var(--border);
  padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;
}
@media (min-width: 901px) { .mobile-bar { display: none; } }
.mb-info span { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
.mb-info strong { color: white; font-size: 1.3rem; }
.btn-mb { background: white; color: black; font-weight: 800; padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .lead { margin-inline: auto; }
  .partner-float { left: 50%; transform: translateX(-50%); bottom: -20px; width: max-content; }
  .b2b-container { padding: 30px; }
  .config-container { grid-template-columns: 1fr; }
  .summary-card { display: none; } /* Mobile uses sticky bar */
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. SEO HEAD
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => { document.title = "Lael Academy | Hub de Entrenamiento Académico"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Homeschool() {
  const [isSchool, setIsSchool] = useState(false); // Toggle B2C / B2B
  const [selectedSubject, setSelectedSubject] = useState("mat");
  const [selectedLevel, setSelectedLevel] = useState("media");
  const [selectedPackId, setSelectedPackId] = useState("p8");
  
  const configRef = useRef(null);

  // Logic B2C
  const activeSubject = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];
  const activePack = PACKS.find(p => p.id === selectedPackId) || PACKS[1];
  const total = activePack.price + ENROLLMENT_FEE;

  // WhatsApp Links
  const waLinkStudent = useMemo(() => {
    const text = `Hola 👋, vengo del Hub Lael Academy.
🎓 *Mi Plan Personalizado:*
• Materia: ${activeSubject.name}
• Nivel: ${LEVELS.find(l=>l.id===selectedLevel)?.label}
• Pack: ${activePack.title} (${activePack.hours} hrs)

💰 *Total:* ${clp(total)} (incluye matrícula)

¿Me ayudan a coordinar el horario?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [selectedLevel, activeSubject, activePack, total]);

  const waLinkSchool = `https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, soy de un Colegio y me interesan las soluciones B2B de Lael Academy.")}`;

  return (
    <div className="academy-page">
      <SEOHead />
      <style>{css}</style>

      {/* HERO */}
      <header className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-new"><Icons.Zap/> Reforzamiento de Élite</div>
            <h1>
              Tus Superpoderes <br/>
              <span className="highlight">Académicos.</span>
            </h1>
            <p className="lead">
              Más que clases particulares. Un centro de entrenamiento para subir notas, preparar la PAES o explorar lo que te apasiona.
            </p>

            {/* TOGGLE */}
            <div className="toggle-pill">
                <button className={`t-btn ${!isSchool ? 'active' : ''}`} onClick={() => setIsSchool(false)}>
                    <Icons.User/> Para Estudiantes
                </button>
                <button className={`t-btn ${isSchool ? 'active' : ''}`} onClick={() => setIsSchool(true)}>
                    <Icons.Building/> Para Colegios
                </button>
            </div>
          </div>

          <div className="visual-bento">
            <div className="bento-card">
               <img src={heroImg} alt="Academy" className="hero-img" />
            </div>
            {/* PARTNER FLOAT: Validation for Homeschool Moms */}
            {!isSchool && (
                <div className="partner-float">
                    <img src={losOlivosLogo} alt="Los Olivos" className="partner-logo" />
                    <div className="partner-info">
                        <span>{ALLIANCE.role}</span>
                        <strong>{ALLIANCE.name}</strong>
                    </div>
                </div>
            )}
          </div>
        </div>
      </header>

      {/* DYNAMIC CONTENT */}
      <div className="container">
        
        {/* --- VIEW: STUDENTS (B2C) --- */}
        {!isSchool && (
            <div className="animate-fade">
                
                {/* STEP 1: SUBJECTS */}
                <section className="step-section">
                    <div className="step-header">
                        <div className="step-num">1</div>
                        <h3>Elige tu Especialidad</h3>
                    </div>
                    <div className="grid-subjects">
                        {SUBJECTS.map(s => (
                            <div 
                                key={s.id} 
                                className={`subject-card ${selectedSubject === s.id ? 'active' : ''}`}
                                style={{'--accent-color': s.color}}
                                onClick={() => setSelectedSubject(s.id)}
                            >
                                <span className="s-icon" style={{color: s.color}}>{s.icon}</span>
                                <span className="s-name">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* STEP 2: LEVEL */}
                <section className="step-section">
                    <div className="step-header">
                        <div className="step-num">2</div>
                        <h3>Tu Nivel Actual</h3>
                    </div>
                    <div className="grid-levels">
                        {LEVELS.map(l => (
                            <button 
                                key={l.id} 
                                className={`level-pill ${selectedLevel === l.id ? 'active' : ''}`}
                                onClick={() => setSelectedLevel(l.id)}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* STEP 3: PACKS & SUMMARY */}
                <section className="step-section" ref={configRef}>
                    <div className="config-container">
                        
                        <div className="packs-col">
                            <div className="step-header">
                                <div className="step-num">3</div>
                                <h3>Elige tu Intensidad</h3>
                            </div>
                            <div className="grid-packs">
                                {PACKS.map(p => (
                                    <div 
                                        key={p.id} 
                                        className={`pack-card ${selectedPackId === p.id ? 'active' : ''}`}
                                        onClick={() => setSelectedPackId(p.id)}
                                    >
                                        {p.badge && <span className="badge-pop">{p.badge}</span>}
                                        <span className="pack-hrs">{p.hours} Horas Cronológicas</span>
                                        <span className="pack-title">{p.title}</span>
                                        <span className="pack-price">{clp(p.price)}</span>
                                        <p className="pack-desc">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DESKTOP SUMMARY */}
                        <div className="summary-col">
                            <div className="summary-card">
                                <div className="sum-title">
                                    <span>Resumen</span>
                                    <Icons.Star />
                                </div>
                                
                                <div className="sum-row">
                                    <span>Materia</span>
                                    <strong style={{color: activeSubject.color}}>{activeSubject.name}</strong>
                                </div>
                                <div className="sum-row">
                                    <span>Nivel</span>
                                    <strong>{LEVELS.find(l=>l.id===selectedLevel)?.label}</strong>
                                </div>
                                <div className="sum-row">
                                    <span>Pack</span>
                                    <strong>{activePack.title}</strong>
                                </div>
                                <div className="sum-row">
                                    <span>Matrícula</span>
                                    <strong>{clp(ENROLLMENT_FEE)}</strong>
                                </div>

                                <div className="sum-total">
                                    <span>Total</span>
                                    <span className="total-price">{clp(total)}</span>
                                </div>

                                <a href={waLinkStudent} target="_blank" rel="noreferrer" className="btn-checkout">
                                    Agendar Horas
                                </a>
                                <p style={{fontSize:'0.8rem', color:'#666', marginTop:'15px', textAlign:'center'}}>
                                    Hablaremos por WhatsApp para coordinar la disponibilidad de los tutores.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FAQ SMALL */}
                <div style={{margin:'40px 0', padding:'20px', background:'#111', borderRadius:'16px', border:'1px solid #333'}}>
                    <h4 style={{color:'white', marginBottom:'10px'}}>¿Dudas Frecuentes?</h4>
                    <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'5px'}}>• <strong>¿Cómo agendo?</strong> Te asignamos un tutor experto según tu disponibilidad.</p>
                    <p style={{color:'#888', fontSize:'0.9rem'}}>• <strong>¿Clases grabadas?</strong> Sí, para repaso. Pero el foco es 100% en vivo.</p>
                </div>

                {/* MOBILE STICKY */}
                <div className="mobile-bar">
                    <div className="mb-info">
                        <span>Total (inc. matrícula)</span>
                        <strong>{clp(total)}</strong>
                    </div>
                    <a href={waLinkStudent} target="_blank" rel="noreferrer" className="btn-mb">
                        Inscribir
                    </a>
                </div>

            </div>
        )}

        {/* --- VIEW: SCHOOLS (B2B) --- */}
        {isSchool && (
            <div className="b2b-container animate-fade">
                <div className="b2b-header">
                    <div className="badge-new" style={{width:'fit-content', margin:'0 auto 20px'}}>Soluciones Educativas</div>
                    <h2>Aliados Estratégicos para su Colegio</h2>
                    <p>Reduzca la carga administrativa de su equipo docente y asegure calidad académica externa con nuestros servicios B2B.</p>
                </div>

                <div className="b2b-services">
                    {SCHOOL_SERVICES.map(s => (
                        <div key={s.id} className="serv-item">
                            <span className="serv-icon">{s.icon}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>

                <a href={waLinkSchool} target="_blank" rel="noreferrer" className="btn-b2b">
                    Solicitar Reunión o Cotización
                </a>
            </div>
        )}

      </div>
    </div>
  );
}