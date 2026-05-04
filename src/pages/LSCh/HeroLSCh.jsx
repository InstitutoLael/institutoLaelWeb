import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function HeroLSCh() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-lael-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease }}
        className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-8"
      >
        Instituto Lael · Lengua de Señas Chilena
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl"
      >
        El idioma que elimina barreras.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease }}
        className="mt-8 text-lael-muted text-base lg:text-lg max-w-xl mx-auto leading-relaxed"
      >
        No es aprender señas. Es aprender a comunicarte con quienes el mundo ignora.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.9, ease }}
        className="mt-6 flex gap-6 justify-center"
      >
        <span className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase">Ley 21.015</span>
        <span className="text-lael-muted/20">·</span>
        <span className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase">Cultura Sorda</span>
        <span className="text-lael-muted/20">·</span>
        <span className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase">Instructora Nativa</span>
      </motion.div>
    </section>
  );
}
