import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import logoAmarillo from "./assets/img/Logos/lael-inst-amarillo.png";

/* ---------- Componentes Globales ---------- */
/* ---------- Componentes Globales ---------- */
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
// import SearchOverlay from "./components/SearchOverlay.jsx";
import CartButton from "./components/CartButton.jsx";
import { Loader2 } from "lucide-react";

/*IMPORTANTE: El carrito lo importamos directo (no lazy) para que abra rápido */
import CartDrawer from "./components/CartDrawer.jsx";

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
const Login = lazy(() => import("./pages/Login.jsx"));
const Gracias = lazy(() => import("./pages/Gracias.jsx"));
const Terminos = lazy(() => import("./pages/Terminos.jsx"));
const Privacidad = lazy(() => import("./pages/Privacidad.jsx"));
const NaamaStudio = lazy(() => import("./pages/NaamaStudio.jsx"));
const Programas = lazy(() => import("./pages/Programas.jsx"));
const Recursos = lazy(() => import("./pages/Recursos.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));

/* ---------- UTILIDAD: Scroll al inicio al cambiar ruta ---------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ---------- UTILIDAD: Loader de Pantalla Completa (Premium) ---------- */
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full"></div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 0.5, 1],
        scale: [0.9, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative z-10"
    >
      <img
        src={logoAmarillo}
        alt="Instituto Lael"
        className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]"
        loading="eager"
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="mt-8 text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] relative z-10"
    >
      Cargando Experiencia
    </motion.div>
  </div>
);

/* ---------- COMPONENTE: Ruta Protegida ---------- */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  /* Search Logic Removed */
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-MXGB4RTHNY", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <ScrollToTop />

        <div className="flex flex-col min-h-screen">
          {/* Buscador y Navegación */}
          {/* SearchOverlay removed */}
          <AnnouncementBar />
          <Navbar />

          {/* Área principal */}
          <main className="flex-1 relative">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/programas" element={<Programas />} />
                <Route path="/recursos" element={<Recursos />} />
                <Route path="/paes" element={<PAES />} />
                <Route path="/idiomas" element={<Idiomas />} />
                <Route path="/lsch" element={<LSCh />} />
                <Route path="/homeschool" element={<Homeschool />} />
                <Route path="/nivelacion" element={<EscuelaAdultos />} />
                <Route path="/empresas" element={<Empresas />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/convenios" element={<Convenios />} />
                <Route path="/trabaja" element={<Trabaja />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/docentes" element={<Docentes />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/aula"
                  element={
                    <ProtectedRoute>
                      <Aula />
                    </ProtectedRoute>
                  }
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/gracias" element={<Gracias />} />
                <Route path="/terminos" element={<Terminos />} />
                <Route path="/privacidad" element={<Privacidad />} />
                <Route path="/naama-studio" element={<NaamaStudio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Suspense>
        </main>

        {/* COMPONENTES FLOTANTES GLOBALES */}
        <CartDrawer />
        <CartButton />
        <WhatsAppButton />
      </div>
      </CartProvider>
    </AuthProvider>
  );
}