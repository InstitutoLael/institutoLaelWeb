// src/components/PromoBanner.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * PromoBanner v2 — minimal, elegante y no invasivo
 * - mode: "floating" | "ribbon"
 * - persistencia (localStorage) por N días
 * - ocultar en rutas específicas
 * - sin Tailwind; CSS local embebido
 */
export default function PromoBanner({
  enabled = true,
  mode = "floating", // "floating" | "ribbon"
  title = "Matrícula única $7.990",
  subtitle = "Activa tu cupo hoy. Ensayos + acompañamiento real.",
  ctaHref = "/inscripcion",
  ctaLabel = "Inscribirme",
  wspHref = "https://wa.me/56964626568?text=Hola%20Lael%20👋%2C%20quiero%20info%20de%20matr%C3%ADcula%20y%20descuentos",
  hideOnRoutes = ["/inscripcion", "/pagos"],
  storageKey = "lael_promo_closed_until_v2",
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
    if (typeof window === "undefined") return;
    const until = Number(localStorage.getItem(storageKey) || "0");
    setVisible(!(until && Date.now() < until));
  }, [enabled, shouldHideByRoute, storageKey]);

  const close = () => {
    setVisible(false);
    try {
      const until = Date.now() + persistDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, String(until));
    } catch {}
  };

  if (!enabled || shouldHideByRoute || !visible) return null;

  return mode === "ribbon" ? (
    <Ribbon
      title={title}
      subtitle={subtitle}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      wspHref={wspHref}
      onClose={close}
    />
  ) : (
    <FloatingPill
      title={title}
      subtitle={subtitle}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      wspHref={wspHref}
      onClose={close}
    />
  );
}

