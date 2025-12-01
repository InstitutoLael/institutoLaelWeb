// src/App.jsx
import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

/* ---------- Páginas (Lazy Loading) ---------- */
const Home = lazy(() => import("./pages/Home.jsx"));
const PAES = lazy(() => import("./pages/PAES.jsx"));
const LSCh = lazy(() => import("./pages/LSCh.jsx"));
const Idiomas = lazy(() => import("./pages/Idiomas.jsx"));
const Empresas = lazy(() => import("./pages/Empresas.jsx"));
const Homeschool = lazy(() => import("./pages/Homeschool.jsx")); // Lael Academy
const EscuelaAdultos = lazy(() => import("./pages/EscuelaAdultos.jsx")); // Programa Caminos
const Nosotros = lazy(() => import("./pages/Nosotros.jsx"));
const Convenios = lazy(() => import("./pages/Convenios.jsx"));
const Trabaja = lazy(() => import("./pages/Trabaja.jsx"));
const Inscripcion = lazy(() => import("./pages/Inscripcion.jsx"));

// Páginas secundarias (mantengo las que tenías)
const Pagos = lazy(() => import("./pages/Pagos.jsx"));
const Simulador = lazy(() => import("./pages/Simulador.jsx"));
const Docentes = lazy(() => import("./pages/Docentes.jsx"));
const Noticias = lazy(() => import("./pages/Noticias.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

/* ---------- Componentes Globales ---------- */
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx"; // Asegúrate de tener este o comenta
// import SearchOverlay from "./components/SearchOverlay.jsx"; // Opcional si lo usas

/* ========================================================= */

export default function App() {
  const { pathname } = useLocation();

  // Scroll al inicio INSTANTÁNEO al cambiar de ruta (UX Estándar)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* Estilos Globales (The Dark Universe Theme) */}
      <style>{globalCss}</style>

      {/* Navbar Fijo */}
      <Navbar />

      <main className="page-content">
        {/* Loader elegante mientras carga la página */}
        <Suspense fallback={<div className="page-loader"><div className="spinner"></div></div>}>
          <Routes>
            {/* --- PRINCIPALES --- */}
            <Route path="/" element={<Home />} />
            
            {/* Programas */}
            <Route path="/paes" element={<PAES />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/lsch" element={<LSCh />} />
            <Route path="/homeschool" element={<Homeschool />} />
            <Route path="/escuela-adultos" element={<EscuelaAdultos />} /> {/* CORREGIDO */}
            
            {/* Institucional */}
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/convenios" element={<Convenios />} />
            <Route path="/trabaja" element={<Trabaja />} />
            
            {/* Conversión y Soporte */}
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/pagos" element={<Pagos />} />
            
            {/* Extras */}
            <Route path="/docentes" element={<Docentes />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/simulador" element={<Simulador />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      
      {/* Botón flotante siempre visible */}
      <FloatingWhatsApp />
    </>
  );
}

/* ================= CSS GLOBAL (BASE) ================= */
const globalCss = `
:root {
  /* Paleta "Lael Universe" unificada */
  --bg-deep: #050505;
  --text-main: #F8FAFC;
  --primary: #6366F1;
  --accent: #F59E0B;
}

/* Reset básico y scrollbar oscura */
html {
  background-color: var(--bg-deep);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar personalizada (Chrome/Safari/Edge) */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0f1115; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #475569; }

/* Loader de transición entre páginas */
.page-loader {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid rgba(99,102,241,0.3);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Selección de texto */
::selection {
  background: rgba(99, 102, 241, 0.3);
  color: #fff;
}
`;