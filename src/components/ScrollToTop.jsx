import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Obtenemos la ruta actual (ej: "/paes", "/nosotros")
  const { pathname, hash } = useLocation();
  const primera = useRef(true);

  useEffect(() => {
    // Con un #ancla (ej: /paes#intensivo) bajamos a esa sección. La página
    // carga de a poco, así que la buscamos durante un par de segundos.
    if (hash) {
      let intentos = 0;
      const id = setInterval(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el || ++intentos > 20) {
          clearInterval(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearInterval(id);
    }
    // Cada vez que cambia la ruta, sube el scroll a 0,0 (Arriba a la izquierda)
    window.scrollTo(0, 0);
    // Accesibilidad: al cambiar de página, el foco pasa al contenido principal
    // (así el teclado y los lectores de pantalla parten desde la página nueva).
    if (primera.current) { primera.current = false; return undefined; }
    const main = document.getElementById("contenido");
    if (main) main.focus({ preventScroll: true });
    return undefined;
  }, [pathname, hash]);

  // Este componente no renderiza nada visual, solo actúa "tras bambalinas"
  return null;
}
