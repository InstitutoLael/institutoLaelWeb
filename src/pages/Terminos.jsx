// src/pages/Terminos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
import { FaGavel, FaMoneyBillWave, FaUndo, FaFingerprint, FaUsers, FaEnvelope } from "react-icons/fa";

export default function Terminos() {
  const [activeSection, setActiveSection] = useState("s1");

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
      <SEOHead title="Términos y Condiciones | Instituto Lael" description="Reglamento oficial y condiciones del servicio educativo." />
      
      {/* Luces Ambientales */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-100px] w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start relative z-10">

        {/* SIDEBAR DE NAVEGACIÓN (Solo Desktop) */}
        <aside className="hidden lg:block sticky top-32">
          <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Índice</span>
          <nav className="space-y-1 border-l-2 border-white/5">
            {[
              { id: 's1', label: '1. El Servicio' },
              { id: 's2', label: '2. Pagos' },
              { id: 's3', label: '3. Reembolsos' },
              { id: 's4', label: '4. Propiedad Int.' },
              { id: 's5', label: '5. Convivencia' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)} 
                className={`block w-full text-left py-2 px-4 text-sm transition-all border-l-2 -ml-[2px]
                  ${activeSection === item.id 
                    ? 'text-indigo-400 border-indigo-400 font-bold' 
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
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Términos y Condiciones</h1>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>Vigencia: Admisión 2026</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Actualizado: Dic 2025</span>
            </div>
          </header>

          <div className="max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-10">
              Bienvenido a <strong>Instituto Lael</strong>. Al matricularte en cualquiera de nuestros programas (PAES, Idiomas, Escuela de Adultos), aceptas regirte por el siguiente reglamento, diseñado para garantizar la excelencia académica y la buena convivencia.
            </p>

            <section id="s1" className="mb-12 scroll-mt-36">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-indigo-500"><FaGavel /></span> 1. Descripción del Servicio
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Instituto Lael SpA provee servicios de capacitación y educación online (modalidad síncrona y asíncrona).
                La matrícula otorga al estudiante el derecho de acceso al <strong>Aula Virtual</strong>, a las clases en vivo vía Zoom/Meet y a todo el material digital (guías, ensayos, grabaciones) correspondiente al programa contratado durante el año académico vigente.
              </p>
            </section>

            <section id="s2" className="mb-12 scroll-mt-36">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-indigo-500"><FaMoneyBillWave /></span> 2. Matrícula y Mensualidades
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                <strong>La Matrícula:</strong> Es un pago único anual que garantiza la reserva del cupo y cubre los costos administrativos de gestión de plataformas. No es reembolsable bajo ninguna circunstancia.
              </p>
              <p className="text-slate-400 leading-relaxed">
                <strong>Mensualidades:</strong> Deben ser pagadas dentro de los primeros <strong>5 días de cada mes</strong>. El Instituto se reserva el derecho de suspender temporalmente el acceso al Aula Virtual en caso de morosidad superior a 10 días, hasta que se regularice la situación.
              </p>
            </section>

            <section id="s3" className="mb-12 scroll-mt-36">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-indigo-500"><FaUndo /></span> 3. Política de Retracto y Reembolso
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Entendemos que los planes pueden cambiar. Nuestra política es transparente:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 border-l-2 border-white/5 pl-4 ml-2">
                <li className="pl-2">Si el alumno se retira <strong>antes</strong> del inicio de clases: Se reembolsa el 100% de la mensualidad pagada (no la matrícula).</li>
                <li className="pl-2">Si el alumno se retira <strong>durante</strong> el mes académico: No se realizan devoluciones por clases no asistidas, ya que el cupo estuvo reservado y el servicio disponible.</li>
                <li className="pl-2">Para dar de baja un servicio, se debe notificar por correo o WhatsApp con al menos 15 días de anticipación al siguiente cobro.</li>
              </ul>
            </section>

            <section id="s4" className="mb-12 scroll-mt-36">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-indigo-500"><FaFingerprint /></span> 4. Propiedad Intelectual
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Todo el material entregado (guías PDF, ensayos, grabaciones de clases, presentaciones) es propiedad intelectual exclusiva de Instituto Lael.
                Queda <strong>estrictamente prohibida</strong> su difusión, venta, publicación en redes sociales o compartición con terceros ajenos a la institución. La detección de estas prácticas resultará en la cancelación inmediata de la matrícula.
              </p>
            </section>

            <section id="s5" className="mb-12 scroll-mt-36">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-indigo-500"><FaUsers /></span> 5. Convivencia Digital
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Fomentamos un ambiente seguro, cristiano y de respeto mutuo. Cualquier conducta de acoso, discriminación, lenguaje ofensivo o falta de respeto hacia docentes, administrativos o compañeros (ya sea en clases en vivo o grupos de WhatsApp) será causal de <strong>expulsión inmediata</strong> sin derecho a reembolso.
              </p>
            </section>

            <div className="mt-16 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6 flex gap-4 items-center">
              <FaEnvelope className="text-2xl text-indigo-500 flex-shrink-0" />
              <div>
                <strong className="block text-white mb-1">¿Dudas legales o administrativas?</strong>
                <p className="text-sm text-slate-400 m-0">Escríbenos a <a href="mailto:administracion@institutolael.cl" className="text-indigo-400 hover:text-indigo-300 font-bold underline">administracion@institutolael.cl</a></p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}