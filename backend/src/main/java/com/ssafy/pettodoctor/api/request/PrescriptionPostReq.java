package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.PaymentType;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PrescriptionPostReq {
    // 필수
    private String administration;
    private String diagnosis;
    private String medicine;
    private String opinion;
    private Integer price;
    private PaymentType type;

    // 선택
    private Boolean isShipping;
    private String invoiceCode;
    private String paymentCode;
//    private String zipcode;
//    private String city;
//    private String street;
    private Address address;
    private String shippingName;
    private String shippingTel;

}
