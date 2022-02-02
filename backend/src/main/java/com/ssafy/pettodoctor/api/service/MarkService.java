package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.MarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MarkService {

    private final MarkRepository markRepository;
    private final UserService userService;

    @Transactional
    public Optional<Mark> addMark(User user, Hospital hospital) { // 테스트를 위해 user를 인자로 쓸 수 있게했지만 실제로 쓸때는 없앨 것.

        Mark mark = new Mark();
        mark.setUser(user);
        mark.setHospital(hospital);     //hospital 서비스에서 가져오기
        mark = markRepository.save(mark);

        return Optional.ofNullable(mark);
    }

    @Transactional
    public List<Mark> getMarksOfUser(User user) {
        return markRepository.findByUserId(user.getId());

    }

    @Transactional
    public void delete(User user, Long markId) {
        markRepository.deleteById(user, markId);
    }

}
