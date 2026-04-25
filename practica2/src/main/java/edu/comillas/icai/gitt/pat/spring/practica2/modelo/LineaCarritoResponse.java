package edu.comillas.icai.gitt.pat.spring.practica2.modelo;

public class LineaCarritoResponse {
    public Long id;
    public Integer idArticulo;
    public Double precioUnitario;
    public Integer unidades;
    public Double costeLinea;

    public LineaCarritoResponse(Long id, Integer idArticulo, Double precioUnitario,
                                Integer unidades, Double costeLinea) {
        this.id = id;
        this.idArticulo = idArticulo;
        this.precioUnitario = precioUnitario;
        this.unidades = unidades;
        this.costeLinea = costeLinea;
    }
}