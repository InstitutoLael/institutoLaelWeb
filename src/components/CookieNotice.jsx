import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Aviso de cookies. Google Analytics parte desactivado (ver index.html,
// "consent default") y solo se activa si la persona acepta.
const KEY = 'lael_cookies';

export function getCookieChoice() {
  try { return localStorage.getItem(KEY); } catch (_) { return null; }
}

function applyChoice(choice) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: choice === 'si' ? 'granted' : 'denied' });
  }
}

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = getCookieChoice();
    if (choice) applyChoice(choice);
    else setVisible(true);
  }, []);

  const decide = (choice) => {
    try { localStorage.setItem(KEY, choice); } catch (_) {}
    applyChoice(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="region" aria-label="Aviso de cookies" className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[150] bg-white text-[#071D49] rounded-2xl shadow-2xl border border-[#071D49]/10 p-5">
      <p className="text-sm leading-relaxed mb-4">
        Usamos cookies de Google Analytics solo para saber cuántas personas visitan el sitio y qué páginas sirven más. Nada de publicidad.{' '}
        <Link to="/privacidad" className="underline font-semibold">Más información</Link>
      </p>
      <div className="flex gap-2">
        <button onClick={() => decide('si')} className="flex-1 min-h-[44px] rounded-xl bg-[#071D49] text-white text-sm font-bold">Aceptar</button>
        <button onClick={() => decide('no')} className="flex-1 min-h-[44px] rounded-xl border border-[#071D49]/20 text-sm font-bold">Solo las necesarias</button>
      </div>
    </div>
  );
}
