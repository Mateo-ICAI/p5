const API_BASE = 'http://localhost:8080/api/carrito';

/**
 * Helper interno: ejecuta un fetch y comprueba que la respuesta sea OK.
*/

async function peticion(url, opciones = {}) {
    const respuesta = await fetch(url, opciones);

    if (!respuesta.ok) {
        // Intentamos leer el cuerpo del error por si trae info útil
        const textoError = await respuesta.text();
        throw new Error(`HTTP ${respuesta.status}: ${textoError || respuesta.statusText}`);
    }

    // El DELETE de carrito no devuelve cuerpo, hay que controlarlo
    const texto = await respuesta.text();
    return texto ? JSON.parse(texto) : null;
}

/**
 * POST /api/carrito
 */
export async function crearCarrito(idCarrito, idUsuario, correoUsuario) {
    return peticion(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCarrito, idUsuario, correoUsuario })
    });
}

/**
 * GET /api/carrito/{idCarrito}
 */
export async function getCarrito(idCarrito) {
    return peticion(`${API_BASE}/${idCarrito}`);
}

/** POST /api/carrito/{idCarrito}/lineas */
export async function addLinea(idCarrito, idArticulo, precioUnitario, unidades) {
    return peticion(`${API_BASE}/${idCarrito}/lineas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idArticulo, precioUnitario, unidades })
    });
}

/**
DELETE /api/carrito/{idCarrito}/lineas/{idLinea}
 */
export async function deleteLinea(idCarrito, idLinea) {
    return peticion(`${API_BASE}/${idCarrito}/lineas/${idLinea}`, {
        method: 'DELETE'
    });
}

/**
 * DELETE /api/carrito/{idCarrito}
 */
export async function borrarCarrito(idCarrito) {
    return peticion(`${API_BASE}/${idCarrito}`, {
        method: 'DELETE'
    });
}