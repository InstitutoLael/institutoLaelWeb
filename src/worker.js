// src/worker.js

// Función auxiliar para respuestas JSON (CORS activado para que React no falle)
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
        
        // Validamos que vengan los datos mínimos
        if (!body.fullName || !body.rut || !body.program) {
           return jsonResponse({ error: "Faltan datos" }, 400);
        }

        // INSERTAMOS EN LA TABLA RÁPIDA 'pre_matriculas'
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

        // Si tienes configurado el Google Sheet, aquí iría el fetch() de respaldo.
        
        return jsonResponse({ 
          success: true, 
          id: result.meta.last_row_id,
          message: "Guardado en pre-matrícula" 
        });

      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 3. ENDPOINT DE PRUEBA (GET /)
    if (url.pathname === "/") {
      return new Response("API Instituto Lael Funcionando 🚀");
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};