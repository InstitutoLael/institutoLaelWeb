// src/pages/Idiomas.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";
import flags from "../assets/img/lael/flags.png";
import MultiHello from "../components/MultiHello.jsx";

export default function Idiomas() {
  // branding
  const ACCENT = { base: "#5850EC", soft: "rgba(88,80,236,.16)" };
  const CHIP = { base: "#14b8a6", soft: "rgba(20,184,166,.16)" };

  // selección
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const builderRef = useRef(null);

  const selected = useMemo(
    () => LANGUAGES.filter((l) => selectedIds.includes(l.id)),
    [selectedIds]
  );
  const monthly = computeLangBundle(selected.length);

  const setLevel = (langId, level) =>
    setSelectedLevels((prev) => ({ ...prev, [langId]: level }));

  const toggle = (id, comingSoon) => {
    setSelectedIds((prev) => {
      const on = prev.includes(id);
      if (on) {
        const next = prev.filter((x) => x !== id);
        const { [id]: _, ...rest } = selectedLevels;
        setSelectedLevels(rest);
        return next;
      }
      if (comingSoon) return prev;
      return [...prev, id];
    });
  };

  const replaceWith = (ids = [], levels = {}) => {
    setSelectedIds([...ids]);
    setSelectedLevels((prev) => ({ ...prev, ...levels }));
    requestAnimationFrame(() =>
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  // atajos (puedes editar labels o ids según tu data)
  const QUICK = [
    { label: "Inglés B1 (intermedio)", ids: ["ingles"], levels: { ingles: "B1" } },
    { label: "Coreano: TOPIK 1", ids: ["coreano"], levels: { coreano: "A2" } },
    { label: "Portugués A1 (inicial)", ids: ["portugues"], levels: { portugues: "A1" } },
  ].filter((q) => q.ids.every((id) => LANGUAGES.some((l) => l.id === id)));

  // mensaje WA
  const waMsg = encodeURIComponent(
    `Hola 👋, quiero info de Idiomas.\nCursos: ${
      selected.length
        ? selected
            .map((s) => `${s.name}${selectedLevels[s.id] ? " (" + selectedLevels[s.id] + ")" : ""}`)
            .join(", ")
        : "—"
    }\nMensualidad estimada: ${clp(monthly)}\nMatrícula única: ${clp(ENROLLMENT_FEE)}`
  );

  // FAQ por curso (10 preguntas c/u). Si no existe en LANGUAGES, se ignora.
  const FAQS = {
    ingles: [
      ["¿Qué nivel me conviene si entiendo pero me cuesta hablar?",
       "B1 (Funcional) si comprendes ideas principales. Hacemos speaking guiado en todas las clases y retos semanales."],
      ["¿El curso sirve para trabajo/entrevistas?",
       "Sí. Incluye role-plays laborales, corrección de CV en inglés y simulación de entrevistas."],
      ["¿Hay preparación IELTS/TOEFL?",
       "Tenemos ruta opcional de práctica con rúbricas y simulacros. Te guiamos para rendir según tu meta."],
      ["¿Cuántas horas semanales?",
       "2 sesiones en vivo + cápsulas cortas (30–40 min) para consolidar. Todo queda grabado."],
      ["¿Cómo es la evaluación?",
       "Evaluación continua por competencias: speaking, listening, reading y writing con retro clara y accionable."],
      ["¿Puedo pasar de A2 a B1 si avanzo rápido?",
       "Sí. Recalibramos tu plan en los checkpoints mensuales sin costo."],
      ["¿Dan certificado?",
       "Sí. Certificado de aprobación por nivel, con horas y competencias logradas."],
      ["¿Material incluido?",
       "100% incluido: guías descargables, bancos de vocabulario y plataforma con ejercicios autocorregibles."],
      ["¿Clases perdidas?",
       "Se graban el mismo día. Además, te damos un mini-reto para retomar sin quedarte atrás."],
      ["¿Grupos o 1:1?",
       "Grupos pequeños (8–14) para dinamismo + tutorías 1:1 bajo demanda."],
    ],
    coreano: [
      ["¿Enfocado en TOPIK 1?",
       "Sí. Léxico y gramática esenciales, lectura de patrones y práctica de preguntas tipo TOPIK."],
      ["¿Se ve Hangul desde cero?",
       "Sí. Partimos con escritura, lectura y pronunciación correcta desde A1."],
      ["¿Cuánto se tarda en llegar a TOPIK 1?",
       "Depende del punto de partida. Con constancia, 5–7 meses desde A1."],
      ["¿Qué tipo de tareas hay?",
       "Micro-tareas de lectura, dictados, tarjetas de vocabulario y escucha guiada con canciones/diálogos."],
      ["¿Incluye cultura K?",
       "Sí: expresiones reales, honoríficos y contexto cultural para uso natural."],
      ["¿Simulacros TOPIK?",
       "Hacemos simulacros con pauta y retro. Te ayudamos a inscribirte y planificar tu fecha."],
      ["¿Certificado interno?",
       "Certificado por nivel + informe de progreso con fortalezas y focos."],
      ["¿Clases perdidas?",
       "Grabadas el mismo día + resumen de puntos clave."],
      ["¿Grupo máximo?",
       "12 personas por grupo. Mantiene interacción sin perder foco."],
      ["¿Requisitos previos?",
       "Ninguno para A1. Para A2/B1 hacemos diagnóstico corto para ubicarte mejor."],
    ],
    portugues: [
      ["¿Qué variante aprendo?",
       "Base brasileña (PT-BR) con notas de diferencias PT-EU según tu interés."],
      ["¿Enfocado a turismo y trabajo?",
       "Sí. Módulos de conversación práctica, atención de clientes y vocabulario profesional."],
      ["¿Nivel inicial sin bases?",
       "A1 desde cero, con progresión clara y metas por semana."],
      ["¿Clases grabadas?",
       "Sí, el mismo día. Además, cápsulas de pronunciación para repetir."],
      ["¿Cuánto dura cada ruta?",
       "Ciclos de 8 semanas por nivel con checkpoint a mitad de curso."],
      ["¿Material incluido?",
       "Sí. PDFs, audios y sets de Anki listos para estudiar."],
      ["¿Certificado?",
       "Certificado por nivel con horas y resultados."],
      ["¿Cambio de horario?",
       "Intentamos reubicarte si hay cupo; si no, te quedas con la grabación + tutoría corta."],
      ["¿Grupos pequeños?",
       "Sí, 8–14 personas por grupo."],
      ["¿Puedo sumar otro idioma con descuento?",
       "Nuestro bundle ajusta el valor automáticamente al agregar 2+ cursos."],
    ],
    espanol: [
      ["¿Sirve para residencia/trabajo en Chile?",
       "Sí. Enseñamos español práctico para trámites, salud, trabajo y vida diaria en Chile."],
      ["¿Desde cero?",
       "Ruta A1–A2 con mucha práctica oral y vocabulario útil desde la primera semana."],
      ["¿Comunidad haitiana?",
       "Tenemos apoyo adicional para hablantes de criollo haitiano y materiales comparativos ES–HT."],
      ["¿Certificado?",
       "Sí, con horas y competencias alcanzadas por nivel."],
      ["¿Grabaciones y cápsulas?",
       "Todo queda grabado + cápsulas de pronunciación y vocabulario."],
      ["¿Apoyo para entrevistas?",
       "Simulaciones y corrección de respuestas frecuentes en español."],
      ["¿Tutorías?",
       "Sí. Sesiones 1:1 cortas bajo demanda para resolver trabas específicas."],
      ["¿Duración de cada nivel?",
       "8–10 semanas, según ritmo del grupo y progreso."],
      ["¿Niños o solo adultos?",
       "Principalmente jóvenes y adultos. Podemos abrir grupos kids si hay demanda."],
      ["¿Material y costo extra?",
       "Todo el material está incluido en la mensualidad."],
    ],
  };

  // util: obtener faqs del curso si existe
  const faqsFor = (id) => FAQS[id] || [];

  return (
    <section
      className="idiomas"
      style={{ "--accent": ACCENT.base, "--accentSoft": ACCENT.soft, "--chip": CHIP.base, "--chipSoft": CHIP.soft }}
    >
      <style>{css}</style>

      {/* HERO con MultiHello */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="pill">Idiomas</span>
            <h1>
              <MultiHello intervalMs={8000} /> con <span className="under">propósito y excelencia</span>
            </h1>
            <p className="lead">
              Clases en vivo + cápsulas y acompañamiento real. Parte con <b>un curso</b> y suma otro cuando quieras:
              el <b>bundle mejora automático</b>. Matrícula única <b>{clp(ENROLLMENT_FEE)}</b>. Sin letra chica.
            </p>

            <ul className="benefits">
              <li>Elige idioma(s) y nivel <b>A1–B2</b> (o rutas como <b>TOPIK</b>).</li>
              <li>Grabación el mismo día + material descargable.</li>
              <li>Seguimiento simple y tutorías bajo demanda.</li>
            </ul>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>

          <figure className="hero__img" aria-hidden>
            <img src={flags} alt="Personas aprendiendo idiomas en línea" loading="eager" decoding="async" />
            <figcaption>Aprende con un plan claro y un equipo que de verdad acompaña.</figcaption>
          </figure>
        </div>
      </header>

      <div className="container">
        {/* Para quién es (vende sin saturar) */}
        <section className="who">
          <div className="sec-head">
            <h2>¿Para quién es?</h2>
            <p className="muted">Rutas prácticas para metas reales.</p>
          </div>
          <div className="who-grid">
            <Item title="Trabajo & entrevistas">Role-plays, guiones, feedback y vocabulario profesional.</Item>
            <Item title="Universidad & becas">Lectura académica, writing y presentaciones.</Item>
            <Item title="Vida en Chile (ES para extranjeros)">
              Español práctico: salud, trámites, vivienda y empleo. Apoyo especial a comunidad haitiana.
            </Item>
            <Item title="Certificaciones">
              IELTS/TOEFL/TOEIC (inglés) y <b>TOPIK 1</b> (coreano) con simulacros guiados.
            </Item>
          </div>
        </section>

        {/* Lo que obtienes */}
        <section className="value">
          <div className="sec-head">
            <h2>Lo que obtienes</h2>
            <p className="muted">Todo incluido, sin costos ocultos.</p>
          </div>
          <ul className="value-list">
            <li>2 clases en vivo por semana + cápsulas on-demand</li>
            <li>Material descargable y práctica autocorregible</li>
            <li>Grabaciones el mismo día</li>
            <li>Tutorías 1:1 cortas bajo demanda</li>
            <li>Certificado por nivel aprobado</li>
          </ul>
        </section>

        {/* Builder / Selección */}
        <section ref={builderRef} className="builder">
          <header className="sec-head row">
            <h2>Elige tus cursos</h2>
            <small className="muted">Selecciona idioma(s) y tu nivel actual o meta</small>
          </header>

          {QUICK.length > 0 && (
            <div className="quick">
              <span className="quick__title">Empieza rápido</span>
              <div className="chips">
                {QUICK.map((q, i) => (
                  <button key={i} className="chip" onClick={() => replaceWith(q.ids, q.levels)}>{q.label}</button>
                ))}
              </div>
            </div>
          )}

          <div className="grid">
            {LANGUAGES.map((l) => {
              const on = selectedIds.includes(l.id);
              const levels = (l.levels && l.levels.length ? l.levels : ["A1","A2","B1","B2"]).slice(0,4);
              const lvl = selectedLevels[l.id] || "";

              return (
                <article key={l.id} className={"lang " + (on ? "on" : "")}>
                  <header className="head">
                    <span className="flag" aria-hidden>{l.emoji}</span>
                    <h3>{l.name}</h3>
                    {l.comingSoon && <span className="soon">PRÓXIMAMENTE</span>}
                  </header>

                  <p className="muted tiny">{l.summary}</p>

                  <div className="levels" role="group" aria-label={`Niveles para ${l.name}`}>
                    {levels.map((lv) => {
                      const active = lvl === lv;
                      return (
                        <button
                          key={lv}
                          type="button"
                          className={"lv " + (active ? "on" : "")}
                          aria-pressed={active}
                          onClick={() => {
                            if (!on && !l.comingSoon) setSelectedIds((p) => [...p, l.id]);
                            if (!l.comingSoon || on) setLevel(l.id, lv);
                          }}
                        >
                          {lv}
                        </button>
                      );
                    })}
                    {!!lvl && (
                      <button className="lv ghost" onClick={() => setLevel(l.id, "")}>Limpiar</button>
                    )}
                  </div>

                  <div className="act">
                    <button
                      className={"choose " + (on ? "on" : "")}
                      disabled={l.comingSoon && !on}
                      onClick={() => toggle(l.id, l.comingSoon)}
                    >
                      {l.comingSoon && !on ? "Pronto" : on ? "Quitar del plan" : "Agregar al plan"}
                    </button>
                  </div>

                  {/* FAQ por curso (compacto) */}
                  {faqsFor(l.id).length > 0 && (
                    <details className="faq-mini">
                      <summary>Preguntas frecuentes de {l.name}</summary>
                      <ul>
                        {faqsFor(l.id).map(([q, a], idx) => (
                          <li key={idx}>
                            <b>{q}</b>
                            <p>{a}</p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </article>
              );
            })}
          </div>

          {/* Resumen/checkout */}
          <div className="summary" aria-live="polite">
            <div className="sum-left">
              <div className="sum-title">
                Selección: <span className="hi">{selected.length}</span> curso(s)
                {!!selected.length && (
                  <span className="muted">
                    {" · "}
                    {selected
                      .map((s) => `${s.name}${selectedLevels[s.id] ? " (" + selectedLevels[s.id] + ")" : ""}`)
                      .join(", ")}
                  </span>
                )}
              </div>
              <div className="tiny muted">2 cursos → mejor precio · 3+ → aún mejor</div>
            </div>
            <div className="sum-right">
              <div className="tiny muted">Mensualidad estimada</div>
              <div className="price">{clp(monthly)}</div>
              <div className="tiny muted">+ matrícula {clp(ENROLLMENT_FEE)}</div>
              <div className="actions">
                <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
                <a className="btn btn-outline" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* Metodología & certificación */}
        <section className="method">
          <div className="sec-head">
            <h2>Metodología y certificación</h2>
          </div>
          <ol className="steps">
            <li><b>Diagnóstico corto</b> para ubicarte en A1–B2 o ruta específica.</li>
            <li><b>Plan semanal</b> con objetivos medibles y cápsulas enfocadas.</li>
            <li><b>Feedback accionable</b> y checkpoints mensuales para ajustar.</li>
            <li><b>Certificado</b> por nivel aprobado; simulacros si vas a prueba externa.</li>
          </ol>
        </section>

        {/* CTA final */}
        <section className="final-cta">
          <div className="band">
            <h3>¿Listo para empezar?</h3>
            <div className="band-actions">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ————— Subcomponentes cortos ————— */
function Item({ title, children }) {
  return (
    <article className="item">
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

/* ————— Estilos ————— */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --text:#fff; --muted:#eaf2ff; --rad:18px;
}
*{box-sizing:border-box}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  padding:34px 0 20px; color:var(--text); border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, var(--accentSoft), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:26px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; font-weight:900; color:#fff; }
h1{ margin:.45rem 0 .35rem; font-size:clamp(1.8rem,3.2vw + .6rem,2.6rem); letter-spacing:.2px; line-height:1.15; }
.under{ box-shadow: inset 0 -10px rgba(88,80,236,.25); border-radius:4px; }
.lead{ color:var(--muted); max-width:64ch; }
.benefits{ margin:.6rem 0 0; padding-left:18px; color:var(--muted); }
.benefits li{ margin:.12rem 0; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:12px 0 0; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.68rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
  transition:.18s transform ease, .18s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-outline, .btn-ghost{ background:transparent; color:#eaf2ff; }

.hero__img{
  border-radius:20px; overflow:hidden; border:1px solid var(--bd);
  background:#0f172a; box-shadow:0 0 0 12px rgba(255,255,255,.06) inset, 0 24px 56px rgba(2,6,23,.36);
}
.hero__img img{ display:block; width:100%; height:auto; object-fit:cover; }
.hero__img figcaption{ padding:8px 10px; font-size:.9rem; color:#eaf2ff; background:#0e162a; border-top:1px solid #1f2a44; }

/* Section head */
.sec-head{ margin:18px 0 12px; color:var(--text); }
.sec-head h2{ margin:0 0 4px; font-size:1.3rem; }
.sec-head p{ margin:0; color:var(--muted); }
.sec-head.row{ display:flex; align-items:center; gap:10px; }

/* WHO */
.who-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
@media (max-width:980px){ .who-grid{ grid-template-columns:1fr; } }
.item{ border:1px solid rgba(255,255,255,.08); border-radius:var(--rad); padding:14px; background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 18px 36px rgba(2,6,23,.32); }
.item h3{ margin:.2rem 0 .2rem; font-size:1.05rem; }

/* VALUE */
.value{ margin-top:8px; }
.value-list{ display:grid; grid-template-columns:repeat(5,1fr); gap:10px; padding:0; list-style:none; }
@media (max-width:980px){ .value-list{ grid-template-columns:1fr; } }
.value-list li{ border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:12px; background:linear-gradient(180deg,#0f172a,#0b1220); }

/* BUILDER */
.builder{ margin-top:16px; }
.quick{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin:10px 0; }
.quick__title{ font-weight:1000; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{ border:1px solid #2a3550; background:#0f172a; color:#fff; border-radius:999px; padding:.46rem .74rem; font-weight:900; }

.grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:12px; }
@media (max-width:980px){ .grid{ grid-template-columns:1fr; } }

.lang{
  border-radius:var(--rad);
  border:1px solid rgba(255,255,255,.08);
  background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)), linear-gradient(180deg, #0f172a, #0b1220);
  color:var(--text); padding:14px;
  box-shadow:0 18px 36px rgba(2,6,23,.32);
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.lang:hover{ transform: translateY(-2px); box-shadow:0 22px 44px rgba(2,6,23,.38); border-color:#2a3550; }
.lang.on{ outline:1px solid #4338ca33; }

.head{ display:flex; align-items:center; gap:10px; margin-bottom:6px; }
.flag{ font-size:22px; line-height:1; }
.head h3{ margin:0; font-size:1.05rem; }
.soon{ margin-left:auto; font-size:.75rem; padding:.12rem .45rem; border:1px solid #334155; border-radius:8px; color:#cbd5e1; }

.muted{ color:var(--muted); }
.tiny{ font-size:.9rem; }

/* niveles */
.levels{ display:flex; gap:8px; flex-wrap:wrap; margin:8px 0 0; }
.lv{ border:1px solid #2a3550; background: var(--chipSoft); color:#eaf2ff; border-radius:999px; padding:.3rem .6rem; font-weight:900; }
.lv.on{ background: var(--chip); color:#052e2b; border-color:#0f7467; }
.lv.ghost{ background:#0f172a; border-color:#2a3550; color:#cbd5e1; font-weight:800; }

/* acciones */
.act{ margin-top:10px; }
.choose{ border-radius:10px; padding:.5rem .8rem; border:1px solid #28324a; background:#0f172a; color:#e5e7eb; font-weight:900; transition:.15s ease; }
.choose.on{ background:#101a2f; border-color:var(--accent); color:#fff; }
.choose:disabled{ opacity:.7; cursor:not-allowed; }

/* mini FAQ dentro de cada tarjeta */
.faq-mini{ margin-top:10px; }
.faq-mini summary{ cursor:pointer; font-weight:900; }
.faq-mini ul{ margin:8px 0 0; padding-left:18px; }
.faq-mini li + li{ margin-top:6px; }

/* Summary */
.summary{
  margin-top:12px; display:grid; grid-template-columns: 1.2fr .8fr; gap:14px;
  border:1px solid rgba(255,255,255,.08); border-radius:20px; padding:16px;
  background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)), linear-gradient(180deg, #0f172a, #0b1220);
  box-shadow: 0 18px 36px rgba(2,6,23,.32);
}
@media (max-width:860px){ .summary{ grid-template-columns:1fr; } }
.sum-title{ font-weight:1000; }
.hi{ color:var(--accent); font-weight:1000; }
.sum-right{ text-align:right; }
@media (max-width:860px){ .sum-right{ text-align:left; } }
.price{ font-size:1.7rem; font-weight:1000; margin:.1rem 0 .2rem; }
.actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* Método */
.method{ margin:18px 0 6px; }
.steps{ margin:0; padding-left:18px; color:#eaf2ff; display:grid; gap:6px; }

/* CTA final */
.final-cta{ padding:12px 0 26px; }
.band{
  border:1px solid var(--bd); border-radius:18px; padding:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220); display:flex; align-items:center; justify-content:space-between; gap:12px; color:#fff;
}
.band h3{ margin:0; }
.band-actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* Focus */
button:focus-visible, .btn:focus-visible{ outline:2px solid #22d3ee; outline-offset:2px; }
`;