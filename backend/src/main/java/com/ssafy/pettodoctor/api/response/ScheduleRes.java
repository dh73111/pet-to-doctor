package com.ssafy.pettodoctor.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ScheduleRes {
    private Long id;
    private Integer plusDay;
    private String bitmask;
    private Long doctorId;

    public ScheduleRes(){};

    public ScheduleRes(Long id, Integer plusDay, String bitmask, Long doctorId) {
        this.id = id;
        this.plusDay = plusDay;
        this.bitmask = bitmask;
        this.doctorId = doctorId;
    }
}
