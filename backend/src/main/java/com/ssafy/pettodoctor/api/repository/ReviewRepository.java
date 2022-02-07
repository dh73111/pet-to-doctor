package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Review;
import com.ssafy.pettodoctor.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepository {
    private final EntityManager em;

    public List<Review> findByHospitalId(Long id){
        return em.createQuery("select r from Review r join r.hospital h where h.id = :id"
                , Review.class)
                .setParameter("id", id)
                .getResultList();
    }

    public Long registerReview(User user, Hospital hospital, String content, Integer rate){
        Review review = Review.createReview(user, hospital, content, rate);
        em.persist(review);
        return review.getId();
    }

    public List<Review> findAll(){
        return em.createQuery("select r from Review r", Review.class).getResultList();
    }

    public List<Review> findRecentReview(int count){
        return em.createQuery("select r from Review r order by r.createTime desc")
                .setMaxResults(count)
                .getResultList();
    }
}
