// src/components/MultiHello.jsx
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * DATOS DEFAULT (Fallback)
 * Se alinean con la oferta del instituto: Español, Inglés, Coreano, Portugués.
 */
const DEFAULT_WORDS = [
  { text: "Hola",        lang: "es" }, // Base
  { text: "Hello",       lang: "en" }, // Inglés
  { text: "안녕하세요",     lang: "ko" }, // Coreano (K-Pop Vibe)
  { text: "Olá",         lang: "pt" }, // Portugués
  { text: "Bonjour",     lang: "fr" }, // Extra cultura
  { text: "Namaste",     lang: "hi" }, // Universalidad
  { text: "Ciao",        lang: "it" }, 
  { text: "你好",          lang: "zh" },
];

/**
 * MultiHello Component
 * Saludo rotativo con efecto "Slide Up & Blur" y gradiente animado.
 * Diseño alineado al vibe "International Hub".
 */
export default function MultiHello({
  intervalMs = 4000, // Un poco más rápido para mantener dinamismo
  words = DEFAULT_WORDS,
  pauseOnHover = true,
  className = "",
  // Prop para controlar si usamos el gradiente "K-Pop" (Idiomas) o uno "Gold" (Adultos)
  variant = "idiomas", // 'idiomas' | 'gold' | 'plain'
}) {
  
  // Lógica de Estado (Mantenemos tu lógica sólida)
  const safeWords = useMemo(() => (Array.isArray(words) && words.length ? words : DEFAULT_WORDS), [words]);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(true); // Control para reiniciar animación
  
  const timerRef = useRef(null);
  const playingRef = useRef(true);
  const hoverRef = useRef(false);

  // Función de cambio con trigger de animación
  const next = () => {
    setAnimating(false); // Reset visual
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
      setAnimating(true); // Iniciar animación
    }, 50); // Breve pausa para que React detecte el cambio de clase/estado
  };

  // Gestión del Timer
  const startTimer = () => {
    if (!playingRef.current || hoverRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, intervalMs);
  };

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Visibilidad de pestaña (Performance)
  useEffect(() => {
    const handleVisibility = () => {
      const isVisible = document.visibilityState === "visible";
      playingRef.current = isVisible;
      isVisible ? startTimer() : clearTimer();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [intervalMs, safeWords.length]);

  // Ciclo de vida inicial
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [intervalMs, safeWords.length]);

  // Handlers de Mouse
  const onEnter = () => {
    if (pauseOnHover) {
      hoverRef.current = true;
      clearTimer();
    }
  };
  const onLeave = () => {
    if (pauseOnHover) {
      hoverRef.current = false;
      startTimer();
    }
  };

  const current = safeWords[index];

  // Selección de Paleta de Colores según Vibe
  const getGradient = () => {
    if (variant === 'gold') return 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)'; // Escuela Adultos
    if (variant === 'idiomas') return 'linear-gradient(to right, #60A5FA, #E879F9, #2DD4BF)'; // Blue -> Pink -> Teal
    return 'none';
  };

  const gradientValue = getGradient();

  // CSS in JS (Injected)
  const css = `
    .mh-wrapper {
      display: inline-flex;
      position: relative;
      cursor: pointer;
      user-select: none;
      vertical-align: bottom; /* Alineación perfecta con texto plano */
      overflow: hidden; /* Necesario para el efecto slide */
      padding-bottom: 2px; /* Espacio para descender letras g, j, p, q, y */
    }

    .mh-text {
      font-weight: 800;
      line-height: 1.1;
      display: inline-block;
      white-space: nowrap;
      
      /* Gradiente y Color */
      ${variant !== 'plain' ? `
        background-image: ${gradientValue};
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: mh-gradient-move 5s ease infinite alternate;
      ` : 'color: inherit;'}
    }

    /* Animación de entrada: Slide Up + Blur Fade In */
    .mh-anim-in {
      animation: mh-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes mh-slide-up {
      0% {
        opacity: 0;
        transform: translateY(120%) scale(0.95);
        filter: blur(8px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0px);
      }
    }

    @keyframes mh-gradient-move {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }

    /* Accesibilidad: Reducción de movimiento */
    @media (prefers-reduced-motion: reduce) {
      .mh-anim-in { animation: none; opacity: 1; transform: none; filter: none; }
      .mh-text { animation: none; }
    }
  `;

  return (
    <>
      <span 
        className={`mh-wrapper ${className}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={next}
        role="button"
        aria-label="Saludo en diferentes idiomas"
        title="Clic para cambiar idioma"
      >
        <span 
          key={current.text} // El key fuerza el re-render para reiniciar animación CSS
          lang={current.lang} 
          dir={current.dir || "ltr"} 
          className={`mh-text ${animating ? 'mh-anim-in' : ''}`}
        >
          {current.text}
        </span>
      </span>
      <style>{css}</style>
    </>
  );
}