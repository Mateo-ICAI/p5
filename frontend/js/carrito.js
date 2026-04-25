import { getCarrito, deleteLinea, borrarCarrito } from './api.js';
import { obtenerIdCarrito, olvidarCarrito } from './carrito-session.js';
import { mostrarToast } from './ui.js';

// dicc ids a animales
const NOMBRES_ARTICULOS = {
    1: 'León',
    2: 'Piraña',
    3: 'Mosquito'
};

const contenedor = document.getElementById('carrito-contenedor');
let idCarritoActual = null;

async function cargarYPintarCarrito() {
    try {
        idCarritoActual = await obtenerIdCarrito();
        const carrito = await getCarrito(idCarritoActual);
        pintarCarrito(carrito);
    } catch (err) {
        console.error('[P5] Error cargando el carrito:', err);
        contenedor.innerHTML = `
            <p style="color: #a04000;">
                No se puede cargar al carrito.
            </p>
        `;
    }
}

function pintarCarrito(carrito) {
    if (!carrito.lineas || carrito.lineas.length === 0) {
        contenedor.innerHTML = `
            <p>Tu carrito está vacío. Visita el <a href="catalogo.html">catálogo</a> para añadir animales.</p>
        `;
        return;
    }

    const filasHtml = carrito.lineas.map(linea => {
        const nombre = NOMBRES_ARTICULOS[linea.idArticulo] ?? `Artículo #${linea.idArticulo}`;
        return `
            <tr>
                <td>${nombre}</td>
                <td>${linea.unidades}</td>
                <td>${linea.costeLinea.toFixed(2)} €</td>
                <td>
                    <button class="btn-eliminar" data-id-linea="${linea.id}">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    contenedor.innerHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${filasHtml}
                <tr>
                    <td colspan="2"><strong>Total a pagar:</strong></td>
                    <td colspan="2"><strong>${carrito.totalPrecio.toFixed(2)} €</strong></td>
                </tr>
            </tbody>
        </table>
        <br>
        <button id="btn-pagar">Pagar</button>
    `;
}

async function eliminarLineaCarrito(idLinea) {
    try {
        const carritoActualizado = await deleteLinea(idCarritoActual, idLinea);
        pintarCarrito(carritoActualizado);
        mostrarToast('Línea eliminada', 'info');
        window.dispatchEvent(new CustomEvent('carrito:cambiado'));
    } catch (err) {
        console.error('[P5] Error eliminando línea:', err);
        mostrarToast('No se pudo eliminar la línea', 'error');
    }
}

async function pagarCarrito() {
    if (!confirm('¿Confirmas la compra? Esto vaciará tu carrito.')) {
        return;
    }

    try {
        await borrarCarrito(idCarritoActual);
        olvidarCarrito();
        mostrarToast('✅ Compra realizada. ¡Gracias!', 'exito', 4000);
        await cargarYPintarCarrito();   // ← primero recargamos (esto crea el carrito nuevo)
        window.dispatchEvent(new CustomEvent('carrito:cambiado'));   // ← y después notificamos
    } catch (err) {
        console.error('[P5] Error al pagar:', err);
        mostrarToast('No se pudo procesar la compra', 'error');
    }
}

contenedor.addEventListener('click', (evento) => {
    const objetivo = evento.target;

    if (objetivo.matches('.btn-eliminar')) {
        const idLinea = parseInt(objetivo.dataset.idLinea, 10);
        eliminarLineaCarrito(idLinea);
        return;
    }

    if (objetivo.id === 'btn-pagar') {
        pagarCarrito();
        return;
    }
});

cargarYPintarCarrito();

console.log('[P5] carrito.js cargado');