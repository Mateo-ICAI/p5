import { addLinea } from './api.js';
import { obtenerIdCarrito } from './carrito-session.js';

// manejo click
async function manejarClickAnadir(evento) {
    const boton = evento.currentTarget;

    // Lectura de los data convirtiendo a números
    const idArticulo = parseInt(boton.dataset.idArticulo, 10);
    const precio = parseFloat(boton.dataset.precio);
    const nombre = boton.dataset.nombre;

    // edshabilitado para el doble click (no añada 2 veces)
    boton.disabled = true;
    const textoOriginal = boton.textContent;
    boton.textContent = 'Añadiendo...';

    try {
        const idCarrito = await obtenerIdCarrito();
        await addLinea(idCarrito, idArticulo, precio, 1);
        alert(`${nombre} añadido al carrito`);
    } catch (err) {
        console.error('[P5] Error al añadir al carrito:', err);
        alert(`No se pudo añadir ${nombre} al carrito.\n${err.message}`);
    } finally {
        boton.disabled = false;
        boton.textContent = textoOriginal;
    }
}

// listener a cada botón al cargar la página.
document.querySelectorAll('.btn-add').forEach(boton => {
    boton.addEventListener('click', manejarClickAnadir);
});

console.log('[P5] catalogo.js cargado, botones de catalogo listos');