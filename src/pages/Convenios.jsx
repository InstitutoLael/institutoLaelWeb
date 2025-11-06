// src/pages/Convenios.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// ===== Data reales que ya tienes =====
import {
  LSCH_GROUP_PLANS,
  LSCH_ENROLLMENT_FEE,
  CHURCH_CONVENIO,
  clp as clpLS,
} from "../data/lsch.js";

import {
  ENROLLMENT_FEE as HS_ENROLLMENT_FEE,
  clp as clpHS,
} from "../data/homeschool.js";

// Helper CLP local
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// WhatsApp contacto (sin +)
const WAPP = "56964626568";

export default function Convenios() {
  // ===== hero marquee (infinito) =====
  const marqueeItems = [
    "Iglesias",
    "Colegios",
    "Empresas",
    "Nuevo partner",
    "Homeschool",
    "Red de Iglesias",
  ];

  // ===== tabs/chips que abren bloque (acordeón) =====
  const PANELS = ["iglesias", "colegios", "empresas"];
  const [openPanel, setOpenPanel] = useState(null);
  const sectionRef = useRef(null);

  const togglePanel = (key) => {
    setOpenPanel((prev) => (prev === key ? null : key));
    // scroll suave hacia los bloques
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // ===== Estimadores =====
  // Iglesias (LSCh)
  const publicLSChMonthly =
    LSCH_GROUP_PLANS?.find((p) => p.id === "g-month")?.monthly ?? 17990;
  const churchMonthly = CHURCH_CONVENIO?.monthlyFlat ?? 11990;

  const [ig, setIg] = useState({ personas: 1, meses: 1, codigo: "" });
  const igTotales = useMemo(() => {
    const p = Math.max(1, Number(ig.personas || 1));
    const m = Math.max(1, Number(ig.meses || 1));
    const publico = publicLSChMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    const convenio = churchMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    const ahorro = Math.max(0, publico - convenio);
    return { publico, convenio, ahorro };
  }, [ig.personas, ig.meses, publicLSChMonthly, churchMonthly]);

  // Colegios / Homeschool (–10% mensual + –50% matrícula)
  const [hs, setHs] = useState({ mensualBase: "", personas: 1, meses: 1 });
  const hsNums = useMemo(() => {
    const base = Number(String(hs.mensualBase).replace(/[^\d]/g, "")) || 0;
    const p = Math.max(1, Number(hs.personas || 1));
    const m = Math.max(1, Number(hs.meses || 1));
    const totalPublico = base * p * m + HS_ENROLLMENT_FEE * p;
    const totalConvenio =
      Math.round(base * 0.9) * p * m + Math.round(HS_ENROLLMENT_FEE * 0.5) * p;
    const ahorro = Math.max(0, totalPublico - totalConvenio);
    return { base, totalPublico, totalConvenio, ahorro };
  }, [hs]);

  // Empresas (–5% sobre total post‐tramos)
  const [emp, setEmp] = useState({ bruto: "" });
  const empNums = useMemo(() => {
    const b = Number(String(emp.bruto).replace(/[^\d]/g, "")) || 0;
    const con = Math.round(b * 0.95);
    const ahorro = Math.max(0, b - con);
    return { b, con, ahorro };
  }, [emp.bruto]);

  // Mensajes WA
  const waTextIglesias = encodeURIComponent(
    `Hola 👋, quiero activar convenio Red de Iglesias (LSCh).\n` +
      `Personas: ${ig.personas}\nMeses: ${ig.meses}\n` +
      (ig.codigo?.trim() ? `Código: ${ig.codigo}\n` : "") +
      `Total público aprox.: ${clp(igTotales.publico)}\n` +
      `Total convenio aprox.: ${clp(igTotales.convenio)}`
  );
  const waTextHs = encodeURIComponent(
    `Hola 👋, soy de colegio/homeschool.\n` +
      `Mensual sin convenio: ${clp(hsNums.base)}\n` +
      `Personas: ${hs.personas}\nMeses: ${hs.meses}\n` +
      `Total público aprox.: ${clp(hsNums.totalPublico)}\n` +
      `Total convenio aprox.: ${clp(hsNums.totalConvenio)}`
  );
  const waTextEmp = encodeURIComponent(
    `Hola 👋, convenio empresas.\n` +
      `Total sin convenio (post-tramos): ${clp(empNums.b)}\n` +
      `Total con –5%: ${clp(empNums.con)}`
  );

  // A11y: foco en panel al abrir
  const igRef = useRef(null);
  const hsRef = useRef(null);
  const emRef = useRef(null);
  useEffect(() => {
    const map = { iglesias: igRef, colegios: hsRef, empresas: emRef };
    map[openPanel]?.current?.focus?.();
  }, [openPanel]);

  return (
    <main className="cv">
      <style>{css}</style>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container hero__wrap">
          <span className="kicker">Convenios & Partners</span>
          <h1>Beneficios preferentes por pertenencia</h1>
          <p className="lead">
            Precio preferente para red de iglesias, colegios y empresas.
            Si perteneces a un partner, validas tu pertenencia y el descuento
            se aplica de forma automática. Para nuevos acuerdos, lo dejamos listo
            en <b>20 minutos</b>.
          </p>

          <div className="cta">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent("Hola 👋, quiero solicitar un convenio para mi organización.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar convenio
            </a>
            <Link className="btn btn-outline" to="/inscripcion">
              Inscribirme
            </Link>
          </div>

          {/* Marquee infinito */}
          <div className="marquee" aria-label="Partners">
            <div className="track">
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={i} className="pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Chips centrales ===== */}
      <section className="chips-zone">
        <div className="container chips">
          <button
            className={"chip " + (openPanel === "iglesias" ? "on" : "")}
            onClick={() => togglePanel("iglesias")}
            aria-expanded={openPanel === "iglesias"}
            aria-controls="panel-iglesias"
          >
            Red de iglesias
          </button>
          <button
            className={"chip " + (openPanel === "colegios" ? "on" : "")}
            onClick={() => togglePanel("colegios")}
            aria-expanded={openPanel === "colegios"}
            aria-controls="panel-colegios"
          >
            Colegios / Homeschool
          </button>
          <button
            className={"chip " + (openPanel === "empresas" ? "on" : "")}
            onClick={() => togglePanel("empresas")}
            aria-expanded={openPanel === "empresas"}
            aria-controls="panel-empresas"
          >
            Empresas
          </button>
        </div>
      </section>

      {/* ===== Tarjetas intro (propósito / cómo funciona / qué obtienes) ===== */}
      <section className="container tri">
        <Article
          icon="🏁"
          title="¿Para qué existe?"
          bullets={[
            "Acercar formación de calidad con precios justos a comunidades reales.",
            "Formalizamos la pertenencia y el beneficio queda aplicado simple y transparente.",
          ]}
        />
        <Article
          icon="⚙️"
          title="¿Cómo funciona?"
          bullets={[
            "Validación rápida (documento, correo o código).",
            "Firma de contrato de participación.",
            "Descuento automático mientras la afiliación esté vigente.",
          ]}
        />
        <Article
          icon="🎁"
          title="¿Qué obtienes?"
          bullets={[
            "Precio preferente para tu organización.",
            "Soporte dedicado y onboarding sin costo.",
            "Reporte ejecutivo cuando aplica (empresas).",
          ]}
        />
      </section>

      {/* ===== Bloques dinámicos (acordeón) ===== */}
      <section ref={sectionRef} className="container stack">

        {/* IGLESIAS */}
        <Panel
          id="panel-iglesias"
          isOpen={openPanel === "iglesias"}
          panelRef={igRef}
          title="Red de Iglesias · LSCh"
          intro={[
            `Mensual público (ref.): ${clpLS(publicLSChMonthly)}`,
            `Mensual convenio: ${clpLS(churchMonthly)}`,
            `Matrícula: ${clpLS(LSCH_ENROLLMENT_FEE)}`,
          ]}
          note="Aplica a planes grupales online. Verificación simple: carta pastoral o código."
        >
          <details open className="estimator">
            <summary>Ver estimador rápido ▾</summary>
            <div className="grid3">
              <Field label="Personas">
                <input
                  type="number"
                  min="1"
                  className="field"
                  value={ig.personas}
                  onChange={(e) =>
                    setIg((s) => ({ ...s, personas: Number(e.target.value) || 1 }))
                  }
                />
              </Field>
              <Field label="Meses">
                <input
                  type="number"
                  min="1"
                  className="field"
                  value={ig.meses}
                  onChange={(e) =>
                    setIg((s) => ({ ...s, meses: Number(e.target.value) || 1 }))
                  }
                />
              </Field>
              <Field label="Código (opcional)">
                <input
                  className="field"
                  placeholder="Si te entregaron uno"
                  value={ig.codigo}
                  onChange={(e) => setIg((s) => ({ ...s, codigo: e.target.value }))}
                />
              </Field>
            </div>

            <div className="sum">
              <Sum label="Total público" value={clp(igTotales.publico)} />
              <Sum label="Total convenio" value={clp(igTotales.convenio)} ok />
              <Sum label="Ahorro estimado" value={clp(igTotales.ahorro)} />
            </div>

            <div className="row-cta">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP}?text=${waTextIglesias}`}
                target="_blank"
                rel="noreferrer"
              >
                Activar por WhatsApp
              </a>
              <Link className="btn btn-outline" to="/inscripcion">
                Inscribirme
              </Link>
            </div>
          </details>
        </Panel>

        {/* COLEGIOS / HOMESCHOOL */}
        <Panel
          id="panel-colegios"
          isOpen={openPanel === "colegios"}
          panelRef={hsRef}
          title="Colegios / Homeschool"
          intro={[
            "Regla clara: –10% mensual sobre tu plan.",
            `Matrícula Homeschool: –50% (de ${clpHS(HS_ENROLLMENT_FEE)} → ${clpHS(
              Math.round(HS_ENROLLMENT_FEE * 0.5)
            )}).`,
            "Como el mensual varía por modo/horas, ingresa tu mensual sin convenio para estimar.",
          ]}
        >
          <details open className="estimator">
            <summary>Ver estimador rápido ▾</summary>
            <div className="grid3">
              <Field label="Mensual sin convenio (CLP)">
                <input
                  className="field"
                  placeholder="$0"
                  inputMode="numeric"
                  value={hs.mensualBase}
                  onChange={(e) => setHs((s) => ({ ...s, mensualBase: e.target.value }))}
                  onBlur={(e) => {
                    const v =
                      Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                    setHs((s) => ({ ...s, mensualBase: v ? clp(v) : "" }));
                  }}
                />
              </Field>
              <Field label="Personas">
                <input
                  type="number"
                  min="1"
                  className="field"
                  value={hs.personas}
                  onChange={(e) =>
                    setHs((s) => ({ ...s, personas: Number(e.target.value) || 1 }))
                  }
                />
              </Field>
              <Field label="Meses">
                <input
                  type="number"
                  min="1"
                  className="field"
                  value={hs.meses}
                  onChange={(e) =>
                    setHs((s) => ({ ...s, meses: Number(e.target.value) || 1 }))
                  }
                />
              </Field>
            </div>

            <div className="sum">
              <Sum label="Total público" value={clp(hsNums.totalPublico)} />
              <Sum label="Total convenio" value={clp(hsNums.totalConvenio)} ok />
              <Sum label="Ahorro estimado" value={clp(hsNums.ahorro)} />
            </div>

            <div className="row-cta">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP}?text=${waTextHs}`}
                target="_blank"
                rel="noreferrer"
              >
                Activar por WhatsApp
              </a>
              <Link className="btn btn-outline" to="/inscripcion">
                Inscribirme
              </Link>
            </div>
          </details>
        </Panel>

        {/* EMPRESAS */}
        <Panel
          id="panel-empresas"
          isOpen={openPanel === "empresas"}
          panelRef={emRef}
          title="Empresas"
          intro={[
            "Tu tabla por volumen + –5% extra sobre el total post-tramos.",
            "Incluye reporte ejecutivo sin costo.",
            "Ingresa el total sin convenio (después de tus tramos) para ver –5% aplicado.",
          ]}
        >
          <details open className="estimator">
            <summary>Ver estimador rápido ▾</summary>
            <div className="grid1">
              <Field label="Total sin convenio (CLP)">
                <input
                  className="field"
                  placeholder="$0"
                  inputMode="numeric"
                  value={emp.bruto}
                  onChange={(e) => setEmp({ bruto: e.target.value })}
                  onBlur={(e) => {
                    const v =
                      Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                    setEmp({ bruto: v ? clp(v) : "" });
                  }}
                />
              </Field>
            </div>

            <div className="sum">
              <Sum label="Total sin convenio" value={clp(empNums.b)} />
              <Sum label="Total con –5%" value={clp(empNums.con)} ok />
              <Sum label="Ahorro estimado" value={clp(empNums.ahorro)} />
            </div>

            <div className="row-cta">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP}?text=${waTextEmp}`}
                target="_blank"
                rel="noreferrer"
              >
                Activar por WhatsApp
              </a>
              <Link className="btn btn-outline" to="/empresas">
                Ver programas corporativos
              </Link>
            </div>
          </details>
        </Panel>
      </section>

      {/* ===== CTA final corta ===== */}
      <section className="cta-final">
        <div className="container cta-final__inner">
          <div>
            <h3>¿Listo para activar tu beneficio?</h3>
            <p className="muted">
              Podemos dejarlo operativo hoy. Conversemos por WhatsApp o envíanos un correo
              con tus datos de verificación.
            </p>
          </div>
          <div className="row-cta">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent("Hola 👋, quiero activar un convenio.")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="btn btn-outline" href="mailto:contacto@institutolael.cl">
              Escribir por correo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Subcomponentes ---------- */
function Article({ icon, title, bullets = [] }) {
  return (
    <article className="card intro">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <ul>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function Panel({ id, isOpen, panelRef, title, intro = [], note, children }) {
  return (
    <section
      id={id}
      tabIndex={-1}
      ref={panelRef}
      className={"panel " + (isOpen ? "open" : "")}
      aria-hidden={!isOpen}
    >
      <article className="card deep">
        <header className="panel__head">
          <h2>{title}</h2>
        </header>

        <ul className="introbul">
          {intro.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        {note && <p className="note">{note}</p>}

        {children}
      </article>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="field-wrap">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function Sum({ label, value, ok }) {
  return (
    <div className={"sum__box" + (ok ? " ok" : "")}>
      <div className="k">{label}</div>
      <div className="v">{value}</div>
    </div>
  );
}

/* ---------- CSS local ---------- */
const css = `
:root{
  --bg:#0b1220; --ink:#f8fafc; --ink2:#cbd5e1; --muted:#94a3b8;
  --panel:#0f172a; --soft:#0e1528; --bd:#20304f;
  --yellow:#fbbf24; --blue:#6b7cff; --ok:#22c55e;
  --rad:18px; --shadow:0 20px 48px rgba(2,6,23,.38);
}
*{box-sizing:border-box}
.cv{ background:var(--bg); color:var(--ink); font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
.container{ width:min(1120px, 92vw); margin:0 auto; }

/* HERO */
.hero{
  padding:64px 0 36px; text-align:center; position:relative; overflow:hidden;
  background:
    radial-gradient(900px 320px at 8% -12%, rgba(59,130,246,.14), transparent 60%),
    radial-gradient(840px 300px at 94% -10%, rgba(34,197,94,.10), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,0) 50%);
  border-bottom:1px solid var(--bd);
}
.kicker{
  display:inline-block; font-weight:900; letter-spacing:.3px; color:#dbeafe;
  padding:.4rem .8rem; border:1px solid #23345c; border-radius:999px; background:#101a31;
}
.hero h1{ margin:.8rem 0 .6rem; font-size:clamp(2rem, 4vw + .6rem, 3rem); }
.lead{ margin:0 auto; max-width:70ch; color:var(--ink2); }
.cta{ display:flex; gap:10px; justify-content:center; margin-top:14px; flex-wrap:wrap; }
.btn{ display:inline-flex; align-items:center; justify-content:center; font-weight:900; border-radius:12px; border:1px solid #2b3553; padding:.78rem 1.1rem; text-decoration:none; }
.btn-primary{ background:linear-gradient(180deg, #fbbf24, #f59e0b); color:#0b1220; border-color:#d97706; box-shadow:0 18px 36px rgba(245,158,11,.22); }
.btn-outline{ background:transparent; color:#e2e8f0; }
.btn:hover{ transform:translateY(-1px); transition:.18s ease; }

/* Marquee infinito */
.marquee{ margin-top:18px; overflow:hidden; border:1px solid var(--bd); border-radius:12px; background:#0e162b; }
.track{ display:flex; gap:10px; width:max-content; padding:8px 10px; animation:slide 22s linear infinite; }
.pill{ padding:.34rem .7rem; border-radius:999px; border:1px solid #2a3961; background:#0f1a32; color:#e5e7eb; font-weight:800; white-space:nowrap; }
@keyframes slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* Chips centrales */
.chips-zone{ padding:16px 0 6px; border-bottom:1px dashed var(--bd); }
.chips{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
.chip{ padding:.55rem 1rem; border-radius:999px; border:1px solid #2a3557; background:#0f172a; color:#eaf2ff; font-weight:900; }
.chip.on{ border-color:var(--blue); box-shadow:0 0 0 2px rgba(107,124,255,.18) inset; }

/* Triad intro */
.tri{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding:18px 0; }
@media (max-width:980px){ .tri{ grid-template-columns:1fr; } }
.card{
  border:1px solid var(--bd); border-radius:var(--rad); background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow); padding:16px;
}
.card.intro h3{ margin:.2rem 0 .5rem; }
.card.intro .icon{ font-size:1.4rem; }

/* Bloques acordeón */
.stack{ padding:12px 0 6px; display:grid; gap:12px; }
.panel{ display:none; }
.panel.open{ display:block; }
.card.deep h2{ margin:0 0 .6rem; }
.introbul{ margin:.2rem 0 .2rem; padding-left:18px; }
.introbul li{ margin:.18rem 0; color:#e8edf7; }
.note{ margin:.4rem 0 0; color:var(--muted); }

/* Estimador */
.estimator{ margin-top:10px; border:1px dashed #2d3b60; border-radius:14px; padding:10px; background:#0c1427; }
.estimator summary{ cursor:pointer; font-weight:900; color:#dbeafe; margin: -4px 0 6px; }
.grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.grid1{ display:grid; grid-template-columns:1fr; gap:10px; }
@media (max-width:980px){ .grid3{ grid-template-columns:1fr; } }
.field-wrap .label{ display:block; font-weight:800; color:#a7b5cc; margin:0 0 4px; }
.field{ width:100%; border:1px solid #2a3557; border-radius:12px; padding:.66rem .8rem; background:#0f172a; color:#eaf2ff; }

.sum{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:10px; }
@media (max-width:980px){ .sum{ grid-template-columns:1fr; } }
.sum__box{
  background:#0e162b; border:1px solid #2a385f; border-radius:14px; padding:.7rem .9rem;
}
.sum__box.ok{ border-color:#1e8f5e; box-shadow:0 0 0 2px rgba(34,197,94,.12) inset; }
.k{ font-weight:900; color:#c7d2fe; }
.v{ font-size:1.22rem; font-weight:1000; }

/* CTAs */
.row-cta{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }

/* CTA final */
.cta-final{ margin:20px 0 0; border-top:1px solid var(--bd); background:linear-gradient(135deg, rgba(245,158,11,.12), rgba(107,124,255,.10)); }
.cta-final__inner{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:18px 0; }
.cta-final h3{ margin:.2rem 0 .2rem; }
.cta-final .muted{ color:var(--ink2); }
@media (max-width:980px){ .cta-final__inner{ flex-direction:column; align-items:flex-start; } }
`;