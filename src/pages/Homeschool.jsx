// src/pages/Homeschool.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import {
  ENROLLMENT_FEE,
  PACKS,
  SUBJECTS,
  MODES,
  MONTH_CHOICES,
  HOURS_CHOICES,
  ESSAY_ADDONS,
  estimateMonthly,
  getUpliftRate,
  clp,
  estimateSchoolEssaysTotal,
} from "../data/homeschool.js";
import { Link } from "react-router-dom";

// Assets
import heroHS from "../assets/img/lael/hs.jpg";
import logoWhite from "../assets/img/Logos/lael-inst-blanco.png";

/* ───────── Util: Carrusel horizontal ───────── */
function HScroll({ children, ariaLabel }) {
  const ref = useRef(null);
  const slide = (dir) => {
    const el = ref.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };
  return (
    <div className="hs-wrap">
      <button className="hs-btn prev" aria-label="Anterior" onClick={() => slide("prev")}>‹</button>
      <div className="hs" ref={ref} aria-label={ariaLabel}>{children}</div>
      <button className="hs-btn next" aria-label="Siguiente" onClick={() => slide("next")}>›</button>
    </div>
  );
}

/* ───────── Util: Contador animado ───────── */
function Counter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.max(15, Math.floor(duration / Math.max(1, target)));
    const timer = setInterval(() => {
      current += 1;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, step);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}{suffix}</span>;
}

