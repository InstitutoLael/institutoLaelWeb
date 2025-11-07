// src/pages/Noticias.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

/**
 * Fuente local de noticias (puedes editar/añadir sin tocar el componente).
 * - type: "PAES" | "Idiomas" | "LSCh" | "Empresas" | "Homeschool" | "Institucional"
 * - href: si está presente, el card abre en nueva pestaña; si no, deja solo el card informativo
 * - img: opcional; si no hay, el card usa un fondo decorativo
 */
const NEWS = [
  {
    id: "2025-11-paesm1-cierre",
    title: "Cierre ciclo PAES 2025: resumen y próximos pasos",
    excerpt:
      "Gracias a todas/os quienes confiaron en Lael. Te contamos cómo vienen los intensivos y la planificación 2026.",
    date: "2025-11-01",
    type: "PAES",
    href: "https://www.instagram.com/inst.lael",
  },
  {
    id: "2025-10-idiomas-conversacion",
    title: "Club de conversación en Inglés (B1–B2)",
    excerpt:
      "Sesiones prácticas con feedback real. Cupos limitados para mantener la calidad.",
    date: "2025-10-15",
    type: "Idiomas",
  },
  {
    id: "2025-10-lsch-convenios",
    title: "Convenios LSCh para iglesias y colegios",
    excerpt:
      "Facilitamos inclusión real con módulos online + taller de conversación.",
    date: "2025-10-10",
    type: "LSCh",
  },
  {
    id: "2025-09-empresas-bootcamp",
    title: "Bootcamp para empresas: Inglés & Soft Skills",
    excerpt:
      "Programas modulares para onboarding y equipos con atención de clientes.",
    date: "2025-09-20",
    type: "Empresas",
  },
  {
    id: "2025-09-homeschool-orientacion",
    title: "Homeschool 2026: orientación a familias",
    excerpt:
      "Acompañamiento por materias, materiales y seguimiento mensual.",
    date: "2025-09-05",
    type: "Homeschool",
  },
  {
    id: "2025-08-institucional-becas",
    title: "Becas Lael 2026: criterios y postulación",
    excerpt:
      "Buscamos que nadie quede fuera por costo. Revisa requisitos y plazos.",
    date: "2025-08-28",
    type: "Institucional",
  },
];

/** Categorías disponibles (orden y color) */
const CATS = [
  { id: "Todos", color: "#a5b4fc" },
  { id: "PAES", color: "#5850EC" },
  { id: "Idiomas", color: "#16A34A" },
  { id: "LSCh", color: "#22d3ee" },
  { id: "Empresas", color: "#f59e0b" },
  { id: "Homeschool", color: "#ef4444" },
  { id: "Institucional", color: "#94a3b8" },
];

/** Emoji por categoría (solo decorativo) */
const CAT_EMOJI = {
  PAES: "📚",
  Idiomas: "🗣️",
  LSCh: "🤟",
  Empresas: "🏢",
  Homeschool: "🏠",
  Institucional: "🏛️",
};

