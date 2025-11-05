// src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PartnersMarquee from "../components/PartnersMarquee.jsx";

// Imágenes identidad
import id1 from "../assets/img/lael/1.png";
import id3 from "../assets/img/lael/3.png";

/* --- util: extraer ID de YouTube desde cualquier URL --- */
function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    // /embed/ID
    const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{6,})/);
    return m ? m[1] : "";
  } catch {
    return "";
  }
}

/* --- componente de video responsivo --- */
function YouTubeBox({
  url = "https://youtu.be/THBr7MOVS0s?si=nODyq69xbCt1TqRr",
  title = "Clase real: PAES M1 (ejercitación guiada)",
}) {
  const id = extractYouTubeId(url);
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  return (
    <div className="video-wrapper" aria-label={title}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function Home() {
  // Entrada suave de secciones
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home">
      <style>{css}</style>

      {/* HERO — limpio con preview a la derecha */}
      <section className="hero reveal">
        <div className="container hero__wrap">
          <div className="hero__col">
            <p className="kicker">Educación online, cercana y clara</p>
            <h1 className="title">
              PAES, <span className="grad g2">Idiomas</span> y{" "}
              <span className="grad g3">LSCh</span> con{" "}
              <span className="underline">acompañamiento real</span>.
            </h1>
            <p className="lead">
              Clases en vivo + cápsulas, material descargable y seguimiento.{" "}
              <strong>87%</strong> logra su objetivo y <strong>9 de 10</strong> nos recomiendan.
            </p>
            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-ghost" to="/paes">Ver programas</Link>
              <a
                className="btn btn-link"
                href="https://wa.me/56964626568?text=Hola%20Lael,%20quisiera%20informaci%C3%B3n"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="chips">
              <Chip to="/paes" label="PAES Matemáticas M1" />
              <Chip to="/idiomas" label="Inglés B1–B2" />
              <Chip to="/lsch" label="Lengua de Señas (LSCh)" />
            </div>
          </div>

          {/* DERECHA: video + accesos rápidos */}
          <div className="hero__media">
            <YouTubeBox url="https://youtu.be/THBr7MOVS0s?si=nODyq69xbCt1TqRr" />
            <ul className="hero__quicklinks" aria-label="Accesos directos">
              <li><Link to="/paes" className="qk">PAES</Link></li>
              <li><Link to="/idiomas" className="qk">Idiomas</Link></li>
              <li><Link to="/lsch" className="qk">LSCh</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee reveal">
        <div className="container marquee__wrap">
          <PartnersMarquee speed={32} height={28} gap={48} />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust reveal">
        <div className="container trust__row">
          <TrustPill kpi="87%" label="alcanza su meta" />
          <TrustPill kpi="+11.000 h" label="clases en vivo" />
          <TrustPill kpi="9/10" label="nos recomiendan" />
        </div>
      </section>

      {/* PROGRAMAS */}
      <section className="programs reveal">
        <div className="container">
          <header className="pg-head">
            <h2>Programas Lael</h2>
            <p>Elige tu camino y avanza con acompañamiento real.</p>
          </header>

          <div className="pg-grid">
            <ProgramCard
              title="PAES"
              tag="Ingreso a la U"
              text="Planifica ramos o toma un plan con ensayos y tutorías."
              bullets={["M1, M2, Lenguaje, Historia, Ciencias", "Ensayos + retro detallada"]}
              to="/paes"
              accent="indigo"
            />
            <ProgramCard
              title="Idiomas"
              tag="EN · KR"
              text="Aprende Inglés (B1–B2) o Coreano TOPIK I con práctica real."
              bullets={["Cápsulas + clases en vivo", "Club de conversación"]}
              to="/idiomas"
              accent="green"
            />
            <ProgramCard
              title="LSCh"
              tag="Lengua de Señas"
              text="Proceso práctico y comunicativo, con proyecto final."
              bullets={["Inicio trimestral", "Acompañamiento docente"]}
              to="/lsch"
              accent="rose"
            />
          </div>

          <div className="pg-foot">
            <Link to="/empresas" className="link-inline">Capacitación para empresas →</Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights reveal">
        <div className="container grid-4">
          <Feature icon="📈" title="Acompañamiento medible">Tutorías y reportes simples.</Feature>
          <Feature icon="🧠" title="Clases claras">En vivo + cápsulas con pautas.</Feature>
          <Feature icon="⏱️" title="Flexibilidad real">Grabadas y recuperaciones.</Feature>
          <Feature icon="💳" title="Precio transparente">Matrícula única, sin letra chica.</Feature>
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="identity reveal">
        <div className="container">
          <header className="id-head">
            <span className="pill">Quiénes somos</span>
            <h2>La identidad detrás de nuestro nombre</h2>
          </header>
          <div className="id-grid">
            <IdCard img={id1} title="Cobertura y propósito" text="Estudiar sin estar solos, guiados y con propósito." />
            <IdCard img={id3} title="La paloma" text="Símbolo de comienzos genuinos y esperanza." />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testi reveal">
        <div className="container testi__grid">
          <Quote q="Subí 150 puntos en la PAES. Clases claras y apoyo constante." a="Vicente — M1" />
          <Quote q="Perdí el miedo a hablar inglés. Hoy me expreso con confianza en el trabajo." a="Valentina — Inglés B2" />
        </div>
      </section>

      {/* FAQ */}
      <section className="faq reveal">
        <div className="container">
          <h3 className="faq__title">Preguntas frecuentes</h3>
          <details>
            <summary><span>Si falto a una clase…</span></summary>
            <p>Queda grabada y tienes cápsulas/material. También tutoría si la necesitas.</p>
          </details>
          <details>
            <summary><span>¿Ensayos y feedback?</span></summary>
            <p>Sí. Ensayos con retro detallada y pautas, según plan.</p>
          </details>
          <details>
            <summary><span>¿Puedo cambiar de plan?</span></summary>
            <p>Sí, ajustamos tu plan y ramos según tu avance y tiempos.</p>
          </details>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final reveal">
        <div className="container">
          <div className="cta-final__box">
            <h3>¿Listo para empezar?</h3>
            <p>Inscríbete en minutos y comienza con clases en vivo, cápsulas y acompañamiento.</p>
            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href="https://wa.me/56964626568?text=Hola%20Lael%20👋%20¿me%20orientan%20para%20elegir%20mi%20plan?"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <p className="tiny">Respondemos de lunes a viernes. Todas las clases quedan grabadas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Atoms ---------- */
function Chip({ to, label }) {
  return (
    <Link to={to} className="chip">
      <span className="dot" /> {label}
    </Link>
  );
}
function Feature({ icon, title, children }) {
  return (
    <article className="feat">
      <div className="ico">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
function ProgramCard({ title, tag, text, bullets = [], to, accent = "indigo" }) {
  const acc =
    accent === "green" ? "acc-green" :
    accent === "rose"  ? "acc-rose"  :
    "acc-indigo";

  return (
    <article className={`p-card ${acc}`}>
      <div className="p-bar" aria-hidden />
      <div className="p-head">
        {tag && <div className="p-tag">{tag}</div>}
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ul className="p-list">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <Link className="btn-more" to={to}>Ver más</Link>
    </article>
  );
}
function Quote({ q, a }) {
  return (
    <blockquote className="quote">
      <p>“{q}”</p>
      <footer>— {a}</footer>
    </blockquote>
  );
}
function IdCard({ img, title, text }) {
  return (
    <article className="id-card">
      <div className="id-media">
        <img src={img} alt={title} loading="lazy" decoding="async" />
      </div>
      <div className="id-body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
function TrustPill({ kpi, label }) {
  return (
    <div className="tpill">
      <div className="tpill__kpi">{kpi}</div>
      <div className="tpill__label">{label}</div>
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220;
  --card:#0e1424;
  --bd:#1f2a44;
  --text:#ffffff;
  --muted:#cfe0ff;
  --indigo:#3b549d;   /* lael primary */
  --green:#249554;    /* lael secondary */
  --rose:#d6a0c5;
  --amber:#f2ce3d;
}

*{box-sizing:border-box}
body, .home{background:linear-gradient(180deg,var(--bg),var(--card)); color:var(--text);}
.container{max-width:1120px; margin:0 auto; padding:0 22px}
section { scroll-margin-top: 84px; }

/* HERO */
.hero{padding:72px 0 36px; border-bottom:1px solid var(--bd)}
.hero__wrap{display:grid; grid-template-columns:1.1fr .9fr; gap:44px; align-items:center}
@media (max-width:980px){.hero__wrap{grid-template-columns:1fr; gap:28px}}
.kicker{color:#f1e9b3; font-weight:900; letter-spacing:.2px; margin:0 0 12px}
.title{margin:.2rem 0 1rem; font-size:clamp(2.1rem,3.8vw,3rem); line-height:1.12}
.underline{box-shadow:inset 0 -10px rgba(59,84,157,.28); border-radius:4px}
.grad{background:linear-gradient(120deg,#A5B4FC,#22d3ee); -webkit-background-clip:text; background-clip:text; color:transparent}
.g2{background:linear-gradient(120deg,var(--green),#a78bfa); -webkit-background-clip:text; background-clip:text; color:transparent}
.g3{background:linear-gradient(120deg,var(--amber),#cd5732); -webkit-background-clip:text; background-clip:text; color:transparent}
.lead{color:#eaf2ff; max-width:62ch}
.cta{display:flex; flex-wrap:wrap; gap:12px; margin:18px 0 14px}
.btn{display:inline-flex; align-items:center; gap:8px; padding:.7rem 1rem; border-radius:12px; border:1px solid transparent; text-decoration:none; font-weight:700}
.btn-primary{background:var(--indigo); color:#fff; border-color:var(--indigo)}
.btn-ghost{background:transparent; color:#eaf2ff; border-color:#2f3341}
.btn-link{background:transparent; color:#eaf2ff; text-decoration:underline; text-underline-offset:3px}
.btn:focus-visible{outline:2px solid var(--amber); outline-offset:2px}
.chips{display:flex; flex-wrap:wrap; gap:10px; margin-top:10px}
.chip{display:inline-flex; align-items:center; gap:8px; padding:.48rem .76rem; border-radius:999px; border:1px solid var(--bd); background:#0d1528; color:#fff; text-decoration:none; font-weight:600}
.chip .dot{width:8px; height:8px; border-radius:50%; background:var(--amber)}

.hero__media{display:flex; flex-direction:column; gap:10px}
.hero__quicklinks{list-style:none; margin:0; padding:0; display:flex; gap:10px; flex-wrap:wrap;}
.qk{display:inline-flex; align-items:center; padding:.44rem .7rem; border-radius:999px; border:1px solid var(--bd); background:#0f172a; color:#fff; text-decoration:none; font-weight:700;}
.qk:hover{ border-color:#2c3b65 }

/* Video responsivo */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--bd);
  box-shadow: 0 18px 36px rgba(2,6,23,.26);
  background:#0f172a;
}
.video-wrapper iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%; border: 0; border-radius: 18px;
}

/* Marquee */
.marquee{padding:18px 0}
.marquee__wrap{
  position:relative; border-top:1px solid var(--bd); border-bottom:1px solid var(--bd);
  padding:10px 0; overflow:hidden;
  mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
}
.marquee__wrap img{ filter:grayscale(1) opacity(.72); transition:filter .2s ease, opacity .2s ease; }
.marquee__wrap img:hover{ filter:none; opacity:1; }

/* TRUST BAR */
.trust{ padding:22px 0 8px; }
.trust__row{ display:grid; gap:12px; grid-template-columns: repeat(3,1fr); }
@media (max-width:780px){ .trust__row{ grid-template-columns:1fr; } }
.tpill{
  border:1px solid var(--bd); border-radius:14px;
  background:linear-gradient(180deg,var(--card),#0d1528);
  padding:12px 14px; display:flex; align-items:baseline; gap:10px;
}
.tpill__kpi{ font-weight:1000; font-size:1.2rem; letter-spacing:.3px }
.tpill__label{ color:#eaf2ff }

/* PROGRAMAS */
.programs{padding:44px 0}
.pg-head h2{margin:0 0 6px}
.pg-head p{margin:0 0 16px; color:#eaf2ff}
.pg-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px}
@media (max-width:980px){.pg-grid{grid-template-columns:1fr}}
.p-card{position:relative; border:1px solid #e5e7eb; border-radius:16px; background:#fff; color:#0b1220; padding:16px}
.p-bar{position:absolute; inset:0 0 auto 0; height:6px; border-radius:16px 16px 0 0; background:var(--indigo)}
.p-tag{display:inline-block; font-size:.75rem; font-weight:900; border:1px solid #e5e7eb; color:#0b1220; background:#fff; padding:.16rem .52rem; border-radius:999px}
.p-head h3{margin:.45rem 0 .22rem; font-size:1.08rem}
.p-head p{margin:0; color:#334155}
.p-list{margin:12px 0 14px; padding:0; list-style:none}
.p-list li{position:relative; margin:6px 0; padding-left:18px}
.p-list li::before{content:""; position:absolute; left:0; top:.5rem; width:10px; height:10px; border-radius:50%; background:var(--indigo)}
.btn-more{display:inline-flex; align-items:center; justify-content:center; padding:.58rem .9rem; border-radius:12px; text-decoration:none; border:2px solid #0b1220; color:#0b1220; font-weight:900}
.acc-green .p-bar, .acc-green .p-list li::before{background:var(--green)}
.acc-rose .p-bar, .acc-rose .p-list li::before{background:var(--rose)}
.acc-indigo .p-bar, .acc-indigo .p-list li::before{background:var(--indigo)}
.pg-foot{margin-top:10px}
.link-inline{color:#eaf2ff; text-decoration:underline; text-underline-offset:3px}

/* Highlights */
.highlights{padding:40px 0}
.grid-4{display:grid; grid-template-columns:repeat(4,1fr); gap:14px}
@media (max-width:980px){.grid-4{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.grid-4{grid-template-columns:1fr}}
.feat{border:1px solid var(--bd); border-radius:16px; padding:16px; background:linear-gradient(180deg,var(--card),#0d1528)}
.feat h3{margin:.4rem 0 .2rem}
.feat p{margin:0; color:#eaf2ff}
.ico{font-size:1.1rem}

/* Identidad */
.identity{padding:44px 0}
.id-head{text-align:center; margin-bottom:14px}
.pill{display:inline-block; padding:.22rem .6rem; border:1px solid #334155; border-radius:999px; font-weight:700; font-size:.78rem}
.id-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:14px}
@media (max-width:980px){.id-grid{grid-template-columns:1fr}}
.id-card{border:1px solid var(--bd); border-radius:16px; overflow:hidden; background:linear-gradient(180deg,#0f172a,#0b1220)}
.id-media{aspect-ratio:4/3; display:grid; place-items:center; background:#0b1220}
.id-media img{max-width:100%; height:100%; object-fit:contain}
.id-body{padding:12px 14px}

/* Testimonios */
.testi{padding:40px 0}
.testi__grid{display:grid; grid-template-columns:repeat(2,1fr); gap:14px}
@media (max-width:980px){.testi__grid{grid-template-columns:1fr}}
.quote{margin:0; padding:16px; border-radius:16px; border:1px solid var(--bd); background:var(--card)}
.quote p{margin:0 0 10px}
.quote footer{color:#e5e7eb}

/* FAQ */
.faq{padding:40px 0}
.faq__title{margin:0 0 10px}
.faq details{border:1px solid var(--bd); border-radius:14px; background:var(--card); padding:12px 14px; margin-bottom:10px}
.faq summary{cursor:pointer; font-weight:900; list-style:none; display:flex; align-items:center; gap:8px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"▸"; margin-left:auto; transform:rotate(0deg); transition:transform .16s ease; color:var(--amber)}
.faq details[open] summary::after{transform:rotate(90deg)}
.faq p{margin:.5rem 0 0; color:#eaf2ff}

/* CTA final */
.cta-final{padding:24px 0 44px}
.cta-final__box{border:1px solid var(--bd); border-radius:18px; padding:24px; text-align:center; background:linear-gradient(180deg,var(--bg),var(--card))}
.tiny{font-size:.9rem; color:#eaf2ff}

/* Reveal */
.reveal{opacity:0; transform:translateY(12px); transition:opacity .5s ease, transform .5s ease}
.reveal.in{opacity:1; transform:translateY(0)}
@media (prefers-reduced-motion: reduce){.reveal{transition:none}}
`;