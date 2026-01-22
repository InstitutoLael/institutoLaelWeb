# 🏗️ Arquitectura de Ingeniería: Instituto Lael 2.0

Este documento detalla la lógica de flujo y seguridad de la plataforma para asegurar escalabilidad y robustez.

---

## 🗺️ 1. User Journey (Conversion Flow)
Este diagrama describe el camino que recorre un usuario desde el descubrimiento hasta el cierre de la venta.

```mermaid
graph TD
    A[Inicio: Home Dashboard] -->|Explora| B(Página de Programa: PAES/Idiomas)
    B -->|Click Inscribirse| C{Tiene Cupos?}
    C -->|Sí| D[Añadir a Mochila / Carrito]
    C -->|No| E[Lista de Espera / Contacto]
    D -->|Procede| F[Formulario de Inscripción]
    F -->|Validación RUT/Mail| G[Guardar Datos: Google Sheets]
    G -->|Paso Final| H[Modal Pago: Transferencia]
    H -->|Click WhatsApp| I((WhatsApp: Activación de Matrícula))
```

---

## 🔒 2. Aula Security Flow
Lógica de protección del contenido exclusivo para alumnos premium.

```mermaid
graph LR
    A[Entrada Aula Virtual] --> B{Sesión Activa?}
    B -->|Sí| E[Lobby de Estudiantes]
    B -->|No| C[Pantalla de Bloqueo]
    C -->|Ingresa Código| D{Código Válido?}
    D -->|Sí| E[Lobby de Estudiantes]
    D -->|No| F[Error de Acceso / Bloqueo]
    E --> G[Videoteca / Meet / Drive]
```

---

## ⚙️ 3. Stack Tecnológico
*   **Frontend:** React.js + Tailwind CSS + Framer Motion.
*   **Analytics:** Google Analytics 4 (Event Tracking).
*   **Persistence:** LocalStorage (Carrito) & SessionStorage (Aula).
*   **Backend Prep:** Webhook Hook (POST) para automatización de registros.
