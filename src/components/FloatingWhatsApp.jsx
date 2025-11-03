// src/components/FloatingWhatsApp.jsx
import { FaWhatsapp } from "react-icons/fa";

/**
 * Botón flotante de WhatsApp – versión profesional
 * - SVG nativo (no se pixela, menos peso)
 * - Accesible: aria-label + sr-only + foco visible
 * - Animaciones sutiles que respetan reduced motion
 */
export default function FloatingWhatsApp({
  phone = "56964626568",
  message = "Hola 👋 quisiera información sobre los programas del Instituto Lael",
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar por WhatsApp con Instituto Lael"
      data-analytics="cta-whatsapp"
      className="
        fixed right-5 bottom-5 z-[1040]
        grid place-items-center w-14 h-14 rounded-full
        bg-[#25D366] text-white
        shadow-lg ring-1 ring-black/5
        motion-safe:transition motion-safe:duration-300 motion-safe:ease-out
        motion-safe:hover:scale-105 hover:shadow-xl
        focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40
        sm:right-6 sm:bottom-6
      "
    >
      <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}