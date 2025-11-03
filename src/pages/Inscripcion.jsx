// src/pages/Inscripcion.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Cart opcional:
 * - Si tu app expone window.__LAEL_USE_CART__ (un hook), lo usamos.
 * - Si NO existe, seguimos con un carrito vacío sin romper nada.
 *   (Para habilitarlo desde tu app: window.__LAEL_USE_CART__ = useCart)
 */
function useMaybeCart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && typeof window.__LAEL_USE_CART__ === "function") {
        // usamos el hook real y nos suscribimos a sus cambios
        const useCart = window.__LAEL_USE_CART__;
        // Importante: no podemos "llamar" hooks condicionalmente aquí.
        // Solución: escuchamos eventos de tu app o leemos snapshot si lo expone.
        // Fallback: intentamos snapshot sincrónico si tu hook lo permite (no siempre posible).
        const snap = useCart?.__snapshot?.(); // opcional si lo implementas
        if (snap && typeof snap === "object") setCart(snap);

        // Si tu app emite eventos cuando cambia el carrito:
        const handler = (e) => setCart(e.detail);
        window.addEventListener("lael:cart:update", handler);
        return () => window.removeEventListener("lael:cart:update", handler);
      } else {
        // Fallback: intentamos cargar de localStorage si existe un guardado básico
        const raw = localStorage.getItem("lael_cart");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") setCart(parsed);
        }
      }
    } catch {
      // silencioso, seguimos con carrito vacío
    }
  }, []);

  return cart;
}

const WAPP_INTL = "56964626568";

