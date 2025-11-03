// src/components/SearchOverlay.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const items = [
  { title: "Inicio", to: "/", type: "Página" },
  { title: "PAES", to: "/paes", type: "Programa" },
  { title: "Lengua de Señas (LSCh)", to: "/lsch", type: "Programa" },
  { title: "Idiomas", to: "/idiomas", type: "Programa" },
  { title: "Inscripción", to: "/inscripcion", type: "Página" },
  { title: "Nosotros", to: "/nosotros", type: "Página" },
];

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export default function SearchOverlay({ open, onClose }) {
  const nav = useNavigate();
  const inputRef = useRef(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (!open) return;
    setVisible(true);
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  const results = items.filter((it) =>
    normalize(`${it.title} ${it.type}`).includes(normalize(q))
  );

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[4000] flex items-start justify-center bg-slate-900/60 backdrop-blur-sm p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="w-full max-w-lg bg-[#0e1424] text-slate-100 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <FaSearch className="text-slate-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Busca programas o páginas…"
            className="flex-1 bg-transparent border-0 outline-none text-sm placeholder-slate-400"
          />
          <kbd className="text-xs text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
            Esc
          </kbd>
        </div>

        {/* Resultados */}
        <div className="max-h-[50vh] overflow-y-auto divide-y divide-slate-800">
          {!q ? (
            <div className="p-4 text-slate-400 text-sm">
              Escribe para buscar
            </div>
          ) : results.length ? (
            results.map((r, i) => (
              <button
                key={r.to}
                onClick={() => {
                  nav(r.to);
                  onClose?.();
                }}
                onMouseEnter={() => setActive(i)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 text-sm transition
                  ${
                    i === active
                      ? "bg-indigo-600/10 border-l-4 border-indigo-500"
                      : "hover:bg-slate-800/40"
                  }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{r.title}</span>
                  <span className="text-slate-400 text-xs">{r.type}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-slate-400 text-sm">
              Sin resultados para “{q}”
            </div>
          )}
        </div>
      </div>
    </div>
  );
}