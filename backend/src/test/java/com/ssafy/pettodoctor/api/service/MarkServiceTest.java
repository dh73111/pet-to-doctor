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

import java.util.ArrayList;
import java.util.List;

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

        Mark mark = markService.addMark(u1, hospital.getId()).get();

        Assertions.assertThat(mark.getUser()).isEqualTo(u1);
    }

    @Transactional
    @Test         //hospital 없어서 cascade켜놓고 돌리는중
    public void 유저마크리스트() {
        UserCommonSignupPostReq ur1 = new UserCommonSignupPostReq();
        User user = userService.signup(ur1);
        Hospital hospital = new Hospital();
        Mark mark1 = markService.addMark(user, hospital.getId()).get();
        Mark mark2 = markService.addMark(user, hospital.getId()).get();

        List<Mark> getMarks = markService.getMarksOfUser(user);

        List<Mark> madenMarks = new ArrayList<>();
        madenMarks.add(mark1);
        madenMarks.add(mark2);

        Assertions.assertThat(getMarks).isEqualTo(madenMarks);
    }

    @Transactional
    @Test         //hospital 없어서 cascade켜놓고 돌리는중
    public void 유저마크삭제() {
        UserCommonSignupPostReq ur1 = new UserCommonSignupPostReq();
        User user = userService.signup(ur1);
        Hospital hospital = new Hospital();
        Mark mark1 = markService.addMark(user, hospital.getId()).get();
        Mark mark2 = markService.addMark(user, hospital.getId()).get();
        Mark mark3 = new Mark();
        mark3.setId(5214l);

        markService.delete(user, mark1.getId());
        List<Mark> getMarks = markService.getMarksOfUser(user);

        List<Mark> madenMarks = new ArrayList<>();
        madenMarks.add(mark2);
        Assertions.assertThat(getMarks).isEqualTo(madenMarks);
    }
}
