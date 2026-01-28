import React from "react";
import { Link } from "react-router-dom";
import { FaCompass, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="inline-flex p-8 bg-amber-500/10 border border-amber-500/20 rounded-[3rem] text-amber-500 mb-10 shadow-2xl shadow-amber-500/10"
                >
                    <FaExclamationTriangle size={80} />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter">
                    ¡Ups! Te <span className="text-amber-500">equivocaste</span> de sala
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed max-w-xl mx-auto">
                    La página que buscas no existe o fue movida. No te preocupes, ¡sucede hasta en las mejores clases!
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-white/5 uppercase tracking-widest text-xs"
                    >
                        <FaHome size={18} /> Volver al Inicio
                    </Link>

                    <Link
                        to="/aula"
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95 uppercase tracking-widest text-xs"
                    >
                        <FaUserGraduate size={18} /> Ir a mi Aula
                    </Link>
                </div>

                <div className="mt-20 opacity-20 flex justify-center gap-8 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">
                    <span>Error 404</span>
                    <div className="w-px h-3 bg-white/20"></div>
                    <span>Instituto Lael 2026</span>
                </div>
            </div>
        </div>
    );
}