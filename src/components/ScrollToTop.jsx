import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Obtenemos la ruta actual (ej: "/paes", "/nosotros")
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que cambia la ruta, sube el scroll a 0,0 (Arriba a la izquierda)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente no renderiza nada visual, solo actúa "tras bambalinas"
  return null;
}