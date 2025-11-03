// src/components/SelectPlansBlock.jsx
import { useMemo, useState } from "react";
import { PAES_PLANS, PAES_SUBJECTS } from "../data/paes.js";

const clp = (n) => Number(n||0).toLocaleString("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0});

function PlanCard({ plan, active, onSelect }) {
  return (
    <article
      className={"lael-plan-card card-float p-4 h-100 " + (active ? "is-active" : "")}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e)=>((e.key==="Enter"||e.key===" ")&&onSelect())}
      aria-pressed={active}
      aria-label={`${active ? "Seleccionado: " : ""}${plan.title}`}
    >
      {plan.badge && <div className="badge bg-warning text-dark mb-2">{plan.badge}</div>}
      <h3 className="h6 mb-1">{plan.title}</h3>
      <div className="text-muted small">{plan.subtitle || "Mensualidad"}</div>
      <div className="display-6 fw-bold mt-2">{clp(plan.price)}</div>
      <ul className="small ps-3 mt-2 mb-0">{(plan.features||[]).map((f,i)=><li key={i}>{f}</li>)}</ul>
      <div className="plan-tick" aria-hidden>✓</div>
    </article>
  );
}

function SubjectChip({ s, selected, onToggle }) {
  return (
    <button
      type="button"
      className={"subject-chip " + (selected ? "selected" : "")}
      onClick={onToggle}
      aria-pressed={selected}
      title={`${selected?"Quitar":"Agregar"} ${s.name} (${clp(s.price)})`}
    >
      <span className="name">{s.name}</span>
      <span className="price">{clp(s.price)}</span>
    </button>
  );
}

function SelectionPreview({ plan, subjects }) {
  const total = (plan?.price ?? 0) + subjects.reduce((a,s)=>a+s.price,0);
  const empty = !plan && subjects.length===0;
  return (
    <div className="selection-box card-float p-3 p-md-4">
      <h4 className="h6 mb-2">Tu selección</h4>
      {empty ? (
        <div className="text-muted small">Elige un plan y/o ramos. Luego podrás inscribirte.</div>
      ) : (
        <>
          {plan && (
            <div className="mb-2">
              <div className="fw-semibold">{plan.title} · <span className="text-success">{clp(plan.price)}</span></div>
              <ul className="small ps-3 mt-1">{(plan.features||[]).slice(0,4).map((f,i)=><li key={i}>{f}</li>)}</ul>
            </div>
          )}
          {subjects.length>0 && (
            <div className="mt-2">
              <div className="fw-semibold">Ramos individuales</div>
              <ul className="small ps-3 mt-1 mb-0">{subjects.map(s=><li key={s.id}>{s.name} — <span className="text-success">{clp(s.price)}</span></li>)}</ul>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="fw-semibold">Total estimado: <span className="text-success">{clp(total)}</span></div>
            <div className="d-flex gap-2 flex-wrap">
              <a className="btn btn-primary" href="/inscripcion">Inscribirme</a>
              <a className="btn btn-outline-primary" href="/pagos">Ir a pagos</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SelectPlansBlock(){
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

  const selectedPlan = useMemo(()=> PAES_PLANS.find(p=>p.id===selectedPlanId) ?? null, [selectedPlanId]);
  const selectedSubjects = useMemo(()=> PAES_SUBJECTS.filter(s=>selectedSubjectIds.includes(s.id)), [selectedSubjectIds]);

  const toggleSubject = (id) => setSelectedSubjectIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  return (
    <section className="mb-5">
      <style>{`
        .lael-plan-card{ position:relative; border-radius:16px; background:#fff0; border:1px solid var(--bd); cursor:pointer; transition:transform .15s, box-shadow .15s, border-color .15s }
        .lael-plan-card:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(0,0,0,.18) }
        .lael-plan-card.is-active{ border-color:#6b7cff; box-shadow:0 10px 28px rgba(107,124,255,.22) }
        .plan-tick{ position:absolute; top:12px; right:12px; width:28px; height:28px; border-radius:999px; display:grid; place-items:center; background:#eef2ff; color:#4f46e5; border:1px solid #e0e7ff; font-weight:800 }
        .subject-chip{ display:inline-flex; align-items:center; gap:8px; padding:.5rem .7rem; border-radius:999px; border:1px solid #e6e8f2; background:#0c1424; color:#e5e7eb; box-shadow:0 2px 8px rgba(16,24,40,.2); transition:.15s }
        .subject-chip .name{ font-weight:600 } .subject-chip .price{ font-weight:600; color:#86efac }
        .subject-chip.selected{ border-color:#6b7cff; background:#101a2f }
        .selection-box{ border-radius:16px; border:1px solid var(--bd); background:var(--card) }
      `}</style>

      <h2 className="h4 mb-3">Elige tu plan</h2>
      <div className="row g-3">
        {PAES_PLANS.map((p)=>(
          <div className="col-md-4" key={p.id}>
            <PlanCard plan={p} active={selectedPlanId===p.id} onSelect={()=>setSelectedPlanId(prev=>prev===p.id?null:p.id)} />
          </div>
        ))}
        <div className="col-md-4">
          <SelectionPreview plan={selectedPlan} subjects={selectedSubjects} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="h6 mb-2">Ramos individuales</h3>
        <div className="d-flex flex-wrap gap-2">
          {PAES_SUBJECTS.map(s=>(
            <SubjectChip key={s.id} s={s} selected={selectedSubjectIds.includes(s.id)} onToggle={()=>toggleSubject(s.id)} />
          ))}
        </div>
        <div className="small text-muted mt-2">Puedes combinar un plan con ramos. La matrícula se confirma en “Inscripción”.</div>
      </div>
    </section>
  );
}
