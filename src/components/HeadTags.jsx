// src/components/HeadTags.jsx
import { Helmet } from "react-helmet";

const ABS = (u) => (u?.startsWith("http") ? u : `https://${u?.replace(/^\/+/, "")}`);

export default function HeadTags({
  title = "Instituto Lael — Educación online, pero humana",
  description = "Preuniversitario PAES, Idiomas (Inglés y Coreano) y Lengua de Señas Chilena (LSCh). Clases en vivo, acompañamiento real y accesibilidad para todos.",
  url,           // si no lo pasas, se calcula desde window.location
  image = "https://institutolael.cl/meta/og-lael.jpg",
  imageAlt = "Instituto Lael: educación online, cercana y clara",
  twitterHandle = "@institutolael",
  locale = "es_CL",
}) {
  // === Contexto runtime (evita hardcodear el dominio) ===
  const runtime = typeof window !== "undefined";
  const loc = runtime ? window.location : null;
  const baseUrl = runtime
    ? `${loc.protocol}//${loc.host}`
    : "https://institutolael.cl";
  const canonical = url || (runtime ? `${baseUrl}${loc.pathname}${loc.search ? "" : ""}` : baseUrl);

  // Detecta entornos no productivos (noindex)
  const isPreview =
    runtime &&
    (loc.hostname.includes("netlify.app") ||
     loc.hostname.includes("localhost") ||
     loc.hostname.startsWith("preview-"));

  // Normaliza imagen absoluta y segura
  const ogImage = ABS(image);
  const ogSecure = ogImage.replace(/^http:\/\//, "https://");

  // === JSON-LD (Organization + WebSite) ===
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Instituto Lael",
    url: baseUrl,
    logo: `${baseUrl}/meta/logo-lael.png`,
    sameAs: [
      "https://www.instagram.com/institutolael",
      "https://www.youtube.com/@institutolael",
    ],
    description:
      "Instituto Lael es un espacio educativo cristiano que ofrece programas online en PAES, Idiomas y Lengua de Señas Chilena, con valores de fe, inclusión y acompañamiento real.",
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name: "Instituto Lael",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet defaultTitle="Instituto Lael" titleTemplate="%s · Instituto Lael">
      {/* SEO básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {isPreview && <meta name="robots" content="noindex,nofollow" />}
      {!isPreview && <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large" />}

      {/* Color UI móvil */}
      <meta name="theme-color" content="#0b1220" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Instituto Lael" />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogSecure} />
      <meta property="og:image:alt" content={imageAlt} />
      {/* Si conoces dimensiones del OG (recomendado 1200x630) */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Favicons básicos (mejor si tienes versiones múltiples en /public) */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteLd)}</script>
    </Helmet>
  );
}