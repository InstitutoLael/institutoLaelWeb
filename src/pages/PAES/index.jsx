import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import HeroPAES from './HeroPAES';
import AccessGate from './AccessGate';
import SystemReveal from './SystemReveal';
import ModuleSelector from './ModuleSelector';
import PricingBlock from './PricingBlock';
import EliteLayer from './EliteLayer';
import { computePaesPrice } from '../../data/paes';

export default function PAES() {
  const [step, setStep] = useState(1);
  const [gateData, setGateData] = useState({ name: '', phone: '', score: '' });
  const [selectedModules, setSelectedModules] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const priceData = computePaesPrice(selectedModules);

  return (
    <main>
      {/* Step indicator — sticky 0.5px precision bar */}
      <ProgressBar step={step} />

      {/* ── Step 1 ── Cinematic hero */}
      <HeroPAES />

      {/* ── Step 1 ── Access gate — closes/fades when step > 1 */}
      <AccessGate
        step={step}
        gateData={gateData}
        setGateData={setGateData}
        setStep={setStep}
      />

      {/* ── Step 2 ── System reveal — header + module selector
           Enters as a unit (blur → clear, y → 0) then staggered children */}
      {step >= 2 && (
        <SystemReveal>
          <ModuleSelector
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
          />
        </SystemReveal>
      )}

      {/* ── Step 2 ── Pricing block — rendered as SIBLING, not child of SystemReveal
           This guarantees it appears AFTER modules with deliberate weight */}
      <AnimatePresence mode="wait">
        {step >= 2 && selectedModules.length > 0 && (
          <PricingBlock
            gateData={gateData}
            selectedModules={selectedModules}
            priceData={priceData}
            isConnecting={isConnecting}
            setIsConnecting={setIsConnecting}
            setStep={setStep}
          />
        )}
      </AnimatePresence>

      {/* ── Step 3 ── Elite layer */}
      {step >= 3 && <EliteLayer />}
    </main>
  );
}
