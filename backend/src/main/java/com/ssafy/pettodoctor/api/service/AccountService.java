package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Account;
import com.ssafy.pettodoctor.api.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccountService {
    private final AccountRepository accountRepository;

    public Account findByEmail(String email){
        return accountRepository.findByEmail(email);
    }

    public Account findById(Long id) {
        return accountRepository.findById(id);
    }


}
