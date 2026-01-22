# 📘 Manual Operativo: Gestión de Plataforma Instituto Lael

Este documento está diseñado para que el CEO o el equipo administrativo pueda realizar cambios rápidos en la plataforma sin necesidad de programar.

---

## 🔐 1. Cambiar la Clave del Aula (Acceso Mensual)
Para cambiar el código que se pide a los alumnos al entrar al Aula Virtual:

1.  Ve a la carpeta: `src/data/configAula.js`
2.  Busca la línea: `export const ACCESS_CODE = "LAEL2026";`
3.  Cambia `"LAEL2026"` por el nuevo código (ej: `"MARZO2026"`).
4.  **Importante:** Mantén siempre las comillas y el punto y coma al final.

---

## 📖 2. Agregar o Editar Clases Grabadas (Videoteca)
Para agregar una nueva clase que los alumnos puedan ver bajo demanda:

1.  Ve al archivo: `src/data/curriculum.js`
2.  Verás una lista de clases (`RECORDED_CLASSES`).
3.  Para agregar una nueva, copia un bloque existente y pégalo al final de la lista, asegurándote de cambiar:
    *   `id`: Un número que no se repita.
    *   `title`: El nombre de la clase.
    *   `subject`: El área (Matemática, Lenguaje, etc).
    *   `url`: El link de YouTube o Vimeo de la clase.
    *   `date`: La fecha de la clase.

---

## 🎥 3. Cambiar el Link de la Clase en Vivo (Meet)
Si necesitas cambiar el enlace de Google Meet para las clases diarias:

1.  Ve al archivo: `src/data/configAula.js`
2.  Busca la línea: `export const LIVE_MEET_LINK = "https://meet.google.com/..."`
3.  Reemplaza el link por el nuevo.
4.  También puedes cambiar `LIVE_STATUS` a `false` si no hay clases programadas para ocultar el estado "En Vivo".

---

## 💰 4. Cambiar Precios y Datos Bancarios
Los datos de pago se encuentran en el componente del Carrito.

*   **Datos Bancarios:** Para cambiar la cuenta de transferencia, ve a `src/components/CartDrawer.jsx` y busca la sección donde se definen los datos bancarios dentro del Modal de Pago.
*   **Precios:** Actualmente los precios están definidos en cada página de curso (PAES, Idiomas, etc.) al momento de agregar el producto al carrito. Busca el botón "Inscribirse" en la página correspondiente para ver el valor numérico.

---

## 📈 5. Medición de Resultados (Analytics)
La web ya cuenta con **Event Tracking Inteligente**. Puedes ver estos eventos en tu panel de Google Analytics (G-MXGB4RTHNY):
*   `click_whatsapp_contact`: Veces que alguien inició contacto por WhatsApp.
*   `begin_checkout_transfer`: Veces que alguien abrió los detalles bancarios para pagar.
*   `login_aula_success`: Cantidad de ingresos exitosos de alumnos al aula virtual.

---

**Nota:** Cualquier cambio requiere realizar un "Build" y subir los archivos al servidor para que se reflejen en internet.
