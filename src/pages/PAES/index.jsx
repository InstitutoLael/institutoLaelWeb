import React, { useState } from 'react';
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
      {/* SKELETON RENDER */}
      <ProgressBar step={step} />
      
      <HeroPAES />
      
      <AccessGate 
        step={step}
        gateData={gateData}
        setGateData={setGateData}
        setStep={setStep}
      />
      
      {step >= 2 && (
        <SystemReveal>
          <ModuleSelector 
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
          />
          
          {selectedModules.length > 0 && (
            <PricingBlock 
              gateData={gateData}
              selectedModules={selectedModules}
              priceData={priceData}
              isConnecting={isConnecting}
              setIsConnecting={setIsConnecting}
              setStep={setStep}
            />
          )}
        </SystemReveal>
      )}

      {step >= 3 && (
        <EliteLayer />
      )}
    </main>
  );
}
