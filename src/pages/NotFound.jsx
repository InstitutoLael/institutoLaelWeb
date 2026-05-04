import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lael-primary relative overflow-hidden text-lael-light font-sans">
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative inline-block"
        >
          <h1 className="text-[120px] md:text-[200px] font-display font-black leading-none text-lael-accent/20 tracking-tighter select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            404
          </h1>
          <h1 className="text-[80px] md:text-[120px] font-display font-black leading-none text-lael-light relative z-10 tracking-tighter">
            404
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-display font-bold mb-6 text-lael-light"
        >
          Te has desviado del camino.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lael-muted text-lg mb-10 max-w-lg mx-auto leading-relaxed"
        >
          La página que buscas no existe o quizás se mudó de ruta. No te preocupes, en Lael siempre hay sistemas alternativos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="group w-full md:w-auto px-8 py-4 bg-lael-accent text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all shadow-[0_4px_20px_rgba(196,151,62,0.3)] uppercase tracking-[0.15em] text-xs"
          >
            <Home size={18} />
            Volver al Inicio
          </Link>
          
          <Link
            to="/paes"
            className="group w-full md:w-auto px-8 py-4 bg-lael-secondary border border-lael-bd text-lael-light font-bold rounded-xl flex items-center justify-center gap-2 hover:border-lael-accent transition-colors uppercase tracking-[0.15em] text-xs hover:-translate-y-1"
          >
            <Compass size={18} className="text-lael-accent group-hover:rotate-45 transition-transform" />
            Explorar PAES
          </Link>
        </motion.div>
      </div>
    </div>
  );
}