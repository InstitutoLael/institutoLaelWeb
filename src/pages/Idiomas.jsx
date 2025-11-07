// src/pages/Idiomas.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";
import MultiHello from "../components/MultiHello.jsx";
import flags from "../assets/img/lael/flags.png";

/* ───────── SEOHead (reutilizable, sin deps externas) ───────── */
function SEOHead({ title, description, canonical, keywords = [], image, jsonLd = [] }) {
  const location = useLocation();
  useEffect(() => {
    const url =
      canonical ||
      (typeof window !== "undefined" ? `${window.location.origin}${location.pathname}` : "");

    document.title = title;

    const upsert = (selector, create) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    const setName = (name, content) => {
      const el = upsert(`meta[name="${name}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("name", name);
        return m;
      });
      el.setAttribute("content", content);
    };
    const setProp = (property, content) => {
      const el = upsert(`meta[property="${property}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", property);
        return m;
      });
      el.setAttribute("content", content);
    };

    setName("description", description);
    if (keywords.length) setName("keywords", keywords.join(", "));

    const link = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    link.setAttribute("href", url);

    setProp("og:type", "website");
    setProp("og:title", title);
    setProp("og:description", description);
    setProp("og:url", url);
    if (image) setProp("og:image", image);
    setProp("og:locale", "es_CL");

    setName("twitter:card", "summary_large_image");
    setName("twitter:title", title);
    setName("twitter:description", description);
    if (image) setName("twitter:image", image);

    // limpiar JSON-LD anteriores de este componente
    document.querySelectorAll('script[data-lael-jsonld="idiomas"]').forEach((s) => s.remove());
    const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    list.forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.laelJsonld = "idiomas";
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [title, description, canonical, keywords, image, jsonLd, location.pathname]);

  return null;
}

/**
 * Cuando tengas testimonios reales, agrégalos aquí.
 * Si queda [], la sección no se renderiza.
 */
const TESTIMONIOS = [
  // { name: "Nombre Apellido", note: "Programa/ciudad", quote: "Cita breve (1–2 líneas)." },
];

