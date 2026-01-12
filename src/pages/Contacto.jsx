import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaClock, FaArrowRight } from "react-icons/fa";

export default function Contacto() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simular un pequeño delay para feedback visual
    setTimeout(() => {
      const text = `Hola 👋, soy *${form.name}*.\n\n📌 Motivo: ${form.subject.toUpperCase()}\n📝 Mensaje: ${form.message}\n\n(📧 Mi contacto: ${form.email})`;
      const url = `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsSending(false);
      // Opcional: limpiar formulario
      // setForm({ name: "", email: "", subject: "general", message: "" }); 
    }, 800);
  };

  return (
    <div className="contact-page">
      <SEOHead title="Contacto | Instituto Lael" description="Hablemos. Estamos aquí para resolver tus dudas académicas y administrativas." />
      <style>{css}</style>

      {/* Luces Ambientales (Más suaves) */}
      <div className="ambient-orb c1"></div>
      <div className="ambient-orb c2"></div>

      <div className="container relative-z">
        
        {/* HERO SECTION */}
        <header className="contact-hero">
          <div className="badge-pill">
            <span className="dot-pulse"></span> Soporte Activo
          </div>
          <h1 className="hero-title">Conversemos sobre tu <span className="highlight">futuro.</span></h1>
          <p className="hero-desc">
            No somos un bot. Detrás de cada mensaje hay un equipo real listo para orientarte en tu proceso educativo.
          </p>
        </header>

        {/* TARJETAS DE CANALES */}
        <div className="channels-grid">
          <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="channel-card wa-card">
            <div className="icon-box"><FaWhatsapp/></div>
            <div className="card-txt">
              <strong>WhatsApp Admisión</strong>
              <p>Respuesta rápida (Humanos)</p>
            </div>
            <FaArrowRight className="arrow-icon"/>
          </a>

          <a href="mailto:contacto@institutolael.cl" className="channel-card mail-card">
            <div className="icon-box"><FaEnvelope/></div>
            <div className="card-txt">
              <strong>Correo Oficial</strong>
              <p>contacto@institutolael.cl</p>
            </div>
            <FaArrowRight className="arrow-icon"/>
          </a>

          <a href="https://instagram.com/institutolael" target="_blank" rel="noreferrer" className="channel-card ig-card">
            <div className="icon-box"><FaInstagram/></div>
            <div className="card-txt">
              <strong>Instagram</strong>
              <p>Vida estudiantil y avisos</p>
            </div>
            <FaArrowRight className="arrow-icon"/>
          </a>
        </div>

        {/* LAYOUT PRINCIPAL */}
        <div className="split-layout">
          
          {/* IZQUIERDA: FORMULARIO */}
          <div className="form-panel">
            <div className="panel-header">
              <h3>Envíanos un mensaje directo</h3>
              <p>Esto abrirá tu WhatsApp con el mensaje listo.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input 
                    id="name" type="text" name="name" 
                    placeholder="Ej: Juan Pérez" required 
                    value={form.name} onChange={handleChange} 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input 
                    id="email" type="email" name="email" 
                    placeholder="juan@gmail.com" required 
                    value={form.email} onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="subject">Asunto</label>
                <div className="select-wrapper">
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                    <option value="general">🔍 Consulta General</option>
                    <option value="matricula">📝 Problemas con Matrícula</option>
                    <option value="pagos">💰 Pagos y Mensualidades</option>
                    <option value="academico">📚 Dudas Académicas</option>
                    <option value="empresas">🤝 Convenios Empresas</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="message">¿En qué te ayudamos?</label>
                <textarea 
                  id="message" name="message" rows="4" 
                  placeholder="Cuéntanos tu duda..." required 
                  value={form.message} onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className={`btn-send ${isSending ? 'sending' : ''}`} disabled={isSending}>
                {isSending ? 'Abriendo WhatsApp...' : <><FaPaperPlane /> Iniciar Chat</>}
              </button>
            </form>
          </div>

          {/* DERECHA: INFO Y MAPA */}
          <div className="info-panel">
            <div className="info-card">
              <div className="i-item">
                <FaClock className="i-icon accent"/>
                <div>
                  <strong>Horario de Atención</strong>
                  <span>Lunes a Viernes: 09:00 - 19:00</span>
                  <span>Sábados: 10:00 - 14:00</span>
                </div>
              </div>
              <div className="i-item">
                <FaMapMarkerAlt className="i-icon accent"/>
                <div>
                  <strong>Sede Administrativa</strong>
                  <span>San Joaquín, Región Metropolitana</span>
                  <span className="tiny-note">Visitas solo con agendamiento previo.</span>
                </div>
              </div>
            </div>

            {/* MAPA OSCURO */}
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.538562304944!2d-70.630000!3d-33.490000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d00885141205%3A0x6e8a3c8e5473489!2sSan%20Joaqu%C3%ADn%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'grayscale(100%) invert(92%) contrast(83%)'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Ubicación Lael"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS SCOPED
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #0F1115;
  --bg-input: #18181b;
  --primary: #6366f1; /* Indigo */
  --accent: #fbbf24; /* Amber */
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}

.contact-page {
  background-color: var(--bg-deep); color: var(--text-main);
  min-height: 100vh; font-family: 'Inter', sans-serif;
  padding: 120px 0 80px; position: relative; overflow-x: hidden;
}

/* EFECTOS AMBIENTALES */
.ambient-orb { position: absolute; width: 50vw; height: 50vw; border-radius: 50%; filter: blur(120px); opacity: 0.12; pointer-events: none; }
.c1 { top: -20%; left: -10%; background: var(--primary); }
.c2 { bottom: -20%; right: -10%; background: var(--accent); }
.relative-z { position: relative; z-index: 10; }

.container { max-width: 1050px; margin: 0 auto; padding: 0 20px; }

/* HERO */
.contact-hero { text-align: center; margin-bottom: 50px; }
.badge-pill { 
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(99,102,241,0.1); color: #818cf8; 
  padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  border: 1px solid rgba(99,102,241,0.2); margin-bottom: 20px;
}
.dot-pulse { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; }
.hero-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; margin-bottom: 15px; letter-spacing: -1px; }
.highlight { color: #818cf8; }
.hero-desc { color: var(--text-muted); font-size: 1.1rem; max-width: 550px; margin: 0 auto; line-height: 1.6; }

/* CHANNELS */
.channels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 50px; }
.channel-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 16px;
  padding: 20px; display: flex; align-items: center; gap: 15px; text-decoration: none; color: inherit;
  transition: all 0.2s ease;
}
.channel-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.06); }
.wa-card:hover { border-color: #22c55e; } .mail-card:hover { border-color: #6366f1; } .ig-card:hover { border-color: #e1306c; }

.icon-box { 
  width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; background: rgba(255,255,255,0.05);
}
.wa-card .icon-box { color: #22c55e; } .mail-card .icon-box { color: #6366f1; } .ig-card .icon-box { color: #e1306c; }
.card-txt { flex: 1; }
.card-txt strong { display: block; font-size: 0.95rem; }
.card-txt p { font-size: 0.8rem; color: var(--text-muted); margin: 0; }
.arrow-icon { color: var(--border); transition: 0.2s; }
.channel-card:hover .arrow-icon { color: #fff; transform: translateX(3px); }

/* FORM LAYOUT */
.split-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
@media (max-width: 850px) { .split-layout { grid-template-columns: 1fr; } }

.form-panel {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 35px;
  box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
}
.panel-header h3 { margin: 0 0 5px 0; font-size: 1.3rem; }
.panel-header p { margin: 0 0 25px 0; color: var(--text-muted); font-size: 0.9rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.input-group { margin-bottom: 18px; }
.input-group label { display: block; font-size: 0.8rem; color: #cbd5e1; margin-bottom: 8px; font-weight: 600; }

.input-group input, .input-group textarea, .input-group select {
  width: 100%; background: var(--bg-input); border: 1px solid #334155; 
  color: white; padding: 12px 15px; border-radius: 10px; font-size: 0.95rem;
  transition: 0.2s; outline: none; font-family: inherit;
  color-scheme: dark; /* HACE QUE LOS SELECT SE VEAN BIEN EN DARK MODE */
}
.input-group input:focus, .input-group textarea:focus, .input-group select:focus {
  border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
}

.btn-send {
  width: 100%; background: var(--primary); color: white; padding: 14px; border-radius: 10px;
  font-weight: 700; font-size: 1rem; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: 0.2s; margin-top: 10px;
}
.btn-send:hover { background: #4f46e5; transform: translateY(-2px); }
.btn-send.sending { opacity: 0.7; cursor: wait; }

/* INFO CARD & MAP */
.info-card { 
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 16px; 
  padding: 25px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 20px;
}
.i-item { display: flex; gap: 15px; }
.i-icon { font-size: 1.3rem; margin-top: 2px; }
.i-icon.accent { color: var(--accent); }
.i-item strong { display: block; font-size: 0.95rem; margin-bottom: 2px; }
.i-item span { display: block; color: var(--text-muted); font-size: 0.85rem; line-height: 1.4; }
.tiny-note { font-size: 0.75rem; color: #64748b; font-style: italic; margin-top: 5px; }

.map-wrapper {
  height: 280px; border-radius: 16px; overflow: hidden; border: 1px solid var(--border);
  position: relative;
}
/* Truco CSS para que el mapa de Google se vea oscuro */
.map-wrapper iframe { filter: invert(90%) hue-rotate(180deg) brightness(95%); }
`;