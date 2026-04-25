PRÁCTICA 2 - API REST CARRITO
API REST desarrollada con Spring Boot que permite realizar operaciones CRUD sobre un recurso Carrito.

Este recurso va a implementar una serie de atributos:
- idCarrito: número identificador único de cada carrito.
- idArticulo: número identificador único de cada artículo. (cada carrito solo podrá contar con un único producto)
- descripción: descripción del artículo.
- unidades: cantidad del artículo en el carrito. 
- precioFinal: importe total del carrito. 

| Método | Ruta        | Cuerpo | Descripción                | Respuesta |
| ------ | -------------| ------ | -------------------------- |-----------|
| GET    | /api/carrito  | No     | Obtener todos los carritos | 200       |
| POST   | /api/carrito  | Sí     | Crear un carrito           | 201       |
| GET    | /api/carrito/{idCarrito} | No     | Obtener carrito por id     | 200       |
| PUT    | /api/carrito/{idCarrito} | Sí     | Modificar un carrito       | 200       |
| DELETE | /api/carrito/{idCarrito} | No     | Eliminar un carrito        | 200       |
