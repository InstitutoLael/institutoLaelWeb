// src/pages/Idiomas.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";

// Imagen en la misma carpeta que PAES
import flags from "../assets/img/lael/flags.png";

export default function Idiomas() {
  // Paleta sobria y consistente con el resto del sitio
  const ACCENT = { base: "#5850EC", soft: "rgba(88,80,236,.16)" }; // índigo (marca académica / confianza)
  const CHIP   = { base: "#14b8a6", soft: "rgba(20,184,166,.16)" }; // turquesa sutil (niveles)

  // Estado
  const [selectedIds, setSelectedIds] = useState([]);
  // id -> "A1" | "A2" | "B1" | "B2" | etc.
  const [selectedLevels, setSelectedLevels] = useState({});
  const builderRef = useRef(null);

  const selected = useMemo(
    () => LANGUAGES.filter((l) => selectedIds.includes(l.id)),
    [selectedIds]
  );
  const monthly = computeLangBundle(selected.length);

  // Toggle que permite quitar aunque el curso esté "comingSoon" (si ya estaba dentro)
  const toggle = (id, comingSoon) => {
    setSelectedIds((prev) => {
      const active = prev.includes(id);
      if (active) {
        // Permitir quitar SIEMPRE y limpiar nivel asociado
        const next = prev.filter((x) => x !== id);
        const { [id]: _, ...rest } = selectedLevels;
        setSelectedLevels(rest);
        return next;
      } else {
        // Solo agregar si NO es "comingSoon"
        if (comingSoon) return prev;
        return [...prev, id];
      }
    });
  };

  const replaceWith = (ids = []) => {
    setSelectedIds([...ids]);
    // Resetea niveles de los que ya no están
    setSelectedLevels((prev) => {
      const next = {};
      ids.forEach((id) => { if (prev[id]) next[id] = prev[id]; });
      return next;
    });
    requestAnimationFrame(() =>
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const setLevel = (langId, level) =>
    setSelectedLevels((prev) => ({ ...prev, [langId]: level }));

  const waMsg = encodeURIComponent(
`Hola 👋, quiero info de Idiomas.
Cursos: ${
  selected.length
    ? selected
        .map((s) => `${s.name}${selectedLevels[s.id] ? " (" + selectedLevels[s.id] + ")" : ""}`)
        .join(", ")
    : "—"
}
Mensualidad estimada: ${clp(monthly)}
Matrícula única: ${clp(ENROLLMENT_FEE)}`
  );

  // Atajos curados (se omiten si el id no existe en data)
  const QUICK = [
    { id: "q-ingles-b1", label: "Inglés B1 (intermedio)", ids: ["ingles"], levels: { ingles: "B1" } },
    { id: "q-coreano-topik1", label: "Coreano · TOPIK 1", ids: ["coreano"], levels: { coreano: "A2" } },
    { id: "q-portugues-inicial", label: "Portugués A1 (inicial)", ids: ["portugues"], levels: { portugues: "A1" } },
  ].filter((q) => q.ids.every((id) => LANGUAGES.some((l) => l.id === id)));

  const applyQuick = (q) => {
    replaceWith(q.ids);
    setSelectedLevels((prev) => ({ ...prev, ...(q.levels || {}) }));
  };

  return (
    <section
      className="idiomas"
      style={{ "--accent": ACCENT.base, "--accentSoft": ACCENT.soft, "--chip": CHIP.base, "--chipSoft": CHIP.soft }}
    >
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="pill">Idiomas</span>
            <h1>
              Aprende <span className="under">en serio</span>. Elige tu idioma y tu nivel.
            </h1>
            <p className="lead">
              Clases en vivo + cápsulas, material descargable y seguimiento cercano.
              Parte con <b>un curso</b> y suma otro cuando quieras: el precio del <b>bundle mejora automáticamente</b>.
              Matrícula única: <strong>{clp(ENROLLMENT_FEE)}</strong>.
            </p>
            <ul className="points" aria-label="Beneficios clave">
              <li>Selecciona idioma(s) y nivel (A1–B2 o preparación específica)</li>
              <li>Todas las clases quedan grabadas el mismo día</li>
              <li>Plan de estudio claro, con metas y acompañamiento real</li>
            </ul>
            <div className="cta">
              <Link to="/inscripcion" className="btn btn-primary" aria-label="Ir a inscripción de Idiomas">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/56964626568?text=${waMsg}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Abrir WhatsApp para resolver dudas de Idiomas"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <figure className="hero__img" aria-hidden>
            <img
              src={flags}
              alt="Personas aprendiendo idiomas en línea — elige idioma y nivel (A1–B2)"
              loading="eager"
              decoding="async"
            />
            <figcaption>Elige tus cursos, marca tu nivel y te guiamos con un plan simple.</figcaption>
          </figure>
        </div>
      </header>

      <div className="container">
        {/* ATAJOS */}
        {QUICK.length > 0 && (
          <section className="quick" aria-label="Atajos de selección">
            <div className="quick__title">Atajos</div>
            <div className="chips">
              {QUICK.map((q) => (
                <button key={q.id} type="button" className="chip" onClick={() => applyQuick(q)} aria-label={`Aplicar atajo: ${q.label}`}>
                  {q.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* BUILDER */}
        <section ref={builderRef} className="builder">
          <header className="sec-head row">
            <h2>Elige tus cursos</h2>
            <small className="muted">Selecciona idioma(s) y tu nivel actual o meta</small>
          </header>

          <div className="grid">
            {LANGUAGES.map((l) => {
              const active = selectedIds.includes(l.id);
              // niveles disponibles para el curso (si el data trae levels, se usan; si no, A1–B2 por defecto)
              const levels = (l.levels && l.levels.length ? l.levels : ["A1", "A2", "B1", "B2"]).slice(0, 4);
              const lvl = selectedLevels[l.id] || "";

              return (
                <article key={l.id} className={"lang " + (active ? "on" : "")}>
                  <header className="head">
                    <span className="flag" aria-hidden>{l.emoji}</span>
                    <h3>{l.name}</h3>
                    {l.comingSoon && <span className="soon" title="Próximamente">PRÓXIMAMENTE</span>}
                  </header>

                  <p className="muted tiny">{l.summary}</p>

                  {/* Selector de nivel: chips exclusivas (radio-ghost) */}
                  <div className="levels" role="group" aria-label={`Niveles disponibles para ${l.name}`}>
                    {levels.map((lv) => {
                      const on = lvl === lv;
                      return (
                        <button
                          key={lv}
                          type="button"
                          className={"lv " + (on ? "on" : "")}
                          aria-pressed={on}
                          onClick={() => {
                            // Para marcar nivel, primero asegúrate que el curso esté en el plan
                            if (!active && !l.comingSoon) setSelectedIds((p) => [...p, l.id]);
                            if (!l.comingSoon || active) setLevel(l.id, lv);
                          }}
                          aria-label={on ? `Nivel ${lv} seleccionado` : `Seleccionar nivel ${lv}`}
                        >
                          {lv}
                        </button>
                      );
                    })}
                    {/* opción limpiar nivel si lo desea */}
                    {lvl && (
                      <button
                        type="button"
                        className="lv ghost"
                        onClick={() => setLevel(l.id, "")}
                        title="Borrar nivel"
                        aria-label="Borrar nivel seleccionado"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <div className="act">
                    <button
                      type="button"
                      className={"choose " + (active ? "on" : "")}
                      // deshabilita sólo para AGREGAR cuando es comingSoon; permitir quitar si ya está
                      disabled={l.comingSoon && !active}
                      onClick={() => toggle(l.id, l.comingSoon)}
                      title={
                        l.comingSoon
                          ? active
                            ? "Quitar del plan"
                            : "Pronto disponible"
                          : active
                          ? "Quitar del plan"
                          : "Agregar al plan"
                      }
                      aria-label={
                        l.comingSoon && !active ? "Pronto disponible" : active ? "Quitar del plan" : "Agregar al plan"
                      }
                    >
                      {l.comingSoon && !active ? "Pronto" : active ? "Quitar del plan" : "Agregar al plan"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Resumen compacto */}
          <div className="summary" aria-live="polite">
            <div className="sum-left">
              <div className="sum-title">
                Selección: <span className="hi">{selected.length}</span> curso(s)
                {!!selected.length && (
                  <span className="muted">
                    {" "}
                    ·{" "}
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
                <Link className="btn btn-primary" to="/inscripcion" aria-label="Ir a inscripción con selección actual">Inscribirme</Link>
                <a
                  className="btn btn-outline"
                  href={`https://wa.me/56964626568?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Consultar por WhatsApp sobre mi selección de idiomas"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* HORARIOS (PRÓXIMAMENTE discreto) */}
        <section className="schedule">
          <header className="sec-head row">
            <h2>Horarios</h2>
            <span className="soon-badge">PRÓXIMAMENTE</span>
          </header>
          <p className="muted tiny">
            Publicaremos los horarios por curso aquí. Las clases en vivo quedan grabadas el mismo día para que avances a tu ritmo.
          </p>
        </section>

        {/* FAQ breve — reescrita (más directa) */}
        <section className="faq">
          <header className="sec-head"><h2>Preguntas frecuentes</h2></header>

          <details>
            <summary>Si falto, ¿pierdo la clase?</summary>
            <p>Tranquilo/a: subimos la grabación el mismo día y te damos un mini–reto para ponerte al día sin perder el hilo.</p>
          </details>

          <details>
            <summary>¿Puedo cambiar o sumar cursos después?</summary>
            <p>Sí. Puedes mover tu cupo o sumar otro cuando quieras; el precio del bundle se ajusta automático.</p>
          </details>

          <details>
            <summary>¿Entregan certificado?</summary>
            <p>Sí, por cada ruta aprobada. Para TOPIK te acompañamos con inscripción y simulacros.</p>
          </details>

          <div className="cta center">
            <Link className="btn btn-primary" to="/inscripcion">Postular ahora</Link>
            <a
              className="btn btn-outline"
              href={`https://wa.me/56964626568?text=${waMsg}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ================= CSS (oscuro, jerarquía clara, sin color-mix) ================= */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --text:#ffffff; --muted:#eaf2ff; --rad:18px;
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
.hero__grid{ display:grid; grid-template-columns: 1.1fr .9fr; gap:26px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; font-weight:900; color:#fff; }
h1{ margin:.45rem 0 .35rem; font-size:clamp(1.8rem, 3.2vw + .6rem, 2.6rem); letter-spacing:.2px; line-height:1.15; }
.under{ box-shadow: inset 0 -10px rgba(88,80,236,.25); border-radius:4px; }
.lead{ color:var(--muted); max-width:64ch; }
.points{ margin:.6rem 0 0; padding-left:18px; color:var(--muted); }
.points li{ margin:.1rem 0; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:12px 0 0; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.68rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
  transition: .18s transform ease, .18s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-outline, .btn-ghost{ background:transparent; color:#eaf2ff; }
.center{ justify-content:center; }

.hero__img{
  border-radius:20px; overflow:hidden; border:1px solid var(--bd);
  background:#0f172a;
  box-shadow: 0 0 0 12px rgba(255,255,255,.06) inset, 0 24px 56px rgba(2,6,23,.36);
}
.hero__img img{ display:block; width:100%; height:auto; object-fit:cover; }
.hero__img figcaption{ padding:8px 10px; font-size:.9rem; color:#eaf2ff; background:#0e162a; border-top:1px solid #1f2a44; }

/* Section head */
.sec-head{ margin:18px 0 12px; color:var(--text); }
.sec-head h2{ margin:0 0 4px; font-size:1.3rem; }
.sec-head p{ margin:0; color:var(--muted); }
.sec-head.row{ display:flex; align-items:center; gap:10px; }

/* QUICK */
.quick{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin:14px 0 6px; }
.quick__title{ font-weight:1000; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{
  border:1px solid #2a3550; background:#0f172a; color:#fff; border-radius:999px;
  padding:.46rem .74rem; font-weight:900;
}

/* BUILDER grid */
.builder{ margin-top:6px; }
.grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:12px; }
@media (max-width:980px){ .grid{ grid-template-columns:1fr; } }

.lang{
  border-radius:var(--rad);
  border:1px solid rgba(255,255,255,.08);
  background:
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)),
    linear-gradient(180deg, #0f172a, #0b1220);
  color:var(--text);
  padding:14px;
  box-shadow: 0 18px 36px rgba(2,6,23,.32);
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

/* chips de nivel (selector exclusivo) — sin color-mix */
.levels{ display:flex; gap:8px; flex-wrap:wrap; margin:8px 0 0; }
.lv{
  border:1px solid #2a3550;            /* borde suave */
  background: var(--chipSoft);          /* turquesa suave */
  color:#eaf2ff; border-radius:999px; padding:.3rem .6rem; font-weight:900; letter-spacing:.2px;
}
.lv.on{
  background: var(--chip);              /* turquesa fuerte */
  color:#052e2b;
  border-color:#0f7467;                 /* tono más oscuro del chip */
}
.lv.ghost{
  background:#0f172a; border-color:#2a3550; color:#cbd5e1; font-weight:800;
}

/* actions */
.act{ margin-top:10px; }
.choose{
  border-radius:10px; padding:.5rem .8rem; border:1px solid #28324a; background:#0f172a; color:#e5e7eb; font-weight:900;
  transition:.15s ease;
}
.choose.on{ background:#101a2f; border-color:var(--accent); color:#fff; }
.choose:disabled{ opacity:.7; cursor:not-allowed; }

/* Summary */
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
.sum-right{ text-align:right; }
@media (max-width:860px){ .sum-right{ text-align:left; } }
.price{ font-size:1.7rem; font-weight:1000; margin:.1rem 0 .2rem; }
.actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* Horarios */
.schedule{ margin:18px 0 26px; }
.soon-badge{
  display:inline-block; padding:.26rem .6rem; border-radius:999px;
  background:var(--accent); color:#fff; font-weight:1000; letter-spacing:.3px;
}

/* FAQ */
.faq details{
  border:1px solid var(--bd); border-radius:var(--rad);
  background:linear-gradient(180deg, #0f172a, #0b1220); color:#fff;
  padding:12px 14px; margin-bottom:10px; box-shadow:0 10px 22px rgba(16,24,40,.14);
}
.faq summary{ cursor:pointer; font-weight:900; }

/* Focus */
button:focus-visible, .btn:focus-visible{ outline:2px solid #22d3ee; outline-offset:2px; }
`;