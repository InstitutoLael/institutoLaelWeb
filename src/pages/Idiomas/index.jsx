import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingIdiomas from './LandingIdiomas';

export default function Idiomas() {
  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Inglés y Español para Expats — Instituto Lael</title>
        <meta name="description" content="Programas de idiomas estratégicos. Inglés e Inmersión en Español para Expats. Habla desde el primer día con nuestro método de inmersión en vivo." />
      </Helmet>
      <LandingIdiomas />
    </main>
  );
}

