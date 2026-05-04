import React from 'react';
import { PAES_SUBJECTS } from '../../data/paes';
import { Target, PenTool, Database, Activity, Calculator, Beaker, Globe, Atom } from 'lucide-react';

const ICON_MAP = {
  len: PenTool,
  m1: Calculator,
  m2: Target,
  his: Database,
  bio: Activity,
  fis: Globe,
  qui: Beaker,
};

export default function ModuleSelector({ selectedModules, setSelectedModules }) {
  const toggleSubject = (id) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter(s => s !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
      {PAES_SUBJECTS.map(subject => {
        const isSelected = selectedModules.includes(subject.id);
        const Icon = ICON_MAP[subject.id] || Target;

        return (
          <div 
            key={subject.id} 
            onClick={() => toggleSubject(subject.id)}
            className={`group cursor-pointer p-8 lg:p-10 rounded-2xl border transition-all duration-700 relative overflow-hidden ${isSelected ? 'bg-[#111111] border-lael-accent/40 shadow-[0_0_40px_rgba(198,166,107,0.15)]' : 'bg-[#080808] border-white/5 hover:bg-[#0D0D0D] hover:border-white/10'}`}
          >
            {/* Active Glow Indicator */}
            <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-700 ${isSelected ? 'bg-lael-accent shadow-[0_0_20px_rgba(198,166,107,1)]' : 'bg-transparent'}`} />

            <div className="flex items-start justify-between">
              <div className="flex gap-6 items-start">
                <div className={`p-4 rounded-xl transition-all duration-700 ${isSelected ? 'bg-lael-accent/10 text-lael-accent' : 'bg-white/[0.03] text-lael-muted group-hover:text-lael-light'}`}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={`text-lg lg:text-xl font-display transition-colors duration-700 mb-2 ${isSelected ? 'text-lael-light font-bold' : 'text-lael-muted group-hover:text-lael-light'}`}>
                    {subject.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-lael-muted/50 mb-4">{subject.category}</p>
                  <p className={`text-sm leading-relaxed transition-colors duration-700 ${isSelected ? 'text-lael-muted' : 'text-lael-muted/60 group-hover:text-lael-muted'}`}>
                    {subject.desc}
                  </p>
                </div>
              </div>

              {/* Status Checkbox replacement */}
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 mt-2 ${isSelected ? 'border-lael-accent bg-lael-accent/20' : 'border-white/10'}`}>
                <div className={`w-2 h-2 rounded-full bg-lael-accent transition-all duration-500 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
