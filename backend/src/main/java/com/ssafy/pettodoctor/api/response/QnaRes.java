package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Account;
import com.ssafy.pettodoctor.api.domain.Admin;
import com.ssafy.pettodoctor.api.domain.Qna;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class QnaRes {
    private Long qnaId;
    private String title;
    private String content;
    private String reply;
    private LocalDateTime createTime;
    private LocalDateTime replyTime;
    private Boolean isReplied;
    private Long accountId;
    private Long adminId;

    public QnaRes(){}

    public QnaRes(Long qnaId, String title, String content, String reply, LocalDateTime createTime, LocalDateTime replyTime, Boolean isReplied, Long accountId, Long adminId) {
        this.qnaId = qnaId;
        this.title = title;
        this.content = content;
        this.reply = reply;
        this.createTime = createTime;
        this.replyTime = replyTime;
        this.isReplied = isReplied;
        this.accountId = accountId;
        this.adminId = adminId;
    }

    public static QnaRes convertTo(Qna qna){
        return new QnaRes(qna.getId(), qna.getTitle(), qna.getContent()
                , qna.getReply(), qna.getCreateTime(), qna.getReplyTime()
                , qna.getIsReplied()
                , qna.getAccount() != null ? qna.getAccount().getId() : null
                , qna.getAdmin() != null ? qna.getAdmin().getId() : null);
    }

    public static List<QnaRes> convertToList(List<Qna> qnas){
        ArrayList<QnaRes> qnaResList = new ArrayList<>();
        for(Qna qna: qnas){
            qnaResList.add(QnaRes.convertTo(qna));
        }
        return qnaResList;
    }
}
