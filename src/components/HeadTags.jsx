// src/components/HeadTags.jsx
import { Helmet } from "react-helmet";

export default function HeadTags({
  title = "Instituto Lael — Educación online, pero humana",
  description = "Preuniversitario PAES, Idiomas (Inglés y Coreano) y Lengua de Señas Chilena (LSCh). Clases en vivo, acompañamiento real y accesibilidad para todos.",
  url = "https://institutolael.cl/",
  image = "https://institutolael.cl/meta/og-lael.jpg",
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Instituto Lael",
    url,
    logo: "https://institutolael.cl/meta/logo-lael.png",
    sameAs: [
      "https://www.instagram.com/institutolael",
      "https://www.youtube.com/@institutolael"
    ],
    description:
      "Instituto Lael es un espacio educativo cristiano que ofrece programas online en PAES, Idiomas y Lengua de Señas Chilena, con valores de fe, inclusión y acompañamiento real.",
  };

  return (
    <Helmet>
      {/* SEO básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Instituto Lael" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@institutolael" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* JSON-LD para Google */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
