package com.ssafy.pettodoctor.api.domain;

import com.ssafy.pettodoctor.api.request.ShippingReq;
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
    public static Prescription createPrescription(String administration, String diagnosis, String opinion, Integer medicineCost, Integer additionalCost, Boolean isShipping){
        Prescription prescription = new Prescription();
        prescription.setAdministration(administration);
        prescription.setDiagnosis(diagnosis);
        prescription.setOpinion(opinion);
        prescription.setType(PaymentType.UNCOMPLETE);
        prescription.setMedicineCost(medicineCost);
        prescription.setAdditionalCost(additionalCost);
        prescription.setIsShipping(isShipping);

        return prescription;
    }

    // 비즈니스 메소드
    public void updateShippingInfo(String invoiceCode){
        this.setInvoiceCode(invoiceCode);
        if(this.getIsShipping().equals(false))
            this.setIsShipping(true);
    }

    //비즈니스 메소드
    public void updatePaymentInfo(ShippingReq shippingReq) {
        this.setPaymentCode(shippingReq.getPaymentCode());
        this.setShippingName(shippingReq.getShippingName());
        this.setShippingTel(shippingReq.getShippingTel());
        this.setShippingCost(shippingReq.getShippingCost());
        this.setShippingAddress(shippingReq.getAddress());

        if(this.getType().equals(PaymentType.UNCOMPLETE))
            this.setType(PaymentType.COMPLETE);
    }
}
