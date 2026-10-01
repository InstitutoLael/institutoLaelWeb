import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Botón de modo claro/oscuro. Si la persona nunca eligió, sigue al sistema
// (ver el script al inicio de index.html). Los colores oscuros se generan en
// src/styles/dark.generated.css (scripts/gen-dark-css.cjs).
const KEY = 'lael_theme';

function isDark() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
}

export default function ThemeToggle({ className = '' }) {
  // Parte en claro y se corrige al montar: el primer dibujo tiene que ser
  // igual al HTML pre-dibujado de la portada.
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(isDark()); }, []);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const onChange = (e) => {
      let saved = null;
      try { saved = localStorage.getItem(KEY); } catch (_) {}
      if (saved) return;
      document.documentElement.classList.toggle('dark', e.matches);
      setDark(e.matches);
    };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange));
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem(KEY, next ? 'dark' : 'light'); } catch (_) {}
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border border-white/20 text-sm font-semibold text-white/80 hover:text-white hover:border-white/40 transition-colors ${className}`}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      {dark ? 'Modo claro' : 'Modo oscuro'}
    </button>
  );
}
