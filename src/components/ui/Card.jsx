
import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverEffect = false, ...props }) {
  const baseStyles = "bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-xl relative overflow-hidden";
  const hoverStyles = hoverEffect ? "hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-300" : "";

  return (
    <motion.div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Subtle Noise/Gradient can go here if needed in future */}
      {children}
    </motion.div>
  );
}
