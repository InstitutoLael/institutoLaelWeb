// src/components/PromoBanner.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * PromoBanner (versión simple + pro)
 * - 100% Tailwind (sin <style>)
 * - Cierre persistente por N días (default: 7)
 * - Opcional: ocultar en rutas (ej. /inscripcion)
 * - Accesible: aria-live, foco visible, botón con label
 */
export default function PromoBanner({
  enabled = true,
  title = "Matrícula única $7.990",
  subtitle = "Súmate hoy y activa descuentos por cantidad.",
  ctaHref = "/inscripcion",
  ctaLabel = "Inscribirme",
  wspHref = "https://wa.me/56964626568?text=Hola%20Lael%20👋%2C%20quiero%20info%20de%20matr%C3%ADcula%20y%20descuentos",
  hideOnRoutes = ["/inscripcion", "/pagos"],
  storageKey = "lael_promo_closed_until",
  persistDays = 7,
}) {
  const { pathname } = useLocation();
  const shouldHideByRoute = useMemo(
    () => hideOnRoutes.some((r) => pathname.startsWith(r)),
    [pathname, hideOnRoutes]
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || shouldHideByRoute) {
      setVisible(false);
      return;
    }
    // SSR safe
    if (typeof window === "undefined") return;
    const until = localStorage.getItem(storageKey);
    const now = Date.now();
    const closedUntil = until ? Number(until) : 0;
    setVisible(!(closedUntil && now < closedUntil));
  }, [enabled, shouldHideByRoute, storageKey]);

  const close = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      const until = Date.now() + persistDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, String(until));
    }
  };

  if (!enabled || shouldHideByRoute || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Promoción Instituto Lael"
      className="
        sticky top-0 z-[1030]
        border-b border-slate-800/70
        bg-[#0b1220]/95 backdrop-blur
        text-slate-100
      "
    >
      <div
        className="max-w-6xl mx-auto px-4 py-3
                   flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        aria-live="polite"
      >
        {/* Izquierda: texto */}
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold
                             bg-emerald-500 text-[#0b1220]">
              Inscripción abierta
            </span>
            <h2 className="font-extrabold text-sm sm:text-base">{title}</h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">{subtitle}</p>
        </div>

        {/* Centro: perks cortos (opcionales) */}
        <ul className="hidden lg:flex items-center gap-4 text-sm font-semibold">
          <li className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" aria-hidden />
            Clases en vivo + cápsulas
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" aria-hidden />
            Ensayos / feedback real
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" aria-hidden />
            Acompañamiento por WhatsApp
          </li>
        </ul>

        {/* Derecha: CTA */}
        <div className="flex items-center gap-2">
          <Link
            to={ctaHref}
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-sm font-extrabold
                       bg-indigo-500 hover:bg-indigo-400 text-white
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 transition"
          >
            {ctaLabel}
          </Link>
          <a
            href={wspHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-sm font-extrabold
                       border border-slate-600 hover:border-slate-400
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/30 transition"
            aria-label="Consultar por WhatsApp"
          >
            WhatsApp
          </a>

          {/* Cerrar */}
          <button
            type="button"
            onClick={close}
            className="ml-1 inline-flex items-center justify-center w-8 h-8
                       rounded-lg text-slate-300 hover:text-white
                       hover:bg-white/5 border border-transparent
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/20 transition"
            aria-label="Ocultar promoción"
            title="Ocultar"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}