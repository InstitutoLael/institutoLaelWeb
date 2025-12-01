// src/components/PromoBanner.jsx - CÓDIGO FINAL CORREGIDO
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="promo-top-bar">
      <style>{css}</style>
      
      <div className="promo-content container">
        <span className="promo-tag">ÚLTIMOS CUPOS</span>
        <p>
          Admisión 2026 abierta. Matricúlate con precio de preventa hasta el <strong>30 de Diciembre</strong>.
        </p>
        <Link to="/inscripcion" className="promo-link">
          Asegurar mi cupo &rarr;
        </Link>
      </div>

      <button 
        className="promo-close" 
        onClick={() => setVisible(false)} 
        aria-label="Cerrar anuncio"
      >
        ✕
      </button>
    </div>
  );
}

/* ================= CSS (ELEGANT RIBBON) - CORREGIDO ================= */
const css = `
.promo-top-bar {
  background: linear-gradient(90deg, #1e1b4b, #312e81); /* Azul oscuro corporativo */
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  padding: 10px 0;
  
  /* CAMBIOS CLAVE: FIXED Y Z-INDEX ALTO */
  position: fixed; 
  top: 0;          
  left: 0;         
  width: 100%;     
  z-index: 9999; 
}

.promo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  text-align: center;
  padding-right: 40px; 
}

.promo-tag {
  background: #F59E0B; 
  color: #000;
  font-weight: 800;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.promo-content p {
  margin: 0;
  color: #e2e8f0;
}

.promo-link {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.4);
  transition: .2s;
}
.promo-link:hover {
  color: #F59E0B;
  border-color: #F59E0B;
}

.promo-close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 5px;
  z-index: 10000; 
}
.promo-close:hover {
  color: #fff;
}

@media (max-width: 600px) {
  .promo-top-bar { font-size: 0.8rem; }
  .promo-content { justify-content: flex-start; text-align: left; }
  .promo-tag { display: none; }
}
`;