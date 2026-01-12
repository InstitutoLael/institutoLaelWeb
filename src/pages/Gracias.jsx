import { useEffect } from "react";
import { Link } from "react-router-dom";

/* 1. ICONOS SVG (Para no depender de librerías externas) */
const Icons = {
  Check: () => <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Whatsapp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  ArrowLeft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
};

export default function Gracias() {
  // Scroll arriba al cargar
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* --- ZONA DE CONVERSIÓN ---
     Si usas Google Ads o Meta Ads, descomenta y configura esto:
  */
  useEffect(() => {
    // console.log("Evento de conversión disparado");
    // if(window.fbq) window.fbq('track', 'CompleteRegistration');
    // if(window.gtag) window.gtag('event', 'conversion', {'send_to': 'AW-TU-ID-AQUI'});
  }, []);

  return (
    <div className="thanks-page">
      <style>{css}</style>
      <div className="container">
        
        <div className="icon-box">
            <Icons.Check />
        </div>

        <h1>¡Solicitud Recibida!</h1>
        <p className="lead">
          Hemos recibido tus datos correctamente. Estás a un paso de comenzar tu nivelación de estudios.
        </p>
        
        <div className="next-steps">
          <h2>¿Qué pasa ahora?</h2>
          <ul>
            <li>
              <span className="step-icon"><Icons.Whatsapp /></span>
              <span>
                Un coordinador académico te contactará por <strong>WhatsApp</strong> en las próximas horas para confirmar tu beca o cupo.
              </span>
            </li>
            <li>
              <span className="step-num">2</span>
              <span>
                Revisa tu correo electrónico (incluyendo SPAM), te enviamos un resumen de los planes.
              </span>
            </li>
          </ul>
        </div>
        
        <Link to="/" className="btn-main">
          <Icons.ArrowLeft /> Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #121212;
  --text-main: #F8FAFC;
  --text-muted: #94a3b8; /* Agregada variable faltante */
  --primary: #10B981;    /* Verde Éxito */
  --accent: #fbbf24;     /* Dorado (Linkeado con EscuelaAdultos) */
}

.thanks-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  padding: 100px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
  text-align: center;
}

.container {
  max-width: 550px;
  width: 100%;
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 50px 30px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.icon-box {
  color: var(--primary);
  margin-bottom: 25px;
  display: inline-block;
  padding: 20px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both;
}

@keyframes popIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

h1 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 15px;
  line-height: 1.1;
}

.lead {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 40px;
  line-height: 1.6;
}

.next-steps {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  text-align: left;
}

.next-steps h2 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent);
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: 700;
}

.next-steps ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.next-steps li {
    color: #e2e8f0;
    margin-bottom: 20px;
    font-size: 0.95rem;
    display: flex;
    gap: 15px;
    align-items: flex-start;
    line-height: 1.5;
}
.next-steps li:last-child { margin-bottom: 0; }

.step-icon, .step-num {
    background: rgba(255,255,255,0.1);
    color: var(--primary);
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-weight: 700;
    font-size: 0.9rem;
}

.btn-main {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--text-main);
  color: #000;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: .3s;
}
.btn-main:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
}
`;