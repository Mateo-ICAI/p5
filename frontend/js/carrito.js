import { getCarrito } from './api.js';
import { obtenerIdCarrito } from './carrito-session.js';

// Diccionario de ids a articulo
const NOMBRES_ARTICULOS = {
    1: 'León',
    2: 'Piraña',
    3: 'Mosquito'
};

const contenedor = document.getElementById('carrito-contenedor');

// cargar desde la api y pintar
async function cargarYPintarCarrito() {
    try {
        const idCarrito = await obtenerIdCarrito();
        const carrito = await getCarrito(idCarrito);
        pintarCarrito(carrito);
    } catch (err) {
        console.error('[P5] Error cargando el carrito:', err);
        contenedor.innerHTML = `
            <p style="color: red;">
                ❌ No se pudo cargar el carrito. ¿Está el servidor encendido?
            </p>
        `;
    }
}

// generar HTML
function pintarCarrito(carrito) {
    if (!carrito.lineas || carrito.lineas.length === 0) {
        contenedor.innerHTML = `
            <p>Tu carrito está vacío. Visita el <a href="catalogo.html">catálogo</a> para añadir animales.</p>
        `;
        return;
    }

    // filas de la tabla
    const filasHtml = carrito.lineas.map(linea => {
        const nombre = NOMBRES_ARTICULOS[linea.idArticulo] ?? `Artículo #${linea.idArticulo}`;
        return `
            <tr>
                <td>${nombre}</td>
                <td>${linea.unidades}</td>
                <td>${linea.costeLinea.toFixed(2)} €</td>
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
                </tr>
            </thead>
            <tbody>
                ${filasHtml}
                <tr>
                    <td colspan="2"><strong>Total a pagar:</strong></td>
                    <td><strong>${carrito.totalPrecio.toFixed(2)} €</strong></td>
                </tr>
            </tbody>
        </table>
        <br>
        <button id="btn-pagar">Pagar</button>
    `;
}

// Arrancamos al cargar la página.
cargarYPintarCarrito();

console.log('[P5] carrito.js cargado');