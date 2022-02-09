package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Hospital;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class HospitalRepositoryTest {
    @Autowired
    EntityManager em;
    @Autowired
    HospitalRepository hospitalRepository;


    @Test
    public void 동이름_병원검색(){
        List<Hospital> hospitals = hospitalRepository.findByDongName("슬픔");

        Assertions.assertEquals(1, hospitals.size(), "검색 개수 일치");
    }
}