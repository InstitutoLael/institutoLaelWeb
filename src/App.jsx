import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Pages
import Home from "./pages/Home";
import PAES from "./pages/PAES";
import MetodoLael from "./pages/MetodoLael";
import Idiomas from "./pages/Idiomas";
import LSCh from "./pages/LSCh";
import Empresas from "./pages/Empresas";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import NivelacionAdultos from "./pages/Nivelacion/NivelacionAdultos";
import SistemaLael from "./pages/SistemaLael";
import DiagnosticPage from "./pages/DiagnosticPage";
import ResultDashboard from "./pages/ResultDashboard";
import FunnelDashboard from "./pages/Admin/FunnelDashboard";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";
import GrainCanvas from "./components/ui/GrainCanvas";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <ScrollToTop />
      <GrainCanvas opacity={0.12} />
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        style: { background: '#1A1A1A', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.05)' }
      }} />
      <Navbar />

      <main className="flex-grow pt-20">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preuniversitario" element={<PAES />} />
            <Route path="/paes" element={<PAES />} />
            <Route path="/metodo" element={<MetodoLael />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/lsch" element={<LSCh />} />
            <Route path="/adultos" element={<NivelacionAdultos />} />
            <Route path="/sistema" element={<SistemaLael />} />
            <Route path="/diagnostico" element={<DiagnosticPage />} />
            <Route path="/resultado-diagnostico" element={<ResultDashboard />} />
            <Route path="/admin/funnel" element={<FunnelDashboard />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}