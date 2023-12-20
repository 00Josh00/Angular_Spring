package com.joseph.springboot.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.joseph.springboot.backend.apirest.models.entity.Persona;
import com.joseph.springboot.backend.apirest.models.services.IPersonaService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class PersonaRestController {

	@Autowired
	private IPersonaService personaService;

	@GetMapping("/personas")
	public List<Persona> index() {
		return personaService.findAll();

	}

	@GetMapping("/personas/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {

		Map<String, Object> response = new HashMap<>();
		Persona persona = null;

		try {
			persona = personaService.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage() != null ? e.getMessage() : "Excepción sin mensaje");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (persona == null) {
			response.put("mensaje", "El cliente ID:" + id.toString() + " no existe en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Persona>(persona, HttpStatus.OK);
	}

	@PostMapping("/personas")
	public ResponseEntity<?> create(@RequestBody Persona persona) {
		Persona personaNew = null;
		Map<String, Object> response = new HashMap<>();

		try {
			personaNew = personaService.save(persona);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "La persona ha sido creado con éxito!");
		response.put("persona", personaNew);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PutMapping("/personas/{id}")
	public ResponseEntity<?> update(@RequestBody Persona persona, @PathVariable Long id) {

		Persona personaActual = personaService.findById(id);
		Persona personaUpdated = null;

		Map<String, Object> response = new HashMap<>();
		if (personaActual == null) {
			response.put("mensaje",
					"Error, no se pudo editar, el cliente ID: " + id.toString() + " no existe en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {

			personaActual.setNombre(persona.getNombre());
			personaActual.setApellidos(persona.getApellidos());
			personaActual.setDireccion(persona.getDireccion());
			personaActual.setEmail(persona.getEmail());
			personaActual.setTelefono(persona.getTelefono());
			personaActual.setDireccion(persona.getDireccion());
			personaActual.setCreateAt(persona.getCreateAt());

			personaUpdated = personaService.save(personaActual);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "La persona ha sido actualizada con éxito!");
		response.put("persona", personaUpdated);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@DeleteMapping("/personas/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		personaService.delete(id);
	}

}
