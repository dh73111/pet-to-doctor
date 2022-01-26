package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="users")
@Getter @Setter
public class User {
    @Id @GeneratedValue
    @Column(name="user_id")
    private Long id;
    private String email;
    private String password;
    private String name;
    private String tel;
    private String address;
    private Boolean isOauth;
    private Boolean isCertificated;
    private LocalDateTime joinDate;

    //== 생성 메소드 ==//
    public static User createCommonUser(String email, String name, String password, String address){
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(password);
        user.setAddress(address);
        user.setIsCertificated(false);
        user.setIsOauth(false);
        user.setJoinDate(LocalDateTime.now());

        return user;
    }

    public User createOauthUser(String email, String name){
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setIsCertificated(true);
        user.setIsOauth(true);
        user.setJoinDate(LocalDateTime.now());

        return user;
    }

}
