// src/pages/Nosotros.jsx
import { Link } from "react-router-dom";

// IMÁGENES (usa las que vi en tu carpeta)
import id1 from "../assets/img/lael/1.png";
import id2 from "../assets/img/lael/2.png";
import id3 from "../assets/img/lael/3.png";
import heroImg from "../assets/img/lael/onboarding.jpg"; // <- distinta al hero anterior
import cardA from "../assets/img/lael/hs.jpg";
import cardB from "../assets/img/lael/coaching.jpg";
import cardC from "../assets/img/lael/inclusion.jpg";

export default function Nosotros(){
  return (
    <section className="about">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero" style={{backgroundImage:`url(${heroImg})`}}>
        <div className="overlay" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="kicker">Sobre nosotros</span>
            <h1 className="title">
              Instituto <span className="grad">Lael</span>
            </h1>

            <p className="lead">
              Partimos como <strong>Preu Lael</strong> para ordenar el estudio PAES con acompañamiento real.
              Hoy, como <strong>Instituto Lael</strong>, sumamos <strong>Idiomas</strong> y <strong>LSCh</strong>.
              Mismo foco: claridad, seguimiento y respeto por las personas.
            </p>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-ghost" to="/paes">Ver programas</Link>
            </div>

            <div className="chips">
              <span className="chip">Seguimiento + metas semanales</span>
              <span className="chip">Clases en vivo + cápsulas</span>
              <span className="chip">KPIs: asistencia e hitos</span>
            </div>
          </div>
        </div>
      </header>

      {/* QUÉ OFRECEMOS */}
      <section className="section">
        <div className="container">
          <h2 className="h">Qué ofrecemos</h2>
          <p className="sub">Acompañamos con método y respeto. Enseñamos claro y <strong>medimos resultados</strong>.</p>

          <div className="cards3">
            <FeatureCard img={cardA} title="Servicio primero">
              Precios claros, trato digno y foco en lo importante.
            </FeatureCard>
            <FeatureCard img={cardB} title="Acompañamiento real">
              Clases en vivo + cápsulas, plan semanal y feedback útil.
            </FeatureCard>
            <FeatureCard img={cardC} title="Inclusión práctica">
              Programas LSCh con cultura humana y respetuosa.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* BANDA DE TRANSICIÓN (da profundidad) */}
      <div className="band" aria-hidden />

      {/* IDENTIDAD */}
      <section className="section">
        <div className="container">
          <h2 className="h">Nuestra identidad</h2>
          <p className="sub">Símbolos que nos recuerdan el para qué.</p>

          <div className="id-grid">
            <IdCard
              img={id1}
              t="Cobertura y cuidado"
              s="El isotipo abraza. Nuestro trabajo sostiene y ordena procesos que cuestan hacer solos."
            />
            <IdCard
              img={id2}
              t="¿Qué significa LAEL?"
              s='Del hebreo “de Dios / perteneciente a Dios”. Inspiración para servir con integridad y respeto.'
            />
            <IdCard
              img={id3}
              t="La paloma"
              s="Inicio y esperanza. Acompañamos cambios reales, paso a paso."
            />
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="section soft">
        <div className="container">
          <h2 className="h">De Preu Lael a Instituto Lael</h2>
          <p className="sub">Más rutas, mismo corazón.</p>

          <div className="flow" role="list" aria-label="Línea evolutiva">
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
      <section className="section">
        <div className="container">
          <h2 className="h">Principios de trabajo</h2>
          <p className="sub">Claridad, seguimiento y resultados. Lo demás estorba.</p>

          <div className="pill-grid">
            <Pill title="Acompañamiento" text="Estás acompañado/a en todo el proceso." />
            <Pill title="Accesibilidad" text="Calidad con precios justos." />
            <Pill title="Respeto" text="Sin elitismos; cada persona importa." />
            <Pill title="Propósito" text="Hacemos bien las cosas, de verdad." />
            <Pill title="Métricas" text="Metas y ajustes a tiempo." />
            <Pill title="Comunidad" text="Celebramos avances y sostenemos el ritmo." />
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
      <section className="section last">
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
function FeatureCard({ img, title, children }){
  return (
    <article className="feature card">
      <div className="media"><img src={img} alt={title} loading="lazy" decoding="async" /></div>
      <div className="content">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}
function IdCard({ img, t, s }){
  return (
    <article className="id card">
      <div className="media">
        <img src={img} alt={t} loading="lazy" decoding="async" />
      </div>
      <div className="body">
        <h3>{t}</h3>
        <p>{s}</p>
      </div>
    </article>
  );
}
function FlowItem({ title, children }){
  return (
    <div className="flow-item card" role="listitem">
      <div className="flow-title">{title}</div>
      <div className="flow-text">{children}</div>
    </div>
  );
}
function FlowArrow(){ return <div className="flow-arrow" aria-hidden>→</div>; }
function Pill({ title, text }){
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

/* ---------- CSS ---------- */
const css = `
:root{
  --blue:#3b549d; --green:#249554; --yellow:#f2ce3d; --rose:#d6a0c5; --orange:#cd5732;
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --ink2:#eaf2ff; --muted:#cbd5e1;
  --rad-lg:20px; --rad-md:14px;
  --shadow:0 24px 48px rgba(2,6,23,.35);
}
*{box-sizing:border-box}
.container{ max-width:1160px; margin:0 auto; padding:0 20px; }
.section{ padding:56px 0; position:relative; }
.section.soft{ background:linear-gradient(180deg,#0d1424 0%, #0b1220 100%); }
.section.last{ padding:56px 0 96px }
h1,h2,h3,h4{ color:var(--ink) }

/* HERO limpio y sin barra infinita */
.about .hero{
  position:relative; padding:78px 0 52px;
  background-size:cover; background-position:center;
  border-bottom:1px solid #1a2440;
}
.about .hero .overlay{
  position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(6,10,22,.60) 0%, rgba(6,10,22,.78) 52%, rgba(6,10,22,.92) 100%);
  pointer-events:none;
}
.hero__inner{ position:relative; }
.kicker{ color:#c7d2fe; font-weight:800; letter-spacing:.3px; }
.title{ margin:.2rem 0 .3rem; font-size:clamp(2.2rem, 4vw, 3rem); line-height:1.08; }
.grad{ background: linear-gradient(120deg,var(--blue),var(--rose)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lead{ color:var(--ink2); margin:12px 0 16px; line-height:1.6; max-width:60ch }

.btn{ display:inline-flex; align-items:center; gap:8px; padding:.78rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900 }
.btn-primary{ background:var(--yellow); color:#111; border-color:#CFAF28; box-shadow:0 8px 22px rgba(250,204,21,.28);}
.btn-primary:hover{ filter:brightness(.97) }
.btn-ghost{ color:#ffffff; background:transparent }

.cta{ display:flex; gap:12px; flex-wrap:wrap; }
.chips{ display:flex; gap:10px; flex-wrap:wrap; margin-top:10px }
.chip{
  display:inline-flex; align-items:center; gap:6px; font-weight:700;
  border:1px solid #2b3656; color:#dbe7ff; background:rgba(6,10,22,.32);
  padding:.42rem .7rem; border-radius:999px;
}

/* Cards 3 */
.cards3{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:14px }
@media (max-width:980px){ .cards3{ grid-template-columns:1fr } }
.card{
  border:1px solid #243153; border-radius:var(--rad-lg);
  background: radial-gradient(540px 200px at -10% -8%, rgba(255,255,255,.04), transparent 60%), linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);
  color:var(--ink);
}
.feature .media{ aspect-ratio:16/9; overflow:hidden; border-bottom:1px solid #1f2a44 }
.feature .media img{ width:100%; height:100%; object-fit:cover; display:block; }
.feature .content{ padding:16px 16px 18px }
.feature h3{ margin:.2rem 0 .35rem; }

/* Banda de transición */
.band{
  height:56px; width:100%;
  background:
    radial-gradient(900px 240px at 10% -20%, color-mix(in srgb, var(--blue) 16%, transparent), transparent 60%),
    radial-gradient(900px 240px at 90% -20%, color-mix(in srgb, var(--green) 12%, transparent), transparent 60%),
    linear-gradient(180deg,#0b1220 0%, #0d162b 100%);
  border-top:1px solid #16203c; border-bottom:1px solid #16203c;
  margin:14px 0 0;
}

/* Identidad (FIX: no corta imágenes) */
.id-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:18px }
@media (max-width:980px){ .id-grid{ grid-template-columns:1fr } }
.id .media{ aspect-ratio:4/3; display:grid; place-items:center; padding:10px; }
.id .media img{ max-width:100%; max-height:100%; object-fit:contain; }
.id .body{ padding:16px }
.id .body h3{ margin:.2rem 0 .35rem }

/* Flow */
.flow{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:12px; align-items:stretch; margin-top:16px }
@media (max-width:980px){ .flow{ grid-template-columns:1fr } .flow-arrow{ display:none } }
.flow-item{ padding:16px }
.flow-title{ font-weight:800; margin:0 0 6px }
.flow-text{ margin:0; line-height:1.55; }
.flow-arrow{ display:grid; place-items:center; font-weight:900; font-size:1.6rem; color:var(--ink); padding:0 6px }

/* Pill grid */
.pill-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:16px }
@media (max-width:980px){ .pill-grid{ grid-template-columns:1fr 1fr } }
@media (max-width:640px){ .pill-grid{ grid-template-columns:1fr } }
.pill{ min-height:120px; display:flex; align-items:center; justify-content:center; text-align:center }
.pill .pad{ padding:14px 14px 16px; width:100%; max-width:520px; margin:0 auto; }
.pill h4{ margin:.06rem 0 .25rem }
.pill p{ margin:0 }

/* Steps */
.steps{ margin-top:18px; display:grid; grid-template-columns:1fr 1fr; gap:16px }
@media (max-width:980px){ .steps{ grid-template-columns:1fr } }
.step{ display:grid; grid-template-columns:64px 1fr; gap:14px; align-items:flex-start; padding:16px }
.step .num{
  width:56px; height:56px; display:grid; place-items:center; border-radius:14px;
  background:#101a2f; border:1px solid #2a3b66; font-weight:900; font-size:1.1rem; color:var(--ink);
}

/* CTA final con “glow” */
.cta-panel{
  text-align:center; border:1px solid #22314f; border-radius:22px; padding:28px; color:var(--ink);
  background:
    radial-gradient(560px 260px at 14% -8%, color-mix(in srgb, var(--blue) 24%, transparent), transparent 60%),
    radial-gradient(560px 260px at 86% -8%, color-mix(in srgb, var(--green) 20%, transparent), transparent 60%),
    linear-gradient(180deg,#0b1220,#101a2f);
  box-shadow:0 30px 60px rgba(2,6,23,.42);
}
.cta-title{ margin:.1rem 0 .35rem; font-size:1.5rem; }
.cta-sub{ margin:0 0 12px; color:var(--ink2); }
.cta-actions{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

/* Accesibilidad foco */
button:focus-visible, .btn:focus-visible, a:focus-visible, select:focus-visible{
  outline:2px solid var(--yellow); outline-offset:2px;
}
`;