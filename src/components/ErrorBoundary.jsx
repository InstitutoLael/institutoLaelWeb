// src/components/ErrorBoundary.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const isProd = !!import.meta?.env?.PROD;

// UID corto para etiquetar el error en reportes
function mkId(){
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { error: null, info: null, errorId: null };
  }

  static getDerivedStateFromError(error){
    return { error };
  }

  componentDidCatch(error, info){
    const errorId = mkId();
    // Log en consola siempre (útil en Netlify preview/local)
    console.error(`[UI ErrorBoundary:${errorId}]`, error, info);

    this.setState({ info, errorId });

    // Hook opcional externo (Sentry/Bugsnag/LogRocket, etc.)
    if (typeof this.props.onError === "function") {
      try { this.props.onError(error, { ...info, errorId }); } catch {}
    }
  }

  reset = () => {
    this.setState({ error: null, info: null, errorId: null });
    if (typeof this.props.onReset === "function") {
      try { this.props.onReset(); } catch {}
    }
  };

  copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // feedback silencioso sin alert(): cambia hint por 1.2s
      this._hint && (this._hint.textContent = "Copiado ✓");
      setTimeout(()=>{ this._hint && (this._hint.textContent = ""); }, 1200);
    } catch {
      prompt("Copia el texto de error:", text);
    }
  };

  render(){
    const { error, info, errorId } = this.state;
    if (!error) return this.props.children;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "(UA desconocido)";
    const url = typeof window !== "undefined" ? window.location.href : "";
    const msg = String(error?.message || error);
    const stack = (error?.stack || info?.componentStack || "").trim();

    const email = "soporte@institutolael.cl";
    const mailBody = `Hola, me apareció un error en el sitio.

ID: ${errorId || "(sin id)"}
Mensaje: ${msg}

Stack:
${stack || "(sin stack)"}

URL: ${url}
User-Agent: ${ua}
`;
    const mailTo = `mailto:${email}?subject=${encodeURIComponent(
      `Error en sitio Lael · ID ${errorId || ""}`
    )}&body=${encodeURIComponent(mailBody)}`;

    const wapp = `https://wa.me/56964626568?text=${encodeURIComponent(
      `Hola 👋, me apareció un error en el sitio.
ID: ${errorId || "(sin id)"}
Mensaje: ${msg}

${stack ? `Stack (dev):\n${stack}\n\n` : ""}URL: ${url}
User-Agent: ${ua}`
    )}`;

    const bundleToCopy = `ID: ${errorId || "(sin id)"}\nMensaje: ${msg}\n\n${stack || ""}\n\nURL: ${url}\nUA: ${ua}`;

    return (
      <div style={styles.wrap}>
        <h2 style={styles.title}>😵 Ups, algo falló</h2>
        <p style={styles.sub}>Intentemos nuevamente. Si persiste, repórtalo y te ayudamos.</p>

        {/* Producción: menos ruido. Dev/Preview: detalles completos */}
        {!isProd && (
          <div style={styles.panel}>
            <div style={styles.block}>
              <div style={styles.blockTitle}>ID del error</div>
              <pre style={styles.pre}>{errorId}</pre>
            </div>
            <div style={styles.block}>
              <div style={styles.blockTitle}>Mensaje</div>
              <pre style={styles.pre}>{msg}</pre>
            </div>
            {stack && (
              <div style={styles.block}>
                <div style={styles.blockTitle}>Stack</div>
                <pre style={styles.pre}>{stack}</pre>
              </div>
            )}
            <div style={styles.block}>
              <div style={styles.blockTitle}>URL</div>
              <pre style={styles.pre}>{url}</pre>
            </div>
            <div style={styles.block}>
              <div style={styles.blockTitle}>User-Agent</div>
              <pre style={styles.pre}>{ua}</pre>
            </div>
          </div>
        )}

        <div style={styles.actions}>
          <button onClick={this.reset} style={btn.primary}>Reintentar</button>
          <a href={mailTo} style={btn.ghost}>Reportar por correo</a>
          <a href={wapp} target="_blank" rel="noreferrer" style={btn.ghost}>Reportar por WhatsApp</a>
          {!isProd && (
            <button onClick={() => this.copy(bundleToCopy)} style={btn.ghost}>
              Copiar detalle
            </button>
          )}
        </div>

        <p style={styles.hint} ref={(r)=>{ this._hint = r; }}>
          {isProd
            ? "Consejo: vuelve al inicio o intenta más tarde."
            : "Dev: revisa import/ruta, props requeridas, estado, o variables .env."}
        </p>
      </div>
    );
  }
}

// Wrapper que resetea al cambiar de ruta (muy útil en SPA)
export function ErrorBoundaryGate({ children, onError, onReset }){
  const { pathname, search, hash } = useLocation();
  const key = pathname + search + hash; // si cambia la ruta, se desmonta y se resetea
  return (
    <ErrorBoundary key={key} onError={onError} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}

/* ================== estilos inline minimal ================== */
const styles = {
  wrap: {
    padding: 16, margin: 16, borderRadius: 12,
    border: "1px solid #ef4444",
    background: "linear-gradient(180deg,#FEF2F2,#FFF)",
    color: "#991B1B",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
    boxShadow: "0 10px 24px rgba(153,27,27,.15)",
  },
  title: { margin: "0 0 6px", fontSize: "1.15rem", fontWeight: 900 },
  sub: { margin: "0 0 10px", color: "#7F1D1D" },
  panel: {
    border: "1px solid #fecaca",
    background: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  block: { marginBottom: 8 },
  blockTitle: { fontWeight: 800, color: "#991B1B", marginBottom: 4 },
  pre: {
    whiteSpace: "pre-wrap",
    margin: 0,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    fontSize: 12,
    color: "#7F1D1D",
    background: "#fff7f7",
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ffe4e6",
  },
  actions: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
  hint: { marginTop: 8, fontSize: 13, color: "#7F1D1D" },
};

const btn = {
  base: {
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 900,
  },
  primary: {
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 900,
    color: "#fff",
    background: "#ef4444",
    border: "1px solid #dc2626",
  },
  ghost: {
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 900,
    color: "#991B1B",
    background: "#fff",
    border: "1px solid #fecaca",
  },
};