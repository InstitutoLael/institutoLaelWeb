// src/components/SEOHead.jsx
import { useEffect } from "react";

/**
 * SEOHead — metatags mínimos para SPA sin SSR
 * - title, description
 * - og:title / og:description / og:type / og:url / og:image
 * - twitter cards básicas
 * - canonical
 */
export default function SEOHead({
  title,
  description,
  image = "https://institutolael.cl/meta/og-lael.jpg",
  url = typeof window !== "undefined" ? window.location.href : "https://institutolael.cl/",
}) {
  useEffect(() => {
    const base = "Instituto Lael";
    const fullTitle = title ? `${title} — ${base}` : base;
    const desc = description || "Educación online con acompañamiento real: PAES, Inglés y Lengua de Señas Chilena.";

    document.title = fullTitle;

    // Meta comunes
    upsert('meta[name="description"]', { name: "description", content: desc });
    upsert('link[rel="canonical"]', { rel: "canonical", href: url });

    // Open Graph
    upsert('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsert('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsert('meta[property="og:description"]', { property: "og:description", content: desc });
    upsert('meta[property="og:image"]', { property: "og:image", content: image });
    upsert('meta[property="og:url"]', { property: "og:url", content: url });
    upsert('meta[property="og:site_name"]', { property: "og:site_name", content: base });

    // Twitter
    upsert('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsert('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    upsert('meta[name="twitter:description"]', { name: "twitter:description", content: desc });
    upsert('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsert('meta[name="twitter:creator"]', { name: "twitter:creator", content: "@institutolael" });
  }, [title, description, image, url]);

  return null;
}

/**
 * Crea o actualiza una etiqueta <meta> o <link> de forma segura.
 */
function upsert(selector, attrs) {
  const head = document.head;
  let el = head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.tagName || selector.startsWith("link") ? "link" : "meta");
    head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}