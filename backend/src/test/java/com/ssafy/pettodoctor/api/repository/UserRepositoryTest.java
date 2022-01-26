package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Rollback(false)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void 중복확인(){
        // given
        User u1 = new User();
        u1.setEmail("aaa");
        userRepository.save(u1);

        User u2 = new User();
        u2.setEmail("aaa");
//        userRepository.save(u2);
        // when

        // then
        Assertions.assertThat(userRepository.isDuplicated(u2)).isEqualTo(true);
    }

}