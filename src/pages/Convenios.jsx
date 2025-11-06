// src/pages/Convenios.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ================== DATA ================== */
import {
  LSCH_GROUP_PLANS,
  CHURCH_CONVENIO,
  LSCH_ENROLLMENT_FEE,
  clp as clpLS,
} from "../data/lsch.js";

import {
  ENROLLMENT_FEE as HS_ENROLLMENT_FEE,
  clp as clpHS,
} from "../data/homeschool.js";

/* ================== HELPERS ================== */
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const WAPP = "56964626568";

/* ================== PAGE COMPONENT ================== */
export default function Convenios() {
  const [tab, setTab] = useState("iglesias");

  // ---------- IGLESIAS ----------
  const publicLSChMonthly =
    LSCH_GROUP_PLANS?.find((p) => p.id === "g-month")?.monthly ?? 17990;
  const churchMonthly = CHURCH_CONVENIO?.monthlyFlat ?? 11990;

  const [ig, setIg] = useState({
    personas: 1,
    meses: 1,
    iglesia: "",
    codigo: "",
  });

  const igTotales = useMemo(() => {
    const p = Math.max(1, Number(ig.personas || 1));
    const m = Math.max(1, Number(ig.meses || 1));
    const publico = publicLSChMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    const convenio = churchMonthly * p * m + LSCH_ENROLLMENT_FEE * p;
    const ahorro = Math.max(0, publico - convenio);
    return { publico, convenio, ahorro };
  }, [ig.personas, ig.meses, publicLSChMonthly, churchMonthly]);

  const waTextIglesias = encodeURIComponent(
    `Hola 👋, quiero activar convenio de Red de Iglesias para LSCh.\n` +
      `Iglesia/Red: ${ig.iglesia || "—"}\n` +
      (ig.codigo?.trim() ? `Código: ${ig.codigo}\n` : "") +
      `Personas: ${ig.personas}\nMeses: ${ig.meses}\n` +
      `Total público aprox.: ${clp(igTotales.publico)}\n` +
      `Total convenio aprox.: ${clp(igTotales.convenio)}\n` +
      `¿Me ayudan con el contrato de participación?`
  );

  // ---------- COLEGIOS / HOMESCHOOL ----------
  const [col, setCol] = useState({
    personas: 1,
    meses: 1,
    mensualBase: "",
    colegio: "Los Olivos HomeSchool",
  });

  const colNums = useMemo(() => {
    const p = Math.max(1, Number(col.personas || 1));
    const m = Math.max(1, Number(col.meses || 1));
    const base = Number(String(col.mensualBase).replace(/[^\d]/g, "")) || 0;

    const totalPublico = base * p * m + HS_ENROLLMENT_FEE * p;
    const totalConvenio =
      Math.round(base * 0.9) * p * m + Math.round(HS_ENROLLMENT_FEE * 0.5) * p;
    const ahorro = Math.max(0, totalPublico - totalConvenio);
    return { base, totalPublico, totalConvenio, ahorro };
  }, [col]);

  const waTextColegios = encodeURIComponent(
    `Hola 👋, soy de ${col.colegio}.\n` +
      `Mensual sin convenio: ${clp(colNums.base)}\n` +
      `Personas: ${col.personas}\nMeses: ${col.meses}\n` +
      `Total público aprox.: ${clp(colNums.totalPublico)}\n` +
      `Total convenio aprox.: ${clp(colNums.totalConvenio)}\n` +
      `¿Me envían el contrato para aplicar –10% mensual y –50% matrícula?`
  );

  // ---------- EMPRESAS ----------
  const [emp, setEmp] = useState({ totalSinConvenio: "" });
  const empNums = useMemo(() => {
    const bruto =
      Number(String(emp.totalSinConvenio).replace(/[^\d]/g, "")) || 0;
    const conConvenio = Math.round(bruto * 0.95);
    const ahorro = Math.max(0, bruto - conConvenio);
    return { bruto, conConvenio, ahorro };
  }, [emp.totalSinConvenio]);

  const waTextEmpresas = encodeURIComponent(
    `Hola 👋, convenio empresas.\n` +
      `Total sin convenio (post-tramos): ${clp(empNums.bruto)}\n` +
      `Total con –5%: ${clp(empNums.conConvenio)}\n` +
      `¿Podemos formalizar el convenio y contrato?`
  );

  // ---------- PROPONER ----------
  const waTextProponer = encodeURIComponent(
    `Hola 👋, quiero proponer un convenio.\n` +
      `Organización: ______\nTamaño estimado: ______\nContacto: ______\n` +
      `¿Agendamos una llamada de 15 min?`
  );

  return (
    <section className="cv-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="kicker">Convenios & Partners</span>
            <h1>Beneficios preferentes por pertenencia</h1>
            <p className="lead">
              Precio preferente para <b>red de iglesias</b>, <b>colegios</b> y{" "}
              <b>empresas</b>. Si perteneces a un partner, validas tu pertenencia y
              el descuento se aplica <b>automático</b>. Para nuevos acuerdos,
              lo dejamos listo en <b>15 minutos</b>.
            </p>
            <div className="cta">
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

          {/* Marquee */}
          <div className="hero__marquee" aria-label="Partners">
            <div className="mq-track">
              {["Red de Iglesias", "Colegios", "Empresas", "Nuevo partner"].map(
                (p, i) => (
                  <span key={i} className="pill">
                    {p}
                  </span>
                )
              )}
              {["Red de Iglesias", "Colegios", "Empresas", "Nuevo partner"].map(
                (p, i) => (
                  <span key={`dup-${i}`} className="pill">
                    {p}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================== CONTENIDO ================== */}
      <div className="container">
        <nav className="tabs" role="tablist" aria-label="Tipos de convenio">
          <Tab id="ig" label="Red de Iglesias" on={tab === "iglesias"} onClick={() => setTab("iglesias")} />
          <Tab id="co" label="Colegios / Homeschool" on={tab === "colegios"} onClick={() => setTab("colegios")} />
          <Tab id="em" label="Empresas" on={tab === "empresas"} onClick={() => setTab("empresas")} />
          <Tab id="pr" label="+ Proponer convenio" on={tab === "proponer"} onClick={() => setTab("proponer")} />
        </nav>

        {/* IGLESIAS */}
        {tab === "iglesias" && (
          <ConvenioCard
            title="Red de Iglesias · LSCh"
            infoNote="Precio preferente para planes grupales online. Requiere verificación simple (carta pastoral o código de convenio)."
            totalPublico={clp(igTotales.publico)}
            totalConvenio={clp(igTotales.convenio)}
            ahorro={clp(igTotales.ahorro)}
            link={`https://wa.me/${WAPP}?text=${waTextIglesias}`}
            fields={
              <>
                <Field label="Iglesia / Red">
                  <input className="field" placeholder="Nombre de la iglesia" value={ig.iglesia} onChange={(e) => setIg((s) => ({ ...s, iglesia: e.target.value }))} />
                </Field>
                <Field label="Personas">
                  <input type="number" min="1" className="field" value={ig.personas} onChange={(e) => setIg((s) => ({ ...s, personas: Number(e.target.value) || 1 }))} />
                </Field>
                <Field label="Meses">
                  <input type="number" min="1" className="field" value={ig.meses} onChange={(e) => setIg((s) => ({ ...s, meses: Number(e.target.value) || 1 }))} />
                </Field>
                <Field label="Código (opcional)">
                  <input className="field" placeholder="Si tienes uno, escríbelo aquí" value={ig.codigo} onChange={(e) => setIg((s) => ({ ...s, codigo: e.target.value }))} />
                </Field>
              </>
            }
          />
        )}

        {/* COLEGIOS */}
        {tab === "colegios" && (
          <ConvenioCard
            title="Colegios / Homeschool"
            infoNote="Descuento –10% mensual y –50% en matrícula. Ingresa tu mensual sin convenio para calcular."
            totalPublico={clp(colNums.totalPublico)}
            totalConvenio={clp(colNums.totalConvenio)}
            ahorro={clp(colNums.ahorro)}
            link={`https://wa.me/${WAPP}?text=${waTextColegios}`}
            fields={
              <>
                <Field label="Colegio / Organización">
                  <input className="field" placeholder="Ej: Los Olivos HomeSchool" value={col.colegio} onChange={(e) => setCol((s) => ({ ...s, colegio: e.target.value }))} />
                </Field>
                <Field label="Mensual sin convenio (CLP)">
                  <input className="field" inputMode="numeric" placeholder="$0" value={col.mensualBase} onChange={(e) => setCol((s) => ({ ...s, mensualBase: e.target.value }))} />
                </Field>
                <Field label="Personas">
                  <input type="number" min="1" className="field" value={col.personas} onChange={(e) => setCol((s) => ({ ...s, personas: Number(e.target.value) || 1 }))} />
                </Field>
                <Field label="Meses">
                  <input type="number" min="1" className="field" value={col.meses} onChange={(e) => setCol((s) => ({ ...s, meses: Number(e.target.value) || 1 }))} />
                </Field>
              </>
            }
          />
        )}

        {/* EMPRESAS */}
        {tab === "empresas" && (
          <ConvenioCard
            title="Empresas"
            infoNote="Tu tabla por volumen + –5% extra sobre el total. Incluye reporte ejecutivo sin costo."
            totalPublico={clp(empNums.bruto)}
            totalConvenio={clp(empNums.conConvenio)}
            ahorro={clp(empNums.ahorro)}
            link={`https://wa.me/${WAPP}?text=${waTextEmpresas}`}
            fields={
              <Field label="Total sin convenio (CLP)">
                <input className="field" inputMode="numeric" placeholder="$0" value={emp.totalSinConvenio} onChange={(e) => setEmp((s) => ({ ...s, totalSinConvenio: e.target.value }))} />
              </Field>
            }
          />
        )}

        {/* PROPONER */}
        {tab === "proponer" && (
          <ConvenioCard
            title="Proponer convenio"
            infoNote="Cuéntanos tu organización y tamaño. Te respondemos en minutos."
            link={`https://wa.me/${WAPP}?text=${waTextProponer}`}
            fields={
              <>
                <Field label="Organización">
                  <input className="field" placeholder="Nombre de la entidad" required />
                </Field>
                <Field label="Tamaño estimado (personas)">
                  <input className="field" placeholder="Ej: 20–50" required />
                </Field>
                <Field label="Contacto (correo o WhatsApp)">
                  <input className="field" placeholder="tu@correo.cl / +56 9 ..." required />
                </Field>
              </>
            }
          />
        )}
      </div>
    </section>
  );
}

/* ---------- SUBCOMPONENTES ---------- */
function Tab({ id, label, on, onClick }) {
  return (
    <button role="tab" aria-selected={on} id={`tab-${id}`} className={"tab " + (on ? "on" : "")} onClick={onClick} type="button">
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

function ConvenioCard({ title, infoNote, totalPublico, totalConvenio, ahorro, link, fields }) {
  return (
    <section className="block">
      <div className="grid grid-2">
        <article className="card-soft">
          <h2 className="h6 m0">{title}</h2>
          <div className="info-note">{infoNote}</div>
          <div className="grid grid-2 mt12">{fields}</div>

          {totalPublico && (
            <div className="sum card-soft mt12">
              <div><div className="k">Total público</div><div className="big">{totalPublico}</div></div>
              <div><div className="k">Total convenio</div><div className="big ok">{totalConvenio}</div></div>
              <div><div className="k">Ahorro</div><div className="big">{ahorro}</div></div>
            </div>
          )}

          <div className="cta mt12">
            <a className="btn btn-primary" href={link} target="_blank" rel="noreferrer">Activar convenio</a>
          </div>
        </article>
        <article className="card-soft tone">
          <h3 className="h6 m0">Verificación simple</h3>
          <p className="tiny m0">Solo se requiere documento o código de validación de pertenencia. Beneficios vigentes mientras la afiliación esté activa.</p>
        </article>
      </div>
    </section>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --blue:#3b549d; --green:#249554; --bg:#0b1220;
  --panel:#0e1424; --bd:#1f2a44; --ink:#fff; --muted:#cbd5e1; --ok:#16a34a;
  --rad:16px; --shadow:0 16px 40px rgba(2,6,23,.36);
}
.container{ max-width:1140px; margin:0 auto; padding:0 18px; }
.hero{ padding:28px 0 16px; background:radial-gradient(820px 300px at 8% -8%, color-mix(in srgb, var(--blue) 26%, transparent), transparent 60%);}
.hero__grid{ display:grid; grid-template-columns:1.2fr .8fr; gap:18px; align-items:center; }
.kicker{ color:#c7d2fe; font-weight:900; letter-spacing:.2px }
.hero h1{ margin:.2rem 0 .35rem; font-size:clamp(1.8rem,3vw + .6rem,2.4rem); color:var(--ink)}
.lead{ color:#eaf2ff; max-width:60ch;}
.cta{ display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;}
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.6rem 1rem; border-radius:12px; font-weight:900; text-decoration:none;}
.btn-primary{ background:var(--blue); color:#fff;}
.btn-outline{ border:1px solid #334155; color:#eaf2ff;}
.hero__marquee{ overflow:hidden; border:1px solid var(--bd); border-radius:14px; padding:8px;}
.mq-track{ display:flex; gap:12px; animation:slide 16s linear infinite;}
.pill{ padding:.28rem .6rem; border-radius:999px; background:#101a2f; color:#e5e7eb; font-weight:700;}
@keyframes slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
.tabs{ display:flex; gap:8px; flex-wrap:wrap; margin:16px 0;}
.tab{ padding:.5rem .8rem; border-radius:999px; border:1px solid #2b3656; background:#0f172a; color:#eaf2ff; font-weight:800;}
.tab.on{ border-color:#6b7cff; box-shadow:0 0 0 2px rgba(79,70,229,.18) inset;}
.block{ margin:14px 0 28px;}
.grid{ display:grid; gap:12px;}
.grid-2{ grid-template-columns:repeat(2,minmax(0,1fr)); }
.grid-3{ grid-template-columns:repeat(3,minmax(0,1fr)); }
@media(max-width:980px){ .grid-2,.grid-3{ grid-template-columns:1fr; } }

.card-soft{
  border:1px solid var(--bd);
  border-radius:var(--rad);
  background:
    radial-gradient(540px 180px at -10% -10%,rgba(255,255,255,.06),transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);
  padding:16px;
  color:var(--ink);
}
.tone{
  background:
    radial-gradient(540px 180px at 110% -10%,color-mix(in srgb,var(--green) 15%,transparent),transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
}
.h6{ font-size:1.05rem; font-weight:900; margin-bottom:.4rem; }
.field-wrap .label{ font-weight:700; color:var(--muted); margin-bottom:4px; display:block; }
.field{ width:100%; border:1px solid #2a3557; border-radius:12px; padding:.55rem .75rem; background:#0f172a; color:#eaf2ff; }
.field:focus{ outline:2px solid var(--blue); border-color:var(--blue); }
.sum{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:10px; }
.k{ font-weight:800; color:var(--muted); }
.big{ font-size:1.25rem; font-weight:900; }
.ok{ color:var(--ok); }
.info-note{
  margin-top:6px; padding:.6rem .75rem;
  border:1px dashed #314069; border-radius:12px;
  color:#eaf2ff; background:#0e152a;
}
.tiny{ font-size:.86rem; color:#cbd5e1; }
.cta{ display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; }
@media(max-width:640px){ .hero__grid{ grid-template-columns:1fr; } .sum{ grid-template-columns:1fr; } }
`;