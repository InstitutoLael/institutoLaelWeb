import React from 'react';

export default function AccessGate({ step, gateData, setGateData, setStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gateData.name && gateData.phone) {
      setStep(2);
      setTimeout(() => {
        document.getElementById('estrategia-layer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const isLocked = step > 1;

  return (
    <section className={`w-full px-6 pb-32 lg:pb-48 flex justify-center transition-all duration-1000 ${isLocked ? 'opacity-30 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
      <div className="w-full max-w-xl bg-[#050505]/80 backdrop-blur-xl rounded-2xl p-8 lg:p-16 border border-white/[0.02] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl lg:text-3xl text-lael-light mb-2">Fase de Ingreso</h2>
          <p className="text-lael-accent text-[11px] tracking-[0.2em] uppercase">Desbloquea tu sistema</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-lael-muted/50 tracking-[0.2em] uppercase ml-4">Nombre Completo</label>
            <input 
              type="text" 
              required
              value={gateData.name}
              onChange={e => setGateData({...gateData, name: e.target.value})}
              disabled={isLocked}
              className="w-full bg-transparent border-b border-white/10 px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent focus:shadow-[0_10px_20px_-10px_rgba(198,166,107,0.1)] transition-all duration-500 placeholder:text-white/10"
              placeholder="Ingresa tu nombre..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-lael-muted/50 tracking-[0.2em] uppercase ml-4">WhatsApp (Contacto directo)</label>
            <input 
              type="tel" 
              required
              value={gateData.phone}
              onChange={e => setGateData({...gateData, phone: e.target.value})}
              disabled={isLocked}
              className="w-full bg-transparent border-b border-white/10 px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent focus:shadow-[0_10px_20px_-10px_rgba(198,166,107,0.1)] transition-all duration-500 placeholder:text-white/10"
              placeholder="+56 9..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-lael-muted/50 tracking-[0.2em] uppercase ml-4">Puntaje Objetivo</label>
            <input 
              type="text" 
              value={gateData.score}
              onChange={e => setGateData({...gateData, score: e.target.value})}
              disabled={isLocked}
              className="w-full bg-transparent border-b border-white/10 px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent focus:shadow-[0_10px_20px_-10px_rgba(198,166,107,0.1)] transition-all duration-500 placeholder:text-white/10"
              placeholder="Ej: 850 (Opcional)"
            />
          </div>
          
          <div className="pt-8">
            <button 
              type="submit" 
              disabled={isLocked}
              className="w-full bg-lael-accent/10 border border-lael-accent/30 text-lael-accent py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-lael-primary hover:shadow-[0_0_30px_rgba(198,166,107,0.3)] transition-all duration-500"
            >
              {isLocked ? 'Sistema Desbloqueado' : 'Ver mi estrategia'}
            </button>
            <p className="mt-6 text-center text-[10px] text-lael-muted/40 tracking-wider">
              No es inscripción. Es el inicio de tu diagnóstico estratégico.
            </p>
          </div>
        </form>

      </div>
    </section>
  );
}
