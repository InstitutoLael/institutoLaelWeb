import { useState, useMemo } from "react";
import { listaCarreras as carrerasData } from "../data/carreras-bd.js"; 
import logoLael from "../assets/img/Logos/lael-inst-rosa.png";

/* --- LÓGICA DE CÁLCULO (Optimizada para listas) --- */
const MIN_PUNTAJE = 100;
const MAX_PUNTAJE = 1000;

// Validador rápido
const isValid = (n) => (typeof n === "number" && !isNaN(n) && ((n >= MIN_PUNTAJE && n <= MAX_PUNTAJE) || n === 0));

// Función de limpieza de porcentajes
const cleanPerc = (val) => { const v = Number(val || 0); return v > 1 ? v / 100 : v; };

// Cálculo Puro (Sin estados, para usarlo en bucles)
function calcularPuntajePuro(carrera, misPuntajes) {
  const { nem, ranking, cl, m1, m2, cien, hist } = misPuntajes;

  // Extraer ponderaciones del objeto carrera
  const pNem = cleanPerc(carrera["Ponderación Notas"]);
  const pRank = cleanPerc(carrera["Ponderación Ranking Notas"]);
  const pCl = cleanPerc(carrera["Ponderación Lenguaje"]);
  const pM1 = cleanPerc(carrera["Ponderación Matemáticas"]);
  const pM2 = cleanPerc(carrera["Ponderación Matemáticas 2"]);
  const pCien = cleanPerc(carrera["Ponderación Ciencias"]);
  const pHist = cleanPerc(carrera["Ponderación Historia"]);
  const pOtro = cleanPerc(carrera["Ponderación Otros"]);

  // Elegir mejor electiva
  let pondElectiva = Math.max(pCien, pHist);
  let scoreElectiva = 0;
  if (pondElectiva > 0) {
      scoreElectiva = Math.max(isValid(cien) ? cien : 0, isValid(hist) ? hist : 0);
  }

  const final = 
    (pNem * nem) + 
    (pRank * ranking) + 
    (pCl * cl) + 
    (pM1 * m1) + 
    (pM2 * (isValid(m2) ? m2 : 0)) +
    (pondElectiva * scoreElectiva) +
    (pOtro * 1000); // Asumimos puntaje máximo en pruebas especiales

  return Math.round(final * 100) / 100;
}

export default function SimuladorLael() {
  // Estados
  const [scores, setScores] = useState({ nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };

  // --- EL MOTOR DE COMPARACIÓN ---
  const resultados = useMemo(() => {
    // 1. Si no escribe nada o muy poco, no mostramos nada para no saturar
    if (searchTerm.length < 3) return [];
    
    const term = searchTerm.toLowerCase();

    // 2. Filtramos y CALCULAMOS al mismo tiempo
    const listaProcesada = carrerasData
      .filter(c => {
         const nombre = String(c["Nombre Carrera"] || "").toLowerCase();
         const u = String(c["Nombre IES"] || "").toLowerCase();
         return nombre.includes(term) || u.includes(term);
      })
      .map(c => {
         // Calculamos el puntaje para ESTA carrera específica
         const miPuntaje = calcularPuntajePuro(c, scores);
         return { ...c, miPuntaje }; // Devolvemos la carrera con el puntaje pegado
      })
      .sort((a, b) => b.miPuntaje - a.miPuntaje) // Ordenamos: El mejor puntaje arriba
      .slice(0, 50); // Mostramos solo los top 50 para que sea rápido

    return listaProcesada;
  }, [searchTerm, scores]);

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
          <h1 className="hero-title">Buscador de <span className="gradient-text">Oportunidades</span></h1>
          <p className="hero-subtitle">Ingresa tus puntajes una vez y descubre tu ponderación en todas las universidades simultáneamente.</p>
        </header>

        {/* INPUTS DE PUNTAJE (Siempre visibles arriba) */}
        <div className="glass-panel sticky-inputs">
            <div className="inputs-header">
                <h3>1. Tus Puntajes</h3>
                <small>Edita y los resultados se actualizarán solos</small>
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

        {/* BUSCADOR */}
        <div className="search-section">
            <div className="search-bar-container">
                <input 
                    type="text" 
                    className="big-search-input"
                    placeholder="Escribe una carrera (ej: Enfermería, Derecho, Ingeniería)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-hint">🔍 Escribe al menos 3 letras</span>
            </div>
            
            <div className="quick-tags">
                <span>Busca rápido:</span>
                <button onClick={() => setSearchTerm("Medicina")}>Medicina</button>
                <button onClick={() => setSearchTerm("Enfermería")}>Enfermería</button>
                <button onClick={() => setSearchTerm("Psicología")}>Psicología</button>
                <button onClick={() => setSearchTerm("Derecho")}>Derecho</button>
                <button onClick={() => setSearchTerm("Ingeniería Civil")}>Ingeniería</button>
            </div>
        </div>

        {/* RESULTADOS (LISTA DE TARJETAS) */}
        <div className="results-grid">
            {resultados.length === 0 && searchTerm.length >= 3 && (
                <div className="no-results">No encontramos carreras con ese nombre :(</div>
            )}

            {resultados.map((carrera, index) => (
                <ResultCard key={index} data={carrera} />
            ))}
        </div>

      </div>
    </div>
  );
}

/* --- TARJETA DE RESULTADO INDIVIDUAL --- */
const ResultCard = ({ data }) => {
    // Formato de precio
    const precio = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(data["Arancel Anual"] || 0));
    
    return (
        <div className="career-card fadeIn">
            <div className="card-left">
                <span className="uni-name">{data["Nombre IES"]}</span>
                <h3 className="career-name">{data["Nombre Carrera"]}</h3>
                <div className="tags">
                    <span className="tag-price">💰 {precio}</span>
                    {/* Si tuviéramos sede o región en el JSON, iría aquí */}
                </div>
            </div>
            
            <div className="card-right">
                <div className="score-box">
                    <small>Tu Ponderación</small>
                    <span className="big-score">{data.miPuntaje}</span>
                </div>
            </div>
        </div>
    );
};

