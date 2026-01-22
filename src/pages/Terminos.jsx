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
    <div className="legal-page">
      <SEOHead title="Términos y Condiciones | Instituto Lael" description="Reglamento oficial y condiciones del servicio educativo." />
      <style>{css}</style>

      {/* Luces Ambientales */}
      <div className="legal-glow glow-1"></div>
      <div className="legal-glow glow-2"></div>

      <div className="container legal-grid">

        {/* SIDEBAR DE NAVEGACIÓN (Solo Desktop) */}
        <aside className="legal-sidebar">
          <div className="sidebar-sticky">
            <span className="sidebar-title">Índice</span>
            <nav>
              <button onClick={() => scrollTo('s1')} className={activeSection === 's1' ? 'active' : ''}>1. El Servicio</button>
              <button onClick={() => scrollTo('s2')} className={activeSection === 's2' ? 'active' : ''}>2. Pagos</button>
              <button onClick={() => scrollTo('s3')} className={activeSection === 's3' ? 'active' : ''}>3. Reembolsos</button>
              <button onClick={() => scrollTo('s4')} className={activeSection === 's4' ? 'active' : ''}>4. Propiedad Int.</button>
              <button onClick={() => scrollTo('s5')} className={activeSection === 's5' ? 'active' : ''}>5. Convivencia</button>
            </nav>
            <Link to="/" className="btn-home">← Volver al Inicio</Link>
          </div>
        </aside>

        {/* DOCUMENTO PRINCIPAL */}
        <main className="legal-doc">
          <header className="doc-header">
            <h1>Términos y Condiciones</h1>
            <div className="meta-info">
              <span>Vigencia: Admisión 2026</span>
              <span className="dot"></span>
              <span>Actualizado: Dic 2025</span>
            </div>
          </header>

          <div className="doc-body">
            <p className="intro-text">
              Bienvenido a <strong>Instituto Lael</strong>. Al matricularte en cualquiera de nuestros programas (PAES, Idiomas, Escuela de Adultos), aceptas regirte por el siguiente reglamento, diseñado para garantizar la excelencia académica y la buena convivencia.
            </p>

            <section id="s1" className="term-section">
              <h3><FaGavel className="icon" /> 1. Descripción del Servicio</h3>
              <p>
                Instituto Lael SpA provee servicios de capacitación y educación online (modalidad síncrona y asíncrona).
                La matrícula otorga al estudiante el derecho de acceso al <strong>Aula Virtual</strong>, a las clases en vivo vía Zoom/Meet y a todo el material digital (guías, ensayos, grabaciones) correspondiente al programa contratado durante el año académico vigente.
              </p>
            </section>

            <section id="s2" className="term-section">
              <h3><FaMoneyBillWave className="icon" /> 2. Matrícula y Mensualidades</h3>
              <p>
                <strong>La Matrícula:</strong> Es un pago único anual que garantiza la reserva del cupo y cubre los costos administrativos de gestión de plataformas. No es reembolsable bajo ninguna circunstancia.
              </p>
              <p>
                <strong>Mensualidades:</strong> Deben ser pagadas dentro de los primeros <strong>5 días de cada mes</strong>. El Instituto se reserva el derecho de suspender temporalmente el acceso al Aula Virtual en caso de morosidad superior a 10 días, hasta que se regularice la situación.
              </p>
            </section>

            <section id="s3" className="term-section">
              <h3><FaUndo className="icon" /> 3. Política de Retracto y Reembolso</h3>
              <p>
                Entendemos que los planes pueden cambiar. Nuestra política es transparente:
              </p>
              <ul>
                <li>Si el alumno se retira <strong>antes</strong> del inicio de clases: Se reembolsa el 100% de la mensualidad pagada (no la matrícula).</li>
                <li>Si el alumno se retira <strong>durante</strong> el mes académico: No se realizan devoluciones por clases no asistidas, ya que el cupo estuvo reservado y el servicio disponible.</li>
                <li>Para dar de baja un servicio, se debe notificar por correo o WhatsApp con al menos 15 días de anticipación al siguiente cobro.</li>
              </ul>
            </section>

            <section id="s4" className="term-section">
              <h3><FaFingerprint className="icon" /> 4. Propiedad Intelectual</h3>
              <p>
                Todo el material entregado (guías PDF, ensayos, grabaciones de clases, presentaciones) es propiedad intelectual exclusiva de Instituto Lael.
                Queda <strong>estrictamente prohibida</strong> su difusión, venta, publicación en redes sociales o compartición con terceros ajenos a la institución. La detección de estas prácticas resultará en la cancelación inmediata de la matrícula.
              </p>
            </section>

            <section id="s5" className="term-section">
              <h3><FaUsers className="icon" /> 5. Convivencia Digital</h3>
              <p>
                Fomentamos un ambiente seguro, cristiano y de respeto mutuo. Cualquier conducta de acoso, discriminación, lenguaje ofensivo o falta de respeto hacia docentes, administrativos o compañeros (ya sea en clases en vivo o grupos de WhatsApp) será causal de <strong>expulsión inmediata</strong> sin derecho a reembolso.
              </p>
            </section>

            <div className="contact-box">
              <FaEnvelope className="c-icon" />
              <div>
                <strong>¿Dudas legales o administrativas?</strong>
                <p>Escríbenos a <a href="mailto:administracion@institutolael.cl">administracion@institutolael.cl</a></p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS - ESTILO "CONTRATO DIGITAL"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255, 255, 255, 0.08);
  --primary: #6366F1;
  --accent: #38bdf8;
}

