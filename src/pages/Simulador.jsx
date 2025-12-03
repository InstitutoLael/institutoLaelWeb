import { useState, useMemo } from "react";
// Importamos tus datos complejos
import { todasRegiones } from "../data/sim/regiones/todas-regiones.js"; 
import logoLael from "../assets/img/Logos/lael-inst-rosa.png";

/* --- LÓGICA DE CÁLCULO --- */
const MIN_PUNTAJE = 100;
const MAX_PUNTAJE = 1000;

const isValid = (n) => (typeof n === "number" && !isNaN(n) && ((n >= MIN_PUNTAJE && n <= MAX_PUNTAJE) || n === 0));
const cleanPerc = (val) => { const v = Number(val || 0); return v > 1 ? v / 100 : v; };

function calcularPuntajePuro(ponderacion, misPuntajes) {
  // Si no hay ponderaciones, retornamos 0
  if (!ponderacion) return 0;

  const { nem, ranking, cl, m1, m2, cien, hist } = misPuntajes;

  // Intentamos leer las llaves comunes. Si no vienen en tu JSON, serán 0.
  const pNem = cleanPerc(ponderacion.notas || ponderacion.nem);
  const pRank = cleanPerc(ponderacion.ranking);
  const pCl = cleanPerc(ponderacion.lenguaje || ponderacion.comunicacion);
  const pM1 = cleanPerc(ponderacion.matematicas || ponderacion.matematicas1);
  const pM2 = cleanPerc(ponderacion.matematicas2);
  const pCien = cleanPerc(ponderacion.ciencias);
  const pHist = cleanPerc(ponderacion.historia);
  const pOtro = cleanPerc(ponderacion.otros);

  // Mejor electiva
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
    (pOtro * 1000); 

  return Math.round(final * 100) / 100;
}

