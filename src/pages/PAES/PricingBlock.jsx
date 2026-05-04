import React from 'react';
import { clp } from '../../data/paes';

export default function PricingBlock({ gateData, selectedModules, priceData, isConnecting, setIsConnecting, setStep }) {
  const handleActivateSystem = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setStep(3);
    }, 800);
  };

  return (
    <div>
      <h3>{priceData.label}</h3>
      <p>Inversión mensual para mantener el sistema activo</p>
      
      <div>
        {clp(priceData.totalMonthly)} / mes
      </div>

      <ul>
        <li>{priceData.count} Módulos Activos</li>
        <li>Matrícula inicial: {clp(priceData.enrollment)}</li>
      </ul>

      {priceData.saving > 0 && (
        <p>Ahorro de {clp(priceData.saving)} mensuales</p>
      )}

      <button onClick={handleActivateSystem} disabled={isConnecting}>
        {isConnecting ? 'Conectando con un mentor...' : 'Activar mi rendimiento'}
      </button>
      
      <p>Pausar sistema en cualquier momento.</p>
    </div>
  );
}
