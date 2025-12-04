import React, { useState } from 'react';
// Asegúrate de que la ruta a tu logo sea correcta
import logoNaama from '../assets/img/Partners/naama-studio.png'; 

export default function NaamaStudio() {
  const [activeCategory, setActiveCategory] = useState('manos');

  return (
    <div className="naama-rebrand-page">
      <style>{css}</style>

      {/* --- NAVBAR FLOTANTE --- */}
      <nav className="nr-nav glass-effect">
        <div className="nav-content">
            <img src={logoNaama} alt="Naamá Studio" className="nav-logo" />
        </div>
      </nav>

      {/* --- HERO SECTION (Portada) --- */}
      <header className="nr-hero">
        <div className="hero-content fade-up">
            <span className="slogan-badge">BELLEZA, BIENESTAR & ARMONÍA</span>
            <h1>
                Donde la gracia antigua<br/>
                encuentra el <span className="text-accent">cuidado moderno.</span>
            </h1>
            <p className="hero-description">
                Un espacio sagrado dedicado a resaltar tu belleza natural a través de servicios de estética integral con productos de alta gama.
            </p>
            <div className="hero-actions">
                <a href="https://wa.me/56912345678" target="_blank" rel="noreferrer" className="btn-gold">
                    Agendar Cita
                </a>
            </div>
        </div>
        <div className="hero-image-container fade-in">
            {/* Imagen de stock cálida y elegante */}
            <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop" alt="Naamá Vibe" className="hero-img" />
        </div>
      </header>

      {/* --- SECCIÓN FILOSOFÍA (Significado) --- */}
      <section className="nr-philosophy">
        <div className="philosophy-text fade-up">
            <h2>La Esencia Naamá</h2>
            <p>
                De raíz bíblica, Naamá evoca dulzura, hermosura y gracia. 
                Nuestro estudio nace para honrar ese significado, creando un refugio 
                donde cada detalle está pensado para devolverte a un estado de 
                <strong>armonía y bienestar absoluto</strong>.
            </p>
            <div className="decorative-line"></div>
        </div>
        <div className="philosophy-grid">
             <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" alt="Textura" className="grid-img img-1" />
             <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop" alt="Detalle" className="grid-img img-2" />
        </div>
      </section>

       {/* --- MARCAS (Ticker elegante) --- */}
       <div className="nr-brands-ticker">
        <span>TRABAJAMOS CON EXCELENCIA:</span>
        <div className="brands-list">
            <span>SOW</span> · <span>BOFFEL</span> · <span>AMETHYSTE</span> · <span>TIGI</span>
        </div>
      </div>

      {/* --- MENÚ DE SERVICIOS (Rediseñado) --- */}
      <section id="servicios" className="nr-services">
        <div className="section-header">
            <span className="sub-title">NUESTRA CARTA</span>
            <h2>Rituales de Belleza</h2>
        </div>

        {/* Selector de Categorías (Pills más gorditas) */}
        <div className="category-pills-container">
            {categories.map(cat => (
                <button 
                    key={cat.id} 
                    className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                >
                    {cat.label}
                </button>
            ))}
        </div>

        {/* Lista de Precios (Estilo Menú Restaurante) */}
        <div className="price-menu-container fade-in" key={activeCategory}>
            {servicesData[activeCategory].map((item, index) => (
                <div key={index} className="menu-item">
                    <div className="menu-item-header">
                        <span className="item-name">{item.name}</span>
                        <span className="dotted-line"></span>
                        <span className="item-price">${item.price}</span>
                    </div>
                    {item.desc && <p className="item-desc">{item.desc}</p>}
                </div>
            ))}
        </div>
      </section>

        {/* --- IMAGEN DE QUIEBRE (Visual Break) --- */}
      <section className="nr-visual-break parallax">
        <div className="break-content">
            <h2>"La belleza exterior es el reflejo de la armonía interior."</h2>
        </div>
      </section>

      {/* --- FOOTER CÁLIDO --- */}
      <footer className="nr-footer">
        <div className="footer-content">
            <img src={logoNaama} alt="Naamá Logo" className="footer-logo" />
            <h3>Vive la experiencia.</h3>
            <p>Reserva tu momento de conexión y cuidado personal.</p>
            
            <div className="footer-actions">
                <a href="https://wa.me/56912345678" className="btn-gold outline">WhatsApp</a>
                <a href="https://www.instagram.com/naamastudio_/" className="btn-gold outline">Instagram</a>
            </div>

            <div className="footer-info">
                <span>Santiago, Chile</span>
                <span>© 2026 Naamá Studio</span>
            </div>
        </div>
      </footer>

      {/* Botón WhatsApp Flotante (Dorado) */}
      <a href="https://wa.me/56912345678" className="whatsapp-float-gold" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
    </div>
  );
}

