import { useState, useMemo } from "react";
import { todasRegiones } from "../data/sim/regiones/todas-regiones.js"; 
import logoLael from "../assets/img/Logos/lael-inst-rosa.png";

/* --- 1. LÓGICA DE NEGOCIO --- */
const MIN_PUNTAJE = 100;
const MAX_PUNTAJE = 1000;

const cleanPerc = (val) => { const v = Number(val || 0); return v > 1 ? v / 100 : v; };
const isValid = (n) => (typeof n === "number" && !isNaN(n) && ((n >= MIN_PUNTAJE && n <= MAX_PUNTAJE) || n === 0));

function calcularPuntaje(pond, s) {
  if (!pond) return 0;
  
  // Normalizamos las llaves (por si vienen con nombres distintos)
  const p = {
      nem: cleanPerc(pond.notas || pond.nem),
      rank: cleanPerc(pond.ranking),
      cl: cleanPerc(pond.lenguaje || pond.comunicacion),
      m1: cleanPerc(pond.matematicas || pond.matematicas1),
      m2: cleanPerc(pond.matematicas2),
      cien: cleanPerc(pond.ciencias),
      hist: cleanPerc(pond.historia),
      otro: cleanPerc(pond.otros)
  };

  // Cálculo de mejor electiva
  const pondElectiva = Math.max(p.cien, p.hist);
  const scoreElectiva = pondElectiva > 0 ? Math.max(isValid(s.cien) ? s.cien : 0, isValid(s.hist) ? s.hist : 0) : 0;

  const final = 
    (p.nem * s.nem) + (p.rank * s.ranking) + (p.cl * s.cl) + (p.m1 * s.m1) + 
    (p.m2 * (isValid(s.m2) ? s.m2 : 0)) + (pondElectiva * scoreElectiva) + (p.otro * 1000);

  return Math.round(final * 100) / 100;
}

