// src/pages/Empresas.jsx
import { useMemo, useState, useEffect } from "react";
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

// Imágenes (ajusta paths si cambian)
import imgOnboarding from "../assets/img/lael/onboarding.jpg";
import imgInclusion  from "../assets/img/lael/inclusion.jpg";
import imgSoft       from "../assets/img/lael/soft.jpg";
import imgBootcamp   from "../assets/img/lael/bootcamp.jpg";
import imgCoaching   from "../assets/img/lael/coaching.jpg";
import logoAzul      from "../assets/img/Logos/lael-inst-azul.png";

/* Mapeo por línea */
const LINE_IMAGES = {
  ingles: imgOnboarding,
  lsch: imgInclusion,
  soft: imgSoft,
  bootcamp: imgBootcamp,
  coaching: imgCoaching,
};
const lineImageFor = (key = "") =>
  LINE_IMAGES[String(key).toLowerCase()] || imgOnboarding;

/* Badge meta */
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
          ? ` (sesiones presenciales en sede del cliente: ${q.mixedOnsiteSessions} por cohorte)`
          : ""
      }\n` +
      `Extras: ${form.addCert ? "Certificados, " : ""}${
        form.addMaterials ? "Materiales, " : ""
      }${form.addExecReport ? "Reporte ejecutivo" : ""}\n` +
      `Estimación: ${clp(q.total)} (valores +IVA)\n` +
      `¿Agendamos?`
  );

  useEffect(() => {
    document.title = "Empresas · Capacitación corporativa — Instituto Lael SpA";
  }, []);

  return (
    <section className="emp-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero-head">
        <div className="container hero-grid">
          <div className="hero-left">
            <img className="brand" src={logoAzul} alt="Instituto Lael" />
            <span className="badge brand-badge">Capacitación & Alianzas</span>
            <h1>Capacitación corporativa con impacto medible</h1>
            <p className="hero-sub">
              Inglés, LSCh, Soft Skills y Empleabilidad. <b>100% online</b> con
              opción de impartir <b>presencial en sus sedes</b> cuando el
              proyecto lo requiera. Diseñamos cohortes para mejorar{" "}
              <b>KPIs</b>, <b>retención</b> y <b>clima</b> con reportes ejecutivos.
            </p>

            <div className="cta-row">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
              >
                📋 Solicitar propuesta
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">
                🤝 Agendar reunión
              </Link>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="hero-mock">
              <div className="mbar" />
              <div className="mlines">
                <i className="l w80" />
                <i className="l w60" />
                <i className="l w90" />
              </div>
              <div className="mcards">
                <div className="mc blue">
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

      {/* TRUST BAR (logos/placeholder) */}
      <section className="trustbar container" aria-label="Instituciones que confían">
        <p className="muted">
          Empresas y colegios han confiado en nuestros programas online y mixtos.
        </p>
        <div className="logos" role="list">
          <span role="listitem" className="logo-placeholder">Colegio Alfa</span>
          <span role="listitem" className="logo-placeholder">Fundación Educar</span>
          <span role="listitem" className="logo-placeholder">Corporación Beta</span>
          <span role="listitem" className="logo-placeholder">Colegio Delta</span>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="block container">
        <header className="sec-head">
          <h2>Por qué elegir Lael Empresas</h2>
        </header>
        <div className="grid grid-3 why-cols">
          <div className="why-item">
            <h3>🎯 Diseño por competencias</h3>
            <p>
              Cohortes pequeñas, contenidos precisos y evaluación por logro.
            </p>
          </div>
          <div className="why-item">
            <h3>📊 Seguimiento ejecutivo</h3>
            <p>
              Asistencia, hitos y recomendaciones accionables para gerencias.
            </p>
          </div>
          <div className="why-item">
            <h3>🧾 Compliance y calidad</h3>
            <p>
              Contrato, facturación electrónica y resguardo de datos. Certificados y constancias.
            </p>
          </div>
        </div>
      </section>

      {/* PACKS */}
      <div className="container">
        <section className="block">
          <header className="sec-head">
            <h2>Soluciones sugeridas</h2>
            <p className="muted">Carga un pack y ajusta en el estimador.</p>
          </header>

          <div className="packs-grid">
            {EMP_PACKS.map((p) => {
              const line = SERVICE_LINES.find((l) => l.id === p.line) || SERVICE_LINES[0];
              const bgImg = lineImageFor(p.line);

              return (
                <article
                  key={p.id}
                  className="pack-card"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,10,20,.78), rgba(5,10,20,.88)), url(${bgImg})`,
                    "--accent": line.brandColor,
                  }}
                >
                  <div className="pack-top">
                    <span className="pill">{p.tag}</span>
                    <span className="dot" style={{ background: line.brandColor }} />
                  </div>
                  <h3>{p.title}</h3>
                  <p className="subtle">{p.subtitle}</p>
                  <ul className="bullets">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>

                  <div className="actions">
                    <button
                      className="btn btn-primary"
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
                      className="btn btn-ghost"
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
              {/* Área */}
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
              </div>

              {/* Duración */}
              <div className="card">
                <div className="label accent">Duración</div>
                <select
                  className="field"
                  value={form.durationUnit}
                  onChange={(e) => setField("durationUnit", e.target.value)}
                >
                  <option value="months">Meses</option>
                  <option value="weeks">Semanas</option>
                </select>
                <div className="row2 mt6">
                  <div className="c">
                    <div className="label small">{form.durationUnit === "months" ? "Meses" : "Semanas"}</div>
                    <select
                      className="field"
                      value={form.durationValue}
                      onChange={(e) => setField("durationValue", Number(e.target.value))}
                    >
                      {(form.durationUnit === "months" ? UI_OPTIONS.months : UI_OPTIONS.weeks).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
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

                {form.modality === "mixed" && (
                  <div className="mt6">
                    <div className="label small">
                      Sesiones presenciales en sede del cliente (máx. {PRICING.mixedMaxOnsiteSessions})
                    </div>
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
                      Logística: {clp(PRICING.mixedPerOnsiteSessionFlat)} / sesión / cohorte
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="est-foot">
              <div className="left"><div className="tiny subtle">Valores +IVA</div></div>
              <div className="right" role="status" aria-live="polite">
                <div className="tiny subtle">Estimación</div>
                <div className="total">{clp(q.total)}</div>
                <div className="tiny subtle">Enviamos propuesta formal por correo en 24h hábiles.</div>
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
            </div>
          </div>
        </section>

        {/* QA & COMPLIANCE (compacto) */}
        <section className="block faq">
          <details className="card">
            <summary>Metodología & QA</summary>
            <ul className="why">
              <li><b>Diseño por competencias</b>: contenidos precisos, sin relleno.</li>
              <li><b>Rúbricas y QA</b>: estándares por sesión y observación docente.</li>
              <li><b>Seguimiento ejecutivo</b>: asistencia e hitos accionables.</li>
              <li><b>Inclusión real</b>: programas LSCh con enfoque humano y medible.</li>
            </ul>
          </details>

          <details className="card">
            <summary>Compliance & Facturación</summary>
            <ul className="why">
              <li>Contrato y <b>términos de servicio</b> por programa.</li>
              <li><b>Facturación electrónica</b> y reportes para auditoría.</li>
              <li><b>Política de datos</b> y NDA bajo solicitud.</li>
              <li>Certificados y <b>constancias</b> por participante.</li>
            </ul>
          </details>
        </section>

        {/* FOOTER */}
        <footer className="corp-footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} Instituto Lael SpA — RUT 78.084.019-6 ·
              Capacitación corporativa online y presencial en sede del cliente.
              Contacto directo: <b>educacion.institutolael@gmail.com</b>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

/* ====================== CSS local ====================== */
const css = `
:root{
  --bg:#0B1220; --panel:#0E1529; --bd:#223052;
  --ink:#fff; --ink2:#E6EDFF;
  --amber:#FFD266; --blue:#3B56FF; --green:#10B981;
  --shadow:0 18px 36px rgba(2,6,23,.4); --rad:18px;
}

.emp-page{background:var(--bg);color:var(--ink);}
.container{max-width:1120px;margin:0 auto;padding:0 18px;}
.block{margin:24px 0;}
.muted{color:var(--ink2);opacity:.9;}
h1,h2,h3{color:#fff;margin:0;}

.btn{display:inline-flex;align-items:center;gap:8px;
  padding:.7rem 1rem;border-radius:12px;font-weight:900;text-decoration:none;
  border:2px solid transparent;cursor:pointer;transition:all .15s ease;}
.btn-primary{background:var(--amber);color:#0B1220;
  box-shadow:0 8px 22px rgba(245,158,11,.28);}
.btn-primary:hover{box-shadow:0 10px 26px rgba(245,158,11,.4);transform:translateY(-1px);}
.btn-ghost{background:transparent;color:#E8EEFF;border-color:#2A3B64;}
.btn-ghost:hover{background:#0E1529;}

/* HERO */
.hero-head{
  background:linear-gradient(135deg,#0E162E 0%,#1B1F3B 100%);
  padding:40px 0;border-bottom:1px solid var(--bd);
}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;align-items:center;}
@media(max-width:900px){.hero-grid{grid-template-columns:1fr}}
.brand{height:48px;margin-bottom:8px;}
.brand-badge{display:inline-block;padding:.25rem .6rem;border-radius:999px;background:#12204B;color:#E6EDFF;font-weight:900;}
.hero-sub{max-width:62ch;color:var(--ink2);}
.cta-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;}

/* Hero mock */
.hero-right .hero-mock{
  border:1px solid var(--bd);border-radius:18px;padding:16px;
  background:linear-gradient(180deg,#0F172A,#0B1220);box-shadow:var(--shadow);
}
.mbar{height:10px;border-radius:8px;background:#101A2F;margin-bottom:10px;}
.mlines .l{display:block;height:8px;border-radius:8px;background:#0f172a;margin:8px 0;}
.mlines .w80{width:80%}.mlines .w60{width:60%}.mlines .w90{width:90%}
.mcards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px;}
.mc{border:1px solid var(--bd);border-radius:14px;padding:12px;background:#0f172a;color:#fff}
.mc b{display:block;font-size:.96rem}
.mc span{font-size:.88rem;color:#EAF2FF}
.mc.blue b{color:#9DB4FF}
.mc.green b{color:#10B981}
.mc.amber b{color:#FFD266}

/* Trust bar */
.trustbar{margin:22px auto 0;border:1px solid var(--bd);border-radius:14px;padding:10px 12px;
  background:linear-gradient(180deg,#0F172A,#0B1220);display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.trustbar .logos{display:flex;gap:12px;flex-wrap:wrap}
.trustbar .logo-placeholder{padding:.35rem .6rem;border-radius:10px;border:1px solid #24355f;color:#CFE3FF;font-weight:800}

/* Why choose */
.why-cols .why-item{border:1px solid var(--bd);border-radius:14px;padding:14px;background:linear-gradient(180deg,#0F172A,#0B1220)}
.why-cols h3{margin:0 0 .25rem}
.why-cols p{margin:0;color:var(--ink2)}

/* Packs */
.packs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media(max-width:860px){.packs-grid{grid-template-columns:1fr}}
.pack-card{
  position:relative;min-height:220px;border-radius:16px;overflow:hidden;color:#fff;padding:14px;
  display:flex;flex-direction:column;justify-content:flex-end;border:1px solid #31456f;background-size:cover;background-position:center 25%;
  box-shadow:var(--shadow)
}
.pack-top{display:flex;align-items:center;gap:10px;margin-bottom:6px}
.pack-card .pill{display:inline-block;padding:.22rem .5rem;border-radius:999px;font-weight:900;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.6)}
.pack-card .dot{width:10px;height:10px;border-radius:999px;margin-left:auto}
.pack-card h3{margin:.05rem 0 .1rem;font-size:1.06rem;text-shadow:0 1px 0 rgba(0,0,0,.35)}
.pack-card .subtle{text-shadow:0 1px 0 rgba(0,0,0,.35)}
.pack-card .bullets{margin:.2rem 0 .6rem;padding-left:18px;color:#E8EEFF}
.pack-card .bullets li::marker{color:#FFD266}
.pack-card .actions{display:flex;gap:10px;flex-wrap:wrap}

/* Estimador */
.est-card{
  border:1px solid var(--bd);border-radius:18px;padding:14px;color:var(--ink);
  background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.018)),linear-gradient(180deg,#0F172A,#0B1220);
  box-shadow:var(--shadow)
}
.est-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
.est-head h2{margin:0;font-size:1.06rem}
.meta-badge{display:inline-flex;align-items:center;gap:6px;border:1px dashed currentColor;border-radius:999px;padding:.25rem .6rem;font-size:.82rem}
.est-meta{display:flex;gap:8px;flex-wrap:wrap}

.grid{display:grid;gap:12px}
.grid-4{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(max-width:980px){.grid-4{grid-template-columns:1fr}}

.card{border:1px solid var(--bd);border-radius:14px;background:linear-gradient(180deg,#0F172A,#0B1220);padding:12px}

/* Labels, fields, chips */
.label{font-weight:900;margin-bottom:6px;color:#E8EEFF;position:relative;display:block}
.label.accent::after{content:"";display:block;width:38px;height:3px;border-radius:2px;margin-top:4px;background:linear-gradient(90deg,#3B56FF,#10B981)}
.label.small{font-weight:800;font-size:.92rem;color:#E8EEFF}
.field{width:100%;border:1px solid #344169;border-radius:12px;padding:.7rem .9rem;background:#0F172A;color:#EAF2FF}
.mt6{margin-top:6px}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:520px){.row2{grid-template-columns:1fr}}

.chip-row{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid #344169;border-radius:999px;padding:.42rem .75rem;background:#0F172A;color:#EAF2FF;font-weight:900;font-size:.92rem;display:inline-flex;align-items:center;gap:8px;transition:.15s ease}
.chip.on{border-color:#9DB4FF;box-shadow:0 0 0 2px rgba(59,86,255,.28) inset,0 0 0 2px rgba(59,86,255,.18)}
.chip-line{--accent:#3B56FF;border-color:color-mix(in srgb,var(--accent),#344169 40%)}
.chip-line.on{background:radial-gradient(120% 140% at -10% 0%,color-mix(in srgb,var(--accent),#ffffff 72%),transparent 60%),#0F172A;border-color:color-mix(in srgb,var(--accent),#8da2fb 40%)}
.chip-line .dot{width:10px;height:10px;border-radius:999px}

/* Hints */
.hint{font-size:.82rem;color:#C3D0FF;margin-top:.25rem}
.subtle{color:#C3D0FF}

/* Estimador — pie */
.est-foot{margin-top:8px;padding-top:10px;border-top:1px solid var(--bd);display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.total{font-size:1.8rem;font-weight:1000;color:#10B981;text-shadow:0 0 2px rgba(0,0,0,.2)}
.cta-row.end{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;margin-top:10px}

/* FAQ (details) */
.faq details{background:linear-gradient(180deg,#0F172A,#0B1220);border:1px solid var(--bd);border-radius:14px;padding:10px}
.faq details+details{margin-top:10px}
.faq summary{cursor:pointer;font-weight:900;color:#E8EEFF;list-style:none}
.faq summary::-webkit-details-marker{display:none}
.why{margin:.2rem 0 0;padding-left:18px;color:#E6EDFF}

/* Footer */
.corp-footer{margin:28px 0 10px;color:#CFE3FF}
.corp-footer p{margin:0;font-size:.92rem}

/* Focus */
button:focus-visible,.btn:focus-visible,select:focus-visible{outline:3px solid #22D3EE;outline-offset:2px}

/* Select arrows (tweaks menores) */
.field::-ms-expand{display:none}
`;