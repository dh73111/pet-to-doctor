package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Review {
    @Id @GeneratedValue
    @Column(name="review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="hospital_id")
    private Hospital hospital;

    private String content;

    private Integer rate;

    // 리뷰 생성 메소드
    public static Review createReview(User user, Hospital hospital, String content, Integer rate){
        Review review = new Review();
        review.setUser(user);
        review.setHospital(hospital);
        review.setContent(content);
        review.setRate(rate);

        return review;
    }
}
