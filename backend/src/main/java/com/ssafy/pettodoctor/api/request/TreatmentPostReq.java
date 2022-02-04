package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.TreatmentType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
public class TreatmentPostReq {
    private Long userId;
    private Long doctorId;
    private Long hospitalId;
    private Long petId; // 임시로 넣어둠

    private String paymentCode;
    private LocalDateTime scheduleDate;
    private TreatmentType type;

    private Boolean reVisit;

    private String petName;
    private String symptom;
    private LocalDate birthDate;
    private String petSpecies;
    private String petWeight;

    private Integer price;
}
