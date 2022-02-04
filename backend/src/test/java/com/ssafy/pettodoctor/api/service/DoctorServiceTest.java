package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.repository.DoctorRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class DoctorServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    DoctorRepository doctorRepository;

    @Test
    public void 의사조회(){
        Hospital h1 = new Hospital();
        h1.setName("별내병원");

        Doctor d1 = new Doctor();
        d1.setName("의1");
        d1.setHospital(h1);

        Doctor d2 = new Doctor();
        d2.setName("의2");
        d2.setHospital(h1);

        em.persist(h1);
        em.persist(d1);
        em.persist(d2);
        em.flush();
        em.clear();

        Assertions.assertEquals(d1.getName(), doctorRepository.findById(d1.getId()).getName());
        Assertions.assertEquals(2, doctorRepository.findByHospitalId(h1.getId()).size());
    }
}