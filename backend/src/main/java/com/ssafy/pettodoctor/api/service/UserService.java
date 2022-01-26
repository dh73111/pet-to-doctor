package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public void join(User user) {
        userRepository.save(user);
    }
}
