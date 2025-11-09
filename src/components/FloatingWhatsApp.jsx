// src/components/FloatingWhatsApp.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp({
  phone = "56964626568",
  greetingMessage = "Hola 👋 quisiera información sobre los programas LAEL",
  questions = [
    "¿Cuáles son los horarios disponibles?",
    "¿Cuánto cuesta el curso de inglés?",
    "¿Ofrecen clases online?",
    "Información sobre certificaciones",
  ],
  tooltipText = "¿Necesitas ayuda? ¡Escríbenos!",
  color = "#25D366",
  size = 64, // px
  offset = { right: 20, bottom: 22 }, // px
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  const phoneClean = useMemo(() => String(phone).replace(/\D/g, ""), [phone]);
  const px = (v) => (typeof v === "number" ? `${v}px` : v);

  // Mostrar badge después de 3s si no hubo interacción
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  const waUrl = (msg) =>
    `https://wa.me/${phoneClean}?text=${encodeURIComponent(msg)}`;

  const openWhatsApp = (msg) => {
    window.open(waUrl(msg), "_blank", "noopener,noreferrer");
    setOpen(false);
    setShowBadge(false);
  };

  const onToggle = (e) => {
    e.stopPropagation();
    setOpen((v) => !v);
    setShowBadge(false);
  };

  const onQuestionClick = (q) => (e) => {
    e.stopPropagation();
    openWhatsApp(q);
  };

  const darker = useMemo(() => adjustBrightness(color, -20), [color]);

  return (
    <>
      <div
        className="lael-wa-wrapper"
        style={{
          right: px(offset.right),
          bottom: `calc(${px(offset.bottom)} + env(safe-area-inset-bottom, 0))`,
        }}
      >
        {/* Panel/preview del chat */}
        <div
          ref={panelRef}
          className={`wa-panel ${open ? "show" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Asistente de WhatsApp"
        >
          <div className="wa-head" style={{ background: `linear-gradient(90deg, ${color}, ${darker})` }}>
            <div className="wa-brand">
              <div className="wa-brand-icon">
                <FaWhatsapp aria-hidden />
              </div>
              <div>
                <div className="wa-brand-title">Instituto Lael</div>
                <div className="wa-brand-sub">En línea • Responde rápido</div>
              </div>
            </div>
          </div>

          <div className="wa-body" onClick={(e) => e.stopPropagation()}>
            <div className="wa-bubble">
              <p className="wa-bubble-main">¡Hola! 👋 Soy el asistente virtual de Instituto Lael</p>
              <p className="wa-bubble-sub">¿En qué puedo ayudarte hoy?</p>
            </div>

            <div className="wa-qs">
              {questions.slice(0, 4).map((q, i) => (
                <button key={i} className="wa-q" onClick={onQuestionClick(q)}>
                  <span className="wa-q-text">{q}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="wa-foot">
            <button
              className="wa-primary"
              onClick={() => openWhatsApp(greetingMessage)}
              style={{ backgroundColor: color }}
            >
              <FaWhatsapp aria-hidden />
              <span>Iniciar Conversación</span>
            </button>
            <div className="wa-hint">Respuesta típica en pocos minutos</div>
          </div>
        </div>

        {/* Botón flotante */}
        <div className="wa-btn-wrap">
          {/* Tooltip */}
          <div className={`wa-tip ${hover ? "show" : ""}`}>
            <span>{tooltipText}</span>
            <div className="wa-tip-caret" />
          </div>

          {/* Badge de notificación */}
          {showBadge && <div className="wa-badge" aria-hidden>1</div>}

          <button
            ref={btnRef}
            type="button"
            aria-label="Abrir chat de WhatsApp"
            title="Contactar por WhatsApp"
            className={`wa-btn pulse`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onToggle}
            style={{
              width: px(size),
              height: px(size),
              backgroundColor: color,
            }}
          >
            <FaWhatsapp className="wa-icon" aria-hidden />
          </button>
        </div>
      </div>

      <style>{css({ color, darker, size })}</style>
    </>
  );
}

/* ---------- helpers ---------- */
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0xff) + amt;
  const B = (num & 0xff) + amt;
  const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
  return (
    "#" +
    ((1 << 24) + (clamp(R) << 16) + (clamp(G) << 8) + clamp(B))
      .toString(16)
      .slice(1)
  );
}

function css({ color, darker, size }) {
  return `
:root{ --wa:${color}; --wa-dark:${darker}; }

/* Wrapper posicionado */
.lael-wa-wrapper{
  position:fixed; z-index:1040; right:20px; bottom:22px;
}

/* Panel */
.wa-panel{
  position:absolute; right:0; bottom:${size + 20}px;
  width:320px; max-width:85vw;
  background:#fff; border:1px solid #eef2f7; border-radius:16px;
  box-shadow:0 20px 50px rgba(2,6,23,.22);
  overflow:hidden; visibility:hidden; opacity:0; transform:translateY(8px);
  transition:opacity .2s ease, transform .2s ease, visibility 0s linear .2s;
}
.wa-panel.show{ visibility:visible; opacity:1; transform:translateY(0); transition-delay:0s; }

/* Head */
.wa-head{ padding:12px; color:#fff; }
.wa-brand{ display:flex; align-items:center; gap:10px; }
.wa-brand-icon{
  width:36px; height:36px; border-radius:999px; background:rgba(255,255,255,.2);
  display:grid; place-items:center;
}
.wa-brand-title{ font-weight:700; font-size:.95rem; line-height:1; }
.wa-brand-sub{ font-size:.78rem; opacity:.9; }

/* Body */
.wa-body{ background:#f8fafc; padding:12px; max-height:280px; overflow:auto; }
.wa-bubble{
  background:#fff; border:1px solid #eef2f7; border-radius:12px 12px 12px 4px;
  padding:10px 12px; box-shadow:0 4px 12px rgba(2,6,23,.06); margin-bottom:10px;
}
.wa-bubble-main{ margin:0; font-size:.9rem; color:#111827; }
.wa-bubble-sub{ margin:.2rem 0 0; font-size:.78rem; color:#6b7280; }

.wa-qs{ display:grid; gap:8px; }
.wa-q{
  width:100%; text-align:left; background:#fff; border:1px solid #eef2f7;
  border-radius:10px; padding:10px 12px; cursor:pointer;
  transition:background .15s ease, transform .15s ease, border-color .15s ease;
}
.wa-q:hover{ background:#f0fdf4; border-color:#c7f9d5; transform:translateX(-1px); }
.wa-q-text{ font-size:.86rem; color:#1f2937; }

/* Footer */
.wa-foot{ padding:10px 12px; background:#fff; border-top:1px solid #eef2f7; }
.wa-primary{
  width:100%; display:inline-flex; align-items:center; justify-content:center;
  gap:8px; color:#fff; font-weight:700; padding:10px 12px; border-radius:10px;
  border:0; cursor:pointer; transition:filter .15s ease, transform .1s ease;
}
.wa-primary:hover{ filter:brightness(1.05); }
.wa-primary:active{ transform:translateY(1px); }
.wa-hint{ text-align:center; color:#6b7280; font-size:.72rem; margin-top:6px; }

/* Botón flotante */
.wa-btn-wrap{ position:relative; display:grid; place-items:center; }
.wa-btn{
  display:inline-grid; place-items:center; border-radius:999px; color:#fff;
  border:1px solid #128C7E; box-shadow:0 10px 22px rgba(2,6,23,.35);
  transition:transform .2s ease, box-shadow .2s ease, background .2s ease;
}
.wa-btn:hover{ transform:scale(1.06); box-shadow:0 16px 28px rgba(2,6,23,.45); background:var(--wa-dark); }
.wa-icon{ width:28px; height:28px; }

/* Pulse sutil */
@keyframes pulse {
  0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,.6); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(37,211,102,0); }
}
.pulse{ animation:pulse 2s infinite; }

/* Tooltip */
.wa-tip{
  position:absolute; right:calc(100% + 10px); top:50%; transform:translateY(-50%) translateX(8px);
  background:#111827; color:#fff; padding:6px 10px; border-radius:10px;
  font-size:.82rem; white-space:nowrap; box-shadow:0 8px 18px rgba(0,0,0,.2);
  opacity:0; visibility:hidden; transition:opacity .2s ease, transform .2s ease, visibility 0s linear .2s;
}
.wa-tip.show{ opacity:1; visibility:visible; transform:translateY(-50%) translateX(0); transition-delay:0s; }
.wa-tip-caret{
  position:absolute; right:-6px; top:50%; transform:translateY(-50%);
  width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-left:6px solid #111827;
}

/* Badge */
.wa-badge{
  position:absolute; top:-6px; right:-6px; width:20px; height:20px; border-radius:999px;
  background:#ef4444; color:#fff; display:grid; place-items:center; font-weight:800; font-size:.72rem;
  animation: bounce 1.2s infinite;
}
@keyframes bounce { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-2px); } }

/* Accesibilidad oculta */
.sr-only{
  position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
}

/* Mobile: el tooltip desaparece */
@media(max-width: 600px){
  .wa-tip{ display:none; }
}
`;
}