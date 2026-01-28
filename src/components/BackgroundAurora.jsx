// src/components/BackgroundAurora.jsx
import React from 'react';

export default function BackgroundAurora() {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    // Verificar si es móvil inicialmente
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Listener para cambios de tamaño
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Renderizado estático y liviano para móviles
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
         <div className="absolute inset-0 bg-gradient-to-b from-background via-lael-pink/5 to-background"></div>
      </div>
    );
  }

  // Renderizado animado completo para Desktop
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Orbe Rosa (Idiomas) moviéndose */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lael-pink/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob will-change-transform"></div>
      
      {/* Orbe Dorado (PAES) moviéndose */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lael-gold/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000 will-change-transform"></div>
      
      {/* Orbe Azul (Institucional) abajo */}
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-lael-blue/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000 will-change-transform"></div>
      
      {/* Malla de ruido para textura (hace que no se vea plano) */}
      <div className="absolute inset-0 bg-[url('/textures/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
}