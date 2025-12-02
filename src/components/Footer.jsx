import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// Si tienes el logo blanco, úsalo aquí para mejor contraste en fondo oscuro
// Si no, el naranja está bien.
import logo from "../assets/img/Logos/lael-inst-naranja.png"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <style>{css}</style>

      <div className="container footer-grid">
        
        {/* COLUMNA 1: MARCA */}
        <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link">
                <img src={logo} alt="Instituto Lael" className="footer-logo" />
            </Link>
            <p className="footer-mission">
                Educación con propósito. Rompemos barreras académicas y geográficas 
                para que cumplas tus metas con tecnología y valores.
            </p>
            <div className="social-links">
                <SocialLink href="https://instagram.com/institutolael" icon={<FaInstagram />} label="Instagram" />
                <SocialLink href="https://wa.me/56964626568" icon={<FaWhatsapp />} label="WhatsApp" />
                <SocialLink href="https://linkedin.com/company/instituto-lael" icon={<FaLinkedin />} label="LinkedIn" />
            </div>
        </div>

        {/* COLUMNA 2: PROGRAMAS (Rutas corregidas) */}
        <div className="footer-col links-col">
            <h4>Programas</h4>
            <nav>
                <Link to="/paes">Preu PAES 2026</Link>
                <Link to="/escuela-adultos">Escuela 2x1</Link>
                <Link to="/idiomas">Idiomas (Inglés/Coreano)</Link>
                <Link to="/lsch">Lengua de Señas</Link>
                <Link to="/empresas">Lael Corporate</Link>
            </nav>
        </div>

        {/* COLUMNA 3: INSTITUCIONAL */}
        <div className="footer-col links-col">
            <h4>Institucional</h4>
            <nav>
                <Link to="/nosotros">Nuestra Historia</Link>
                <Link to="/trabaja">Trabaja con Nosotros</Link>
                <Link to="/inscripcion">Matrícula Online</Link>
                {/* <Link to="/pagos">Portal de Pagos</Link> <-- Si lo tienes a futuro */}
                <Link to="/contacto">Contacto</Link>
            </nav>
        </div>

        {/* COLUMNA 4: CONTACTO (SEO Local) */}
        <div className="footer-col contact-col">
            <h4>Contacto</h4>
            
            <a 
                href="https://wa.me/56964626568" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-footer-wa"
            >
                <FaWhatsapp className="wa-icon"/> +56 9 6462 6568
            </a>

            <div className="contact-list">
                <div className="c-item">
                    <FaEnvelope className="c-icon"/>
                    <a href="mailto:contacto@institutolael.cl">contacto@institutolael.cl</a>
                </div>
                <div className="c-item">
                    <FaMapMarkerAlt className="c-icon"/>
                    <span>San Joaquín, RM (Oficina)</span>
                </div>
            </div>
            
            <div className="rut-tag">RUT: 78.084.019-6</div>
        </div>

      </div>

      {/* BARRA INFERIOR (LEGAL) */}
      <div className="footer-bottom">
        <div className="container bottom-row">
            <p>© {currentYear} Instituto Lael SpA.</p>
            <div className="legal-links">
                <Link to="/terminos">Términos</Link>
                <span className="sep">•</span>
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

/* ================= CSS ================= */
const css = `
:root {
    --footer-bg: #020617; /* Slate 950 */
    --footer-text: #94a3b8; /* Slate 400 */
    --footer-head: #f8fafc; /* Slate 50 */
    --primary: #6366f1;
    --border: rgba(255,255,255,0.08);
}

.site-footer {
    background-color: var(--footer-bg);
    color: var(--footer-text);
    font-family: 'Inter', sans-serif;
    border-top: 1px solid var(--border);
    padding-top: 80px;
    font-size: 0.9rem;
    position: relative;
    z-index: 10;
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
@media (max-width: 600px) { 
    .footer-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; } 
    .brand-col, .contact-col, .c-item { align-items: center; justify-content: center; } 
    .footer-logo { margin: 0 auto; } 
    .social-links { justify-content: center; } 
}

/* COL 1: BRAND */
.brand-col { display: flex; flex-direction: column; gap: 20px; }
.footer-logo { height: 38px; width: auto; margin-bottom: 5px; opacity: 0.9; }
.footer-mission { line-height: 1.6; max-width: 300px; }

.social-links { display: flex; gap: 12px; margin-top: 5px; }
.social-btn {
    width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.03);
    display: flex; align-items: center; justify-content: center; color: var(--footer-head);
    font-size: 1.1rem; transition: .2s; border: 1px solid var(--border);
}
.social-btn:hover { background: var(--primary); border-color: var(--primary); transform: translateY(-3px); }

/* COL 2 & 3: LINKS */
.links-col h4 { color: var(--footer-head); margin-bottom: 20px; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.links-col nav { display: flex; flex-direction: column; gap: 12px; }
.links-col a { color: var(--footer-text); text-decoration: none; transition: .2s; }
.links-col a:hover { color: var(--primary); padding-left: 5px; }

/* COL 4: CONTACT */
.contact-col { display: flex; flex-direction: column; gap: 20px; }
.contact-col h4 { color: var(--footer-head); font-size: 1rem; font-weight: 700; margin: 0; }

.btn-footer-wa {
    display: inline-flex; align-items: center; gap: 10px; justify-content: center;
    background: rgba(37, 211, 102, 0.1); color: #4ade80; padding: 12px 20px; border-radius: 8px;
    font-weight: 700; text-decoration: none; transition: .2s; border: 1px solid rgba(37, 211, 102, 0.2);
}
.btn-footer-wa:hover { background: rgba(37, 211, 102, 0.2); transform: translateY(-2px); }
.wa-icon { font-size: 1.1rem; }

.contact-list { display: flex; flex-direction: column; gap: 12px; }
.c-item { display: flex; align-items: center; gap: 10px; color: var(--footer-text); }
.c-item a { text-decoration: none; color: inherit; transition: .2s; }
.c-item a:hover { color: white; }
.c-icon { color: var(--primary); }

.rut-tag { font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; width: fit-content; margin-top: 5px; }
@media (max-width: 600px) { .rut-tag { margin: 5px auto 0; } }

/* BOTTOM BAR */
.footer-bottom { border-top: 1px solid var(--border); padding: 30px 0; background: #000; }
.bottom-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; }
@media (max-width: 600px) { .bottom-row { flex-direction: column; text-align: center; } }

.bottom-row p { margin: 0; font-size: 0.8rem; opacity: 0.6; }
.legal-links { display: flex; gap: 15px; align-items: center; }
.legal-links a { color: var(--footer-text); text-decoration: none; font-size: 0.8rem; transition: .2s; }
.legal-links a:hover { color: white; }
.sep { font-size: 0.5rem; opacity: 0.3; }
`;