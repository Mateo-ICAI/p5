package edu.comillas.icai.gitt.pat.spring.practica2.controlador;

import edu.comillas.icai.gitt.pat.spring.practica2.entidades.Carrito;
import edu.comillas.icai.gitt.pat.spring.practica2.entidades.LineaCarrito;
import edu.comillas.icai.gitt.pat.spring.practica2.modelo.CarritoResponse;
import edu.comillas.icai.gitt.pat.spring.practica2.servicios.CarritoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
public class CarritoControlador {

    private final CarritoService carritoService;

    public CarritoControlador(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @GetMapping
    public List<CarritoResponse> getCarritos() {
        return carritoService.getCarritos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CarritoResponse creaCarrito(@RequestBody Carrito carrito) {
        return carritoService.crearCarrito(carrito);
    }

    @GetMapping("/{idCarrito}")
    public CarritoResponse getCarrito(@PathVariable int idCarrito) {
        return carritoService.getCarrito(idCarrito);
    }

    @PutMapping("/{idCarrito}")
    public CarritoResponse modificaCarrito(@PathVariable int idCarrito, @RequestBody Carrito carrito) {
        return carritoService.modificarCarrito(idCarrito, carrito);
    }

    @DeleteMapping("/{idCarrito}")
    public void borrarCarrito(@PathVariable int idCarrito) {
        carritoService.borrarCarrito(idCarrito);
    }

    @PostMapping("/{idCarrito}/lineas")
    @ResponseStatus(HttpStatus.CREATED)
    public CarritoResponse addLinea(@PathVariable int idCarrito, @RequestBody LineaCarrito linea) {
        return carritoService.addLinea(idCarrito, linea);
    }

    @DeleteMapping("/{idCarrito}/lineas/{idLinea}")
    public CarritoResponse deleteLinea(@PathVariable int idCarrito, @PathVariable long idLinea) {
        return carritoService.deleteLinea(idCarrito, idLinea);
    }
}