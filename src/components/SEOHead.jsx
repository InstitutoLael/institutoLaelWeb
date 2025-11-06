// src/components/SEOHead.jsx
import { useEffect } from "react";

/**
 * SEOHead — metatags para SPA sin SSR
 *
 * Props:
 * - title:        "PAES | Instituto Lael"
 * - description:  "Clases en vivo..."
 * - path:         "/paes"   -> se usa para canonical (con baseUrl)
 * - image:        URL absoluta a la OG (1200x630 ideal)
 * - siteName:     "Instituto Lael"
 * - baseUrl:      "https://institutolael.cl" (sin slash final)
 * - type:         "website" | "article"
 * - twitterSite:  "@institutolael"
 * - twitterCreator:"@institutolael"
 * - locale:       "es_CL"
 * - noindex:      boolean
 * - jsonLd:       objeto(s) schema.org o false para omitir
 */
export default function SEOHead({
  title,
  description,
  path,
  image = "https://institutolael.cl/meta/og-lael.jpg",
  siteName = "Instituto Lael",
  baseUrl = "https://institutolael.cl",
  type = "website",
  twitterSite = "@institutolael",
  twitterCreator = "@institutolael",
  locale = "es_CL",
  noindex = false,
  jsonLd, // puede ser object o array de objects; si no se envía, inyecto Organization+WebSite por defecto en home
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${siteName}` : siteName;
    const desc =
      description ||
      "Educación online con acompañamiento real: PAES, Inglés y Lengua de Señas Chilena (LSCh).";
    const url = buildCanonical({ baseUrl, path });

    // title
    document.title = fullTitle;

    // robots
    upsert("meta[name='robots']", {
      metaName: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });

    // canonical
    upsert("link[rel='canonical']", {
      tag: "link",
      rel: "canonical",
      href: url,
    });

    // description
    upsert("meta[name='description']", {
      metaName: "description",
      content: desc,
    });

    // Open Graph
    upsert("meta[property='og:type']", { property: "og:type", content: type });
    upsert("meta[property='og:title']", { property: "og:title", content: fullTitle });
    upsert("meta[property='og:description']", { property: "og:description", content: desc });
    upsert("meta[property='og:image']", { property: "og:image", content: image });
    upsert("meta[property='og:url']", { property: "og:url", content: url });
    upsert("meta[property='og:site_name']", { property: "og:site_name", content: siteName });
    upsert("meta[property='og:locale']", { property: "og:locale", content: locale });

    // Twitter
    upsert("meta[name='twitter:card']", { metaName: "twitter:card", content: "summary_large_image" });
    upsert("meta[name='twitter:site']", { metaName: "twitter:site", content: twitterSite });
    upsert("meta[name='twitter:creator']", { metaName: "twitter:creator", content: twitterCreator });
    upsert("meta[name='twitter:title']", { metaName: "twitter:title", content: fullTitle });
    upsert("meta[name='twitter:description']", { metaName: "twitter:description", content: desc });
    upsert("meta[name='twitter:image']", { metaName: "twitter:image", content: image });

    // JSON-LD
    // Limpio anteriores inyectados por este componente
    document.querySelectorAll("script[data-seohead-jsonld='1']").forEach((n) => n.remove());

    const payload = resolveJsonLd({
      jsonLd,
      siteName,
      baseUrl,
      url,
      path,
    });

    if (payload) {
      const items = Array.isArray(payload) ? payload : [payload];
      items.forEach((item) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.dataset.seoheadJsonld = "1";
        s.text = JSON.stringify(item);
        document.head.appendChild(s);
      });
    }
  }, [
    title,
    description,
    path,
    image,
    siteName,
    baseUrl,
    type,
    twitterSite,
    twitterCreator,
    locale,
    noindex,
    jsonLd,
  ]);

  return null;
}

/* ---------------- helpers ---------------- */

function buildCanonical({ baseUrl, path }) {
  // normaliza base sin slash final
  const b = String(baseUrl || "").replace(/\/+$/, "");
  if (path) {
    const p = String(path).startsWith("/") ? path : `/${path}`;
    return `${b}${p}`;
  }
  // fallback a window si no se pasó path
  if (typeof window !== "undefined") return window.location.href;
  return b || "https://institutolael.cl/";
}

/**
 * Crea o actualiza meta/link según selector.
 * Notas:
 * - Para <meta> usa `metaName` (name="...") o `property` (og:*).
 * - Para <link> define `tag:"link"` y sus attrs (rel, href).
 */
function upsert(selector, attrs) {
  const head = document.head;
  let el = head.querySelector(selector);
  if (!el) {
    const tag = attrs.tag || (selector.startsWith("link") ? "link" : "meta");
    el = document.createElement(tag);
    head.appendChild(el);
  }
  // mapear metaName -> name
  const out = { ...attrs };
  if ("metaName" in out) {
    out.name = out.metaName;
    delete out.metaName;
  }
  // attrs no válidos para meta/link
  delete out.tag;

  Object.entries(out).forEach(([k, v]) => {
    if (v != null) el.setAttribute(k, String(v));
  });
}

/**
 * Si no se entrega `jsonLd`, inyecta Organization+WebSite cuando `path` es home.
 */
function resolveJsonLd({ jsonLd, siteName, baseUrl, url, path }) {
  if (jsonLd === false) return null;
  if (jsonLd && typeof jsonLd === "object") return jsonLd;

  const isHome = !path || path === "/" || path === "";
  if (!isHome) return null;

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": baseUrl,
    "logo": "https://institutolael.cl/meta/logo-lael.png",
    "sameAs": [
      "https://www.instagram.com/institutolael",
      "https://www.youtube.com/@institutolael",
    ],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return [org, webSite];
}