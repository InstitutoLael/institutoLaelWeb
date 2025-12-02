import { useState, useMemo } from "react";

/* --- LOGO INSTITUTO LAEL (SVG Component) --- */
const LaelLogo = () => (
  <svg viewBox="0 0 200 60" className="h-12 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hoja / Isotipo abstracto */}
    <path d="M25 10C25 10 15 30 15 40C15 48.2843 21.7157 55 30 55C38.2843 55 45 48.2843 45 40C45 30 35 10 35 10" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 55V35" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 35L40 25" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Texto "INSTITUTO LAEL" estilizado */}
    <text x="60" y="38" fill="#fff" fontFamily="sans-serif" fontWeight="800" fontSize="24" letterSpacing="1">INSTITUTO</text>
    <text x="60" y="52" fill="#A5B4FC" fontFamily="sans-serif" fontWeight="600" fontSize="10" letterSpacing="4">LAEL • EDUCACIÓN</text>

    <defs>
      <linearGradient id="paint0_linear" x1="15" y1="55" x2="45" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1"/>
        <stop offset="1" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);

/* --- LÓGICA DE CÁLCULO (Intacta para precisión) --- */
const MIN_PUNTAJE = 100;
const MAX_PUNTAJE = 1000;
const MIN_PROM_OBLIGATORIAS = 458; 

const isValidScore = (n) => {
  if (typeof n !== "number" || isNaN(n)) return false;
  return (n >= MIN_PUNTAJE && n <= MAX_PUNTAJE) || n === 0;
};

const round2 = (n) => Math.round(n * 100) / 100;

function esAdmisible({ CL, M1 }) {
  if (!isValidScore(CL) || !isValidScore(M1)) return false;
  if (CL === 0 || M1 === 0) return false; 
  const promedio = (CL + M1) / 2;
  return promedio >= MIN_PROM_OBLIGATORIAS;
}

function calcularPPP(pond, puntajes) {
  const { CL = 0, M1 = 0, M2 = 0, CIEN = 0, HIS = 0, NEM = 0, RANK = 0 } = puntajes;
  const p = (val) => { const v = Number(val || 0); return v > 1 ? v / 100 : v; };

  let scoreElectiva = 0;
  if (p(pond.CIEN) > 0 || p(pond.HIS) > 0) {
    scoreElectiva = Math.max(isValidScore(CIEN) ? CIEN : 0, isValidScore(HIS) ? HIS : 0);
  }

  const puntajeFinal = 
    (p(pond.NEM) * NEM) + (p(pond.RANK) * RANK) + (p(pond.CL) * CL) +
    (p(pond.M1) * M1) + (p(pond.M2) * (isValidScore(M2) ? M2 : 0)) +
    (Math.max(p(pond.CIEN), p(pond.HIS)) * scoreElectiva);

  return round2(puntajeFinal);
}

function etiquetaChance(ppp, corte) {
  if (!ppp || !corte) return { text: "Calculando...", color: "gray", icon: "⚪️", advice: "Ingresa datos" };
  const diff = ppp - corte;

  if (diff >= 40) return { text: "ASEGURADO", color: "emerald", icon: "🚀", advice: "¡Excelente! Estás muy por sobre el corte." };
  if (diff >= 15) return { text: "MUY PROBABLE", color: "green", icon: "✅", advice: "Tienes un margen seguro." };
  if (diff >= 0)  return { text: "COMPETITIVO", color: "blue", icon: "🔹", advice: "Estás dentro, pero no te confíes." };
  if (diff >= -15) return { text: "AL LÍMITE", color: "yellow", icon: "⚠️", advice: "Estás cerca. Unos puntos más harían la diferencia." };
  if (diff >= -40) return { text: "RIESGOSO", color: "orange", icon: "🔸", advice: "Necesitas subir tus puntajes clave." };
  return { text: "MUY DIFÍCIL", color: "red", icon: "🔻", advice: "Falta bastante para el corte. ¡A estudiar!" };
}

const SEOHead = () => null; // Placeholder

/* --- COLORES & ESTILOS --- */
const colorMap = {
    emerald: "#10B981", green: "#22C55E", blue: "#3B82F6", 
    yellow: "#F59E0B", orange: "#F97316", red: "#EF4444", gray: "#64748B"
};

