import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function NotFound() {
  return (
    <div className="w-full overflow-x-clip font-sans">
      <section
        className="relative -mt-20 min-h-[85vh] flex items-center justify-center px-5 sm:px-6 pt-36 sm:pt-40 pb-20 sm:pb-28 text-white"
        style={{ backgroundColor: "#071D49" }}
      >
        <div className="text-center max-w-2xl mx-auto">
          <motion.h1
            {...fade(0)}
            className="font-display font-black text-[6.5rem] sm:text-[9rem] lg:text-[11rem] leading-none tracking-tighter text-[#D7E400] mb-6"
          >
            404
          </motion.h1>

          <motion.h2
            {...fade(0.1)}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight mb-5"
          >
            Esta página no existe.
          </motion.h2>

          <motion.p
            {...fade(0.2)}
            className="text-white/75 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
          >
            Puede que el enlace esté mal escrito o que la página se haya movido. Vuelve al inicio o revisa el preu PAES.
          </motion.p>

          <motion.div
            {...fade(0.3)}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="w-full sm:w-auto min-h-[52px] px-8 bg-[#D7E400] text-[#071D49] hover:bg-white rounded-2xl flex items-center justify-center gap-2 font-display font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-colors active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D7E400]/50"
            >
              <Home size={18} />
              Volver al Inicio
            </Link>

            <Link
              to="/paes"
              className="w-full sm:w-auto min-h-[52px] px-8 border-2 border-white/30 text-white hover:border-white hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2 font-display font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-colors active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <Compass size={18} className="text-[#D7E400]" />
              Ver PAES
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
