// src/pages/Docentes.jsx
import { useMemo, useState } from "react";
import { teachers } from "../data/teachers.js";

export default function Docentes() {
  const [active, setActive] = useState("Todos");
  const [query, setQuery] = useState("");

  // subjects únicos (normalizados)
  const subjects = useMemo(() => {
    const set = new Set();
    teachers.forEach((t) => t.subject && set.add(t.subject.trim()));
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b, "es"))];
  }, []);

  const filtered = useMemo(() => {
    const bySubject = active === "Todos"
      ? teachers
      : teachers.filter((t) => (t.subject || "").trim() === active);

    const q = query.trim().toLowerCase();
    if (!q) return bySubject;

    return bySubject.filter((t) => {
      const hay =
        (t.name || "").toLowerCase() +
        " " +
        (t.subject || "").toLowerCase() +
        " " +
        (t.bio || "").toLowerCase() +
        " " +
        (t.tags || []).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [active, query]);

  return (
    <section className="teachers-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container">
          <span className="badge">Equipo docente</span>
          <h1>Personas reales, acompañamiento real 💚</h1>
          <p className="lead">
            Profes con vocación y experiencia. Humanos, cercanos y claros — nada robóticos.
          </p>

          {/* Filtros */}
          <div className="filters" role="tablist" aria-label="Filtrar por asignatura">
            <div className="chips">
              {subjects.map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={active === s}
                  className={"chip " + (active === s ? "on" : "")}
                  onClick={() => setActive(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="search">
              <span className="sr-only">Buscar docente</span>
              <input
                type="search"
                placeholder="Buscar por nombre, ramo o tema…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          <div className="meta">
            {filtered.length} {filtered.length === 1 ? "docente" : "docentes"} encontrados
            {active !== "Todos" && <> · <span className="soft">Filtro: {active}</span></>}
          </div>
        </div>
      </header>

      {/* GRID */}
      <div className="container">
        <div className="grid">
          {filtered.map((t) => (
            <TeacherCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Card de docente ---------- */
function TeacherCard({ t }) {
  const accent = t.accent || "#3b549d";
  const first = (t.name || "?").trim().charAt(0).toUpperCase();

  return (
    <article className="card" style={{ "--accent": accent }}>
      <figure className="avatar" aria-hidden="true">
        {t.photo ? (
          <img src={t.photo} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="initial">{first}</span>
        )}
      </figure>

      <div className="info">
        <div className="head">
          <h3 className="name">{t.name}</h3>
          {t.subject && <div className="sub">{t.subject}</div>}
        </div>

        {t.bio && <p className="bio clamp" data-clamp="3">{t.bio}</p>}

        {!!(t.tags && t.tags.length) && (
          <ul className="tags" aria-label="Especialidades">
            {t.tags.map((tag, i) => (
              <li key={i} className="tag">{tag}</li>
            ))}
          </ul>
        )}

        {/* Acciones opcionales */}
        <div className="actions">
          {t.linkedin && (
            <a
              className="btn-ghost"
              href={t.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}
          {t.youtube && (
            <a
              className="btn-ghost"
              href={t.youtube}
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          )}
          <button
            className="btn-more"
            type="button"
            onClick={(e) => {
              const p = e.currentTarget.closest(".card")?.querySelector(".bio");
              if (!p) return;
              p.classList.toggle("clamp");
              e.currentTarget.textContent = p.classList.contains("clamp") ? "Ver más" : "Ver menos";
            }}
          >
            Ver más
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220;
  --panel:#0e1424;
  --soft:#101a2f;
  --bd:#1f2a44;
  --ink:#ffffff;
  --ink2:#eaf2ff;
  --muted:#cfe0ff;
}

*{box-sizing:border-box}
.teachers-page{ color:var(--ink); background:linear-gradient(180deg,var(--bg),var(--panel)); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{ padding:28px 0 12px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 12% -10%, rgba(59,84,157,.18), transparent 60%),
    radial-gradient(840px 300px at 92% -8%, rgba(36,149,84,.14), transparent 60%);
}
.badge{
  display:inline-block; padding:.28rem .6rem; border-radius:999px;
  border:1px solid #334155; background:#0f172a; color:#c7d2fe; font-weight:900;
}
.hero h1{ margin:.35rem 0 .25rem; font-size:clamp(1.8rem,3vw + .6rem,2.4rem); }
.lead{ margin:0; color:var(--ink2); }

/* Filtros */
.filters{ display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top:12px; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{
  border:1px solid #2b3656; background:#0f172a; color:#eaf2ff; padding:.46rem .8rem;
  border-radius:999px; font-weight:900; cursor:pointer;
}
.chip.on{ border-color:#6b7cff; box-shadow:0 0 0 2px rgba(79,70,229,.18) inset; }
.search input{
  border:1px solid #2a3557; background:#0f172a; color:#eaf2ff; border-radius:12px;
  padding:.55rem .75rem; min-width:240px; font-weight:800;
}
.meta{ margin-top:6px; color:#cfe0ff; }
.meta .soft{ color:#a5b4fc; }

/* GRID */
.grid{
  display:grid; gap:14px;
  grid-template-columns: repeat(12, minmax(0,1fr));
  padding:14px 0 28px;
}
@media (max-width:640px){ .grid{ grid-template-columns:1fr; } }
@media (min-width:641px) and (max-width:1023px){ .grid{ grid-template-columns: repeat(6,1fr); } }
@media (min-width:1024px){ .grid{ grid-template-columns: repeat(12,1fr); } }

/* CARD */
.card{
  grid-column: span 6;
  display:grid; grid-template-columns:92px 1fr; gap:14px; align-items:flex-start;
  padding:14px; border-radius:16px;
  background:
    radial-gradient(420px 160px at -12% -16%, color-mix(in srgb, var(--accent, #3b549d), #ffffff 88%) 0, transparent 60%),
    linear-gradient(180deg, #ffffff, #f8fafc);
  border:1px solid color-mix(in srgb, var(--accent, #3b549d), #e5e7eb 86%);
  box-shadow:0 12px 28px rgba(16,24,40,.06);
  color:#0b1220;
}
@media (max-width:640px){
  .card{ grid-template-columns:72px 1fr; }
}
@media (prefers-color-scheme: dark){
  .card{
    background:
      radial-gradient(520px 200px at 110% -18%, color-mix(in srgb, var(--accent, #3b549d), transparent 86%) 0, transparent 60%),
      linear-gradient(180deg, #0f172a, #0b1220);
    border-color:#1f2a44; color:#fff;
    box-shadow:0 16px 38px rgba(2,6,23,.36);
  }
}

/* Avatar */
.avatar{
  width:92px; height:92px; border-radius:50%; overflow:hidden; display:grid; place-items:center;
  background:#fff; border:1px solid color-mix(in srgb, var(--accent, #3b549d), #dbeafe 72%);
}
.avatar img{ width:100%; height:100%; object-fit:cover; }
.initial{ font-weight:1000; color:#0f172a; font-size:1.6rem; }
@media (prefers-color-scheme: dark){
  .avatar{ background:#0b1220; border-color:#1f2a44; }
  .initial{ color:#e5e7eb; }
}

/* Info */
.head{ display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; }
.name{ margin:0; font-size:1.08rem; font-weight:1000; }
.sub{ color:#475569; font-style:italic; font-size:.96rem; }
@media (prefers-color-scheme: dark){ .sub{ color:#9fb3c8; } }

.bio{ margin:.45rem 0 .2rem; color:#334155; }
@media (prefers-color-scheme: dark){ .bio{ color:#cfe0ff; } }

.clamp{
  display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden;
  -webkit-line-clamp:3;
}

/* Tags */
.tags{ display:flex; flex-wrap:wrap; gap:6px; margin:6px 0 0; padding:0; list-style:none; }
.tag{
  background:#f1f5f9; color:#0f172a; border-radius:999px; padding:4px 10px; font-size:.74rem; border:1px solid #e2e8f0;
}
@media (prefers-color-scheme: dark){
  .tag{ background:#0e162e; color:#eaf2ff; border-color:#2a3557; }
}

/* Actions */
.actions{ display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
.btn-ghost, .btn-more{
  padding:.48rem .76rem; border-radius:10px; font-weight:900; cursor:pointer;
  border:1px solid #22304d; background:#0f172a; color:#eaf2ff;
}
.btn-more{ border-style:dashed; }
.btn-ghost:hover, .btn-more:hover{ transform:translateY(-1px); box-shadow:0 10px 22px rgba(2,6,23,.28); }

/* Cols */
@media (min-width:1024px){
  .card:nth-child(3n+1){ grid-column: span 12; } /* cada 3, una más ancha */
  .card:nth-child(3n+2), .card:nth-child(3n+3){ grid-column: span 6; }
}
`;