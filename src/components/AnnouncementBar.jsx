import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaFire } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-amber-600 to-amber-500 text-white relative z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs md:text-sm font-bold tracking-wide">
          
          <Link to="/paes" className="flex-1 text-center hover:underline hover:text-white/90 transition-all flex items-center justify-center gap-2">
            <FaFire className="animate-pulse" />
            <span>Matrículas 2026 Abiertas. ¡Cupos con precio de lanzamiento por tiempo limitado!</span>
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Cerrar anuncio"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
