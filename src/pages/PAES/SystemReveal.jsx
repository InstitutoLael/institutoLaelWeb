import React from 'react';

export default function SystemReveal({ children }) {
  // Skeleton version just renders children
  return (
    <section>
      <header>
        <h2>Capa 2: Estrategia</h2>
        <p>Arquitectura de Rendimiento</p>
      </header>
      {children}
    </section>
  );
}