export default function SimuladorLael() {
  const [scores, setScores] = useState({ nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000; if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };

  // --- MOTOR DE PROCESAMIENTO ---
  const resultados = useMemo(() => {
    if (searchTerm.length < 3) return [];
    const term = searchTerm.toLowerCase();

    // 1. APLANAR DATOS: Convertimos el árbol (U -> Sede -> Carrera) en lista plana
    let listaPlana = [];

    // Verificamos que existan datos antes de procesar
    if (Array.isArray(todasRegiones)) {
        todasRegiones.forEach(uni => {
            if (uni.sedes) {
                uni.sedes.forEach(sede => {
                    if (sede.carreras) {
                        sede.carreras.forEach(carrera => {
                            // Filtro básico de búsqueda
                            const matchNombre = carrera.nombre.toLowerCase().includes(term);
                            const matchUni = (uni.nombreCorto || uni.nombre).toLowerCase().includes(term);

                            if (matchNombre || matchUni) {
                                listaPlana.push({
                                    id: carrera.codigo, // ID único
                                    u: uni.nombreCorto || uni.nombre,
                                    c: carrera.nombre,
                                    s: sede.nombre,
                                    reg: sede.regionNombreCorto,
                                    arancel: parseInt(carrera.arancelAnual) || 0,
                                    // Guardamos la ponderación para calcular
                                    pond: carrera.ponderacion || {} 
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    // 2. CALCULAR Y ORDENAR
    return listaPlana
      .map(item => ({
         ...item,
         miPuntaje: calcularPuntajePuro(item.pond, scores)
      }))
      .sort((a, b) => b.miPuntaje - a.miPuntaje) // Los mejores puntajes primero
      .slice(0, 50); // Límite para no pegar el navegador

  }, [searchTerm, scores]);

  return (
    <div className="lael-page">
      <style>{css}</style>

      <nav className="lael-nav">
        <div className="nav-container">
            <img src={logoLael} alt="Instituto Lael" className="nav-logo-img" />
            <button className="btn-secondary mobile-hide">Ir al Sitio Web</button>
        </div>
      </nav>

      <div className="main-container">
        <header className="hero-section">
          <h1 className="hero-title">Buscador <span className="gradient-text">2026</span></h1>
          <p className="hero-subtitle">Explora la oferta académica oficial.</p>
        </header>

        <div className="glass-panel sticky-inputs">
            <div className="inputs-header"><h3>Tus Puntajes</h3></div>
            <div className="inputs-grid">
                <InputModern k="nem" label="NEM" val={scores.nem} onChange={handleScore} />
                <InputModern k="ranking" label="RANK" val={scores.ranking} onChange={handleScore} />
                <InputModern k="cl" label="LEN" val={scores.cl} onChange={handleScore} highlight />
                <InputModern k="m1" label="M1" val={scores.m1} onChange={handleScore} highlight />
                <InputModern k="m2" label="M2" val={scores.m2} onChange={handleScore} />
                <InputModern k="cien" label="CS" val={scores.cien} onChange={handleScore} />
                <InputModern k="hist" label="HIS" val={scores.hist} onChange={handleScore} />
            </div>
        </div>

        <div className="search-section">
            <input 
                type="text" 
                className="big-search-input"
                placeholder="Ej: Psicología, Ingeniería, U. Católica..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="results-grid">
            {resultados.length === 0 && searchTerm.length >= 3 && (
                <div className="no-results">No encontramos coincidencias 🕵️</div>
            )}

            {resultados.map((item, index) => (
                <ResultCard key={index} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

const ResultCard = ({ data }) => {
    // Formato de dinero chileno
    const precio = data.arancel > 0 
        ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(data.arancel) 
        : "No informado";

    return (
        <div className="career-card fadeIn">
            <div className="card-left">
                <span className="uni-name">{data.u}</span>
                <h3 className="career-name">{data.c}</h3>
                <div className="tags">
                    <span className="tag-sede">📍 {data.s} ({data.reg})</span>
                    <span className="tag-price">💰 {precio}</span>
                </div>
            </div>
            
            <div className="card-right">
                <div className="score-box">
                    <small>Tu Ponderación</small>
                    {/* Si el puntaje es 0, mostramos guiones para no confundir */}
                    <span className="big-score">
                        {data.miPuntaje > 0 ? data.miPuntaje : "--"}
                    </span>
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

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
:root { --bg-dark: #09090b; --glass: rgba(24, 24, 27, 0.8); --glass-border: rgba(255, 255, 255, 0.1); --primary: #6366F1; --text-main: #F8FAFC; --text-muted: #94A3B8; }
body { margin: 0; background: var(--bg-dark); font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-main); }
.lael-page { min-height: 100vh; padding-bottom: 80px; background: radial-gradient(circle at top, #1e1b4b 0%, #09090b 60%); }
.main-container { max-width: 900px; margin: 0 auto; padding: 20px; }
.hero-title { text-align: center; font-size: 2.5rem; font-weight: 800; margin: 30px 0 10px; }
.gradient-text { background: linear-gradient(135deg, var(--primary), #A855F7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { text-align: center; color: var(--text-muted); font-size: 1rem; margin-bottom: 30px; }
.glass-panel { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 20px; margin-bottom: 30px; backdrop-filter: blur(10px); }
.inputs-header h3 { margin: 0 0 10px 0; color: white; font-size: 1rem; opacity: 0.8; }
.inputs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 10px; }
.modern-input-group label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); display: block; text-align: center; margin-bottom: 5px; }
.modern-input-group input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 8px; padding: 10px; color: white; text-align: center; font-weight: 700; font-size: 1.1rem; }
.modern-input-group.highlight input { border-color: var(--primary); background: rgba(99, 102, 241, 0.15); }
.big-search-input { width: 100%; padding: 18px; border-radius: 12px; background: #1e1b4b; border: 2px solid var(--primary); color: white; font-size: 1.2rem; box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
.career-card { background: rgba(30, 41, 59, 0.6); border: 1px solid var(--glass-border); border-radius: 16px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; transition: 0.2s; }
.career-card:hover { transform: translateY(-3px); border-color: var(--primary); background: rgba(30, 41, 59, 0.9); }
.uni-name { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; display: block; }
.career-name { margin: 0 0 10px; font-size: 1.2rem; color: white; }
.tags { display: flex; gap: 10px; flex-wrap: wrap; }
.tag-sede { background: rgba(255,255,255,0.1); color: #cbd5e1; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; }
.tag-price { background: rgba(16, 185, 129, 0.1); color: #34d399; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; font-weight: 700; }
.big-score { font-size: 2rem; font-weight: 800; color: var(--primary); }
.no-results { text-align: center; color: var(--text-muted); padding: 30px; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media(max-width: 600px) { .career-card { flex-direction: column; align-items: flex-start; gap: 15px; } .card-right { width: 100%; text-align: left; border-top: 1px solid var(--glass-border); padding-top: 10px; } .mobile-hide { display: none; } }
`;