import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "https://esm.sh/nodemailer@6.9.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, data, type } = await req.json();

    // Mercado Pago Webhook Structure
    // Usually expects: { action: 'payment.created' | 'payment.updated', data: { id: '...' } }
    
    // For this MVP, we will accept a direct payload as well if triggered manually or via client for testing
    // Payload expected: { type: 'manual_trigger', email: '...', orderId: '...', items: [...], total: ... }

    let orderData = null;

    if (type === 'manual_trigger') {
        orderData = {
            id: data.orderId || 'TEST-' + Date.now(),
            status: 'approved',
            email: data.email,
            items: data.items || [],
            total: data.total || 0,
            full_name: data.full_name || 'Estudiante'
        };
    } else if (action === 'payment.created' || action === 'payment.updated') {
        try {
            // Fetch Payment Details from Mercado Pago
            const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
                headers: {
                    "Authorization": `Bearer ${Deno.env.get("MP_ACCESS_TOKEN")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!mpResponse.ok) {
                console.error("MP API Error:", await mpResponse.text());
                // Return 200 to avoid indefinite retries if token is wrong, but log error
                return new Response(JSON.stringify({ message: "MP Fetch Failed" }), { status: 200, headers: corsHeaders });
            }

            const payment = await mpResponse.json();
            
            // Only process approved payments
            if (payment.status !== 'approved') {
                 console.log("Payment not approved yet:", payment.status);
                 return new Response(JSON.stringify({ message: "Payment status processed (not approved)" }), { status: 200, headers: corsHeaders });
            }

            orderData = {
                id: String(payment.id),
                status: payment.status,
                email: payment.payer.email,
                items: payment.additional_info?.items || [{ title: payment.description, unit_price: payment.transaction_amount, quantity: 1 }],
                total: payment.transaction_amount,
                full_name: payment.payer.first_name ? `${payment.payer.first_name} ${payment.payer.last_name}` : 'Estudiante'
            };

            console.log("Processing Order for:", orderData.email);

        } catch (err) {
            console.error("Error processing MP data:", err);
            return new Response(JSON.stringify({ error: "Processing failed" }), { status: 200, headers: corsHeaders });
        }
    } else {
         // Default Fallback
         throw new Error("Unknown event type");
    }

    // 1. Insert into Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseClient
      .from("orders")
      .insert({
        payment_id: orderData.id,
        payment_status: orderData.status,
        customer_email: orderData.email,
        total_amount: orderData.total,
        items: orderData.items,
        metadata: { source: 'webhook' }
      });

    if (dbError) {
        console.error("Database Error:", dbError);
        // Don't fail the request, just log it. The email is more important for the user right now.
    }

    // 2. Send Email via SMTP
    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.gmail.com",
      port: Number(Deno.env.get("SMTP_PORT") || 465),
      secure: true, // true for 465, false for other ports
      auth: {
        user: Deno.env.get("SMTP_USER"),
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    const mailOptions = {
      from: Deno.env.get("SMTP_FROM") || '"Instituto Lael" <pagos@institutolael.cl>',
      to: orderData.email,
      subject: `¡Pago Recibido! Bienvenido a Instituto Lael (Orden #${orderData.id.slice(0,8)})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background-color: #050505; padding: 40px 20px; text-align: center; }
            .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
            .highlight-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 25px 0; }
            .btn { display: inline-block; background-color: #10B981; color: #ffffff; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 0.5px; margin-top: 10px; }
            .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
            h2 { color: #f59e0b; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
            h3 { color: #0f172a; margin-top: 0; }
            .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 1px; }
            .value { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 5px; display: block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <!-- Logo placeholder or text -->
              <h2 style="color: #ffffff;">Instituto Lael</h2>
            </div>
            
            <div class="content">
              <h2 style="color: #10B981; margin-bottom: 20px;">¡Matrícula Exitosa!</h2>
              <p style="font-size: 16px;">Hola <strong>${orderData.full_name}</strong>,</p>
              <p>Te confirmamos que tu pago ha sido recibido correctamente. <strong>Tu cupo para el 2026 está 100% asegurado.</strong></p>
              
              <div class="highlight-box">
                <div style="margin-bottom: 15px;">
                  <span class="label">Orden ID</span>
                  <span class="value">#${orderData.id.slice(0, 8)}</span>
                </div>
                <div>
                  <span class="label">Monto Total</span>
                  <span class="value">$${orderData.total.toLocaleString("es-CL")}</span>
                </div>
              </div>

              <h3>🚀 Próximos Pasos</h3>
              <p>Nuestro equipo de Coordinación Académica ya tiene tus datos. En un plazo máximo de <strong>24 horas hábiles</strong> te contactaremos vía WhatsApp para:</p>
              <ol style="padding-left: 20px; margin-bottom: 30px;">
                <li>Validar tu ficha de estudiante.</li>
                <li>Entregarte acceso a tu Aula Virtual.</li>
                <li>Darte la bienvenida oficial a la comunidad.</li>
              </ol>

              <div style="text-align: center;">
                <p style="margin-bottom: 15px; font-weight: 500;">¿Quieres agilizar tu ingreso?</p>
                <a href="https://wa.me/56964626568?text=Hola,%20ya%20pagué%20mi%20matricula%20(Orden%20${orderData.id.slice(0,8)})" class="btn">
                  Hablar con Coordinación Ahora
                </a>
              </div>
            </div>

            <div class="footer">
              <p>&copy; 2026 Instituto Lael. Todos los derechos reservados.</p>
              <p>Si tienes dudas, responde a este correo o contáctanos por nuestros canales oficiales.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return new Response(JSON.stringify({ message: "Order processed successfully", id: orderData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
