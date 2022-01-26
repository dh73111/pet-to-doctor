package com.ssafy.pettodoctor.api.domain;

import javax.persistence.*;

@Entity
public class Review {
    @Id @GeneratedValue
    @Column(name="review_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="hospital_id")
    private Hospital hospital;

    private String content;

    private Integer rate;
}
