// src/components/SmartImg.jsx
import { useEffect, useState } from "react";

/**
 * SmartImg
 * Imagen con:
 * - carga perezosa
 * - transición suave al cargar
 * - fallback accesible si falla
 */
export default function SmartImg({
  src,
  alt = "",
  className = "",
  aspect = "16/10", // puedes cambiar a "1/1", "4/3", etc.
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Si cambia el src, reinicia estado
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  return (
    <figure
      className={`smartimg relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-slate-800/70" aria-hidden />
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          {...rest}
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center text-slate-400 text-sm bg-slate-900/80"
          role="img"
          aria-label="Imagen no disponible"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-6 h-6 mb-1 opacity-60"
            aria-hidden
          >
            <path d="M21 15V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h12" />
            <path d="M3 13l4-4 3 3 5-5 5 5" />
            <circle cx="19" cy="19" r="2" />
            <path d="M21 21l-1.5-1.5" />
          </svg>
          Imagen no disponible
        </div>
      )}
    </figure>
  );
}