/* --- 2. COMPONENTE PRINCIPAL --- */
export default function SimuladorPro() {
  const [scores, setScores] = useState({ nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0 });
  const [filters, setFilters] = useState({ text: "", region: "Todas", uni: "Todas" });

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };

  // --- PROCESAMIENTO INTELIGENTE ---
  const { resultados, regionesList, unisList, stats } = useMemo(() => {
    let lista = [];
    let regs = new Set();
    let unis = new Set();

    // 1. Aplanamos y extraemos metadatos
    if (Array.isArray(todasRegiones)) {
        todasRegiones.forEach(u => {
            unis.add(u.nombreCorto || u.nombre);
            if (u.sedes) {
                u.sedes.forEach(s => {
                    regs.add(s.regionNombreCorto);
                    if (s.carreras) {
                        s.carreras.forEach(c => {
                            lista.push({
                                id: c.codigo,
                                u: u.nombreCorto || u.nombre,
                                c: c.nombre,
                                s: s.nombre,
                                reg: s.regionNombreCorto,
                                arancel: parseInt(c.arancelAnual) || 0,
                                pond: c.ponderacion,
                                ptje: calcularPuntaje(c.ponderacion, scores)
                            });
                        });
                    }
                });
            }
        });
    }

    // 2. Filtramos
    const filtered = lista.filter(item => {
        const matchText = filters.text === "" || item.c.toLowerCase().includes(filters.text.toLowerCase());
        const matchReg = filters.region === "Todas" || item.reg === filters.region;
        const matchUni = filters.uni === "Todas" || item.u === filters.uni;
        return matchText && matchReg && matchUni;
    }).sort((a, b) => b.ptje - a.ptje);

    // 3. Estadísticas rápidas
    const sobre700 = filtered.filter(i => i.ptje >= 700).length;
    const maxPtje = filtered.length > 0 ? filtered[0].ptje : 0;

    return { 
        resultados: filtered.slice(0, 50), 
        regionesList: ["Todas", ...Array.from(regs).sort()],
        unisList: ["Todas", ...Array.from(unis).sort()],
        stats: { total: filtered.length, sobre700, maxPtje }
    };
  }, [scores, filters]);

  return (
    <div className="sim-page">
      <style>{css}</style>
      
      {/* HEADER */}
      <header className="sim-header">
        <div className="header-content">
            <img src={logoLael} alt="Logo" className="logo" />
            <div className="header-text">
                <h1>Simulador <span className="highlight">Avanzado</span></h1>
                <p>Proyecta tu futuro con datos oficiales 2026</p>
            </div>
        </div>
      </header>

      <div className="sim-layout">
        
        {/* SIDEBAR: PUNTAJES (Visible siempre en Desktop) */}
        <aside className="sidebar">
            <div className="panel score-panel">
                <h3>Tus Puntajes</h3>
                <div className="score-grid">
                    <ScoreInput label="NEM" name="nem" val={scores.nem} onChange={handleScore} />
                    <ScoreInput label="RANK" name="ranking" val={scores.ranking} onChange={handleScore} />
                    <ScoreInput label="LEN" name="cl" val={scores.cl} onChange={handleScore} color="#3B82F6" />
                    <ScoreInput label="MAT 1" name="m1" val={scores.m1} onChange={handleScore} color="#3B82F6" />
                    <ScoreInput label="MAT 2" name="m2" val={scores.m2} onChange={handleScore} />
                    <ScoreInput label="CIEN" name="cien" val={scores.cien} onChange={handleScore} />
                    <ScoreInput label="HIST" name="hist" val={scores.hist} onChange={handleScore} />
                </div>
            </div>

            {/* ESTADÍSTICAS RÁPIDAS */}
            <div className="panel stats-panel">
                <div className="stat-item">
                    <span className="stat-val">{stats.total}</span>
                    <span className="stat-label">Opciones</span>
                </div>
                <div className="stat-item">
                    <span className="stat-val highlight">{stats.sobre700}</span>
                    <span className="stat-label">&gt; 700 pts</span>
                </div>
            </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
            
            {/* BARRA DE FILTROS */}
            <div className="filter-bar">
                <input 
                    type="text" 
                    placeholder="🔍 Busca carrera (ej: Medicina, Derecho)..." 
                    value={filters.text}
                    onChange={(e) => setFilters({...filters, text: e.target.value})}
                    className="search-input"
                />
                <div className="select-group">
                    <select value={filters.region} onChange={(e) => setFilters({...filters, region: e.target.value})}>
                        {regionesList.map(r => <option key={r} value={r}>{r === "Todas" ? "Todas las Regiones" : r}</option>)}
                    </select>
                    <select value={filters.uni} onChange={(e) => setFilters({...filters, uni: e.target.value})}>
                        {unisList.map(u => <option key={u} value={u}>{u === "Todas" ? "Todas las Universidades" : u}</option>)}
                    </select>
                </div>
            </div>

            {/* RESULTADOS */}
            <div className="results-list">
                {resultados.length === 0 ? (
                    <div className="empty-state">
                        <span className="emoji">🕵️</span>
                        <h3>Sin resultados</h3>
                        <p>Intenta cambiar los filtros o busca otra carrera.</p>
                    </div>
                ) : (
                    resultados.map((item, i) => (
                        <ResultCard key={i} data={item} isTop={i === 0} />
                    ))
                )}
            </div>
        </main>
      </div>
    </div>
  );
}

/* --- SUBCOMPONENTES --- */
const ScoreInput = ({ label, name, val, onChange, color }) => (
    <div className="input-wrapper">
        <label>{label}</label>
        <input 
            type="number" 
            name={name} 
            value={val} 
            onChange={onChange} 
            style={{ borderColor: color || 'rgba(255,255,255,0.1)' }}
        />
    </div>
);

const ResultCard = ({ data, isTop }) => {
    const precio = data.arancel > 0 
        ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(data.arancel) 
        : "No informado";
    
    // Barra de progreso visual del puntaje (Base 1000)
    const percent = Math.min((data.ptje / 1000) * 100, 100);

    return (
        <div className={`card ${isTop ? 'top-card' : ''}`}>
            {isTop && <div className="top-badge">🏆 Mejor Opción</div>}
            
            <div className="card-body">
                <div className="card-info">
                    <span className="uni-tag">{data.u}</span>
                    <h3>{data.c}</h3>
                    <div className="meta-tags">
                        <span>📍 {data.reg}</span>
                        <span>🏢 {data.s}</span>
                        <span className="money">💰 {precio}</span>
                    </div>
                </div>

                <div className="card-score">
                    <span className="score-label">Ponderado</span>
                    <span className="score-val" style={{ color: data.ptje > 0 ? '#fff' : '#64748B' }}>
                        {data.ptje > 0 ? data.ptje : "N/A"}
                    </span>
                    {data.ptje === 0 && <small className="warn">Faltan datos</small>}
                </div>
            </div>
            
            {data.ptje > 0 && (
                <div className="progress-bg">
                    <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
            )}
        </div>
    );
};