/* ───────── Página ───────── */
export default function Homeschool() {
  /* Familias (config) */
  const [mode, setMode] = useState("oneToOne");
  const [hoursPerWeek, setHoursPerWeek] = useState(2);
  const [months, setMonths] = useState(3);
  const [subjectIds, setSubjectIds] = useState(["leng", "mat"]);
  const [essayAddonId, setEssayAddonId] = useState("");

  /* Instituciones (ensayos) */
  const [sStudents, setSStudents] = useState(50);
  const [sExams, setSExams] = useState(1);
  const [sGrading, setSGrading] = useState(true);
  const [sPrinted, setSPrinted] = useState(false);

  /* Cálculos familia */
  const subjectsCount = subjectIds.length;
  const monthly = useMemo(
    () => estimateMonthly({ mode, hoursPerWeek, subjectsCount }),
    [mode, hoursPerWeek, subjectsCount]
  );
  const uplift = getUpliftRate(subjectsCount);
  const addonPrice = useMemo(
    () => ESSAY_ADDONS.find((x) => x.id === essayAddonId)?.price || 0,
    [essayAddonId]
  );
  const totalPeriod = monthly * months + addonPrice + ENROLLMENT_FEE;

  const toggleSubj = (id) =>
    setSubjectIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  /* WhatsApp – familias */
  const wappMsgFamily = encodeURIComponent(
    `Hola 👋, quiero apoyo educativo.
Busco ensayos y/o clases con profes Lael.
Modalidad: ${mode === "oneToOne" ? "1:1" : "Micro-grupo"}
Horas/sem: ${hoursPerWeek}
Meses: ${months}
Materias: ${subjectIds.map((s) => SUBJECTS.find((x) => x.id === s)?.name).join(", ") || "—"}
${essayAddonId ? `Add-on: ${ESSAY_ADDONS.find((a) => a.id === essayAddonId)?.label}\n` : ""}
Mensual aprox: ${clp(monthly)} | Matrícula: ${clp(ENROLLMENT_FEE)}`
  );

  /* Cálculos instituciones */
  const school = estimateSchoolEssaysTotal({
    students: sStudents,
    examsPerStudent: sExams,
    withGrading: sGrading,
    printed: sPrinted,
  });

  /* WhatsApp – instituciones */
  const wappMsgSchool = encodeURIComponent(
    `Hola 👋, quiero cotizar ENSAYOS para colegio.
Estudiantes: ${sStudents}
Ensayos por estudiante: ${sExams}
Corrección+reporte: ${sGrading ? "Sí" : "No"}
Impreso por Lael: ${sPrinted ? "Sí" : "No"}
Total estimado: ${clp(school.total)}`
  );

  /* WhatsApp – alianza Los Olivos */
  const wappMsgOlivos = encodeURIComponent(
    `Hola 👋, vengo por la alianza con "Los Olivos".
Necesito orientación para clases/ensayos y presupuesto.`
  );

  return (
    <section className="apoyo">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <img className="brand" src={logoWhite} alt="Instituto Lael" />
            <h1>Apoyo Lael para <span className="under">colegios y familias</span></h1>
            <p className="lead">
              Clases en vivo + cápsulas. Ensayos con corrección y reportes. Acompañamiento real de nuestros profes.
              <br />Matrícula única: <b>{clp(ENROLLMENT_FEE)}</b>.
            </p>

            <div className="service-chips">
              <span className="chip solid blue">🎓 Clases con profes Lael</span>
              <span className="chip solid amber">📈 Ensayos y reportes</span>
              <span className="chip solid green">🏫 Acompañamiento a colegios</span>
            </div>

            <div className="cta">
              <Link to="/inscripcion" className="btn btn-primary">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${wappMsgFamily}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          <figure className="hero__img">
            <img src={heroHS} alt="" />
            <figcaption>Metas pequeñas, progreso real, profes que acompañan.</figcaption>
          </figure>
        </div>
      </header>

      <div className="container">

        {/* Alianza Los Olivos */}
        <section className="block">
          <div className="card partner">
            <div className="partner-left">
              <div className="pill">Alianza educativa</div>
              <h2>“Los Olivos” × Lael</h2>
              <p className="muted">
                Colaboramos en enseñanza media, reforzamiento, <b>ensayos PAES</b> y apoyo para exámenes libres.
                Rutas personalizadas y docentes Lael a cargo.
              </p>
            </div>
            <div className="partner-right">
              <a className="btn btn-primary" href={`https://wa.me/56964626568?text=${wappMsgOlivos}`} target="_blank" rel="noreferrer">
                Hablar por la alianza
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">Quiero contacto</Link>
            </div>
          </div>
        </section>

        {/* Packs listos */}
        <section className="block">
          <header className="sec-head">
            <h2>Puntos de partida</h2>
            <p className="muted">Elige un pack de ejemplo y luego ajusta horas, meses y materias.</p>
          </header>

          <HScroll ariaLabel="Packs listos">
            {PACKS.map((p) => {
              const modeLabel = p.mode === "microGroup" ? "Micro-grupo" : "1:1";
              const fakeMonthly = estimateMonthly({
                mode: p.mode,
                hoursPerWeek: p.hoursPerWeek,
                subjectsCount: 2,
              });
              return (
                <article className="card pack slide" key={p.id}>
                  {p.badge && <div className="badge">{p.badge}</div>}
                  <h3 className="ink">{p.title}</h3>
                  <div className="mini muted">{modeLabel} · {p.hoursPerWeek} h/sem · {p.months} mes(es)</div>
                  <div className="price">{clp(fakeMonthly)} <span>/mes</span></div>
                  <ul className="list">
                    <li>Clases en vivo + cápsulas</li>
                    <li>Plan semanal y seguimiento</li>
                    <li>Soporte por mensajes</li>
                  </ul>
                  <button
                    className="btn btn-primary w100"
                    onClick={() => { setMode(p.mode); setHoursPerWeek(p.hoursPerWeek); setMonths(p.months); }}
                  >
                    Usar este pack
                  </button>
                </article>
              );
            })}
          </HScroll>
        </section>

        {/* Configurador */}
        <section className="block">
          <header className="sec-head">
            <h2>Arma tu plan</h2>
            <p className="muted">4 pasos simples. Precio en tiempo real.</p>
          </header>

          <div className="grid grid-2">
            {/* Paso 1 */}
            <article className="card">
              <div className="step-title">1) Modalidad</div>
              <div className="chips">
                {MODES.map((m) => (
                  <button key={m.id} type="button" className={"chip outline " + (mode === m.id ? "on" : "")} onClick={() => setMode(m.id)}>
                    {m.label} {m.id === "oneToOne" ? "👩‍🏫" : "🧑‍🤝‍🧑"}
                  </button>
                ))}
              </div>
              <p className="tiny muted mt6">1:1 = foco total. Micro-grupo = 3 a 6 estudiantes (accesible y motivante).</p>
            </article>

            {/* Paso 2 */}
            <article className="card">
              <div className="step-title">2) Horas por semana</div>
              <div className="chips">
                {HOURS_CHOICES.map((h) => (
                  <button key={h.v} type="button" className={"chip outline " + (hoursPerWeek === h.v ? "on" : "")} onClick={() => setHoursPerWeek(h.v)}>
                    {h.label} ⏱️
                  </button>
                ))}
              </div>
            </article>

            {/* Paso 3 */}
            <article className="card">
              <div className="step-title">3) Duración</div>
              <div className="chips">
                {MONTH_CHOICES.map((m) => (
                  <button key={m.v} type="button" className={"chip outline " + (months === m.v ? "on" : "")} onClick={() => setMonths(m.v)}>
                    {m.label} 📅
                  </button>
                ))}
              </div>
            </article>

            {/* Paso 4 */}
            <article className="card">
              <div className="step-title">4) Materias</div>
              <div className="chips">
                {SUBJECTS.map((s) => {
                  const on = subjectIds.includes(s.id);
                  return (
                    <button key={s.id} type="button" className={"chip outline " + (on ? "on" : "")} onClick={() => toggleSubj(s.id)}>
                      {s.name}
                    </button>
                  );
                })}
              </div>
              <p className="tiny muted mt6">
                Cobramos por <b>horas/semana</b>. Si son muchas materias, sumamos planificación (+<b>{Math.round(uplift * 100)}%</b>).
              </p>
            </article>
          </div>

          {/* Ensayos opcionales */}
          <article className="card mt12">
            <div className="step-title">Ensayos (opcional)</div>
            <div className="chips">
              <button type="button" className={"chip outline " + (!essayAddonId ? "on" : "")} onClick={() => setEssayAddonId("")}>Sin ensayos</button>
              {ESSAY_ADDONS.map((a) => (
                <button key={a.id} type="button" className={"chip outline " + (essayAddonId === a.id ? "on" : "")} onClick={() => setEssayAddonId(a.id)}>
                  {a.label} — {clp(a.price)}
                </button>
              ))}
            </div>
          </article>

          {/* Resumen */}
          <div className="sum card">
            <div className="sum-left">
              <div className="k">Mensual estimado</div>
              <div className="big ok">{clp(monthly)}</div>
              <div className="mini muted">
                Matrícula: {clp(ENROLLMENT_FEE)}{essayAddonId ? ` · Ensayos: ${clp(addonPrice)}` : ""}
              </div>
            </div>
            <div className="sum-right">
              <div className="k">Total período ({months} mes/es)</div>
              <div className="big">{clp(totalPeriod)}</div>
              <div className="cta-inline">
                <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
                <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${wappMsgFamily}`} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* Ensayos para colegios */}
        <section className="block inst">
          <header className="sec-head">
            <h2>Ensayos para colegios</h2>
            <p className="muted">Licencia single-site. PDF con ID de licencia y marca de agua. Impresión opcional por Lael.</p>
          </header>

          <div className="grid grid-3">
            <article className="card ink">
              <div className="label">Estudiantes</div>
              <input type="number" min="1" className="field" value={sStudents} onChange={(e) => setSStudents(Number(e.target.value) || 1)} />
              <div className="tiny muted mt6">Descuentos por volumen.</div>
            </article>
            <article className="card ink">
              <div className="label">Ensayos por estudiante</div>
              <input type="number" min="1" className="field" value={sExams} onChange={(e) => setSExams(Number(e.target.value) || 1)} />
            </article>
            <article className="card ink">
              <div className="label">Opciones</div>
              <div className="opt-grid">
                <label className="check">
                  <input type="checkbox" checked={sGrading} onChange={(e) => setSGrading(e.target.checked)} />
                  <span>Corrección + reporte (+$2.000/est/ens)</span>
                </label>
                <label className="check">
                  <input type="checkbox" checked={sPrinted} onChange={(e) => setSPrinted(e.target.checked)} />
                  <span>Impreso por Lael (+$1.000/est/ens)</span>
                </label>
              </div>
              <div className="tiny muted mt6">Si no imprimimos, entregamos <b>PDF</b> con <b>marca de agua</b> e <b>ID</b>.</div>
            </article>
          </div>

          <div className="sum card ink">
            <div><div className="k">Valor base por est/ens</div><div className="big">{clp(school.unit)}</div></div>
            <div><div className="k">Add-ons por est/ens</div><div className="big">{clp(school.addons)}</div></div>
            <div><div className="k">Total estimado</div><div className="big ok">{clp(school.total)}</div></div>
            <div className="cta-inline">
              <a className="btn btn-primary" href={`https://wa.me/56964626568?text=${wappMsgSchool}`} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
              <Link className="btn btn-ghost" to="/inscripcion">Solicitar convenio</Link>
            </div>
          </div>
        </section>

        {/* Resultados 2025 (contadores) */}
        <section className="block">
          <header className="sec-head">
            <h2>Resultados 2025</h2>
            <p className="muted">Datos reales de nuestro trabajo este año.</p>
          </header>

          <div className="stats">
            <div className="stat blue">
              <div className="n"><Counter target={27} suffix="" /></div>
              <div className="t">Estudiantes reforzados</div>
            </div>
            <div className="stat amber">
              <div className="n"><Counter target={3} suffix="" /></div>
              <div className="t">Homeschool aliados</div>
            </div>
            <div className="stat green">
              <div className="n"><Counter target={7} suffix="" /></div>
              <div className="t">Escuelas en convenio</div>
            </div>
            <div className="stat rose">
              <div className="n"><Counter target={5} suffix="" /></div>
              <div className="t">Ensayos aplicados</div>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}

