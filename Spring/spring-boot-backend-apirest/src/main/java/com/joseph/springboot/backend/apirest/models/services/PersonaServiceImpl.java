package com.joseph.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.joseph.springboot.backend.apirest.models.dao.IPersonaDao;
import com.joseph.springboot.backend.apirest.models.entity.Persona;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PersonaServiceImpl implements IPersonaService {

    @Autowired
    private IPersonaDao personaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Persona> findAll() {
        return (List<Persona>) personaDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Persona findById(Long id) {
        return personaDao.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Persona save(Persona persona) {
        return personaDao.save(persona);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!personaDao.existsById(id)) {

            throw new EntityNotFoundException("No se encontró la persona con el ID: " + id);
        }
        personaDao.deleteById(id);
    }
}

