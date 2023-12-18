package com.josh.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.josh.springboot.backend.apirest.models.dao.IPersonalInfoDao;
import com.josh.springboot.backend.apirest.models.entity.PersonalInfo;


@Service
public class PersonalInfoServiceImpl implements IPersonalInfoService{
	
	@Autowired
	private IPersonalInfoDao  PersonalInfoDao;
	@Override
	@Transactional(readOnly = true)
	public List<PersonalInfo> findAll() {
		// TODO Auto-generated method stub
		return (List<PersonalInfo>) PersonalInfoDao.findAll();
	}
	@Override
	@Transactional(readOnly = true)
	public PersonalInfo findById(Long id) {
		// TODO Auto-generated method stub
		return PersonalInfoDao.findById(id).orElseGet(null);
	}
	@Override
	@Transactional
	public PersonalInfo save(PersonalInfo personalinfo) {
		// TODO Auto-generated method stub
		return PersonalInfoDao.save(personalinfo);
	}
	@Override
	@Transactional
	public void delete(Long id) {
		// TODO Auto-generated method stub
		PersonalInfoDao.deleteById(id);
	}

}