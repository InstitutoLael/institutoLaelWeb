// src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PartnersMarquee from "../components/PartnersMarquee.jsx";
import StatsBand from "../components/StatsBand.jsx";

// Identidad
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
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home">
      <style>{css}</style>

      {/* HERO */}
      <section className="hero reveal">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="kicker">Educación online, pero humana</p>
            <h1 className="title">
              Prepárate para <span className="g g1">PAES</span>,{" "}
              <span className="g g2">Idiomas</span> y{" "}
              <span className="g g3">LSCh</span> con{" "}
              <span className="underline">acompañamiento real</span>.
            </h1>
            <p className="lead">
              En vivo + grabadas, material descargable y seguimiento semanal.
              <strong> 87%</strong> logra su objetivo y <strong>9 de 10</strong> nos recomiendan.
            </p>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-outline" to="/paes">Ver planes PAES</Link>
              <a
                className="btn btn-ghost"
                href="https://wa.me/56964626568?text=Hola%20Lael,%20quisiera%20info%20🙂"
                target="_blank" rel="noreferrer noopener"
                aria-label="Abrir WhatsApp de Lael"
              >
                WhatsApp
              </a>
            </div>

            <ul className="trust">
              <li className="chip">Pagos seguros 💳</li>
              <li className="chip">+10.000 h en vivo 🎥</li>
              <li className="chip">Con Google Workspace 🟦</li>
            </ul>

            <div className="chips">
              <Chip to="/paes" label="PAES Matemáticas M1" />
              <Chip to="/paes" label="Lenguaje PAES" />
              <Chip to="/lsch" label="Lengua de Señas (LSCh)" />
              <Chip to="/idiomas" label="Inglés B1–B2" />
              <Chip to="/idiomas" label="Coreano TOPIK 1" />
            </div>
          </div>

          <div className="hero__viz" aria-hidden>
            <div className="mock lift">
              <div className="bar" />
              <div className="line w80" />
              <div className="line w55" />
              <div className="line w90" />
              <div className="mgrid">
                <MockCard color="indigo" t="Clases en vivo" s="Recordatorios + grabación" />
                <MockCard color="green" t="Cápsulas on-demand" s="Repite cuando quieras" />
                <MockCard color="amber" t="Soporte real" s="Tutoría + WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separador suave */}
      <div className="sep"><div className="container"><div className="hr" /></div></div>

      {/* Partners */}
      <section className="marquee reveal">
        <div className="container">
          <PartnersMarquee speed={48} height={30} gap={44} />
        </div>
      </section>

      {/* KPIs */}
      <div className="reveal kpis">
        <StatsBand
          items={[
            { kpi: "87%", label: "Ingreso/Aprobación" },
            { kpi: "9/10", label: "Nos recomiendan" },
            { kpi: "+10k", label: "Horas en vivo" },
          ]}
        />
      </div>

      {/* Programas */}
      <section className="programs reveal">
        <div className="container">
          <header className="sec-head">
            <h2>Programas</h2>
            <p>Elige lo que necesitas hoy. Puedes combinar y cambiar después.</p>
          </header>

          <div className="pg-grid">
            <ProgramCard
              title="PAES"
              tag="Ingreso a la U"
              text="Arma tu plan por ramos o elige un plan con precio fijo."
              bullets={["M1, M2, Lenguaje, Historia, Ciencias", "Ensayos y tutoría"]}
              to="/paes"
              accent="indigo"
            />
            <ProgramCard
              title="Idiomas"
              tag="EN · KR · PT"
              text="Inglés (B1–B2), Coreano TOPIK 1 y Portugués (próx. 2026)."
              bullets={["Clases en vivo + cápsulas", "Club de conversación"]}
              to="/idiomas"
              accent="green"
            />
            <ProgramCard
              title="LSCh"
              tag="Lengua de Señas"
              text="Rutas por módulos con certificado y foco práctico."
              bullets={["Inicio cada trimestre", "Proyecto final con intérpretes"]}
              to="/lsch"
              accent="rose"
            />
            <ProgramCard
              title="Empresas"
              tag="Capacitación"
              text="Capacitaciones a medida (online/presencial/mixto)."
              bullets={["Diagnóstico sin costo", "Reportes y KPI de progreso"]}
              to="/empresas"
              accent="amber"
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights reveal">
        <div className="container">
          <div className="grid">
            <Feature icon="🎯" title="Seguimiento real">Agenda, tutorías y checkpoints. Nada de estudiar solo/a.</Feature>
            <Feature icon="🧠" title="Competencias, no memoria">Ensayos guiados, criterios claros y feedback accionable.</Feature>
            <Feature icon="⏱️" title="Horarios flexibles">En vivo + grabadas. Llega cuando puedas, progresa cuando quieras.</Feature>
            <Feature icon="🧾" title="Precios justos">Matrícula única, mensualidades claras y descuentos automáticos.</Feature>
          </div>
        </div>
      </section>

      {/* Identidad */}
      <section className="identity reveal">
        <div className="container">
          <header className="id-head">
            <span className="pill">Quiénes somos</span>
            <h2>La identidad detrás de nuestro nombre</h2>
            <p>Todo lo que hacemos está bajo la cobertura y dirección de Dios.</p>
          </header>
          <div className="id-grid">
            <IdCard img={id1} title="Nuestro logo, nuestra cobertura" text="El isotipo se despliega como refugio: estudiar sin estar solos, guiados y con propósito." />
            <IdCard img={id2} title="¿Qué significa LAEL?" text='De raíz hebrea: “de Dios / perteneciente a Dios” (Núm. 3:24). Trabajamos con excelencia y servicio.' />
            <IdCard img={id3} title="La paloma" text="Símbolo del Espíritu Santo y de nuevos comienzos (Mt 3:16 / Gn 8:11)." />
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testi reveal">
        <div className="container">
          <header className="testi__head">
            <h3>Historias reales</h3>
            <p>Testimonios verificados de estudiantes.</p>
          </header>
          <div className="testi__grid">
            <Quote q="Pasé de estudiar solo a tener plan y meta. Entré a mi primera opción." a="Vicente — PAES M1" />
            <Quote q="El club de conversación me soltó la lengua en 3 semanas. Subí un nivel." a="Valentina — Inglés B2" />
            <Quote q="Aprendí LSCh con respeto y práctica real. Hoy interpreto en mi comunidad." a="Isidora — LSCh M1" />
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

      {/* CTA final */}
      <section className="cta-final reveal">
        <div className="container">
          <div className="cta-final__inner">
            <h3>¿Listo para partir?</h3>
            <p>Postula hoy. Nosotros te acompañamos en el resto.</p>
            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <a
                className="btn btn-ghost"
                href="https://wa.me/56964626568?text=Hola%20Lael,%20me%20gustaría%20conversar%20mi%20caso"
                target="_blank" rel="noreferrer noopener"
                aria-label="Abrir WhatsApp de Lael"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Atoms ---------- */
