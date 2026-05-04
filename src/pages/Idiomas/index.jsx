import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
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
