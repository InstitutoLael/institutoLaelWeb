import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Calculator, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

// Ventana de salida: aparece UNA vez (cada 7 días) cuando alguien está por irse.
// Computador: cuando el mouse sale por arriba de la ventana.
// Celular: después de 60 segundos en el sitio, al subir rápido hacia arriba.
const KEY = 'lael_exit_shown';
const DIAS = 7;
const NO_MOSTRAR_EN = ['/inscripcion', '/gracias', '/testimonio', '/diagnostico', '/resultado-diagnostico', '/privacidad', '/alumnos'];

function yaMostrado() {
  try { return Date.now() - Number(localStorage.getItem(KEY) || 0) < DIAS * 86400000; } catch (_) { return true; }
}

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const inicio = useRef(Date.now());
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const bloqueada = NO_MOSTRAR_EN.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    if (bloqueada || yaMostrado()) return undefined;
    const mostrar = (via) => {
      if (yaMostrado()) return;
      try { localStorage.setItem(KEY, String(Date.now())); } catch (_) {}
      setOpen(true);
      trackEvent('ventana_salida_mostrada', { via, desde: location.pathname });
    };
    const onMouseOut = (e) => { if (!e.relatedTarget && e.clientY <= 0 && Date.now() - inicio.current > 8000) mostrar('mouse'); };
    let lastY = window.scrollY; let lastT = Date.now();
    const onScroll = () => {
      const y = window.scrollY; const t = Date.now();
      const velocidad = (lastY - y) / Math.max(1, t - lastT); // px/ms hacia arriba
      if (window.innerWidth < 1024 && t - inicio.current > 60000 && y > 600 && velocidad > 2.5) mostrar('scroll');
      lastY = y; lastT = t;
    };
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { document.removeEventListener('mouseout', onMouseOut); window.removeEventListener('scroll', onScroll); };
  }, [bloqueada, location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    // Foco adentro al abrir, Tab no se escapa, Escape cierra y el foco
    // vuelve a donde estaba.
    const previo = document.activeElement;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const els = Array.from(dialogRef.current.querySelectorAll('a[href], button:not([disabled])'));
      if (!els.length) return;
      const first = els[0]; const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (previo && previo.focus && document.body.contains(previo)) previo.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[#071D49]/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-desc"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md bg-white text-[#071D49] rounded-[28px] p-7 shadow-2xl">
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Cerrar" className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center hover:bg-[#071D49]/5">
              <X size={20} />
            </button>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 inline-flex items-center gap-2"><span className="w-5 h-1.5 rounded-full bg-[#D7E400]" aria-hidden="true" />Antes de irte</p>
            <h2 id="exit-title" className="font-display text-2xl font-extrabold uppercase tracking-tight leading-tight mb-3">¿Todavía no te decides?</h2>
            <p id="exit-desc" className="text-[#071D49]/75 leading-relaxed mb-6">Prueba una clase en vivo gratis, sin compromiso. O calcula si te alcanza para la carrera que quieres.</p>
            <div className="space-y-3">
              <Link to="/inscripcion?programa=clase-prueba" onClick={() => { setOpen(false); trackEvent('ventana_salida_clic', { opcion: 'clase_prueba' }); }}
                className="w-full min-h-[52px] rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2">
                <Sparkles size={18} /> Quiero mi clase de prueba
              </Link>
              <Link to="/calculadora" onClick={() => { setOpen(false); trackEvent('ventana_salida_clic', { opcion: 'calculadora' }); }}
                className="w-full min-h-[52px] rounded-2xl border-2 border-[#071D49]/15 font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2">
                <Calculator size={18} /> Calcular mi puntaje
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
