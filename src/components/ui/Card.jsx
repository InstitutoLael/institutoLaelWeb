import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverEffect = false, ...props }) {
  const baseStyles = "bg-lael-secondary rounded-2xl relative overflow-hidden transition-all duration-500 border border-transparent";
  
  // Cinematic Hover: Glow suave, elevación, borde iluminado
  const hoverStyles = hoverEffect 
    ? "hover:bg-lael-elevated hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(198,166,107,0.05)] hover:border-lael-accent/20" 
    : "";

  return (
    <motion.div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
