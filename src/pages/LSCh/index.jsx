import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLSCh from './LandingLSCh';

export default function LSCh() {
  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Lengua de Señas Chilena - Instituto Lael</title>
        <meta name="description" content="Curso online de Lengua de Señas Chilena (LSCh) en vivo. Aprende señas y cultura Sorda por niveles, con certificado al aprobar. Instituto Lael." />
      </Helmet>
      <LandingLSCh />
    </main>
  );
}

