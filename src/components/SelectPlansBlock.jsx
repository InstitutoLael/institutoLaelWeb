// src/components/SelectPlansBlock.jsx
import { useMemo, useState, useEffect } from "react";
import {
  PAES_PLANS,
  PAES_SUBJECTS,
  PER_SUBJECT_MONTHLY,
  ACADEMIC_MONTHS,
} from "../data/paes.js";

/* Helper de moneda */
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* --- ÍCONOS SVG INLINE --- */
const ICONS = {
  check: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  plus: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
  cart: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
};

/* ---------- TARJETA DE PLAN (CYBER STYLE) ---------- */
function PlanCard({ plan, active, onSelect }) {
  return (
    <button
      type="button"
      className={`plan-card ${active ? "active" : ""}`}
      onClick={onSelect}
      aria-pressed={active}
    >
      {/* Glow de fondo */}
      <div className="card-glow"></div>
      
      {plan.badge && <span className="badge">{plan.badge}</span>}
      
      <div className="card-header">
        <h3 className="title">{plan.title}</h3>
        {plan.tagline && <p className="sub">{plan.tagline}</p>}
      </div>

      <div className="price-block">
        <span className="currency">$</span>
        <span className="amount">{plan.monthly.toLocaleString("es-CL")}</span>
        <span className="period">/mes</span>
      </div>

      <ul className="features">
        {(plan.features || []).slice(0, 5).map((f) => (
          <li key={f}>
            <span className="bullet">▹</span> {f}
          </li>
        ))}
      </ul>

      {/* Indicador de Selección */}
      <div className="select-indicator">
        {active ? <span className="txt-active">SELECCIONADO</span> : "ELEGIR PLAN"}
      </div>
    </button>
  );
}

/* ---------- CHIP DE RAMO (POWER-UP STYLE) ---------- */
function SubjectChip({ s, selected, onToggle }) {
  return (
    <button
      type="button"
      className={`chip ${selected ? "on" : ""}`}
      onClick={onToggle}
      aria-pressed={selected}
    >
      <div className="chip-content">
        <span className="chip-name">{s.name}</span>
        <span className="chip-price">+{clp(PER_SUBJECT_MONTHLY)}</span>
      </div>
      <div className="chip-icon">
        {selected ? ICONS.check : ICONS.plus}
      </div>
    </button>
  );
}

/* ---------- RESUMEN ---------- */
function SelectionSummary({ plan, subjects }) {
  const extrasCount = subjects.length;
  const monthly = (plan?.monthly || 0) + extrasCount * PER_SUBJECT_MONTHLY;
  const annual = monthly * ACADEMIC_MONTHS;

  const hasSelection = plan || extrasCount > 0;

  return (
    <div className="summary-panel">
      <h4 className="summary-title">Resumen de Matrícula</h4>
      
      {!hasSelection ? (
        <div className="empty-state">
          <p>Selecciona un plan o ramos para comenzar tu preparación.</p>
        </div>
      ) : (
        <div className="summary-details">
          {plan && (
            <div className="line-item">
              <span>{plan.title}</span>
              <strong>{clp(plan.monthly)}</strong>
            </div>
          )}
          
          {subjects.map(s => (
            <div className="line-item extra" key={s.id}>
              <span>+ {s.name}</span>
              <strong>{clp(PER_SUBJECT_MONTHLY)}</strong>
            </div>
          ))}

          <div className="divider"></div>

          <div className="total-row">
            <span>Total Mensual</span>
            <span className="total-price">{clp(monthly)}</span>
          </div>
          
          <div className="annual-ref">
            Referencial Anual ({ACADEMIC_MONTHS} meses): {clp(annual)}
          </div>

          <a href="/inscripcion" className="btn-inscripcion">
            CONFIRMAR INSCRIPCIÓN ➔
          </a>
        </div>
      )}
    </div>
  );
}

