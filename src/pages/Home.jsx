// src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PartnersMarquee from "../components/PartnersMarquee.jsx";
import StatsBand from "../components/StatsBand.jsx";

// Imágenes identidad
import id1 from "../assets/img/lael/1.png";
import id2 from "../assets/img/lael/2.png";
import id3 from "../assets/img/lael/3.png";

export default function Home() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;
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
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home">
      <style>{css}</style>

      {/* HERO */}
<section className="hero reveal">
  <div className="container hero__inner">
    <div className="hero__left">
      <p className="hero__kicker">Educación online, cercana y clara</p>

      <h1 className="hero__title">
        PAES, <span className="grad g2">Idiomas</span> y{" "}
        <span className="grad g3">LSCh</span> con{" "}
        <span className="underline">acompañamiento de verdad</span>.
      </h1>

      <p className="hero__lead">
        Clases en vivo + cápsulas, material descargable y seguimiento real.
        <strong> 87% logra su objetivo</strong> y <strong>9 de 10</strong> nos recomiendan.
      </p>

      <div className="hero__cta">
        <Link className="btn btn-primary lift" to="/inscripcion">Inscribirme</Link>
        <Link className="btn btn-outline lift" to="/paes">Ver programas</Link>
        <a
          className="btn btn-ghost lift"
          href="https://wa.me/56964626568?text=Hola%20Lael,%20quisiera%20informaci%C3%B3n"
          target="_blank" rel="noreferrer noopener"
          aria-label="Hablar por WhatsApp con Lael"
        >
          WhatsApp
        </a>
      </div>

      <div className="chips">
        <Chip to="/paes" label="PAES Matemáticas M1" />
        <Chip to="/paes" label="Lenguaje PAES" />
        <Chip to="/lsch" label="Lengua de Señas (LSCh)" />
        <Chip to="/idiomas" label="Inglés B1–B2" />
        <Chip to="/idiomas" label="Coreano TOPIK I" />
      </div>
    </div> 

    <div className="hero__right" aria-hidden>
      <div className="mock float-in">
        <div className="bar" />
        <div className="line w80" />
        <div className="line w60" />
        <div className="line w90" />
        <div className="cards">
          <MockCard color="indigo" t="Clases en vivo" s="Recordatorios + grabación" />
          <MockCard color="green" t="Cápsulas on-demand" s="Repite cuando quieras" />
          <MockCard color="amber" t="Acompañamiento" s="Tutoría y WhatsApp" />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* SEPARADOR */}
      <div className="sep"><div className="container"><div className="hr" /></div></div>

      {/* MARQUEE */}
      <section className="marquee-wrap reveal">
        <div className="container">
          <PartnersMarquee speed={48} height={30} gap={44} />
        </div>
      </section>

      {/* KPIs */}
      <div className="reveal kpi-wrap">
        <StatsBand
          items={[
            { kpi: "87%",   label: "Logra su meta académica" },
            { kpi: "9.2/10", label: "Satisfacción promedio" },
            { kpi: "+11.000 h", label: "Clases en vivo realizadas" },
            { kpi: "500+", label: "Matriculados 2025"},
          ]}
        />
      </div>

      {/* PROGRAMAS */}
      <section className="programs reveal">
        <div className="container">
          <header className="pg-head">
            <h2>Programas Lael</h2>
            <p>Elige tu camino, combina tus ramos y avanza a tu ritmo. En Lael, te acompañamos en todo momento.</p>
          </header>

          <div className="pg-grid">
            <ProgramCard
              title="PAES"
              tag="Ingreso a la U"
              text="Planifica tus ramos o elige un plan anual con precio claro y acompañamiento constante."
              bullets={["M1, M2, Lenguaje, Historia, Ciencias", "Ensayos y tutoría semanal"]}
              to="/paes"
              accent="indigo"
            />
            <ProgramCard
              title="Idiomas"
              tag="EN · KR"
              text="prende Inglés (B1–B2) o Coreano TOPIK I con clases en vivo, cápsulas y práctica real."
              bullets={["Cápsulas on-demand + clases en vivo", "Club de conversación semanal"]}
              to="/idiomas"
              accent="green"
            />
            <ProgramCard
              title="LSCh"
              tag="Lengua de Seña Chilena"
              text="Forma parte de un proceso práctico, con enfoque comunicativo y certificación interna."
              bullets={["Inicio cada trimestre", "Proyecto final con intérpretes"]}
              to="/lsch"
              accent="rose"
            />
            <ProgramCard
              title="Empresas"
              tag="Capacitación Corporativa"
              text="Programas personalizados (online, presencial o mixto) enfocados en inclusión y comunicación."
              bullets={["Diagnóstico sin costo", "Reportes con KPI y seguimiento"]}
              to="/empresas"
              accent="amber"
            />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights reveal">
        <div className="container">
          <div className="grid">
            <Feature icon="📈" title="Acompañamiento medible">Plan semanal, tutorías y reportes simples de avance.</Feature>
            <Feature icon="🧠" title="Aprendizaje claro">Clases en vivo + cápsulas, con pautas y rúbricas entendibles.</Feature>
            <Feature icon="⏱️" title="Flexibilidad Real">En vivo y grabadas. Recuperas cuando lo necesites, sin perder ritmo.</Feature>
            <Feature icon="💳" title="Precio transparente">Matrícula única y mensualidades claras, sin cobros sorpresas.</Feature>
          </div>
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="identity reveal">
        <div className="container">
          <header className="id-head">
            <span className="pill">Quiénes somos</span>
            <h2>La identidad detrás de nuestro nombre</h2>
            <p>Todo lo que hacemos está bajo la cobertura y dirección de Dios.</p>
          </header>
          <div className="id-grid">
            <IdCard img={id1} title="Nuestro logo, nuestra cobertura" text="El isotipo se despliega como un refugio: estudiar sin estar solos, guiados y con propósito." />
            <IdCard img={id2} title="¿Qué significa LAEL?" text='De raíz hebrea: “de Dios / perteneciente a Dios” (Núm. 3:24). Trabajamos con excelencia y servicio.' />
            <IdCard img={id3} title="La paloma" text="Símbolo del Espíritu Santo y de comienzos genuinos (Mt. 3:16 / Gn. 8:11): aprender, avanzar, florecer." />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
