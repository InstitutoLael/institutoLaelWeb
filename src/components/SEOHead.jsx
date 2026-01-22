// src/components/SEOHead.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/* --- CONFIGURACIÓN GLOBAL INSTITUTO LAEL --- */
const CONFIG = {
  defaultTitle: "Instituto Lael | Educación con Futuro",
  titleTemplate: "%s | Instituto Lael",
  defaultDescription: "Educación online con acompañamiento real. Preuniversitario PAES, Idiomas (Inglés, Coreano) y Lengua de Señas Chilena (LSCh). Clases en vivo 2026.",
  siteUrl: "https://institutolael.cl",
  defaultImage: "/meta/og-lael.jpg", // Relative for build helper or absolute
  twitterHandle: "@institutolael",
  themeColor: "#050505",
  locale: "es_CL"
};

export default function SEOHead({
  title,
  description,
  image,
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const canonicalUrl = `${CONFIG.siteUrl}${pathname === '/' ? '' : pathname}`;

  // Robust Image URL construction
  const metaImage = image
    ? (image.startsWith('http') ? image : `${CONFIG.siteUrl}${image}`)
    : `${CONFIG.siteUrl}${CONFIG.defaultImage}`;

  const metaDescription = description || CONFIG.defaultDescription;
  const metaKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || "educación online, preu online, paes 2026, idiomas chile, lsch online";

  // Schema.org Integration (JSON-LD)
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Instituto Lael",
      "alternateName": "Lael Experience",
      "url": CONFIG.siteUrl,
      "logo": `${CONFIG.siteUrl}/meta/logo-lael.png`,
      "description": CONFIG.defaultDescription,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CL"
      },
      "sameAs": [
        "https://www.instagram.com/institutolael",
        "https://www.youtube.com/@institutolael",
        "https://linkedin.com/company/instituto-lael"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": CONFIG.siteUrl },
        ...(pathname !== "/" ? [{
          "@type": "ListItem",
          "position": 2,
          "name": title || "Página",
          "item": canonicalUrl
        }] : [])
      ]
    }
  ];

  if (jsonLd) {
    schemaOrg.push(jsonLd);
  }

  return (
    <Helmet>
      {/* Primary HTML Tags */}
      <html lang="es-CL" />
      <title>{title ? CONFIG.titleTemplate.replace('%s', title) : CONFIG.defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content={CONFIG.themeColor} />

      {/* Robots Control */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Instituto Lael" />
      <meta property="og:locale" content={CONFIG.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || CONFIG.defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || "Instituto Lael"} />

      {/* Twitter (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={CONFIG.twitterHandle} />
      <meta name="twitter:title" content={title || CONFIG.defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg.filter(item => item && typeof item === 'object' && item['@context']))}
      </script>
    </Helmet>
  );
}