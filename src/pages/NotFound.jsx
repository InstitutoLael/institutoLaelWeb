// src/pages/NotFound.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NotFound(){
  const nav = useNavigate();
  const loc = useLocation();

  // Frases con un poco de humor (rotan cada ~3s)
  const lines = useMemo(() => [
    "Ups… esta página se fue a clases y no volvió.",
    "404: encontramos tu motivación, pero no esta URL 🤭",
    "Aquí no hay nada… salvo excelentes intenciones.",
    "¿Probaste apagar y prender la pestaña? (jk)",
    "La ruta existe en un universo paralelo de Lael.",
  ], []);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % lines.length), 2800);
    return () => clearInterval(t);
  }, [lines.length]);

  // Mini buscador: si no tienes /buscar, te lleva al inicio con ?q=…
  const [q, setQ] = useState("");
  function onSearch(e){
    e.preventDefault();
    if(!q.trim()) return;
    // si tienes una ruta de búsqueda, cámbiala aquí:
    nav(`/?q=${encodeURIComponent(q.trim())}`);
  }

  // Easter egg: tecla "H" -> Home
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "h") nav("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  // Links útiles (ajústalos a tus rutas reales)
  const quick = [
    { to:"/", label:"Inicio" },
    { to:"/paes", label:"PAES" },
    { to:"/idiomas", label:"Idiomas" },
    { to:"/lsch", label:"LSCh" },
    { to:"/empresas", label:"Empresas" },
    { to:"/inscripcion", label:"Inscripción" },
    { to:"/pagos", label:"Pagos" },
    { to:"/convenios", label:"Convenios" },
    { to:"/becas", label:"Becas" },
  ];

  return (
    <section className="nf">
      <style>{css}</style>

      <div className="wrap container">
        <div className="card-404">
          <div className="emoji" aria-hidden>🧭</div>

          <h1 className="title">
            404 — Página no encontrada
          </h1>
          <p className="line">{lines[i]}</p>

          <div className="hint">
            URL que buscaste: <code className="code">{loc.pathname}</code>
          </div>

          <form className="search" onSubmit={onSearch} role="search">
            <input
              className="input"
              placeholder="Buscar algo de Lael… (ej: Inglés B1, Módulo LSCh, Pagos)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Buscar"
            />
            <button className="btn btn-primary" type="submit">Buscar</button>
          </form>

          <div className="cta-row">
            <Link className="btn btn-ghost" to="/" aria-label="Volver al inicio">
              ← Volver al inicio
            </Link>
            <a
              className="btn btn-outline"
              href={`https://wa.me/56964626568?text=${encodeURIComponent("Hola, creo que llegué a una página que no existe 😅 ¿me ayudas?")}`}
              target="_blank"
              rel="noreferrer"
            >
              Pedir ayuda por WhatsApp
            </a>
          </div>

          <div className="quick">
            <div className="quick-title">Rutas rápidas</div>
            <div className="quick-grid">
              {quick.map((k) => (
                <Link key={k.to} to={k.to} className="q-pill">{k.label}</Link>
              ))}
            </div>
          </div>

          <div className="tip">
            Tip: presiona <kbd>H</kbd> para ir al <b>Inicio</b>. Magia blanca, nada de brujería.
          </div>
        </div>

        {/* Deco */}
        <Bubbles />
      </div>
    </section>
  );
}

/* ---------- Deco simple ---------- */
function Bubbles(){
  return (
    <div className="bubbles" aria-hidden>
      {Array.from({length: 16}).map((_,i) => (
        <span key={i} style={{
          left: `${(i*6.25)%100}%`,
          animationDelay: `${(i%7)*0.35}s`,
          animationDuration: `${6 + (i%5)}s`,
        }}/>
      ))}
    </div>
  );
}

/* ---------- CSS local ---------- */
const css = `
:root{
  --blue:#3b549d; --green:#249554; --yellow:#f2ce3d; --rose:#d6a0c5; --orange:#cd5732;
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --ink2:#eaf2ff; --muted:#cbd5e1;
  --shadow:0 20px 48px rgba(2,6,23,.35);
  --rad:18px;
}
*{ box-sizing:border-box }
.container{ max-width:1100px; margin:0 auto; padding:0 18px; }
.nf{ position:relative; padding:44px 0 64px; background:
  radial-gradient(900px 340px at 8% -12%, color-mix(in srgb, var(--blue) 22%, transparent), transparent 60%),
  radial-gradient(900px 280px at 92% -10%, color-mix(in srgb, var(--green) 16%, transparent), transparent 60%);
}
.wrap{ position:relative; z-index:1; }
.card-404{
  border:1px solid var(--bd);
  background:
    radial-gradient(700px 260px at -8% -10%, rgba(255,255,255,.06), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  border-radius:22px; padding:22px; color:var(--ink); box-shadow:var(--shadow);
}
.emoji{
  width:64px; height:64px; display:grid; place-items:center;
  background:#101a2f; border:1px solid #26345a; border-radius:16px; font-size:28px; margin-bottom:10px;
  transform: rotate(-6deg);
}
.title{ margin:.1rem 0 .25rem; font-size: clamp(1.6rem, 2vw + 1rem, 2.1rem); }
.line{ margin:0 0 8px; color:var(--ink2); min-height:1.6em }
.hint{ color:var(--muted); margin-bottom:10px }
.code{
  background:#0e152c; border:1px solid #22304f; padding:.18rem .38rem; border-radius:8px; color:#cfe0ff;
}

.search{
  display:flex; gap:8px; align-items:stretch; margin:12px 0 8px;
}
.input{
  flex:1; border:1px solid #2b375c; background:#0f172a; color:#eaf2ff; border-radius:12px;
  padding:.65rem .8rem;
}
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.6rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; }
.btn-primary{ background:var(--blue); color:#fff; border-color:var(--blue); }
.btn-outline{ background:transparent; color:#eaf2ff; }
.btn-ghost{ background:transparent; color:#cbd5e1; }

.cta-row{ display:flex; gap:8px; flex-wrap:wrap; margin:8px 0 4px; }

.quick{ margin-top:10px; }
.quick-title{ font-weight:900; color:#cbd5e1; margin-bottom:6px }
.quick-grid{ display:flex; flex-wrap:wrap; gap:8px; }
.q-pill{
  display:inline-block; padding:.35rem .7rem; border-radius:999px; border:1px solid #2b3656; background:#0f172a; color:#e5e7eb; text-decoration:none; font-weight:700;
}
.q-pill:hover{ transform: translateY(-1px); box-shadow:0 8px 18px rgba(16,24,40,.25); }

.tip{ margin-top:10px; color:#9fb3c8; font-size:.92rem }
kbd{
  background:#0e152c; border:1px solid #22304f; border-bottom-width:3px; padding:.1rem .35rem; border-radius:6px; color:#fff; font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* bubbles deco */
.bubbles{ position:absolute; inset:0; overflow:hidden; z-index:0; pointer-events:none; }
.bubbles span{
  position:absolute; bottom:-16px; width:8px; height:8px; border-radius:999px;
  background: color-mix(in srgb, var(--blue) 70%, #fff 0%);
  opacity:.6; filter: blur(.4px);
  animation: rise linear infinite;
}
@keyframes rise{
  from{ transform: translateY(0) scale(1); }
  to{ transform: translateY(-120vh) scale(1.4); }
}
`;