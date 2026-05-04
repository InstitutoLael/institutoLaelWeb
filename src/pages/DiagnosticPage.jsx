import React from 'react';
import { Helmet } from 'react-helmet-async';
import DiagnosticFlow from '../components/Diagnostic/DiagnosticFlow';

export default function DiagnosticPage() {
  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Diagnóstico Táctico | Ingeniería del Rendimiento Lael</title>
        <meta name="description" content="No eres tú, es el sistema. Descubre por qué no estás mejorando con nuestro test de arquitectura de rendimiento académico." />
      </Helmet>
      
      <section className="relative pt-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-lael-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-lael-rust/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <DiagnosticFlow />
      </section>
    </main>
  );
}
