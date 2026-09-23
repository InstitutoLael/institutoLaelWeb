import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingIdiomas from './LandingIdiomas';

export default function Idiomas() {
  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Helmet>
        <title>Inglés y Español para Expats - Instituto Lael</title>
        <meta name="description" content="Cursos online de Inglés y Español para Expats. Clases en vivo con docente, donde hablas y practicas desde la primera clase." />
      </Helmet>
      <LandingIdiomas />
    </div>
  );
}

