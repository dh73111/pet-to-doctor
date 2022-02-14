package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class TreatmentRes {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Long prescriptionId;
    private Long hospitalId;

    private String doctorName;
    private String hopitalName;

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

    public TreatmentRes(){}

    public TreatmentRes(Long id, Long userId, Long doctorId, Long prescriptionId, Long hospitalId, String doctorName, String hopitalName, String paymentCode, LocalDateTime scheduleDate, TreatmentType type, Boolean reVisit, String petName, String symptom, LocalDate birthDate, String petSpecies, String petWeight, Integer price) {
        this.id = id;
        this.userId = userId;
        this.doctorId = doctorId;
        this.prescriptionId = prescriptionId;
        this.hospitalId = hospitalId;
        this.doctorName = doctorName;
        this.hopitalName = hopitalName;
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
    }

    public static TreatmentRes convertToRes(Treatment t){
        TreatmentRes tr = new TreatmentRes(t.getId(), t.getUser() != null ? t.getUser().getId() : null,
                t.getDoctor() != null ? t.getDoctor().getId() : null
                ,t.getPrescription() != null ? t.getPrescription().getId() : null
                , t.getHospital() != null ? t.getHospital().getId() : null
                ,t.getDoctor() != null ? t.getDoctor().getName() : null
                ,t.getHospital() != null ? t.getHospital().getName() : null
                ,t.getPaymentCode(), t.getScheduleDate(), t.getType()
                ,t.getReVisit(), t.getPetName(), t.getSymptom(), t.getBirthDate()
                ,t.getPetSpecies(), t.getPetWeight(), t.getPrice());
        return tr;
    }

    public static List<TreatmentRes> convertToResList(List<Treatment> treatments){
        List<TreatmentRes> result = new ArrayList<>();
        for(Treatment t : treatments){
            result.add(convertToRes(t));
        }
        return result;
    }
}
