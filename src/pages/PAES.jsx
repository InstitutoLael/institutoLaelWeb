// src/pages/PAES.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

/* helpers locales */
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
  const annual  = subjectCount ? priceAnnual(subjectCount) : 0;

  const toggleSubject = (id) =>
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // Elegir combo: solo setea selección (sin scroll)
  const chooseCombo = (ids) => setSelectedSubjectIds([...ids]);

  const waMsg = encodeURIComponent(
    `Hola 👋, quiero info PAES.
Ramos: ${selectedSubjects.map((s) => s.name).join(", ") || "—"}
Mensual: ${clp(monthly)}
Anual (${ACADEMIC_MONTHS} meses): ${clp(annual)}
Matrícula: ${clp(ENROLLMENT_FEE)}`
  );

  // Curamos algunos combos
  const COMBOS_TOP = ["hum-duo", "intensivo-historia", "stem-fuerte", "salud-trio", "full-5", "completo-7"];
  const combos = PAES_COMBOS.filter((c) => COMBOS_TOP.includes(c.id));

  // Valores anuales calculados (tarjetas)
  const annual1 = priceAnnual(1);
  const annual2 = priceAnnual(2);
  const annual3 = priceAnnual(3);
  const annual7 = priceAnnual(7);

  return (
    <section className="paes" style={{ "--accent": "#5850EC", "--accentSoft": "rgba(88,80,236,.16)" }}>
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="pill">PAES</span>
            <h1>
              Combos claros + <span className="under">Arma tu plan</span>
            </h1>
            <p className="lead">
              En vivo + grabadas, ensayos guiados y seguimiento. Matrícula única{" "}
              <strong>{clp(ENROLLMENT_FEE)}</strong>. El precio baja al sumar ramos.
            </p>
            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          <figure className="hero__img" aria-hidden>
            <img src={studyOnline} alt="Estudiando online" loading="eager" />
          </figure>
        </div>
      </header>

      <div className="container">
        {/* VALOR ANUAL (visual, con tarjetas) */}
        <section className="value">
          <header className="sec-head value-head">
            <span className="chip-accent">Transparente</span>
            <h2>Precios anuales claros · {ACADEMIC_MONTHS} meses ({ACADEMIC_PERIOD_LABEL})</h2>
            <p className="muted">
              Clases en vivo + cápsulas + material + <b>1 ensayo/mes</b> por ramo. Sin letra chica.
            </p>
          </header>

          <div className="value-grid" role="list">
            {/* 1 RAMO */}
            <article className="value-card accent-indigo" role="listitem">
              <div className="tag">1 ramo</div>
              <div className="money">{clp(annual1)}</div>
              <div className="sub">≈ {clp(priceForCount(1))} / mes</div>
              <ul className="points">
                <li>Ensayo mensual</li>
                <li>Material descargable</li>
              </ul>
            </article>

            {/* 2 RAMOS */}
            <article className="value-card accent-green" role="listitem">
              <div className="tag">2 ramos</div>
              <div className="money">{clp(annual2)}</div>
              <div className="sub">≈ {clp(priceForCount(2))} / mes</div>
              <ul className="points">
                <li>2 ensayos/mes</li>
                <li>Soporte por WhatsApp</li>
              </ul>
            </article>

            {/* 3 RAMOS */}
            <article className="value-card accent-amber" role="listitem">
              <div className="tag">3 ramos</div>
              <div className="money">{clp(annual3)}</div>
              <div className="sub">≈ {clp(priceForCount(3))} / mes</div>
              <ul className="points">
                <li>Tutoría mensual</li>
                <li>Cápsulas on-demand</li>
              </ul>
            </article>

            {/* FULL 7 */}
            <article className="value-card accent-rose featured" role="listitem">
              <div className="ribbon">FULL 7</div>
              <div className="tag">Todos los ramos</div>
              <div className="money">{clp(annual7)}</div>
              <div className="sub">≈ {clp(priceForCount(7))} / mes</div>
              <ul className="points">
                <li>7 ensayos/mes</li>
                <li>Soporte premium</li>
              </ul>
            </article>
          </div>

          <div className="compare-card">
            <div className="cmp-icon">💡</div>
            <div className="cmp-copy">
              En un preuniversitario tradicional, 2–3 ramos cuestan entre <b>$500.000</b> y <b>$900.000</b>.
              En Lael, por <u>menos de la mitad</u> tienes clases en vivo, cápsulas y ensayos guiados, 100% online y cercano.
            </div>
          </div>

          <ul className="value-why">
            <li>Mostramos <b>precio anual</b>, no mensual: comparas fácil y sin sorpresas.</li>
            <li>Incluye <b>ensayos, cápsulas y soporte</b>; no son “clases sueltas”.</li>
            <li>Seguimos siendo de las opciones más accesibles del mercado.</li>
          </ul>
        </section>

        {/* COMBOS */}
        <section className="combos">
          <header className="sec-head">
            <h2>Combos recomendados</h2>
            <p>Empieza rápido. Puedes ajustar abajo en <b>Arma tu plan</b>.</p>
          </header>

          <div className="combo-strip" role="list">
            {combos.map((p) => (
              <ComboCard key={p.id} plan={p} onChoose={() => chooseCombo(p.subjects || [])} />
            ))}
          </div>
        </section>

        {/* BUILDER */}
        <section ref={builderRef} className="builder">
          <header className="sec-head row">
            <h2>Arma tu plan por ramos</h2>
            <small className="muted">Selecciona o deselecciona libremente</small>
          </header>

          {/* sin atajos */}

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

          <div className="summary">
            <div className="sum-left">
              <div className="sum-title">
                Selección: <span className="hi">{subjectCount}</span> ramo(s)
                {!!subjectCount && <span className="muted"> · {selectedSubjects.map((s) => s.name).join(", ")}</span>}
              </div>
              <ul className="sum-feats">
                <li>Clases en vivo + cápsulas</li>
                <li>{subjectCount ? `${essaysForCount(subjectCount)} ensayo(s)/mes` : "Ensayos mensuales"}</li>
                <li>{subjectCount >= 3 ? "Tutoría mensual" : "Soporte por WhatsApp"}</li>
              </ul>
            </div>

            <div className="sum-price">
              <div className="tiny muted">Mensual</div>
              <div className="numbers">
                <span className="promo">{clp(monthly)}</span>
              </div>
              <div className="tiny muted">
                Anual ({ACADEMIC_MONTHS} meses): <b>{clp(annual)}</b> · + matrícula {clp(ENROLLMENT_FEE)}
              </div>
              <div className="actions">
                <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
                <a className="btn btn-outline" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* HORARIOS */}
        <section className="schedule">
          <header className="sec-head row">
            <h2>Horarios</h2>
            <span className="soon">PRÓXIMAMENTE</span>
          </header>
          <p className="muted tiny">Publicaremos los horarios por ramo aquí. Mientras, todas las clases quedan grabadas.</p>
        </section>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function ComboCard({ plan, onChoose }) {
  const count = plan.subjects?.length || 0;
  const monthly = priceForCount(count);
  const annual  = priceAnnual(count);

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

/* ---------- CSS (hereda tu estética) ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --text:#fff; --muted:#eaf2ff; --rad:18px;
}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  padding:34px 0 20px; color:var(--text); border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, var(--accentSoft), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__grid{ display:grid; grid-template-columns: 1.1fr .9fr; gap:26px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; font-weight:900; color:#fff; }
.pill.small{ font-size:.72rem; padding:.16rem .5rem; }
h1{ margin:.45rem 0 .35rem; font-size:clamp(1.7rem, 3vw + .6rem, 2.4rem); letter-spacing:.2px; }
.under{ box-shadow: inset 0 -10px rgba(88,80,236,.25); border-radius:4px; }
.lead{ color:var(--muted); max-width:64ch; }
.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:12px 0 0; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.68rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
}
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-outline, .btn-ghost{ background:transparent; color:#eaf2ff; }
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); transition:.18s; }
.w100{ width:100%; }

.hero__img{
  border-radius:20px; overflow:hidden; border:1px solid var(--bd);
  background:#0f172a;
  box-shadow: 0 0 0 12px rgba(255,255,255,.06) inset, 0 24px 56px rgba(2,6,23,.36);
}
.hero__img img{ display:block; width:100%; height:auto; object-fit:cover; }

/* Section head */
.sec-head{ margin:18px 0 12px; color:var(--text); }
.sec-head h2{ margin:0 0 4px; }
.sec-head p{ margin:0; color:var(--muted); }
.sec-head.row{ display:flex; align-items:center; gap:10px; }

/* ===== Valor anual, versión visual ===== */
.value{ margin-top:18px; }
.value-head .chip-accent{
  display:inline-block; padding:.22rem .6rem; border-radius:999px;
  background:#22d3ee; color:#0b1220; font-weight:1000; margin-bottom:6px;
  box-shadow:0 10px 18px rgba(34,211,238,.18);
}
.value-grid{
  display:grid; gap:12px;
  grid-template-columns: repeat(4, minmax(0,1fr));
}
@media (max-width:1024px){ .value-grid{ grid-template-columns:repeat(2,1fr); } }
@media (max-width:640px){ .value-grid{ grid-template-columns:1fr; } }

.value-card{
  position:relative; border-radius:16px;
  border:1px solid rgba(255,255,255,.08);
  background:
    radial-gradient(560px 200px at -10% -10%, rgba(255,255,255,.06), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  padding:14px; color:#fff; box-shadow:0 18px 36px rgba(2,6,23,.32);
  overflow:hidden;
}
.value-card .tag{ font-weight:900; color:#eaf2ff; letter-spacing:.2px; }
.value-card .money{
  margin:.1rem 0 0; font-size:1.8rem; font-weight:1000; letter-spacing:.2px;
}
.value-card .sub{ color:#cfe0ff; margin:-2px 0 6px; }
.value-card .points{ margin:6px 0 0; padding-left:18px; color:#eaf2ff; }
.value-card.featured{ transform: translateY(-2px); }
.value-card .ribbon{
  position:absolute; top:10px; right:-38px; transform: rotate(14deg);
  background:#e11d48; color:#fff; font-weight:1000; padding:.22rem 1.6rem;
  border:1px solid #be185d; box-shadow:0 10px 22px rgba(225,29,72,.28);
}

/* acentos sutiles por color */
.accent-indigo{ outline:1px solid rgba(88,80,236,.35); }
.accent-green { outline:1px solid rgba(22,163,74,.35); }
.accent-amber { outline:1px solid rgba(245,158,11,.35); }
.accent-rose  { outline:1px solid rgba(225,29,72,.35); }

/* Tarjeta de comparación */
.compare-card{
  display:flex; align-items:center; gap:10px; margin:12px 0 8px;
  border:1px solid #2a3b66; border-radius:14px; padding:12px;
  background:
    radial-gradient(520px 200px at -8% -12%, rgba(245,158,11,.18), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
}
.cmp-icon{ font-size:1.2rem }
.cmp-copy{ color:#fff; }

/* lista de razones */
.value-why{
  margin:8px 0 0; padding-left:18px; color:#eaf2ff;
  display:grid; gap:6px;
}

/* COMBOS */
.combos{ margin-top:14px; }
.combo-strip{
  display:grid; grid-auto-flow: column; grid-auto-columns: minmax(280px, 1fr);
  gap:12px; overflow-x:auto; padding-bottom:6px; scrollbar-width:thin;
}
.combo-strip::-webkit-scrollbar{ height:8px; }
.combo-strip::-webkit-scrollbar-thumb{ background:#1f2a44; border-radius:10px; }

.combo-card{
  position:relative; color:var(--text);
  border-radius:var(--rad);
  border:1px solid rgba(255,255,255,.08);
  background:
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)),
    linear-gradient(180deg, #0f172a, #0b1220);
  box-shadow: 0 18px 36px rgba(2,6,23,.32);
  padding:14px;
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.combo-card:hover{ transform: translateY(-2px); box-shadow:0 22px 44px rgba(2,6,23,.38); border-color:#2a3550; }
.badge{
  position:absolute; top:10px; right:10px;
  background:var(--accent); color:#fff; font-weight:1000;
  padding:.18rem .5rem; border-radius:9px;
}
.combo-head .combo-title{ margin:.2rem 0 .1rem; font-size:1.05rem; letter-spacing:.2px; }
.combo-price{ display:flex; align-items:baseline; gap:10px; margin:.2rem 0 .4rem; }
.combo-price .promo{ font-size:1.5rem; font-weight:1000; color:var(--accent); }
.combo-price .list{ color:#cbd5e1; }
.combo-feats{ margin:0 0 .8rem; padding-left:18px; color:#eaf2ff; font-size:.98rem; }
.outline-amber{ outline:1px solid #b4530933; }
.outline-green{ outline:1px solid #15803d33; }
.outline-indigo{ outline:1px solid #4338ca33; }
.outline-rose{ outline:1px solid #be185d33; }

/* BUILDER */
.builder{ margin-top:18px; }

.subjects{ display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
.subject{
  padding:.52rem .78rem; border-radius:999px; border:1px solid #28324a; background:#0f172a; color:#e5e7eb; font-weight:900;
  transition:.15s ease;
}
.subject:hover{ transform: translateY(-1px); box-shadow:0 10px 22px rgba(2,6,23,.28); }
.subject.on{ background:#101a2f; border-color:var(--accent); color:#fff; }

.summary{
  margin-top:12px;
  display:grid; grid-template-columns: 1.2fr .8fr; gap:14px;
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px; padding:16px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)),
    linear-gradient(180deg, #0f172a, #0b1220);
  box-shadow: 0 18px 36px rgba(2,6,23,.32);
}
@media (max-width:860px){ .summary{ grid-template-columns:1fr; } }
.sum-title{ font-weight:1000; }
.hi{ color:var(--accent); font-weight:1000; }
.muted{ color:var(--muted); opacity:.95; }
.tiny{ font-size:.92rem; }
.sum-feats{ margin:.4rem 0 0; padding-left:18px; color:#eaf2ff; }
.sum-price{ text-align:right; }
@media (max-width:860px){ .sum-price{ text-align:left; } }
.numbers{ display:flex; align-items:baseline; gap:10px; margin:.1rem 0 .25rem; }
.numbers .promo{ font-size:1.8rem; font-weight:1000; color:var(--accent); }
.actions{ display:flex; gap:10px; flex-wrap:wrap; margin-top:8px; }

/* HORARIOS */
.schedule{ margin:18px 0 26px; }
.soon{
  display:inline-block; padding:.26rem .6rem; border-radius:999px;
  background:var(--accent); color:#fff; font-weight:1000; letter-spacing:.3px;
}

/* focus */
button:focus-visible, .btn:focus-visible{ outline:2px solid #22d3ee; outline-offset:2px; }
`;