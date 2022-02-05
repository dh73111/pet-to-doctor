package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserPasswordChangeReq {
    private String password;
    private String passwordConf;
    private String newPassword;
}
