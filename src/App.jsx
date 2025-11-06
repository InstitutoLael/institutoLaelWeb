// src/App.jsx
import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

/* ---------- Páginas (lazy para performance) ---------- */
const Home = lazy(() => import("./pages/Home.jsx"));
const PAES = lazy(() => import("./pages/PAES.jsx"));
const LSCh = lazy(() => import("./pages/LSCh.jsx"));
const Pagos = lazy(() => import("./pages/Pagos.jsx"));
const Inscripcion = lazy(() => import("./pages/Inscripcion.jsx"));
const Empresas = lazy(() => import("./pages/Empresas.jsx"));
const Homeschool = lazy(() => import("./pages/Homeschool.jsx"));
const Idiomas = lazy(() => import("./pages/Idiomas.jsx"));
const Nosotros = lazy(() => import("./pages/Nosotros.jsx"));
const Simulador = lazy(() => import("./pages/Simulador.jsx"));
const EscuelaAdultos = lazy(() => import("./pages/EscuelaAdultos.jsx"));
const Convenios = lazy(() => import("./pages/Convenios.jsx"));
const Trabaja = lazy(() => import("./pages/Trabaja.jsx"));
const Docentes = lazy(() => import("./pages/Docentes.jsx"));
const Noticias = lazy(() => import("./pages/Noticias.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx")); // 404 con humor

/* ---------- Componentes globales ---------- */
import PromoBanner from "./components/PromoBanner.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";

/* ========================================================= */

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

  // Reveal on scroll (activa .reveal.in)
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
      {/* Estilos globales */}
      <style>{globalCss}</style>

      {/* Link de salto para accesibilidad (teclado/lectores) */}
      <a href="#lael-main" className="skip-link">Saltar al contenido</a>

      <PromoBanner />
      <Navbar onOpenSearch={() => setShowSearch(true)} />

      {/* Scroll to top en cada cambio de ruta */}
      <ScrollToTop />

      <main id="lael-main" className="page">
        {/* Fallback muy liviano para todas las rutas lazy */}
        <Suspense fallback={<div className="fallback">Cargando…</div>}>
          <ErrorBoundary>
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
              <Route path="/docentes" element={<Docentes />} />
              <Route path="/noticias" element={<Noticias />} />
              {/* 404 SIEMPRE AL FINAL */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
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
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

/* ---------- Error Boundary simple ---------- */
function ErrorBoundary({ children }) {
  const [err, setErr] = useState(null);
  if (err) {
    return (
      <div className="fallback" role="alert">
        <p style={{ margin: 0, opacity: 0.9 }}>
          Ocurrió un problema al cargar esta sección. Intenta recargar.
        </p>
        <pre style={{ whiteSpace: "pre-wrap", opacity: 0.6, marginTop: 8 }}>
          {String(err?.message || err)}
        </pre>
      </div>
    );
  }
  return (
    <ErrorCatcher onError={setErr}>
      {children}
    </ErrorCatcher>
  );
}

function ErrorCatcher({ onError, children }) {
  // pequeño boundary basado en try/catch de render
  // (nota: no captura errores async; suficiente para vistas)
  try {
    return children;
  } catch (e) {
    onError?.(e);
    return null;
  }
}

/* ---------- CSS global vibrante y consistente ---------- */
const globalCss = `
:root{
  --c-bg:#0b1220;
  --c-card:#0e1424;
  --c-soft:#0d1528;
  --c-bd:#1f2a44;
  --ink:#ffffff;
  --ink2:#F5F7FF;
  --pri:#5850EC;
  --rose:#E11D48;
  --green:#16A34A;
  --amber:#F59E0B;
  --sky:#22D3EE;
}

/* base */
html, body { background: var(--c-bg); color: var(--ink); }
* { box-sizing: border-box; }
img { max-width: 100%; display: block; }
a { color: var(--sky); text-decoration: none; }
a:hover { text-decoration: underline; }
h1,h2,h3,h4 { color: var(--ink); margin-top: .2rem; }

/* accesibilidad */
.skip-link{
  position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden;
}
.skip-link:focus{
  position:fixed; left:10px; top:10px; width:auto; height:auto; padding:.4rem .7rem;
  background:#0f172a; color:#fff; border:2px solid var(--sky); border-radius:10px; z-index:3000;
}

/* layout */
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
.muted{ color: var(--ink2); opacity: .98; }
.badge{ display:inline-block; padding:.22rem .6rem; border-radius:999px; font-weight:900; }
.badge-warning{ background:#F59E0B; color:#111827; }
.badge-rose{ background:#E11D48; color:#fff; }

/* reveal on scroll */
.reveal{ opacity:0; transform: translateY(14px); transition: opacity .5s ease, transform .5s ease; }
.reveal.in{ opacity:1; transform: translateY(0); }

/* fallback Suspense */
.fallback{
  padding:32px; text-align:center; color:var(--ink2);
}

/* reducir movimiento */
@media (prefers-reduced-motion: reduce){
  .btn{ transition:none !important }
  .reveal{ transition:none !important }
}
`;