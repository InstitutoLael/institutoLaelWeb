// src/pages/Becas.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ==== DATA REAL: imports de tus módulos ==== */
// HOMESCHOOL
import {
  ENROLLMENT_FEE as HS_ENR,
  estimateMonthly as hsEstimateMonthly,
  MODES as HS_MODES,
  HOURS_CHOICES as HS_HOURS_CHOICES,
} from "../data/homeschool.js";

// IDIOMAS
import {
  ENROLLMENT_FEE as IDIOMAS_ENR,
  computeLangBundle,
} from "../data/idiomas.js";

// LSCh
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  priceForGroupPlan,
  CHURCH_CONVENIO,
} from "../data/lsch.js";

// PAES (usa las funciones del modelo de precios)
import {
  ENROLLMENT_FEE as PAES_ENR,
  priceForCount as paesPriceForCount,
} from "../data/paes.js";

/* ==== Util ==== */
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ==== Política de beca ==== */
const MAX_SCHOLARSHIP = 0.9;

// Tramos por ingreso per cápita (CLP/mes)
const TIERS = [
  { id: "A", cap: 120000, basePct: 0.8, matriculaWaiver: 1.0 },
  { id: "B", cap: 180000, basePct: 0.6, matriculaWaiver: 0.5 },
  { id: "C", cap: 260000, basePct: 0.4, matriculaWaiver: 0.0 },
  { id: "D", cap: 350000, basePct: 0.2, matriculaWaiver: 0.0 },
  { id: "E", cap: Infinity, basePct: 0.0, matriculaWaiver: 0.0 },
];

function findTier(perCapita) {
  return TIERS.find((t) => perCapita <= t.cap) || TIERS[TIERS.length - 1];
}
function meritBoost(nota) {
  if (nota >= 6.5) return 0.10;
  if (nota >= 6.0) return 0.05;
  return 0.0;
}
function specialBoost(flags) {
  let b = 0;
  if (flags.discapacidad) b += 0.05;
  if (flags.rural) b += 0.05;
  if (flags.monoparental) b += 0.03;
  return b;
}
const flagList = (f) =>
  [
    f.discapacidad && "Discapacidad",
    f.rural && "Residencia rural",
    f.monoparental && "Hogar monoparental",
  ]
    .filter(Boolean)
    .join(", ");

/* ==== UI helpers ==== */
const PROGRAMS = [
  { id: "paes", label: "PAES" },
  { id: "idiomas", label: "Idiomas" },
  { id: "lsch", label: "LSCh" },
  { id: "homeschool", label: "Homeschool (apoyo)" },
];

const WAPP = "56964626568";

