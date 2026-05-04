import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

// Pages
import Home from "./pages/Home";
import Preuniversitario from "./pages/Preuniversitario";
import MetodoLael from "./pages/MetodoLael";
import Idiomas from "./pages/Idiomas";
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
            <Route path="/preuniversitario" element={<Preuniversitario />} />
            <Route path="/metodo" element={<MetodoLael />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* Fallback para las que aún no hacemos */}
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}