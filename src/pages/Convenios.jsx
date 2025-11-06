// src/pages/Convenios.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ================== Datos (de tus módulos) ==================
   Mantengo tus imports reales. Si alguno no existe en tu repo,
   ajusta la ruta o reemplaza por números fijos donde corresponda. */
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

/* ================== Helpers ================== */
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const WAPP = "56964626568";

/* ================== Página ================== */
export default function Convenios() {
  const [tab, setTab] = useState("iglesias"); // iglesias | colegios | empresas | proponer

  // -------- Iglesias (LSCh) --------
  const publicLSChMonthly =
    LSCH_GROUP_PLANS?.find((p) => p.id === "g-month")?.monthly ?? 17990;
  const churchMonthly = CHURCH_CONVENIO?.monthlyFlat ?? 11990;

  const [ig, setIg] = useState({ red: "Nor", personas: 1, meses: 1, codigo: "" });

  const igTotales = useMemo(() => {
    const p = Math.max(1, Number(ig.personas || 1));
    const m = Math.max(1, Number(ig.meses || 1));
    const publico = publicLSChMonthly * p * m + (LSCH_ENROLLMENT_FEE || 10990) * p;
    const convenio = churchMonthly * p * m + (LSCH_ENROLLMENT_FEE || 10990) * p;
    const ahorro = Math.max(0, publico - convenio);
    return { publico, convenio, ahorro };
  }, [ig.personas, ig.meses, publicLSChMonthly, churchMonthly]);

  const waTextIglesias = encodeURIComponent(
    [
      "Hola 👋 Quiero activar convenio *Red de Iglesias* para LSCh.",
      `Red: ${ig.red}`,
      `Personas: ${ig.personas}`,
      `Meses: ${ig.meses}`,
      ig.codigo?.trim() ? `Código: ${ig.codigo}` : "",
      `Total público aprox.: ${clp(igTotales.publico)}`,
      `Total convenio aprox.: ${clp(igTotales.convenio)}`,
      "¿Me ayudan con el contrato de participación?",
    ]
      .filter(Boolean)
      .join("\n")
  );

  // -------- Colegios / Homeschool --------
  const [hs, setHs] = useState({ mensualBase: "", personas: 1, meses: 1 });
  const hsNums = useMemo(() => {
    const p = Math.max(1, Number(hs.personas || 1));
    const m = Math.max(1, Number(hs.meses || 1));
    const base = Number(String(hs.mensualBase).replace(/[^\d]/g, "")) || 0;

    const totalPublico = base * p * m + (HS_ENROLLMENT_FEE || 29990) * p;
    const totalConvenio =
      Math.round(base * 0.9) * p * m + Math.round((HS_ENROLLMENT_FEE || 29990) * 0.5) * p;
    const ahorro = Math.max(0, totalPublico - totalConvenio);
    return { base, totalPublico, totalConvenio, ahorro };
  }, [hs]);

  const waTextHS = encodeURIComponent(
    [
      "Hola 👋 Soy de *colegio/homeschool* y quiero convenio.",
      `Mensual sin convenio: ${clp(hsNums.base)}`,
      `Personas: ${hs.personas}`,
      `Meses: ${hs.meses}`,
      `Total público aprox.: ${clp(hsNums.totalPublico)}`,
      `Total convenio aprox.: ${clp(hsNums.totalConvenio)}`,
      "¿Me envían el contrato para aplicar –10% mensual y –50% matrícula?",
    ].join("\n")
  );

  // -------- Empresas --------
  const [emp, setEmp] = useState({ totalSin: "" });
  const empNums = useMemo(() => {
    const bruto = Number(String(emp.totalSin).replace(/[^\d]/g, "")) || 0;
    const conConvenio = Math.round(bruto * 0.95);
    return { bruto, conConvenio, ahorro: Math.max(0, bruto - conConvenio) };
  }, [emp.totalSin]);

  const waTextEmp = encodeURIComponent(
    [
      "Hola 👋 Soy de *empresa* y quiero convenio.",
      `Total sin convenio (post-tramos): ${clp(empNums.bruto)}`,
      `Total con convenio –5%: ${clp(empNums.conConvenio)}`,
      "¿Podemos formalizar con propuesta + contrato?",
    ].join("\n")
  );

  const waTextProponer = encodeURIComponent(
    [
      "Hola 👋 Quiero proponer un convenio.",
      "Organización: ______",
      "Tamaño estimado: ______",
      "Contacto: ______",
      "¿Agendamos una llamada de 15 minutos?",
    ].join("\n")
  );

  return (
    <section className="cv-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div>
            <span className="kicker">Convenios & Partners</span>
            <h1>Beneficios preferentes por pertenencia</h1>
            <p className="lead">
              Precio preferente para <b>red de iglesias</b>, <b>colegios</b> y <b>empresas</b>.
              Si perteneces a un partner, validas tu pertenencia y el descuento se aplica de forma
              <b> automática</b>. Para nuevos acuerdos, lo dejamos listo en <b>15 minutos</b>.
            </p>

            <div className="cta-row">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP}?text=${waTextProponer}`}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar convenio
              </a>
              <Link className="btn btn-outline" to="/inscripcion">
                Inscribirme
              </Link>
            </div>
          </div>

          <div className="hero__marquee" aria-label="Partners">
            <div className="mq-track">
              {["Red de Iglesias", "Colegios", "Empresas", "Nuevo partner"].map((p, i) => (
                <span key={i} className="pill">
                  {p}
                </span>
              ))}
              {["Red de Iglesias", "Colegios", "Empresas", "Nuevo partner"].map((p, i) => (
                <span key={`dup-${i}`} className="pill">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className="container">
        <nav className="tabs" role="tablist" aria-label="Tipos de convenio">
          <Tab id="ig" label="Red de Iglesias" on={tab === "iglesias"} onClick={() => setTab("iglesias")} />
          <Tab id="co" label="Colegios / Homeschool" on={tab === "colegios"} onClick={() => setTab("colegios")} />
          <Tab id="em" label="Empresas" on={tab === "empresas"} onClick={() => setTab("empresas")} />
          <Tab id="pr" label="+ Proponer convenio" on={tab === "proponer"} onClick={() => setTab("proponer")} />
        </nav>
      </div>

      {/* CONTENIDO */}
      <div className="container blocks">
        {tab === "iglesias" && (
          <section className="block">
            <div className="grid g2">
              <article className="card">
                <header className="c-head">
                  <h2 className="h6">Red de iglesias · LSCh</h2>
                  <p className="mini">
                    Precio preferente para <b>planes grupales online</b> de LSCh.
                    Verificación simple (carta pastoral o <b>código</b>).
                  </p>
                </header>

                <div className="grid g3">
                  <Field label="Iglesia / Red">
                    <select
                      className="field"
                      value={ig.red}
                      onChange={(e) => setIg((s) => ({ ...s, red: e.target.value }))}
                    >
                      <option>Nor</option>
                      <option>Sur</option>
                      <option>Centro</option>
                    </select>
                  </Field>

                  <Field label="Personas">
                    <input
                      className="field"
                      type="number"
                      min="1"
                      value={ig.personas}
                      onChange={(e) =>
                        setIg((s) => ({ ...s, personas: Math.max(1, Number(e.target.value) || 1) }))
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
                        setIg((s) => ({ ...s, meses: Math.max(1, Number(e.target.value) || 1) }))
                      }
                    />
                  </Field>
                </div>

                <div className="grid g3">
                  <Stat k="Mensual público" v={clpLS(publicLSChMonthly)} />
                  <Stat k="Mensual convenio" v={clpLS(churchMonthly)} ok />
                  <Stat k="Matrícula LSCh" v={clpLS(LSCH_ENROLLMENT_FEE)} />
                </div>

                <div className="grid g3">
                  <Stat k="Total público" v={clp(igTotales.publico)} />
                  <Stat k="Total convenio" v={clp(igTotales.convenio)} ok />
                  <Stat k="Ahorro estimado" v={clp(igTotales.ahorro)} />
                </div>

                <Field label="Código (opcional)">
                  <input
                    className="field"
                    value={ig.codigo}
                    placeholder="Si te entregaron uno"
                    onChange={(e) => setIg((s) => ({ ...s, codigo: e.target.value }))}
                  />
                </Field>

                <div className="cta-row mt16">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextIglesias}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Activar convenio por WhatsApp
                  </a>
                  <Link className="btn btn-outline" to="/inscripcion">
                    Inscribirme
                  </Link>
                </div>
              </article>

              <Aside
                title="Verificación simple"
                items={[
                  "Carta pastoral o líder con nombre del participante.",
                  "Correo institucional (si existe) o código de convenio.",
                  "Beneficio vigente mientras exista pertenencia + contrato firmado.",
                ]}
              />
            </div>
          </section>
        )}

        {tab === "colegios" && (
          <section className="block">
            <div className="grid g2">
              <article className="card">
                <header className="c-head">
                  <h2 className="h6">Colegios / Homeschool</h2>
                  <p className="mini">
                    Regla clara: <b>–10%</b> mensual sobre tu plan + <b>–50%</b> de matrícula.
                    Ingresa tu mensual sin convenio para estimar.
                  </p>
                </header>

                <div className="grid g3">
                  <Field label="Mensual sin convenio (CLP)">
                    <input
                      className="field"
                      inputMode="numeric"
                      placeholder="$0"
                      value={hs.mensualBase}
                      onChange={(e) => setHs((s) => ({ ...s, mensualBase: e.target.value }))}
                      onBlur={(e) => {
                        const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                        setHs((s) => ({ ...s, mensualBase: v ? clp(v) : "" }));
                      }}
                    />
                  </Field>

                  <Field label="Personas">
                    <input
                      className="field"
                      type="number"
                      min="1"
                      value={hs.personas}
                      onChange={(e) =>
                        setHs((s) => ({ ...s, personas: Math.max(1, Number(e.target.value) || 1) }))
                      }
                    />
                  </Field>

                  <Field label="Meses">
                    <input
                      className="field"
                      type="number"
                      min="1"
                      value={hs.meses}
                      onChange={(e) =>
                        setHs((s) => ({ ...s, meses: Math.max(1, Number(e.target.value) || 1) }))
                      }
                    />
                  </Field>
                </div>

                <div className="grid g3">
                  <Stat k="Total público" v={clp(hsNums.totalPublico)} />
                  <Stat k="Total convenio" v={clp(hsNums.totalConvenio)} ok />
                  <Stat k="Ahorro estimado" v={clp(hsNums.ahorro)} />
                </div>

                <div className="cta-row mt16">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextHS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Activar convenio por WhatsApp
                  </a>
                  <Link className="btn btn-outline" to="/inscripcion">
                    Inscribirme
                  </Link>
                </div>
              </article>

              <Aside
                title="Verificación simple"
                items={[
                  "Certificado de alumno/a regular del año en curso.",
                  "Correo del colegio o comprobante de pago.",
                  `Matrícula base: ${clpHS(HS_ENROLLMENT_FEE)} → convenio ${clpHS(
                    Math.round((HS_ENROLLMENT_FEE || 0) * 0.5)
                  )}.`,
                ]}
              />
            </div>
          </section>
        )}

        {tab === "empresas" && (
          <section className="block">
            <div className="grid g2">
              <article className="card">
                <header className="c-head">
                  <h2 className="h6">Empresas</h2>
                  <p className="mini">
                    Tu tabla por volumen + <b>–5% extra</b> sobre el total post-tramos.
                    Incluye <b>reporte ejecutivo</b> sin costo.
                  </p>
                </header>

                <Field label="Total sin convenio (CLP)">
                  <input
                    className="field"
                    inputMode="numeric"
                    placeholder="$0"
                    value={emp.totalSin}
                    onChange={(e) => setEmp((s) => ({ ...s, totalSin: e.target.value }))}
                    onBlur={(e) => {
                      const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                      setEmp((s) => ({ ...s, totalSin: v ? clp(v) : "" }));
                    }}
                  />
                </Field>

                <div className="grid g3">
                  <Stat k="Total sin convenio" v={clp(empNums.bruto)} />
                  <Stat k="Total con –5%" v={clp(empNums.conConvenio)} ok />
                  <Stat k="Ahorro estimado" v={clp(empNums.ahorro)} />
                </div>

                <div className="cta-row mt16">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextEmp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Activar convenio por WhatsApp
                  </a>
                  <Link className="btn btn-outline" to="/empresas">
                    Ver programas corporativos
                  </Link>
                </div>
              </article>

              <Aside
                title="Verificación simple"
                items={[
                  "Correo corporativo o credencial digital/física.",
                  "Confirmación con propuesta + contrato.",
                ]}
              />
            </div>
          </section>
        )}

        {tab === "proponer" && (
          <section className="block">
            <div className="grid g2">
              <article className="card">
                <header className="c-head">
                  <h2 className="h6">Proponer convenio</h2>
                  <p className="mini">Cuéntanos tu organización y tamaño estimado.</p>
                </header>

                <form
                  className="grid g2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(`https://wa.me/${WAPP}?text=${waTextProponer}`, "_blank", "noreferrer");
                  }}
                >
                  <Field label="Organización">
                    <input className="field" placeholder="Nombre de la entidad" required />
                  </Field>
                  <Field label="Tamaño estimado (personas)">
                    <input className="field" placeholder="Ej: 20–50" required />
                  </Field>
                  <Field label="Contacto (correo o WhatsApp)">
                    <input className="field" placeholder="tu@correo.cl / +56 9 ..." required />
                  </Field>

                  <div className="cta-row mt8">
                    <button className="btn btn-primary" type="submit">
                      Agendar por WhatsApp
                    </button>
                    <Link className="btn btn-outline" to="/contacto">
                      Escribir por correo
                    </Link>
                  </div>
                </form>
              </article>

              <Aside
                title="Cómo se activa"
                items={[
                  "Validación simple (documento/código).",
                  "Firma de contrato de participación.",
                  "Descuento aplicado de forma automática.",
                ]}
              />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

