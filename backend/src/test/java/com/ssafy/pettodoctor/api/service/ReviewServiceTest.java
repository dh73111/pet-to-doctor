package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Review;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ReviewServiceTest {
    @Autowired
    EntityManager em;

    @Autowired
    ReviewService reviewService;

    @Test
    public void 병원리뷰조회(){
        Hospital h1 = new Hospital();
        h1.setName("별내병원");

        Review r1 = new Review();
        r1.setHospital(h1);
        r1.setContent("리뷰1");
        Review r2 = new Review();
        r2.setHospital(h1);
        r2.setContent("리뷰2");

        em.persist(h1);
        em.persist(r1);
        em.persist(r2);
        em.flush();
        em.clear();

        Assertions.assertEquals(2, reviewService.findByHospitalId(h1.getId()).size());

    }
}