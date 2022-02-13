package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Qna;
import com.ssafy.pettodoctor.api.repository.AccountRepository;
import com.ssafy.pettodoctor.api.repository.AdminRepository;
import com.ssafy.pettodoctor.api.repository.QnaRepository;
import com.ssafy.pettodoctor.api.request.QnaModReq;
import com.ssafy.pettodoctor.api.request.QnaRegReq;
import com.ssafy.pettodoctor.api.request.QnaReplyReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QnaService {
    private final QnaRepository qnaRepository;
    private final AdminRepository adminRepository;
    private final AccountRepository accountRepository;

    // == 등록 == //
    @Transactional
    public void registerQna(QnaRegReq qnaRegReq){
        Qna qna = Qna.createQna(accountRepository.findById(qnaRegReq.getAccountId())
                , qnaRegReq.getTitle(), qnaRegReq.getContent());
        qnaRepository.save(qna);
    }

    // == 조회 == //
    // 전체 조회
    public List<Qna> selectAll(){
        return qnaRepository.findAll();
    }
    // 질문자 조회
    public List<Qna> selectByAccount(Long id){
        return qnaRepository.findByAccountId(id);
    }
    // 관리자 조회
    public List<Qna> selectByAdmin(Long id){
        return qnaRepository.findByAdminId(id);
    }
    // 제목 조회
    public List<Qna> selectByTitle(String title){
        return qnaRepository.findByTitle(title);
    }
    // == 수정 == //
    // 내용 수정
    @Transactional
    public Qna modifyQna(Long qnaId, QnaModReq qnaModReq){
        return qnaRepository.modifyQna(qnaId
                , qnaModReq.getTitle(), qnaModReq.getContent());
    }
    // 답변 등록 or 수정
    @Transactional
    public Qna updateReply(Long qnaId, QnaReplyReq qnaReplyReq){
        return qnaRepository.updateReply(qnaId
                ,adminRepository.findById(qnaReplyReq.getAdminId())
                , qnaReplyReq.getReply());
    }

    // == 삭제 == //
    @Transactional
    public void deleteQna(Long id){
        qnaRepository.deleteQna(id);
    }

}
