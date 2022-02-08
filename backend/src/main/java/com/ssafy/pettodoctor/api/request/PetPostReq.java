package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class PetPostReq {
    private String name;
    private LocalDate birthDate;
    private String species;
    private String weight;
}
