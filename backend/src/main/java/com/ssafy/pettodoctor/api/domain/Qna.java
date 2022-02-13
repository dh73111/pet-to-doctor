package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Qna {
    @Id @GeneratedValue
    private Long id;

    private String title;
    private String content;
    private String reply;
    private LocalDateTime createTime;
    private LocalDateTime replyTime;
    private Boolean isReplied;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    public Qna(){};

    // == 생성 메소드 == //
    public static Qna createQna(Account account, String title, String content){
        Qna qna = new Qna();

        qna.setAccount(account);
        qna.setTitle(title);
        qna.setContent(content);
        qna.setCreateTime(LocalDateTime.now());
        qna.setIsReplied(false);

        return qna;
    }




}
