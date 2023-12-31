package com.joseph.springboot.backend.apirest.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.joseph.springboot.backend.apirest.models.entity.ExperienciaLaboral;
import com.joseph.springboot.backend.apirest.models.entity.Persona;
import com.joseph.springboot.backend.apirest.models.services.IPersonaService;

import jakarta.validation.Valid;
//import jakarta.validation.constraints.NotEmpty;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class PersonaRestController {

	@Autowired
	private IPersonaService personaService;

	private final Logger log = LoggerFactory.getLogger(PersonaRestController.class);

	@GetMapping("/personas")
	public List<Persona> index() {
		return personaService.findAll();

	}

	@GetMapping("/personas/page/{page}")
	public Page<Persona> index(@PathVariable Integer page) {
		Pageable pageable = PageRequest.of(page, 5);
		return personaService.findAll(pageable);

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
	public ResponseEntity<?> create(@Valid @RequestBody Persona persona, BindingResult result) {
		Persona personaNew = null;
		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {

			List<String> errors = new ArrayList<>();

			for (FieldError err : result.getFieldErrors()) {
				errors.add("El campo '" + err.getField() + "' " + err.getDefaultMessage());
			}

			response.put("errors", errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

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
	public ResponseEntity<?> update(@Valid @RequestBody Persona persona, BindingResult result, @PathVariable Long id) {

		Persona personaActual = personaService.findById(id);
		Persona personaUpdated = null;

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {

			List<String> errors = new ArrayList<>();

			for (FieldError err : result.getFieldErrors()) {
				errors.add("El campo '" + err.getField() + "' " + err.getDefaultMessage());
			}

			response.put("errors", errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

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
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Persona persona = personaService.findById(id);
			String nombreFotoAnterior = persona.getFoto();

			if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
				Path rutaFotoAnteior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnteior.toFile();
				if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}

			personaService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar la persona en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Persona eliminada con exito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PostMapping("/personas/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
		Map<String, Object> response = new HashMap<>();

		Persona persona = personaService.findById(id);

		if (!archivo.isEmpty()) {
			String nombreArchivo = UUID.randomUUID().toString() + " " + archivo.getOriginalFilename().replace(" ", "");
			Path rutaArchivo = Paths.get("uploads").resolve(nombreArchivo).toAbsolutePath();
			log.info(rutaArchivo.toString());

			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);
			} catch (IOException e) {

				response.put("mensaje", "Error al subir la imagen " + nombreArchivo);
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);

			}

			String nombreFotoAnterior = persona.getFoto();
			if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
				Path rutaFotoAnteior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnteior.toFile();
				if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}

			persona.setFoto(nombreArchivo);
			personaService.save(persona);

			response.put("persona", persona);
			response.put("mensaje", "Se subio correctamente la imagen: " + nombreArchivo);

		}

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@GetMapping("/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

		Path rutaArchivo = Paths.get("uploads").resolve(nombreFoto).toAbsolutePath();
		log.info(rutaArchivo.toString());

		Resource recurso = null;

		try {
			recurso = new UrlResource(rutaArchivo.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		if (!recurso.exists() && !recurso.isReadable()) {
			rutaArchivo = Paths.get("src/main/resources/static/img").resolve("no-foto.png").toAbsolutePath();
			try {
				recurso = new UrlResource(rutaArchivo.toUri());
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
			
			
			log.error("Error no se pudo cargar la imagen: " + nombreFoto);
			
		}
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}

}
