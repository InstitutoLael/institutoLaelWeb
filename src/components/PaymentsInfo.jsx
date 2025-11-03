// src/components/PaymentsInfo.jsx
import { useMemo, useState } from "react";
import { copy } from "../data/copy.js";

function normSite(urlish = "") {
  const s = String(urlish || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

export default function PaymentsInfo() {
  const [copied, setCopied] = useState("");
  const p = useMemo(() => copy?.payments ?? {}, []);

  const hasAny =
    p.businessName || p.rut || p.accountType || p.accountNumber || p.email || p.site || p.note;

  async function copyToClipboard(label, text) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(String(text));
      setCopied(`${label} copiado`);
      setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("No se pudo copiar");
      setTimeout(() => setCopied(""), 1400);
    }
  }

  if (!hasAny) {
    return (
      <section className="my-4">
        <div className="card-float p-3 p-md-4 small text-muted">
          No hay datos de pago configurados. Completa <code>copy.payments</code> en{" "}
          <code>src/data/copy.js</code>.
        </div>
      </section>
    );
  }

  const backupCard = {
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    boxShadow: "0 8px 22px rgba(16,24,40,.06)",
  };

  return (
    <section className="my-4" aria-labelledby="payinfo-title">
      <h3 id="payinfo-title" className="h6 mb-3 d-flex align-items-center gap-2">
        <span role="img" aria-label="pago">💳</span>
        Datos de pago
      </h3>

      <div className="row g-3 small card-float p-3 p-md-4" style={backupCard}>
        {p.businessName && (
          <div className="col-sm-6">
            <div className="text-muted">Nombre</div>
            <div className="fw-semibold">{p.businessName}</div>
          </div>
        )}

        {p.rut && (
          <div className="col-sm-6">
            <div className="text-muted d-flex align-items-center justify-content-between">
              <span>RUT</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => copyToClipboard("RUT", p.rut)}
              >
                Copiar
              </button>
            </div>
            <div className="fw-semibold">{p.rut}</div>
          </div>
        )}

        {p.accountType && (
          <div className="col-sm-6">
            <div className="text-muted">Tipo de cuenta</div>
            <div className="fw-semibold">{p.accountType}</div>
          </div>
        )}

        {p.accountNumber && (
          <div className="col-sm-6">
            <div className="text-muted d-flex align-items-center justify-content-between">
              <span>N° de cuenta</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => copyToClipboard("N° de cuenta", p.accountNumber)}
              >
                Copiar
              </button>
            </div>
            <div className="fw-semibold" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              {p.accountNumber}
            </div>
          </div>
        )}

        {p.email && (
          <div className="col-sm-6">
            <div className="text-muted">Correo para comprobantes</div>
            <a href={`mailto:${p.email}`} className="fw-semibold text-decoration-none">
              {p.email}
            </a>
          </div>
        )}

        {p.site && (
          <div className="col-sm-6">
            <div className="text-muted">Sitio web</div>
            <a href={normSite(p.site)} target="_blank" rel="noreferrer" className="fw-semibold text-decoration-none">
              {p.site}
            </a>
          </div>
        )}

        {p.note && (
          <div className="col-12">
            <div className="alert alert-info border mt-1 small m-0">{p.note}</div>
          </div>
        )}

        <div className="visually-hidden" role="status" aria-live="polite">
          {copied}
        </div>
        {copied && <div className="col-12 text-success small mt-1">{copied}</div>}
      </div>
    </section>
  );
}
