import React, { useState, useEffect } from 'react';
import { Search, Clock, User, Star, ArrowRight, ShieldCheck, Zap, Info, MapPin, Phone, Instagram } from 'lucide-react';
import logoNaama from '../assets/img/Partners/naama-studio.png'; 

export default function NaamaStudioEvolution() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FILTRO DE BÚSQUEDA ---
  const filteredServices = Object.keys(servicesData).flatMap(cat => 
    servicesData[cat].map(s => ({ ...s, category: cat }))
  ).filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.worker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="naama-evolution">
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className={`nav-evolution ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <img src={logoNaama} alt="Naamá Studio" className="logo" />
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar servicio o profesional (ej: Vivy, Balayage...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* HERO EXPLICATIVO */}
      <header className="hero-mini">
        <div className="container">
          <span className="tag">NUEVA ETAPA 2024</span>
          <h1>Transparencia & Excelencia</h1>
          <p>
            Hemos actualizado nuestra carta de servicios enfocándonos en la <strong>especialización de nuestro equipo</strong> 
            y el uso de insumos de alta gama. Cada valor refleja el tiempo real de dedicación y la técnica aplicada.
          </p>
        </div>
      </header>

      {/* RAZONES DEL CAMBIO */}
      <section className="reasons-strip">
        <div className="container reasons-grid">
            <div className="reason-item">
                <Clock className="icon-gold" />
                <div>
                    <h5>Tiempos Reales</h5>
                    <p>Respetamos la pausa y el detalle que cada proceso requiere.</p>
                </div>
            </div>
            <div className="reason-item">
                <ShieldCheck className="icon-gold" />
                <div>
                    <h5>Insumos Premium</h5>
                    <p>SOW, Kérastase y productos que cuidan tu salud capilar.</p>
                </div>
            </div>
            <div className="reason-item">
                <Zap className="icon-gold" />
                <div>
                    <h5>Especialistas</h5>
                    <p>Formación continua de Cami, Vivy, Gaby, Valeria y Allison.</p>
                </div>
            </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <div className="category-nav">
        <div className="container category-scroll">
            {['Todas', ...Object.keys(servicesData)].map(cat => (
                <button 
                    key={cat} 
                    className={activeCategory === cat ? 'active' : ''} 
                    onClick={() => setActiveCategory(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* LISTADO DE SERVICIOS */}
      <main className="container service-main">
        <div className="service-list">
            {filteredServices.length > 0 ? (
                filteredServices.map((s, i) => (
                    <div key={i} className="service-row">
                        <div className="s-info-col">
                            <span className="s-cat-label">{s.category}</span>
                            <h3>{s.name}</h3>
                            <div className="s-meta-row">
                                <span className="s-meta-item"><User size={14}/> {s.worker}</span>
                                <span className="s-meta-item"><Clock size={14}/> {s.time}</span>
                            </div>
                        </div>
                        <div className="s-price-col">
                            {s.oldPrice && <span className="old-price">Antes: {s.oldPrice}</span>}
                            <span className="new-price">{s.price}</span>
                            <a href="https://wa.me/56979520623" className="row-book">Agendar</a>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-results">No se encontraron servicios con ese nombre.</div>
            )}
        </div>
      </main>

      {/* FOOTER SIMPLE */}
      <footer className="footer-simple">
          <div className="container">
              <p>Naamá Studio - Arcadia 1297, San Miguel</p>
          </div>
      </footer>
    </div>
  );
}

// --- TODA LA DATA INTEGRADA (SIN OMISIONES) ---
const servicesData = {
    "Peluquería & Color": [
        { name: "Corte de Dama", oldPrice: "$15.990", price: "$16.000", worker: "Cami, Valeria, Vivy", time: "45 min" },
        { name: "Corte de Varón", oldPrice: "$12.990", price: "$13.000", worker: "Vivy, Cami", time: "45 min" },
        { name: "Corte + Bordado", oldPrice: "$25.990", price: "$28.000", worker: "Cami, Valeria", time: "1.5 hr" },
        { name: "Crecimiento (Raíz)", oldPrice: "$25.990", price: "$30.000", worker: "Cami, Valeria", time: "40 min" },
        { name: "Color Global Tinte Corto", oldPrice: "$40.990", price: "$45.000", worker: "Cami, Valeria", time: "1.5 hr" },
        { name: "Color Global Tinte Medio", oldPrice: "$45.990", price: "$55.000", worker: "Cami, Valeria", time: "2 hr" },
        { name: "Color Global Tinte Largo", oldPrice: "$50.990", price: "$65.000", worker: "Cami, Valeria", time: "2.5 hr" },
        { name: "Color Global Tinte Extra Largo", oldPrice: "$55.990", price: "$72.000", worker: "Cami, Valeria", time: "3 hr" },
        { name: "Balayage Tradicional Corto", oldPrice: "$70.990", price: "$85.000", worker: "Cami, Valeria", time: "4 hr" },
        { name: "Balayage Tradicional Extra Largo", oldPrice: "$85.990", price: "$100.000", worker: "Cami, Valeria", time: "6 hr" },
        { name: "Babylights Corto", oldPrice: "$75.990", price: "$85.000", worker: "Cami, Valeria", time: "4 hr" },
        { name: "Mecha Papel Extra Largo", oldPrice: "$85.990", price: "$120.000", worker: "Cami, Valeria", time: "6.5 hr" },
        { name: "Alisado Profesional Corto", oldPrice: "$50.990", price: "$55.990", worker: "Cami, Valeria", time: "2 hr" },
        { name: "Alisado Profesional Extra Largo", oldPrice: "$78.990", price: "$85.000", worker: "Cami, Valeria", time: "3.5 hr" },
        { name: "Omniplex Adicional", price: "$10.000", worker: "Equipo", time: "Adicional" },
        { name: "Camuflaje de Canas Varón", price: "$18.000", worker: "Vivy, Cami, Valeria", time: "20 min" },
        { name: "Cauterización de Puntas", price: "$15.000", worker: "Valeria, Cami", time: "30 min" }
    ],
    "Manicure & Pedicure": [
        { name: "Esmaltado Permanente", oldPrice: "$20.990", price: "$19.990", worker: "Gaby", time: "1 hr" },
        { name: "Esmaltado (Degradado/Francesa)", oldPrice: "$21.990", price: "$25.990", worker: "Gaby", time: "1.1 hr" },
        { name: "Baño de PolyGel", oldPrice: "$31.990", price: "$34.990", worker: "Gaby", time: "1 hr" },
        { name: "Capping de Rubber", oldPrice: "$25.990", price: "$28.990", worker: "Gaby", time: "1 hr" },
        { name: "Extensión Soft Gel", oldPrice: "$35.990", price: "$42.990", worker: "Gaby", time: "2 hr" },
        { name: "Esculpidas Polygel", oldPrice: "$36.990", price: "$39.990", worker: "Gaby", time: "2.5 hr" },
        { name: "Pedicure Permanente", oldPrice: "$24.990", price: "$27.990", worker: "Gaby", time: "50 min" },
        { name: "Pedicure Spa", oldPrice: "$25.990", price: "$35.000", worker: "Gaby", time: "1.1 hr" },
        { name: "Pedicure Tradicional", oldPrice: "$14.990", price: "$18.000", worker: "Gaby", time: "30 min" },
        { name: "Baño Parafina Caliente", price: "$8.000", worker: "Gaby", time: "15 min" },
        { name: "Manicura Express Varón", price: "$12.000", worker: "Gaby", time: "30 min" }
    ],
    "Estética & Masajes": [
        { name: "Limpieza Facial Profunda", oldPrice: "$35.990", price: "$36.000", worker: "Vivy", time: "1 hr" },
        { name: "Limpieza Facial Básica", oldPrice: "$19.990", price: "$20.000", worker: "Vivy", time: "35 min" },
        { name: "BB Glow", oldPrice: "$35.990", price: "$39.000", worker: "Vivy", time: "1 hr" },
        { name: "BB Lips", oldPrice: "$19.990", price: "$28.000", worker: "Vivy", time: "45 min" },
        { name: "Masaje Descontracturante", oldPrice: "$25.990", price: "$26.000", worker: "Vivy", time: "55 min" },
        { name: "Masaje Reductivo (1 ses.)", oldPrice: "$39.990", price: "$45.000", worker: "Vivy", time: "1.2 hr" },
        { name: "Pack 6 Masajes Reductivos", oldPrice: "$189.990", price: "$195.000", worker: "Vivy", time: "1.2 hr c/u" },
        { name: "Masaje Bruxismo", price: "$12.000", worker: "Vivy", time: "20 min" },
        { name: "Limpieza de Espalda", price: "$25.990", worker: "Vivy", time: "45 min" }
    ],
    "Depilación": [
        { name: "Depilación Piernas Completas", oldPrice: "$15.990", price: "$19.000", worker: "Gaby", time: "25 min" },
        { name: "Rebaje Completo", oldPrice: "$16.990", price: "$20.000", worker: "Gaby", time: "25 min" },
        { name: "Rostro Completo", oldPrice: "$10.990", price: "$14.000", worker: "Gaby", time: "15 min" },
        { name: "Tira Interglútea", oldPrice: "$1.990", price: "$5.000", worker: "Gaby", time: "15 min" },
        { name: "Perfilado de Cejas", oldPrice: "$6.990", price: "$9.000", worker: "Gaby", time: "10 min" }
    ],
    "Tratamientos": [
        { name: "Tratamiento SOW", oldPrice: "$35.990", price: "$36.000", worker: "Equipo", time: "45 min" },
        { name: "Tratamiento Sebastian", price: "$27.990", worker: "Equipo", time: "40 min" },
        { name: "Detox Cuero Cabelludo", price: "$15.000", worker: "Equipo", time: "30 min" },
        { name: "Detox + Alta Frecuencia", price: "$22.000", worker: "Equipo", time: "45 min" }
    ],
    "Podología": [
        { name: "Podología Clínica Avanzada", oldPrice: "$25.990", price: "$25.000", worker: "Michelle", time: "1.2 hr" },
        { name: "Podología Clínica Básica", oldPrice: "$19.990", price: "$20.000", worker: "Michelle", time: "40 min" }
    ],
    "Adicionales": [
        { name: "Maquillaje Profesional", oldPrice: "$25.990", price: "$30.000", worker: "Allison", time: "2 hr" },
        { name: "Peinado Avanzado", oldPrice: "$25.990", price: "$32.000", worker: "Equipo", time: "2 hr" },
        { name: "Brushing Largo", oldPrice: "$8.990", price: "$13.000", worker: "Equipo", time: "25 min" }
    ]
};

// --- ESTILOS ENFOCADOS EN CLARIDAD Y BUSQUEDA ---
const styles = `
:root {
    --gold: #B08D55;
    --dark: #1a1a1a;
    --light: #f8f5f2;
    --white: #ffffff;
    --gray: #666;
    --border: #e0d9d0;
}

body { margin: 0; background: var(--light); font-family: 'Montserrat', sans-serif; color: var(--dark); }

.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

/* NAVBAR */
.nav-evolution {
    position: sticky; top: 0; background: var(--white); padding: 15px 0;
    border-bottom: 1px solid var(--border); z-index: 100; transition: 0.3s;
}
.nav-evolution.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.nav-content { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.logo { height: 40px; }

.search-bar {
    flex: 1; display: flex; align-items: center; background: #f0f0f0;
    padding: 8px 15px; border-radius: 25px; gap: 10px;
}
.search-bar input {
    border: none; background: transparent; width: 100%; outline: none; font-size: 0.9rem;
}

/* HERO */
.hero-mini { background: var(--white); padding: 60px 0; text-align: center; border-bottom: 1px solid var(--border); }
.tag { color: var(--gold); font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; }
.hero-mini h1 { font-family: 'Cinzel', serif; font-size: 2.5rem; margin: 10px 0; }
.hero-mini p { max-width: 600px; margin: 0 auto; color: var(--gray); line-height: 1.6; }

/* REASONS */
.reasons-strip { background: var(--white); padding: 30px 0; }
.reasons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.reason-item { display: flex; gap: 15px; align-items: center; }
.reason-item h5 { margin: 0; font-size: 0.9rem; }
.reason-item p { margin: 5px 0 0; font-size: 0.75rem; color: var(--gray); }
.icon-gold { color: var(--gold); flex-shrink: 0; }

/* CATEGORY NAV */
.category-nav { background: var(--white); position: sticky; top: 72px; z-index: 90; border-bottom: 1px solid var(--border); }
.category-scroll { display: flex; gap: 10px; overflow-x: auto; padding: 15px 0; }
.category-scroll button {
    white-space: nowrap; padding: 8px 18px; border-radius: 20px; border: 1px solid var(--border);
    background: transparent; cursor: pointer; transition: 0.3s; font-size: 0.85rem;
}
.category-scroll button.active { background: var(--gold); color: white; border-color: var(--gold); }

/* SERVICE LIST */
.service-main { padding: 40px 20px; }
.service-row {
    background: var(--white); margin-bottom: 15px; padding: 25px;
    border-radius: 8px; border: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    transition: 0.3s;
}
.service-row:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-color: var(--gold); }

.s-cat-label { font-size: 0.65rem; color: var(--gold); font-weight: 700; text-transform: uppercase; }
.service-row h3 { margin: 5px 0 10px; font-size: 1.2rem; }
.s-meta-row { display: flex; gap: 20px; }
.s-meta-item { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--gray); }

.s-price-col { text-align: right; display: flex; flex-direction: column; gap: 5px; }
.old-price { font-size: 0.8rem; color: #999; text-decoration: line-through; }
.new-price { font-size: 1.4rem; font-weight: 700; color: var(--dark); font-family: 'Cinzel', serif; }
.row-book { 
    font-size: 0.75rem; color: var(--gold); text-decoration: none; font-weight: 700; 
    text-transform: uppercase; margin-top: 10px; border: 1px solid var(--gold);
    padding: 5px 12px; border-radius: 4px; transition: 0.3s;
}
.row-book:hover { background: var(--gold); color: white; }

.no-results { text-align: center; padding: 50px; color: var(--gray); }

@media (max-width: 768px) {
    .reasons-grid { grid-template-columns: 1fr; }
    .service-row { flex-direction: column; text-align: center; gap: 20px; }
    .s-price-col { text-align: center; align-items: center; }
    .s-meta-row { justify-content: center; }
}
`;