package com.ssafy.pettodoctor.api.repository;


import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.request.NoticePostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeRepository {
    private final EntityManager em;

    public void save(Notice notice) {em.persist(notice);}

    public Notice findByNoticeId(Long id){
        return em.find(Notice.class, id);
    }

    public Notice findBytreatmentId(Long id) {
        return em.createQuery("select n from Notice n where n.treatment.id = :id", Notice.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    public Long registerNotice(NoticePostReq noticeInfo, Account account, Treatment treatment) {
        Notice notice = Notice.createNotice(account, treatment, noticeInfo);
        em.persist(notice);
        return notice.getId();
    }

    public Notice updateNotice(Long noticeId, NoticeType noticeType) {
        Notice notice = em.find(Notice.class, noticeId);

        // 알림 type에 따라 content 및 url 내용 다르게 업데이트
        if(noticeType.equals(NoticeType.RESERVATION)) { // 에약
            notice.setContent("예약이 완료되었습니다.");
            notice.setUrl("https://");
        }
        else if(noticeType.equals(NoticeType.DELIVERY)) { // 배송
            notice.setContent("처방전이 등록되었습니다. 결제를 진행해 주세요");
            notice.setUrl("https://");
        }
        else if(noticeType.equals(NoticeType.NOTIFICATION)){
            notice.setContent("운송장이 등록되었습니다.");
            notice.setUrl("https://");

        }
        notice.setType(noticeType);
        notice.setNoticeDate(LocalDateTime.now());
        notice.setIsChecked(false);
        return notice;
    }

    public Notice updateCheckInfo(Long noticeId) {
        Notice notice = em.find(Notice.class, noticeId);
        notice.setIsChecked(true);
        return notice;
    }

    public List<Notice> findByNotice(Long accountId) {
        return em.createQuery("select n from Notice n where n.account.id = :id", Notice.class)
                .setParameter("id", accountId)
                .getResultList();
    }

}
