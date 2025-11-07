// src/pages/Contacto.jsx
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { seoDefaults } from "../seo.config";

export default function Contacto() {
  // 🧠 Aviso al intentar salir o cambiar de pestaña
  useEffect(() => {
    const handleBlur = () => {
      document.title = "😢 ¡Vuelve pronto! | Instituto Lael";
    };
    const handleFocus = () => {
      document.title = "Contacto — Instituto Lael";
    };
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <section className="contacto-page">
      {/* 🧭 SEO y metadatos */}
      <SEOHead
        title="Contacto"
        description="¿Tienes dudas sobre PAES, Inglés o LSCh? Contáctanos por WhatsApp o correo, respondemos en menos de 24 h hábiles."
        path="/contacto"
        image={`${seoDefaults.site}/meta/og-lael.jpg`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto — Instituto Lael",
          url: `${seoDefaults.site}/contacto`,
        }}
      />

      {/* 🎨 Estilos locales */}
      <style>{css}</style>

      <div className="container">
        <header className="head">
          <h1>Contacto — Instituto Lael</h1>
          <p>
            Si tienes dudas o quieres orientación, completa el formulario y te
            responderemos por <strong>WhatsApp o correo</strong> dentro de 24–48 h hábiles.
          </p>
        </header>

        <div className="form-box">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true"
            width="100%"
            height="1600"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Formulario de contacto Instituto Lael"
            loading="lazy"
          >
            Cargando…
          </iframe>
        </div>

        <p className="backup">
          Si el formulario no carga,{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform"
            target="_blank"
            rel="noreferrer"
          >
            ábrelo en una pestaña nueva
          </a>.
        </p>
      </div>
    </section>
  );
}

const css = `
.contacto-page {
  background: linear-gradient(180deg, #0b1220, #0e1424);
  color: #ffffff;
  min-height: 100vh;
  padding: 48px 0;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}
.head {
  text-align: center;
  margin-bottom: 24px;
}
.head h1 {
  margin-bottom: 8px;
  font-size: clamp(1.8rem, 3vw + .6rem, 2.6rem);
  color: #f2ce3d;
}
.head p {
  color: #eaf2ff;
  max-width: 60ch;
  margin: 0 auto;
}
.form-box {
  border: 1px solid #1f2a44;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(2,6,23,.36);
  background: #fff;
}
iframe {
  display: block;
  width: 100%;
  height: 1600px;
}
.backup {
  text-align: center;
  margin-top: 16px;
  font-size: .95rem;
  color: #dbeafe;
}
.backup a {
  color: #f2ce3d;
  text-decoration: underline;
}
`;