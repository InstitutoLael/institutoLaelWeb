import { useState, useMemo } from "react";
// Importamos tus datos y logo
import { listaCarreras as carrerasData } from "../data/carreras-bd.js";
import logoLael from "../assets/img/Logos/lael-inst-rosa.png";

/* --- LÓGICA DE CÁLCULO --- */
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
  // Extraemos valores seguros
  const { CL=0, M1=0, M2=0, CIEN=0, HIS=0, NEM=0, RANK=0 } = puntajes;
  
  // Función auxiliar para normalizar porcentajes (ej: "20" o 20 -> 0.2)
  const p = (val) => { 
      const v = Number(val || 0); 
      return v > 1 ? v / 100 : v; 
  };

  // Lógica de mejor electiva (Historia vs Ciencias)
  let scoreElectiva = 0;
  let pondElectiva = Math.max(p(pond.CIEN), p(pond.HIS));

  if (pondElectiva > 0) {
    scoreElectiva = Math.max(isValidScore(CIEN) ? CIEN : 0, isValidScore(HIS) ? HIS : 0);
  }

  // Calculamos incluyendo "Otros" si existiera (ej: pruebas especiales)
  const puntajeFinal = 
    (p(pond.NEM) * NEM) + 
    (p(pond.RANK) * RANK) + 
    (p(pond.CL) * CL) +
    (p(pond.M1) * M1) + 
    (p(pond.M2) * (isValidScore(M2) ? M2 : 0)) +
    (pondElectiva * scoreElectiva) +
    (p(pond.OTRO) * 1000); // Asumimos puntaje máximo en 'otros' por defecto o 0 si no hay lógica

  return round2(puntajeFinal);
}

function etiquetaChance(ppp, corte) {
  if (!ppp) return { text: "...", color: "gray", icon: "⚪️", advice: "Ingresa tus puntajes" };
  // Si no hay corte (0), es solo simulación
  if (!corte || corte === 0) return { text: "CALCULADO", color: "blue", icon: "🔹", advice: "Puntaje válido. Revisa los requisitos." };

  const diff = ppp - corte;

  if (diff >= 40) return { text: "ASEGURADO", color: "emerald", icon: "🚀", advice: "¡Excelente! Estás muy por sobre el corte." };
  if (diff >= 15) return { text: "MUY PROBABLE", color: "green", icon: "✅", advice: "Tienes un margen seguro." };
  if (diff >= 0)  return { text: "COMPETITIVO", color: "blue", icon: "🔹", advice: "Estás dentro, pero no te confíes." };
  if (diff >= -15) return { text: "AL LÍMITE", color: "yellow", icon: "⚠️", advice: "Estás cerca. Unos puntos más harían la diferencia." };
  if (diff >= -40) return { text: "RIESGOSO", color: "orange", icon: "🔸", advice: "Necesitas subir tus puntajes clave." };
  return { text: "MUY DIFÍCIL", color: "red", icon: "🔻", advice: "Falta bastante para el corte. ¡A estudiar!" };
}

/* --- COLORES --- */
const colorMap = {
    emerald: "#10B981", green: "#22C55E", blue: "#3B82F6", 
    yellow: "#F59E0B", orange: "#F97316", red: "#EF4444", gray: "#64748B"
};

