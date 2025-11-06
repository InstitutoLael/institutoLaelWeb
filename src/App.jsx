// src/App.jsx
import { useEffect, useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Páginas
import Home from "./pages/Home.jsx";
import PAES from "./pages/PAES.jsx";
import LSCh from "./pages/LSCh.jsx";
import Pagos from "./pages/Pagos.jsx";
import Inscripcion from "./pages/Inscripcion.jsx";
import Empresas from "./pages/Empresas.jsx";
import Homeschool from "./pages/Homeschool.jsx";
import Idiomas from "./pages/Idiomas.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Simulador from "./pages/Simulador.jsx";
import EscuelaAdultos from "./pages/EscuelaAdultos.jsx";
import Convenios from "./pages/Convenios.jsx";
import Trabaja from "./pages/Trabaja.jsx";
import NotFound from "./pages/NotFound.jsx"; // ✅ usar la página 404 con humor

// Componentes globales
import PromoBanner from "./components/PromoBanner.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";

export default function App() {
  const [showSearch, setShowSearch] = useState(false);

  // Ctrl/⌘+K para abrir/cerrar búsqueda
  useEffect(() => {
    const onK = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onK);
    return () => window.removeEventListener("keydown", onK);
  }, []);

  // Reveal on scroll (para elementos con .reveal)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window) || els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Estilos globales (colores Lael, sin grises lavados) */}
      <style>{globalCss}</style>

      <PromoBanner />
      <Navbar onOpenSearch={() => setShowSearch(true)} />

      {/* Scroll to top en cada cambio de ruta */}
      <ScrollToTop />

      <main className="page">
        {/* Suspense por si en el futuro quieres lazy-loading */}
        <Suspense fallback={<div className="fallback">Cargando…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paes" element={<PAES />} />
            <Route path="/lsch" element={<LSCh />} />
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/homeschool" element={<Homeschool />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/escuelaadultos" element={<EscuelaAdultos />} />
            <Route path="/convenios" element={<Convenios />} />
            <Route path="/trabaja" element={<Trabaja />} />
            {/* 404 SIEMPRE AL FINAL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}

/* ---------- Util: subir al top en cada navegación ---------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // scroll suave si el browser lo soporta
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

/* ---------- CSS global vibrante y consistente ---------- */
const globalCss = `
:root{
  --c-bg:#0b1220;       /* fondo base */
  --c-card:#0e1424;     /* cartas */
  --c-soft:#0d1528;     /* detalles */
  --c-bd:#1f2a44;       /* bordes */
  --ink:#ffffff;        /* texto principal */
  --ink2:#F5F7FF;       /* texto secundario */
  --pri:#5850EC;        /* índigo */
  --rose:#E11D48;       /* rosa marca */
  --green:#16A34A;      /* verde marca */
  --amber:#F59E0B;      /* mostaza */
  --sky:#22D3EE;        /* cian acento */
}

/* base */
html, body { background: var(--c-bg); color: var(--ink); }
* { box-sizing: border-box; }
img { max-width: 100%; display: block; }
a { color: var(--sky); text-decoration: none; }
a:hover { text-decoration: underline; }
h1,h2,h3,h4 { color: var(--ink); margin-top: .2rem; }

/* la mayoría de páginas ya traen su .container interno */
.page{ min-height: calc(100vh - 240px); padding: 0 0 24px; }

/* botones globales */
.btn{
  display:inline-flex; align-items:center; gap:8px;
  padding:.72rem 1.08rem; border-radius:12px;
  border:1px solid #2f3341; text-decoration:none; font-weight:1000;
  transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, border-color .18s ease;
}
.btn-primary{
  background:linear-gradient(180deg,#6B63F5,#4E46E5);
  color:#fff; border-color:#4E46E5;
}
.btn-primary:hover{
  transform: translateY(-2px);
  box-shadow:0 18px 36px rgba(2,6,23,.35);
  filter:brightness(1.06);
}
.btn-outline{
  background:transparent; color:#FDE047; border-color:#F59E0B;
}
.btn-outline:hover{
  transform: translateY(-2px);
  box-shadow:0 18px 36px rgba(2,6,23,.35);
  filter:brightness(1.06);
}
.btn-ghost{
  background:transparent; color:#E11D48; border-color:#E11D48;
}
.btn-ghost:hover{
  transform: translateY(-2px);
  box-shadow:0 18px 36px rgba(2,6,23,.35);
  background:#E11D48; color:#fff;
}
.btn:focus-visible{ outline:2px solid var(--sky); outline-offset:2px; }

/* tarjetas genéricas */
.card{
  border:1px solid var(--c-bd); border-radius:16px; padding:16px;
  background:linear-gradient(180deg,var(--c-card),var(--c-bg));
  box-shadow:0 16px 36px rgba(2,6,23,.45);
}

/* utilidades */
.muted{ color: var(--ink2); opacity: .98; } /* blanco suave */
.badge{ display:inline-block; padding:.22rem .6rem; border-radius:999px; font-weight:900; }
.badge-warning{ background:#F59E0B; color:#111827; }
.badge-rose{ background:#E11D48; color:#fff; }

/* reveal on scroll (se activa con .in desde App) */
.reveal{ opacity:0; transform: translateY(14px); transition: opacity .5s ease, transform .5s ease; }
.reveal.in{ opacity:1; transform: translateY(0); }

/* fallback Suspense */
.fallback{
  padding:32px; text-align:center; color:var(--ink2);
}

/* accesibilidad: reducir movimiento */
@media (prefers-reduced-motion: reduce){
  .btn{ transition:none !important }
  .reveal{ transition:none !important }
}
`;