// src/pages/Privacidad.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
import { FaShieldAlt, FaUserCheck, FaDatabase, FaCookieBite, FaLock, FaEnvelope } from "react-icons/fa";

export default function Privacidad() {
  const [activeSection, setActiveSection] = useState("p1");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans pt-32 pb-20 relative overflow-x-hidden">
      <SEOHead title="Política de Privacidad | Instituto Lael" description="Compromiso de protección de datos personales." />
      
      {/* Luces Ambientales (Verde Seguridad) */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start relative z-10">

        {/* SIDEBAR DE NAVEGACIÓN */}
        <aside className="hidden lg:block sticky top-32">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Índice de Privacidad</span>
          <nav className="space-y-1 border-l-2 border-white/5">
            {[
              { id: 'p1', label: '1. Datos Recopilados' },
              { id: 'p2', label: '2. Uso de Info' },
              { id: 'p3', label: '3. Seguridad (Pagos)' },
              { id: 'p4', label: '4. Cookies' },
              { id: 'p5', label: '5. Tus Derechos' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)} 
                className={`block w-full text-left py-2 px-4 text-sm transition-all border-l-2 -ml-[2px]
                  ${activeSection === item.id 
                    ? 'text-emerald-400 border-emerald-400 font-bold' 
                    : 'text-slate-400 border-transparent hover:text-white hover:border-white/30'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Link to="/" className="inline-block mt-8 text-sm text-slate-300 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
            ← Volver al Inicio
          </Link>
        </aside>

        {/* DOCUMENTO PRINCIPAL */}
        <main className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 md:p-16 shadow-2xl relative">
          <header className="border-b border-white/5 pb-8 mb-10">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Política de Privacidad</h1>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>Compromiso de Seguridad</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Actualizado: Dic 2025</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-10">
              En <strong>Instituto Lael</strong>, tu confianza es nuestro activo más valioso. Esta política explica de forma transparente qué hacemos con tus datos y, más importante aún, qué <strong>NO</strong> hacemos con ellos.
            </p>

            {[
              { id: 'p1', icon: <FaDatabase />, title: '1. Recopilación de Información', content: 'Solo recopilamos los datos estrictamente necesarios para formalizar tu matrícula y brindarte el servicio educativo: <strong>Nombre completo, RUT, correo electrónico y teléfono de contacto</strong>. Estos datos son entregados voluntariamente por ti al completar nuestros formularios de inscripción.' },
              { id: 'p2', icon: <FaUserCheck />, title: '2. Uso de la Información', content: 'Tus datos personales son utilizados exclusivamente para fines académicos y administrativos internos:', list: ['Creación de tus credenciales para el <strong>Aula Virtual</strong> y Zoom.', 'Envío de material pedagógico, resultados de ensayos y comunicados oficiales.', 'Gestión de pagos y emisión de comprobantes.', '<strong>Jamás</strong> vendemos ni alquilamos bases de datos a terceros para publicidad.'] },
              { id: 'p3', icon: <FaShieldAlt />, title: '3. Protección Financiera', content: 'Nos tomamos la seguridad muy en serio. Instituto Lael <strong>NO almacena</strong> los datos de tu tarjeta de crédito o débito en nuestros servidores. Todas las transacciones son procesadas a través de pasarelas de pago externas certificadas y encriptadas (como <strong>Webpay Plus</strong> o <strong>Mercado Pago</strong>), que cumplen con los más altos estándares de seguridad bancaria (PCI-DSS).' },
              { id: 'p4', icon: <FaCookieBite />, title: '4. Cookies y Analítica', content: 'Utilizamos cookies técnicas esenciales para que el sitio funcione correctamente y cookies de análisis (Google Analytics) para entender cómo mejorar nuestra plataforma. Estas estadísticas son anónimas y no rastrean tu identidad personal fuera de nuestro sitio.' },
              { id: 'p5', icon: <FaLock />, title: '5. Tus Derechos (ARCO)', content: 'Tú eres el dueño de tus datos. Tienes derecho a solicitar el Acceso, Rectificación, Cancelación u Oposición de tu información personal en cualquier momento. Si deseas darte de baja de nuestra base de datos o corregir algún error, solo debes solicitarlo formalmente al canal oficial.' }
            ].map((section, idx) => (
              <section key={idx} id={section.id} className="mb-12 scroll-mt-36">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-emerald-400">{section.icon}</span> {section.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: section.content }}></p>
                {section.list && (
                  <ul className="list-disc list-inside mt-4 space-y-2 text-slate-400 border-l-2 border-white/5 pl-4 ml-2">
                    {section.list.map((li, i) => (
                      <li key={i} className="pl-2" dangerouslySetInnerHTML={{ __html: li }}></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="mt-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 flex gap-4 items-center">
              <FaEnvelope className="text-2xl text-emerald-500 flex-shrink-0" />
              <div>
                <strong className="block text-white mb-1">¿Consultas sobre tus datos?</strong>
                <p className="text-sm text-slate-400 m-0">Contacta al Oficial de Privacidad: <a href="mailto:contacto@institutolael.cl" className="text-emerald-400 hover:text-emerald-300 font-bold underline">contacto@institutolael.cl</a></p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}