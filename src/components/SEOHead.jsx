// src/components/SEOHead.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/* --- CONFIGURACIÓN GLOBAL INSTITUTO LAEL --- */
const CONFIG = {
  defaultTitle: "Instituto Lael",
  titleTemplate: "%s | Instituto Lael",
  defaultDescription: "Educación online con acompañamiento real. Preuniversitario PAES, Idiomas (Inglés, Coreano) y Lengua de Señas Chilena (LSCh). Clases en vivo y valores cristianos.",
  siteUrl: "https://institutolael.cl",
  defaultImage: "https://institutolael.cl/meta/og-lael.jpg", // Tu imagen maestra de 1200x630
  twitterHandle: "@institutolael",
  themeColor: "#0f172a", // Dark Mode Base
  locale: "es_CL"
};

/**
 * SEOHead Component — "The All-Seeing Eye"
 * * Gestiona absolutamente todo lo que los robots necesitan saber.
 * Integra: Metadatos, OpenGraph, Twitter Cards y JSON-LD (Schema.org).
 */
export default function SEOHead({
  title,
  description,
  image,
  type = "website", // 'website' | 'article' | 'profile'
  keywords, // String separada por comas o array
  publishedTime, // ISO String (para artículos)
  modifiedTime,  // ISO String (para actualizaciones)
  noindex = false, // true para ocultar página de Google
  jsonLd, // Datos estructurados extra personalizados
}) {
  const location = useLocation();
  
  // 1. URL Canónica Dinámica (Limpia parámetros de tracking como ?utm_source)
  const pathname = location.pathname;
  const canonicalUrl = `${CONFIG.siteUrl}${pathname === '/' ? '' : pathname}`;
  
  // 2. Imagen Robusta (Si falla la específica, usa la default)
  const metaImage = image 
    ? (image.startsWith('http') ? image : `${CONFIG.siteUrl}${image}`)
    : CONFIG.defaultImage;

  // 3. Descripción con Fallback
  const metaDescription = description || CONFIG.defaultDescription;

  // 4. Normalización de Keywords
  const metaKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  // 5. Generación de Schema.org (JSON-LD)
  // Esto es lo que hace que aparezcas con "fichas ricas" en Google
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Instituto Lael",
      "url": CONFIG.siteUrl,
      "logo": `${CONFIG.siteUrl}/meta/logo-lael.png`,
      "sameAs": [
        "https://www.instagram.com/institutolael",
        "https://www.youtube.com/@institutolael",
        "https://www.facebook.com/institutolael"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "areaServed": "CL",
        "availableLanguage": ["Es"]
      }
    },
    // Breadcrumbs automáticos basados en la URL actual
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
    },
    // Inyección manual si la hay
    ...(Array.isArray(jsonLd) ? jsonLd : (jsonLd ? [jsonLd] : []))
  ];

  return (
    <Helmet>
      {/* --- CONTROL DEL NAVEGADOR --- */}
      <html lang="es-CL" />
      <title>{title ? CONFIG.titleTemplate.replace('%s', title) : CONFIG.defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content={CONFIG.themeColor} />
      
      {/* --- CONTROL DE ROBOTS --- */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

      {/* --- OPEN GRAPH (El estándar para compartir) --- */}
      <meta property="og:site_name" content="Instituto Lael" />
      <meta property="og:locale" content={CONFIG.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || CONFIG.defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* IMÁGENES (Optimizadas para WhatsApp/LinkedIn) */}
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || "Instituto Lael - Educación Online"} />

      {/* DATOS DE ARTÍCULO (Solo si type='article') */}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content="Instituto Lael" />}

      {/* --- TWITTER CARDS (X) --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={CONFIG.twitterHandle} />
      <meta name="twitter:title" content={title || CONFIG.defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* --- SCHEMA.ORG JSON-LD (Invisible para humanos, Oro para Google) --- */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
}