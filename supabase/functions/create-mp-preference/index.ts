import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
    // 1. Configuración de CORS (Permisos de seguridad)
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    // Manejo de petición "previa" (OPTIONS) para que el navegador no bloquee
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 2. Obtener variable de entorno de forma segura
        const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')
        if (!MP_ACCESS_TOKEN) {
            throw new Error("Error interno: Falta configurar MP_ACCESS_TOKEN en Supabase.")
        }

        // 3. Recibir datos del Frontend (Agregué customer_email)
        const { orderId, items, back_urls, customer_email } = await req.json()

        // 4. Armar el objeto para Mercado Pago
        const preference = {
            items: items.map((i: any) => ({
                title: i.title,
                unit_price: Number(i.unit_price), // Aseguramos que sea número
                quantity: Number(i.quantity),     // Aseguramos que sea número
                currency_id: 'CLP'
            })),
            payer: {
                email: customer_email // ¡Importante para que MP sepa quién paga!
            },
            external_reference: String(orderId), // Vincula el pago a tu orden
            back_urls: back_urls,
            auto_return: 'approved',
            statement_descriptor: "INSTITUTO LAEL",
            payment_methods: {
                installments: 12, // Permitir cuotas
                excluded_payment_types: [
                    { id: "ticket" } // Opcional: Evita pagos en efectivo (Servipag) si quieres confirmación inmediata
                ]
            }
        }

        // 5. Llamada a la API de Mercado Pago
        console.log("Enviando preferencia a Mercado Pago...", preference.external_reference);

        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preference)
        })

        const data = await mpResponse.json()

        if (!mpResponse.ok) {
            console.error("Error respuesta MP:", data);
            throw new Error(`Mercado Pago rechazó la solicitud: ${data.message || JSON.stringify(data)}`)
        }

        // 6. Devolver respuesta exitosa al Frontend
        // Devolvemos todo 'data' porque el frontend usa data.init_point o data.id
        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        })

    } catch (error: any) {
        console.error("Error en Function:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 // Bad Request
        })
    }
})