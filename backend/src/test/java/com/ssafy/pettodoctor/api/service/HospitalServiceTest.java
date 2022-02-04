package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.repository.HospitalRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class HospitalServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    HospitalRepository hospitalRepository;

    @Test
    public void 병원검색(){
        Hospital h1 = new Hospital();
        h1.setName("별내병원");
        h1.setDongCode("12345");
        h1.setDescription("aaa");
        em.persist(h1);
        em.flush();
        em.clear();

        Assertions.assertEquals(h1.getDescription(), hospitalRepository.findById(h1.getId()).getDescription());
        Assertions.assertEquals(h1.getDescription(), hospitalRepository.findByDongCode(h1.getDongCode()).get(0).getDescription());
        Assertions.assertEquals(h1.getDescription(), hospitalRepository.findByName(h1.getName()).get(0).getDescription());
        Assertions.assertEquals(h1.getDescription(), hospitalRepository.findByName("별내").get(0).getDescription());

    }
}