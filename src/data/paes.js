import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  PAES_SUBJECTS, PAES_COMBOS, 
  priceForSubjects, priceAnnualForSubjects, 
  ENROLLMENT_FEE, clp, ACADEMIC_PERIOD_LABEL 
} from "../data/paes";

/* --- ICONOS --- */
const Icons = {
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Fire: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24" stroke="#d97706" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3a7 7 0 0 1 5.9-6.5c-.5.6-1 1.2-1 2z"/></svg>,
  Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
};

export default function Paes() {
  const [selected, setSelected] = useState([]); // Array de IDs seleccionados
  const [viewMode, setViewMode] = useState("calculator"); // 'calculator' | 'packs'

  // Lógica de selección
  const toggleSubject = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const loadCombo = (comboIds) => {
    setSelected(comboIds);
    setViewMode("calculator");
    window.scrollTo({ top: 500, behavior: 'smooth' }); // Scroll suave a la calculadora
  };

  // Cálculos reactivos
  const monthlyPrice = priceForSubjects(selected);
  const annualPrice = priceAnnualForSubjects(selected);
  const subjectCount = selected.length;

  return (
    <div className="paes-page">
      <style>{css}</style>

      {/* HEADER */}
      <section className="paes-hero">
        <div className="container">
          <span className="badge-year">Admisión {ACADEMIC_PERIOD_LABEL}</span>
          <h1 className="hero-title">Preuniversitario <span className="highlight">Justo</span></h1>
          <p className="hero-desc">
            Pagamos sueldos dignos a nuestros profesores y te cobramos un precio ético a ti. 
            Sin letras chicas. Sin contratos amarrados.
          </p>

          <div className="mode-switcher">
            <button 
                className={`switch-btn ${viewMode === 'packs' ? 'active' : ''}`}
                onClick={() => setViewMode('packs')}
            >
                📦 Ver Packs Recomendados
            </button>
            <button 
                className={`switch-btn ${viewMode === 'calculator' ? 'active' : ''}`}
                onClick={() => setViewMode('calculator')}
            >
                🧮 Armar mi Horario
            </button>
          </div>
        </div>
      </section>

      {/* VISTA 1: PACKS RECOMENDADOS */}
      {viewMode === 'packs' && (
        <section className="packs-section container">
            <div className="packs-grid">
                {PAES_COMBOS.map((combo) => (
                    <div key={combo.id} className={`combo-card border-${combo.color}`}>
                        {combo.badge && <span className={`combo-badge bg-${combo.color}`}>{combo.badge}</span>}
                        <h3>{combo.title}</h3>
                        <p className="combo-tagline">{combo.tagline}</p>
                        
                        <div className="combo-price">
                            {clp(combo.monthly)} <span className="period">/mes</span>
                        </div>
                        
                        <ul className="combo-feats">
                            {combo.features.map((f, i) => <li key={i}>• {f}</li>)}
                        </ul>

                        <button className={`combo-btn btn-${combo.color}`} onClick={() => loadCombo(combo.subjects)}>
                            Elegir este Pack
                        </button>
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* VISTA 2: CALCULADORA MANUAL */}
      {viewMode === 'calculator' && (
        <section className="calculator-section container">
            <div className="calc-layout">
                {/* COLUMNA IZQUIERDA: MATERIAS */}
                <div className="subjects-grid">
                    {PAES_SUBJECTS.map((subj) => {
                        const isActive = selected.includes(subj.id);
                        return (
                            <div 
                                key={subj.id} 
                                className={`subj-card ${isActive ? 'active' : ''}`}
                                onClick={() => toggleSubject(subj.id)}
                            >
                                <div className="subj-icon">{subj.icon}</div>
                                <div className="subj-name">{subj.name}</div>
                                <div className="checkbox-indicator">
                                    {isActive ? <Icons.Check /> : "+"}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* COLUMNA DERECHA: RESUMEN */}
                <div className="summary-card">
                    <div className="summary-header">
                        <h3>Tu Plan Personalizado</h3>
                        <span className="summary-count">{subjectCount} {subjectCount === 1 ? 'Ramo' : 'Ramos'}</span>
                    </div>

                    {subjectCount === 0 ? (
                        <div className="empty-state">
                            Selecciona tus materias a la izquierda para cotizar.
                        </div>
                    ) : (
                        <div className="pricing-details">
                            <div className="price-row">
                                <span>Valor Mensual:</span>
                                <strong className="big-price">{clp(monthlyPrice)}</strong>
                            </div>
                            <div className="price-row sub">
                                <span>Matrícula única:</span>
                                <span>{clp(ENROLLMENT_FEE)}</span>
                            </div>
                            
                            {/* Mensaje de refuerzo de valor */}
                            {subjectCount >= 5 && (
                                <div className="value-msg">
                                    <Icons.Fire /> ¡Estás aprovechando el precio máximo de descuento!
                                </div>
                            )}
                            
                            <hr className="divider"/>

                            <Link to="/inscripcion" className="checkout-btn">
                                Inscribirme Ahora
                            </Link>
                            <p className="legal-text">Pago seguro vía WebPay / Transferencia</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
      )}

      {/* SECCIÓN TRANSPARENCIA (Para justificar el precio) */}
      <section className="transparency-section container">
        <div className="transparency-box">
            <div className="t-icon"><Icons.Info /></div>
            <div className="t-content">
                <h4>¿A dónde va tu dinero?</h4>
                <p>
                    A diferencia de otros Preus, en Lael destinamos el <strong>60% de tu mensualidad</strong> directamente 
                    al pago de tus profesores. Creemos que un profesor bien pagado enseña mejor.
                    El resto cubre la plataforma Zoom, guías y administración.
                </p>
            </div>
        </div>
      </section>

    </div>
  );
}

/* ─── CSS SCOPED ─── */
const css = `
.paes-page {
  background-color: #050505; color: #f8fafc;
  min-height: 100vh; padding-top: 100px; padding-bottom: 80px;
}
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

/* HERO */
.paes-hero { text-align: center; margin-bottom: 50px; }
.badge-year { 
    background: rgba(255,255,255,0.1); padding: 5px 12px; 
    border-radius: 20px; font-size: 0.8rem; font-weight: 700; color: #fbbf24;
}
.hero-title { font-size: 2.5rem; margin: 20px 0; font-weight: 800; }
.highlight { color: #fbbf24; }
.hero-desc { color: #94a3b8; max-width: 600px; margin: 0 auto 30px; font-size: 1.1rem; }

/* SWITCHER */
.mode-switcher {
    display: flex; justify-content: center; gap: 10px; background: rgba(255,255,255,0.05);
    padding: 5px; border-radius: 12px; display: inline-flex;
}
.switch-btn {
    background: transparent; border: none; color: #94a3b8;
    padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s;
}
.switch-btn:hover { color: #fff; }
.switch-btn.active { background: #1e293b; color: #fbbf24; shadow: 0 2px 10px rgba(0,0,0,0.2); }

/* CALCULATOR GRID */
.calc-layout {
    display: grid; grid-template-columns: 2fr 1fr; gap: 30px;
}
@media (max-width: 768px) { .calc-layout { grid-template-columns: 1fr; } }

.subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; }
.subj-card {
    background: #0f1115; border: 1px solid #334155;
    padding: 20px; border-radius: 16px; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px;
    transition: 0.2s; position: relative; overflow: hidden;
}
.subj-card:hover { border-color: #fbbf24; }
.subj-card.active { border-color: #fbbf24; background: rgba(251, 191, 36, 0.05); }

.subj-icon { font-size: 2rem; }
.subj-name { font-size: 0.9rem; font-weight: 600; line-height: 1.2; }
.checkbox-indicator {
    width: 24px; height: 24px; border-radius: 50%;
    background: rgba(255,255,255,0.1); color: #fff;
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    transition: 0.2s; margin-top: 5px;
}
.subj-card.active .checkbox-indicator { background: #fbbf24; color: #000; }

/* SUMMARY CARD */
.summary-card {
    background: #1e293b; border-radius: 20px; padding: 25px;
    height: fit-content; position: sticky; top: 120px;
    border: 1px solid rgba(255,255,255,0.1);
}
.summary-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.summary-header h3 { margin: 0; font-size: 1.1rem; }
.summary-count { background: #000; padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; color: #fbbf24; }

.empty-state { color: #64748b; font-style: italic; font-size: 0.9rem; text-align: center; padding: 20px 0; }

.price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.big-price { font-size: 1.8rem; color: #fbbf24; }
.sub { color: #94a3b8; font-size: 0.9rem; }
.divider { border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0; }

.value-msg { 
    background: rgba(251, 191, 36, 0.1); color: #fbbf24; 
    padding: 10px; border-radius: 8px; font-size: 0.8rem; 
    display: flex; gap: 8px; align-items: center; margin-top: 15px;
}

.checkout-btn {
    display: block; width: 100%; text-align: center;
    background: #fbbf24; color: #000; font-weight: 800;
    padding: 15px; border-radius: 12px; text-decoration: none;
    transition: 0.2s;
}
.checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 20px -5px rgba(251, 191, 36, 0.4); }
.legal-text { font-size: 0.75rem; color: #64748b; text-align: center; margin-top: 10px; }

/* PACKS GRID VIEW */
.packs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.combo-card {
    background: #0f1115; border: 1px solid #334155; padding: 25px; border-radius: 20px;
    display: flex; flex-direction: column; position: relative;
}
.combo-badge { 
    position: absolute; top: -10px; right: 20px; 
    padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; 
    font-weight: 800; text-transform: uppercase; color: #fff;
}
.combo-price { font-size: 1.5rem; font-weight: 800; margin: 15px 0; }
.combo-feats { list-style: none; padding: 0; color: #cbd5e1; font-size: 0.9rem; flex: 1; margin-bottom: 20px; }
.combo-btn {
    width: 100%; padding: 12px; border-radius: 10px; border: none; font-weight: 700; cursor: pointer; color: #fff;
}

/* COLORS */
.border-amber { border-color: rgba(251, 191, 36, 0.3); } .bg-amber { background: #d97706; } .btn-amber { background: #d97706; }
.border-indigo { border-color: rgba(99, 102, 241, 0.3); } .bg-indigo { background: #4f46e5; } .btn-indigo { background: #4f46e5; }
.border-rose { border-color: rgba(244, 63, 94, 0.3); } .bg-rose { background: #e11d48; } .btn-rose { background: #e11d48; }
.border-violet { border-color: rgba(139, 92, 246, 0.3); } .bg-violet { background: #7c3aed; } .btn-violet { background: #7c3aed; }
.border-green { border-color: rgba(34, 197, 94, 0.3); } .bg-green { background: #16a34a; } .btn-green { background: #16a34a; }

/* TRANSPARENCY BOX */
.transparency-section { margin-top: 60px; display: flex; justify-content: center; }
.transparency-box {
    background: rgba(255,255,255,0.03); border: 1px dashed #475569;
    padding: 20px; border-radius: 12px; display: flex; gap: 15px; max-width: 700px;
}
.t-icon { color: #64748b; margin-top: 2px; }
.t-content h4 { margin: 0 0 5px 0; font-size: 1rem; color: #e2e8f0; }
.t-content p { margin: 0; font-size: 0.9rem; color: #94a3b8; line-height: 1.5; }
`;