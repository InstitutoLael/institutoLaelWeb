import { useState } from "react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[80] bg-gradient-to-r from-indigo-950 to-indigo-900 border-b border-white/10 text-white font-sans text-sm py-2.5">
      <div className="flex items-center justify-center gap-3 flex-wrap text-center pr-10 max-w-7xl mx-auto px-4 sm:px-6">
        <span className="bg-amber-500 text-black font-extrabold text-[0.7rem] px-2 py-0.5 rounded uppercase tracking-wide hidden sm:inline-block">
          ÚLTIMOS CUPOS
        </span>
        <p className="m-0 text-slate-200">
          Admisión 2026 abierta. Matricúlate con precio de preventa hasta el <strong>30 de Diciembre</strong>.
        </p>
        <Link to="/inscripcion" className="text-white font-bold decoration-0 border-b border-white/40 transition-colors hover:text-amber-500 hover:border-amber-500">
          Asegurar mi cupo &rarr;
        </Link>
      </div>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none text-white/60 text-lg cursor-pointer p-1.5 z-[100] hover:text-white transition-colors"
        onClick={() => setVisible(false)}
        aria-label="Cerrar anuncio"
      >
        ✕
      </button>
    </div>
  );
}