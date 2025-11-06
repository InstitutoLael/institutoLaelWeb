// src/pages/Nosotros.jsx
import { Link } from "react-router-dom";

// Hero e imágenes de secciones (usa las que ya tienes en /assets/img/lael)
import hero from "../assets/img/lael/onboarding.jpg";
import card1 from "../assets/img/lael/office-bg.jpg";
import card2 from "../assets/img/lael/study-online.jpg";
import card3 from "../assets/img/lael/inclusion.jpg";

// Identidad (no deben cortarse)
import id1 from "../assets/img/lael/1.png";
import id2 from "../assets/img/lael/2.png";
import id3 from "../assets/img/lael/3.png";

export default function Nosotros() {
  return (
    <section className="about">
      <style>{css}</style>

      {/* HERO */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.85)), url(${hero})`,
        }}
      >
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="kicker">Sobre nosotros</span>
            <h1 className="title">Instituto Lael</h1>
            <p className="lead">
              Nacimos como <b>Preu Lael</b> para ordenar el estudio PAES con
              acompañamiento real. Hoy, como <b>Instituto Lael</b>, sumamos{" "}
              <b>Idiomas</b> y <b>LSCh</b>. Mismo foco: claridad, seguimiento y
              respeto por las personas.
            </p>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">
                Inscribirme
              </Link>
              <Link className="btn btn-ghost" to="/paes">
                Ver programas
              </Link>
            </div>

            <ul className="chips">
              <li>Seguimiento + metas semanales</li>
              <li>Clases en vivo + cápsulas</li>
              <li>KPIs: asistencia e hitos</li>
            </ul>
          </div>
        </div>
      </header>

      {/* Banda separadora */}
      <div className="band band--a" aria-hidden />

      {/* QUÉ OFRECEMOS */}
      <section className="section">
        <div className="container">
          <h2 className="h">Qué ofrecemos</h2>
          <p className="sub">
            Acompañamos con método y respeto. Enseñamos claro y{" "}
            <b>medimos resultados</b>.
          </p>

          <div className="cards">
            <OfferCard
              img={card1}
              title="Servicio primero"
              text="Precios claros, trato digno y foco en lo importante."
            />
            <OfferCard
              img={card2}
              title="Acompañamiento real"
              text="Clases en vivo + cápsulas, plan semanal y feedback útil."
            />
            <OfferCard
              img={card3}
              title="Inclusión práctica"
              text="Programas LSCh con cultura humana y respetuosa."
            />
          </div>
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="section">
        <div className="container">
          <h2 className="h">Nuestra identidad</h2>
          <p className="sub">Símbolos que nos recuerdan el para qué.</p>

          <div className="id-grid">
            <IdCard
              img={id1}
              title="Cobertura y cuidado"
              text="El isotipo abraza. Nuestro trabajo sostiene y ordena procesos que cuestan hacer solos."
            />
            <IdCard
              img={id2}
              title="¿Qué significa LAEL?"
              text='Del hebreo “de Dios / perteneciente a Dios”. Inspiración para servir con integridad y respeto.'
            />
            <IdCard
              img={id3}
              title="La paloma"
              text="Inicio y esperanza. Acompañamos cambios reales, paso a paso."
            />
          </div>
        </div>
      </section>

      {/* Banda separadora */}
      <div className="band band--b" aria-hidden />

      {/* HISTORIA */}
      <section className="section">
        <div className="container">
          <h2 className="h">De Preu Lael a Instituto Lael</h2>
          <p className="sub">Más rutas, mismo corazón.</p>

          <div className="flow" role="list">
            <FlowBox title="Preu Lael">
              Orden para PAES con plan simple, ensayos y tutoreo.
            </FlowBox>
            <div className="flow__arrow" aria-hidden>→</div>
            <FlowBox title="Expansión">
              Sumamos Idiomas y LSCh, grabaciones y cápsulas.
            </FlowBox>
            <div className="flow__arrow" aria-hidden>→</div>
            <FlowBox title="Instituto Lael">
              Trayectorias por competencias para personas y empresas.
            </FlowBox>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="section">
        <div className="container">
          <h2 className="h">Principios de trabajo</h2>
          <p className="sub">Claridad, seguimiento y resultados.</p>

          <div className="pill-grid">
            <Pill t="Acompañamiento" d="Estás acompañado/a en todo el proceso." />
            <Pill t="Accesibilidad" d="Calidad con precios justos." />
            <Pill t="Respeto" d="Sin elitismos; cada persona importa." />
            <Pill t="Propósito" d="Hacemos bien las cosas, de verdad." />
            <Pill t="Métricas" d="Metas y ajustes a tiempo." />
            <Pill t="Comunidad" d="Celebramos avances y sostenemos el ritmo." />
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="section">
        <div className="container">
          <h2 className="h">Cómo trabajamos</h2>
          <div className="steps">
            <Step n="1" t="Diagnóstico" d="Punto de partida, brechas y meta realista." />
            <Step n="2" t="Plan semanal" d="Clases en vivo + cápsulas y ritmo claro." />
            <Step n="3" t="Seguimiento" d="Checkpoints, WhatsApp y feedback útil." />
            <Step n="4" t="Resultados" d="Ensayos y ajustes a tiempo. Nada al azar." />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section last">
        <div className="container">
          <div className="cta-panel">
            <h3 className="cta-title">¿Te sumas?</h3>
            <p className="cta-sub">Educación real, con propósito y acompañamiento.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/inscripcion">
                Inscribirme
              </Link>
              <Link className="btn btn-ghost" to="/paes">
                Ver programas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function OfferCard({ img, title, text }) {
  return (
    <article className="card offer">
      <div className="offer__media">
        <img src={img} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="pad">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function IdCard({ img, title, text }) {
  return (
    <article className="card idc">
      <div className="idc__media">
        <img src={img} alt={title} loading="lazy" decoding="async" />
      </div>
      <div className="pad">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function FlowBox({ title, children }) {
  return (
    <div className="flow__box" role="listitem">
      <div className="flow__title">{title}</div>
      <div className="flow__text">{children}</div>
    </div>
  );
}

function Pill({ t, d }) {
  return (
    <div className="card pill">
      <div className="pad">
        <h4>{t}</h4>
        <p>{d}</p>
      </div>
    </div>
  );
}

function Step({ n, t, d }) {
  return (
    <div className="card step">
      <div className="num" aria-hidden>{n}</div>
      <div className="content">
        <h4>{t}</h4>
        <p>{d}</p>
      </div>
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220;
  --panel:#0e1424;
  --ink:#fff;
  --ink2:#eaf2ff;
  --muted:#cbd5e1;
  --bd:#1f2a44;
  --accent:#facc15;
  --accent-dark:#E0B90F;
  --focus:#22d3ee;
  --rad-lg:20px;
  --shadow:0 24px 48px rgba(2,6,23,.35);
}
*{box-sizing:border-box}
.about{ background:var(--bg); color:var(--ink); }
.container{ max-width:1160px; margin:0 auto; padding:0 20px; }

.h{ margin:0 0 12px; font-size:1.7rem; }
.sub{ margin:0 0 18px; color:var(--ink2); }

.section{ padding:56px 0; position:relative; }

/* HERO */
.hero{
  background-size:cover; background-position:center;
  color:#fff; padding:84px 0 64px; position:relative;
}
.hero__copy{ max-width:760px }
.kicker{ font-weight:800; letter-spacing:.3px; opacity:.95 }
.title{ font-size:clamp(2.2rem,4vw,3rem); line-height:1.05; margin:.2rem 0 .4rem; }
.lead{ color:var(--ink2); margin:10px 0 18px; line-height:1.55; }
.cta{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:14px; }

.btn{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.78rem 1.05rem; border-radius:12px; border:2px solid transparent;
  font-weight:900; text-decoration:none; cursor:pointer;
  transition:.18s background ease, .18s box-shadow ease, .18s transform ease;
}
.btn:focus-visible{ outline:3px solid var(--focus); outline-offset:2px; }
.btn-primary{ background:var(--accent); color:#111; border-color:var(--accent-dark); box-shadow:0 10px 26px rgba(250,204,21,.28); }
.btn-primary:hover{ background:var(--accent-dark); }
.btn-ghost{ color:#fff; border-color:#3a4056; background:transparent; }
.btn-ghost:hover{ background:rgba(255,255,255,.08); }

.chips{ list-style:none; padding:0; margin:0; display:flex; gap:10px; flex-wrap:wrap; }
.chips li{
  border:1px solid #2b3656; color:#eaf2ff; background:#0c1224;
  padding:.46rem .8rem; border-radius:999px; font-weight:700; white-space:nowrap;
}

/* Bandas separadoras */
.band{ height:38px; }
.band--a{
  background:
    radial-gradient(900px 240px at 10% 0%, rgba(59,84,157,.18), transparent 60%),
    radial-gradient(900px 240px at 90% 0%, rgba(36,149,84,.16), transparent 60%);
  border-top:1px solid #1a2440;
}
.band--b{
  background:
    radial-gradient(900px 260px at 15% 0%, rgba(250,204,21,.13), transparent 60%),
    radial-gradient(900px 260px at 85% 0%, rgba(214,160,197,.14), transparent 60%);
  border-top:1px solid #1a2440;
}

/* Cards base */
.card{
  border:1px solid #243153; border-radius:var(--rad-lg);
  background:
    radial-gradient(520px 200px at -10% -8%, rgba(255,255,255,.06), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);
  color:var(--ink);
}
.pad{ padding:16px 18px; }
.card h3,h4{ margin:.15rem 0 .35rem; }

/* Ofertas (con fotos de portada) */
.cards{ display:grid; gap:18px; grid-template-columns:repeat(3,1fr); }
@media (max-width:980px){ .cards{ grid-template-columns:1fr; } }
.offer__media{ aspect-ratio: 16/9; overflow:hidden; border-bottom:1px solid #222c49; border-top-left-radius:var(--rad-lg); border-top-right-radius:var(--rad-lg); }
.offer__media img{ width:100%; height:100%; object-fit:cover; display:block; }

/* Identidad: SIN recortes (contain) y centrado */
.id-grid{ display:grid; gap:18px; grid-template-columns:repeat(3,1fr); }
@media (max-width:980px){ .id-grid{ grid-template-columns:1fr; } }
.idc__media{
  aspect-ratio: 4/3;
  background:#0b1220; display:grid; place-items:center;
  border-bottom:1px solid #222c49; border-top-left-radius:var(--rad-lg); border-top-right-radius:var(--rad-lg);
}
.idc__media img{
  width:92%; height:auto; object-fit:contain; display:block;
}

/* Flow (historia) */
.flow{
  display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:14px; align-items:stretch;
}
@media (max-width:980px){ .flow{ grid-template-columns:1fr; } .flow__arrow{ display:none } }
.flow__box{
  border:1px solid #22314f; border-radius:16px; background:linear-gradient(180deg,#0f172a,#0b1220);
  padding:16px; color:var(--ink);
}
.flow__title{ font-weight:800; margin:0 0 6px; }
.flow__text{ margin:0; color:var(--ink2); }
.flow__arrow{ display:grid; place-items:center; font-weight:900; font-size:1.6rem; color:#cbd5e1; }

/* Principios */
.pill-grid{ display:grid; gap:16px; grid-template-columns:repeat(3,1fr); }
@media (max-width:980px){ .pill-grid{ grid-template-columns:1fr 1fr; } }
@media (max-width:640px){ .pill-grid{ grid-template-columns:1fr; } }
.pill p{ color:var(--ink2); margin:0; }

/* Steps */
.steps{ display:grid; gap:16px; grid-template-columns:1fr 1fr; }
@media (max-width:980px){ .steps{ grid-template-columns:1fr; } }
.step{ display:grid; grid-template-columns:64px 1fr; gap:14px; align-items:flex-start; padding:16px; }
.step .num{
  width:56px; height:56px; display:grid; place-items:center; border-radius:14px;
  background:#101a2f; border:1px solid #2a3b66; font-weight:900; font-size:1.1rem; color:var(--ink);
}
.step p{ color:var(--ink2); margin:0; }

/* CTA final */
.last{ padding-bottom:92px; }
.cta-panel{
  text-align:center; border:1px solid #22314f; border-radius:22px; padding:28px; color:var(--ink);
  background:
    radial-gradient(560px 260px at 14% -8%, rgba(59,84,157,.24), transparent 60%),
    radial-gradient(560px 260px at 86% -8%, rgba(36,149,84,.20), transparent 60%),
    linear-gradient(180deg,#0b1220,#101a2f);
  box-shadow:0 30px 60px rgba(2,6,23,.42);
}
.cta-title{ margin:.1rem 0 .35rem; font-size:1.5rem; }
.cta-sub{ margin:0 0 12px; color:var(--ink2); }

/* Accesibilidad */
a:focus-visible, .btn:focus-visible{ outline:3px solid var(--focus); outline-offset:2px; }
`;