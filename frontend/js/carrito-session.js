import { crearCarrito, getCarrito } from './api.js';

const CLAVE_STORAGE = 'p5_idCarrito';

/**
 * Genera un id de carrito "aleatorio"
 */
function generarIdCarrito() {
    return Date.now() % 1_000_000;
}

/**
 * Devuelve el idCarrito asociado a este navegador.
 */
export async function obtenerIdCarrito() {
    const guardado = localStorage.getItem(CLAVE_STORAGE);

    if (guardado !== null) {
        const id = parseInt(guardado, 10);

        /** Comprobar si el carrito sigue existiendo */
        try {
            await getCarrito(id);
            return id;
        } catch (err) {
            console.warn(`[P5] El carrito ${id} ya no existe en el backend, creando uno nuevo.`);
            localStorage.removeItem(CLAVE_STORAGE);
        }
    }

    /**  No había carrito, o el guardado ya no es válido: creamos uno nuevo. */
    const idNuevo = generarIdCarrito();
    await crearCarrito(idNuevo, 1, 'invitado@chuloschulos.com');
    localStorage.setItem(CLAVE_STORAGE, String(idNuevo));
    return idNuevo;
}

/**
 * Borrar carrito
 */
export function olvidarCarrito() {
    localStorage.removeItem(CLAVE_STORAGE);
}