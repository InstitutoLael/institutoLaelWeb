import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, Instagram, ArrowRight, Star } from 'lucide-react';
// Asegúrate de tener instalado lucide-react: npm install lucide-react
// Si no tienes el logo aún, el código usará texto elegante por defecto.
import logoNaama from '../assets/img/Partners/naama-studio.png'; 

export default function NaamaStudioLuxury() {
  const [activeCategory, setActiveCategory] = useState('pelo');
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar el navbar
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
                {/* Si tienes logo imagen, descomenta abajo, si no, usa texto */}
                <img src={logoNaama} alt="Naamá" className="logo-img" /> 
                {/* <span className="logo-text">NAAMÁ</span> */}
            </div>
            
            <div className="nav-menu desktop-only">
                <a href="#filosofia">Esencia</a>
                <a href="#servicios">Carta</a>
                <a href="#galeria">Experiencia</a>
            </div>

            <a href="https://wa.me/56912345678" className="btn-book-nav">
                Reservar Cita
            </a>
        </div>
      </nav>

      {/* --- HERO SECTION (IMPACTO VISUAL) --- */}
      <header className="lux-hero">
        <div className="hero-overlay"></div>
        {/* Imagen de fondo de alta calidad */}
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop')" }}></div>
        
        <div className="hero-content fade-up">
            <span className="hero-subtitle">BELLEZA CONSCIENTE & ATEMPORAL</span>
            <h1 className="hero-title">Tu refugio de <br/> <span className="italic-accent">bienestar personal.</span></h1>
            <p className="hero-desc">
                En Naamá Studio fusionamos la alta peluquería con el cuidado integral. 
                Un espacio donde tu belleza natural es la protagonista.
            </p>
            <div className="hero-actions">
                <a href="#servicios" className="btn-primary">Ver Servicios</a>
                <a href="#filosofia" className="btn-secondary">Descubre Naamá</a>
            </div>
        </div>
      </header>

      {/* --- SECCIÓN FILOSOFÍA (¿QUÉ ES NAAMÁ?) --- */}
      <section id="filosofia" className="lux-section philosophy">
        <div className="lux-container grid-split">
            <div className="split-visual fade-in-scroll">
                <img src="https://images.unsplash.com/photo-1595476103518-3c182efeaa15?q=80&w=1770&auto=format&fit=crop" alt="Detalles Salón" className="philo-img img-1" />
                <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1769&auto=format&fit=crop" alt="Productos" className="philo-img img-2" />
            </div>
            <div className="split-text">
                <span className="section-tag">NUESTRA ESENCIA</span>
                <h2>Más que un salón,<br/>un lugar para ti.</h2>
                <p>
                    <strong>Naamá</strong> nace del deseo de transformar la visita al salón en una experiencia sensorial completa. No solo cuidamos tu cabello o tus manos; cuidamos de ti.
                </p>
                <p>
                    Utilizamos exclusivamente productos de alta gama con ingredientes sostenibles, combinando técnicas de vanguardia con un trato cálido y personalizado. Porque creemos que el lujo real es el tiempo que te dedicas a ti misma.
                </p>
                <div className="features-grid">
                    <div className="feature-item">
                        <Sparkles size={20} className="icon-gold" />
                        <span>Productos Premium</span>
                    </div>
                    <div className="feature-item">
                        <Star size={20} className="icon-gold" />
                        <span>Expertos Coloristas</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- MARCAS (SUTIL Y ELEGANTE) --- */}
      <div className="lux-brands-strip">
        <p>TRABAJAMOS CON LOS MEJORES</p>
        <div className="brands-flex">
            <span>TIGI</span>
            <span>KERASTASE</span>
            <span>BOFFEL</span>
            <span>SOW</span>
            <span>OLAPLEX</span>
        </div>
      </div>

      {/* --- MENU DE SERVICIOS (TIPO RESTAURANTE DE LUJO) --- */}
      <section id="servicios" className="lux-section services-dark">
        <div className="lux-container">
            <div className="section-header text-center">
                <span className="section-tag-light">CARTA DE SERVICIOS</span>
                <h2 className="text-light">Diseña tu momento</h2>
            </div>

            {/* Categorías */}
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

            {/* Lista */}
            <div className="services-grid fade-in">
                {servicesData[activeCategory].map((item, index) => (
                    <div key={index} className="service-card">
                        <div className="s-info">
                            <h4 className="s-name">{item.name}</h4>
                            <p className="s-desc">{item.desc || 'Consultar detalles con especialista'}</p>
                        </div>
                        <div className="s-price">
                            <span className="price-val">${item.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="book-cta-container">
                <a href="https://wa.me/56912345678" className="btn-primary inverted">Agendar Cita en WhatsApp <ArrowRight size={18} /></a>
            </div>
        </div>
      </section>

      {/* --- TESTIMONIOS / SOCIAL PROOF --- */}
      <section className="lux-section reviews">
        <div className="lux-container text-center">
             <div className="stars">★★★★★</div>
            <h3 className="quote">"El mejor balayage que me han hecho en años. La atención de Naamá es simplemente otro nivel."</h3>
            <p className="author">— Valentina S., Cliente Frecuente</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="lux-footer">
        <div className="lux-container footer-grid">
            <div className="f-block brand-block">
                <img src={logoNaama} alt="Naamá" className="footer-logo" />
                <p>Resaltando tu belleza natural con pasión y excelencia.</p>
                <div className="social-links">
                    <a href="#"><Instagram size={20} /></a>
                </div>
            </div>
            
            <div className="f-block">
                <h5>Visítanos</h5>
                <p className="flex-icon"><MapPin size={16}/> ARCADIA 1297, SAN MIGUEL</p>
                <p className="flex-icon"><Clock size={16}/> Lun - Sab: 10:00 - 19:30</p>
            </div>

            <div className="f-block">
                <h5>Contacto</h5>
                <a href="tel:+56912345678">+56 9 7952 0623</a>
                <a href="mailto:contacto@naamastudio.cl">naamastudiospa@gmail.com</a>
            </div>
        </div>
        <div className="footer-bottom">
            © {new Date().getFullYear()} Naamá Studio. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// --- DATA ---
const categories = [
    { id: 'pelo', label: 'Color & Styling' },
    { id: 'manos', label: 'Nails Bar' },
    { id: 'spa', label: 'Spa Capilar' },
    { id: 'rostro', label: 'Lashes & Brows' },
];

const servicesData = {
    pelo: [
        { name: "Corte de Autor", price: "25.990", desc: "Asesoría de visagismo, lavado y styling." },
        { name: "Balayage Signature", price: "85.990", desc: "Técnica mano alzada, incluye matiz y protección." },
        { name: "Babylights Iluminación", price: "75.990", desc: "Efecto natural sun-kissed." },
        { name: "Retoque de Raíz", price: "38.990", desc: "Cobertura 100% canas con productos sin amoniaco." },
    ],
    manos: [
        { name: "Manicure Rusa", price: "24.990", desc: "Limpieza profunda de cutículas y esmaltado perfecto." },
        { name: "Soft Gel Extensions", price: "35.990", desc: "Largo y forma a elección, acabado natural." },
        { name: "Kapping Gel", price: "28.990", desc: "Protección para crecimiento de uña natural." },
    ],
    spa: [
        { name: "Ritual Kérastase Fusio-Dose", price: "35.990", desc: "Tratamiento personalizado instantáneo." },
        { name: "Botox Capilar Premium", price: "45.990", desc: "Hidratación profunda y reducción de frizz." },
    ],
    rostro: [
        { name: "Lifting de Pestañas + Tinte", price: "29.990", desc: "Curvatura natural y efecto rímel por 6 semanas." },
        { name: "Laminado de Cejas", price: "25.990", desc: "Diseño y fijación para cejas rebeldes." },
    ]
};

// --- ESTILOS CSS-IN-JS MEJORADOS ---
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

:root {
    --bg-color: #F9F8F6;
    --text-main: #1C1C1C;
    --text-muted: #666;
    --accent: #C6A87C;
    --dark-bg: #151515;
    --white: #ffffff;
}

/* RESET & BASE */
.naama-wrapper {
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: 'Montserrat', sans-serif;
    line-height: 1.6;
    width: 100%;
    overflow-x: hidden;
}

h1, h2, h3, .hero-subtitle, .section-tag, .quote {
    font-family: 'Cormorant Garamond', serif;
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
    padding: 15px 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}
.nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo-img { height: 40px; object-fit: contain; }
.logo-text { font-family: 'Cormorant Garamond'; font-weight: 600; font-size: 1.5rem; letter-spacing: 2px; }

.nav-menu { display: flex; gap: 40px; }
.nav-menu a {
    text-decoration: none;
    color: var(--text-main);
    font-size: 0.9rem;
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
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s;
}
.btn-book-nav:hover { background: var(--accent); }

/* HERO */
.lux-hero {
    height: 100vh; /* Pantalla completa */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--white);
    margin-bottom: 0;
}
.hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
}
.hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4); /* Oscurecer imagen */
    z-index: 1;
}
.hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 20px;
}
.hero-subtitle {
    display: block;
    font-size: 1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 20px;
    opacity: 0.9;
}
.hero-title {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 25px;
    font-weight: 400;
}
.italic-accent {
    font-style: italic;
    font-weight: 600;
}
.hero-desc {
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto 40px;
    opacity: 0.9;
}
.hero-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
}
.btn-primary {
    background: var(--white);
    color: var(--text-main);
    padding: 15px 35px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    font-weight: 600;
    transition: 0.3s;
    border: 1px solid var(--white);
}
.btn-secondary {
    background: transparent;
    color: var(--white);
    padding: 15px 35px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    border: 1px solid var(--white);
    transition: 0.3s;
}
.btn-primary:hover { background: var(--accent); border-color: var(--accent); color: var(--white); }
.btn-secondary:hover { background: rgba(255,255,255,0.1); }

