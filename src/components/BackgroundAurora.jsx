// src/components/BackgroundAurora.jsx
import React from 'react';

export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Orbe Rosa (Idiomas) moviéndose */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lael-pink/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      
      {/* Orbe Dorado (PAES) moviéndose */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lael-gold/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Orbe Azul (Institucional) abajo */}
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-lael-blue/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Malla de ruido para textura (hace que no se vea plano) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
}