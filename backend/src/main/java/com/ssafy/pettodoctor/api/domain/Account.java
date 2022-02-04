package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@Table(name = "accounts")
public class Account {
    @Id @GeneratedValue
    @Column
    private Long id;

    private String email;
    private String password;
    private String name;
    private String role;
    private String tel;
    private LocalDateTime joinDate;

    public String getAuthority(){
        return this.role;
    }
}
