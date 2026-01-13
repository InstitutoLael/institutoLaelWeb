// src/App.jsx
import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

/* ---------- Páginas (Lazy Loading) ---------- */
const Home = lazy(() => import("./pages/Home.jsx"));
const PAES = lazy(() => import("./pages/PAES.jsx")); 
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
const Aula = lazy(() => import("./pages/Aula.jsx"));

/* --- Conversión y Legal --- */
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
import CartButton from "./components/CartButton.jsx";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Atajo: Ctrl+K para buscador
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
      {/* Utilidades Invisibles */}
      <ScrollToTop />
      
      {/* Buscador Global */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Navbar Fijo */}
      <Navbar />

      <main className="page-content min-h-screen relative z-10">
        {/* Loader elegante mientras carga la página */}
        <Suspense fallback={<div className="page-loader"><div className="spinner"></div></div>}>
          <Routes>
            {/* --- PRINCIPALES --- */}
            <Route path="/" element={<Home />} />
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
            <Route path="/docentes" element={<Docentes />} />
            <Route path="/aula" element={<Aula />} />
            <Route path="/pagos" element={<Pagos />} />
            
            {/* Conversión y Legal */}
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            
            {/* Landing Naamá Studio */}
            <Route path="/naama-studio" element={<NaamaStudio />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      
      {/* --- ELEMENTOS FLOTANTES --- */}
      <CartButton />
      <FloatingWhatsApp />
    </>
  );
}