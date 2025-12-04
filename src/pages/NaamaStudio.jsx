import React, { useState } from 'react';
// Importamos tu logo (ajusta la ruta si es necesario)
import logoNaama from '../assets/img/Partners/naama-studio.png'; 

export default function NaamaStudio() {
  const [activeCategory, setActiveCategory] = useState('manos');

  return (
    <div className="naama-page">
      <style>{css}</style>

      {/* --- NAVBAR FLOTANTE --- */}
      <nav className="n-nav">
        <div className="nav-content">
            {/* Si la imagen no carga, muestra texto */}
            <img src={logoNaama} alt="Naamá Studio" className="nav-logo" onError={(e) => e.target.style.display='none'} />
            <span className="nav-text-logo">NAAMÁ STUDIO</span>
            
            <a href="https://www.instagram.com/naamastudio_/" target="_blank" rel="noreferrer" className="social-btn">
                Instagram
            </a>
        </div>
      </nav>

      {/* --- HERO SECTION (Portada) --- */}
      <header className="n-hero">
        <div className="hero-text fade-up">
            <span className="overhead">ESTÉTICA & BIENESTAR</span>
            <h1>Tu mejor versión,<br/> <span className="italic">empieza aquí.</span></h1>
            <p>Especialistas en colorimetría, cuidado capilar, manicure y estética integral.</p>
            <div className="hero-buttons">
                <a href="https://wa.me/56912345678" className="btn-primary">Agendar Hora</a>
                <button className="btn-secondary" onClick={() => document.getElementById('menu-precios').scrollIntoView({behavior: 'smooth'})}>
                    Ver Precios
                </button>
            </div>
        </div>
        <div className="hero-img fade-in"></div>
      </header>

      {/* --- MARCAS (Productos) --- */}
      <div className="brands-ticker">
        <p>TRABAJAMOS Y VENDEMOS LAS MEJORES MARCAS</p>
        <div className="brands-grid">
            <span>SOW</span>
            <span className="separator">•</span>
            <span>BOFFEL</span>
            <span className="separator">•</span>
            <span>AMETHYSTE</span>
            <span className="separator">•</span>
            <span>TIGI</span>
        </div>
      </div>

      {/* --- MENÚ DE PRECIOS INTERACTIVO --- */}
      <section id="menu-precios" className="pricing-section">
        <div className="section-header">
            <h2>Nuestros Servicios</h2>
            <p>Selecciona una categoría para ver los valores</p>
        </div>

        {/* Selector de Categorías */}
        <div className="category-scroll">
            <div className="category-list">
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
        <div className="price-container fade-in" key={activeCategory}>
            <div className="price-grid">
                {servicesData[activeCategory].map((item, index) => (
                    <div key={index} className="price-item">
                        <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            {item.desc && <span className="item-desc">{item.desc}</span>}
                        </div>
                        <div className="item-price">
                            {item.price === "Consultar" ? "Consultar" : `$${item.price}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FOOTER / CTA FINAL --- */}
      <footer className="n-footer">
        <div className="footer-content">
            <h3>¿Lista para un cambio?</h3>
            <p>Reserva tu cita fácilmente a través de nuestro WhatsApp o Instagram.</p>
            <a href="https://wa.me/56912345678" className="btn-primary invert">Ir a WhatsApp</a>
            
            <div className="footer-links">
                <span>Santiago, Chile</span>
                <a href="https://www.instagram.com/naamastudio_/">@naamastudio_</a>
            </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a href="https://wa.me/56912345678" className="whatsapp-float" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
    </div>
  );
}

/* --- DATOS ORGANIZADOS (Tu base de datos limpia) --- */
const categories = [
    { id: 'manos', label: 'Manos & Pies' },
    { id: 'pelo', label: 'Peluquería' },
    { id: 'tratamientos', label: 'Tratamientos Capilares' },
    { id: 'depila_mujer', label: 'Depilación Mujer' },
    { id: 'depila_hombre', label: 'Depilación Hombre' },
    { id: 'mirada', label: 'Cejas & Pestañas' },
    { id: 'estetica', label: 'Estética & Masajes' },
];

const servicesData = {
    manos: [
        { name: "Esmaltado Permanente", price: "20.990" },
        { name: "Degradado o Francesa", price: "21.990", desc: "Permanente" },
        { name: "Capping de Rubber", price: "25.990" },
        { name: "Baño de PolyGel", price: "31.990" },
        { name: "Extensión Soft Gel", price: "35.990", desc: "Desde" },
        { name: "Retiro Esmalte Permanente", price: "3.990" },
        { name: "Retiro Acrílico/Poly/Soft", price: "12.990" },
        { name: "Diseño mano alzada", price: "1.490" },
        { name: "Pedicure Permanente", price: "24.990" },
        { name: "Pedicure Spa", price: "17.990" },
        { name: "Pedicure Tradicional", price: "14.990" },
    ],
    pelo: [
        { name: "Corte de Dama", price: "15.990" },
        { name: "Corte de Varón", price: "12.990" },
        { name: "Corte + Bordado", price: "25.990" },
        { name: "Brushing", price: "15.990" },
        { name: "Baño de Color", price: "35.990", desc: "Desde" },
        { name: "Color Global Tinte", price: "40.990", desc: "Desde" },
        { name: "Retoque Crecimiento", price: "25.990" },
        { name: "Babylights (Sin Crecimiento)", price: "75.990", desc: "Desde" },
        { name: "Balayage Tradicional", price: "70.990", desc: "Desde" },
        { name: "Botox Capilar", price: "35.990", desc: "Desde" },
        { name: "Alisado Profesional Corto", price: "50.990" },
        { name: "Alisado Profesional Largo", price: "70.990" },
    ],
    tratamientos: [
        { name: "Masaje Capilar TIGI", price: "22.990" },
        { name: "Masaje Capilar SOW", price: "35.990" },
        { name: "Masaje Sebastian Penetraitt", price: "31.990" },
        { name: "Masaje Green Zoho (Ondulado)", price: "27.990" },
        { name: "Lavado Nutritivo + Secado", price: "13.990" },
        { name: "Ampolla", price: "12.990" },
    ],
    depila_mujer: [
        { name: "Rostro Completo", price: "10.990" },
        { name: "Perfilado de Cejas", price: "5.990" },
        { name: "Bozo / Mentón / Patillas", price: "2.990", desc: "c/u" },
        { name: "Axilas", price: "4.990" },
        { name: "Brazos Completos", price: "13.990" },
        { name: "Piernas Completas", price: "15.990" },
        { name: "Rebaje Completo", price: "16.990" },
        { name: "Rebaje Bikini", price: "6.990" },
        { name: "Espalda (Alta o Baja)", price: "6.990", desc: "c/u" },
    ],
    depila_hombre: [
        { name: "Rostro", price: "18.990" },
        { name: "Rebaje", price: "23.990" },
        { name: "Pecho Completo", price: "10.990" },
        { name: "Piernas Completas", price: "18.990" },
        { name: "Axilas", price: "5.990" },
        { name: "Abdomen", price: "8.990" },
    ],
    mirada: [
        { name: "Lifting de Pestañas", price: "24.990" },
        { name: "Ondulación de Pestañas", price: "23.990" },
        { name: "Lifting de Cejas", price: "8.990" },
        { name: "Perfilado de Cejas", price: "5.990" },
    ],
    estetica: [
        { name: "Limpieza Facial Básica", price: "19.990" },
        { name: "Limpieza Facial Profunda", price: "35.990" },
        { name: "BB Glow", price: "35.990" },
        { name: "Hilos de Colágeno", price: "9.990" },
        { name: "Masaje Relajación", price: "25.990" },
        { name: "Masaje Descontracturante", price: "25.990" },
        { name: "Pack 6 Reductivos", price: "189.990" },
        { name: "Drenaje Linfático", price: "25.990" },
    ]
};

/* --- ESTILOS CSS (Estética Minimalista "Pinterest") --- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

:root {
    --n-bg: #FDFBF8; /* Crema muy suave */
    --n-text: #2C2C2C; /* Gris casi negro */
    --n-accent: #C4A484; /* Tono Nude/Tierra */
    --n-light: #F2EFE9;
}

.naama-page {
    background-color: var(--n-bg);
    color: var(--n-text);
    font-family: 'Montserrat', sans-serif;
    min-height: 100vh;
}

/* TYPOGRAPHY */
h1, h2, h3, .overhead, .cat-btn { font-family: 'Cormorant Garamond', serif; }
.italic { font-style: italic; font-weight: 400; }

/* NAVBAR */
.n-nav {
    padding: 20px 0;
    position: sticky;
    top: 0;
    background: rgba(253, 251, 248, 0.95);
    backdrop-filter: blur(5px);
    z-index: 100;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}
.nav-content {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.nav-logo { height: 40px; }
.nav-text-logo { font-family: 'Cormorant Garamond', serif; letter-spacing: 2px; font-weight: 600; font-size: 1.2rem; display: none; }
/* Si no hay logo imagen, mostramos texto */
.nav-logo[style*="display: none"] + .nav-text-logo { display: block; }

.social-btn {
    text-decoration: none;
    color: var(--n-text);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid var(--n-text);
}

/* HERO */
.n-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 85vh;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
    padding: 0 20px;
}
.hero-text { padding-right: 40px; }
.overhead { font-size: 0.9rem; letter-spacing: 2px; color: var(--n-accent); text-transform: uppercase; display: block; margin-bottom: 15px; }
.n-hero h1 { font-size: 4.5rem; line-height: 1; font-weight: 400; margin: 0 0 25px 0; }
.n-hero p { font-size: 1.1rem; color: #666; margin-bottom: 35px; max-width: 400px; font-weight: 300; }

.hero-buttons { display: flex; gap: 15px; }
.btn-primary {
    background: var(--n-text);
    color: white;
    padding: 15px 30px;
    text-decoration: none;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.3s;
    border: 1px solid var(--n-text);
}
.btn-primary:hover { background: transparent; color: var(--n-text); }
.btn-secondary {
    background: transparent;
    color: var(--n-text);
    padding: 15px 30px;
    border: 1px solid var(--n-text);
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
}
.btn-secondary:hover { background: var(--n-light); border-color: var(--n-light); }

.hero-img {
    height: 600px;
    background-image: url('https://images.unsplash.com/photo-1633681926022-84c23e8cb22a?q=80&w=2070&auto=format&fit=crop'); /* Imagen estética de uñas/belleza */
    background-size: cover;
    background-position: center;
    border-radius: 200px 200px 0 0;
}

/* MARCAS */
.brands-ticker { text-align: center; padding: 60px 20px; border-bottom: 1px solid #eee; }
.brands-ticker p { font-size: 0.7rem; letter-spacing: 2px; color: #999; margin-bottom: 20px; }
.brands-grid { display: flex; justify-content: center; gap: 20px; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: var(--n-accent); }
.separator { color: #ddd; }

/* PRECIOS */
.pricing-section { max-width: 900px; margin: 80px auto; padding: 0 20px; }
.section-header { text-align: center; margin-bottom: 40px; }
.section-header h2 { font-size: 3rem; margin: 0; font-weight: 400; }
.section-header p { color: #888; font-weight: 300; }

.category-scroll { overflow-x: auto; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: center; }
.category-list { display: flex; gap: 10px; }
.cat-btn {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    padding: 10px 20px;
    cursor: pointer;
    color: #999;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    white-space: nowrap;
}
.cat-btn.active { color: var(--n-text); border-color: var(--n-accent); }

.price-grid { display: grid; grid-template-columns: 1fr; gap: 0; border-top: 1px solid #eee; }
.price-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}
.item-info { display: flex; flex-direction: column; }
.item-name { font-size: 1.1rem; font-weight: 500; }
.item-desc { font-size: 0.8rem; color: #888; margin-top: 4px; }
.item-price { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; color: var(--n-text); }

/* FOOTER */
.n-footer { background: var(--n-text); color: white; padding: 80px 20px; text-align: center; margin-top: 80px; }
.footer-content h3 { font-size: 3rem; margin: 0 0 20px 0; font-weight: 400; color: white; }
.footer-content p { color: #aaa; margin-bottom: 40px; font-weight: 300; }
.btn-primary.invert { background: white; color: var(--n-text); border-color: white; }
.btn-primary.invert:hover { background: transparent; color: white; }
.footer-links { margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; display: flex; justify-content: center; gap: 30px; font-size: 0.8rem; letter-spacing: 1px; opacity: 0.6; }
.footer-links a { color: white; text-decoration: none; }

/* FLOATING WHATSAPP */
.whatsapp-float {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #25d366;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: transform 0.3s;
}
.whatsapp-float:hover { transform: scale(1.1); }

/* ANIMACIONES */
.fade-up { animation: fadeUp 1s ease forwards; opacity: 0; transform: translateY(20px); }
.fade-in { animation: fadeIn 1.5s ease forwards; opacity: 0; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }

/* RESPONSIVE */
@media(max-width: 768px) {
    .n-hero { grid-template-columns: 1fr; text-align: center; min-height: auto; padding-top: 40px; }
    .hero-text { padding-right: 0; margin-bottom: 40px; }
    .hero-buttons { justify-content: center; }
    .n-hero h1 { font-size: 3rem; }
    .hero-img { height: 400px; border-radius: 100px 100px 0 0; }
    .category-scroll { justify-content: flex-start; }
    .brands-grid { flex-wrap: wrap; }
}
`;