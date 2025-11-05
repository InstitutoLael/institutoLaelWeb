// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logoReal from "../assets/img/Logos/lael-inst-naranja.png";

function wspLink(phone = "56964626568", msg = "Hola 👋 Necesito información, por favor.") {
  const clean = String(phone).replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
}

function ExternalA({ href, children, className = "", ariaLabel }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="lael-footer" role="contentinfo">
      <style>{css}</style>

      {/* CTA superior */}
      <section className="cta">
        <div className="container cta__row">
          <div className="cta__text">
            <span className="chip">¿Listo para empezar?</span>
            <h4>Clases en vivo + cápsulas + acompañamiento real.</h4>
            <p className="muted">Matrícula única. Precios claros. Sin letra chica.</p>
          </div>
          <div className="cta__actions">
            <Link to="/inscripcion" className="btn btn-primary">Inscribirme</Link>
            <ExternalA
              href={wspLink("56964626568", "Hola 👋 Me gustaría conversar mi caso.")}
              className="btn btn-ghost"
              ariaLabel="Abrir WhatsApp Instituto Lael"
            >
              WhatsApp
            </ExternalA>
            <Link to="/becas" className="btn btn-outline">Becas</Link>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="body">
        <div className="container grid">
          {/* Col 1 - Marca */}
          <div className="col brand">
            <Link to="/" aria-label="Ir al inicio" className="brand__link">
              <img
                src={logoReal}
                alt="Instituto Lael"
                className="brand__logo"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="muted">Educación online, cercana y clara.</p>

            <nav aria-label="Redes sociales" className="social">
              <ExternalA
                href="https://www.instagram.com/institutolael"
                ariaLabel="Instagram Instituto Lael"
                className="social__a"
              >
                <FaInstagram size={18} aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </ExternalA>
              <ExternalA
                href="https://www.youtube.com/@institutolael"
                ariaLabel="YouTube Instituto Lael"
                className="social__a"
              >
                <FaYoutube size={20} aria-hidden="true" />
                <span className="sr-only">YouTube</span>
              </ExternalA>
              <ExternalA
                href={wspLink("56964626568")}
                ariaLabel="WhatsApp Instituto Lael"
                className="social__a"
              >
                <FaWhatsapp size={18} aria-hidden="true" />
                <span className="sr-only">WhatsApp</span>
              </ExternalA>
            </nav>
          </div>

          {/* Col 2 - Programas */}
          <div className="col">
            <h4 className="ttl">Programas</h4>
            <ul className="links">
              <li><Link to="/paes" className="link">PAES</Link></li>
              <li><Link to="/idiomas" className="link">Idiomas</Link></li>
              <li><Link to="/lsch" className="link">Lengua de Señas</Link></li>
              <li><Link to="/homeschool" className="link">Homeschool</Link></li>
              <li><Link to="/empresas" className="link">Empresas</Link></li>
            </ul>
          </div>

          {/* Col 3 - Comunidad */}
          <div className="col">
            <h4 className="ttl">Comunidad</h4>
            <ul className="links">
              <li><Link to="/docentes" className="link">Docentes</Link></li>
              <li><Link to="/noticias" className="link">Noticias</Link></li>
              <li><Link to="/simulador" className="link">Simulador</Link></li>
              <li><Link to="/becas" className="link">Becas</Link></li>
              <li><Link to="/convenios" className="link">Convenios</Link></li>
            </ul>
          </div>

          {/* Col 4 - Soporte */}
          <div className="col">
            <h4 className="ttl">Soporte</h4>
            <ul className="links">
              <li><Link to="/contacto" className="link">Contacto</Link></li>
              <li><Link to="/inscripcion" className="link">Inscripción</Link></li>
              <li><Link to="/pagos" className="link">Pagos</Link></li>
              <li className="stack">
                <ExternalA
                  href={wspLink("56964626568")}
                  className="link strong"
                  ariaLabel="Abrir WhatsApp Instituto Lael"
                >
                  +56 9 6462 6568 (WhatsApp)
                </ExternalA>
                <a href="tel:+56964626568" className="subtel">Llamar: +56 9 6462 6568</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="legal">
        <div className="container legal__row">
          <nav aria-label="Legal" className="legal__nav">
            <Link to="/terminos" className="legal__a">Términos</Link>
            <Link to="/privacidad" className="legal__a">Privacidad</Link>
            <Link to="/nosotros" className="legal__a">Nosotros</Link>
          </nav>
          <p className="copy">© {year} Instituto Lael · Hecho con 💙 desde Chile.</p>
        </div>
      </section>
    </footer>
  );
}

/* ---------- CSS embebido, sin Tailwind ---------- */
const css = `
:root{
  --bg:#0b1220; --bg2:#0e1424; --bd:#1f2a44;
  --ink:#ffffff; --mut:#cbd5e1;
  --cta:#f59e0b; --ctaTxt:#0b1220;
}

.lael-footer{ background:var(--bg); color:var(--ink); border-top:1px solid var(--bd); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* CTA */
.cta{ background:linear-gradient(180deg,#0e1424,#0b1220); border-bottom:1px solid var(--bd); }
.cta__row{ display:flex; gap:16px; align-items:center; justify-content:space-between; padding:18px 0; flex-wrap:wrap; }
.chip{ display:inline-block; padding:.22rem .6rem; border:1px solid #334155; border-radius:999px; font-weight:900; font-size:.8rem; }
.cta h4{ margin:.4rem 0 .2rem; }
.cta .muted{ margin:0; color:var(--mut); }
.cta__actions{ display:flex; gap:10px; flex-wrap:wrap; }
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.6rem .9rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; }
.btn-primary{ background:linear-gradient(180deg,#fbbf24,#f59e0b); color:var(--ctaTxt); border-color:#d97706; }
.btn-outline{ background:transparent; color:#fff; border-color:#334155; }
.btn-ghost{ background:transparent; color:#fff; border-color:#334155; }

/* Body grid */
.body{ padding:26px 0; }
.grid{
  display:grid; gap:18px;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
}
@media (max-width:900px){ .grid{ grid-template-columns: 1fr 1fr; } }
@media (max-width:560px){ .grid{ grid-template-columns: 1fr; } }

.col{ min-width:0; }
.brand__link{ display:inline-block; }
.brand__logo{ height:40px; width:auto; display:block; margin:0 0 10px; }

.ttl{ margin:0 0 10px; font-weight:700; }
.links{ list-style:none; margin:0; padding:0; }
.link{ color:var(--mut); text-decoration:none; display:inline-block; padding:6px 0; }
.link:hover{ color:#fff; text-decoration:underline; }
.strong{ font-weight:700; }
.subtel{ color:#94a3b8; font-size:.86rem; text-decoration:none; }
.subtel:hover{ color:#fff; }

.stack{ display:flex; flex-direction:column; gap:2px; }

/* Social */
.social{ display:flex; gap:10px; margin-top:8px; }
.social__a{
  display:inline-grid; place-items:center; width:34px; height:34px; border-radius:8px;
  color:#e5e7eb; background:#101a2f; border:1px solid #233154; text-decoration:none;
}
.social__a:hover{ color:#fff; }

/* Legal */
.legal{ border-top:1px solid var(--bd); padding:14px 0; }
.legal__row{ display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap; }
.legal__nav{ display:flex; gap:14px; flex-wrap:wrap; }
.legal__a{ color:#cbd5e1; text-decoration:none; }
.legal__a:hover{ color:#fff; text-decoration:underline; }
.copy{ margin:0; color:#cbd5e1; }

/* Helpers */
.muted{ color:#cbd5e1; }
.sr-only{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
`;