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
  empleabilidad:imgBootcamp,

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
            <h1>Capacitación corporativa con impacto real</h1>
            <p className="hero-sub">
              Formación en <b>Inglés, LSCh, Habilidades Blandas y Empleabilidad</b>,
              diseñada para mejorar el desempeño y el clima organizacional.
              <b> 100% online</b> con posibilidad de dictarse en sede del cliente.
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Solicitar propuesta por WhatsApp"
              >
                Solicitar propuesta
              </a>
              <Link className="btn btn-ghost" to="/inscripcion" aria-label="Agendar reunión de diagnóstico">
                Reunión de diagnóstico
              </Link>
            </div>
          </div>

          {/* Mock simple (sin claims ni logos externos) */}
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
        {/* POR QUÉ ELEGIR */}
        <section className="block">
          <header className="sec-head">
            <h2>Qué ofrecemos</h2>
          </header>

          <div className="why3">
            <article className="why3-card">
              <div className="why3-title">🎯 Formación adaptada</div>
              <p className="muted">Programas modulares según nivel, rubro y objetivos de la empresa.</p>
            </article>

            <article className="why3-card">
              <div className="why3-title">💻 Flexibilidad total</div>
              <p className="muted">Modalidades online o mixtas, con sesiones en vivo y cápsulas grabadas.</p>
            </article>

            <article className="why3-card">
              <div className="why3-title">📊 Seguimiento ejecutivo</div>
              <p className="muted">Reportes de avance, asistencia e indicadores de cumplimiento por cohorte.</p>
            </article>
          </div>
        </section>

        {/* PACKS DESTACADOS */}
        <section className="block">
          <header className="sec-head">
            <h2>Programas destacados</h2>
            <p className="muted">Selecciona un programa base y ajusta según tus necesidades.</p>
          </header>

          <div className="packs-grid">
            {EMP_PACKS.map((p) => {
              const line = SERVICE_LINES.find((l) => l.id === p.line) || SERVICE_LINES[0];
              const bgImg = lineImageFor(p.line);
              return (
                <article
                  className="pack-card simple"
                  key={p.id}
                  style={{ "--accent": line.brandColor }}
                >
                  <h3>{p.title}</h3>
                  <p className="muted">{p.subtitle}</p>
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
                    {bgImg && <span className="img-hint" data-src={bgImg} />}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ESTIMADOR */}
        <section className="block">
          <header className="sec-head">
            <h2>Calcula tu inversión estimada</h2>
          </header>

          <div className="est-card">
            <div className="grid grid-4">
              {/* Área del programa */}
              <div className="card">
                <div className="label accent">Área</div>
                <select
                  className="field"
                  value={form.lineId}
                  onChange={(e) => setField("lineId", e.target.value)}
                >
                  {SERVICE_LINES.map((l) => (
                    <option key={l.id} value={l.id}>{l.label}</option>
                  ))}
                </select>
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
                <div className="label accent">Duración (meses)</div>
                <select
                  className="field"
                  value={form.durationValue}
                  onChange={(e) => setField("durationValue", Number(e.target.value))}
                >
                  {UI_OPTIONS.months.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Modalidad */}
              <div className="card">
                <div className="label accent">Modalidad</div>
                <select
                  className="field"
                  value={form.modality}
                  onChange={(e) => setField("modality", e.target.value)}
                >
                  <option value="online">Online</option>
                  <option value="mixed">Mixto</option>
                  <option value="onsite">Presencial</option>
                </select>
              </div>
            </div>

            <div className="est-row">
              <div className="left">
                <div className="tiny subtle">Estimación referencial (+IVA)</div>
                <div className="total">{clp(q.total)}</div>
              </div>
              <div className="right">
                <a
                  className="btn btn-primary"
                  href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Solicitar cotización por WhatsApp"
                >
                  Solicitar cotización
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Metodología & Compliance */}
        <section className="block">
          <header className="sec-head">
            <h2>Metodología y cumplimiento</h2>
          </header>

          <div className="card why-card">
            <ul className="why">
              <li><b>Diseño por competencias</b>: contenidos precisos, sin relleno.</li>
              <li><b>Rúbricas y QA</b>: estándares por sesión y observación docente.</li>
              <li><b>Facturación electrónica</b>: respaldo y reportes para auditorías.</li>
              <li><b>Certificados y constancias</b>: disponibles por participante.</li>
            </ul>
          </div>

          <p className="tiny subtle mt6">
            © 2025 Instituto Lael SpA — RUT 78.084.019-6 · Capacitación corporativa online y presencial en sede del cliente.
            Contacto directo: <b>contacto@institutolael.cl</b>
          </p>
        </section>
      </div>
    </section>
  );
}

