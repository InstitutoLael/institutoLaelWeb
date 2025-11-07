// src/components/SelectPlansBlock.jsx
import { useMemo, useState } from "react";
import {
  PAES_PLANS,
  PAES_SUBJECTS,
  PER_SUBJECT_MONTHLY,   // precio unitario por ramo/mes
  ACADEMIC_MONTHS,       // meses del período académico (p.ej., 8)
} from "../data/paes.js";

/* CLP helper local (evita dependencias implícitas) */
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ---------- Tarjeta de plan ---------- */
function PlanCard({ plan, active, onSelect }) {
  return (
    <button
      type="button"
      className={"plan-card" + (active ? " active" : "")}
      onClick={onSelect}
      aria-pressed={active}
      title={(active ? "Seleccionado: " : "") + plan.title}
    >
      {plan.badge && <span className="badge">{plan.badge}</span>}
      <h3 className="title">{plan.title}</h3>
      {plan.tagline && <p className="sub">{plan.tagline}</p>}

      <div className="price">
        <div className="k">Mensual</div>
        <div className="v">{clp(plan.monthly)}</div>
      </div>

      <ul className="feat">
        {(plan.features || []).slice(0, 5).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <div className="meta">
        <span>{plan.essaysPerMonth} ensayo(s)/mes</span>
        <span>Período ref.: {ACADEMIC_MONTHS} meses</span>
      </div>

      {active && <div className="tick" aria-hidden>✓</div>}
    </button>
  );
}

/* ---------- Chip de ramo individual ---------- */
function SubjectChip({ s, selected, onToggle }) {
  return (
    <button
      type="button"
      className={"chip" + (selected ? " on" : "")}
      onClick={onToggle}
      aria-pressed={selected}
      title={(selected ? "Quitar " : "Agregar ") + s.name}
    >
      <span className="name">{s.name}</span>
      <span className="price">{clp(PER_SUBJECT_MONTHLY)}</span>
    </button>
  );
}

/* ---------- Resumen ---------- */
function SelectionSummary({ plan, subjects }) {
  const extrasCount = subjects.length;
  const monthly =
    (plan?.monthly || 0) + extrasCount * PER_SUBJECT_MONTHLY;
  const annual = monthly * ACADEMIC_MONTHS;
  const essays = (plan?.essaysPerMonth || 0) + extrasCount; // 1 ensayo por ramo extra

  const empty = !plan && extrasCount === 0;

  return (
    <aside className="summary">
      <h4 className="h">Tu selección</h4>

      {empty ? (
        <p className="muted">Elige un plan y/o agrega ramos individuales.</p>
      ) : (
        <>
          {plan && (
            <div className="block">
              <div className="row">
                <div className="k">Plan</div>
                <div className="v">{plan.title}</div>
              </div>
              <div className="row">
                <div className="k">Mensual (plan)</div>
                <div className="v">{clp(plan.monthly)}</div>
              </div>
            </div>
          )}

          {extrasCount > 0 && (
            <div className="block">
              <div className="row">
                <div className="k">Ramos extra</div>
                <div className="v">{extrasCount}</div>
              </div>
              <ul className="list">
                {subjects.map((s) => (
                  <li key={s.id}>
                    {s.name} — <b>{clp(PER_SUBJECT_MONTHLY)}</b>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="totals block">
            <div className="row">
              <div className="k">Total mensual</div>
              <div className="v strong">{clp(monthly)}</div>
            </div>
            <div className="row">
              <div className="k">Referencial anual ({ACADEMIC_MONTHS} m)</div>
              <div className="v">{clp(annual)}</div>
            </div>
            <div className="row">
              <div className="k">Ensayos / mes</div>
              <div className="v">{essays}</div>
            </div>
          </div>

          <div className="cta">
            <a className="btn btn-primary" href="/inscripcion">Inscribirme</a>
            <a className="btn btn-ghost" href="/pagos">Ir a pagos</a>
          </div>
        </>
      )}
    </aside>
  );
}

/* ---------- Componente principal ---------- */
export default function SelectPlansBlock() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

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

  return (
    <section className="plans">
      <style>{css}</style>

      <header className="head">
        <h2 className="t">Elige tu plan</h2>
        <p className="d">
          Puedes combinar un <b>plan</b> con <b>ramos individuales</b>. La matrícula se confirma en <a href="/inscripcion">Inscripción</a>.
        </p>
      </header>

      <div className="grid">
        <div className="col col-plans">
          <div className="plan-grid">
            {PAES_PLANS.map((p) => (
              <PlanCard
                key={p.id}
                plan={p}
                active={selectedPlanId === p.id}
                onSelect={() =>
                  setSelectedPlanId((prev) => (prev === p.id ? null : p.id))
                }
              />
            ))}
          </div>

          <div className="subjects">
            <h3 className="subs-title">Ramos individuales</h3>
            <div className="chips">
              {PAES_SUBJECTS.map((s) => (
                <SubjectChip
                  key={s.id}
                  s={s}
                  selected={selectedSubjectIds.includes(s.id)}
                  onToggle={() => toggleSubject(s.id)}
                />
              ))}
            </div>
            <p className="note">
              Valor por ramo/mes: <b>{clp(PER_SUBJECT_MONTHLY)}</b>. Cada ramo añade 1 ensayo/mes.
            </p>
          </div>
        </div>

        <div className="col col-summary">
          <SelectionSummary plan={selectedPlan} subjects={selectedSubjects} />
        </div>
      </div>
    </section>
  );
}

/* ---------- CSS local ---------- */
const css = `
:root{
  --bg:#0b1220; --card:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --ink2:#cfe0ff;
  --indigo:#5850EC; --cyan:#22d3ee; --amber:#f59e0b;
}

.plans{ color:var(--ink); background:linear-gradient(180deg,var(--bg),var(--card)); padding:16px 0; }
.head{ max-width:1100px; margin:0 auto 6px; padding:0 22px; }
.t{ margin:.4rem 0 .2rem; font-size:1.3rem }
.d{ color:var(--ink2) }

.grid{
  max-width:1100px; margin:0 auto; padding:0 22px 18px;
  display:grid; gap:16px; grid-template-columns: 1.7fr .9fr;
}
@media (max-width: 980px){
  .grid{ grid-template-columns:1fr; }
}

.col-plans{ display:flex; flex-direction:column; gap:16px; }

/* Cards de planes */
.plan-grid{
  display:grid; gap:14px; grid-template-columns: repeat(3, minmax(0,1fr));
}
@media (max-width: 980px){
  .plan-grid{ grid-template-columns: 1fr; }
}

.plan-card{
  position:relative; text-align:left;
  border:1px solid var(--bd); border-radius:16px; padding:14px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  color:#fff; cursor:pointer;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.plan-card:hover{ transform: translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.26); }
.plan-card.active{ border-color:#3b82f6; box-shadow:0 18px 44px rgba(59,130,246,.22); }

.badge{
  display:inline-block; padding:.18rem .5rem; border-radius:999px;
  background:#fde047; color:#111827; font-weight:900; font-size:.72rem;
}

.title{ margin:.35rem 0 .1rem; font-size:1.02rem; font-weight:900 }
.sub{ margin:0 0 .4rem; color:#cbd5e1; font-size:.92rem }

.price{ display:flex; align-items:baseline; gap:8px; margin:.1rem 0 .35rem; }
.price .k{ color:#9fb3c8; font-size:.9rem }
.price .v{ font-weight:1000; font-size:1.18rem }

.feat{ margin:.35rem 0 .5rem; padding-left:18px; color:#eaf2ff; }
.feat li{ margin:.25rem 0 }

.meta{ display:flex; gap:8px; flex-wrap:wrap; color:#9fb3c8; font-size:.86rem }
.tick{
  position:absolute; top:10px; right:10px; width:26px; height:26px;
  display:grid; place-items:center; border-radius:50%;
  background:#3b82f6; color:#fff; font-weight:900;
}

/* Ramos individuales */
.subjects{ border:1px solid var(--bd); border-radius:16px; padding:14px; background:linear-gradient(180deg,#0f172a,#0b1220); }
.subs-title{ margin:0 0 8px; font-size:1rem }
.chips{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{
  display:inline-flex; align-items:center; gap:8px;
  padding:.42rem .7rem; border-radius:999px;
  background:#0f172a; border:1px solid #2b375c; color:#eaf2ff;
  transition: transform .12s ease, box-shadow .12s ease, background .12s ease, border-color .12s ease;
}
.chip:hover{ transform: translateY(-1px); box-shadow:0 10px 18px rgba(2,6,23,.28); }
.chip.on{ background:#111b39; border-color:#3b82f6; }
.chip .name{ font-weight:700; }
.chip .price{ color:#34d399; font-weight:900; }

.note{ margin-top:8px; color:#9fb3c8; font-size:.92rem }

/* Summary */
.col-summary{ position:relative; }
.summary{
  position:sticky; top:84px;
  border:1px solid var(--bd); border-radius:16px; padding:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26);
}
@media (max-width:980px){ .summary{ position:static; } }

.h{ margin:0 0 8px; font-size:1.02rem }
.block{ border-top:1px solid #22304d; padding-top:10px; margin-top:10px; }
.block:first-of-type{ border-top:0; padding-top:0; margin-top:0; }

.row{ display:flex; align-items:baseline; gap:10px; justify-content:space-between; margin:.2rem 0; }
.row .k{ color:#9fb3c8 }
.row .v{ color:#eaf2ff }
.row .v.strong{ font-weight:1000; }

.list{ margin:.2rem 0 .5rem; padding-left:18px; }
.list li{ margin:.2rem 0 }

.cta{ display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.6rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
}
.btn-primary{ background:#5850EC; color:#fff; border-color:#5850EC; }
.btn-ghost{ background:transparent; color:#eaf2ff; }
.btn:hover{ transform: translateY(-1px); box-shadow:0 10px 24px rgba(2,6,23,.26); }
`;