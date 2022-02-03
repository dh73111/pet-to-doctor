package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DoctorPostReq {
    private String email;
    private String password;
    private String tel;
    private String name;

    private String pysicianLicenseNumber;
    private String specialty;
    private Integer price;
}
