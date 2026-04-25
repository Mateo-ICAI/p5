import { getCarrito } from './api.js';
import { obtenerIdCarrito } from './carrito-session.js';

const badge = document.getElementById('badge-carrito');

// para juntar las cuentas
async function actualizarBadge() {
    if (!badge) return;

    try {
        const idCarrito = await obtenerIdCarrito();
        const carrito = await getCarrito(idCarrito);
        const numLineas = carrito.lineas?.length ?? 0;

        if (numLineas > 0) {
            badge.textContent = String(numLineas);
            badge.classList.remove('badge-carrito-oculto');
        } else {
            badge.classList.add('badge-carrito-oculto');
        }
    } catch (err) {

        console.warn('[P5] No se pudo actualizar el badge del carrito:', err);
        badge.classList.add('badge-carrito-oculto');
    }
}

// Actualizar con cambios en carrito
window.addEventListener('carrito:cambiado', actualizarBadge);
actualizarBadge();

console.log('[P5] main.js cargado');