package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.NoticeType;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NoticePostReq {
    private Long AccountId;

    private String content;
    private String url;

    private NoticeType type;
    private Boolean isChecked;

}
