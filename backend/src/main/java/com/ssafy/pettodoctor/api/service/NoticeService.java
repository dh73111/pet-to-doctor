package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.repository.AccountRepository;
import com.ssafy.pettodoctor.api.repository.DoctorRepository;
import com.ssafy.pettodoctor.api.repository.NoticeRepository;
import com.ssafy.pettodoctor.api.repository.UserRepository;
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

    @Transactional
    public Long registerNotice(NoticePostReq noticeInfo) {
        Account account = accountRepository.findById(noticeInfo.getAccountId());

        return noticeRepository.registerNotice(noticeInfo, account);
    }

    @Transactional
    public Notice updateNotice(Long noticeId, NoticeType noticeType) {
//        Account account = accountRepository.findById(noticeRepository.findByNoticeId(noticeId).getAccount().getId());
//        return noticeRepository.updateNotice(noticeId, noticeType,account.getAuthority());
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
