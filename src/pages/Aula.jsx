import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import SEOHead from "../components/SEOHead";
import AulaSidebar from "../components/aula/AulaSidebar";

// Sub-pages
import StudentDashboard from "./aula/StudentDashboard";
import CourseView from "./aula/CourseView"; 
import LessonView from "./aula/LessonView";

// Paywall Component (Inline for now, could be extracted)
const PaywallScreen = ({ profile, user }) => {
    const textWsp = `Hola Lael! Mi correo es ${user?.email}. Solicito la activación de mi acceso al Aula Virtual.`;
    const linkWsp = `https://wa.me/56964626568?text=${encodeURIComponent(textWsp)}`;
  
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans relative overflow-hidden">
        <SEOHead title="Activación Pendiente | Instituto Lael" description="Tu cuenta está creada. Activa tu acceso enviando tu comprobante." />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)] opacity-50" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full relative z-10">
          <div className="bg-slate-900/50 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl text-center">
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">¡Hola, <span className="text-amber-500">{profile?.full_name?.split(' ')[0] || 'Estudiante'}</span>!</h2>
            <p className="text-slate-400 mb-10 text-sm leading-relaxed">Para desbloquear tu acceso al **Learning Hub**, por favor envía tu comprobante de pago por WhatsApp.</p>
            <a href={linkWsp} target="_blank" rel="noreferrer" className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs">Solicitar Activación</a>
          </div>
        </motion.div>
      </div>
    );
};

export default function Aula() {
  const { user, profile, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si no está pagado: Muro de Pago
  if (profile && !profile.is_paid) {
    return <PaywallScreen profile={profile} user={user} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen font-sans text-slate-200">
       <SEOHead title="Mi Aula | Instituto Lael" description="Panel de estudiante Lael." />
      
      {/* Sidebar Layout */}
      <AulaSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
        
        {/* Mobile Header / Top Bar */}
        <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between lg:hidden">
            <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
               <Menu size={24} />
            </button>
            <span className="font-black text-white tracking-tight">AULA 2.0</span>
            <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Content Render */}
        <div className="p-6 md:p-10 lg:p-16 max-w-7xl mx-auto w-full">
           <Routes>
              <Route index element={<StudentDashboard />} />
              <Route path="curso/:courseId" element={<CourseView />} />
              <Route path="leccion/:courseId/:lessonId" element={<LessonView />} />
              
              {/* Fallbacks */}
              <Route path="mis-cursos" element={<Navigate to="/aula" replace />} />
              <Route path="*" element={<Navigate to="/aula" replace />} />
           </Routes>
        </div>

      </div>
    </div>
  );
}