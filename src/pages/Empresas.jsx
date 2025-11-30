// src/pages/Empresas.jsx
// REBRANDING: CORPORATE SOLUTIONS
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SERVICE_LINES,
  calcQuote,
  clp,
  WAPP_INTL,
  UI_OPTIONS,
} from "../data/empresas.js";

// Assets (Ajusta tus rutas si es necesario)
const HeroImg = new URL("../assets/img/lael/office-bg.jpg", import.meta.url).href;
const LogoCorp = new URL("../assets/img/Logos/lael-inst-azul.png", import.meta.url).href;

/* --- SEO COMPONENT --- */
const SEOHead = () => {
  useEffect(() => {
    document.title = "Lael Corporate | Capacitación y Consultoría";
  }, []);
  return null;
};

/* --- MAIN COMPONENT --- */
export default function Empresas() {
  // ESTADOS DEL FORMULARIO
  const [form, setForm] = useState({
    lineId: "ingles",
    headcount: 10,
    durationUnit: "months",
    durationValue: 3,
    sessionsPerWeek: 2,
    hoursPerSession: 1.5,
    modality: "online",
    mixedOnsiteSessions: 0,
    addCert: true,
    addMaterials: true,
    addExecReport: true,
  });

  // CÁLCULO EN TIEMPO REAL
  const q = useMemo(() => calcQuote(form), [form]);

  // HANDLER GENÉRICO
  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  // WHATSAPP LINK CORPORATIVO
  const waLink = useMemo(() => {
    const text = `Hola Lael Corporate.
Solicito propuesta formal basada en esta pre-cotización:

📋 *Programa:* ${q.line.label}
👥 *Participantes:* ${q.headcount}
📅 *Duración:* ${q.durationValue} ${q.durationUnit === 'months' ? 'meses' : 'semanas'}
💻 *Modalidad:* ${form.modality.toUpperCase()}

💰 *Presupuesto Ref:* ${clp(q.total)} + IVA
--------------------------------
¿Podemos agendar una reunión?`;
    return `https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(text)}`;
  }, [q, form]);

  return (
    <div className="corp-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero-corp">
        <div className="hero-overlay"></div>
        <img src={HeroImg} alt="Corporate meeting" className="hero-bg" />
        
        <div className="container hero-content">
            <img src={LogoCorp} alt="Lael Corporate" className="corp-logo" />
            <span className="overline">Soluciones Corporativas</span>
            <h1>
                Potencia el Talento <br/>
                <span className="text-gold">de tu Organización.</span>
            </h1>
            <p className="lead">
                Programas de capacitación en Idiomas, Inclusión y Habilidades Blandas.
                Diseñados para mejorar indicadores de desempeño y clima laboral.
            </p>
            <div className="hero-actions">
                <a href="#cotizador" className="btn-primary">Cotizar Programa</a>
                <a href="#servicios" className="btn-outline">Nuestras Áreas</a>
            </div>
        </div>
      </header>

      {/* --- SERVICIOS --- */}
      <section id="servicios" className="services-section">
        <div className="container">
            <div className="sec-header">
                <h2>Áreas de Especialización</h2>
                <p>Formación técnica y humana para equipos de alto rendimiento.</p>
            </div>
            
            <div className="services-grid">
                {SERVICE_LINES.map(srv => (
                    <div 
                        key={srv.id} 
                        className={`srv-card ${form.lineId === srv.id ? 'active' : ''}`}
                        onClick={() => {
                            handleChange('lineId', srv.id);
                            document.getElementById('cotizador').scrollIntoView({behavior:'smooth'});
                        }}
                    >
                        <div className="srv-icon" style={{color: srv.brandColor}}>●</div>
                        <h3>{srv.label}</h3>
                        <button className="btn-select">Cotizar</button>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- COTIZADOR (DASHBOARD) --- */}
      <section id="cotizador" className="quote-section">
        <div className="container">
            <div className="quote-layout">
                
                {/* PANEL IZQUIERDO: CONFIGURACIÓN */}
                <div className="config-panel">
                    <div className="panel-header">
                        <h3>Configura tu Programa</h3>
                        <p>Ajusta los parámetros para obtener una estimación inmediata.</p>
                    </div>

                    <div className="form-grid">
                        
                        {/* Programa */}
                        <div className="form-group full">
                            <label>Programa de Capacitación</label>
                            <select 
                                value={form.lineId} 
                                onChange={(e) => handleChange('lineId', e.target.value)}
                                className="input-field"
                            >
                                {SERVICE_LINES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                            </select>
                        </div>

                        {/* Participantes */}
                        <div className="form-group">
                            <label>Nº Colaboradores</label>
                            <select 
                                value={form.headcount} 
                                onChange={(e) => handleChange('headcount', Number(e.target.value))}
                                className="input-field"
                            >
                                {UI_OPTIONS.headcountPresets.map(n => <option key={n} value={n}>{n} Personas</option>)}
                            </select>
                        </div>

                        {/* Duración */}
                        <div className="form-group">
                            <label>Duración (Meses)</label>
                            <select 
                                value={form.durationValue} 
                                onChange={(e) => handleChange('durationValue', Number(e.target.value))}
                                className="input-field"
                            >
                                {UI_OPTIONS.months.map(n => <option key={n} value={n}>{n} {n===1?'Mes':'Meses'}</option>)}
                            </select>
                        </div>

                        {/* Modalidad */}
                        <div className="form-group full">
                            <label>Modalidad de Entrega</label>
                            <div className="radio-group">
                                <button 
                                    className={`radio-btn ${form.modality === 'online' ? 'selected' : ''}`}
                                    onClick={() => handleChange('modality', 'online')}
                                >
                                    Online (Síncrono)
                                </button>
                                <button 
                                    className={`radio-btn ${form.modality === 'onsite' ? 'selected' : ''}`}
                                    onClick={() => handleChange('modality', 'onsite')}
                                >
                                    Presencial (In-Company)
                                </button>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="form-group full toggles-row">
                            <label className="checkbox-btn">
                                <input 
                                    type="checkbox" 
                                    checked={form.addCert} 
                                    onChange={(e) => handleChange('addCert', e.target.checked)} 
                                />
                                <span>Certificación Digital</span>
                            </label>
                            <label className="checkbox-btn">
                                <input 
                                    type="checkbox" 
                                    checked={form.addExecReport} 
                                    onChange={(e) => handleChange('addExecReport', e.target.checked)} 
                                />
                                <span>Reporte Ejecutivo</span>
                            </label>
                        </div>

                    </div>
                </div>

                {/* PANEL DERECHO: TICKET / FACTURA */}
                <div className="ticket-panel">
                    <div className="ticket-header">
                        <h4>Resumen de Inversión</h4>
                        <span className="badge-status">Estimación</span>
                    </div>
                    
                    <div className="ticket-body">
                        <div className="ticket-row">
                            <span>Servicio</span>
                            <strong>{q.line.label}</strong>
                        </div>
                        <div className="ticket-row">
                            <span>Alcance</span>
                            <strong>{q.headcount} Colaboradores</strong>
                        </div>
                        <div className="ticket-row">
                            <span>Duración</span>
                            <strong>{q.durationValue} Meses</strong>
                        </div>
                        
                        <div className="divider"></div>
                        
                        {/* Detalle Costos */}
                        <div className="ticket-row small">
                            <span>Valor por persona/mes</span>
                            <span>{clp(q.perPersonPerMonth)}</span>
                        </div>
                        
                        {q.volumeDiscount > 0 && (
                            <div className="ticket-row discount">
                                <span>Desc. Volumen ({(q.volumeDiscount * 100).toFixed(0)}%)</span>
                                <span>Aplicado</span>
                            </div>
                        )}

                        <div className="ticket-total">
                            <span>Total Neto</span>
                            <strong>{clp(q.total)}</strong>
                        </div>
                        <div className="iva-row">
                            <span>+ IVA (19%) = {clp(q.total * 1.19)}</span>
                        </div>
                    </div>

                    <div className="ticket-footer">
                        <a href={waLink} target="_blank" rel="noreferrer" className="btn-quote">
                            Solicitar Propuesta Formal
                        </a>
                        <p className="legal">
                            Valores referenciales no constituyen oferta vinculante. 
                            Sujeto a evaluación de factibilidad técnica.
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* --- TRUST & METHOD --- */}
      <section className="trust-section">
        <div className="container">
            <h3>Estándar Corporativo</h3>
            <div className="trust-grid">
                <div className="trust-item">
                    <span className="ti-num">01</span>
                    <h4>Diagnóstico</h4>
                    <p>Evaluación de nivel inicial y detección de brechas específicas.</p>
                </div>
                <div className="trust-item">
                    <span className="ti-num">02</span>
                    <h4>Ejecución Sence</h4>
                    <p>Gestión de asistencia y libro de clases digital para cumplimiento.</p>
                </div>
                <div className="trust-item">
                    <span className="ti-num">03</span>
                    <h4>Reportería</h4>
                    <p>Informes de avance mensual y dashboard de impacto para RRHH.</p>
                </div>
            </div>
        </div>
      </section>

      <footer className="corp-footer">
        <div className="container">
            <p>© 2025 Instituto Lael SpA · Soluciones Corporativas</p>
            <Link to="/contacto">Contacto Comercial</Link>
        </div>
      </footer>

    </div>
  );
}

/* ================= CSS (CORPORATE DARK MODE) ================= */
const css = `
:root {
  --bg-corp: #0F172A; /* Slate 900 */
  --bg-panel: #1E293B; /* Slate 800 */
  --bg-input: #334155; /* Slate 700 */
  --primary: #3B82F6; /* Blue 500 */
  --primary-dark: #1d4ed8;
  --gold: #D4AF37;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255,255,255,0.1);
  --radius: 8px;
}

.corp-page {
  background-color: var(--bg-corp);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; font-family: inherit; }

/* HERO */
.hero-corp {
  position: relative; padding: 80px 0 100px;
  display: flex; align-items: center; justify-content: center;
  text-align: center; overflow: hidden;
  background-color: #0f172a;
}
.hero-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover; opacity: 0.2; filter: grayscale(100%);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(circle at center, transparent 0%, var(--bg-corp) 90%);
}
.hero-content { position: relative; z-index: 2; max-width: 800px; display: flex; flex-direction: column; align-items: center; }

.corp-logo { height: 60px; margin-bottom: 30px; }
.overline { 
    text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; font-weight: 700; color: var(--gold); 
    border-bottom: 1px solid var(--gold); padding-bottom: 5px; margin-bottom: 20px;
}

.hero-corp h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; }
.text-gold { color: var(--gold); }
.hero-corp .lead { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin-bottom: 40px; }

.hero-actions { display: flex; gap: 20px; justify-content: center; }
.btn-primary { background: var(--primary); color: white; padding: 14px 32px; border-radius: 6px; font-weight: 600; transition: .2s; }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }
.btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 14px 32px; border-radius: 6px; font-weight: 600; }
.btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* SERVICES GRID */
.services-section { padding: 60px 0; background: #0b1120; }
.sec-header { text-align: center; margin-bottom: 50px; }
.sec-header h2 { font-size: 2.2rem; margin-bottom: 10px; }
.sec-header p { color: var(--text-muted); font-size: 1.1rem; }

.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.srv-card {
  background: var(--bg-panel); border: 1px solid var(--border); padding: 30px; border-radius: 12px;
  cursor: pointer; transition: .3s; display: flex; flex-direction: column; align-items: flex-start;
}
.srv-card:hover { border-color: var(--primary); transform: translateY(-5px); }
.srv-card.active { border-color: var(--primary); background: rgba(59,130,246,0.1); box-shadow: 0 0 0 1px var(--primary); }
.srv-icon { font-size: 1.5rem; margin-bottom: 15px; }
.srv-card h3 { font-size: 1.2rem; margin-bottom: 20px; color: var(--text-main); }
.btn-select { 
    margin-top: auto; background: transparent; color: var(--primary); border: 1px solid var(--primary); 
    padding: 8px 16px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; 
}
.srv-card:hover .btn-select { background: var(--primary); color: white; }

/* QUOTE SECTION */
.quote-section { padding: 80px 0; }
.quote-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: start; }
@media (max-width: 900px) { .quote-layout { grid-template-columns: 1fr; } }

.config-panel { background: var(--bg-panel); padding: 40px; border-radius: 16px; border: 1px solid var(--border); }
.panel-header { margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
.panel-header h3 { margin: 0 0 5px; font-size: 1.5rem; }
.panel-header p { margin: 0; color: var(--text-muted); font-size: 0.9rem; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group.full { grid-column: 1 / -1; }

label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.input-field {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border); color: white;
  padding: 12px 16px; border-radius: 8px; font-size: 1rem; transition: .2s; outline: none;
}
.input-field:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(59,130,246,0.2); }

.radio-group { display: flex; gap: 10px; background: var(--bg-input); padding: 4px; border-radius: 8px; }
.radio-btn {
  flex: 1; background: transparent; color: var(--text-muted); padding: 10px; border-radius: 6px; 
  font-size: 0.9rem; font-weight: 500; transition: .2s;
}
.radio-btn.selected { background: var(--primary); color: white; font-weight: 600; }

.toggles-row { display: flex; gap: 20px; margin-top: 10px; }
.checkbox-btn { display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-main); font-size: 0.9rem; font-weight: 500; text-transform: none; }
.checkbox-btn input { width: 18px; height: 18px; accent-color: var(--primary); }

/* TICKET PANEL */
.ticket-panel { background: white; color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); position: sticky; top: 20px; }
.ticket-header { background: #f8fafc; padding: 20px 30px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.ticket-header h4 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #334155; }
.badge-status { background: #e0f2fe; color: #0284c7; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }

.ticket-body { padding: 30px; }
.ticket-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; }
.ticket-row strong { font-weight: 600; color: #0f172a; }
.ticket-row.small { font-size: 0.85rem; color: #64748b; margin-bottom: 5px; }
.ticket-row.discount { color: #16a34a; font-weight: 600; }

.divider { height: 1px; background: #e2e8f0; margin: 20px 0; border-bottom: 1px dashed #cbd5e1; }

.ticket-total { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 1.4rem; color: #0f172a; }
.iva-row { text-align: right; font-size: 0.8rem; color: #94a3b8; margin-top: 5px; }

.ticket-footer { background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
.btn-quote { display: block; width: 100%; background: #0f172a; color: white; padding: 14px; border-radius: 8px; font-weight: 600; transition: .2s; }
.btn-quote:hover { background: #1e293b; }
.legal { font-size: 0.7rem; color: #94a3b8; margin: 10px 0 0; line-height: 1.4; }

/* TRUST */
.trust-section { padding: 60px 0; background: var(--bg-panel); border-top: 1px solid var(--border); text-align: center; }
.trust-section h3 { margin-bottom: 40px; color: var(--text-muted); font-size: 1rem; text-transform: uppercase; letter-spacing: 2px; }
.trust-grid { display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; }
.trust-item { max-width: 250px; text-align: left; }
.ti-num { font-size: 3rem; font-weight: 800; color: rgba(255,255,255,0.05); display: block; line-height: 1; margin-bottom: -20px; position: relative; z-index: 0; }
.trust-item h4 { font-size: 1.2rem; margin-bottom: 8px; position: relative; z-index: 1; color: var(--gold); }
.trust-item p { font-size: 0.9rem; color: var(--text-muted); position: relative; z-index: 1; }

/* FOOTER */
.corp-footer { padding: 40px 0; text-align: center; border-top: 1px solid var(--border); font-size: 0.9rem; color: var(--text-muted); }
.corp-footer a { color: var(--primary); }
`;