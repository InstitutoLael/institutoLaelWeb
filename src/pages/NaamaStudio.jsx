import React, { useState } from 'react';
// Importamos el logo rectangular que subiste
import logoNaama from '../assets/img/Partners/naama-studio.png'; 
// Si tienes el logo rectangular negro, asegúrate que la ruta coincida con el nombre del archivo
// import logoNaama from '../assets/img/Partners/Logo Naamá Negro Rectangular.png.png'; 

export default function NaamaStudio() {
  const [activeCategory, setActiveCategory] = useState('manos');

  return (
    <div className="naama-salon-page">
      <style>{css}</style>

      {/* --- NAVBAR --- */}
      <nav className="ns-nav">
        <div className="nav-container">
            {/* LOGO GRANDE Y CENTRAL */}
            <div className="logo-wrapper">
                <img src={logoNaama} alt="Naamá Studio" className="main-logo" />
            </div>
            
            <div className="nav-links">
                <a href="#servicios">Servicios</a>
                <a href="#marcas">Marcas</a>
                <a href="#contacto" className="btn-nav">Reservar</a>
            </div>
        </div>
      </nav>

      {/* --- HERO (Portada Impactante) --- */}
      <header className="ns-hero">
        <div className="hero-grid">
            <div className="hero-text fade-up">
                <span className="badge-salon">SALÓN DE BELLEZA & BIENESTAR</span>
                <h1>
                    Expertos en resaltar<br />
                    <span className="highlight">tu belleza natural.</span>
                </h1>
                <p>
                    Especialistas en colorimetría avanzada, manicure de alta precisión y tratamientos capilares. 
                    Usamos solo las mejores marcas porque tu cabello y piel lo merecen.
                </p>
                <div className="cta-group">
                    <a href="https://wa.me/56912345678" target="_blank" rel="noreferrer" className="btn-solid">
                        Agendar Cita
                    </a>
                    <a href="https://www.instagram.com/naamastudio_/" target="_blank" rel="noreferrer" className="btn-outline">
                        Ver Trabajos
                    </a>
                </div>
            </div>
            <div className="hero-visual fade-in">
                <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" 
                    alt="Salón de Belleza" 
                    className="hero-img-main"
                />
                <div className="floating-card">
                    <span>✨ Resultados Reales</span>
                </div>
            </div>
        </div>
      </header>

      {/* --- MARCAS (Sección Limpia) --- */}
      <section id="marcas" className="ns-brands">
        <p className="brands-title">TRABAJAMOS CON PRODUCTOS PROFESIONALES</p>
        <div className="brands-row">
            <span className="brand-name">SOW</span>
            <span className="brand-name">TIGI</span>
            <span className="brand-name">BOFFEL</span>
            <span className="brand-name">AMETHYSTE</span>
        </div>
      </section>

      {/* --- CARTA DE SERVICIOS --- */}
      <section id="servicios" className="ns-menu">
        <div className="menu-header">
            <h2>Carta de Servicios</h2>
            <p>Calidad, técnica y dedicación en cada detalle.</p>
        </div>

        {/* Categorías (Botones grandes) */}
        <div className="cat-selector">
            {categories.map(cat => (
                <button 
                    key={cat.id} 
                    className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                >
                    {cat.label}
                </button>
            ))}
        </div>

        {/* Lista de Precios */}
        <div className="service-list fade-in" key={activeCategory}>
            {servicesData[activeCategory].map((item, index) => (
                <div key={index} className="service-row">
                    <div className="service-info">
                        <span className="s-name">{item.name}</span>
                        {item.desc && <span className="s-desc">{item.desc}</span>}
                    </div>
                    <div className="service-price">
                        ${item.price}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- VISUAL INTERMEDIO --- */}
      <section className="ns-banner">
        <div className="banner-content">
            <h2>"Belleza, Bienestar & Armonía"</h2>
            <p>Ven a conocer nuestro espacio en Santiago.</p>
        </div>
      </section>

      {/* --- FOOTER / CONTACTO --- */}
      <footer id="contacto" className="ns-footer">
        <div className="footer-grid">
            <div className="f-col logo-col">
                <img src={logoNaama} alt="Naamá Logo" className="footer-logo" />
            </div>
            <div className="f-col">
                <h4>Contacto</h4>
                <p>Agenda tu hora vía WhatsApp</p>
                <a href="https://wa.me/56912345678" className="link-contact">+56 9 1234 5678</a>
                <a href="https://www.instagram.com/naamastudio_/" className="link-contact">@naamastudio_</a>
            </div>
            <div className="f-col">
                <h4>Ubicación</h4>
                <p>Santiago, Chile</p>
                <p className="schedule">Lunes a Sábado<br/>10:00 - 19:00 hrs</p>
            </div>
        </div>
        <div className="copyright">
            © 2026 Naamá Studio. Todos los derechos reservados.
        </div>
      </footer>

      {/* WhatsApp Flotante */}
      <a href="https://wa.me/56912345678" className="wsp-float" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
    </div>
  );
}

/* --- DATOS DE SERVICIOS --- */
const categories = [
    { id: 'manos', label: 'Manicure & Pedicure' },
    { id: 'pelo', label: 'Peluquería' },
    { id: 'tratamientos', label: 'Tratamientos' },
    { id: 'mirada', label: 'Cejas & Pestañas' },
    { id: 'depilacion', label: 'Depilación' },
    { id: 'estetica', label: 'Estética Corporal' },
];

const servicesData = {
    manos: [
        { name: "Esmaltado Permanente", price: "20.990" },
        { name: "Degradado / Francesa", price: "21.990" },
        { name: "Capping Rubber", price: "25.990" },
        { name: "Baño de PolyGel", price: "31.990" },
        { name: "Extensión Soft Gel", price: "35.990", desc: "Desde" },
        { name: "Pedicure Permanente", price: "24.990" },
        { name: "Pedicure Spa", price: "17.990" },
    ],
    pelo: [
        { name: "Corte de Dama", price: "15.990" },
        { name: "Corte Varón", price: "12.990" },
        { name: "Corte + Bordado", price: "25.990" },
        { name: "Color Global", price: "40.990", desc: "Desde" },
        { name: "Baño de Color", price: "35.990", desc: "Desde" },
        { name: "Babylights", price: "75.990", desc: "Desde (Sin Crecimiento)" },
        { name: "Balayage", price: "70.990", desc: "Desde (Sin Crecimiento)" },
        { name: "Botox Capilar", price: "35.990", desc: "Desde" },
        { name: "Alisado Profesional", price: "50.990", desc: "Desde" },
    ],
    tratamientos: [
        { name: "Masaje TIGI", price: "22.990" },
        { name: "Masaje SOW", price: "35.990" },
        { name: "Masaje Sebastian Penetraitt", price: "31.990" },
        { name: "Ampolla Nutritiva", price: "12.990" },
        { name: "Lavado Nutritivo + Secado", price: "13.990" },
    ],
    mirada: [
        { name: "Lifting de Pestañas", price: "24.990" },
        { name: "Ondulación", price: "23.990" },
        { name: "Lifting de Cejas", price: "8.990" },
        { name: "Perfilado de Cejas", price: "5.990" },
    ],
    depilacion: [
        { name: "Rostro Completo (Dama)", price: "10.990" },
        { name: "Piernas Completas (Dama)", price: "15.990" },
        { name: "Axilas", price: "4.990" },
        { name: "Rebaje Completo", price: "16.990" },
        { name: "Espalda (Varón)", price: "Varía" },
        { name: "Barba / Rostro (Varón)", price: "18.990" },
    ],
    estetica: [
        { name: "Limpieza Facial Profunda", price: "35.990" },
        { name: "BB Glow", price: "35.990" },
        { name: "Masaje de Relajación", price: "25.990" },
        { name: "Masaje Descontracturante", price: "25.990" },
        { name: "Drenaje Linfático", price: "25.990" },
        { name: "Pack 6 Reductivos", price: "189.990" },
    ]
};

/* --- CSS SALÓN PRO (Gordito, Elegante, Cálido) --- */
const css = `
/* Usamos Playfair Display (Serifa Gordita) y Lato (Texto limpio) */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@600;800&display=swap');

:root {
    --ns-bg: #FDFBF7;        /* Crema muy suave */
    --ns-dark: #231F20;      /* Negro suave (Casi el del logo) */
    --ns-gold: #C6A87C;      /* Dorado sobrio */
    --ns-contrast: #FFFFFF;
}

.naama-salon-page {
    background-color: var(--ns-bg);
    color: var(--ns-dark);
    font-family: 'Lato', sans-serif;
    overflow-x: hidden;
}

/* TIPOGRAFÍA */
h1, h2, h3, h4, .brand-name {
    font-family: 'Playfair Display', serif;
    font-weight: 800; /* Letra GORDITA como pediste */
}

/* NAVBAR */
.ns-nav {
    background: var(--ns-bg);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}
.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo-wrapper { flex: 1; }
.main-logo { height: 50px; object-fit: contain; } /* Ajusta altura según tu logo */

.nav-links { display: flex; gap: 30px; align-items: center; }
.nav-links a {
    text-decoration: none;
    color: var(--ns-dark);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1px;
}
.btn-nav {
    background: var(--ns-dark);
    color: white !important;
    padding: 10px 20px;
    border-radius: 4px;
    transition: 0.3s;
}
.btn-nav:hover { background: var(--ns-gold); }

/* HERO */
.ns-hero {
    max-width: 1200px;
    margin: 40px auto 80px;
    padding: 0 20px;
}
.hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}
.badge-salon {
    display: inline-block;
    background: #EAE6DF;
    padding: 6px 12px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 20px;
}
.ns-hero h1 {
    font-size: 3.8rem;
    line-height: 1.1;
    margin-bottom: 25px;
    color: var(--ns-dark);
}
.highlight { color: var(--ns-gold); font-style: italic; }
.ns-hero p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 35px;
    max-width: 450px;
}
.cta-group { display: flex; gap: 15px; }
.btn-solid {
    background: var(--ns-dark);
    color: white;
    padding: 15px 35px;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 2px solid var(--ns-dark);
    transition: 0.3s;
}
.btn-solid:hover { background: transparent; color: var(--ns-dark); }
.btn-outline {
    background: transparent;
    color: var(--ns-dark);
    padding: 15px 35px;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 2px solid #DDD;
    transition: 0.3s;
}
.btn-outline:hover { border-color: var(--ns-dark); }

.hero-visual { position: relative; }
.hero-img-main {
    width: 100%;
    height: 550px;
    object-fit: cover;
    border-radius: 10px; /* Bordes sutilmente redondeados, no redondos completos */
}
.floating-card {
    position: absolute;
    bottom: 30px;
    left: -30px;
    background: white;
    padding: 15px 25px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.1rem;
}

/* MARCAS */
.ns-brands {
    background: white;
    padding: 50px 20px;
    text-align: center;
    border-top: 1px solid #EEE;
    border-bottom: 1px solid #EEE;
}
.brands-title { font-size: 0.8rem; letter-spacing: 2px; color: #999; margin-bottom: 30px; font-weight: 700; }
.brands-row {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}
.brand-name {
    font-size: 2rem;
    color: #DDD;
    text-transform: uppercase;
    transition: 0.3s;
    cursor: default;
}
.brand-name:hover { color: var(--ns-gold); }

/* CARTA DE SERVICIOS */
.ns-menu { max-width: 900px; margin: 80px auto; padding: 0 20px; }
.menu-header { text-align: center; margin-bottom: 50px; }
.menu-header h2 { font-size: 3rem; margin-bottom: 10px; }

.cat-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 50px;
}
.cat-btn {
    background: transparent;
    border: 2px solid #EEE;
    padding: 12px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    color: #888;
    cursor: pointer;
    transition: 0.3s;
}
.cat-btn.active {
    border-color: var(--ns-dark);
    background: var(--ns-dark);
    color: white;
}
.cat-btn:hover { border-color: var(--ns-dark); color: var(--ns-dark); }
.cat-btn.active:hover { color: white; }

.service-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #EEE;
}
.s-name { font-weight: 700; font-size: 1.1rem; display: block; }
.s-desc { font-size: 0.85rem; color: #888; display: block; margin-top: 4px; }
.service-price { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.3rem; color: var(--ns-gold); }

/* BANNER */
.ns-banner {
    background-image: url('https://images.unsplash.com/photo-1620331313123-dd4639722b43?q=80&w=2070&auto=format&fit=crop');
    height: 400px;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    color: white;
}
.ns-banner::before { content:''; position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
.banner-content { position: relative; z-index: 2; padding: 20px; }
.banner-content h2 { font-size: 3rem; font-style: italic; margin-bottom: 10px; }

/* FOOTER */
.ns-footer { background: var(--ns-dark); color: white; padding: 80px 20px 30px; }
.footer-grid {
    max-width: 1100px;
    margin: 0 auto 60px;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 40px;
}
.footer-logo { height: 60px; filter: invert(1); opacity: 0.9; }
.f-col h4 { font-size: 1.2rem; margin-bottom: 20px; color: var(--ns-gold); }
.f-col p, .f-col a { color: #BBB; font-size: 0.95rem; text-decoration: none; display: block; margin-bottom: 10px; transition: 0.3s; }
.f-col a:hover { color: white; }
.copyright { text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; font-size: 0.8rem; color: #666; }

/* WHATSAPP FLOAT */
.wsp-float {
    position: fixed; bottom: 30px; right: 30px;
    background: #25D366; color: white;
    width: 60px; height: 60px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 999; transition: 0.3s;
}
.wsp-float:hover { transform: scale(1.1); }

/* ANIMACIONES */
.fade-up { animation: fadeInUp 0.8s ease forwards; opacity: 0; transform: translateY(30px); }
.fade-in { animation: fadeIn 1.2s ease forwards; opacity: 0; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }

/* RESPONSIVE */
@media(max-width: 900px) {
    .ns-hero { margin-top: 20px; }
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .hero-img-main { height: 350px; }
    .cta-group { justify-content: center; }
    .nav-links { display: none; } /* En móvil simplificamos */
    .floating-card { display: none; }
    .ns-hero h1 { font-size: 2.8rem; }
    .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 30px; }
    .logo-col { display: flex; justify-content: center; }
}
`;