package com.ssafy.pettodoctor.api.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="users")
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
}
