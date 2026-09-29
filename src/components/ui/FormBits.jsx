import React from 'react';
import { motion } from 'framer-motion';

// Piezas compartidas de los formularios cortos (becas, lista de espera,
// encuesta): estilos de campos y el check animado de "¡Listo!".
export const INPUT = 'w-full rounded-xl border border-[#071D49]/20 bg-white px-4 min-h-[52px] text-base text-[#071D49] placeholder:text-[#071D49]/60 focus:outline-none focus:border-[#071D49] focus:ring-4 focus:ring-[#071D49]/10';
export const LABEL = 'block text-sm font-bold mb-1.5';
export const TEL_RE = /^[+\d][\d\s-]{7,18}$/;
export const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <input aria-label="No llenar" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  );
}

// Check que se dibuja solo: confirma que el envío llegó.
export function CheckAnimado({ size = 72, className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      className={className}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="34" fill="#D7E400" />
      <path d="M22 37.5 L32 47 L51 27" fill="none" stroke="#071D49" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="draw-path" style={{ '--len': 50, animationDelay: '0.25s' }} />
    </motion.svg>
  );
}

export function ErrorMsg({ id, children }) {
  if (!children) return null;
  return <p id={id} role="alert" className="text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{children}</p>;
}
