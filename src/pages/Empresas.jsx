// src/pages/Empresas.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  SERVICE_LINES,
  EMP_PACKS,
  PRICING,
  UI_OPTIONS,
  calcQuote,
  clp,
  WAPP_INTL,
} from "../data/empresas.js";

// Imágenes para PACKS (en /assets/img/lael/)
import imgOnboarding from "../assets/img/lael/onboarding.jpg";
import imgInclusion  from "../assets/img/lael/inclusion.jpg";
import imgSoft       from "../assets/img/lael/soft.jpg";
import imgBootcamp   from "../assets/img/lael/bootcamp.jpg";
import imgCoaching   from "../assets/img/lael/coaching.jpg";

// Logo (elige color: -amarillo -azul -blanco -naranjo -negro -rosa -verde)
import logoAzul from "../assets/img/Logos/lael-inst-azul.png";

/* --- Mapeo robusto de imágenes por línea (incluye sinónimos) --- */
const LINE_IMAGES = {
  ingles:       imgOnboarding,
  language:     imgOnboarding,
  onboarding:   imgOnboarding,

  lsch:         imgInclusion,
  inclusion:    imgInclusion,
  señas:        imgInclusion,

  soft:         imgSoft,
  softskills:   imgSoft,
  habilidades:  imgSoft,

  bootcamp:     imgBootcamp,
  bootcamps:    imgBootcamp,
  empleabilidad:imgBootcamp,   // por si tu data usa este id

  coaching:     imgCoaching,
};

function lineImageFor(key = "") {
  const k = String(key).toLowerCase();
  return LINE_IMAGES[k] || imgOnboarding;
}

function Badge({ label, value, color = "#64748b" }) {
  return (
    <span className="meta-badge" style={{ borderColor: color, color }}>
      <strong>{label}:</strong> {value}
    </span>
  );
}

