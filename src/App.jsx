import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

/* ---------- CONTEXTOS (El Cerebro) ---------- */
import { CartProvider } from "./context/CartContext"; 

/* ---------- Componentes Globales ---------- */
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx"; 
import CartButton from "./components/CartButton.jsx";
import { Loader2 } from "lucide-react"; 

/*IMPORTANTE: El carrito lo importamos directo (no lazy) para que abra rápido */
import CartDrawer from "./pages/Cart.jsx"; 

/* ---------- Páginas (Lazy Loading) ---------- */
const Home = lazy(() => import("./pages/Home.jsx"));
const PAES = lazy(() => import("./pages/PAES.jsx")); 
const LSCh = lazy(() => import("./pages/LSCh.jsx"));
const Idiomas = lazy(() => import("./pages/Idiomas.jsx"));
const Empresas = lazy(() => import("./pages/Empresas.jsx"));
const Homeschool = lazy(() => import("./pages/Homeschool.jsx")); 
const EscuelaAdultos = lazy(() => import("./pages/EscuelaAdultos.jsx")); 
const Nosotros = lazy(() => import("./pages/Nosotros.jsx"));
const Convenios = lazy(() => import("./pages/Convenios.jsx"));
const Trabaja = lazy(() => import("./pages/Trabaja.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));
const Docentes = lazy(() => import("./pages/Docentes.jsx")); 
const Aula = lazy(() => import("./pages/Aula.jsx"));
const Inscripcion = lazy(() => import("./pages/Inscripcion.jsx")); 
const Gracias = lazy(() => import("./pages/Gracias.jsx")); 
const Terminos = lazy(() => import("./pages/Terminos.jsx"));
const Privacidad = lazy(() => import("./pages/Privacidad.jsx"));
const Pagos = lazy(() => import("./pages/Pagos.jsx"));
const NaamaStudio = lazy(() => import("./pages/NaamaStudio.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

/* ---------- UTILIDAD: Scroll al inicio al cambiar ruta ---------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ---------- UTILIDAD: Loader de Pantalla Completa ---------- */
const PageLoader = () => (
  <div style={{
    height: '100vh', 
    width: '100%',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'var(--bg-deep, #09090b)', 
    color: '#fbbf24'
  }}>
    <Loader2 size={48} className="animate-spin" />
    <p style={{marginTop: 15, fontSize: '0.9rem', opacity: 0.7, fontFamily: 'sans-serif'}}>Cargando experiencia...</p>
    <style>{`
      .animate-spin { animation: spin 1s linear infinite; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `}</style>
  </div>
);

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Atajo Ctrl+K para buscar
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
    <CartProvider>
      <ScrollToTop />
      
      <div className="app-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        {/* Buscador y Navegación */}
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <Navbar />

        {/* Área principal */}
        <main style={{ flex: 1, position: 'relative' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/paes" element={<PAES />} />
              <Route path="/idiomas" element={<Idiomas />} />
              <Route path="/lsch" element={<LSCh />} />
              <Route path="/homeschool" element={<Homeschool />} />
              <Route path="/escuela-adultos" element={<EscuelaAdultos />} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/convenios" element={<Convenios />} />
              <Route path="/trabaja" element={<Trabaja />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/docentes" element={<Docentes />} />
              <Route path="/aula" element={<Aula />} />
              <Route path="/pagos" element={<Pagos />} />
              <Route path="/inscripcion" element={<Inscripcion />} />
              <Route path="/gracias" element={<Gracias />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/naama-studio" element={<NaamaStudio />} />
              <Route path="*" element={<NotFound />} />
              {/* LA RUTA /cart HA SIDO ELIMINADA PORQUE AHORA ES UN DRAWER GLOBAL */}
            </Routes>
          </Suspense>
        </main>

        {/* COMPONENTES FLOTANTES GLOBALES */}
        <CartDrawer /> {/* <--- AQUÍ VIVE EL CARRITO AHORA, SOBRE TODO LO DEMÁS */}
        <CartButton />
        <FloatingWhatsApp />
        
        <Footer />
      </div>
    </CartProvider>
  );
}