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
const Programas = lazy(() => import("./pages/Programas.jsx"));
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
  <div className="h-screen w-full flex flex-col items-center justify-center bg-[#09090b] text-amber-400">
    <Loader2 size={48} className="animate-spin" />
    <p className="mt-4 text-sm opacity-70 font-sans">Cargando experiencia...</p>
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

      <div className="flex flex-col min-h-screen">
        {/* Buscador y Navegación */}
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <Navbar />

        {/* Área principal */}
        <main className="flex-1 relative">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programas" element={<Programas />} />
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