import { useState, useMemo } from "react";

/* --- LÓGICA DE CÁLCULO PAES INTEGRADA --- */

const MIN_PUNTAJE = 100;
const MAX_PUNTAJE = 1000;
const MIN_PROM_OBLIGATORIAS = 458; // Regla: (CL + M1)/2 >= 458

const isValidScore = (n) => {
  if (typeof n !== "number" || isNaN(n)) return false;
  return (n >= MIN_PUNTAJE && n <= MAX_PUNTAJE) || n === 0;
};

const round2 = (n) => Math.round(n * 100) / 100;

// 1. Verifica si el estudiante cumple el requisito mínimo del DEMRE.
function esAdmisible({ CL, M1 }) {
  if (!isValidScore(CL) || !isValidScore(M1)) return false;
  if (CL === 0 || M1 === 0) return false; 
  
  const promedio = (CL + M1) / 2;
  return promedio >= MIN_PROM_OBLIGATORIAS;
}

// 2. Calcula el Puntaje Ponderado Postulación (PPP).
function calcularPPP(pond, puntajes) {
  const { CL = 0, M1 = 0, M2 = 0, CIEN = 0, HIS = 0, NEM = 0, RANK = 0 } = puntajes;

  // Normaliza ponderación: si viene "20", lo transforma a "0.2"
  const p = (val) => {
    const v = Number(val || 0);
    return v > 1 ? v / 100 : v;
  };

  // Lógica de MEJOR ELECTIVA: si la carrera pide CIEN o HIS (o ambas), toma la mejor nota del alumno.
  let scoreElectiva = 0;
  
  if (p(pond.CIEN) > 0 || p(pond.HIS) > 0) {
    scoreElectiva = Math.max(isValidScore(CIEN) ? CIEN : 0, isValidScore(HIS) ? HIS : 0);
  }

  // CÁLCULO FINAL: Asume que la ponderación usada para la electiva es la mayor entre CIEN e HIS.
  const puntajeFinal = 
    (p(pond.NEM) * NEM) +
    (p(pond.RANK) * RANK) +
    (p(pond.CL) * CL) +
    (p(pond.M1) * M1) +
    (p(pond.M2) * (isValidScore(M2) ? M2 : 0)) +
    (Math.max(p(pond.CIEN), p(pond.HIS)) * scoreElectiva);

  return round2(puntajeFinal);
}

// 3. Etiqueta el "semáforo" de probabilidad.
function etiquetaChance(ppp, corte) {
  if (!ppp || !corte) return { text: "Cálculo pendiente", color: "gray", icon: "⚪️" };

  const diff = ppp - corte;

  if (diff >= 40) return { text: "ASEGURADO", color: "emerald", icon: "🚀" };
  if (diff >= 15) return { text: "MUY PROBABLE", color: "green", icon: "✅" };
  if (diff >= 0)  return { text: "COMPETITIVO", color: "blue", icon: "🔹" };
  if (diff >= -15) return { text: "AJUSTADO", color: "yellow", icon: "⚠️" };
  if (diff >= -40) return { text: "RIESGOSO", color: "orange", icon: "🔸" };
  return { text: "MUY DIFÍCIL", color: "red", icon: "🔻" };
}

/* --- COMPONENTE PLACEHOLDER (Para evitar error de importación) --- */
const SEOHead = () => null; 

/* --- MAPEO DE COLORES PARA LA LÓGICA --- */
const colorMap = {
    emerald: "#10b981", green: "#3b82f6", blue: "#3b82f6", 
    yellow: "#f59e0b", orange: "#f97316", red: "#ef4444", gray: "#94a3b8"
};
const colorMapBg = {
    emerald: "rgba(16,185,129,0.15)", green: "rgba(59,130,246,0.15)", blue: "rgba(59,130,246,0.15)", 
    yellow: "rgba(245,158,11,0.15)", orange: "rgba(249,115,22,0.15)", red: "rgba(239,68,68,0.1)", gray: "rgba(148,163,184,0.1)"
};

