import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLSCh from './LandingLSCh';

export default function LSCh() {
  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Lengua de Señas Chilena — Instituto Lael | Fernanda Gaete</title>
        <meta name="description" content="Aprende LSCh con una instructora Sorda nativa. Cultura Sorda, metodología real y certificación por competencias. Cumple la Ley 21.015. Instituto Lael." />
      </Helmet>
      <LandingLSCh />
    </main>
  );
}

