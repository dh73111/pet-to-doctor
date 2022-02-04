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
    private User user;
    private Hospital hospital;

    public MarkRes(Long id, User user, Hospital hospital) {
        this.id = id;
        this.user = user;
        this.hospital = hospital;
    }

    public static MarkRes convertToMarkRes(Mark m) {
        return new MarkRes(m.getId(), m.getUser(), m.getHospital());
    }

    public static List<MarkRes> convertToMarkResList(List<Mark> markList) {
        List<MarkRes> markResList = new ArrayList<>();
        for (Mark m : markList) {
            markResList.add(convertToMarkRes(m));
        }
        return markResList;
    }
}
