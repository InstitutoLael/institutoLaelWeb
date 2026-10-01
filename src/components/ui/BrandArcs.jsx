import React from 'react';

// Trazos de la marca para las secciones azules (detrás del contenido, sin
// clics): un arco blanco muy tenue y la onda fina en el color del programa,
// el mismo lenguaje de las portadas.
//
// variant: 'corners' (secciones altas) | 'side' (franjas, va a un costado).
// color: el color del programa (por defecto el de la página, var(--programa)).
export default function BrandArcs({ variant = 'corners', color = 'var(--programa)', className = '' }) {
  if (variant === 'side') {
    return (
      <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-y-0 right-0 h-full w-auto ${className}`} viewBox="0 0 300 400" preserveAspectRatio="xMaxYMid meet">
        <path d="M320 30 C 230 40 200 110 250 160" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="22" strokeLinecap="round" />
        <path d="M300 380 C 230 360 190 300 240 250 C 280 210 250 170 210 160" fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMax slice">
      <path d="M940 -30 C 970 90 1080 130 1240 100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="26" strokeLinecap="round" />
      <path d="M-20 760 C 120 760 170 690 260 700" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="22" strokeLinecap="round" />
      <path d="M760 820 C 860 760 880 650 980 650 C 1080 650 1100 720 1160 680 C 1195 655 1205 610 1200 560" fill="none" stroke={color} strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