/* --- COMPONENTE PRINCIPAL --- */
export default function SimuladorLael() {
  const [scores, setScores] = useState({ nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0 });
  const [ponderations, setPonderations] = useState({ nem: 20, rank: 20, cl: 30, m1: 30, m2: 0, cien: 0, hist: 0 });
  const [corteTarget, setCorteTarget] = useState(700);
  const [careerName, setCareerName] = useState("Ingeniería Civil");
  const [uniName, setUniName] = useState("Universidad de Ejemplo");

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };
  const handlePonderation = (e) => {
    let val = Number(e.target.value);
    if (val > 100) val = 100; if (val < 0) val = 0;
    setPonderations({ ...ponderations, [e.target.name]: val });
  };
  const handleCorte = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setCorteTarget(val);
  };

  const calculationResult = useMemo(() => {
    const s = { NEM: scores.nem, RANK: scores.ranking, CL: scores.cl, M1: scores.m1, M2: scores.m2, CIEN: scores.cien, HIS: scores.hist };
    const p = { NEM: ponderations.nem, RANK: ponderations.rank, CL: ponderations.cl, M1: ponderations.m1, M2: ponderations.m2, CIEN: ponderations.cien, HIS: ponderations.hist };

    const isAdmissible = esAdmisible(s);
    if (!isAdmissible) return { finalScore: 0, diff: 0, status: { label: "NO ADMISIBLE", color: "#EF4444", icon: "⛔", advice: "Promedio L+M1 menor a 458." }, admissible: false };
    
    const ppp = calcularPPP(p, s);
    const chance = etiquetaChance(ppp, corteTarget);

    return {
        finalScore: Math.round(ppp),
        diff: Math.round(ppp - corteTarget),
        status: { label: chance.text, color: colorMap[chance.color], icon: chance.icon, advice: chance.advice },
        admissible: true
    };
  }, [scores, ponderations, corteTarget]);
  
  const totalPonderations = Object.values(ponderations).reduce((sum, p) => sum + p, 0);

  return (
    <div className="lael-page">
      <SEOHead />
      <style>{css}</style>

      {/* NAVBAR */}
      <nav className="lael-nav">
        <div className="nav-container">
            <LaelLogo />
            <button className="btn-secondary mobile-hide">Ir al Sitio Web</button>
        </div>
      </nav>

      <div className="main-container">
        {/* HEADER HERO */}
        <header className="hero-section">
          <h1 className="hero-title">Calculadora de <span className="gradient-text">Ponderación</span></h1>
          <p className="hero-subtitle">Proyecta tu futuro con precisión. Ingresa tus puntajes, configura la carrera y descubre tus posibilidades reales.</p>
        </header>

        <div className="grid-layout">
            {/* LEFT COLUMN: INPUTS */}
            <div className="left-col">
                
                {/* SECTION 1: PUNTAJES */}
                <div className="glass-panel">
                    <div className="panel-header">
                        <div className="step-badge">1</div>
                        <h3>Tus Puntajes PAES</h3>
                    </div>
                    <div className="inputs-grid">
                        <InputModern k="nem" label="NEM" val={scores.nem} onChange={handleScore} />
                        <InputModern k="ranking" label="Ranking" val={scores.ranking} onChange={handleScore} />
                        <InputModern k="cl" label="Lenguaje" val={scores.cl} onChange={handleScore} highlight />
                        <InputModern k="m1" label="Mate 1 (M1)" val={scores.m1} onChange={handleScore} highlight />
                        <InputModern k="m2" label="Mate 2 (M2)" val={scores.m2} onChange={handleScore} />
                        <InputModern k="cien" label="Ciencias" val={scores.cien} onChange={handleScore} />
                        <InputModern k="hist" label="Historia" val={scores.hist} onChange={handleScore} />
                    </div>
                </div>

                {/* SECTION 2: CARRERA */}
                <div className="glass-panel">
                    <div className="panel-header">
                        <div className="step-badge">2</div>
                        <h3>Meta y Ponderaciones</h3>
                    </div>
                    
                    <div className="meta-inputs">
                         <div className="field-group full-width">
                            <label>Universidad</label>
                            <input type="text" className="text-input" value={uniName} onChange={(e) => setUniName(e.target.value)} />
                         </div>
                         <div className="field-group full-width">
                            <label>Carrera</label>
                            <input type="text" className="text-input" value={careerName} onChange={(e) => setCareerName(e.target.value)} />
                         </div>
                    </div>

                    <div className="corte-wrapper">
                        <label>Puntaje de Corte (Referencia)</label>
                        <input type="number" className="corte-big-input" value={corteTarget} onChange={handleCorte} />
                    </div>

                    <div className="divider"><span>Ponderaciones (%)</span></div>

                    <div className="inputs-grid small-text">
                        <InputPond k="nem" l="NEM" v={ponderations.nem} set={handlePonderation} />
                        <InputPond k="rank" l="RANK" v={ponderations.rank} set={handlePonderation} />
                        <InputPond k="cl" l="LEN" v={ponderations.cl} set={handlePonderation} />
                        <InputPond k="m1" l="M1" v={ponderations.m1} set={handlePonderation} />
                        <InputPond k="m2" l="M2" v={ponderations.m2} set={handlePonderation} />
                        <InputPond k="cien" l="CS" v={ponderations.cien} set={handlePonderation} />
                        <InputPond k="hist" l="HIS" v={ponderations.hist} set={handlePonderation} />
                    </div>
                    
                    <div className={`total-indicator ${totalPonderations === 100 ? 'valid' : 'invalid'}`}>
                        Total: {totalPonderations}%
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: RESULTS (STICKY) */}
            <div className="right-col">
                <ResultCard 
                    result={calculationResult} 
                    corte={corteTarget}
                    career={careerName}
                    uni={uniName}
                />
                
                {/* THE HOOK - ENGANCHE */}
                <div className="hook-card">
                    <h4>¿No te da el puntaje?</h4>
                    <p>En <strong>Instituto Lael</strong> preparamos a la próxima generación de profesionales. Asegura tu ingreso hoy.</p>
                    <button className="btn-primary full-width">
                        🚀 Ver Planes de Preparación
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

