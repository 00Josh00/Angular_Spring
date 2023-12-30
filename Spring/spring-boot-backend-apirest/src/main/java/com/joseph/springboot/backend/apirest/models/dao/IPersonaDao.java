package com.joseph.springboot.backend.apirest.models.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.joseph.springboot.backend.apirest.models.entity.ExperienciaLaboral;
import com.joseph.springboot.backend.apirest.models.entity.Persona;

public interface IPersonaDao extends JpaRepository<Persona,Long>{
	@Query("from ExperienciaLaboral")
	public List<ExperienciaLaboral> findallExperiencias();
}
