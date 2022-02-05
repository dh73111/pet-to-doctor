package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@DiscriminatorValue("D")
public class Doctor extends Account {
    private String pysicianLicenseNumber;
    private String specialty;
    private Integer price;
    private String profileImgUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;


//    public static Doctor createDoctor(String pysicianLicenseNumber, String specialty, Integer price, Hospital hospital){
    public static Doctor createDoctor(String email, String name, String password, String tel, String pysicianLicenseNumber, String specialty, Integer price){
        Doctor doctor = new Doctor();
        doctor.setEmail(email);
        doctor.setName(name);
        doctor.setPassword(password);
        doctor.setRole("ROLE_DOCTOR");
        doctor.setTel(tel);
        doctor.setJoinDate(LocalDateTime.now());

        doctor.setPysicianLicenseNumber(pysicianLicenseNumber);
        doctor.setSpecialty(specialty);
        doctor.setPrice(price);
//        doctor.setHospital(hospital);

        return doctor;
    }
}
