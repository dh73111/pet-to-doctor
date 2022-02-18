package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class MarkRes {

    private Long id;
    private Long user_id;
    private Long hospital_id;
    private String hospital_name;
    private Address hospital_address;
    private String hospital_tel;

    public MarkRes(Long id, Long user_id, Long hospital_id, String hospital_name, Address hospital_address, String hospital_tel) {
        this.id = id;
        this.user_id = user_id;
        this.hospital_id = hospital_id;
        this.hospital_name = hospital_name;
        this.hospital_address = hospital_address;
        this.hospital_tel = hospital_tel;
    }

    public static MarkRes convertToMarkRes(Mark m) {
        return new MarkRes(m.getId(),
                m.getUser() != null ? m.getUser().getId() : null,
                m.getHospital() != null ? m.getHospital().getId() : null,
                m.getHospital() != null ? m.getHospital().getName() : null,
                m.getHospital() != null ? m.getHospital().getAddress() : null,
                m.getHospital() != null ? m.getHospital().getTel() : null);
    }

    public static List<MarkRes> convertToMarkResList(List<Mark> markList) {
        List<MarkRes> markResList = new ArrayList<>();
        for (Mark m : markList) {
            markResList.add(convertToMarkRes(m));
        }
        return markResList;
    }
}
