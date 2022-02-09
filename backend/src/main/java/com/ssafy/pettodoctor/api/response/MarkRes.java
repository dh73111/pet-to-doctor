package com.ssafy.pettodoctor.api.response;

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

    public MarkRes(Long id, Long user_id, Long hospital_id) {
        this.id = id;
        this.user_id = user_id;
        this.hospital_id = hospital_id;
    }

    public static MarkRes convertToMarkRes(Mark m) {
        return new MarkRes(m.getId(), m.getUser().getId(), m.getHospital().getId());
    }

    public static List<MarkRes> convertToMarkResList(List<Mark> markList) {
        List<MarkRes> markResList = new ArrayList<>();
        for (Mark m : markList) {
            markResList.add(convertToMarkRes(m));
        }
        return markResList;
    }
}
