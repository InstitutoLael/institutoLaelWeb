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
import SEOHead from "../components/SEOHead.jsx";
import senasImg from "../assets/img/lael/senas.jpg";
import laelLogoWhite from "../assets/img/Logos/lael-inst-blanco.png";

const CERTIFICATE_FEE = 19990;

/* ---------- Utils ---------- */
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

/* ---------- Tiny toast ---------- */
function toast(msg, type = "info") {
  const n = document.createElement("div");
  n.className = `toast ${type}`;
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => n.classList.add("show"), 10);
  setTimeout(() => n.classList.remove("show"), 2600);
  setTimeout(() => n.remove(), 3000);
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
    setSelectedModules(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      toast(`${exists ? "❌ Quitado:" : "✅ Agregado:"} ${LSCH_MODULES.find(m=>m.id===id)?.name || ""}`, exists ? "warn" : "ok");
      return next;
    });
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

  /* ======= SEO ======= */
  const faqEntities = [
    { "@type": "Question", name: "¿Quedan grabadas las clases?", acceptedAnswer: { "@type": "Answer", text: "Sí. Subimos cada clase el mismo día para que puedas repasar." } },
    { "@type": "Question", name: "¿Necesito experiencia previa?", acceptedAnswer: { "@type": "Answer", text: "No. Puedes partir desde A0–A1; hay ruta guiada por módulos." } },
    { "@type": "Question", name: "¿Entregan certificado?", acceptedAnswer: { "@type": "Answer", text: `Sí, hay certificación opcional (+${clp(CERTIFICATE_FEE)}).` } },
    { "@type": "Question", name: "¿Hay precio convenio para iglesias?", acceptedAnswer: { "@type": "Answer", text: "Sí. Contamos con precio preferente con convenio vigente." } },
  ];

  const courseInstances = [
    {
      "@type": "Course",
      name: "Lengua de Señas Chilena — Módulos por nivel",
      description: "Programa LSCh online con clases en vivo, cápsulas, práctica guiada y opción de certificación.",
      provider: { "@type": "EducationalOrganization", name: "Instituto Lael", url: "https://www.institutolael.cl" }
    }
  ];

  return (
    <section className="lsch" itemScope itemType="https://schema.org/Course">
      <SEOHead
        title="LSCh online | Instituto Lael — Lengua de Señas Chilena con clases en vivo"
        description="Aprende Lengua de Señas Chilena (LSCh) online: clases en vivo + cápsulas, práctica guiada, opción de certificación y precio convenio para iglesias. Matrícula única."
        canonical="https://www.institutolael.cl/lsch"
        keywords={[
          "Lengua de Señas Chilena","LSCh online","curso lengua de señas","curso LSCh Chile",
          "curso lengua de señas cristiano","inclusión educativa Chile","clases en vivo lengua de señas",
          "certificado LSCh","convenio iglesias LSCh",
        ]}
        ogImage="https://www.institutolael.cl/assets/img/og/lsch-og.jpg"
        twitterImage="https://www.institutolael.cl/assets/img/og/lsch-og.jpg"
        jsonLd={[
          { "@context": "https://schema.org", "@type": "EducationalOrganization", "name": "Instituto Lael", "url": "https://www.institutolael.cl", "logo": "https://www.institutolael.cl/assets/img/lael/logo.png", "description": "Instituto Lael ofrece programas PAES, Idiomas y Lengua de Señas Chilena, con enfoque inclusivo y cristiano." },
          ...courseInstances,
          { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqEntities }
        ]}
      />

      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="badge-soft">🤟 LSCh Online</span>

            <h1 className="mega">
              <span itemProp="name">Lengua de Señas Chilena</span>{" "}
              <span className="under">sin enredos</span>
            </h1>

            <p className="lead" itemProp="description">
              Clases en vivo + cápsulas. Práctica guiada, opción de certificación y{" "}
              <b>precio convenio para iglesias</b>. Matrícula única <b>{clp(LSCH_ENROLLMENT_FEE)}</b>.
            </p>

            {/* chips de valor al estilo del HTML */}
            <div className="value-chips">
              <span className="chip-val">🎥 Práctica guiada</span>
              <span className="chip-val">📹 Todo grabado</span>
              <span className="chip-val">🧏‍♀️ Docente sorda</span>
              <span className="chip-val">🏛️ Convenio Iglesias</span>
            </div>

            <nav className="cta" aria-label="Acciones principales">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, quisiera info de LSCh.")}`}
                target="_blank" rel="noreferrer"
                aria-label="Abrir WhatsApp para consultar por LSCh"
              >
                WhatsApp
              </a>
            </nav>

            <ol className="steps-mini" aria-label="Cómo funciona">
              <li><b>1.</b> Elige módulos</li>
              <li><b>2.</b> Elige plan (grupal o 1:1)</li>
              <li><b>3.</b> Escríbenos por WhatsApp</li>
            </ol>
          </div>

          <figure className="hero__img circle-hero">
            <div className="circle">
              <div className="emoji">🤟</div>
              <p>Aprende LSCh con docente sorda nativa</p>
              <div className="mini-items">
                <span>🎯 Situaciones reales</span>
                <span>💬 Feedback en vivo</span>
                <span>🏆 Certificación opcional</span>
              </div>
            </div>
          </figure>
        </div>
      </header>

      {/* CONTEXTO RÁPIDO */}
      <div className="container">
        <div className="card rowy wrap mini-card" aria-label="Preferencias de plan y certificación">
          {/* Convenio iglesias */}
          <label className="switch">
            <input
              type="checkbox"
              checked={church}
              onChange={e => setChurch(e.target.checked)}
              aria-label="Aplicar precio convenio para iglesias"
            />
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
            <div className="purpose-grid">
              {LSCH_PURPOSES.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className={"purpose-card " + (purpose === p ? "selected" : "")}
                  onClick={() => {
                    setPurpose(prev => prev === p ? "" : p);
                    toast(prev => (purpose === p ? "❌ Propósito quitado" : `✅ Propósito: ${p}`), purpose === p ? "warn" : "ok");
                  }}
                  aria-pressed={purpose === p}
                >
                  <span className="purpose-emoji">🎯</span>
                  <span className="purpose-title">{p}</span>
                  <span className="purpose-desc">Personaliza tu ruta de aprendizaje</span>
                </button>
              ))}
              <button
                type="button"
                className={"chip cert-lg " + (certSelected ? "on" : "")}
                onClick={() => {
                  setCertSelected(v => !v);
                  toast(!certSelected ? "✅ Certificación agregada" : "❌ Certificación quitada", !certSelected ? "ok" : "warn");
                }}
                title="Certificación oficial (pago único)"
                aria-pressed={certSelected}
              >
                Certificación +{clp(CERTIFICATE_FEE)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MÓDULOS */}
      <section className="container block">
        <h2 className="section-title">Módulos del año <span className="soft">— diploma por módulo</span></h2>

        <div className="grid grid-2 tight">
          {LSCH_MODULES.map(m => {
            const active = selectedModules.includes(m.id);
            return (
              <article key={m.id} className={"card module modern " + (active ? "on" : "")} itemScope itemType="https://schema.org/CreativeWork">
                <header className="module__head">
                  <span className="level">{m.tag}</span>
                  <h3 className="ink" itemProp="name">{m.name}</h3>
                </header>

                <ul className="module-content">
                  {m.bullets.slice(0, 3).map((b, i) => <li key={i} className="ink-2" itemProp="about">{b}</li>)}
                </ul>

                <details className="mini-faq">
                  <summary>Ver contenidos</summary>
                  <ul className="bullets">
                    {m.bullets.map((b, i) => <li key={i} className="ink-2">{b}</li>)}
                  </ul>
                  <div className="chips" aria-label="Aplicaciones">
                    {m.servesFor.map((s, i) => <span key={i} className="chip ghost">{s}</span>)}
                  </div>
                </details>

                <div className="module__footer">
                  <button
                    className={"btn-pill " + (active ? "on" : "")}
                    onClick={() => toggleModule(m.id)}
                    aria-pressed={active}
                    aria-label={active ? `Quitar módulo ${m.name}` : `Agregar módulo ${m.name}`}
                  >
                    {active ? "Quitar módulo" : "Agregar módulo"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PLANES GRUPALES */}
      <section className="container block">
        <h2 className="section-title">Planes grupales <span className="soft">— en vivo</span></h2>

        <HScroll ariaLabel="Planes grupales">
          {LSCH_GROUP_PLANS.map(p => {
            const active = selectedGroupId === p.id;
            const monthly = priceForGroupPlan(p, { church });
            return (
              <article key={p.id} className={"card plan slide " + (active ? "on" : "")}>
                {p.badge && <div className="badge">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>

                <div className="price" aria-label={`Precio mensual ${clp(monthly)}`}>
                  <span className="big ink">{clp(monthly)}</span>
                  <span className="per">/mes</span>
                </div>

                <ul className="pricing-features">
                  <li>Clases grupales en vivo</li>
                  <li>Acceso a cápsulas</li>
                  <li>Práctica guiada</li>
                  <li>Soporte por WhatsApp</li>
                </ul>

                <div className={"note " + (church ? "ok" : "")}>
                  {church ? "Precio convenio aplicado" : "Mejor precio por duración"}
                </div>

                <button
                  className={"btn-outline " + (active ? "active" : "")}
                  onClick={() => setSelectedGroupId(p.id)}
                  aria-pressed={active}
                >
                  {active ? "Seleccionado" : "Elegir plan"}
                </button>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* 1:1 */}
      <section className="container block">
        <h2 className="section-title">Clases 1:1 <span className="soft">— refuerzo opcional</span></h2>

        <HScroll ariaLabel="Clases uno a uno">
          {LSCH_ONE2ONE_PLANS.map(p => {
            const active = selectedOneId === p.id;
            return (
              <article key={p.id} className={"card plan one slide " + (active ? "on" : "")}>
                {p.badge && <div className="badge alt">{p.badge}</div>}
                <h3 className="ink">{p.title}</h3>

                <div className="price" aria-label={`Precio mensual ${clp(p.monthly)}`}>
                  <span className="big ink">{clp(p.monthly)}</span>
                  <span className="per">/mes</span>
                </div>

                <ul className="pricing-features">
                  <li>Agenda prioritaria</li>
                  <li>Clases personalizadas</li>
                  <li>Ritmo adaptado</li>
                  <li>Feedback inmediato</li>
                </ul>

                <button
                  className={"btn-outline " + (active ? "active" : "")}
                  onClick={() => setSelectedOneId(active ? null : p.id)}
                  aria-pressed={active}
                >
                  {active ? "Quitar 1:1" : "Agregar 1:1"}
                </button>
              </article>
            );
          })}
        </HScroll>
      </section>

      {/* RESUMEN */}
      <section className="container">
        <div className="card summary plan-summary">
          <div className="summary-left">
            <img className="brand-logo" src={laelLogoWhite} alt="Logo Instituto Lael" />
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

              <div className="line">
                <span className="k">Propósito:</span> {purpose || "—"}
              </div>

              <div className="line soft">
                Matrícula: {clp(LSCH_ENROLLMENT_FEE)} {certSelected ? `· Certificación ${clp(CERTIFICATE_FEE)}` : ""}
              </div>
            </div>
          </div>

          <div className="summary-right">
            <div className="hint">Mensual estimada</div>
            <div className="total" aria-live="polite">{clp(totalMonthly)}</div>

            <div className="first">
              <span>Primer pago aprox.</span>
              <b>{clp(totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0))}</b>
            </div>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion" aria-label="Ir a inscripción">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/56964626568?text=${encodeURIComponent(whatsappText)}`}
                target="_blank" rel="noreferrer"
                aria-label="Enviar selección por WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container block">
        <h2 className="section-title">Preguntas rápidas</h2>
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

/* ===================== CSS (paleta sólida + alto contraste + UI modernizada) ===================== */
const css = `
:root{
  /* Paleta Lael (sólida) */
  --bg:#0A0E1A;
  --panel:#0E1426;
  --bd:#2E3B78;

  --ink:#FFFFFF;
  --ink2:#BFD1FF;

  --blue:#3450FF;     /* acento principal */
  --yellow:#FFCC33;   /* CTA y badges */
  --green:#16C47F;    /* éxito */
  --pink:#FF7EC2;     /* sello docente sorda */
  --violet:#7C8CFF;   /* chips/tags */
  --rose:#F7A8D8;     /* detalle soft */

  --rad:16px;
  --shadow:0 12px 28px rgba(8,12,40,.35);
}

*{box-sizing:border-box}
body{background:var(--bg)}
.container{max-width:1120px;margin:0 auto;padding:0 18px;color:var(--ink)}
.lsch{background:var(--bg);color:var(--ink)}

/* Toast */
.toast{
  position:fixed; top:24px; right:24px; z-index:9999;
  background:#1B254B; color:#fff; padding:.8rem 1.1rem; border-radius:12px;
  border:2px solid var(--bd); opacity:0; transform:translateX(12px);
  transition:.2s ease; font-weight:800; box-shadow:var(--shadow)
}
.toast.ok{border-color:var(--green)}
.toast.warn{border-color:#F59E0B}
.toast.show{opacity:1; transform:none}

/* HERO */
.hero{padding:40px 0 14px;border-bottom:2px solid var(--bd);background:var(--bg)}
.hero__grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
@media (max-width:980px){.hero__grid{grid-template-columns:1fr}}

.badge-soft{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.5rem 1rem;border-radius:999px;border:2px solid var(--violet);
  background:#151C3B;color:var(--ink2);font-weight:900
}

.mega{margin:.5rem 0 .35rem;font-size:clamp(1.9rem,3.1vw + .7rem,2.7rem);line-height:1.12}
.under{box-shadow:inset 0 -12px var(--violet);border-radius:4px}
.lead{color:var(--ink2);max-width:60ch}

.value-chips{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 18px}
.chip-val{
  background:var(--panel); border:2px solid var(--bd); color:var(--ink2);
  padding:.55rem .9rem; border-radius:12px; font-weight:900
}
.chip-val:hover{border-color:var(--violet); color:#E7EDFF}

/* CTA */
.cta{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0 0}
.btn{display:inline-flex;align-items:center;gap:8px;padding:.8rem 1.1rem;border-radius:12px;border:2px solid var(--blue);text-decoration:none;font-weight:900;transition:.15s}
.btn-primary{background:var(--yellow);border-color:var(--yellow);color:#0A0E1A;box-shadow:var(--shadow)}
.btn-primary:hover{transform:translateY(-1px)}
.btn-ghost{background:transparent;border-color:var(--blue);color:var(--ink)}
.btn-ghost:hover{background:#121B3B}

.steps-mini{display:flex;gap:14px;margin:14px 0 0;padding:0;list-style:none;color:var(--ink2)}
.steps-mini b{color:var(--ink)}

/* HERO círculo visual */
.circle-hero{display:grid;place-items:center}
.circle{
  width:360px;height:360px;border-radius:999px;background:var(--panel);
  border:2px solid var(--bd);display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:18px;box-shadow:var(--shadow)
}
.emoji{font-size:64px;margin-bottom:8px}
.circle p{color:var(--ink2);margin:4px 0 12px}
.mini-items{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.mini-items span{background:#141B37;border:2px solid var(--bd);padding:.34rem .6rem;border-radius:999px;font-weight:900;color:#DDE7FF}
@media (max-width:980px){.circle{width:300px;height:300px}.emoji{font-size:48px}}

/* TARJETAS GENERALES */
.card{
  border:2px solid var(--bd);
  border-radius:var(--rad);
  padding:14px;
  background:var(--panel);
  color:var(--ink);
  transition:.15s ease;
}
.card:hover{border-color:#3E51A8}
.block{margin:24px 0}
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

/* PURPOSE (tarjetas seleccionables) */
.purpose .label{font-weight:1000;margin-bottom:8px}
.purpose-grid{display:flex;flex-wrap:wrap;gap:12px}
.purpose-card{
  border:2px solid var(--bd); background:#0F1530; color:var(--ink);
  border-radius:14px; padding:12px 14px; min-width:240px; display:flex; gap:10px; align-items:center;
  cursor:pointer; transition:.15s ease; position:relative
}
.purpose-card:hover{border-color:var(--blue)}
.purpose-card.selected{border-color:var(--green); background:#0F2F24}
.purpose-emoji{font-size:20px}
.purpose-title{font-weight:900}
.purpose-desc{color:var(--ink2);font-size:.9rem}
.cert-lg{
  border:2px solid var(--yellow);background:#3A2E00;color:#FFEFB0;border-radius:999px;padding:.7rem 1rem;font-weight:1000
}
.cert-lg.on{background:#634C00}

/* GRID */
.grid{display:grid;gap:14px}
.grid.tight{gap:12px}
.grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:640px){.grid-2{grid-template-columns:1fr}}

/* MÓDULOS (moderno) */
.module.modern .module__head{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.module.modern .level{
  background:var(--blue); color:#fff; border-radius:999px; padding:.25rem .6rem; font-weight:900
}
.module-content{list-style:none;margin:.35rem 0 .6rem;padding:0}
.module-content li{display:flex;gap:.6rem;align-items:flex-start;color:var(--ink2);padding:.25rem 0}
.module-content li::before{content:"🤟";margin-top:.05rem}
.mini-faq summary{cursor:pointer;font-weight:900;color:var(--ink)}
.mini-faq ul{margin:.3rem 0 0;padding-left:20px}
.module__footer{margin-top:10px;display:flex}
.btn-pill{
  width:100%;text-align:center;border-radius:12px;font-weight:1000;
  padding:.6rem .9rem;border:2px solid var(--blue);background:#121B3B;color:#fff;transition:.15s
}
.btn-pill.on{border-color:var(--green);background:#0F2F24}

/* CARRUSEL */
.hscroll-wrap{position:relative}
.hscroll{display:flex;gap:12px;overflow:auto;scroll-snap-type:x mandatory;padding:2px 2px 12px;scrollbar-width:none}
.hscroll::-webkit-scrollbar{display:none}
.slide{scroll-snap-align:start;min-width:248px}

/* FLECHAS DE CARRUSEL */
.hs-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: var(--blue);
  color: #fff;
  font-size: 20px;
  display: grid;
  place-items: center;
  z-index: 3;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(52,80,255,0.4);
  transition: all 0.2s ease;
}
.hs-btn:hover {
  background: var(--yellow);
  color: #0A0E1A;
  box-shadow: 0 0 12px rgba(255,204,51,0.6);
}
.hs-btn.prev { left: -18px; }
.hs-btn.next { right: -18px; }

/* PLANES */
.plan{display:flex;flex-direction:column;gap:8px;min-width:268px}
.plan .badge{align-self:flex-end;background:var(--yellow);color:#0A0E1A;font-weight:900;border-radius:999px;padding:.18rem .6rem;font-size:.78rem}
.plan .badge.alt{background:var(--pink);color:#0A0E1A}
.price{display:flex;align-items:baseline;gap:8px}
.big{font-weight:1000;font-size:1.45rem}
.per{color:#FFEFB0;font-weight:900}
.pricing-features{list-style:none;margin:.25rem 0 .4rem;padding:0;border-top:1px solid var(--bd)}
.pricing-features li{display:flex;gap:.6rem;align-items:center;color:var(--ink2);padding:.5rem 0;border-bottom:1px solid var(--bd)}
.pricing-features li::before{content:"✓";color:var(--green);font-weight:1000}
.note{color:#E0FFEF;font-weight:800}
.note.ok{color:#B2FFD9}
.btn-outline{
  width:100%;border:2px solid var(--blue);color:#fff;background:#121B3B;
  padding:.6rem .9rem;border-radius:12px;font-weight:1000;transition:.15s
}
.btn-outline.active{background:var(--blue)}

/* RESUMEN */
.summary{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin:12px 0 22px}
.summary-left{display:flex;align-items:center;gap:14px}
.brand-logo{width:70px;height:70px;object-fit:contain}
.title{font-weight:1000}
.line{color:var(--ink)}
.line .k{color:var(--pink);font-weight:900}
.summary-right{text-align:right}
.hint{color:#FFEFB0;font-weight:900}
.total{font-size:1.8rem;font-weight:1000;color:var(--yellow)}
.first span{font-weight:900;color:var(--ink2)}
.plan-summary{border:2px solid var(--bd);box-shadow:var(--shadow)}

/* FAQ */
.section-title{font-size:1.6rem;font-weight:1000}
.faq-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
@media (max-width:860px){.faq-grid{grid-template-columns:1fr 1fr}}
@media (max-width:600px){.faq-grid{grid-template-columns:1fr}}
.faq{border:2px solid var(--bd);border-radius:12px;padding:12px;background:var(--panel)}
.faq summary{font-weight:900}
.faq p{margin:.45rem 0 0;color:var(--ink2)}
`;