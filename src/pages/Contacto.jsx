import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
// Usamos las mismas librerias de iconos para consistencia
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaClock, FaCheckCircle } from "react-icons/fa";

export default function Contacto() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Estado del formulario
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirección inteligente a WhatsApp
    const text = `Hola 👋, soy ${form.name}.\nMotivo: ${form.subject.toUpperCase()}\n\nMensaje: ${form.message}\n(Contacto: ${form.email})`;
    const url = `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contact-page">
      <SEOHead title="Centro de Ayuda | Instituto Lael" description="Contáctanos vía WhatsApp, Correo o Redes Sociales." />
      <style>{css}</style>

      {/* Luces Ambientales (El toque mágico) */}
      <div className="ambient-orb c1"></div>
      <div className="ambient-orb c2"></div>

      <div className="container">
        
        {/* HERO */}
        <header className="contact-hero">
          <span className="badge-pill">Soporte 24/7</span>
          <h1>Estamos aquí para <span className="highlight">ti.</span></h1>
          <p className="hero-desc">
            ¿Dudas con tu matrícula? ¿Consultas académicas? 
            Elige el canal que prefieras y conversemos.
          </p>
        </header>

        {/* CANALES RÁPIDOS */}
        <div className="channels-grid">
          <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="channel-card">
            <div className="icon-box wa"><FaWhatsapp/></div>
            <div>
              <strong>WhatsApp Admisión</strong>
              <p>Respuesta inmediata</p>
            </div>
          </a>
          <a href="mailto:contacto@institutolael.cl" className="channel-card">
            <div className="icon-box mail"><FaEnvelope/></div>
            <div>
              <strong>Correo Electrónico</strong>
              <p>Para consultas formales</p>
            </div>
          </a>
          <a href="https://instagram.com/institutolael" target="_blank" rel="noreferrer" className="channel-card">
            <div className="icon-box ig"><FaInstagram/></div>
            <div>
              <strong>Instagram</strong>
              <p>Novedades y comunidad</p>
            </div>
          </a>
        </div>

        {/* SECCIÓN PRINCIPAL (FORM + MAPA) */}
        <div className="split-layout">
          
          {/* COLUMNA 1: FORMULARIO */}
          <div className="form-panel">
            <div className="panel-header">
              <h3>Envíanos un mensaje</h3>
              <p>Te responderemos directo a tu WhatsApp.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label>Nombre</label>
                  <input type="text" name="name" placeholder="Tu nombre" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Correo</label>
                  <input type="email" name="email" placeholder="tucorreo@gmail.com" required onChange={handleChange} />
                </div>
              </div>

              <div className="input-group">
                <label>Asunto</label>
                <select name="subject" onChange={handleChange}>
                  <option value="general">Consulta General</option>
                  <option value="matricula">Problemas con Matrícula</option>
                  <option value="pagos">Pagos y Finanzas</option>
                  <option value="academico">Dudas Académicas</option>
                  <option value="empresas">Propuesta Empresas</option>
                </select>
              </div>

              <div className="input-group">
                <label>Mensaje</label>
                <textarea name="message" rows="4" placeholder="¿En qué te podemos ayudar hoy?" required onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn-send">
                <FaPaperPlane /> Enviar Mensaje
              </button>
            </form>
          </div>

          {/* COLUMNA 2: INFO & MAPA */}
          <div className="info-panel">
            <div className="info-list">
              <div className="i-item">
                <FaClock className="i-icon"/>
                <div>
                  <strong>Horario de Atención</strong>
                  <span>Lun - Vie: 09:00 a 19:00 hrs</span>
                  <span>Sábados: 10:00 a 14:00 hrs</span>
                </div>
              </div>
              <div className="i-item">
                <FaMapMarkerAlt className="i-icon"/>
                <div>
                  <strong>Oficina Administrativa</strong>
                  <span>San Joaquín, Santiago.</span>
                  <span className="small-note">*Atención presencial solo con cita.</span>
                </div>
              </div>
            </div>

            {/* MAPA REAL (Embed de San Joaquín) */}
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26602.44976771337!2d-70.64069811802316!3d-33.50424608359416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662dae267232231%3A0x6296720700d603e9!2sSan%20Joaqu%C3%ADn%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1709665432123!5m2!1ses!2scl" 
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'invert(90%) hue-rotate(180deg)'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Lael"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS - DARK PREMIUM
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #0F1115;
  --bg-input: #18181b;
  --primary: #6366f1;
  --accent: #f59e0b;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255,255,255,0.1);
}

.contact-page {
  background-color: var(--bg-deep); color: var(--text-main);
  min-height: 100vh; font-family: 'Inter', sans-serif;
  padding: 140px 0 100px; position: relative; overflow: hidden;
}

/* Lights */
.ambient-orb { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; }
.c1 { top: -200px; left: -100px; background: var(--primary); }
.c2 { bottom: 0; right: -100px; background: var(--accent); }

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* HERO */
.contact-hero { text-align: center; margin-bottom: 60px; }
.badge-pill { 
  display: inline-block; background: rgba(99,102,241,0.1); color: #818cf8; 
  padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  text-transform: uppercase; margin-bottom: 20px; border: 1px solid rgba(99,102,241,0.3);
}
.contact-hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 15px; line-height: 1.1; }
.highlight { background: linear-gradient(to right, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-desc { color: var(--text-muted); font-size: 1.2rem; max-width: 600px; margin: 0 auto; }

/* CHANNELS */
.channels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 60px; }
.channel-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 16px;
  padding: 20px; display: flex; align-items: center; gap: 15px; transition: 0.3s;
}
.channel-card:hover { background: rgba(255,255,255,0.06); border-color: var(--primary); transform: translateY(-5px); }
.icon-box { 
  width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;
}
.wa { background: rgba(37,211,102,0.1); color: #25D366; }
.mail { background: rgba(99,102,241,0.1); color: #6366f1; }
.ig { background: rgba(225,48,108,0.1); color: #E1306C; }

.channel-card strong { display: block; font-size: 1rem; margin-bottom: 2px; }
.channel-card p { color: var(--text-muted); font-size: 0.85rem; margin: 0; }

/* SPLIT LAYOUT */
.split-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 50px; align-items: start; }
@media (max-width: 900px) { .split-layout { grid-template-columns: 1fr; } }

/* FORM */
.form-panel {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.panel-header { margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
.panel-header h3 { font-size: 1.5rem; margin-bottom: 5px; }
.panel-header p { color: var(--text-muted); font-size: 0.95rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; }
.input-group input, .input-group select, .input-group textarea {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border); color: white;
  padding: 12px 16px; border-radius: 10px; font-size: 1rem; font-family: inherit; transition: 0.2s; outline: none;
}
.input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,0.2); }

.btn-send {
  width: 100%; background: var(--primary); color: white; padding: 16px; border-radius: 50px;
  font-weight: 700; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: 0.3s;
}
.btn-send:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(99,102,241,0.4); }

/* INFO & MAP */
.info-list { display: flex; flex-direction: column; gap: 25px; margin-bottom: 30px; }
.i-item { display: flex; gap: 15px; }
.i-icon { font-size: 1.5rem; color: var(--accent); margin-top: 3px; }
.i-item strong { display: block; font-size: 1.1rem; margin-bottom: 5px; }
.i-item span { display: block; color: var(--text-muted); font-size: 0.95rem; }
.small-note { font-size: 0.8rem; opacity: 0.6; margin-top: 4px; display: block; }

.map-wrapper {
  height: 300px; border-radius: 20px; overflow: hidden; border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
`;