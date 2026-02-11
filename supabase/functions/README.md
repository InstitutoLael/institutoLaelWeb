# Abandoned Cart Recovery - Deployment Guide

This directory contains the logic for the `send-abandoned-cart-email` Edge Function.

## Prerequisites

1.  **Supabase CLI**: Ensure you have the Supabase CLI installed and logged in.
2.  **Database Updates**: You need to add a column to your `leads` table to track sent emails.

## Step 1: Update Database Schema

Run this SQL in your Supabase SQL Editor to add the tracking column:

```sql
ALTER TABLE leads
ADD COLUMN recovery_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;
```

## Step 2: Deploy the Function

Run the following command in your terminal (from the project root):

```bash
supabase functions deploy send-abandoned-cart-email --no-verify-jwt
```

## Step 3: Set Environment Variables

Go to your Supabase Dashboard > Edge Functions > `send-abandoned-cart-email` > Secrets and ensure standard secrets are set. If you use an email provider (Resend, SendGrid), add its API Key:

```bash
supabase secrets set RESEND_API_KEY=re_123456
```

## Step 4: Automate with Cron

To run this check every 30 minutes, you can use `pg_cron` (if enabled) or a scheduled HTTP request (e.g., GitHub Actions or EasyCron).

**Using pg_cron (Database Cron):**

```sql
select
  cron.schedule(
    'abandoned-cart-check',
    '*/30 * * * *', -- Every 30 minutes
    $$
    select
      net.http_post(
          url:='https://<PROJECT_REF>.supabase.co/functions/v1/send-abandoned-cart-email',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer <SERVICE_ROLE_KEY>"}'::jsonb
      ) as request_id;
    $$
  );
```

_Note: Replace `<PROJECT_REF>` and `<SERVICE_ROLE_KEY>` with your actual project details._
