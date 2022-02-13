package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SpringBootTest
@Transactional
class QnaRepositoryTest {
    @Autowired
    EntityManager em;

    @Autowired
    QnaRepository qnaRepository;

    @Autowired
    AdminRepository adminRepository;

    @Test
    public void 큐엔에이_등록_조회_테스트(){
        // 질문자, 관리자 등록
        Admin admin = Admin.createAdmin("aaa", "aaa", "aaa", "aaa");
        User user = User.createCommonUser("bbb", "bbb", "bbb", new Address());
        em.persist(admin);
        em.persist(user);
        em.flush();
        em.clear();

        // qna 생성
        Qna qna1 = Qna.createQna(user, "title", "content");
        Qna qna2 = Qna.createQna(user, "title", "content");
        Qna qna3 = Qna.createQna(user, "1111", "content");

        // qna 등록
        em.persist(qna1);
        em.persist(qna2);
        em.persist(qna3);

        em.flush();
        em.clear();

        // 테스트
        Assertions.assertEquals(3, qnaRepository.findAll().size(), "전체조회 실패");
        Assertions.assertEquals(3, qnaRepository.findByAccountId(user.getId()).size(), "질문자 조회 실패");
        Assertions.assertEquals(2, qnaRepository.findByTitle("titl").size(), "제목 조회 실패");
        Assertions.assertEquals(0, qnaRepository.findByAdminId(admin.getId()).size(), "관리자 조회 실패");
    }

    @Test
    public void 큐엔에이_수정_테스트(){
        // 질문자, 관리자 등록
        Admin admin = Admin.createAdmin("aaa", "aaa", "aaa", "aaa");
        User user = User.createCommonUser("bbb", "bbb", "bbb", new Address());
        em.persist(admin);
        em.persist(user);
        em.flush();
        em.clear();

        // qna 생성
        Qna qna1 = Qna.createQna(user, "title", "content");
        Qna qna2 = Qna.createQna(user, "title", "content");
        Qna qna3 = Qna.createQna(user, "1111", "content");
        Qna qna4 = Qna.createQna(user, "title", "content");

        // qna 등록
        em.persist(qna1);
        em.persist(qna2);
        em.persist(qna3);
        em.persist(qna4);

        em.flush();
        em.clear();


        // 질문 수정
        qnaRepository.modifyQna(qna1.getId(),"t1", "con1");
        qnaRepository.modifyQna(qna2.getId(),"null", null);
        qnaRepository.modifyQna(qna4.getId(), null, "con4");

        // 답변 등록
        qnaRepository.updateReply(qna3.getId(), admin, "reply1");
        qnaRepository.updateReply(qna4.getId(), admin, "reply4");


        // 테스트
        Assertions.assertEquals(2, qnaRepository.findByTitle("titl").size(), "질문 수정 실패1");
        Assertions.assertEquals("con1", qnaRepository.findByTitle("t1").get(0).getContent(), "질문 수정 실패2");
        Assertions.assertEquals(2, qnaRepository.findByAdminId(admin.getId()).size(), "답변 등록 실패");

    }

    @Test
    public void 큐엔에이_삭제_테스트(){
        // 질문자, 관리자 등록
        Admin admin = Admin.createAdmin("aaa", "aaa", "aaa", "aaa");
        User user = User.createCommonUser("bbb", "bbb", "bbb", new Address());
        em.persist(admin);
        em.persist(user);
        em.flush();
        em.clear();

        // qna 생성
        Qna qna1 = Qna.createQna(user, "title", "content");
        Qna qna2 = Qna.createQna(user, "title", "content");
        Qna qna3 = Qna.createQna(user, "1111", "content");

        // qna 등록
        em.persist(qna1);
        em.persist(qna2);
        em.persist(qna3);

        em.flush();
        em.clear();

        // 삭제
        qnaRepository.deleteQna(qna1.getId());

        // 테스트
        Assertions.assertEquals(2, qnaRepository.findAll().size(),"삭제 실패1");
        Assertions.assertEquals(1, qnaRepository.findByTitle("titl").size(),"삭제 실패2");

    }
}