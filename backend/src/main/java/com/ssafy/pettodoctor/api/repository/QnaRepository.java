package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Admin;
import com.ssafy.pettodoctor.api.domain.Qna;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QnaRepository {
    private final EntityManager em;

    // == 등록 == //
    public void save(Qna qna){
        em.persist(qna);
    }
    // == 조회 == //
    // 전체 조회
    public List<Qna> findAll(){
        return em.createQuery("select q from Qna q order by q.createTime", Qna.class)
                .getResultList();
    }

    // 질문자 조회
    public List<Qna> findByAccountId(Long id){
        return em.createQuery("select q from Qna q join q.account a where a.id = :id", Qna.class)
                .setParameter("id", id)
                .getResultList();
    }

    // 관리자 조회
    public List<Qna> findByAdminId(Long id){
        return em.createQuery("select q from Qna q join q.admin a where a.id = :id", Qna.class)
                .setParameter("id", id)
                .getResultList();
    }

    // 제목 조회
    public List<Qna> findByTitle(String title){
        return em.createQuery("select q from Qna q where q.title like concat('%',:title,'%')", Qna.class)
                .setParameter("title", title)
                .getResultList();
    }

    // == 수정 == //
    // 내용 수정
    public Qna modifyQna(Long id, String title, String content){
        Qna qna = em.find(Qna.class, id);
        if(title != null && !title.equals("null"))
            qna.setTitle(title);

        if(content != null && !content.equals("null"))
            qna.setContent(content);

        return qna;
    }

    // 답변 등록 or 수정
    public Qna updateReply(Long qnaId, Admin admin, String reply){
        Qna qna = em.find(Qna.class, qnaId);

        qna.setIsReplied(true);
        qna.setAdmin(admin);
        qna.setReply(reply);
        qna.setReplyTime(LocalDateTime.now());

        return qna;
    }

    // == 삭제 == //
    public void deleteQna(Long id){
        em.createQuery("delete from Qna q where q.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

}
