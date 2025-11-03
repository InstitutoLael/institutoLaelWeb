// src/components/PromoBanner.jsx
import { useEffect, useState } from "react";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  // Evita “parpadeo” recordando si el usuario lo cerró
  useEffect(() => {
    const closed = localStorage.getItem("lael_promo_closed");
    if (closed === "1") setVisible(false);
  }, []);
  const close = () => {
    setVisible(false);
    localStorage.setItem("lael_promo_closed", "1");
  };

  if (!visible) return null;

  return (
    <div className="lael-promo" role="region" aria-label="Promoción activa Instituto Lael">
      <div className="container promo__inner" aria-live="polite">
        {/* Izquierda: insignia + titular */}
        <div className="promo__left">
          <span className="promo__badge" aria-label="Inscripción abierta">🚀 Inscripción abierta</span>
          <h2 className="promo__title">
            Matrícula única <span className="price">$7.990</span>
            <span className="sparkle" aria-hidden>✨</span>
          </h2>
          <p className="promo__subtitle">
            Súmate hoy y activa <b>descuentos automáticos</b> por cantidad.
          </p>
        </div>

        {/* Centro: beneficios cortitos */}
        <ul className="promo__perks" aria-label="Beneficios principales">
          <li><span className="dot dot–green" /> Clases en vivo + cápsulas</li>
          <li><span className="dot dot–amber" /> Ensayos / feedback real</li>
          <li><span className="dot dot–rose" /> WhatsApp de acompañamiento</li>
        </ul>

        {/* Derecha: CTA */}
        <div className="promo__cta">
          <a className="btn btn-primary" href="/inscripcion" aria-label="Ir a inscripción ahora">
            Inscribirme
          </a>
          <a
            className="btn btn-ghost"
            href="https://wa.me/56964626568?text=Hola%20Lael%20👋%2C%20quiero%20info%20de%20matr%C3%ADcula%20y%20descuentos"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Consultar por WhatsApp"
          >
            WhatsApp
          </a>
        </div>

        {/* Cerrar */}
        <button
          type="button"
          className="promo__close"
          onClick={close}
          aria-label="Ocultar promoción"
          title="Ocultar"
        >
          ×
        </button>
      </div>

      <style>{css}</style>
    </div>
  );
}

/* ---------- CSS embebido ---------- */
const css = `
:root{
  --pri:#5850EC;   /* índigo */
  --acc:#16A34A;   /* verde */
  --rose:#E11D48;  /* rosa */
  --amber:#F59E0B; /* mostaza */
  --ink:#ffffff;
  --ink-soft:#F5F7FF;
  --bd:rgba(255,255,255,.14);
}

.lael-promo{
  position:sticky; top:0; z-index:1030;
  color:var(--ink);
  background:
    linear-gradient(90deg, rgba(88,80,236,.18), transparent 40%),
    radial-gradient(80% 120% at 0% 0%, rgba(22,163,74,.18), transparent 60%),
    #0b1220;
  border-bottom:1px solid var(--bd);
  backdrop-filter: saturate(140%) blur(4px);
}
@media (prefers-color-scheme: light){
  .lael-promo{
    color:#0b1220;
    background:
      linear-gradient(90deg, rgba(88,80,236,.08), transparent 40%),
      radial-gradient(80% 120% at 0% 0%, rgba(34,197,94,.10), transparent 60%),
      #eef2ff;
    border-bottom-color: rgba(17,24,39,.08);
  }
}

.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.promo__inner{
  display:grid; align-items:center; gap:12px;
  grid-template-columns: 1.1fr 1fr auto;
  padding:10px 0;
  position:relative;
}

/* izquierda */
.promo__badge{
  display:inline-block; font-weight:900; letter-spacing:.2px;
  padding:.22rem .6rem; border-radius:999px;
  background:linear-gradient(180deg,#22c55e,#16a34a); color:#0b1220;
  box-shadow:0 3px 10px rgba(34,197,94,.25);
}
.promo__title{
  margin:.25rem 0 0; font-size:clamp(1rem, 1.8vw, 1.15rem); font-weight:1000; letter-spacing:.2px;
}
.price{
  margin-left:.35rem; padding:.18rem .5rem; border-radius:8px;
  background:linear-gradient(180deg,#6B63F5,#4E46E5); color:#fff;
  border:1px solid #4E46E5;
}
.promo__subtitle{ margin:0; font-size:.92rem; color:var(--ink-soft); }
@media (prefers-color-scheme: light){ .promo__subtitle{ color:#1f2937; } }

.sparkle{
  margin-left:.25rem; filter: drop-shadow(0 0 10px rgba(99,102,241,.5));
  animation: twinkle 1.5s ease-in-out infinite;
}
@keyframes twinkle{ 0%,100%{ opacity:1 } 50%{ opacity:.55 } }

/* perks */
.promo__perks{
  display:flex; flex-wrap:wrap; gap:10px 14px; margin:0; padding:0; list-style:none;
  font-weight:700;
}
.dot{ width:10px; height:10px; border-radius:50%; display:inline-block; margin-right:6px; transform:translateY(1px); }
.dot–green{ background:#22c55e; }
.dot–amber{ background:#f59e0b; }
.dot–rose{ background:#e11d48; }

/* CTA */
.promo__cta{ display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
.btn{
  display:inline-flex; align-items:center; gap:8px; text-decoration:none; cursor:pointer;
  padding:.55rem .9rem; border-radius:12px; font-weight:900; border:1px solid transparent;
  transition: transform .16s ease, box-shadow .16s ease, filter .16s ease, border-color .16s ease;
}
.btn-primary{
  background:linear-gradient(180deg,#6B63F5,#4E46E5); color:#fff; border-color:#4E46E5;
  box-shadow:0 8px 18px rgba(88,80,236,.35);
}
.btn-primary:hover{ transform:translateY(-1px); filter:brightness(1.06); }
.btn-ghost{
  background:transparent; color:var(--ink); border-color:rgba(165,180,252,.45);
}
.btn-ghost:hover{ transform:translateY(-1px); border-color:rgba(165,180,252,.75); }
@media (prefers-color-scheme: light){
  .btn-ghost{ color:#0b1220; border-color:rgba(17,24,39,.18); }
  .btn-ghost:hover{ border-color:rgba(17,24,39,.35); }
}

/* Cerrar */
.promo__close{
  position:absolute; right:4px; top:2px;
  appearance:none; background:transparent; color:var(--ink); border:0;
  font-size:22px; line-height:1; padding:8px; cursor:pointer; border-radius:8px;
  opacity:.8;
}
.promo__close:hover{ opacity:1; background:rgba(255,255,255,.06); }
@media (prefers-color-scheme: light){
  .promo__close{ color:#111827; }
  .promo__close:hover{ background:rgba(17,24,39,.06); }
}

/* Responsive */
@media (max-width: 860px){
  .promo__inner{ grid-template-columns: 1fr; gap:8px; }
  .promo__cta{ justify-content:flex-start; }
}
`;