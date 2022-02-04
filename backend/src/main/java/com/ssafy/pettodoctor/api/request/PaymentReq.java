package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PaymentReq {
    private String paymentCode;
    private Integer price;
}
