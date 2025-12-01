// src/pages/Simulador.jsx
import { useState, useMemo } from "react";
import SEOHead from "../components/SEOHead.jsx";

// Importamos la base de datos gigante que creaste
import { DB_CARRERAS } from "../data/simulador.js";

export default function Simulador() {
  // Estado de los puntajes del alumno
  const [scores, setScores] = useState({
    nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0
  });

  const [search, setSearch] = useState("");

  // Manejador de Inputs
  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; 
    setScores({ ...scores, [e.target.name]: val });
  };

  // 🧠 CÁLCULO INTELIGENTE
  const results = useMemo(() => {
    // Si no ha escrito nada o hay menos de 3 letras, no mostramos nada para no saturar
    if (!search || search.length < 3) return [];

    // 1. Filtrar base de datos (Búsqueda rápida)
    // Limitamos a 20 resultados para que no se cuelgue si busca "Ingeniería" (que hay miles)
    const filtered = DB_CARRERAS.filter(c => 
      (c.carrera && c.carrera.toLowerCase().includes(search.toLowerCase())) || 
      (c.u && c.u.toLowerCase().includes(search.toLowerCase()))
    ).slice(0, 20);

    // 2. Calcular ponderación para cada coincidencia
    return filtered.map(c => {
      // Determinar cuál electiva usar (la mejor entre Ciencias e Historia)
      // Asumimos que la base de datos tiene un campo 'cien' o 'hist' para la ponderación
      // Si la carrera pide Historia específicamente, el Excel suele ponerlo en una columna específica.
      // Para este simulador universal, usaremos el mayor puntaje del alumno contra el % de electiva.
      
      const puntajeElectiva = Math.max(scores.cien, scores.hist); 
      
      // Validación de seguridad por si algún dato viene null
      const p = c.p || { nem: 0, rank: 0, m1: 0, m2: 0, cl: 0, cien: 0, hist: 0 };

      // Cálculo del puntaje ponderado
      // Nota: Multiplicamos puntaje * porcentaje.
      const sumaPonderada = 
        (scores.nem * (p.nem || 0)) + 
        (scores.ranking * (p.rank || 0)) + 
        (scores.m1 * (p.m1 || 0)) + 
        (scores.m2 * (p.m2 || 0)) + 
        (scores.cl * (p.cl || 0)) + 
        (puntajeElectiva * (p.cien || p.hist || 0)); // Usamos electiva genérica

      // Ajuste de escala: Si los porcentajes suman 100 (ej: 10, 20), dividimos por 100.
      // Si suman 1 (ej: 0.1, 0.2), no dividimos.
      // Detectamos esto sumando los porcentajes brutos.
      const sumaPorcentajes = (p.nem||0) + (p.rank||0) + (p.m1||0) + (p.m2||0) + (p.cl||0) + (p.cien||0);
      
      let finalScore = sumaPonderada;
      if (sumaPorcentajes > 1.5) { // Si suma más de 1.5, es escala 100
        finalScore = Math.round(sumaPonderada / 100);
      } else {
        finalScore = Math.round(sumaPonderada);
      }

      // Cálculo de Diferencia y Estado
      const corte = c.corte || 0; // Si no hay corte, asumimos 0
      const diff = finalScore - corte;

      let status = { label: "LEJANO", color: "#EF4444", text: "Estás bajo el corte" };
      
      if (corte === 0) {
        status = { label: "SIN REF", color: "#94a3b8", text: "Carrera nueva o sin corte previo" };
      } else if (diff >= 30) {
        status = { label: "SEGURO", color: "#10B981", text: "Muy probable (Sobradísimo)" };
      } else if (diff >= 0) {
        status = { label: "ADMISIBLE", color: "#3B82F6", text: "Dentro del corte (Justo)" };
      } else if (diff >= -20) {
        status = { label: "RIESGO", color: "#F59E0B", text: "Faltan pocos puntos" };
      }

      return { ...c, finalScore, diff, status, corteReal: corte };
    });
  }, [search, scores]);

  return (
    <div className="sim-page">
      <SEOHead title="Simulador Universal PAES | Instituto Lael" />
      <style>{css}</style>

      <div className="container">
        
        {/* HEADER */}
        <div className="sim-head">
          <span className="badge">Motor de IA 2026</span>
          <h1>Simulador Universal</h1>
          <p>Tus puntajes vs. Toda la oferta académica de Chile.</p>
        </div>

        {/* INPUTS DE PUNTAJES (Sticky en Desktop) */}
        <div className="scores-bar glass-card">
          <div className="score-input">
            <label>NEM</label>
            <input type="number" name="nem" value={scores.nem} onChange={handleScore} />
          </div>
          <div className="score-input">
            <label>Ranking</label>
            <input type="number" name="ranking" value={scores.ranking} onChange={handleScore} />
          </div>
          <div className="score-input">
            <label>Comp. Lectora</label>
            <input type="number" name="cl" value={scores.cl} onChange={handleScore} />
          </div>
          <div className="score-input">
            <label>Mate 1</label>
            <input type="number" name="m1" value={scores.m1} onChange={handleScore} />
          </div>
          <div className="score-input">
            <label>Mate 2</label>
            <input type="number" name="m2" value={scores.m2} onChange={handleScore} />
          </div>
          <div className="score-input">
            <label>Ciencias</label>
            <input type="number" name="cien" value={scores.cien} onChange={handleScore} />
          </div>
          <div className="score-input">
            <label>Historia</label>
            <input type="number" name="hist" value={scores.hist} onChange={handleScore} />
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Escribe una carrera o universidad (Ej: Medicina Chile, Derecho, UC)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="results-grid">
          {search.length < 3 ? (
            <div className="empty-state">
              <span className="empty-icon">👆</span>
              <h3>Empieza a escribir para simular</h3>
              <p>Busca entre miles de carreras y ve tu ponderación al instante.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🤷‍♂️</span>
              <h3>No encontramos coincidencias</h3>
              <p>Intenta con otro nombre de carrera.</p>
            </div>
          ) : (
            results.map((r) => (
              <div key={r.id} className="res-card glass-card">
                <div className="res-header">
                  <div className="uni-info">
                    <h4>{r.carrera}</h4>
                    <span>{r.u} · {r.sede}</span>
                  </div>
                  <div className="status-pill" style={{background: `${r.status.color}20`, color: r.status.color}}>
                    {r.status.label}
                  </div>
                </div>

                <div className="res-body">
                  <div className="score-row">
                    <span>Tu Ponderación</span>
                    <strong style={{color: r.status.color}}>{r.finalScore}</strong>
                  </div>
                  <div className="score-row small">
                    <span>Corte 2025</span>
                    <span className="muted">{r.corteReal > 0 ? `${r.corteReal} pts` : "N/A"}</span>
                  </div>
                  
                  {/* Barra de progreso visual */}
                  <div className="progress-bg">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min((r.finalScore / 1000) * 100, 100)}%`,
                        background: r.status.color 
                      }} 
                    />
                    {r.corteReal > 0 && (
                        <div 
                        className="cut-marker" 
                        style={{ left: `${(r.corteReal / 1000) * 100}%` }}
                        title={`Corte: ${r.corteReal}`}
                        />
                    )}
                  </div>
                  
                  <p className="status-msg">{r.status.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

/* ================= CSS (DASHBOARD STYLE) ================= */
const css = `
:root {
  --bg-deep: #050505;
  --panel: #121212;
  --border: #333;
  --text: #F8FAFC;
  --muted: #94A3B8;
  --primary: #6366F1;
}

.sim-page { background: var(--bg-deep); color: var(--text); min-height: 100vh; padding-bottom: 80px; font-family: 'Inter', sans-serif; }
.container { max-width: 900px; margin: 0 auto; padding: 0 20px; }

/* HEADER */
.sim-head { text-align: center; padding: 60px 0 40px; }
.badge { background: rgba(99,102,241,0.15); color: #818cf8; padding: 6px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(99,102,241,0.3); }
h1 { font-size: 2.5rem; margin: 20px 0 10px; font-weight: 800; }
.sim-head p { color: var(--muted); font-size: 1.1rem; }

/* SCORE BAR (INPUTS) */
.scores-bar {
  display: flex; gap: 10px; overflow-x: auto; padding: 20px; border-radius: 16px;
  background: var(--panel); border: 1px solid var(--border); margin-bottom: 40px;
  /* Scrollbar oculta */
  scrollbar-width: none; -ms-overflow-style: none;
}
.scores-bar::-webkit-scrollbar { display: none; }

.score-input { min-width: 80px; flex: 1; }
.score-input label { display: block; font-size: 0.75rem; color: var(--muted); margin-bottom: 5px; font-weight: 600; white-space: nowrap; }
.score-input input {
  width: 100%; background: #000; border: 1px solid var(--border); color: #fff;
  padding: 10px; border-radius: 8px; text-align: center; font-weight: 700; font-size: 1rem;
  transition: .2s; outline: none;
}
.score-input input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,0.2); }

/* SEARCH */
.search-section { position: sticky; top: 90px; z-index: 50; margin-bottom: 30px; }
.search-box { position: relative; }
.search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.5; }
.search-box input {
  width: 100%; padding: 18px 20px 18px 50px; border-radius: 50px;
  background: rgba(30, 30, 30, 0.8); backdrop-filter: blur(12px);
  border: 1px solid var(--primary); color: #fff; font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5); outline: none; transition: .2s;
}
.search-box input:focus { background: #1e1e1e; box-shadow: 0 10px 40px rgba(99,102,241,0.2); }

/* RESULTS */
.results-grid { display: flex; flex-direction: column; gap: 15px; }

.res-card {
  background: var(--panel); border: 1px solid var(--border); padding: 20px; border-radius: 16px;
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 20px; align-items: center;
  transition: .2s;
}
@media (max-width: 600px) { .res-card { grid-template-columns: 1fr; } }

.uni-info h4 { font-size: 1.2rem; margin: 0 0 5px; font-weight: 700; color: #fff; }
.uni-info span { font-size: 0.9rem; color: var(--muted); }

.res-body { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; border: 1px solid var(--border); }

.score-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
.score-row strong { font-size: 1.5rem; font-weight: 800; }
.score-row.small { font-size: 0.85rem; margin-bottom: 15px; opacity: 0.8; }

/* BARRA PROGRESO */
.progress-bg { height: 8px; background: #333; border-radius: 4px; position: relative; overflow: visible; margin-bottom: 10px; }
.progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
.cut-marker {
  position: absolute; top: -4px; width: 2px; height: 16px; background: #fff;
  box-shadow: 0 0 10px #fff; z-index: 2;
}

.status-msg { font-size: 0.85rem; text-align: right; margin: 0; color: var(--muted); font-style: italic; }
.status-pill { font-size: 0.7rem; padding: 4px 10px; border-radius: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; justify-self: start; display: inline-block; margin-top: 10px; }

/* EMPTY STATES */
.empty-state { text-align: center; padding: 60px 20px; color: var(--muted); }
.empty-icon { font-size: 4rem; display: block; margin-bottom: 20px; opacity: 0.5; }
`;