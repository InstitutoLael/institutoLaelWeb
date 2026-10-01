import React from 'react';

// Cinta de texto que corre sola (decorativa: lo que dice ya está en la
// página). Se pausa con el mouse encima y se detiene con "reducir movimiento".
export function Destello({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0Z" fill="currentColor" />
    </svg>
  );
}

export default function Marquee({ items, className = '', itemClassName = '', reverse = false, speed }) {
  const fila = (
    <div className="flex items-center shrink-0">
      {items.map((t, i) => (
        <span key={i} className={`flex items-center ${itemClassName}`}>
          <span className="whitespace-nowrap">{t}</span>
          <Destello className="w-[0.55em] h-[0.55em] mx-[0.5em] shrink-0" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden="true" className={`lael-marquee-wrap overflow-hidden select-none ${className}`}>
      <div className={`lael-marquee flex w-max ${reverse ? 'lael-marquee-rev' : ''}`} style={speed ? { animationDuration: `${speed}s` } : undefined}>
        {fila}
        {fila}
      </div>
    </div>
  );
}
