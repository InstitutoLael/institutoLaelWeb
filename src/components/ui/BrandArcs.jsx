import React from 'react';

// Arcos de la marca: los mismos trazos redondeados de las portadas de las
// planificaciones de Lael, en versión sutil para las secciones azules.
// Van detrás del contenido (aria-hidden) y no reciben clics.
//
// variant: 'corners' (esquinas, para portadas) | 'side' (un costado, para
// franjas más bajas). color: el color del programa (por defecto el de la
// página, var(--programa)).
export default function BrandArcs({ variant = 'corners', color = 'var(--programa)', className = '' }) {
  const stroke = { fill: 'none', strokeLinecap: 'round', strokeWidth: 26 };
  if (variant === 'side') {
    return (
      <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-y-0 right-0 h-full w-auto opacity-90 ${className}`} viewBox="0 0 300 400" preserveAspectRatio="xMaxYMid slice">
        <path d="M300 40 C 210 50, 180 120, 230 170" stroke="rgba(255,255,255,0.07)" {...stroke} />
        <path d="M290 260 C 220 250, 200 320, 250 380" stroke={color} strokeOpacity="0.35" {...stroke} />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      {/* arriba a la izquierda */}
      <path d="M-40 120 C 60 60, 160 70, 210 20" stroke="rgba(255,255,255,0.07)" {...stroke} />
      <path d="M40 330 C 90 280, 80 220, 30 190" stroke={color} strokeOpacity="0.28" {...stroke} />
      {/* arriba a la derecha */}
      <path d="M980 -20 C 1000 70, 1090 110, 1170 80" stroke={color} strokeOpacity="0.32" {...stroke} />
      <path d="M1150 220 C 1190 260, 1230 250, 1260 210" stroke="rgba(255,255,255,0.08)" {...stroke} />
      {/* abajo */}
      <path d="M1080 820 C 1090 720, 1160 680, 1240 700" stroke="rgba(255,255,255,0.07)" {...stroke} />
      <path d="M-30 700 C 40 650, 110 690, 120 780" stroke="rgba(255,255,255,0.06)" {...stroke} />
      <path d="M1195 470 l -35 -60 M1195 470 l 50 -20 M1195 470 l 20 60" stroke={color} strokeOpacity="0.22" {...stroke} strokeWidth="20" />
    </svg>
  );
}
