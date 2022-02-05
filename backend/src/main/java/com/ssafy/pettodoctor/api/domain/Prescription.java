package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Prescription {
    @Id @GeneratedValue
    @Column(name="prescription_id")
    private Long id;

    private String administration;
    private String diagnosis;
    private String opinion;
    private Integer additionalCost;
    private Integer medicineCost;

    @Enumerated(value=EnumType.STRING)
    private PaymentType type;

    private Boolean isShipping;
    private String invoiceCode;
    private String paymentCode;

    @Embedded
    private Address shippingAddress;
    private String shippingName;
    private String shippingTel;
    private Integer shippingCost;

    //== 생성 메소드 ==//
    public static Prescription createPrescription(String administration, String diagnosis, String opinion, PaymentType type, Integer medicineCost, Integer additionalCost, Boolean isShipping){
        Prescription prescription = new Prescription();
        prescription.setAdministration(administration);
        prescription.setDiagnosis(diagnosis);
        prescription.setOpinion(opinion);
        prescription.setType(type);
        prescription.setMedicineCost(medicineCost);
        prescription.setAdditionalCost(additionalCost);
        prescription.isShipping = isShipping;

        return prescription;
    }

    // 비즈니스 메소드
    public void updateShippingInfo(String invoiceCode, Address address, String shippingName, String shippingTel, Integer shippingCost){
        this.invoiceCode = invoiceCode;
        this.shippingAddress = address;
        this.shippingName = shippingName;
        this.shippingTel = shippingTel;
        this.shippingCost = shippingCost;
    }
}
