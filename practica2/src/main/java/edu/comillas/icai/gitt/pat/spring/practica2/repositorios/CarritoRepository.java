package edu.comillas.icai.gitt.pat.spring.practica2.repositorios;

import edu.comillas.icai.gitt.pat.spring.practica2.entidades.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepository extends JpaRepository<Carrito, Integer> {
}