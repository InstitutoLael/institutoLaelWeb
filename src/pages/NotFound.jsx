import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden text-white font-sans">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative inline-block"
        >
          <h1 className="text-[150px] md:text-[200px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-white to-pink-500 tracking-tighter select-none opacity-20 blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            404
          </h1>
          <h1 className="text-[80px] md:text-[120px] font-black leading-none text-white relative z-10 tracking-tighter mix-blend-overlay">
            404
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-6 text-slate-100"
        >
          Te has desviado del camino.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed"
        >
          La página que buscas no existe o quizás se mudó a otro universo educativo.
          No te preocupes, en Lael siempre hay rutas alternativas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="group w-full md:w-auto px-8 py-3 bg-white text-black font-extrabold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10"
          >
            <Home size={18} />
            Volver al Inicio
          </Link>
          
          <Link
            to="/paes"
            className="group w-full md:w-auto px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <Compass size={18} className="text-indigo-400 group-hover:rotate-45 transition-transform" />
            Explorar PAES
          </Link>

          <Link
            to="/contacto"
            className="group w-full md:w-auto px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <Map size={18} className="text-pink-400" />
            Mapa del Sitio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}