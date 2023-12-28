package com.joseph.springboot.backend.apirest.models.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.joseph.springboot.backend.apirest.models.entity.Persona;

public interface IPersonaDao extends JpaRepository<Persona,Long>{

}
