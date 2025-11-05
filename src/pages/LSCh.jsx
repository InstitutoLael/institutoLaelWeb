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
      <div className="hs-mask" aria-hidden />
    </div>
  );
}

/* ====================== PAGE ====================== */
export default function LSCh() {
  // Estado principal (simple)
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState(LSCH_PURPOSES?.[0] ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]);
  const [certSelected, setCertSelected] = useState(false);

  // Derivados
  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId), [selectedGroupId]);
  const onePlan   = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);

  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne   = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;

  const monthsMarOct = 8;
  const monthsMarNov = 9;
  const annual8 = totalMonthly * monthsMarOct;
  const annual9 = totalMonthly * monthsMarNov;

  const selectedModulesLabels = useMemo(
    () => LSCH_MODULES.filter(m => selectedModules.includes(m.id)).map(m => m.name),
    [selectedModules]
  );

  const toggleModule = (id) => {
    setSelectedModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // WhatsApp resumen
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
              <li className="tag green">Práctica guiada</li>
              <li className="tag indigo">Todo queda grabado</li>
              <li className="tag amber">Docente sorda</li>
            </ul>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, quisiera info de LSCh.")}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>

            {/* 3 Pasos minimal */}
            <ol className="steps-mini">
              <li><b>1.</b> Elige módulos</li>
              <li><b>2.</b> Elige plan (grupal o 1:1)</li>
              <li><b>3.</b> Escribe por WhatsApp</li>
            </ol>
          </div>

          <figure className="hero__img">
            <img src={senasImg} alt="" loading="eager" decoding="async" />
            <figcaption>Situaciones reales + feedback en vivo.</figcaption>
          </figure>
        </div>
      </header>

      {/* Chips de contexto brevísimo */}
      <div className="container">
        <div className="card rowy wrap mini-card">
          <label className="switch">
            <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
            <span className="track"><i /></span>
            <div className="lbl">
              <b className="ink">{CHURCH_CONVENIO.label}</b> · <b className="ink">{clp(CHURCH_CONVENIO.monthlyFlat)}/mes</b>
              <div className="hint ink-2">{CHURCH_CONVENIO.note}</div>
            </div>
          </label>

          <div className="spacer" />

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
              >
                Certificación +{clp(CERTIFICATE_FEE)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos: menos texto; detalles dentro de <details> */}
      <section className="container block">
        <h2>Módulos del año <span className="soft">— diploma por módulo</span></h2>

        <div className="grid grid-2 tight">
          {LSCH_MODULES.map(m => {
            const active = selectedModules.includes(m.id);
            return (
              <article key={m.id} className={"card module " + (active ? "on" : "")} style={{ "--accent": m.accent }}>
                <header className="module__head">
                  <span className="tag glow">{m.tag}</span>
                  <h3 className="ink">{m.name}</h3>
                  <div className="spacer" />
                  <button className={"pill " + (active ? "on" : "")} onClick={() => toggleModule(m.id)}>
                    {active ? "Quitar" : "Agregar"}
                  </button>
                </header>

                <ul className="bullets compact">
                  {m.bullets.slice(0, 3).map((b, i) => <li key={i} className="ink-2">{b}</li>)}
                </ul>

                <details className="mini-faq">
                  <summary>Ver contenidos</summary>
                  <ul className="bullets">{m.bullets.map((b, i) => <li key={i} className="ink-2">{b}</li>)}</ul>
                  <div className="chips">{m.servesFor.map((s, i) => <span key={i} className="chip ghost">{s}</span>)}</div>
                </details>
              </article>
            );
          })}
        </div>
      </section>

      {/* Planes grupales */}
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
                <div className="save">{p.save || " "}</div>

                <div className="price"><span className="big ink">{clp(monthly)}</span><span className="per">/mes</span></div>
                <div className={"note " + (church ? "ok" : "")}>{church ? "Precio convenio aplicado" : "Mejor precio por duración"}</div>

                <button className={"btn-outline " + (active ? "active" : "")} onClick={() => setSelectedGroupId(p.id)}>
                  {active ? "Seleccionado" : "Elegir plan"}
                </button>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* 1:1 opcional */}
      <section className="container block">
        <h2>Clases 1:1 <span className="soft">— refuerzo opcional</span></h2>

        <HScroll ariaLabel="Clases uno a uno">
          {LSCH_ONE2ONE_PLANS.map(p => {
            const active = selectedOneId === p.id;
            return (
              <article key={p.id} className={"card plan one slide " + (active ? "on" : "")}>
                {p.badge && <div className="badge info">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>
                <div className="price"><span className="big ink">{clp(p.monthly)}</span><span className="per">/mes</span></div>
                <div className="note">Agenda prioritaria con la docente</div>

                <button className={"btn-outline " + (active ? "active" : "")} onClick={() => setSelectedOneId(active ? null : p.id)}>
                  {active ? "Quitar 1:1" : "Agregar 1:1"}
                </button>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* Resumen pegado simple */}
      <section className="container">
        <div className="card summary">
          <div className="summary-left">
            <img className="brand-logo" src={laelLogoWhite} alt="Lael" />
            <div className="info">
              <div className="title ink">Tu selección</div>
              <div className="line"><span className="k">Grupal:</span> {groupPlan?.title || "—"} · <b>{clp(monthlyGroup)}/mes</b></div>
              {onePlan && <div className="line"><span className="k">1:1:</span> {onePlan.title} · <b>{clp(onePlan.monthly)}/mes</b></div>}
              <div className="line"><span className="k">Módulos:</span> {selectedModulesLabels.join(", ") || "—"}</div>
              <div className="line soft">Matrícula: {clp(LSCH_ENROLLMENT_FEE)} {certSelected ? `· Certificación ${clp(CERTIFICATE_FEE)}` : ""}</div>
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

      {/* FAQ cortita (opcional, pero útil) */}
      <section className="container block">
        <h2>Preguntas rápidas</h2>
        <div className="faq-grid">
          <details className="faq"><summary>¿Queda grabado?</summary><p>Sí, subimos la clase el mismo día.</p></details>
          <details className="faq"><summary>¿Necesito experiencia?</summary><p>No. Partes desde A0–A1 si lo necesitas.</p></details>
          <details className="faq"><summary>¿Hay certificado?</summary><p>Opcional con docente sorda: +{clp(CERTIFICATE_FEE)}.</p></details>
          <details className="faq"><summary>¿Cómo pago?</summary><p>Mensual, trimestral, semestral o anual.</p></details>
          <details className="faq"><summary>¿Convienen iglesias?</summary><p>Sí, precio preferente con convenio vigente.</p></details>
        </div>
      </section>
    </section>
  );
}

/* ===================== CSS (minimal + aire) ===================== */
const css = `
:root{
  --ink:#fff; --ink2:#e8eefc;
  --bg:#0b1220; --panel:#0f172a; --bd:#223052;
  --accent:#3b549d; --accentSoft:rgba(59,84,157,.16);
  --rad:16px;
}
*{box-sizing:border-box}
.container{max-width:1120px;margin:0 auto;padding:0 18px;color:var(--ink)}

.hero{
  padding:28px 0 14px; color:var(--ink); border-bottom:1px solid var(--bd);
  background:
    radial-gradient(720px 260px at 10% -10%, var(--accentSoft), transparent 60%),
    linear-gradient(180deg, var(--bg), var(--panel));
}
.hero__grid{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;align-items:center}
@media (max-width:980px){.hero__grid{grid-template-columns:1fr}}
.pill{display:inline-block;padding:.22rem .6rem;border-radius:999px;border:1px solid #334155;font-weight:900}
.mega{margin:.35rem 0 .3rem;font-size:clamp(1.8rem,3.1vw + .7rem,2.6rem);line-height:1.12}
.under{box-shadow:inset 0 -10px rgba(59,84,157,.28);border-radius:4px}
.lead{color:var(--ink2);max-width:58ch}
.badges{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}

.tag{display:inline-flex;align-items:center;gap:6px;padding:.26rem .6rem;border-radius:999px;font-weight:900;border:1px solid transparent}
.tag.indigo{background:#3536a833;border-color:#4f46e5}
.tag.amber{background:#b4530933;border-color:#f59e0b}
.tag.green{background:#16653433;border-color:#22c55e}

.hero__img{border-radius:18px;overflow:hidden;border:1px solid var(--bd);background:#0f172a;box-shadow:0 22px 46px rgba(2,6,23,.36)}
.hero__img img{display:block;width:100%;height:auto}
.hero__img figcaption{padding:8px 10px;font-size:.9rem;color:#eaf2ff;background:#0e162a;border-top:1px solid #1f2a44}

.steps-mini{display:flex;gap:12px;margin:12px 0 0;padding:0;list-style:none;color:#cfe3ff}
.steps-mini b{color:#fff}

.btn{display:inline-flex;align-items:center;gap:8px;padding:.64rem 1rem;border-radius:12px;border:1px solid #2f3341;text-decoration:none;font-weight:900}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.btn-ghost{background:transparent;color:#eaf2ff}

.card{
  border:1px solid var(--bd);border-radius:var(--rad);padding:12px;
  background:linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.015)),linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 16px 32px rgba(2,6,23,.28)
}
.block{margin:16px 0}
.rowy{display:flex;gap:14px;align-items:center}
.rowy.wrap{flex-wrap:wrap}
.spacer{flex:1}
.mini-card{margin-top:10px}

/* switch */
.switch{display:flex;align-items:center;gap:10px}
.switch input{display:none}
.switch .track{width:46px;height:26px;border-radius:999px;background:#15203B;border:1px solid #2B3B66;position:relative}
.switch .track i{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .18s}
.switch input:checked + .track{background:linear-gradient(90deg,#249554,#1f8a4c);border-color:#1f8a4c}
.switch input:checked + .track i{transform:translateX(20px)}
.switch .lbl .hint{font-size:.9rem;color:var(--ink2)}

.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid rgba(59,84,157,.45);background:#0D1530;color:#fff;border-radius:999px;padding:.42rem .78rem;font-size:.9rem;font-weight:900}
.chip.strong.on{border-color:#1f8a4c;background:#0D1E15;box-shadow:inset 0 0 0 1px rgba(134,239,172,.28)}
.chip.ghost{background:#0D1330;border-color:rgba(214,160,197,.45)}
.chip.cert{border-color:#f2ce3d;background:#171405}

/* módulos */
.grid{display:grid;gap:12px}
.grid.tight{gap:10px}
.grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:640px){.grid-2{grid-template-columns:1fr}}
.module{border:1px solid #324071;background:linear-gradient(180deg,#0F1A33,#0B1220)}
.module.on{outline:2px solid rgba(59,84,157,.3)}
.module__head{display:flex;align-items:center;gap:10px}
.module .tag.glow{font-weight:900;font-size:.8rem;padding:.14rem .48rem;border-radius:999px;background:#2b3568;border:1px solid #6a78c7}
.pill{border:1px solid var(--accent);color:#fff;background:linear-gradient(180deg,#3b549d,#344a8d);border-radius:999px;padding:.32rem .75rem;font-weight:900}
.pill.on{border-color:#249554;background:linear-gradient(180deg,#249554,#1e7f47)}
.bullets{margin:.35rem 0 .1rem;padding-left:18px}
.bullets.compact li{margin:.06rem 0}
.mini-faq summary{cursor:pointer;font-weight:800}
.mini-faq ul{margin:.3rem 0 0;padding-left:18px;color:#eaf2ff}

/* carrusel */
.hscroll-wrap{position:relative}
.hscroll{display:flex;gap:10px;overflow:auto;scroll-snap-type:x mandatory;padding:2px 2px 12px}
.slide{scroll-snap-align:start;min-width:232px}
.hs-btn{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:999px;border:1px solid #334155;background:#0f172a;color:#eaf2ff;display:grid;place-items:center;z-index:2}
.hs-btn.prev{left:-6px}.hs-btn.next{right:-6px}
.hs-mask{pointer-events:none;position:absolute;inset:0;box-shadow:inset 50px 0 36px -36px #0b1220,inset -50px 0 36px -36px #0b1220}

/* planes */
.plan{position:relative;display:flex;flex-direction:column;min-width:232px}
.plan .badge{position:absolute;top:10px;right:10px;background:#f2ce3d;color:#0b1220;font-weight:900;border-radius:999px;padding:.16rem .5rem;font-size:.75rem}
.plan .badge.info{background:#d6a0c5;color:#0b1220}
.price{margin:.1rem 0 .18rem;display:flex;align-items:baseline;gap:6px}
.big{font-weight:1000;font-size:1.28rem;letter-spacing:.2px}
.per{color:#cfe3ff;font-weight:800;font-size:.9rem}
.note{color:#cfe3ff;font-size:.92rem;min-height:1.1rem}
.note.ok{color:#b7f5cd}
.btn-outline{width:100%;border:1.5px solid rgba(59,84,157,.55);color:#fff;background:transparent;padding:.55rem .85rem;border-radius:10px;font-weight:1000}
.btn-outline.active{border-color:var(--accent);box-shadow:0 0 0 3px rgba(59,84,157,.28)}

/* summary */
.summary{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;margin:10px 0 18px}
.summary-left{display:flex;align-items:center;gap:12px}
.brand-logo{width:66px;height:66px;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(214,160,197,.28))}
.title{font-weight:1000}
.line .k{color:#d6a0c5;font-weight:900}
.summary-right{text-align:right}
.hint{color:#cfe3ff;font-weight:800}
.total{font-size:1.5rem;font-weight:1000;margin:.1rem 0 .2rem}
.first span{font-weight:800;color:#eaf2ff}

.faq-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
@media (max-width:860px){.faq-grid{grid-template-columns:1fr 1fr}}
@media (max-width:600px){.faq-grid{grid-template-columns:1fr}}
.faq{border:1px solid var(--bd);border-radius:12px;padding:10px;background:linear-gradient(180deg,#0f172a,#0b1220)}
.faq summary{font-weight:900}
.faq p{margin:.4rem 0 0;color:#eaf2ff}

/* responsive tweaks */
@media (max-width:760px){
  .slide,.plan{min-width:74vw}
  .summary{grid-template-columns:1fr}
  .summary-right{text-align:left}
}
`;