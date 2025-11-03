import React from "react";
import { useLocation } from "react-router-dom";

const isProd = import.meta?.env?.MODE === "production";

// --- Clase principal ---
export class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error){
    return { error };
  }

  componentDidCatch(error, info){
    // Log mínimo en consola
    console.error("[UI ErrorBoundary] ", error, info);
    this.setState({ info });

    // Hook opcional externo (Sentry, etc.)
    if (typeof this.props.onError === "function") {
      try { this.props.onError(error, info); } catch {}
    }
  }

  reset = () => this.setState({ error: null, info: null });

  copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Error copiado al portapapeles ✅");
    } catch {
      // Fallback simple
      prompt("Copia el texto de error:", text);
    }
  };

  render(){
    const { error, info } = this.state;
    if (!error) return this.props.children;

    const msg = String(error?.message || error);
    const stack = (error?.stack || info?.componentStack || "").trim();
    const mailTo = `mailto:soporte@institutolael.cl?subject=${encodeURIComponent("Error en sitio Lael")}&body=${encodeURIComponent(
`Hola, me apareció un error en el sitio:

Mensaje: ${msg}

Stack:
${stack || "(sin stack)"}

URL: ${typeof window !== "undefined" ? window.location.href : ""}`
    )}`;

    const wapp = `https://wa.me/56964626568?text=${encodeURIComponent(
`Hola 👋, me apareció un error en el sitio.

Mensaje: ${msg}

${stack ? `Stack (dev):\n${stack}\n\n` : ""}URL: ${typeof window !== "undefined" ? window.location.href : ""}`
    )}`;

    return (
      <div style={styles.wrap}>
        <h2 style={styles.title}>😵 Ups, algo falló</h2>
        <p style={styles.sub}>
          Intentemos nuevamente. Si persiste, envíanos el reporte por correo o WhatsApp.
        </p>

        {/* En producción mostramos poco; en dev mostramos detalle */}
        {!isProd ? (
          <div style={styles.panel}>
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
          </div>
        ) : null}

        <div style={styles.actions}>
          <button onClick={this.reset} style={btn.primary}>Reintentar</button>
          <a href={mailTo} style={btn.ghost}>Reportar por correo</a>
          <a href={wapp} target="_blank" rel="noreferrer" style={btn.ghost}>Reportar por WhatsApp</a>
          {!isProd && (
            <button onClick={() => this.copy(`${msg}\n\n${stack}`)} style={btn.ghost}>
              Copiar error
            </button>
          )}
        </div>

        <p style={styles.hint}>
          {isProd
            ? "Consejo: vuelve al inicio o intenta más tarde."
            : "Dev: revisa el import, ruta de archivo, props requeridas o claves del .env."}
        </p>
      </div>
    );
  }
}

// --- Wrapper que resetea al cambiar de ruta ---
export function ErrorBoundaryGate({ children, onError }){
  const { pathname, search, hash } = useLocation();
  const key = pathname + search + hash; // si cambia la ruta, se desmonta el árbol y se resetea el boundary
  return (
    <ErrorBoundary key={key} onError={onError}>
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
  title: { margin: "0 0 6px", fontSize: "1.15rem" },
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
    ...{
      padding: "8px 12px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 900,
    },
    color: "#fff",
    background: "#ef4444",
    border: "1px solid #dc2626",
  },
  ghost: {
    ...{
      padding: "8px 12px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 900,
    },
    color: "#991B1B",
    background: "#fff",
    border: "1px solid #fecaca",
  },
};