<section className="testi reveal">
  <div className="container">
    <header className="testi__head">
      <h3>Historias reales</h3>
      <p>
        Experiencias compartidas por nuestros estudiantes, quienes confiaron en Lael
        para alcanzar sus metas académicas y personales.
      </p>
    </header>

    <div className="testi__grid">
      <Quote
        q="Nunca pensé disfrutar tanto estudiar Matemáticas. Las clases fueron claras y el apoyo constante. Logré subir más de 150 puntos en la PAES."
        a="Vicente — PAES Matemáticas M1"
      />
      <Quote
        q="Gracias al club de conversación perdí el miedo a hablar en inglés. Hoy puedo expresarme con confianza en mi trabajo y en entrevistas."
        a="Valentina — Inglés B2"
      />
      <Quote
        q="Aprender Lengua de Señas fue una experiencia transformadora. No solo aprendí a comunicarme con mis alumnos del colegio, sino también a empatizar con la comunidad sorda."
        a="Martina — LSCh Nivel 1"
      />
    </div>
  </div>
</section>

      {/* FAQ */}
      <section className="faq reveal">
        <div className="container">
          <h3 className="faq__title">Preguntas frecuentes</h3>
          <details className="lift">
            <summary><span>¿Qué pasa si falto a una clase?</span></summary>
            <p>Queda grabada y tendrás cápsulas y material para ponerte al día. Si necesitas, te apoyamos con tutoría.</p>
          </details>
          <details className="lift">
            <summary><span>¿Hay ensayos y feedback?</span></summary>
            <p>Sí. Dependiendo del plan, tienes ensayos mensuales o ilimitados con retro detallada y pautas claras.</p>
          </details>
          <details className="lift">
            <summary><span>¿Puedo cambiar de plan o ramos después?</span></summary>
            <p>Claro. Puedes ajustar tu plan según tu avance y tiempos; te guiamos para que no te pierdas.</p>
          </details>
        </div>
      </section>

      {/* CTA FINAL */}
