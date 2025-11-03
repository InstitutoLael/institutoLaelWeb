/* functions/index.js */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Variables desde functions/.env (Firebase Functions las inyecta en process.env)
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

// Transport SMTP
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT || 587),
  secure: String(EMAIL_PORT) === "465",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

// CLP helper
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/**
 * Se ejecuta al crear un doc en Firestore: payments/{id}
 * Envía correo interno (EMAIL_TO) y acuse al alumno si hay email.
 */
exports.onPaymentCreate = functions.firestore
  .document("payments/{id}")
  .onCreate(async (snap, context) => {
    const data = snap.data() || {};
    const id = context.params.id;

    const alumno = {
      nombre: data.fullName || "—",
      email: data.email || "",
      telefono: data.phone || "—",
      rut: data.rut || "—",
    };

    const info = {
      programa: data.program || "—",
      plan: data.plan || "—",
      detalle: data.subjects || "—",
      monto: clp(data.amount || 0),
      notas: data.notes || "—",
      folio: id,
      comprobanteUrl: data.receiptUrl || "",
      comprobanteName: data.receiptName || "",
      createdAt: new Date().toLocaleString("es-CL"),
    };

    const toList = String(EMAIL_TO || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!toList.length) {
      console.warn("EMAIL_TO vacío. Configúralo en functions/.env");
      return null;
    }

    const subj = `Pago recibido • ${info.programa} • ${alumno.nombre}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px">Nuevo pago registrado</h2>
        <p style="margin:0 0 10px;color:#475569">Folio: <strong>${info.folio}</strong> · ${info.createdAt}</p>

        <h3 style="margin:14px 0 6px">Alumno</h3>
        <ul>
          <li><strong>Nombre:</strong> ${alumno.nombre}</li>
          <li><strong>Email:</strong> ${alumno.email || "—"}</li>
          <li><strong>Teléfono:</strong> ${alumno.telefono}</li>
          <li><strong>RUT:</strong> ${alumno.rut}</li>
        </ul>

        <h3 style="margin:14px 0 6px">Programa</h3>
        <ul>
          <li><strong>Programa:</strong> ${info.programa}</li>
          <li><strong>Plan/Nivel:</strong> ${info.plan}</li>
          <li><strong>Detalle:</strong> ${info.detalle}</li>
        </ul>

        <h3 style="margin:14px 0 6px">Pago</h3>
        <ul>
          <li><strong>Monto:</strong> ${info.monto}</li>
          <li><strong>Notas:</strong> ${info.notas}</li>
          ${
            info.comprobanteUrl
              ? `<li><strong>Comprobante:</strong> <a href="${info.comprobanteUrl}">ver archivo</a></li>`
              : ""
          }
        </ul>
        <p style="margin-top:16px;color:#64748b">Correo automático – Instituto Lael</p>
      </div>
    `;

    const attachments = [];
    if (info.comprobanteUrl) {
      attachments.push({
        filename: info.comprobanteName || "comprobante.pdf",
        path: info.comprobanteUrl,
      });
    }

    try {
      // 1) Interno
      await transporter.sendMail({
        from: EMAIL_FROM || `"Lael Pagos" <no-reply@lael.cl>`,
        to: toList,
        subject: subj,
        html,
        attachments,
        replyTo: alumno.email || undefined,
      });

      // 2) Acuse alumno (si hay email)
      if (alumno.email && alumno.email.includes("@")) {
        const htmlAlumno = `
          <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,sans-serif;line-height:1.5">
            <h2 style="margin:0 0 8px">¡Gracias, ${alumno.nombre}!</h2>
            <p>Recibimos tu comprobante por <strong>${info.monto}</strong> para <strong>${info.programa}</strong>.</p>
            <p>Folio de seguimiento: <strong>${info.folio}</strong>. Te confirmaremos la validación a la brevedad.</p>
            <p style="color:#64748b">Si necesitas ayuda, responde a este correo.</p>
          </div>
        `;
        await transporter.sendMail({
          from: EMAIL_FROM || `"Instituto Lael" <no-reply@lael.cl>`,
          to: alumno.email,
          subject: `Recibimos tu comprobante • Folio ${info.folio}`,
          html: htmlAlumno,
        });
      }

      console.log(`✅ Mail enviado por pago ${id}`);
      return null;
    } catch (err) {
      console.error("❌ Error enviando mail:", err);
      return null; // no relanzar para evitar reintentos infinitos
    }
  });