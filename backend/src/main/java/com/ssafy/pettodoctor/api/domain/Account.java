package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
public class Account {
    @Id @GeneratedValue
    @Column
    private Long id;

    private String email;
    private String name;
    private String role;
}
