import React from 'react';
import { Helmet } from 'react-helmet-async';
import DiagnosticFlow from '../components/Diagnostic/DiagnosticFlow';

export default function DiagnosticPage() {
  return (
    <main className="w-full bg-[#F4F4F4] text-[#071D49] min-h-screen overflow-x-clip font-sans">
      <Helmet>
        <title>Diagnóstico | Instituto Lael</title>
        <meta name="description" content="Responde unas preguntas rápidas y te decimos por dónde partir: preu PAES, nivelación de estudios, idiomas o cursos para empresas." />
      </Helmet>

      <section className="relative">
        <DiagnosticFlow />
      </section>
    </main>
  );
}
