import React from 'react';

export default function AccessGate({ step, gateData, setGateData, setStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gateData.name && gateData.phone) {
      setStep(2);
    }
  };

  return (
    <section>
      <h2>Fase de Ingreso</h2>
      <p>Desbloquea tu sistema</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre completo" 
          value={gateData.name}
          onChange={e => setGateData({...gateData, name: e.target.value})}
          disabled={step > 1}
        />
        <input 
          type="tel" 
          placeholder="WhatsApp" 
          value={gateData.phone}
          onChange={e => setGateData({...gateData, phone: e.target.value})}
          disabled={step > 1}
        />
        <input 
          type="text" 
          placeholder="Puntaje objetivo" 
          value={gateData.score}
          onChange={e => setGateData({...gateData, score: e.target.value})}
          disabled={step > 1}
        />
        
        <button type="submit" disabled={step > 1}>
          {step > 1 ? 'Sistema Desbloqueado' : 'Ver mi estrategia'}
        </button>
      </form>
      
      <small>No es inscripción. Es el inicio de tu diagnóstico estratégico.</small>
    </section>
  );
}
