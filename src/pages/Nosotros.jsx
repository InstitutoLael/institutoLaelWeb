// src/pages/Nosotros.jsx
import { Link } from "react-router-dom";

// IMÁGENES (usa las que ya tienes en /assets/img/lael/)
import heroImg from "../assets/img/lael/onboarding.jpg";    // Hero NUEVO (no es office-bg)
import card1    from "../assets/img/lael/office-bg.jpg";     // Servicio primero
import card2    from "../assets/img/lael/bootcamp.jpg";      // Acompañamiento real
import card3    from "../assets/img/lael/inclusion.jpg";     // Inclusión práctica

import id1      from "../assets/img/lael/1.png";             // Identidad: cobertura
import id2      from "../assets/img/lael/2.png";             // Identidad: nombre
import id3      from "../assets/img/lael/3.png";             // Identidad: paloma

export default function Nosotros() {
  return (
    <section className="about">
      <style>{css}</style>

      {/* HERO */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,24,.55), rgba(4,7,24,.82)), url(${heroImg})`,
        }}
      >
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="kicker">Sobre nosotros</span>
            <h1 className="title">Instituto <span className="grad">Lael</span></h1>

            <p className="lead">
              Partimos como <strong>Preu Lael</strong> para ordenar el estudio PAES con
              acompañamiento real. Hoy, como <strong>Instituto Lael</strong>, sumamos
              <strong> Idiomas</strong> y <strong>LSCh</strong>. Mismo foco: claridad,
              seguimiento y respeto por las personas.
            </p>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-ghost" to="/paes">Ver programas</Link>
            </div>

            <ul className="chips" aria-label="Cómo trabajamos">
              <li>Seguimiento + metas semanales</li>
              <li>Clases en vivo + cápsulas</li>
              <li>KPIs: asistencia e hitos</li>
            </ul>
          </div>
        </div>
      </header>

      {/* QUÉ OFRECEMOS */}
      <section className="section">
        <div className="container">
          <h2 className="h">Qué ofrecemos</h2>
          <p className="sub">
            Acompañamos con método y respeto. Enseñamos claro y <b>medimos resultados</b>.
          </p>

          <div className="cards3">
            <FeatureCard img={card1} title="Servicio primero">
              Precios claros, trato digno y foco en lo importante.
            </FeatureCard>
            <FeatureCard img={card2} title="Acompañamiento real">
              Clases en vivo + cápsulas, plan semanal y feedback útil.
            </FeatureCard>
            <FeatureCard img={card3} title="Inclusión práctica">
              Programas LSCh con cultura humana y respetuosa.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* IDENTIDAD (con imágenes SIEMPRE completas, sin recortes) */}
      <section className="section soft">
        <div className="container">
          <h2 className="h">Nuestra identidad</h2>
          <p className="sub">Símbolos que nos recuerdan el para qué.</p>

          <div className="id3">
            <IdCard img={id1} title="Cobertura y cuidado">
              El isotipo abraza. Nuestro trabajo sostiene y ordena procesos que cuestan hacer solos.
            </IdCard>

            <IdCard img={id2} title="¿Qué significa LAEL?">
              Del hebreo “de Dios / perteneciente a Dios”. Inspiración para servir con integridad y respeto.
            </IdCard>

            <IdCard img={id3} title="La paloma">
              Inicio y esperanza. Acompañamos cambios reales, paso a paso.
            </IdCard>
          </div>
        </div>
      </section>

      {/* EVOLUCIÓN */}
      <section className="section">
        <div className="container">
          <h2 className="h">De Preu Lael a Instituto Lael</h2>
          <p className="sub">Más rutas, mismo corazón.</p>

          <div className="flow">
            <FlowItem title="Preu Lael">
              Orden para PAES con plan simple, ensayos y tutoreo.
            </FlowItem>
            <FlowArrow />
            <FlowItem title="Expansión">
              Sumamos Idiomas y LSCh, grabaciones y cápsulas.
            </FlowItem>
            <FlowArrow />
            <FlowItem title="Instituto Lael">
              Trayectorias por competencias para personas y empresas.
            </FlowItem>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="section soft">
        <div className="container">
          <h2 className="h">Principios de trabajo</h2>
          <p className="sub">Claridad, seguimiento y resultados. Lo demás estorba.</p>

          <div className="pillGrid">
            <Pill title="Acompañamiento" text="Estás acompañado/a en todo el proceso." />
            <Pill title="Accesibilidad"   text="Calidad con precios justos." />
            <Pill title="Respeto"          text="Sin elitismos; cada persona importa." />
            <Pill title="Propósito"        text="Hacemos bien las cosas, de verdad." />
            <Pill title="Métricas"         text="Metas y ajustes a tiempo." />
            <Pill title="Comunidad"        text="Celebramos avances y sostenemos el ritmo." />
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="section">
        <div className="container">
          <h2 className="h">Cómo trabajamos</h2>
          <div className="steps">
            <Step n="1" t="Diagnóstico">Punto de partida, brechas y meta realista.</Step>
            <Step n="2" t="Plan semanal">Clases en vivo + cápsulas y ritmo claro.</Step>
            <Step n="3" t="Seguimiento">Checkpoints, WhatsApp y feedback útil.</Step>
            <Step n="4" t="Resultados">Ensayos y ajustes a tiempo. Nada al azar.</Step>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section last soft">
        <div className="container">
          <div className="cta-panel">
            <h3 className="cta-title">¿Te sumas?</h3>
            <p className="cta-sub">Educación real, con propósito y acompañamiento.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-ghost" to="/paes">Ver programas</Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function FeatureCard({ img, title, children }) {
  return (
    <article className="feature card">
      <figure className="feature__media">
        {/* JAMÁS se recorta: usamos object-fit: cover; y aspect-ratio fija */}
        <img src={img} alt={title} loading="lazy" decoding="async" />
      </figure>
      <div className="pad">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function IdCard({ img, title, children }) {
  return (
    <article className="idcard card">
      <div className="idcard__media">
        {/* Contain + fondo neutro; nunca se corta ni se sale */}
        <img src={img} alt={title} loading="lazy" decoding="async" />
      </div>
      <div className="pad">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function FlowItem({ title, children }) {
  return (
    <div className="flow__item card">
      <div className="flow__title">{title}</div>
      <div className="flow__text">{children}</div>
    </div>
  );
}
function FlowArrow(){ return <div className="flow__arrow" aria-hidden>→</div>; }

function Pill({ title, text }) {
  return (
    <div className="pill card">
      <div className="pad">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Step({ n, t, children }) {
  return (
    <div className="step card">
      <div className="num" aria-hidden>{n}</div>
      <div className="content">
        <h4>{t}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

/* ---------- CSS embebido ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0b1220;
  --ink:#fff; --ink2:#eaf2ff;
  --bd:#1f2a44; --bd2:#22314f;
  --cta:#FACC15; --focus:#22d3ee;
  --shadow:0 18px 44px rgba(2,6,23,.35);
  --rad-lg:20px; --rad-md:14px;
}

*{box-sizing:border-box}
.about{background:var(--bg);color:var(--ink)}
.container{max-width:1160px;margin:0 auto;padding:0 20px}
.section{padding:56px 0;position:relative}
.section.soft{
  background:
    radial-gradient(900px 280px at 8% -8%, rgba(59,84,157,.14), transparent 60%),
    radial-gradient(900px 240px at 92% -10%, rgba(36,149,84,.12), transparent 60%);
  border-block:1px solid #16213c99;
}
.section.last{padding-bottom:96px}
.h{margin:0 0 8px;font-size:1.7rem;color:var(--ink)}
.sub{margin:0 0 18px;color:var(--ink2)}

.btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:.8rem 1.1rem;border-radius:12px;border:1px solid #2f3341;
  text-decoration:none;font-weight:900;transition:.18s ease;
}
.btn:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
.btn-primary{background:var(--cta);color:#111;border-color:#d9b812;box-shadow:0 10px 28px rgba(250,204,21,.28)}
.btn-primary:hover{transform:translateY(-1px)}
.btn-ghost{color:var(--ink);background:transparent}
.chips{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 0;padding:0;list-style:none}
.chips li{border:1px solid #2a375c;border-radius:999px;padding:.44rem .7rem;background:#0d162d;color:var(--ink2)}

/* HERO */
.hero{
  background-size:cover;background-position:center;
  color:#fff;padding:78px 0 86px;border-bottom:1px solid #16213c99;
}
.hero__inner{display:grid;grid-template-columns:1fr;gap:18px}
.kicker{color:#c7d2fe;font-weight:800;letter-spacing:.3px}
.title{margin:.2rem 0 .35rem;font-size:clamp(2.1rem,4vw,3rem);line-height:1.08}
.grad{background:linear-gradient(120deg,#3b549d,#d6a0c5);-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{color:var(--ink2);margin:10px 0 16px;line-height:1.55}
.cta{display:flex;gap:12px;flex-wrap:wrap}

/* TARJETAS: QUÉ OFRECEMOS */
.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media (max-width:980px){ .cards3{grid-template-columns:1fr} }

.card{
  border:1px solid var(--bd2);border-radius:var(--rad-lg);
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);color:var(--ink);
}
.pad{padding:16px}
.feature__media{aspect-ratio:16/9;border-bottom:1px solid #1b2748;background:#0b1220}
.feature__media img{width:100%;height:100%;object-fit:cover;display:block}
.card h3{margin:.25rem 0 .35rem}
.card p{margin:0;color:var(--ink2)}

/* IDENTIDAD: JAMÁS recorta; usa contain y centrado */
.id3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media (max-width:980px){ .id3{grid-template-columns:1fr} }
.idcard__media{
  width:100%;aspect-ratio:5/4;background:#0f172a;display:grid;place-items:center;
  border-bottom:1px solid #1b2748;padding:10px;
}
.idcard__media img{
  max-width:100%;max-height:100%;object-fit:contain;display:block;
  filter:drop-shadow(0 8px 16px rgba(16,24,40,.35));
}

/* EVOLUCIÓN */
.flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:12px;align-items:stretch;margin-top:8px}
@media (max-width:980px){ .flow{grid-template-columns:1fr} .flow__arrow{display:none}}
.flow__item{padding:16px}
.flow__title{font-weight:900;margin:0 0 6px}
.flow__text{color:var(--ink2)}
.flow__arrow{display:grid;place-items:center;color:var(--ink);font-weight:900}

/* PRINCIPIOS (píldoras) */
.pillGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media (max-width:980px){ .pillGrid{grid-template-columns:1fr 1fr} }
@media (max-width:640px){ .pillGrid{grid-template-columns:1fr} }
.pill{min-height:130px;display:flex;align-items:center;justify-content:center;text-align:center}
.pill h4{margin:.1rem 0 .25rem}
.pill p{margin:0;color:var(--ink2)}

/* STEPS */
.steps{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media (max-width:980px){ .steps{grid-template-columns:1fr} }
.step{display:grid;grid-template-columns:64px 1fr;gap:14px;align-items:flex-start;padding:16px}
.step .num{
  width:56px;height:56px;display:grid;place-items:center;border-radius:14px;background:#101a2f;border:1px solid #2a3b66;font-weight:900
}
.step h4{margin:.15rem 0 .25rem}
.step p{margin:0;color:var(--ink2)}

/* CTA */
.cta-panel{
  text-align:center;border:1px solid var(--bd2);border-radius:22px;padding:28px;color:var(--ink);
  background:
    radial-gradient(560px 240px at 18% -6%, rgba(59,84,157,.18), transparent 60%),
    radial-gradient(560px 240px at 82% -6%, rgba(36,149,84,.16), transparent 60%),
    linear-gradient(180deg,#0b1220,#101a2f);
  box-shadow:0 30px 60px rgba(2,6,23,.42);
}
.cta-title{margin:.1rem 0 .35rem;font-size:1.5rem}
.cta-sub{margin:0 0 12px;color:var(--ink2)}
.cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* Accesibilidad */
a:focus-visible,button:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
`;