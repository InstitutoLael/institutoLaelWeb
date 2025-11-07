// src/components/PaymentsInfo.jsx
import { useMemo, useState } from "react";
import { copy as copyData } from "../data/copy.js";

/* Normaliza URL del sitio si viene sin protocolo */
function normSite(urlish = "") {
  const s = String(urlish || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

export default function PaymentsInfo() {
  const [msg, setMsg] = useState("");
  const p = useMemo(() => copyData?.payments ?? {}, []);

  const hasAny =
    p.businessName || p.rut || p.accountType || p.accountNumber || p.email || p.site || p.note;

  async function copyToClipboard(label, text) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(String(text));
      setMsg(`${label} copiado ✓`);
    } catch {
      setMsg("No se pudo copiar");
    } finally {
      setTimeout(() => setMsg(""), 1400);
    }
  }

  if (!hasAny) {
    return (
      <section className="payinfo">
        <style>{css}</style>
        <div className="panel muted">
          No hay datos de pago configurados. Completa <code>copy.payments</code> en{" "}
          <code>src/data/copy.js</code>.
        </div>
      </section>
    );
  }

  const rows = [
    p.businessName && { k: "Nombre", v: p.businessName, copyLabel: "Nombre" },
    p.rut && { k: "RUT", v: p.rut, copyLabel: "RUT" },
    p.accountType && { k: "Tipo de cuenta", v: p.accountType },
    p.accountNumber && { k: "N° de cuenta", v: p.accountNumber, mono: true, copyLabel: "N° de cuenta" },
    p.email && {
      k: "Correo comprobantes",
      v: p.email,
      isLink: `mailto:${p.email}`,
      copyLabel: "Correo",
    },
    p.site && {
      k: "Sitio web",
      v: p.site,
      isLink: normSite(p.site),
      copyLabel: "Sitio web",
    },
  ].filter(Boolean);

  return (
    <section className="payinfo" aria-labelledby="payinfo-title">
      <style>{css}</style>

      <h3 id="payinfo-title" className="title">
        <span role="img" aria-label="pago" className="ico">💳</span>
        Datos de pago
      </h3>

      <div className="panel">
        <div className="grid">
          {rows.map((r) => (
            <div className="row" key={r.k}>
              <div className="k">{r.k}</div>
              <div className={`v ${r.mono ? "mono" : ""}`}>
                {r.isLink ? (
                  <a href={r.isLink} target={r.isLink.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {r.v}
                  </a>
                ) : (
                  r.v
                )}
              </div>
              {r.copyLabel && (
                <button
                  type="button"
                  className="copy"
                  onClick={() => copyToClipboard(r.copyLabel, r.v)}
                  aria-label={`Copiar ${r.copyLabel}`}
                >
                  Copiar
                </button>
              )}
            </div>
          ))}

          {p.note && (
            <div className="note">
              {p.note}
            </div>
          )}
        </div>

        {/* feedback accesible */}
        <div className="sr" role="status" aria-live="polite">
          {msg}
        </div>
        {msg && <div className="toast">{msg}</div>}
      </div>
    </section>
  );
}

/* ───────────── CSS local, sin Bootstrap ───────────── */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --bd:#1f2a44;
  --ink:#ffffff; --muted:#cfe0ff; --accent:#5850EC;
}
.payinfo{ color:var(--ink); }
.title{
  display:flex; align-items:center; gap:8px; margin:0 0 10px; font-size:1rem; font-weight:900;
}
.title .ico{ font-size:1.1rem }

.panel{
  border:1px solid var(--bd);
  background:linear-gradient(180deg,#0f172a,#0b1220);
  border-radius:16px; padding:14px;
  box-shadow:0 12px 28px rgba(2,6,23,.30);
}
.panel.muted{
  color:#cbd5e1; background:linear-gradient(180deg,#0f172a,#0b1220);
}

.grid{
  display:grid; gap:10px;
  grid-template-columns: 1fr; /* 1 col en móvil */
}
@media (min-width: 760px){
  .grid{ grid-template-columns: 1fr 1fr; } /* 2 col en pantallas medianas+ */
}

/* Cada fila es auto-ajuste, no se aplasta */
.row{
  display:grid; gap:8px; align-items:center;
  grid-template-columns: 160px 1fr auto;
  padding:10px; border:1px solid #22304f; border-radius:12px;
  background:#0e1424;
}
.k{ color:#9fb3c8; font-weight:700; }
.v{ color:#fff; word-break:break-word; }
.v a{ color:#eaf2ff; text-decoration:underline; text-underline-offset:2px; }
.mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; }

.copy{
  padding:.44rem .7rem; border-radius:10px; border:1px solid #2b3656; background:#0f172a; color:#eaf2ff;
}
.copy:hover{ transform:translateY(-1px); box-shadow:0 10px 20px rgba(2,6,23,.28); }

/* Nota grande ocupa toda la fila */
.note{
  grid-column: 1 / -1;
  border:1px dashed #2b3b61; background:#0f172a; color:#eaf2ff;
  padding:.7rem .9rem; border-radius:12px; margin-top:2px;
}

/* Toast breve */
.toast{
  margin-top:10px; display:inline-block;
  background:#0f172a; color:#b9f8cc; border:1px solid #1d6a3d;
  padding:.35rem .6rem; border-radius:8px; font-weight:800;
}

/* Screen reader only */
.sr{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
`;