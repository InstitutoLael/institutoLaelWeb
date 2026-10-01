import React, { useEffect, useRef, useState } from 'react';

// Cursor de Lael (solo con mouse y sin "reducir movimiento"): un anillo que
// sigue al puntero con un poco de inercia, crece sobre los enlaces y muestra
// una palabra cuando el elemento tiene data-cursor="Ver". La flecha normal
// del sistema se mantiene: el anillo acompaña, no reemplaza.
const INTERACTIVO = 'a, button, summary, select, label, input, textarea, [role="button"], [data-cursor]';

export default function Cursor() {
  const ref = useRef(null);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches) return undefined;
    setActivo(true);
    const el = ref.current;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;

    // El ciclo corre solo mientras el anillo se está moviendo; cuando alcanza
    // al mouse, se detiene (no gasta batería con el mouse quieto).
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (el) el.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      if (!el) return;
      const t = e.target.closest && e.target.closest(INTERACTIVO);
      const label = t && t.getAttribute('data-cursor');
      el.classList.toggle('is-link', !!t);
      el.classList.toggle('has-label', !!label);
      el.firstChild.textContent = label || '';
    };
    const leave = () => el && el.classList.remove('is-on');
    const down = () => el && el.classList.add('is-down');
    const up = () => el && el.classList.remove('is-down');

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`lael-cursor ${activo ? '' : 'hidden'}`}>
      <span />
    </div>
  );
}