/* SECCIÓN FILOSOFÍA */
.lux-section { padding: 100px 0; }
.grid-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
}
.split-visual {
    position: relative;
    height: 600px;
}
.philo-img {
    position: absolute;
    object-fit: cover;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}
.img-1 { width: 70%; height: 85%; top: 0; left: 0; z-index: 1; }
.img-2 { width: 55%; height: 50%; bottom: 0; right: 0; z-index: 2; border: 8px solid var(--bg-color); }

.section-tag {
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    display: block;
    margin-bottom: 20px;
    font-weight: 600;
}
.split-text h2 {
    font-size: 3rem;
    line-height: 1.1;
    margin-bottom: 30px;
    font-weight: 400;
}
.split-text p {
    color: var(--text-muted);
    margin-bottom: 20px;
    font-size: 1.05rem;
}
.features-grid {
    display: flex;
    gap: 30px;
    margin-top: 40px;
}
.feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Cormorant Garamond';
    font-size: 1.2rem;
    font-style: italic;
    color: var(--text-main);
}
.icon-gold { color: var(--accent); }

/* MARCAS */
.lux-brands-strip {
    background: white;
    padding: 50px 0;
    text-align: center;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
.lux-brands-strip p {
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: #999;
    margin-bottom: 25px;
}
.brands-flex {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
}
.brands-flex span {
    font-family: 'Cormorant Garamond';
    font-size: 1.8rem;
    color: #ccc;
    font-style: italic;
}

/* SERVICIOS DARK */
.services-dark {
    background-color: var(--dark-bg);
    color: var(--white);
}
.section-tag-light {
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.8;
}
.text-light { color: var(--white); font-size: 3rem; margin-top: 10px; }
.categories-wrapper {
    display: flex;
    justify-content: center;
    margin: 50px 0;
}
.categories-scroll {
    display: flex;
    gap: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 0;
    overflow-x: auto;
}
.cat-btn {
    background: none;
    border: none;
    color: rgba(255,255,255,0.5);
    font-size: 1.1rem;
    padding: 15px 20px;
    cursor: pointer;
    font-family: 'Cormorant Garamond';
    font-style: italic;
    transition: 0.3s;
    white-space: nowrap;
}
.cat-btn.active {
    color: var(--accent);
    border-bottom: 2px solid var(--accent);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 40px;
    max-width: 1000px;
    margin: 0 auto;
}
.service-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 20px;
}
.s-name { font-size: 1.2rem; font-family: 'Cormorant Garamond'; margin-bottom: 5px; color: var(--white); }
.s-desc { font-size: 0.85rem; color: rgba(255,255,255,0.5); max-width: 250px; }
.price-val { font-size: 1.2rem; color: var(--accent); font-family: 'Cormorant Garamond'; }