/* ================= CSS (paleta sólida, sin grises lavados) ================= */
const css = `
:root{
  /* Paleta Lael (sólida, sin grises) */
  --lael-blue:#3B57D0;   /* primario */
  --lael-blue-2:#273A9A; /* deep */
  --lael-green:#16A34A;  /* ok/éxito */
  --lael-yellow:#F2CE3D; /* énfasis */
  --lael-rose:#E0A9D2;   /* suave */
  --lael-cyan:#22D3EE;   /* focus */

  --bg:#0A1230;          /* azul noche */
  --panel:#0C1740;       /* panel oscuro (azul) */
  --bd:#2C3F93;          /* borde azul */
  --ink:#FFFFFF;         /* texto principal */
  --ink-muted:#DCE6FF;   /* texto secundario (claro, sin opacidad) */

  --rad:16px;
  --shadow:0 16px 32px rgba(14,24,64,.35);
}

*{box-sizing:border-box}
.container{max-width:1120px;margin:0 auto;padding:0 18px;color:var(--ink)}
.mt6{margin-top:6px}.mt12{margin-top:12px}.w100{width:100%}
.muted{color:var(--ink-muted)} /* sin opacity */

/* HERO (fondo con colores, sin transparencias grises) */
.hero{
  padding:24px 0 16px; border-bottom:2px solid var(--bd);
  background: linear-gradient(180deg,#0B1442 0%, #0A1230 100%);
}
.hero__grid{display:grid;grid-template-columns:1.1fr .9fr;gap:20px;align-items:center}
@media (max-width:980px){.hero__grid{grid-template-columns:1fr}}
.brand{width:88px;height:auto;display:block;margin-bottom:8px;filter:drop-shadow(0 6px 16px rgba(224,169,210,.3))}
.hero h1{margin:.2rem 0 .35rem;font-size:clamp(1.7rem,3vw + .6rem,2.3rem);line-height:1.12}
.under{box-shadow:inset 0 -12px rgba(59,87,208,.4);border-radius:4px}
.lead{max-width:64ch;color:var(--ink-muted)}
.bullets{margin:.5rem 0 0;padding-left:18px;color:var(--ink-muted)}
.bullets li{margin:.14rem 0}

/* Botones */
.cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.btn{
  display:inline-flex;align-items:center;gap:8px;padding:.64rem 1rem;border-radius:12px;
  border:2px solid var(--lael-blue-2);text-decoration:none;font-weight:1000;transition:.18s transform ease,.18s box-shadow ease
}
.btn:hover{transform:translateY(-1px);box-shadow:0 16px 32px rgba(14,24,64,.35)}
.btn-primary{background:var(--lael-blue);color:#fff;border-color:var(--lael-blue)}
.btn-ghost{background:#11226B;color:#EAF2FF;border-color:#1E2F80}

/* Imagen */
.hero__img{border-radius:18px;overflow:hidden;border:2px solid var(--bd);background:#0F1C57;box-shadow:0 22px 46px rgba(14,24,64,.4)}
.hero__img img{display:block;width:100%;height:auto;object-fit:cover}
.hero__img figcaption{padding:8px 10px;font-size:.92rem;color:var(--ink-muted);background:#0D1A53;border-top:1px solid #2134A0}

/* Secciones */
.block{margin:20px 0}
.sec-head h2{margin:0}
.sec-head p{margin:2px 0 0}

/* Cards / chips (colores sólidos) */
.card{
  border:2px solid var(--bd);border-radius:var(--rad);
  background:linear-gradient(180deg,#0F1C57 0%, #0C1740 100%);color:var(--ink);
  padding:14px;box-shadow:var(--shadow)
}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{
  padding:.5rem .8rem;border-radius:999px;border:2px solid var(--lael-blue-2);
  background:#172983;color:#F4F7FF;font-weight:900;letter-spacing:.2px
}
.chip.on{background:#2340CC;border-color:#2340CC;box-shadow:0 0 0 2px #4A63F0 inset}

/* Carrusel Packs */
.hs-wrap{position:relative}
.hs{display:flex;gap:12px;overflow:auto;scroll-snap-type:x mandatory;padding:2px 2px 12px}
.slide{scroll-snap-align:start;min-width:244px}
.hs-btn{
  position:absolute;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:999px;
  border:2px solid var(--lael-blue-2);background:#13226B;color:#fff;display:grid;place-items:center;z-index:2;cursor:pointer
}
.hs-btn.prev{left:-6px}.hs-btn.next{right:-6px}
.hs-mask{pointer-events:none;position:absolute;inset:0;box-shadow:inset 60px 0 36px -36px #0A1230, inset -60px 0 36px -36px #0A1230}
.pack .tag{display:inline-block;font-weight:900;padding:.16rem .48rem;border-radius:8px;background:var(--lael-yellow);color:#1A1400;margin-bottom:6px}
.pack h3{margin:.08rem 0 0;font-size:1.06rem}
.pack .price{font-weight:1000;font-size:1.42rem;margin:.28rem 0 .36rem;color:var(--lael-yellow)}
.pack .price span{font-size:.96rem;color:#FFF7D1}
.pack .list{margin:.08rem 0 .5rem;padding-left:18px}

/* Partner */
.partner{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center}
.partner .pill{display:inline-block;padding:.2rem .6rem;border-radius:999px;border:2px solid var(--lael-blue-2);font-weight:900;background:#172983;color:#fff}
.partner-right{display:flex;gap:10px;flex-wrap:wrap}

/* Paso títulos */
.step-title{font-weight:1000;margin-bottom:8px;letter-spacing:.2px;color:#EEF3FF}

/* Resumen (familias) */
.sum{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end;margin-top:12px}
.sum .k{font-weight:900;color:#CFE1FF}
.sum .big{font-weight:1000;font-size:1.6rem}
.sum .ok{color:var(--lael-green)}
.sum .mini{font-size:.95rem;color:#DBE6FF}
.sum .cta-inline{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}

/* Inputs (instituciones) */
.field{
  width:100%;border:2px solid var(--lael-blue-2);border-radius:12px;padding:.6rem .8rem;background:#13226B;color:#EAF2FF
}
.opt-grid{display:grid;grid-template-columns:1fr;gap:10px}
.check{display:flex;align-items:center;gap:8px;color:#EAF2FF}
.check input{transform:scale(1.15)}

/* Grids */
.grid{display:grid;gap:12px}
.grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
.grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:980px){.grid-2,.grid-3{grid-template-columns:1fr}}

/* Focus */
button:focus-visible,.btn:focus-visible,input:focus-visible{
  outline:3px solid var(--lael-cyan);outline-offset:2px
}
`;