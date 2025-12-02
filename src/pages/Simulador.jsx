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

  if (diff >= 40) return { text: "EXCELENTE (Asegurado)", color: "emerald", icon: "🚀" };
  if (diff >= 15) return { text: "MUY PROBABLE (Buena Opción)", color: "green", icon: "✅" };
  if (diff >= 0)  return { text: "COMPETITIVO (En la Lucha)", color: "blue", icon: "🔹" };
  if (diff >= -15) return { text: "AJUSTADO (Cerca del Corte)", color: "yellow", icon: "⚠️" };
  if (diff >= -40) return { text: "RIESGOSO (Difícil)", color: "orange", icon: "🔸" };
  return { text: "MUY DIFÍCIL (Lejano)", color: "red", icon: "🔻" };
}

/* --- COMPONENTE PLACEHOLDER (Para evitar error de importación) --- */
const SEOHead = () => null; 

/* --- MAPEO DE COLORES PARA LA LÓGICA --- */
const colorMap = {
    emerald: "#34D399", green: "#22C55E", blue: "#3B82F6", 
    yellow: "#FBBF24", orange: "#F97316", red: "#EF4444", gray: "#9CA3AF"
};
const colorMapBg = {
    emerald: "rgba(52,211,153,0.15)", green: "rgba(34,197,94,0.15)", blue: "rgba(59,130,246,0.15)", 
    yellow: "rgba(251,191,36,0.15)", orange: "rgba(249,115,22,0.15)", red: "rgba(239,68,68,0.15)", gray: "rgba(156,163,175,0.1)"
};

/* --- COMPONENTE PRINCIPAL --- */
export default function SimuladorPonderacion() {
  // 1. Estado de Puntajes del Alumno 
  const [scores, setScores] = useState({
    nem: 650, ranking: 650, cl: 700, m1: 700, m2: 0, cien: 600, hist: 0
  });

  // 2. Estado de Ponderaciones de la Carrera (ingresadas por el usuario, en %)
  const [ponderations, setPonderations] = useState({
    nem: 20, rank: 20, cl: 30, m1: 30, m2: 0, cien: 0, hist: 0 
  });
  
  // 3. Estado del Puntaje de Corte de Referencia
  const [corteTarget, setCorteTarget] = useState(700);
  
  // 4. Input para el nombre de la carrera (solo estético)
  const [careerName, setCareerName] = useState("Ingeniería Civil");
  const [uniName, setUniName] = useState("Universidad Ejemplo");


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
            status: { label: "NO ADMISIBLE (Promedio < 458)", color: "#EF4444", bg: "rgba(239,68,68,0.2)", icon: "⛔" },
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
          <h1>Calculadora de Ponderación por Perfil PAES</h1>
          <p className="subtitle">Proyecta tu postulación: Ingresa tus puntajes, el perfil de ponderación de la carrera y el corte de referencia.</p>
        </header>
        
        {/* DASHBOARD DE PUNTAJES DEL ALUMNO */}
        <SectionTitle number="1" title="Tus Puntajes PAES Obtenidos"/>
        <div className="dashboard-panel">
          <div className="inputs-scroll">
            {[
              { k: 'nem', l: 'NEM' }, { k: 'ranking', l: 'RANKING' }, 
              { k: 'cl', l: 'LENGUAJE' }, { k: 'm1', l: 'MATE 1 (M1)' }, 
              { k: 'm2', l: 'MATE 2 (M2)' }, { k: 'cien', l: 'CIENCIAS' }, 
              { k: 'hist', l: 'HISTORIA' }
            ].map((field) => (
              <InputGroup 
                key={field.k} 
                k={field.k} 
                label={field.l} 
                value={scores[field.k]} 
                onChange={handleScore} 
                max={1000}
                placeholder="650"
                isScore={true}
              />
            ))}
          </div>
        </div>

        {/* PERFIL DE PONDERACIÓN DE CARRERA */}
        <SectionTitle number="2" title="Perfil de Ponderación y Corte Objetivo"/>
        
        {/* Datos de la Carrera (Editable) */}
        <div className="dashboard-panel">
            <div className="metadata-grid">
                <div className="input-group col-span-2 md:col-span-2">
                    <label>Universidad / Institución</label>
                    <input type="text" value={uniName} onChange={(e) => setUniName(e.target.value)} />
                </div>
                 <div className="input-group col-span-2 md:col-span-2">
                    <label>Nombre de la Carrera</label>
                    <input type="text" value={careerName} onChange={(e) => setCareerName(e.target.value)} />
                </div>
            </div>
            
            <div className="input-group mt-6">
                <label className="text-xl font-bold text-gray-300">Puntaje de Corte Referencia (Ej: 700)</label>
                <input 
                  type="number" 
                  value={corteTarget} 
                  onChange={handleCorte} 
                  placeholder="700" 
                  className="corte-input"
                />
            </div>
            
            <hr className="divider" />
            
            <p className="description-text">
                *Ingresa los **porcentajes de ponderación** (ej: 20 para 20%).
            </p>
            <div className="inputs-scroll mt-4">
              {[
                { k: 'nem', l: 'NEM (%)' }, { k: 'rank', l: 'RANK (%)' }, 
                { k: 'cl', l: 'LENGUAJE (%)' }, { k: 'm1', l: 'MATE 1 (%)' }, 
                { k: 'm2', l: 'MATE 2 (%)' }, { k: 'cien', l: 'CIENCIAS (%)' }, 
                { k: 'hist', l: 'HISTORIA (%)' }
              ].map((field) => (
                <InputGroup 
                  key={field.k} 
                  k={field.k} 
                  label={field.l} 
                  value={ponderations[field.k]} 
                  onChange={handlePonderation}
                  max={100}
                  placeholder="20"
                  isScore={false}
                />
              ))}
            </div>
            
            <div className="mt-5 text-right font-bold text-sm">
                <div className={`total-badge ${totalPonderations === 100 ? 'bg-green-600' : 'bg-red-600'}`}>
                    Total: {totalPonderations}% {totalPonderations !== 100 && "(¡Debe sumar 100!)"}
                </div>
            </div>
        </div>


        {/* RESULTADO ÚNICO */}
        <SectionTitle number="3" title="Resultado de tu Postulación Proyectada"/>
        <div className="result-card-container">
            <ResultCard 
                result={calculationResult} 
                corte={corteTarget}
                career={careerName}
                uni={uniName}
            />
        </div>
        
        {/* Leyenda Electiva */}
        <div className="info-box">
            <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <p><strong>Nota sobre Electiva (CIENCIAS/HISTORIA):</strong> La calculadora utiliza **automáticamente tu mejor puntaje** entre CIENCIAS o HISTORIA, si la carrera pondera al menos una de ellas, tal como permite el sistema de admisión.</p>
        </div>
      </div>
    </div>
  );
}

