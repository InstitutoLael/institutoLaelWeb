// src/components/PromoBanner.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PromoBanner({
  enabled = true,
  mode = "ribbon", // "ribbon" o "floating"
  title = "Matrícula abierta 2026",
  subtitle = "Activa tu cupo hoy y estudia con acompañamiento real.",
  ctaHref = "/inscripcion",
  ctaLabel = "Inscribirme",
  wspHref = "https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quiero%20información%20sobre%20los%20programas%20LAEL",
  hideOnRoutes = ["/inscripcion", "/pagos"],
  storageKey = "lael_promo_closed_until_v3",
  persistDays = 7,
}) {
  const { pathname } = useLocation();
  const shouldHide = useMemo(
    () => hideOnRoutes.some((r) => pathname.startsWith(r)),
    [pathname, hideOnRoutes]
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || shouldHide) {
      setVisible(false);
      return;
    }
    try {
      const until = Number(localStorage.getItem(storageKey) || 0);
      setVisible(!(until && Date.now() < until));
    } catch {
      setVisible(true);
    }
  }, [enabled, shouldHide, storageKey]);

  const close = () => {
    setVisible(false);
    try {
      localStorage.setItem(
        storageKey,
        String(Date.now() + persistDays * 24 * 60 * 60 * 1000)
      );
    } catch {}
  };

  if (!visible) return null;
  return mode === "floating" ? (
    <FloatingPill {...{ title, subtitle, ctaHref, ctaLabel, wspHref, close }} />
  ) : (
    <Ribbon {...{ title, subtitle, ctaHref, ctaLabel, wspHref, close }} />
  );
}

/* ───────── Ribbon ───────── */
function Ribbon({ title, subtitle, ctaHref, ctaLabel, wspHref, close }) {
  return (
    <div className="lael-promo-ribbon" role="region" aria-label="Promoción">
      <style>{css}</style>
      <div className="ribbon-inner container">
        <div className="ribbon-text">
          <strong>{title}</strong>
          <span className="ribbon-sub">{subtitle}</span>
        </div>
        <div className="ribbon-cta">
          <Link to={ctaHref} className="rb-btn rb-solid">
            {ctaLabel}
          </Link>
          <a
            href={wspHref}
            target="_blank"
            rel="noreferrer"
            className="rb-btn rb-ghost"
          >
            WhatsApp
          </a>
          <button onClick={close} className="rb-close" aria-label="Cerrar">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Píldora flotante ───────── */
function FloatingPill({ title, subtitle, ctaHref, ctaLabel, wspHref, close }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="lael-promo-float" role="dialog" aria-label="Promoción">
      <style>{css}</style>
      {!open ? (
        <button
          className="pill-opener"
          onClick={() => setOpen(true)}
          title="Mostrar promoción"
        >
          💡 Promo
        </button>
      ) : (
        <div className="pill-card">
          <div className="pill-head">
            <span className="pill-dot" />
            <span className="pill-kicker">Inscripción abierta</span>
            <button onClick={() => { setOpen(false); close(); }} className="pill-x">×</button>
          </div>
          <div className="pill-title">{title}</div>
          <div className="pill-sub">{subtitle}</div>
          <div className="pill-cta">
            <a href={wspHref} target="_blank" rel="noreferrer" className="pill-btn solid">
              WhatsApp
            </a>
            <Link to={ctaHref} className="pill-btn ghost">
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── CSS ───────── */
const css = `
:root{
  --indigo:#5850EC; --emerald:#16a34a; --bd:#1f2a44; --ink:#f1f5f9; --muted:#94a3b8;
}

/* Ribbon */
.lael-promo-ribbon{
  position:sticky; top:0; z-index:5050;
  background:rgba(11,18,32,.95); backdrop-filter:blur(6px);
  border-bottom:1px solid var(--bd);
  color:var(--ink);
}
.ribbon-inner{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;}
.ribbon-text{display:flex;flex-direction:column;gap:2px;}
.ribbon-sub{color:var(--muted);font-size:.9rem;}
.ribbon-cta{display:flex;align-items:center;gap:8px;}
.rb-btn{padding:.45rem .8rem;border-radius:10px;font-weight:900;text-decoration:none;border:1px solid transparent;}
.rb-solid{background:var(--indigo);color:#fff;}
.rb-ghost{background:transparent;color:#fff;border-color:var(--bd);}
.rb-ghost:hover{background:#1e293b;}
.rb-close{background:transparent;color:#fff;border:none;font-size:1.2rem;cursor:pointer;}
.rb-close:hover{opacity:.7;}
@media(max-width:768px){.ribbon-sub{display:none;}}

/* Floating */
.lael-promo-float{position:fixed;right:18px;bottom:18px;z-index:5050;}
.pill-opener{background:#0f172a;color:#fff;border:1px solid var(--bd);border-radius:999px;padding:.5rem .8rem;}
.pill-card{width:min(340px,90vw);background:linear-gradient(180deg,#0f172a,#0b1220);
  color:#fff;border:1px solid var(--bd);border-radius:16px;padding:12px;box-shadow:0 20px 50px rgba(2,6,23,.45);}
.pill-head{display:flex;align-items:center;gap:8px;}
.pill-dot{width:8px;height:8px;border-radius:999px;background:var(--emerald);}
.pill-kicker{font-size:.8rem;color:#86efac;font-weight:900;}
.pill-x{margin-left:auto;background:transparent;color:#fff;border:none;font-size:1.1rem;cursor:pointer;}
.pill-title{font-weight:900;margin-top:6px;}
.pill-sub{color:var(--muted);font-size:.9rem;}
.pill-cta{display:flex;gap:8px;margin-top:8px;}
.pill-btn{padding:.5rem .8rem;border-radius:10px;text-decoration:none;font-weight:900;}
.pill-btn.solid{background:var(--indigo);color:#fff;}
.pill-btn.ghost{background:transparent;color:#fff;border:1px solid var(--bd);}
.pill-btn.ghost:hover{background:#1e293b;}
@media(prefers-reduced-motion:no-preference){
  .pill-card{animation:fadeIn .2s ease-out;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
}
.container{max-width:1120px;margin:0 auto;padding:0 18px;}
`;