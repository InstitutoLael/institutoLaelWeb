// src/components/MultiHello.jsx
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * MultiHello — saludo rotativo en varios idiomas
 * Accesible, eficiente (pausa en background), y configurable.
 */
const DEFAULT_WORDS = [
  { text: "Hola",        lang: "es" },
  { text: "Hello",       lang: "en" },
  { text: "안녕하세요",     lang: "ko" },
  { text: "Bonjour",     lang: "fr" },
  { text: "Olá",         lang: "pt" },
  { text: "Ciao",        lang: "it" },
  { text: "Hallo",       lang: "de" },
  { text: "你好",          lang: "zh" },
  { text: "こんにちは",      lang: "ja" },
  { text: "مرحبا",         lang: "ar", dir: "rtl" },
];

/**
 * Props
 * - intervalMs: ms entre cambios (default 8000)
 * - words: lista de {text, lang?, dir?}
 * - pauseOnHover: pausa rotación al hover (desktop)
 * - className: clases adicionales
 * - withGradient: aplica gradiente de marca
 * - live: "polite" | "off" (aria-live)
 */
export default function MultiHello({
  intervalMs = 8000,
  words = DEFAULT_WORDS,
  pauseOnHover = true,
  className = "",
  withGradient = true,
  live = "polite",
}) {
  const safeWords = useMemo(
    () => (Array.isArray(words) && words.length ? words : DEFAULT_WORDS),
    [words]
  );

  const [i, setI] = useState(0);
  const playingRef = useRef(true);     // estado de reproducción
  const hoverRef = useRef(false);      // seguimiento de hover
  const timerRef = useRef(null);

  // Avanza al siguiente saludo
  const next = () => setI((v) => (v + 1) % safeWords.length);

  // Controla el timer
  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const startTimer = () => {
    if (!playingRef.current || hoverRef.current) return;
    clearTimer();
    timerRef.current = setInterval(next, intervalMs);
  };

  // Pausa en background (visibilidad de pestaña)
  useEffect(() => {
    const onVis = () => {
      const visible = document.visibilityState === "visible";
      playingRef.current = visible;
      visible ? startTimer() : clearTimer();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, safeWords.length]);

  // Inicia timer
  useEffect(() => {
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, safeWords.length]);

  // Hover pause (opcional)
  const onEnter = () => {
    if (!pauseOnHover) return;
    hoverRef.current = true;
    clearTimer();
  };
  const onLeave = () => {
    if (!pauseOnHover) return;
    hoverRef.current = false;
    startTimer();
  };

  const current = safeWords[i];

  return (
    <span
      className={`multihello ${className}`}
      role="text"
      aria-live={live}
      aria-atomic="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={next}
      title="Click para cambiar saludo"
    >
      {/* texto con atributo lang/dir correcto */}
      <span lang={current.lang} dir={current.dir || "ltr"} className="mh-text">
        {current.text}
      </span>

      {/* estilos locales */}
      <style>{`
        .multihello{
          display:inline-block;
          position:relative;
          padding:0 .2rem;
          cursor:default;
          user-select:none;
          -webkit-tap-highlight-color: transparent;
        }
        .multihello .mh-text{
          font-weight:1000;
          line-height:1;
          ${withGradient ? `
          /* gradiente sutil de marca */
          background: linear-gradient(90deg, #a5b4fc, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 0 rgba(0,0,0,0);` : `
          color:#ffffff;`
        }
          animation: mh-fade .35s ease;
          will-change: transform, opacity;
        }

        @keyframes mh-fade{
          from{ opacity:0; transform: translateY(6px); }
          to  { opacity:1; transform: translateY(0); }
        }

        /* foco accesible si se navega con teclado (por si se hace focus via JS) */
        .multihello:focus-visible{
          outline:2px solid #22d3ee;
          outline-offset:2px;
          border-radius:6px;
        }

        /* respeta preferencias de movimiento reducido */
        @media (prefers-reduced-motion: reduce){
          .multihello .mh-text{
            animation: none;
          }
        }
      `}</style>
    </span>
  );
}