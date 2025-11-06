// src/pages/Nosotros.jsx
import { Link } from "react-router-dom";

// IMÁGENES DEL REPO (las que me mostraste en VS Code)
import heroBg from "../assets/img/lael/study-online.jpg";
import imgOnboarding from "../assets/img/lael/onboarding.jpg";
import imgInclusion from "../assets/img/lael/inclusion.jpg";
import imgHS from "../assets/img/lael/hs.jpg";
import id1 from "../assets/img/lael/1.png";
import id2 from "../assets/img/lael/2.png";
import id3 from "../assets/img/lael/3.png";

export default function Nosotros() {
  return (
    <section className="about">
      <style>{css}</style>

      {/* HERO (alineado a Empresas) */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.85)), url(${heroBg})`,
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

            <div className="cta-row">
              <Link className="btn btn-primary" to="/inscripcion">
                Inscribirme
              </Link>
              <Link className="btn btn-ghost" to="/paes">
                Ver programas
              </Link>
            </div>

            {/* chips (con texto limpio y espaciado) */}
            <ul className="chips" aria-label="Puntos clave de nuestro modelo">
              <li>Seguimiento + metas semanales</li>
              <li>Clases en vivo + cápsulas</li>
              <li>KPIs: asistencia y hitos</li>
            </ul>
          </div>
        </div>
      </header>

      {/* PROPÓSITO / QUÉ OFRECEMOS (3 pilares con fotos reales) */}
      <section className="block container">
        <h2 className="h">Qué ofrecemos</h2>
        <p className="sub">
          Acompañamos con método y respeto. Enseñamos claro y{" "}
          <b>medimos resultados</b>.
        </p>

        <div className="pillars">
          <Pillar
            img={imgOnboarding}
            t="Servicio primero"
            s="Precios claros, trato digno y foco en lo importante."
          />
          <Pillar
            img={imgHS}
            t="Acompañamiento real"
            s="Clases en vivo + cápsulas, plan semanal y feedback útil."
          />
          <Pillar
            img={imgInclusion}
            t="Inclusión práctica"
            s="Programas de LSCh con cultura humana y respetuosa."
          />
        </div>
      </section>

      {/* IDENTIDAD (símbolos cortitos) */}
      <section className="block container">
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
      </section>

      {/* HISTORIA (timeline simple, responsivo) */}
      <section className="block container">
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
            Trayectorias por competencias y programas para personas y empresas.
          </FlowItem>
        </div>
      </section>

      {/* PRINCIPIOS (tarjetas compactas, 2 filas) */}
      <section className="block container">
        <h2 className="h">Principios de trabajo</h2>
        <p className="sub">Claridad, seguimiento y resultados.</p>

        <div className="principles">
          <Pill title="Acompañamiento" text="Estás acompañado/a en todo el proceso." />
          <Pill title="Accesibilidad" text="Calidad con precios justos." />
          <Pill title="Respeto" text="Sin elitismos; cada persona importa." />
          <Pill title="Propósito" text="Hacemos bien las cosas, de verdad." />
          <Pill title="Métricas" text="Metas y ajustes a tiempo." />
          <Pill title="Comunidad" text="Celebramos avances y sostenemos el ritmo." />
        </div>
      </section>

      {/* CÓMO TRABAJAMOS (4 pasos) */}
      <section className="block container">
        <h2 className="h">Cómo trabajamos</h2>
        <div className="steps">
          <Step n="1" t="Diagnóstico">
            Punto de partida, brechas y meta realista.
          </Step>
          <Step n="2" t="Plan semanal">
            Clases en vivo + cápsulas y ritmo claro.
          </Step>
          <Step n="3" t="Seguimiento">
            Checkpoints, WhatsApp y feedback útil.
          </Step>
          <Step n="4" t="Resultados">
            Ensayos y ajustes a tiempo. Nada al azar.
          </Step>
        </div>
      </section>

      {/* CTA FINAL (misma familia de Empresas) */}
      <section className="block container last">
        <div className="cta-panel">
          <h3 className="cta-title">¿Te sumas?</h3>
          <p className="cta-sub">
            Educación real, con propósito y acompañamiento.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" to="/inscripcion">
              Inscribirme
            </Link>
            <Link className="btn btn-ghost" to="/paes">
              Ver programas
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function Pillar({ img, t, s }) {
  return (
    <article className="pillar card">
      <div className="p-media">
        <img src={img} alt="" loading="lazy" />
      </div>
      <div className="pad">
        <h3>{t}</h3>
        <p>{s}</p>
      </div>
    </article>
  );
}

function IdCard({ img, t, s }) {
  return (
    <article className="id card">
      <div className="id-media">
        <img src={img} alt={t} loading="lazy" />
      </div>
      <div className="id-body">
        <h4>{t}</h4>
        <p>{s}</p>
      </div>
    </article>
  );
}

function FlowItem({ title, children }) {
  return (
    <div className="flow-item card">
      <div className="flow-title">{title}</div>
      <div className="flow-text">{children}</div>
    </div>
  );
}
function FlowArrow() {
  return <div className="flow-arrow" aria-hidden>→</div>;
}

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

/* ---------- CSS (mismo sistema visual que Empresas) ---------- */
const css = `
:root{
  --bg:#0b1220;
  --panel:#0f172a;
  --card:#101827;
  --bd:#1f2a44;
  --ink:#ffffff;
  --ink2:#e3e9ff;
  --accent:#facc15;
  --accent-dark:#E0B90F;
  --accent-press:#C9A60E;
  --focus:#22d3ee;
}

.about{background:var(--bg);color:var(--ink);}
.container{max-width:1120px;margin:0 auto;padding:0 18px;}
.block{margin:48px 0;}
.h{margin:0 0 8px;font-size:1.7rem;color:var(--ink)}
.sub{margin:0 0 16px;color:var(--ink2)}

/* HERO */
.hero{
  background-size:cover;
  background-position:center;
  color:#fff;
  padding:76px 0 52px;
  border-bottom:1px solid #1a2440;
}
.hero__inner{display:grid;grid-template-columns:1fr;gap:18px}
.kicker{color:#c7d2fe;font-weight:800}
.title{margin:.2rem 0 .3rem;font-size:clamp(2.2rem,4vw,3rem);line-height:1.08}
.lead{color:var(--ink2);max-width:62ch}
.cta-row{margin-top:14px;display:flex;gap:12px;flex-wrap:wrap}
.btn{padding:.75rem 1.15rem;border-radius:12px;border:2px solid transparent;
     text-decoration:none;font-weight:850;display:inline-flex;align-items:center;justify-content:center}
.btn:focus-visible{outline:3px solid var(--focus);outline-offset:2px;}
.btn-primary{background:var(--accent);color:#111;border-color:var(--accent-dark);box-shadow:0 8px 22px rgba(250,204,21,.28)}
.btn-primary:hover{background:var(--accent-dark)}
.btn-primary:active{background:var(--accent-press);transform:translateY(1px);box-shadow:none}
.btn-ghost{border:1px solid var(--ink2);color:var(--ink2);background:transparent}
.btn-ghost:hover{background:rgba(255,255,255,.08)}

/* chips */
.chips{margin:14px 0 0;padding:0;list-style:none;display:flex;gap:10px;flex-wrap:wrap}
.chips li{border:1px solid #2b3656;border-radius:999px;padding:.42rem .7rem;font-weight:700;background:rgba(0,0,0,.25);color:#eaf2ff}

/* Tarjeta base */
.card{
  border:1px solid #243153;border-radius:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 20px 42px rgba(2,6,23,.35);color:var(--ink)
}
.pad{padding:16px}

/* Pilares */
.pillars{display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
@media (max-width:980px){.pillars{grid-template-columns:1fr}}
.pillar .p-media{aspect-ratio:16/9;overflow:hidden;border-top-left-radius:16px;border-top-right-radius:16px}
.pillar .p-media img{width:100%;height:100%;object-fit:cover;display:block}

/* Identidad */
.id-grid{display:grid;gap:16px;grid-template-columns:repeat(3,1fr);margin-top:10px}
@media (max-width:980px){.id-grid{grid-template-columns:1fr}}
.id-media{aspect-ratio:4/3;display:grid;place-items:center;background:#0b1220;border-bottom:1px solid #22314f;border-top-left-radius:16px;border-top-right-radius:16px;overflow:hidden}
.id-media img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(16,24,40,.45))}
.id-body{padding:14px}
.id-body h4{margin:.1rem 0 .35rem}

/* Historia (flow) */
.flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:12px;align-items:stretch}
@media (max-width:980px){.flow{grid-template-columns:1fr}.flow-arrow{display:none}}
.flow-item{padding:16px}
.flow-title{font-weight:900;margin:0 0 6px}
.flow-text{margin:0;color:var(--ink2)}
.flow-arrow{display:grid;place-items:center;color:var(--ink2);font-weight:900}

/* Principios */
.principles{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media (max-width:980px){.principles{grid-template-columns:1fr 1fr}}
@media (max-width:640px){.principles{grid-template-columns:1fr}}
.pill h4{margin:.1rem 0 .3rem}
.pill p{margin:0;color:var(--ink2)}

/* Steps */
.steps{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media (max-width:980px){.steps{grid-template-columns:1fr}}
.step{display:grid;grid-template-columns:64px 1fr;gap:14px;align-items:flex-start;padding:16px}
.step .num{width:56px;height:56px;display:grid;place-items:center;border-radius:14px;background:#101a2f;border:1px solid #2a3b66;font-weight:900}
.step h4{margin:.12rem 0 .25rem}
.step p{margin:0;color:var(--ink2)}

/* CTA final */
.last{margin-bottom:72px}
.cta-panel{
  text-align:center;border:1px solid #22314f;border-radius:20px;padding:26px;
  background:radial-gradient(560px 260px at 14% -8%, rgba(59,84,157,.24), transparent 60%),
             radial-gradient(560px 260px at 86% -8%, rgba(36,149,84,.20), transparent 60%),
             linear-gradient(180deg,#0b1220,#101a2f)
}
.cta-title{margin:.1rem 0 .35rem;font-size:1.5rem}
.cta-sub{margin:0 0 12px;color:var(--ink2)}
.cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* Parche de aire como pediste (separación visual entre bloques) */
.block + .block{margin-top:64px}
.hero + .block{margin-top:64px}
`;