/* --- COMPONENTE PRINCIPAL --- */
export default function SimuladorPonderacion() {
  // 1. Estado de Puntajes del Alumno (similares a los del formulario anterior)
  const [scores, setScores] = useState({
    nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0
  });

  // 2. Estado de Ponderaciones de la Carrera (ingresadas por el usuario, en %)
  const [ponderations, setPonderations] = useState({
    nem: 20, rank: 20, cl: 30, m1: 30, m2: 0, cien: 0, hist: 0 // Ejemplo: Ingeniería U. Chile
  });
  
  // 3. Estado del Puntaje de Corte de Referencia
  const [corteTarget, setCorteTarget] = useState(700);
  
  // 4. Input para el nombre de la carrera (solo estético)
  const [careerName, setCareerName] = useState("Ingeniería Civil U. de Chile");
  const [uniName, setUniName] = useState("Universidad de Chile");


  // Manejadores de Inputs
  const handleScore = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000;
    if (val < 0) val = 0;
    setScores({ ...scores, [e.target.name]: val });
  };
  
  const handlePonderation = (e) => {
    let val = Number(e.target.value);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    setPonderations({ ...ponderations, [e.target.name]: val });
  };
  
  const handleCorte = (e) => {
    let val = Number(e.target.value);
    if (val > 1000) val = 1000;
    if (val < 0) val = 0;
    setCorteTarget(val);
  };

  // 🧠 MOTOR DE CÁLCULO
  const calculationResult = useMemo(() => {
    // Mapeo de keys para la lógica
    const studentScores = {
      NEM: scores.nem, RANK: scores.ranking, CL: scores.cl, 
      M1: scores.m1, M2: scores.m2, CIEN: scores.cien, HIS: scores.hist 
    };
    
    const careerPond = {
        NEM: ponderations.nem, RANK: ponderations.rank, CL: ponderations.cl, 
        M1: ponderations.m1, M2: ponderations.m2, CIEN: ponderations.cien, HIS: ponderations.hist
    };

    // 1. Verificar admisibilidad (Paso DEMRE)
    const isAdmissible = esAdmisible(studentScores);
    if (!isAdmissible) {
        return { 
            finalScore: 0, 
            diff: 0, 
            status: { label: "NO ADMISIBLE (Promedio < 458)", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "⛔" },
            admissible: false
        };
    }
    
    // 2. Calcular Puntaje Ponderado Postulación (PPP)
    const ppp = calcularPPP(careerPond, studentScores);
    
    // 3. Etiquetar chance vs. Corte Objetivo
    const chance = etiquetaChance(ppp, corteTarget);

    return {
        finalScore: Math.round(ppp),
        diff: Math.round(ppp - corteTarget),
        status: { 
            label: chance.text, 
            color: colorMap[chance.color], 
            bg: colorMapBg[chance.color], 
            icon: chance.icon 
        },
        admissible: true
    };
  }, [scores, ponderations, corteTarget]);
  
  // Suma total de ponderaciones
  const totalPonderations = Object.values(ponderations).reduce((sum, p) => sum + p, 0);


  return (
    <div className="sim-page">
      <SEOHead 
        title="Calculadora de Ponderación PAES" 
        description="Calcula tu puntaje ponderado con cualquier perfil de carrera y puntaje de corte."
      />
      <style>{css}</style>

      <div className="sim-container">
        
        {/* HEADER */}
        <header className="sim-header">
          <h1>Calculadora de Ponderación por Perfil</h1>
          <p>Introduce tus puntajes y el perfil de ponderación de la carrera que te interesa para proyectar tu postulación.</p>
        </header>
        
        {/* DASHBOARD DE PUNTAJES DEL ALUMNO */}
        <h2 className="section-title">1. Tus Puntajes PAES</h2>
        <div className="dashboard-panel">
          <div className="inputs-scroll">
            {[
              { k: 'nem', l: 'NEM' }, { k: 'ranking', l: 'RANK' }, 
              { k: 'cl', l: 'LENGUAJE' }, { k: 'm1', l: 'MATE 1 (M1)' }, 
              { k: 'm2', l: 'MATE 2 (M2)' }, { k: 'cien', l: 'CIENCIAS' }, 
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
                />
              </div>
            ))}
          </div>
        </div>

        {/* PERFIL DE PONDERACIÓN DE CARRERA */}
        <h2 className="section-title mt-10">2. Perfil de Ponderación y Corte Objetivo</h2>
        
        {/* Datos de la Carrera (Editable) */}
        <div className="dashboard-panel mb-5">
            <div className="inputs-scroll !grid-cols-2 md:!grid-cols-4 gap-4">
                <div className="input-group col-span-2 md:col-span-2">
                    <label>Universidad / Institución</label>
                    <input type="text" value={uniName} onChange={(e) => setUniName(e.target.value)} />
                </div>
                 <div className="input-group col-span-2 md:col-span-2">
                    <label>Nombre de la Carrera</label>
                    <input type="text" value={careerName} onChange={(e) => setCareerName(e.target.value)} />
                </div>
            </div>
            <div className="input-group mt-4">
                <label>Puntaje de Corte Referencia (Ej: 700)</label>
                <input 
                  type="number" 
                  value={corteTarget} 
                  onChange={handleCorte} 
                  placeholder="Puntaje de Corte" 
                  className="!text-3xl !py-4"
                />
            </div>
        </div>


        {/* PONDERACIONES */}
        <div className="dashboard-panel">
          <p className="text-sm text-yellow-400 mb-3">
              *Ingresa los porcentajes de ponderación (ej: 20 para 20%). Deben sumar 100%.
          </p>
          <div className="inputs-scroll">
            {[
              { k: 'nem', l: 'NEM (%)' }, { k: 'rank', l: 'RANK (%)' }, 
              { k: 'cl', l: 'LENGUAJE (%)' }, { k: 'm1', l: 'MATE 1 (%)' }, 
              { k: 'm2', l: 'MATE 2 (%)' }, { k: 'cien', l: 'CIENCIAS (%)' }, 
              { k: 'hist', l: 'HISTORIA (%)' }
            ].map((field) => (
              <div key={field.k} className="input-group">
                <label>{field.l}</label>
                <input 
                  type="number" 
                  name={field.k} 
                  value={ponderations[field.k]} 
                  onChange={handlePonderation}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-5 text-right font-bold text-sm">
            <span className={totalPonderations === 100 ? 'text-green-500' : 'text-red-500'}>
              Suma Total de Ponderaciones: {totalPonderations}% {totalPonderations !== 100 && "(¡Ajustar!)"}
            </span>
          </div>
        </div>


        {/* RESULTADO ÚNICO */}
        <h2 className="section-title mt-10">3. Resultado del Cálculo</h2>
        <div className="result-card-container">
            <ResultCard 
                result={calculationResult} 
                corte={corteTarget}
                career={careerName}
                uni={uniName}
            />
        </div>
        
        {/* Leyenda Electiva */}
        <div className="mt-10 p-4 border border-blue-900 bg-blue-900/20 rounded-xl text-sm text-blue-200 mx-auto max-w-lg">
            <strong>Nota sobre Electiva (CIENCIAS/HISTORIA):</strong> La calculadora utiliza **automáticamente tu mejor puntaje** entre CIENCIAS o HISTORIA, si la carrera pondera al menos una de ellas.
        </div>
      </div>
    </div>
  );
}

/* --- COMPONENTE DE TARJETA DE RESULTADO ÚNICO --- */
const ResultCard = ({ result, corte, career, uni }) => {
    const { finalScore, diff, status, admissible } = result;

    const baseStyle = { 
        borderColor: status.color, 
        borderLeft: `4px solid ${status.color}`
    };

    return (
        <div className="sim-card-single" style={baseStyle}>
            <div className="card-left">
                <div className="uni-badge">{uni}</div>
                <h3 className="career-name text-2xl">{career}</h3>
                <div className="text-sm text-gray-400 mt-2">
                    Puntaje de Corte de Referencia: <strong className="text-white">{corte}</strong>
                </div>
                
                {!admissible && (
                    <div className="mt-4 p-3 bg-red-900/50 rounded-lg text-red-300 font-bold flex items-center gap-2">
                        {status.icon} NO ADMISIBLE: No cumples el mínimo DEMRE (Promedio Ponderado Lenguaje + M1 debe ser 458 o más).
                    </div>
                )}
            </div>

            <div className="card-right-single">
                <div className="status-badge" style={{ background: status.bg, color: status.color }}>
                    {status.icon} {status.label}
                </div>
                
                <div className="score-display">
                    <span className="my-score" style={{ color: status.color }}>
                        {finalScore}
                    </span>
                    <span className="label-score">TU PUNTAJE PONDERADO</span>
                </div>

                <div className="diff-info" style={{ color: diff >= 0 ? colorMap.emerald : colorMap.red }}>
                    Diferencia con el Corte: 
                    <strong className="ml-1">
                        {diff > 0 ? `+${diff}` : diff} puntos
                    </strong>
                </div>

                <div className="cut-info-single">
                    <div className="cut-bar-bg">
                        <div 
                          className="cut-bar-fill" 
                          style={{ 
                            width: `${Math.min((finalScore / 1000) * 100, 100)}%`,
                            background: status.color
                          }}
                        ></div>
                        <div 
                            className="cut-line" 
                            style={{ left: `${(corte / 1000) * 100}%` }}
                            title={`Corte Objetivo: ${corte}`}
                        ></div>
                    </div>
                    <div className="cut-text">
                        <span className="text-left">0</span>
                        <span className="text-right">1000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


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
.sim-header h1 { font-size: 2.5rem; font-weight: 800; margin: 0 0 10px; letter-spacing: -1px; }
.sim-header p { color: var(--muted); font-size: 1.1rem; }

.section-title { font-size: 1.5rem; font-weight: 700; color: var(--accent); margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }

/* DASHBOARD INPUTS (Mismo estilo para Puntajes y Ponderaciones) */
.dashboard-panel {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 20px; padding: 20px;
  box-shadow: 0 10px 30px -5px rgba(0,0,0,0.5);
}
.inputs-scroll {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); 
  gap: 15px;
}
@media (max-width: 700px) { .inputs-scroll { grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); } }


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
.input-group input[type="text"] { text-align: left; padding: 12px; font-size: 1rem; font-weight: normal; }


/* RESULTADO ÚNICO */
.result-card-container { display: flex; justify-content: center; }

.sim-card-single {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 16px; padding: 30px; width: 100%; max-width: 600px;
  display: grid; grid-template-columns: 1fr 240px; gap: 30px;
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.2);
  border-left: 4px solid transparent; 
}
@media (max-width: 700px) { .sim-card-single { grid-template-columns: 1fr; } }

