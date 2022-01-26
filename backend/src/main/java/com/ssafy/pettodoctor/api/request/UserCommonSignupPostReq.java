package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserCommonSignupPostReq {
    private String email;
    private String password;
    private String address;
    private String tel;
    private String name;
    private List<PetPostReq> pets;
}
