// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logoReal from "../assets/img/Logos/lael-inst-naranja.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const wsp = (msg) => `https://wa.me/56964626568?text=${encodeURIComponent(msg)}`;

  return (
    <footer className="lael-footer" role="contentinfo" aria-label="Pie de página Instituto Lael">
      <style>{css}</style>

      {/* CTA superior */}
      <section className="cta">
        <div className="container cta__in">
          <div className="cta__copy">
            <span className="pill">¿Listo/a para empezar?</span>
            <h4>Aprende con ritmo humano. Nosotros ponemos método y acompañamiento.</h4>
          </div>
          <div className="cta__act">
            <Link className="fbtn fbtn--gold" to="/inscripcion">Inscribirme</Link>
            <Link className="fbtn fbtn--line" to="/becas">Becas</Link>
            <a className="fbtn fbtn--line" href={wsp("Hola 👋 Me gustaría conversar mi caso.")} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CUERPO */}
      <section className="main">
        <div className="container fgrid">
          {/* Marca (siempre empieza nueva columna y no se monta) */}
          <div className="fcol brand">
            <img src={logoReal} alt="Instituto Lael" className="logo" />
            <p className="tag">Educación online, pero humana.</p>

            <nav className="chips" aria-label="Atajos">
              <Link to="/convenios" className="chip">Convenios</Link>
              <Link to="/trabaja" className="chip">Trabaja con nosotros</Link>
            </nav>

            <p className="copy">© {year} Instituto Lael</p>
          </div>

          {/* Programas */}
          <nav className="fcol links" aria-label="Programas">
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
          <nav className="fcol links" aria-label="Comunidad">
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
          <div className="fcol contact">
            <h4>Soporte</h4>
            <ul>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/inscripcion">Inscripción</Link></li>
              <li><Link to="/pagos">Pagos</Link></li>
              <li>
                <a className="strong" href={wsp("Hola 👋 Necesito información, por favor.")} target="_blank" rel="noreferrer">
                  +56 9 6462 6568 (WhatsApp)
                </a>
              </li>
            </ul>

            <div className="social" aria-label="Redes sociales">
              <a className="soc" href="https://www.instagram.com/institutolael" target="_blank" rel="noreferrer">
                <span aria-hidden>📸</span> Instagram
              </a>
              <a className="soc" href="https://www.youtube.com/@institutolael" target="_blank" rel="noreferrer">
                <span aria-hidden>▶️</span> YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL */}
      <section className="legal">
        <div className="container legal__in">
          <nav className="legal__links" aria-label="Legal">
            <a href="/terminos">Términos</a>
            <a href="/privacidad">Privacidad</a>
            <Link to="/nosotros">Nosotros</Link>
          </nav>
          <div className="note">Hecho con 💙 desde Chile.</div>
        </div>
      </section>
    </footer>
  );
}

const css = `
.lael-footer{
  --bg: var(--c-bg, #0b1220);
  --panel: var(--c-card, #0e1424);
  --bd: var(--c-bd, #1f2a44);
  --ink: var(--ink, #ffffff);
  --ink2: var(--ink2, #F5F7FF);
  --pri: var(--pri, #5850EC);
  --gold1:#fcd34d; --gold2:#f59e0b; --goldbd:#d97706;
  --yellow:#facc15;
  color:var(--ink);
  background:var(--bg);
  border-top:1px solid var(--bd);
  margin-top:40px;
  font-weight:800;
  isolation:isolate; /* evita que nada externo se mezcle */
}
.lael-footer .container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* CTA superior */
.lael-footer .cta{ border-bottom:1px solid var(--bd); }
.lael-footer .cta__in{
  display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 0; flex-wrap:wrap;
}
.lael-footer .pill{
  display:inline-block; padding:.18rem .55rem; border-radius:999px; border:1px solid rgba(255,255,255,.45); color:#fff; font-size:.8rem;
}
.lael-footer .cta__copy h4{ margin:.2rem 0 0; color:#fff; line-height:1.25; }
.lael-footer .cta__act{ display:flex; gap:10px; flex-wrap:wrap; }
.lael-footer .fbtn{
  display:inline-flex; align-items:center; gap:8px; padding:.7rem 1rem; border-radius:12px; text-decoration:none; white-space:nowrap;
  transition:transform .18s ease, box-shadow .18s ease, filter .18s ease, border-color .18s ease;
}
.lael-footer .fbtn--gold{ color:#0b1220; background:linear-gradient(180deg,var(--gold1),var(--gold2)); border:1px solid var(--goldbd); box-shadow:0 10px 22px rgba(245,158,11,.18); }
.lael-footer .fbtn--gold:hover{ filter:brightness(1.05); transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.35); }
.lael-footer .fbtn--line{ color:#fff; background:transparent; border:1.5px solid rgba(255,255,255,.55); }
.lael-footer .fbtn--line:hover{ border-color:#fff; transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.35); }

/* Cuerpo */
.lael-footer .main{ background:linear-gradient(180deg,var(--panel), var(--bg)); }

/* GRID FLUIDO: evita superposiciones */
.lael-footer .fgrid{
  display:grid; gap:28px; padding:26px 0 32px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items:start; /* todas las columnas arrancan arriba */
}
.lael-footer .fcol{ align-self:start; min-width:0; }

/* Marca */
.lael-footer .brand{ display:flex; flex-direction:column; gap:8px; }
.lael-footer .brand .logo{ width:132px; }
.lael-footer .brand .tag{ color:var(--ink2); opacity:.98; margin:0; }
.lael-footer .chips{ display:flex; gap:8px; flex-wrap:wrap; margin:2px 0 6px; }
.lael-footer .chip{ padding:.18rem .55rem; border-radius:999px; border:1px solid #2b3a63; color:#fff; text-decoration:none; }
.lael-footer .chip:hover{ background:#101a2f; }
.lael-footer .brand .copy{ margin-top:4px; font-size:.92rem; opacity:.72; }

/* Listas de enlaces */
.lael-footer .links h4{ margin:0 0 8px; color:#fff; }
.lael-footer .links ul{ list-style:none; margin:0; padding:0; }
.lael-footer .links li{ margin:6px 0; }
.lael-footer .links a{ color:#fff; text-decoration:none; }
.lael-footer .links a:hover{ text-decoration:underline; }

/* Soporte / redes */
.lael-footer .contact .strong{ color:#fff; text-decoration:none; }
.lael-footer .contact .strong:hover{ text-decoration:underline; }
.lael-footer .social{ display:flex; gap:10px; flex-wrap:wrap; margin-top:8px; }
.lael-footer .soc{ display:inline-flex; align-items:center; gap:6px; padding:.55rem .9rem; border-radius:999px; border:2px solid var(--yellow); color:#fff; text-decoration:none; background:transparent; }
.lael-footer .soc:hover{ background:rgba(250,204,21,.08); }

/* Legal */
.lael-footer .legal{ border-top:1px solid var(--bd); }
.lael-footer .legal__in{ display:flex; justify-content:space-between; align-items:center; gap:10px; padding:12px 0; flex-wrap:wrap; }
.lael-footer .legal__links{ display:flex; gap:16px; flex-wrap:wrap; }
.lael-footer .legal__links a{ color:#fff; opacity:.85; text-decoration:none; }
.lael-footer .legal__links a:hover{ opacity:1; text-decoration:underline; }
.lael-footer .note{ opacity:.78; }
`;