export default function Empresas() {
  const [form, setForm] = useState({
    lineId: "ingles",
    headcount: 20,

    durationUnit: "months", // "months" | "weeks"
    durationValue: 1,
    sessionsPerWeek: 2,
    hoursPerSession: 1.5,

    modality: "online", // "online" | "mixed" | "onsite"
    mixedOnsiteSessions: 0,

    addCert: false,
    addMaterials: true,
    addExecReport: true,
  });

  const q = useMemo(() => calcQuote(form), [form]);
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const currLine =
    SERVICE_LINES.find((l) => l.id === form.lineId) || SERVICE_LINES[0];

  const waText = encodeURIComponent(
    `Hola 👋, quiero una propuesta corporativa.\n` +
      `Área: ${q.line.label}\n` +
      `Personas: ${q.headcount} (cohortes: ${q.cohorts} × máx ${q.cohortMax})\n` +
      `Duración: ${
        form.durationUnit === "months"
          ? `${form.durationValue} mes(es)`
          : `${form.durationValue} semana(s)`
      } · ${q.sessionsPerWeek} ses/sem · ${q.hoursPerSession} h/ses → ${q.hoursTotal.toFixed(
        1
      )} h totales\n` +
      `Modalidad: ${form.modality}${
        form.modality === "mixed"
          ? ` (presenciales: ${q.mixedOnsiteSessions} por cohorte)`
          : ""
      }\n` +
      `Extras: ${form.addCert ? "Certificados, " : ""}${
        form.addMaterials ? "Materiales, " : ""
      }${form.addExecReport ? "Reporte ejecutivo" : ""}\n` +
      `Estimación: ${clp(q.total)} (valores +IVA)\n` +
      `¿Agendamos?`
  );

  return (
    <section className="emp-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero-head">
        <div className="container hero-grid">
          <div className="hero-left">
            <img className="brand" src={logoAzul} alt="Instituto Lael" />
            <span className="badge brand-badge">Capacitación & Alianzas</span>
            <h1>Programas corporativos que mueven KPI</h1>
            <p className="hero-sub">
              Inglés, LSCh, Soft Skills, <b>Empleabilidad</b> y Coaching. Online, Presencial o Mixto
              (hasta {PRICING.mixedMaxOnsiteSessions} presenciales). Cohortes inteligentes para
              maximizar <b>calidad, cobertura y costo</b>.
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar propuesta
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">Agendar reunión</Link>
            </div>
          </div>
          <div className="hero-right" aria-hidden>
            <div className="hero-mock">
              <div className="mbar" />
              <div className="mlines">
                <i className="l w80" /><i className="l w60" /><i className="l w90" />
              </div>
              <div className="mcards">
                <div className="mc indigo">
                  <b>Seguimiento</b>
                  <span>Reporte ejecutivo</span>
                </div>
                <div className="mc green">
                  <b>Clases en vivo</b>
                  <span>Grabaciones + cápsulas</span>
                </div>
                <div className="mc amber">
                  <b>KPIs</b>
                  <span>Asistencia y hitos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* PACKS DESTACADOS */}
        <section className="block">
          <header className="sec-head">
            <h2>Soluciones sugeridas</h2>
            <p className="muted">Punto de partida: carga un pack y ajusta en el estimador.</p>
          </header>

          <div className="packs-grid">
            {EMP_PACKS.map((p) => {
              const line = SERVICE_LINES.find((l) => l.id === p.line) || SERVICE_LINES[0];
              const bgImg = lineImageFor(p.line);

              return (
                <article
                  className="pack-card"
                  key={p.id}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,10,20,.45), rgba(5,10,20,.78)), url(${bgImg})`,
                    "--accent": line.brandColor,
                  }}
                >
                  <div className="pack-top">
                    <span className="pill">{p.tag}</span>
                    <span className="dot" style={{ background: line.brandColor }} />
                  </div>
                  <h3>{p.title}</h3>
                  <p className="subtle text-white-90">{p.subtitle}</p>
                  <ul className="bullets">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>

                  <div className="actions">
                    <button
                      className="btn btn-light-ghost"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          lineId: p.line,
                          headcount: Math.max(f.headcount, p.baseAudience || 12),
                        }))
                      }
                    >
                      Cargar en estimador
                    </button>
                    <button
                      className="btn btn-light-outline"
                      onClick={() => setField("modality", "mixed")}
                    >
                      Probar mixto
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ESTIMADOR */}
        <section className="block">
          <div className="est-card">
            <div className="est-head">
              <h2>Estimador rápido</h2>
              <div className="est-meta">
                <Badge label="Área" value={q.line.label} color={currLine.brandColor} />
                <Badge label="Cohortes" value={`${q.cohorts} × máx ${q.cohortMax}`} />
                <Badge label="Horas totales" value={`${q.hoursTotal.toFixed(1)} h`} />
              </div>
            </div>

            <div className="grid grid-4">
              {/* Área del programa (antes: Línea) */}
              <div className="card">
                <div className="label accent">Área del programa</div>
                <div className="chip-row">
                  {SERVICE_LINES.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      className={"chip chip-line " + (l.id === form.lineId ? "on" : "")}
                      style={{ "--accent": l.brandColor }}
                      aria-pressed={l.id === form.lineId}
                      onClick={() => setField("lineId", l.id)}
                    >
                      <span className="dot" style={{ background: l.brandColor }} />
                      <span className="txt">{l.label}</span>
                      {l.id === form.lineId && <span className="check">✓</span>}
                    </button>
                  ))}
                </div>
                <div className="hint">Selecciona el foco (Inglés, LSCh, Soft Skills, etc.).</div>
                <div className="tiny subtle mt6">
                  Tarifa base:&nbsp;
                  <b>
                    {clp(
                      form.modality === "onsite"
                        ? currLine.publicPphOnsite
                        : currLine.publicPphOnline
                    )}
                  </b>{" "}
                  por persona / hora
                </div>
              </div>

              {/* Personas */}
              <div className="card">
                <div className="label accent">Personas</div>
                <select
                  className="field"
                  value={form.headcount}
                  onChange={(e) => setField("headcount", Number(e.target.value))}
                >
                  {UI_OPTIONS.headcountPresets.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <div className="hint">Escalamos en cohortes según tamaño.</div>
                <div className="tiny subtle mt6">
                  Cohortes sugeridas: <b>{q.cohorts}</b> × máx {q.cohortMax}
                </div>
              </div>

              {/* Duración */}
              <div className="card">
                <div className="label accent">Unidad de duración</div>
                <select
                  className="field"
                  value={form.durationUnit}
                  onChange={(e) => setField("durationUnit", e.target.value)}
                >
                  <option value="months">Meses</option>
                  <option value="weeks">Semanas</option>
                </select>
                <div className="hint">Piensa por meses o semanas.</div>
                <div className="row2 mt6">
                  <div className="c">
                    <div className="label small">{
                      form.durationUnit === "months" ? "Meses" : "Semanas"
                    }</div>
                    <select
                      className="field"
                      value={form.durationValue}
                      onChange={(e) => setField("durationValue", Number(e.target.value))}
                    >
                      {(form.durationUnit === "months" ? UI_OPTIONS.months : UI_OPTIONS.weeks).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="tiny subtle">
                      {form.durationUnit === "months"
                        ? `≈ ${(form.durationValue * UI_OPTIONS.weeksPerMonth).toFixed(1)} semanas`
                        : "Define la extensión"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sesiones/Horas */}
              <div className="card">
                <div className="row2">
                  <div className="c">
                    <div className="label accent">Sesiones por semana</div>
                    <select
                      className="field"
                      value={form.sessionsPerWeek}
                      onChange={(e) => setField("sessionsPerWeek", Number(e.target.value))}
                    >
                      {UI_OPTIONS.sessionsPerWeek.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="hint">Frecuencia semanal.</div>
                  </div>
                  <div className="c">
                    <div className="label accent">Horas por sesión</div>
                    <select
                      className="field"
                      value={form.hoursPerSession}
                      onChange={(e) => setField("hoursPerSession", Number(e.target.value))}
                    >
                      {UI_OPTIONS.hoursPerSession.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="hint">Duración de cada sesión.</div>
                  </div>
                </div>
              </div>

              {/* Modalidad */}
              <div className="card">
                <div className="label accent">Modalidad</div>
                <div className="chip-row">
                  {["online", "mixed", "onsite"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={"chip " + (form.modality === m ? "on" : "")}
                      aria-pressed={form.modality === m}
                      onClick={() => setField("modality", m)}
                    >
                      <span className="txt">
                        {m === "online" ? "Online" : m === "mixed" ? "Mixto" : "Presencial"}
                      </span>
                      {form.modality === m && <span className="check">✓</span>}
                    </button>
                  ))}
                </div>
                <div className="hint">Mixto permite sesiones presenciales.</div>

                {form.modality === "mixed" && (
                  <div className="mt6">
                    <div className="label small">Sesiones presenciales (máx. {PRICING.mixedMaxOnsiteSessions})</div>
                    <select
                      className="field"
                      value={form.mixedOnsiteSessions}
                      onChange={(e) => setField("mixedOnsiteSessions", Number(e.target.value))}
                    >
                      {Array.from({ length: PRICING.mixedMaxOnsiteSessions + 1 }, (_, i) => i).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <div className="tiny subtle">
                      Flat logística: {clp(PRICING.mixedPerOnsiteSessionFlat)} / sesión / cohorte
                    </div>
                  </div>
                )}
              </div>

              {/* Extras */}
              <div className="card">
                <div className="label accent">Extras</div>
                <div className="chip-row">
                  <label className={"chip " + (form.addCert ? "on" : "")}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={form.addCert}
                      onChange={(e) => setField("addCert", e.target.checked)}
                    />
                    <span className="txt">Certificados (+{clp(PRICING.certificatePerPerson)}/p)</span>
                    {form.addCert && <span className="check">✓</span>}
                  </label>
                  <label className={"chip " + (form.addMaterials ? "on" : "")}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={form.addMaterials}
                      onChange={(e) => setField("addMaterials", e.target.checked)}
                    />
                    <span className="txt">Materiales (+{clp(PRICING.materialsPerPerson)}/p)</span>
                    {form.addMaterials && <span className="check">✓</span>}
                  </label>
                  <label className={"chip " + (form.addExecReport ? "on" : "")}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={form.addExecReport}
                      onChange={(e) => setField("addExecReport", e.target.checked)}
                    />
                    <span className="txt">Reporte ejecutivo (+{clp(PRICING.executiveReportFlat)})</span>
                    {form.addExecReport && <span className="check">✓</span>}
                  </label>
                </div>
                <div className="hint">Suma valor para gerencias y compliance.</div>
              </div>
            </div>

            <div className="est-foot">
              <div className="left">
                <div className="tiny subtle">
                  Extras: Certificados {q.extrasBreakdown.certificates ? clp(q.extrasBreakdown.certificates) : "—"} · Materiales{" "}
                  {q.extrasBreakdown.materials ? clp(q.extrasBreakdown.materials) : "—"} · Reporte{" "}
                  {q.extrasBreakdown.executiveReport ? clp(q.extrasBreakdown.executiveReport) : "—"}{" "}
                  {form.modality === "mixed" ? `· Mixto: ${clp(q.extrasBreakdown.mixedOnsiteFlat)}` : ""}
                </div>
              </div>
              <div className="right">
                <div className="tiny subtle">Estimación</div>
                <div className="total">{clp(q.total)}</div>
                <div className="tiny subtle">Valores +IVA. Propuesta en 24h hábiles.</div>
              </div>
            </div>

            <div className="cta-row end">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar propuesta por WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">Agendar reunión</Link>
            </div>
          </div>
        </section>

        {/* Diferenciales */}
        <section className="block">
          <div className="card why-card">
            <div className="label accent">¿Por qué Lael?</div>
            <ul className="why">
              <li><b>Diseño por competencias</b>: foco en KPI y resultados, sin relleno.</li>
              <li><b>Seguimiento ejecutivo</b>: reportes accionables y trazabilidad.</li>
              <li><b>Inclusión real</b>: programas LSCh con cultura humana y respetuosa.</li>
              <li><b>Escalabilidad</b>: cohortes para equilibrar aprendizaje, cobertura y costo.</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ====== CSS local (oscuro + paleta Lael + etiquetas con acento) ====== */
const css = `
:root{
  /* Paleta Lael */
  --lael-blue:#3b549d;
  --lael-green:#249554;
  --lael-yellow:#f2ce3d;
  --lael-rose:#d6a0c5;
  --lael-warn:#cd5732;

  /* Base dark */
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#22304d;
  --ink:#ffffff; --ink-2:#eaf2ff;
  --rad:16px; --shadow:0 18px 36px rgba(2,6,23,.28);
}

*{box-sizing:border-box}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.block{ margin:22px 0; }
.muted{ color:var(--ink-2); opacity:.92; }
.mt6{ margin-top:6px; }
.hidden{ position:absolute; opacity:0; pointer-events:none; }

h1,h2,h3{ color:var(--ink); }

/* HERO */
.hero-head{
  padding:26px 0; color:var(--ink);
  background:
    radial-gradient(880px 320px at 10% -10%, color-mix(in srgb, var(--lael-blue) 28%, transparent), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, color-mix(in srgb, var(--lael-green) 18%, transparent), transparent 60%),
    linear-gradient(180deg,var(--bg),var(--panel));
  border-bottom:1px solid var(--bd);
}
.hero-grid{ display:grid; grid-template-columns: 1.08fr .92fr; gap:24px; align-items:center; }
@media (max-width:980px){ .hero-grid{ grid-template-columns:1fr; } }
.brand{ height:42px; object-fit:contain; display:block; margin-bottom:8px; }
.brand-badge{
  display:inline-block; padding:.24rem .6rem; border-radius:999px; font-weight:900;
  background: #101a2f; border:1px solid #1f2a44; color:#e5e7eb;
}
.hero-left h1{ margin:.4rem 0 .3rem; font-size: clamp(1.6rem, 2.8vw + .5rem, 2.2rem); }
.hero-sub{ margin:0; color:var(--ink-2); max-width:64ch; }
.cta-row{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }

.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.68rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:1000;
  transition:.18s transform ease, .18s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--lael-blue); color:#fff; border-color:var(--lael-blue); }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:#344169; }

/* HERO mock */
.hero-right .hero-mock{
  border:1px solid var(--bd); border-radius:18px; padding:16px; background: linear-gradient(180deg,var(--bg),var(--panel));
  box-shadow:var(--shadow);
}
.mbar{ height:10px; border-radius:8px; background:#101a2f; margin-bottom:10px; }
.mlines .l{ display:block; height:8px; border-radius:8px; background:#0f172a; margin:8px 0; }
.mlines .w80{ width:80% } .mlines .w60{ width:60% } .mlines .w90{ width:90% }
.mcards{ display:grid; grid-template-columns: repeat(3,1fr); gap:10px; margin-top:10px; }
.mc{ border:1px solid var(--bd); border-radius:14px; padding:12px; background:#0f172a; color:#fff; }
.mc b{ display:block; font-size:.96rem; }
.mc span{ font-size:.88rem; color:#eaf2ff; opacity:.95; }
.mc.indigo b{ color:var(--lael-rose); }
.mc.green b{ color:var(--lael-green); }
.mc.amber b{ color:var(--lael-yellow); }

/* PACKS */
.packs-grid{
  display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px;
}
@media (max-width:860px){ .packs-grid{ grid-template-columns:1fr; } }

.pack-card{
  position:relative; min-height: 220px;
  border-radius:16px; overflow:hidden; color:#fff; padding:14px; display:flex; flex-direction:column; justify-content:flex-end;
  border:1px solid color-mix(in srgb, var(--accent, var(--lael-blue)), #e5e7eb 70%);
  background-size:cover; background-position:center; box-shadow:var(--shadow);
}
.pack-top{ display:flex; align-items:center; gap:10px; margin-bottom:6px; }
.pack-card .pill{
  display:inline-block; padding:.22rem .5rem; border-radius:999px; font-weight:900;
  background: color-mix(in srgb, var(--accent), #ffffff 28%); border:1px solid color-mix(in srgb, var(--accent), #ffffff 55%);
}
.pack-card .dot{ width:10px; height:10px; border-radius:999px; margin-left:auto; }
.pack-card h3{ margin:.05rem 0 .1rem; font-size:1.06rem; text-shadow:0 1px 0 rgba(0,0,0,.35); }
.pack-card .subtle{ text-shadow:0 1px 0 rgba(0,0,0,.35); }
.pack-card .bullets{ margin:.2rem 0 .6rem; padding-left:18px; color:rgba(255,255,255,.92); }
.pack-card .actions{ display:flex; gap:10px; flex-wrap:wrap; }
.btn-light-ghost{
  background:transparent; color:#fff; border:1px solid rgba(255,255,255,.7); border-radius:12px; padding:.56rem .9rem; font-weight:900;
}
.btn-light-ghost:hover{ background:rgba(255,255,255,.08); }
.btn-light-outline{
  background:transparent; color:#fff; border:1px dashed rgba(255,255,255,.6); border-radius:12px; padding:.56rem .9rem; font-weight:900;
}

/* ESTIMADOR */
.est-card{
  border:1px solid var(--bd); border-radius:18px; padding:14px; background:
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.018)),
    linear-gradient(180deg, #0f172a, #0b1220);
  color:var(--ink); box-shadow:var(--shadow);
}
.est-head{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
.est-head h2{ margin:0; font-size:1.06rem; }
.meta-badge{
  display:inline-flex; align-items:center; gap:6px;
  border:1px dashed currentColor; border-radius:999px;
  padding:.25rem .6rem; font-size:.82rem;
}
.est-meta{ display:flex; gap:8px; flex-wrap:wrap; }

.grid{ display:grid; gap:12px; }
.grid-4{ grid-template-columns: repeat(2, minmax(0,1fr)); }
@media (max-width:980px){ .grid-4{ grid-template-columns:1fr; } }

.card{
  border:1px solid var(--bd); border-radius:14px; background:linear-gradient(180deg,#0f172a,#0b1220);
  padding:12px;
}

/* Etiquetas con acento (no grises) */
.label{
  font-weight:900; margin-bottom:6px; color:var(--ink); position:relative; display:block;
}
.label.accent::after{
  content:""; display:block; width:38px; height:3px; border-radius:2px; margin-top:4px;
  background: linear-gradient(90deg, var(--lael-blue), var(--lael-green));
}
.label.small{ font-weight:800; font-size:.92rem; color:var(--ink); }

.field{
  width:100%; border:1px solid #344169; border-radius:12px; padding:.56rem .8rem; background:#0f172a; color:#eaf2ff;
}
.row2{ display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
@media (max-width:520px){ .row2{ grid-template-columns:1fr; } }

/* Chips */
.chip-row{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{
  border:1px solid #344169; border-radius:999px; padding:.42rem .75rem;
  background:#0f172a; color:#eaf2ff; font-weight:900; font-size:.92rem; display:inline-flex; align-items:center; gap:8px;
  transition:.15s ease; position:relative;
}
.chip:hover{ transform: translateY(-1px); box-shadow:0 6px 14px rgba(16,24,40,.18); }
.chip .check{ font-weight:1000; }
.chip.on{
  border-color: var(--lael-blue);
  box-shadow:0 0 0 2px rgba(59,84,157,.28) inset; background:#101b34;
}
.chip-line{
  --accent: var(--lael-blue);
  border-color: color-mix(in srgb, var(--accent), #344169 40%);
}
.chip-line.on{
  background: radial-gradient(120% 140% at -10% 0%, color-mix(in srgb, var(--accent), #ffffff 72%), transparent 60%), #0f172a;
  border-color: color-mix(in srgb, var(--accent), #8da2fb 40%);
}
.chip-line .dot{ width:10px; height:10px; border-radius:999px; }
.chip .txt{ line-height:1; }

/* hints */
.hint{ font-size:.82rem; color:#9fb0d1; margin-top:.25rem; }
.subtle{ color:#9fb0d1; }
.text-white-90{ color:rgba(255,255,255,.9); }

/* Estimador — pie */
.est-foot{
  margin-top:8px; padding-top:10px; border-top:1px solid var(--bd);
  display:flex; align-items:flex-end; justify-content:space-between; gap:12px;
}
.total{ font-size:1.8rem; font-weight:1000; color:var(--lael-green); }
.cta-row.end{ display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; margin-top:10px; }

/* Why */
.why-card{ box-shadow:var(--shadow); }
.why{ margin:.2rem 0 0; padding-left:18px; color:var(--ink-2); }

/* Focus */
button:focus-visible, .btn:focus-visible, select:focus-visible{
  outline:2px solid var(--lael-yellow); outline-offset:2px;
}
`;