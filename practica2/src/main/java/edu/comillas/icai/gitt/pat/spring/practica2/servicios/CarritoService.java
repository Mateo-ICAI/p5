package edu.comillas.icai.gitt.pat.spring.practica2.servicios;

import edu.comillas.icai.gitt.pat.spring.practica2.entidades.Carrito;
import edu.comillas.icai.gitt.pat.spring.practica2.entidades.LineaCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.modelo.CarritoResponse;
import edu.comillas.icai.gitt.pat.spring.practica2.modelo.LineaCarritoResponse;
import edu.comillas.icai.gitt.pat.spring.practica2.repositorios.CarritoRepository;
import edu.comillas.icai.gitt.pat.spring.practica2.repositorios.LineaCarritoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final LineaCarritoRepository lineaRepository;

    public CarritoService(CarritoRepository carritoRepository, LineaCarritoRepository lineaRepository) {
        this.carritoRepository = carritoRepository;
        this.lineaRepository = lineaRepository;
    }

    @Transactional(readOnly = true)
    public List<CarritoResponse> getCarritos() {
        return carritoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CarritoResponse getCarrito(int idCarrito) {
        Carrito carrito = carritoRepository.findById(idCarrito)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no existe"));
        return toResponse(carrito);
    }

    @Transactional
    public CarritoResponse crearCarrito(Carrito carrito) {
        if (carrito.getIdCarrito() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idCarrito es obligatorio");
        if (carrito.getIdUsuario() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idUsuario es obligatorio");
        if (carrito.getCorreoUsuario() == null || carrito.getCorreoUsuario().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "correoUsuario es obligatorio");

        carrito.setTotalPrecio(0.0);
        Carrito guardado = carritoRepository.save(carrito);
        return toResponse(guardado);
    }

    @Transactional
    public void borrarCarrito(int idCarrito) {
        if (!carritoRepository.existsById(idCarrito))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no existe");
        carritoRepository.deleteById(idCarrito);
    }

    @Transactional
    public CarritoResponse modificarCarrito(int idCarrito, Carrito datos) {
        Carrito carrito = carritoRepository.findById(idCarrito)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no existe"));

        if (datos.getIdUsuario() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idUsuario es obligatorio");
        if (datos.getCorreoUsuario() == null || datos.getCorreoUsuario().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "correoUsuario es obligatorio");

        carrito.setIdUsuario(datos.getIdUsuario());
        carrito.setCorreoUsuario(datos.getCorreoUsuario());

        recalcularTotal(carrito);
        return toResponse(carritoRepository.save(carrito));
    }

    @Transactional
    public CarritoResponse addLinea(int idCarrito, LineaCarrito linea) {
        Carrito carrito = carritoRepository.findById(idCarrito)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no existe"));

        if (linea.getIdArticulo() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idArticulo es obligatorio");
        if (linea.getPrecioUnitario() == null || linea.getPrecioUnitario() < 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "precioUnitario no puede ser negativo");
        if (linea.getUnidades() == null || linea.getUnidades() <= 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "unidades debe ser > 0");

        linea.setCarrito(carrito);
        linea.setCosteLinea(linea.getPrecioUnitario() * linea.getUnidades());

        // Guardamos la línea y la asociamos
        LineaCarrito guardada = lineaRepository.save(linea);
        carrito.getLineas().add(guardada);

        recalcularTotal(carrito);
        return toResponse(carritoRepository.save(carrito));
    }

    @Transactional
    public CarritoResponse deleteLinea(int idCarrito, long idLinea) {
        Carrito carrito = carritoRepository.findById(idCarrito)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no existe"));

        // Verifica que la línea existe y pertenece a ese carrito
        LineaCarrito linea = lineaRepository.findById(idLinea)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Línea no existe"));

        if (!linea.getCarrito().getIdCarrito().equals(carrito.getIdCarrito())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esa línea no pertenece a ese carrito");
        }

        carrito.getLineas().removeIf(l -> l.getId().equals(idLinea));
        lineaRepository.delete(linea);

        recalcularTotal(carrito);
        return toResponse(carritoRepository.save(carrito));
    }

    private void recalcularTotal(Carrito carrito) {
        double total = carrito.getLineas().stream()
                .mapToDouble(LineaCarrito::getCosteLinea)
                .sum();
        carrito.setTotalPrecio(total);
    }

    private CarritoResponse toResponse(Carrito carrito) {
        List<LineaCarritoResponse> lineas = carrito.getLineas().stream()
                .map(l -> new LineaCarritoResponse(
                        l.getId(),
                        l.getIdArticulo(),
                        l.getPrecioUnitario(),
                        l.getUnidades(),
                        l.getCosteLinea()
                ))
                .toList();

        return new CarritoResponse(
                carrito.getIdCarrito(),
                carrito.getIdUsuario(),
                carrito.getCorreoUsuario(),
                carrito.getTotalPrecio(),
                lineas
        );
    }
}