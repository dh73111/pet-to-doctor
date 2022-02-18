package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Rollback(false)
@Transactional
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
//        Assertions.assertThat(userRepository.isDuplicated(u2.)).isEqualTo(true);
    }

    @Test
    public void 아이디로_유저찾기() {
        User u1 = new User();
        userRepository.save(u1);

        Assertions.assertThat(userRepository.findById(u1.getId())).isEqualTo(u1);
    }

    @Test
    @Transactional
    public void 만료된_유저아이디찾기() {
        User u1 = new User();
        User u2 = new User();
        User u3 = new User();
        u1.setIsCertificated(false);
        u2.setIsCertificated(false);
        u3.setIsCertificated(true);
        userRepository.save(u1);
        userRepository.save(u2);
        userRepository.save(u3);
        LocalDate expiredDate = LocalDate.now().minusDays(100);
        u1.setJoinDate(expiredDate);
        u3.setJoinDate(expiredDate);

        List<Long> exUsers = userRepository.findUserIdOfExpiredUsers(7);
        List<Long> u1List = new ArrayList<>();
        u1List.add(u1.getId());

        Assertions.assertThat(exUsers).isEqualTo(u1List);
    }


}