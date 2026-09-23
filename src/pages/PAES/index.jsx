import React, { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import LandingPAES from './LandingPAES';

export default function PAES() {
  useEffect(() => {
    trackEvent('page_view_paes');
  }, []);

  return (
    <main className="bg-[#F4F4F4] min-h-screen">
      <Helmet>
        <title>PAES 2027 - Instituto Lael | Clases en vivo, matrícula gratis</title>
        <meta name="description" content="Preuniversitario PAES online. Clases en vivo por Google Meet, grabaciones para repasar y ensayo mensual. Matrícula gratis, desde $10.000/mes por ramo y becas disponibles." />
      </Helmet>
      <LandingPAES />
    </main>
  );
}

