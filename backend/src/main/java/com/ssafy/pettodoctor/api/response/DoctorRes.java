package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Doctor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class DoctorRes {
    private Long id;
    private String email;
    private String name;
    private String role;
    private String tel;
    private LocalDate joinDate;
    private String pysicianLicenseNumber;
    private String specialty;
    private Integer price;
    private Long hospitalId;
    private String profileImgUrl;

    public DoctorRes() {

    }

    public DoctorRes(Long id, String email, String name, String role, String tel, LocalDate joinDate, String pysicianLicenseNumber, String specialty, Integer price, Long hospitalId, String profileImgUrl) {
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
        this.profileImgUrl = profileImgUrl;
    }

    public static DoctorRes converToRes(Doctor d){
        DoctorRes dr = new DoctorRes(d.getId(), d.getEmail(), d.getName()
                , d.getRole(), d.getTel(),d.getJoinDate(),
                d.getPysicianLicenseNumber(), d.getSpecialty()
                , d.getPrice(), d.getHospital().getId(), d.getProfileImgUrl());
        return dr;
    }

    // Doctor 엔티티 리스트를 반환형 타입 리스트로 변환하는 함수
    public static List<DoctorRes> convertToResList(List<Doctor> doctors){
        List<DoctorRes> result = new ArrayList<>();
        for(Doctor d : doctors){
            result.add(converToRes(d));
        }

        return result;
    }
}