// format CLP local sin chocar con otros clp()
const money = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export default function Inscripcion() {
  const cart = useMaybeCart();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    programa: "", // "PAES" | "Idiomas" | "LSCh" | "Empresas" | "Homeschool"
    modalidad: "online", // "online" | "presencial" | "mixto"
    horario: "tarde", // "manana" | "tarde" | "noche"
    detalle: "", // ramos/idiomas/objetivo
    acepta: false,
  });

  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const resumenCarrito = useMemo(() => {
    if (!cart?.items?.length) return "—";
    return cart.items
      .map((it) => {
        const label = it?.title || it?.name || it?.id || "Item";
        const price =
          typeof it?.price === "number" ? ` (${money(it.price)})` : "";
        return `• ${label}${price}`;
      })
      .join("\n");
  }, [cart]);

  const totalCarrito = typeof cart?.total === "number" ? cart.total : 0;

  const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const isPhone = (v) => v.replace(/\D/g, "").length >= 9;

  const isValid =
    form.nombre.trim().length >= 3 &&
    isEmail(form.correo) &&
    isPhone(form.telefono) &&
    form.programa &&
    form.modalidad &&
    form.acepta;

  const waText = encodeURIComponent(
    `Hola 👋, quiero inscribirme.\n` +
      `Nombre: ${form.nombre}\n` +
      `Correo: ${form.correo}\n` +
      `Teléfono: ${form.telefono}\n` +
      `Programa: ${form.programa}\n` +
      `Modalidad: ${nice(form.modalidad)} · Horario: ${niceHor(form.horario)}\n` +
      (form.detalle?.trim() ? `Detalle: ${form.detalle}\n` : "") +
      (cart?.items?.length
        ? `Carrito:\n${resumenCarrito}\nTotal estimado: ${money(
            totalCarrito
          )}\n`
        : "") +
      `Acepto términos: ${form.acepta ? "Sí" : "No"}`
  );

  const mailto = `mailto:inscripciones@institutolael.cl?subject=Inscripción%20${encodeURIComponent(
    form.programa || ""
  )}&body=${waText}`;

  const preventIfDisabled = (e) => {
    if (!isValid) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="enroll">
      <style>{css}</style>

      {/* HERO */}
      <header className="mb-4 hero">
        <span className="pill">Inscripción</span>
        <h1 className="h3 mt-2 mb-1">Reserva tu cupo</h1>
        <p className="subtle m-0">
          Respondemos en <strong>menos de 24h hábiles</strong>. Si ya cargaste
          items al carrito, se incluirán en el mensaje automáticamente.
        </p>
      </header>

      <div className="row g-3">
        {/* FORM */}
        <div className="col-lg-7">
          <article className="card-float p-3 p-md-4">
            <h2 className="h6 mb-3">Datos del/la estudiante</h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  Nombre y apellidos <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={(e) => setF("nombre", e.target.value)}
                  placeholder="Ej: Diego Riquelme"
                  autoComplete="name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Correo <span className="req">*</span>
                </label>
                <input
                  type="email"
                  className={
                    "form-control" +
                    (form.correo && !isEmail(form.correo) ? " is-invalid" : "")
                  }
                  value={form.correo}
                  onChange={(e) => setF("correo", e.target.value)}
                  placeholder="Ej: nombre@correo.cl"
                  autoComplete="email"
                  inputMode="email"
                />
                {form.correo && !isEmail(form.correo) && (
                  <div className="invalid">Ingresa un correo válido.</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Teléfono (WhatsApp) <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  className={
                    "form-control" +
                    (form.telefono && !isPhone(form.telefono)
                      ? " is-invalid"
                      : "")
                  }
                  value={form.telefono}
                  onChange={(e) => setF("telefono", e.target.value)}
                  placeholder="+56 9 1234 5678"
                  autoComplete="tel"
                  inputMode="tel"
                />
                {form.telefono && !isPhone(form.telefono) && (
                  <div className="invalid">
                    Ingresa un número de WhatsApp válido.
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Programa <span className="req">*</span>
                </label>
                <select
                  className="form-select"
                  value={form.programa}
                  onChange={(e) => setF("programa", e.target.value)}
                >
                  <option value="">Selecciona…</option>
                  <option value="PAES">PAES</option>
                  <option value="Idiomas">Idiomas</option>
                  <option value="LSCh">LSCh</option>
                  <option value="Empresas">Empresas</option>
                  <option value="Homeschool">Homeschool (apoyo)</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Modalidad</label>
                <div className="chip-row" role="group" aria-label="Modalidad">
                  {["online", "mixto", "presencial"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={
                        "chip " + (form.modalidad === m ? "is-active" : "")
                      }
                      aria-pressed={form.modalidad === m}
                      onClick={() => setF("modalidad", m)}
                    >
                      {nice(m)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Horario preferente</label>
                <div className="chip-row" role="group" aria-label="Horario">
                  {[
                    { id: "manana", label: "Mañana (8–12)" },
                    { id: "tarde", label: "Tarde (13–18)" },
                    { id: "noche", label: "Noche (19–22)" },
                  ].map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      className={"chip " + (form.horario === h.id ? "is-active" : "")}
                      aria-pressed={form.horario === h.id}
                      onClick={() => setF("horario", h.id)}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Detalle (ramos/idiomas/objetivo)</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={form.detalle}
                  onChange={(e) => setF("detalle", e.target.value)}
                  placeholder={
                    form.programa === "PAES"
                      ? "Ej: M1 + Lenguaje + Historia"
                      : form.programa === "Idiomas"
                      ? "Ej: Inglés B1 + club conversación"
                      : form.programa === "LSCh"
                      ? "Ej: Módulo 1 (Inicial)"
                      : form.programa === "Empresas"
                      ? "Ej: Inglés corporativo, 30 personas, modalidad mixta"
                      : "Cuéntanos brevemente lo que necesitas"
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={form.acepta}
                    onChange={(e) => setF("acepta", e.target.checked)}
                  />
                  <span className="form-check-label">
                    Acepto términos y políticas de Instituto Lael. <span className="req">*</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <a
                className={"btn btn-primary" + (isValid ? "" : " disabled")}
                href={isValid ? `https://wa.me/${WAPP_INTL}?text=${waText}` : "#"}
                onClick={preventIfDisabled}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!isValid}
                title={isValid ? "Enviar por WhatsApp" : "Completa los datos requeridos"}
              >
                Enviar por WhatsApp
              </a>
              <a
                className={"btn btn-outline-secondary" + (isValid ? "" : " disabled")}
                href={isValid ? mailto : "#"}
                onClick={preventIfDisabled}
                aria-disabled={!isValid}
                title={isValid ? "Enviar por correo" : "Completa los datos requeridos"}
              >
                Enviar por correo
              </a>
              <Link className="btn btn-ghost" to="/pagos">Ver formas de pago</Link>
            </div>
          </article>
        </div>

        {/* RESUMEN + TRANSFERENCIA */}
        <div className="col-lg-5">
          <article className="card-float p-3 p-md-4 mb-3">
            <h2 className="h6 mb-2">Resumen</h2>
            <ul className="summary">
              <li><strong>Programa:</strong> {form.programa || "—"}</li>
              <li><strong>Modalidad:</strong> {nice(form.modalidad)}</li>
              <li><strong>Horario:</strong> {niceHor(form.horario)}</li>
              <li className="break"><strong>Detalle:</strong> {form.detalle || "—"}</li>
            </ul>

            {!!cart?.items?.length && (
              <>
                <h3 className="h6 mt-3 mb-2">Carrito</h3>
                <pre className="cart-pre" aria-live="polite">{resumenCarrito}</pre>
                <div className="tot">
                  Total estimado: <strong>{money(totalCarrito)}</strong>
                </div>
              </>
            )}
          </article>

          <article className="card-float p-3 p-md-4">
            <h2 className="h6 mb-2">Pago por transferencia</h2>
            <div className="bank blk">
              <div><strong>Banco:</strong> Banco Estado</div>
              <div><strong>Tipo:</strong> Cuenta Vista</div>
              <div><strong>Titular:</strong> Instituto Lael SpA</div>
              <div><strong>RUT:</strong> 76.123.456-7</div>
              <div><strong>N° cuenta:</strong> 12345678901</div>
              <div><strong>Correo:</strong> pagos@institutolael.cl</div>
              <div><strong>Glosa:</strong> Nombre Alumno + Programa</div>
            </div>
            <p className="tiny subtle m-0">
              Envía el comprobante por WhatsApp o correo y activamos tu matrícula.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* helpers */
function nice(s) {
  if (!s) return "—";
  return s === "online"
    ? "Online"
    : s === "mixto"
    ? "Mixto"
    : s === "presencial"
    ? "Presencial"
    : s;
}
function niceHor(h) {
  if (h === "manana") return "Mañana (8–12)";
  if (h === "tarde") return "Tarde (13–18)";
  if (h === "noche") return "Noche (19–22)";
  return "—";
}

/* estilos locales (paleta Lael + accesibilidad) */
const css = `
:root{
  --blue:#3b549d; --indigo:#5850EC; --ok:#16a34a;
  --bd:#e5e7eb; --bd-dark:#1f2a44;
  --ink:#0b1220; --ink-soft:#51607a;
}
.enroll .hero .pill{
  display:inline-block; padding:.28rem .6rem; border-radius:999px;
  border:1px solid #dbeafe; background:#eef2ff; color:#0b1220; font-weight:800;
}
.subtle{ color:var(--ink-soft); }
.card-float{ border:1px solid var(--bd); border-radius:16px; background:#fff; box-shadow:0 10px 24px rgba(16,24,40,.06); color:var(--ink); }
@media (prefers-color-scheme: dark){
  .card-float{ background:#0f172a; border-color:#1f2a44; color:#eaf2ff; }
  .subtle{ color:#cbd5e1; }
}
.req{ color:var(--ok); font-weight:800; margin-left:.15rem; }

.chip-row{ display:flex; flex-wrap:wrap; gap:8px; }
.chip{
  border:1px solid #dbeafe; background:linear-gradient(180deg,#fff,#fafafa); color:#0f172a;
  border-radius:999px; padding:.45rem .75rem; font-size:.9rem; box-shadow:0 2px 8px rgba(16,24,40,.06);
  transition:.15s; font-weight:800;
}
.chip.is-active{ border-color:var(--indigo); background:#eef2ff; }
@media (prefers-color-scheme: dark){
  .chip{ background:#0f172a; color:#e5e7eb; border-color:#1f2a44; }
  .chip.is-active{ background:#101a2f; border-color:#28324a; }
}

.form-control.is-invalid, .form-select.is-invalid{ border-color:#ef4444; }
.invalid{ font-size:.85rem; color:#ef4444; margin-top:.25rem; }

/* botones deshabilitados que NO navegan */
.btn.disabled{ pointer-events:none; opacity:.6; }

.summary{ list-style:none; padding:0; margin:0; display:grid; gap:6px; }
.summary .break{ white-space:pre-wrap }
.cart-pre{
  background:#0b1220; color:#e5e7eb; border-radius:10px; padding:.6rem .8rem; white-space:pre-wrap; margin:0;
  border:1px solid #1f2a44;
}

.bank.blk{ display:grid; gap:4px; margin-bottom:6px; }
.btn-ghost{ border:1px solid #dbeafe; color:#3b549d; }
@media (prefers-color-scheme: dark){ .btn-ghost{ color:#cbd5e1; border-color:#334155; } }
`;