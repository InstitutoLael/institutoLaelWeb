// src/pages/Convenios.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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

const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const WAPP = "56964626568";

export default function Convenios() {
  const marqueeItems = [
    "Iglesias",
    "Colegios",
    "Empresas",
    "Homeschool",
    "Red de Iglesias",
    "Nuevo partner",
  ];

  const PANELS = ["iglesias", "colegios", "empresas"];
  const [openPanel, setOpenPanel] = useState("iglesias"); // ← abierto por defecto
  const sectionRef = useRef(null);

  const togglePanel = (key) => {
    setOpenPanel((prev) => (prev === key ? null : key));
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

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
  }, [ig]);

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

  const [emp, setEmp] = useState({ bruto: "" });
  const empNums = useMemo(() => {
    const b = Number(String(emp.bruto).replace(/[^\d]/g, "")) || 0;
    const con = Math.round(b * 0.95);
    const ahorro = Math.max(0, b - con);
    return { b, con, ahorro };
  }, [emp]);

  const waTextIglesias = encodeURIComponent(
    `Hola 👋, quiero activar convenio Red de Iglesias (LSCh).\n` +
      `Personas: ${ig.personas}\nMeses: ${ig.meses}\n` +
      `Total público: ${clp(igTotales.publico)} | Total convenio: ${clp(
        igTotales.convenio
      )}`
  );
  const waTextHs = encodeURIComponent(
    `Hola 👋, soy de colegio/homeschool.\nMensual sin convenio: ${clp(
      hsNums.base
    )}\nTotal público: ${clp(hsNums.totalPublico)} | Total convenio: ${clp(
      hsNums.totalConvenio
    )}`
  );
  const waTextEmp = encodeURIComponent(
    `Hola 👋, convenio empresas.\nTotal sin convenio: ${clp(
      empNums.b
    )} | Total con –5%: ${clp(empNums.con)}`
  );

  return (
    <main className="cv">
      <style>{css}</style>

      <section className="hero">
        <div className="container hero__wrap">
          <span className="kicker">Convenios & Partners</span>
          <h1>Beneficios preferentes por pertenencia</h1>
          <p className="lead">
            Precio preferente para red de iglesias, colegios y empresas. Si
            perteneces a un partner, validas tu pertenencia y el descuento se
            aplica de forma automática. Para nuevos acuerdos, lo dejamos listo
            en <b>20 minutos</b>.
          </p>

          <div className="cta">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
                "Hola 👋, quiero solicitar un convenio para mi organización."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar convenio
            </a>
            <Link className="btn btn-outline" to="/inscripcion">
              Inscribirme
            </Link>
          </div>

          <div className="marquee">
            <div className="track">
              {[...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={i} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE INTRO */}
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

      {/* CHIPS MOVIDOS ABAJO */}
      <section className="chips-zone" ref={sectionRef}>
        <div className="container chips">
          {PANELS.map((key) => (
            <button
              key={key}
              className={"chip " + (openPanel === key ? "on" : "")}
              onClick={() => togglePanel(key)}
            >
              {key === "iglesias"
                ? "Red de Iglesias"
                : key === "colegios"
                ? "Colegios / Homeschool"
                : "Empresas"}
            </button>
          ))}
        </div>
      </section>

      {/* BLOQUES ACORDEÓN */}
      <section className="container stack">
        {openPanel === "iglesias" && (
          <Panel
            title="Red de Iglesias · LSCh"
            intro={[
              `Mensual público (ref.): ${clpLS(publicLSChMonthly)}`,
              `Mensual convenio: ${clpLS(churchMonthly)}`,
              `Matrícula: ${clpLS(LSCH_ENROLLMENT_FEE)}`,
            ]}
            note="Aplica a planes grupales online. Verificación simple: carta pastoral o código."
          >
            <Estimator
              type="ig"
              data={ig}
              setData={setIg}
              totals={igTotales}
              link={`https://wa.me/${WAPP}?text=${waTextIglesias}`}
            />
          </Panel>
        )}
        {openPanel === "colegios" && (
          <Panel
            title="Colegios / Homeschool"
            intro={[
              "Regla clara: –10% mensual sobre tu plan.",
              `Matrícula Homeschool: –50% (de ${clpHS(
                HS_ENROLLMENT_FEE
              )} → ${clpHS(Math.round(HS_ENROLLMENT_FEE * 0.5))}).`,
            ]}
          >
            <Estimator
              type="hs"
              data={hs}
              setData={setHs}
              totals={hsNums}
              link={`https://wa.me/${WAPP}?text=${waTextHs}`}
            />
          </Panel>
        )}
        {openPanel === "empresas" && (
          <Panel
            title="Empresas"
            intro={[
              "Tu tabla por volumen + –5% extra sobre el total post-tramos.",
              "Incluye reporte ejecutivo sin costo.",
            ]}
          >
            <Estimator
              type="emp"
              data={emp}
              setData={setEmp}
              totals={empNums}
              link={`https://wa.me/${WAPP}?text=${waTextEmp}`}
            />
          </Panel>
        )}
      </section>

      <section className="cta-final">
        <div className="container cta-final__inner">
          <div>
            <h3>¿Listo para activar tu beneficio?</h3>
            <p className="muted">
              Podemos dejarlo operativo hoy. Conversemos por WhatsApp o envíanos
              un correo con tus datos de verificación.
            </p>
          </div>
          <div className="row-cta">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
                "Hola 👋, quiero activar un convenio."
              )}`}
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

/* --- Subcomponentes --- */
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

function Panel({ title, intro = [], note, children }) {
  return (
    <article className="card deep">
      <h2>{title}</h2>
      <ul className="introbul">
        {intro.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      {note && <p className="note">{note}</p>}
      {children}
    </article>
  );
}

function Estimator({ type, data, setData, totals, link }) {
  const isIglesia = type === "ig";
  const isHs = type === "hs";
  const isEmp = type === "emp";

  return (
    <div className="estimator">
      <div className={isEmp ? "grid1" : isHs ? "grid3" : "grid3"}>
        {isIglesia && (
          <>
            <label>
              Personas
              <input
                type="number"
                min="1"
                value={data.personas}
                onChange={(e) =>
                  setData((s) => ({ ...s, personas: Number(e.target.value) }))
                }
              />
            </label>
            <label>
              Meses
              <input
                type="number"
                min="1"
                value={data.meses}
                onChange={(e) =>
                  setData((s) => ({ ...s, meses: Number(e.target.value) }))
                }
              />
            </label>
            <label>
              Código (opcional)
              <input
                value={data.codigo}
                onChange={(e) => setData((s) => ({ ...s, codigo: e.target.value }))}
              />
            </label>
          </>
        )}
        {isHs && (
          <>
            <label>
              Mensual sin convenio
              <input
                value={data.mensualBase}
                onChange={(e) => setData((s) => ({ ...s, mensualBase: e.target.value }))}
              />
            </label>
            <label>
              Personas
              <input
                type="number"
                value={data.personas}
                onChange={(e) =>
                  setData((s) => ({ ...s, personas: Number(e.target.value) }))
                }
              />
            </label>
            <label>
              Meses
              <input
                type="number"
                value={data.meses}
                onChange={(e) =>
                  setData((s) => ({ ...s, meses: Number(e.target.value) }))
                }
              />
            </label>
          </>
        )}
        {isEmp && (
          <label>
            Total sin convenio
            <input
              value={data.bruto}
              onChange={(e) => setData({ bruto: e.target.value })}
            />
          </label>
        )}
      </div>

      <div className="sum">
        <div>
          <span>Total público</span>
          <b>{clp(totals.publico || totals.totalPublico || totals.b)}</b>
        </div>
        <div className="ok">
          <span>Total convenio</span>
          <b>{clp(totals.convenio || totals.totalConvenio || totals.con)}</b>
        </div>
        <div>
          <span>Ahorro estimado</span>
          <b>{clp(totals.ahorro)}</b>
        </div>
      </div>

      <div className="row-cta">
        <a className="btn btn-primary" href={link} target="_blank" rel="noreferrer">
          Activar por WhatsApp
        </a>
        <Link className="btn btn-outline" to="/inscripcion">
          Inscribirme
        </Link>
      </div>
    </div>
  );
}

/* --- CSS --- */
const css = `
:root{
  --bg:#0b1220;--ink:#f9fafb;--ink2:#eaf2ff;--muted:#c9d4f2;
  --panel:#0f182d;--bd:#243454;
  --yellow:#fbbf24;--blue:#6b7cff;--ok:#22c55e;
  --rad:18px;--shadow:0 20px 40px rgba(0,0,0,.35);
}

