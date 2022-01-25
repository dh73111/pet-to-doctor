package com.ssafy.pettodoctor.api.domain;

import javax.persistence.*;

@Entity
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

    private String shippingAddress;
    private String shippingName;
    private String shippingTel;

}
