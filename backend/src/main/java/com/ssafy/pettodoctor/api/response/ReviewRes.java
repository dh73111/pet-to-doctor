package com.ssafy.pettodoctor.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewRes {
    private Long id;
    private Long userId;
    private Long hospitalId;
    private String content;
    private Integer rate;

    public ReviewRes() {
    }

    public ReviewRes(Long id, Long userId, Long hospitalId, String content, Integer rate) {
        this.id = id;
        this.userId = userId;
        this.hospitalId = hospitalId;
        this.content = content;
        this.rate = rate;
    }
}
