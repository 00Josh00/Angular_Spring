package com.joseph.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	//@ResponseStatus(HttpStatus.OK)
	public Persona show(@PathVariable Long id) {
		return personaService.findById(id);
	}

	@PostMapping("/personas")
	@ResponseStatus(HttpStatus.CREATED)
	public Persona create(@RequestBody Persona persona) {
		return personaService.save(persona);
	}

}
