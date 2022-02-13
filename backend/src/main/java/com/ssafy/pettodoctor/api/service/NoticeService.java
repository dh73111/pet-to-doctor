package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.repository.*;
import com.ssafy.pettodoctor.api.request.NoticePostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final DoctorRepository doctorRepository;
    private final TreatmentRepositry treatmentRepositry;

    @Transactional
    public Long registerNotice(NoticePostReq noticeInfo) {
        Account account = accountRepository.findById(noticeInfo.getAccountId());
//        Doctor doctor = doctorRepository.findById(noticeInfo.getDoctorId());
        Treatment treatment = treatmentRepositry.findByTreatmentId(noticeInfo.getTreatmentId());

        return noticeRepository.registerNotice(noticeInfo, account, treatment);
    }

    @Transactional
    public Notice updateNotice(Long noticeId, NoticeType noticeType) {
        return noticeRepository.updateNotice(noticeId, noticeType);
    }


    @Transactional
    public Notice updateCheckInfo(Long noticeId) {
        return noticeRepository.updateCheckInfo(noticeId);
    }

    @Transactional
    public List<Notice> findByAccountId(Long accountId) {
        return noticeRepository.findByNotice(accountId);
    }
}
