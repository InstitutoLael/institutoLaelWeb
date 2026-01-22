import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

serve(async (req) => {
    try {
        const { action, type, data } = await req.json()

        console.log(`Received MP Webhook: ${action} - ${type}`, data)

        // Only process payment notifications
        if (type === 'payment' && data?.id) {
            const paymentId = data.id

            // 1. Fetch payment info from Mercado Pago
            const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
                }
            })

            if (!mpResponse.ok) {
                throw new Error(`Failed to fetch payment details from MP: ${mpResponse.statusText}`)
            }

            const paymentData = await mpResponse.json()
            const orderId = paymentData.external_reference // We set this during preference creation
            const status = paymentData.status

            console.log(`Payment Status for Order ${orderId}: ${status}`)

            if (status === 'approved' && orderId) {
                // 2. Update Order Status
                const { data: order, error: orderError } = await supabase
                    .from('orders')
                    .update({ status: 'paid' })
                    .eq('id', orderId)
                    .select()
                    .single()

                if (orderError) throw orderError

                // 3. Find Order Items to create Inscriptions
                const { data: items, error: itemsError } = await supabase
                    .from('order_items')
                    .select('product_id')
                    .eq('order_id', orderId)

                if (itemsError) throw itemsError

                // 4. Activate Inscriptions
                if (items && items.length > 0) {
                    const inscriptions = items.map(item => ({
                        user_id: order.user_id,
                        product_id: item.product_id,
                        order_id: orderId,
                        active: true
                    }))

                    const { error: insError } = await supabase
                        .from('inscriptions')
                        .upsert(inscriptions, { onConflict: 'user_id, product_id' })

                    if (insError) throw insError
                    console.log(`Successfully activated ${inscriptions.length} inscriptions for user ${order.user_id}`)
                }
            }
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })

    } catch (error) {
        console.error('Webhook Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        })
    }
})
