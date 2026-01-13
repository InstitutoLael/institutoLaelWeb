import { Link } from "react-router-dom";
import { 
  Instagram, Linkedin, Youtube, Mail, MapPin, Phone 
} from "lucide-react";

// Tu logo blanco
import logo from "../assets/img/Logos/lael-inst-blanco.png";

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
                Educación con propósito. Rompemos barreras académicas y geográficas 
                para que cumplas tus metas con tecnología y valores cristianos.
            </p>
            <div className="social-links">
                <SocialLink href="https://instagram.com/institutolael" icon={<Instagram size={20}/>} label="Instagram" />
                <SocialLink href="https://youtube.com/@institutolael" icon={<Youtube size={20}/>} label="YouTube" />
                <SocialLink href="https://linkedin.com/company/instituto-lael" icon={<Linkedin size={20}/>} label="LinkedIn" />
            </div>
        </div>

        {/* COLUMNA 2: PROGRAMAS */}
        <div className="footer-col links-col">
            <h4>Programas</h4>
            <nav>
                <Link to="/paes">Preu PAES 2026</Link>
                <Link to="/escuela-adultos">Escuela 2x1</Link>
                <Link to="/idiomas">Idiomas</Link>
                <Link to="/lsch">Lengua de Señas</Link>
                <Link to="/homeschool">Lael Academy</Link>
            </nav>
        </div>

        {/* COLUMNA 3: INSTITUCIONAL */}
        <div className="footer-col links-col">
            <h4>Institucional</h4>
            <nav>
                <Link to="/nosotros">Nuestra Historia</Link>
                <Link to="/empresas">Capacitación Empresas</Link>
                <Link to="/convenios">Alianzas</Link>
                <Link to="/trabaja">Trabaja con Nosotros</Link>
                <Link to="/contacto">Centro de Ayuda</Link>
            </nav>
        </div>

        {/* COLUMNA 4: CONTACTO */}
        <div className="footer-col contact-col">
            <h4>Contacto</h4>
            <p className="schedule-text">Atención L-V de 9:00 a 19:00 hrs.</p>
            
            <a 
                href="https://wa.me/56964626568" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-footer-wa"
            >
                <Phone size={18} className="wa-icon"/> Hablar por WhatsApp
            </a>

            <div className="contact-details">
                <a href="mailto:contacto@institutolael.cl">
                  <Mail size={16} className="small-icon"/> contacto@institutolael.cl
                </a>
                <span>
                  <MapPin size={16} className="small-icon"/> San Joaquín, RM (Oficina)
                </span>
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

/* ================= CSS (Ajustado al Navbar) ================= */
const css = `
:root {
    --footer-bg: #050505; /* Mismo negro profundo del Navbar */
    --footer-text: #94a3b8;
    --footer-head: #f8fafc;
    --primary: #6366F1;
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

/* RESPONSIVE */
@media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { 
    .footer-grid { grid-template-columns: 1fr; gap: 40px; text-align: left; } 
    .brand-col { order: 4; border-top: 1px solid var(--border); padding-top: 30px; }
}

/* COL 1: BRAND */
.brand-col { display: flex; flex-direction: column; gap: 20px; }
.footer-logo { height: 35px; width: auto; opacity: 0.9; }
.footer-mission { line-height: 1.6; max-width: 320px; font-size: 0.9rem; opacity: 0.8; }

.social-links { display: flex; gap: 10px; margin-top: 5px; }
.social-btn {
    width: 40px; height: 40px; border-radius: 10px; 
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; color: var(--footer-text);
    transition: all 0.2s ease;
}
.social-btn:hover { 
    background: var(--primary); border-color: var(--primary); 
    color: white; transform: translateY(-3px); 
}

/* COL 2 & 3: LINKS */
.links-col h4 { 
    color: var(--footer-head); margin-bottom: 24px; 
    font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; 
}
.links-col nav { display: flex; flex-direction: column; gap: 14px; }
.links-col a { 
    color: var(--footer-text); text-decoration: none; transition: .2s; font-size: 0.95rem; 
}
.links-col a:hover { color: var(--primary); padding-left: 4px; }

/* COL 4: CONTACT */
.contact-col { display: flex; flex-direction: column; gap: 16px; }
.contact-col h4 { 
    color: var(--footer-head); font-size: 0.85rem; font-weight: 700; margin: 0; 
    text-transform: uppercase; letter-spacing: 1px; 
}
.schedule-text { font-size: 0.9rem; opacity: 0.7; margin: 0; }

.btn-footer-wa {
    display: inline-flex; align-items: center; gap: 10px; justify-content: center;
    background: rgba(16, 185, 129, 0.1); color: #34d399; /* Verde esmeralda suave */
    padding: 12px 20px; border-radius: 8px;
    font-weight: 600; text-decoration: none; transition: .2s; 
    border: 1px solid rgba(16, 185, 129, 0.2);
}
.btn-footer-wa:hover { 
    background: #10b981; color: white; border-color: #10b981; 
    transform: translateY(-2px); 
}

.contact-details { display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem; margin-top: 5px; }
.contact-details a { color: var(--footer-text); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
.contact-details span { display: flex; align-items: center; gap: 10px; color: var(--footer-text); }
.contact-details a:hover { color: white; }
.small-icon { color: var(--primary); opacity: 0.8; }

.rut-tag { 
    font-size: 0.75rem; color: #52525b; 
    border: 1px solid #27272a; padding: 4px 8px; border-radius: 4px; 
    width: fit-content; margin-top: 8px;
}

/* BOTTOM BAR */
.footer-bottom { 
    border-top: 1px solid var(--border); padding: 24px 0; 
    background: #020202; /* Un poco más oscuro que el footer general */
}
.bottom-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; }
@media (max-width: 600px) { .bottom-row { flex-direction: column; text-align: center; } }

.bottom-row p { margin: 0; font-size: 0.8rem; color: #52525b; }
.legal-links { display: flex; gap: 15px; align-items: center; }
.legal-links a { color: #52525b; text-decoration: none; font-size: 0.8rem; transition: .2s; }
.legal-links a:hover { color: var(--footer-text); }
.sep { font-size: 0.5rem; color: #333; }
`;