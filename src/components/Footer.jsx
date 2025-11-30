// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <style>{css}</style>

      <div className="container footer-grid">
        
        {/* COLUMNA 1: MARCA Y MISIÓN */}
        <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link">
                <img src={logo} alt="Instituto Lael" className="footer-logo" />
            </Link>
            <p className="footer-mission">
                Transformamos vidas a través de la educación. 
                Tecnología humana, acompañamiento real y oportunidades para todos.
            </p>
            <div className="social-links">
                <SocialLink href="https://instagram.com/institutolael" icon={<FaInstagram />} label="Instagram" />
                <SocialLink href="https://youtube.com/@institutolael" icon={<FaYoutube />} label="YouTube" />
                <SocialLink href="https://linkedin.com/company/instituto-lael" icon={<FaLinkedin />} label="LinkedIn" />
            </div>
        </div>

        {/* COLUMNA 2: EXPLORA */}
        <div className="footer-col links-col">
            <h4>Explora</h4>
            <nav>
                <Link to="/paes">Preu PAES</Link>
                <Link to="/idiomas">Idiomas</Link>
                <Link to="/lsch">Lengua de Señas</Link>
                <Link to="/escuelaadultos">Nivelación Estudios</Link>
                <Link to="/homeschool">Tutorías (Academy)</Link>
            </nav>
        </div>

        {/* COLUMNA 3: INSTITUCIONAL */}
        <div className="footer-col links-col">
            <h4>Nosotros</h4>
            <nav>
                <Link to="/nosotros">Nuestra Historia</Link>
                <Link to="/empresas">Capacitación B2B</Link>
                <Link to="/convenios">Alianzas</Link>
                <Link to="/trabaja">Únete al Equipo</Link>
                <Link to="/becas">Becas</Link>
            </nav>
        </div>

        {/* COLUMNA 4: CONTACTO DIRECTO */}
        <div className="footer-col contact-col">
            <h4>¿Necesitas Ayuda?</h4>
            <p className="contact-text">Nuestro equipo de coordinación está disponible L-V de 9:00 a 19:00.</p>
            
            <a 
                href="https://wa.me/56964626568" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-footer-wa"
            >
                <FaWhatsapp className="wa-icon"/> Hablar por WhatsApp
            </a>

            <div className="contact-details">
                <a href="mailto:contacto@institutolael.cl">contacto@institutolael.cl</a>
                <span>RUT: 78.084.019-6</span>
            </div>
        </div>

      </div>

      {/* BARRA INFERIOR (LEGAL) */}
      <div className="footer-bottom">
        <div className="container bottom-row">
            <p>© {currentYear} Instituto Lael SpA. Todos los derechos reservados.</p>
            <div className="legal-links">
                <Link to="/terminos">Términos y Condiciones</Link>
                <Link to="/privacidad">Privacidad</Link>
            </div>
        </div>
      </div>

    </footer>
  );
}

/* --- SUBCOMPONENTE SOCIAL --- */
function SocialLink({ href, icon, label }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="social-btn" aria-label={label}>
            {icon}
        </a>
    );
}

/* ================= CSS (CLEAN & DARK) ================= */
const css = `
:root {
    --footer-bg: #020617;
    --footer-text: #94a3b8;
    --footer-head: #f8fafc;
    --primary: #6366f1;
    --border: rgba(255,255,255,0.1);
}

.site-footer {
    background-color: var(--footer-bg);
    color: var(--footer-text);
    font-family: 'Inter', sans-serif;
    border-top: 1px solid var(--border);
    padding-top: 80px;
    font-size: 0.95rem;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* GRID LAYOUT */
.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 40px;
    padding-bottom: 60px;
}
@media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; } .brand-col { align-items: center; } .contact-col { align-items: center; } .footer-logo { margin: 0 auto; } .social-links { justify-content: center; } }

/* COL 1: BRAND */
.brand-col { display: flex; flex-direction: column; gap: 20px; }
.footer-logo { height: 40px; width: auto; margin-bottom: 10px; }
.footer-mission { line-height: 1.6; font-size: 0.9rem; max-width: 300px; }

.social-links { display: flex; gap: 12px; margin-top: 10px; }
.social-btn {
    width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center; color: var(--footer-head);
    font-size: 1.2rem; transition: .2s; border: 1px solid var(--border);
}
.social-btn:hover { background: var(--primary); border-color: var(--primary); transform: translateY(-3px); }

/* COL 2 & 3: LINKS */
.links-col h4 { color: var(--footer-head); margin-bottom: 20px; font-size: 1.1rem; }
.links-col nav { display: flex; flex-direction: column; gap: 12px; }
.links-col a { color: var(--footer-text); text-decoration: none; transition: .2s; }
.links-col a:hover { color: var(--primary); padding-left: 5px; }

/* COL 4: CONTACT */
.contact-col { display: flex; flex-direction: column; gap: 15px; }
.contact-col h4 { color: var(--footer-head); font-size: 1.1rem; margin-bottom: 5px; }
.contact-text { font-size: 0.9rem; line-height: 1.5; margin-bottom: 10px; }

.btn-footer-wa {
    display: inline-flex; align-items: center; gap: 10px; justify-content: center;
    background: #25D366; color: #000; padding: 12px 20px; border-radius: 8px;
    font-weight: 700; text-decoration: none; transition: .2s;
}
.btn-footer-wa:hover { filter: brightness(1.1); transform: translateY(-2px); }
.wa-icon { font-size: 1.2rem; }

.contact-details { display: flex; flex-direction: column; gap: 5px; font-size: 0.85rem; margin-top: 10px; }
.contact-details a { color: var(--footer-text); text-decoration: none; }
.contact-details a:hover { text-decoration: underline; color: var(--footer-head); }

/* BOTTOM BAR */
.footer-bottom { border-top: 1px solid var(--border); padding: 30px 0; background: rgba(0,0,0,0.2); }
.bottom-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
@media (max-width: 600px) { .bottom-row { flex-direction: column; text-align: center; } }

.bottom-row p { margin: 0; font-size: 0.85rem; }
.legal-links { display: flex; gap: 20px; }
.legal-links a { color: var(--footer-text); text-decoration: none; font-size: 0.85rem; transition: .2s; }
.legal-links a:hover { color: var(--footer-head); }
`;