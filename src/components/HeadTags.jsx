// src/components/HeadTags.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/* CONFIGURACIÓN CENTRAL
  En un futuro, esto podría venir de src/data/config.js
*/
const CONFIG = {
  name: "Instituto Lael",
  slogan: "Educación online, pero humana",
  domain: "https://institutolael.cl",
  twitter: "@institutolael",
  themeColor: "#0f172a", // Dark Mode Base (Slate 900 aprox)
};

/**
 * HeadTags Component
 * Maneja el SEO, OpenGraph y Metadata de forma profesional.
 * Se integra silenciosamente en cada página.
 */
export default function HeadTags({
  title,
  description = "Preuniversitario PAES, Idiomas (Inglés y Coreano), Lengua de Señas y Escuela de Adultos. Clases en vivo con valores cristianos y excelencia académica.",
  image = "/meta/og-default.jpg", // Asegúrate de tener esta imagen (1200x630)
  url,
  noindex = false // Para páginas internas o de pago
}) {
  
  // Construcción de URL absoluta segura
  const siteUrl = url 
    ? (url.startsWith('http') ? url : `${CONFIG.domain}${url}`)
    : (typeof window !== 'undefined' ? window.location.href : CONFIG.domain);

  // Título compuesto: "Curso de Coreano | Instituto Lael"
  const docTitle = title ? `${title} | ${CONFIG.name}` : `${CONFIG.name} — ${CONFIG.slogan}`;
  
  // URL de imagen absoluta
  const ogImage = image.startsWith('http') ? image : `${CONFIG.domain}${image}`;

  return (
    <Helmet>
      {/* --- BÁSICOS --- */}
      <title>{docTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />
      <meta name="theme-color" content={CONFIG.themeColor} />

      {/* --- OPEN GRAPH (WhatsApp, Facebook, LinkedIn) --- */}
      <meta property="og:site_name" content={CONFIG.name} />
      <meta property="og:title" content={docTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      
      {/* --- TWITTER CARDS (X) --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={CONFIG.twitter} />
      <meta name="twitter:title" content={docTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* --- ROBOTS --- */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
    </Helmet>
  );
}

HeadTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  noindex: PropTypes.bool
};