package com.joseph.springboot.backend.apirest.models.services;

import java.util.List;
import com.joseph.springboot.backend.apirest.models.entity.Persona;

public interface IPersonaService {

	public List<Persona> findAll();

	public Persona findById(Long id);

	public Persona save(Persona persona);

	public void delete(Long id);

}
