package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class MarkServiceTest {

    @Autowired
    private MarkService markService;
    @Autowired
    private UserService userService;


    @Transactional
    @Test
    public void 마크생성(){
        UserCommonSignupPostReq ur1 = new UserCommonSignupPostReq();
        User u1 = userService.signup(ur1);
        Hospital hospital = new Hospital();

        Mark mark = markService.addMark(u1, hospital);

        Assertions.assertThat(mark.getUser()).isEqualTo(u1);
    }
}
