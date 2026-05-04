import React from 'react';
import { TEACHER_PROFILE, COMPARISON_DATA } from '../../data/lsch';

export default function TeacherBlock() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-24">

      {/* Teacher profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6">Quien te enseña</p>
          <h2 className="font-display text-4xl text-lael-light mb-6">{TEACHER_PROFILE.name}</h2>
          <p className="text-lael-muted/60 text-[11px] tracking-[0.15em] uppercase mb-8">{TEACHER_PROFILE.role}</p>
          <p className="text-lael-muted leading-relaxed text-base">{TEACHER_PROFILE.bio}</p>

          <div className="flex flex-wrap gap-2 mt-8">
            {TEACHER_PROFILE.badges.map(b => (
              <span key={b} className="text-[10px] tracking-[0.12em] text-lael-accent border border-lael-accent/30 px-3 py-1 rounded-full uppercase">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#080808] border border-white/5 rounded-2xl p-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-lael-muted/40 mb-6">
            Esto no es un curso. Es acceso cultural real.
          </p>
          <div className="space-y-4">
            {COMPARISON_DATA.map(row => (
              <div key={row.feature} className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 last:border-0">
                <p className="text-[11px] text-lael-muted/50 tracking-wider col-span-1">{row.feature}</p>
                <p className="text-[11px] text-lael-accent font-semibold tracking-wider col-span-1">{row.us}</p>
                <p className="text-[11px] text-lael-muted/30 tracking-wider col-span-1">{row.others}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <span className="text-[9px] tracking-[0.15em] text-lael-accent uppercase">Lael</span>
            <span className="text-[9px] tracking-[0.15em] text-lael-muted/30 uppercase">Otros</span>
          </div>
        </div>
      </div>
    </div>
  );
}
