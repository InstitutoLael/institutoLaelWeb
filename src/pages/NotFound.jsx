import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LOGO_PATHS, Paloma } from "../components/ui/LaelLogo";

// 404: el logo quedó sin su paloma, que va volando por la pantalla.
const ease = [0.16, 1, 0.3, 1];
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});
const BTN = "inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full font-display font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-colors";

export default function NotFound() {
  return (
    <div className="w-full overflow-x-clip font-sans">
      <section className="grain relative -mt-20 min-h-[100svh] flex items-center bg-[#071D49] text-white overflow-hidden">
        {/* La paloma que se escapó */}
        <svg aria-hidden="true" viewBox="226 0 40 50" className="lael-404-dove absolute w-14 sm:w-20 pointer-events-none">
          <Paloma fill="#D7E400" />
        </svg>

        <div className="relative w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.p {...fade(0)} className="flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-8 text-white/70">
              <span className="text-[#D7E400]">Error 404</span>
              <span className="w-8 h-px bg-white/30" aria-hidden="true" />
              Página no encontrada
            </motion.p>
            <motion.h1 {...fade(0.1)} className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[2.8rem] sm:text-7xl lg:text-8xl mb-8">
              Esta página <span className="accent-serif text-[#D7E400]">se voló.</span>
            </motion.h1>
            <motion.p {...fade(0.2)} className="text-white/75 text-base sm:text-lg max-w-lg leading-relaxed mb-10">
              Puede que el enlace esté mal escrito o que la página se haya movido. Tu sueño sigue acá: vuelve al inicio o revisa el preu PAES.
            </motion.p>
            <motion.div {...fade(0.3)} className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className={`${BTN} bg-[#D7E400] text-[#071D49] hover:bg-white`}>
                Volver al inicio <ArrowRight size={16} />
              </Link>
              <Link to="/paes" className={`${BTN} border border-white/30 text-white hover:bg-white hover:text-[#071D49]`}>
                Ver el preu PAES
              </Link>
            </motion.div>
          </div>

          {/* El logo, sin paloma */}
          <motion.div {...fade(0.2)} className="lg:col-span-6" aria-hidden="true">
            <svg viewBox="0 0 290 132" className="w-full h-auto">
              {["onda", "ola", "ele"].map((k, i) => (
                <path key={k} d={LOGO_PATHS[k]} pathLength="1" className="lael-draw" style={{ animationDelay: `${0.3 + i * 0.15}s` }} fill="none" stroke="#FFFFFF" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" />
              ))}
              {["e", "eMedio"].map((k, i) => (
                <path key={k} d={LOGO_PATHS[k]} pathLength="1" className="lael-draw" style={{ animationDelay: `${0.75 + i * 0.15}s` }} fill="none" stroke="#D7E400" strokeWidth="9.5" strokeLinecap="round" />
              ))}
              <circle cx="232" cy="46" r="3" fill="none" stroke="#D7E400" strokeWidth="1.5" strokeDasharray="2 3" />
            </svg>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
