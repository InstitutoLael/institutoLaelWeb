import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaClock, FaArrowRight, FaHeadset } from "react-icons/fa";

export default function Contacto() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({ name: "", email: "", subject: "consulta", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulación de proceso y redirección a WhatsApp
    setTimeout(() => {
      // Formato del mensaje para WhatsApp
      const text = `Hola *Instituto Lael* 👋%0A%0ASoy *${form.name}* y tengo una consulta.%0A%0A📌 *Motivo:* ${form.subject.toUpperCase()}%0A📝 *Mensaje:* ${form.message}%0A%0A(Mi correo es: ${form.email})`;
      
      const url = `https://wa.me/56964626568?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      
      setIsSending(false);
      setForm({ name: "", email: "", subject: "consulta", message: "" }); // Limpiar tras enviar
    }, 1000);
  };

  return (
    <div className="contact-page">
      <SEOHead title="Contacto | Instituto Lael" description="Hablemos. Estamos aquí para resolver tus dudas académicas y administrativas." />
      <style>{css}</style>

      {/* Luces Ambientales de fondo */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <div className="container relative-z">
        
        {/* HERO HEADER */}
        <header className="contact-header">
          <div className="status-badge">
            <span className="pulse-dot"></span> Equipo de Admisión: <strong>En Línea</strong>
          </div>
          <h1 className="title-gradient">Hablemos de tu Futuro</h1>
          <p className="subtitle">
            ¿Dudas sobre la PAES, Idiomas o Nivelación? <br/>
            Nuestro equipo te responde personalmente, sin bots.
          </p>
        </header>

        {/* TARJETAS DE ACCESO RÁPIDO */}
        <div className="quick-grid">
          <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="glass-card wa-hover">
            <div className="icon-wrapper wa-bg"><FaWhatsapp/></div>
            <div className="card-info">
              <h3>WhatsApp Directo</h3>
              <p>Respuesta prioritaria</p>
            </div>
            <div className="arrow-go"><FaArrowRight/></div>
          </a>

          <a href="mailto:contacto@institutolael.cl" className="glass-card mail-hover">
            <div className="icon-wrapper mail-bg"><FaEnvelope/></div>
            <div className="card-info">
              <h3>Correo Oficial</h3>
              <p>contacto@institutolael.cl</p>
            </div>
            <div className="arrow-go"><FaArrowRight/></div>
          </a>

          <a href="https://instagram.com/institutolael" target="_blank" rel="noreferrer" className="glass-card ig-hover">
            <div className="icon-wrapper ig-bg"><FaInstagram/></div>
            <div className="card-info">
              <h3>Instagram</h3>
              <p>Vida estudiantil y avisos</p>
            </div>
            <div className="arrow-go"><FaArrowRight/></div>
          </a>
        </div>

        {/* LAYOUT PRINCIPAL (FORM + MAPA) */}
        <div className="main-layout">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <section className="form-section">
            <div className="form-header">
              <FaHeadset className="headset-icon"/>
              <div>
                <h2>Déjanos un Mensaje</h2>
                <p>Te responderemos lo antes posible.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="custom-form">
              <div className="input-row">
                <div className="field-group">
                  <label>Nombre Completo</label>
                  <input 
                    type="text" name="name" placeholder="Ej: Marcela Paz" 
                    required value={form.name} onChange={handleChange} 
                  />
                </div>
                <div className="field-group">
                  <label>Tu Correo</label>
                  <input 
                    type="email" name="email" placeholder="nombre@correo.com" 
                    required value={form.email} onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="field-group">
                <label>¿Sobre qué quieres hablar?</label>
                <div className="select-wrapper">
                  <select name="subject" value={form.subject} onChange={handleChange}>
                    <option value="consulta">🔍 Consulta General</option>
                    <option value="paes">🎓 Preuniversitario PAES</option>
                    <option value="idiomas">🌍 Cursos de Idiomas</option>
                    <option value="pagos">💰 Pagos y Matrículas</option>
                  </select>
                </div>
              </div>

              <div className="field-group">
                <label>Mensaje</label>
                <textarea 
                  name="message" rows="4" placeholder="Escribe aquí tu duda..." 
                  required value={form.message} onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className={`btn-submit ${isSending ? 'loading' : ''}`} disabled={isSending}>
                {isSending ? 'Abriendo WhatsApp...' : <><FaPaperPlane /> Enviar Mensaje</>}
              </button>
              <p className="legal-note">Esto abrirá tu WhatsApp Web o App.</p>
            </form>
          </section>

          {/* COLUMNA DERECHA: INFO Y MAPA */}
          <aside className="info-aside">
            
            {/* Tarjeta de Horario */}
            <div className="info-box">
              <div className="ib-icon"><FaClock/></div>
              <div className="ib-text">
                <strong>Horario de Atención</strong>
                <span>Lunes a Viernes: 09:00 - 19:00</span>
                <span>Sábados: 10:00 - 14:00</span>
              </div>
            </div>

            {/* Tarjeta de Dirección */}
            <div className="info-box">
              <div className="ib-icon"><FaMapMarkerAlt/></div>
              <div className="ib-text">
                <strong>Sede Administrativa</strong>
                <span>San Joaquín, Región Metropolitana</span>
                <small>Visitas presenciales solo con cita previa.</small>
              </div>
            </div>

            {/* MAPA OSCURO */}
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.0382346768784!2d-70.63004652430855!3d-33.47416957338048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c56a3e1b7f53%3A0x6a2c3a5b3b3b3b3b!2sSan%20Joaquin!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Ubicación Lael"
              ></iframe>
              <div className="map-overlay"></div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

const css = `
:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --bg-input: #1e293b;
  --primary: #6366f1;
  --gold: #fbbf24;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}

.contact-page {
  background-color: var(--bg-deep); color: var(--text-main);
  min-height: 100vh; font-family: 'Inter', sans-serif;
  padding: 120px 0 80px; position: relative; overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.relative-z { position: relative; z-index: 10; }

/* ORBES DE FONDO */
.glow-orb { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(100px); opacity: 0.07; pointer-events: none; }
.orb-1 { top: -200px; left: -100px; background: var(--primary); }
.orb-2 { bottom: -200px; right: -100px; background: var(--gold); }

/* HEADER */
.contact-header { text-align: center; margin-bottom: 60px; }
.status-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(16, 185, 129, 0.1); color: #10b981;
  padding: 6px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 500;
  border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 20px;
}
.pulse-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3); animation: pulse 2s infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }

.title-gradient { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 3.5rem); margin-bottom: 15px; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; }

/* QUICK GRID */
.quick-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 60px; }
.glass-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); backdrop-filter: blur(10px);
  border-radius: 16px; padding: 25px; display: flex; align-items: center; gap: 20px;
  text-decoration: none; color: inherit; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }

