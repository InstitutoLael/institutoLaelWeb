// src/components/StatsBand.jsx
import { useEffect, useRef, useState } from "react";

// --- HOOK: Para detectar cuando el usuario ve la sección ---
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.3 } // Se activa cuando el 30% del elemento es visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

// --- COMPONENTE: Número Animado ---
function AnimatedNumber({ value, duration = 2000, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime;
    let animationFrame;

    // Limpiamos el valor (ej: "11.000" -> 11000)
    const end = parseInt(String(value).replace(/\./g, "").replace(/,/g, ""), 10);
    if (isNaN(end)) { setCount(value); return; } // Si no es número, lo mostramos tal cual

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo) para que frene suave al final
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, start]);

  // Formateamos de vuelta a string con miles (11000 -> "11.000")
  return count.toLocaleString("es-CL");
}

// --- CONFIGURACIÓN DEFAULT ---
const DEFAULT_ITEMS = [
  { value: "87", suffix: "%", label: "De nuestros alumnos alcanza su puntaje soñado" },
  { prefix: "+", value: "11000", suffix: "h", label: "Horas de clases en vivo impartidas" },
  { value: "9", suffix: "/10", label: "Estudiantes nos recomiendan a sus amigos" },
];

export default function StatsBand({ items = DEFAULT_ITEMS }) {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  return (
    <section className="stats-section" aria-label="Nuestras Cifras" ref={ref}>
      <style>{css}</style>
      
      {/* Fondo decorativo sutil */}
      <div className="stats-glow" aria-hidden="true" />

      <div className="stats-container">
        <div className="stats-grid">
          {items.map((it, i) => (
            <div key={i} className="stat-card" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="stat-value-wrapper">
                {it.prefix && <span className="stat-affix">{it.prefix}</span>}
                <span className="stat-number">
                  <AnimatedNumber value={it.value} start={isVisible} />
                </span>
                {it.suffix && <span className="stat-affix">{it.suffix}</span>}
              </div>
              <p className="stat-label">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CSS "Dark Glass" ---------- */
const css = `
  .stats-section {
    position: relative;
    padding: 80px 20px;
    background: #0b1221; /* Dark Base */
    overflow: hidden;
  }

  /* Glow ambiental (Aurora Boreal sutil) */
  .stats-glow {
    position: absolute; inset: 0; pointer-events: none;
    background: 
      radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08), transparent 40%),
      radial-gradient(circle at 85% 50%, rgba(45, 212, 191, 0.08), transparent 40%);
  }

  .stats-container {
    max-width: 1100px; margin: 0 auto; position: relative; z-index: 1;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
  }
  @media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(3, 1fr); } }

  /* CARD DISEÑO */
  .stat-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 32px 20px;
    text-align: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease;
    
    /* Animación de entrada */
    opacity: 0; transform: translateY(20px);
    animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-play-state: paused; /* Se activa con JS o IntersectionObserver si quisiéramos clases, 
                                     aquí lo dejé simple, pero el delay inline ayuda */
  }
  
  /* Cuando el componente monta, la animación corre (simplificado) */
  .stat-card { animation-play-state: running; }

  .stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(99, 102, 241, 0.3); /* Indigo Glow */
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  /* TIPOGRAFÍA DE NÚMEROS */
  .stat-value-wrapper {
    display: flex; justify-content: center; align-items: baseline;
    margin-bottom: 8px;
    font-variant-numeric: tabular-nums; /* Evita que los números salten al contar */
  }

  .stat-number {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -2px;
    
    /* Gradiente "Lael" (Indigo -> Teal) */
    background: linear-gradient(135deg, #fff 20%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-affix {
    font-size: 1.8rem;
    font-weight: 600;
    color: #6366f1; /* Color de acento para símbolos */
    margin: 0 2px;
  }

  .stat-label {
    color: #94a3b8; /* Slate 400 */
    font-size: 1rem;
    font-weight: 500;
    max-width: 200px; margin: 0 auto;
    line-height: 1.5;
  }

  @keyframes fadeSlideUp {
    to { opacity: 1; transform: translateY(0); }
  }
`;