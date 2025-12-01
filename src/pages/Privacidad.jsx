// src/pages/Privacidad.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

export default function Privacidad() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="legal-page">
      <SEOHead title="Política de Privacidad | Instituto Lael" description="Cómo protegemos tus datos." />
      <style>{css}</style>

      <div className="container">
        <header className="legal-header">
          <h1>Política de Privacidad</h1>
          <p>Tu confianza es lo más importante para nosotros.</p>
        </header>

        <article className="legal-content">
          <h3>1. Recopilación de Información</h3>
          <p>
            Solo recopilamos los datos necesarios para brindarte el servicio educativo: nombre, RUT, correo electrónico y teléfono. 
            Estos datos son ingresados voluntariamente por ti al momento de la inscripción.
          </p>

          <h3>2. Uso de la Información</h3>
          <p>
            Tus datos se utilizan exclusivamente para:
            <br/>• Creación de cuentas en nuestras plataformas (Google Classroom, Zoom).
            <br/>• Comunicación académica y administrativa (horarios, pagos, avisos).
            <br/>• Envío de material educativo.
          </p>

          <h3>3. Protección de Datos</h3>
          <p>
            <strong>No compartimos, vendemos ni alquilamos tus datos a terceros.</strong> 
            Toda la información financiera (pagos con tarjeta) es procesada de forma encriptada por proveedores externos certificados (Mercado Pago / Webpay), 
            por lo que Instituto Lael no almacena datos de tarjetas de crédito.
          </p>

          <h3>4. Cookies y Análisis</h3>
          <p>
            Nuestro sitio web puede utilizar cookies básicas para mejorar la experiencia de navegación y obtener estadísticas anónimas de visitas 
            que nos ayudan a mejorar nuestro servicio.
          </p>

          <h3>5. Tus Derechos</h3>
          <p>
            Tienes derecho a solicitar la modificación o eliminación de tus datos personales de nuestra base de datos en cualquier momento, 
            escribiendo a <strong>contacto@institutolael.cl</strong>.
          </p>

          <div className="legal-footer">
            <Link to="/" className="btn-back">← Volver al Inicio</Link>
          </div>
        </article>
      </div>
    </div>
  );
}

// Reutilizamos el mismo CSS para mantener consistencia
const css = `
:root {
  --bg-deep: #050505;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255, 255, 255, 0.1);
  --primary: #10B981; /* Verde para Privacidad */
}

.legal-page { background-color: var(--bg-deep); color: var(--text-main); min-height: 100vh; font-family: 'Inter', sans-serif; padding: 120px 0 80px; }
.container { max-width: 800px; margin: 0 auto; padding: 0 24px; }

.legal-header { text-align: center; margin-bottom: 60px; border-bottom: 1px solid var(--border); padding-bottom: 40px; }
.legal-header h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; }
.legal-header p { color: var(--text-muted); }

.legal-content h3 { color: var(--primary); font-size: 1.5rem; margin-top: 40px; margin-bottom: 15px; }
.legal-content p { color: var(--text-muted); line-height: 1.8; margin-bottom: 20px; font-size: 1.05rem; }
.legal-content strong { color: var(--text-main); }

.legal-footer { margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border); text-align: center; }
.btn-back { color: var(--text-main); text-decoration: none; font-weight: 700; border: 1px solid var(--border); padding: 12px 24px; border-radius: 50px; transition: .2s; }
.btn-back:hover { background: rgba(255,255,255,0.1); }
`;