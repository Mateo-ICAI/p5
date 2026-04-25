// toast
export function mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
    let contenedor = document.getElementById('toast-contenedor');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'toast-contenedor';
        document.body.appendChild(contenedor);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    contenedor.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast-visible'));

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, duracion);
}