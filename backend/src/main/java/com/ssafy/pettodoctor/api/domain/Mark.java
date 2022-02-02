package com.ssafy.pettodoctor.api.domain;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonTypeId;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Mark {
    @Id
    @GeneratedValue
    @Column(name = "mark_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)   //  Hospital 서비스 만들기 전 테스트 용. 끝나면 cascaede 지울 것.
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;
}

