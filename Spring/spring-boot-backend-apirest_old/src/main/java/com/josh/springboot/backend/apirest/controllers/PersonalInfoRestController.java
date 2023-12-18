package com.josh.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
