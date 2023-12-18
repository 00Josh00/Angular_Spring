package com.josh.springboot.backend.apirest.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.josh.springboot.backend.apirest.models.entity.PersonalInfo;
import com.josh.springboot.backend.apirest.models.services.IPersonalInfoService;


@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class PersonalInfoRestController {
	
	@Autowired
	private IPersonalInfoService personalInfoService;
	
	
	@GetMapping("/personalinfo")
	public List<PersonalInfo> index(){
		return personalInfoService.findAll();
	}
	
	@GetMapping("/personalinfo/{id}")
	public PersonalInfo show(@PathVariable Long id) {
		return personalInfoService.findById(id);
	}
	
	@PostMapping("/personalinfo")
	@ResponseStatus(HttpStatus.CREATED)
	public PersonalInfo create( @RequestBody PersonalInfo personalinfo) {
		return personalInfoService.save(personalinfo);
	}
	
	
	@PutMapping("/personalinfo/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public PersonalInfo update(@RequestBody PersonalInfo personalinfo, @PathVariable Long id) {
		PersonalInfo personalinfoActual = personalInfoService.findById(id);
		
		personalinfoActual.setNombre(personalinfo.getNombre());
		personalinfoActual.setApellidos(personalinfo.getApellidos());
		personalinfoActual.setEmail(personalinfo.getEmail());
		personalinfoActual.setTelefono(personalinfo.getEmail());
		personalinfoActual.setDireccion(personalinfo.getEmail());
		
		
		return personalInfoService.save(personalinfoActual);
	}
	
	@DeleteMapping("/personalinfo/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		personalInfoService.delete(id);
	}
	
	
	
}