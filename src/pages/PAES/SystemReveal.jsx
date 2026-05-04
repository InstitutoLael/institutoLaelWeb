import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

// Variants for the container that wraps the whole step 2
const containerVariants = {
  hidden: { opacity: 0, y: 80, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      delay: 0.3,
      ease,
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Simple child variant applied to each inner block (header and children)
const childVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function SystemReveal({ children }) {
  return (
    <motion.section
      id="estrategia-layer"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.2, delay: 0.3, ease }}
      className="w-full px-6 py-32 lg:py-48 min-h-screen flex flex-col items-center"
    >
      <motion.div variants={childVariant} className="w-full max-w-5xl">
        <header className="text-center mb-24">
          <p className="text-lael-accent text-[11px] tracking-[0.2em] uppercase mb-4">Fase 02</p>
          <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Arquitectura de Rendimiento</h2>
        </header>
      </motion.div>
      <motion.div variants={childVariant}>
        {children}
      </motion.div>
    </motion.section>
  );
}
