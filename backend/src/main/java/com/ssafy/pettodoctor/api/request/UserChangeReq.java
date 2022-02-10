package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.Address;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
public class UserChangeReq {

    private String name;
    private String tel;
    private LocalDate joinDate;
    private Address address;
    private Boolean isCertificated;

}
