// src/components/SelectPlansBlock.jsx
import { useMemo, useState } from "react";
import { PAES_PLANS, PAES_SUBJECTS } from "../data/paes.js";

const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

function PlanCard({ plan, active, onSelect }) {
  return (
    <button
      type="button"
      className={`lael-plan-card w-100 text-start p-4 rounded-2xl transition relative
        border border-slate-700 bg-[#0b1220] text-slate-100
        hover:translate-y-[-2px] hover:shadow-xl
        ${active ? "ring-2 ring-indigo-500 shadow-indigo-500/30" : ""}`}
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${active ? "Seleccionado: " : ""}${plan.title}`}
    >
      {plan.badge && (
        <span className="inline-block bg-amber-400 text-[#0b1220] text-xs font-bold px-2 py-0.5 rounded-full mb-2">
          {plan.badge}
        </span>
      )}
      <h3 className="font-semibold text-base">{plan.title}</h3>
      <p className="text-slate-400 text-sm">{plan.subtitle || "Mensualidad"}</p>
      <p className="text-xl font-extrabold mt-2">{clp(plan.price)}</p>

      <ul className="text-sm mt-2 list-disc list-inside space-y-1">
        {(plan.features || []).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      {active && (
        <div
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-indigo-600 text-white grid place-items-center font-bold text-sm shadow"
          aria-hidden
        >
          ✓
        </div>
      )}
    </button>
  );
}

function SubjectChip({ s, selected, onToggle }) {
  return (
    <button
      type="button"
      className={`subject-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition
        border ${selected ? "border-indigo-500 bg-indigo-950/50" : "border-slate-700 bg-slate-800 hover:bg-slate-700"}
        text-slate-100`}
      onClick={onToggle}
      aria-pressed={selected}
      title={`${selected ? "Quitar" : "Agregar"} ${s.name}`}
    >
      <span>{s.name}</span>
      <span className="text-emerald-400">{clp(s.price)}</span>
    </button>
  );
}

function SelectionPreview({ plan, subjects }) {
  const total = (plan?.price ?? 0) + subjects.reduce((a, s) => a + s.price, 0);
  const empty = !plan && subjects.length === 0;

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#0b1220] text-slate-100 p-4 shadow-sm">
      <h4 className="font-semibold mb-2">Tu selección</h4>
      {empty ? (
        <p className="text-slate-400 text-sm">
          Elige un plan o ramos. Luego podrás inscribirte.
        </p>
      ) : (
        <>
          {plan && (
            <div className="mb-2">
              <p className="font-semibold">
                {plan.title} ·{" "}
                <span className="text-emerald-400">{clp(plan.price)}</span>
              </p>
              <ul className="text-sm list-disc list-inside space-y-1">
                {(plan.features || []).slice(0, 4).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {subjects.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold">Ramos individuales</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                {subjects.map((s) => (
                  <li key={s.id}>
                    {s.name} —{" "}
                    <span className="text-emerald-400">{clp(s.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
            <p className="font-semibold">
              Total: <span className="text-emerald-400">{clp(total)}</span>
            </p>
            <div className="flex gap-2">
              <a href="/inscripcion" className="btn-primary">
                Inscribirme
              </a>
              <a href="/pagos" className="btn-secondary">
                Ir a pagos
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SelectPlansBlock() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

  const selectedPlan = useMemo(
    () => PAES_PLANS.find((p) => p.id === selectedPlanId) ?? null,
    [selectedPlanId, PAES_PLANS]
  );
  const selectedSubjects = useMemo(
    () => PAES_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id)),
    [selectedSubjectIds, PAES_SUBJECTS]
  );

  const toggleSubject = (id) =>
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold mb-4">Elige tu plan</h2>

      <div className="grid md:grid-cols-3 gap-4">
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
        <SelectionPreview plan={selectedPlan} subjects={selectedSubjects} />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Ramos individuales</h3>
        <div className="flex flex-wrap gap-2">
          {PAES_SUBJECTS.map((s) => (
            <SubjectChip
              key={s.id}
              s={s}
              selected={selectedSubjectIds.includes(s.id)}
              onToggle={() => toggleSubject(s.id)}
            />
          ))}
        </div>
        <p className="text-slate-400 text-xs mt-2">
          Puedes combinar un plan con ramos. La matrícula se confirma en
          “Inscripción”.
        </p>
      </div>
    </section>
  );
}