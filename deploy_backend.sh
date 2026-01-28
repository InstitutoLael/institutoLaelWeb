#!/bin/bash

# Configuration
PROJECT_REF="oefelsnvxzlupztoxuii"
SMTP_USER="pagos@institutolael.cl"
SMTP_PASS="ezej xjal spov cohn" # Google App Password provided
SUPABASE_URL="https://oefelsnvxzlupztoxuii.supabase.co"

echo "🚀 Iniciando despliegue de Backend Instituto Lael..."
echo "---------------------------------------------------"

# 1. Login check
echo "1. Verificando sesión..."
if ! npx supabase projects list > /dev/null 2>&1; then
    echo "⚠️  No has iniciado sesión."
    echo "   Por favor, introduce tu Access Token de Supabase cuando se te pida (o presiona Enter para abrir el navegador)."
    npx supabase login
fi

# 2. Link Project
echo "2. Vinculando proyecto ($PROJECT_REF)..."
# We try to link. If it asks for password, user will interact.
npx supabase link --project-ref $PROJECT_REF

# 3. Set Secrets
echo "3. Configurando Secretos (SMTP)..."
# We need Service Role Key. Since we don't have it, we ask the user or try to fetch if linked?
# Actually, for secrets set, we don't need the key if we are logged in.
# BUT we need to set the SUPABASE_SERVICE_ROLE_KEY env var for the function logic?
# Wait, Supabase injects it automatically. We only need to set SMTP.

npx supabase secrets set \
SMTP_HOST=smtp.gmail.com \
SMTP_PORT=465 \
SMTP_USER=$SMTP_USER \
SMTP_PASS="$SMTP_PASS" \
SMTP_FROM="Instituto Lael <$SMTP_USER>"

# 4. Deploy Function
echo "4. Desplegando funcion payment-webhook..."
npx supabase functions deploy payment-webhook --no-verify-jwt

echo "---------------------------------------------------"
echo "✅ ¡Despliegue completado!"
echo "📡 Tu Webhook URL es: $SUPABASE_URL/functions/v1/payment-webhook"
