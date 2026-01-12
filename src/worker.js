const ADMIN_TOKEN = "Diosprimero#1";
// Si quieres seguir usando Google Sheets como respaldo, deja esta URL. Si no, bórrala.
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxWm7ny3UL0eu2vnly4SmNN8M2N3JMbadj1Sw-vHXgHqB3opwNNoj8AdXB2JtwatmcK/exec";

// Función para responder siempre con cabeceras CORS (para que React no se queje)
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Permite que cualquiera envíe datos
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Preflight (CORS): Importante para que el navegador deje pasar la petición
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // 2. ENDPOINT: RECIBIR INSCRIPCIÓN (POST)
    // El formulario React enviará los datos aquí
    if (request.method === "POST" && url.pathname === "/inscribir") {
      try {
        const data = await request.json();
        
        // Aquí recibimos los datos tal cual los envía el React
        const { fullName, rut, email, phone, program, comments } = data;

        // Validación básica
        if (!fullName || !email || !program) {
            return jsonResponse({ error: "Faltan datos obligatorios" }, 400);
        }

        // A. Guardar en Cloudflare D1 (Base de datos principal)
        // Asegúrate de que tu tabla 'alumnos' tenga estas columnas
        await env.DB.prepare(
          `INSERT INTO alumnos (nombre, rut, email, telefono, curso, comentarios, fecha_registro) 
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, datetime('now'))`
        )
          .bind(fullName, rut, email, phone, program, comments || "")
          .run();

        // B. (Opcional) Enviar respaldo a Google Sheets
        // Enviamos los datos mapeados para que tu Sheet los entienda
        try {
          if (GOOGLE_SHEETS_WEBAPP_URL) {
            await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                  nombre: fullName, 
                  email: email, 
                  curso: program, 
                  rut: rut, 
                  telefono: phone 
              }),
            });
          }
        } catch (err) {
            console.log("Error enviando a Google Sheets, pero D1 guardó bien.");
        }

        return jsonResponse({ ok: true, message: "Inscripción exitosa" });

      } catch (e) {
        return jsonResponse({ error: "Error procesando solicitud: " + e.message }, 500);
      }
    }

    // 3. ENDPOINT: VER ALUMNOS (GET) - Protegido con contraseña
    if (request.method === "GET" && url.pathname === "/alumnos") {
      const auth = request.headers.get("Authorization");
      
      // Verificamos el token "Diosprimero#1"
      if (auth !== `Bearer ${ADMIN_TOKEN}`) {
        return jsonResponse({ error: "⛔ Acceso Denegado" }, 401);
      }

      const result = await env.DB.prepare("SELECT * FROM alumnos ORDER BY fecha_registro DESC").all();
      return jsonResponse(result.results);
    }

    return new Response("Ruta no encontrada", { status: 404 });
  },
};