// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logoReal from "../assets/img/Logos/lael-inst-naranja.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const wsp = (msg) =>
    `https://wa.me/56964626568?text=${encodeURIComponent(msg)}`;

  return (
    <footer className="lael-footer" role="contentinfo" aria-label="Pie de página Instituto Lael">
      <style>{css}</style>

      {/* CTA superior */}
      <section className="f-cta" aria-label="Llamado a la acción final">
        <div className="container f-cta__in">
          <div className="f-cta__copy">
            <span className="pill">¿Listo/a para empezar?</span>
            <h4>Clases en vivo + cápsulas + acompañamiento real.</h4>
            <p className="sub">Matrícula única. Precios claros. Sin letra chica.</p>
          </div>
          <div className="f-cta__act" role="group" aria-label="Acciones principales">
            <Link className="fbtn fbtn--gold" to="/inscripcion">Inscribirme</Link>
            <a
              className="fbtn fbtn--line"
              href={wsp("Hola 👋 Me gustaría conversar mi caso.")}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Abrir WhatsApp de Instituto Lael"
            >
              WhatsApp
            </a>
            <Link className="fbtn fbtn--line" to="/becas">Becas</Link>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="f-main">
        <div className="container f-grid">

          {/* Marca */}
          <div className="f-col f-brand">
            <Link to="/" aria-label="Inicio">
              <img src={logoReal} alt="Instituto Lael" className="f-logo" loading="lazy" />
            </Link>
            <p className="f-tag">Educación online, cercana y clara.</p>

            <nav className="f-chips" aria-label="Atajos">
              <Link to="/convenios" className="chip">Convenios</Link>
              <Link to="/trabaja" className="chip">Trabaja con nosotros</Link>
            </nav>

            <div className="f-social" aria-label="Redes sociales">
              <a className="soc" href="https://www.instagram.com/institutolael" target="_blank" rel="noreferrer noopener" aria-label="Instagram Instituto Lael">
                <span aria-hidden>📸</span> Instagram
              </a>
              <a className="soc" href="https://www.youtube.com/@institutolael" target="_blank" rel="noreferrer noopener" aria-label="YouTube Instituto Lael">
                <span aria-hidden>▶️</span> YouTube
              </a>
            </div>

            <p className="f-copy">© {year} Instituto Lael</p>
          </div>

          {/* Programas */}
          <nav className="f-col f-links" aria-label="Programas">
            <h4>Programas</h4>
            <ul>
              <li><Link to="/paes">PAES</Link></li>
              <li><Link to="/idiomas">Idiomas</Link></li>
              <li><Link to="/lsch">Lengua de Señas (LSCh)</Link></li>
              <li><Link to="/homeschool">Homeschool</Link></li>
              <li><Link to="/empresas">Empresas</Link></li>
            </ul>
          </nav>

          {/* Comunidad */}
          <nav className="f-col f-links" aria-label="Comunidad">
            <h4>Comunidad</h4>
            <ul>
              <li><Link to="/docentes">Docentes</Link></li>
              <li><Link to="/noticias">Noticias</Link></li>
              <li><Link to="/simulador">Simulador</Link></li>
              <li><Link to="/becas">Becas</Link></li>
              <li><Link to="/convenios">Convenios</Link></li>
            </ul>
          </nav>

          {/* Soporte */}
          <div className="f-col f-contact">
            <h4>Soporte</h4>
            <ul>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/inscripcion">Inscripción</Link></li>
              <li><Link to="/pagos">Pagos</Link></li>
              <li>
                <a
                  className="strong"
                  href={wsp("Hola 👋 Necesito información, por favor.")}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  +56 9 6462 6568 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="f-legal" aria-label="Enlaces legales">
        <div className="container f-legal__in">
          <nav className="f-legal__links">
            <Link to="/terminos">Términos</Link>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/nosotros">Nosotros</Link>
          </nav>
          <div className="f-note">Hecho con 💙 desde Chile.</div>
        </div>
      </section>
    </footer>
  );
}

