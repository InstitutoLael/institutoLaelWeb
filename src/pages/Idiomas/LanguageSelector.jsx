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
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-4">Fase 01</p>
        <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Selecciona tu programa</h2>
        <p className="mt-4 text-lael-muted/60 text-sm tracking-wider">Puedes combinar idiomas. El precio se adapta automáticamente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LANGUAGES.map(lang => {
          const isSelected = selectedLanguages.includes(lang.id);
          return (
            <div
              key={lang.id}
              onClick={() => toggle(lang.id)}
              className={`group cursor-pointer p-8 rounded-2xl border transition-all duration-700 relative overflow-hidden ${
                isSelected
                  ? 'bg-[#111111] border-lael-accent/40 shadow-[0_0_40px_rgba(198,166,107,0.12)]'
                  : 'bg-[#080808] border-white/5 hover:bg-[#0D0D0D] hover:border-white/10'
              }`}
            >
              {/* Active accent bar */}
              <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-700 ${isSelected ? 'bg-lael-accent shadow-[0_0_16px_rgba(198,166,107,1)]' : 'bg-transparent'}`} />

              {/* Flag as text — no emoji icons in UI */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className={`text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-500 ${isSelected ? 'text-lael-accent' : 'text-lael-muted/40'}`}>
                    {lang.badge}
                  </p>
                  <h3 className={`font-display text-xl transition-colors duration-500 ${isSelected ? 'text-lael-light font-bold' : 'text-lael-muted group-hover:text-lael-light'}`}>
                    {lang.name}
                  </h3>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 mt-1 flex-shrink-0 ${isSelected ? 'border-lael-accent bg-lael-accent/20' : 'border-white/10'}`}>
                  <div className={`w-2 h-2 rounded-full bg-lael-accent transition-all duration-500 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-6 transition-colors duration-500 ${isSelected ? 'text-lael-muted' : 'text-lael-muted/50 group-hover:text-lael-muted/70'}`}>
                {lang.summary}
              </p>

              <div className="space-y-2">
                {lang.levels.map(lvl => (
                  <p key={lvl} className={`text-[10px] tracking-[0.1em] transition-colors duration-500 ${isSelected ? 'text-lael-muted/60' : 'text-lael-muted/30'}`}>
                    · {lvl}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
