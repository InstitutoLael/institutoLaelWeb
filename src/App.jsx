import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";
import CookieNotice from "./components/CookieNotice";
import ExitIntent from "./components/ExitIntent";

// Pages
import Home from "./pages/Home";
const PAES = lazy(() => import("./pages/PAES"));
const MetodoLael = lazy(() => import("./pages/MetodoLael"));
const Idiomas = lazy(() => import("./pages/Idiomas"));
const LandingEspanol = lazy(() => import("./pages/Idiomas/LandingEspanol"));
const LSCh = lazy(() => import("./pages/LSCh"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Contacto = lazy(() => import("./pages/Contacto"));
const NivelacionAdultos = lazy(() => import("./pages/Nivelacion/NivelacionAdultos"));
const SistemaLael = lazy(() => import("./pages/SistemaLael"));
const DiagnosticPage = lazy(() => import("./pages/DiagnosticPage"));
const ResultDashboard = lazy(() => import("./pages/ResultDashboard"));
const Preguntas = lazy(() => import("./pages/Preguntas"));
const Transparencia = lazy(() => import("./pages/Transparencia"));
const CasosReales = lazy(() => import("./pages/CasosReales"));
const Empresas = lazy(() => import("./pages/Empresas"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Inscripcion = lazy(() => import("./pages/Inscripcion"));
const Verano = lazy(() => import("./pages/Verano"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Calculadora = lazy(() => import("./pages/Calculadora"));

// Rutas extra: cada archivo en src/routes/*.jsx exporta un arreglo `routes`
// con { path, element }. Así se agregan páginas sin tocar este archivo.
const extraRoutes = Object.values(import.meta.glob("./routes/*.jsx", { eager: true })).flatMap((m) => m.routes || []);


export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="flex flex-col min-h-screen relative z-10">
      <a
        href="#contenido"
        data-keep-light
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#D7E400] focus:text-[#071D49] focus:font-bold focus:shadow-xl"
      >
        Saltar al contenido
      </a>
      <ScrollToTop />
      <AnalyticsTracker />
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        style: { background: '#1A1A1A', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.05)' }
      }} />
      <Navbar />

      <main id="contenido" tabIndex={-1} className="flex-grow pt-20">
        <PageTransition>
          <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preuniversitario" element={<PAES />} />
            <Route path="/paes" element={<PAES />} />
            <Route path="/metodo" element={<MetodoLael />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/espanol" element={<LandingEspanol />} />
            <Route path="/espanol-para-extranjeros" element={<LandingEspanol />} />
            <Route path="/lsch" element={<LSCh />} />
            <Route path="/adultos" element={<NivelacionAdultos />} />
            <Route path="/sistema" element={<SistemaLael />} />
            <Route path="/preguntas" element={<Preguntas />} />
            <Route path="/transparencia" element={<Transparencia />} />
            <Route path="/casos-reales" element={<CasosReales />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/diagnostico" element={<DiagnosticPage />} />
            <Route path="/resultado-diagnostico" element={<ResultDashboard />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/verano" element={<Verano />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/calculadora" element={<Calculadora />} />
            {extraRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </PageTransition>
      </main>

      <FloatingWhatsApp />
      <ExitIntent />
      <CookieNotice />
      <Footer />
    </div>
    </MotionConfig>
  );
}