.cv{background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}
.container{width:min(1120px,92vw);margin:0 auto;}

/* HERO */
.hero{text-align:center;padding:70px 0 36px;
  background:
   radial-gradient(800px 300px at 8% -12%,rgba(59,130,246,.14),transparent 70%),
   radial-gradient(700px 240px at 94% -10%,rgba(245,158,11,.10),transparent 70%);
}
.kicker{display:inline-block;font-weight:900;color:#dbeafe;padding:.4rem .9rem;border:1px solid #26345a;border-radius:999px;background:#101a31;}
.hero h1{margin:1rem 0 .6rem;font-size:clamp(2rem,4vw + .6rem,3rem);}
.lead{max-width:70ch;margin:0 auto;color:var(--ink2);}
.cta{display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;}
.btn{display:inline-flex;align-items:center;justify-content:center;font-weight:900;border-radius:12px;border:1px solid #2b3553;padding:.8rem 1.1rem;text-decoration:none;transition:.2s ease;}
.btn-primary{background:linear-gradient(180deg,#fbbf24,#f59e0b);color:#0b1220;box-shadow:0 18px 36px rgba(245,158,11,.25);}
.btn-outline{background:transparent;color:#e2e8f0;}
.btn:hover{transform:translateY(-1px)}

/* MARQUEE */
.marquee{margin-top:22px;overflow:hidden;border-radius:12px;border:1px solid #2a385f;background:#0f182d;}
.track{display:flex;gap:14px;padding:8px 10px;animation:slide 24s linear infinite;}
.pill{padding:.36rem .85rem;border-radius:999px;border:1px solid #33456b;background:#101b33;color:#eaf2ff;font-weight:800;}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* INTRO TRES CARDS */
.tri{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:38px 0 12px;}
@media(max-width:900px){.tri{grid-template-columns:1fr}}
.card{border:1px solid var(--bd);border-radius:var(--rad);background:var(--panel);padding:18px;box-shadow:var(--shadow);}
.card h3{margin:.25rem 0 .6rem;color:#ffffff;}
.card ul{margin:.2rem 0 0;padding-left:20px;color:var(--ink2);}
.card li{margin:.28rem 0}
.card.intro .icon{font-size:22px;line-height:1;background:#0e1a34;border:1px solid #2a3b64;color:#eaf2ff;border-radius:10px;display:inline-grid;place-items:center;width:38px;height:38px}

/* CHIPS (debajo del intro) */
.chips-zone{padding:18px 0 8px}
.chips{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.chip{padding:.55rem 1rem;border-radius:999px;border:1px solid #31426d;background:#101b33;color:#eaf2ff;font-weight:900;cursor:pointer;transition:.15s}
.chip:hover{transform:translateY(-1px)}
.chip.on{border-color:#7d8cff;box-shadow:0 0 0 3px rgba(125,140,255,.18) inset}

/* STACK DE PANELES */
.stack{display:grid;gap:16px;padding:10px 0 28px}
.card.deep h2{margin:0 0 .6rem}
.introbul{margin:.2rem 0 .3rem;padding-left:20px;color:var(--ink2)}
.note{margin:.4rem 0 1rem;color:var(--muted)}

/* ESTIMADOR */
.estimator{margin-top:6px;border:1px dashed #33456b;border-radius:14px;padding:16px;background:#0c1429}
.grid1,.grid3{display:grid;gap:12px}
.grid1{grid-template-columns:1fr}
.grid3{grid-template-columns:repeat(3,1fr)}
@media(max-width:860px){.grid3{grid-template-columns:1fr}}
.estimator label{display:flex;flex-direction:column;gap:6px;font-weight:800;color:#eaf2ff}
.estimator input{border:1px solid #2b3a61;border-radius:10px;background:#0f172a;color:#f8fafc;padding:.7rem .85rem}
.estimator input:focus{outline:2px solid var(--yellow)}

.sum{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px}
.sum>div{border:1px solid #344569;background:#0f182d;border-radius:12px;padding:10px}
.sum span{font-weight:800;color:var(--muted)}
.sum b{display:block;font-size:1.35rem;margin-top:.15rem}
.sum .ok{box-shadow:0 0 0 2px rgba(34,197,94,.25) inset;border-color:#2c7a50}

.row-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}

/* CTA FINAL */
.cta-final{padding:24px 0;background:linear-gradient(180deg,rgba(245,158,11,.08),rgba(17,24,39,.0))}
.cta-final__inner{display:flex;justify-content:space-between;align-items:center;gap:18px;border:1px solid #2a385f;border-radius:16px;background:#0f182d;padding:18px}
.cta-final h3{margin:0}
.muted{color:var(--ink2)}
.row-cta .btn-outline{border-color:#3a4b77}

/* UTILIDADES */
h2,h3{color:#fff}
b,strong{color:#fff}
`