.icon-wrapper { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white; }
.wa-bg { background: linear-gradient(135deg, #22c55e, #166534); }
.mail-bg { background: linear-gradient(135deg, #6366f1, #4338ca); }
.ig-bg { background: linear-gradient(135deg, #f43f5e, #be123c); }

.card-info h3 { font-size: 1rem; margin: 0; font-weight: 700; }
.card-info p { margin: 2px 0 0; color: var(--text-muted); font-size: 0.85rem; }
.arrow-go { margin-left: auto; color: var(--text-muted); opacity: 0; transform: translateX(-10px); transition: 0.3s; }
.glass-card:hover .arrow-go { opacity: 1; transform: translateX(0); color: white; }

/* MAIN LAYOUT */
.main-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; }
@media (max-width: 900px) { .main-layout { grid-template-columns: 1fr; } }

/* FORM */
.form-section { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 40px; }
.form-header { display: flex; gap: 15px; align-items: flex-start; margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
.headset-icon { font-size: 2rem; color: var(--gold); }
.form-header h2 { font-size: 1.5rem; margin: 0; font-family: 'Playfair Display', serif; }
.form-header p { margin: 5px 0 0; color: var(--text-muted); font-size: 0.9rem; }

.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 600px) { .input-row { grid-template-columns: 1fr; } }
.field-group { margin-bottom: 20px; }
.field-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted); font-weight: 500; }

.custom-form input, .custom-form textarea, .custom-form select {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border);
  color: white; padding: 14px 16px; border-radius: 10px; font-size: 1rem;
  transition: 0.2s; font-family: inherit; outline: none;
}
.custom-form input:focus, .custom-form textarea:focus, .custom-form select:focus {
  border-color: var(--gold); box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.15);
}

.btn-submit {
  width: 100%; background: var(--primary); color: white; padding: 16px; border-radius: 10px;
  font-weight: 700; font-size: 1rem; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: 0.3s;
}
.btn-submit:hover { background: white; color: black; transform: translateY(-2px); }
.btn-submit.loading { opacity: 0.7; cursor: wait; }
.legal-note { text-align: center; font-size: 0.75rem; color: var(--text-muted); margin-top: 15px; opacity: 0.6; }

/* ASIDE INFO */
.info-aside { display: flex; flex-direction: column; gap: 20px; }
.info-box {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
  padding: 20px; display: flex; gap: 15px; align-items: flex-start;
}
.ib-icon { color: var(--gold); font-size: 1.2rem; margin-top: 2px; }
.ib-text strong { display: block; font-size: 1rem; margin-bottom: 5px; }
.ib-text span { display: block; color: var(--text-muted); font-size: 0.9rem; }
.ib-text small { display: block; color: #64748b; font-size: 0.8rem; margin-top: 5px; font-style: italic; }

.map-container {
  height: 300px; border-radius: 16px; overflow: hidden; border: 1px solid var(--border);
  position: relative; margin-top: 10px;
}
/* EFECTO DARK MAP: Invierte los colores pero mantiene el tono legible */
.map-container iframe { width: 100%; height: 100%; border: 0; filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%); }
.map-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; box-shadow: inset 0 0 20px rgba(0,0,0,0.5); }
`;