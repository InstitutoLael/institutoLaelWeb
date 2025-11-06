// src/pages/Convenios.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ===== Data reales (ya las tienes en tu repo) =====
import {
  LSCH_GROUP_PLANS,
  CHURCH_CONVENIO,
  LSCH_ENROLLMENT_FEE,
  clp as clpLS,
} from "../data/lsch.js";

import {
  ENROLLMENT_FEE as HS_ENROLLMENT_FEE, // matrícula Homeschool
  clp as clpHS,
} from "../data/homeschool.js";

// ===== Helpers =====
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const WAPP = "56964626568";

export default function Convenios() {
  // --------- Precios base (LSCh iglesias) ----------
  const publicLSChMonthly =
    LSCH_GROUP_PLANS?.find((p) => p.id === "g-month")?.monthly ?? 17990;
  const churchMonthly = CHURCH_CONVENIO?.monthlyFlat ?? 11990;

  // --------- Estado acordeones ----------
  const [openLS, setOpenLS] = useState(false);
  const [openHS, setOpenHS] = useState(false);
  const [openEmp, setOpenEmp] = useState(false);

  // --------- Estimador: Iglesias / LSCh ----------
  const [ig, setIg] = useState({ personas: 1, meses: 1, codigo: "" });
  const igTotals = useMemo(() => {
    const p = Math.max(1, Number(ig.personas || 1));
    const m = Math.max(1, Number(ig.meses || 1));
    const publico = publicLSChMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    const convenio = churchMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    return { publico, convenio, ahorro: Math.max(0, publico - convenio) };
  }, [ig, publicLSChMonthly, churchMonthly]);

  const waTextIglesias = encodeURIComponent(
    `Hola 👋, quiero activar convenio Iglesias para LSCh.\n` +
      `Personas: ${ig.personas}\nMeses: ${ig.meses}\n` +
      (ig.codigo?.trim() ? `Código: ${ig.codigo}\n` : "") +
      `Total público aprox.: ${clp(igTotals.publico)}\n` +
      `Total convenio aprox.: ${clp(igTotals.convenio)}\n` +
      `¿Me ayudan con el contrato de participación?`
  );

  // --------- Estimador: Colegios / Homeschool ----------
  const [hs, setHs] = useState({ mensualBase: "", personas: 1, meses: 1 });
  const hsNums = useMemo(() => {
    const p = Math.max(1, Number(hs.personas || 1));
    const m = Math.max(1, Number(hs.meses || 1));
    const base = Number(String(hs.mensualBase).replace(/[^\d]/g, "")) || 0;

    const totalPublico = base * p * m + HS_ENROLLMENT_FEE * p;
    const totalConvenio =
      Math.round(base * 0.9) * p * m + Math.round(HS_ENROLLMENT_FEE * 0.5) * p;
    const ahorro = Math.max(0, totalPublico - totalConvenio);
    return { base, totalPublico, totalConvenio, ahorro };
  }, [hs]);

  const waTextHS = encodeURIComponent(
    `Hola 👋, pertenezco a un colegio/homeschool.\n` +
      `Mensual sin convenio: ${clp(hsNums.base)}\n` +
      `Personas: ${hs.personas}\nMeses: ${hs.meses}\n` +
      `Total público aprox.: ${clp(hsNums.totalPublico)}\n` +
      `Total convenio aprox.: ${clp(hsNums.totalConvenio)}\n` +
      `¿Me envían el contrato para aplicar –10% mensual y –50% matrícula?`
  );

  // --------- Estimador: Empresas ----------
  const [emp, setEmp] = useState({ bruto: "" });
  const empNums = useMemo(() => {
    const total = Number(String(emp.bruto).replace(/[^\d]/g, "")) || 0;
    const con = Math.round(total * 0.95);
    return { total, con, ahorro: Math.max(0, total - con) };
  }, [emp]);

  const waTextEmp = encodeURIComponent(
    `Hola 👋, empresa interesada en convenio.\n` +
      `Total sin convenio (post-tramos): ${clp(empNums.total)}\n` +
      `Total con –5%: ${clp(empNums.con)}\n` +
      `¿Podemos formalizar el convenio y contrato?`
  );

  const waTextProponer = encodeURIComponent(
    `Hola 👋, quiero proponer un convenio.\n` +
      `Organización: ______\nTamaño estimado: ______\nContacto: ______\n` +
      `¿Agendamos una llamada de 15 min?`
  );

  return (
    <section className="cv2">
      <style>{css}</style>

      {/* ======= HERO ======= */}
      <header className="hero">
        <div className="container">
          <div className="kicker">Convenios & Partners</div>
          <h1>Beneficios preferentes por pertenencia</h1>
          <p className="lead">
            Precio preferente para red de iglesias, colegios y empresas. Si perteneces
            a un partner, validas tu pertenencia y el descuento se aplica de forma
            automática. Para nuevos acuerdos, lo dejamos listo en 20 minutos.
          </p>
          <div className="ctas">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${waTextProponer}`}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar convenio
            </a>
            <Link className="btn btn-ghost" to="/inscripcion">
              Inscribirme
            </Link>
          </div>
        </div>
      </header>

      {/* ======= MARQUEE ======= */}
      <section className="marquee">
        <div className="container">
          <div className="track">
            {[
              "Iglesias",
              "Colegios",
              "Empresas",
              "Nuevo partner",
              "Homeschool",
              "Red de Iglesias",
            ]
              .concat([
                "Iglesias",
                "Colegios",
                "Empresas",
                "Nuevo partner",
                "Homeschool",
                "Red de Iglesias",
              ])
              .map((t, i) => (
                <span key={i} className="chip">
                  {t}
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* ======= POR QUÉ / CÓMO / QUÉ ======= */}
      <section className="why">
        <div className="container grid3">
          <InfoCard
            icon="🏁"
            title="¿Para qué existe?"
            bullets={[
              "Acercar formación de calidad con precios justos a comunidades reales.",
              "Formalizamos la pertenencia y el beneficio queda aplicado simple y transparente.",
            ]}
          />
          <InfoCard
            icon="⚙️"
            title="¿Cómo funciona?"
            bullets={[
              "Validación rápida (documento, correo o código).",
              "Firma de contrato de participación.",
              "Descuento automático mientras la afiliación esté vigente.",
            ]}
          />
          <InfoCard
            icon="🎁"
            title="¿Qué obtienes?"
            bullets={[
              "Precio preferente para tu organización.",
              "Soporte dedicado y onboarding sin costo.",
              "Reporte ejecutivo cuando aplica (empresas).",
            ]}
          />
        </div>
      </section>

      {/* ======= CONVENIOS ======= */}
      <section className="plans">
        <div className="container grid3">
          {/* Iglesias */}
          <PlanCard
            title="Red de Iglesias · LSCh"
            bullets={[
              `Mensual público (ref.): ${clpLS(publicLSChMonthly)}`,
              `Mensual convenio: ${clpLS(churchMonthly)}`,
              `Matrícula: ${clpLS(LSCH_ENROLLMENT_FEE)}`,
            ]}
            note="Aplica a planes grupales online. Verificación: carta pastoral o código."
            open={openLS}
            onToggle={() => setOpenLS((v) => !v)}
            panel={
              <div className="panel grid3a">
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

                <Summary
                  k1="Total público"
                  v1={clp(igTotals.publico)}
                  k2="Total convenio"
                  v2={clp(igTotals.convenio)}
                  k3="Ahorro estimado"
                  v3={clp(igTotals.ahorro)}
                />

                <div className="row-actions">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextIglesias}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Activar por WhatsApp
                  </a>
                  <Link className="btn btn-ghost" to="/inscripcion">
                    Inscribirme
                  </Link>
                </div>
              </div>
            }
          />

          {/* Colegios / Homeschool */}
          <PlanCard
            title="Colegios / Homeschool"
            bullets={[
              "Regla clara: –10% mensual sobre tu plan.",
              `Matrícula Homeschool: –50% (de ${clpHS(
                HS_ENROLLMENT_FEE
              )} → ${clpHS(Math.round(HS_ENROLLMENT_FEE * 0.5))}).`,
              "Como el mensual varía por modo/horas, ingresa tu mensual sin convenio para estimar.",
            ]}
            open={openHS}
            onToggle={() => setOpenHS((v) => !v)}
            panel={
              <div className="panel grid3a">
                <Field label="Mensual sin convenio (CLP)">
                  <input
                    className="field"
                    inputMode="numeric"
                    placeholder="$0"
                    value={hs.mensualBase}
                    onChange={(e) =>
                      setHs((s) => ({ ...s, mensualBase: e.target.value }))
                    }
                    onBlur={(e) => {
                      const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
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

                <Summary
                  k1="Total público"
                  v1={clp(hsNums.totalPublico)}
                  k2="Total convenio"
                  v2={clp(hsNums.totalConvenio)}
                  k3="Ahorro estimado"
                  v3={clp(hsNums.ahorro)}
                />

                <div className="row-actions">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextHS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Activar por WhatsApp
                  </a>
                  <Link className="btn btn-ghost" to="/inscripcion">
                    Inscribirme
                  </Link>
                </div>
              </div>
            }
          />

          {/* Empresas */}
          <PlanCard
            title="Empresas"
            bullets={[
              "Tu tabla por volumen + –5% extra sobre el total post-tramos.",
              "Incluye reporte ejecutivo sin costo.",
              "Ingresa el total sin convenio (después de tus tramos) para ver –5% aplicado.",
            ]}
            open={openEmp}
            onToggle={() => setOpenEmp((v) => !v)}
            panel={
              <div className="panel grid3a">
                <Field label="Total sin convenio (CLP)">
                  <input
                    className="field"
                    inputMode="numeric"
                    placeholder="$0"
                    value={emp.bruto}
                    onChange={(e) => setEmp({ bruto: e.target.value })}
                    onBlur={(e) => {
                      const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                      setEmp({ bruto: v ? clp(v) : "" });
                    }}
                  />
                </Field>

                <Summary
                  k1="Total sin convenio"
                  v1={clp(empNums.total)}
                  k2="Total con –5%"
                  v2={clp(empNums.con)}
                  k3="Ahorro estimado"
                  v3={clp(empNums.ahorro)}
                />

                <div className="row-actions">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextEmp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Activar por WhatsApp
                  </a>
                  <Link className="btn btn-ghost" to="/empresas">
                    Ver programas corporativos
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* ======= CTA BANDA ======= */}
      <section className="cta-band">
        <div className="container inner">
          <div>
            <h3>¿Listo para activar tu beneficio?</h3>
            <p className="muted">
              Podemos dejarlo operativo hoy. Conversa por WhatsApp o envíanos un correo con
              tus datos de verificación.
            </p>
          </div>
          <div className="row-actions">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${waTextProponer}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="btn btn-ghost" href="mailto:contacto@institutolael.cl">
              Escribir por correo
            </a>
          </div>
        </div>
      </section>

      {/* ======= FAQS ======= */}
      <section className="faqs">
        <div className="container grid2">
          {FAQS.map((f, i) => (
            <details key={i} className="faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function InfoCard({ icon, title, bullets = [] }) {
  return (
    <article className="card soft">
      <div className="ic">{icon}</div>
      <h3>{title}</h3>
      <ul className="bul">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function PlanCard({ title, bullets = [], note, open, onToggle, panel }) {
  return (
    <article className="card plan">
      <h3>{title}</h3>
      <ul className="bul">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {note && <p className="note">{note}</p>}

      <button
        type="button"
        className={"toggle " + (open ? "on" : "")}
        aria-expanded={open}
        onClick={onToggle}
      >
        {open ? "Ocultar estimador" : "Ver estimador rápido"}{" "}
        <span aria-hidden>{open ? "▲" : "▼"}</span>
      </button>

      {open && <div className="panel-wrap">{panel}</div>}
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="field-wrap">
      <div className="label">{label}</div>
      {children}
    </label>
  );
}

function Summary({ k1, v1, k2, v2, k3, v3 }) {
  return (
    <div className="sum">
      <div className="sbox">
        <div className="k">{k1}</div>
        <div className="v">{v1}</div>
      </div>
      <div className="sbox ok">
        <div className="k">{k2}</div>
        <div className="v">{v2}</div>
      </div>
      <div className="sbox">
        <div className="k">{k3}</div>
        <div className="v">{v3}</div>
      </div>
    </div>
  );
}

/* ---------- FAQs ---------- */
const FAQS = [
  {
    q: "¿Quiénes pueden acceder?",
    a: "Integrantes verificados de organizaciones con convenio activo (iglesias, colegios, empresas).",
  },
  {
    q: "¿Cuánto demora?",
    a: "15–20 minutos luego de recibir la validación y la firma del contrato de participación.",
  },
  {
    q: "¿Cómo valido pertenencia?",
    a: "Con documento/correo institucional o código de convenio entregado por tu organización.",
  },
  {
    q: "¿Por cuánto tiempo rige?",
    a: "Mientras la afiliación esté vigente y el contrato de participación esté al día.",
  },
  {
    q: "¿Se acumula con otras becas?",
    a: "Caso a caso. Te confirmamos por escrito según el programa y la organización.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Nombre de la organización, contacto y forma de validación (documento, correo o código).",
  },
];

/* ---------- CSS local ---------- */
const css = `
:root{
  --bg:#0b1220;
  --panel:#0e1424;
  --ink:#f8fafc;
  --ink2:#cbd5e1;
  --bd:#1f2a44;
  --ok:#22c55e;
  --pill:#101a2f;
  --blue:#3b82f6;
  --y1:#fbbf24; --y2:#f59e0b;
  --rad:16px;
  --shadow:0 18px 42px rgba(2,6,23,.32);
}

.cv2{ background:var(--bg); color:var(--ink); font-family:system-ui, sans-serif; }
.container{ width:min(1180px,92vw); margin:0 auto; }

/* HERO */
.hero{
  padding:68px 0 40px;
  background:
    radial-gradient(900px 340px at 15% -10%, rgba(51,65,85,.26), transparent 60%),
    radial-gradient(900px 340px at 85% -12%, rgba(34,197,94,.16), transparent 60%);
  text-align:center;
}
.kicker{ display:inline-block; font-weight:900; letter-spacing:.3px; padding:.3rem .7rem; border:1px solid #2b3351; border-radius:999px; color:#c7d2fe; background:rgba(30,41,59,.35); }
.hero h1{ margin:.7rem 0 .6rem; font-size:clamp(2.1rem,3.8vw,3rem); }
.lead{ color:var(--ink2); max-width:68ch; margin:0 auto; line-height:1.6; }
.ctas{ display:flex; gap:10px; justify-content:center; margin-top:14px; flex-wrap:wrap; }
.btn{ display:inline-flex; align-items:center; justify-content:center; padding:.78rem 1.1rem; border-radius:12px; font-weight:900; text-decoration:none; border:1px solid #34425f; }
.btn-primary{ color:#111827; background:linear-gradient(180deg,var(--y1),var(--y2)); border-color:#d97706; box-shadow:0 16px 36px rgba(245,158,11,.22); }
.btn-ghost{ color:var(--ink); background:transparent; }

/* MARQUEE */
.marquee{ padding:14px 0 22px; border-top:1px solid var(--bd); border-bottom:1px solid var(--bd); }
.track{ display:flex; gap:10px; overflow:hidden; mask-image:linear-gradient(to right, transparent, black 8%, black 92%, transparent); }
.track .chip{ flex:0 0 auto; padding:.4rem .8rem; border-radius:999px; background:var(--pill); border:1px solid #263257; color:#e5e7eb; font-weight:800; }
.track{ animation:slide 18s linear infinite; }
@keyframes slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* INFO CARDS */
.grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:32px 0 10px; }
@media (max-width:980px){ .grid3{ grid-template-columns:1fr; } }
.card{ border:1px solid var(--bd); border-radius:var(--rad); background:
  radial-gradient(520px 160px at -10% -10%, rgba(255,255,255,.06), transparent 60%),
  linear-gradient(180deg,#0f172a,#0b1220); box-shadow:var(--shadow); padding:18px; }
.soft .ic{ font-size:26px; }
.soft h3{ margin:.2rem 0 .4rem; }
.bul{ margin:.2rem 0 0; padding-left:18px; color:var(--ink); }
.bul li{ margin:.28rem 0; line-height:1.5; }

/* PLANS */
.plans{ padding:12px 0 8px; }
.plan h3{ margin:.2rem 0 .3rem; font-size:1.26rem; }
.note{ color:var(--ink2); border-left:3px solid #324264; padding-left:.6rem; margin:.4rem 0 .6rem; }
.toggle{ margin-top:.4rem; width:100%; text-align:center; padding:.7rem; border-radius:12px; border:1px dashed #314069; color:#e7e9ee; background:#0e152a; font-weight:900; }
.toggle.on{ border-style:solid; }

.panel-wrap{ margin-top:12px; border-top:1px dashed #2b375b; padding-top:12px; }
.grid3a{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
@media (max-width:980px){ .grid3a{ grid-template-columns:1fr; } }

.field-wrap .label{ font-weight:800; color:var(--ink2); margin-bottom:4px; }
.field{ width:100%; border:1px solid #2a3557; border-radius:12px; padding:.6rem .8rem; background:#0f172a; color:#eaf2ff; }

/* SUMMARY */
.sum{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:8px 0; }
.sbox{ border:1px solid #2b3656; border-radius:14px; background:#0f172a; padding:.7rem .9rem; }
.sbox.ok{ outline:2px solid rgba(34,197,94,.24); }
.k{ font-size:.9rem; font-weight:800; color:#a5b4fc; }
.v{ font-size:1.28rem; font-weight:1000; }

.row-actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* CTA BAND */
.cta-band{ margin:28px 0 0; padding:28px 0; background:
  linear-gradient(135deg, rgba(245,158,11,.14), rgba(88,80,236,.14)); border-top:1px solid var(--bd); border-bottom:1px solid var(--bd); }
.cta-band .inner{ display:flex; justify-content:space-between; align-items:center; gap:16px; }
.cta-band h3{ margin:0 0 .2rem; }
.muted{ color:var(--ink2); }
@media (max-width:980px){ .cta-band .inner{ flex-direction:column; align-items:flex-start; } }

/* FAQS */
.faqs{ padding:22px 0 44px; }
.grid2{ display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
@media (max-width:980px){ .grid2{ grid-template-columns:1fr; } }
.faq{ border:1px solid var(--bd); border-radius:14px; padding:12px 14px; background:#0f172a; }
.faq summary{ font-weight:900; cursor:pointer; }
.faq p{ color:var(--ink2); margin:.4rem 0 0; }
`;