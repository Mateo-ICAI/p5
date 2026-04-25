package edu.comillas.icai.gitt.pat.spring.practica2.entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "lineas_carrito")
public class LineaCarrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_carrito", nullable = false)
    private Carrito carrito;

    @Column(nullable = false)
    private Integer idArticulo;

    @Column(nullable = false)
    private Double precioUnitario;

    @Column(nullable = false)
    private Integer unidades;

    @Column(nullable = false)
    private Double costeLinea;

    public LineaCarrito() {}

    public Long getId() { return id; }

    public Carrito getCarrito() { return carrito; }
    public void setCarrito(Carrito carrito) { this.carrito = carrito; }

    public Integer getIdArticulo() { return idArticulo; }
    public void setIdArticulo(Integer idArticulo) { this.idArticulo = idArticulo; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }

    public Integer getUnidades() { return unidades; }
    public void setUnidades(Integer unidades) { this.unidades = unidades; }

    public Double getCosteLinea() { return costeLinea; }
    public void setCosteLinea(Double costeLinea) { this.costeLinea = costeLinea; }
}