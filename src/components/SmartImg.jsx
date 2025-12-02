// src/components/SmartImg.jsx
import { useState } from "react";

// --- ÍCONOS SVG NATIVOS ---
const ICONS = {
  image: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  alert: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
};

/**
 * SmartImg Component - Cinematic Reveal
 * Carga de imágenes con skeleton, blur-in animation y manejo de errores.
 * * Props:
 * - src, alt: Básicos.
 * - ratio: string (ej: "16/9", "1/1"). VITAL para evitar saltos de layout (CLS).
 * - radius: string (ej: "12px", "50%"). Borde redondeado.
 * - priority: boolean. Si es true (Hero images), carga eager.
 */
export default function SmartImg({
  src,
  alt = "",
  ratio = "16/9", // Default panorámico
  fit = "cover",  // cover | contain
  radius = "16px", // Border radius por defecto
  priority = false, // True para la imagen principal (LCP)
  className = "",
  style = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Combinación de estilos inline para controlar el layout
  const containerStyle = {
    aspectRatio: ratio,
    borderRadius: radius,
    ...style,
  };

  return (
    <div className={`smart-frame ${className}`} style={containerStyle}>
      <style>{css}</style>

      {/* 1. SKELETON (Se ve mientras carga) */}
      {!isLoaded && !hasError && (
        <div className="smart-skeleton" aria-hidden="true" />
      )}

      {/* 2. IMAGEN REAL */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`smart-img ${isLoaded ? "loaded" : "loading"}`}
          style={{ objectFit: fit }}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true); // Dejamos de cargar
            setHasError(true); // Mostramos error
          }}
          {...props}
        />
      )}

      {/* 3. FALLBACK (Si falla la carga) */}
      {hasError && (
        <div className="smart-error" role="img" aria-label="Imagen no disponible">
          <span className="err-icon">{ICONS.alert}</span>
          <span className="err-text">No disponible</span>
        </div>
      )}
      
      {/* 4. Overlay opcional (Glass Reflection) para darle toque premium */}
      <div className="smart-glass-shine" aria-hidden="true"></div>
    </div>
  );
}

/* ---------------- CSS ENCAPSULADO ---------------- */
const css = `
  .smart-frame {
    position: relative;
    width: 100%;
    overflow: hidden; /* Vital para contener el scale-up */
    background: #0f172a; /* Color de fondo base (Slate 900) */
    border: 1px solid rgba(255, 255, 255, 0.05); /* Borde sutil */
    transform: translateZ(0); /* Aceleración hardware */
  }

  /* IMAGEN */
  .smart-img {
    display: block;
    width: 100%;
    height: 100%;
    
    /* ESTADO INICIAL (Cargando) */
    opacity: 0;
    transform: scale(1.05); /* Un poco de zoom in */
    filter: blur(8px); /* Borroso */
    
    transition: 
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.6s ease;
    
    will-change: transform, opacity, filter;
  }

  /* ESTADO FINAL (Cargado) */
  .smart-img.loaded {
    opacity: 1;
    transform: scale(1); /* Vuelve a tamaño normal */
    filter: blur(0); /* Nítido */
  }

  /* SKELETON ANIMATION */
  .smart-skeleton {
    position: absolute; inset: 0;
    background: #1e293b; /* Slate 800 */
    z-index: 1; /* Detrás de la imagen cuando carga */
  }
  .smart-skeleton::after {
    content: '';
    position: absolute; inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }

  /* ERROR STATE */
  .smart-error {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; 
    align-items: center; justify-content: center;
    gap: 8px;
    background: #0f172a;
    color: #475569;
  }
  .err-icon { color: #64748b; }
  .err-text { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

  /* SHINE EFFECT (Brillo sutil superior) */
  .smart-glass-shine {
    position: absolute; top: 0; left: 0; right: 0; height: 40%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.03), transparent);
    pointer-events: none;
    z-index: 2;
  }
`;