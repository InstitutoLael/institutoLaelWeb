// src/pages/Docentes.jsx
import { teachers } from "../data/teachers.js";

export default function Docentes(){
  return (
    <section>
      <style>{css}</style>
      <header className="mb-3">
        <span className="badge text-bg-success-subtle border">Equipo docente</span>
        <h1 className="h4 mt-2 mb-1">Personas reales, acompañamiento real 💚</h1>
        <p className="m-0">Profes con vocación y experiencia. Muy humanos, nada robóticos.</p>
      </header>

      <div className="grid">
        {teachers.map((t)=>(
          <article key={t.id} className="card" style={{"--accent": t.accent}}>
            <div className="avatar" aria-hidden="true">{t.name.charAt(0)}</div>
            <div className="info">
              <div className="name">{t.name}</div>
              <div className="sub">{t.subject}</div>
              {t.bio && <p className="bio">{t.bio}</p>}
              {!!(t.tags && t.tags.length) && (
                <div className="chips">
                  {t.tags.map((tag,i)=><span key={i} className="chip">{tag}</span>)}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const css = `
.grid{ display:grid; grid-template-columns: repeat(12,1fr); gap:14px }
@media (max-width: 576px){ .grid{ grid-template-columns: repeat(1,1fr) } }
@media (min-width: 577px) and (max-width: 991px){ .grid{ grid-template-columns: repeat(6,1fr) } }
@media (min-width: 992px){ .grid{ grid-template-columns: repeat(12,1fr) } }
.card{
  grid-column: span 6; display:grid; grid-template-columns:84px 1fr; gap:14px;
  align-items:center; padding:14px; border-radius:16px;
  background: radial-gradient(400px 150px at -10% -10%, color-mix(in srgb, var(--accent), #ffffff 88%) 0, transparent 60%), linear-gradient(180deg, #ffffff, #f9fafb);
  border:1px solid color-mix(in srgb, var(--accent), #e5e7eb 86%); box-shadow:0 10px 24px rgba(16,24,40,.06);
}
.avatar{ width:84px;height:84px;border-radius:50%;display:grid;place-items:center;font-weight:900;color:#0f172a;background:#fff;border:1px solid color-mix(in srgb,var(--accent),#dbeafe 72%) }
.info .name{ font-weight:800 }
.info .sub{ color:#475569; font-style:italic; font-size:.94rem }
.bio{ margin:.5rem 0 0 0; color:#475569 }
.chips{ display:flex; flex-wrap:wrap; gap:6px; margin-top:8px }
.chip{ background:#f1f5f9; color:#0f172a; border-radius:999px; padding:4px 10px; font-size:.75rem; border:1px solid #e2e8f0 }
@media (prefers-color-scheme: dark){
  .card{ background:#0f172a; border-color:#1f2a44; }
  .avatar{ background:#0b1220; color:#e5e7eb; border-color:#1f2a44 }
  .info .sub,.bio{ color:#9fb3c8 }
}
`;
