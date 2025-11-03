// src/pages/Contacto.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const clp = (n) => Number(n||0).toLocaleString("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0});

export default function Contacto(){
  const [area, setArea] = useState("paes");      // paes | lsch | idiomas | empresas | homeschool | otro
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fono, setFono] = useState("");
  const [detalle, setDetalle] = useState("");

  const asunto = useMemo(() => {
    const t = {
      paes: "Consulta PAES",
      lsch: "Consulta LSCh",
      idiomas: "Consulta Idiomas",
      empresas: "Cotización Empresas",
      homeschool: "Acompañamiento Homeschool",
      otro: "Consulta general",
    }[area] || "Consulta";
    return `Lael — ${t}`;
  }, [area]);

  const wapp = useMemo(() => {
    const base = "https://wa.me/56964626568";
    const msg = `Hola 👋\nSoy ${nombre||"—"}\nCorreo: ${correo||"—"}\nFono: ${fono||"—"}\nInterés: ${asunto}\nDetalle:\n${detalle||"—"}`;
    return `${base}?text=${encodeURIComponent(msg)}`;
  }, [nombre, correo, fono, detalle, asunto]);

  const mailto = useMemo(() => {
    const to = "contacto@institutolael.cl";
    const body = `Nombre: ${nombre}\nCorreo: ${correo}\nFono: ${fono}\nInterés: ${asunto}\n\nDetalle:\n${detalle||"—"}`;
    return `mailto:${to}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(body)}`;
  }, [nombre, correo, fono, detalle, asunto]);

  return (
    <section>
      <style>{css}</style>
      <header className="mb-3">
        <span className="badge bg-info text-dark">Contacto</span>
        <h1 className="h4 mt-2 mb-1">Conversemos y armamos tu plan</h1>
        <p className="m-0">Escríbenos por WhatsApp o correo y te respondemos rápido.</p>
      </header>

      <div className="row g-3">
        <div className="col-md-7">
          <div className="card-float p-3 p-md-4 h-100">
            <div className="fw-semibold mb-2">¿Qué te interesa?</div>
            <div className="chips mb-3">
              {["paes","lsch","idiomas","empresas","homeschool","otro"].map((k)=>(
                <button key={k} className={`chip ${area===k?'selected':''}`} onClick={()=>setArea(k)}>
                  {({paes:"PAES",lsch:"LSCh",idiomas:"Idiomas",empresas:"Empresas",homeschool:"Homeschool",otro:"Otro"})[k]}
                </button>
              ))}
            </div>

            <div className="row g-2">
              <div className="col-sm-6">
                <label className="form-label small">Nombre</label>
                <input className="form-control" value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div className="col-sm-6">
                <label className="form-label small">Correo</label>
                <input className="form-control" value={correo} onChange={(e)=>setCorreo(e.target.value)} placeholder="tucorreo@dominio.cl" />
              </div>
              <div className="col-sm-6">
                <label className="form-label small">WhatsApp</label>
                <input className="form-control" value={fono} onChange={(e)=>setFono(e.target.value)} placeholder="+56 9 ..." />
              </div>
              <div className="col-12">
                <label className="form-label small">Cuéntanos brevemente</label>
                <textarea className="form-control" rows={4} value={detalle} onChange={(e)=>setDetalle(e.target.value)} placeholder="Ej. ramos que necesitas, horarios, o si eres empresa: nº colaboradores, modalidad, etc."/>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <a className="btn btn-primary" href={wapp} target="_blank" rel="noreferrer">📲 WhatsApp</a>
              <a className="btn btn-outline-primary" href={mailto}>✉️ Correo</a>
              <Link className="btn btn-light" to="/inscripcion">Formulario de inscripción</Link>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card-float p-3 p-md-4">
            <div className="fw-semibold mb-2">También puedes…</div>
            <ul className="small ps-3 m-0">
              <li>Agendar una videollamada de orientación.</li>
              <li>Solicitar una demo corta para tu equipo (empresas).</li>
              <li>Pedir syllabus y calendario por programa.</li>
            </ul>
            <hr />
            <div className="tiny text-muted">Horarios de respuesta: Lun–Vie 09:00–18:00.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.card-float{ border:1px solid #e5e7eb; border-radius:16px; background:#fff; box-shadow:0 10px 24px rgba(16,24,40,.06); }
@media (prefers-color-scheme: dark){ .card-float{ background:#0f172a; border-color:#1f2a44; } }
.chips{ display:flex; flex-wrap:wrap; gap:8px }
.chip{ padding:.5rem .7rem; border-radius:999px; border:1px solid #e6e8f2; background:#fff; font-weight:700 }
.chip.selected{ border-color:#4f46e5; background:linear-gradient(180deg,#eef2ff,#ffffff); }
`;
