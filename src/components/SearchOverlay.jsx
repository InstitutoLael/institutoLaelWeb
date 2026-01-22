// src/components/SearchOverlay.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- ÍCONOS NATIVOS (Sin librerías pesadas) ---
const ICONS = {
  search: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  clock: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  enter: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  trash: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
};

const ITEMS = [
  { title: "Inicio", to: "/", type: "Página" },
  { title: "PAES", to: "/paes", type: "Programa" },
  { title: "Lengua de Señas (LSCh)", to: "/lsch", type: "Programa" },
  { title: "Idiomas", to: "/idiomas", type: "Programa" },
  { title: "Empresas", to: "/empresas", type: "Página" },
  { title: "Nosotros", to: "/nosotros", type: "Página" },
  { title: "Trabaja con nosotros", to: "/trabaja", type: "Página" },
  { title: "Contacto", to: "/contacto", type: "Página" },
];

const normalize = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
const RECENTS_KEY = "lael-search-recents";
const MAX_RECENTS = 5;

export default function SearchOverlay({ open, onClose, items = ITEMS }) {
  const nav = useNavigate();
  const inputRef = useRef(null);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [recents, setRecents] = useState([]);

  // Debounce input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 100); // 100ms es más snappy
    return () => clearTimeout(t);
  }, [q]);

  // Manejo de apertura/cierre y scroll lock
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden"; // Bloqueo nativo más seguro
      try {
        const raw = localStorage.getItem(RECENTS_KEY);
        if (raw) setRecents(JSON.parse(raw));
      } catch { }
    } else {
      const timer = setTimeout(() => setVisible(false), 200); // Espera animación de salida
      document.body.style.overflow = "";
      setQ("");
      setActive(0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Filtrado
  const results = useMemo(() => {
    if (!debouncedQ.trim()) return [];
    const nq = normalize(debouncedQ);
    return (items || [])
      .filter((it) => normalize(`${it.title} ${it.type}`).includes(nq))
      .slice(0, 8); // Limitamos a 8 para que no sea infinito
  }, [debouncedQ, items]);

  const showingResults = debouncedQ.trim().length > 0 && results.length > 0;
  const showingRecents = !debouncedQ.trim() && recents.length > 0;

  function go(to, title) {
    try {
      const next = [{ title, to }, ...recents.filter((r) => r.to !== to)].slice(0, MAX_RECENTS);
      setRecents(next);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch { }
    nav(to);
    onClose?.();
  }

  // Highlight de texto coincidente
  function highlight(text) {
    if (!debouncedQ.trim()) return text;
    const nq = normalize(debouncedQ);
    const nt = normalize(text);
    const idx = nt.indexOf(nq);
    if (idx < 0) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="hl">{text.slice(idx, idx + debouncedQ.length)}</span>
        {text.slice(idx + debouncedQ.length)}
      </>
    );
  }

  // Navegación por teclado
  const onListKey = (e) => {
    const list = showingResults ? results : recents;
    const n = list.length;
    if (!n) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + n) % n);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = list[active];
      if (chosen) go(chosen.to, chosen.title);
    }
  };

  if (!visible && !open) return null;

  return (
    <div
      className={`search-overlay ${open ? 'open' : 'closing'}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      onKeyDown={onListKey}
    >
      <style>{css}</style>

      <div className="panel" onClick={(e) => e.stopPropagation()}>
        {/* Input Header */}
        <div className="head">
          <span className="search-icon">{ICONS.search}</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            placeholder="¿Qué estás buscando?"
            className="q-input"
            autoComplete="off"
            autoCorrect="off"
          />
          <div className="esc-hint">
            <kbd>ESC</kbd>
          </div>
        </div>

        {/* Body */}
        <div className="body" role="listbox">

          {/* STATE: Empty / Instrucciones */}
          {!debouncedQ && !showingRecents && (
            <div className="msg-empty">
              <p>Prueba buscando <b>"PAES"</b>, <b>"Coreano"</b> o <b>"Empresas"</b>...</p>
            </div>
          )}

          {/* STATE: Recientes */}
          {showingRecents && (
            <>
              <div className="group-head">
                <span>Recientes</span>
                <button className="clear-btn" onClick={() => { setRecents([]); localStorage.removeItem(RECENTS_KEY); }}>
                  {ICONS.trash} Borrar
                </button>
              </div>
              {recents.map((r, i) => (
                <div
                  key={r.to}
                  className={`item ${i === active ? "active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to, r.title)}
                >
                  <span className="item-icon rec">{ICONS.clock}</span>
                  <div className="item-content">
                    <span className="item-title">{r.title}</span>
                    <span className="item-type">Historial</span>
                  </div>
                  {i === active && <span className="enter-hint">{ICONS.enter}</span>}
                </div>
              ))}
            </>
          )}

          {/* STATE: Resultados */}
          {showingResults && (
            <>
              <div className="group-head">Resultados</div>
              {results.map((r, i) => (
                <div
                  key={r.to}
                  className={`item ${i === active ? "active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to, r.title)}
                >
                  {/* Icono dinámico según tipo */}
                  <span className={`item-icon ${r.type === 'Programa' ? 'prog' : 'page'}`}>
                    {r.type === 'Programa' ? '⚡' : '📄'}
                  </span>
                  <div className="item-content">
                    <span className="item-title">{highlight(r.title)}</span>
                    <span className="item-type">{r.type}</span>
                  </div>
                  {i === active && <span className="enter-hint">{ICONS.enter}</span>}
                </div>
              ))}
            </>
          )}

          {/* STATE: No encontrado */}
          {debouncedQ && !results.length && (
            <div className="msg-empty">
              No encontramos nada para "{debouncedQ}" 😔
            </div>
          )}
        </div>

        {/* Footer pequeño */}
        <div className="footer-hint">
          <span><b>↑↓</b> navegar</span>
          <span><b>↵</b> seleccionar</span>
        </div>
      </div>
    </div>
  );
}

// ESTILOS "COMMAND PALETTE" STYLE
const css = `
  .search-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(15, 23, 42, 0.4); /* Fondo semi transparente */
    backdrop-filter: blur(8px); /* Blur fuerte al fondo */
    display: flex; justify-content: center; align-items: flex-start;
    padding-top: 15vh;
    opacity: 0; transition: opacity 0.2s ease;
  }
  .search-overlay.open { opacity: 1; }
  
  .panel {
    width: 100%; max-width: 600px;
    background: #0f172a; /* Slate 900 */
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    overflow: hidden;
    transform: scale(0.98); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .search-overlay.open .panel { transform: scale(1); }

  /* HEADER & INPUT */
  .head {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .search-icon { color: #94a3b8; display: flex; }
  
  .q-input {
    flex: 1; background: transparent; border: none; outline: none;
    font-size: 1.1rem; color: #fff; font-weight: 500;
  }
  .q-input::placeholder { color: #475569; }

  .esc-hint kbd {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px; padding: 4px 8px;
    font-size: 0.7rem; color: #94a3b8; font-family: sans-serif;
    font-weight: 700;
  }

  /* BODY */
  .body {
    padding: 8px;
    max-height: 400px; overflow-y: auto;
  }

  .group-head {
    padding: 8px 12px;
    font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;
    display: flex; justify-content: space-between; align-items: center;
  }
  
  .clear-btn {
    background: none; border: none; color: #64748b; cursor: pointer;
    font-size: 0.7rem; display: flex; align-items: center; gap: 4px;
    padding: 2px 6px; border-radius: 4px;
  }
  .clear-btn:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

  /* ITEMS */
  .item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.1s ease;
    color: #cbd5e1;
  }
  .item.active {
    background: #3b82f6; /* Blue 500 - Highlight */
    color: #fff;
  }

  .item-icon {
    display: grid; place-items: center; width: 24px; height: 24px;
  }
  .item-icon.rec { opacity: 0.6; }
  .item-icon.prog { font-size: 1.1rem; }
  .item-icon.page { font-size: 1rem; opacity: 0.8; }

  .item-content { flex: 1; display: flex; flex-direction: column; }
  .item-title { font-weight: 500; font-size: 0.95rem; }
  .item-type { font-size: 0.75rem; opacity: 0.7; }
  .item.active .item-type { opacity: 0.9; color: #dbeafe; }

  .enter-hint { opacity: 0.8; animation: slideLeft 0.2s ease; }
  @keyframes slideLeft { from { transform: translateX(5px); opacity:0; } to { transform: translateX(0); opacity:0.8; }}

  /* TEXTO RESALTADO */
  .hl {
    background: rgba(255,255,255,0.2);
    color: inherit;
    border-radius: 2px;
    font-weight: 700;
  }
  .item.active .hl { background: rgba(255,255,255,0.3); color: #fff; }

  /* ESTADOS VACÍOS */
  .msg-empty {
    padding: 40px 0; text-align: center; color: #64748b; font-size: 0.9rem;
  }
  .msg-empty b { color: #94a3b8; }

  /* FOOTER */
  .footer-hint {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 8px 20px;
    display: flex; gap: 16px;
    background: rgba(15,23,42, 0.5);
  }
  .footer-hint span {
    font-size: 0.7rem; color: #64748b;
  }
  .footer-hint b {
    color: #94a3b8; background: rgba(255,255,255,0.1);
    padding: 1px 4px; border-radius: 4px; margin-right: 4px;
  }
`;