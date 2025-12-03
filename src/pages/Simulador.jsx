import { useState, useMemo, useEffect } from "react";
// 1. IMPORTAMOS TUS DATOS (Asegúrate de tener el archivo JSON que creamos)
import carrerasData from "../data/carreras-bd.json"; 
import logoLael from "../assets/img/Logos/lael-inst-rosa.png";

/* --- LÓGICA MATEMÁTICA (No la tocamos, es perfecta) --- */
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
  
  // Función para normalizar porcentajes (si viene 20 es 0.2, si viene 0.2 se queda 0.2)
  const p = (val) => { const v = Number(val || 0); return v > 1 ? v / 100 : v; };

  // Elegir la mejor electiva automáticamente
  let scoreElectiva = 0;
  let pondElectiva = Math.max(p(pond.CIEN), p(pond.HIS)); // Usamos la ponderación más alta disponible

  // Si la carrera pide ciencias o historia, usamos el mejor puntaje del alumno
  if (pondElectiva > 0) {
    scoreElectiva = Math.max(isValidScore(CIEN) ? CIEN : 0, isValidScore(HIS) ? HIS : 0);
  }

  const puntajeFinal = 
    (p(pond.NEM) * NEM) + 
    (p(pond.RANK) * RANK) + 
    (p(pond.CL) * CL) +
    (p(pond.M1) * M1) + 
    (p(pond.M2) * (isValidScore(M2) ? M2 : 0)) +
    (pondElectiva * scoreElectiva); // Usa la mejor electiva

  return round2(puntajeFinal);
}

