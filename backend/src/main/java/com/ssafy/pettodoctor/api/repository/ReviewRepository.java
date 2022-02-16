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

    // 일단 104개로 제한
    public List<Review> findAll(){
        return em.createQuery("select r from Review r", Review.class).setMaxResults(104).getResultList();
    }

    public List<Review> findRecentReview(int start){
        return em.createQuery("select r from Review r order by r.createTime desc")
                .setFirstResult(10*start + 1)
                .setMaxResults(10)
                .getResultList();
    }

    public List<Review> findOldReview(int start){
        return em.createQuery("select r from Review r order by r.createTime asc")
                .setFirstResult(10*start + 1)
                .setMaxResults(10)
                .getResultList();
    }

    public List<Review> findLowRateReview(int start){
        return em.createQuery("select r from Review r order by r.rate asc")
                .setFirstResult(10*start + 1)
                .setMaxResults(10)
                .getResultList();
    }

    public List<Review> findHighRateReview(int start){
        return em.createQuery("select r from Review r order by r.rate desc")
                .setFirstResult(10*start + 1)
                .setMaxResults(10)
                .getResultList();
    }

    public Long getCount(){
        return em.createQuery("select count(r) from Review r", Long.class).getSingleResult();
    }
}
