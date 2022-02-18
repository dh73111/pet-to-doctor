package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QnaRegReq {
    private Long accountId;
    private String content;
    private String title;
}
