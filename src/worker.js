// src/worker.js

// 🔴 TU GOOGLE SHEET (La URL que me pasaste)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxtpSpOLYlNvkhSa86EohNUWYLtJ0fY6-FqkwGe1lwjH9Q372DTRmdgD45YtX0juQiw8g/exec";

// Configuración CORS (Para que React no reclame)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Manejo de CORS (Preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. ENDPOINT: GUARDAR INSCRIPCIÓN (POST /inscribir)
    if (request.method === "POST" && url.pathname === "/inscribir") {
      try {
        const body = await request.json();
        
        // Validación básica
        if (!body.fullName || !body.rut || !body.program) {
           return jsonResponse({ error: "Faltan datos obligatorios" }, 400);
        }

        // --- A. GUARDAR EN BASE DE DATOS D1 (Seguridad) ---
        // Esto guarda en Cloudflare (tu base de datos principal)
        const result = await env.DB.prepare(
          `INSERT INTO pre_matriculas (nombre, rut, email, telefono, curso_interes, detalle_pago) 
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
        )
        .bind(
          body.fullName, 
          body.rut, 
          body.email, 
          body.phone, 
          body.program, 
          body.comments || "Pendiente de pago"
        )
        .run();

        // --- B. ENVIAR A GOOGLE SHEETS (Respaldo) ---
        // Esto manda los datos a tu Excel automáticamente
        try {
          if (GOOGLE_SHEET_URL) {
            // Enviamos los datos mapeados (Nombre del campo en React -> Nombre de Columna en Excel)
            await fetch(GOOGLE_SHEET_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                Nombre: body.fullName,
                RUT: body.rut,
                Email: body.email,
                Telefono: body.phone,
                Plan: body.program,
                Detalle: body.comments || ""
              })
            });
          }
        } catch (sheetError) {
          // Si falla Google Sheets, solo lo registramos en consola, 
          // pero NO detenemos el proceso porque ya guardamos en D1.
          console.log("Aviso: No se pudo enviar al Sheet, pero D1 guardó bien.", sheetError);
        }
        
        // Respuesta final de éxito al usuario
        return jsonResponse({ 
          success: true, 
          id: result.meta.last_row_id,
          message: "Inscripción exitosa" 
        });

      } catch (err) {
        return jsonResponse({ error: "Error en servidor: " + err.message }, 500);
      }
    }

    // 3. ENDPOINT DE PRUEBA (GET /)
    if (url.pathname === "/") {
      return new Response("API Instituto Lael Funcionando 🚀");
    }

    return new Response("Ruta no encontrada", { status: 404, headers: corsHeaders });
  },
};