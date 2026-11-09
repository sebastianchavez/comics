# Comic Store — Template ecommerce

Template de tienda de cómics y coleccionables con 16 páginas HTML existentes.

## Alcance

Incluye catálogo, filtros, carrito, autenticación, pedidos y reseñas de demostración. Los datos y la sesión se guardan en localStorage; no hay un servicio de autenticación ni de pagos conectado.

Los precios, contactos y datos de cliente son ejemplos para personalizar. La presencia de un formulario o botón no garantiza una integración con servicios externos.

## Tecnologías y estructura

- HTML para las páginas.
- Tailwind CSS mediante CDN; no requiere compilar estilos para la vista previa.
- CSS local: `css/styles.css`.
- JavaScript local: `js/data.js`, `js/store.js`, `js/helpers.js`, `js/components.js y js/pages/`.
- localStorage para el estado de demostración en el navegador.
- Fuentes, iconos o imágenes externas según cada pantalla; se necesita conexión para cargar esos recursos.

## Vista previa local

Desde esta carpeta, inicia un servidor estático. Por ejemplo, con Node.js y npm disponibles:

```sh
npx --yes http-server . -p 8000
```

Abre [la pantalla inicial](http://localhost:8000/index.html) en el navegador. No hay un package.json ni un paso de build propio del template.

## Páginas incluidas

Las rutas son relativas a esta carpeta.

| Archivo | Título de la pantalla |
| --- | --- |
| `carrito.html` | Carrito · Comic Store |
| `checkout.html` | Checkout · Comic Store |
| `confirmacion.html` | Pedido confirmado · Comic Store |
| `contacto.html` | Contacto · Comic Store |
| `index.html` | Comic Store · Inicio |
| `login.html` | Iniciar sesión · Comic Store |
| `nosotros.html` | Sobre nosotros · Comic Store |
| `pedido-detalle.html` | Detalle del pedido · Comic Store |
| `perfil.html` | Mi perfil · Comic Store |
| `politicas-privacidad.html` | Políticas de privacidad · Comic Store |
| `producto-detalle.html` | Producto · Comic Store |
| `productos.html` | Catálogo · Comic Store |
| `recuperar-password.html` | Recuperar contraseña · Comic Store |
| `registro.html` | Registro · Comic Store |
| `resena.html` | Escribir reseña · Comic Store |
| `terminos-condiciones.html` | Términos y condiciones · Comic Store |

## Personalización

- Edita los textos, contactos e imágenes en los HTML y los datos de catálogo en `js/data.js`.
- Ajusta los estilos en `css/styles.css` y la configuración de Tailwind de las páginas cuando corresponda.
- Los importes del template están presentados en CLP. Mantén el formato sin decimales y los contactos de ejemplo para Chile al personalizarlo.
- Comprueba los cambios en móvil, tablet y escritorio.
- Para reiniciar la demostración, elimina únicamente las claves de localStorage de este template desde las herramientas de desarrollo del navegador.

## Integración

Antes de usar el template en una tienda operativa, conecta los servicios que correspondan: catálogo, inventario, autenticación, pedidos, pagos y contacto. Revisa las rutas y sustituye el contenido de muestra y los textos legales por los del negocio.
