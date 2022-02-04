package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Review;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.ReviewPostReq;
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
//@Rollback(value = false)
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

    @Test
    public void 병원리뷰등록(){
        User u = new User();
        Doctor d = new Doctor();
        em.persist(u);
        em.persist(d);
        em.flush();
        em.clear();

        ReviewPostReq rpr = new ReviewPostReq();
        rpr.setUserId(u.getId());
        rpr.setHospitalId(d.getId());
        rpr.setRate(100);

        System.out.println("--------------");
        Long rId = reviewService.registerReview(rpr);
        Assertions.assertEquals(100, em.find(Review.class, rId).getRate());
    }
}