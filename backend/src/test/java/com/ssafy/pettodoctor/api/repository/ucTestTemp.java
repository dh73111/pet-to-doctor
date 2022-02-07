package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.TestTable;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.domain.UserCertification;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SpringBootTest
public class ucTestTemp {
    @Autowired
    private UserCertificationRepository userCertificationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PetRepository petRepository;

    @Test
    @Rollback(value = false)
    @Transactional
    public void 케스케이드(){
        Optional<User> byId = userRepository.findById(207l);
        userRepository.delete(byId.get());

        Pet one = petRepository.findOne(208l).orElse(null);
        Assertions.assertThat(one).isEqualTo(null);
    }




}
