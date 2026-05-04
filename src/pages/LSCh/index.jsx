import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingLSCh from './LandingLSCh';
import ModuleProgression from './ModuleProgression';
import PlanSelector from './PlanSelector';
import LSChPricing from './LSChPricing';

export default function LSCh() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isChurch, setIsChurch] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const systemRef = useRef(null);
  const gateData = { name: '', phone: '' };
  const showPricing = selectedPlan || isChurch;

  const scrollToSystem = () => {
    setTimeout(() => {
      systemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      {/* ── CAPA 1: LANDING ── */}
      <LandingLSCh onChoosePlan={scrollToSystem} />

      {/* ── CAPA 2: SISTEMA ── */}
      <div ref={systemRef}>
        <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center">
          <ModuleProgression
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </section>

        <section className="w-full px-6 pb-32 lg:pb-48 flex flex-col items-center">
          <PlanSelector
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            isChurch={isChurch}
            setIsChurch={setIsChurch}
          />
        </section>

        <AnimatePresence mode="wait">
          {showPricing && (
            <LSChPricing
              gateData={gateData}
              selectedPlan={selectedPlan}
              isChurch={isChurch}
              isConnecting={isConnecting}
              setIsConnecting={setIsConnecting}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