/* --- DATOS (Tus precios organizados) --- */
const categories = [
    { id: 'manos', label: 'Manos & Pies' },
    { id: 'pelo', label: 'Peluquería & Color' },
    { id: 'tratamientos', label: 'Tratamientos Capilares' },
    { id: 'mirada', label: 'Cejas & Pestañas' },
    { id: 'depila_mujer', label: 'Depilación Dama' },
    { id: 'depila_hombre', label: 'Depilación Varón' },
    { id: 'estetica', label: 'Estética & Masajes' },
];

const servicesData = {
    manos: [
        { name: "Esmaltado Permanente", price: "20.990" },
        { name: "Degradado o Francesa", price: "21.990" },
        { name: "Capping de Rubber", price: "25.990" },
        { name: "Baño de PolyGel", price: "31.990" },
        { name: "Extensión Soft Gel", price: "35.990", desc: "Desde" },
        { name: "Retiro Esmalte Permanente", price: "3.990" },
        { name: "Retiro Acrílico/Poly/Soft", price: "12.990" },
        { name: "Diseño mano alzada", price: "1.490", desc: "Por uña" },
        { name: "Pedicure Permanente", price: "24.990" },
        { name: "Pedicure Spa", price: "17.990" },
        { name: "Pedicure Tradicional", price: "14.990" },
    ],
    pelo: [
        { name: "Corte de Dama", price: "15.990" },
        { name: "Corte + Bordado", price: "25.990" },
        { name: "Brushing", price: "15.990", desc: "Adicional a servicios $5.990" },
        { name: "Baño de Color", price: "35.990", desc: "Desde" },
        { name: "Color Global Tinte", price: "40.990", desc: "Desde" },
        { name: "Retoque Crecimiento", price: "25.990" },
        { name: "Babylights (Sin Crec.)", price: "75.990", desc: "Desde" },
        { name: "Balayage Tradicional", price: "70.990", desc: "Desde" },
        { name: "Botox Capilar", price: "35.990", desc: "Desde" },
        { name: "Alisado Profesional", price: "50.990", desc: "Desde (según largo)" },
        { name: "Corte de Varón", price: "12.990" },
    ],
    tratamientos: [
        { name: "Masaje Capilar TIGI", price: "22.990" },
        { name: "Masaje Capilar SOW", price: "35.990" },
        { name: "Masaje Sebastian Penetraitt", price: "31.990" },
        { name: "Masaje Green Zoho", price: "27.990", desc: "Para cabello ondulado" },
        { name: "Lavado Nutritivo + Secado", price: "13.990" },
        { name: "Ampolla", price: "12.990" },
    ],
    depila_mujer: [
        { name: "Rostro Completo", price: "10.990" },
        { name: "Perfilado de Cejas", price: "5.990" },
        { name: "Bozo / Mentón / Patillas", price: "2.990", desc: "Precio por zona" },
        { name: "Axilas", price: "4.990" },
        { name: "Brazos Completos", price: "13.990" },
        { name: "Piernas Completas", price: "15.990" },
        { name: "Rebaje Completo", price: "16.990" },
        { name: "Rebaje Bikini", price: "6.990" },
        { name: "Espalda (Alta o Baja)", price: "6.990", desc: "Precio por zona" },
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

/* --- NUEVOS ESTILOS CSS (Rebranding: Cálido, Grueso y Lujoso) --- */
const css = `
/* Importamos fuentes con más peso y carácter */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Manrope:wght@400;500;700&display=swap');

:root {
    /* Nueva Paleta Cálida */
    --nr-bg: #F9F6F0; /* Crema cálido */
    --nr-text: #3A3228; /* Marrón oscuro intenso (no negro) */
    --nr-accent: #B88A68; /* Terracota/Arcilla */
    --nr-gold: #D4AF37; /* Dorado envejecido para botones */
    --nr-light-gold: #F1E5D1;
}

.naama-rebrand-page {
    background-color: var(--nr-bg);
    color: var(--nr-text);
    font-family: 'Manrope', sans-serif; /* Fuente de texto más gordita */
    min-height: 100vh;
    overflow-x: hidden;
}

/* TIPOGRAFÍA CON CARÁCTER */
h1, h2, h3, .slogan-badge, .sub-title, .item-price, .cat-pill {
    font-family: 'Fraunces', serif; /* Fuente con serifa gruesa */
    font-weight: 700; /* Peso bold */
}

/* NAVBAR GLASS */
.nr-nav {
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: 0.3s;
}
.glass-effect {
    background: rgba(249, 246, 240, 0.85); /* Fondo crema semitransparente */
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(184, 138, 104, 0.2);
}
.nav-content {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 0 20px;
}
.nav-logo { height: 60px; /* Logo más grande */ filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }

/* HERO SECTION */
.nr-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 90vh;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
    padding: 40px 20px;
    gap: 40px;
}
.slogan-badge {
    display: inline-block;
    background: var(--nr-light-gold);
    color: var(--nr-text);
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 0.9rem;
    letter-spacing: 1px;
    margin-bottom: 25px;
}
.nr-hero h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 25px;
    color: var(--nr-text);
}
.text-accent { color: var(--nr-accent); font-style: italic; }
.hero-description {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #6B5D52; /* Marrón medio */
    margin-bottom: 40px;
    max-width: 450px;
    font-weight: 500;
}
.hero-image-container {
    position: relative;
    height: 650px;
}
.hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 150px 150px 20px 20px; /* Arco más pronunciado */
    box-shadow: 10px 10px 30px rgba(184, 138, 104, 0.2);
}

/* BOTONES DORADOS (Más gorditos) */
.btn-gold {
    background: var(--nr-gold);
    color: white;
    padding: 18px 40px;
    text-decoration: none;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 50px;
    display: inline-block;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    border: 2px solid var(--nr-gold);
}
.btn-gold:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4); }
.btn-gold.outline { background: transparent; color: var(--nr-gold); box-shadow: none; }
.btn-gold.outline:hover { background: var(--nr-gold); color: white; }

/* FILOSOFÍA */
.nr-philosophy {
    max-width: 1000px;
    margin: 100px auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}
.philosophy-text h2 { font-size: 2.5rem; margin-bottom: 30px; }
.philosophy-text p { font-size: 1.1rem; line-height: 1.7; color: #6B5D52; font-weight: 500; }
.philosophy-text strong { color: var(--nr-accent); font-weight: 700; }
.decorative-line { width: 80px; height: 4px; background: var(--nr-accent); margin-top: 30px; }
.philosophy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.grid-img { width: 100%; height: 300px; object-fit: cover; border-radius: 12px; }
.img-1 { transform: translateY(20px); } /* Efecto escalonado */

/* MARCAS TICKER */
.nr-brands-ticker {
    background: var(--nr-light-gold);
    padding: 30px 20px;
    text-align: center;
    margin-bottom: 80px;
}
.nr-brands-ticker span:first-child { display: block; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px; font-weight: 700; color: var(--nr-accent); }
.brands-list { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 700; color: var(--nr-text); }

/* SERVICIOS */
.nr-services { max-width: 900px; margin: 0 auto 100px; padding: 0 20px; }
.section-header { text-align: center; margin-bottom: 50px; }
.sub-title { color: var(--nr-accent); letter-spacing: 2px; font-size: 0.9rem; }
.section-header h2 { font-size: 3rem; margin-top: 10px; }

/* Pills de Categoría (Más gorditas y modernas) */
.category-pills-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 50px;
}
.cat-pill {
    background: white;
    border: 2px solid #EEE;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 1rem;
    color: #999;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 600;
}
.cat-pill.active { background: var(--nr-accent); border-color: var(--nr-accent); color: white; box-shadow: 0 4px 10px rgba(184, 138, 104, 0.3); }

/* Lista de Precios Estilo Menú */
.menu-item { margin-bottom: 25px; }
.menu-item-header { display: flex; justify-content: space-between; align-items: baseline; }
.item-name { font-size: 1.2rem; font-weight: 700; }
.dotted-line { flex: 1; border-bottom: 2px dotted #CCC; margin: 0 15px; position: relative; top: -5px; }
.item-price { font-size: 1.3rem; color: var(--nr-accent); }
.item-desc { font-size: 0.9rem; color: #888; margin-top: 5px; font-weight: 500; }

/* VISUAL BREAK (Parallax) */
.nr-visual-break {
    height: 400px;
    background-image: url('https://images.unsplash.com/photo-1596121457970-f982fb26421d?q=80&w=2070&auto=format&fit=crop'); /* Imagen textura cálida */
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Efecto Parallax */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
}
.nr-visual-break::before { content: ''; position: absolute; inset: 0; background: rgba(58, 50, 40, 0.4); } /* Overlay oscuro cálido */
.break-content h2 { position: relative; color: white; font-size: 2.5rem; max-width: 700px; padding: 20px; font-style: italic; }

/* FOOTER */
.nr-footer {
    background: #2A241D; /* Marrón muy oscuro */
    color: var(--nr-bg);
    padding: 100px 20px 50px;
    text-align: center;
}
.footer-logo { height: 80px; margin-bottom: 30px; filter: brightness(0) invert(1); /* Logo blanco */ }
.nr-footer h3 { font-size: 2.5rem; margin-bottom: 15px; color: var(--nr-gold); }
.nr-footer p { font-size: 1.1rem; margin-bottom: 40px; opacity: 0.8; }
.footer-actions { display: flex; justify-content: center; gap: 20px; margin-bottom: 60px; }
.footer-info { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; display: flex; justify-content: center; gap: 40px; font-size: 0.9rem; opacity: 0.5; }

/* WHATSAPP FLOTANTE DORADO */
.whatsapp-float-gold {
    position: fixed; bottom: 30px; right: 30px;
    background: var(--nr-gold); color: white;
    width: 65px; height: 65px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    z-index: 1000; transition: 0.3s;
    border: 2px solid white;
}
.whatsapp-float-gold:hover { transform: scale(1.1); }

/* ANIMACIONES */
.fade-up { animation: fadeUp 1s ease forwards; opacity: 0; transform: translateY(30px); }
.fade-in { animation: fadeIn 1.5s ease forwards; opacity: 0; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }

/* RESPONSIVE */
@media(max-width: 900px) {
    .nr-hero { grid-template-columns: 1fr; text-align: center; min-height: auto; padding-top: 60px; }
    .hero-image-container { height: 450px; order: -1; margin-bottom: 30px; }
    .hero-img { border-radius: 100px 100px 20px 20px; }
    .nr-hero h1 { font-size: 3rem; }
    .nr-philosophy { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .decorative-line { margin: 30px auto 0; }
    .img-1 { transform: none; }
    .break-content h2 { font-size: 1.8rem; }
}
`;