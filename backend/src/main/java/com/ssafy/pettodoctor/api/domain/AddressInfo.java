package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class AddressInfo {
    @Id @GeneratedValue
    @Column(name = "address_info_id")
    private Long id;
    private String address;
    private String dongCode;
    private String latitude;
    private String longitude;

}
