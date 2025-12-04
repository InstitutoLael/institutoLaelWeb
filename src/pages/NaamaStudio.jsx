import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, Instagram, ArrowRight, Star, Phone, Mail, ShoppingBag } from 'lucide-react';
import logoNaama from '../assets/img/Partners/naama-studio.png'; 

export default function NaamaStudioLuxury() {
  const [activeCategory, setActiveCategory] = useState('peluqueria');
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para efecto glass en navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="naama-wrapper">
      <style>{styles}</style>

      {/* --- NAVBAR FLOTANTE --- */}
      <nav className={`lux-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="lux-container nav-inner">
            <div className="nav-logo">
                {/* Logo o Texto */}
                <img src={logoNaama} alt="Naamá Studio" className="logo-img" />
            </div>
            
            <div className="nav-menu desktop-only">
                <a href="#origen">Origen</a>
                <a href="#servicios">Carta</a>
                <a href="#contacto">Contacto</a>
            </div>

            <a href="https://wa.me/56979520623" className="btn-book-nav">
                Reservar Hora
            </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="lux-hero">
        <div className="hero-overlay"></div>
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop')" }}></div>
        
        <div className="hero-content fade-up">
            <span className="hero-subtitle">BELLEZA & BIENESTAR EN SAN MIGUEL</span>
            <h1 className="hero-title">
                Descubre tu versión <br/> 
                <span className="italic-accent">más radiante.</span>
            </h1>
            <p className="hero-desc">
                En Naamá Studio combinamos la excelencia técnica con un trato cálido y personalizado. 
                Expertos en colorimetría, cuidado capilar y estética integral.
            </p>
            <div className="hero-actions">
                <a href="#servicios" className="btn-primary">Ver Precios</a>
                <a href="https://wa.me/56979520623" className="btn-secondary">Agendar WhatsApp</a>
            </div>
        </div>
      </header>

      {/* --- SECCIÓN ORIGEN (Significado Naamá) --- */}
      <section id="origen" className="lux-section philosophy">
        <div className="lux-container grid-split">
            <div className="split-visual fade-in">
                <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop" alt="Salón Interior" className="philo-img img-main" />
            </div>
            <div className="split-text">
                <span className="section-tag">NUESTRA INSPIRACIÓN</span>
                <h2>Naamá: Dulzura y <br/>Agrado.</h2>
                <p>
                    Haciendo honor a nuestro nombre bíblico, que evoca lo "agradable" y la "dulzura", hemos creado un espacio donde cada detalle está pensado para tu paz y satisfacción.
                </p>
                <p>
                    No somos solo un salón de belleza; somos un equipo de profesionales comprometidos con realzar lo mejor de ti, utilizando productos de clase mundial en un ambiente de respeto y calidez.
                </p>
                
                <div className="features-grid">
                    <div className="feature-item">
                        <Sparkles size={18} className="icon-gold" />
                        <span>Atención Personalizada</span>
                    </div>
                    <div className="feature-item">
                        <ShoppingBag size={18} className="icon-gold" />
                        <span>Venta de Productos</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- MARCAS (CON AVISO DE VENTA) --- */}
      <div className="lux-brands-strip">
        <p>UTILIZAMOS Y VENDEMOS LAS MEJORES MARCAS</p>
        <div className="brands-flex">
            <span>TIGI</span>
            <span>KÉRASTASE</span>
            <span>BOFFEL</span>
            <span>SOW</span>
            <span>OLAPLEX</span>
            <span>L'ORÉAL</span>
        </div>
      </div>

      {/* --- CARTA DE SERVICIOS --- */}
      <section id="servicios" className="lux-section services-dark">
        <div className="lux-container">
            <div className="section-header text-center">
                <span className="section-tag-light">EXCELENCIA PROFESIONAL</span>
                <h2 className="text-light">Nuestros Servicios</h2>
                <p className="subtitle-light">Selecciona una categoría para ver el detalle</p>
            </div>

            {/* Categorías (Tabs) */}
            <div className="categories-wrapper">
                <div className="categories-scroll">
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
            </div>

            {/* Lista de Precios */}
            <div className="services-grid fade-in" key={activeCategory}>
                {servicesData[activeCategory].map((item, index) => (
                    <div key={index} className="service-card">
                        <div className="s-info">
                            <h4 className="s-name">{item.name}</h4>
                            {item.desc && <p className="s-desc">{item.desc}</p>}
                        </div>
                        <div className="s-price">
                            {item.price}
                        </div>
                    </div>
                ))}
            </div>

            <div className="book-cta-container">
                <p className="cta-note">* Precios sujetos a evaluación según largo y volumen del cabello.</p>
                <a href="https://wa.me/56979520623" className="btn-primary inverted">
                    Reservar Cita <ArrowRight size={18} />
                </a>
            </div>
        </div>
      </section>

      {/* --- RESEÑA --- */}
      <section className="lux-section reviews">
        <div className="lux-container text-center">
             <div className="stars">★★★★★</div>
            <h3 className="quote">"La atención es maravillosa, los productos son de excelente calidad y el resultado en mi cabello fue espectacular."</h3>
            <p className="author">— Cliente Satisfecha</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contacto" className="lux-footer">
        <div className="lux-container footer-grid">
            <div className="f-block brand-block">
                <img src={logoNaama} alt="Naamá Logo" className="footer-logo" />
                <p>Tu belleza en manos expertas. Visítanos en el corazón de San Miguel.</p>
                <div className="social-links">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={24} /></a>
                </div>
            </div>
            
            <div className="f-block">
                <h5>Ubicación & Horario</h5>
                <p className="flex-icon"><MapPin size={18} className="icon-gold"/> Arcadia 1297, San Miguel</p>
                <p className="flex-icon"><Clock size={18} className="icon-gold"/> Lun - Sáb: 10:00 - 19:30</p>
            </div>

            <div className="f-block">
                <h5>Contacto</h5>
                <a href="https://wa.me/56979520623" className="flex-icon link-hover">
                    <Phone size={18} className="icon-gold"/> +56 9 7952 0623
                </a>
                <a href="mailto:naamastudiospa@gmail.com" className="flex-icon link-hover">
                    <Mail size={18} className="icon-gold"/> naamastudiospa@gmail.com
                </a>
            </div>
        </div>
        <div className="footer-bottom">
            © {new Date().getFullYear()} Naamá Studio SpA. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// --- DATA ---
const categories = [
    { id: 'peluqueria', label: 'Peluquería & Color' },
    { id: 'tratamientos', label: 'Tratamientos' },
    { id: 'manos', label: 'Manos & Pies' },
    { id: 'mirada', label: 'Pestañas & Cejas' },
    { id: 'depi_mujer', label: 'Depilación Dama' },
    { id: 'depi_hombre', label: 'Depilación Varón' },
    { id: 'estetica', label: 'Estética & Masajes' },
];

const servicesData = {
    peluqueria: [
        { name: "Corte de Dama", price: "$15.990", desc: "Asesoría y styling" },
        { name: "Corte de Varón", price: "$12.990" },
        { name: "Corte + Bordado", price: "$25.990", desc: "Eliminación de horquillas" },
        { name: "Brushing", price: "$15.990" },
        { name: "Brushing Adicional", price: "$5.990", desc: "Al realizar otro servicio" },
        { name: "Plancha Adicional", price: "$3.990" },
        { name: "Balayage Tradicional", price: "$70.990 - $85.990", desc: "Según largo. Sin crecimiento." },
        { name: "Babylights", price: "$75.990 - $90.990", desc: "Según largo. Sin crecimiento." },
        { name: "Mecha Tradicional (Papel)", price: "$70.990 - $85.990", desc: "Según largo. Sin crecimiento." },
        { name: "Mechas con Gorro", price: "$65.990 - $80.990", desc: "Según largo. Sin crecimiento." },
        { name: "Color Global (Tinte)", price: "$40.990 - $55.990", desc: "Según largo" },
        { name: "Baño de Color", price: "$35.990 - $45.990", desc: "Para revivir el tono" },
        { name: "Crecimiento (Raíz)", price: "$25.990" },
        { name: "Baño de Color + Crecimiento", price: "$49.990" },
        { name: "Fondo para Mechas", price: "$44.990" },
        { name: "Alisado Prof. Corto", price: "$50.990", desc: "Poco cabello" },
        { name: "Alisado Prof. Medio", price: "$60.990", desc: "Hasta broche sostén" },
        { name: "Alisado Prof. Largo", price: "$70.990" },
        { name: "Alisado Extra Largo/Volumen", price: "$78.990" },
        { name: "Botox Capilar", price: "$35.990 - $50.990", desc: "Hidratación profunda, según largo" },
    ],
    tratamientos: [
        { name: "Lavado Base + Secado", price: "$10.990" },
        { name: "Lavado Nutritivo", price: "$8.990", desc: "Solo lavado" },
        { name: "Lavado Nutritivo + Secado", price: "$13.990" },
        { name: "Tratamiento Capilar TIGI", price: "$22.990" },
        { name: "Tratamiento Línea SOW", price: "$35.990" },
        { name: "Tratamiento Sebastian Penetraitt", price: "$31.990", desc: "Reconstrucción profunda" },
        { name: "Tratamiento Green Zoho", price: "$27.990", desc: "Especial cabello ondulado" },
        { name: "Ampolla Nutritiva", price: "$12.990" },
    ],
    manos: [
        { name: "Esmaltado Permanente", price: "$20.990" },
        { name: "Degradado o Francesa", price: "$21.990", desc: "Permanente" },
        { name: "Extensión Soft Gel", price: "Desde $35.990" },
        { name: "Baño de PolyGel", price: "$31.990" },
        { name: "Capping Rubber", price: "$25.990" },
        { name: "Retiro Esmalte Permanente", price: "$3.990" },
        { name: "Retiro Acrílico/SoftGel", price: "$12.990" },
        { name: "Diseño Mano Alzada", price: "$1.490 c/u" },
        { name: "Decoraciones", price: "$990 c/u" },
        { name: "Parche de Uñas", price: "$2.990" },
        { name: "Exfoliación", price: "$3.990" },
        { name: "Pedicure Permanente", price: "$24.990" },
        { name: "Pedicure Spa", price: "$17.990" },
        { name: "Pedicure Tradicional", price: "$14.990" },
    ],
    mirada: [
        { name: "Lifting de Pestañas", price: "$24.990" },
        { name: "Ondulación de Pestañas", price: "$23.990" },
        { name: "Lifting de Cejas", price: "$8.990" },
        { name: "Perfilado de Cejas", price: "$5.990" },
        { name: "Depilación Entre Ceja", price: "$1.000" },
    ],
    depi_mujer: [
        { name: "Rostro Completo", price: "$10.990", desc: "Frente, mentón, mejillas, bozo" },
        { name: "Bozo", price: "$2.990" },
        { name: "Mentón", price: "$2.990" },
        { name: "Patillas", price: "$2.990" },
        { name: "Cuello", price: "$2.990" },
        { name: "Axilas", price: "$4.990" },
        { name: "Brazos Completos", price: "$13.990" },
        { name: "Medios Brazos", price: "$5.990" },
        { name: "Piernas Completas", price: "$15.990" },
        { name: "Medias Piernas", price: "$6.990" },
        { name: "Rebaje Completo", price: "$16.990" },
        { name: "Rebaje Largo", price: "$8.990" },
        { name: "Rebaje Bikini", price: "$6.990" },
        { name: "Abdomen Completo", price: "$7.990" },
        { name: "Abdomen Bajo", price: "$5.990" },
        { name: "Espalda Alta o Baja", price: "$6.990 c/u" },
        { name: "Glúteos", price: "$5.990" },
        { name: "Hombros", price: "$5.990" },
        { name: "Tira Interglútea", price: "$1.990" },
        { name: "Tapón Nariz/Orejas", price: "$1.990 c/u" },
    ],
    depi_hombre: [
        { name: "Piernas Completas", price: "$18.990" },
        { name: "Medias Piernas", price: "$9.990" },
        { name: "Pecho Completo", price: "$10.990" },
        { name: "Abdomen", price: "$8.990" },
        { name: "Abdomen Bajo", price: "$6.990" },
        { name: "Espalda (Varía)", price: "Consultar" },
        { name: "Rostro", price: "$18.990" },
        { name: "Axilas", price: "$5.990" },
        { name: "Orejas", price: "$2.990" },
        { name: "Rebaje", price: "$23.990" },
    ],
    estetica: [
        { name: "Limpieza Facial Profunda", price: "$35.990" },
        { name: "Limpieza Facial Media", price: "$29.990" },
        { name: "Limpieza Facial Básica", price: "$19.990" },
        { name: "BB Glow", price: "$35.990", desc: "Piel de porcelana" },
        { name: "BB Lips", price: "$19.990", desc: "Hidratación y color labios" },
        { name: "Fibroblast", price: "$25.990", desc: "Precio depende de zona" },
        { name: "Hilos de Colágeno", price: "$9.990" },
        { name: "Pack 6 Masajes Reductivos", price: "$189.990" },
        { name: "Masaje Reductivo (1 sesión)", price: "$39.990" },
        { name: "Drenaje Linfático", price: "$25.990" },
        { name: "Drenaje Linfático + Aparatología", price: "$95.990" },
        { name: "Masaje Relajación", price: "$25.990" },
        { name: "Masaje Descontracturante", price: "$25.990" },
        { name: "Reflexología", price: "$25.990" },
        { name: "Auriculoterapia", price: "$10.990" },
    ]
};

// --- ESTILOS MEJORADOS ---
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Montserrat:wght@300;400;500;600&display=swap');

:root {
    --bg-color: #FDFBF8; /* Crema muy suave */
    --text-main: #1A1A1A;
    --text-muted: #666;
    --accent: #B08D55; /* Oro viejo elegante */
    --dark-bg: #121212;
    --white: #ffffff;
}

/* BASE */
.naama-wrapper {
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

h1, h2, h3, .hero-subtitle, .section-tag, .quote, .nav-logo {
    font-family: 'Cinzel', serif; /* Fuente más clásica y "Biblical/Elegant" */
}

.lux-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* NAVBAR */
.lux-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 20px 0;
    transition: all 0.4s ease;
}
.lux-nav.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 12px 0;
    box-shadow: 0 2px 20px rgba(0,0,0,0.05);
}
.nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo-img { height: 45px; object-fit: contain; }

.nav-menu { display: flex; gap: 40px; }
.nav-menu a {
    text-decoration: none;
    color: var(--text-main);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    transition: color 0.3s;
}
.nav-menu a:hover { color: var(--accent); }

.btn-book-nav {
    background: var(--text-main);
    color: var(--white);
    padding: 10px 24px;
    text-decoration: none;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s;
    border-radius: 2px;
}
.btn-book-nav:hover { background: var(--accent); }

/* HERO */
.lux-hero {
    height: 90vh; 
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--white);
}
.hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
    transform: scale(1.05); /* Ligero zoom */
    animation: zoomOut 20s infinite alternate;
}
@keyframes zoomOut { from { transform: scale(1.1); } to { transform: scale(1); } }

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
    z-index: 1;
}
.hero-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    padding: 20px;
}
.hero-subtitle {
    display: block;
    font-size: 0.9rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: rgba(255,255,255,0.9);
}
.hero-title {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 25px;
    font-weight: 600;
}
.italic-accent {
    font-family: 'Cinzel', serif;
    font-style: italic;
    color: var(--accent);
}
.hero-desc {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.6;
    opacity: 0.9;
}
.hero-actions { display: flex; gap: 15px; justify-content: center; }

.btn-primary, .btn-secondary {
    padding: 14px 30px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: 0.3s;
    min-width: 160px;
}
.btn-primary {
    background: var(--white);
    color: var(--text-main);
    border: 1px solid var(--white);
}
.btn-secondary {
    background: transparent;
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.5);
}
.btn-primary:hover { background: var(--accent); border-color: var(--accent); color: white; }
.btn-secondary:hover { background: white; color: var(--text-main); }

/* SECCIÓN ORIGEN */
.lux-section { padding: 80px 0; }
.grid-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.philo-img { width: 100%; height: 500px; object-fit: cover; border-radius: 4px; }
.section-tag { font-size: 0.8rem; letter-spacing: 3px; color: var(--accent); display: block; margin-bottom: 15px; font-weight: 600; }
.split-text h2 { font-size: 2.8rem; line-height: 1.1; margin-bottom: 25px; color: var(--text-main); }
.split-text p { color: var(--text-muted); margin-bottom: 20px; font-size: 1rem; }
.features-grid { display: flex; gap: 30px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 30px; }
.feature-item { display: flex; align-items: center; gap: 10px; font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.icon-gold { color: var(--accent); }

/* MARCAS */
.lux-brands-strip { background: white; padding: 50px 0; text-align: center; border-top: 1px solid #eaeaea; }
.lux-brands-strip p { font-size: 0.75rem; letter-spacing: 2px; color: #999; margin-bottom: 30px; font-weight: 600; }
.brands-flex { display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; padding: 0 20px; }
.brands-flex span { font-family: 'Cinzel', serif; font-size: 1.5rem; color: #ccc; font-weight: 600; transition: 0.3s; cursor: default; }
.brands-flex span:hover { color: var(--accent); }

/* SERVICIOS DARK */
.services-dark { background-color: var(--dark-bg); color: var(--white); padding-top: 100px; padding-bottom: 100px; }
.section-tag-light { font-size: 0.8rem; letter-spacing: 3px; color: var(--accent); text-transform: uppercase; display: block; margin-bottom: 10px; }
.text-light { color: var(--white); font-size: 3rem; margin-bottom: 10px; }
.subtitle-light { color: #777; font-size: 1rem; margin-bottom: 40px; }

/* Tabs Categorias */
.categories-wrapper { display: flex; justify-content: center; margin-bottom: 50px; }
.categories-scroll { 
    display: flex; gap: 10px; padding-bottom: 10px; overflow-x: auto; 
    -webkit-overflow-scrolling: touch; 
}
.categories-scroll::-webkit-scrollbar { height: 2px; background: #333; }
.categories-scroll::-webkit-scrollbar-thumb { background: var(--accent); }

.cat-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: #999;
    padding: 12px 20px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    transition: 0.3s;
    white-space: nowrap;
}
.cat-btn:hover, .cat-btn.active { border-color: var(--accent); color: var(--accent); background: rgba(198, 168, 124, 0.05); }

/* Grid Servicios */
.services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 Columnas en Desktop */
    column-gap: 60px;
    row-gap: 30px;
    max-width: 1000px;
    margin: 0 auto;
}
.service-card {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 15px;
}
.s-info { flex: 1; padding-right: 15px; }
.s-name { font-size: 1.1rem; color: #f0f0f0; margin-bottom: 4px; font-weight: 500; }
.s-desc { font-size: 0.8rem; color: #666; font-style: italic; }
.s-price { font-size: 1.1rem; color: var(--accent); font-family: 'Cinzel', serif; font-weight: 600; white-space: nowrap; }

.book-cta-container { text-align: center; margin-top: 70px; }
.cta-note { color: #555; font-size: 0.8rem; margin-bottom: 20px; font-style: italic; }
.btn-primary.inverted { background: transparent; border-color: var(--accent); color: var(--accent); display: inline-flex; align-items: center; gap: 10px; }
.btn-primary.inverted:hover { background: var(--accent); color: var(--dark-bg); }

/* REVIEWS */
.reviews { background: var(--bg-color); }
.stars { color: var(--accent); font-size: 1.5rem; margin-bottom: 20px; }
.quote { font-size: 1.8rem; max-width: 800px; margin: 0 auto 30px; font-weight: 400; line-height: 1.4; color: var(--text-main); font-style: italic; }
.author { font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }

/* FOOTER */
.lux-footer { background: #0a0a0a; color: #888; padding: 80px 0 30px; font-size: 0.95rem; }
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 50px; margin-bottom: 60px; }
.footer-logo { height: 50px; filter: grayscale(1) invert(1); opacity: 0.8; margin-bottom: 20px; }
.f-block h5 { color: var(--white); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 25px; font-size: 0.9rem; font-family: 'Cinzel', serif; }
.flex-icon { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; color: #aaa; }
.link-hover { text-decoration: none; transition: 0.3s; }
.link-hover:hover { color: var(--accent); }
.footer-bottom { text-align: center; border-top: 1px solid #222; padding-top: 30px; font-size: 0.8rem; opacity: 0.5; }

/* ANIMACIONES */
.fade-up { animation: fadeInUp 1s ease forwards; opacity: 0; transform: translateY(30px); }
.fade-in { animation: fadeIn 1.5s ease forwards; opacity: 0; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }

/* MOBILE RESPONSIVE */
@media (max-width: 900px) {
    .desktop-only { display: none; }
    .lux-hero { height: 85vh; }
    .hero-title { font-size: 2.2rem; }
    .grid-split { grid-template-columns: 1fr; gap: 40px; }
    .philo-img { height: 350px; }
    .services-grid { grid-template-columns: 1fr; } /* 1 Columna en Movil */
    .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .brand-block, .f-block { display: flex; flex-direction: column; align-items: center; }
    .categories-scroll { justify-content: flex-start; }
    .hero-actions { flex-direction: column; width: 100%; max-width: 300px; margin: 0 auto; }
}
`;