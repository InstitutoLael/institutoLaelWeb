// src/pages/Pagos.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ===== Config ===== */
const BANK = {
  holder: "Instituto Lael",
  rut: "11.111.111-1",
  bank: "Banco de Chile",
  accountType: "Cuenta Vista",
  accountNumber: "123456789",
  email: "pagos@institutolael.cl", // destinatario de mailto
};
const WAPP = "56964626568"; // WhatsApp destino (sin +, sin 0)

const PROGRAMS = [
  { id: "paes", label: "PAES" },
  { id: "lsch", label: "LSCh" },
  { id: "idiomas", label: "Idiomas" },
  { id: "empresas", label: "Empresas" },
  { id: "homeschool", label: "Homeschool (apoyo)" },
  { id: "otro", label: "Otro" },
];

const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export default function Pagos() {
  const [form, setForm] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    program: "paes",
    plan: "",
    subjects: "",
    amount: "",
    notes: "",
    accept: true,
  });

  const [done, setDone] = useState(null); // { folio, mailto, wa }
  const [submitting, setSubmitting] = useState(false);
  const fileInput = useRef(null);

  const amountNum = useMemo(() => {
    const n = Number(String(form.amount).replace(/[^\d]/g, "")) || 0;
    return n;
  }, [form.amount]);

  const isEmail = (v) => /\S+@\S+\.\S+/.test(v || "");
  const isValid =
    form.fullName.trim().length >= 3 &&
    isEmail(form.email) &&
    amountNum > 0 &&
    form.accept;

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function labelOf(id) {
    return PROGRAMS.find((p) => p.id === id)?.label || id;
  }

  function buildFolio() {
    // folio local (no DB): AAA-123456
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const a =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    const b = String(Math.floor(100000 + Math.random() * 900000));
    return `${a}-${b}`;
  }

  function downloadTxt(name, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitting || !isValid) return;

    setSubmitting(true);

    const folio = buildFolio();
    const resumen = `FOLIO: ${folio}
Fecha: ${new Date().toLocaleString("es-CL")}
Programa: ${labelOf(form.program)}
Plan/Nivel: ${form.plan || "—"}
Detalle: ${form.subjects || "—"}
Monto: ${clp(amountNum)}

Alumno(a): ${form.fullName}
RUT: ${form.rut || "—"}
Correo: ${form.email}
WhatsApp/Tel: ${form.phone || "—"}

Notas: ${form.notes || "—"}

Datos de transferencia:
- Banco: ${BANK.bank}
- Tipo cuenta: ${BANK.accountType}
- Titular: ${BANK.holder}
- RUT: ${BANK.rut}
- N° de cuenta: ${BANK.accountNumber}
- Correo pagos: ${BANK.email}

**IMPORTANTE**: Adjunta el comprobante en el correo (PDF/JPG/PNG).`;

    // 1) mailto con asunto + cuerpo (usuario adjunta archivo)
    const subject = encodeURIComponent(`Comprobante de pago • ${folio}`);
    const body = encodeURIComponent(
      `Hola, adjunto comprobante de transferencia.\n\n${resumen}\n\nGracias.`
    );
    const mailto = `mailto:${BANK.email}?subject=${subject}&body=${body}`;

    // 2) WhatsApp texto
    const waText = encodeURIComponent(
      `Hola 👋, avisé por correo mi pago.\nFolio: ${folio}\nNombre: ${form.fullName}\nPrograma: ${labelOf(
        form.program
      )}\nPlan/Detalle: ${form.plan || "—"} / ${form.subjects || "—"}\nMonto: ${clp(
        amountNum
      )}\n¿Pueden confirmar, por favor?`
    );
    const waUrl = `https://wa.me/${WAPP}?text=${waText}`;

    // 3) Descarga TXT (opcional)
    downloadTxt(`Pago_${folio}.txt`, resumen);

    setDone({ folio, mailto, wa: waUrl });
    setSubmitting(false);

    // Abrimos mailto de inmediato para que adjunte el comprobante
    window.location.href = mailto;
  }

  return (
    <section className="pay-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="mb-4 hero">
        <span className="pill">Pagos</span>
        <h1 className="h3 mt-2 mb-1">Transferencia bancaria</h1>
        <p className="subtle m-0">
          Transfiere a <strong>{BANK.holder}</strong> y <strong>adjunta el comprobante</strong> en el
          correo que se abrirá automáticamente. Te confirmamos por correo/WhatsApp.
        </p>
      </header>

      <div className="row g-3">
        {/* FORM */}
        <div className="col-lg-7">
          <form className="card-float p-3 p-md-4" onSubmit={handleSubmit} noValidate>
            <h2 className="h6 mb-3">Datos del estudiante / responsable</h2>

            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">
                  Nombre completo <span className="req">*</span>
                </label>
                <input
                  className="form-control"
                  placeholder="Nombre y Apellido"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">RUT (opcional)</label>
                <input
                  className="form-control"
                  placeholder="11.111.111-1"
                  value={form.rut}
                  onChange={(e) => setField("rut", e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Correo <span className="req">*</span>
                </label>
                <input
                  type="email"
                  className={"form-control" + (form.email && !isEmail(form.email) ? " is-invalid" : "")}
                  placeholder="tu@correo.cl"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
                {form.email && !isEmail(form.email) && (
                  <div className="invalid">Ingresa un correo válido.</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">WhatsApp / Teléfono</label>
                <input
                  className="form-control"
                  placeholder="+56 9 ..."
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </div>

            <hr />

            <h2 className="h6 mb-3">Programa / Plan</h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Programa</label>
                <select
                  className="form-select"
                  value={form.program}
                  onChange={(e) => setField("program", e.target.value)}
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Plan / Nivel (opcional)</label>
                <input
                  className="form-control"
                  placeholder="Ej: Explorer / LSCh Trimestral / Inglés B1"
                  value={form.plan}
                  onChange={(e) => setField("plan", e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Detalle (ramos/idiomas/observaciones)</label>
                <input
                  className="form-control"
                  placeholder="Ej: M1 + Lenguaje / Conversación B2…"
                  value={form.subjects}
                  onChange={(e) => setField("subjects", e.target.value)}
                />
              </div>
            </div>

            <hr />

            <h2 className="h6 mb-3">Monto transferido</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  Monto (CLP) <span className="req">*</span>
                </label>
                <input
                  className="form-control"
                  inputMode="numeric"
                  placeholder="$0"
                  value={form.amount}
                  onChange={(e) => setField("amount", e.target.value)}
                  onBlur={(e) => {
                    const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                    setField("amount", v ? clp(v) : "");
                  }}
                  required
                />
              </div>

              {/* Recordatorio de adjuntar en correo (mantengo campo deshabilitado para consistencia visual) */}
              <div className="col-md-6">
                <label className="form-label">Adjunta el comprobante en tu CORREO</label>
                <input ref={fileInput} type="file" className="form-control" disabled />
                <div className="tiny subtle mt-1">
                  Este campo está deshabilitado: adjunta el PDF/JPG/PNG al abrir tu correo.
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Notas (opcional)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Algo que debamos saber para validar más rápido…"
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                />
              </div>
            </div>

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="acc"
                checked={form.accept}
                onChange={(e) => setField("accept", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="acc">
                Acepto la verificación de mi pago y el uso de mis datos para gestionar mi inscripción. <span className="req">*</span>
              </label>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button
                type="submit"
                className={"btn btn-primary" + (isValid ? "" : " disabled")}
                disabled={submitting || !isValid}
                title={isValid ? "Abrir correo para enviar comprobante" : "Completa los campos requeridos"}
              >
                {submitting ? "Preparando…" : "Enviar por correo"}
              </button>

              <a
                href={done?.wa || "#"}
                onClick={(e) => {
                  if (!done) e.preventDefault();
                }}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                title={done ? "Avísanos por WhatsApp" : "Primero envía el correo"}
              >
                Avisar por WhatsApp
              </a>

              <a
                className="btn btn-outline"
                href={`mailto:${BANK.email}?subject=${encodeURIComponent("Consulta pagos")}`}
              >
                Escribir a {BANK.email}
              </a>
            </div>

            {done && (
              <div className="ok mt-3" role="status" aria-live="polite">
                <div className="ok-title">¡Listo! ✉️ Abre tu correo y adjunta el comprobante</div>
                <div className="tiny">
                  Folio local: <strong>{done.folio}</strong> ·{" "}
                  <a href={done.mailto}>Reabrir correo</a>{" "}
                  · <a href={done.wa} target="_blank" rel="noreferrer">Avisar por WhatsApp</a>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* INFO LATERAL */}
        <div className="col-lg-5">
          <aside className="card-float p-3 p-md-4">
            <h3 className="h6 mb-2">Datos de Transferencia</h3>
            <ul className="bank">
              <li><span>Banco</span><strong>{BANK.bank}</strong></li>
              <li><span>Tipo cuenta</span><strong>{BANK.accountType}</strong></li>
              <li><span>Titular</span><strong>{BANK.holder}</strong></li>
              <li><span>RUT</span><strong>{BANK.rut}</strong></li>
              <li><span>N° de cuenta</span><strong>{BANK.accountNumber}</strong></li>
              <li><span>Correo</span><strong>{BANK.email}</strong></li>
            </ul>

            <div className="hr" />

            <h3 className="h6 mb-2">Tips para validar rápido</h3>
            <ul className="tips">
              <li>Usa el <strong>mismo correo</strong> de la inscripción.</li>
              <li>Indica <strong>programa/plan/detalle</strong> en el mensaje.</li>
              <li>Adjunta el <strong>PDF/JPG/PNG</strong> del comprobante.</li>
            </ul>

            <div className="cta">
              <Link to="/inscripcion" className="btn btn-outline">Ir a Inscripción</Link>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/${WAPP}?text=${encodeURIComponent("Hola, tengo dudas con mi pago 🙏")}`}
                target="_blank"
                rel="noreferrer"
              >
                Ayuda por WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ===== Estilos locales (alineado con Inscripción) ===== */
const css = `
:root{
  --blue:#3b549d; --indigo:#5850EC; --ok:#16a34a;
  --bd:#e5e7eb; --bd-dark:#1f2a44;
  --ink:#0b1220; --ink-soft:#51607a;
}
.pay-page .hero .pill{
  display:inline-block; padding:.28rem .6rem; border-radius:999px;
  border:1px solid #dbeafe; background:#eef2ff; color:#0b1220; font-weight:800;
}
.subtle{ color:var(--ink-soft); }

.card-float{
  border:1px solid var(--bd); border-radius:16px; background:#fff; box-shadow:0 10px 24px rgba(16,24,40,.06); color:var(--ink);
}
@media (prefers-color-scheme: dark){
  .card-float{ background:#0f172a; border-color:#1f2a44; color:#eaf2ff; }
  .subtle{ color:#cbd5e1; }
}

.req{ color:var(--ok); font-weight:800; margin-left:.15rem; }
.form-label{ font-weight:700; }

.form-control, .form-select{
  background:#fff; color:#0f172a; border:1px solid var(--bd);
}
.form-control::placeholder{ color:#9aa9c1 }
@media (prefers-color-scheme: dark){
  .form-control, .form-select{ background:#0f172a; color:#e5e7eb; border-color:#28324a; }
  .form-control::placeholder{ color:#8ea0bb }
}

.form-control.is-invalid, .form-select.is-invalid{ border-color:#ef4444; }
.invalid{ font-size:.85rem; color:#ef4444; margin-top:.25rem; }

.btn{ display:inline-flex; align-items:center; gap:8px; padding:.62rem 1rem; border-radius:12px; border:1px solid #d6daf1; text-decoration:none; font-weight:800; }
.btn-primary{ background:var(--indigo); color:#fff; border-color:var(--indigo); }
.btn-outline{ background:#fff; color:#0b1220; }
.btn-ghost{ background:transparent; color:#3b549d; border:1px solid #dbeafe; }
.btn.disabled, .btn[disabled]{ pointer-events:none; opacity:.6; cursor:not-allowed; }

.ok{
  border:1px solid #c7e8d3; background:linear-gradient(180deg,#f7fff9,#ffffff);
  padding:10px; border-radius:12px; color:#0b1220;
}
@media (prefers-color-scheme: dark){
  .ok{ border-color:#2a3a66; background:linear-gradient(180deg,#0f172a,#0b1220); color:#e5e7eb; }
}
.ok-title{ font-weight:900; margin-bottom:2px; color:var(--ok) }

.bank, .tips{ margin:0; padding-left:18px }
.bank li, .tips li{ margin:4px 0 }
.bank li span{ color:#66748f; display:inline-block; min-width:150px }
.bank li strong{ color:#0b1220 }
@media (prefers-color-scheme: dark){
  .bank li strong{ color:#e5e7eb }
  .bank li span{ color:#9fb3c8 }
}

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin-top:10px }
.hr{ height:1px; background:#edf0f6; margin:12px 0 }
@media (prefers-color-scheme: dark){ .hr{ background:#22304d } }

.tiny{ font-size:.8rem }
`;