.legal-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding: 120px 0 100px;
  position: relative;
  overflow: hidden;
}

/* Background FX */
.legal-glow {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  filter: blur(120px); opacity: 0.15; pointer-events: none;
}
.glow-1 { top: -200px; left: -100px; background: var(--primary); }
.glow-2 { bottom: 0; right: -100px; background: var(--accent); }

/* Grid Layout */
.legal-grid {
  display: grid; grid-template-columns: 250px 1fr; gap: 60px; align-items: start;
}
@media (max-width: 900px) { .legal-grid { grid-template-columns: 1fr; } }

/* Sidebar */
.legal-sidebar { display: block; }
@media (max-width: 900px) { .legal-sidebar { display: none; } } /* Oculto en móvil para ahorrar espacio */

.sidebar-sticky { position: sticky; top: 120px; }
.sidebar-title { 
  display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; 
  color: var(--text-muted); margin-bottom: 15px; font-weight: 700;
}
.legal-sidebar nav button {
  display: block; width: 100%; text-align: left; background: none; border: none;
  color: var(--text-muted); padding: 10px 0; font-size: 0.95rem; border-left: 2px solid transparent;
  padding-left: 15px; transition: 0.2s; cursor: pointer;
}
.legal-sidebar nav button:hover { color: white; border-left-color: rgba(255,255,255,0.3); }
.legal-sidebar nav button.active { color: var(--primary); border-left-color: var(--primary); font-weight: 600; }

.btn-home {
  display: inline-block; margin-top: 30px; font-size: 0.9rem; color: var(--text-main); 
  text-decoration: none; border: 1px solid var(--border); padding: 8px 16px; border-radius: 8px;
  transition: 0.2s;
}
.btn-home:hover { background: rgba(255,255,255,0.05); }

/* Document Card */
.legal-doc {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px;
  padding: 60px; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
@media (max-width: 768px) { .legal-doc { padding: 30px 20px; } }

.doc-header { border-bottom: 1px solid var(--border); padding-bottom: 30px; margin-bottom: 40px; }
.doc-header h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 15px; }
.meta-info { display: flex; gap: 10px; align-items: center; color: var(--text-muted); font-size: 0.9rem; }
.dot { width: 4px; height: 4px; background: var(--border); border-radius: 50%; }

.intro-text { font-size: 1.1rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 40px; }

.term-section { margin-bottom: 40px; scroll-margin-top: 140px; }
.term-section h3 { 
  font-size: 1.4rem; color: white; margin-bottom: 15px; display: flex; align-items: center; gap: 12px; 
}
.term-section .icon { color: var(--primary); font-size: 1.2rem; }
.term-section p { color: var(--text-muted); line-height: 1.7; margin-bottom: 15px; font-size: 1rem; }
.term-section ul { list-style: none; padding-left: 20px; border-left: 2px solid var(--border); }
.term-section li { color: var(--text-muted); margin-bottom: 10px; font-size: 0.95rem; }
.term-section strong { color: #e2e8f0; }

/* Contact Box */
.contact-box {
  margin-top: 60px; background: rgba(99, 102, 241, 0.1); border: 1px solid var(--primary);
  border-radius: 12px; padding: 20px; display: flex; gap: 15px; align-items: center;
}
.c-icon { font-size: 1.5rem; color: var(--primary); }
.contact-box a { color: var(--primary); font-weight: 600; text-decoration: underline; }
`;