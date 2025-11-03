// src/pages/Simulador.jsx
import { useMemo, useState } from "react";
import { PROGRAMAS } from "../data/sim/programas-ejemplo.js";
import {
  MIN_PROM_OBLIGATORIAS,
  esAdmisible,
  calcularPPP,
  cumpleM2Requerido,
  etiquetaChance,
} from "../utils/simPAES.js";

export default function Simulador() {
  // Puntajes del/la postulante
  const [puntajes, setPuntajes] = useState({
    CL: 700, M1: 720, M2: 0, CIEN: 680, HIS: 650, NEM: 800, RANK: 820,
  });

  // Selección (solo mostramos 1 programa a la vez)
  const universidades = useMemo(
    () => Array.from(new Set(PROGRAMAS.map(p => p.universidad))).sort(),
    []
  );
  const [uni, setUni] = useState(universidades[0] || "");
  const carrerasDeUni = useMemo(
    () => PROGRAMAS.filter(p => p.universidad === uni)
                   .sort((a,b)=> a.carrera.localeCompare(b.carrera)),
    [uni]
  );
  const [progId, setProgId] = useState(carrerasDeUni[0]?.id || "");

  // Recalzar cuando cambie la universidad
  const onUni = (e) => {
    const u = e.target.value;
    setUni(u);
    const first = PROGRAMAS.find(p => p.universidad === u);
    setProgId(first?.id || "");
  };

  // Puntajes
  const onNum = (k) => (e) =>
    setPuntajes((p) => ({ ...p, [k]: e.target.value ? Number(e.target.value) : 0 }));

  const promedioObl = Math.round(((puntajes.CL || 0) + (puntajes.M1 || 0)) / 2);
  const admisible = esAdmisible(puntajes);

  // ÚNICO resultado (programa seleccionado)
  const seleccionado = useMemo(() => PROGRAMAS.find(p => p.id === progId) || null, [progId]);

  const resultado = useMemo(() => {
    if (!admisible || !seleccionado) return null;
    const okM2 = cumpleM2Requerido(seleccionado.requiereM2, puntajes);
    const ppp = okM2 ? calcularPPP(seleccionado.ponderaciones, puntajes) : 0;
    const tag = okM2 ? etiquetaChance(ppp, seleccionado.corteRef) : "REQUIERE M2";
    return { ...seleccionado, okM2, ppp, tag };
  }, [admisible, seleccionado, puntajes]);

  return (
    <section className="sim">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <h1>Simulador <span className="grad">PAES</span></h1>
        <p className="lead">
          Ingresa tus puntajes y elige una carrera. Mostramos tu <b>Puntaje Ponderado</b> y tu escenario:{" "}
          <span className="pill ok">SEGURO</span> · <span className="pill mid">COMPETITIVO</span> ·{" "}
          <span className="pill warm">AJUSTADO</span> · <span className="pill bad">LEJANO</span>.
        </p>
      </header>

      {/* FORM PUNTAJES */}
      <div className="card">
        <h2>Tus puntajes</h2>
        <div className="grid">
          {[
            ["CL","Comp. Lectora"],["M1","Matemática 1"],["M2","Matemática 2 (si rendiste)"],
            ["CIEN","Ciencias"],["HIS","Historia"],["NEM","NEM"],["RANK","Ranking"],
          ].map(([k, label])=>(
            <div key={k} className="field">
              <label>{label}</label>
              <input type="number" min="0" max="1000" step="1" value={puntajes[k]} onChange={onNum(k)} />
            </div>
          ))}
        </div>

        <div className="status">
          <div className="chip">
            Promedio CL+M1: <b>{isFinite(promedioObl) ? promedioObl : "—"}</b> (mínimo {MIN_PROM_OBLIGATORIAS})
          </div>
          <div className={"chip " + (admisible ? "ok" : "bad")}>
            {admisible ? "Cumples requisito de admisibilidad" : "No cumples CL+M1 ≥ 458"}
          </div>
        </div>
      </div>

      {/* SELECCIÓN DE PROGRAMA */}
      <div className="card slim">
        <h2>Selecciona una carrera</h2>
        <div className="row">
          <div className="field">
            <label>Universidad</label>
            <select className="select" value={uni} onChange={onUni}>
              {universidades.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Carrera</label>
            <select
              className="select"
              value={progId}
              onChange={(e)=>setProgId(e.target.value)}
            >
              {carrerasDeUni.map(p => (
                <option key={p.id} value={p.id}>
                  {p.carrera} — {p.sede}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTADO (SOLO LA SELECCIÓN) */}
      <h2 className="mt">Resultado</h2>
      {!admisible ? (
        <div className="alert bad">
          Para postular por vía regular, el <b>promedio de CL y M1</b> debe ser al menos <b>{MIN_PROM_OBLIGATORIAS}</b>.
        </div>
      ) : !seleccionado ? (
        <div className="alert bad">Selecciona una universidad y una carrera.</div>
      ) : (
        <article className="res">
          <div className="head">
            <div className="uni">{resultado.universidad}</div>
            <div className="carrera">{resultado.carrera}</div>
            <div className={"tag " + tagClass(resultado.tag)}>{resultado.tag}</div>
          </div>

          <div className="meta">
            <span><b>Sede:</b> {resultado.sede}</span>
            <span><b>Corte ref.:</b> {resultado.corteRef ?? "—"}</span>
            {resultado.requiereM2 && <span className="need">Requiere M2</span>}
          </div>

          {resultado.okM2 ? (
            <div className="bar">
              <div className="ppp">PPP: <b>{resultado.ppp}</b></div>
              <div className="hint">Se usa la mejor electiva entre Ciencias/Historia cuando aplica.</div>
            </div>
          ) : (
            <div className="alert bad">Esta carrera requiere M2.</div>
          )}

          {resultado.notas && <div className="notes">{resultado.notas}</div>}
        </article>
      )}
    </section>
  );
}

function tagClass(t) {
  if (t === "SEGURO") return "ok";
  if (t === "COMPETITIVO") return "mid";
  if (t === "AJUSTADO") return "warm";
  if (t === "REQUIERE M2") return "need";
  return "bad";
}

const css = `
.sim{ color:#fff; }
.hero{ padding:14px 0 10px; border-bottom:1px solid #1f2a44;
  background: radial-gradient(700px 280px at 10% -10%, rgba(88,80,236,.22), transparent 60%);
}
.hero h1{ margin:0 0 6px; font-size:clamp(1.8rem,3.2vw,2.6rem); }
.grad{ background:linear-gradient(90deg,#22d3ee,#86efac); -webkit-background-clip:text; color:transparent; }
.lead{ color:#eaf2ff; max-width:66ch; }

.card{ margin-top:14px; border:1px solid #1f2a44; border-radius:16px; padding:14px;
  background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 16px 32px rgba(2,6,23,.35);
}
.card.slim{ padding:12px; }
.card h2{ margin:0 0 10px; }

.grid{ display:grid; gap:10px; grid-template-columns:repeat(4, minmax(0,1fr)); }
@media (max-width:920px){ .grid{ grid-template-columns:repeat(2,1fr); } }
@media (max-width:540px){ .grid{ grid-template-columns:1fr; } }
.row{ display:grid; gap:10px; grid-template-columns: 1fr 2fr; }
@media (max-width:700px){ .row{ grid-template-columns:1fr; } }

.field label{ font-weight:900; color:#a5b4fc; display:block; margin-bottom:4px; }
.field input, .select{
  width:100%; border:1px solid #2a3260; background:#0e162e; color:#fff; border-radius:10px;
  padding:.6rem .7rem; font-weight:800;
}
.select{ appearance:none; }

.status{ display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
.chip{
  border:1px solid rgba(165,180,252,.4); background:#0d1530; color:#fff; border-radius:999px;
  padding:.4rem .7rem; font-weight:900;
}
.chip.ok{ border-color:#16a34a; box-shadow:0 0 0 2px rgba(22,163,74,.25) inset; }
.chip.bad{ border-color:#ef4444; box-shadow:0 0 0 2px rgba(239,68,68,.25) inset; }

.mt{ margin-top:18px; }
.alert{ margin-top:10px; border-radius:12px; padding:10px 12px; font-weight:900; }
.alert.bad{ background:#240e13; border:1px solid #7f1d1d; color:#fecaca; }

.res{ border:1px solid #1f2a44; border-radius:14px; padding:12px; background:#0f172a; }
.head{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
.uni{ font-weight:900; color:#93c5fd; }
.carrera{ font-weight:1000; }
.tag{ margin-left:auto; font-weight:1000; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; }
.tag.ok{ background:#14532d; border-color:#16a34a; color:#bbf7d0; }
.tag.mid{ background:#0b2935; border-color:#0891b2; color:#a5f3fc; }
.tag.warm{ background:#3a2307; border-color:#d97706; color:#fde68a; }
.tag.bad{ background:#2b1214; border-color:#ef4444; color:#fecaca; }
.tag.need{ background:#2b1432; border-color:#a21caf; color:#f5d0fe; }

.meta{ display:flex; flex-wrap:wrap; gap:10px; color:#dbeafe; margin:6px 0 8px; }
.meta .need{ color:#f0abfc; font-weight:900; }

.bar{ display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
.ppp{ font-size:1.3rem; font-weight:1000; color:#86efac; }
.hint{ color:#eaf2ff; font-size:.95rem; opacity:.9; }
.notes{ margin-top:6px; color:#eaf2ff; }
`;