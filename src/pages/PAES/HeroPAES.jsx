import React from 'react';

export default function HeroPAES() {
  return (
    <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-lael-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <h1 className="font-display text-4xl lg:text-7xl text-lael-light font-bold leading-tight tracking-tight max-w-4xl relative z-10">
        No es un preuniversitario.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light via-lael-accent to-lael-light/50">Es un sistema de rendimiento.</span>
      </h1>
      
      <p className="mt-8 text-lael-muted text-sm lg:text-base tracking-[0.1em] font-light max-w-xl mx-auto uppercase">
        Diagnóstico · Estrategia · Activación
      </p>
    </section>
  );
}
