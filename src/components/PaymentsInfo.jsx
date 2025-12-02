// src/components/PaymentsInfo.jsx
import { useMemo, useState } from "react";
import { copy as copyData } from "../data/copy.js";

// --- ÍCONOS SVG NATIVOS (Sin librerías) ---
const ICONS = {
  card: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  copy: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  check: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#4ade80"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  user: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  mail: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  globe: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-9 3-9m-1 18c-1.657 0-3-9-3-9m-9 9a9 9 0 019-9" /></svg>,
  hash: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
};

function normSite(urlish = "") {
  const s = String(urlish || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

export default function PaymentsInfo() {
  // Estado para saber QUÉ campo se copió específicamente
  const [copiedKey, setCopiedKey] = useState(null);
  
  const p = useMemo(() => copyData?.payments ?? {}, []);
  const hasAny = Object.values(p).some(Boolean);

  const copyToClipboard = async (key, text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(String(text));
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Error al copiar", err);
    }
  };

  if (!hasAny) return null; // Si no hay datos, mejor no renderizar nada o un skeleton

  // Configuración de filas con sus íconos
  const rows = [
    p.businessName && { k: "name", label: "Beneficiario", val: p.businessName, icon: ICONS.user },
    p.rut && { k: "rut", label: "RUT", val: p.rut, icon: ICONS.card },
    p.accountType && { k: "type", label: "Tipo de Cuenta", val: p.accountType, icon: ICONS.hash },
    p.accountNumber && { k: "number", label: "N° Cuenta", val: p.accountNumber, icon: ICONS.card, mono: true, highlight: true },
    p.email && { k: "email", label: "Correo", val: p.email, icon: ICONS.mail, link: `mailto:${p.email}` },
    p.site && { k: "site", label: "Web", val: p.site, icon: ICONS.globe, link: normSite(p.site) },
  ].filter(Boolean);

  const css = `
    .pay-card {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      /* Glassmorphism Dark Theme */
      background: rgba(15, 23, 42, 0.6); 
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
      padding: 24px;
      color: #e2e8f0;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Brillo superior tipo tarjeta */
    .pay-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    }

    .pay-header {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 15px;
    }
    .pay-title { font-size: 1.1rem; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
    .pay-badge { 
      font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); 
      color: #a5b4fc; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(99, 102, 241, 0.3);
    }

    .pay-grid {
      display: grid; gap: 12px;
    }

    .pay-row {
      display: grid;
      grid-template-columns: 24px 130px 1fr auto;
      align-items: center;
      padding: 10px 14px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }
    
    .pay-row:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    /* Versión móvil */
    @media (max-width: 500px) {
      .pay-row { 
        grid-template-columns: 24px 1fr auto; 
        gap: 4px;
      }
      .pay-label { display: none; } /* Ocultamos etiqueta en móvil si es muy estrecho */
    }

    .pay-icon { color: #94a3b8; display: flex; }
    .pay-label { font-size: 0.85rem; color: #64748b; font-weight: 600; }
    
    .pay-val { 
      color: #f1f5f9; font-weight: 500; font-size: 0.95rem; 
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      margin-right: 10px;
    }
    
    .pay-val.mono { 
      font-family: 'SF Mono', 'Roboto Mono', Menlo, monospace; 
      letter-spacing: 0.5px; 
      font-size: 1.05rem;
    }
    .pay-val.highlight { color: #38bdf8; font-weight: 700; }

    .pay-val a { color: #818cf8; text-decoration: none; border-bottom: 1px dashed #818cf8; }
    
    .pay-btn {
      background: transparent; border: none; cursor: pointer;
      color: #64748b; padding: 6px; border-radius: 6px;
      transition: all 0.2s; display: flex; align-items: center; justify-content: center;
    }
    .pay-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .pay-btn.copied { color: #4ade80; background: rgba(74, 222, 128, 0.1); }

    .pay-note {
      margin-top: 15px; padding: 12px;
      background: rgba(251, 191, 36, 0.05); /* Amarillo sutil */
      border: 1px dashed rgba(251, 191, 36, 0.3);
      border-radius: 8px; font-size: 0.85rem; color: #fcd34d;
      line-height: 1.5; text-align: center;
    }
  `;

  return (
    <section className="pay-card" aria-label="Datos bancarios">
      <style>{css}</style>
      
      <div className="pay-header">
        <span className="pay-icon" style={{color: '#a5b4fc'}}>{ICONS.card}</span>
        <h3 className="pay-title">Datos de Transferencia</h3>
        <span className="pay-badge">Cuenta Vista/Corriente</span>
      </div>

      <div className="pay-grid">
        {rows.map((r) => (
          <div className="pay-row" key={r.k}>
            {/* 1. Icono */}
            <div className="pay-icon" aria-hidden="true">{r.icon}</div>
            
            {/* 2. Etiqueta (Ej: RUT) */}
            <div className="pay-label">{r.label}</div>
            
            {/* 3. Valor */}
            <div className={`pay-val ${r.mono ? 'mono' : ''} ${r.highlight ? 'highlight' : ''}`}>
              {r.link ? (
                <a href={r.link} target="_blank" rel="noreferrer">{r.val}</a>
              ) : (
                r.val
              )}
            </div>

            {/* 4. Botón Copiar */}
            {!r.link && (
              <button
                type="button"
                className={`pay-btn ${copiedKey === r.k ? 'copied' : ''}`}
                onClick={() => copyToClipboard(r.k, r.val)}
                aria-label={`Copiar ${r.label}`}
                title="Copiar al portapapeles"
              >
                {copiedKey === r.k ? ICONS.check : ICONS.copy}
              </button>
            )}
          </div>
        ))}
      </div>

      {p.note && (
        <div className="pay-note">
          ⚠️ {p.note}
        </div>
      )}
    </section>
  );
}