import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function HeroIdiomas({ onConfigure }) {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-lael-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease }}
        className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-8"
      >
        Instituto Lael · Programa de Idiomas
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl"
      >
        No aprendes idiomas.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light via-lael-accent to-lael-light/50">
          Ejecutas sistemas de comunicación.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease }}
        className="mt-8 text-lael-muted text-sm tracking-[0.1em] font-light max-w-lg mx-auto uppercase"
      >
        Inglés · Coreano · Español para Expats
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.8, ease }}
        onClick={onConfigure}
        className="mt-16 bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-10 py-4 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-lael-primary transition-all duration-500"
      >
        Configurar mi programa
      </motion.button>
    </section>
  );
}
