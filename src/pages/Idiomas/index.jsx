import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import LandingIdiomas from './LandingIdiomas';
import LanguageSelector from './LanguageSelector';
import IdiomaPricing from './IdiomaPricing';
import { computeLangBundle } from '../../data/idiomas';

export default function Idiomas() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [gateData] = useState({ name: '', phone: '' });
  const [isConnecting, setIsConnecting] = useState(false);

  const selectorRef = useRef(null);
  const priceData = computeLangBundle(selectedLanguages.length);

  const scrollToSelector = () => {
    setTimeout(() => {
      selectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      <Helmet>
        <title>Clases de Inglés, Coreano y LSCh Online | Instituto Lael</title>
        <meta name="description" content="Programas de idiomas estratégicos. Inglés, Coreano e Inmersión en Español para Expats. Simulación real, no clases pasivas. Instituto Lael, Chile." />
      </Helmet>
      {/* ── CAPA 1: LANDING ── */}
      <LandingIdiomas onConfigure={scrollToSelector} />

      {/* ── CAPA 2: SISTEMA ── */}
      <section ref={selectorRef} className="w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <LanguageSelector
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
        />
      </section>

      <AnimatePresence mode="wait">
        {selectedLanguages.length > 0 && (
          <IdiomaPricing
            gateData={gateData}
            selectedLanguages={selectedLanguages}
            priceData={priceData}
            isConnecting={isConnecting}
            setIsConnecting={setIsConnecting}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
