package com.ssafy.pettodoctor.api.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class DoctorRes {
    private Long id;
    private String email;
    private String name;
    private String role;
    private String tel;
    private LocalDateTime joinDate;
    private String pysicianLicenseNumber;
    private String specialty;
    private Integer price;
    private Long hospitalId;

    public DoctorRes() {

    }

    public DoctorRes(Long id, String email, String name, String role, String tel, LocalDateTime joinDate, String pysicianLicenseNumber, String specialty, Integer price, Long hospitalId) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.tel = tel;
        this.joinDate = joinDate;
        this.pysicianLicenseNumber = pysicianLicenseNumber;
        this.specialty = specialty;
        this.price = price;
        this.hospitalId = hospitalId;
    }
}
