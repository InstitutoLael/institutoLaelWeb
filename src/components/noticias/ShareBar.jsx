import React, { useState } from 'react';
import { Link2, Check, Share2 } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

// Compartir una noticia: WhatsApp (lo que más se usa en Chile), copiar el
// link y, en celulares que lo permiten, el menú de compartir del teléfono.
export default function ShareBar({ title, url, dark = false }) {
  const [copiado, setCopiado] = useState(false);
  const puedeNativo = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  const base = `min-h-[44px] inline-flex items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-[#F4F4F4] hover:bg-[#071D49]/10 text-[#071D49]'}`;

  const copiar = async () => {
    try { await navigator.clipboard.writeText(url); setCopiado(true); setTimeout(() => setCopiado(false), 2000); } catch (_) { /* sin permiso */ }
    trackEvent('noticia_compartir', { via: 'copiar' });
  };
  const nativo = async () => {
    try { await navigator.share({ title, url }); trackEvent('noticia_compartir', { via: 'nativo' }); } catch (_) { /* cancelado */ }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-xs font-bold uppercase tracking-[0.15em] mr-1 ${dark ? 'text-white/60' : 'text-[#071D49]/60'}`}>Compartir</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('noticia_compartir', { via: 'whatsapp' })}
        className={base}
      >
        WhatsApp
      </a>
      <button type="button" onClick={copiar} className={base} aria-live="polite">
        {copiado ? <><Check size={16} /> ¡Copiado!</> : <><Link2 size={16} /> Copiar link</>}
      </button>
      {puedeNativo && (
        <button type="button" onClick={nativo} className={base} aria-label="Compartir con otra app">
          <Share2 size={16} /> Más
        </button>
      )}
    </div>
  );
}
