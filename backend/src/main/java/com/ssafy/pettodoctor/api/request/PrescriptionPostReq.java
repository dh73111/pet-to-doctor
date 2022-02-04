package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.PaymentType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class PrescriptionPostReq {
    // 필수
    private String administration;
    private String diagnosis;
    private String opinion;
    private Integer additionalCost;
    private Integer medicineCost;
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
    private Integer shippingCost;

    private List<MedicineReq> medicines;

}
