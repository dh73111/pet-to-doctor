package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="userCert")
@Getter
@Setter
public class UserCertification {
    @Id
    @GeneratedValue
    @Column(name="userCert_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name="user_id")
    private User user;

    private String certificationKey;
}
