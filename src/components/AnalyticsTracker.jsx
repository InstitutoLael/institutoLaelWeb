import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

// 1) Cuenta cada cambio de página en Google Analytics (el sitio es de una sola
//    página, así que sin esto solo se contaba la primera visita).
// 2) Registra clics importantes: inscripción, WhatsApp, calculadora, teléfono.
export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const desde = window.location.pathname;
      const texto = (a.textContent || '').trim().slice(0, 60);
      if (href.startsWith('/inscripcion')) trackEvent('clic_inscribirme', { desde, programa: new URLSearchParams(href.split('?')[1] || '').get('programa') || 'general', texto });
      else if (href.includes('wa.me/')) trackEvent('clic_whatsapp', { desde, texto });
      else if (href.startsWith('/calculadora')) trackEvent('clic_calculadora', { desde });
      else if (href.startsWith('mailto:')) trackEvent('clic_correo', { desde });
      else if (href.includes('instagram.com') || href.includes('youtube.com')) trackEvent('clic_red_social', { desde, red: href.includes('instagram') ? 'instagram' : 'youtube' });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
