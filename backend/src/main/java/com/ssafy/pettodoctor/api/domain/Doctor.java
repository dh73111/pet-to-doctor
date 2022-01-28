package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Doctor {
    @Id @GeneratedValue
    @Column(name = "doctor_id")
    private Long id;

    private String name;
    private String pysicianLicenseNumber;
    private String specialty;
    private Integer price;
    private String email;
    private String tel;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

}
