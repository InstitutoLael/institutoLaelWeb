// src/pages/PAES.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PartnersMarquee from "../components/PartnersMarquee.jsx";

import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  PAES_COMBOS,
  priceForSubjects,
  priceForCount,
  priceAnnual,
  ACADEMIC_MONTHS,
  ACADEMIC_PERIOD_LABEL,
  clp,
} from "../data/paes.js";

import studyOnline from "../assets/img/lael/study-online.jpg";

/* helpers */
const essaysForCount = (n) => (!n ? 0 : n >= 5 ? 5 : n);

export default function PAES() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const builderRef = useRef(null);

  const selectedSubjects = useMemo(
    () => PAES_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id)),
    [selectedSubjectIds]
  );
  const subjectCount = selectedSubjects.length;

  const monthly = subjectCount ? priceForSubjects(selectedSubjectIds) : 0;
  const annual = subjectCount ? priceAnnual(subjectCount) : 0;

  const toggleSubject = (id) =>
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const chooseCombo = (ids) => {
    setSelectedSubjectIds([...ids]);
    queueMicrotask(() => {
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const waMsg = encodeURIComponent(
    `Hola 👋, quisiera información sobre PAES.
Ramos elegidos: ${selectedSubjects.map((s) => s.name).join(", ") || "—"}
Mensual estimado: ${subjectCount ? clp(monthly) : "—"}
Anual (${ACADEMIC_MONTHS} meses): ${subjectCount ? clp(annual) : "—"}
Matrícula: ${clp(ENROLLMENT_FEE)}`
  );

  // Combos mostrados
  const COMBOS_TOP = ["hum-duo", "stem-fuerte", "salud-trio", "full-5", "completo-7"];
  const combos = PAES_COMBOS.filter((c) => COMBOS_TOP.includes(c.id));

  // Precios anuales tarjetas
  const annual1 = priceAnnual(1);
  const annual2 = priceAnnual(2);
  const annual3 = priceAnnual(3);
  const annual7 = priceAnnual(7);

  return (
    <section className="paes" style={{ "--accent": "#5850EC", "--soft": "rgba(88,80,236,.14)" }}>
      <style>{css}</style>

      {/* HERO (sin video, limpio) */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="pill">PAES</span>
            <h1>
              Tu camino a la universidad,{" "}
              <span className="under">guiado con propósito</span>.
            </h1>
            <p className="lead">
              Clases en vivo + cápsulas, <b>ensayos guiados</b> y
              acompañamiento real. Matrícula única{" "}
              <b>{clp(ENROLLMENT_FEE)}</b>. Sin letra chica.
            </p>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">
                Inscribirme
              </Link>
              <a
                className="btn btn-outline"
                href={`https://wa.me/56964626568?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <ul className="badges">
              <li>✅ Ensayos con retro</li>
              <li>🎥 Clases grabadas</li>
              <li>🧑‍🏫 Tutorías</li>
            </ul>
          </div>

          {/* Imagen sutil (puedes cambiarla o quitarla) */}
          <figure className="hero__media" aria-hidden>
            <img
              src={studyOnline}
              alt="Estudio online con acompañamiento"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </figure>
        </div>
      </header>

      {/* Partners / confianza */}
      <section className="partners">
        <div className="container prt-wrap">
          <PartnersMarquee speed={28} height={28} gap={48} />
        </div>
      </section>

      {/* Trust bar */}
      <section className="trust">
        <div className="container trust__row">
          <TrustPill kpi="87%" label="alcanza su meta" />
          <TrustPill kpi="+11.000 h" label="de clases en vivo" />
          <TrustPill kpi="9/10" label="nos recomiendan" />
        </div>
      </section>

      {/* Beneficios */}
      <section className="benefits">
        <div className="container grid-4">
          <Feature icon="🧠" title="Clases claras">
            En vivo + cápsulas con pautas.
          </Feature>
          <Feature icon="📝" title="Ensayos guiados">
            Retro detallada cada mes.
          </Feature>
          <Feature icon="🤝" title="Acompañamiento real">
            Tutorías y seguimiento.
          </Feature>
          <Feature icon="💳" title="Precio accesible">
            Matrícula única. Sin sorpresas.
          </Feature>
        </div>
      </section>

      <div className="container">
        {/* Precios anuales simples */}
        <section className="value">
          <header className="sec-head">
            <span className="chip-accent">Transparente</span>
            <h2>
              Precios anuales · {ACADEMIC_MONTHS} meses ({ACADEMIC_PERIOD_LABEL})
            </h2>
            <p className="muted">
              Cada plan incluye clases en vivo, cápsulas y{" "}
              <b>1 ensayo/mes por ramo</b>.
            </p>
          </header>

          <div className="value-grid" role="list">
            <PlanCard tag="1 ramo" money={clp(annual1)} sub={`≈ ${clp(priceForCount(1))} / mes`} color="indigo" items={["Ensayo mensual","Material descargable"]} />
            <PlanCard tag="2 ramos" money={clp(annual2)} sub={`≈ ${clp(priceForCount(2))} / mes`} color="green"  items={["2 ensayos/mes","Soporte por WhatsApp"]} />
            <PlanCard tag="3 ramos" money={clp(annual3)} sub={`≈ ${clp(priceForCount(3))} / mes`} color="amber"  items={["Tutoría mensual","Cápsulas on-demand"]} />
            <PlanCard tag="Todos los ramos" ribbon="FULL 7" money={clp(annual7)} sub={`≈ ${clp(priceForCount(7))} / mes`} color="rose" items={["7 ensayos/mes","Soporte premium"]} featured />
          </div>
        </section>

        {/* Combos recomendados (scrollable en móvil) */}
        <section className="combos">
          <header className="sec-head">
            <h2>Combos recomendados</h2>
            <p>Elige un punto de partida. Puedes ajustarlo abajo.</p>
          </header>

          <div className="combo-strip" role="list">
            {combos.map((p) => (
              <ComboCard key={p.id} plan={p} onChoose={() => chooseCombo(p.subjects || [])} />
            ))}
          </div>
        </section>

        {/* Builder reducido */}
        <section ref={builderRef} className="builder">
          <header className="sec-head">
            <h2>Arma tu plan</h2>
            <p className="muted">Selecciona ramos libremente.</p>
          </header>

          <div className="builder-tools">
            <button type="button" className="btn btn-ghost sm" onClick={() => setSelectedSubjectIds([])}>
              Limpiar selección
            </button>
          </div>

          <div className="subjects">
            {PAES_SUBJECTS.map((s) => {
              const on = selectedSubjectIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`subject ${on ? "on" : ""}`}
                  onClick={() => toggleSubject(s.id)}
                  aria-pressed={on}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          <div className="summary" aria-describedby="precios-live">
            <div className="sum-left">
              <div className="sum-title">
                Selección: <span className="hi">{subjectCount}</span> ramo(s)
                {!!subjectCount && (
                  <span className="muted">
                    {" "}
                    · {selectedSubjects.map((s) => s.name).join(", ")}
                  </span>
                )}
              </div>
              <ul className="sum-feats">
                <li>Clases en vivo + cápsulas</li>
                <li>
                  {subjectCount
                    ? `${essaysForCount(subjectCount)} ensayo(s)/mes`
                    : "Ensayos mensuales"}
                </li>
                <li>{subjectCount >= 3 ? "Tutoría mensual" : "Soporte por WhatsApp"}</li>
              </ul>
            </div>

            <div className="sum-price">
              <div className="tiny muted">Mensual</div>
              <div className="numbers">
                <span className="promo">
                  {subjectCount ? clp(monthly) : "—"}
                </span>
              </div>
              <div className="tiny muted">
                Anual ({ACADEMIC_MONTHS} meses):{" "}
                <b>{subjectCount ? clp(annual) : "—"}</b> · + matrícula{" "}
                {clp(ENROLLMENT_FEE)}
              </div>
              <div className="actions">
                <Link className="btn btn-primary" to="/inscripcion">
                  Inscribirme
                </Link>
                <a
                  className="btn btn-outline"
                  href={`https://wa.me/56964626568?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div id="precios-live" className="sr-only" aria-live="polite">
                Precio mensual {subjectCount ? clp(monthly) : "no disponible"}.
                Precio anual {subjectCount ? clp(annual) : "no disponible"}.
              </div>
            </div>
          </div>
        </section>

        {/* FAQ corto */}
        <section className="faq">
          <header className="sec-head">
            <h2>Preguntas frecuentes</h2>
          </header>
          <details>
            <summary><span>Si falto a una clase…</span></summary>
            <p>Queda grabada y tendrás cápsulas/material + tutoría si la necesitas.</p>
          </details>
          <details>
            <summary><span>¿Ensayos y feedback?</span></summary>
            <p>Cada mes. Con retro detallada según pauta.</p>
          </details>
          <details>
            <summary><span>¿Puedo cambiar de plan?</span></summary>
            <p>Sí. Ajustamos ramos y ritmo según tu avance.</p>
          </details>
        </section>

        {/* CTA final */}
        <section className="cta-final">
          <div className="cta-final__box">
            <h3>¿Listo para empezar?</h3>
            <p>Inscríbete en minutos o conversemos por WhatsApp.</p>
            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-outline" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function TrustPill({ kpi, label }) {
  return (
    <div className="tpill">
      <div className="tpill__kpi">{kpi}</div>
      <div className="tpill__label">{label}</div>
    </div>
  );
}

function Feature({ icon, title, children }) {
  return (
    <article className="feat">
      <div className="ico">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

function PlanCard({ tag, money, sub, items = [], color = "indigo", ribbon, featured }) {
  return (
    <article className={`value-card accent-${color} ${featured ? "featured" : ""}`} role="listitem">
      {ribbon && <div className="ribbon">{ribbon}</div>}
      <div className="tag">{tag}</div>
      <div className="money">{money}</div>
      <div className="sub">{sub}</div>
      <ul className="points">
        {items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </article>
  );
}

function ComboCard({ plan, onChoose }) {
  const count = plan.subjects?.length || 0;
  const monthly = priceForCount(count);
  const annual = priceAnnual(count);

  return (
    <article className={`combo-card ${plan.color ? `outline-${plan.color}` : ""}`} role="listitem">
      {plan.badge && <div className="badge">{plan.badge}</div>}
      <div className="combo-head">
        <span className="pill small">{plan.title}</span>
        {plan.tagline && <h3 className="combo-title">{plan.tagline}</h3>}
      </div>

      <div className="combo-price">
        <span className="promo">{clp(monthly)}</span>
        <span className="list">Anual: <b>{clp(annual)}</b></span>
      </div>

      <ul className="combo-feats">
        {(plan.features || []).slice(0, 2).map((f, i) => <li key={i}>{f}</li>)}
        <li>{count >= 5 ? "5+ ensayos/mes" : `${count} ensayos/mes`}</li>
      </ul>

      <button className="btn btn-primary w100" onClick={onChoose}>
        Elegir este combo
      </button>
    </article>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --bd:#1f2a44; --card:#0d1528;
  --text:#fff; --muted:#eaf2ff; --rad:18px;
}
.container{max-width:1120px;margin:0 auto;padding:0 18px}

/* HERO */
.hero{
  padding:34px 0 20px; color:var(--text); border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, var(--soft), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__grid{display:grid; grid-template-columns:1.1fr .9fr; gap:24px; align-items:center}
@media (max-width:980px){.hero__grid{grid-template-columns:1fr;}}
.pill{display:inline-block;padding:.22rem .6rem;border-radius:999px;border:1px solid #334155;font-weight:900}
h1{margin:.5rem 0 .35rem; font-size:clamp(1.8rem, 3.2vw + .4rem, 2.6rem)}
.under{box-shadow:inset 0 -10px rgba(88,80,236,.28); border-radius:4px}
.lead{color:var(--muted);max-width:62ch}
.cta{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 0}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:.68rem 1.05rem;border-radius:12px;border:1px solid #2f3341;text-decoration:none;font-weight:900}
.btn-primary{background:#5850EC;color:#fff;border-color:#5850EC}
.btn-outline{background:transparent;color:#eaf2ff}
.btn:hover{transform:translateY(-1px);box-shadow:0 14px 28px rgba(2,6,23,.28);transition:.18s}
.badges{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 0;padding:0;list-style:none;color:#cfe0ff}
.hero__media{border:1px solid var(--bd);border-radius:22px;overflow:hidden;min-height:220px;background:#0f172a;box-shadow:0 18px 36px rgba(2,6,23,.32)}
.hero__media img{display:block;width:100%;height:auto;object-fit:cover}

/* Partners */
.partners{padding:10px 0}
.prt-wrap{border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:10px 0}

/* Trust */
.trust{padding:18px 0 10px}
.trust__row{display:grid;gap:10px;grid-template-columns:repeat(3,1fr)}
@media (max-width:780px){.trust__row{grid-template-columns:1fr}}
.tpill{border:1px solid var(--bd);border-radius:14px;background:linear-gradient(180deg,var(--panel),#0d1528);padding:10px 14px;display:flex;align-items:baseline;gap:10px}
.tpill__kpi{font-weight:1000;font-size:1.2rem}
.tpill__label{color:#eaf2ff}

/* Benefits */
.benefits{padding:24px 0}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media (max-width:980px){.grid-4{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.grid-4{grid-template-columns:1fr}}
.feat{border:1px solid var(--bd);border-radius:16px;padding:14px;background:linear-gradient(180deg,var(--panel),#0d1528)}
.feat h3{margin:.3rem 0 .2rem}
.feat p{margin:0;color:#eaf2ff}
.ico{font-size:1.1rem}

/* Section head */
.sec-head{margin:18px 0 10px;color:var(--text)}
.sec-head h2{margin:0 0 4px}
.sec-head p{margin:0;color:var(--muted)}
.chip-accent{display:inline-block;padding:.22rem .6rem;border-radius:999px;background:#22d3ee;color:#0b1220;font-weight:1000;margin-bottom:6px}

/* Value / planes */
.value-grid{display:grid;gap:12px;grid-template-columns:repeat(4,minmax(0,1fr))}
@media (max-width:1024px){.value-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:640px){.value-grid{grid-template-columns:1fr}}
.value-card{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#0f172a,#0b1220);padding:14px;color:#fff;box-shadow:0 18px 36px rgba(2,6,23,.32);overflow:hidden}
.value-card .tag{font-weight:900;color:#eaf2ff}
.value-card .money{margin:.1rem 0 0;font-size:1.8rem;font-weight:1000}
.value-card .sub{color:#cfe0ff;margin:-2px 0 6px}
.value-card .points{margin:6px 0 0;padding-left:18px;color:#eaf2ff}
.value-card.featured{transform:translateY(-2px)}
.value-card .ribbon{position:absolute;top:10px;right:-38px;transform:rotate(14deg);background:#e11d48;color:#fff;font-weight:1000;padding:.22rem 1.6rem;border:1px solid #be185d;box-shadow:0 10px 22px rgba(225,29,72,.28)}
.accent-indigo{outline:1px solid rgba(88,80,236,.35)}
.accent-green{outline:1px solid rgba(22,163,74,.35)}
.accent-amber{outline:1px solid rgba(245,158,11,.35)}
.accent-rose{outline:1px solid rgba(225,29,72,.35)}

/* Combos */
.combos{margin-top:14px}
.combo-strip{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(280px,1fr);gap:12px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;scroll-snap-type:x mandatory}
.combo-strip>*{scroll-snap-align:start}
.combo-card{position:relative;color:var(--text);border-radius:var(--rad);border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02)),linear-gradient(180deg,#0f172a,#0b1220);box-shadow:0 18px 36px rgba(2,6,23,.32);padding:14px;transition:transform .16s ease, box-shadow .16s ease, border-color .16s ease}
.combo-card:hover{transform:translateY(-2px);box-shadow:0 22px 44px rgba(2,6,23,.38);border-color:#2a3550}
.badge{position:absolute;top:10px;right:10px;background:#5850EC;color:#fff;font-weight:1000;padding:.18rem .5rem;border-radius:9px}
.combo-head .combo-title{margin:.2rem 0 .1rem;font-size:1.05rem}
.combo-price{display:flex;align-items:baseline;gap:10px;margin:.2rem 0 .4rem}
.combo-price .promo{font-size:1.5rem;font-weight:1000;color:#5850EC}
.combo-price .list{color:#cbd5e1}
.combo-feats{margin:0 0 .8rem;padding-left:18px;color:#eaf2ff}
.outline-amber{outline:1px solid #b4530933}
.outline-green{outline:1px solid #15803d33}
.outline-indigo{outline:1px solid #4338ca33}
.outline-rose{outline:1px solid #be185d33}

/* Builder */
.builder{margin-top:18px}
.builder-tools{display:flex;gap:8px;margin:4px 0 10px}
.subjects{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
.subject{padding:.52rem .78rem;border-radius:999px;border:1px solid #28324a;background:#0f172a;color:#e5e7eb;font-weight:900;transition:.15s}
.subject:hover{transform:translateY(-1px);box-shadow:0 10px 22px rgba(2,6,23,.28)}
.subject.on{background:#101a2f;border-color:#5850EC;color:#fff}

.summary{margin-top:12px;display:grid;grid-template-columns:1.2fr .8fr;gap:14px;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:16px;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02)),linear-gradient(180deg,#0f172a,#0b1220);box-shadow:0 18px 36px rgba(2,6,23,.32)}
@media (max-width:860px){.summary{grid-template-columns:1fr}}
.sum-title{font-weight:1000}
.hi{color:#5850EC;font-weight:1000}
.muted{color:var(--muted);opacity:.95}
.tiny{font-size:.92rem}
.sum-feats{margin:.4rem 0 0;padding-left:18px;color:#eaf2ff}
.sum-price{text-align:right}
@media (max-width:860px){.sum-price{text-align:left}}
.numbers{display:flex;align-items:baseline;gap:10px;margin:.1rem 0 .25rem}
.numbers .promo{font-size:1.8rem;font-weight:1000;color:#5850EC}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}

/* FAQ */
.faq{padding:22px 0}
.faq details{border:1px solid var(--bd);border-radius:14px;background:var(--panel);padding:12px 14px;margin-bottom:10px}
.faq summary{cursor:pointer;font-weight:900;list-style:none;display:flex;align-items:center;gap:8px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"▸";margin-left:auto;transform:rotate(0deg);transition:transform .16s ease;color:#f2ce3d}
.faq details[open] summary::after{transform:rotate(90deg)}
.faq p{margin:.5rem 0 0;color:#eaf2ff}

/* CTA final */
.cta-final{padding:10px 0 36px}
.cta-final__box{border:1px solid var(--bd);border-radius:18px;padding:22px;text-align:center;background:linear-gradient(180deg,var(--bg),#0f172a)}

/* A11y */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
button:focus-visible,.btn:focus-visible{outline:2px solid #22d3ee;outline-offset:2px}
`;