.book-cta-container { text-align: center; margin-top: 60px; }
.btn-primary.inverted {
    background: transparent;
    border-color: var(--accent);
    color: var(--accent);
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.btn-primary.inverted:hover {
    background: var(--accent);
    color: var(--dark-bg);
}

/* REVIEWS */
.reviews { background: var(--bg-color); }
.stars { color: var(--accent); font-size: 1.5rem; margin-bottom: 20px; }
.quote { font-size: 2rem; max-width: 800px; margin: 0 auto 30px; font-weight: 400; line-height: 1.3; }
.author { font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); }

/* FOOTER */
.lux-footer {
    background: #111;
    color: #888;
    padding: 80px 0 30px;
    font-size: 0.9rem;
}
.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 50px;
    margin-bottom: 60px;
}
.footer-logo { height: 40px; filter: grayscale(1) invert(1); opacity: 0.7; margin-bottom: 20px; }
.f-block h5 { color: var(--white); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; font-size: 0.8rem; }
.f-block a, .f-block p { display: block; margin-bottom: 12px; color: #888; text-decoration: none; transition: 0.3s; }
.f-block a:hover { color: var(--accent); }
.flex-icon { display: flex; align-items: center; gap: 10px; }
.footer-bottom { text-align: center; border-top: 1px solid #222; padding-top: 30px; font-size: 0.8rem; opacity: 0.5; }

/* ANIMACIONES */
.fade-up { animation: fadeInUp 1s ease forwards; opacity: 0; transform: translateY(30px); }
.fade-in { animation: fadeIn 1.5s ease forwards; opacity: 0; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }

/* MOBILE RESPONSIVE */
@media (max-width: 900px) {
    .desktop-only { display: none; }
    .lux-hero { height: 80vh; } /* Menos altura en móvil */
    .hero-title { font-size: 2.5rem; }
    
    .grid-split { grid-template-columns: 1fr; gap: 40px; }
    .split-visual { height: 400px; width: 100%; }
    
    .services-grid { grid-template-columns: 1fr; }
    
    .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .brand-block { display: flex; flex-direction: column; align-items: center; }
    .flex-icon { justify-content: center; }
}
`;