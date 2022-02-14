package com.ssafy.pettodoctor.api.domain;

import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Treatment {
    @Id @GeneratedValue
    @Column(name = "treatment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="doctor_id")
    private Doctor doctor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="hospital_id")
    private Hospital hospital;

    private String paymentCode;
    private Integer price;

    private LocalDateTime scheduleDate;
    @Enumerated(value = EnumType.STRING)
    private TreatmentType type;

    private Boolean reVisit;

    private String petName;
    private String symptom;
    private LocalDate birthDate;
    private String petSpecies;
    private String petWeight;

    // 생성자
    public static Treatment createTreatment(TreatmentPostReq req
            , Doctor doctor, User user, Hospital hospital) {
        Treatment treatment = new Treatment();
        treatment.setDoctor(doctor);
        treatment.setUser(user);
        treatment.setHospital(hospital);
        treatment.setPaymentCode(req.getPaymentCode());
        treatment.setReVisit(req.getReVisit());
        treatment.setScheduleDate(req.getScheduleDate());
        treatment.setSymptom(req.getSymptom());
        treatment.setType(req.getType());
        treatment.setPrice(req.getPrice());

        // 동물 관련
        treatment.setPetName(req.getPetName());
        treatment.setPetSpecies(req.getPetSpecies());
        treatment.setBirthDate(req.getBirthDate());
        treatment.setPetWeight(req.getPetWeight());

        return treatment;
    }

    // 비즈니스 메소드
    public void updatePaymentInfo(String paymentCode, Integer price){
        this.setPaymentCode(paymentCode);
        this.setPrice(price);
        if(this.getType() == TreatmentType.RES_REQUEST)
            this.setType(TreatmentType.RES_PAID);
        else if(this.getType() == TreatmentType.VST_REQUEST){
            this.setType(TreatmentType.VST_PAID);
        }
    }
}
