import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function SystemReveal({ children }) {
  return (
    <motion.section 
      id="estrategia-layer" 
      initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease }}
      className="w-full px-6 py-32 lg:py-48 min-h-screen flex flex-col items-center"
    >
      <div className="w-full max-w-5xl">
        <header className="text-center mb-24">
          <p className="text-lael-accent text-[11px] tracking-[0.2em] uppercase mb-4">Fase 02</p>
          <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Arquitectura de Rendimiento</h2>
        </header>
        {children}
      </div>
    </motion.section>
  );
}
