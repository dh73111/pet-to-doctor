package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Admin;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class AdminRes {
    private Long adminId;
    private String email;
    private String password;
    private String name;
    private String role;
    private String tel;
    private LocalDate joinDate;

    public AdminRes() {}

    public AdminRes(Long adminId, String email, String password, String name, String role, String tel, LocalDate joinDate) {
        this.adminId = adminId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.tel = tel;
        this.joinDate = joinDate;
    }

    public static AdminRes convertTo(Admin admin){
        return new AdminRes(
                admin.getId(), admin.getEmail(), admin.getPassword()
                , admin.getName(), admin.getRole(), admin.getTel()
                , admin.getJoinDate()
        );
    }
}
