// src/pages/Convenios.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ================== DATA (tal como la tienes) ================== */
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
  const [tab, setTab] = useState("iglesias"); // "iglesias" | "colegios" | "empresas" | "proponer"

  // ---------- Iglesias (LSCh) ----------
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

  // ---------- Colegios / Homeschool ----------
  const [col, setCol] = useState({
    personas: 1,
    meses: 1,
    mensualBase: "", // CLP
    colegio: "Los Olivos HomeSchool", // editable si quieres
  });

  const colNums = useMemo(() => {
    const p = Math.max(1, Number(col.personas || 1));
    const m = Math.max(1, Number(col.meses || 1));
    const base = Number(String(col.mensualBase).replace(/[^\d]/g, "")) || 0;

    const totalPublico = base * p * m + HS_ENROLLMENT_FEE * p;
    const totalConvenio =
      Math.round(base * 0.9) * p * m + Math.round(HS_ENROLLMENT_FEE * 0.5) * p; // –10% mensual, –50% matrícula
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

  // ---------- Empresas ----------
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

  // ---------- Proponer ----------
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

          {/* Marquee de partners */}
          <div className="hero__marquee" aria-label="Partners">
            <div className="mq-track">
              {[
                "Red de Iglesias",
                "Colegios / Homeschool",
                "Empresas",
                "Nuevo partner",
              ].map((p, i) => (
                <span key={i} className="pill">
                  {p}
                </span>
              ))}
              {[
                "Red de Iglesias",
                "Colegios / Homeschool",
                "Empresas",
                "Nuevo partner",
              ].map((p, i) => (
                <span key={`dup-${i}`} className="pill">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Tabs */}
        <nav className="tabs" role="tablist" aria-label="Tipos de convenio">
          <Tab
            id="ig"
            label="Red de Iglesias (LSCh)"
            on={tab === "iglesias"}
            onClick={() => setTab("iglesias")}
          />
          <Tab
            id="co"
            label="Colegios / Homeschool"
            on={tab === "colegios"}
            onClick={() => setTab("colegios")}
          />
          <Tab
            id="em"
            label="Empresas"
            on={tab === "empresas"}
            onClick={() => setTab("empresas")}
          />
          <Tab
            id="pr"
            label="+ Proponer convenio"
            on={tab === "proponer"}
            onClick={() => setTab("proponer")}
          />
        </nav>

        {/* IGLESIAS */}
        {tab === "iglesias" && (
          <section className="block">
            <div className="grid grid-2">
              <article className="card-soft">
                <h2 className="h6 m0">Red de Iglesias · LSCh</h2>
                <ul className="mini">
                  <li>
                    Mensual público (grupal online):{" "}
                    <b>{clpLS(publicLSChMonthly)}</b>
                  </li>
                  <li>
                    Mensual convenio (Iglesias):{" "}
                    <b className="ok">{clpLS(churchMonthly)}</b>
                  </li>
                  <li>
                    Matrícula (LSCh): <b>{clpLS(LSCH_ENROLLMENT_FEE)}</b>
                  </li>
                </ul>
                <div className="info-note">
                  Precio preferente para <b>planes grupales online</b>. Requiere
                  verificación simple (carta pastoral/credencial o{" "}
                  <b>código</b> de convenio).
                </div>

                <div className="grid grid-3 mt12">
                  <Field label="Iglesia / Red">
                    <input
                      className="field"
                      placeholder="Nombre de la iglesia o red"
                      value={ig.iglesia}
                      onChange={(e) =>
                        setIg((s) => ({ ...s, iglesia: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Personas">
                    <input
                      type="number"
                      min="1"
                      className="field"
                      value={ig.personas}
                      onChange={(e) =>
                        setIg((s) => ({
                          ...s,
                          personas: Number(e.target.value) || 1,
                        }))
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
                        setIg((s) => ({
                          ...s,
                          meses: Number(e.target.value) || 1,
                        }))
                      }
                    />
                  </Field>
                </div>

                <Field label="Código (opcional)">
                  <input
                    className="field"
                    placeholder="Si te lo entregó tu iglesia, escríbelo aquí"
                    value={ig.codigo}
                    onChange={(e) =>
                      setIg((s) => ({ ...s, codigo: e.target.value }))
                    }
                  />
                </Field>

                <div className="sum card-soft mt12">
                  <div>
                    <div className="k">Total público aprox.</div>
                    <div className="big">{clp(igTotales.publico)}</div>
                  </div>
                  <div>
                    <div className="k">Total convenio aprox.</div>
                    <div className="big ok">{clp(igTotales.convenio)}</div>
                  </div>
                  <div>
                    <div className="k">Ahorro estimado</div>
                    <div className="big">{clp(igTotales.ahorro)}</div>
                  </div>
                </div>

                <div className="cta mt12">
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

              <article className="card-soft tone">
                <h3 className="h6 m0">Verificación simple</h3>
                <ul className="mini">
                  <li>Carta pastoral o credencial con nombre del participante.</li>
                  <li>Correo institucional (si existe) o <b>código</b> de convenio.</li>
                </ul>
                <p className="tiny m0">
                  El beneficio se mantiene durante el año mientras la pertenencia
                  esté vigente y se firme el <b>contrato de participación</b>.
                </p>
              </article>
            </div>
          </section>
        )}

        {/* COLEGIOS / HOMESCHOOL */}
        {tab === "colegios" && (
          <section className="block">
            <div className="grid grid-2">
              <article className="card-soft">
                <h2 className="h6 m0">Colegios / Homeschool</h2>
                <ul className="mini">
                  <li>Regla: <b>–10%</b> mensual sobre tu plan.</li>
                  <li>
                    Matrícula Homeschool: <b>–50%</b> (de {clpHS(HS_ENROLLMENT_FEE)} →{" "}
                    {clpHS(Math.round(HS_ENROLLMENT_FEE * 0.5))})
                  </li>
                </ul>
                <div className="info-note">
                  Como el mensual varía por <b>modo/horas</b>, ingresa tu mensual{" "}
                  <b>sin convenio</b> para calcular.
                </div>

                <div className="grid grid-3 mt12">
                  <Field label="Colegio / Organización">
                    <input
                      className="field"
                      placeholder="Ej: Los Olivos HomeSchool"
                      value={col.colegio}
                      onChange={(e) =>
                        setCol((s) => ({ ...s, colegio: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Mensual sin convenio (CLP)">
                    <input
                      className="field"
                      inputMode="numeric"
                      placeholder="$0"
                      value={col.mensualBase}
                      onChange={(e) =>
                        setCol((s) => ({ ...s, mensualBase: e.target.value }))
                      }
                      onBlur={(e) => {
                        const v =
                          Number(String(e.target.value).replace(/[^\d]/g, "")) ||
                          0;
                        setCol((s) => ({ ...s, mensualBase: v ? clp(v) : "" }));
                      }}
                    />
                  </Field>
                  <Field label="Personas">
                    <input
                      type="number"
                      min="1"
                      className="field"
                      value={col.personas}
                      onChange={(e) =>
                        setCol((s) => ({
                          ...s,
                          personas: Number(e.target.value) || 1,
                        }))
                      }
                    />
                  </Field>
                </div>

                <div className="grid grid-3 mt12">
                  <Field label="Meses">
                    <input
                      type="number"
                      min="1"
                      className="field"
                      value={col.meses}
                      onChange={(e) =>
                        setCol((s) => ({
                          ...s,
                          meses: Number(e.target.value) || 1,
                        }))
                      }
                    />
                  </Field>
                </div>

                <div className="sum card-soft mt12">
                  <div>
                    <div className="k">Total público aprox.</div>
                    <div className="big">{clp(colNums.totalPublico)}</div>
                  </div>
                  <div>
                    <div className="k">Total convenio aprox.</div>
                    <div className="big ok">{clp(colNums.totalConvenio)}</div>
                  </div>
                  <div>
                    <div className="k">Ahorro estimado</div>
                    <div className="big">{clp(colNums.ahorro)}</div>
                  </div>
                </div>

                <div className="cta mt12">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextColegios}`}
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

              <article className="card-soft tone">
                <h3 className="h6 m0">Verificación simple</h3>
                <ul className="mini">
                  <li>Certificado de alumno/a regular del año en curso.</li>
                  <li>Correo desde dominio del colegio o comprobante de pago.</li>
                </ul>
                <p className="tiny m0">
                  Beneficio vigente mientras se mantenga la matrícula y el{" "}
                  <b>contrato de participación</b>.
                </p>
              </article>
            </div>
          </section>
        )}

        {/* EMPRESAS */}
        {tab === "empresas" && (
          <section className="block">
            <div className="grid grid-2">
              <article className="card-soft">
                <h2 className="h6 m0">Empresas</h2>
                <ul className="mini">
                  <li>
                    Tu tabla por volumen + <b>–5% extra</b> sobre el total.
                  </li>
                  <li>
                    Incluye <b>reporte ejecutivo</b> sin costo.
                  </li>
                </ul>
                <div className="info-note">
                  Ingresa el <b>total sin convenio</b> (después de tus tramos) para
                  ver el –5% aplicado.
                </div>

                <div className="grid grid-3 mt12">
                  <Field label="Total sin convenio (CLP)">
                    <input
                      className="field"
                      inputMode="numeric"
                      placeholder="$0"
                      value={emp.totalSinConvenio}
                      onChange={(e) =>
                        setEmp((s) => ({
                          ...s,
                          totalSinConvenio: e.target.value,
                        }))
                      }
                      onBlur={(e) => {
                        const v =
                          Number(String(e.target.value).replace(/[^\d]/g, "")) ||
                          0;
                        setEmp((s) => ({
                          ...s,
                          totalSinConvenio: v ? clp(v) : "",
                        }));
                      }}
                    />
                  </Field>
                </div>

                <div className="sum card-soft mt12">
                  <div>
                    <div className="k">Total sin convenio</div>
                    <div className="big">{clp(empNums.bruto)}</div>
                  </div>
                  <div>
                    <div className="k">Total con –5%</div>
                    <div className="big ok">{clp(empNums.conConvenio)}</div>
                  </div>
                  <div>
                    <div className="k">Ahorro estimado</div>
                    <div className="big">{clp(empNums.ahorro)}</div>
                  </div>
                </div>

                <div className="cta mt12">
                  <a
                    className="btn btn-primary"
                    href={`https://wa.me/${WAPP}?text=${waTextEmpresas}`}
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

              <article className="card-soft tone">
                <h3 className="h6 m0">Verificación simple</h3>
                <ul className="mini">
                  <li>Correo corporativo o credencial digital/física.</li>
                </ul>
                <p className="tiny m0">
                  El –5% se aplica sobre el total post-tramos. Confirmación con{" "}
                  <b>propuesta + contrato</b>.
                </p>
              </article>
            </div>
          </section>
        )}

        {/* PROPONER CONVENIO */}
        {tab === "proponer" && (
          <section className="block">
            <div className="grid grid-2">
              <article className="card-soft">
                <h2 className="h6 m0">Propón tu convenio</h2>
                <p className="m0">
                  Cuéntanos tu organización y tamaño. Te respondemos en minutos.
                </p>
                <form
                  className="mt12"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(
                      `https://wa.me/${WAPP}?text=${waTextProponer}`,
                      "_blank",
                      "noreferrer"
                    );
                  }}
                >
                  <div className="grid grid-2">
                    <Field label="Organización">
                      <input
                        className="field"
                        placeholder="Nombre de la entidad"
                        required
                      />
                    </Field>
                    <Field label="Tamaño estimado (personas)">
                      <input className="field" placeholder="Ej: 20–50" required />
                    </Field>
                  </div>
                  <Field label="Contacto (correo o WhatsApp)">
                    <input
                      className="field"
                      placeholder="tu@correo.cl / +56 9 ..."
                      required
                    />
                  </Field>
                  <button className="btn btn-primary mt12" type="submit">
                    Agendar por WhatsApp
                  </button>
                </form>
              </article>

              <article className="card-soft tone">
                <h3 className="h6 m0">Cómo se activa</h3>
                <ol className="mini">
                  <li>Validación simple (documento/correo/código).</li>
                  <li>Firma de <b>contrato de participación</b>.</li>
                  <li>Precio preferente aplicado de forma automática.</li>
                </ol>
                <p className="tiny m0">
                  Beneficios vigentes mientras la acreditación esté al día.
                </p>
              </article>
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
      role="tab"
      aria-selected={on}
      id={`tab-${id}`}
      className={"tab " + (on ? "on" : "")}
      onClick={onClick}
      type="button"
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

/* ================== CSS local ================== */
const css = `
:root{
  --blue:#3b549d; --green:#249554; --yellow:#f2ce3d; --rose:#d6a0c5; --orange:#cd5732;
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --ink2:#eaf2ff; --muted:#cbd5e1;
  --ok:#16a34a;
  --rad:16px; --shadow:0 16px 40px rgba(2,6,23,.36);
}
*{box-sizing:border-box}
.container{ max-width:1140px; margin:0 auto; padding:0 18px; }
.m0{ margin:0 }
.mt12{ margin-top:12px }

/* HERO */
.cv-page .hero{
  padding:28px 0 16px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(820px 300px at 8% -8%, color-mix(in srgb, var(--blue) 26%, transparent), transparent 60%),
    radial-gradient(780px 280px at 94% -10%, color-mix(in srgb, var(--green) 20%, transparent), transparent 60%);
}
.hero__grid{ display:grid; grid-template-columns:1.2fr .8fr; gap:18px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; } }
.kicker{ color:#c7d2fe; font-weight:900; letter-spacing:.2px }
.hero h1{ margin:.2rem 0 .35rem; font-size:clamp(1.8rem, 3vw + .6rem, 2.4rem); color:var(--ink) }
.lead{ color:var(--ink2); max-width:60ch; }
.cta{ display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.6rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; }
.btn-primary{ background:var(--blue); color:#fff; border-color:var(--blue); }
.btn-outline{ background:transparent; color:var(--ink2); }
@media (prefers-color-scheme: dark){ .btn-outline{ border-color:#334155; } }

/* Marquee */
.hero__marquee{
  overflow:hidden; border:1px solid var(--bd); border-radius:14px; padding:8px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
}
.mq-track{
  display:flex; gap:12px; white-space:nowrap; animation: slide 16s linear infinite;
}
.pill{
  display:inline-block; padding:.28rem .6rem; border-radius:999px; background:#101a2f; border:1px solid #263257; color:#e5e7eb; font-weight:700;
}
@keyframes slide{ from{ transform:translateX(0) } to{ transform:translateX(-50%) } }

/* Tabs */
.tabs{ display:flex; gap:8px; flex-wrap:wrap; margin:16px 0; }
.tab{
  padding:.5rem .8rem; border-radius:999px; border:1px solid #2b3656; background:#0f172a; color:#eaf2ff; font-weight:800;
}
.tab.on{ border-color:#6b7cff; box-shadow:0 0 0 2px rgba(79,70,229,.18) inset; }

/* Secciones */
.block{ margin:14px 0 28px; }
.grid{ display:grid; gap:12px; }
.grid-2{ grid-template-columns: repeat(2, minmax(0,1fr)); }
.grid-3{ grid-template-columns: repeat(3, minmax(0,1fr)); }
@media (max-width:980px){ .grid-2,.grid-3{ grid-template-columns:1fr; } }

/* Cards */
.card-soft{
  border:1px solid var(--bd); border-radius:var(--rad);
  background:
    radial-gradient(540px 180px at -10% -10%, rgba(255,255,255,.06), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  color:var(--ink);
  box-shadow:var(--shadow);
  padding:14px;
}
.tone{
  background:
    radial-gradient(540px 180px at 110% -10%, color-mix(in srgb, var(--green) 12%, transparent), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
}
.h6{ font-size:1.02rem; font-weight:900; color:var(--ink) }

/* Campos */
.field-wrap .label{ font-weight:800; color:var(--muted); margin-bottom:4px; }
.field{
  width:100%; border:1px solid #2a3557; border-radius:12px; padding:.55rem .75rem; background:#0f172a; color:#eaf2ff;
}
.field::placeholder{ color:#97a3bb; }
.check{ display:flex; gap:8px; align-items:center; color:var(--ink2); }
.check input{ transform:scale(1.15); }

/* Sumarios */
.sum{ display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; align-items:end; }
.k{ font-weight:800; color:var(--muted); }
.big{ font-size:1.3rem; font-weight:1000; }
.ok{ color:var(--ok) }

/* Listas */
.mini{ margin:.3rem 0 0; padding-left:18px; color:var(--ink); }
.mini li{ margin:.18rem 0; }
.tiny{ font-size:.86rem; color:var(--ink2); }
.info-note{
  margin-top:6px; padding:.6rem .75rem; border:1px dashed #314069; border-radius:12px; color:var(--ink2); background:#0e152a;
}
`;