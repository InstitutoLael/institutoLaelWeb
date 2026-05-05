import React, { useState } from 'react';
import { LSCH_GROUP_PLANS, LSCH_ONE2ONE_PLANS } from '../../data/lsch';

const TABS = [
  { id: 'grupo', label: 'Grupal' },
  { id: 'one2one', label: '1 a 1' },
];

export default function PlanSelector({ selectedPlan, setSelectedPlan, isChurch, setIsChurch }) {
  const [activeTab, setActiveTab] = useState('grupo');

  const plans = activeTab === 'grupo' ? LSCH_GROUP_PLANS : LSCH_ONE2ONE_PLANS;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-4">Modalidad</p>
        <h2 className="font-display text-4xl lg:text-5xl text-lael-light">Elige tu plan</h2>
      </div>

      {/* Church toggle */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <span className="text-[10px] tracking-[0.15em] text-lael-muted/50 uppercase">Convenio Iglesia / Ministerio</span>
        <button
          onClick={() => { setIsChurch(!isChurch); setSelectedPlan(isChurch ? null : 'church'); }}
          className={`relative w-10 h-5 rounded-full transition-all duration-500 ${isChurch ? 'bg-lael-accent' : 'bg-lael-primary'}`}
        >
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-500 ${isChurch ? 'left-5' : 'left-0.5'}`} />
        </button>
      </div>

      {isChurch ? (
        <div className="bg-lael-secondary border border-lael-accent/30 rounded-2xl p-8 text-center cinematic-shadow">
          <p className="text-lael-accent text-[10px] tracking-[0.2em] uppercase mb-3">Precio Social Protegido</p>
          <p className="font-display text-5xl text-lael-light tracking-[-0.02em] font-bold">$14.990</p>
          <p className="mt-4 text-lael-muted/80 text-sm">Matrícula incluida · Solo para iglesias y ministerios verificados</p>
        </div>
      ) : (
        <>
          {/* Tab switcher */}
          <div className="flex gap-1 bg-lael-primary p-1 rounded-xl mb-8 w-fit mx-auto border border-lael-bd">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedPlan(null); }}
                className={`px-6 py-2 rounded-lg text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${activeTab === tab.id ? 'bg-lael-accent text-white font-bold shadow-md' : 'text-lael-muted/60 hover:text-lael-accent'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map(plan => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
                  className={`cursor-pointer p-8 rounded-2xl border transition-all duration-700 relative overflow-hidden ${
                    isSelected
                      ? 'border-lael-accent bg-lael-secondary shadow-[0_4px_20px_rgba(196,151,62,0.12)]'
                      : 'border-lael-bd bg-lael-secondary hover:border-lael-accent/50 cinematic-shadow'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-700 ${isSelected ? 'bg-lael-accent' : 'bg-transparent'}`} />

                  {plan.highlight && (
                    <span className="text-[10px] tracking-[0.12em] text-lael-accent border border-lael-accent/30 px-3 py-1 rounded-full uppercase bg-lael-accent/5 font-bold mb-4 inline-block">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className={`font-display text-lg mb-2 transition-colors duration-500 ${isSelected ? 'text-lael-rust font-bold' : 'text-[#0D0D0D]'}`}>
                    {plan.title}
                  </h3>
                  <p className={`font-display text-3xl font-bold mb-3 transition-colors duration-500 ${isSelected ? 'text-lael-accent' : 'text-[#0D0D0D]'}`}>
                    ${plan.price?.toLocaleString('es-CL')}
                    <span className="text-sm font-normal text-[#8A8A8A]"> /mes</span>
                  </p>
                  <p className="text-sm text-[#3A3A3A] mb-4">{plan.desc}</p>

                  <div className="space-y-2">
                    {plan.features?.map(f => (
                      <p key={f} className={`text-[11px] tracking-wider transition-colors duration-500 ${isSelected ? 'text-[#3A3A3A]' : 'text-[#8A8A8A]'}`}>
                        · {f}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
