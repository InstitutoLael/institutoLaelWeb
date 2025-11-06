// src/pages/Nosotros.jsx
import { Link } from "react-router-dom";

import id1 from "../assets/img/lael/1.png";
import id2 from "../assets/img/lael/2.png";
import id3 from "../assets/img/lael/3.png";
import logoAzul from "../assets/img/Logos/lael-inst-azul.png";
import imgHero from "../assets/img/lael/office-bg.jpg"; // misma imagen que Empresas para coherencia

export default function Nosotros() {
  return (
    <section className="about">
      <style>{css}</style>

      {/* HERO */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.85)), url(${imgHero})`,
        }}
      >
        <div className="container hero__content">
          <img src={logoAzul} alt="Instituto Lael" className="hero__logo" />

          <span className="kicker">Sobre nosotros</span>
          <h1>Instituto Lael</h1>

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

          {/* mini “features” como en Empresas */}
          <ul className="hero__chips" aria-label="Ventajas">
            <li className="chip">
              <b>Seguimiento</b>
              <span>Metas semanales</span>
            </li>
            <li className="chip">
              <b>Clases en vivo</b>
              <span>+ cápsulas</span>
            </li>
            <li className="chip">
              <b>KPIs</b>
              <span>Asistencia e hitos</span>
            </li>
          </ul>
        </div>
      </header>

      {/* QUÉ OFRECEMOS (3 tarjetas limpias) */}
      <section className="block container">
        <h2>Qué ofrecemos</h2>
        <div className="grid grid-3 benefits">
          <Benefit
            t="Servicio primero"
            d="Precios claros, trato digno y foco en lo importante."
          />
          <Benefit
            t="Acompañamiento real"
            d="Clases en vivo + cápsulas, plan semanal y feedback útil."
          />
          <Benefit
            t="Inclusión práctica"
            d="Programas LSCh con cultura humana y respetuosa."
          />
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="block container">
        <h2>Nuestra identidad</h2>
        <p className="muted center">
          Símbolos que nos recuerdan el para qué de lo que hacemos.
        </p>
        <div className="grid grid-3 id-grid">
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

      {/* HISTORIA / EVOLUCIÓN */}
      <section className="block container">
        <h2>De Preu Lael a Instituto Lael</h2>
        <p className="muted center">Más rutas, mismo corazón.</p>

        <div className="flow">
          <FlowItem title="Preu Lael">
            Orden para PAES con plan simple, ensayos y tutoreo.
          </FlowItem>
          <div className="arrow" aria-hidden>
            →
          </div>
          <FlowItem title="Expansión">
            Sumamos Idiomas y LSCh, grabaciones y cápsulas.
          </FlowItem>
          <div className="arrow" aria-hidden>
            →
          </div>
          <FlowItem title="Instituto Lael">
            Trayectorias por competencias y programas para personas y empresas.
          </FlowItem>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="block container">
        <h2>Principios de trabajo</h2>
        <p className="muted center">
          Claridad, seguimiento y resultados. Lo demás estorba.
        </p>

        <div className="grid grid-3 pills">
          <Pill t="Acompañamiento" d="Estás acompañado/a en todo el proceso." />
          <Pill t="Accesibilidad" d="Calidad con precios justos." />
          <Pill t="Respeto" d="Sin elitismos; cada persona importa." />
          <Pill t="Propósito" d="Hacemos bien las cosas, de verdad." />
          <Pill t="Métricas" d="Metas y ajustes a tiempo." />
          <Pill t="Comunidad" d="Celebramos avances y sostenemos el ritmo." />
        </div>
      </section>

      {/* CÓMO TRABAJAMOS (4 pasos) */}
      <section className="block container">
        <h2>Cómo trabajamos</h2>
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

      {/* CTA FINAL */}
      <section className="block container">
        <div className="cta-panel">
          <h3 className="cta-title">¿Te sumas?</h3>
          <p className="cta-sub">
            Postula hoy. Caminamos contigo el proceso completo.
          </p>
          <div className="cta-row">
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

/* ---------- subcomponentes pequeños ---------- */
function Benefit({ t, d }) {
  return (
    <div className="card benefit">
      <h3>{t}</h3>
      <p>{d}</p>
    </div>
  );
}
function IdCard({ img, t, s }) {
  return (
    <article className="card id-card">
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
function FlowItem({ title, children }) {
  return (
    <div className="card flow-item">
      <div className="flow-title">{title}</div>
      <div className="flow-text">{children}</div>
    </div>
  );
}
function Pill({ t, d }) {
  return (
    <div className="card pill">
      <h4>{t}</h4>
      <p>{d}</p>
    </div>
  );
}
function Step({ n, t, children }) {
  return (
    <div className="card step">
      <div className="num" aria-hidden>
        {n}
      </div>
      <div className="content">
        <h4>{t}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

/* ---------- CSS (alineado con Empresas) ---------- */
const css = `
:root{
  --bg:#0b1220;
  --ink:#ffffff;
  --ink2:#e3e9ff;
  --accent:#facc15;
  --accent-dark:#E0B90F;
  --accent-press:#C9A60E;
  --focus:#22d3ee;
  --bd:#1f2a44;
  --card:#101827;
}

.about{background:var(--bg);color:var(--ink);}
.container{max-width:1120px;margin:0 auto;padding:0 18px;}
.block{margin:56px 0;} /* más aire que antes */
h1,h2,h3,h4{margin:0 0 .4rem;color:#fff;}
.center{text-align:center;}
.muted{color:var(--ink2);opacity:.9;margin:4px 0 18px;}

/* HERO */
.hero{
  background-size:cover;background-position:center;
  padding:86px 0 96px;color:#fff;position:relative;
}
.hero__content{max-width:840px;}
.hero__logo{height:40px;margin-bottom:14px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35));}
.kicker{display:inline-block;color:#c7d2fe;font-weight:800;margin-bottom:8px;}
.hero h1{font-size:clamp(2.1rem,4vw,2.8rem);font-weight:900;margin-bottom:8px;}
.lead{max-width:70ch;color:var(--ink2);font-size:1.06rem;}
.cta-row{margin-top:18px;display:flex;gap:12px;flex-wrap:wrap;}

/* botones iguales a Empresas */
.btn{padding:.7rem 1.2rem;border-radius:12px;font-weight:850;text-decoration:none;cursor:pointer;
  border:2px solid transparent;transition:.18s transform ease,.18s box-shadow ease,.18s background ease,.18s border-color ease;
  display:inline-flex;align-items:center;justify-content:center;}
.btn:focus-visible{outline:3px solid var(--focus);outline-offset:2px;}
.btn-primary{background:var(--accent);color:#111;border-color:var(--accent-dark);box-shadow:0 8px 22px rgba(250,204,21,.28);}
.btn-primary:hover{background:var(--accent-dark);}
.btn-primary:active{background:var(--accent-press);transform:translateY(1px);box-shadow:none;}
.btn-ghost{border:1px solid var(--ink2);color:var(--ink2);background:transparent;}
.btn-ghost:hover{background:rgba(255,255,255,.08);}

/* chips del hero */
.hero__chips{list-style:none;padding:0;margin:22px 0 0;display:grid;gap:12px;grid-template-columns:repeat(3,1fr);max-width:840px;}
@media (max-width:860px){.hero__chips{grid-template-columns:1fr;}}
.chip{background:rgba(16,24,39,.6);border:1px solid var(--bd);border-radius:14px;padding:12px 14px;color:#fff;display:flex;justify-content:space-between;gap:10px;}
.chip b{font-weight:900}
.chip span{color:var(--ink2)}

/* Tarjetas base */
.card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:16px;color:#fff;}
.grid{display:grid;gap:18px;}
.grid-3{grid-template-columns:repeat(3,1fr);}
@media (max-width:980px){.grid-3{grid-template-columns:1fr;}}
.benefit p{color:var(--ink2);margin:0}

/* identidad */
.id-grid .id-card .media{aspect-ratio:16/10;display:grid;place-items:center;background:#0f172a;border-radius:12px;}
.id-grid .id-card img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(16,24,40,.45));}
.id-grid .id-card .body{padding:14px 2px 2px;}
.id-grid .id-card .body p{color:var(--ink2);}

/* flow (timeline) */
.flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:14px;align-items:stretch;}
@media (max-width:980px){.flow{grid-template-columns:1fr}.arrow{display:none}}
.flow-item .flow-title{font-weight:900;margin:0 0 6px;}
.flow-item .flow-text{color:var(--ink2);margin:0;}
.arrow{display:grid;place-items:center;font-weight:900;font-size:1.6rem;color:#fff;padding:0 6px;}

/* Principios (pills) */
.pills .pill{text-align:center;min-height:128px;display:flex;flex-direction:column;justify-content:center;gap:6px;}
.pills .pill p{color:var(--ink2);margin:0}

/* Steps */
.steps{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media (max-width:980px){.steps{grid-template-columns:1fr}}
.step{display:grid;grid-template-columns:64px 1fr;gap:14px;align-items:flex-start;}
.step .num{width:56px;height:56px;display:grid;place-items:center;border-radius:14px;background:#101a2f;border:1px solid var(--bd);font-weight:900;}
.step p{color:var(--ink2);margin:0}

/* CTA final */
.cta-panel{border-radius:20px;border:1px solid var(--bd);padding:24px;background:linear-gradient(180deg,#0f172a,#0b1220);}
.cta-title{margin:.1rem 0 .25rem;font-size:1.5rem;}
.cta-sub{margin:0 0 12px;color:var(--ink2);}

/* SEPARACIÓN EXTRA entre “Programas destacados” (otra página) y el estimador — aquí por simetría */
.block + .block{margin-top:64px;}

/* parche: más aire antes del primer bloque después del hero */
.hero + .block{margin-top:64px;}
`;