/* --- ESTILOS MODERNOS (CSS Grid + Flexbox) --- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

:root {
    --bg: #0F172A;
    --card-bg: #1E293B;
    --primary: #6366F1;
    --accent: #A855F7;
    --text: #F8FAFC;
    --text-muted: #94A3B8;
    --border: rgba(255,255,255,0.08);
}

.sim-page { min-height: 100vh; background: var(--bg); font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text); padding-bottom: 50px; }

/* HEADER */
.sim-header { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); padding: 15px 0; position: sticky; top: 0; z-index: 50; }
.header-content { max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; gap: 20px; }
.logo { height: 40px; }
.header-text h1 { font-size: 1.5rem; margin: 0; font-weight: 800; }
.header-text p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
.highlight { color: var(--primary); }

/* LAYOUT */
.sim-layout { display: grid; grid-template-columns: 280px 1fr; gap: 30px; max-width: 1200px; margin: 30px auto; padding: 0 20px; }

/* SIDEBAR */
.panel { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 20px; }
.score-panel h3 { margin: 0 0 15px 0; font-size: 1rem; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 10px; }
.score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.input-wrapper label { display: block; font-size: 0.7rem; color: var(--text-muted); font-weight: 700; margin-bottom: 4px; }
.input-wrapper input { width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; padding: 8px; color: white; font-weight: 700; text-align: center; transition: 0.2s; }
.input-wrapper input:focus { border-color: var(--primary) !important; outline: none; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }

.stats-panel { display: flex; justify-content: space-around; text-align: center; }
.stat-val { display: block; font-size: 1.5rem; font-weight: 800; }
.stat-val.highlight { color: var(--primary); }
.stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }

/* MAIN CONTENT */
.filter-bar { background: var(--card-bg); padding: 15px; border-radius: 16px; border: 1px solid var(--border); display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.search-input { flex: 2; min-width: 200px; padding: 12px; border-radius: 10px; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; font-size: 1rem; }
.select-group { display: flex; gap: 10px; flex: 1; }
.select-group select { flex: 1; padding: 12px; border-radius: 10px; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; cursor: pointer; }

/* RESULT CARDS */
.results-list { display: flex; flex-direction: column; gap: 15px; }
.card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: transform 0.2s; position: relative; }
.card:hover { transform: translateY(-2px); border-color: var(--primary); }
.top-card { border: 1px solid var(--primary); background: linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, var(--card-bg) 100%); }
.top-badge { background: var(--primary); color: white; font-size: 0.7rem; font-weight: 800; padding: 4px 12px; display: inline-block; border-bottom-right-radius: 10px; }

.card-body { padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.uni-tag { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
.card h3 { margin: 5px 0 10px 0; font-size: 1.1rem; color: white; }
.meta-tags { display: flex; gap: 10px; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-muted); }
.meta-tags span { background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 6px; }
.meta-tags .money { color: #34D399; background: rgba(52, 211, 153, 0.1); font-weight: 600; }

.card-score { text-align: right; min-width: 100px; }
.score-label { display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 2px; }
.score-val { font-size: 2rem; font-weight: 800; line-height: 1; }
.warn { display: block; color: #F59E0B; font-size: 0.7rem; }

.progress-bg { height: 6px; background: rgba(255,255,255,0.05); width: 100%; margin-top: 0; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); }

.empty-state { text-align: center; padding: 50px; color: var(--text-muted); }
.emoji { font-size: 3rem; display: block; margin-bottom: 10px; }

@media(max-width: 900px) {
    .sim-layout { grid-template-columns: 1fr; }
    .sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .score-grid { grid-template-columns: repeat(4, 1fr); }
}
@media(max-width: 600px) {
    .sidebar { grid-template-columns: 1fr; }
    .score-grid { grid-template-columns: repeat(3, 1fr); }
    .card-body { flex-direction: column; align-items: flex-start; gap: 15px; }
    .card-score { text-align: left; width: 100%; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 15px; }
    .filter-bar { flex-direction: column; }
}
`;