/* ---------- COMPONENTE PRINCIPAL ---------- */
export default function SelectPlansBlock() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil para mostrar barra flotante
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 980);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedPlan = useMemo(
    () => PAES_PLANS.find((p) => p.id === selectedPlanId) ?? null,
    [selectedPlanId]
  );

  const selectedSubjects = useMemo(
    () => PAES_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id)),
    [selectedSubjectIds]
  );

  const toggleSubject = (id) =>
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // Totales para barra móvil
  const totalMonthly = (selectedPlan?.monthly || 0) + (selectedSubjects.length * PER_SUBJECT_MONTHLY);

  return (
    <section className="plans-section">
      <style>{css}</style>

      <div className="container">
        <header className="section-header">
          <h2 className="main-title">Diseña tu Estrategia <span className="highlight">PAES</span></h2>
          <p className="subtitle">
            Elige un plan base y poténcialo con ramos extra si lo necesitas.
          </p>
        </header>

        <div className="layout-grid">
          {/* COLUMNA IZQUIERDA: PLANES Y RAMOS */}
          <div className="main-col">
            <div className="plans-grid">
              {PAES_PLANS.map((p) => (
                <PlanCard
                  key={p.id}
                  plan={p}
                  active={selectedPlanId === p.id}
                  onSelect={() => setSelectedPlanId(prev => prev === p.id ? null : p.id)}
                />
              ))}
            </div>

            <div className="extras-section">
              <h3 className="extras-title">⚡ Potencia tu plan con Ramos Extra</h3>
              <p className="extras-desc">Cada ramo adicional cuesta <b>{clp(PER_SUBJECT_MONTHLY)}</b> mensual.</p>
              
              <div className="chips-grid">
                {PAES_SUBJECTS.map((s) => (
                  <SubjectChip
                    key={s.id}
                    s={s}
                    selected={selectedSubjectIds.includes(s.id)}
                    onToggle={() => toggleSubject(s.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN (DESKTOP) */}
          <div className="sidebar-col">
            <SelectionSummary plan={selectedPlan} subjects={selectedSubjects} />
          </div>
        </div>
      </div>

      {/* BARRA FLOTANTE MÓVIL (Solo si hay selección) */}
      {(isMobile && (selectedPlan || selectedSubjects.length > 0)) && (
        <div className="mobile-bar">
          <div className="mb-info">
            <span className="mb-label">Total Mensual</span>
            <span className="mb-total">{clp(totalMonthly)}</span>
          </div>
          <a href="/inscripcion" className="mb-btn">Inscribirme</a>
        </div>
      )}
    </section>
  );
}

/* ---------- CSS ---------- */
const css = `
  /* VARIABLES LOCALES */
  .plans-section {
    --bg-dark: #0b1221;
    --card-bg: #111827;
    --border: #1f2937;
    --primary: #6366f1; /* Indigo */
    --accent: #ec4899; /* Pink/Rose Neon */
    --text-main: #f3f4f6;
    --text-muted: #9ca3af;
    
    background: var(--bg-dark);
    padding: 60px 20px 100px; /* Padding extra abajo para barra móvil */
    color: var(--text-main);
    font-family: 'Inter', sans-serif;
  }

  .container { max-width: 1200px; margin: 0 auto; }

  /* HEADER */
  .section-header { text-align: center; margin-bottom: 40px; }
  .main-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -1px; }
  .highlight { color: var(--accent); text-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
  .subtitle { color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

  /* LAYOUT */
  .layout-grid {
    display: grid; grid-template-columns: 1fr 340px; gap: 30px;
    align-items: start;
  }
  @media (max-width: 980px) { .layout-grid { grid-template-columns: 1fr; } }

  /* PLAN CARDS */
  .plans-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;
    margin-bottom: 40px;
  }

  .plan-card {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    text-align: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    cursor: pointer;
    display: flex; flex-direction: column;
    height: 100%;
  }

  .plan-card:hover { transform: translateY(-5px); border-color: var(--primary); }
  
  .plan-card.active {
    border-color: var(--accent);
    background: linear-gradient(145deg, rgba(17, 24, 39, 1), rgba(236, 72, 153, 0.1));
    box-shadow: 0 0 30px rgba(236, 72, 153, 0.15);
  }

  .badge {
    position: absolute; top: 12px; right: 12px;
    background: var(--accent); color: #fff;
    font-size: 0.7rem; font-weight: 800; padding: 4px 8px; border-radius: 20px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }

  .title { font-size: 1.5rem; font-weight: 800; margin-bottom: 5px; color: #fff; }
  .sub { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; }

  .price-block { margin-bottom: 20px; display: flex; align-items: baseline; }
  .currency { font-size: 1.2rem; font-weight: 600; color: var(--text-muted); }
  .amount { font-size: 2.2rem; font-weight: 900; color: #fff; margin: 0 4px; letter-spacing: -1px; }
  .period { font-size: 0.9rem; color: var(--text-muted); }

  .features { list-style: none; padding: 0; margin: 0 0 20px 0; flex-grow: 1; }
  .features li { margin-bottom: 8px; font-size: 0.95rem; color: #d1d5db; display: flex; gap: 8px; }
  .bullet { color: var(--accent); }

  .select-indicator {
    margin-top: auto;
    width: 100%; padding: 10px;
    border-radius: 8px;
    font-weight: 700; text-align: center; font-size: 0.9rem;
    background: rgba(255,255,255,0.05); color: var(--text-muted);
    transition: all 0.2s;
  }
  .plan-card.active .select-indicator {
    background: var(--accent); color: #fff;
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
  }

  /* EXTRAS SECTION */
  .extras-section {
    background: rgba(255,255,255,0.02); border: 1px dashed var(--border);
    border-radius: 16px; padding: 24px;
  }
  .extras-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; color: #fff; }
  .extras-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 20px; }

  .chips-grid { display: flex; flex-wrap: wrap; gap: 10px; }

  .chip {
    background: var(--card-bg); border: 1px solid var(--border);
    padding: 10px 16px; border-radius: 12px;
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; transition: all 0.2s;
    min-width: 140px; justify-content: space-between;
  }
  .chip:hover { border-color: var(--primary); }
  .chip.on {
    background: rgba(99, 102, 241, 0.15); border-color: var(--primary);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
  }

  .chip-name { font-weight: 600; font-size: 0.9rem; color: #fff; }
  .chip-price { font-size: 0.8rem; color: var(--primary); font-weight: 700; display: block; }
  .chip.on .chip-price { color: #a5b4fc; }

  .chip-icon {
    width: 24px; height: 24px; border-radius: 50%;
    background: rgba(255,255,255,0.1); color: var(--text-muted);
    display: grid; place-items: center;
  }
  .chip.on .chip-icon { background: var(--primary); color: #fff; }

  /* SIDEBAR SUMMARY (DESKTOP) */
  .summary-panel {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px;
    position: sticky; top: 100px;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
  }
  @media (max-width: 980px) { .sidebar-col { display: none; } } /* Oculto en móvil */

  .summary-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }

  .line-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; }
  .line-item.extra { color: var(--primary); }
  .divider { height: 1px; background: var(--border); margin: 15px 0; }

  .total-row { display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 700; color: #fff; }
  .total-price { font-size: 1.5rem; color: var(--accent); }
  
  .annual-ref { font-size: 0.8rem; color: var(--text-muted); text-align: right; margin-top: 5px; margin-bottom: 20px; }

  .btn-inscripcion {
    display: block; width: 100%; padding: 14px;
    background: var(--primary); color: #fff;
    text-align: center; border-radius: 10px; font-weight: 800; text-decoration: none;
    transition: background 0.2s;
  }
  .btn-inscripcion:hover { background: #4f46e5; }

  /* MOBILE FLOATING BAR */
  .mobile-bar {
    position: fixed; bottom: 20px; left: 20px; right: 20px;
    background: rgba(17, 24, 39, 0.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px 20px; border-radius: 50px;
    display: flex; justify-content: space-between; align-items: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 100;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideUp { from { transform: translateY(100px); } to { transform: translateY(0); } }

  .mb-info { display: flex; flex-direction: column; }
  .mb-label { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); }
  .mb-total { font-size: 1.2rem; font-weight: 900; color: #fff; }
  
  .mb-btn {
    background: var(--accent); color: #fff;
    padding: 8px 20px; border-radius: 30px;
    text-decoration: none; font-weight: 700; font-size: 0.9rem;
  }
`;