package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginPostReq {
    private String email;
    private String password;
}
