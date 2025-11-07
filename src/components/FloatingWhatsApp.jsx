// src/components/FloatingWhatsApp.jsx
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp({
  phone = "56964626568",
  message = "Hola 👋 quisiera información sobre los programas del Instituto Lael",
  offset = { right: 20, bottom: 22 },
}) {
  const [hover, setHover] = useState(false);
  const clean = String(phone).replace(/\D/g, "");
  const href = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp con Instituto Lael"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="lael-wsp"
        style={{
          right: offset.right,
          bottom: `calc(${offset.bottom}px + env(safe-area-inset-bottom,0))`,
        }}
      >
        <FaWhatsapp className="icon" aria-hidden="true" />
        <span className="sr-only">WhatsApp</span>

        {/* Globito de texto visible sólo al hover o en desktop */}
        <span className={`bubble ${hover ? "show" : ""}`}>
          ¿En qué podemos ayudarte?
        </span>
      </a>

      <style>{`
        .lael-wsp{
          position:fixed; z-index:1040;
          display:inline-grid; place-items:center;
          width:56px; height:56px;
          border-radius:999px;
          background:#25D366; color:#fff;
          box-shadow:0 6px 16px rgba(2,6,23,.35);
          transition:all .25s ease;
          cursor:pointer;
          text-decoration:none;
        }
        .lael-wsp:hover{ transform:scale(1.07); box-shadow:0 10px 22px rgba(2,6,23,.45); }
        .lael-wsp .icon{ width:28px; height:28px; }

        /* Globito de mensaje */
        .bubble{
          position:absolute;
          right:64px; bottom:10px;
          background:#fff;
          color:#111827;
          font-weight:700;
          font-size:.82rem;
          padding:.45rem .75rem;
          border-radius:12px;
          box-shadow:0 4px 16px rgba(0,0,0,.15);
          white-space:nowrap;
          opacity:0; transform:translateX(10px);
          transition:opacity .25s ease, transform .25s ease;
          pointer-events:none;
        }
        .bubble::after{
          content:"";
          position:absolute; right:-6px; bottom:12px;
          width:0; height:0;
          border-top:6px solid transparent;
          border-bottom:6px solid transparent;
          border-left:6px solid #fff;
        }
        .bubble.show{ opacity:1; transform:translateX(0); }

        /* Entrada animada */
        @keyframes fadeInUp{
          from{ opacity:0; transform:translateY(20px) scale(.9); }
          to{ opacity:1; transform:translateY(0) scale(1); }
        }
        .lael-wsp{ animation:fadeInUp .5s ease .5s both; }

        /* Accesibilidad oculta */
        .sr-only{
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }

        @media(max-width:600px){
          .bubble{ display:none; } /* en móvil sólo ícono */
        }
      `}</style>
    </>
  );
}