/* ====== CSS local (oscuro + paleta Lael + mejoras en CTA y títulos) ====== */
const css = `
:root{
  /* Paleta Lael (sólida) */
  --lael-blue:#3B56FF;
  --lael-green:#10B981;
  --lael-amber:#FFCC33;

  /* Base dark */
  --bg:#0B1220; --panel:#0E1424; --soft:#0D1528; --bd:#22304d;
  --ink:#ffffff; --ink-2:#eaf2ff;
  --rad:16px; --shadow:0 18px 36px rgba(2,6,23,.28);
}

*{box-sizing:border-box}
.emp-page{background:var(--bg);color:var(--ink)}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.block{ margin:22px 0; }
.muted{ color:var(--ink-2); opacity:.92; }
.mt6{ margin-top:6px; }
.hidden{ position:absolute; opacity:0; pointer-events:none; }

/* Títulos reforzados */
h1{ color:var(--ink); font-weight:800; letter-spacing:.1px; }
h2{ color:var(--ink); font-weight:700; letter-spacing:.1px; }
h3{ color:var(--ink); font-weight:700; }

/* HERO */
.hero-head{
  padding:40px 0;
  color:var(--ink);
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
.hero-left h1{ margin:.4rem 0 .3rem; font-size: clamp(1.8rem, 2.8vw + .5rem, 2.4rem); }
.hero-sub{ margin:0; color:var(--ink-2); max-width:64ch; }
.cta-row{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }

/* Botones */
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.68rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:1000;
  transition:.18s transform ease, .18s box-shadow ease, .18s border-color ease, .18s background-color ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--lael-amber); color:#0B1220; border-color:var(--lael-amber); }
.btn-primary:hover{ background:#FFD75A; }

/* Secundario con realce ámbar */
.btn-ghost{
  background:transparent; color:#EAF2FF; border-color:#344169;
}
.btn-ghost:hover{
  border-color:var(--lael-amber);
  background:color-mix(in srgb, var(--lael-amber) 6%, transparent);
  box-shadow:0 0 0 2px color-mix(in srgb, var(--lael-amber) 25%, transparent) inset;
}

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
.mc.indigo b{ color:#9db4ff; }
.mc.green b{ color:var(--lael-green); }
.mc.amber b{ color:var(--lael-amber); }

/* WHY 3 */
.why3{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
@media (max-width:980px){ .why3{ grid-template-columns:1fr; } }
.why3-card{ border:1px solid var(--bd); border-radius:16px; padding:14px; background:linear-gradient(180deg,#0f172a,#0b1220); }
.why3-title{ font-weight:800; margin-bottom:6px; }

/* PACKS simples (sin imagen de fondo para sobriedad) */
.packs-grid{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
@media (max-width:980px){ .packs-grid{ grid-template-columns:1fr; } }
.pack-card.simple{
  border:1px solid var(--bd); border-radius:16px; padding:14px; background:linear-gradient(180deg,#0f172a,#0b1220);
}
.pack-card .bullets{ margin:.4rem 0 .8rem; padding-left:18px; color:var(--ink-2); }
.pack-card .actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* ESTIMADOR */
.est-card{
  border:1px solid var(--bd); border-radius:18px; padding:14px; background:
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.018)),
    linear-gradient(180deg, #0f172a, #0b1220);
  color:var(--ink); box-shadow:var(--shadow);
}
.grid{ display:grid; gap:12px; }
.grid-4{ grid-template-columns: repeat(4, minmax(0,1fr)); }
@media (max-width:980px){ .grid-4{ grid-template-columns:1fr; } }
.card{
  border:1px solid var(--bd); border-radius:14px; background:linear-gradient(180deg,#0f172a,#0b1220);
  padding:12px;
}
.label{
  font-weight:900; margin-bottom:6px; color:var(--ink); position:relative; display:block;
}
.label.accent::after{
  content:""; display:block; width:38px; height:3px; border-radius:2px; margin-top:4px;
  background: linear-gradient(90deg, var(--lael-blue), var(--lael-green));
}
.field{
  width:100%; border:1px solid #344169; border-radius:12px; padding:.56rem .8rem; background:#0f172a; color:#eaf2ff;
}

.est-row{
  margin-top:10px; display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.tiny{ font-size:.92rem; }
.subtle{ color:#9fb0d1; }
.total{ font-size:1.8rem; font-weight:1000; color:var(--lael-green); }

/* Why list */
.why-card{ box-shadow:var(--shadow); }
.why{ margin:.2rem 0 0; padding-left:18px; color:var(--ink-2); }

/* Focus accesible */
button:focus-visible, a.btn:focus-visible, select:focus-visible{
  outline:3px solid #22D3EE; outline-offset:2px; border-radius:12px;
}
`;