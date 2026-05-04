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
import Contacto from "./pages/Contacto";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        style: {
          background: '#1A1A1A',
          color: '#F5F5F5',
          border: '1px solid rgba(255,255,255,0.05)'
        }
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
            <Route path="/contacto" element={<Contacto />} />
            {/* Fallback */}
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </PageTransition>
      </main>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}