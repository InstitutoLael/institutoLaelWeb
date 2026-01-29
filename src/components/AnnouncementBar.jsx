import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFire } from 'react-icons/fa';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-red-600 to-rose-600 text-white relative z-50"
      >
        <div className="container mx-auto px-6 py-2 flex items-center justify-center relative">
          <a href="#mundos" className="text-[10px] md:text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
            <FaFire className="text-yellow-300 animate-pulse" />
            Matrículas 2026 Abiertas. ¡Asegura tu cupo con precio de lanzamiento!
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaTimes size={10} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
