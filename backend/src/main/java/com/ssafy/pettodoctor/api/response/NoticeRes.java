package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Notice;
import com.ssafy.pettodoctor.api.domain.NoticeType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class NoticeRes {
    private Long id;
    private Long accountId;
    private String content;
    private String url;
    private NoticeType type;
    private Boolean isChecked;
    private LocalDateTime noticeDate;


    public NoticeRes(Long id, Long accountId, String content, String url, NoticeType type, Boolean isChecked, LocalDateTime noticeDate){
        this.id = id;
        this.accountId = accountId;
        this.content = content;
        this.url = url;
        this.type = type;
        this.isChecked = isChecked;
        this.noticeDate = noticeDate;
    }

    public static NoticeRes convertToRes(Notice n){
        NoticeRes nr = new NoticeRes(n.getId(), n.getAccount().getId(), n.getContent(), n.getUrl(), n.getType(), n.getIsChecked(), n.getNoticeDate());
        return nr;
    }

    public static List<NoticeRes> convertToResList(List<Notice> notices) {
        List<NoticeRes> result = new ArrayList<>();
        for(Notice n : notices)
            result.add(convertToRes(n));
        return result;

    }
}
