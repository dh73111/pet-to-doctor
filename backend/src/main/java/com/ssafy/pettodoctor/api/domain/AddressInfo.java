package com.ssafy.pettodoctor.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AddressInfo {
    @Id @GeneratedValue
    @Column(name = "address_info_id")
    private Long id;
    private String address;
    private String dongCode;
    private String latitude;
    private String longitude;

}
