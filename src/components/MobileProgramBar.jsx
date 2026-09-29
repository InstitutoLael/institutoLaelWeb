import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { programaDeRuta } from '../data/catalogo';
import { WHATSAPP_NUMBER } from '../lib/backend';
import { trackEvent } from '../utils/analytics';

// Barra fija abajo, solo en celular y solo en las páginas de programa:
// "Inscribirme" + WhatsApp siempre a mano. Aparece después de bajar un poco
// (la portada ya tiene sus botones) y reemplaza a la burbuja de WhatsApp.
export function useProgramBar() {
  const { pathname } = useLocation();
  return programaDeRuta(pathname);
}

export default function MobileProgramBar() {
  const programa = useProgramBar();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [programa]);

  if (!programa) return null;
  const msg = `Hola! Estoy viendo ${programa.name} en la web de Lael y tengo una duda.`;
  const cta = programa.id === 'lsch' ? 'Avísenme' : programa.id === 'empresas' ? 'Cotizar' : 'Inscribirme';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          className="sm:hidden fixed bottom-0 inset-x-0 z-[95] px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-[#071D49]/95 backdrop-blur-md border-t border-white/10"
          data-keep-light
        >
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1 pl-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-programa truncate" style={{ '--programa': programa.color }}>{programa.name}</p>
              <p className="text-xs text-white/70 truncate">{programa.tag}</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('barra_movil_whatsapp', { programa: programa.id })}
              aria-label="Escribir por WhatsApp"
              className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5ZM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 1 1 12 22Zm5.5-7.5c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.8-.5Z"/></svg>
            </a>
            <a
              href={programa.inscripcion}
              onClick={() => trackEvent('barra_movil_inscribir', { programa: programa.id })}
              className="h-12 px-5 rounded-xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center gap-1.5 flex-shrink-0"
            >
              {cta} <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
