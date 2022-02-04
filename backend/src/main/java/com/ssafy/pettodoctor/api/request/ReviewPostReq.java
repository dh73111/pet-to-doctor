package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewPostReq {
    private Long userId;
    private Long hospitalId;
    private String content;
    private Integer rate;
}
