package com.ssafy.pettodoctor.api.request;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.NoticeType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class NoticePostReq {
    private Long accountId;
    private Long treatmentId;
    private Long doctorId;

    private String content;
    private String url;

    private NoticeType type;
    private Boolean isChecked;
    private LocalDateTime noticeDate;

}
