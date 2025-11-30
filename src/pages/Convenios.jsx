// src/pages/Convenios.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LSCH_GROUP_PLANS,
  LSCH_ENROLLMENT_FEE,
  CHURCH_CONVENIO,
  clp as clpLS,
} from "../data/lsch.js";
import {
  ENROLLMENT_FEE as HS_ENROLLMENT_FEE,
  clp as clpHS,
} from "../data/homeschool.js";

// --- HELPERS ---
const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const WAPP = "56964626568";

/* --- SEO COMPONENT --- */
const SEOHead = () => {
  useEffect(() => { document.title = "Convenios & Partners | Instituto Lael"; }, []);
  return null;
};

/* --- COMPONENTE PRINCIPAL --- */
export default function Convenios() {
  const [activeTab, setActiveTab] = useState("iglesias");
  const tabRef = useRef(null);

  // --- LÓGICA DE CÁLCULO ---
  const publicLSChMonthly = LSCH_GROUP_PLANS?.find((p) => p.id === "g-month")?.monthly ?? 17990;
  const churchMonthly = CHURCH_CONVENIO?.monthlyFlat ?? 11990;

  // ESTADOS IGLESIA
  const [ig, setIg] = useState({ personas: 10, meses: 3 });
  const igTotals = useMemo(() => {
    const p = Math.max(1, ig.personas);
    const m = Math.max(1, ig.meses);
    const publico = (publicLSChMonthly * m + LSCH_ENROLLMENT_FEE) * p;
    const convenio = (churchMonthly * m + LSCH_ENROLLMENT_FEE) * p;
    return { publico, convenio, ahorro: publico - convenio };
  }, [ig, publicLSChMonthly, churchMonthly]);

  // ESTADOS COLEGIO
  const [hs, setHs] = useState({ base: 80000, personas: 1 });
  const hsTotals = useMemo(() => {
    const p = Math.max(1, hs.personas);
    const pub = (hs.base + HS_ENROLLMENT_FEE) * p;
    const con = (Math.round(hs.base * 0.9) + Math.round(HS_ENROLLMENT_FEE * 0.5)) * p;
    return { publico: pub, convenio: con, ahorro: pub - con };
  }, [hs]);

  // WHATSAPP LINKS
  const waLinks = {
    iglesia: `https://wa.me/${WAPP}?text=${encodeURIComponent(`Hola, vengo por el Convenio Iglesias. Somos un grupo de ${ig.personas} personas.`)}`,
    colegio: `https://wa.me/${WAPP}?text=${encodeURIComponent(`Hola, soy de un Colegio/Homeschool y quiero activar el beneficio para ${hs.personas} alumnos.`)}`,
    empresa: `https://wa.me/${WAPP}?text=${encodeURIComponent("Hola, quiero cotizar un convenio corporativo para mi empresa.")}`
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Scroll suave solo en móvil si es necesario
    if(window.innerWidth < 800) {
        tabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="partners-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO --- */}
      <header className="hero-partners">
        <div className="container">
            <span className="pill-badge">Comunidad Lael</span>
            <h1>Tu red te da <span className="highlight">beneficios.</span></h1>
            <p className="lead">
                Si perteneces a una Iglesia, Colegio o Empresa partner, tienes acceso inmediato a precios preferenciales. 
                <br/><strong>Sin trámites eternos. Activación en 24h.</strong>
            </p>
        </div>
      </header>

      {/* --- TABS DE NAVEGACIÓN --- */}
      <div className="tabs-container" ref={tabRef}>
        <div className="container">
            <div className="tabs-wrapper">
                <button className={`tab-btn ${activeTab === 'iglesias' ? 'active' : ''}`} onClick={() => handleTabChange('iglesias')}>
                    <span className="tab-icon">⛪</span> Iglesias
                </button>
                <button className={`tab-btn ${activeTab === 'colegios' ? 'active' : ''}`} onClick={() => handleTabChange('colegios')}>
                    <span className="tab-icon">🎒</span> Colegios
                </button>
                <button className={`tab-btn ${activeTab === 'empresas' ? 'active' : ''}`} onClick={() => handleTabChange('empresas')}>
                    <span className="tab-icon">🏢</span> Empresas
                </button>
            </div>
        </div>
      </div>

      {/* --- CONTENIDO DINÁMICO --- */}
      <section className="partner-content">
        <div className="container">
            
            {/* VISTA IGLESIAS */}
            {activeTab === 'iglesias' && (
                <div className="partner-card fade-in">
                    <div className="card-header" style={{borderTopColor: '#F59E0B'}}>
                        <div className="header-icon" style={{background: '#F59E0B'}}>⛪</div>
                        <h2>Red de Iglesias & Ministerios</h2>
                        <p>Capacita a tu equipo de inclusión, escuela dominical o voluntarios en LSCh con tarifa plana.</p>
                    </div>
                    
                    <div className="calculator-box">
                        <div className="calc-inputs">
                            <label>
                                <span>Número de Personas</span>
                                <input type="number" min="1" value={ig.personas} onChange={e => setIg({...ig, personas: Number(e.target.value)})} />
                            </label>
                            <label>
                                <span>Meses de Curso</span>
                                <input type="number" min="1" value={ig.meses} onChange={e => setIg({...ig, meses: Number(e.target.value)})} />
                            </label>
                        </div>
                        <div className="calc-results">
                            <div className="res-row">
                                <span>Precio Público</span>
                                <span className="strike">{clp(igTotals.publico)}</span>
                            </div>
                            <div className="res-row highlight">
                                <span>Precio Convenio</span>
                                <strong>{clp(igTotals.convenio)}</strong>
                            </div>
                            <div className="res-savings">
                                ¡Ahorras {clp(igTotals.ahorro)} para tu ministerio!
                            </div>
                        </div>
                    </div>

                    <div className="card-actions">
                        <a href={waLinks.iglesia} target="_blank" rel="noreferrer" className="btn-activate">Activar Convenio Iglesia</a>
                        <p className="note">Validación simple con carta pastoral o RUT de la iglesia.</p>
                    </div>
                </div>
            )}

            {/* VISTA COLEGIOS */}
            {activeTab === 'colegios' && (
                <div className="partner-card fade-in">
                    <div className="card-header" style={{borderTopColor: '#3B82F6'}}>
                        <div className="header-icon" style={{background: '#3B82F6'}}>🎒</div>
                        <h2>Colegios & Homeschool</h2>
                        <p>Apoyo académico y ensayos PAES con descuento exclusivo para comunidades educativas y familias homeschool.</p>
                    </div>

                    <div className="benefits-list">
                        <div className="benefit-item">
                            <span className="check">✓</span> <strong>50% Dscto.</strong> en Matrícula anual.
                        </div>
                        <div className="benefit-item">
                            <span className="check">✓</span> <strong>10% Dscto.</strong> permanente en mensualidad.
                        </div>
                        <div className="benefit-item">
                            <span className="check">✓</span> Acceso a plataforma de ensayos.
                        </div>
                    </div>

                    <div className="calculator-box">
                        <div className="calc-inputs">
                            <label>
                                <span>Valor Mensual Base</span>
                                <input type="number" value={hs.base} onChange={e => setHs({...hs, base: Number(e.target.value)})} />
                            </label>
                            <label>
                                <span>Nº Alumnos</span>
                                <input type="number" min="1" value={hs.personas} onChange={e => setHs({...hs, personas: Number(e.target.value)})} />
                            </label>
                        </div>
                        <div className="calc-results">
                            <div className="res-row">
                                <span>Valor Normal</span>
                                <span className="strike">{clp(hsTotals.publico)}</span>
                            </div>
                            <div className="res-row highlight">
                                <span>Valor Partner</span>
                                <strong>{clp(hsTotals.convenio)}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions">
                        <a href={waLinks.colegio} target="_blank" rel="noreferrer" className="btn-activate">Solicitar Beneficio Escolar</a>
                    </div>
                </div>
            )}

            {/* VISTA EMPRESAS */}
            {activeTab === 'empresas' && (
                <div className="partner-card fade-in">
                    <div className="card-header" style={{borderTopColor: '#10B981'}}>
                        <div className="header-icon" style={{background: '#10B981'}}>🏢</div>
                        <h2>Convenios Corporativos</h2>
                        <p>Beneficios para colaboradores y cargas familiares. Potencia tu plan de bienestar y capacitación.</p>
                    </div>

                    <div className="grid-features">
                        <div className="feat">
                            <strong>Descuento por Planilla</strong>
                            <small>Hasta 20% OFF según volumen.</small>
                        </div>
                        <div className="feat">
                            <strong>Extensible</strong>
                            <small>Válido para hijos y cónyuges.</small>
                        </div>
                        <div className="feat">
                            <strong>Reporte Sence</strong>
                            <small>Gestión de franquicia tributaria.</small>
                        </div>
                    </div>

                    <div className="card-actions">
                        <a href={waLinks.empresa} target="_blank" rel="noreferrer" className="btn-activate">Contactar Ejecutivo Empresas</a>
                        <Link to="/empresas" className="link-secondary">Ver oferta de capacitación corporativa →</Link>
                    </div>
                </div>
            )}

        </div>
      </section>

      {/* --- NUEVO CONVENIO --- */}
      <section className="new-partner-section">
        <div className="container np-box">
            <div className="np-text">
                <h3>¿Tu organización no está en la lista?</h3>
                <p>Gestionar una alianza es gratis y toma 20 minutos. Dale beneficios reales a tu comunidad.</p>
            </div>
            <a href="mailto:contacto@institutolael.cl" className="btn-outline">Proponer Alianza</a>
        </div>
      </section>

    </div>
  );
}

/* ================= CSS (CLEAN & FUNCTIONAL) ================= */
const css = `
:root {
  --bg: #0B1120;
  --card-bg: #151E32;
  --text: #F8FAFC;
  --text-muted: #94A3B8;
  --border: #334155;
  --accent: #F59E0B;
}

.partners-page {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.container { max-width: 900px; margin: 0 auto; padding: 0 20px; }

/* HERO */
.hero-partners {
  text-align: center; padding: 80px 0 60px;
  background: radial-gradient(circle at center, #1e293b 0%, var(--bg) 70%);
}
.pill-badge {
  display: inline-block; background: rgba(255,255,255,0.1); padding: 6px 14px;
  border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-bottom: 20px;
  text-transform: uppercase; letter-spacing: 1px;
}
h1 { font-size: 3rem; margin-bottom: 20px; line-height: 1.1; }
.highlight { color: var(--accent); }
.lead { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

/* TABS */
.tabs-container { margin-bottom: 40px; border-bottom: 1px solid var(--border); }
.tabs-wrapper { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
.tab-btn {
  background: transparent; border: none; color: var(--text-muted); padding: 15px 25px;
  font-size: 1rem; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent;
  transition: .2s; display: flex; align-items: center; gap: 8px;
}
.tab-btn:hover { color: var(--text); }
.tab-btn.active { color: var(--text); border-bottom-color: var(--accent); }
.tab-icon { font-size: 1.2rem; }

/* CARD */
.partner-card {
  background: var(--card-bg); border-radius: 20px; border: 1px solid var(--border);
  overflow: hidden; max-width: 700px; margin: 0 auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.card-header { padding: 40px; text-align: center; border-top: 6px solid transparent; background: rgba(0,0,0,0.2); }
.header-icon { 
    width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 30px; margin: 0 auto 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.card-header h2 { font-size: 2rem; margin-bottom: 10px; }
.card-header p { color: var(--text-muted); }

/* CALCULATOR */
.calculator-box { background: rgba(0,0,0,0.2); padding: 30px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.calc-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
label span { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; font-weight: 700; }
input { 
    width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text);
    padding: 12px; border-radius: 8px; font-size: 1.1rem; text-align: center; font-weight: 700;
}

.calc-results { background: var(--bg); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
.res-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 1rem; }
.strike { text-decoration: line-through; color: var(--text-muted); }
.highlight { color: var(--accent); font-size: 1.2rem; }
.res-savings { text-align: center; margin-top: 15px; font-size: 0.9rem; color: #34D399; font-weight: 700; }

/* ACTIONS */
.card-actions { padding: 40px; text-align: center; }
.btn-activate { 
    display: inline-block; background: var(--text); color: var(--bg); padding: 14px 32px; 
    border-radius: 50px; font-weight: 700; text-decoration: none; transition: .2s;
    box-shadow: 0 5px 20px rgba(255,255,255,0.2);
}
.btn-activate:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,255,255,0.3); }
.note { font-size: 0.85rem; color: var(--text-muted); margin-top: 15px; }
.link-secondary { display: block; margin-top: 20px; color: var(--accent); font-size: 0.9rem; }

/* EMPRESAS GRID */
.grid-features { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; padding: 30px; text-align: center; }
.feat strong { display: block; margin-bottom: 5px; color: var(--text); }
.feat small { color: var(--text-muted); }

/* NEW PARTNER */
.new-partner-section { padding: 80px 0; }
.np-box { 
    display: flex; justify-content: space-between; align-items: center; gap: 30px;
    background: linear-gradient(90deg, #1e293b, #0f172a); border: 1px solid var(--border);
    padding: 40px; border-radius: 20px;
}
@media (max-width: 700px) { .np-box { flex-direction: column; text-align: center; } }
.np-text h3 { margin: 0 0 10px; font-size: 1.5rem; }
.np-text p { margin: 0; color: var(--text-muted); }
.btn-outline { 
    border: 1px solid var(--text); color: var(--text); padding: 12px 24px; 
    border-radius: 50px; text-decoration: none; font-weight: 700; white-space: nowrap;
}
.btn-outline:hover { background: var(--text); color: var(--bg); }

/* ANIMATION */
.fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;