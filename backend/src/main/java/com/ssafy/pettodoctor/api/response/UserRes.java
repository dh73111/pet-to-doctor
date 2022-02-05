package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class UserRes {

    private Long id;

    private String email;
    private String name;
    private String role;
    private String tel;
    private LocalDateTime joinDate;

    private Address address;
    private Boolean isOauth;
    private Boolean isCertificated;

    public UserRes(Long id, String email, String name,
                   String tel, LocalDateTime joinDate,
                   Address address, Boolean isOauth, Boolean isCertificated) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.tel = tel;
        this.joinDate = joinDate;
        this.address = address;
        this.isOauth = isOauth;
        this.isCertificated = isCertificated;
    }

    public static UserRes convertToUserRes(User u) {
        return new UserRes(u.getId(), u.getEmail(), u.getName(), u.getTel(), u.getJoinDate(), u.getAddress(), u.getIsOauth(), u.getIsCertificated());
    }
}
