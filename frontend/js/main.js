import * as api from './api.js';
import * as session from './carrito-session.js';

window.api = api;
window.session = session;

console.log("[P5] main.js cargado. Prueba: await session.obtenerIdCarrito()");