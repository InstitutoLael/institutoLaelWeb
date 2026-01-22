import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// Asegúrate de tener: npm install react-icons
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs"; // Para el doble check azul

export default function FloatingWhatsApp({
  phone = "56964626568",
  questions = [
    "🎓 ¿Qué cursos tienen disponibles?",
    "💰 Quiero cotizar un plan",
    "🕒 ¿Horarios de atención?",
    "📍 ¿Dónde están ubicados?",
  ],
  tooltipText = "¡Hablemos!",
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isTyping, setIsTyping] = useState(true); // Estado para animación de escritura

  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation();

  // 1. Limpiar número
  const phoneClean = useMemo(() => String(phone).replace(/\D/g, ""), [phone]);

  // 2. Saludo según hora del día
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días!";
    if (hour < 20) return "¡Buenas tardes!";
    return "¡Buenas noches!";
  }, []);

  // 2.1 Mensaje Inteligente según Ruta
  const smartMessage = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/paes")) return "Hola, me interesa el Preuniversitario.";
    if (path.startsWith("/idiomas")) return "Hola, quiero información sobre sus Cursos de Idiomas.";
    if (path.startsWith("/lsch")) return "Hola, me interesa el curso de Lengua de Señas.";
    if (path.startsWith("/empresas")) return "Hola, busco capacitación para mi empresa.";
    return "Hola, tengo una consulta general.";
  }, [location.pathname]);

  // 3. Efecto Badge (Notificación)
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // 4. Efecto "Escribiendo..." al abrir
  useEffect(() => {
    if (open) {
      setIsTyping(true);
      const t = setTimeout(() => setIsTyping(false), 1200); // 1.2 seg de "escribiendo"
      return () => clearTimeout(t);
    } else {
      setIsTyping(true); // Reset para la próxima
    }
  }, [open]);

  // 5. Cerrar al hacer clic fuera
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
    const messageToSend = msg || smartMessage;
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(messageToSend)}`;
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

        {/* PANEL DE CHAT */}
        <div ref={panelRef} className={`wa-panel ${open ? "open" : ""}`}>

          {/* Header */}
          <div className="wa-header">
            <div className="wa-avatar-box">
              <FaWhatsapp className="wa-avatar-icon" />
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

          {/* Body (Chat) */}
          <div className="wa-body">

            {/* Mensaje o Typing */}
            {isTyping ? (
              <div className="wa-typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            ) : (
              <div className="wa-msg in">
                <span className="wa-msg-name">Asistente Virtual</span>
                <p>{timeGreeting} 👋 Bienvenido a Instituto Lael. ¿En qué te podemos ayudar hoy?</p>
                <div className="wa-meta">
                  <span className="wa-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <BsCheckAll className="wa-read-icon" />
                </div>
              </div>
            )}

            {/* Chips de Preguntas (Solo aparecen si no está escribiendo) */}
            {!isTyping && (
              <div className="wa-options">
                {questions.map((q, i) => (
                  <button key={i} className="wa-chip" onClick={() => openWhatsApp(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="wa-footer" onClick={() => openWhatsApp(smartMessage)}>
            <div className="wa-input-fake">{smartMessage}...</div>
            <button className="wa-send-btn">
              <FaPaperPlane />
            </button>
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
          <div className={`wa-tooltip ${hover && !open ? "visible" : ""}`}>
            {tooltipText}
          </div>

          {showBadge && !open && <span className="wa-badge">1</span>}

          <button className={`wa-float-btn ${open ? "active" : ""}`} aria-label="Abrir WhatsApp">
            {open ? <FaTimes /> : <FaWhatsapp />}
          </button>
        </div>

      </div>

      <style>{css}</style>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS (PULIDO Y ANIMADO)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
.wa-wrapper {
  position: fixed; bottom: 30px; right: 30px; z-index: 9999;
  font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: flex-end;
}

/* --- BOTÓN --- */
.wa-float-btn {
  width: 60px; height: 60px; border-radius: 50%;
  background: #25D366; color: white; border: none; font-size: 32px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative; z-index: 20;
  animation: wa-pulse 2s infinite;
}
.wa-float-btn:hover { transform: scale(1.1); box-shadow: 0 10px 30px rgba(37, 211, 102, 0.6); animation: none; }
.wa-float-btn.active { background: #1f2937; transform: rotate(180deg); animation: none; }

/* Badge */
.wa-badge {
  position: absolute; top: 0; right: 0;
  background: #ef4444; color: white; font-size: 11px; font-weight: 800;
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #000; z-index: 25;
  animation: wa-bounce 1s infinite;
}

/* Tooltip */
.wa-tooltip {
  position: absolute; right: 75px; top: 50%; transform: translateY(-50%) translateX(10px);
  background: #111827; color: white; padding: 6px 12px; border-radius: 8px;
  font-size: 13px; font-weight: 600; white-space: nowrap; opacity: 0; visibility: hidden;
  transition: 0.2s; pointer-events: none; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.wa-tooltip.visible { opacity: 1; visibility: visible; transform: translateY(-50%) translateX(0); }

/* --- PANEL --- */
.wa-panel {
  position: absolute; bottom: 80px; right: 0;
  width: 360px; height: 480px; max-width: calc(100vw - 40px);
  background: #0f1115; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px;
  box-shadow: 0 25px 80px rgba(0,0,0,0.7);
  display: flex; flex-direction: column; overflow: hidden;
  transform-origin: bottom right; transform: scale(0.8); opacity: 0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  visibility: hidden;
}
.wa-panel.open { transform: scale(1); opacity: 1; visibility: visible; }

/* Header */
.wa-header {
  background: #005c4b; /* Verde Oscuro WhatsApp */
  padding: 16px 20px; display: flex; align-items: center; gap: 12px;
}
.wa-avatar-box {
  width: 42px; height: 42px; background: white; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.wa-avatar-icon { color: #25D366; font-size: 26px; }
.wa-info { flex-grow: 1; }
.wa-name { display: block; color: white; font-weight: 700; font-size: 16px; }
.wa-status { display: flex; align-items: center; gap: 5px; color: rgba(255,255,255,0.85); font-size: 12px; }
.dot { width: 6px; height: 6px; background: #25D366; border-radius: 50%; box-shadow: 0 0 5px #25D366; }
.wa-close { color: rgba(255,255,255,0.7); font-size: 16px; }

/* Body */
.wa-body {
  flex-grow: 1; padding: 20px;
  background-color: #0b141a;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-blend-mode: overlay; opacity: 0.95;
  overflow-y: auto; display: flex; flex-direction: column; gap: 10px;
}

/* Mensaje */
.wa-msg {
  background: #202c33; color: #e9edef; padding: 10px 14px;
  border-radius: 0 12px 12px 12px; max-width: 85%; align-self: flex-start;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); position: relative; animation: wa-slide 0.3s ease-out;
}
.wa-msg-name { font-size: 12px; color: #25D366; font-weight: 700; display: block; margin-bottom: 4px; }
.wa-msg p { margin: 0; font-size: 14.5px; line-height: 1.45; }
.wa-meta { display: flex; justify-content: flex-end; align-items: center; gap: 4px; margin-top: 4px; }
.wa-time { font-size: 10px; color: rgba(255,255,255,0.5); }
.wa-read-icon { color: #53bdeb; font-size: 14px; }

/* Typing Effect */
.wa-typing {
  background: #202c33; padding: 12px 16px; border-radius: 0 12px 12px 12px;
  align-self: flex-start; display: flex; gap: 4px; align-items: center; width: fit-content;
}
.typing-dot {
  width: 6px; height: 6px; background: #8696a0; border-radius: 50%;
  animation: wa-typing 1.4s infinite ease-in-out both;
}
.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

/* Chips */
.wa-options { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; margin-top: auto; padding-top: 20px; }
.wa-chip {
  background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3);
  color: #25D366; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: 0.2s; text-align: right; max-width: 90%; animation: wa-fade 0.4s ease;
}
.wa-chip:hover { background: rgba(37, 211, 102, 0.2); transform: translateX(-3px); }

/* Footer */
.wa-footer {
  padding: 10px 15px; background: #202c33; border-top: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; gap: 10px; cursor: pointer;
}
.wa-input-fake {
  flex-grow: 1; background: #2a3942; color: #8696a0; padding: 10px 16px;
  border-radius: 24px; font-size: 14px;
}
.wa-send-btn {
  width: 40px; height: 40px; background: #005c4b; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border:none;
}

@keyframes wa-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes wa-slide { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
@keyframes wa-fade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@keyframes wa-typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
@keyframes wa-pulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

@media (max-width: 480px) {
  .wa-panel { bottom: 0; right: 0; width: 100%; height: 100%; max-width: none; border-radius: 0; }
  .wa-wrapper { bottom: 20px; right: 20px; }
}
`;