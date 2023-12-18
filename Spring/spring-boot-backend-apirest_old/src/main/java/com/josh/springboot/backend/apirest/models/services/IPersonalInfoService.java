package com.josh.springboot.backend.apirest.models.services;

import java.util.List;

import com.josh.springboot.backend.apirest.models.entity.PersonalInfo;

public interface IPersonalInfoService {
	public List<PersonalInfo> findAll();
}