/* ================== Subcomponentes ================== */
function Tab({ id, label, on, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      id={`tab-${id}`}
      className={"tab " + (on ? "on" : "")}
      onClick={onClick}
    >
      {label}
    </button>
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

function Stat({ k, v, ok }) {
  return (
    <div className={"stat " + (ok ? "ok" : "")}>
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </div>
  );
}

function Aside({ title, items = [] }) {
  return (
    <aside className="aside">
      <h3 className="h6">{title}</h3>
      <ul className="mini">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      <p className="tiny m0">Aplica mientras la acreditación esté al día.</p>
    </aside>
  );
}

/* ================== CSS local ================== */
const css = `
:root{
  --bg:#0b1220; --panel:#0f172a; --ink:#f8fafc; --ink2:#cbd5e1; --muted:#a8b3c7;
  --bd:#1f2a44; --accent:#f59e0b; --accent2:#5850ec; --ok:#16a34a;
  --rad:16px; --shadow:0 12px 32px rgba(2,6,23,.35);
}
*{box-sizing:border-box}
.cv-page{background:var(--bg); color:var(--ink); font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif}
.container{width:min(1120px,92vw); margin:0 auto; padding:0 4px}
.m0{margin:0}
.mt8{margin-top:8px}
.mt16{margin-top:16px}

/* HERO */
.hero{
  padding:32px 0 18px;
  border-bottom:1px solid var(--bd);
  background:
    radial-gradient(820px 300px at -6% -10%, rgba(88,80,236,.12), transparent 60%),
    radial-gradient(760px 280px at 106% -10%, rgba(245,158,11,.12), transparent 60%);
}
.hero__grid{display:grid; grid-template-columns:1.1fr .9fr; gap:20px; align-items:center}
@media (max-width:980px){ .hero__grid{grid-template-columns:1fr} }
.kicker{display:inline-block; font-weight:900; letter-spacing:.2px; color:#c7d2fe}
.hero h1{margin:.2rem 0 .5rem; font-size:clamp(1.8rem, 3vw + .6rem, 2.6rem)}
.lead{color:var(--ink2); max-width:62ch}
.cta-row{display:flex; gap:10px; flex-wrap:wrap; margin-top:12px}

/* Marquee */
.hero__marquee{
  overflow:hidden; border:1px solid var(--bd); border-radius:14px; padding:10px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);
}
.mq-track{display:flex; gap:12px; white-space:nowrap; animation:slide 16s linear infinite}
.pill{
  display:inline-block; padding:.32rem .65rem; border-radius:999px;
  background:#101a2f; border:1px solid #263257; color:#e5e7eb; font-weight:800
}
@keyframes slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* Tabs */
.tabs{display:flex; gap:10px; flex-wrap:wrap; margin:18px 0 10px}
.tab{
  padding:.55rem .9rem; border-radius:999px; border:1px solid #2b3656;
  background:#0f172a; color:#eaf2ff; font-weight:900;
}
.tab.on{ border-color:#6b7cff; box-shadow:0 0 0 2px rgba(79,70,229,.18) inset }

/* Blocks */
.blocks{padding:6px 0 28px}
.block{margin:16px 0 26px}

/* Grid */
.grid{display:grid; gap:14px}
.g2{grid-template-columns:1fr 0.75fr}
.g3{grid-template-columns:repeat(3, minmax(0,1fr))}
@media (max-width:980px){ .g2,.g3{grid-template-columns:1fr} }

/* Card & Aside */
.card, .aside{
  border:1px solid var(--bd); border-radius:var(--rad);
  background:
    radial-gradient(540px 180px at -10% -10%, rgba(255,255,255,.05), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow); padding:16px;
}
.c-head{margin-bottom:6px}
.h6{font-size:1.06rem; font-weight:900}
.mini{margin:.4rem 0 0; padding-left:18px; color:var(--ink)}
.mini li{margin:.2rem 0}
.tiny{font-size:.88rem; color:var(--ink2)}

/* Field */
.field-wrap .label{font-weight:800; color:var(--muted); margin-bottom:6px}
.field{
  width:100%; border:1px solid #2a3557; border-radius:12px;
  padding:.6rem .8rem; background:#0f172a; color:#eaf2ff
}

/* Stats */
.stat{border:1px solid #263257; border-radius:12px; padding:.7rem .8rem; background:#0f172a}
.stat.ok{border-color:#1f8a4d}
.stat .k{font-weight:800; color:var(--muted); margin-bottom:2px}
.stat .v{font-size:1.1rem; font-weight:1000}

/* Buttons */
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.78rem 1.05rem; border-radius:12px; border:1px solid transparent;
  text-decoration:none; font-weight:900; cursor:pointer; transition:.18s ease;
}
.btn-primary{background:linear-gradient(180deg,#fbbf24,#f59e0b); color:#0b1220; border-color:#d97706}
.btn-primary:hover{transform:translateY(-2px); box-shadow:0 16px 32px rgba(245,158,11,.25)}
.btn-outline{border-color:#475569; color:#f1f5f9; background:transparent}
.btn-outline:hover{transform:translateY(-2px); box-shadow:0 16px 28px rgba(2,6,23,.28)}
`;