// src/components/SEOHead.jsx
import { useEffect } from "react";

export default function SEOHead({ title, description }) {
  useEffect(() => {
    const base = "Instituto Lael";
    document.title = title ? `${title} — ${base}` : base;
    upsert('meta[name="description"]', { name: "description", content: description || "Educación online con acompañamiento real: PAES, Inglés y LSCh." });
  }, [title, description]);
  return null;
}

function upsert(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}
