// src/App.jsx
import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

/* ---------- Páginas (Lazy Loading) ---------- */
// Asegúrate de que los nombres de archivo coincidan exactamente (mayúsculas/minúsculas)
const Home = lazy(() => import("./pages/Home.jsx"));
const PAES = lazy(() => import("./pages/PAES.jsx")); // O Paes.jsx
const LSCh = lazy(() => import("./pages/LSCh.jsx"));
const Idiomas = lazy(() => import("./pages/Idiomas.jsx"));
const Empresas = lazy(() => import("./pages/Empresas.jsx"));
const Homeschool = lazy(() => import("./pages/Homeschool.jsx")); 
const EscuelaAdultos = lazy(() => import("./pages/EscuelaAdultos.jsx")); 

/* --- Institucional --- */
const Nosotros = lazy(() => import("./pages/Nosotros.jsx"));
const Convenios = lazy(() => import("./pages/Convenios.jsx"));
const Trabaja = lazy(() => import("./pages/Trabaja.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));
const Docentes = lazy(() => import("./pages/Docentes.jsx")); 

/* --- Conversión y Legal --- */
// NOTA: Si tu archivo se llama "Inscripciones.jsx", ajusta la línea de abajo:
const Inscripcion = lazy(() => import("./pages/Inscripcion.jsx")); 
const Gracias = lazy(() => import("./pages/Gracias.jsx")); 
const Terminos = lazy(() => import("./pages/Terminos.jsx"));
const Privacidad = lazy(() => import("./pages/Privacidad.jsx"));
const Pagos = lazy(() => import("./pages/Pagos.jsx"));

/* --- Naamá Studio (Ruta Oculta/Prueba) --- */
const NaamaStudio = lazy(() => import("./pages/NaamaStudio.jsx"));

/* --- Utilidades --- */
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

/* ---------- Componentes Globales ---------- */
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx"; 
import SearchOverlay from "./components/SearchOverlay.jsx"; 
// 1. Importamos el Botón del Carrito
import CartButton from "./components/CartButton.jsx";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Atajo de teclado: Ctrl+K o Cmd+K para abrir el buscador
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Inyectamos estilos globales */}
      <style>{globalCss}</style>

      {/* Utilidades Invisibles */}
      <ScrollToTop />
      
      {/* Buscador Global (Spotlight) */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

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
            <Route path="/contacto" element={<Contacto />} />
            
            {/* Conversión y Flujo */}
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/gracias" element={<Gracias />} />
            
            {/* Legal */}
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            
            {/* Landing Naamá Studio */}
            <Route path="/naama-studio" element={<NaamaStudio />} />

            {/* 404 - Ruta comodín al final */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      
      {/* --- ELEMENTOS FLOTANTES --- */}
      
      {/* 2. AQUÍ AGREGAMOS EL BOTÓN DEL CARRITO */}
      <CartButton />
      
      {/* Botón WhatsApp */}
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

/* TEXTURA DE RUIDO (Efecto Cine - Muy sutil) */
body::before {
  content: "";
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: 0.4; mix-blend-mode: overlay;
}

/* Scrollbar personalizada */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #020617; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; border: 2px solid #020617; }
::-webkit-scrollbar-thumb:hover { background: #6366f1; }

/* Loader de transición */
.page-loader {
  height: 90vh; display: flex; align-items: center; justify-content: center; width: 100%;
}
.spinner {
  width: 50px; height: 50px; border: 4px solid rgba(99,102,241,0.2);
  border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

::selection { background: rgba(99, 102, 241, 0.3); color: #fff; }
`;