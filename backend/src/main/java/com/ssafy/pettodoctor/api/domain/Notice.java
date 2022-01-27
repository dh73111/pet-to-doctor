package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Notice {
    @Id @GeneratedValue
    @Column(name = "notice_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="doctor_id")
    private Doctor doctor;

    private String content;
    private String url;

    @Enumerated(value = EnumType.STRING)
    private NoticeType type;

}