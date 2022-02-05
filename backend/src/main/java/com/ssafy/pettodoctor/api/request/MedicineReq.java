package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MedicineReq {
    private String name;
    private Integer price;
}
