package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="admins")
@DiscriminatorValue("A")
@Getter @Setter
public class Admin extends Account {


    public Admin(){};

    // == 생성 메소드 == //
    public static Admin createAdmin(String email, String password, String name, String tel){
        Admin admin = new Admin();

        admin.setEmail(email);
        admin.setPassword(password);
        admin.setName(name);
        admin.setTel(tel);
        admin.setRole("ROLE_ADMIN");
        admin.setJoinDate(LocalDate.now());

        return admin;

    }
}
