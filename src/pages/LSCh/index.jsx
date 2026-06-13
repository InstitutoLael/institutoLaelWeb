import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLSCh from './LandingLSCh';

export default function LSCh() {
  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Lengua de Señas Chilena — Instituto Lael</title>
        <meta name="description" content="Aprende Lengua de Señas Chilena (LSCh). Cultura Sorda, metodología interactiva y certificación. Instituto Lael." />
      </Helmet>
      <LandingLSCh />
    </main>
  );
}

