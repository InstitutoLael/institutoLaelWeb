// src/components/HeadTags.jsx
import { Helmet } from "react-helmet";

/** Normaliza URL absoluta y segura (https) */
const ABS = (u) => {
  if (!u) return "";
  const s = String(u).trim();
  if (/^https?:\/\//i.test(s)) return s.replace(/^http:\/\//i, "https://");
  return `https://${s.replace(/^\/+/, "")}`;
};

/**
 * HeadTags — Meta & SEO para SPA
 *
 * Props útiles:
 * - title, description
 * - url (canonical), image, imageAlt
 * - type: "website" | "article"
 * - publishedTime, modifiedTime (ISO) -> solo si type="article"
 * - twitterHandle (ej: "@institutolael")
 * - locale (ej: "es_CL")
 * - siteName (default: "Instituto Lael")
 * - noindex (fuerza noindex)
 * - keywords (string o string[])
 * - hreflangs: [{ hrefLang: "es-cl", href: "https://..." }, ...]
 * - breadcrumbs: [{ name:"Inicio", url:"/" }, ...]
 */
export default function HeadTags({
  title = "Instituto Lael — Educación online, pero humana",
  description = "Preuniversitario PAES, Idiomas (Inglés y Coreano) y Lengua de Señas Chilena (LSCh). Clases en vivo, acompañamiento real y accesibilidad para todos.",
  url,
  image = "https://institutolael.cl/meta/og-lael.jpg",
  imageAlt = "Instituto Lael: educación online, cercana y clara",
  type = "website",
  publishedTime,
  modifiedTime,
  twitterHandle = "@institutolael",
  locale = "es_CL",
  siteName = "Instituto Lael",
  noindex = false,
  keywords,
  hreflangs = [
    { hrefLang: "es-cl", href: "https://institutolael.cl/" },
    { hrefLang: "x-default", href: "https://institutolael.cl/" },
  ],
  breadcrumbs, // opcional: [{name, url}, ...]
}) {
  // ===== Contexto runtime seguro =====
  const runtime = typeof window !== "undefined";
  const loc = runtime ? window.location : null;
  const baseUrl = runtime ? `${loc.protocol}//${loc.host}` : "https://institutolael.cl";

  // Canonical: si no viene, deriva de location.pathname (sin hash, sin params de tracking)
  let canonical = url;
  if (!canonical && runtime) {
    const clean = new URL(loc.href);
    // Borra parámetros comunes de tracking
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","gclid"].forEach(p => clean.searchParams.delete(p));
    clean.hash = "";
    canonical = clean.toString();
  }
  canonical ||= baseUrl;

  // noindex en entornos de preview si no fue forzado lo contrario
  const isPreview =
    runtime &&
    (loc.hostname.includes("netlify.app") ||
     loc.hostname.includes("localhost") ||
     loc.hostname.startsWith("preview-"));

  const shouldNoIndex = noindex || isPreview;

  // Normaliza imagen OG
  const ogImage = ABS(image);
  const ogSecure = ogImage;

  // ===== JSON-LD =====
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/meta/logo-lael.png`,
    sameAs: [
      "https://www.instagram.com/institutolael",
      "https://www.youtube.com/@institutolael",
      // agrega otras redes si quieres:
      // "https://www.facebook.com/...",
      // "https://www.linkedin.com/company/..."
    ],
    description:
      "Instituto Lael ofrece programas online en PAES, Idiomas y Lengua de Señas Chilena, con valores de fe, inclusión y acompañamiento real.",
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name: siteName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const crumbsLd =
    Array.isArray(breadcrumbs) && breadcrumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: b.name,
            item: ABS(b.url?.startsWith("http") ? b.url : `${baseUrl}${b.url || "/"}`),
          })),
        }
      : null;

  // Keywords normalizados
  const kw =
    typeof keywords === "string"
      ? keywords
      : Array.isArray(keywords)
      ? keywords.join(", ")
      : undefined;

  return (
    <Helmet defaultTitle={siteName} titleTemplate={`%s · ${siteName}`}>
      {/* SEO básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {kw && <meta name="keywords" content={kw} />}
      <link rel="canonical" href={canonical} />

      {/* Indexación */}
      {shouldNoIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta
          name="robots"
          content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
        />
      )}

      {/* UI móvil */}
      <meta name="theme-color" content="#0b1220" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogSecure} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* hreflang alternates */}
      {Array.isArray(hreflangs) &&
        hreflangs.map((h) => (
          <link key={h.hrefLang} rel="alternate" hrefLang={h.hrefLang} href={ABS(h.href)} />
        ))}

      {/* Favicons (asegúrate de tenerlos en /public) */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteLd)}</script>
      {crumbsLd && <script type="application/ld+json">{JSON.stringify(crumbsLd)}</script>}
    </Helmet>
  );
}