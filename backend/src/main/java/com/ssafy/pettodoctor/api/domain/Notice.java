package com.ssafy.pettodoctor.api.domain;

import com.ssafy.pettodoctor.api.request.NoticePostReq;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Notice {
    @Id @GeneratedValue
    @Column(name = "notice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="account_id")
    private Account account;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="treatment_id")
    private Treatment treatment;

    private String content;
    private String url;

    @Enumerated(value = EnumType.STRING)
    private NoticeType type;

    private Boolean isChecked;
    private LocalDateTime noticeDate;



    // == 생성 메서드 == //
    public static Notice createNotice(Account account, Treatment treatment, NoticePostReq req) {
        Notice notice = new Notice();
        notice.setAccount(account);
        notice.setContent(req.getContent());
        notice.setUrl(req.getUrl());
        notice.setType(req.getType());
        notice.setTreatment(treatment);
        notice.setIsChecked(false);

        notice.setNoticeDate(LocalDateTime.now());

        return notice;
    }

    public static Notice createNotice2(Account account, Treatment treatment, NoticeType type, String content){
        Notice notice = new Notice();
        notice.setAccount(account);
        notice.setContent(content);
        notice.setType(type);
        notice.setTreatment(treatment);
        notice.setIsChecked(false);

        notice.setNoticeDate(LocalDateTime.now());

        return notice;
    }

}
