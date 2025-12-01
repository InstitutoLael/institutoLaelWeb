// src/pages/Gracias.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa"; // Asegúrate de tener react-icons

export default function Gracias() {
  // Asegura que el scroll esté arriba al cargar esta página
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // --- PUNTO CRÍTICO ---
  // Aquí debes inyectar tus píxeles de conversión de Google Ads, Meta, etc.
  // Ejemplo (mantener comentado si no lo vas a usar o si tienes un gestor de tags):
  /*
  useEffect(() => {
    // fbq('track', 'Purchase', { value: 0, currency: 'CLP' });
    // gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/YYYYYYYYY' });
  }, []);
  */

  return (
    <div className="thanks-page">
      <style>{css}</style>
      <div className="container">
        <FaCheckCircle className="icon-success" />
        <h1>¡Inscripción Exitosa!</h1>
        <p className="lead">
          Tu cupo ha sido reservado. En unos minutos recibirás un correo 
          electrónico con los pasos a seguir.
        </p>
        
        <div className="next-steps">
          <h2>Pasos Siguientes:</h2>
          <ul>
            <li>
              <FaWhatsapp />
              Te enviaremos un WhatsApp con tu link de pago y acceso al grupo.
            </li>
            <li>
              Revisa tu bandeja de entrada (y la de SPAM) para el correo de bienvenida.
            </li>
          </ul>
        </div>
        
        <Link to="/" className="btn-main">Volver al Inicio</Link>
      </div>
    </div>
  );
}

const css = `
:root {
  --bg-deep: #050505;
  --text-main: #F8FAFC;
  --primary: #10B981; /* Verde para éxito */
  --accent: #F59E0B;
  --bg-card: #0F1115;
}

.thanks-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  padding: 120px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 600px;
  text-align: center;
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.icon-success {
  font-size: 4rem;
  color: var(--primary);
  margin-bottom: 20px;
}

.container h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.lead {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 30px;
}

.next-steps {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 40px;
  text-align: left;
}
.next-steps h2 {
    font-size: 1.3rem;
    color: var(--accent);
    margin-top: 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 10px;
    margin-bottom: 15px;
}
.next-steps ul {
    list-style: none;
    padding: 0;
}
.next-steps li {
    color: #cbd5e1;
    margin-bottom: 10px;
    font-size: 1rem;
}
.next-steps li svg {
    margin-right: 10px;
    color: var(--primary);
}


.btn-main {
  display: inline-block;
  background: var(--primary);
  color: #000;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: .2s;
}
.btn-main:hover {
  background: #0d9475;
  transform: translateY(-2px);
}
`;