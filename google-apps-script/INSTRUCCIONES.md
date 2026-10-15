# Cómo activar el sistema de inscripciones (15 minutos, una sola vez)

Este sistema guarda las inscripciones, clases de prueba y testimonios del sitio en una planilla de Google **tuya**. Te llega un correo cada vez que alguien se inscribe, y la persona recibe una confirmación desde tu correo.

Hazlo con tu cuenta institucional (**contacto@institutolael.cl**), desde el computador.

## 1. Crear la planilla
1. Entra a [sheets.google.com](https://sheets.google.com) con tu cuenta institucional.
2. Crea una planilla en blanco y ponle de nombre **Lael · Inscripciones**.

## 2. Pegar el código
1. En la planilla, ve al menú **Extensiones → Apps Script**. Se abre una pestaña nueva.
2. Borra todo lo que aparece en el archivo `Código.gs`.
3. Copia **todo** el contenido del archivo `Code.gs` (está en esta misma carpeta) y pégalo ahí.
4. Arriba, haz clic en el ícono del disquete (**Guardar**).

## 3. Crear las hojas (una sola vez)
1. Arriba, en la lista de funciones, elige **instalar** y haz clic en **Ejecutar**.
2. Google te pedirá permisos: **Revisar permisos → elige tu cuenta → Avanzado → Ir a (sin verificar) → Permitir**.
   - Es normal que diga "no verificada": el código es tuyo y solo lo usas tú.
   - Los permisos son para escribir en la planilla y enviar correos desde tu cuenta.
3. Vuelve a la planilla: ahora tiene las hojas **Inscripciones**, **Testimonios** y **Cursos**.

## 4. Publicarlo como aplicación web
1. En Apps Script, arriba a la derecha: **Implementar → Nueva implementación**.
2. Haz clic en el engranaje ⚙️ y elige **Aplicación web**.
3. Completa así:
   - Descripción: `Sitio Lael`
   - Ejecutar como: **Yo (contacto@institutolael.cl)**
   - Quién tiene acceso: **Cualquier usuario**
4. Haz clic en **Implementar** y copia la **URL de la aplicación web** (termina en `/exec`).
5. **Mándame esa URL** y la conecto al sitio.

> "Cualquier usuario" significa que el sitio puede **enviar** inscripciones. Nadie puede **leer** tu planilla: el código solo entrega los cupos disponibles y los testimonios que tú apruebes.

## Cómo se usa en el día a día
- **Inscripciones:** cada fila es una persona. Cambia la columna **Estado** (Nuevo, Contactado, Confirmado, Pagó, No siguió) a medida que avanzas.
- **Cupos:** en la hoja **Cursos** cambias el **Cupo máximo** de cada curso. El sitio muestra solo "quedan X cupos". Las inscripciones marcadas "No siguió" liberan su cupo. Si no quieres mostrar un curso, pon **NO** en "Mostrar en el sitio".
- **Testimonios:** llegan con "Publicar" en **NO**. Si te gusta uno, cámbialo a **SI** y aparece en el sitio. Si la persona pidió solo iniciales, el sitio las muestra así.
- **Cursos nuevos:** agrega una fila en **Cursos** con un código simple (por ejemplo `verano-arranque`) y avísame para conectarlo en el sitio.

## Si cambias el código más adelante
Después de editar, ve a **Implementar → Administrar implementaciones → ✏️ Editar → Versión: Nueva versión → Implementar**. La URL sigue siendo la misma.

## Seguridad
- No compartas la planilla con nadie que no deba verla (botón **Compartir**).
- La URL `/exec` no es secreta: solo sirve para enviar formularios, no para leer datos.
- El código bloquea robots (campo trampa y límite de envíos) y evita que alguien meta fórmulas en la planilla.

---

# Actualización de septiembre de 2026 (5 minutos)

Esta versión agrega correos con el diseño de Lael, becas, lista de espera, encuesta de mitad de semestre, recordatorio de clase de prueba y la hoja **Resumen** con gráficos.

1. En la planilla: **Extensiones → Apps Script**.
2. Borra todo el código, pega el `Code.gs` nuevo y guarda (disquete).
3. En la lista de funciones elige **instalar** y aprieta **Ejecutar**. Google va a pedir un permiso nuevo (para la tarea diaria): acéptalo igual que la primera vez.
4. **Implementar → Administrar implementaciones → ✏️ Editar → Versión: Nueva versión → Implementar.** La URL no cambia.
5. Abre la hoja nueva **Configuración** y, en "Datos de pago", reemplaza `ESCRIBE AQUÍ EL NÚMERO` por el número de tu cuenta. Ese texto le llega a quien se inscribe. (No va en el código porque el código es público en GitHub.)
6. Para ver cómo quedaron los correos: elige **probarCorreo** y aprieta **Ejecutar**. Te llegan dos ejemplos.

## Lo nuevo, en simple
- **Resumen:** la primera hoja. Números y gráficos que se actualizan solos. No escribas en ella.
- **Lista de espera:** si un curso se llena, el formulario igual acepta a la persona y la anota como `lista-espera`. Cuando se libera un cupo, a las 9 de la mañana te llega un correo con quiénes están esperando.
- **Becas:** las postulaciones llegan a **Inscripciones** con tipo `beca`.
- **Clase de prueba:** cuando acuerdes la fecha con alguien, escríbela en la columna **Fecha clase de prueba**. El día anterior le llega un recordatorio solo.
- **Encuesta:** en las fechas de la hoja **Configuración** (15 de mayo y 1 de octubre) se manda sola a quienes están en estado **Confirmado** o **Pagó**. Las respuestas quedan en la hoja **Encuestas** y te avisamos si alguien pone nota 4 o menos.
- **Colores:** la columna Estado se pinta sola (amarillo = Nuevo, verde = Pagó...).

---

# Reseñas de Google en el sitio (octubre de 2026)

La planilla baja una vez al día las reseñas de tu Perfil de Empresa a la hoja **Reseñas Google**, y el sitio las muestra solas en la portada y en /casos-reales. Mientras no esté conectado, el sitio simplemente no muestra ese bloque.

Google exige que tu planilla tenga **acceso aprobado a la API de Perfil de Empresa**. Es gratis, pero Google lo revisa a mano (puede tardar días o semanas). Hazlo todo con **contacto@institutolael.cl**, que debe ser dueña o administradora del perfil.

## Parte 1: crear el proyecto de Google Cloud (10 minutos, una vez)
1. Entra a [console.cloud.google.com](https://console.cloud.google.com) y crea un proyecto llamado **Lael Sitio**.
2. Menú **APIs y servicios → Pantalla de consentimiento de OAuth**: elige **Interno** (si no aparece, elige **Externo** y agrega contacto@institutolael.cl como usuario de prueba). Nombre de la app: `Lael Sitio`. Guarda.
3. Menú **APIs y servicios → Biblioteca**: busca y **habilita** estas dos:
   - **My Business Account Management API**
   - **My Business Business Information API**
4. En la página de inicio del proyecto, copia el **Número del proyecto** (son solo dígitos).

## Parte 2: pedir el acceso (5 minutos)
1. Abre el formulario de acceso a la API de Perfil de Empresa: [support.google.com/business/contact/api_default](https://support.google.com/business/contact/api_default).
2. Elige la solicitud de acceso a la API, pega el **número del proyecto** y explica: *"Mostrar las reseñas de nuestro propio perfil en nuestro sitio web institutolael.cl"*.
3. Google responde por correo. Cuando te aprueben, en la **Biblioteca** de la Parte 1 habilita también **Google My Business API**.

## Parte 3: conectar la planilla (cuando te aprueben, 5 minutos)
1. En la planilla: **Extensiones → Apps Script**.
2. Rueda ⚙️ **Configuración del proyecto**:
   - Marca **Mostrar el archivo de manifiesto "appsscript.json" en el editor**.
   - En **Proyecto de Google Cloud Platform (GCP)**, aprieta **Cambiar proyecto**, pega el número del proyecto y confirma.
3. Vuelve al **Editor**: pega el `Code.gs` nuevo (borrando el anterior) y reemplaza el contenido de `appsscript.json` por el de esta carpeta. Guarda.
4. Elige la función **conectarGoogle** y aprieta **Ejecutar**. Acepta los permisos (ahora incluye "ver y administrar tu Perfil de Empresa").
5. Revisa la hoja **Reseñas Google**: deberían estar tus reseñas.
6. **Implementar → Administrar implementaciones → ✏️ Editar → Versión: Nueva versión → Implementar.** La URL no cambia.

Desde ahí, se actualiza solo todos los días a las 9 de la mañana. Si quieres que una reseña nueva aparezca altiro, ejecuta **sincronizarResenas**.

## En el día a día
- Todas las reseñas llegan con **SI** en "Mostrar en el sitio", también las malas: mostrarlas es lo honesto y Google lo valora. Cambia a **NO** solo si es spam o tiene datos personales de alguien.
- El sitio muestra las 12 más recientes que tengan texto (las que son solo estrellas igual cuentan en el promedio). El nombre aparece como "Nombre + inicial".
- Si respondes una reseña en Google, la respuesta también aparece en el sitio.
