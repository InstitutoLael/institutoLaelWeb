import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead"; // Asumiendo que usas tu componente o el genérico
import { seoDefaults } from "../seo.config"; // Si no tienes este archivo, borra esta línea y el uso abajo

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Clean)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Whatsapp: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  MapPin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Instagram: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "CONTACT HUB"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #0f0f0f;
  --bg-input: #1a1a1a;
  
  --primary: #6366f1; /* Indigo */
  --primary-hover: #4f46e5;
  --gold: #fbbf24;    /* Gold Accent */
  
  --text-main: #fff;
  --text-muted: #a1a1aa;
  
  --border: rgba(255,255,255,0.1);
  --radius: 20px;
  --font-sans: 'Inter', sans-serif;
}

.contact-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: 100px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; transition: 0.2s; }
button { cursor: pointer; border: none; font-family: inherit; }

/* HERO */
.contact-hero { 
    padding: 100px 0 60px; text-align: center; 
    background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 60%); 
}
.contact-hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 20px; line-height: 1.1; }
.contact-hero p { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }
.highlight { color: var(--primary); }

/* CHANNELS GRID */
.channels-grid { 
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 20px; margin-bottom: 60px; margin-top: -30px; position: relative; z-index: 2;
}
.channel-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 30px; text-align: center; transition: 0.3s;
}
.channel-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 10px 30px rgba(99, 102, 241, 0.1); }
.c-icon { 
  width: 50px; height: 50px; background: rgba(255,255,255,0.05); border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--text-main);
}
.channel-card h3 { margin-bottom: 5px; font-size: 1.2rem; }
.channel-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; }
.channel-link { color: var(--primary); font-weight: 700; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 5px; }

/* FORM & MAP SECTION */
.split-section { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
@media (max-width: 900px) { .split-section { grid-template-columns: 1fr; } }

/* Form */
.form-box { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; }
.form-box h2 { margin-bottom: 30px; font-size: 1.8rem; }

.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px; }
.input-field {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border); color: white;
  padding: 12px 16px; border-radius: 8px; font-size: 1rem; transition: 0.2s; outline: none;
}
.input-field:focus { border-color: var(--primary); }
textarea.input-field { height: 120px; resize: none; }

.btn-submit {
  width: 100%; background: var(--primary); color: white; padding: 14px; border-radius: 8px;
  font-weight: 700; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: 0.2s; margin-top: 10px;
}
.btn-submit:hover { background: var(--primary-hover); transform: translateY(-2px); }

/* Info Side */
.info-box { padding-top: 20px; }
.info-title { font-size: 1.5rem; margin-bottom: 30px; font-weight: 700; }
.info-list { display: flex; flex-direction: column; gap: 25px; }
.info-item { display: flex; gap: 20px; }
.ii-icon { color: var(--gold); margin-top: 2px; }
.ii-content strong { display: block; font-size: 1.1rem; margin-bottom: 5px; }
.ii-content p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin: 0; }

.map-frame {
  margin-top: 40px; border-radius: 16px; overflow: hidden; border: 1px solid var(--border);
  height: 250px; background: #222; position: relative;
}
.map-frame iframe { width: 100%; height: 100%; border: none; filter: grayscale(100%) invert(90%); opacity: 0.8; }

