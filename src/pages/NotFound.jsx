import React from "react";
import { Link } from "react-router-dom";
import { FaCompass, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-[#050505] text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-lg">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl shadow-indigo-500/10">
          <FaCompass className="text-4xl text-indigo-400 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-tight">
          Te has salido de la <span className="text-indigo-500">Órbita</span>
        </h1>
        
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Esta coordenada no existe en nuestro sistema solar educativo. 
          Vuelve al Centro de Mando antes de que te pierdas en el espacio profundo.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs shadow-lg shadow-white/10"
        >
          <FaArrowLeft /> Volver al Centro de Mando
        </Link>
      </div>
    </div>
  );
}