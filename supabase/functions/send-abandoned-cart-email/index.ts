// supabase/functions/send-abandoned-cart-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Init Supabase Client with Admin Auth (to read leads and send emails via custom logic if needed)
    // Note: Use SERVICE_ROLE_KEY to bypass RLS if necessary, or just anon key if policies allow.
    // For Cron jobs, we usually recommend Service Role.
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 2. Fetch "Abandoned" Leads
    // Criteria: 
    // - type: 'checkout_abandoned'
    // - status: 'checkout_step_1_completed' (created but not purchased)
    // - created_at: older than 30 mins, younger than 24 hours (to avoid spamming old leads)
    // - email_sent: false (we need a flag or checks in a separate table/log to avoid double sending)
    
    // For this MVP, we will just fetch the latest leads and log them. 
    // In production, you'd add a "recovery_email_sent_at" column to the 'leads' table.
    
    // Let's assume we have a column 'recovery_sent' (boolean) or we check against orders.
    // Actually, checking if they purchased is key.
    
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: abandonedLeads, error: leadsError } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("type", "checkout_abandoned")
      .eq("status", "checkout_step_1_completed") // Assuming this status remains if they didn't finish
      .lt("created_at", thirtyMinsAgo)
      .gt("created_at", twentyFourHoursAgo)
      .is("recovery_sent_at", null); // Assuming we added this column to avoid duplicates

    if (leadsError) throw leadsError;

    const results = [];

    // 3. Process each lead
    for (const lead of abandonedLeads || []) {
      // Check if this email has actually purchased in the meantime (converted)
      // We search for an order with this email created AFTER the lead creation
      const { data: orders } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("customer_email", lead.email)
        .gt("created_at", lead.created_at)
        .limit(1);

      if (orders && orders.length > 0) {
        // They bought it! Mark as recovered/ignored
        await supabaseAdmin.from("leads").update({ status: 'recovered_silently' }).eq("id", lead.id);
        results.push({ email: lead.email, status: "Already Purchased" });
        continue;
      }

      // 4. Send Email (Mocked or using Resend/SendGrid)
      // const res = await fetch("https://api.resend.com/emails", { ... })
      
      console.log(`Sending Recovery Email to: ${lead.email} for plan: ${lead.plan_name}`);
      
      // 5. Update Lead to mark as sent
      await supabaseAdmin.from("leads").update({ 
        recovery_sent_at: new Date().toISOString(),
        status: 'recovery_email_sent' 
      }).eq("id", lead.id);

      results.push({ email: lead.email, status: "Email Sent" });
    }

    return new Response(JSON.stringify({ success: true, processed: results.length, details: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
