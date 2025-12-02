import { useState, useMemo, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";

// 🛑 IMPORTANTE: Eliminamos la importación de la base de datos grande.
// En su lugar, usamos una pequeña lista de ejemplo (5 carreras) para demostrar la lógica.

const SAMPLE_CARRERAS = [
    { id: 100, u: "P. Univ. Católica de Chile", carrera: "Medicina", sede: "Casa Central", corte: 815, vacantes: 100, arancel: 10000000, p: { nem: 20, rank: 20, cl: 15, m1: 25, m2: 0, cien: 20 } },
    { id: 101, u: "Universidad de Chile", carrera: "Ingeniería Civil Industrial", sede: "Beauchef", corte: 780, vacantes: 250, arancel: 8500000, p: { nem: 10, rank: 30, cl: 15, m1: 30, m2: 0, cien: 15 } },
    { id: 102, u: "Universidad de Concepción", carrera: "Derecho", sede: "Concepción", corte: 745, vacantes: 180, arancel: 7000000, p: { nem: 20, rank: 20, cl: 35, m1: 5, m2: 0, hist: 20 } },
    { id: 103, u: "Universidad Adolfo Ibáñez", carrera: "Diseño", sede: "Peñalolén", corte: 690, vacantes: 120, arancel: 9500000, p: { nem: 40, rank: 20, cl: 20, m1: 20, m2: 0, cien: 0, hist: 0 } },
    { id: 104, u: "Univ. Técnica Federico Santa María", carrera: "Técnico en Informática", sede: "Valparaíso", corte: 550, vacantes: 80, arancel: 4000000, p: { nem: 30, rank: 30, cl: 10, m1: 30, m2: 0, cien: 0, hist: 0 } }
];

/* --- ÍCONOS SVG NATIVOS --- */
const ICONS = {
  search: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  check: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  warning: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
};

export default function Simulador() {
  // Estado de puntajes con persistencia (LocalStorage opcional, aquí simple)
  const [scores, setScores] = useState({
    nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce para que no busque en cada tecla, sino al terminar de escribir
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000;
    if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };

  // 🧠 MOTOR DE CÁLCULO
  const results = useMemo(() => {
    // 1. Filtrado Inteligente (Nombre, U, Sede)
    const lowerQ = debouncedSearch.toLowerCase();
    
    // Usamos el SAMPLE_CARRERAS y filtramos por búsqueda
    const filtered = SAMPLE_CARRERAS.filter(c => 
        c.carrera.toLowerCase().includes(lowerQ) || 
        c.u.toLowerCase().includes(lowerQ) ||
        (c.sede && c.sede.toLowerCase().includes(lowerQ))
    );

    // Si la búsqueda es muy corta y no muestra nada, muestra todo el sample
    const careersToAnalyze = (debouncedSearch.length < 2 && filtered.length === 0) 
        ? SAMPLE_CARRERAS 
        : filtered;
    
    // 2. Cálculo Ponderado
    return careersToAnalyze.map(c => {
      // Mejor electiva automática
      const electivaCien = scores.cien * (c.p.cien || 0);
      const electivaHist = scores.hist * (c.p.hist || 0);
      
      let bestElectivaScore = 0;
      let electivaPonderation = 0;

      // Si la carrera pide CIENCIAS y/o HISTORIA, toma el puntaje más alto del alumno
      if (c.p.cien > 0 && c.p.hist > 0) {
          // Si piden ambas, el alumno puede elegir el mayor puntaje (o lo que la U permita)
          bestElectivaScore = Math.max(scores.cien, scores.hist);
          electivaPonderation = c.p.cien > 0 ? c.p.cien : c.p.hist; // Asume que la U usará la ponderación más alta si da a elegir
      } else {
          // Si solo pide una (ej. solo CIEN), usa ese puntaje y su ponderación.
          bestElectivaScore = (c.p.cien > 0) ? scores.cien : scores.hist;
          electivaPonderation = (c.p.cien > 0) ? c.p.cien : c.p.hist;
      }
      
      const p = c.p || {}; // Ponderaciones

      const rawSum = 
        (scores.nem * (p.nem || 0)) + 
        (scores.ranking * (p.rank || 0)) + 
        (scores.m1 * (p.m1 || 0)) + 
        (scores.m2 * (p.m2 || 0)) + 
        (scores.cl * (p.cl || 0)) + 
        (bestElectivaScore * electivaPonderation);


      // Detección automática de escala (si suma ~100 o ~1)
      const totalPerc = Object.values(p).reduce((a, b) => a + b, 0);
      
      // La suma total de ponderaciones DEBE ser 100 para que la división sea correcta
      const divisor = totalPerc > 90 && totalPerc < 110 ? 100 : 1; 
      
      const finalScore = Math.round(rawSum / divisor);

      // Estado vs Corte
      const corte = c.corte || 0;
      const diff = finalScore - corte;
      let status = { label: "LEJANO", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "⛔" };

      if (corte === 0) {
        status = { label: "NUEVA / S/I", color: "#94a3b8", bg: "rgba(148,163,184,0.1)", icon: "⚪" };
      } else if (diff >= 40) {
        status = { label: "ASEGURADO", color: "#10b981", bg: "rgba(16,185,129,0.15)", icon: "🚀" };
      } else if (diff >= 10) {
        status = { label: "ADMISIBLE", color: "#3b82f6", bg: "rgba(59,130,246,0.15)", icon: "✅" };
      } else if (diff >= -15) {
        status = { label: "AJUSTADO", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: "⚠️" };
      }

      return { ...c, finalScore, diff, status, corteReal: corte };
    });
  }, [debouncedSearch, scores]);

  return (
    <div className="sim-page">
      <SEOHead 
        title="Simulador de Puntajes PAES | Instituto Lael" 
        description="Calcula tu ponderación en tiempo real para todas las universidades de Chile. Motor actualizado Admisión 2026."
      />
      <style>{css}</style>

      <div className="sim-container">
        
        {/* HEADER */}
        <header className="sim-header">
          <div className="ai-badge">
            <span className="dot"></span> Motor PAES 2026 Ready
          </div>
          <h1>Simulador de Postulación (Demo)</h1>
          <p>La herramienta más potente para proyectar tu futuro académico.</p>
        </header>

        {/* INPUTS DASHBOARD (Sticky) */}
        <div className="dashboard-panel">
          <div className="inputs-scroll">
            {[
              { k: 'nem', l: 'NEM' }, { k: 'ranking', l: 'RANK' }, 
              { k: 'cl', l: 'LENGUAJE' }, { k: 'm1', l: 'MATE 1' }, 
              { k: 'm2', l: 'MATE 2' }, { k: 'cien', l: 'CIENCIAS' }, 
              { k: 'hist', l: 'HISTORIA' }
            ].map((field) => (
              <div key={field.k} className="input-group">
                <label>{field.l}</label>
                <input 
                  type="number" 
                  name={field.k} 
                  value={scores[field.k]} 
                  onChange={handleScore}
                  placeholder="0"
                  onFocus={(e) => e.target.select()} // Auto-seleccionar al tocar
                />
              </div>
            ))}
          </div>
        </div>

        {/* BUSCADOR FLOATING */}
        <div className="search-floater">
          <div className="search-wrapper">
            <span className="s-icon">{ICONS.search}</span>
            <input 
              type="text" 
              placeholder="Busca carrera o universidad (ej: Medicina Chile, Derecho UC)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {results.length > 0 && <span className="results-count">{results.length} res.</span>}
          </div>
        </div>

        {/* GRID DE RESULTADOS */}
        <div className="results-area">
          {results.length === 0 && debouncedSearch.length < 2 ? (
            <div className="empty-state">
              <div className="empty-graphic">🧪</div>
              <h3>Modifica tus puntajes arriba</h3>
              <p>Esta es una versión demo con 5 carreras de ejemplo. El cálculo es real.</p>
              <p className="mt-4 text-xs text-yellow-500">
                Para usar las 25,000 carreras, se requeriría una base de datos externa (ej: Firestore) para evitar que la página colapse.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-state">
              <div className="empty-graphic">🔭</div>
              <h3>No encontramos coincidencias</h3>
              <p>Esta es una demo. Prueba buscando: "Medicina", "Ingeniería" o "Derecho".</p>
            </div>
          ) : (
            <div className="cards-stack">
              {results.map((r, i) => (
                <div 
                  key={i} 
                  className="sim-card" 
                  style={{ animationDelay: `${i * 50}ms`, borderColor: r.status.color }}
                >
                  <div className="card-left">
                    <div className="uni-badge">{r.u}</div>
                    <h3 className="career-name">{r.carrera}</h3>
                    <div className="location-row">📍 {r.sede || "Casa Central"}</div>
                    <div className="arancel-info">💰 Arancel: ${r.arancel ? r.arancel.toLocaleString('es-CL') : 'N/A'}</div>
                  </div>

                  <div className="card-right">
                    <div className="status-badge" style={{ background: r.status.bg, color: r.status.color }}>
                      {r.status.icon} {r.status.label}
                    </div>
                    
                    <div className="score-display">
                      <span className="my-score" style={{ color: r.status.color }}>
                        {r.finalScore}
                      </span>
                      <span className="label-score">TU PONDERADO</span>
                    </div>

                    <div className="cut-info">
                      <div className="cut-bar-bg">
                        <div 
                          className="cut-bar-fill" 
                          style={{ 
                            width: `${Math.min((r.finalScore / 1000) * 100, 100)}%`,
                            background: r.status.color
                          }}
                        ></div>
                        {r.corteReal > 0 && (
                          <div 
                            className="cut-line" 
                            style={{ left: `${(r.corteReal / 1000) * 100}%` }}
                            title={`Corte: ${r.corteReal}`}
                          ></div>
                        )}
                      </div>
                      <div className="cut-text">
                        Corte ref: <strong>{r.corteReal || "N/A"}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= CSS "QUANTUM UI" ================= */
const css = `
:root {
  --bg: #050505;
  --panel: #0f1115;
  --border: #222;
  --text: #fff;
  --muted: #888;
  --accent: #6366f1;
}

.sim-page {
  background: var(--bg); color: var(--text); min-height: 100vh;
  font-family: 'Inter', sans-serif; padding-bottom: 100px;
}
.sim-container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

/* HEADER */
.sim-header { text-align: center; padding: 60px 0 40px; }
.ai-badge { 
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(16, 185, 129, 0.1); color: #10b981; 
  padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; 
  border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 15px;
}
.dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }
.sim-header h1 { font-size: 2.5rem; font-weight: 800; margin: 0 0 10px; letter-spacing: -1px; }
.sim-header p { color: var(--muted); font-size: 1.1rem; }

/* DASHBOARD INPUTS */
.dashboard-panel {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 20px; padding: 20px; margin-bottom: 30px;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
}
.inputs-scroll {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); 
  gap: 15px;
}
.input-group label {
  display: block; font-size: 0.7rem; color: var(--muted); font-weight: 700;
  margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;
}
.input-group input {
  width: 100%; background: #000; border: 1px solid var(--border);
  color: #fff; padding: 12px 5px; text-align: center; border-radius: 10px;
  font-size: 1.1rem; font-weight: 700; transition: all 0.2s;
}
.input-group input:focus {
  border-color: var(--accent); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

/* SEARCH FLOATER */
.search-floater { position: sticky; top: 20px; z-index: 100; margin-bottom: 40px; }
.search-wrapper {
  position: relative; max-width: 600px; margin: 0 auto;
  background: rgba(30, 30, 30, 0.8); backdrop-filter: blur(12px);
  border: 1px solid var(--accent); border-radius: 50px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  display: flex; align-items: center;
}
.s-icon { padding-left: 20px; color: var(--muted); display: flex; }
.search-wrapper input {
  flex: 1; background: transparent; border: none; outline: none;
  padding: 16px 15px; color: #fff; font-size: 1.1rem;
}
.results-count {
  font-size: 0.8rem; color: var(--muted); padding-right: 20px; font-weight: 600;
}

/* CARDS RESULTADOS */
.cards-stack { display: flex; flex-direction: column; gap: 16px; }

.sim-card {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 16px; padding: 24px;
  display: grid; grid-template-columns: 1fr 200px; gap: 20px;
  animation: slideIn 0.4s ease forwards; opacity: 0; transform: translateY(10px);
  transition: transform 0.2s;
  border-left: 4px solid transparent; /* Color dinámico via inline style */
}
@media (max-width: 700px) { .sim-card { grid-template-columns: 1fr; } }

.sim-card:hover { transform: translateX(5px); background: #13151a; }

.uni-badge { 
  font-size: 0.8rem; font-weight: 700; color: var(--muted); text-transform: uppercase; 
  margin-bottom: 5px; 
}
.career-name { font-size: 1.4rem; font-weight: 800; margin: 0 0 10px; line-height: 1.2; }
.location-row { font-size: 0.9rem; color: var(--muted); }
.arancel-info { font-size: 0.85rem; color: #10b981; font-weight: 600; margin-top: 10px; }


.card-right { 
  display: flex; flex-direction: column; justify-content: center; 
  background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px;
}

.status-badge {
  align-self: flex-end; font-size: 0.7rem; font-weight: 800; 
  padding: 4px 8px; border-radius: 6px; text-transform: uppercase; margin-bottom: 10px;
}

.score-display { text-align: right; margin-bottom: 10px; }
.my-score { font-size: 2rem; font-weight: 900; line-height: 1; display: block; }
.label-score { font-size: 0.65rem; color: var(--muted); font-weight: 700; letter-spacing: 1px; }

.cut-info { margin-top: 5px; }
.cut-bar-bg { 
  height: 6px; background: #333; border-radius: 3px; position: relative; margin-bottom: 6px;
}
.cut-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease-out; }
.cut-line { 
  position: absolute; top: -3px; width: 2px; height: 12px; 
  background: #fff; box-shadow: 0 0 5px white; z-index: 2;
}
.cut-text { font-size: 0.75rem; color: var(--muted); text-align: right; }
.cut-text strong { color: #fff; }

/* EMPTY STATES */
.empty-state { text-align: center; padding: 60px 20px; color: var(--muted); }
.empty-graphic { font-size: 4rem; margin-bottom: 20px; opacity: 0.5; animation: float 3s infinite ease-in-out; }

@keyframes slideIn { to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
`;