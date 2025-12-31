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
        <div key={index} className="service-card-lux">
            <div className="s-main-info">
                <div className="s-header-row">
                    <h4 className="s-name">
                        {item.name}
                        {item.tag && <span className="s-badge">{item.tag}</span>}
                    </h4>
                    <span className="s-price">{item.price}</span>
                </div>
                
                {item.desc && <p className="s-desc">{item.desc}</p>}
                
                <div className="s-meta">
                    {item.worker && (
                        <span className="s-worker">
                            <Star size={12} className="icon-gold" /> {item.worker}
                        </span>
                    )}
                    {item.time && (
                        <span className="s-time">
                            <Clock size={12} /> {item.time}
                        </span>
                    )}
                </div>
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
    { id: 'tratamientos', label: 'Tratamientos Capilares' },
    { id: 'manos_pies', label: 'Manicura & Pedicura' },
    { id: 'estetica_masajes', label: 'Estética & Masajes' },
    { id: 'depilacion', label: 'Depilación Dama' },
    { id: 'podologia', label: 'Podología Clínica' },
    { id: 'adicionales', label: 'Adicionales & Estilo' },
];

const servicesData = {
    peluqueria: [
        { name: "Corte de Dama", price: "$16.000", worker: "Cami, Valeria, Vivy", time: "45 min" },
        { name: "Corte de Varón", price: "$13.000", worker: "Vivy, Cami", time: "45 min" },
        { name: "Corte + Bordado", price: "$28.000", worker: "Cami, Valeria", time: "1.5 hr" },
        { name: "Crecimiento (Raíz)", price: "$30.000", worker: "Cami, Valeria", time: "40 min" },
        { name: "Color Global Tinte", price: "Desde $45.000", desc: "Desde $45k (Corto) a $72k (X-Largo)", worker: "Cami, Valeria" },
        { name: "Balayage Tradicional", price: "Desde $85.000", desc: "Técnica de autor. Hasta $100k X-Largo", worker: "Cami, Valeria" },
        { name: "Babylights Premium", price: "Desde $85.000", desc: "Efecto rubio total. Hasta $100k X-Largo", worker: "Cami, Valeria" },
        { name: "Mechas Papel", price: "Desde $85.000", desc: "Máxima precisión. Hasta $120k X-Largo", worker: "Cami, Valeria" },
        { name: "Mechas con Gorro", price: "Desde $75.000", desc: "Desde $75k a $105k X-Largo", worker: "Cami, Valeria" },
        { name: "Alisado Profesional", price: "Desde $55.990", desc: "Liso espejo. Hasta $85k X-Largo/Volumen", worker: "Cami, Valeria" },
        { name: "Botox Capilar", price: "Desde $38.000", desc: "Hidratación profunda. Hasta $60k X-Largo", worker: "Cami, Valeria" },
        { name: "Camuflaje de Canas (Varón)", price: "$18.000", worker: "Vivy, Cami, Valeria" },
        { name: "Cauterización de Puntas", price: "$15.000", desc: "Sellado térmico sin corte", worker: "Valeria, Cami" },
        { name: "Omniplex", price: "$10.000", desc: "Protección en procesos de color", worker: "Equipo", tag: "MUST" }
    ],
    tratamientos: [
        { name: "Tratamiento SOW", price: "$36.000", desc: "Línea Orgánica Premium", worker: "Equipo", tag: "BEST" },
        { name: "Tratamiento Sebastian", price: "$27.990", desc: "Reconstrucción Penetraitt", worker: "Equipo" },
        { name: "Tratamiento Wella", price: "$28.000", worker: "Equipo" },
        { name: "Tratamiento Green Soho", price: "$27.990", worker: "Equipo" },
        { name: "Tratamiento TIGI", price: "$22.990", worker: "Equipo" },
        { name: "Detox Cuero Cabelludo", price: "$15.000", worker: "Equipo" },
        { name: "Detox + Alta Frecuencia", price: "$22.000", worker: "Equipo", time: "30 min" },
        { name: "Lavado + Secado", price: "$14.000", worker: "Equipo" },
        { name: "Nutritivo Express", price: "$10.000", worker: "Equipo" },
        { name: "Ampolla Rescate", price: "$12.000", worker: "Equipo" }
    ],
    manos_pies: [
        { name: "Esmaltado Permanente", price: "$19.990", worker: "Gaby", time: "1 hr" },
        { name: "Degradado o Francesa", price: "$25.990", worker: "Gaby", time: "1.1 hr" },
        { name: "Baño de PolyGel", price: "$34.990", worker: "Gaby", time: "1 hr" },
        { name: "Capping Rubber", price: "$28.990", worker: "Gaby", time: "1 hr" },
        { name: "Extensión Soft Gel", price: "$42.990", worker: "Gaby", time: "2 hr" },
        { name: "Esculpidas Polygel", price: "$39.990", worker: "Gaby", time: "2.5 hr" },
        { name: "Pedicure Permanente", price: "$27.990", worker: "Gaby", time: "50 min" },
        { name: "Pedicure Spa", price: "$35.000", worker: "Gaby", time: "1.1 hr" },
        { name: "Esmaltado de Niñas", price: "$8.000", worker: "Gaby", tag: "MINI" },
        { name: "Baño Parafina Caliente", price: "$8.000", desc: "Manos o Pies", worker: "Gaby" },
        { name: "Manicura Express Varón", price: "$12.000", worker: "Gaby" },
        { name: "Esmaltado Tradicional", price: "$8.000", desc: "Solo cambio color", worker: "Gaby" }
    ],
    estetica_masajes: [
        { name: "Limpieza Facial Profunda", price: "$36.000", worker: "Vivy", time: "1 hr" },
        { name: "Limpieza Facial Media", price: "$30.000", worker: "Vivy", time: "45 min" },
        { name: "Limpieza Facial Básica", price: "$20.000", worker: "Vivy", time: "35 min" },
        { name: "BB Glow", price: "$39.000", worker: "Vivy", time: "1 hr" },
        { name: "BB Lips", price: "$28.000", worker: "Vivy", time: "45 min" },
        { name: "Fibroblast", price: "$28.000", desc: "Desde según zona", worker: "Vivy" },
        { name: "Masaje Descontracturante", price: "$26.000", worker: "Vivy", time: "55 min" },
        { name: "Masaje de Relajación", price: "$26.000", worker: "Vivy", time: "55 min" },
        { name: "Masaje Reductivo", price: "$45.000", worker: "Vivy", time: "1.2 hr" },
        { name: "Pack 6 Sesiones Reductivo", price: "$195.000", worker: "Vivy" },
        { name: "Reflexología", price: "$30.000", worker: "Vivy", time: "35 min" },
        { name: "Masaje Mandíbula (Bruxismo)", price: "$12.000", worker: "Vivy" },
        { name: "Masaje Craneal y Cuello", price: "$10.000", worker: "Vivy" },
        { name: "Inyección de Bienestar", price: "$80.000", worker: "Vivy", tag: "VIP" }
    ],
    depilacion: [
        { name: "Piernas Completas", price: "$19.000", worker: "Gaby", time: "25 min" },
        { name: "Rebaje Completo", price: "$20.000", worker: "Gaby", time: "25 min" },
        { name: "Rostro Completo", price: "$14.000", worker: "Gaby", time: "15 min" },
        { name: "Axilas", price: "$7.000", worker: "Gaby", time: "5 min" },
        { name: "Brazos Completos", price: "$16.000", worker: "Gaby", time: "10 min" },
        { name: "Lifting de Pestañas", price: "$26.000", worker: "Gaby", time: "45 min" },
        { name: "Laminado de Cejas", price: "$15.000", worker: "Gaby" },
        { name: "Perfilado de Cejas", price: "$9.000", worker: "Gaby" }
    ],
    podologia: [
        { name: "Podología Clínica Avanzada", price: "$25.000", worker: "Michelle", time: "1.2 hr" },
        { name: "Podología Clínica Básica", price: "$20.000", worker: "Michelle", time: "40 min" }
    ],
    adicionales: [
        { name: "Maquillaje Profesional", price: "$30.000", worker: "Allison", time: "2 hr" },
        { name: "Peinado Avanzado", price: "Desde $32.000", worker: "Allison, Cami, Valeria" },
        { name: "Brushing Largo", price: "$13.000", worker: "Peluquería", time: "25 min" },
        { name: "Brushing Medio", price: "$10.000", worker: "Peluquería", time: "20 min" },
        { name: "Brushing Corto", price: "$7.000", worker: "Peluquería", time: "15 min" },
        { name: "Plancha Adicional", price: "$5.000", worker: "Peluquería", time: "30 min" },
        { name: "Maquillaje de Cejas", price: "$4.000", worker: "Allison" }
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
}.service-card-lux {
    background: rgba(255, 255, 255, 0.03);
    border-left: 2px solid var(--accent);
    padding: 20px;
    transition: all 0.3s ease;
    border-radius: 0 4px 4px 0;
}

.service-card-lux:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateX(10px);
    box-shadow: -5px 5px 20px rgba(0,0,0,0.2);
}

.s-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.s-badge {
    background: var(--accent);
    color: var(--dark-bg);
    font-size: 0.6rem;
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: 10px;
    font-weight: 800;
    vertical-align: middle;
}

.s-meta {
    display: flex;
    gap: 15px;
    margin-top: 10px;
    font-size: 0.75rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.s-worker { display: flex; align-items: center; gap: 5px; color: #bbb; }
.s-time { display: flex; align-items: center; gap: 5px; }
`;