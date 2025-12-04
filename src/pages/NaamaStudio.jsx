import React, { useState } from 'react';
import logoNaama from '../assets/img/Partners/naama-studio.png'; 

export default function NaamaStudio() {
  const [activeCategory, setActiveCategory] = useState('manos');

  return (
    <div className="naama-salon-page">
      <style>{css}</style>

      {/* --- NAVBAR --- */}
      <nav className="ns-nav">
        <div className="nav-container">
            {/* LOGO */}
            <div className="logo-wrapper">
                <img src={logoNaama} alt="Naamá Studio" className="main-logo" />
            </div>
            
            {/* ENLACES (Se ocultan en móvil para limpieza) */}
            <div className="nav-links desktop-only">
                <a href="#servicios">Servicios</a>
                <a href="#marcas">Marcas</a>
                <a href="https://wa.me/56912345678" className="btn-nav">Reservar</a>
            </div>

            {/* BOTÓN SOLO MÓVIL */}
            <a href="https://wa.me/56912345678" className="btn-nav mobile-only">Reservar</a>
        </div>
      </nav>

      {/* --- HERO --- */}
      <header className="ns-hero">
        <div className="hero-grid">
            {/* TEXTO */}
            <div className="hero-text fade-up">
                <span className="badge-salon">SALÓN DE BELLEZA & BIENESTAR</span>
                <h1>
                    Expertos en resaltar<br />
                    <span className="highlight">tu belleza natural.</span>
                </h1>
                <p>
                    Especialistas en colorimetría, manicure y tratamientos capilares. 
                    Usamos solo las mejores marcas porque te lo mereces.
                </p>
                <div className="cta-group">
                    <a href="https://wa.me/56912345678" className="btn-solid">Agendar</a>
                    <a href="https://www.instagram.com/naamastudio_/" className="btn-outline">Instagram</a>
                </div>
            </div>
            
            {/* IMAGEN */}
            <div className="hero-visual fade-in">
                <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" 
                    alt="Salón" 
                    className="hero-img-main"
                />
            </div>
        </div>
      </header>

      {/* --- MARCAS --- */}
      <section id="marcas" className="ns-brands">
        <p className="brands-title">PRODUCTOS PROFESIONALES</p>
        <div className="brands-row">
            <span>SOW</span>
            <span>TIGI</span>
            <span>BOFFEL</span>
            <span>AMETHYSTE</span>
        </div>
      </section>

      {/* --- CARTA DE SERVICIOS --- */}
      <section id="servicios" className="ns-menu">
        <div className="menu-header">
            <h2>Carta de Servicios</h2>
            <p>Selecciona una categoría para ver precios</p>
        </div>

        {/* Categorías (Scroll Horizontal en Móvil) */}
        <div className="cat-selector-wrapper">
            <div className="cat-selector">
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Lista de Precios */}
        <div className="service-list-container fade-in" key={activeCategory}>
            {servicesData[activeCategory].map((item, index) => (
                <div key={index} className="service-row-elegant">
                    <div className="service-info-elegant">
                        <span className="s-name-elegant">{item.name}</span>
                        {item.desc && <span className="s-desc-elegant">{item.desc}</span>}
                    </div>
                    <div className="service-price-elegant">
                        ${item.price}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- BANNER --- */}
      <section className="ns-banner">
        <div className="banner-content">
            <h2>"Belleza, Bienestar & Armonía"</h2>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contacto" className="ns-footer">
        <div className="footer-grid">
            <div className="f-col logo-col">
                <img src={logoNaama} alt="Naamá Logo" className="footer-logo" />
            </div>
            <div className="f-col">
                <h4>Contacto</h4>
                <a href="https://wa.me/56912345678" className="link-contact">WhatsApp: +56 9 1234 5678</a>
                <a href="https://www.instagram.com/naamastudio_/" className="link-contact">Instagram: @naamastudio_</a>
            </div>
            <div className="f-col">
                <h4>Horario</h4>
                <p className="schedule">Lun a Sáb: 10:00 - 19:00 hrs</p>
            </div>
        </div>
        <div className="copyright">© 2026 Naamá Studio</div>
      </footer>

      {/* WhatsApp Flotante */}
      <a href="https://wa.me/56912345678" className="wsp-float" target="_blank" rel="noreferrer">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
    </div>
  );
}

const categories = [
    { id: 'manos', label: 'Manicure' },
    { id: 'pelo', label: 'Peluquería' },
    { id: 'tratamientos', label: 'Tratamientos' },
    { id: 'mirada', label: 'Pestañas' },
    { id: 'depilacion', label: 'Depilación' },
    { id: 'estetica', label: 'Estética' },
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
        { name: "Babylights", price: "75.990", desc: "Desde" },
        { name: "Balayage", price: "70.990", desc: "Desde" },
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

/* --- CSS 100% RESPONSIVE --- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@600;800&display=swap');

:root {
    --ns-bg: #FDFBF7;
    --ns-dark: #231F20;
    --ns-gold: #C6A87C;
}

.naama-salon-page {
    background-color: var(--ns-bg);
    color: var(--ns-dark);
    font-family: 'Lato', sans-serif;
    overflow-x: hidden; /* Evita scroll horizontal en móvil */
    width: 100%;
}

h1, h2, h3, h4, .s-name-elegant, .service-price-elegant {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
}

/* NAVBAR */
.ns-nav { background: var(--ns-bg); padding: 10px 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
.logo-wrapper { display: flex; align-items: center; }
.main-logo { height: 45px; object-fit: contain; }

/* Enlaces Desktop */
.nav-links { display: flex; gap: 30px; align-items: center; }
.nav-links a { text-decoration: none; color: var(--ns-dark); font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; transition: 0.3s; }
.btn-nav { background: var(--ns-dark); color: white !important; padding: 8px 16px; border-radius: 4px; font-size: 0.8rem; }
.mobile-only { display: none; }

/* HERO */
.ns-hero { max-width: 1200px; margin: 30px auto 60px; padding: 0 20px; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.badge-salon { display: inline-block; background: #EAE6DF; padding: 5px 10px; font-size: 0.7rem; font-weight: 700; letter-spacing: 1px; margin-bottom: 15px; }
.ns-hero h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 20px; color: var(--ns-dark); }
.highlight { color: var(--ns-gold); font-style: italic; }
.ns-hero p { font-size: 1.05rem; line-height: 1.6; color: #555; margin-bottom: 30px; max-width: 450px; }
.cta-group { display: flex; gap: 10px; flex-wrap: wrap; }
.btn-solid, .btn-outline { padding: 12px 25px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border: 2px solid var(--ns-dark); transition: 0.3s; font-size: 0.9rem; display: inline-block; text-align: center; }
.btn-solid { background: var(--ns-dark); color: white; }
.btn-outline { background: transparent; color: var(--ns-dark); border-color: #DDD; }
.hero-img-main { width: 100%; height: 500px; object-fit: cover; border-radius: 12px; box-shadow: 10px 10px 30px rgba(0,0,0,0.1); }

/* MARCAS */
.ns-brands { background: white; padding: 40px 20px; text-align: center; border-top: 1px solid #EEE; border-bottom: 1px solid #EEE; }
.brands-title { font-size: 0.75rem; letter-spacing: 2px; color: #999; margin-bottom: 20px; font-weight: 700; }
.brands-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.brands-row span { font-size: 1.5rem; color: #DDD; font-family: 'Playfair Display', serif; font-weight: 700; }

/* SERVICIOS */
.ns-menu { max-width: 900px; margin: 60px auto; padding: 0 20px; }
.menu-header { text-align: center; margin-bottom: 40px; }
.menu-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
.menu-header p { color: #777; font-size: 0.95rem; }

/* Selector con Scroll Horizontal */
.cat-selector-wrapper { overflow-x: auto; padding-bottom: 15px; margin-bottom: 30px; -webkit-overflow-scrolling: touch; /* Suavidad en iOS */ }
/* Ocultar barra de scroll pero permitir scroll */
.cat-selector-wrapper::-webkit-scrollbar { height: 4px; } 
.cat-selector-wrapper::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }

.cat-selector { display: flex; justify-content: center; gap: 15px; min-width: max-content; padding: 0 5px; }
.cat-tab { background: transparent; border: none; padding: 10px 10px; font-family: 'Lato', sans-serif; font-weight: 700; font-size: 0.95rem; color: #AAA; cursor: pointer; position: relative; white-space: nowrap; }
.cat-tab.active { color: var(--ns-dark); }
.cat-tab.active::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: var(--ns-gold); }

/* Lista Precios */
.service-list-container { max-width: 800px; margin: 0 auto; }
.service-row-elegant { display: flex; justify-content: space-between; align-items: baseline; padding: 20px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
.service-info-elegant { padding-right: 15px; }
.s-name-elegant { font-size: 1.15rem; color: var(--ns-dark); display: block; line-height: 1.2; }
.s-desc-elegant { font-size: 0.85rem; color: #888; font-style: italic; margin-top: 4px; display: block; }
.service-price-elegant { font-size: 1.25rem; color: var(--ns-gold); white-space: nowrap; }

/* BANNER */
.ns-banner { background-image: url('https://images.unsplash.com/photo-1620331313123-dd4639722b43?q=80&w=2070&auto=format&fit=crop'); height: 300px; background-size: cover; background-position: center; background-attachment: fixed; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; color: white; padding: 20px; }
.ns-banner::before { content:''; position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
.banner-content { position: relative; z-index: 2; }
.banner-content h2 { font-size: 2rem; font-style: italic; }

/* FOOTER */
.ns-footer { background: var(--ns-dark); color: white; padding: 60px 20px 30px; }
.footer-grid { max-width: 1000px; margin: 0 auto 40px; display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 30px; text-align: left; }
.footer-logo { height: 50px; filter: invert(1); opacity: 0.9; }
.f-col h4 { font-size: 1.1rem; margin-bottom: 15px; color: var(--ns-gold); }
.link-contact { color: #BBB; font-size: 0.9rem; text-decoration: none; display: block; margin-bottom: 8px; }
.copyright { text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 0.75rem; color: #666; }
.wsp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 999; }

/* ANIMACIONES */
.fade-up { animation: fadeInUp 0.8s ease forwards; opacity: 0; transform: translateY(20px); }
.fade-in { animation: fadeIn 1.2s ease forwards; opacity: 0; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }

/* =========================================
   MEDIA QUERIES (RESPONSIVE TOTAL)
   ========================================= */
@media(max-width: 900px) {
    /* Navbar Móvil */
    .desktop-only { display: none; }
    .mobile-only { display: block; font-size: 0.8rem; padding: 8px 15px; }
    .main-logo { height: 40px; }

    /* Hero Móvil */
    .ns-hero { margin-top: 20px; margin-bottom: 40px; }
    .hero-grid { grid-template-columns: 1fr; gap: 30px; }
    .hero-visual { order: -1; /* Imagen arriba en móvil */ }
    .hero-img-main { height: 350px; }
    .hero-text { text-align: center; }
    .ns-hero h1 { font-size: 2.5rem; }
    .cta-group { justify-content: center; width: 100%; }
    .btn-solid, .btn-outline { flex: 1; } /* Botones ancho completo */
    
    /* Servicios Móvil */
    .menu-header h2 { font-size: 2rem; }
    .cat-selector { justify-content: flex-start; } /* Alineado izq para scroll natural */
    
    /* Footer Móvil */
    .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .logo-col { display: flex; justify-content: center; }

    /* Fix iOS Parallax */
    .ns-banner { background-attachment: scroll; } 
}
`;