import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ICONS } from '../components/icons/LaelIcons';

// Catálogo interno de íconos Lael (no se indexa).
function Grid({ dark }) {
  return (
    <div className={`rounded-[28px] p-5 sm:p-8 ${dark ? 'bg-[#071D49] text-white' : 'bg-white text-[#071D49] border border-[#071D49]/5 shadow-card'}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${dark ? 'text-[#D7E400]' : 'text-[#071D49]'}`}>
        {dark ? 'Sobre azul marino' : 'Sobre blanco'}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {Object.entries(ICONS).map(([name, Icon]) => (
          <div key={name} className={`rounded-2xl p-4 flex flex-col items-center gap-3 ${dark ? 'bg-white/5' : 'bg-[#F4F4F4]'}`}>
            <Icon size={40} />
            <div className="flex items-end gap-3">
              <Icon size={32} />
              <Icon size={24} />
              <Icon size={20} />
            </div>
            <span className={`text-xs font-semibold ${dark ? 'text-white/75' : 'text-[#071D49]/70'}`}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tiles() {
  return (
    <div className="rounded-[28px] p-5 sm:p-8 bg-white border border-[#071D49]/5 shadow-card">
      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[#071D49]">Así se ven en las tarjetas</p>
      <div className="flex flex-wrap gap-3">
        {Object.entries(ICONS).map(([name, Icon]) => (
          <div key={name} className="w-14 h-14 rounded-2xl bg-[#071D49] flex items-center justify-center" title={name}>
            <Icon size={24} className="text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function IconosPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#F4F4F4] text-[#071D49]">
      <Helmet>
        <title>Íconos Lael</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-4">Íconos Lael</h1>
            <p className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed">
              {Object.keys(ICONS).length} íconos propios: trazo redondeado y un acento amarillo (destello, punto o ala de paloma) que recuerda al logo.
            </p>
          </div>
          <Tiles />
          <Grid />
          <Grid dark />
        </div>
      </section>
    </div>
  );
}

export const routes = [{ path: '/iconos', element: <IconosPage /> }];
