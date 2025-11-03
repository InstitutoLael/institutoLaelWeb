// src/components/StatsBand.jsx
export default function StatsBand({ items = [] }) {
  return (
    <section className="statsband" aria-label="Indicadores de confianza">
      <style>{css}</style>
      <div className="container stats__row">
        {items.map((it, i) => (
          <article className="stat" key={i}>
            <div className="kpi">{it.kpi}</div>
            <div className="lbl">{it.label}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

const css = `
.statsband{
  padding:10px 0 2px;
  background:
    radial-gradient(700px 160px at 10% -40%, rgba(88,80,236,.18), transparent 60%),
    radial-gradient(700px 160px at 90% -40%, rgba(22,163,74,.14), transparent 60%),
    linear-gradient(180deg,#0b1220,#0e1424);
  border-top:1px solid #1f2a44; border-bottom:1px solid #1f2a44;
}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.stats__row{ display:grid; grid-template-columns: repeat(3,1fr); gap:10px; }
@media (max-width:760px){ .stats__row{ grid-template-columns:1fr; } }
.stat{
  display:grid; place-items:center; text-align:center;
  padding:10px 0; border-radius:14px; border:1px solid #22304d;
  background: linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 12px 22px rgba(2,6,23,.28);
}
.kpi{ font-size:1.5rem; font-weight:800; letter-spacing:.2px; color:#ffffff; }
.lbl{ color:#dbeafe; opacity:.9 }
`;