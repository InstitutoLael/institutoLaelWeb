// src/pages/Convenios.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ===== Datos reales (tus módulos) =====
import {
  LSCH_GROUP_PLANS,
  LSCH_ENROLLMENT_FEE,
  CHURCH_CONVENIO,
  clp as clpLS,
} from "../data/lsch.js";

import {
  ENROLLMENT_FEE as HS_ENROLLMENT_FEE, // matrícula Homeschool
  clp as clpHS,
} from "../data/homeschool.js";

// Utilitario CLP genérico
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// WhatsApp (sin +)
const WAPP = "56964626568";

export default function Convenios() {
  // ===== valores LSCh reales desde data =====
  const publicLSChMonthly =
    LSCH_GROUP_PLANS?.find((p) => p.id === "g-month")?.monthly ?? 17990;
  const churchMonthly = CHURCH_CONVENIO?.monthlyFlat ?? 11990;

  // ===== estados para estimadores (plegables) =====
  const [showChurchCalc, setShowChurchCalc] = useState(false);
  const [showSchoolCalc, setShowSchoolCalc] = useState(false);
  const [showCompanyCalc, setShowCompanyCalc] = useState(false);

  // ——— Iglesias / Red
  const [ig, setIg] = useState({ personas: 1, meses: 1, codigo: "" });
  const igTotals = useMemo(() => {
    const p = Math.max(1, Number(ig.personas || 1));
    const m = Math.max(1, Number(ig.meses || 1));
    const publico = publicLSChMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    const convenio = churchMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    return {
      publico,
      convenio,
      ahorro: Math.max(0, publico - convenio),
    };
  }, [ig.personas, ig.meses, publicLSChMonthly, churchMonthly]);

  // ——— Colegios / Homeschool
  const [ol, setOl] = useState({ personas: 1, meses: 1, mensualBase: "" });
  const olNums = useMemo(() => {
    const p = Math.max(1, Number(ol.personas || 1));
    const m = Math.max(1, Number(ol.meses || 1));
    const base = Number(String(ol.mensualBase).replace(/[^\d]/g, "")) || 0;
    const totalPublico = base * p * m + HS_ENROLLMENT_FEE * p;
    const totalConvenio =
      Math.round(base * 0.9) * p * m + Math.round(HS_ENROLLMENT_FEE * 0.5) * p;
    return {
      base,
      totalPublico,
      totalConvenio,
      ahorro: Math.max(0, totalPublico - totalConvenio),
    };
  }, [ol]);

  // ——— Empresas
  const [ino, setIno] = useState({ totalSinConvenio: "" });
  const inoNums = useMemo(() => {
    const bruto =
      Number(String(ino.totalSinConvenio).replace(/[^\d]/g, "")) || 0;
    const conConvenio = Math.round(bruto * 0.95);
    return {
      bruto,
      conConvenio,
      ahorro: Math.max(0, bruto - conConvenio),
    };
  }, [ino.totalSinConvenio]);

  // Mensajes WA
  const waChurch = encodeURIComponent(
    `Hola 👋, quiero activar convenio para Red de Iglesias (LSCh).\n` +
      `Personas: ${ig.personas}\nMeses: ${ig.meses}\n` +
      (ig.codigo?.trim() ? `Código: ${ig.codigo}\n` : "") +
      `Total público aprox.: ${clp(igTotals.publico)}\n` +
      `Total convenio aprox.: ${clp(igTotals.convenio)}\n` +
      `¿Me ayudan con el contrato de participación?`
  );
  const waSchool = encodeURIComponent(
    `Hola 👋, soy de colegio/homeschool.\n` +
      `Mensual sin convenio (CLP): ${clp(olNums.base)}\n` +
      `Personas: ${ol.personas} | Meses: ${ol.meses}\n` +
      `Total público aprox.: ${clp(olNums.totalPublico)}\n` +
      `Total convenio aprox.: ${clp(olNums.totalConvenio)}\n` +
      `¿Formalizamos –10% mensual y –50% matrícula?`
  );
  const waIno = encodeURIComponent(
    `Hola 👋, colaborador/a de empresa.\n` +
      `Total sin convenio: ${clp(inoNums.bruto)}\n` +
      `Total con –5%: ${clp(inoNums.conConvenio)}\n` +
      `¿Podemos avanzar con propuesta + contrato?`
  );
  const waPropose = encodeURIComponent(
    `Hola 👋, quiero proponer un convenio.\n` +
      `Organización: ______\nTamaño estimado: ______\nContacto: ______\n` +
      `¿Agendamos una llamada de 15 min?`
  );

  return (
    <main className="cv-landing">
      <style>{styles}</style>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="tag">Convenios & Partners</div>
          <h1>Beneficios preferentes por pertenencia</h1>
          <p className="lead">
            Precio preferente para <b>red de iglesias</b>, <b>colegios</b> y{" "}
            <b>empresas</b>. Si perteneces a un partner, validas tu pertenencia y
            el descuento se aplica de forma <b>automática</b>. Para nuevos acuerdos,
            lo dejamos listo en <b>20 minutos</b>.
          </p>

          <div className="cta">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${waPropose}`}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar convenio
            </a>
            <Link className="btn btn-outline" to="/inscripcion">
              Inscribirme
            </Link>
          </div>

          {/* Marquee */}
          <div className="marquee" aria-label="Partners">
            <div className="marquee__track">
              {[
                "Red de Iglesias",
                "Colegios",
                "Empresas",
                "Nuevo partner",
                "Homeschool",
                "Programas corporativos",
              ].map((p, i) => (
                <span key={i} className="chip">
                  {p}
                </span>
              ))}
              {[
                "Red de Iglesias",
                "Colegios",
                "Empresas",
                "Nuevo partner",
                "Homeschool",
                "Programas corporativos",
              ].map((p, i) => (
                <span key={`dup-${i}`} className="chip">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINALIDAD ===== */}
      <section className="purpose">
        <div className="container grid-3">
          <article className="p-card">
            <h3>¿Para qué existe?</h3>
            <p>
              Acercar formación de calidad con <b>precios justos</b> a comunidades
              reales. Formalizamos la pertenencia y el beneficio queda aplicado
              de forma simple y transparente.
            </p>
          </article>
          <article className="p-card">
            <h3>¿Cómo funciona?</h3>
            <ul>
              <li>Validación rápida (documento, correo o código).</li>
              <li>Firma de <b>contrato de participación</b>.</li>
              <li>Descuento automático mientras la afiliación esté vigente.</li>
            </ul>
          </article>
          <article className="p-card">
            <h3>¿Qué obtienes?</h3>
            <ul>
              <li>Precio preferente para tu organización.</li>
              <li>Soporte dedicado y onboarding sin costo.</li>
              <li>Reporte ejecutivo cuando aplica (empresas).</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ===== PLANES / TARJETAS ===== */}
      <section className="plans">
        <div className="container grid-3">
          {/* Iglesias */}
          <PlanCard
            tone="blue"
            title="Red de Iglesias · LSCh"
            bullets={[
              `Mensual público (ref.): ${clpLS(publicLSChMonthly)}`,
              `Mensual convenio: ${clpLS(churchMonthly)}`,
              `Matrícula: ${clpLS(LSCH_ENROLLMENT_FEE)}`,
            ]}
            note="Aplica a planes grupales online. Verificación simple: carta pastoral o código de convenio."
            primary={{
              label: "Activar por WhatsApp",
              href: `https://wa.me/${WAPP}?text=${waChurch}`,
            }}
            secondary={{ label: "Inscribirme", to: "/inscripcion" }}
          >
            <Collapser
              open={showChurchCalc}
              onToggle={() => setShowChurchCalc((s) => !s)}
              label="Ver estimador rápido"
            >
              <div className="grid-3 form">
                <Field label="Personas">
                  <input
                    className="field"
                    type="number"
                    min="1"
                    value={ig.personas}
                    onChange={(e) =>
                      setIg((s) => ({ ...s, personas: Number(e.target.value) || 1 }))
                    }
                  />
                </Field>
                <Field label="Meses">
                  <input
                    className="field"
                    type="number"
                    min="1"
                    value={ig.meses}
                    onChange={(e) =>
                      setIg((s) => ({ ...s, meses: Number(e.target.value) || 1 }))
                    }
                  />
                </Field>
                <Field label="Código (opcional)">
                  <input
                    className="field"
                    value={ig.codigo}
                    onChange={(e) => setIg((s) => ({ ...s, codigo: e.target.value }))}
                  />
                </Field>
              </div>

              <div className="sum grid-3">
                <Sum label="Total público" value={clp(igTotals.publico)} />
                <Sum label="Total convenio" value={clp(igTotals.convenio)} ok />
                <Sum label="Ahorro estimado" value={clp(igTotals.ahorro)} />
              </div>
            </Collapser>
          </PlanCard>

          {/* Colegios / Homeschool */}
          <PlanCard
            tone="green"
            title="Colegios / Homeschool"
            bullets={[
              "Regla clara: –10% mensual sobre tu plan.",
              `Matrícula Homeschool: –50% (de ${clpHS(
                HS_ENROLLMENT_FEE
              )} → ${clpHS(Math.round(HS_ENROLLMENT_FEE * 0.5))}).`,
            ]}
            note="Como el mensual varía por modo/horas, ingresa tu mensual sin convenio para estimar."
            primary={{
              label: "Activar por WhatsApp",
              href: `https://wa.me/${WAPP}?text=${waSchool}`,
            }}
            secondary={{ label: "Inscribirme", to: "/inscripcion" }}
          >
            <Collapser
              open={showSchoolCalc}
              onToggle={() => setShowSchoolCalc((s) => !s)}
              label="Ver estimador rápido"
            >
              <div className="grid-3 form">
                <Field label="Mensual sin convenio (CLP)">
                  <input
                    className="field"
                    inputMode="numeric"
                    placeholder="$0"
                    value={ol.mensualBase}
                    onChange={(e) =>
                      setOl((s) => ({ ...s, mensualBase: e.target.value }))
                    }
                    onBlur={(e) => {
                      const v =
                        Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                      setOl((s) => ({ ...s, mensualBase: v ? clp(v) : "" }));
                    }}
                  />
                </Field>
                <Field label="Personas">
                  <input
                    className="field"
                    type="number"
                    min="1"
                    value={ol.personas}
                    onChange={(e) =>
                      setOl((s) => ({ ...s, personas: Number(e.target.value) || 1 }))
                    }
                  />
                </Field>
                <Field label="Meses">
                  <input
                    className="field"
                    type="number"
                    min="1"
                    value={ol.meses}
                    onChange={(e) =>
                      setOl((s) => ({ ...s, meses: Number(e.target.value) || 1 }))
                    }
                  />
                </Field>
              </div>

              <div className="sum grid-3">
                <Sum label="Total público" value={clp(olNums.totalPublico)} />
                <Sum label="Total convenio" value={clp(olNums.totalConvenio)} ok />
                <Sum label="Ahorro estimado" value={clp(olNums.ahorro)} />
              </div>
            </Collapser>
          </PlanCard>

          {/* Empresas */}
          <PlanCard
            tone="rose"
            title="Empresas"
            bullets={[
              "Tu tabla por volumen + –5% extra sobre el total post-tramos.",
              "Incluye reporte ejecutivo sin costo.",
            ]}
            note="Ingresa el total sin convenio (después de tus tramos) para ver –5% aplicado."
            primary={{
              label: "Activar por WhatsApp",
              href: `https://wa.me/${WAPP}?text=${waIno}`,
            }}
            secondary={{ label: "Ver programas corporativos", to: "/empresas" }}
          >
            <Collapser
              open={showCompanyCalc}
              onToggle={() => setShowCompanyCalc((s) => !s)}
              label="Ver estimador rápido"
            >
              <div className="grid-3 form">
                <Field label="Total sin convenio (CLP)">
                  <input
                    className="field"
                    inputMode="numeric"
                    placeholder="$0"
                    value={ino.totalSinConvenio}
                    onChange={(e) =>
                      setIno((s) => ({ ...s, totalSinConvenio: e.target.value }))
                    }
                    onBlur={(e) => {
                      const v =
                        Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                      setIno((s) => ({
                        ...s,
                        totalSinConvenio: v ? clp(v) : "",
                      }));
                    }}
                  />
                </Field>
                <div />
                <div />
              </div>

              <div className="sum grid-3">
                <Sum label="Total sin convenio" value={clp(inoNums.bruto)} />
                <Sum label="Total con –5%" value={clp(inoNums.conConvenio)} ok />
                <Sum label="Ahorro estimado" value={clp(inoNums.ahorro)} />
              </div>
            </Collapser>
          </PlanCard>
        </div>
      </section>

      {/* ===== CONTACTO / CTA FINAL ===== */}
      <section className="cta-final">
        <div className="container cta-final__inner">
          <div>
            <h3>¿Listo para activar tu beneficio?</h3>
            <p className="muted">
              Podemos dejarlo operativo hoy. Conversa con nosotros por WhatsApp o envíanos
              un correo con tus datos de verificación.
            </p>
          </div>
          <div className="btns">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${waPropose}`}
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

/* ---------- Subcomponentes de UI ---------- */
function PlanCard({ tone = "blue", title, bullets = [], note, primary, secondary, children }) {
  return (
    <article className={`plan ${tone}`}>
      <div className="plan__head">
        <h3>{title}</h3>
        <ul className="bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {note && <p className="note">{note}</p>}
      </div>

      {children}

      <div className="plan__cta">
        {primary?.href && (
          <a className="btn btn-primary" href={primary.href} target="_blank" rel="noreferrer">
            {primary.label}
          </a>
        )}
        {secondary?.to && (
          <Link className="btn btn-outline" to={secondary.to}>
            {secondary.label}
          </Link>
        )}
      </div>
    </article>
  );
}

function Collapser({ open, onToggle, label, children }) {
  return (
    <div className={`collapser ${open ? "open" : ""}`}>
      <button type="button" className="collapser__btn" onClick={onToggle}>
        {label}
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
      <div className="collapser__content">{open && children}</div>
    </div>
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

function Sum({ label, value, ok = false }) {
  return (
    <div className={`sum__item ${ok ? "ok" : ""}`}>
      <div className="k">{label}</div>
      <div className="v">{value}</div>
    </div>
  );
}

/* ---------- CSS-in-Component ---------- */
const styles = `
:root{
  --bg:#0b1220;
  --panel:#0e1424;
  --soft:#0f172a;
  --bd:#1f2a44;
  --ink:#ffffff;
  --ink2:#e5eefc;
  --muted:#cbd5e1;
  --gold:#fbbf24;
  --blue:#5b6ee7;
  --green:#23a36b;
  --rose:#d28ac3;
  --ok:#16a34a;
  --rad:18px;
  --shadow:0 24px 60px rgba(2,6,23,.35);
}
*{box-sizing:border-box}
.cv-landing{ background:var(--bg); color:var(--ink); font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
.container{ width:min(1120px, 92vw); margin-inline:auto; }

/* ===== HERO ===== */
.hero{
  padding:68px 0 36px;
  background:
    radial-gradient(1000px 360px at 10% -10%, rgba(91,110,231,.18), transparent 60%),
    radial-gradient(900px 320px at 90% -10%, rgba(251,191,36,.14), transparent 60%);
  border-bottom:1px solid var(--bd);
}
.hero__inner{ text-align:center; display:grid; gap:16px; justify-items:center; }
.tag{
  display:inline-block; padding:.42rem .7rem; border:1px solid #334155; border-radius:999px;
  font-weight:900; color:#c7d2fe; background:rgba(15,23,42,.6);
}
.hero h1{ margin:.2rem 0 .35rem; font-size:clamp(1.9rem, 1.4rem + 2.4vw, 3rem); letter-spacing:.2px; }
.lead{ color:var(--ink2); max-width:70ch; }
.cta{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:6px; }

/* Marquee */
.marquee{ width:100%; overflow:hidden; border:1px solid var(--bd); border-radius:999px; margin-top:14px; backdrop-filter:saturate(110%) blur(2px); }
.marquee__track{ display:flex; gap:10px; padding:8px; white-space:nowrap; animation:slide 18s linear infinite; }
.chip{
  display:inline-block; padding:.34rem .7rem; border-radius:999px;
  background:#0f1a30; border:1px solid #263257; color:#e5e7eb; font-weight:800;
}
@keyframes slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ===== FINALIDAD ===== */
.purpose{ padding:28px 0 6px; }
.grid-3{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; }
@media (max-width:980px){ .grid-3{ grid-template-columns:1fr; } }
.p-card{
  background:linear-gradient(180deg, var(--soft), var(--panel));
  border:1px solid var(--bd); border-radius:var(--rad); padding:18px; box-shadow:var(--shadow);
}
.p-card h3{ margin:0 0 6px; }
.p-card ul{ margin:.4rem 0 0; padding-left:18px; }

/* ===== PLANES ===== */
.plans{ padding:8px 0 24px; }
.plan{
  display:flex; flex-direction:column; gap:12px;
  background:linear-gradient(180deg, var(--soft), var(--panel));
  border:1px solid var(--bd); border-radius:var(--rad); padding:18px; box-shadow:var(--shadow);
}
.plan.blue{ outline:1px solid rgba(91,110,231,.25); }
.plan.green{ outline:1px solid rgba(35,163,107,.25); }
.plan.rose{ outline:1px solid rgba(210,138,195,.25); }
.plan__head h3{ margin:0 0 8px; }
.bullets{ margin:.2rem 0 .1rem; padding-left:18px; }
.note{
  margin:.35rem 0 0; color:var(--ink2); font-size:.95rem;
  border-left:3px solid #334155; padding-left:.6rem;
}

/* Collapser */
.collapser{ border:1px dashed #2d3b63; border-radius:14px; background:#0f172a; }
.collapser__btn{
  width:100%; text-align:center; background:transparent; border:0; color:var(--ink2);
  padding:.7rem .9rem; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
}
.collapser__btn:hover{ background:rgba(255,255,255,.04); }
.collapser__content{ padding:10px 12px 14px; }
.form .field{ width:100%; border:1px solid #2a3557; border-radius:12px; padding:.6rem .75rem; background:#0e1424; color:var(--ink); }
.field-wrap .label{ display:block; font-weight:800; color:#a9b6d9; margin:0 0 4px; }

/* Sumarios */
.sum{ align-items:stretch; }
.sum__item{
  border:1px solid #2a3557; border-radius:14px; padding:12px; background:#0f172a;
}
.sum__item.ok{ outline:2px solid rgba(22,163,74,.35); }
.k{ font-weight:800; color:#93a5c6; }
.v{ font-weight:1000; font-size:1.18rem; margin-top:.1rem; }

/* CTA del plan */
.plan__cta{ display:flex; gap:8px; flex-wrap:wrap; }

/* CTA FINAL */
.cta-final{
  border-top:1px solid var(--bd);
  background:linear-gradient(135deg, rgba(251,191,36,.12), rgba(91,110,231,.12));
  padding:28px 0;
}
.cta-final__inner{ display:flex; align-items:center; justify-content:space-between; gap:14px; }
.cta-final h3{ margin:0 0 4px; }
.cta-final .muted{ color:var(--ink2); margin:0; }
.cta-final .btns{ display:flex; gap:8px; flex-wrap:wrap; }
@media (max-width:980px){
  .cta-final__inner{ flex-direction:column; align-items:flex-start; }
}

/* Botones */
.btn{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.78rem 1.05rem; border-radius:12px; border:1px solid #334155;
  font-weight:900; text-decoration:none; cursor:pointer; transition:.18s ease;
  color:var(--ink);
}
.btn-primary{
  background:linear-gradient(180deg, var(--gold), #f59e0b); color:#0b1220; border-color:#d97706;
}
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(245,158,11,.25); }
.btn-outline{ background:transparent; }
.btn-outline:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.28); }
`;