function Chip({ to, label }) {
  return (
    <Link to={to} className="chip chip-link lift" aria-label={label}>
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

/* ---------- CSS local ---------- */
const css = `
:root{
  /* Paleta Lael */
  --indigo:#3b549d; --green:#249554; --amber:#f2ce3d; --warn:#cd5732; --rose:#d6a0c5;
  --white:#ffffff; --black:#000000;

  /* Base oscura refinada */
  --bg:#0c111d; --layer:#0f172a; --soft:#111827; --bd:#1f2a44; --ink:#ffffff; --ink-2:#cfd8ea;

  /* Espaciado y radios */
  --rad-lg:20px; --rad-md:14px; --gap-1:8px; --gap-2:12px; --gap-3:18px; --gap-4:24px;

  /* Sombras */
  --sh-1:0 8px 20px rgba(2,6,23,.14);
  --sh-2:0 16px 40px rgba(2,6,23,.22);
  --sh-3:0 28px 60px rgba(2,6,23,.32);
}

*{box-sizing:border-box}
.home{ background: radial-gradient(1100px 380px at 12% -10%, rgba(59,84,157,.18), transparent 60%) ,
                 radial-gradient(1100px 380px at 88% -12%, rgba(36,149,84,.12), transparent 60%) ,
                 linear-gradient(180deg,var(--bg),var(--layer)); color:var(--ink); }
.container{ max-width:1140px; margin:0 auto; padding:0 22px; }

/* ---------------- HERO ---------------- */
.hero{ padding:48px 0 22px; border-bottom:1px solid var(--bd); }
.hero__grid{ display:grid; grid-template-columns: 1.06fr .94fr; gap:40px; align-items:center; }
@media (max-width:980px){ .hero__grid{ grid-template-columns:1fr; gap:22px; } }

.kicker{ color:#f3eab8; font-weight:900; letter-spacing:.3px; margin:0 0 8px; }
.title{ margin:.2rem 0 .7rem; font-size: clamp(1.9rem, 3.6vw + .4rem, 2.7rem); line-height:1.14; }
.underline{ box-shadow: inset 0 -10px color-mix(in srgb, var(--indigo) 25%, transparent); border-radius:4px; }
.g{ -webkit-background-clip:text; background-clip:text; color:transparent; }
.g1{ background:linear-gradient(120deg,#A5B4FC,#22d3ee); }
.g2{ background:linear-gradient(120deg,var(--green),#a78bfa); }
.g3{ background:linear-gradient(120deg,var(--amber),var(--warn)); }

.lead{ color:var(--ink-2); max-width:64ch; }

.cta{ display:flex; gap:12px; flex-wrap:wrap; margin:14px 0 0; }
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px;
      padding:.7rem 1.05rem; border-radius:12px; border:1px solid #2f3341; font-weight:900; text-decoration:none;
      transition:transform .16s ease, box-shadow .16s ease; }
.btn:hover{ transform: translateY(-1px); box-shadow:var(--sh-1); }
.btn-primary{ background:var(--indigo); border-color:var(--indigo); color:#fff; }
.btn-outline{ background:transparent; color:#eaf2ff; }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:transparent; }

.trust{ list-style:none; margin:12px 0 0; padding:0; display:flex; flex-wrap:wrap; gap:10px; }
.chip{ color:#e7efff; border:1px dashed #344159; border-radius:999px; padding:.34rem .68rem; font-size:.95rem; }
.chips{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
.chip-link{ background:var(--soft); border:1px solid #2a3653; color:#fff; border-radius:999px; padding:.48rem .78rem; }
.chip-link .dot{ width:8px; height:8px; border-radius:50%; background:var(--amber); }

.hero__viz .mock{
  border:1px solid #22304d; border-radius:var(--rad-lg);
  background: linear-gradient(180deg,var(--layer),var(--soft)); padding:16px;
  box-shadow:var(--sh-3);
}
.bar{ height:10px; border-radius:8px; background:#0b1220; margin-bottom:12px; }
.line{ height:8px; border-radius:8px; background:#0f172a; margin:8px 0; }
.line.w80{ width:80% } .line.w55{ width:55% } .line.w90{ width:90% }
.mgrid{ display:grid; grid-template-columns: repeat(3,1fr); gap:12px; }
@media (max-width:560px){ .mgrid{ grid-template-columns:1fr; } }
.mcard{ border:1px solid #243153; border-radius:14px; padding:14px; background:#0f172a; }
.mcard .t{ font-weight:900; color:#fff; margin-bottom:2px; }
.mcard .s{ color:#dbe5ff; font-size:.96rem; }
.mcard .dot{ width:8px; height:8px; border-radius:50%; margin-bottom:8px; }
.m-indigo .dot{ background:var(--indigo); } .m-green .dot{ background:var(--green); } .m-amber .dot{ background:var(--amber); }

/* separadores */
.sep{ padding:18px 0; }
.hr{ height:1px; background:linear-gradient(90deg, transparent, #22304d, transparent); border-radius:1px; }
.marquee{ padding:6px 0 0; }
.kpis{ margin-top:6px; }

/* ---------------- PROGRAMAS ---------------- */
.programs{ padding:26px 0 18px; }
.sec-head h2{ margin:0 0 6px; font-size:clamp(1.4rem, 1.2vw + 1rem, 1.7rem); }
.sec-head p{ margin:0 0 16px; color:var(--ink-2); }

.pg-grid{ display:grid; grid-template-columns: repeat(4,1fr); gap:16px; }
@media (max-width:1100px){ .pg-grid{ grid-template-columns: repeat(2,1fr); } }
@media (max-width:560px){ .pg-grid{ grid-template-columns:1fr; } }

.p-card{
  position:relative; border:1px solid #e5e7eb; border-radius:16px; background:#fff; color:#0b1220;
  padding:16px 16px 14px; box-shadow:0 8px 20px rgba(16,24,40,.08); transition: transform .16s, box-shadow .16s, border-color .16s;
}
.p-card:hover{ transform: translateY(-2px); box-shadow:0 16px 34px rgba(16,24,40,.16); }
.p-bar{ position:absolute; inset:0 0 auto 0; height:6px; border-radius:16px 16px 0 0; background:var(--indigo); }

.p-tag{ display:inline-block; font-size:.74rem; font-weight:900; border:1px solid #e5e7eb; color:#0b1220; background:#fff; padding:.14rem .5rem; border-radius:999px; }
.p-head h3{ margin:.45rem 0 .18rem; font-size:1.1rem; }
.p-head p{ margin:0; color:#334155; }
.p-list{ margin:12px 0 16px; padding-left:0; list-style:none; }
.p-list li{ position:relative; padding-left:18px; margin:8px 0; color:#1f2937; }
.p-list li::before{ content:""; position:absolute; left:0; top:.55rem; width:10px; height:10px; border-radius:50%; background:var(--indigo); }

.btn-more{ width:100%; display:inline-flex; justify-content:center; align-items:center; padding:.62rem .9rem;
  border-radius:12px; text-decoration:none; background:transparent; color:#0b1220; border:2px solid #0b1220; font-weight:900; }
.btn-more:hover{ background:rgba(242,206,61,.08); }

/* acentos */
.acc-green  .p-bar, .acc-green  .p-list li::before{ background:var(--green); }
.acc-rose   .p-bar, .acc-rose   .p-list li::before{ background:var(--rose); }
.acc-amber  .p-bar, .acc-amber  .p-list li::before{ background:var(--amber); }

/* ---------------- HIGHLIGHTS ---------------- */
.highlights{ padding:28px 0; }
.highlights .grid{ display:grid; grid-template-columns: repeat(4,1fr); gap:16px; }
@media (max-width:980px){ .highlights .grid{ grid-template-columns: repeat(2,1fr); } }
@media (max-width:560px){ .highlights .grid{ grid-template-columns:1fr; } }
.feat{ border:1px solid #22304d; border-radius:18px; padding:16px; background: linear-gradient(180deg,var(--layer),var(--soft)); box-shadow:var(--sh-1); }
.feat h3{ margin:.45rem 0 .2rem; }
.feat p{ color:var(--ink-2); }
.ico{ font-size:1.2rem; }

/* ---------------- IDENTIDAD ---------------- */
.identity{ padding:30px 0; }
.id-head{ text-align:center; margin-bottom:16px; }
.id-head .pill{ display:inline-block; padding:.24rem .62rem; border-radius:999px; border:1px solid #334155; color:#e7efff; background:#0e1424; font-weight:800; font-size:.78rem; }
.id-head h2{ margin:.5rem 0 .18rem; }
.id-head p{ margin:0; color:var(--ink-2); }
.id-grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:16px; }
@media (max-width:980px){ .id-grid{ grid-template-columns:1fr; } }

.id-card{ overflow:hidden; border:1px solid #22304d; border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:var(--sh-1); }
.id-card__media{ aspect-ratio: 1.35 / 1; display:grid; place-items:center; }
.id-card__media img{ max-width:100%; max-height:100%; object-fit:contain; filter: drop-shadow(0 4px 10px rgba(16,24,40,.35)); transform:translateZ(0); }
.id-card__body{ padding:14px 16px; }
.id-card__body h3{ margin:.18rem 0 .24rem; }
.id-card__body p{ margin:0; color:var(--ink-2); }

/* ---------------- TESTIMONIOS ---------------- */
.testi{ padding:32px 0; }
.testi__head h3{ margin:0 0 6px; }
.testi__head p{ margin:0 0 16px; color:var(--ink-2); }
.testi__grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:16px; }
@media (max-width:980px){ .testi__grid{ grid-template-columns:1fr; } }

.quote{ margin:0; padding:16px; border-radius:18px; border:1px solid #22304d; background:var(--layer); box-shadow:var(--sh-1); }
.q-top{ display:flex; justify-content:flex-end; margin-bottom:6px; }
.badge-ok{ display:inline-block; padding:.18rem .5rem; border-radius:999px; font-size:.78rem; font-weight:900; border:1px solid #22c55e66; color:#bbf7d0; background:#052914; }
.quote p{ margin:0 0 10px; font-size:1.02rem; line-height:1.5; }
.quote footer{ color:var(--ink-2); font-size:.95rem; }

/* ---------------- FAQ ---------------- */
.faq{ padding:26px 0; }
.faq__title{ margin:0 0 12px; }
.faq details{ border:1px solid #22304d; border-radius:16px; background:var(--layer); padding:14px 16px; margin-bottom:12px; box-shadow:var(--sh-1); }
.faq summary{ cursor:pointer; font-weight:900; list-style:none; display:flex; align-items:center; gap:8px; }
.faq summary::-webkit-details-marker{ display:none; }
.faq summary span{ flex:1; }
.faq summary::after{ content:"▸"; font-size:1.1rem; line-height:1; transform: rotate(0deg); transition: transform .16s ease; color: var(--amber); }
.faq details[open] summary::after{ transform: rotate(90deg); }
.faq p{ margin:.55rem 0 0; color:var(--ink-2); }

/* ---------------- CTA FINAL ---------------- */
.cta-final{ padding:24px 0 44px; }
.cta-final__inner{
  border:1px solid #22304d; border-radius:20px; padding:24px; text-align:center;
  background:
    radial-gradient(520px 240px at 14% -8%, color-mix(in srgb, var(--indigo) 22%, transparent), transparent 60%),
    radial-gradient(520px 240px at 86% -8%, color-mix(in srgb, var(--green) 18%, transparent), transparent 60%),
    linear-gradient(180deg,var(--bg),var(--layer));
  box-shadow:var(--sh-2);
}
.cta{ display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:10px; }

/* Interacciones */
.lift{ transition: transform .16s ease, box-shadow .16s ease; }
.lift:hover{ transform: translateY(-2px); box-shadow:var(--sh-1); }
.reveal{ opacity:0; transform: translateY(12px); transition: opacity .45s ease, transform .45s ease; }
.reveal.in{ opacity:1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce){
  .lift, .reveal{ transition:none !important; animation:none !important; }
}
`;