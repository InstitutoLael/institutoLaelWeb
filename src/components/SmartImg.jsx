// src/components/SmartImg.jsx
import { useEffect, useId, useRef, useState } from "react";

/**
 * SmartImg (sin Tailwind)
 * - Lazy loading (nativo) + fade in
 * - Placeholder LQIP opcional (blur -> sharpen)
 * - Fallback accesible si falla
 * - Control de aspect-ratio, object-fit, srcSet/sizes y prioridad
 *
 * Props:
 *  - src (string)                URL principal (requerido)
 *  - alt (string)                Texto alternativo (recomendado)
 *  - ratio (string|number)       "16/10" | "4/3" | 1 (aspect-ratio CSS). Si se omite, auto por imagen
 *  - fit ("cover"|"contain")     object-fit (default "cover")
 *  - lqip (string)               URL de miniatura borrosa opcional
 *  - srcSet (string)             srcset responsivo
 *  - sizes (string)              sizes para layout
 *  - priority (boolean)          si true: eager + fetchpriority=high
 *  - className (string)          clases extra para el <figure>
 *  - style (object)              estilos inline al <figure>
 */
export default function SmartImg({
  src,
  alt = "",
  ratio,
  fit = "cover",
  lqip,
  srcSet,
  sizes,
  priority = false,
  className = "",
  style,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasCss, setHasCss] = useState(false);
  const figId = useId();
  const styleOnce = useRef(false);

  // Inyecta CSS una sola vez por app
  useEffect(() => {
    if (styleOnce.current) return;
    const id = "__smartimg_css__";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = css;
      document.head.appendChild(s);
    }
    styleOnce.current = true;
    setHasCss(true);
  }, []);

  // Reset flags si cambia el src
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const eager = priority ? "eager" : "lazy";
  const fetchpriority = priority ? "high" : "auto";

  const figureStyle = {
    ...style,
    ...(ratio ? { aspectRatio: String(ratio) } : null),
  };

  return (
    <figure
      id={figId}
      className={"smartimg " + className}
      style={figureStyle}
      data-loaded={loaded && !failed ? "1" : "0"}
      data-failed={failed ? "1" : "0"}
      aria-busy={!loaded && !failed}
    >
      {/* Skeleton mientras carga */}
      {!failed && (
        <div className="smartimg-skeleton" aria-hidden />
      )}

      {/* LQIP blur bajo la imagen real (si existe) */}
      {!failed && lqip && (
        <img
          className="smartimg-lqip"
          src={lqip}
          alt=""
          aria-hidden
        />
      )}

      {/* Imagen real */}
      {!failed && (
        <img
          className="smartimg-img"
          src={src}
          alt={alt}
          decoding="async"
          loading={eager}
          fetchpriority={fetchpriority}
          srcSet={srcSet}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectFit: fit }}
          {...rest}
        />
      )}

      {/* Fallback accesible si falla */}
      {failed && (
        <figcaption className="smartimg-fallback" role="img" aria-label="Imagen no disponible">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden focusable="false">
            <path d="M21 15V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h12" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 13l4-4 3 3 5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="19" cy="19" r="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-1.5-1.5" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Imagen no disponible</span>
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------- CSS embebido (una sola vez) ---------------- */
const css = `
.smartimg{
  position:relative; display:block; width:100%;
  overflow:hidden; border-radius:16px;
  border:1px solid #1f2a44;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 12px 28px rgba(2,6,23,.30);
  /* Si no pasas ratio, crecerá con el contenido (img) */
}
.smartimg-img, .smartimg-lqip{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
}
.smartimg-lqip{
  filter: blur(12px); transform: scale(1.02);
  opacity:.75; transition: opacity .35s ease;
}
.smartimg[data-loaded="1"] .smartimg-lqip{ opacity:0; }
.smartimg-img{
  opacity:0; transition: opacity .35s ease;
}
.smartimg[data-loaded="1"] .smartimg-img{ opacity:1; }

/* Skeleton */
.smartimg-skeleton{
  position:absolute; inset:0;
  background:
    linear-gradient(90deg, rgba(15,23,42,.35), rgba(15,23,42,.55), rgba(15,23,42,.35));
  animation: smartimg-shimmer 1.2s linear infinite;
}
@keyframes smartimg-shimmer{
  from{ background-position:-200% 0; }
  to{ background-position:200% 0; }
}

/* Fallback */
.smartimg-fallback{
  position:absolute; inset:0; display:grid; place-items:center;
  gap:6px; color:#9fb3c8; background:#0b1220;
  text-align:center; font-size:.9rem;
}

/* Alto contraste (si prefieres) */
/*
@media (prefers-contrast: more){
  .smartimg{ border-color:#2b3e68; }
}
*/
`;