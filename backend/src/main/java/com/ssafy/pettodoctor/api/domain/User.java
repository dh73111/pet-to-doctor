package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="users")
@Getter @Setter
@DiscriminatorValue("U")
public class User extends Account {
    @Embedded
    private Address address;
    private Boolean isOauth;
    private Boolean isCertificated;

    //== 생성 메소드 ==//
    public static User createCommonUser(String email, String name, String password, Address address){
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(password);
        user.setAddress(address);
        user.setIsCertificated(false);
        user.setIsOauth(false);
        user.setJoinDate(LocalDateTime.now());
        user.setRole("ROLE_USER");
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
