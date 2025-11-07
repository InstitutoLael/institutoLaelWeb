// src/components/SearchOverlay.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

/** Ítems a buscar (puedes moverlos a un data/sitemap.js si quieres) */
const ITEMS = [
  { title: "Inicio", to: "/", type: "Página" },
  { title: "PAES", to: "/paes", type: "Programa" },
  { title: "Lengua de Señas (LSCh)", to: "/lsch", type: "Programa" },
  { title: "Idiomas", to: "/idiomas", type: "Programa" },
  { title: "Inscripción", to: "/inscripcion", type: "Página" },
  { title: "Nosotros", to: "/nosotros", type: "Página" },
  { title: "Empresas", to: "/empresas", type: "Página" },
  { title: "Pagos", to: "/pagos", type: "Página" },
];

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const RECENTS_KEY = "lael-search-recents";
const MAX_RECENTS = 5;

export default function SearchOverlay({ open, onClose }) {
  const nav = useNavigate();
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const firstFocusRef = useRef(null);
  const lastFocusRef = useRef(null);

  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [recents, setRecents] = useState([]);

  // Monta/desmonta con animación simple
  useEffect(() => {
    if (open) {
      setVisible(true);
      // retraso corto para que el DOM esté listo antes de enfocar
      setTimeout(() => inputRef.current?.focus(), 0);
      // bloquear scroll
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
      // cargar recientes
      try {
        const raw = localStorage.getItem(RECENTS_KEY);
        if (raw) setRecents(JSON.parse(raw));
      } catch {}
    } else {
      setVisible(false);
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
      setQ("");
      setActive(0);
    }
  }, [open]);

  // Tecla ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const nq = normalize(q);
    return ITEMS.filter((it) =>
      normalize(`${it.title} ${it.type}`).includes(nq)
    ).slice(0, 20);
  }, [q]);

  function go(to, title) {
    // guarda “reciente”
    try {
      const next = [
        { title, to },
        ...recents.filter((r) => r.to !== to),
      ].slice(0, MAX_RECENTS);
      setRecents(next);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {}
    nav(to);
    onClose?.();
  }

  // Resalte simple de coincidencias
  function highlight(text) {
    if (!q.trim()) return text;
    const t = String(text);
    const nq = normalize(q);
    const nt = normalize(t);
    const idx = nt.indexOf(nq);
    if (idx < 0) return t;
    return (
      <>
        {t.slice(0, idx)}
        <mark className="hl">{t.slice(idx, idx + q.length)}</mark>
        {t.slice(idx + q.length)}
      </>
    );
  }

  // Manejo de teclado en la lista
  const onListKey = (e) => {
    if (!open) return;
    const n = (results.length || 0) || (recents.length || 0);
    if (!n) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + n) % n);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const list = results.length ? results : recents;
      const chosen = list[active];
      if (chosen) go(chosen.to, chosen.title);
    }
  };

  if (!visible) return null;

  const showingResults = q.trim().length > 0 && results.length > 0;
  const showingRecents = !q.trim() && recents.length > 0;

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      onKeyDown={onListKey}
    >
      <style>{css}</style>

      {/* sentinelas para trap focus */}
      <button ref={firstFocusRef} className="sr-only" onFocus={() => inputRef.current?.focus()}>
        .
      </button>

      <div
        ref={panelRef}
        className="panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="head">
          <FaSearch className="ico" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Busca programas o páginas…"
            className="q"
            aria-label="Buscar"
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        {/* Resultados */}
        <div
          className="list"
          role="listbox"
          aria-label={showingResults ? "Resultados" : showingRecents ? "Búsquedas recientes" : "Sugerencias"}
        >
          {!q.trim() && !showingRecents && (
            <div className="empty">Escribe para buscar. Ej: “PAES”, “Inscripción”, “LSCh”.</div>
          )}

          {showingRecents && (
            <>
              <div className="section-title">Recientes</div>
              {recents.map((r, i) => (
                <button
                  key={r.to}
                  role="option"
                  aria-selected={i === active}
                  className={"row" + (i === active ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to, r.title)}
                  title={r.title}
                >
                  <div className="title">{r.title}</div>
                  <div className="type">Reciente</div>
                </button>
              ))}
            </>
          )}

          {showingResults && (
            <>
              <div className="section-title">Resultados</div>
              {results.map((r, i) => (
                <button
                  key={r.to}
                  role="option"
                  aria-selected={i === active}
                  className={"row" + (i === active ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to, r.title)}
                  title={r.title}
                >
                  <div className="title">{highlight(r.title)}</div>
                  <div className="type">{r.type}</div>
                </button>
              ))}
            </>
          )}

          {q.trim() && !results.length && (
            <div className="empty">Sin resultados para “{q}”.</div>
          )}
        </div>
      </div>

      <button ref={lastFocusRef} className="sr-only" onFocus={() => inputRef.current?.focus()}>
        .
      </button>
    </div>
  );
}

/* ---------- CSS local ---------- */
const css = `
:root{
  --bg: rgba(2,6,23,.60);
  --panel:#0e1424; --bd:#1f2a44;
  --ink:#eaf2ff; --muted:#9fb3c8;
  --indigo:#5850EC; --hover:#15203a;
}
html.no-scroll, body.no-scroll{ overflow:hidden; }

/* overlay */
.search-overlay{
  position:fixed; inset:0; z-index:4000;
  display:flex; align-items:flex-start; justify-content:center;
  padding:24px; background:var(--bg); backdrop-filter: blur(4px);
  animation: fadeIn .12s ease-out both;
}
@keyframes fadeIn{ from{ opacity:0 } to{ opacity:1 } }

/* panel */
.panel{
  width:min(720px, 96vw);
  border:1px solid var(--bd); border-radius:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  color:var(--ink);
  box-shadow:0 22px 60px rgba(2,6,23,.45);
  overflow:hidden;
}

/* header */
.head{
  display:flex; align-items:center; gap:10px;
  padding:12px 14px; border-bottom:1px solid var(--bd);
}
.ico{ color:#9fb3c8 }
.q{
  flex:1; background:transparent; border:0; outline:none; color:var(--ink);
  font-size:.95rem;
}
.kbd{
  font-size:.75rem; color:var(--muted);
  border:1px solid var(--bd); padding:.1rem .4rem; border-radius:6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* list */
.list{
  max-height:min(60vh, 520px);
  overflow:auto;
}
.section-title{
  padding:8px 14px;
  color:#cbd5e1; font-weight:800; font-size:.78rem; letter-spacing:.2px;
}
.row{
  display:flex; align-items:center; justify-content:space-between;
  width:100%; padding:10px 14px; background:transparent; border:0;
  text-align:left; cursor:pointer;
  transition: background .12s ease, border-left-color .12s ease;
  border-left:4px solid transparent;
}
.row:hover{ background:var(--hover); }
.row.active{ background:rgba(88,80,236,.10); border-left-color: var(--indigo); }
.title{ font-weight:800; color:#fff }
.type{ color:#9fb3c8; font-size:.82rem; }

.empty{
  padding:14px; color:#9fb3c8; font-size:.92rem;
}

.hl{
  background: rgba(88,80,236,.28);
  color:#fff; padding:0 .1rem; border-radius:3px;
}

/* a11y util */
.sr-only{
  position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden;
  clip:rect(0,0,0,0); white-space:nowrap; border:0;
}
`;