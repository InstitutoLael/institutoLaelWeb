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
