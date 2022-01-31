package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Hospital {
    @Id @GeneratedValue
    @Column(name = "hospital_id")
    private Long id;

    @Embedded
    private Address address;

    private String tel;
    private String url;
    private String operatingTime;
    private Boolean fullTime;
    private String treatmentSubject;
    private String description;
    private String latitude;
    private String longitude;
    private String businessNumber;
    private String dongCode;
    private String name;
}
