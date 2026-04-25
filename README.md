# Práctica 5 — Consumo de API REST

No llegué a ver la entrega de la P3, por lo que no la realicé. Para esta P5 he utilizado la práctica de **Ignacio Gutiérrez** como base del backend (gracias Guti).

## Objetivo

Conectar la web estática de la P4 con el API REST de la P2 para dotarla de funcionalidad real: catálogo, carrito persistente, añadir/eliminar líneas y "pagar".

### Backend (P2)
- Añadida una clase `WebConfig.java` con configuración **CORS** para permitir peticiones desde `localhost:5500`. Sin esto, el navegador bloquearía las llamadas.

### Frontend (P5)
- **`api.js`** — capa de red. Envuelve los 5 endpoints del API en funciones `async` (`crearCarrito`, `getCarrito`, `addLinea`, `deleteLinea`, `borrarCarrito`).
- **`carrito-session.js`** — gestiona la "sesión" del usuario en `localStorage`. Como no hay login, asocia cada navegador con un id de carrito único. Recupera automáticamente si el backend reinicia (la BD H2 es en memoria).
- **`catalogo.js`** — convierte los botones "Añadir al carrito" en botones que realmente añaden líneas al backend. Usa atributos `data-*` para asociar cada botón con su artículo.
- **`carrito.js`** — pinta dinámicamente las líneas del carrito desde el backend, permite eliminar líneas individuales y "pagar" (vaciar). Usa **event delegation** para que los botones funcionen aunque la tabla se repinte.
- **`ui.js`** — toasts (notificaciones flotantes) en lugar de los `alert` nativos.
- **`main.js`** — badge en el menú con el número de productos del carrito, visible en todas las páginas. Se actualiza con eventos personalizados (`carrito:cambiado`).

### Cosas a mejorar
Se podría hacer para que cada fila que aparece en carrito llevase un contador qeu incrementase cuando se añaden dos del mismo artículo. Ahora mismo lo que hace es poner una nueva fila





