import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ProgressBar from './ProgressBar';
import LandingPAES from './LandingPAES';
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

  const gateRef = useRef(null);
  const priceData = computePaesPrice(selectedModules);

  const scrollToGate = () => {
    setTimeout(() => {
      gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      <Helmet>
        <title>Preuniversitario PAES Online | Instituto Lael — Santiago</title>
        <meta name="description" content="Sistema de preparación PAES de alto rendimiento. Diágnostico táctico, módulos personalizados y mentores estratégicos. No es un preuniversitario, es un sistema." />
      </Helmet>
      <ProgressBar step={step} />

      {/* ── CAPA 1: LANDING ── */}
      <LandingPAES onStartDiagnosis={scrollToGate} />

      {/* ── CAPA 2: SISTEMA ── */}
      <div ref={gateRef} id="diagnostico">
        <AccessGate
          step={step}
          gateData={gateData}
          setGateData={setGateData}
          setStep={setStep}
        />
      </div>

      {step >= 2 && (
        <SystemReveal>
          <ModuleSelector
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
          />
        </SystemReveal>
      )}

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

      {step >= 3 && <EliteLayer />}
    </main>
  );
}
