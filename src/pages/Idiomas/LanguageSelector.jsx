import React from 'react';
import { LANGUAGES } from '../../data/idiomas';

export default function LanguageSelector({ selectedLanguages, setSelectedLanguages }) {
  const toggle = (id) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter(s => s !== id));
    } else {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <p className="text-lael-accent text-[11px] tracking-[0.5em] uppercase mb-6 font-bold">Configuración de Sistema</p>
        <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold mb-6 tracking-tighter uppercase">FASE 01 / Selección</h2>
        <p className="text-lael-muted text-lg lg:text-xl italic italic-playfair max-w-2xl mx-auto">
          "Puedes combinar múltiples sistemas de comunicación. El algoritmo de inversión se recalibra automáticamente."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LANGUAGES.map(lang => {
          const isSelected = selectedLanguages.includes(lang.id);
          return (
            <div
              key={lang.id}
              onClick={() => toggle(lang.id)}
              className={`group cursor-pointer p-12 rounded-[50px] border transition-all duration-700 relative overflow-hidden ${
                isSelected
                  ? 'bg-lael-secondary border-lael-accent shadow-[0_20px_60px_rgba(196,151,62,0.15)] scale-[1.02]'
                  : 'bg-lael-primary border-lael-bd hover:border-lael-accent/50 cinematic-shadow'
              }`}
            >
              {/* Active accent bar */}
              <div className={`absolute top-0 left-0 w-full h-2 transition-all duration-700 ${isSelected ? 'bg-lael-accent' : 'bg-transparent'}`} />

              <div className="flex items-start justify-between mb-12">
                <div className="flex-1">
                  <p className={`text-[11px] tracking-[0.3em] uppercase mb-4 transition-colors duration-500 font-bold ${isSelected ? 'text-lael-accent' : 'text-lael-muted/50'}`}>
                    {lang.badge}
                  </p>
                  <h3 className={`font-display text-3xl lg:text-4xl transition-colors duration-500 leading-none ${isSelected ? 'text-lael-primary font-bold' : 'text-white group-hover:text-lael-accent'}`}>
                    {lang.name}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 mt-2 flex-shrink-0 ${isSelected ? 'border-lael-accent bg-lael-accent/10' : 'border-lael-bd'}`}>
                  <div className={`w-3 h-3 rounded-full bg-lael-accent transition-all duration-500 ${isSelected ? 'scale-100 opacity-100 shadow-[0_0_15px_rgba(196,151,62,0.5)]' : 'scale-0 opacity-0'}`} />
                </div>
              </div>

              <p className={`text-base leading-relaxed mb-10 transition-colors duration-500 ${isSelected ? 'text-lael-primary/80 font-medium' : 'text-lael-muted'}`}>
                {lang.summary}
              </p>

              <div className="space-y-3">
                {lang.levels.map(lvl => (
                  <div key={lvl} className="flex items-center gap-3">
                     <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? 'bg-lael-accent' : 'bg-lael-accent/30'}`} />
                     <p className={`text-[12px] tracking-[0.05em] uppercase transition-colors duration-500 font-bold ${isSelected ? 'text-lael-primary/60' : 'text-lael-muted/40'}`}>
                       {lvl}
                     </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