/* ===========================================================
   Página
=========================================================== */
export default function Becas() {
  // Programa activo
  const [progId, setProgId] = useState("paes");

  // ——— variables de ingreso/merito
  const [income, setIncome] = useState("800000"); // ingreso hogar CLP/mes (string para máscara)
  const [members, setMembers] = useState(4); // personas en el hogar
  const [nota, setNota] = useState("6.2"); // 1.0–7.0
  const [flags, setFlags] = useState({
    discapacidad: false,
    rural: false,
    monoparental: false,
  });

  // ——— parámetros por PROGRAMA (para sacar el precio real mensual y matrícula real)
  // PAES
  const [paesRamos, setPaesRamos] = useState(2); // 1–7
  // IDIOMAS
  const [idiomasCursos, setIdiomasCursos] = useState(1); // 1–3
  // LSCh
  const [lschMode, setLschMode] = useState("group"); // "group" | "one2one"
  const [lschPlanId, setLschPlanId] = useState(LSCH_GROUP_PLANS[1]?.id || "g-quarter"); // default Trimestral
  const [lschConvenio, setLschConvenio] = useState(false); // iglesia convenio
  // HOMESCHOOL
  const [hsMode, setHsMode] = useState("oneToOne"); // "oneToOne" | "microGroup"
  const [hsHours, setHsHours] = useState(2); // 1–4
  const [hsSubjects, setHsSubjects] = useState(2); // 1–6

  // ——— Cálculo del plan base (mensual y matrícula) según PROGRAMA
  const base = useMemo(() => {
    let monthly = 0;
    let enrollment = 0;

    if (progId === "paes") {
      monthly = paesPriceForCount(paesRamos);
      enrollment = PAES_ENR;
    } else if (progId === "idiomas") {
      monthly = computeLangBundle(idiomasCursos);
      enrollment = IDIOMAS_ENR;
    } else if (progId === "lsch") {
      if (lschMode === "group") {
        const plan = LSCH_GROUP_PLANS.find((p) => p.id === lschPlanId) || LSCH_GROUP_PLANS[0];
        monthly = priceForGroupPlan(plan, { church: lschConvenio });
      } else {
        const plan = LSCH_ONE2ONE_PLANS.find((p) => p.id === lschPlanId) || LSCH_ONE2ONE_PLANS[0];
        monthly = plan?.monthly || 0;
      }
      enrollment = LSCH_ENROLLMENT_FEE;
    } else if (progId === "homeschool") {
      monthly = hsEstimateMonthly({
        mode: hsMode,
        hoursPerWeek: hsHours,
        subjectsCount: hsSubjects,
      });
      enrollment = HS_ENR;
    }

    return { monthly, enrollment };
  }, [
    progId,
    // PAES
    paesRamos,
    // IDIOMAS
    idiomasCursos,
    // LSCh
    lschMode,
    lschPlanId,
    lschConvenio,
    // HS
    hsMode,
    hsHours,
    hsSubjects,
  ]);

  // ——— Cálculo de beca
  const calc = useMemo(() => {
    const inc = Number(String(income).replace(/[^\d]/g, "")) || 0;
    const fam = Math.max(1, Number(members) || 1);
    const perCapita = inc / fam;

    const baseTier = findTier(perCapita);
    const mBoost = meritBoost(Number(nota) || 0);
    const sBoost = specialBoost(flags);

    const rawPct = baseTier.basePct + mBoost + sBoost;
    const pct = Math.min(MAX_SCHOLARSHIP, Math.max(0, rawPct));

    const monthlyFull = base.monthly;
    const monthlyDiscount = Math.round(monthlyFull * pct);
    const monthlyFinal = Math.max(0, monthlyFull - monthlyDiscount);

    const enrollmentWaived = Math.round(base.enrollment * (baseTier.matriculaWaiver || 0));
    const enrollmentToPay = Math.max(0, base.enrollment - enrollmentWaived);

    return {
      perCapita,
      tier: baseTier.id,
      basePct: baseTier.basePct,
      boostMerit: mBoost,
      boostSpecial: sBoost,
      pct,
      monthlyFull,
      monthlyDiscount,
      monthlyFinal,
      enrollmentWaived,
      enrollmentToPay,
    };
  }, [income, members, nota, flags, base]);

  const waText = encodeURIComponent(
    `Hola 👋, quiero postular a Beca Lael.\n` +
      `Programa: ${PROGRAMS.find((p) => p.id === progId)?.label}\n` +
      programLine(progId, { paesRamos, idiomasCursos, lschMode, lschPlanId, lschConvenio, hsMode, hsHours, hsSubjects }) +
      `Ingreso hogar: ${clp(Number(String(income).replace(/[^\d]/g, "")) || 0)}\n` +
      `Personas en el hogar: ${members}\n` +
      `Ingreso per cápita: ${clp(Math.round(calc.perCapita))}\n` +
      `Tramo: ${calc.tier} | Beca estimada: ${(calc.pct * 100).toFixed(0)}%\n` +
      `Mensual sin beca: ${clp(calc.monthlyFull)} | Con beca: ${clp(calc.monthlyFinal)}\n` +
      `Matrícula: ${
        calc.enrollmentToPay
          ? clp(calc.enrollmentToPay) + " (condonada " + clp(calc.enrollmentWaived) + ")"
          : "Condonada 100%"
      }\n` +
      `Mérito: ${Number(nota).toFixed(1)} | Situación especial: ${flagList(flags) || "Ninguna"}\n` +
      `¿Me ayudan a completar la postulación?`
  );

  const mailto = `mailto:becas@institutolael.cl?subject=${encodeURIComponent(
    "Postulación a Beca (" + (PROGRAMS.find((p) => p.id === progId)?.label || "") + ")"
  )}&body=${waText}`;

  return (
    <section className="scholar-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__inner">
          <div>
            <span className="pill">Becas Lael</span>
            <h1 className="title">Postula y calcula al instante</h1>
            <p className="lead">
              Tramo por <strong>ingreso per cápita</strong> + <strong>mérito</strong> +{" "}
              <strong>situación especial</strong>. Hasta <b>90% de beca</b> y condonación de matrícula
              según tramo (política 2026).
            </p>
          </div>
          <div className="hero__right">
            <div className="card-float p-3">
              <div className="mini">Resumen inmediato</div>
              <div className="resume">
                <Row k="Programa" v={PROGRAMS.find((p) => p.id === progId)?.label} />
                <Row k="Tramo" v={`${calc.tier} (${(calc.basePct * 100).toFixed(0)}% base)`} />
                <Row k="Beca total" v={<b className="ok">{(calc.pct * 100).toFixed(0)}%</b>} />
                <Row k="Mensual sin beca" v={clp(calc.monthlyFull)} />
                <Row k="Descuento" v={clp(calc.monthlyDiscount)} />
                <Row k="Mensual con beca" v={<b>{clp(calc.monthlyFinal)}</b>} />
                <div className="hr" />
                <Row
                  k="Matrícula a pagar"
                  v={
                    calc.enrollmentToPay
                      ? `${clp(calc.enrollmentToPay)} (condonada ${clp(calc.enrollmentWaived)})`
                      : "Condonada 100%"
                  }
                />
              </div>

              <div className="cta-inline">
                <a className="btn btn-primary" href={`https://wa.me/${WAPP}?text=${waText}`} target="_blank" rel="noreferrer">
                  Postular por WhatsApp
                </a>
                <a className="btn btn-outline" href={mailto}>
                  Postular por correo
                </a>
              </div>

              {/* Política 2026 — texto correcto */}
              <div className="tiny subtle mt6">
                La beca final se otorga tras <strong>revisión documental</strong> del Comité de Becas Lael
                y <strong>firma de contrato de participación</strong>. Debes acreditar los antecedentes
                y la beca se mantiene durante el año si las condiciones se sostienen y cumples el plan académico.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CALCULADORA */}
      <div className="container">
        <section className="block">
          <div className="card-float p-3 p-md-4">
            <h2 className="h6 m-0">Tus datos</h2>
            <p className="muted mt4">Ajusta los campos. El cálculo se actualiza al tiro.</p>

            {/* Selección de programa */}
            <div className="card-soft">
              <label className="form-label">Programa</label>
              <div className="chip-row">
                {PROGRAMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={"chip " + (progId === p.id ? "is-active" : "")}
                    onClick={() => setProgId(p.id)}
                    aria-pressed={progId === p.id}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-form por programa */}
            <div className="grid grid-2 mt12">
              {progId === "paes" && (
                <article className="card-soft">
                  <label className="form-label">Ramos PAES</label>
                  <select
                    className="field"
                    value={paesRamos}
                    onChange={(e) => setPaesRamos(Number(e.target.value))}
                  >
                    {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "ramo" : "ramos"} — {clp(paesPriceForCount(n))}
                      </option>
                    ))}
                  </select>
                  <div className="tiny subtle mt6">Matrícula: {clp(PAES_ENR)} (pago único)</div>
                </article>
              )}

              {progId === "idiomas" && (
                <article className="card-soft">
                  <label className="form-label">Cursos de Idiomas</label>
                  <select
                    className="field"
                    value={idiomasCursos}
                    onChange={(e) => setIdiomasCursos(Number(e.target.value))}
                  >
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} curso{n > 1 ? "s" : ""} — {clp(computeLangBundle(n))}
                      </option>
                    ))}
                  </select>
                  <div className="tiny subtle mt6">Matrícula: {clp(IDIOMAS_ENR)} (pago único)</div>
                </article>
              )}

              {progId === "lsch" && (
                <article className="card-soft">
                  <label className="form-label">LSCh — Tipo de plan</label>
                  <div className="chip-row">
                    {["group", "one2one"].map((m) => (
                      <button
                        key={m}
                        className={"chip " + (lschMode === m ? "is-active" : "")}
                        onClick={() => {
                          setLschMode(m);
                          // reset plan al cambiar modo
                          if (m === "group") setLschPlanId(LSCH_GROUP_PLANS[1]?.id || "g-quarter");
                          if (m === "one2one") setLschPlanId(LSCH_ONE2ONE_PLANS[0]?.id || "o-month");
                        }}
                      >
                        {m === "group" ? "Grupal" : "1:1"}
                      </button>
                    ))}
                  </div>

                  {lschMode === "group" ? (
                    <>
                      <label className="form-label mt8">Plan grupal</label>
                      <select
                        className="field"
                        value={lschPlanId}
                        onChange={(e) => setLschPlanId(e.target.value)}
                      >
                        {LSCH_GROUP_PLANS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} — {clp(priceForGroupPlan(p, { church: lschConvenio }))}
                          </option>
                        ))}
                      </select>
                      {CHURCH_CONVENIO.enabled && (
                        <label className="check mt8">
                          <input
                            type="checkbox"
                            checked={lschConvenio}
                            onChange={(e) => setLschConvenio(e.target.checked)}
                          />
                          <span>
                            Convenio Iglesias ({clp(CHURCH_CONVENIO.monthlyFlat)}/mes) — requiere
                            acreditar iglesia.
                          </span>
                        </label>
                      )}
                    </>
                  ) : (
                    <>
                      <label className="form-label mt8">Plan 1:1</label>
                      <select
                        className="field"
                        value={lschPlanId}
                        onChange={(e) => setLschPlanId(e.target.value)}
                      >
                        {LSCH_ONE2ONE_PLANS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} — {clp(p.monthly)}
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  <div className="tiny subtle mt6">
                    Matrícula: {clp(LSCH_ENROLLMENT_FEE)} (pago único)
                  </div>
                </article>
              )}

              {progId === "homeschool" && (
                <article className="card-soft">
                  <label className="form-label">Homeschool — configuración</label>
                  <div className="grid grid-3-tight">
                    <div>
                      <div className="mini-lab">Modalidad</div>
                      <select
                        className="field"
                        value={hsMode}
                        onChange={(e) => setHsMode(e.target.value)}
                      >
                        {HS_MODES.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="mini-lab">Horas/sem</div>
                      <select
                        className="field"
                        value={hsHours}
                        onChange={(e) => setHsHours(Number(e.target.value))}
                      >
                        {HS_HOURS_CHOICES.map((h) => (
                          <option key={h.v} value={h.v}>
                            {h.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="mini-lab">Materias</div>
                      <select
                        className="field"
                        value={hsSubjects}
                        onChange={(e) => setHsSubjects(Number(e.target.value))}
                      >
                        {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="tiny subtle mt6">Matrícula: {clp(HS_ENR)} (pago único)</div>
                </article>
              )}

              {/* Ingresos / Mérito */}
              <article className="card-soft">
                <label className="form-label">Ingreso del hogar (CLP/mes)</label>
                <input
                  className="field"
                  inputMode="numeric"
                  placeholder="$0"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  onBlur={(e) => {
                    const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                    setIncome(v ? String(v) : "");
                  }}
                />
                <label className="form-label mt8">Personas en el hogar</label>
                <select
                  className="field"
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <div className="tiny subtle mt6">
                  Ingreso per cápita estimado: <b>{clp(Math.round(calc.perCapita) || 0)}</b>
                </div>
              </article>

              <article className="card-soft">
                <label className="form-label">Promedio (1.0–7.0)</label>
                <input
                  className="field"
                  inputMode="decimal"
                  placeholder="Ej: 6.2"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                />
                <div className="mini muted mt6">
                  Mérito aporta hasta +10% adicional (≥6.5).
                </div>

                <div className="opt-grid mt8">
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={flags.discapacidad}
                      onChange={(e) => setFlags((f) => ({ ...f, discapacidad: e.target.checked }))}
                    />
                    <span>Discapacidad (estudiante o responsable)</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={flags.rural}
                      onChange={(e) => setFlags((f) => ({ ...f, rural: e.target.checked }))}
                    />
                    <span>Residencia rural</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={flags.monoparental}
                      onChange={(e) => setFlags((f) => ({ ...f, monoparental: e.target.checked }))}
                    />
                    <span>Hogar monoparental</span>
                  </label>
                </div>
              </article>
            </div>

            {/* CTA */}
            <div className="cta-inline mt12">
              <a className="btn btn-primary" href={`https://wa.me/${WAPP}?text=${waText}`} target="_blank" rel="noreferrer">
                Postular por WhatsApp
              </a>
              <a className="btn btn-outline" href={mailto}>
                Postular por correo
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">
                Ir a Inscripción
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ======= Subcomponentes ======= */
function Row({ k, v }) {
  return (
    <div className="rowline">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </div>
  );
}

function programLine(id, ctx) {
  if (id === "paes") return `Ramos: ${ctx.paesRamos}\n`;
  if (id === "idiomas") return `Cursos: ${ctx.idiomasCursos}\n`;
  if (id === "lsch")
    return `LSCh: ${ctx.lschMode === "group" ? "Grupal" : "1:1"}${ctx.lschMode === "group" && ctx.lschConvenio ? " (Convenio Iglesias)" : ""}\n`;
  if (id === "homeschool")
    return `Homeschool: ${ctx.hsMode}, ${ctx.hsHours} h/sem, ${ctx.hsSubjects} materia(s)\n`;
  return "";
}

/* ======= CSS local ======= */
const css = `
:root{
  --blue:#3b549d; --green:#249554; --yellow:#f2ce3d; --rose:#d6a0c5;
  --bg:#0b1220; --panel:#0e1424; --bd:#1f2a44; --ink:#ffffff; --ink2:#eaf2ff;
  --ok:#16a34a; --rad:16px;
}
*{box-sizing:border-box}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.muted{ color:#cbd5e1 }
.mt4{ margin-top:4px } .mt6{ margin-top:6px } .mt8{ margin-top:8px } .mt12{ margin-top:12px }

.scholar-page .pill{
  background:#eef2ff; border:1px solid #dbeafe; color:#111827; padding:.25rem .6rem;
  border-radius:999px; font-weight:800;
}
.scholar-page .title{ margin:.2rem 0 .35rem; font-size:clamp(1.8rem, 3.6vw, 2.4rem); color:var(--ink) }
.scholar-page .lead{ color:var(--ink2) }

.hero{
  padding:22px 0 16px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(820px 300px at 8% -8%, rgba(59,84,157,.20), transparent 60%),
    radial-gradient(780px 280px at 94% -10%, rgba(36,149,84,.18), transparent 60%);
}
.hero__inner{ display:grid; grid-template-columns:1.05fr .95fr; gap:18px; align-items:center; }
@media (max-width:980px){ .hero__inner{ grid-template-columns:1fr } }
.hero__right .mini{ font-weight:800; color:#cbd5e1; margin-bottom:4px }

.card-float{
  border:1px solid var(--bd); border-radius:var(--rad); background:#0f172a; color:var(--ink);
  box-shadow:0 10px 24px rgba(16,24,40,.26);
}
.card-soft{
  border:1px solid var(--bd); border-radius:var(--rad); background:#0f172a; color:var(--ink); padding:12px;
}

.rowline{ display:flex; justify-content:space-between; gap:12px; padding:6px 0; }
.rowline .k{ color:#cbd5e1 }
.rowline .v{ font-weight:800 }
.ok{ color:var(--ok) }
.hr{ height:1px; background:#1e2a49; margin:8px 0 }

.chip-row{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{
  border:1px solid #c8cfe0; border-radius:999px; padding:.42rem .75rem;
  background: linear-gradient(180deg,#fff,#fafafa); color:#0b1220; font-weight:800;
}
.chip.is-active{
  border-color:#4f46e5; background: radial-gradient(120% 140% at -10% 0%, rgba(79,70,229,.12), transparent 60%), #fff;
}
@media (prefers-color-scheme: dark){
  .chip{ background:#0f172a; color:#eaf2ff; border-color:#2a3366; }
  .chip.is-active{ background:#0f1b3a; border-color:#6366f1; }
}
.field{
  width:100%; border:1px solid #2a3660; border-radius:12px; padding:.54rem .7rem; background:#0b1220; color:#eaf2ff;
}
.form-label{ font-weight:800; color:#eaf2ff }

.grid{ display:grid; gap:12px; }
.grid-2{ grid-template-columns: repeat(2, minmax(0,1fr)); }
.grid-3{ grid-template-columns: repeat(3, minmax(0,1fr)); }
.grid-3-tight{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:8px; }
@media (max-width:980px){ .grid-2,.grid-3, .grid-3-tight{ grid-template-columns:1fr; } }

.opt-grid{ display:grid; grid-template-columns:1fr; gap:8px; }
.check{ display:flex; align-items:center; gap:8px; }
.check input{ transform:scale(1.15); }

.block{ margin:18px 0; }
.cta-inline{ display:flex; gap:8px; flex-wrap:wrap; }

.btn{ display:inline-flex; align-items:center; gap:8px; padding:.62rem 1rem; border-radius:12px; border:1px solid #d6daf1; text-decoration:none; font-weight:800; }
.btn-primary{ background:var(--blue); color:#fff; border-color:var(--blue); }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#334155; }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:#334155; }
`;