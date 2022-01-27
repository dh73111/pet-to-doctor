package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@DiscriminatorValue("D")
public class Doctor extends Account {
    private String pysicianLicenseNumber;
    private String specialty;
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

}
