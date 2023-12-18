package com.josh.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.josh.springboot.backend.apirest.models.entity.PersonalInfo;

public interface IPersonalInfoDao extends CrudRepository<PersonalInfo,Long>{

}
