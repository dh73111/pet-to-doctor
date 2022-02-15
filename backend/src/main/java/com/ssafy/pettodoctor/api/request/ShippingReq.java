package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.Address;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShippingReq {
    private String paymentCode;
    private Address address;
    private String shippingName;
    private String shippingTel;
    private Integer shippingCost;
}
