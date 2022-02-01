package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.TreatmentType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
public class TreatmentRes {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Long prescriptionId;
    private Long hospitalId;

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
    private String url;

    public TreatmentRes(){}

    public TreatmentRes(Long id, Long userId, Long doctorId, Long prescriptionId, Long hospitalId, String paymentCode, LocalDateTime scheduleDate, TreatmentType type, Boolean reVisit, String petName, String symptom, LocalDate birthDate, String petSpecies, String petWeight, Integer price, String url) {
        this.id = id;
        this.userId = userId;
        this.doctorId = doctorId;
        this.prescriptionId = prescriptionId;
        this.hospitalId = hospitalId;
        this.paymentCode = paymentCode;
        this.scheduleDate = scheduleDate;
        this.type = type;
        this.reVisit = reVisit;
        this.petName = petName;
        this.symptom = symptom;
        this.birthDate = birthDate;
        this.petSpecies = petSpecies;
        this.petWeight = petWeight;
        this.price = price;
        this.url = url;
    }
}
