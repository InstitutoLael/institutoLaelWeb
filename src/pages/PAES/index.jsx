import React, { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import LandingPAES from './LandingPAES';

export default function PAES() {
  useEffect(() => {
    trackEvent('page_view_paes');
  }, []);

  return (
    <main className="bg-lael-primary min-h-screen">
      <Helmet>
        <title>Preuniversitario PAES Gratuito Online | Instituto Lael Santiago</title>
        <meta name="description" content="Sistema de preparación PAES de alto rendimiento. Clases en vivo, material de estudio y ensayos semanales sin costo. 100% online y personalizado." />
      </Helmet>
      <LandingPAES />
    </main>
  );
}

