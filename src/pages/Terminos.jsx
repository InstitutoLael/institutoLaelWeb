// src/pages/Terminos.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

export default function Terminos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="legal-page">
      <SEOHead title="Términos y Condiciones | Instituto Lael" description="Reglamento y condiciones del servicio educativo." />
      <style>{css}</style>

      <div className="container">
        <header className="legal-header">
          <h1>Términos y Condiciones</h1>
          <p>Última actualización: Diciembre 2025</p>
        </header>

        <article className="legal-content">
          <h3>1. Descripción del Servicio</h3>
          <p>
            Instituto Lael SpA provee servicios de capacitación y educación online (síncrona y asíncrona). 
            Al matricularse, el estudiante obtiene acceso al Aula Virtual, clases en vivo y material digital según el programa contratado.
          </p>

          <h3>2. Matrícula y Pagos</h3>
          <p>
            La matrícula es un pago único anual que garantiza el cupo y acceso a las plataformas. 
            Las mensualidades deben ser pagadas dentro de los primeros 5 días de cada mes. 
            El no pago puede resultar en la suspensión temporal del acceso al Aula Virtual.
          </p>

          <h3>3. Política de Reembolso y Retracto</h3>
          <p>
            <strong>Matrícula:</strong> No es reembolsable, ya que cubre costos administrativos de gestión inicial.
            <br />
            <strong>Mensualidad:</strong> Si el alumno decide retirarse antes del inicio de clases, se reembolsará el 100% de la mensualidad pagada. 
            Una vez iniciado el mes académico, no se realizarán devoluciones por clases no asistidas.
          </p>

          <h3>4. Propiedad Intelectual</h3>
          <p>
            Todo el material entregado (guías, ensayos, videos, PPTs) es propiedad exclusiva de Instituto Lael. 
            Queda estrictamente prohibida su difusión, venta o compartición con terceros ajenos a la institución.
          </p>

          <h3>5. Convivencia Digital</h3>
          <p>
            Fomentamos un ambiente de respeto. Cualquier conducta de acoso, discriminación o falta de respeto hacia docentes 
            o compañeros en clases en vivo o grupos de WhatsApp será causal de expulsión inmediata sin derecho a reembolso.
          </p>

          <div className="legal-footer">
            <Link to="/" className="btn-back">← Volver al Inicio</Link>
          </div>
        </article>
      </div>
    </div>
  );
}

/* --- ESTILOS COMPARTIDOS --- */
const css = `
:root {
  --bg-deep: #050505;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255, 255, 255, 0.1);
  --primary: #6366F1;
}

.legal-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding: 120px 0 80px;
}

.container { max-width: 800px; margin: 0 auto; padding: 0 24px; }

.legal-header { text-align: center; margin-bottom: 60px; border-bottom: 1px solid var(--border); padding-bottom: 40px; }
.legal-header h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; letter-spacing: -0.02em; }
.legal-header p { color: var(--text-muted); font-size: 0.9rem; }

.legal-content h3 { color: var(--primary); font-size: 1.5rem; margin-top: 40px; margin-bottom: 15px; }
.legal-content p { color: var(--text-muted); line-height: 1.8; margin-bottom: 20px; font-size: 1.05rem; }
.legal-content strong { color: var(--text-main); }

.legal-footer { margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border); text-align: center; }
.btn-back {
  color: var(--text-main); text-decoration: none; font-weight: 700; border: 1px solid var(--border);
  padding: 12px 24px; border-radius: 50px; transition: .2s;
}
.btn-back:hover { background: rgba(255,255,255,0.1); }
`;