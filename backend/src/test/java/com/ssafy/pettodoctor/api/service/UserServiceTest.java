package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Rollback(false)
class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    @Transactional
    public void 회원가입(){
        // given
        UserCommonSignupPostReq ur1 = new UserCommonSignupPostReq();
        ur1.setEmail("aaa");
        UserCommonSignupPostReq ur2 = new UserCommonSignupPostReq();
        ur2.setEmail("bbb");
        ur2.setPets(new ArrayList<PetPostReq>());
        ur2.getPets().add(new PetPostReq());
        ur2.getPets().add(new PetPostReq());

        // when
        userService.signup(ur1);
        userService.signup(ur2);

        // then
//        Assertions.
    }

}