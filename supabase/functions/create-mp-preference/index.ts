import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')!

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        })
    }

    try {
        const { orderId, items, back_urls } = await req.json()

        // 1. Prepare preference data
        const preference = {
            items: items.map(i => ({
                title: i.title,
                unit_price: i.unit_price,
                quantity: i.quantity,
                currency_id: 'CLP'
            })),
            external_reference: orderId,
            back_urls: back_urls,
            auto_return: 'approved',
            payment_methods: {
                installments: 12 // Allow up to 12 installments
            }
        }

        // 2. Call Mercado Pago API
        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preference)
        })

        if (!mpResponse.ok) {
            const errorData = await mpResponse.json()
            throw new Error(`MP Error: ${JSON.stringify(errorData)}`)
        }

        const data = await mpResponse.json()

        return new Response(JSON.stringify({ id: data.id }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            status: 200
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            status: 400
        })
    }
})
