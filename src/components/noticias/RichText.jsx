import React from 'react';
import { Link } from 'react-router-dom';

// Convierte texto simple con **negrita** y [links](url) en elementos React.
// Los links que empiezan con "/" son páginas de Lael; el resto abre en otra pestaña.
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

export default function RichText({ text, linkClassName = '' }) {
  if (!text) return null;
  const parts = String(text).split(TOKEN).filter(Boolean);
  const linkCls = `font-semibold underline underline-offset-4 decoration-[#071D49]/30 hover:decoration-[#071D49] break-words ${linkClassName}`;

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-[#071D49]">{part.slice(2, -2)}</strong>;
    }
    const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (m) {
      const [, label, href] = m;
      if (href.startsWith('/')) {
        return <Link key={i} to={href} className={linkCls}>{label}</Link>;
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {label}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
