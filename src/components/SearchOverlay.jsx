// src/components/SearchOverlay.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export default function SearchOverlay({ open, onClose }) {
  const nav = useNavigate();
  const inputRef = useRef(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  // foco + Esc
  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 0);
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  // datos simples (amplías luego)
  const items = useMemo(
    () => [
      { title: "Inicio", to: "/", type: "Página" },
      { title: "PAES", to: "/paes", type: "Programa" },
      { title: "Lengua de Señas (LSCh)", to: "/lsch", type: "Programa" },
      { title: "Idiomas", to: "/idiomas", type: "Programa" },
      { title: "Inscripción", to: "/inscripcion", type: "Página" },
      { title: "Nosotros", to: "/nosotros", type: "Página" },
    ],
    []
  );

  const results = useMemo(() => {
    const term = norm(q);
    if (!term) return [];
    return items
      .map((it) => ({ it, s: score(term, it) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10)
      .map((x) => x.it);
  }, [q, items]);

  // navegación con flechas + Enter
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const r = results[active];
        if (r) {
          nav(r.to);
          onClose?.();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, nav, onClose]);

  if (!open) return null;

  return (
    <div
      className="srch-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <style>{css}</style>

      <div className="srch-card" onClick={(e) => e.stopPropagation()}>
        <div className="srch-top">
          <div className="srch-lens" aria-hidden>
            🔎
          </div>
          <input
            ref={inputRef}
            className="srch-input"
            placeholder="Busca páginas o programas…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
          />
          <span className="kbd" title="Cerrar">
            Esc
          </span>
        </div>

        {!q ? (
          <div className="srch-empty">Escribe para buscar</div>
        ) : results.length ? (
          <div className="srch-results">
            {results.map((r, i) => (
              <button
                key={r.to}
                type="button"
                className="srch-item"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  nav(r.to);
                  onClose?.();
                }}
              >
                <div className="srch-ico" aria-hidden>
                  🔗
                </div>
                <div className="srch-main">
                  <div className="srch-tit">{r.title}</div>
                  <div className="srch-type">{r.type}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="srch-empty">
            Sin resultados para “<span className="hl">{q}</span>”.
          </div>
        )}
      </div>
    </div>
  );
}

function score(q, it) {
  const hay = norm(`${it.title} ${it.type}`);
  let s = 0;
  if (hay.startsWith(q)) s += 3;
  if (hay.includes(q)) s += 2;
  q
    .split(/\s+/)
    .filter(Boolean)
    .forEach((t) => hay.includes(t) && (s += 1));
  return s;
}

/* ---------- CSS embebido, con tokens locales y light/dark ---------- */
const css = `
/* Tokens locales (evita blancos por variables sin definir) */
.srch-card{
  --card:#0e1424;      /* fondo tarjeta */
  --bd:#1f2a44;        /* borde */
  --text:#ffffff;      /* texto principal */
  --muted:#cfe0ff;     /* texto suave */
  --accent:#5850EC;    /* índigo */
  --accent-2:#16A34A;  /* verde */
}
@media (prefers-color-scheme: light){
  .srch-card{
    --card:#ffffff;
    --bd:#e5e7eb;
    --text:#0b1220;
    --muted:#475569;
  }
}

/* Overlay por encima del navbar */
.srch-overlay{
  position:fixed; inset:0; z-index:4000;
  background:rgba(15,23,42,.55);
  backdrop-filter: blur(8px) saturate(140%);
  display:flex; padding:8vh 16px;
}

/* Tarjeta */
.srch-card{
  margin:auto; width:100%; max-width:720px; border-radius:16px;
  background:var(--card);
  border:1px solid var(--bd);
  box-shadow:0 24px 60px rgba(2,6,23,.35);
  overflow:hidden;
  color:var(--text);
}

/* Top */
.srch-top{
  display:flex; align-items:center; gap:12px;
  padding:12px 14px; border-bottom:1px solid var(--bd);
}
.srch-lens{ opacity:.9 }
.srch-input{
  flex:1; border:0; outline:none; font-size:16px; padding:6px 0;
  background:transparent; color:var(--text);
}
.srch-input::placeholder{ color: color-mix(in srgb, var(--muted), #ffffff 15%); }
.kbd{
  font:12px ui-monospace, SFMono-Regular, Menlo, monospace;
  padding:.22rem .42rem; border-radius:6px; border:1px solid var(--bd);
  color:var(--muted);
}

/* Resultados */
.srch-results{ max-height:50vh; overflow:auto; padding:8px; }
.srch-item{
  width:100%; text-align:left;
  display:flex; align-items:center; gap:10px; padding:10px;
  border-radius:10px; cursor:pointer; border:1px solid transparent;
  background:transparent; color:var(--text);
  transition: background .15s ease, border-color .15s ease, transform .12s ease;
}
.srch-item:hover{ transform: translateY(-1px); }
.srch-item[aria-selected="true"]{
  background:
    radial-gradient(400px 140px at -10% -20%, rgba(88,80,236,.18), transparent 60%),
    linear-gradient(180deg, color-mix(in srgb, var(--card), #0b1220 10%), var(--card));
  border-color: color-mix(in srgb, var(--accent), var(--bd) 60%);
  box-shadow: 0 0 0 2px rgba(88,80,236,.25) inset;
}

.srch-ico{
  width:28px; height:28px; display:grid; place-items:center;
  background: #101a2f; border-radius:8px; border:1px solid var(--bd);
}
@media (prefers-color-scheme: light){
  .srch-ico{ background:#f1f5f9; }
}

.srch-tit{ font-weight:800; letter-spacing:.2px; }
.srch-type{ font-size:12px; color:var(--muted); }

.srch-empty{
  padding:14px; color:var(--muted);
}
.hl{ color:#fff; text-decoration:underline; text-underline-offset:2px; }
@media (prefers-color-scheme: light){
  .hl{ color:#0b1220; }
}

/* Scrollbar sutil (soporta Chromium/Edge/Safari) */
.srch-results::-webkit-scrollbar{ height:10px; width:10px; }
.srch-results::-webkit-scrollbar-thumb{
  background: color-mix(in srgb, var(--bd), #ffffff 10%);
  border-radius:999px;
}
`;