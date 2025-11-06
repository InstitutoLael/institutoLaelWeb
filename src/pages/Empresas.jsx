// src/pages/Empresas.jsx
import { useState, useMemo, useEffect } from "react";
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

import logoAzul from "../assets/img/Logos/lael-inst-azul.png";
import imgHero from "../assets/img/lael/office-bg.jpg"; // puedes cambiar esta imagen

export default function Empresas() {
  const [form, setForm] = useState({
    lineId: "ingles",
    headcount: 20,
    durationUnit: "months",
    durationValue: 1,
    sessionsPerWeek: 2,
    hoursPerSession: 1.5,
    modality: "online",
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
      `Personas: ${q.headcount}\n` +
      `Duración: ${form.durationValue} ${form.durationUnit}\n` +
      `Modalidad: ${form.modality}\n` +
      `Estimación: ${clp(q.total)} (+IVA)\n` +
      `¿Podrían contactarme?`
  );

  useEffect(() => {
    document.title = "Capacitación Corporativa | Instituto Lael SpA";
  }, []);

  return (
    <section className="empresas">
      <style>{css}</style>

      {/* HERO */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url(${imgHero})`,
        }}
      >
        <div className="container hero-content">
          <img src={logoAzul} alt="Instituto Lael" className="hero-logo" />
          <h1>Capacitación corporativa con impacto real</h1>
          <p>
            Formación en <b>Inglés, LSCh, Habilidades Blandas</b> y{" "}
            <b>Empleabilidad</b>, diseñada para mejorar el desempeño y el clima
            organizacional. 100% online con posibilidad de dictarse en sede del
            cliente.
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
            <Link className="btn btn-ghost" to="/inscripcion">
              Reunión de diagnóstico
            </Link>
          </div>
        </div>
      </header>

      {/* BENEFICIOS */}
      <section className="block container">
        <h2>Qué ofrecemos</h2>
        <div className="grid grid-3 beneficios">
          <div className="b-item">
            <h3>🎯 Formación adaptada</h3>
            <p>
              Programas modulares según nivel, rubro y objetivos de la empresa.
            </p>
          </div>
          <div className="b-item">
            <h3>💻 Flexibilidad total</h3>
            <p>
              Modalidades online o mixtas, con sesiones en vivo y cápsulas
              grabadas.
            </p>
          </div>
          <div className="b-item">
            <h3>📊 Seguimiento ejecutivo</h3>
            <p>
              Reportes de avance, asistencia e indicadores de cumplimiento por
              cohorte.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMAS DESTACADOS */}
      <section className="block container">
        <h2>Programas destacados</h2>
        <p className="muted">
          Selecciona un programa base y ajusta según tus necesidades.
        </p>
        <div className="packs-grid">
          {EMP_PACKS.map((p) => {
            const line =
              SERVICE_LINES.find((l) => l.id === p.line) || SERVICE_LINES[0];
            return (
              <article
                key={p.id}
                className="pack-card"
                style={{ "--accent": line.brandColor }}
              >
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
                <ul>
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setField("lineId", p.line)}
                  >
                    Cargar en estimador
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ESTIMADOR */}
      <section className="block container">
        <div className="est-card">
          <h2>Calcula tu inversión estimada</h2>
          <div className="grid grid-4">
            <div className="card">
              <div className="label accent">Área</div>
              <select
                className="field"
                value={form.lineId}
                onChange={(e) => setField("lineId", e.target.value)}
              >
                {SERVICE_LINES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="card">
              <div className="label accent">Personas</div>
              <select
                className="field"
                value={form.headcount}
                onChange={(e) => setField("headcount", Number(e.target.value))}
              >
                {UI_OPTIONS.headcountPresets.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="card">
              <div className="label accent">Duración (meses)</div>
              <select
                className="field"
                value={form.durationValue}
                onChange={(e) => setField("durationValue", Number(e.target.value))}
              >
                {UI_OPTIONS.months.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

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

          <div className="total-box">
            <div>
              <small>Estimación referencial (+IVA)</small>
              <h3>{clp(q.total)}</h3>
            </div>
            <a
              href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      </section>

      {/* QA & COMPLIANCE */}
      <section className="block container">
        <div className="qa-card">
          <h2>Metodología y cumplimiento</h2>
          <ul>
            <li>
              <b>Diseño por competencias:</b> contenidos precisos, sin relleno.
            </li>
            <li>
              <b>Rúbricas y QA:</b> estándares por sesión y observación docente.
            </li>
            <li>
              <b>Facturación electrónica:</b> respaldo y reportes para
              auditorías.
            </li>
            <li>
              <b>Certificados y constancias:</b> disponibles por participante.
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="corp-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Instituto Lael SpA — RUT 78.084.019-6
          </p>
          <p>
            Capacitación corporativa online y presencial en sede del cliente.
            Contacto:{" "}
            <b>
              <a href="mailto:contacto@institutolael.cl">
                contacto@institutolael.cl
              </a>
            </b>
          </p>
        </div>
      </footer>
    </section>
  );
}

/* ===== CSS ===== */
const css = `
:root{
  --bg:#0b1220;
  --ink:#ffffff;
  --ink2:#e3e9ff;
  --accent:#facc15;              /* Amarillo Lael CTA */
  --accent-dark:#E0B90F;         /* Hover */
  --accent-press:#C9A60E;        /* Active */
  --focus:#22d3ee;               /* Cian foco accesible */
  --bd:#1f2a44;
  --card:#101827;
}

.empresas{background:var(--bg);color:var(--ink);}
.container{max-width:1120px;margin:0 auto;padding:0 18px;}
.block{margin:48px 0;}
.muted{color:var(--ink2);opacity:.85;}
h1,h2,h3{margin:0 0 .4rem;}

/* HERO */
.hero{
  background-size:cover;
  background-position:center;
  color:#fff;
  text-align:center;
  padding:80px 0 90px;
}
.hero-logo{height:48px;margin-bottom:16px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35));}
.hero h1{font-size:2rem;font-weight:800;margin-bottom:10px;}
.hero p{max-width:60ch;margin:0 auto;font-size:1.1rem;color:var(--ink2);}
.cta-row{margin-top:18px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}

/* Botones */
.btn{
  padding:.7rem 1.2rem;border-radius:12px;font-weight:850;text-decoration:none;cursor:pointer;
  border:2px solid transparent;transition:.18s transform ease, .18s box-shadow ease, .18s background ease, .18s border-color ease;
  display:inline-flex;align-items:center;justify-content:center;
}
.btn:focus-visible{outline:3px solid var(--focus);outline-offset:2px;}
.btn-primary{background:var(--accent);color:#111; border-color:var(--accent-dark); box-shadow:0 8px 22px rgba(250,204,21,.28);}
.btn-primary:hover{background:var(--accent-dark);}
.btn-primary:active{background:var(--accent-press); transform:translateY(1px); box-shadow:none;}
.btn-ghost{border:1px solid var(--ink2);color:var(--ink2);background:transparent;}
.btn-ghost:hover{background:rgba(255,255,255,.08);}

/* BENEFICIOS */
.beneficios .b-item{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:18px;}
.beneficios p{color:var(--ink2);margin:0;}
.grid{display:grid;gap:18px;}
.grid-3{grid-template-columns:repeat(auto-fit,minmax(260px,1fr));}
.grid-4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));}

/* PACKS */
.packs-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));}
.pack-card{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;}
.pack-card h3{color:#fff;}
.pack-card ul{margin:.4rem 0 .6rem;padding-left:18px;color:var(--ink2);}
.pack-card li::marker{color:var(--accent);}
.pack-card .actions{margin-top:auto;}

/* ESTIMADOR */
.est-card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:18px;}
.label.accent{font-weight:700;margin-bottom:4px;display:block;}
.field{width:100%;padding:.6rem .8rem;border-radius:10px;border:1px solid var(--bd);background:#0f172a;color:#eaf2ff;}
.field:focus-visible{outline:3px solid var(--focus);outline-offset:2px;}
.total-box{margin-top:18px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}
.total-box h3{font-size:1.6rem;color:#10b981;margin:0;}

/* QA */
.qa-card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:20px;}
.qa-card ul{margin:0;padding-left:20px;color:var(--ink2);}
.qa-card li{margin:.3rem 0;}

/* FOOTER */
.corp-footer{margin:60px 0 20px;text-align:center;color:var(--ink2);font-size:.92rem;}
.corp-footer a{color:var(--accent);}
`;