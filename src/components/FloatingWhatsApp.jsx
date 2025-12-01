import { useEffect, useMemo, useRef, useState } from "react";
// Asegúrate de tener react-icons instalado: npm install react-icons
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export default function FloatingWhatsApp({
  phone = "56964626568",
  greetingMessage = "Hola 👋, vengo de la web y quisiera información.",
  questions = [
    "🎓 ¿Qué cursos tienen disponibles?",
    "💰 Quiero cotizar un plan",
    "🕒 ¿Horarios de atención?",
    "📍 ¿Dónde están ubicados?",
  ],
  tooltipText = "¡Hablemos!",
  color = "#25D366", // El verde oficial de WA
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // Formatear número
  const phoneClean = useMemo(() => String(phone).replace(/\D/g, ""), [phone]);

  // Badge aparece a los 3s
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Click outside cerrar
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!panelRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  const openWhatsApp = (msg) => {
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setShowBadge(false);
  };

  const toggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
    if (!open) setShowBadge(false);
  };

  return (
    <>
      <div className="wa-wrapper">
        
        {/* PANEL DE CHAT (Glassmorphism) */}
        <div 
          ref={panelRef} 
          className={`wa-panel ${open ? "open" : ""}`}
        >
          {/* Header */}
          <div className="wa-header">
            <div className="wa-avatar">
              <FaWhatsapp />
            </div>
            <div className="wa-info">
              <span className="wa-name">Equipo Lael</span>
              <span className="wa-status">
                <span className="dot"></span> En línea
              </span>
            </div>
            <button className="wa-close" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="wa-body">
            {/* Mensaje de bienvenida (simulado) */}
            <div className="wa-msg in">
              <span className="wa-msg-name">Asistente Virtual</span>
              <p>¡Hola! 👋 Bienvenido a Instituto Lael. ¿En qué te podemos ayudar hoy?</p>
              <span className="wa-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>

            {/* Preguntas Frecuentes */}
            <div className="wa-options">
              {questions.map((q, i) => (
                <button key={i} className="wa-chip" onClick={() => openWhatsApp(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Footer (Input simulado) */}
          <div className="wa-footer" onClick={() => openWhatsApp(greetingMessage)}>
            <div className="wa-input-fake">Escribe un mensaje...</div>
            <div className="wa-send-btn">
              <FaWhatsapp />
            </div>
          </div>
        </div>

        {/* BOTÓN FLOTANTE */}
        <div 
          ref={btnRef}
          className="wa-btn-container"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={toggle}
        >
          {/* Tooltip */}
          <div className={`wa-tooltip ${hover && !open ? "visible" : ""}`}>
            {tooltipText}
          </div>

          {/* Badge */}
          {showBadge && !open && <span className="wa-badge">1</span>}

          {/* Botón Circular */}
          <button className={`wa-float-btn ${open ? "active" : ""}`} aria-label="Chat WhatsApp">
            {open ? <FaTimes /> : <FaWhatsapp />}
          </button>
        </div>

      </div>

      {/* ESTILOS INYECTADOS */}
      <style>{css}</style>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS (DARK MODE INTEGRADO)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
/* Wrapper fijo en la esquina */
.wa-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* --- BOTÓN FLOTANTE --- */
.wa-float-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366; /* Verde WA */
  color: white;
  border: none;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 20;
}

.wa-float-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
}

.wa-float-btn.active {
  background: #1f2937; /* Gris oscuro al abrir */
  transform: rotate(90deg);
}

/* Badge Notificación */
.wa-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 800;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000; /* Borde negro para separar */
  z-index: 25;
  animation: bounce 1s infinite;
}

/* Tooltip */
.wa-tooltip {
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  background: #1f2937;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s;
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
.wa-tooltip.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0);
}

/* --- PANEL DE CHAT (Glassmorphism Dark) --- */
.wa-panel {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  max-width: calc(100vw - 40px);
  height: 450px;
  background: #0f1115; /* Fondo muy oscuro */
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
  transform: scale(0);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  visibility: hidden;
}

.wa-panel.open {
  transform: scale(1);
  opacity: 1;
  visibility: visible;
}

/* Header */
.wa-header {
  background: #064e3b; /* Verde oscuro elegante */
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.wa-avatar {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #25D366;
  font-size: 24px;
}
.wa-info { flex-grow: 1; }
.wa-name { display: block; color: white; font-weight: 700; font-size: 15px; }
.wa-status { display: block; color: rgba(255,255,255,0.8); font-size: 12px; display: flex; align-items: center; gap: 5px; }
.dot { width: 8px; height: 8px; background: #25D366; border-radius: 50%; }
.wa-close { background: none; border: none; color: rgba(255,255,255,0.6); cursor: pointer; font-size: 14px; }

/* Body */
.wa-body {
  flex-grow: 1;
  padding: 20px;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"); /* Fondo clásico WA Dark */
  background-color: #0b141a;
  background-blend-mode: soft-light;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Mensaje Entrante */
.wa-msg {
  background: #1f2c34; /* Gris oscuro WA */
  color: #e9edef;
  padding: 10px 12px;
  border-radius: 0 12px 12px 12px;
  max-width: 85%;
  align-self: flex-start;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  position: relative;
  animation: slideIn 0.3s ease-out;
}
.wa-msg-name { font-size: 11px; color: #25D366; font-weight: 700; display: block; margin-bottom: 4px; }
.wa-msg p { margin: 0; font-size: 14px; line-height: 1.4; }
.wa-time { font-size: 10px; color: rgba(255,255,255,0.5); display: block; text-align: right; margin-top: 4px; }

/* Chips de Preguntas */
.wa-options { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; margin-top: auto; }
.wa-chip {
  background: rgba(37, 211, 102, 0.15); /* Verde translúcido */
  border: 1px solid rgba(37, 211, 102, 0.3);
  color: #25D366;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  text-align: right;
  max-width: 90%;
}
.wa-chip:hover { background: rgba(37, 211, 102, 0.3); color: white; transform: translateX(-5px); }

/* Footer (Input Fake) */
.wa-footer {
  padding: 10px;
  background: #1f2c34;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.wa-input-fake {
  flex-grow: 1;
  background: #2a3942;
  color: rgba(255,255,255,0.5);
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
}
.wa-send-btn {
  width: 40px;
  height: 40px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }

/* Mobile adjustments */
@media (max-width: 480px) {
  .wa-panel { bottom: 0; right: 0; width: 100%; height: 100%; max-width: none; border-radius: 0; }
  .wa-wrapper { bottom: 20px; right: 20px; }
}
`;