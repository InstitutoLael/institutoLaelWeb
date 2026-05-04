import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import MethodSteps from '../components/MethodSteps';
import CTASection from '../components/CTASection';
import { metodoData } from '../data/metodo';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Instituto Lael | Sistema de Alto Rendimiento Académico</title>
        <meta name="description" content="No nacimos para preparar pruebas. Nacimos para cambiar resultados. Conoce el Sistema Lael de alto rendimiento académico." />
      </Helmet>

      {/* 1. Impacto */}
      <HeroSection />

      {/* 2 & 3 & 4. Autoridad, Diferenciación y Método */}
      {/* Pasamos los pilares del método como features */}
      <FeatureGrid features={metodoData.pillars} />

      {/* 5. Proceso Cinemático */}
      <MethodSteps steps={metodoData.pillars} />

      {/* 6. Conversión */}
      <CTASection 
        title="Comienza tu proceso hoy"
        subtitle="No aceptamos a cualquiera, buscamos a quienes están dispuestos a seguir el sistema y obtener resultados reales."
        btnText="Postula ahora"
        btnLink="/postulacion"
      />
    </>
  );
}