const InputModern = ({ k, label, val, onChange, highlight }) => (
    <div className={`modern-input-group ${highlight ? 'highlight' : ''}`}>
        <label>{label}</label>
        <input type="number" name={k} value={val} onChange={onChange} min="0" max="1000" onFocus={(e) => e.target.select()}/>
    </div>
);

/* --- ESTILOS CSS --- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

:root {
    --bg-dark: #09090b;
    --glass: rgba(24, 24, 27, 0.8);
    --glass-border: rgba(255, 255, 255, 0.1);
    --primary: #6366F1;
    --text-main: #F8FAFC;
    --text-muted: #94A3B8;
}

body, html { margin: 0; padding: 0; background: var(--bg-dark); font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-main); }
* { box-sizing: border-box; }

.lael-page { min-height: 100vh; background: radial-gradient(circle at top center, #1e1b4b 0%, #09090b 60%); padding-bottom: 80px; }
.main-container { max-width: 900px; margin: 0 auto; padding: 0 20px; }

/* NAVBAR */
.lael-nav { display: flex; justify-content: center; padding: 15px 0; backdrop-filter: blur(10px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 100; background: rgba(9,9,11,0.95); }
.nav-container { width: 100%; max-width: 1100px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
.nav-logo-img { height: 40px; width: auto; object-fit: contain; }
.btn-secondary { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }

/* HERO */
.hero-section { text-align: center; padding: 40px 0 30px; }
.hero-title { font-size: 2.5rem; font-weight: 800; margin: 0 0 10px; }
.gradient-text { background: linear-gradient(135deg, var(--primary), #A855F7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { color: var(--text-muted); font-size: 1rem; max-width: 600px; margin: 0 auto; }

/* INPUTS STICKY */
.glass-panel { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 20px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); backdrop-filter: blur(10px); }
.inputs-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 15px; }
.inputs-header h3 { margin: 0; color: white; }
.inputs-header small { color: var(--text-muted); }

.inputs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px; }
.modern-input-group label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; text-align: center;}
.modern-input-group input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 8px; padding: 8px; color: white; font-size: 1.1rem; font-weight: 700; text-align: center; }
.modern-input-group.highlight input { border-color: var(--primary); background: rgba(99, 102, 241, 0.1); }
.modern-input-group input:focus { outline: none; border-color: #A855F7; }

/* SEARCH */
.search-section { margin-bottom: 30px; }
.big-search-input { width: 100%; background: #1e1b4b; border: 2px solid var(--primary); padding: 18px; border-radius: 12px; color: white; font-size: 1.2rem; box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
.big-search-input:focus { outline: none; box-shadow: 0 0 30px rgba(99, 102, 241, 0.4); }
.search-hint { display: block; text-align: right; font-size: 0.8rem; color: var(--text-muted); margin-top: 5px; }

.quick-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px; align-items: center; justify-content: center;}
.quick-tags span { color: var(--text-muted); font-size: 0.9rem; }
.quick-tags button { background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: #cbd5e1; padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: 0.2s; }
.quick-tags button:hover { background: var(--primary); color: white; transform: translateY(-2px); }

/* RESULTS LIST */
.results-grid { display: flex; flex-direction: column; gap: 15px; }
.no-results { text-align: center; color: var(--text-muted); padding: 40px; font-size: 1.2rem; }

.career-card { 
    background: rgba(30, 41, 59, 0.6); border: 1px solid var(--glass-border); border-radius: 16px; padding: 20px; 
    display: flex; justify-content: space-between; align-items: center; 
    transition: transform 0.2s, background 0.2s;
}
.career-card:hover { transform: translateY(-3px); background: rgba(30, 41, 59, 0.9); border-color: var(--primary); }

.card-left { flex: 1; }
.uni-name { display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.career-name { margin: 0 0 10px; font-size: 1.2rem; color: white; }
.tags { display: flex; gap: 10px; }
.tag-price { background: rgba(16, 185, 129, 0.1); color: #34d399; font-size: 0.8rem; padding: 4px 8px; border-radius: 6px; font-weight: 600; }

.card-right { text-align: right; min-width: 100px; }
.score-box small { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
.big-score { font-size: 2rem; font-weight: 800; color: var(--primary); text-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media(max-width: 600px) { 
    .career-card { flex-direction: column; align-items: flex-start; gap: 15px; } 
    .card-right { width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 10px; }
    .mobile-hide { display: none; }
}
`;