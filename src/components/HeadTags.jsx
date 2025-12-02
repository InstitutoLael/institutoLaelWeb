// src/components/HeadTags.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

// ==========================================
// CONFIGURACIÓN GLOBAL DEL INSTITUTO
// ==========================================
const SITE_CONFIG = {
  name: "Instituto Lael",
  defaultTitle: "Instituto Lael — Educación online, pero humana",
  defaultDescription: "Preuniversitario PAES, Idiomas (Inglés y Coreano) y Lengua de Señas Chilena (LSCh). Clases en vivo, acompañamiento real y accesibilidad.",
  baseUrl: "https://institutolael.cl",
  defaultImage: "/meta/og-lael.jpg", // Asegúrate de que esta imagen exista en /public
  twitterHandle: "@institutolael",
  locale: "es_CL",
  themeColor: "#0b1220", // Color de la barra del navegador en móviles
  socials: [
    "https://www.instagram.com/institutolael",
    "https://www.youtube.com/@institutolael",
    "https://www.facebook.com/institutolael" // Agrega las que tengas
  ]
};

/** * Función auxiliar: Asegura que la URL sea absoluta y segura (https)
 * Ejemplo: "/curso" -> "https://institutolael.cl/curso"
 */
const getAbsoluteUrl = (path) => {
  if (!path) return SITE_CONFIG.baseUrl;
  if (/^https?:\/\//i.test(path)) return path; // Ya es absoluta
  return `${SITE_CONFIG.baseUrl}${path.startsWith('/') ? path : '/' + path}`;
};

export default function HeadTags({
  title,
  description,
  url, // URL específica de la página actual
  image,
  imageAlt = "Estudiantes de Instituto Lael aprendiendo online",
  type = "website", // 'website' | 'article' | 'profile'
  noindex = false, // true para ocultar página de Google
  publishedTime,
  modifiedTime,
}) {
  // 1. Lógica de URL Canónica (Evita contenido duplicado en Google)
  const currentUrl = url ? getAbsoluteUrl(url) : (typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.baseUrl);
  const cleanUrl = currentUrl.split('?')[0]; // Quitamos parámetros de rastreo (?utm_source...)

  // 2. Lógica de Imagen para compartir (Open Graph)
  // Si no pasas imagen, usa la por defecto definida arriba
  const ogImage = getAbsoluteUrl(image || SITE_CONFIG.defaultImage);

  // 3. Título Inteligente
  // Si hay título: "Curso de Coreano · Instituto Lael"
  // Si no hay: "Instituto Lael — Educación online..."
  const fullTitle = title ? `${title} · ${SITE_CONFIG.name}` : SITE_CONFIG.defaultTitle;
  const finalDescription = description || SITE_CONFIG.defaultDescription;

  // 4. Detección de Entorno de Desarrollo (Para no indexar localhost)
  const isDev = typeof window !== 'undefined' && (
    window.location.hostname.includes("localhost") || 
    window.location.hostname.includes("netlify.app")
  );
  const shouldNoIndex = noindex || isDev;

  // 5. Datos Estructurados (JSON-LD) para Google
  // Esto le dice a Google: "Somos una Organización Educativa"
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.baseUrl,
    "logo": getAbsoluteUrl("/meta/logo-lael.png"),
    "sameAs": SITE_CONFIG.socials,
    "description": finalDescription,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL" // Chile
    }
  };

  return (
    <Helmet>
      {/* --- BÁSICOS --- */}
      <title>{title ? fullTitle : SITE_CONFIG.defaultTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={cleanUrl} />
      <meta name="theme-color" content={SITE_CONFIG.themeColor} />

      {/* --- ROBOTS (Indexación) --- */}
      {shouldNoIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* --- OPEN GRAPH (Facebook, WhatsApp, LinkedIn) --- */}
      <meta property="og:locale" content={SITE_CONFIG.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || SITE_CONFIG.defaultTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={cleanUrl} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      
      {/* IMAGEN GRANDE (Lo que querías) */}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      {/* --- TWITTER / X --- */}
      <meta name="twitter:card" content="summary_large_image" /> {/* Hace que la imagen se vea grande */}
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={title || SITE_CONFIG.defaultTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* --- DATOS PARA ARTÍCULOS (Blog) --- */}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* --- SCHEMA.ORG (Google Rich Results) --- */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  );
}

// Validación de tipos (Ayuda a VS Code a sugerirte cosas)
HeadTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'profile']),
  noindex: PropTypes.bool,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
};