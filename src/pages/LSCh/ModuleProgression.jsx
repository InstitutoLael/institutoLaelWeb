import React from 'react';
import { motion } from 'framer-motion';
import { LSCH_MODULES } from '../../data/lsch';

const ease = [0.16, 1, 0.3, 1];

// Levels unlock progressively: 0 = visible, 1 = semi, 2 = locked
const OPACITY_MAP = [1, 0.5, 0.2];
const BLUR_MAP = ['blur(0px)', 'blur(0px)', 'blur(2px)'];

export default function ModuleProgression({ selectedLevel, setSelectedLevel }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-4">Progresión</p>
        <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Tu ruta de aprendizaje</h2>
        <p className="mt-4 text-lael-muted/50 text-sm tracking-wider">Cada nivel desbloquea el siguiente. Selecciona desde dónde comienzas.</p>
      </div>

      <div className="space-y-4">
        {LSCH_MODULES.map((mod, i) => {
          const isLocked = i === 2;
          const isSelected = selectedLevel === mod.id;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: OPACITY_MAP[i], y: 0, filter: BLUR_MAP[i] }}
              transition={{ duration: 0.8, delay: i * 0.15, ease }}
              onClick={() => !isLocked && setSelectedLevel(isSelected ? null : mod.id)}
              className={`group relative p-8 rounded-2xl border transition-all duration-700 ${
                isLocked
                  ? 'border-white/5 bg-[#060606] cursor-not-allowed'
                  : isSelected
                  ? 'border-lael-accent/40 bg-[#111111] shadow-[0_0_40px_rgba(198,166,107,0.1)] cursor-pointer'
                  : 'border-white/5 bg-[#080808] hover:bg-[#0D0D0D] hover:border-white/10 cursor-pointer'
              }`}
            >
              {/* Level bar */}
              <div className={`absolute left-0 top-0 w-1 h-full rounded-l-2xl transition-all duration-700 ${isSelected ? 'bg-lael-accent' : 'bg-transparent'}`} />

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-500 ${isSelected ? 'text-lael-accent' : 'text-lael-muted/40'}`}>
                    {mod.tag} · {mod.duration}
                  </p>
                  <h3 className={`font-display text-xl mb-3 transition-colors duration-500 ${isSelected ? 'text-lael-light font-bold' : 'text-lael-muted'}`}>
                    {mod.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 transition-colors duration-500 ${isSelected ? 'text-lael-muted' : 'text-lael-muted/50'}`}>
                    {mod.desc}
                  </p>
                  {isSelected && (
                    <div className="space-y-1 mt-4">
                      {mod.outcomes.map(o => (
                        <p key={o} className="text-[11px] text-lael-muted/60 tracking-wider">· {o}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="ml-6 mt-1 flex-shrink-0">
                  {isLocked ? (
                    <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                    </div>
                  ) : (
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 ${isSelected ? 'border-lael-accent bg-lael-accent/20' : 'border-white/10'}`}>
                      <div className={`w-2 h-2 rounded-full bg-lael-accent transition-all duration-500 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                    </div>
                  )}
                </div>
              </div>

              {isLocked && (
                <p className="mt-4 text-[10px] tracking-[0.15em] text-lael-muted/30 uppercase">
                  Disponible al completar Nivel 2
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
