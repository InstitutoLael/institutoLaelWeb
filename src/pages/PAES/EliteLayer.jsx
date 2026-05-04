import React from 'react';

export default function EliteLayer() {
  return (
    <section id="activacion-layer" className="w-full px-6 py-32 lg:py-48 min-h-screen flex flex-col items-center justify-center border-t border-white/[0.02]">
      <div className="w-full max-w-4xl text-center relative z-10">
        <p className="text-lael-accent/50 text-[11px] tracking-[0.4em] uppercase mb-8">Nivel Avanzado</p>
        <h2 className="font-display text-4xl lg:text-5xl text-lael-light mb-8 leading-tight">
          Capa 3: Activación Elite
        </h2>
        <p className="text-lael-muted max-w-2xl mx-auto text-sm lg:text-base leading-relaxed tracking-wide mb-16">
          Mentoría estratégica 1:1, seguimiento táctico y alta exigencia académica. <br className="hidden lg:block"/>
          <span className="text-lael-light">Acceso restringido. Solo por postulación y validación de perfil.</span>
        </p>
        
        <button className="bg-transparent border border-lael-accent/30 text-lael-accent px-10 py-5 rounded-lg text-[10px] lg:text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent/5 transition-all duration-500">
          Enviar perfil a evaluación
        </button>
      </div>
    </section>
  );
}
