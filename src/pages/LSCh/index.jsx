import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroLSCh from './HeroLSCh';
import ModuleProgression from './ModuleProgression';
import PlanSelector from './PlanSelector';
import LSChPricing from './LSChPricing';
import TeacherBlock from './TeacherBlock';

export default function LSCh() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isChurch, setIsChurch] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // No gate in LSCh — simpler flow
  const gateData = { name: '', phone: '' };

  const showPricing = selectedPlan || isChurch;

  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      <HeroLSCh />

      {/* Module progression */}
      <section className="w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <ModuleProgression
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      </section>

      {/* Teacher + comparison */}
      <section className="w-full px-6 pb-32 lg:pb-48 flex flex-col items-center">
        <TeacherBlock />
      </section>

      {/* Plan selector */}
      <section className="w-full px-6 pb-32 lg:pb-48 flex flex-col items-center">
        <PlanSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          isChurch={isChurch}
          setIsChurch={setIsChurch}
        />
      </section>

      {/* Pricing — appears when plan is selected */}
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
    </main>
  );
}
