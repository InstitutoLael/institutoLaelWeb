// src/worker.js

// 🔴 TU GOOGLE SHEET (La URL correcta que termina en juQiw8g)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxtpSpOLYlNvkhSa86EohNUWYLtJ0fY6-FqkwGe1lwjH9Q372DTRmdgD45YtX0juQiw8g/exec";

// Configuración CORS
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

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // POST /inscribir
    if (request.method === "POST" && url.pathname === "/inscribir") {
      try {
        const body = await request.json();
        
        if (!body.fullName || !body.rut || !body.program) {
           return jsonResponse({ error: "Faltan datos obligatorios" }, 400);
        }

        // --- LÓGICA INTELIGENTE PARA EL PRECIO ---
        // 1. Intentamos leer el total normal.
        // 2. Si no existe, buscamos un signo "$" dentro de los comentarios y lo "robamos".
        let precioFinal = body.total;
        
        if (!precioFinal && body.comments && body.comments.includes("$")) {
           // Buscamos algo que parezca dinero (ej: $38.980)
           const match = body.comments.match(/\$[\d.]+/); 
           if (match) {
             precioFinal = match[0]; // Usamos el precio encontrado en el texto
           } else {
             precioFinal = "Por cotizar";
           }
        }

        // --- A. GUARDAR EN D1 ---
        const result = await env.DB.prepare(
          `INSERT INTO pre_matriculas (nombre, rut, email, telefono, curso_interes, detalle_pago) 
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
        )
        .bind(
          body.fullName, body.rut, body.email, body.phone, body.program, 
          body.comments || "Pendiente"
        )
        .run();

        // --- B. ENVIAR A GOOGLE SHEETS ---
        try {
          if (GOOGLE_SHEET_URL) {
            await fetch(GOOGLE_SHEET_URL, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify({
                fullName: body.fullName,
                rut: body.rut,
                email: body.email,
                phone: body.phone,
                program: body.program,
                // Aquí enviamos el precio que rescatamos (o "Por cotizar" si no hay nada)
                total: precioFinal || "Por cotizar", 
                comments: body.comments || ""
              })
            });
          }
        } catch (sheetError) {
          console.log("Error Sheet:", sheetError);
        }
        
        return jsonResponse({ success: true, message: "Inscripción exitosa" });

      } catch (err) {
        return jsonResponse({ error: "Error: " + err.message }, 500);
      }
    }

    if (url.pathname === "/") return new Response("API Lista 🚀");
    return new Response("404", { status: 404, headers: corsHeaders });
  },
};