export default function Idiomas() {
  /* ── Paleta ────────────────────────────────────────────────────────────────── */
  const ACCENT = { base: "#5850EC", soft: "rgba(88,80,236,.16)" };

  /* ── Estado ─────────────────────────────────────────────────────────────────── */
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const builderRef = useRef(null);

  /* ── Derivados ──────────────────────────────────────────────────────────────── */
  const selected = useMemo(() => LANGUAGES.filter((l) => selectedIds.includes(l.id)), [selectedIds]);
  const monthly = computeLangBundle(selected.length);

  /* ── Acciones ───────────────────────────────────────────────────────────────── */
  const toggle = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const setLevel = (langId, level) => setSelectedLevels((prev) => ({ ...prev, [langId]: level }));
  const replaceWith = (ids = [], levels = {}) => {
    setSelectedIds([...ids]);
    setSelectedLevels((prev) => ({ ...prev, ...levels }));
    requestAnimationFrame(() =>
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  /* ── Atajos (enfasis Inglés) ───────────────────────────────────────────────── */
  const QUICK = [
    { id: "q-ingles-b1", label: "Inglés B1 (intermedio)", ids: ["ingles"], levels: { ingles: "B1" } },
    { id: "q-ielts", label: "Inglés · IELTS", ids: ["ingles"], levels: { ingles: "B2" } },
    { id: "q-coreano-topik1", label: "Coreano · TOPIK 1", ids: ["coreano"], levels: { coreano: "A2" } },
    { id: "q-portugues-a1", label: "Portugués A1 (inicial)", ids: ["portugues"], levels: { portugues: "A1" } },
  ].filter((q) => q.ids.every((id) => LANGUAGES.some((l) => l.id === id)));
  const applyQuick = (q) => replaceWith(q.ids, q.levels || {});

  /* ── WhatsApp ───────────────────────────────────────────────────────────────── */
  const waMsg = encodeURIComponent(
    `Hola 👋, quiero info de Idiomas.
Cursos: ${
      selected.length
        ? selected
            .map((s) => `${s.name}${selectedLevels[s.id] ? " (" + selectedLevels[s.id] + ")" : ""}`)
            .join(", ")
        : "—"
    }
Mensual estimada: ${clp(monthly)}
Matrícula única: ${clp(ENROLLMENT_FEE)}`
  );

  /* ── Mini-FAQ por curso (compacto) ─────────────────────────────────────────── */
  const COURSE_FAQ = {
    ingles: [
      ["¿Cuántas clases tengo?", "2 en vivo por semana + cápsulas de apoyo."],
      ["¿Cómo sé mi nivel?", "Diagnóstico corto para ubicarte entre A1 y B2."],
      ["¿Preparan IELTS/TOEFL?", "Sí, con simulacros y feedback específico."],
      ["¿Queda grabado?", "Sí, subimos la clase el mismo día."],
      ["¿Hay tareas?", "Metas semanales autocorregibles."],
      ["¿Certificado?", "Sí, por nivel aprobado."],
    ],
    coreano: [
      ["¿Qué ruta ven?", "TOPIK 1: lectura, vocabulario y comprensión."],
      ["¿Clases?", "2 en vivo por semana + cápsulas guiadas."],
      ["¿Requisitos?", "No necesitas experiencia previa."],
      ["¿Simulacros TOPIK?", "Sí, con pauta y retro para subir puntaje."],
      ["¿Grabaciones?", "Disponibles el mismo día."],
      ["¿Certificado?", "Sí, por ruta aprobada."],
    ],
    portugues: [
      ["¿Cuándo abre?", "Programa en preparación: A1 → Funcional."],
      ["¿Pre-inscripción?", "Sí, te avisamos al abrir cupos."],
      ["¿Enfoque?", "Vida real y trabajo en Chile/LatAm."],
    ],
  };

  /* ── SEO específico de Idiomas (énfasis Inglés) ───────────────────────────── */
  const pageTitle = "Cursos de Idiomas | Inglés (A1–B2, IELTS/TOEFL), Coreano TOPIK | Instituto Lael";
  const pageDesc =
    "Aprende idiomas con clases en vivo + cápsulas. Inglés A1–B2, preparación IELTS/TOEFL, Coreano TOPIK y más. Matrícula única y mensualidad que baja al sumar cursos.";
  const canonical = "https://www.institutolael.cl/idiomas";
  const keywords = [
    "curso de inglés online",
    "inglés A1 A2 B1 B2",
    "preparación IELTS Chile",
    "TOEFL Chile",
    "curso coreano TOPIK",
    "clases de idiomas online",
    "instituto de idiomas",
  ];

  const jsonLd = [
    // Org
    {
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "Organization"],
      "name": "Instituto Lael SpA",
      "url": "https://www.institutolael.cl/",
      "logo": "https://www.institutolael.cl/assets/img/Logos/lael-inst-azul.png",
      "sameAs": ["https://www.instagram.com/institutolael", "https://www.youtube.com/@institutolael"],
      "address": { "@type": "PostalAddress", "addressCountry": "CL", "addressRegion": "Región Metropolitana" },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "contacto@institutolael.cl",
          "telephone": "+56-9-6462-6568",
          "areaServed": "CL",
          "availableLanguage": ["es"]
        }
      ]
    },
    // Course (Inglés A1–B2)
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Inglés A1–B2 con preparación de certificaciones",
      "description": "Clases en vivo 2/semana, cápsulas, tareas, grabaciones el mismo día, diagnóstico de nivel y certificado.",
      "provider": { "@type": "EducationalOrganization", "name": "Instituto Lael" },
      "hasCourseInstance": [
        {
          "@type": "CourseInstance",
          "courseMode": ["online", "synchronous"],
          "inLanguage": "en",
          "location": { "@type": "VirtualLocation", "url": canonical }
        }
      ]
    },
    // Service (IELTS/TOEFL)
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Preparación IELTS/TOEFL",
      "serviceType": "ExamPreparation",
      "provider": { "@type": "EducationalOrganization", "name": "Instituto Lael" },
      "areaServed": "Chile",
      "description": "Simulacros, feedback por rúbrica y plan semanal para subir puntaje.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "CLP",
        "lowPrice": "4990",
        "highPrice": "16000",
        "offerCount": "4",
        "availability": "https://schema.org/InStock"
      },
      "url": canonical
    },
    // FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cómo sé mi nivel de inglés?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hacemos un diagnóstico corto para ubicarte entre A1 y B2 y armar tu plan semanal."
          }
        },
        {
          "@type": "Question",
          "name": "¿Preparan IELTS/TOEFL con simulacros?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Incluye simulacros, feedback con rúbrica y metas semanales."
          }
        },
        {
          "@type": "Question",
          "name": "¿Las clases quedan grabadas?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sí, se suben el mismo día." }
        },
        {
          "@type": "Question",
          "name": "¿Baja mi mensualidad si tomo más cursos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Al sumar cursos tu mensualidad por curso baja. La matrícula es única."
          }
        }
      ]
    },
    // WebSite + SearchAction
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Instituto Lael",
      "url": "https://www.institutolael.cl/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.institutolael.cl/buscar?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.institutolael.cl/" },
        { "@type": "ListItem", "position": 2, "name": "Idiomas", "item": canonical }
      ]
    }
  ];

  return (
    <section className="idiomas" style={{ "--accent": ACCENT.base, "--accentSoft": ACCENT.soft }}>
      {/* SEO */}
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        canonical={canonical}
        keywords={keywords}
        image={"https://www.institutolael.cl/assets/img/lael/idiomas-og.jpg"}
        jsonLd={jsonLd}
      />

      <style>{css}</style>

      {/* ── BREADCRUMBS ── */}
      <nav className="breadcrumbs" aria-label="breadcrumb">
        <div className="container">
          <ol>
            <li><Link to="/">Inicio</Link></li>
            <li aria-current="page">Idiomas</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__left">
            <span className="pill">Idiomas</span>

            <h1 className="mega">
              <span className="hello"><MultiHello /></span>{" "}
              con <span className="under">propósito y excelencia</span>
            </h1>

            <p className="lead">
              Clases en vivo, cápsulas y acompañamiento real. Parte con <b>un curso</b> y,
              si después sumas otro, <b>tu mensualidad baja</b>. Matrícula única <b>{clp(ENROLLMENT_FEE)}</b>.
            </p>

            <ul className="badges" aria-label="Beneficios">
              <li className="tag indigo">Inglés A1–B2</li>
              <li className="tag amber">IELTS / TOEFL</li>
              <li className="tag teal">TOPIK · Coreano</li>
              <li className="tag green">Grabaciones el mismo día</li>
            </ul>

            <div className="cta">
              <Link to="/inscripcion" className="btn btn-primary">Inscribirme</Link>
              <a className="btn btn-ghost" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>

          <figure className="hero__img" aria-hidden>
            <img src={flags} alt="" loading="eager" decoding="async" />
            <figcaption>Aprende con un plan claro y un equipo que de verdad acompaña.</figcaption>
          </figure>
        </div>
      </header>

      {/* ── BLOQUE ENFOQUE INGLÉS (destacado) ───────────────────────────────── */}
      <section className="eng-focus">
        <div className="container eng-grid">
          <div className="eng-left">
            <h2>Inglés: del <b>A1</b> al <b>B2</b> + <b>IELTS/TOEFL</b></h2>
            <ul className="eng-list">
              <li>2 clases en vivo/semana + cápsulas y tareas autocorregibles</li>
              <li>Diagnóstico de nivel rápido · plan semanal y checkpoints</li>
              <li>Simulacros y feedback por rúbrica (IELTS/TOEFL)</li>
              <li>Grabaciones el mismo día · certificado por nivel</li>
            </ul>
            <div className="cta">
              <a className="btn btn-primary" href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quiero%20diagn%C3%B3stico%20de%20nivel%20de%20ingl%C3%A9s" target="_blank" rel="noreferrer">
                Diagnóstico de nivel
              </a>
              <Link className="btn btn-outline" to="/inscripcion">Inscribirme</Link>
            </div>
          </div>
          <div className="eng-right">
            <div className="eng-card">
              <div className="k">Ruta sugerida</div>
              <ol>
                <li>A1 → A2: bases comunicativas</li>
                <li>B1: consolidación y fluidez</li>
                <li>B2: académico y laboral</li>
                <li>IELTS/TOEFL: simulacros y feedback</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN / QUÉ OBTIENES ───────────────────────────────────────── */}
      <section className="who">
        <div className="container">
          <h2>¿Para quién es?</h2>
          <div className="pill-grid">
            <article className="pill-card">💼 <b>Trabajo & entrevistas</b><span>Role-plays, guiones y feedback.</span></article>
            <article className="pill-card">🎓 <b>Universidad & becas</b><span>Reading, writing y presentaciones.</span></article>
            <article className="pill-card">🌍 <b>Certificaciones</b><span>IELTS/TOEFL/TOEIC y TOPIK 1.</span></article>
            <article className="pill-card">📈 <b>Progreso real</b><span>Metas semanales y checkpoints.</span></article>
          </div>
        </div>
      </section>

      <section className="gets">
        <div className="container">
          <h2>Lo que obtienes</h2>
          <div className="get-grid">
            <div>🧑‍🏫 2 clases en vivo/semana</div>
            <div>⬇️ Material y práctica autocorregible</div>
            <div>🎥 Grabaciones el mismo día</div>
            <div>🧭 Tutorías 1:1 bajo demanda</div>
            <div>🏅 Certificado por nivel aprobado</div>
          </div>
        </div>
      </section>

      {/* ── BUILDER ───────────────────────────────────────────────────────────── */}
      <div className="container">
        {!!QUICK.length && (
          <section className="quick" aria-label="Atajos">
            <div className="quick__title">Empieza rápido</div>
            <div className="chips">
              {QUICK.map((q) => (
                <button key={q.id} type="button" className="chip" onClick={() => applyQuick(q)}>
                  {q.label}
                </button>
              ))}
            </div>
          </section>
        )}

        <section ref={builderRef} className="builder">
          <header className="sec-head row">
            <h2>Elige tus cursos</h2>
            <small className="muted">Selecciona idioma(s) y tu nivel actual o meta</small>
          </header>

          <div className="grid">
            {LANGUAGES.map((l) => {
              const active = selectedIds.includes(l.id);
              const levels = (l.levels?.length ? l.levels : ["A1", "A2", "B1", "B2"]).slice(0, 4);
              const lvl = selectedLevels[l.id] || "";
              const faq = COURSE_FAQ[l.id] || [];

              return (
                <article key={l.id} className={"lang " + (active ? "on" : "")}>
                  <header className="head">
                    <span className="flag" aria-hidden>{l.emoji}</span>
                    <h3>{l.name}</h3>
                    {l.comingSoon && <span className="soon">PRÓXIMAMENTE</span>}
                  </header>

                  <p className="muted tiny">{l.summary}</p>

                  <div className="tag-row">
                    <span className="tag teal">Speaking</span>
                    <span className="tag rose">Listening</span>
                    <span className="tag green">Vocab</span>
                    {l.id === "coreano" && <span className="tag indigo">TOPIK</span>}
                    {l.id === "ingles" && (
                      <>
                        <span className="tag amber">IELTS</span>
                        <span className="tag amber">TOEFL</span>
                      </>
                    )}
                  </div>

                  <div className="levels" role="group" aria-label={`Niveles para ${l.name}`}>
                    {levels.map((lv) => {
                      const on = lvl === lv;
                      return (
                        <button
                          key={lv}
                          type="button"
                          className={"lv " + (on ? "on" : "")}
                          aria-pressed={on}
                          onClick={() => {
                            if (!active && !l.comingSoon) setSelectedIds((p) => [...p, l.id]);
                            if (!l.comingSoon || active) setLevel(l.id, lv);
                          }}
                        >
                          {lv}
                        </button>
                      );
                    })}
                    {lvl && (
                      <button type="button" className="lv ghost" onClick={() => setLevel(l.id, "")}>
                        Limpiar
                      </button>
                    )}
                  </div>

                  <div className="act">
                    <button
                      type="button"
                      className={"choose " + (active ? "on" : "")}
                      disabled={l.comingSoon}
                      onClick={() => toggle(l.id, l.comingSoon)}
                    >
                      {l.comingSoon ? "Pronto" : active ? "Quitar del plan" : "Agregar al plan"}
                    </button>
                  </div>

                  {!!faq.length && (
                    <details className="mini-faq">
                      <summary>Preguntas frecuentes de {l.name}</summary>
                      <ul>
                        {faq.map(([q, a], i) => (
                          <li key={i}><b>{q}</b><span> — {a}</span></li>
                        ))}
                      </ul>
                    </details>
                  )}
                </article>
              );
            })}
          </div>

          {/* Resumen pegajoso */}
          <div className="summary sticky" aria-live="polite">
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
              <div className="tiny muted">Al sumar cursos, tu mensualidad por curso baja.</div>
            </div>
            <div className="sum-right">
              <div className="tiny muted">Mensual estimada</div>
              <div className="price">{clp(monthly)}</div>
              <div className="tiny muted">+ matrícula {clp(ENROLLMENT_FEE)}</div>
              <div className="actions">
                <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
                <a className="btn btn-outline" href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios reales (opcional) */}
        {!!TESTIMONIOS.length && (
          <section className="testi">
            <header className="sec-head"><h2>Historias reales</h2></header>
            <div className="t-grid">
              {TESTIMONIOS.map((t, i) => (
                <blockquote key={i}>
                  “{t.quote}”
                  <cite>— {t.name}{t.note ? ` · ${t.note}` : ""}</cite>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Metodología breve */}
        <section className="method">
          <header className="sec-head"><h2>Metodología y certificación</h2></header>
          <ol className="steps">
            <li><b>Diagnóstico corto</b> para ubicarte en A1–B2 o ruta específica.</li>
            <li><b>Plan semanal</b> con objetivos medibles y cápsulas.</li>
            <li><b>Feedback accionable</b> + checkpoints mensuales.</li>
            <li><b>Certificado</b> por nivel aprobado (y simulacros si vas a prueba externa).</li>
          </ol>
        </section>

        {/* FAQ visible (coincide con JSON-LD) */}
        <section className="faq">
          <header className="sec-head"><h2>Preguntas frecuentes</h2></header>
          <div className="faq-box">
            <details><summary>¿Cómo sé mi nivel de inglés?</summary><p>Diagnóstico corto para ubicarte entre A1 y B2 y definir tu plan.</p></details>
            <details><summary>¿Hacen preparación IELTS/TOEFL?</summary><p>Sí. Simulacros, rúbricas oficiales y feedback detallado.</p></details>
            <details><summary>¿Quedan grabadas las clases?</summary><p>Sí, se suben el mismo día para repasar.</p></details>
            <details><summary>¿Baja la mensualidad al sumar cursos?</summary><p>Sí. Tu mensualidad por curso disminuye; la matrícula es única.</p></details>
          </div>
        </section>

        {/* CTA final */}
        <section className="cta-band">
          <div className="cta-band__box">
            <h3>Inglés con propósito: A1–B2 + IELTS/TOEFL.</h3>
            <div className="cta">
              <a className="btn btn-primary" href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quiero%20diagn%C3%B3stico%20de%20nivel%20de%20ingl%C3%A9s" target="_blank" rel="noreferrer">Diagnóstico</a>
              <Link className="btn btn-ghost" to="/inscripcion">Inscribirme</Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

/* ======================= CSS (limpio y responsive) ======================= */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --text:#fff; --muted:#eaf2ff; --rad:18px;
}
*{box-sizing:border-box}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* Breadcrumbs */
.breadcrumbs{border-bottom:1px solid var(--bd); background:linear-gradient(180deg,#0B1220,#0E1529)}
.breadcrumbs ol{list-style:none; margin:0; padding:8px 0; display:flex; gap:8px; color:#cfe0ff; font-size:.92rem}
.breadcrumbs a{color:#cfe0ff; text-decoration:underline; text-underline-offset:3px}

/* HERO */
.hero{
  padding:34px 0 20px; color:var(--text); border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, var(--accentSoft), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__grid{ display:grid; grid-template-columns: 1.08fr .92fr; gap:26px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; font-weight:900; color:#fff; }
.mega{ margin:.3rem 0 .4rem; font-size:clamp(2rem, 3.2vw + .8rem, 3rem); line-height:1.12; }
.hello{ display:inline-block; min-width:8ch }
.under{ box-shadow: inset 0 -10px rgba(88,80,236,.28); border-radius:4px; }
.lead{ color:var(--muted); max-width:64ch; }
.badges{ display:flex; gap:10px; flex-wrap:wrap; margin:10px 0 0; }

/* TAGS */
.tag{ display:inline-flex; align-items:center; gap:6px; padding:.26rem .6rem; border-radius:999px; font-weight:900; border:1px solid transparent; }
.tag.indigo{ background:#3536a833; border-color:#4f46e5; }
.tag.teal  { background:#0d948833; border-color:#14b8a6; }
.tag.amber { background:#b4530933; border-color:#f59e0b; }
.tag.rose  { background:#be185d33; border-color:#f43f5e; }
.tag.green { background:#16653433; border-color:#22c55e; }

.hero__img{
  border-radius:20px; overflow:hidden; border:1px solid var(--bd);
  background:#0f172a; box-shadow:0 24px 56px rgba(2,6,23,.36);
}
.hero__img img{ display:block; width:100%; height:auto; object-fit:cover; }
.hero__img figcaption{ padding:8px 10px; font-size:.9rem; color:#eaf2ff; background:#0e162a; border-top:1px solid #1f2a44; }

/* SECTION HEAD */
.sec-head{ margin:18px 0 12px; color:var(--text); }
.sec-head h2{ margin:0 0 4px; font-size:1.28rem; }
.sec-head.row{ display:flex; align-items:center; gap:10px; }
.muted{ color:var(--muted); opacity:.95; }
.tiny{ font-size:.92rem; }

/* ENGLISH FOCUS */
.eng-focus{ padding:16px 0 10px; }
.eng-grid{ display:grid; grid-template-columns:1.2fr .8fr; gap:14px; }
@media (max-width:900px){ .eng-grid{ grid-template-columns:1fr; } }
.eng-list{ margin:.4rem 0 0; padding-left:18px; color:#eaf2ff; }
.eng-card{ border:1px solid #223052; border-radius:14px; padding:14px; background:linear-gradient(180deg,#0f172a,#0b1220); color:#eaf2ff }

/* QUIÉN / QUÉ OBTIENES */
.who, .gets{ padding:18px 0 8px; }
.pill-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
@media (max-width:1024px){ .pill-grid{ grid-template-columns:1fr 1fr; } }
@media (max-width:560px){ .pill-grid{ grid-template-columns:1fr; } }
.pill-card{
  border:1px solid #223052; border-radius:16px; padding:14px;
  background:linear-gradient(180deg, #0f172a, #0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.28); display:flex; flex-direction:column; gap:4px;
}
.pill-card b{ display:block }
.pill-card span{ color:#cfe0ff }

.get-grid{ display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
@media (max-width:1024px){ .get-grid{ grid-template-columns:1fr 1fr 1fr; } }
@media (max-width:560px){ .get-grid{ grid-template-columns:1fr 1fr; } }
.get-grid > div{
  border:1px solid #223052; border-radius:14px; padding:10px 12px; text-wrap:balance;
  background:linear-gradient(180deg,#101b2f,#0b1220);
}

/* QUICK */
.quick{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin:14px 0 6px; }
.quick__title{ font-weight:1000; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{ border:1px solid #2a3550; background:#0f172a; color:#fff; border-radius:999px; padding:.46rem .74rem; font-weight:900; }

/* BUILDER */
.builder{ margin-top:8px; }
.grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:12px; }
@media (max-width:1100px){ .grid{ grid-template-columns:1fr 1fr; } }
@media (max-width:680px){ .grid{ grid-template-columns:1fr; } }

.lang{
  border-radius:var(--rad); border:1px solid rgba(255,255,255,.08); padding:14px;
  background:linear-gradient(180deg, #0f172a, #0b1220);
  color:var(--text); box-shadow:0 18px 36px rgba(2,6,23,.32);
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.lang:hover{ transform: translateY(-2px); box-shadow:0 22px 44px rgba(2,6,23,.38); border-color:#2a3550; }
.lang.on{ outline:1px solid #4338ca55; }
.head{ display:flex; align-items:center; gap:10px; margin-bottom:6px; }
.flag{ font-size:22px; line-height:1; }
.head h3{ margin:0; font-size:1.05rem; font-weight:800; }
.soon{ margin-left:auto; font-size:.75rem; padding:.12rem .45rem; border:1px solid #334155; border-radius:8px; color:#cbd5e1; }
.tag-row{ display:flex; flex-wrap:wrap; gap:8px; margin:8px 0 0; }
.levels{ display:flex; gap:8px; flex-wrap:wrap; margin:8px 0 0; }

.lv{ border:1px solid #2a3550; background: #0f172a; color:#eaf2ff; border-radius:999px; padding:.3rem .6rem; font-weight:900; }
.lv.on{ background:#5850EC; color:#0b1220; border-color:#5850EC; }
.lv.ghost{ background:#0f172a; border-color:#2a3550; color:#cbd5e1; font-weight:800; }

.act{ margin-top:10px; }
.choose{ border-radius:10px; padding:.5rem .8rem; border:1px solid #28324a; background:#0f172a; color:#e5e7eb; font-weight:900; }
.choose.on{ background:#101a2f; border-color:var(--accent); color:#fff; }
.choose:disabled{ opacity:.7; cursor:not-allowed; }

/* FAQ mini */
.mini-faq{ margin-top:8px; }
.mini-faq summary{ cursor:pointer; font-weight:800; }
.mini-faq ul{ margin:.3rem 0 0; padding-left:18px; color:#eaf2ff; }
.mini-faq li{ margin:.14rem 0; }
.mini-faq li b{ font-weight:800; }

/* Summary sticky */
.summary{
  margin-top:12px; display:grid; grid-template-columns: 1.2fr .8fr; gap:14px;
  border:1px solid rgba(255,255,255,.08); border-radius:20px; padding:16px;
  background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)), linear-gradient(180deg, #0f172a, #0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.32);
}
@media (max-width:860px){ .summary{ grid-template-columns:1fr; } }
.summary.sticky{
  position:sticky; bottom:0; z-index:20;
  background:linear-gradient(180deg, rgba(11,18,32,.6), rgba(11,18,32,.96));
  backdrop-filter: blur(6px);
  border-top:1px solid #1f2a44; margin-top:14px;
}
.sum-title{ font-weight:1000; }
.hi{ color:var(--accent); font-weight:1000; }
.sum-right{ text-align:right; }
@media (max-width:860px){ .sum-right{ text-align:left; } }
.price{ font-size:1.7rem; font-weight:1000; margin:.1rem 0 .2rem; }
.actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* FAQ visible */
.faq{ padding:8px 0 10px; }
.faq-box details{border:1px solid var(--bd); border-radius:14px; background:#0f172a; padding:12px 14px; margin-bottom:10px}
.faq-box summary{cursor:pointer; font-weight:900; list-style:none; display:flex; align-items:center; gap:8px}
.faq-box summary::-webkit-details-marker{display:none}
.faq-box summary::after{content:"▸"; margin-left:auto; transform:rotate(0deg); transition:transform .16s ease; color:#F2CE3D}
.faq-box details[open] summary::after{transform:rotate(90deg)}
.faq-box p{margin:.5rem 0 0; color:#EAF2FF}

/* CTA band */
.cta-band{ padding:18px 0 22px; }
.cta-band__box{
  border:1px solid #1f2a44; border-radius:16px; padding:16px;
  background:radial-gradient(600px 200px at 10% -20%, var(--accentSoft), transparent 60%), linear-gradient(180deg, #0f172a, #0b1220);
}

/* Buttons */
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:.68rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-outline, .btn-ghost{ background:transparent; color:#eaf2ff; }

/* Focus */
button:focus-visible, .btn:focus-visible{ outline:2px solid #22d3ee; outline-offset:2px; }
`;