function etiquetaChance(ppp, corte) {
  if (!ppp) return { text: "...", color: "gray", icon: "⚪️", advice: "Ingresa datos" };
  // Si no hay corte (es 0), asumimos que es una simulación libre
  if (!corte || corte === 0) return { text: "SIMULADO", color: "blue", icon: "🔹", advice: "Puntaje calculado con éxito." };

  const diff = ppp - corte;

  if (diff >= 40) return { text: "ASEGURADO", color: "emerald", icon: "🚀", advice: "Estás sobradísimo. ¡Felicidades!" };
  if (diff >= 15) return { text: "MUY PROBABLE", color: "green", icon: "✅", advice: "Tienes un margen seguro." };
  if (diff >= 0)  return { text: "COMPETITIVO", color: "blue", icon: "🔹", advice: "Estás dentro, pero mantén el ritmo." };
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
  // Estado de Puntajes del Alumno
  const [scores, setScores] = useState({ nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0 });
  
  // Estado del Buscador Inteligente
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  
  // Estado de Ponderaciones (Se llena solo al seleccionar carrera)
  const [ponderations, setPonderations] = useState({ nem: 20, rank: 20, cl: 30, m1: 30, m2: 0, cien: 0, hist: 0 });
  
  // Estado de Corte (Manual, porque la BD oficial a veces no trae corte del año anterior)
  const [corteTarget, setCorteTarget] = useState(0);

  // --- BUSCADOR INTELIGENTE ---
  const filteredCarreras = useMemo(() => {
      if (searchTerm.length < 3) return []; // Esperar a que escriba 3 letras
      const term = searchTerm.toLowerCase();
      // Buscamos en los 2000 datos
      return carrerasData.filter(c => 
          c["Nombre Carrera"]?.toLowerCase().includes(term) || 
          c["Nombre IES"]?.toLowerCase().includes(term)
      ).slice(0, 10); // Limitamos a 10 resultados para no saturar
  }, [searchTerm]);

  // --- CUANDO ELIGES UNA CARRERA ---
  const selectCareer = (carrera) => {
      setSelectedCareer(carrera);
      setSearchTerm(""); // Limpiar buscador para cerrar lista
      
      // AUTO-RELLENAR PONDERACIONES DESDE LA BD
      setPonderations({
          nem: carrera["Ponderación Notas"] || 0,
          rank: carrera["Ponderación Ranking Notas"] || 0,
          cl: carrera["Ponderación Lenguaje"] || 0,
          m1: carrera["Ponderación Matemáticas"] || 0,
          m2: carrera["Ponderación Matemáticas 2"] || 0,
          cien: carrera["Ponderación Ciencias"] || 0,
          hist: carrera["Ponderación Historia"] || 0
      });

      // Si tu BD tuviera "Puntaje Corte", lo pondríamos aquí.
      // Como no siempre está, lo dejamos en 0 o sugerimos uno.
      setCorteTarget(0); 
  };

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
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
  
  // Precio formateado
  const precioFormat = selectedCareer ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(selectedCareer["Arancel Anual"]) : "$0";

  return (
    <div className="lael-page">
      <style>{css}</style>

      {/* NAVBAR */}
      <nav className="lael-nav">
        <div className="nav-container">
            <img src={logoLael} alt="Instituto Lael" className="nav-logo-img" />
            <button className="btn-secondary mobile-hide">Volver al Inicio</button>
        </div>
      </nav>

      <div className="main-container">
        <header className="hero-section">
          <h1 className="hero-title">Simulador <span className="gradient-text">Profesional</span></h1>
          <p className="hero-subtitle">Conectado a la base de datos oficial 2025. Busca tu carrera y calculamos tus opciones reales.</p>
        </header>

        <div className="grid-layout">
            
            {/* --- COLUMNA IZQUIERDA: DATOS --- */}
            <div className="left-col">
                
                {/* 1. TUS PUNTAJES */}
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

                {/* 2. BUSCADOR DE CARRERA (LA MAGIA) */}
                <div className="glass-panel search-panel">
                    <div className="panel-header">
                        <div className="step-badge">2</div>
                        <h3>¿Qué quieres estudiar?</h3>
                    </div>
                    
                    {/* Buscador y Filtros Rápidos */}
                    <div className="search-wrapper">
                        <input 
                            type="text" 
                            className="big-search-input"
                            placeholder="Ej: Medicina Chile, Derecho Cato..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* Lista desplegable de resultados */}
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

                    {/* Botones de Área de Interés (Filtros rápidos) */}
                    <div className="quick-tags">
                        <span>Filtro Rápido:</span>
                        <button onClick={() => setSearchTerm("Ingeniería")}>👷‍♂️ Ingeniería</button>
                        <button onClick={() => setSearchTerm("Salud")}>🏥 Salud</button>
                        <button onClick={() => setSearchTerm("Derecho")}>⚖️ Derecho</button>
                        <button onClick={() => setSearchTerm("Psicología")}>🧠 Psicología</button>
                    </div>

                    {selectedCareer && (
                        <div className="career-details fadeIn">
                            <div className="divider"><span>Detalles Oficiales</span></div>
                            <div className="details-grid">
                                <div className="detail-item">
                                    <small>Universidad</small>
                                    <strong>{selectedCareer["Nombre IES"]}</strong>
                                </div>
                                <div className="detail-item">
                                    <small>Arancel Anual</small>
                                    <strong style={{color: '#4ade80'}}>{precioFormat}</strong>
                                </div>
                            </div>
                            
                            {/* Mostramos las ponderaciones solo como lectura */}
                            <div className="mini-ponds">
                                <span title="NEM">NEM: {ponderations.nem}%</span>
                                <span title="Ranking">RK: {ponderations.rank}%</span>
                                <span title="Lenguaje">LEN: {ponderations.cl}%</span>
                                <span title="Mate 1">M1: {ponderations.m1}%</span>
                                {ponderations.m2 > 0 && <span title="Mate 2">M2: {ponderations.m2}%</span>}
                                {ponderations.cien > 0 && <span title="Ciencias">CS: {ponderations.cien}%</span>}
                            </div>
                        </div>
                    )}

                    {/* Input manual de corte (opcional) */}
                    {selectedCareer && (
                        <div className="corte-wrapper mt-4">
                            <label>Puntaje Corte (Referencia)</label>
                            <input 
                                type="number" 
                                className="corte-input-small" 
                                value={corteTarget} 
                                onChange={(e) => setCorteTarget(Number(e.target.value))} 
                                placeholder="Ej: 750"
                            />
                            <small className="hint">Ingresa el corte del año pasado para comparar</small>
                        </div>
                    )}
                </div>
            </div>

            {/* --- COLUMNA DERECHA: RESULTADOS (STICKY) --- */}
            <div className="right-col">
                <ResultCard 
                    result={calculationResult} 
                    corte={corteTarget}
                    career={selectedCareer ? selectedCareer["Nombre Carrera"] : "Selecciona Carrera"}
                    uni={selectedCareer ? selectedCareer["Nombre IES"] : "---"}
                />
                
                {/* ENGANCHE COMERCIAL */}
                <div className="hook-card">
                    <h4>{calculationResult.finalScore < corteTarget ? "¿Te faltan puntos?" : "¿Quieres asegurar?"}</h4>
                    <p>En <strong>Instituto Lael</strong> subimos tu puntaje promedio en +150 puntos. Matrículas 2026 abiertas.</p>
                    <button className="btn-primary full-width">
                        🚀 Hablar con un Asesor
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

/* --- SUBCOMPONENTES --- */

const InputModern = ({ k, label, val, onChange, highlight }) => (
    <div className={`modern-input-group ${highlight ? 'highlight' : ''}`}>
        <label>{label}</label>
        <input type="number" name={k} value={val} onChange={onChange} min="0" max="1000" onFocus={(e) => e.target.select()} />
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
                        <div className="score-number" style={{ color: status.color, textShadow: `0 0 30px ${status.color}44` }}>
                            {finalScore}
                        </div>
                    </>
                )}
            </div>

            <div className="status-pill" style={{ borderColor: status.color, background: `${status.color}15`, color: status.color }}>
                {status.icon} {status.label}
            </div>

            {corte > 0 && (
                <>
                    <div className="metrics-row">
                        <div className="metric">
                            <span>Corte Ref.</span>
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
            
            <p className="advice-text">{status.advice}</p>
        </div>
    );
};

/* --- ESTILOS CSS --- */
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

body { margin: 0; background: var(--bg-dark); font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-main); }

