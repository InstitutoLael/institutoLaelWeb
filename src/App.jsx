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

// Páginas de Soporte y Legal (NUEVAS)
const Gracias = lazy(() => import("./pages/Gracias.jsx"));
const Aula = lazy(() => import("./pages/Aula.jsx")); // Login/Portal
const Terminos = lazy(() => import("./pages/Terminos.jsx"));
const Privacidad = lazy(() => import("./pages/Privacidad.jsx"));

// Páginas secundarias
const Pagos = lazy(() => import("./pages/Pagos.jsx"));
const Simulador = lazy(() => import("./pages/Simulador.jsx"));
const Docentes = lazy(() => import("./pages/Docentes.jsx"));
const Noticias = lazy(() => import("./pages/Noticias.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));

/* ---------- Componentes Globales ---------- */
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
// import PromoBanner from "./components/PromoBanner.jsx";
// import ScrollToTop from "./components/ScrollToTop.jsx"; // Si creaste el archivo, úsalo. Si no, usa la función local abajo.

export default function App() {
  const { pathname } = useLocation();

  // Scroll al inicio INSTANTÁNEO al cambiar de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <style>{globalCss}</style>

     {/* Banner de Urgencia - ELIMINADO */}
      {/* <PromoBanner /> */}

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
            <Route path="/escuela-adultos" element={<EscuelaAdultos />} />
            
            {/* Institucional */}
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/convenios" element={<Convenios />} />
            <Route path="/trabaja" element={<Trabaja />} />
            <Route path="/docentes" element={<Docentes />} />
            
            {/* Conversión y Flujo */}
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/gracias" element={<Gracias />} /> {/* Página Éxito */}
            
            {/* Portal Alumno */}
            <Route path="/aula" element={<Aula />} />
            <Route path="/login" element={<Aula />} /> {/* Alias */}
            
            {/* Utilidades y Legal */}
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/contacto" element={<Contacto />} />

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

/* ================= CSS GLOBAL (BASE + TEXTURA) ================= */
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

/* TEXTURA DE RUIDO (Efecto Cine) */
body::before {
  content: "";
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: 0.4; mix-blend-mode: overlay;
}

/* Scrollbar personalizada */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0f1115; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #475569; }

/* Loader de transición */
.page-loader {
  height: 80vh; display: flex; align-items: center; justify-content: center; width: 100%;
}
.spinner {
  width: 40px; height: 40px; border: 3px solid rgba(99,102,241,0.3);
  border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

::selection { background: rgba(99, 102, 241, 0.3); color: #fff; }
`;