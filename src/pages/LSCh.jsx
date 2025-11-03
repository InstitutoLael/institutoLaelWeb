// src/pages/LSCh.jsx
import { useMemo, useRef, useState } from "react";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  LSCH_PURPOSES,
  CHURCH_CONVENIO,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import { Link } from "react-router-dom";

// Imagen hero (mano haciendo seña)
import senasImg from "../assets/img/lael/senas.jpg";
// Logo blanco
import laelLogoWhite from "../assets/img/Logos/lael-inst-blanco.png";

/* ───────── Config add-on certificado ───────── */
const CERTIFICATE_FEE = 19990; // pago único

/* ───────── Carrusel horizontal reutilizable ───────── */
function HScroll({ children, ariaLabel }) {
  const ref = useRef(null);
  const slide = (dir) => {
    const el = ref.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };
  return (
    <div className="hscroll-wrap">
      <button className="hs-btn prev" aria-label="Anterior" onClick={() => slide("prev")}>‹</button>
      <div className="hscroll" ref={ref} aria-label={ariaLabel}>
        {children}
      </div>
      <button className="hs-btn next" aria-label="Siguiente" onClick={() => slide("next")}>›</button>
      <div className="hs-mask" aria-hidden />
    </div>
  );
}

export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]);
  const [certSelected, setCertSelected] = useState(false); // chip certificado

  const groupPlan = useMemo(
    () => LSCH_GROUP_PLANS.find((p) => p.id === selectedGroupId),
    [selectedGroupId]
  );
  const onePlan = useMemo(
    () => LSCH_ONE2ONE_PLANS.find((p) => p.id === selectedOneId),
    [selectedOneId]
  );

  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;

  // Totales año académico
  const monthsMarOct = 8;
  const monthsMarNov = 9;
  const annualMarOct = totalMonthly * monthsMarOct;
  const annualMarNov = totalMonthly * monthsMarNov;

  const selectedModulesLabels = useMemo(
    () => LSCH_MODULES.filter((m) => selectedModules.includes(m.id)).map((m) => m.name),
    [selectedModules]
  );

  const toggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const whatsappText = [
    "Hola 👋, quiero info de LSCh.",
    `Convenio iglesias: ${church ? "Sí" : "No"}`,
    `Plan grupal: ${groupPlan?.title || "—"} (${clp(monthlyGroup)}/mes)`,
    `Plan 1:1: ${onePlan ? `${onePlan.title} (${clp(monthlyOne)}/mes)` : "—"}`,
    `Módulos: ${selectedModulesLabels.join(", ") || "—"}`,
    `Propósito: ${purpose || "—"}`,
    `Certificado oficial: ${certSelected ? `Sí (+${clp(CERTIFICATE_FEE)} único)` : "No"}`,
    `Matrícula: ${clp(LSCH_ENROLLMENT_FEE)}`,
    `Mensualidad estimada: ${clp(totalMonthly)}`,
    `Total año Mar–Oct (8m): ${clp(annualMarOct)}`,
    `Total año Mar–Nov (9m): ${clp(annualMarNov)}`,
  ].join("\n");

  return (
    <section className="lsch">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="pill">LSCh 100% online</span>
            <h1>
              Lengua de Señas Chilena <span className="under">clara, práctica y humana</span>
            </h1>
            <p className="lead">
              Clases en vivo + cápsulas y seguimiento real. Matrícula única de{" "}
              <b>{clp(LSCH_ENROLLMENT_FEE)}</b>. Elige módulos, plan grupal y, si quieres, suma 1:1.
            </p>
            <ul className="points">
              <li>Diploma por cada módulo aprobado</li>
              <li>Mejor precio por duración o con <b>convenio iglesias</b></li>
              <li>Las clases quedan grabadas el mismo día</li>
            </ul>
            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, quisiera info de LSCh.")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <figure className="hero__img">
            <img src={senasImg} alt="Seña en mano — aprendizaje de Lengua de Señas Chilena" />
            <figcaption>Aprende con práctica guiada y ejemplos reales de comunicación.</figcaption>
          </figure>
        </div>
      </header>

      {/* CONVENIO + PROPÓSITO + CERTIFICADO (chips) */}
      <div className="container">
        <div className="card rowy wrap">
          {/* Convenio iglesias */}
          <label className="switch">
            <input
              type="checkbox"
              checked={church}
              onChange={(e) => setChurch(e.target.checked)}
            />
            <span className="track"><i /></span>
            <div className="lbl">
              <b className="ink">{CHURCH_CONVENIO.label}</b> ·{" "}
              <b className="ink">{clp(CHURCH_CONVENIO.monthlyFlat)}/mes</b>
              <div className="hint ink-2">{CHURCH_CONVENIO.note}</div>
            </div>
          </label>

          <div className="spacer" />

          {/* Propósito */}
          <div className="purpose">
            <div className="label">¿Para qué lo necesitas?</div>
            <div className="chips">
              {LSCH_PURPOSES.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  className={"chip strong " + (purpose === p ? "on" : "")}
                  onClick={() => setPurpose((prev) => (prev === p ? "" : p))}
                  aria-pressed={purpose === p}
                >
                  {p}
                </button>
              ))}
              {/* Certificación oficial COMO CHIP */}
              <button
                type="button"
                className={"chip cert " + (certSelected ? "on" : "")}
                onClick={() => setCertSelected(v => !v)}
                aria-pressed={certSelected}
                title="Certificación oficial (pago único)"
              >
                Certificación oficial {certSelected ? "✓" : ""} · +{clp(CERTIFICATE_FEE)}
              </button>
            </div>
            <div className="mini-hint">
              Certificación: avalada por Instituto Lael y por la docente <b>persona sorda</b>.
            </div>
          </div>
        </div>
      </div>

      {/* MÓDULOS */}
      <section className="container block">
        <h2>
          Módulos del año <span className="soft">— diploma por módulo</span>
        </h2>
        <div className="grid grid-2 tight">
          {LSCH_MODULES.map((m) => {
            const active = selectedModules.includes(m.id);
            return (
              <article
                className={"card module " + (active ? "on" : "")}
                key={m.id}
                style={{ "--accent": m.accent }}
              >
                <header>
                  <span className="tag glow">{m.tag}</span>
                  <h3 className="ink">{m.name}</h3>
                  <div className="spacer" />
                  <button
                    className={"pill " + (active ? "on" : "")}
                    onClick={() => toggleModule(m.id)}
                    aria-pressed={active}
                  >
                    {active ? "Quitar" : "Agregar"}
                  </button>
                </header>
                <ul className="bullets">
                  {m.bullets.map((b, i) => <li key={i} className="ink-2">{b}</li>)}
                </ul>
                <div className="chips">
                  {m.servesFor.map((s, i) => <span key={i} className="chip ghost">{s}</span>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PLANES GRUPALES — carrusel */}
      <section className="container block">
        <h2>Planes grupales <span className="soft">— 100% online</span></h2>

        <HScroll ariaLabel="Planes grupales">
          {LSCH_GROUP_PLANS.map((p) => {
            const active = selectedGroupId === p.id;
            const monthly = priceForGroupPlan(p, { church });
            const annual8 = monthly * monthsMarOct;
            const annual9 = monthly * monthsMarNov;
            return (
              <article className={"card plan slide " + (active ? "on" : "")} key={p.id}>
                {p.badge && <div className="badge">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>
                <div className="save">{p.save ? p.save : " "}</div>

                <div className="price">
                  <span className="big ink">{clp(monthly)}</span>
                  <span className="per">/mes</span>
                </div>

                <div className="annual-mini">
                  <div><span>Mar–Oct</span> <b>{clp(annual8)}</b></div>
                  <div><span>Mar–Nov</span> <b>{clp(annual9)}</b></div>
                </div>

                <div className={"note " + (church ? "ok" : "")}>
                  {church ? "Precio convenio aplicado" : "Mejor precio por duración"}
                </div>

                <div className="cta-row">
                  <button
                    className={"btn-outline " + (active ? "active" : "")}
                    onClick={() => setSelectedGroupId(p.id)}
                  >
                    {active ? "Seleccionado" : "Elegir plan"}
                  </button>
                </div>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* CLASES 1:1 — carrusel */}
      <section className="container block">
        <h2>Clases particulares 1:1 <span className="soft">— opcional</span></h2>

        <HScroll ariaLabel="Clases particulares uno a uno">
          {LSCH_ONE2ONE_PLANS.map((p) => {
            const active = selectedOneId === p.id;
            const annual8 = p.monthly * monthsMarOct;
            const annual9 = p.monthly * monthsMarNov;
            return (
              <article className={"card plan one slide " + (active ? "on" : "")} key={p.id}>
                {p.badge && <div className="badge info">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>
                <div className="save">{p.save ? p.save : " "}</div>

                <div className="price">
                  <span className="big ink">{clp(p.monthly)}</span>
                  <span className="per">/mes</span>
                </div>

                <div className="annual-mini">
                  <div><span>Mar–Oct</span> <b>{clp(annual8)}</b></div>
                  <div><span>Mar–Nov</span> <b>{clp(annual9)}</b></div>
                </div>

                <div className="note">Agenda prioritaria con la profe</div>
                <div className="cta-row">
                  <button
                    className={"btn-outline " + (active ? "active" : "")}
                    onClick={() => setSelectedOneId(active ? null : p.id)}
                  >
                    {active ? "Quitar 1:1" : "Agregar 1:1"}
                  </button>
                </div>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* RESUMEN + CTA */}
      <section className="container">
        <div className="card summary">
          <div className="summary-left">
            <img className="brand-logo" src={laelLogoWhite} alt="Instituto Lael" />
            <div className="info">
              <div className="title ink">Tu selección</div>
              <div className="line">
                <span className="k">Grupal:</span> {groupPlan?.title || "—"} · <b>{clp(monthlyGroup)}/mes</b>
                {onePlan && (
                  <>
                    {"  "} <span className="sep">|</span>{" "}
                    <span className="k">1:1:</span> {onePlan.title} · <b>{clp(monthlyOne)}/mes</b>
                  </>
                )}
              </div>
              <div className="line">
                <span className="k">Módulos:</span> {selectedModulesLabels.join(", ") || "—"}
              </div>
              <div className="line soft">Matrícula única: {clp(LSCH_ENROLLMENT_FEE)}</div>
              {certSelected && (
                <div className="line soft">
                  Certificación oficial (único): <b>{clp(CERTIFICATE_FEE)}</b>
                </div>
              )}
            </div>
          </div>

          <div className="summary-right">
            <div className="hint">Mensualidad estimada</div>
            <div className="total">{clp(totalMonthly)}</div>

            <div className="annual small">
              <div className="row"><span>Mar–Oct (8m):</span><b>{clp(annualMarOct)}</b></div>
              <div className="row"><span>Mar–Nov (9m):</span><b>{clp(annualMarNov)}</b></div>
            </div>

            <div className="first">
              <span>Primer pago aprox.</span>
              <b>
                {clp(
                  totalMonthly +
                  LSCH_ENROLLMENT_FEE +
                  (certSelected ? CERTIFICATE_FEE : 0)
                )}
              </b>
              <div className="tiny muted">
                Incluye mensualidad + matrícula{certSelected ? " + certificación" : ""}.
              </div>
            </div>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/56964626568?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ===================== CSS (compacto + paleta LAEL) ===================== */
const css = `
:root{
  /* PALETA LAEL */
  --lael-blue:#3b549d;   /* primario */
  --lael-green:#249554;  /* acento 1 */
  --lael-yellow:#f2ce3d; /* acento 2 */
  --lael-rose:#d6a0c5;   /* acento suave */
  --lael-warn:#cd5732;   /* aviso */
  --ink:#ffffff; --ink2:#eaeef9;

  /* Fondo oscuro con matiz azul de marca */
  --bg:#0b1220;          /* puedes subir a #0d1426 si lo quieres más claro */
  --panel:#0f172a;
  --bd:#233052;

  --rad:16px;
}

/* Reset mínimo */
*{box-sizing:border-box}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; color:var(--ink); }

/* ================= HERO ================= */
.hero{
  color:var(--ink); border-bottom:1px solid var(--bd); padding:26px 0 12px;
  background:
    radial-gradient(700px 260px at 12% -10%, rgba(59,84,157,.25), transparent 60%),
    radial-gradient(660px 240px at 88% -12%, rgba(36,149,84,.18), transparent 60%),
    linear-gradient(180deg, var(--bg), var(--panel));
}
.hero__grid{ display:grid; grid-template-columns: 1.1fr .9fr; gap:22px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; font-weight:900; }
h1{ margin:.4rem 0 .3rem; font-size:clamp(1.5rem, 2.8vw + .6rem, 2.2rem); line-height:1.15; }
.under{ box-shadow: inset 0 -10px rgba(59,84,157,.32); border-radius:4px; }
.lead{ color:var(--ink2); max-width:64ch; }
.points{ margin:.5rem 0 0; padding-left:18px; color:var(--ink2); }
.points li{ margin:.08rem 0; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:10px 0 0; }
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.64rem .98rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; transition:.18s; }
.btn-primary{ background:var(--lael-blue); color:#fff; border-color:var(--lael-blue); }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:#334155; }
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }

.hero__img{
  border-radius:18px; overflow:hidden; border:1px solid var(--bd); background:#0f172a;
  box-shadow: 0 0 0 10px rgba(255,255,255,.05) inset, 0 22px 46px rgba(2,6,23,.36);
}
.hero__img img{ display:block; width:100%; height:auto; object-fit:cover; }
.hero__img figcaption{ padding:8px 10px; font-size:.9rem; color:#eaf2ff; background:#0e162a; border-top:1px solid #1f2a44; }

/* ================= CARDS GENERALES ================= */
.card{
  border:1px solid var(--bd); border-radius:var(--rad); padding:12px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.018)),
    linear-gradient(180deg, #0f172a, #0b1220);
  color:var(--ink); box-shadow:0 14px 28px rgba(2,6,23,.32);
}
.block{ margin:18px 0; }
.rowy{ display:flex; gap:14px; align-items:center; }
.rowy.wrap{ flex-wrap:wrap; }
.spacer{ flex:1; }

/* ================= SWITCH CONVENIO ================= */
.switch{ display:flex; align-items:center; gap:10px; }
.switch input{ display:none; }
.switch .track{
  width:46px; height:26px; border-radius:999px; background:#15203B; border:1px solid #2B3B66; position:relative;
}
.switch .track i{
  position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:50%;
  background:#fff; transition: transform .18s ease; box-shadow:0 3px 8px rgba(0,0,0,.45);
}
.switch input:checked + .track{ background: linear-gradient(90deg, var(--lael-green), #1f8a4c); border-color:#1f8a4c; }
.switch input:checked + .track i{ transform: translateX(20px); }
.switch .lbl .hint{ font-size:.9rem; color:var(--ink2); }

/* ================= CHIPS ================= */
.chips{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{
  border:1px solid rgba(59,84,157,.45);
  background: radial-gradient(120px 60px at 30% 30%, rgba(59,84,157,.16), transparent 60%), #0D1530;
  color:var(--ink); border-radius:999px; padding:.42rem .78rem; font-size:.9rem; font-weight:900;
}
.chip.strong.on{
  border-color:var(--lael-green);
  background: radial-gradient(120px 60px at 30% 30%, rgba(36,149,84,.22), transparent 60%), #0D1E15;
  box-shadow: inset 0 0 0 1px rgba(134,239,172,.28);
}
.chip.ghost{ background:#0D1330; border-color: rgba(214,160,197,.45); } /* usa el rosado para ghost */
.chip.cert{ border-color: rgba(242,206,61,.6); background: radial-gradient(120px 60px at 30% 30%, rgba(242,206,61,.18), transparent 60%), #171405; }
.chip.cert.on{ border-color:var(--lael-yellow); box-shadow: inset 0 0 0 1px rgba(242,206,61,.35); }

.soft{ color:#cfe3ff; }

/* ================= GRID ================= */
.grid{ display:grid; gap:12px; }
.grid.tight{ gap:10px; }
.grid-2{ grid-template-columns: repeat(2, minmax(0,1fr)); }
@media (max-width:640px){ .grid-2{ grid-template-columns: 1fr; } }

/* ================= MÓDULOS ================= */
.module{
  background:
    radial-gradient(400px 160px at -10% -20%, rgba(59,84,157,.18), transparent 60%),
    linear-gradient(180deg, #0F1A33, #0B1220);
  border:1px solid #324071;
}
.module.on{ outline:2px solid rgba(59,84,157,.32); }
.module header{ display:flex; align-items:center; gap:10px; }
.module .tag{
  font-weight:900; font-size:.82rem; padding:.18rem .52rem; border-radius:999px;
  background:#2b3568; border:1px solid #6a78c7; color:#fff;
}
.module h3{ margin:.12rem 0 .25rem; font-size:1rem; }
.module .pill{
  border:1px solid var(--lael-blue); color:#fff; background: linear-gradient(180deg,#3b549d,#334a8d);
  border-radius:999px; padding:.32rem .75rem; font-weight:900; font-size:.92rem;
}
.module .pill.on{
  border-color:var(--lael-green); background: linear-gradient(180deg,#249554,#1e7f47);
}
.bullets{ margin:.3rem 0 .1rem; padding-left:18px; }
.bullets li{ margin:.08rem 0; }

/* ================= CARRUSEL ================= */
.hscroll-wrap{ position:relative; }
.hscroll{
  display:flex; gap:10px; overflow:auto; scroll-snap-type:x mandatory; padding:2px 2px 12px;
}
.slide{ scroll-snap-align:start; min-width: 232px; } /* <— COMPACTO */
.hs-btn{
  position:absolute; top:50%; transform:translateY(-50%);
  width:34px; height:34px; border-radius:999px; border:1px solid #334155; background:#0f172a; color:#eaf2ff;
  display:grid; place-items:center; cursor:pointer; z-index:2;
}
.hs-btn.prev{ left:-6px; } .hs-btn.next{ right:-6px; }
.hs-mask{ pointer-events:none; position:absolute; inset:0; box-shadow: inset 50px 0 36px -36px #0b1220, inset -50px 0 36px -36px #0b1220; }

/* ================= PLANES (COMPACTO + PALETA) ================= */
.plan{
  position:relative; display:flex; flex-direction:column; min-width: 232px; /* <— COMPACTO */
  border:1px solid var(--bd); border-radius:14px; padding:12px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.015)),
    linear-gradient(180deg, #0f172a, #0b1220);
  box-shadow:0 12px 24px rgba(2,6,23,.3);
}
.plan .badge{
  position:absolute; top:10px; right:10px; z-index:2;
  background:var(--lael-yellow); color:#0B1220; font-weight:900; border-radius:999px; padding:.16rem .5rem; font-size:.75rem;
}
.plan .badge.info{ background:var(--lael-rose); color:#0B1220; }
.plan .save{ min-height:1rem; color:#ffffff; opacity:.85; font-size:.9rem; }
.plan .price{ margin:.1rem 0 .18rem; display:flex; align-items:baseline; gap:6px; }
.plan .big{ font-weight:1000; font-size:1.28rem; letter-spacing:.2px; }   /* ↓ tamaño */
.plan .per{ color:#cfe3ff; font-weight:800; font-size:.9rem; }
.plan .note{ color:#cfe3ff; font-size:.92rem; min-height: 1.1rem; }
.plan .note.ok{ color:#b7f5cd; }
.plan .cta-row{ margin-top:auto; display:flex; }

.plan.one .badge.info{ background:var(--lael-warn); color:#0B1220; } /* 1:1 usa naranja de tu paleta */
.plan.on{ outline:2px solid rgba(59,84,157,.38); }

/* ================= BOTÓN OUTLINE ================= */
.btn-outline{
  display:inline-flex; align-items:center; justify-content:center; width:100%;
  border:1.5px solid rgba(59,84,157,.55); color:#fff; background:transparent;
  padding:.55rem .85rem; border-radius:10px; font-weight:1000; font-size:.95rem;
}
.btn-outline:hover{ border-color: rgba(59,84,157,.85); }
.btn-outline.active{ border-color:var(--lael-blue); box-shadow:0 0 0 3px rgba(59,84,157,.28); }

/* ================= RESUMEN ================= */
.summary{
  display:grid; grid-template-columns: 1fr auto; gap:12px; align-items:center; margin:6px 0 16px;
}
.summary-left{ display:flex; align-items:center; gap:12px; }
.brand-logo{ width:72px; height:72px; object-fit:contain; display:block; filter: drop-shadow(0 6px 14px rgba(214,160,197,.32)); }
.summary-left .title{ font-weight:1000; letter-spacing:.2px; }
.summary-left .line{ color:var(--ink); font-size:.96rem; }
.summary-left .line .k{ color:var(--lael-rose); font-weight:900; }

.summary-right{ text-align:right; }
.summary-right .hint{ color:#cfe3ff; font-weight:800; }
.summary-right .total{ font-size:1.6rem; font-weight:1000; margin:.1rem 0 .2rem; color:var(--lael-yellow); }

.annual.small{ margin:.1rem 0 .35rem; padding:.45rem .6rem; border:1px solid #3b4260; border-radius:10px; background:linear-gradient(180deg,#0f172a,#0b1220); }
.annual.small .row{ display:flex; align-items:baseline; justify-content:space-between; gap:10px; color:#ffffff; }
.annual.small .row b{ font-weight:1000; color:#ffde59; } /* tu amarillo suave */

.first{ display:grid; gap:2px; margin:.1rem 0 .5rem; }
.first span{ font-weight:800; color:#eaf2ff; }
.first b{ font-size:1.08rem; }

/* ================= RESPONSIVO ================= */
@media (max-width: 760px){
  .slide, .plan{ min-width: 72vw; } /* tarjetas tipo “snap” en móvil */
  .summary{ grid-template-columns: 1fr; }
  .summary-right{ text-align:left; }
}
`;