/* FAQ MINI */
.faq-mini { margin-top: 80px; text-align: center; }
.faq-mini h3 { font-size: 1.5rem; margin-bottom: 30px; }
.faq-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left; }
.faq-card { background: var(--bg-card); padding: 25px; border-radius: 16px; border: 1px solid var(--border); transition: 0.3s; }
.faq-card:hover { border-color: var(--gold); }
.faq-card h4 { color: var(--text-main); margin-bottom: 10px; font-size: 1.1rem; }
.faq-card p { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🧠 LOGICA INTELIGENTE: Redirige a WhatsApp formateado
    const text = `Hola Instituto Lael, soy ${form.name}.
Motivo: ${form.subject.toUpperCase()}
Mensaje: ${form.message}
(Mi correo: ${form.email})`;
    
    const url = `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contact-page">
      {/* Si tienes el SEOHead configurado: */}
      <SEOHead title="Contacto | Instituto Lael" description="Hablemos de tu futuro." /> 
      
      <style>{css}</style>

      {/* HERO */}
      <header className="contact-hero">
        <div className="container">
          <h1>Hablemos de tu <span className="highlight">Futuro.</span></h1>
          <p>¿Tienes dudas sobre los cursos, convenios o necesitas orientación? Estamos aquí para ayudarte a tomar la mejor decisión.</p>
        </div>
      </header>

      <div className="container">
        {/* CARDS (Canales Directos) */}
        <div className="channels-grid">
          <div className="channel-card">
            <div className="c-icon"><Icons.Whatsapp/></div>
            <h3>Ventas y Admisión</h3>
            <p>Respuesta inmediata para cursos PAES, Idiomas y Adultos.</p>
            <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="channel-link">Chat directo →</a>
          </div>
          <div className="channel-card">
            <div className="c-icon"><Icons.Mail/></div>
            <h3>Convenios B2B</h3>
            <p>Para empresas, colegios y fundaciones que buscan alianzas.</p>
            <a href="mailto:convenios@institutolael.cl" className="channel-link">convenios@institutolael.cl</a>
          </div>
          <div className="channel-card">
            <div className="c-icon"><Icons.Instagram/></div>
            <h3>Comunidad</h3>
            <p>Síguenos para tips de estudio, novedades y becas flash.</p>
            <a href="https://instagram.com/institutolael" target="_blank" rel="noreferrer" className="channel-link">@institutolael</a>
          </div>
        </div>

        {/* SPLIT SECTION (Form + Info) */}
        <div className="split-section">
          
          {/* FORMULARIO NATIVO (Se ve pro, envía a WhatsApp) */}
          <div className="form-box">
            <h2>Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Tu Nombre</label>
                <input type="text" name="name" className="input-field" placeholder="Ej: Diego Chaparro" required onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" className="input-field" placeholder="nombre@correo.com" required onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>¿Qué te interesa?</label>
                <select name="subject" className="input-field" onChange={handleChange}>
                  <option value="general">Consulta General</option>
                  <option value="paes">Preu PAES</option>
                  <option value="idiomas">Idiomas</option>
                  <option value="adultos">Escuela Adultos</option>
                  <option value="empresas">Empresas</option>
                </select>
              </div>
              <div className="input-group">
                <label>Mensaje</label>
                <textarea name="message" className="input-field" placeholder="Cuéntanos cómo podemos ayudarte..." required onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn-submit">
                <Icons.Send/> Enviar por WhatsApp
              </button>
            </form>
          </div>

          {/* INFO & MAP */}
          <div className="info-box">
            <h3 className="info-title">Información de Contacto</h3>
            <div className="info-list">
              <div className="info-item">
                <div className="ii-icon"><Icons.Clock/></div>
                <div className="ii-content">
                  <strong>Horario de Atención</strong>
                  <p>Lunes a Viernes: 09:00 - 19:00 hrs.<br/>Sábados: 10:00 - 14:00 hrs.</p>
                </div>
              </div>
              <div className="info-item">
                <div className="ii-icon"><Icons.MapPin/></div>
                <div className="ii-content">
                  <strong>Ubicación Administrativa</strong>
                  <p>Santiago, Chile.<br/>(Atención presencial solo con cita previa)</p>
                </div>
              </div>
              <div className="info-item">
                <div className="ii-icon"><Icons.Mail/></div>
                <div className="ii-content">
                  <strong>Soporte Alumnos</strong>
                  <p>¿Ya eres estudiante? Escribe a:<br/>soporte@institutolael.cl</p>
                </div>
              </div>
            </div>

            {/* MAPA ESTILIZADO (Google Maps Embed - Dark Mode Simulated via CSS) */}
            <div className="map-frame">
              {/* Apunta al centro de Santiago o tu dirección */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6!2d-70.65!3d-33.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzI0LjAiUyA3MMKwMzknMDAuMCJX!5e0!3m2!1ses!2scl!4v1600000000000!5m2!1ses!2scl" 
                allowFullScreen="" 
                loading="lazy" 
                title="Mapa Lael"
              ></iframe>
            </div>
          </div>

        </div>

        {/* FAQ MINI */}
        <div className="faq-mini">
          <h3>Preguntas Rápidas</h3>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>¿Las clases son grabadas?</h4>
              <p>Sí, todas las clases en vivo quedan grabadas en tu aula virtual para que las repases cuando quieras.</p>
            </div>
            <div className="faq-card">
              <h4>¿Cómo pago la matrícula?</h4>
              <p>Puedes pagar vía Webpay (Crédito/Débito) o Transferencia Bancaria directa al momento de inscribirte.</p>
            </div>
            <div className="faq-card">
              <h4>¿Dan certificado?</h4>
              <p>Sí, en nuestros cursos de Idiomas, LSCh y Nivelación entregamos certificados digitales verificables.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}