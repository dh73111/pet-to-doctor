package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Medicine;
import com.ssafy.pettodoctor.api.request.MedicineReq;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class MedicineRes {
    private String name;
    private Integer price;

    public MedicineRes(){}

    public MedicineRes(String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    public static List<MedicineRes> convertToResList(List<Medicine> medicines){
        List<MedicineRes> result = new ArrayList<>();
        for(Medicine m : medicines){
            result.add(new MedicineRes(m.getName(), m.getPrice()));
        }

        return result;
    }
}
