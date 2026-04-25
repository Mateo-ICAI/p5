package edu.comillas.icai.gitt.pat.spring.practica2.entidades;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carritos")
public class Carrito {

    @Id
    private Integer idCarrito;

    @Column(nullable = false)
    private Integer idUsuario;

    @Column(nullable = false)
    private String correoUsuario;

    @Column(nullable = false)
    private Double totalPrecio = 0.0;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineaCarrito> lineas = new ArrayList<>();

    public Carrito() {}

    public Integer getIdCarrito() { return idCarrito; }
    public void setIdCarrito(Integer idCarrito) { this.idCarrito = idCarrito; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getCorreoUsuario() { return correoUsuario; }
    public void setCorreoUsuario(String correoUsuario) { this.correoUsuario = correoUsuario; }

    public Double getTotalPrecio() { return totalPrecio; }
    public void setTotalPrecio(Double totalPrecio) { this.totalPrecio = totalPrecio; }

    public List<LineaCarrito> getLineas() { return lineas; }
    public void setLineas(List<LineaCarrito> lineas) { this.lineas = lineas; }
}