/* --- COMPONENTE PRINCIPAL --- */
export default function SimuladorLael() {
  // Estados de Usuario
  const [scores, setScores] = useState({ nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0 });
  
  // Estados de Búsqueda y Selección
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  
  // Ponderaciones (Se llenan solas)
  const [ponderations, setPonderations] = useState({ nem: 0, rank: 0, cl: 0, m1: 0, m2: 0, cien: 0, hist: 0, otro: 0 });
  const [corteTarget, setCorteTarget] = useState(0);

  // --- FILTRO INTELIGENTE ---
  const filteredCarreras = useMemo(() => {
    if (!carrerasData) return [];
    if (searchTerm.length < 3) return [];
    const term = searchTerm.toLowerCase();

    return carrerasData.filter(c => {
        // Validación Anti-Crash: Si el dato no existe, ponemos texto vacío
        const nombre = c["Nombre Carrera"] ? String(c["Nombre Carrera"]).toLowerCase() : "";
        const u = c["Nombre IES"] ? String(c["Nombre IES"]).toLowerCase() : "";
        return nombre.includes(term) || u.includes(term);
    }).slice(0, 10);
  }, [searchTerm]);

  // --- AL ELEGIR UNA CARRERA ---
  const selectCareer = (c) => {
    setSelectedCareer(c);
    setSearchTerm(""); // Limpiar buscador

    // ¡AQUÍ ESTÁ LA MAGIA! Convertimos tus Strings del JSON a Números
    setPonderations({
        nem: Number(c["Ponderación Notas"] || 0),
        rank: Number(c["Ponderación Ranking Notas"] || 0),
        cl: Number(c["Ponderación Lenguaje"] || 0),
        m1: Number(c["Ponderación Matemáticas"] || 0),
        m2: Number(c["Ponderación Matemáticas 2"] || 0),
        cien: Number(c["Ponderación Ciencias"] || 0),
        hist: Number(c["Ponderación Historia"] || 0),
        otro: Number(c["Ponderación Otros"] || 0)
    });
    
    // Reseteamos el corte manual (o podrías cargarlo si tuvieras el dato)
    setCorteTarget(0);
  };

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };

  const calculationResult = useMemo(() => {
    // Mapeo para la función de cálculo
    const s = { NEM: scores.nem, RANK: scores.ranking, CL: scores.cl, M1: scores.m1, M2: scores.m2, CIEN: scores.cien, HIS: scores.hist };
    const p = { NEM: ponderations.nem, RANK: ponderations.rank, CL: ponderations.cl, M1: ponderations.m1, M2: ponderations.m2, CIEN: ponderations.cien, HIS: ponderations.hist, OTRO: ponderations.otro };

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
  
  // Formatear precio de forma segura
  const precioFormat = selectedCareer 
    ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(selectedCareer["Arancel Anual"] || 0)) 
    : "$0";

  return (
    <div className="lael-page">
      <style>{css}</style>

      {/* NAVBAR */}
      <nav className="lael-nav">
        <div className="nav-container">
            <img src={logoLael} alt="Instituto Lael" className="nav-logo-img" />
            <button className="btn-secondary mobile-hide">Ir al Sitio Web</button>
        </div>
      </nav>

      <div className="main-container">
        <header className="hero-section">
          <h1 className="hero-title">Calculadora de <span className="gradient-text">Ponderación</span></h1>
          <p className="hero-subtitle">Proyecta tu futuro con precisión. Ingresa tus puntajes, busca tu carrera y descubre tus posibilidades reales.</p>
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
                        <InputModern k="m1" label="Mate 1" val={scores.m1} onChange={handleScore} highlight />
                        <InputModern k="m2" label="Mate 2" val={scores.m2} onChange={handleScore} />
                        <InputModern k="cien" label="Ciencias" val={scores.cien} onChange={handleScore} />
                        <InputModern k="hist" label="Historia" val={scores.hist} onChange={handleScore} />
                    </div>
                </div>

                {/* SECTION 2: BUSCADOR (Modificado para usar tu JSON) */}
                <div className="glass-panel search-panel">
                    <div className="panel-header">
                        <div className="step-badge">2</div>
                        <h3>Buscador de Carrera</h3>
                    </div>
                    
                    <div className="search-wrapper">
                         <input 
                            type="text" 
                            className="big-search-input"
                            placeholder="Ej: Enfermería Alba, Medicina..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                         {/* Dropdown de Resultados */}
                         {filteredCarreras.length > 0 && (
                            <div className="results-dropdown">
                                {filteredCarreras.map((c, i) => (
                                    <div key={i} className="dropdown-item" onClick={() => selectCareer(c)}>
                                        <strong>{c["Nombre Carrera"]}</strong>
                                        <small>{c["Nombre IES"]}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedCareer && (
                        <div className="career-details fadeIn">
                            <div className="details-grid">
                                <div className="detail-item">
                                    <small>Universidad</small>
                                    <strong>{selectedCareer["Nombre IES"]}</strong>
                                </div>
                                <div className="detail-item">
                                    <small>Carrera</small>
                                    <strong>{selectedCareer["Nombre Carrera"]}</strong>
                                </div>
                                <div className="detail-item">
                                    <small>Arancel</small>
                                    <strong style={{color:'#4ade80'}}>{precioFormat}</strong>
                                </div>
                            </div>
                            
                            <div className="divider"><span>Ponderaciones Automáticas</span></div>
                            
                            {/* Ponderaciones Read-Only (Visuales) */}
                            <div className="inputs-grid small-text read-only-grid">
                                <PondBadge label="NEM" val={ponderations.nem} />
                                <PondBadge label="RANK" val={ponderations.rank} />
                                <PondBadge label="LEN" val={ponderations.cl} />
                                <PondBadge label="M1" val={ponderations.m1} />
                                <PondBadge label="M2" val={ponderations.m2} />
                                <PondBadge label="CS" val={ponderations.cien} />
                                <PondBadge label="HIS" val={ponderations.hist} />
                                {ponderations.otro > 0 && <PondBadge label="OTRO" val={ponderations.otro} />}
                            </div>
                        </div>
                    )}

                    {selectedCareer && (
                        <div className="corte-wrapper mt-4">
                            <label>Puntaje de Corte (Referencia)</label>
                            <input 
                                type="number" 
                                className="corte-big-input" 
                                value={corteTarget} 
                                onChange={(e) => setCorteTarget(Number(e.target.value))} 
                                placeholder="0"
                            />
                            <small className="hint">Ingresa el corte del año pasado para comparar</small>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN: RESULTS */}
            <div className="right-col">
                <ResultCard 
                    result={calculationResult} 
                    corte={corteTarget}
                    career={selectedCareer ? selectedCareer["Nombre Carrera"] : "Selecciona Carrera"}
                    uni={selectedCareer ? selectedCareer["Nombre IES"] : "---"}
                />
                
                <div className="hook-card">
                    <h4>{calculationResult.finalScore < corteTarget ? "¿Te faltan puntos?" : "¿Quieres asegurar?"}</h4>
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
        <input type="number" name={k} value={val} onChange={onChange} min="0" max="1000" placeholder="0" onFocus={(e) => e.target.select()}/>
    </div>
);

const PondBadge = ({ label, val }) => (
    <div className={`pond-badge ${val > 0 ? 'active' : ''}`}>
        <span className="p-label">{label}</span>
        <span className="p-val">{val}%</span>
    </div>
);

const ResultCard = ({ result, corte, career, uni }) => {
    const { finalScore, diff, status, admissible } = result;
    const fillPercent = Math.min((finalScore / 1000) * 100, 100);
    const cutPercent = corte > 0 ? Math.min((corte / 1000) * 100, 100) : 0;

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

            {corte > 0 && (
                <>
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
                </>
            )}
            
            <div className="auto-note">
                <small>*Se usa automáticamente tu mejor electiva (Ciencias o Historia).</small>
            </div>
        </div>
    );
};

/* --- ESTILOS MODERNOS (CSS) --- */
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

.lael-page { min-height: 100vh; background: radial-gradient(circle at top center, #1e1b4b 0%, #09090b 60%); padding-bottom: 80px; }
.main-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* NAVBAR */
.lael-nav { display: flex; justify-content: center; padding: 15px 0; backdrop-filter: blur(10px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 100; background: rgba(9,9,11,0.8); }
.nav-container { width: 100%; max-width: 1100px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
.nav-logo-img { height: 40px; width: auto; object-fit: contain; transition: transform 0.3s ease; }
.nav-logo-img:hover { transform: scale(1.05); }
.btn-secondary { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: 600; }
.btn-secondary:hover { background: rgba(255,255,255,0.1); }

/* HERO */
.hero-section { text-align: center; padding: 60px 0 40px; }
.hero-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; margin: 0 0 15px; letter-spacing: -1px; line-height: 1.1; }
.gradient-text { background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }

/* LAYOUT */
.grid-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: start; }
@media (max-width: 900px) { .grid-layout { grid-template-columns: 1fr; } }

/* PANELS */
.glass-panel { background: var(--glass); border: 1px solid var(--glass-border); backdrop-filter: blur(12px); border-radius: 20px; padding: 30px; margin-bottom: 30px; }
.panel-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.step-badge { background: linear-gradient(135deg, var(--primary), var(--accent)); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; box-shadow: 0 0 15px rgba(99, 102, 241, 0.4); }
.panel-header h3 { margin: 0; font-size: 1.2rem; font-weight: 700; }

/* INPUTS */
.inputs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px; }
.modern-input-group label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.modern-input-group input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px; color: white; font-size: 1.1rem; font-weight: 700; text-align: center; transition: all 0.2s; }
.modern-input-group.highlight input { border-color: rgba(99, 102, 241, 0.5); background: rgba(99, 102, 241, 0.05); }
.modern-input-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }

/* SEARCH & DETAILS */
.search-wrapper { position: relative; margin-bottom: 15px; }
.big-search-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--primary); padding: 16px; border-radius: 12px; color: white; font-size: 1.1rem; }
.big-search-input:focus { outline: none; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }

.results-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #1e1b4b; border: 1px solid var(--primary); border-radius: 12px; max-height: 300px; overflow-y: auto; z-index: 50; margin-top: 5px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
.dropdown-item { padding: 12px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: 0.2s; }
.dropdown-item:hover { background: var(--primary); }
.dropdown-item strong { display: block; color: white; }
.dropdown-item small { color: #cbd5e1; }

.career-details { margin-top: 20px; animation: fadeIn 0.5s ease; }
.details-grid { display: flex; justify-content: space-between; margin-bottom: 15px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; }
.detail-item { display: flex; flex-direction: column; }
.detail-item small { color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; }
.detail-item strong { color: white; font-size: 0.9rem; }

.divider { display: flex; align-items: center; text-align: center; color: var(--text-muted); font-size: 0.8rem; margin: 25px 0 15px; }
.divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid var(--glass-border); }
.divider span { padding: 0 10px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }

/* READ ONLY BADGES */
.read-only-grid { grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); }
.pond-badge { background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 8px 5px; border-radius: 8px; text-align: center; opacity: 0.5; }
.pond-badge.active { background: rgba(99, 102, 241, 0.1); border-color: var(--primary); opacity: 1; }
.p-label { display: block; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; margin-bottom: 2px; }
.p-val { display: block; font-size: 0.9rem; color: white; font-weight: 700; }

.corte-wrapper { text-align: center; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 16px; margin-bottom: 20px; margin-top: 20px; }
.corte-big-input { background: transparent; border: none; font-size: 3rem; font-weight: 800; color: #FBBF24; text-align: center; width: 100%; }
.corte-big-input:focus { outline: none; }
.hint { display: block; font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; font-style: italic; }

/* RESULT CARD */
.result-glass-card { background: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius: 24px; padding: 40px 30px; text-align: center; position: relative; overflow: hidden; box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5); margin-bottom: 20px; }
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
.hook-card { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 20px; padding: 30px; text-align: center; border: 1px solid rgba(99, 102, 241, 0.3); }
.hook-card h4 { margin: 0 0 10px; font-size: 1.3rem; color: white; }
.hook-card p { font-size: 0.95rem; color: #c7d2fe; margin-bottom: 20px; line-height: 1.5; }
.btn-primary { background: white; color: #312e81; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; width: 100%; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media(max-width: 600px) { .mobile-hide { display: none; } }
`;