// Subcomponente Título de Sección
const SectionTitle = ({ number, title }) => (
    <h2 className="section-title-wrapper">
        <span className="section-number">{number}</span>
        {title}
    </h2>
);

// Subcomponente Grupo de Input
const InputGroup = ({ k, label, value, onChange, max, placeholder, isScore }) => (
    <div className="input-group">
        <label>{label}</label>
        <input 
            type="number" 
            name={k} 
            value={value} 
            onChange={onChange}
            placeholder={placeholder}
            max={max}
            min={0}
            className={isScore ? 'score-input' : 'pond-input'}
        />
    </div>
);


/* --- COMPONENTE DE TARJETA DE RESULTADO ÚNICO --- */
const ResultCard = ({ result, corte, career, uni }) => {
    const { finalScore, diff, status, admissible } = result;

    const baseStyle = { 
        borderColor: status.color, 
        boxShadow: `0 10px 40px ${status.color}33`,
    };

    return (
        <div className="sim-card-single" style={baseStyle}>
            <div className="card-left">
                <div className="uni-badge">{uni}</div>
                <h3 className="career-name text-2xl">{career}</h3>
                
                <div className="current-data">
                    <p>Puntaje de Corte Referencia:</p>
                    <strong className="text-white text-3xl">{corte}</strong>
                </div>

                {!admissible && (
                    <div className="admissible-alert">
                        <span className="font-bold">{status.icon} NO ADMISIBLE:</span> No cumples el mínimo DEMRE (Promedio Ponderado Lenguaje + M1 debe ser 458 o más).
                    </div>
                )}
            </div>

            <div className="card-right-single" style={{ borderLeft: `1px solid ${status.color}66` }}>
                <div className="status-badge" style={{ background: status.bg, color: status.color }}>
                    {status.icon} {status.label}
                </div>
                
                <div className="score-display">
                    <span className="my-score" style={{ color: status.color }}>
                        {finalScore}
                    </span>
                    <span className="label-score">TU PUNTAJE PONDERADO FINAL</span>
                </div>

                <div className="diff-info">
                    DIFERENCIA CON EL CORTE: 
                    <strong className="ml-1" style={{ color: diff >= 0 ? colorMap.emerald : colorMap.red }}>
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
                        <span className="text-left">100</span>
                        <span className="text-right">1000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* ================= CSS REDISEÑO (Sleek Dark Mode) ================= */
const css = `
:root {
  --bg: #0F172A; /* Slate 900 */
  --panel: #1E293B; /* Slate 800 */
  --border: #334155; /* Slate 700 */
  --text: #F1F5F9; /* Slate 100 */
  --muted: #94A3B8; /* Slate 400 */
  --accent: #6366F1; /* Indigo 500 */
  --accent-light: #A5B4FC; /* Indigo 300 */
}

.sim-page {
  background: var(--bg); color: var(--text); min-height: 100vh;
  font-family: 'Inter', sans-serif; padding-bottom: 100px;
}
.sim-container { max-width: 900px; margin: 0 auto; padding: 0 20px; }

/* HEADER */
.sim-header { text-align: center; padding: 60px 0 40px; }
.sim-header h1 { 
    font-size: clamp(1.8rem, 5vw, 2.8rem); 
    font-weight: 900; 
    margin: 0 0 10px; 
    letter-spacing: -1px; 
    color: var(--accent-light);
}
.subtitle { color: var(--muted); font-size: 1rem; }

/* SECTION TITLES */
.section-title-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text);
    margin: 40px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border);
}
.section-number {
    background: var(--accent);
    color: white;
    font-size: 1rem;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 900;
    box-shadow: 0 0 15px var(--accent)55;
}

/* DASHBOARD INPUTS */
.dashboard-panel {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 12px; padding: 25px;
  box-shadow: 0 10px 30px -5px rgba(0,0,0,0.4);
}
.inputs-scroll {
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); 
  gap: 15px;
}
.metadata-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}
@media (max-width: 600px) { .metadata-grid { grid-template-columns: 1fr; } }


.input-group label {
  display: block; font-size: 0.75rem; color: var(--muted); font-weight: 600;
  margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
}
.input-group input {
  width: 100%; 
  background: #00000033; /* Slightly transparent black */
  border: 1px solid var(--border);
  color: #fff; 
  padding: 10px 5px; 
  text-align: center; 
  border-radius: 8px;
  font-size: 1.1rem; 
  font-weight: 700; 
  transition: all 0.3s ease;
}
.input-group input:focus {
  border-color: var(--accent); 
  box-shadow: 0 0 0 4px var(--accent)33;
  background: #000;
}
.input-group input[type="text"] { 
    text-align: left; 
    padding: 10px 15px; 
    font-size: 1rem; 
    font-weight: normal; 
}
.corte-input {
    font-size: 2.2rem !important; 
    padding: 15px 5px !important;
    color: #FBBF24 !important; /* Amber */
}

.divider {
    border: none;
    height: 1px;
    background: var(--border);
    margin: 25px 0;
}
.description-text {
    font-size: 0.9rem;
    color: var(--muted);
    margin-bottom: 15px;
    padding-top: 5px;
    border-top: 1px solid var(--border);
}
.total-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 6px;
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
    transition: background 0.3s;
}

/* RESULTADO ÚNICO CARD */
.result-card-container { display: flex; justify-content: center; margin-bottom: 40px;}

.sim-card-single {
  background: var(--panel); 
  border: 2px solid var(--border);
  border-radius: 16px; 
  padding: 30px; 
  width: 100%; 
  max-width: 800px;
  display: grid; 
  grid-template-columns: 1.5fr 1fr; 
  gap: 30px;
  transition: all 0.3s;
  overflow: hidden;
}
@media (max-width: 700px) { .sim-card-single { grid-template-columns: 1fr; } }

.card-left {
    padding-right: 20px;
}
.uni-badge { 
  font-size: 0.8rem; font-weight: 700; color: var(--muted); text-transform: uppercase; 
  margin-bottom: 5px; 
}
.career-name { font-weight: 900; margin: 0; line-height: 1.2; color: var(--accent-light); }

.current-data {
    margin-top: 20px;
    padding: 15px;
    background: #00000033;
    border-radius: 8px;
    border-left: 3px solid #FBBF24;
}
.current-data p {
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 5px;
}

.admissible-alert {
    margin-top: 20px;
    padding: 15px;
    background: rgba(239,68,68,0.2);
    border-radius: 8px;
    border: 1px solid #EF4444;
    color: #FCA5A5;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
}

.card-right-single { 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  background: rgba(0,0,0,0.3); 
  border-radius: 12px; 
  padding: 20px;
  position: relative;
}

.status-badge {
  align-self: flex-start;
  font-size: 0.8rem; font-weight: 800; 
  padding: 8px 12px; border-radius: 8px; text-transform: uppercase; margin-bottom: 15px;
}

.score-display { text-align: center; margin-bottom: 20px; }
.my-score { 
    font-size: 3.5rem; 
    font-weight: 900; 
    line-height: 1; 
    display: block; 
    text-shadow: 0 0 10px currentColor;
}
.label-score { font-size: 0.7rem; color: var(--muted); font-weight: 700; letter-spacing: 1px; }

.diff-info { text-align: center; font-size: 1rem; margin-bottom: 25px; font-weight: 500; }

/* PROGRESS BAR */
.cut-info-single { padding: 0 5px; }
.cut-bar-bg { 
  height: 10px; background: #334155; border-radius: 5px; position: relative; margin-bottom: 8px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
}
.cut-bar-fill { height: 100%; border-radius: 5px; transition: width 0.6s ease-out; }
.cut-line { 
  position: absolute; top: -8px; width: 4px; height: 26px; 
  background: #FFF; border-radius: 4px; z-index: 2;
  box-shadow: 0 0 15px white;
}
.cut-text { font-size: 0.75rem; color: var(--muted); display: flex; justify-content: space-between; }

/* INFO BOX */
.info-box {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 12px;
    padding: 15px;
    max-width: 800px;
    margin: 20px auto;
    display: flex;
    gap: 15px;
    align-items: flex-start;
    color: #93C5FD;
}
.info-icon {
    width: 20px;
    min-width: 20px;
    height: 20px;
    color: #60A5FA;
}
`;