package com.ssafy.pettodoctor.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QnaReplyReq {
    private Long adminId;
    private String reply;
}