.uni-badge { 
  font-size: 0.8rem; font-weight: 700; color: var(--muted); text-transform: uppercase; 
  margin-bottom: 5px; 
}
.career-name { font-weight: 800; margin: 0; line-height: 1.2; }


.card-right-single { 
  display: flex; flex-direction: column; justify-content: center; 
  background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;
}

.status-badge {
  align-self: flex-end; font-size: 0.7rem; font-weight: 800; 
  padding: 6px 10px; border-radius: 8px; text-transform: uppercase; margin-bottom: 15px;
}

.score-display { text-align: center; margin-bottom: 15px; }
.my-score { font-size: 2.8rem; font-weight: 900; line-height: 1; display: block; }
.label-score { font-size: 0.7rem; color: var(--muted); font-weight: 700; letter-spacing: 1px; }

.diff-info { text-align: center; font-size: 0.9rem; margin-bottom: 20px; }

.cut-info-single { margin-top: 10px; }
.cut-bar-bg { 
  height: 8px; background: #333; border-radius: 4px; position: relative; margin-bottom: 8px;
}
.cut-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease-out; }
.cut-line { 
  position: absolute; top: -6px; width: 3px; height: 20px; 
  background: #fff; box-shadow: 0 0 10px white; z-index: 2; border-radius: 3px;
}
.cut-text { font-size: 0.75rem; color: var(--muted); display: flex; justify-content: space-between; padding: 0 5px; }
`;