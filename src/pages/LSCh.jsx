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
import senasImg from "../assets/img/lael/senas.jpg";
import laelLogoWhite from "../assets/img/Logos/lael-inst-blanco.png";

const CERTIFICATE_FEE = 19990;

/* --------- util --------- */
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
      <div className="hscroll" ref={ref} aria-label={ariaLabel}>{children}</div>
      <button className="hs-btn next" aria-label="Siguiente" onClick={() => slide("next")}>›</button>
    </div>
  );
}

/* ====================== PAGE ====================== */
export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState(LSCH_PURPOSES?.[0] ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]);
  const [certSelected, setCertSelected] = useState(false);

  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId), [selectedGroupId]);
  const onePlan   = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);

  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne   = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;

  const selectedModulesLabels = useMemo(
    () => LSCH_MODULES.filter(m => selectedModules.includes(m.id)).map(m => m.name),
    [selectedModules]
  );

  const toggleModule = (id) => {
    setSelectedModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const whatsappText = [
    "Hola 👋, quiero info de LSCh.",
    `Convenio iglesias: ${church ? "Sí" : "No"}`,
    `Plan grupal: ${groupPlan?.title || "—"} (${clp(monthlyGroup)}/mes)`,
    `Plan 1:1: ${onePlan ? `${onePlan.title} (${clp(monthlyOne)}/mes)` : "—"}`,
    `Módulos: ${selectedModulesLabels.join(", ") || "—"}`,
    `Propósito: ${purpose || "—"}`,
    `Certificación oficial: ${certSelected ? `Sí (+${clp(CERTIFICATE_FEE)})` : "No"}`,
    `Matrícula: ${clp(LSCH_ENROLLMENT_FEE)}`,
    `Mensualidad estimada: ${clp(totalMonthly)}`,
  ].join("\n");

  return (
    <section className="lsch">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="pill">LSCh online</span>
            <h1 className="mega">
              Lengua de Señas Chilena <span className="under">sin enredos</span>
            </h1>

            <p className="lead">
              Clases en vivo + cápsulas. Acompañamiento real y ruta por módulos.
              Matrícula única <b>{clp(LSCH_ENROLLMENT_FEE)}</b>.
            </p>

            <ul className="badges">
              <li className="tag tag-green">Práctica guiada</li>
              <li className="tag tag-blue">Todo queda grabado</li>
              <li className="tag tag-pink">Docente sorda</li>
            </ul>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, quisiera info de LSCh.")}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>

            <ol className="steps-mini">
              <li><b>1.</b> Elige módulos</li>
              <li><b>2.</b> Elige plan (grupal o 1:1)</li>
              <li><b>3.</b> Escribe por WhatsApp</li>
            </ol>
          </div>

          <figure className="hero__img">
            <img src={senasImg} alt="Clase de lengua de señas" loading="eager" decoding="async" />
            <figcaption>Situaciones reales + feedback en vivo.</figcaption>
          </figure>
        </div>
      </header>

      {/* CONTEXTO */}
      <div className="container">
        <div className="card rowy wrap mini-card">
          {/* Convenio iglesias */}
          <label className="switch">
            <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
            <span className="track"><i /></span>
            <div className="lbl">
              <b className="ink">{CHURCH_CONVENIO.label}</b> · <b className="ink">{clp(CHURCH_CONVENIO.monthlyFlat)}/mes</b>
              <div className="hint ink-2">{CHURCH_CONVENIO.note}</div>
            </div>
          </label>

          <div className="spacer" />

          {/* Propósitos + Certificación */}
          <div className="purpose">
            <div className="label">¿Para qué lo quieres?</div>
            <div className="chips">
              {LSCH_PURPOSES.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className={"chip strong " + (purpose === p ? "on" : "")}
                  onClick={() => setPurpose(prev => prev === p ? "" : p)}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                className={"chip cert " + (certSelected ? "on" : "")}
                onClick={() => setCertSelected(v => !v)}
                title="Certificación oficial (pago único)"
              >
                Certificación +{clp(CERTIFICATE_FEE)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MÓDULOS */}
      <section className="container block">
        <h2>Módulos del año <span className="soft">— diploma por módulo</span></h2>

        <div className="grid grid-2 tight">
          {LSCH_MODULES.map(m => {
            const active = selectedModules.includes(m.id);
            return (
              <article key={m.id} className={"card module " + (active ? "on" : "")}>
                <header className="module__head">
                  <span className="tag tag-chip">{m.tag}</span>
                  <h3 className="ink">{m.name}</h3>
                </header>

                <ul className="bullets compact">
                  {m.bullets.slice(0, 3).map((b, i) => <li key={i} className="ink-2">{b}</li>)}
                </ul>

                <details className="mini-faq">
                  <summary>Ver contenidos</summary>
                  <ul className="bullets">{m.bullets.map((b, i) => <li key={i} className="ink-2">{b}</li>)}</ul>
                  <div className="chips">{m.servesFor.map((s, i) => <span key={i} className="chip ghost">{s}</span>)}</div>
                </details>

                {/* CTA al pie (mejor ubicación visual) */}
                <div className="module__footer">
                  <button className={"btn-pill " + (active ? "on" : "")} onClick={() => toggleModule(m.id)}>
                    {active ? "Quitar" : "Agregar"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PLANES GRUPALES */}
      <section className="container block">
        <h2>Planes grupales <span className="soft">— en vivo</span></h2>

        <HScroll ariaLabel="Planes grupales">
          {LSCH_GROUP_PLANS.map(p => {
            const active = selectedGroupId === p.id;
            const monthly = priceForGroupPlan(p, { church });
            return (
              <article key={p.id} className={"card plan slide " + (active ? "on" : "")}>
                {p.badge && <div className="badge">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>

                <div className="price">
                  <span className="big ink">{clp(monthly)}</span>
                  <span className="per">/mes</span>
                </div>

                <div className={"note " + (church ? "ok" : "")}>
                  {church ? "Precio convenio aplicado" : "Mejor precio por duración"}
                </div>

                <button className={"btn-outline " + (active ? "active" : "")} onClick={() => setSelectedGroupId(p.id)}>
                  {active ? "Seleccionado" : "Elegir plan"}
                </button>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* 1:1 */}
      <section className="container block">
        <h2>Clases 1:1 <span className="soft">— refuerzo opcional</span></h2>

        <HScroll ariaLabel="Clases uno a uno">
          {LSCH_ONE2ONE_PLANS.map(p => {
            const active = selectedOneId === p.id;
            return (
              <article key={p.id} className={"card plan one slide " + (active ? "on" : "")}>
                {p.badge && <div className="badge alt">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>

                <div className="price">
                  <span className="big ink">{clp(p.monthly)}</span>
                  <span className="per">/mes</span>
                </div>

                <div className="note">Agenda prioritaria con la docente</div>

                <button className={"btn-outline " + (active ? "active" : "")} onClick={() => setSelectedOneId(active ? null : p.id)}>
                  {active ? "Quitar 1:1" : "Agregar 1:1"}
                </button>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* RESUMEN */}
      <section className="container">
        <div className="card summary">
          <div className="summary-left">
            <img className="brand-logo" src={laelLogoWhite} alt="Lael" />
            <div className="info">
              <div className="title ink">Tu selección</div>

              <div className="line">
                <span className="k">Grupal:</span> {groupPlan?.title || "—"} · <b>{clp(monthlyGroup)}/mes</b>
              </div>

              {onePlan && (
                <div className="line">
                  <span className="k">1:1:</span> {onePlan.title} · <b>{clp(onePlan.monthly)}/mes</b>
                </div>
              )}

              <div className="line">
                <span className="k">Módulos:</span> {selectedModulesLabels.join(", ") || "—"}
              </div>

              <div className="line soft">
                Matrícula: {clp(LSCH_ENROLLMENT_FEE)} {certSelected ? `· Certificación ${clp(CERTIFICATE_FEE)}` : ""}
              </div>
            </div>
          </div>

          <div className="summary-right">
            <div className="hint">Mensual estimada</div>
            <div className="total">{clp(totalMonthly)}</div>

            <div className="first">
              <span>Primer pago aprox.</span>
              <b>{clp(totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0))}</b>
            </div>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container block">
        <h2>Preguntas rápidas</h2>
        <div className="faq-grid">
          <details className="faq"><summary>¿Queda grabado?</summary><p>Sí. Subimos la clase el mismo día.</p></details>
          <details className="faq"><summary>¿Necesito experiencia?</summary><p>No. Partes desde A0–A1 si lo necesitas.</p></details>
          <details className="faq"><summary>¿Hay certificado?</summary><p>Opcional con docente sorda: +{clp(CERTIFICATE_FEE)}.</p></details>
          <details className="faq"><summary>¿Cómo pago?</summary><p>Mensual, trimestral, semestral o anual.</p></details>
          <details className="faq"><summary>¿Convienen iglesias?</summary><p>Sí, precio preferente con convenio vigente.</p></details>
        </div>
      </section>
    </section>
  );
}

/* ===================== CSS (paleta sólida + alto contraste) ===================== */
const css = `
:root{
  /* Colores sólidos, sin transparencias */
  --bg:#0A0E1A;
  --panel:#0E1426;
  --bd:#2E3B78;

  --ink:#FFFFFF;
  --ink2:#BFD1FF;

  --blue:#3450FF;     /* acento principal */
  --yellow:#FFCC33;   /* botón y badges */
  --green:#16C47F;    /* éxito */
  --pink:#FF7EC2;     /* sello docente sorda */
  --violet:#7C8CFF;   /* chips/tags */
  --rose:#F7A8D8;     /* detalle soft */

  --rad:16px;
}

*{box-sizing:border-box}
.container{max-width:1120px;margin:0 auto;padding:0 18px;color:var(--ink)}
.lsch{background:var(--bg)}

/* HERO */
.hero{padding:28px 0 14px;border-bottom:2px solid var(--bd);background:var(--bg)}
.hero__grid{display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:center}
@media (max-width:980px){.hero__grid{grid-template-columns:1fr}}
.pill{display:inline-block;padding:.28rem .72rem;border-radius:999px;border:2px solid var(--violet);font-weight:900;color:var(--ink)}
.mega{margin:.35rem 0 .3rem;font-size:clamp(1.9rem,3.1vw + .7rem,2.7rem);line-height:1.12}
.under{box-shadow:inset 0 -12px var(--violet);border-radius:4px}
.lead{color:var(--ink2);max-width:58ch}

.badges{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
.tag{display:inline-flex;align-items:center;gap:6px;padding:.34rem .72rem;border-radius:999px;font-weight:900;color:#0A0E1A}
.tag-green{background:var(--green)}
.tag-blue{background:var(--blue)}
.tag-pink{background:var(--pink)}

.cta{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 0}
.btn{display:inline-flex;align-items:center;gap:8px;padding:.7rem 1rem;border-radius:12px;border:2px solid var(--blue);text-decoration:none;font-weight:900}
.btn-primary{background:var(--yellow);border-color:var(--yellow);color:#0A0E1A}
.btn-ghost{background:transparent;border-color:var(--blue);color:var(--ink)}

.steps-mini{display:flex;gap:14px;margin:14px 0 0;padding:0;list-style:none;color:var(--ink2)}
.steps-mini b{color:var(--ink)}

.hero__img{border-radius:18px;overflow:hidden;border:2px solid var(--bd);background:var(--panel)}
.hero__img img{display:block;width:100%;height:auto}
.hero__img figcaption{padding:10px 12px;font-size:.95rem;color:var(--ink);background:var(--panel);border-top:2px solid var(--bd)}

/* TARJETAS Y ESTRUCTURA */
.card{
  border:2px solid var(--bd);
  border-radius:var(--rad);
  padding:14px;
  background:var(--panel);
  color:var(--ink);
}
.block{margin:18px 0}
.rowy{display:flex;gap:16px;align-items:center}
.rowy.wrap{flex-wrap:wrap}
.spacer{flex:1}
.mini-card{margin-top:12px}

/* SWITCH */
.switch{display:flex;align-items:center;gap:12px}
.switch input{display:none}
.switch .track{width:56px;height:30px;border-radius:999px;background:#25305F;border:2px solid var(--bd);position:relative}
.switch .track i{position:absolute;top:4px;left:4px;width:22px;height:22px;border-radius:50%;background:#fff;transition:transform .18s}
.switch input:checked + .track{background:var(--green);border-color:var(--green)}
.switch input:checked + .track i{transform:translateX(26px)}
.switch .lbl .hint{font-size:.92rem;color:var(--ink2)}

/* CHIPS */
.chips{display:flex;flex-wrap:wrap;gap:10px}
.chip{border:2px solid var(--violet);background:#1A2142;color:var(--ink);border-radius:999px;padding:.5rem .9rem;font-size:.95rem;font-weight:900}
.chip.strong.on{border-color:var(--green);background:#0F2F24}
.chip.ghost{background:#2A1C35;border-color:#F3A4D4}
.chip.cert{border-color:var(--yellow);background:#3A2E00;color:#FFEFB0}
.chip.cert.on{background:#634C00}

/* GRID */
.grid{display:grid;gap:14px}
.grid.tight{gap:12px}
.grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:640px){.grid-2{grid-template-columns:1fr}}

/* MÓDULOS */
.module .module__head{display:flex;align-items:center;gap:10px;margin-bottom:6px}
.tag-chip{background:var(--blue);color:#fff;border-radius:999px;padding:.2rem .6rem}
.bullets{margin:.35rem 0 .2rem;padding-left:20px}
.bullets li{margin:.08rem 0;color:var(--ink)}
.bullets.compact li{color:var(--ink2)}
.mini-faq summary{cursor:pointer;font-weight:900;color:var(--ink)}
.mini-faq ul{margin:.3rem 0 0;padding-left:20px}
.module__footer{margin-top:10px;display:flex}
.btn-pill{
  width:100%;text-align:center;border-radius:12px;font-weight:1000;
  padding:.55rem .9rem;border:2px solid var(--blue);background:#121B3B;color:#fff;
}
.btn-pill.on{border-color:var(--green);background:#0F2F24}

/* CARRUSEL */
.hscroll-wrap{position:relative}
.hscroll{display:flex;gap:12px;overflow:auto;scroll-snap-type:x mandatory;padding:2px 2px 12px}
.slide{scroll-snap-align:start;min-width:248px}

/* PLANES */
.plan{display:flex;flex-direction:column;gap:6px;min-width:248px}
.plan .badge{align-self:flex-end;background:var(--yellow);color:#0A0E1A;font-weight:900;border-radius:999px;padding:.18rem .6rem;font-size:.78rem}
.plan .badge.alt{background:var(--pink);color:#0A0E1A}
.price{display:flex;align-items:baseline;gap:8px}
.big{font-weight:1000;font-size:1.35rem}
.per{color:#FFEFB0;font-weight:900}
.note{color:#E0FFEF;font-weight:800}
.note.ok{color:#B2FFD9}
.btn-outline{
  width:100%;border:2px solid var(--blue);color:#fff;background:#121B3B;
  padding:.6rem .9rem;border-radius:12px;font-weight:1000
}
.btn-outline.active{background:var(--blue)}

/* RESUMEN */
.summary{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin:12px 0 20px}
.summary-left{display:flex;align-items:center;gap:14px}
.brand-logo{width:70px;height:70px;object-fit:contain}
.title{font-weight:1000}
.line{color:var(--ink)}
.line .k{color:var(--pink);font-weight:900}
.summary-right{text-align:right}
.hint{color:#FFEFB0;font-weight:900}
.total{font-size:1.6rem;font-weight:1000;color:var(--yellow)}
.first span{font-weight:900;color:var(--ink2)}

/* FAQ */
.faq-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
@media (max-width:860px){.faq-grid{grid-template-columns:1fr 1fr}}
@media (max-width:600px){.faq-grid{grid-template-columns:1fr}}
.faq{border:2px solid var(--bd);border-radius:12px;padding:12px;background:var(--panel)}
.faq summary{font-weight:900}
.faq p{margin:.45rem 0 0;color:var(--ink2)}
`;