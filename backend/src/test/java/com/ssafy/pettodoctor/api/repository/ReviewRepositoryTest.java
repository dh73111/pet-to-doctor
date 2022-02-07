package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Review;
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
class ReviewRepositoryTest {
    @Autowired
    EntityManager em;
    @Autowired
    ReviewRepository reviewRepository;

    @Test
    public void 리뷰테스트(){
        List<Review> reviews = reviewRepository.findAll();
        List<Review> reviews2 = reviewRepository.findRecentReview(3);

        Assertions.assertEquals(4, reviews.size(), "전체 조회");
        Assertions.assertEquals(3, reviews2.size(), "최신 조회");

    }
}