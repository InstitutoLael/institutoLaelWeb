import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLSCh from './LandingLSCh';

export default function LSCh() {
  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Helmet>
        <title>Lengua de Señas Chilena (próximamente) - Instituto Lael</title>
        <meta name="description" content="Próximamente: curso online de Lengua de Señas Chilena (LSCh) en vivo, dictado por una persona de la comunidad Sorda. Escríbenos y te avisamos cuando abra. Instituto Lael." />
      </Helmet>
      <LandingLSCh />
    </div>
  );
}

