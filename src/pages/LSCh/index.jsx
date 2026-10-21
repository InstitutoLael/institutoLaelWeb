import React from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLSCh from './LandingLSCh';

export default function LSCh() {
  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Helmet>
        <title>Curso de Lengua de Señas Chilena desde cero · Instituto Lael</title>
        <meta name="description" content="Aprende LSCh desde cero con docente de la comunidad Sorda. Nivel Inicial A1, 3 meses, online en vivo y con certificado. Guarda tu cupo sin pagar." />
      </Helmet>
      <LandingLSCh />
    </div>
  );
}

