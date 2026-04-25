import { addLinea } from './api.js';
import { obtenerIdCarrito } from './carrito-session.js';
import { mostrarToast } from './ui.js';

// manejo click
async function manejarClickAnadir(evento) {
    const boton = evento.currentTarget;

    const idArticulo = parseInt(boton.dataset.idArticulo, 10);
    const precio = parseFloat(boton.dataset.precio);
    const nombre = boton.dataset.nombre;

    boton.disabled = true;
    const textoOriginal = boton.textContent;
    boton.textContent = 'Añadiendo...';

    try {
        const idCarrito = await obtenerIdCarrito();
        await addLinea(idCarrito, idArticulo, precio, 1);
        mostrarToast(`✅ ${nombre} añadido al carrito`, 'exito');

        // Notificamos al resto de la página (al badge del menú) que algo cambió.
        window.dispatchEvent(new CustomEvent('carrito:cambiado'));
    } catch (err) {
        console.error('[P5] Error al añadir al carrito:', err);
        mostrarToast(`No se pudo añadir ${nombre}`, 'error');
    } finally {
        boton.disabled = false;
        boton.textContent = textoOriginal;
    }
}

document.querySelectorAll('.btn-add').forEach(boton => {
    boton.addEventListener('click', manejarClickAnadir);
});

console.log('[P5] catalogo.js cargado');