/* ───────────────── Ribbon (barra sutil bajo navbar) ───────────────── */
function Ribbon({ title, subtitle, ctaHref, ctaLabel, wspHref, onClose }) {
  return (
    <div role="region" aria-label="Promoción" className="lael-promo-ribbon">
      <style>{css}</style>
      <div className="ribbon-wrap container">
        <div className="ribbon-left">
          <span className="rb-pill">Inscripción abierta</span>
          <span className="rb-title">{title}</span>
          <span className="rb-sub">{subtitle}</span>
        </div>
        <div className="ribbon-right">
          <Link to={ctaHref} className="rb-btn rb-solid">{ctaLabel}</Link>
          <a href={wspHref} target="_blank" rel="noreferrer" className="rb-btn rb-ghost" aria-label="Consultar por WhatsApp">
            WhatsApp
          </a>
          <button type="button" className="rb-close" onClick={onClose} aria-label="Ocultar promoción" title="Ocultar">×</button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Píldora flotante (discreta) ───────────────── */
function FloatingPill({ title, subtitle, ctaHref, ctaLabel, wspHref, onClose }) {
  const [open, setOpen] = useState(true); // expandida por defecto la primera vez
  return (
    <div role="region" aria-label="Promoción" className="lael-promo-float" aria-live="polite">
      <style>{css}</style>

      {/* Botón flotante cuando está colapsado */}
      {!open && (
        <button
          className="pill-opener"
          onClick={() => setOpen(true)}
          aria-label="Mostrar promoción"
          title="Mostrar"
        >
          💡 Promo
        </button>
      )}

      {/* Tarjeta flotante */}
      {open && (
        <div className="pill-card" role="dialog" aria-label="Promoción Lael">
          <div className="pill-head">
            <span className="pill-dot" aria-hidden />
            <span className="pill-kicker">Inscripción abierta</span>
            <button className="pill-x" onClick={() => { setOpen(false); onClose?.(); }} aria-label="Ocultar promoción">
              ×
            </button>
          </div>
          <div className="pill-title">{title}</div>
          <div className="pill-sub">{subtitle}</div>
          <div className="pill-cta">
            <a className="pill-btn solid" href={wspHref} target="_blank" rel="noreferrer" aria-label="Enviar WhatsApp">
              WhatsApp
            </a>
            <Link className="pill-btn ghost" to={ctaHref}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── CSS local ───────────────────────── */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --bd:#1f2a44;
  --ink:#eaf2ff; --muted:#9fb3c8;
  --indigo:#5850EC; --emerald:#16a34a; --amber:#F59E0B;
}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* Ribbon */
.lael-promo-ribbon{
  position: sticky; top: 0; z-index: 1030;
  background: rgba(11,18,32,.92); backdrop-filter: blur(6px);
  border-bottom:1px solid var(--bd);
  color: var(--ink);
}
.ribbon-wrap{
  display:flex; align-items:center; justify-content:space-between;
  gap:12px; padding:10px 0;
}
.ribbon-left{
  display:flex; align-items:baseline; gap:10px; flex-wrap:wrap;
}
.rb-pill{
  display:inline-block; padding:.2rem .5rem; border-radius:999px;
  background:#11321c; color:#b9f8cc; border:1px solid #1d6a3d; font-weight:900; font-size:.72rem;
}
.rb-title{ font-weight:1000; letter-spacing:.2px; }
.rb-sub{ color: var(--muted); font-size:.9rem; }
.ribbon-right{ display:flex; align-items:center; gap:8px; }
.rb-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.5rem .8rem; border-radius:10px; border:1px solid #2f3341; font-weight:900; text-decoration:none;
}
.rb-solid{ background:var(--indigo); color:#fff; border-color:var(--indigo); }
.rb-solid:hover{ filter:brightness(1.06); transform: translateY(-1px); }
.rb-ghost{ background:transparent; color:#eaf2ff; }
.rb-ghost:hover{ background:#131b30; transform: translateY(-1px); }
.rb-close{
  width:34px; height:34px; border-radius:8px; border:1px solid transparent;
  background:transparent; color:#cbd5e1; cursor:pointer;
}
.rb-close:hover{ background:#141c31; color:#fff; }
@media (max-width: 760px){
  .rb-sub{ display:none; }
}

/* Floating pill */
.lael-promo-float{
  position: fixed; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 1030;
}
.pill-opener{
  background:#0f172a; color:#fff; border:1px solid var(--bd);
  border-radius:999px; padding:.5rem .8rem; box-shadow:0 10px 24px rgba(2,6,23,.35);
}
.pill-opener:hover{ transform: translateY(-1px); }
.pill-card{
  width:min(360px, 88vw);
  border:1px solid var(--bd); border-radius:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220); color:var(--ink);
  box-shadow:0 22px 60px rgba(2,6,23,.50);
  padding:12px 12px 12px 12px;
  animation: in .16s ease-out both;
}
@keyframes in{ from{ opacity:0; transform: translateY(8px); } to{ opacity:1; transform: translateY(0); } }
.pill-head{ display:flex; align-items:center; gap:8px; }
.pill-dot{ width:8px; height:8px; border-radius:999px; background:#34d399; }
.pill-kicker{ font-size:.75rem; font-weight:900; color:#b9f8cc; }
.pill-x{
  margin-left:auto; width:28px; height:28px; border-radius:8px; border:1px solid transparent;
  background:transparent; color:#cbd5e1; cursor:pointer;
}
.pill-x:hover{ background:#141c31; color:#fff; }
.pill-title{ font-weight:1000; margin:6px 0 2px; }
.pill-sub{ color:var(--muted); font-size:.92rem; }
.pill-cta{ display:flex; gap:8px; margin-top:10px; }
.pill-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:.5rem .8rem;
  border-radius:10px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
}
.pill-btn.solid{ background:var(--indigo); color:#fff; border-color:var(--indigo); }
.pill-btn.solid:hover{ filter:brightness(1.06); transform: translateY(-1px); }
.pill-btn.ghost{ background:transparent; color:#eaf2ff; }
.pill-btn.ghost:hover{ background:#131b30; transform: translateY(-1px); }
`;