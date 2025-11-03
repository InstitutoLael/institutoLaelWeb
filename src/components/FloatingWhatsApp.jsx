// src/components/FloatingWhatsApp.jsx
import waLogo from "../assets/img/Logos/whatsapp-icon.svg"; // usa tu SVG o PNG en /assets/img/Logos/

export default function FloatingWhatsApp() {
  const wspMsg = encodeURIComponent(
    "Hola 👋 quisiera información sobre los programas del Instituto Lael"
  );

  return (
    <>
      <a
        href={`https://wa.me/56964626568?text=${wspMsg}`}
        className="lael-wa"
        target="_blank"
        rel="noreferrer"
        aria-label="Hablar por WhatsApp con Instituto Lael"
      >
        <img src={waLogo} alt="WhatsApp Instituto Lael" />
      </a>

      <style>{`
        .lael-wa {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 1050;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background-color: #25D366;
          box-shadow: 0 8px 24px rgba(2,6,23,.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lael-wa img {
          width: 34px;
          height: 34px;
          filter: brightness(0) invert(1);
        }

        .lael-wa:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 32px rgba(2,6,23,.35);
        }

        @media (max-width: 640px) {
          .lael-wa {
            width: 56px;
            height: 56px;
            right: 14px;
            bottom: 14px;
          }
          .lael-wa img {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
}
