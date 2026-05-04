import React from 'react';

export default function SystemReveal({ children }) {
  // Skeleton version just renders children
  return (
    <section id="estrategia-layer" className="w-full px-6 py-32 lg:py-48 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="text-center mb-24">
          <p className="text-lael-accent text-[11px] tracking-[0.2em] uppercase mb-4">Fase 02</p>
          <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Arquitectura de Rendimiento</h2>
        </header>
        {children}
      </div>
    </section>
  );
}