<section className="cta-final reveal">
  <div className="container">
    <div className="cta-final__inner">
      <h3>¿Listo para empezar?</h3>
      <p>
        Inscríbete en minutos y comienza con clases en vivo, cápsulas y acompañamiento real.
        Matrícula única, precios claros y seguimiento semanal.
      </p>

      <div className="cta">
        <Link className="btn btn-primary lift" to="/inscripcion">
          Inscribirme ahora
        </Link>
        <a
          className="btn btn-ghost lift"
          href="https://wa.me/56964626568?text=Hola%20Lael%20👋%20¿me%20orientan%20para%20elegir%20mi%20plan?"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Hablar por WhatsApp con Lael"
        >
          Hablar por WhatsApp
        </a>
      </div>

      <p className="tiny" style={{ marginTop: 12, opacity: 0.9 }}>
        Respondemos de lunes a viernes. Todas las clases quedan grabadas.
      </p>
    </div>
  </div>
</section>
</div>
);
}


/* ---------- Atoms ---------- */
function Chip({ to, label }) {
  return (
    <Link to={to} className="chip lift" aria-label={label}>
      <span className="dot" /> {label}
    </Link>
  );
}
function MockCard({ color = "indigo", t, s }) {
  return (
    <div className={`mcard m-${color} lift`}>
      <div className="dot" />
      <div className="t">{t}</div>
      <div className="s">{s}</div>
    </div>
  );
}
function Feature({ icon, title, children }) {
  return (
    <article className="feat lift">
      <div className="ico">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

/* ——— ProgramCard ——— */
function ProgramCard({ title, tag, text, bullets = [], to, accent = "indigo" }) {
  const acc =
    accent === "green" ? "acc-green" :
    accent === "rose"  ? "acc-rose"  :
    accent === "amber" ? "acc-amber" : "acc-indigo";

  return (
    <article className={`p-card ${acc} lift`}>
      <div className="p-bar" aria-hidden />
      <div className="p-head">
        {tag && <div className="p-tag">{tag}</div>}
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ul className="p-list">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <Link className="btn btn-more w-100" to={to}>Ver más</Link>
    </article>
  );
}

function Quote({ q, a }) {
  return (
    <blockquote className="quote lift">
      <div className="q-top"><span className="badge-ok" aria-hidden>Verificado</span></div>
      <p>“{q}”</p>
      <footer>— {a}</footer>
    </blockquote>
  );
}
function IdCard({ img, title, text }) {
  return (
    <article className="id-card lift">
      <div className="id-card__media">
        <img src={img} alt={title} loading="lazy" decoding="async" />
      </div>
      <div className="id-card__body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --lael-primary:#3b549d;
  --lael-secondary:#249554;
  --lael-accent:#f2ce3d;
  --lael-warn:#cd5732;

  --lael-white:#ffffff;
  --lael-black:#000000;
  --lael-soft:#fffaf3;

  --c-bg:#0b1220;
  --c-card:#0e1424;
  --c-soft:#0d1528;
  --c-bd:#1f2a44;
  --c-text:#ffffff;

  --rad-lg:18px; --rad-md:14px;
  --shadow-1:0 6px 22px rgba(2,6,23,.06);
  --shadow-2:0 14px 34px rgba(2,6,23,.12);
  --shadow-3:0 28px 60px rgba(2,6,23,.34);

  --indigo: var(--lael-primary);
  --green:  var(--lael-secondary);
  --rose:   #d6a0c5;
  --amber:  var(--lael-accent);
}

*{box-sizing:border-box}
body, .home{background:linear-gradient(180deg,var(--c-bg),var(--c-card)); color:var(--c-text);}

.container{ max-width:1140px; margin:0 auto; padding:0 22px; }

/* HERO */
.hero{ padding:64px 0 20px;
  background:
    radial-gradient(820px 300px at 12% -8%, rgba(59,84,157,.18), transparent 60%),
    radial-gradient(780px 280px at 92% -10%, rgba(36,149,84,.14), transparent 60%);
  border-bottom:1px solid var(--c-bd);
}
.hero__inner{ display:grid; grid-template-columns:1.02fr .98fr; gap:48px; align-items:center; }
@media (max-width:980px){ .hero__inner{ grid-template-columns:1fr; gap:28px; } }
.hero__kicker{ color:#f1e9b3; font-weight:800; margin:0 0 12px; letter-spacing:.3px; }
.hero__title{ margin:.2rem 0 1.1rem; font-size: clamp(2rem, 3.8vw + .5rem, 2.9rem); line-height:1.12; color:var(--lael-white); }
.underline{ box-shadow: inset 0 -10px rgba(59,84,157,.30); border-radius:4px; }

/* Palabras con gradiente */
.grad{ background: linear-gradient(120deg,#A5B4FC,#22d3ee); -webkit-background-clip:text; background-clip:text; color:transparent; }
.grad.g2{ background: linear-gradient(120deg,var(--lael-secondary),#a78bfa); -webkit-background-clip:text; background-clip:text; color:transparent; }
.grad.g3{ background: linear-gradient(120deg,var(--lael-accent),var(--lael-warn)); -webkit-background-clip:text; background-clip:text; color:transparent; }

.hero__lead{ color:#e8eefc; max-width:62ch; }
.hero__cta{ display:flex; flex-wrap:wrap; gap:14px; margin:20px 0 18px; }

.btn{
  display:inline-flex; align-items:center; gap:8px; padding:.72rem 1.08rem;
  border-radius:12px; border:1px solid #2f3341; text-decoration:none; transition:.18s transform ease, .18s box-shadow ease;
}
.btn:hover{ transform: translateY(-2px); box-shadow:0 12px 28px rgba(2,6,23,.18); }
.btn-primary{ background:var(--lael-primary); color:var(--lael-white); border-color:var(--lael-primary); }
.btn-outline{ background:transparent; color:#dbeafe; border-color:#2f3341; }
.btn-ghost{ background:transparent; color:#dbeafe; border-color:transparent; }
.btn:focus-visible{ outline:2px solid var(--lael-accent); outline-offset:2px; }

.hero__trust{ display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; padding:0; list-style:none; }
.chip-soft{ font-size:.95rem; color:var(--lael-white); border:1px dashed #334155; padding:.36rem .7rem; border-radius:999px; }
.chips{ display:flex; flex-wrap:wrap; gap:12px; margin-top:16px; }
.chip{ display:inline-flex; align-items:center; gap:8px; padding:.52rem .82rem; border-radius:999px; background:var(--c-soft); border:1px solid var(--c-bd); color:var(--lael-white); text-decoration:none; }
.chip .dot{ width:8px; height:8px; border-radius:50%; background:var(--lael-accent); }

.hero__right .mock{
  border:1px solid var(--c-bd);
  background: linear-gradient(180deg,var(--c-bg),var(--c-card));
  border-radius:var(--rad-lg); padding:18px; box-shadow:0 30px 64px rgba(2,6,23,.36);
}
.bar{ height:10px; background:#101a2f; border-radius:8px; margin-bottom:14px; }
.line{ height:8px; background:#0f172a; border-radius:8px; margin:10px 0; }
.line.w80{ width:80% } .line.w60{ width:60% } .line.w90{ width:90% }
.cards{ display:grid; grid-template-columns: repeat(3,1fr); gap:14px; margin-top:14px; }
.mcard{ border:1px solid var(--c-bd); border-radius:14px; padding:14px; background:#0f172a; }
.mcard .t{ font-weight:800; color:var(--lael-white); margin-bottom:2px; }
.mcard .s{ font-size:.96rem; color:#eaf2ff; }
.mcard .dot{ width:8px; height:8px; border-radius:50%; margin-bottom:8px; }
.m-indigo .dot{ background: var(--lael-primary) } .m-green .dot{ background: var(--lael-secondary) } .m-amber .dot{ background: var(--lael-accent) }

/* separadores */
.sep{ padding:22px 0; }
.hr{ height:1px; background:linear-gradient(90deg, transparent, #22304d, transparent); border-radius:1px; }
.marquee-wrap{ padding:6px 0 0; }
.kpi-wrap{ margin-top:8px; }

/* PROGRAMAS */
.programs{ padding:28px 0 24px; }
.pg-head{ margin-bottom:8px; }
.pg-head h2{ margin:0 0 6px; font-size:1.6rem; color:var(--lael-white); }
.pg-head p{ color:var(--lael-white); margin:0 0 16px; }
.pg-grid{ display:grid; grid-template-columns: repeat(4,1fr); gap:20px; }
@media (max-width:1080px){ .pg-grid{ grid-template-columns: repeat(2,1fr); } }
@media (max-width:560px){ .pg-grid{ grid-template-columns: 1fr; } }

/* Card base */
.p-card{
  position:relative; border:1px solid #e5e7eb; border-radius:16px; background:#fff; color:#0b1220;
  box-shadow: var(--shadow-1);
  padding:16px 16px 14px; transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.p-card:hover{ transform: translateY(-2px); box-shadow: var(--shadow-2); }

/* Franja superior */
.p-bar{ content:""; position:absolute; inset:0 0 auto 0; height:6px; border-radius:16px 16px 0 0; background: var(--indigo); }

/* Tag */
.p-tag{
  display:inline-block; font-size:.75rem; font-weight:900;
  border:1px solid #e5e7eb; color:#0b1220; background:#fff; padding:.16rem .52rem; border-radius:999px;
}

/* Head */
.p-head h3{ margin:.45rem 0 .22rem; font-size:1.12rem; letter-spacing:.2px; color:#0b1220; }
.p-head p{ margin:0; color:#334155; }

/* Lista */
.p-list{ margin:12px 0 16px; padding-left:0; list-style:none; }
.p-list li{ position:relative; padding-left:20px; margin:8px 0; color:#1f2937; }
.p-list li::before{ content:""; position:absolute; left:0; top:.55rem; width:10px; height:10px; border-radius:50%; background: var(--indigo); }

/* Botón Ver más */
.w-100{ width:100% }
.btn-more{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.64rem .9rem; border-radius:12px; text-decoration:none;
  background:transparent; color:#0b1220; border:2px solid var(--lael-black); font-weight:900;
}
.btn-more:hover{ background:rgba(242,206,61,.10); }

/* Acentos por variante */
.acc-indigo .p-bar, .acc-indigo .p-list li::before{ background: var(--indigo); }
.acc-green  .p-bar, .acc-green  .p-list li::before{ background: var(--green); }
.acc-rose   .p-bar, .acc-rose   .p-list li::before{ background: var(--rose); }
.acc-amber  .p-bar, .acc-amber  .p-list li::before{ background: var(--amber); }

/* HIGHLIGHTS / IDENTIDAD / TESTI / FAQ / CTA FINAL */
.highlights{ padding:34px 0; }
.highlights .grid{ display:grid; grid-template-columns: repeat(4,1fr); gap:18px; }
@media (max-width:980px){ .highlights .grid{ grid-template-columns: repeat(2,1fr); gap:16px; } }
@media (max-width:560px){ .highlights .grid{ grid-template-columns: 1fr; } }
.feat{ border:1px solid var(--c-bd); border-radius:18px; padding:18px; background: linear-gradient(180deg,var(--c-card),var(--c-soft)); box-shadow:0 18px 36px rgba(16,24,40,.12); }
.feat h3{ margin:.55rem 0 .25rem; color:var(--lael-white); }
.feat p{ color:var(--lael-white); }
.ico{ font-size:1.2rem; }

.identity{ padding:36px 0; }
.id-head{ text-align:center; margin-bottom:18px; }
.id-head .pill{ display:inline-block; padding:.24rem .62rem; border-radius:999px; border:1px solid #334155; color:var(--lael-white); background:#0e1424; font-weight:700; font-size:.78rem; }
.id-head h2{ margin:.5rem 0 .25rem; color:var(--lael-white); }
.id-head p{ margin:0; color:var(--lael-white); }
.id-grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:18px; }
@media (max-width:980px){ .id-grid{ grid-template-columns:1fr; } }
.id-card{ overflow:hidden; border:1px solid var(--c-bd); border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 18px 36px rgba(16,24,40,.14); }
.id-card__media{ aspect-ratio: 1.35 / 1; background:#0b1220; display:grid; place-items:center; }
.id-card__media img{ max-width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 4px 10px rgba(16,24,40,.35)); transform:translateZ(0); }
.id-card__body{ padding:14px 16px; }
.id-card__body h3{ margin:.2rem 0 .28rem; color:var(--lael-white); }
.id-card__body p{ margin:0; color:var(--lael-white); }

.testi{ padding:38px 0; }
.testi__head h3{ margin:0 0 6px; color:var(--lael-white); }
.testi__head p{ color:var(--lael-white); margin:0 0 18px }
.testi__grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:18px; }
@media (max-width:980px){ .testi__grid{ grid-template-columns:1fr; } }
.quote{ margin:0; padding:18px; border-radius:18px; border:1px solid var(--c-bd); background:var(--c-card); box-shadow:0 18px 34px rgba(16,24,40,.18); }
.q-top{ display:flex; justify-content:flex-end; margin-bottom:6px; }
.badge-ok{ display:inline-block; padding:.18rem .5rem; border-radius:999px; font-size:.78rem; font-weight:900; border:1px solid #22c55e55; color:#bbf7d0; background:#052914; }
.quote p{ margin:0 0 12px; color:var(--lael-white); font-size:1.02rem; line-height:1.5; }
.quote footer{ color:#e5e7eb; font-size:.96rem; }

.faq{ padding:30px 0; }
.faq__title{ margin:0 0 12px; color:var(--lael-white); }
.faq details{ border:1px solid var(--c-bd); border-radius:16px; background:var(--c-card); padding:14px 16px; margin-bottom:12px; box-shadow:0 12px 26px rgba(16,24,40,.14); }
.faq summary{ cursor:pointer; font-weight:900; color:var(--lael-white); list-style:none; display:flex; align-items:center; gap:8px; }
.faq summary::-webkit-details-marker{ display:none; }
.faq summary span{ flex:1; }
.faq summary::after{ content:"▸"; font-size:1.2rem; line-height:1; transform: rotate(0deg); transition: transform .16s ease; color: var(--lael-accent); }
.faq details[open] summary::after{ transform: rotate(90deg); }
.faq p{ margin:.6rem 0 0; color:var(--lael-white); }

.cta-final{ padding:26px 0 44px; }
.cta-final__inner{
  border:1px solid var(--c-bd); border-radius:20px; padding:26px; text-align:center;
  background:
    radial-gradient(460px 240px at 14% -8%, rgba(59,84,157,.20), transparent 60%),
    radial-gradient(460px 240px at 86% -8%, rgba(36,149,84,.20), transparent 60%),
    linear-gradient(180deg,var(--c-bg),var(--c-card));
  box-shadow: var(--shadow-3);
}
.cta-final__inner h3{ margin:.2rem 0 .3rem; color:var(--lael-white); }
.cta{ display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:12px; }

/* Interacciones */
.lift{ transition: transform .18s ease, box-shadow .18s ease; }
.lift:hover{ transform: translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.18); }
.reveal{ opacity:0; transform: translateY(14px); transition: opacity .5s ease, transform .5s ease; }
.reveal.in{ opacity:1; transform: translateY(0); }
.float-in{ animation:floatIn .5s ease both; }
@keyframes floatIn{ from{ transform:translateY(10px); opacity:0 } to{ transform:translateY(0); opacity:1 } }
@media (prefers-reduced-motion: reduce){
  .lift, .reveal, .float-in{ transition:none !important; animation:none !important; }
}
`;