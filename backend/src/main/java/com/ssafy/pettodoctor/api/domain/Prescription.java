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
    private String medicine;
    private String diagnosis;
    private String opinion;
    private Integer price;

    @Enumerated(value=EnumType.STRING)
    private PaymentType type;

    private Boolean isShipping;
    private String invoiceCode;
    private String paymentCode;

    @Embedded
    private Address shippingAddress;

    private String shippingName;
    private String shippingTel;

    //== 생성 메소드 ==//
    public static Prescription createPrescription(String administration, String medicine, String diagnosis, String opinion, Integer price, PaymentType type){
        Prescription prescription = new Prescription();
        prescription.setAdministration(administration);
        prescription.setMedicine(medicine);
        prescription.setDiagnosis(diagnosis);
        prescription.setOpinion(opinion);
        prescription.setPrice(price);
        prescription.setType(type);

        return prescription;
    }
}
