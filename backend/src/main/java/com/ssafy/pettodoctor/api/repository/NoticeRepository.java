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

    public Long registerNotice(NoticePostReq noticeInfo, Account account) {
        Notice notice = Notice.createNotice(account, noticeInfo);
        em.persist(notice);
        return notice.getId();
    }

    public Notice updateNotice(Long noticeId, NoticeType noticeType) {
        Notice notice = em.find(Notice.class, noticeId);

        if(noticeType.equals(NoticeType.RESERVATION)) {
            notice.setContent("예약이 완료되었습니다.");
            notice.setUrl("https://");
        }
        else if(noticeType.equals(NoticeType.DELIVERY)) {
            notice.setContent("배송지를 입력해 주세요");
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
