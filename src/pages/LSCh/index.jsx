import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLSCh from './LandingLSCh';

export default function LSCh() {
  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Lengua de Señas Chilena (próximamente) - Instituto Lael</title>
        <meta name="description" content="Próximamente: curso online de Lengua de Señas Chilena (LSCh) en vivo, dictado por una persona de la comunidad Sorda. Escríbenos y te avisamos cuando abra. Instituto Lael." />
      </Helmet>
      <LandingLSCh />
    </main>
  );
}

