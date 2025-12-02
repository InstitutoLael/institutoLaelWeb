// src/pages/Privacidad.jsx
import { useEffect, useState } from "react";
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
    <div className="legal-page">
      <SEOHead title="Política de Privacidad | Instituto Lael" description="Compromiso de protección de datos personales." />
      <style>{css}</style>

      {/* Luces Ambientales (Verde Seguridad) */}
      <div className="legal-glow glow-1"></div>
      <div className="legal-glow glow-2"></div>

      <div className="container legal-grid">
        
        {/* SIDEBAR DE NAVEGACIÓN */}
        <aside className="legal-sidebar">
          <div className="sidebar-sticky">
            <span className="sidebar-title">Índice de Privacidad</span>
            <nav>
              <button onClick={() => scrollTo('p1')} className={activeSection === 'p1' ? 'active' : ''}>1. Datos Recopilados</button>
              <button onClick={() => scrollTo('p2')} className={activeSection === 'p2' ? 'active' : ''}>2. Uso de Info</button>
              <button onClick={() => scrollTo('p3')} className={activeSection === 'p3' ? 'active' : ''}>3. Seguridad (Pagos)</button>
              <button onClick={() => scrollTo('p4')} className={activeSection === 'p4' ? 'active' : ''}>4. Cookies</button>
              <button onClick={() => scrollTo('p5')} className={activeSection === 'p5' ? 'active' : ''}>5. Tus Derechos</button>
            </nav>
            <Link to="/" className="btn-home">← Volver al Inicio</Link>
          </div>
        </aside>

        {/* DOCUMENTO PRINCIPAL */}
        <main className="legal-doc">
          <header className="doc-header">
            <h1>Política de Privacidad</h1>
            <div className="meta-info">
              <span>Compromiso de Seguridad</span>
              <span className="dot"></span>
              <span>Actualizado: Dic 2025</span>
            </div>
          </header>

          <div className="doc-body">
            <p className="intro-text">
              En <strong>Instituto Lael</strong>, tu confianza es nuestro activo más valioso. Esta política explica de forma transparente qué hacemos con tus datos y, más importante aún, qué <strong>NO</strong> hacemos con ellos.
            </p>

            <section id="p1" className="term-section">
              <h3><FaDatabase className="icon"/> 1. Recopilación de Información</h3>
              <p>
                Solo recopilamos los datos estrictamente necesarios para formalizar tu matrícula y brindarte el servicio educativo: 
                <strong> Nombre completo, RUT, correo electrónico y teléfono de contacto</strong>. 
                Estos datos son entregados voluntariamente por ti al completar nuestros formularios de inscripción.
              </p>
            </section>

            <section id="p2" className="term-section">
              <h3><FaUserCheck className="icon"/> 2. Uso de la Información</h3>
              <p>
                Tus datos personales son utilizados exclusivamente para fines académicos y administrativos internos:
              </p>
              <ul>
                <li>Creación de tus credenciales para el <strong>Aula Virtual</strong> y Zoom.</li>
                <li>Envío de material pedagógico, resultados de ensayos y comunicados oficiales.</li>
                <li>Gestión de pagos y emisión de comprobantes.</li>
                <li><strong>Jamás</strong> vendemos ni alquilamos bases de datos a terceros para publicidad.</li>
              </ul>
            </section>

            <section id="p3" className="term-section">
              <h3><FaShieldAlt className="icon"/> 3. Protección Financiera</h3>
              <p>
                Nos tomamos la seguridad muy en serio. Instituto Lael <strong>NO almacena</strong> los datos de tu tarjeta de crédito o débito en nuestros servidores.
              </p>
              <p>
                Todas las transacciones son procesadas a través de pasarelas de pago externas certificadas y encriptadas (como <strong>Webpay Plus</strong> o <strong>Mercado Pago</strong>), que cumplen con los más altos estándares de seguridad bancaria (PCI-DSS).
              </p>
            </section>

            <section id="p4" className="term-section">
              <h3><FaCookieBite className="icon"/> 4. Cookies y Analítica</h3>
              <p>
                Utilizamos cookies técnicas esenciales para que el sitio funcione correctamente y cookies de análisis (Google Analytics) para entender cómo mejorar nuestra plataforma. Estas estadísticas son anónimas y no rastrean tu identidad personal fuera de nuestro sitio.
              </p>
            </section>

            <section id="p5" className="term-section">
              <h3><FaLock className="icon"/> 5. Tus Derechos (ARCO)</h3>
              <p>
                Tú eres el dueño de tus datos. Tienes derecho a solicitar el Acceso, Rectificación, Cancelación u Oposición de tu información personal en cualquier momento.
              </p>
              <p>
                Si deseas darte de baja de nuestra base de datos o corregir algún error, solo debes solicitarlo formalmente al canal oficial.
              </p>
            </section>

            <div className="contact-box privacy-mode">
              <FaEnvelope className="c-icon"/>
              <div>
                <strong>¿Consultas sobre tus datos?</strong>
                <p>Contacta al Oficial de Privacidad: <a href="mailto:contacto@institutolael.cl">contacto@institutolael.cl</a></p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS - "SECURE DOC" STYLE
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255, 255, 255, 0.08);
  
  /* CAMBIO PRINCIPAL: Color Esmeralda para Privacidad */
  --primary: #10B981; 
  --accent: #34d399;
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
  filter: blur(120px); opacity: 0.12; pointer-events: none;
}
.glow-1 { top: -200px; right: -100px; background: var(--primary); }
.glow-2 { bottom: 0; left: -100px; background: var(--accent); }

/* Grid Layout */
.legal-grid {
  display: grid; grid-template-columns: 250px 1fr; gap: 60px; align-items: start;
}
@media (max-width: 900px) { .legal-grid { grid-template-columns: 1fr; } }

/* Sidebar */
.legal-sidebar { display: block; }
@media (max-width: 900px) { .legal-sidebar { display: none; } }

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

/* Contact Box (Privacy Variant) */
.contact-box {
  margin-top: 60px; border: 1px solid var(--border);
  border-radius: 12px; padding: 20px; display: flex; gap: 15px; align-items: center;
}
.contact-box.privacy-mode { background: rgba(16, 185, 129, 0.1); border-color: var(--primary); }
.c-icon { font-size: 1.5rem; color: var(--primary); }
.contact-box a { color: var(--primary); font-weight: 600; text-decoration: underline; }
`;