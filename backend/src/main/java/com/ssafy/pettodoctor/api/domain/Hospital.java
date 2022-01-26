package com.ssafy.pettodoctor.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Hospital {
    @Id @GeneratedValue
    @Column(name = "hospital_id")
    private Long id;

    private String address;
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
}
