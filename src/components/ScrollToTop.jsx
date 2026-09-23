import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Obtenemos la ruta actual (ej: "/paes", "/nosotros")
  const { pathname } = useLocation();
  const primera = useRef(true);

  useEffect(() => {
    // Cada vez que cambia la ruta, sube el scroll a 0,0 (Arriba a la izquierda)
    window.scrollTo(0, 0);
    // Accesibilidad: al cambiar de página, el foco pasa al contenido principal
    // (así el teclado y los lectores de pantalla parten desde la página nueva).
    if (primera.current) { primera.current = false; return; }
    const main = document.getElementById("contenido");
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);

  // Este componente no renderiza nada visual, solo actúa "tras bambalinas"
  return null;
}