const css = `
.lael-footer{
  --bg: var(--c-bg, #0b1220);
  --panel: var(--c-card, #0e1424);
  --soft: var(--c-soft, #0d1528);
  --bd: var(--c-bd, #1f2a44);
  --ink: #ffffff;
  --ink-2: #eaf2ff;
  --gold1:#fcd34d; --gold2:#f59e0b; --goldbd:#d97706;
  color: var(--ink);
  background: var(--bg);
  border-top: 1px solid var(--bd);
  font-weight: 800;
  isolation: isolate;
  margin-top: 40px;
}
.lael-footer .container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* CTA */
.f-cta{ border-bottom:1px solid var(--bd); background: linear-gradient(180deg, var(--panel), var(--bg)); }
.f-cta__in{ display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 0; flex-wrap:wrap; }
.pill{
  display:inline-block; padding:.2rem .6rem; border-radius:999px;
  border:1px solid #2b3a63; color:#fff; font-size:.78rem; font-weight:900;
}
.f-cta__copy h4{ margin:.25rem 0 .1rem; line-height:1.25; }
.f-cta__copy .sub{ margin:0; color:var(--ink-2); opacity:.9; font-weight:700; }
.f-cta__act{ display:flex; gap:10px; flex-wrap:wrap; }
.fbtn{
  display:inline-flex; align-items:center; gap:8px; padding:.72rem 1rem; border-radius:12px;
  text-decoration:none; white-space:nowrap; transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
  border:1px solid transparent;
}
.fbtn--gold{ color:#0b1220; background:linear-gradient(180deg,var(--gold1),var(--gold2)); border-color:var(--goldbd); box-shadow:0 10px 22px rgba(245,158,11,.18); }
.fbtn--gold:hover{ filter:brightness(1.05); transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.35); }
.fbtn--line{ color:#fff; background:transparent; border-color:#2b3a63; }
.fbtn--line:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.35); }

/* Cuerpo */
.f-main{ background: linear-gradient(180deg, var(--panel), var(--bg)); }
.f-grid{
  display:grid; gap:26px; padding:22px 0 30px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items:start;
}
.f-col{ min-width:0; }

/* Marca */
.f-brand{ display:flex; flex-direction:column; gap:8px; }
.f-logo{ width:132px; display:block; }
.f-tag{ color:var(--ink-2); margin:0; opacity:.95; font-weight:700; }
.f-chips{ display:flex; gap:8px; flex-wrap:wrap; margin:4px 0 6px; }
.chip{ padding:.22rem .6rem; border-radius:999px; border:1px solid #2b3a63; color:#fff; text-decoration:none; font-weight:900; }
.chip:hover{ background:#101a2f; }
.f-social{ display:flex; gap:10px; flex-wrap:wrap; margin-top:8px; }
.soc{ display:inline-flex; align-items:center; gap:6px; padding:.5rem .8rem; border-radius:999px; border:1.5px solid #334155; color:#fff; text-decoration:none; }
.soc:hover{ background:#101a2f; }
.f-copy{ margin-top:6px; font-size:.92rem; opacity:.75; }

/* Listas */
.f-links h4, .f-contact h4{ margin:0 0 8px; color:#fff; }
.f-links ul, .f-contact ul{ list-style:none; padding:0; margin:0; }
.f-links li, .f-contact li{ margin:6px 0; }
.f-links a, .f-contact a{ color:#fff; text-decoration:none; font-weight:800; }
.f-links a:hover, .f-contact a:hover{ text-decoration:underline; }
.strong{ font-weight:1000; }

/* Legal */
.f-legal{ border-top:1px solid var(--bd); }
.f-legal__in{ display:flex; justify-content:space-between; align-items:center; gap:10px; padding:12px 0; flex-wrap:wrap; }
.f-legal__links{ display:flex; gap:16px; flex-wrap:wrap; }
.f-legal__links a{ color:#fff; opacity:.9; text-decoration:none; }
.f-legal__links a:hover{ opacity:1; text-decoration:underline; }
.f-note{ opacity:.8; }

/* Responsive pequeños ajustes */
@media (max-width:560px){
  .f-cta__act{ width:100%; }
  .f-cta__act .fbtn{ flex:1 1 auto; justify-content:center; }
}
`;