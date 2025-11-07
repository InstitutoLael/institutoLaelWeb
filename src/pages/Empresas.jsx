
// src/pages/Empresas.jsx
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SERVICE_LINES,
  EMP_PACKS,
  UI_OPTIONS,
  calcQuote,
  clp,
  WAPP_INTL,
} from "../data/empresas.js";

import SEOHead from "../components/SEOHead";
import { seoDefaults } from "../seo.config";

import logoAzul from "../assets/img/Logos/lael-inst-azul.png";
import imgHero from "../assets/img/lael/office-bg.jpg";

export default function Empresas() {
  const [form, setForm] = useState({
    lineId: "ingles",
    headcount: 20,
    durationUnit: "months",
    durationValue: 1,
    modality: "online",
  });

  const q = useMemo(() => calcQuote(form), [form]);
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const waText = encodeURIComponent(
    `Hola 👋, quiero una propuesta corporativa.\n` +
      `Área: ${q.line.label}\n` +
      `Personas: ${q.headcount}\n` +
      `Duración: ${form.durationValue} ${form.durationUnit}\n` +
      `Modalidad: ${form.modality}\n` +
      `Estimación: ${clp(q.total)} (+IVA)\n` +
      `¿Podrían contactarme?`
  );

  // 🧠 UX detalle: título cambia cuando se sale y vuelve
  useEffect(() => {
    const blur = () =>
      (document.title = "💼 Capacitación Empresarial | Instituto Lael");
    const focus = () =>
      (document.title = "Capacitación Corporativa | Instituto Lael SpA");
    window.addEventListener("blur", blur);
    window.addEventListener("focus", focus);
    return () => {
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", focus);
    };
  }, []);

  /* ---------------- SEO JSON-LD ---------------- */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Instituto Lael SpA",
      "url": seoDefaults.site,
      "logo": `${seoDefaults.site}/meta/logo-lael.png`,
      "sameAs": [
        "https://www.instagram.com/institutolael",
        "https://www.youtube.com/@institutolael",
        "https://www.linkedin.com/company/instituto-lael/",
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+56 9 6462 6568",
          "contactType": "customer support",
          "areaServed": "CL",
          "availableLanguage": ["Spanish"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Capacitación corporativa",
      "provider": {
        "@type": "Organization",
        "name": "Instituto Lael SpA",
        "url": seoDefaults.site,
      },
      "areaServed": "Chile",
      "offers": {
        "@type": "Offer",
        "url": `${seoDefaults.site}/empresas`,
        "priceCurrency": "CLP",
        "price": q.total.toFixed(0),
        "availability": "https://schema.org/InStock",
        "eligibleRegion": "CL",
      },
      "description":
        "Programas de formación corporativa en inglés, LSCh, habilidades blandas y empleabilidad. Modalidades online o mixtas, con reportes ejecutivos y certificación.",
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Programas de capacitación empresarial",
      "itemListElement": EMP_PACKS.map((p, i) => ({
        "@type": "Offer",
        "position": i + 1,
        "name": p.title,
        "description": p.subtitle,
        "url": `${seoDefaults.site}/empresas#${p.id}`,
        "category": "Corporate Training",
      })),
    },
  ];

  return (
    <section className="empresas">
      {/* 🧭 SEO HEAD */}
      <SEOHead
        title="Capacitación Corporativa"
        description="Capacitación corporativa en inglés, LSCh, habilidades blandas y empleabilidad. Diseñamos programas modulares con seguimiento ejecutivo y certificación. Propuesta en 24 h."
        path="/empresas"
        image={`${seoDefaults.site}/meta/og-empresas.jpg`}
        jsonLd={jsonLd}
      />

      <style>{css}</style>

      {/* HERO */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url(${imgHero})`,
        }}
      >
        <div className="container hero-content">
          <img src={logoAzul} alt="Instituto Lael" className="hero-logo" />
          <h1>Capacitación corporativa con impacto real</h1>
          <p>
            Formación en <b>Inglés, LSCh, Habilidades Blandas</b> y{" "}
            <b>Empleabilidad</b>, diseñada para mejorar el desempeño y el clima
            organizacional. 100% online con posibilidad de dictarse en sede del
            cliente.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Solicitar propuesta
            </a>
            <Link className="btn btn-secondary" to="/inscripcion">
              Reunión de diagnóstico
            </Link>
          </div>
        </div>
      </header>

      {/* BENEFICIOS */}
      <section className="block container">
        <h2>Qué ofrecemos</h2>
        <div className="grid grid-4 beneficios">
          <div className="b-item">
            <h3>🎯 Formación adaptada</h3>
            <p>Programas modulares según nivel, rubro y objetivos de la empresa.</p>
          </div>
          <div className="b-item">
            <h3>💻 Flexibilidad total</h3>
            <p>Modalidades online o mixtas, con sesiones en vivo y cápsulas grabadas.</p>
          </div>
          <div className="b-item">
            <h3>📊 Seguimiento ejecutivo</h3>
            <p>Reportes de avance, asistencia e indicadores de cumplimiento por cohorte.</p>
          </div>
          <div className="b-item">
            <h3>📬 Propuesta en 24 h</h3>
            <p>Envío de propuesta formal y presupuesto detallado al correo de contacto.</p>
          </div>
        </div>
      </section>

      {/* PROGRAMAS DESTACADOS */}
      <section className="block container">
        <h2>Programas destacados</h2>
        <p className="muted">
          Selecciona un programa base y ajusta según tus necesidades.
        </p>
        <div className="packs-grid">
          {EMP_PACKS.map((p) => {
            const line =
              SERVICE_LINES.find((l) => l.id === p.line) || SERVICE_LINES[0];
            return (
              <article
                key={p.id}
                id={p.id}
                className="pack-card"
                style={{ "--accent": line.brandColor }}
              >
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
                <ul>
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setField("lineId", p.line)}
                  >
                    Cargar en estimador
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ESTIMADOR */}
      <section className="block container">
        <div className="est-card">
          <h2>Calcula tu inversión estimada</h2>
          <div className="grid grid-4">
            <div className="card">
              <div className="label accent">Área</div>
              <select
                className="field"
                value={form.lineId}
                onChange={(e) => setField("lineId", e.target.value)}
              >
                {SERVICE_LINES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="card">
              <div className="label accent">Personas</div>
              <select
                className="field"
                value={form.headcount}
                onChange={(e) => setField("headcount", Number(e.target.value))}
              >
                {UI_OPTIONS.headcountPresets.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="card">
              <div className="label accent">Duración (meses)</div>
              <select
                className="field"
                value={form.durationValue}
                onChange={(e) => setField("durationValue", Number(e.target.value))}
              >
                {UI_OPTIONS.months.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="card">
              <div className="label accent">Modalidad</div>
              <select
                className="field"
                value={form.modality}
                onChange={(e) => setField("modality", e.target.value)}
              >
                <option value="online">Online</option>
                <option value="mixed">Mixto</option>
                <option value="onsite">Presencial</option>
              </select>
            </div>
          </div>

          <div className="total-box">
            <div>
              <small>Estimación referencial (+IVA)</small>
              <h3>{clp(q.total)}</h3>
            </div>
            <a
              href={`https://wa.me/${WAPP_INTL}?text=${waText}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      </section>

      {/* QA & COMPLIANCE */}
      <section className="block container">
        <div className="qa-card">
          <h2>Metodología y cumplimiento</h2>
          <ul>
            <li><b>Diseño por competencias:</b> contenidos precisos, sin relleno.</li>
            <li><b>Rúbricas y QA:</b> estándares por sesión y observación docente.</li>
            <li><b>Facturación electrónica:</b> respaldo y reportes para auditorías.</li>
            <li><b>Certificados y constancias:</b> disponibles por participante.</li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="corp-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Instituto Lael SpA — RUT 78.084.019-6</p>
          <p>
            Capacitación corporativa online y presencial en sede del cliente. Contacto:{" "}
            <b>
              <a href="mailto:contacto@institutolael.cl">
                contacto@institutolael.cl
              </a>
            </b>
          </p>
        </div>
      </footer>
    </section>
  );
}

/* Mantén tu mismo CSS (ya es óptimo visualmente) */

/* ===== CSS ===== */
const css = `
:root{
  --bg:#0b1220;
  --ink:#ffffff;
  --ink2:#e3e9ff;
  --accent:#FFC928; /* Amarillo Lael */
  --accent-dark:#E0B90F;
  --accent-press:#C9A60E;
  --secondary:#3b549d; /* Azul Lael */
  --focus:#22d3ee;
  --bd:#1f2a44;
  --card:#101827;
}

.empresas{background:var(--bg);color:var(--ink);}
.container{max-width:1120px;margin:0 auto;padding:0 18px;}
.block{margin:48px 0;}
.muted{color:var(--ink2);opacity:.85;}
h1,h2,h3{margin:0 0 .4rem;}

/* HERO */
.hero{
  background-size:cover;
  background-position:center;
  color:#fff;
  text-align:center;
  padding:80px 0 90px;
}
.hero-logo{height:48px;margin-bottom:16px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35));}
.hero h1{font-size:2rem;font-weight:800;margin-bottom:10px;}
.hero p{max-width:60ch;margin:0 auto;font-size:1.1rem;color:var(--ink2);}
.cta-row{margin-top:18px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}

/* BOTONES */
.btn{
  padding:.7rem 1.2rem;
  border-radius:12px;
  font-weight:850;
  text-decoration:none;
  cursor:pointer;
  border:2px solid transparent;
  transition:.18s transform ease,.18s box-shadow ease,.18s background ease,.18s border-color ease;
  display:inline-flex;align-items:center;justify-content:center;
}
.btn:focus-visible{outline:3px solid var(--focus);outline-offset:2px;}
.btn-primary{background:var(--accent);color:#0b0f19;border-color:var(--accent-dark);box-shadow:0 8px 22px rgba(255,201,40,.28);}
.btn-primary:hover{background:var(--accent-dark);}
.btn-primary:active{background:var(--accent-press);transform:translateY(1px);box-shadow:none;}
.btn-secondary{background:var(--secondary);color:#fff;border-color:var(--secondary);}
.btn-secondary:hover{background:#32488d;box-shadow:0 10px 22px rgba(59,84,157,.3);}
.btn-secondary:active{background:#2a3c7a;transform:translateY(1px);}
.btn-ghost{border:1px solid var(--ink2);color:var(--ink2);background:transparent;}
.btn-ghost:hover{background:rgba(255,255,255,.08);}

/* BENEFICIOS */
.grid{display:grid;gap:22px;}
.grid-4{grid-template-columns:repeat(4,minmax(220px,1fr));}
@media(max-width:1100px){.grid-4{grid-template-columns:repeat(2,minmax(240px,1fr));}}
@media(max-width:640px){.grid-4{grid-template-columns:1fr;}}
.beneficios .b-item{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:20px;}
.beneficios h3{color:#fff;margin:0 0 .3rem;}
.beneficios p{color:var(--ink2);margin:0;}

/* PACKS */
.packs-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));}
.pack-card{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;}
.pack-card h3{color:#fff;}
.pack-card ul{margin:.4rem 0 .6rem;padding-left:18px;color:var(--ink2);}
.pack-card li::marker{color:var(--accent);}
.pack-card .actions{margin-top:auto;}

/* ESTIMADOR */
.est-card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:18px;}
.label.accent{font-weight:700;margin-bottom:4px;display:block;}
.field{width:100%;padding:.6rem .8rem;border-radius:10px;border:1px solid var(--bd);background:#0f172a;color:#eaf2ff;}
.field:focus-visible{outline:3px solid var(--focus);outline-offset:2px;}
.total-box{margin-top:18px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}
.total-box h3{font-size:1.6rem;color:#10b981;margin:0;}

/* QA */
.qa-card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:20px;}
.qa-card ul{margin:0;padding-left:20px;color:var(--ink2);}
.qa-card li{margin:.3rem 0;}

/* ===== PATCH: colores CTA + separación + select caret (dark) ===== */

/* 1) CTA amarillo y fantasma azul, consistentes */
:root{
  --cta:#FFCC33;
  --cta-dark:#E6B800;
  --cta-press:#CCA300;
  --cta-ink:#0f1115;
  --blue:#60A5FA;           /* azul del ghost */
}

/* CTA principal (WhatsApp / Cotización) */
.btn-primary{
  background:var(--cta);
  color:var(--cta-ink);
  border-color:var(--cta-dark);
  box-shadow:0 10px 26px rgba(255,204,51,.18);
}
.btn-primary:hover{ background:var(--cta-dark); }
.btn-primary:active{ background:var(--cta-press); transform:translateY(1px); }

/* “Reunión de diagnóstico” (ghost) en azul y con hover sutil */
.btn-ghost{
  color:var(--blue);
  border:1px solid var(--blue);
  background:transparent;
}
.btn-ghost:hover{
  background:color-mix(in srgb, var(--blue) 14%, transparent);
}

/* 2) Más aire entre bloques (programas ↔ estimador ↔ metodología) */
.block{ margin:56px 0; }                   /* antes 48px */
.packs-grid{ margin-bottom:26px; }
.est-card{ margin-top:22px; }
.qa-card{ margin-top:28px; }

@media (max-width: 960px){
  .block{ margin:42px 0; }                 /* un pelín más compacto en mobile */
}

/* 3) Selects: caret claro y padding para que no se “coma” el texto */
.field{
  appearance:none;
  padding-right:40px;                       /* espacio para la flecha */
  background-image:
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 20 20' fill='%23eaf2ff'><path d='M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06z'/></svg>");
  background-repeat:no-repeat;
  background-position:right 12px center;
  background-size:16px;
  color-scheme: dark;
}
.field option{ background:#0f172a; color:#eaf2ff; }

/* 4) Botones “Cargar en estimador”: mismo CTA que el resto */
.pack-card .btn-primary{
  background:var(--cta);
  color:var(--cta-ink);
  border-color:var(--cta-dark);
}
.pack-card .btn-primary:hover{ background:var(--cta-dark); }

/* FOOTER */
.corp-footer{margin:60px 0 20px;text-align:center;color:var(--ink2);font-size:.92rem;}
.corp-footer a{color:var(--accent);}
`;