export default function Noticias() {
  const loc = useLocation();
  const nav = useNavigate();

  // Lee filtros desde la URL (para SEO y compartir enlaces)
  const params = new URLSearchParams(loc.search);
  const q0 = params.get("q") ?? "";
  const cat0 = params.get("cat") ?? "Todos";
  const page0 = Math.max(1, parseInt(params.get("page") || "1", 10));

  const [q, setQ] = useState(q0);
  const [cat, setCat] = useState(cat0);
  const [page, setPage] = useState(page0);
  const PAGE_SIZE = 6;

  // Sincroniza estado -> URL (sin recargar)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (cat !== "Todos") sp.set("cat", cat);
    if (page > 1) sp.set("page", String(page));
    const next = sp.toString() ? `?${sp.toString()}` : "";
    if (next !== loc.search) nav({ pathname: loc.pathname, search: next }, { replace: true });
  }, [q, cat, page]); // eslint-disable-line react-hooks/exhaustive-deps

  // Filtro + búsqueda + orden fecha desc
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return [...NEWS]
      .filter((n) => (cat === "Todos" ? true : n.type === cat))
      .filter((n) =>
        term
          ? n.title.toLowerCase().includes(term) ||
            n.excerpt.toLowerCase().includes(term)
          : true
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, cat]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const slice = results.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  // Reset a página 1 al cambiar filtros/búsqueda
  useEffect(() => { setPage(1); }, [q, cat]);

  // -------- SEO --------
  const base = "https://www.institutolael.cl/noticias";
  const canonical = `${base}${loc.search || ""}`;
  const desc =
    "Noticias de Instituto Lael: PAES, Idiomas e inclusión (LSCh), inscripciones, becas y convenios.";

  // JSON-LD: CollectionPage + NewsArticle
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Noticias — Instituto Lael",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Instituto Lael", url: "https://www.institutolael.cl" },
    about: ["PAES", "Idiomas", "LSCh", "Homeschool", "Empresas", "Institucional"],
    hasPart: slice.map((n) => ({
      "@type": "NewsArticle",
      "@id": `#${n.id}`,
      headline: n.title,
      description: n.excerpt,
      datePublished: n.date,
      dateModified: n.date,
      inLanguage: "es-CL",
      articleSection: n.type,
      mainEntityOfPage: n.href || `${base}#${n.id}`,
      author: { "@type": "Organization", name: "Instituto Lael" },
      publisher: {
        "@type": "Organization",
        name: "Instituto Lael",
        logo: { "@type": "ImageObject", url: "https://www.institutolael.cl/og/lael-logo-512.png" }
      }
    })),
  };

  return (
    <section className="news">
      {/* HEAD META */}
      <SEOHead
        title="Noticias | Instituto Lael"
        description={desc}
        canonical={canonical}
        ogImage="https://www.institutolael.cl/og/noticias-og.jpg"
        twitterImage="https://www.institutolael.cl/og/noticias-og.jpg"
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__wrap">
          <div className="hero__copy">
            <span className="pill">Noticias</span>
            <h1>Lo último de Instituto Lael</h1>
            <p className="lead">
              Novedades de programas, inscripciones y convenios. Todo en un solo lugar.
            </p>

            <form
              className="search"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar (ej: becas, inglés, LSCh, PAES)…"
                aria-label="Buscar noticias"
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setQ("")}
                disabled={!q}
                aria-disabled={!q}
              >
                Limpiar
              </button>
            </form>

            <div className="chips" role="tablist" aria-label="Filtrar por categoría">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={cat === c.id}
                  className={"chip " + (cat === c.id ? "on" : "")}
                  onClick={() => setCat(c.id)}
                  style={{ ["--c"]: c.color }}
                >
                  {c.id === "Todos" ? "⭐ " : (CAT_EMOJI[c.id] || "• ") } {c.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* LISTA */}
      <div className="container">
        {slice.length ? (
          <>
            <div className="grid" aria-live="polite">
              {slice.map((n) => (
                <NewsCard key={n.id} n={n} />
              ))}
            </div>

            <Pager
              page={pageSafe}
              total={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </>
        ) : (
          <EmptyState q={q} cat={cat} />
        )}
      </div>

      {/* CTA / PRENSA */}
      <section className="press">
        <div className="container">
          <div className="press__box">
            <h3>¿Prensa o alianzas?</h3>
            <p>
              Escríbenos a{" "}
              <a className="link" href="mailto:coordinacion@institutolael.cl">
                coordinacion@institutolael.cl
              </a>{" "}
              o por{" "}
              <a
                className="link"
                href="https://wa.me/56964626568?text=Hola%20👋%20quiero%20coordinar%20prensa%20o%20alianza%20con%20Instituto%20Lael"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              . Te enviamos un press kit y material gráfico.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */

function NewsCard({ n }) {
  const tag = n.type;
  const color = (CATS.find((c) => c.id === tag)?.color || "#a5b4fc");

  const inner = (
    <>
      <div className="tag" style={{ ["--c"]: color }}>
        <span className="dot" aria-hidden /> {CAT_EMOJI[tag] || "•"} {tag}
      </div>
      <h3 className="ttl">{n.title}</h3>
      <p className="excerpt">{n.excerpt}</p>
      <div className="meta">
        <time dateTime={n.date}>
          {new Date(n.date + "T00:00:00").toLocaleDateString("es-CL", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
        {n.href ? <span className="sep">·</span> : null}
        {n.href ? (
          <span className="ext">Abrir →</span>
        ) : (
          <span className="muted">Interno</span>
        )}
      </div>
      {/* microdata mínima dentro del card */}
      <meta itemProp="datePublished" content={n.date} />
      <meta itemProp="dateModified" content={n.date} />
      <meta itemProp="about" content={n.type} />
    </>
  );

  const commonProps = {
    className: "card",
    style: { ["--bar"]: color },
    itemScope: true,
    itemType: "https://schema.org/NewsArticle",
    itemID: `#${n.id}`,
  };

  return n.href ? (
    <a {...commonProps} href={n.href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <article {...commonProps}>{inner}</article>
  );
}

function Pager({ page, total, onPrev, onNext }) {
  if (total <= 1) return null;
  return (
    <nav className="pager" aria-label="Paginación de noticias">
      <button className="btn btn-ghost" onClick={onPrev} disabled={page <= 1}>
        ← Anteriores
      </button>
      <span className="pg-info">
        Página {page} de {total}
      </span>
      <button className="btn btn-ghost" onClick={onNext} disabled={page >= total}>
        Siguientes →
      </button>
    </nav>
  );
}

function EmptyState({ q, cat }) {
  return (
    <div className="empty">
      <div className="emoji" aria-hidden>🗞️</div>
      <h3>Sin resultados</h3>
      <p>
        {q
          ? <>No encontramos noticias para “<b>{q}</b>”.</>
          : "Aún no hay noticias en esta categoría."}{" "}
        Puedes revisar <Link to="/inscripcion" className="link">Inscripción</Link> o escribir por{" "}
        <a
          className="link"
          href="https://wa.me/56964626568?text=Hola%20👋%2C%20busco%20información%20y%20no%20la%20encuentro%20en%20Noticias."
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>.
      </p>
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --muted:#eaf2ff; --indigo:#5850EC;
}

.news{ color:var(--ink); background:linear-gradient(180deg,var(--bg),var(--panel)); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  padding:40px 0 18px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, rgba(88,80,236,.12), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__wrap{ display:grid; grid-template-columns:1fr; gap:10px; }
.pill{
  display:inline-block; padding:.26rem .62rem; border-radius:999px;
  border:1px solid #334155; background:#101a2f; font-weight:900; color:#cfe0ff;
}
h1{ margin:.35rem 0 .3rem; font-size: clamp(1.9rem, 2.2vw + 1rem, 2.4rem); }
.lead{ color:var(--muted); opacity:.95; max-width:66ch; }

.search{ display:flex; gap:8px; flex-wrap:wrap; margin:12px 0 8px; }
.input{
  flex:1; border:1px solid #2b375c; background:#0f172a; color:#eaf2ff; border-radius:12px;
  padding:.65rem .8rem; min-width:260px;
}
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.66rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; }
.btn-ghost{ background:transparent; color:#eaf2ff; }

.chips{ display:flex; flex-wrap:wrap; gap:8px; margin:6px 0 2px; }
.chip{
  border:1px solid #334155; background:#0f172a; color:#fff; border-radius:999px;
  padding:.42rem .8rem; font-weight:900;
}
.chip.on{ outline:2px solid var(--c); outline-offset:1px; }

/* GRID */
.grid{ display:grid; gap:14px; grid-template-columns: repeat(3, minmax(0,1fr)); padding:18px 0; }
@media (max-width:980px){ .grid{ grid-template-columns:1fr 1fr; } }
@media (max-width:640px){ .grid{ grid-template-columns:1fr; } }

.card{
  display:block; text-decoration:none; color:#fff;
  border:1px solid var(--bd); border-radius:16px; padding:14px;
  background:
    linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26);
  position:relative;
}
.card::before{
  content:""; position:absolute; inset:0 0 auto 0; height:6px; border-radius:16px 16px 0 0;
  background: var(--bar, #5865f2);
}
.card:hover{ transform: translateY(-2px); transition:.12s ease; box-shadow:0 22px 40px rgba(2,6,23,.32); }

.tag{ display:inline-flex; align-items:center; gap:8px; font-size:.8rem; font-weight:900; color:#cfe0ff; }
.tag .dot{ width:10px; height:10px; border-radius:999px; background:var(--c); display:inline-block; }
.ttl{ margin:.35rem 0 .22rem; font-size:1.08rem; }
.excerpt{ margin:0; color:#eaf2ff; opacity:.95; min-height:2.6em; }
.meta{ margin-top:8px; color:#9fb3c8; font-size:.92rem; display:flex; align-items:center; gap:6px; }
.sep{ opacity:.5; }
.ext{ color:#eaf2ff; text-decoration:underline; text-underline-offset:3px; }
.muted{ color:#9fb3c8; }

/* Pager */
.pager{ display:flex; align-items:center; justify-content:center; gap:10px; padding:8px 0 24px; }
.pg-info{ color:#cfe0ff; }

/* Empty state */
.empty{
  text-align:center; padding:28px 10px 40px; border:1px dashed #2b3b61; border-radius:16px; background:#0f172a;
}
.empty .emoji{ font-size:30px; }
.empty h3{ margin:.4rem 0 .2rem; }
.link{ color:#FDE047; text-decoration:underline; }

/* Prensa */
.press{ padding:0 0 24px; }
.press__box{
  margin-top:6px; border:1px solid var(--bd); border-radius:16px; padding:16px;
  background: linear-gradient(180deg,#0f172a,#0b1220);
}
.press__box h3{ margin:0 0 6px; }
.press .link{ color:#FDE047; text-decoration:underline; }

/* Accesibilidad focus */
button:focus-visible, .chip:focus-visible, .btn:focus-visible, .card:focus-visible, .q-pill:focus-visible, .input:focus-visible {
  outline: 2px solid #22d3ee; outline-offset: 2px;
}
`;