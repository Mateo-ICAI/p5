package edu.comillas.icai.gitt.pat.spring.practica2.modelo;

import java.util.List;

public class CarritoResponse {
    public Integer idCarrito;
    public Integer idUsuario;
    public String correoUsuario;
    public Double totalPrecio;
    public List<LineaCarritoResponse> lineas;

    public CarritoResponse(Integer idCarrito, Integer idUsuario, String correoUsuario,
                           Double totalPrecio, List<LineaCarritoResponse> lineas) {
        this.idCarrito = idCarrito;
        this.idUsuario = idUsuario;
        this.correoUsuario = correoUsuario;
        this.totalPrecio = totalPrecio;
        this.lineas = lineas;
    }
}