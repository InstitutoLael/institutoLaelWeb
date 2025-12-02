// src/data/config.js

const DOMAIN = "https://institutolael.cl";

/**
 * CONFIGURACIÓN MAESTRA DEL INSTITUTO LAEL
 * Aquí vive toda la información estática del sitio.
 */

export const BRAND = {
  name: "Instituto Lael",
  legalName: "Instituto Lael SpA", // Útil para el footer o facturas
  domain: DOMAIN,
  slogan: "Educación online, pero humana.",
  description:
    "Transformamos futuros con educación accesible y de calidad. Preuniversitario PAES, Idiomas (Inglés, Coreano) y Lengua de Señas Chilena (LSCh).",
  // Logo principal para metadata (Schema.org)
  logoUrl: `${DOMAIN}/meta/logo-lael.png`, 
};

export const SEO = {
  defaultTitle: "Instituto Lael | El Futuro de la Educación",
  titleTemplate: "%s | Instituto Lael",
  defaultDescription: 
    "Prepárate para la PAES, aprende idiomas o certifícate en LSCh con clases en vivo y acompañamiento real. Matrículas abiertas 2026.",
  // La imagen que sale al compartir en WhatsApp (1200x630px)
  defaultImage: `${DOMAIN}/meta/og-lael.jpg`, 
  locale: "es_CL",
  themeColor: "#0f172a", // Coincide con tu CSS var(--bg-deep)
  twitterHandle: "@institutolael",
};

export const CONTACT = {
  address: {
    street: "Manutara 3424",
    locality: "San Joaquín",
    region: "Región Metropolitana",
    country: "Chile",
    postalCode: "8900000",
    mapLink: "https://maps.app.goo.gl/tudireccion...", // Opcional: Link a Google Maps
  },
  whatsapp: {
    display: "+56 9 6462 6568",
    number: "56964626568",
    // Link directo pre-llenado con mensaje
    link: "https://wa.me/56964626568?text=Hola%20Instituto%20Lael,%20quiero%20m%C3%A1s%20informaci%C3%B3n.",
  },
  email: {
    general: "contacto@institutolael.cl",
    pagos: "pagos@institutolael.cl",
    soporte: "alumnos@institutolael.cl",
  },
};

export const SOCIAL = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/institutolael",
    handle: "@institutolael",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@institutolael",
    handle: "@institutolael",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@institutolael",
    handle: "@institutolael", // Si tienen, agrégalo, es vital para PAES
  },
  // { name: "Facebook", url: "..." },
  // { name: "LinkedIn", url: "..." },
];

/**
 * Helper para obtener Schema.org (Organization)
 * Esto se usa en SEOHead.jsx para decirle a Google quiénes son.
 */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": BRAND.name,
  "url": DOMAIN,
  "logo": BRAND.logoUrl,
  "description": BRAND.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONTACT.address.street,
    "addressLocality": CONTACT.address.locality,
    "addressRegion": CONTACT.address.region,
    "postalCode": CONTACT.address.postalCode,
    "addressCountry": "CL",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": `+${CONTACT.whatsapp.number}`,
    "contactType": "customer service",
    "areaServed": "CL",
    "availableLanguage": ["Es"],
  },
  "sameAs": SOCIAL.map((s) => s.url),
};