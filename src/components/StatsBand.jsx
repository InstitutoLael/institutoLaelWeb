// src/components/StatsBand.jsx
/**
 * StatsBand — banda de indicadores de confianza del Instituto Lael.
 *
 * Muestra datos clave de forma atractiva y responsiva.
 * Se puede personalizar pasando un array de objetos con "kpi" y "label".
 *
 * Ejemplo:
 * <StatsBand
 *   items={[
 *     { kpi: "87%", label: "alcanza su objetivo" },
 *     { kpi: "+11.000h", label: "clases en vivo" },
 *     { kpi: "9/10", label: "nos recomiendan" },
 *   ]}
 * />
 */

export default function StatsBand({
  items = [
    { kpi: "87%", label: "alcanza su objetivo" },
    { kpi: "+11.000h", label: "clases en vivo" },
    { kpi: "9/10", label: "nos recomiendan" },
  ],
}) {
  return (
    <section className="statsband" aria-label="Indicadores de confianza del Instituto Lael">
      <style>{css}</style>

      {/* Gradientes decorativos */}
      <div className="statsband-bg" aria-hidden="true" />

      <div className="statsband-grid">
        {items.map((it, i) => (
          <figure key={i} className="stat-card" role="group" aria-labelledby={`stat-${i}-label`}>
            <p className="stat-kpi" id={`stat-${i}-value`}>
              {it.kpi}
            </p>
            <figcaption className="stat-label" id={`stat-${i}-label`}>
              {it.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- CSS ---------- */
const css = `
.statsband {
  position: relative;
  padding: 48px 0;
  background: linear-gradient(180deg, #0b1220, #0e1424);
  border-top: 1px solid #1f2a44;
  border-bottom: 1px solid #1f2a44;
  overflow: hidden;
}

.statsband-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(80% 40% at 10% -30%, rgba(88,80,236,0.18), transparent 60%),
    radial-gradient(80% 40% at 90% -30%, rgba(22,163,74,0.14), transparent 60%);
}

.statsband-grid {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
  padding: 0 24px;
}

@media (min-width: 576px) {
  .statsband-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 992px) {
  .statsband-grid { grid-template-columns: repeat(3, 1fr); }
}

.stat-card {
  background: linear-gradient(180deg, #0e1424, #0b1220);
  border: 1px solid #1f2a44;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(2,6,23,.35);
  text-align: center;
  padding: 28px 16px;
  transition: transform .2s ease, box-shadow .2s ease;
}

.stat-card:hover {
  transform: scale(1.02);
  box-shadow: 0 14px 36px rgba(2,6,23,.45);
}

.stat-kpi {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(90deg, #818cf8, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin: 0;
}

.stat-label {
  color: #cfe0ff;
  font-size: .95rem;
  margin-top: 6px;
  opacity: .9;
}

@media (prefers-color-scheme: light) {
  .statsband {
    background: linear-gradient(180deg, #f9fafb, #eef2ff);
  }
  .stat-card {
    background: #fff;
    border-color: #e2e8f0;
    box-shadow: 0 10px 24px rgba(16,24,40,.06);
  }
  .stat-label { color: #475569; }
}
`;