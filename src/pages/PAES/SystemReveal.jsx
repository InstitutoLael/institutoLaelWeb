import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

// The outer section enters as one cinematic unit:
// blur lifts, y rises — "access granted" feeling
const sectionVariants = {
  hidden: { opacity: 0, y: 100, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      ease,
      // children stagger handled individually via their own delay props
    },
  },
};

// Each child block appears sequentially after the section lands
export const revealChildVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      delay: custom,
      ease,
    },
  }),
};

export default function SystemReveal({ children }) {
  return (
    <motion.section
      id="estrategia-layer"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="w-full px-6 pt-32 lg:pt-48 flex flex-col items-center"
    >
      {/* Title block — first to appear */}
      <motion.header
        variants={revealChildVariant}
        custom={0.2}
        className="w-full max-w-5xl text-center mb-24"
      >
        <p className="text-lael-accent text-[11px] tracking-[0.2em] uppercase mb-4">Fase 02</p>
        <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Arquitectura de Rendimiento</h2>
      </motion.header>

      {/* Module selector — second */}
      <motion.div
        variants={revealChildVariant}
        custom={0.55}
        className="w-full max-w-5xl"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