/* --- SUBCOMPONENTES UI --- */

const InputModern = ({ k, label, val, onChange, highlight }) => (
    <div className={`modern-input-group ${highlight ? 'highlight' : ''}`}>
        <label>{label}</label>
        <input type="number" name={k} value={val} onChange={onChange} min="0" max="1000" placeholder="0" />
    </div>
);

const InputPond = ({ k, l, v, set }) => (
    <div className="pond-input-group">
        <label>{l}</label>
        <input type="number" name={k} value={v} onChange={set} placeholder="0" />
        <span className="percent">%</span>
    </div>
);

const ResultCard = ({ result, corte, career, uni }) => {
    const { finalScore, diff, status, admissible } = result;

    // Calculo barra visual
    const fillPercent = Math.min((finalScore / 1000) * 100, 100);
    const cutPercent = Math.min((corte / 1000) * 100, 100);

    return (
        <div className="result-glass-card">
            <div className="card-top-info">
                <span className="uni-tag">{uni}</span>
                <h2>{career}</h2>
            </div>

            <div className="score-hero">
                {!admissible ? (
                    <div className="score-error">NO ADMISIBLE</div>
                ) : (
                    <>
                        <span className="score-label">Tu Puntaje Ponderado</span>
                        <div className="score-number" style={{ color: status.color, textShadow: `0 0 30px ${status.color}66` }}>
                            {finalScore}
                        </div>
                    </>
                )}
            </div>

            <div className="status-pill" style={{ borderColor: status.color, background: `${status.color}15`, color: status.color }}>
                {status.icon} {status.label}
            </div>

            <p className="advice-text">{status.advice}</p>

            <div className="metrics-row">
                <div className="metric">
                    <span>Corte</span>
                    <strong>{corte}</strong>
                </div>
                <div className="metric">
                    <span>Diferencia</span>
                    <strong style={{ color: diff >= 0 ? '#10B981' : '#EF4444' }}>
                        {diff > 0 ? '+' : ''}{diff}
                    </strong>
                </div>
            </div>

            {/* Visual Bar */}
            <div className="bar-container">
                <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${fillPercent}%`, background: status.color }}></div>
                    <div className="bar-marker" style={{ left: `${cutPercent}%` }} title={`Corte: ${corte}`}></div>
                </div>
                <div className="bar-labels">
                    <span>0</span>
                    <span className="marker-label" style={{ left: `${cutPercent}%`, transform: 'translateX(-50%)' }}>▲ Corte</span>
                    <span>1000</span>
                </div>
            </div>
            
            <div className="auto-note">
                <small>*Se usa automáticamente tu mejor electiva (Ciencias o Historia).</small>
            </div>
        </div>
    );
};

/* --- ESTILOS MODERNOS (CSS IN JS) --- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

:root {
    --bg-dark: #09090b;
    --glass: rgba(24, 24, 27, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --primary: #6366F1;
    --accent: #A855F7;
    --text-main: #F8FAFC;
    --text-muted: #94A3B8;
}

body, html { margin: 0; padding: 0; background: var(--bg-dark); font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-main); }
* { box-sizing: border-box; }

/* LAYOUT */
.lael-page {
    min-height: 100vh;
    background: radial-gradient(circle at top center, #1e1b4b 0%, #09090b 60%);
    padding-bottom: 80px;
}
.main-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* NAVBAR */
.lael-nav {
    display: flex; justify-content: center; padding: 20px 0;
    backdrop-filter: blur(10px); border-bottom: 1px solid var(--glass-border);
    position: sticky; top: 0; z-index: 100; background: rgba(9,9,11,0.8);
}
.nav-container { width: 100%; max-width: 1100px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
.btn-secondary {
    background: transparent; border: 1px solid var(--glass-border); color: var(--text-main);
    padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: 600;
}
.btn-secondary:hover { background: rgba(255,255,255,0.1); }
@media(max-width: 600px) { .mobile-hide { display: none; } }

/* HERO */
.hero-section { text-align: center; padding: 60px 0 40px; }
.hero-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; margin: 0 0 15px; letter-spacing: -1px; line-height: 1.1; }
.gradient-text { background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }

/* GRID SYSTEM */
.grid-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: start; }
@media (max-width: 900px) { .grid-layout { grid-template-columns: 1fr; } }

/* CARDS & PANELS */
.glass-panel {
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(12px); border-radius: 20px; padding: 30px; margin-bottom: 30px;
}

.panel-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.step-badge {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
}
.panel-header h3 { margin: 0; font-size: 1.2rem; font-weight: 700; }

/* INPUTS */
.inputs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px; }

.modern-input-group { display: flex; flex-direction: column; gap: 8px; }
.modern-input-group label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.modern-input-group input {
    background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 12px;
    padding: 12px; color: white; font-size: 1.1rem; font-weight: 700; text-align: center;
    transition: all 0.2s;
}
.modern-input-group.highlight input { border-color: rgba(99, 102, 241, 0.5); background: rgba(99, 102, 241, 0.05); }
.modern-input-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }

/* METADATA */
.meta-inputs { display: grid; gap: 15px; margin-bottom: 20px; }
.text-input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 12px; border-radius: 10px; color: white; font-family: inherit; }
.corte-wrapper { text-align: center; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 16px; margin-bottom: 20px; }
.corte-big-input {
    background: transparent; border: none; font-size: 3rem; font-weight: 800; color: #FBBF24; text-align: center; width: 100%;
}
.corte-big-input:focus { outline: none; }

.pond-input-group { position: relative; }
.pond-input-group input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); padding: 10px; border-radius: 8px; color: white; text-align: center; font-weight: 600; }
.percent { position: absolute; right: 8px; top: 34px; font-size: 0.7rem; color: var(--text-muted); pointer-events: none;} 

.divider { display: flex; align-items: center; text-align: center; color: var(--text-muted); font-size: 0.8rem; margin: 25px 0 15px; }
.divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid var(--glass-border); }
.divider span { padding: 0 10px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }

.total-indicator { text-align: center; margin-top: 15px; font-size: 0.9rem; font-weight: 700; padding: 5px; border-radius: 6px; }
.total-indicator.valid { color: #22C55E; }
.total-indicator.invalid { color: #EF4444; background: rgba(239, 68, 68, 0.1); }

/* RESULT CARD HERO */
.result-glass-card {
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
    border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px);
    border-radius: 24px; padding: 40px 30px; text-align: center;
    position: relative; overflow: hidden; box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
    margin-bottom: 20px;
}
.uni-tag { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 700; }
.result-glass-card h2 { margin: 10px 0 30px; font-size: 1.8rem; line-height: 1.2; background: linear-gradient(to right, #fff, #cbd5e1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

.score-hero { margin-bottom: 25px; }
.score-label { display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px; }
.score-number { font-size: 5rem; font-weight: 800; line-height: 1; letter-spacing: -2px; }
.score-error { color: #EF4444; font-size: 2rem; font-weight: 800; padding: 20px; border: 2px dashed #EF4444; border-radius: 12px; background: rgba(239, 68, 68, 0.1); }

.status-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.9rem; border: 1px solid; text-transform: uppercase; margin-bottom: 15px; }
.advice-text { font-size: 1rem; color: #E2E8F0; margin-bottom: 30px; font-style: italic; }

.metrics-row { display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--glass-border); }
.metric { display: flex; flex-direction: column; }
.metric span { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; }
.metric strong { font-size: 1.5rem; color: white; }

/* PROGRESS BAR */
.bar-container { position: relative; height: 40px; margin-top: 20px; }
.bar-bg { height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; position: relative; overflow: visible; }
.bar-fill { height: 100%; border-radius: 6px; transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 0 10px currentColor; }
.bar-marker { position: absolute; top: -4px; width: 4px; height: 20px; background: white; z-index: 5; box-shadow: 0 0 10px white; }
.bar-labels { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 8px; position: relative; }
.marker-label { position: absolute; top: 0; color: white; font-weight: bold; white-space: nowrap; }

.auto-note { font-size: 0.7rem; color: var(--text-muted); margin-top: 20px; opacity: 0.6; }

/* HOOK CARD */
.hook-card {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    border-radius: 20px; padding: 30px; text-align: center; border: 1px solid rgba(99, 102, 241, 0.3);
}
.hook-card h4 { margin: 0 0 10px; font-size: 1.3rem; color: white; }
.hook-card p { font-size: 0.95rem; color: #c7d2fe; margin-bottom: 20px; line-height: 1.5; }
.btn-primary {
    background: white; color: #312e81; border: none; padding: 14px 24px; border-radius: 12px;
    font-weight: 800; font-size: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }

`;