.lael-page { min-height: 100vh; background: radial-gradient(circle at top center, #1e1b4b 0%, #09090b 60%); padding-bottom: 80px; }
.main-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* NAVBAR */
.lael-nav { display: flex; justify-content: center; padding: 15px 0; backdrop-filter: blur(10px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 100; background: rgba(9,9,11,0.8); }
.nav-container { width: 100%; max-width: 1100px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
.nav-logo-img { height: 40px; width: auto; transition: transform 0.3s ease; }
.nav-logo-img:hover { transform: scale(1.05); }
.btn-secondary { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: 600; }
.btn-secondary:hover { background: rgba(255,255,255,0.1); }

/* HERO */
.hero-section { text-align: center; padding: 50px 0 40px; }
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

/* INPUTS */
.inputs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 12px; }
.modern-input-group label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; display: block;}
.modern-input-group input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px; color: white; font-size: 1.1rem; font-weight: 700; text-align: center; transition: all 0.2s; }
.modern-input-group.highlight input { border-color: rgba(99, 102, 241, 0.5); background: rgba(99, 102, 241, 0.05); }
.modern-input-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }

/* SEARCH & DROPDOWN */
.search-wrapper { position: relative; margin-bottom: 15px; }
.big-search-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--primary); padding: 16px; border-radius: 12px; color: white; font-size: 1.1rem; }
.big-search-input:focus { outline: none; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }

.results-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #1e1b4b; border: 1px solid var(--primary); border-radius: 12px; max-height: 300px; overflow-y: auto; z-index: 50; margin-top: 5px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
.dropdown-item { padding: 12px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: 0.2s; }
.dropdown-item:hover { background: var(--primary); }
.dropdown-item strong { display: block; color: white; }
.dropdown-item small { color: #cbd5e1; }

.quick-tags { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 20px; }
.quick-tags span { font-size: 0.8rem; color: var(--text-muted); margin-right: 5px; }
.quick-tags button { background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: #cbd5e1; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-size: 0.8rem; transition: 0.2s; }
.quick-tags button:hover { background: var(--primary); color: white; border-color: var(--primary); }

/* DETAILS */
.career-details { margin-top: 20px; animation: fadeIn 0.5s ease; }
.details-grid { display: flex; justify-content: space-between; margin-bottom: 15px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; }
.detail-item { display: flex; flex-direction: column; }
.detail-item small { color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; }
.detail-item strong { color: white; font-size: 1rem; }

.mini-ponds { display: flex; flex-wrap: wrap; gap: 8px; }
.mini-ponds span { background: rgba(99, 102, 241, 0.1); color: #a5b4fc; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(99, 102, 241, 0.2); }

.corte-wrapper label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 5px; }
.corte-input-small { width: 100%; background: transparent; border: 1px solid var(--glass-border); border-radius: 8px; padding: 10px; color: #FBBF24; font-weight: bold; font-size: 1.1rem; }
.hint { display: block; font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; font-style: italic; }

/* RESULT CARD */
.result-glass-card { background: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius: 24px; padding: 40px 30px; text-align: center; position: relative; overflow: hidden; box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5); margin-bottom: 20px; }
.uni-tag { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 700; }
.result-glass-card h2 { margin: 10px 0 20px; font-size: 1.5rem; line-height: 1.2; background: linear-gradient(to right, #fff, #cbd5e1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

.score-hero { margin-bottom: 20px; }
.score-label { display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px; }
.score-number { font-size: 4.5rem; font-weight: 800; line-height: 1; letter-spacing: -2px; }
.score-error { color: #EF4444; font-size: 2rem; font-weight: 800; padding: 20px; border: 2px dashed #EF4444; border-radius: 12px; background: rgba(239, 68, 68, 0.1); }

.status-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.9rem; border: 1px solid; text-transform: uppercase; margin-bottom: 20px; }
.advice-text { font-size: 0.95rem; color: #E2E8F0; margin-top: 20px; font-style: italic; }

.metrics-row { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--glass-border); }
.metric { display: flex; flex-direction: column; }
.metric span { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
.metric strong { font-size: 1.4rem; color: white; }

/* BAR */
.bar-container { position: relative; height: 40px; }
.bar-bg { height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; position: relative; }
.bar-fill { height: 100%; border-radius: 5px; transition: width 0.8s ease; }
.bar-marker { position: absolute; top: -5px; width: 4px; height: 20px; background: white; z-index: 5; box-shadow: 0 0 10px white; }
.bar-labels { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; position: relative; }
.marker-label { position: absolute; top: 0; color: white; font-weight: bold; white-space: nowrap; }

/* HOOK */
.hook-card { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 20px; padding: 30px; text-align: center; border: 1px solid rgba(99, 102, 241, 0.3); }
.hook-card h4 { margin: 0 0 10px; font-size: 1.3rem; color: white; }
.hook-card p { font-size: 0.95rem; color: #c7d2fe; margin-bottom: 20px; line-height: 1.5; }
.btn-primary { background: white; color: #312e81; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; width: 100%; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;