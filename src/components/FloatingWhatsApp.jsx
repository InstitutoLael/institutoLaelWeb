// src/components/FloatingWhatsApp.jsx
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp({
  phone = "56964626568",
  message = "Hola 👋 quisiera información sobre los programas del Instituto Lael",
  offset = { right: 20, bottom: 20 }, // px
}) {
  const cleanPhone = String(phone).replace(/\D/g, ""); // quita +, espacios, etc.
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp con Instituto Lael"
      data-analytics="cta-whatsapp"
      className="
        fixed z-[1040]
        grid place-items-center w-14 h-14 rounded-full
        bg-[#25D366] text-white
        shadow-lg ring-1 ring-black/5
        motion-safe:transition motion-safe:duration-300 motion-safe:ease-out
        motion-safe:hover:scale-105 hover:shadow-xl
        focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40
        sm:w-14 sm:h-14
      "
      style={{
        right: offset.right,
        bottom: `calc(${offset.bottom}px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}