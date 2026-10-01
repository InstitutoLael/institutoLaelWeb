import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Desplazamiento suave con la rueda del mouse (Lenis). En celulares se deja
// el scroll nativo, y si la persona pidió menos movimiento no se activa.
// Queda en window.__lenis para que ScrollToTop pueda subir al instante.
//
// Cuando algo bloquea el scroll de la página (el menú del celular pone
// overflow: hidden en <html>), Lenis se detiene solo.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), allowNestedScroll: true });
    window.__lenis = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const html = document.documentElement;
    const sync = () => (html.style.overflow === 'hidden' ? lenis.stop() : lenis.start());
    const obs = new MutationObserver(sync);
    obs.observe(html, { attributes: true, attributeFilter: ['style'] });

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
