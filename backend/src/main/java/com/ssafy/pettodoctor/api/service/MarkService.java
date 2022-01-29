package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.auth.AccountUserDetails;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.MarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MarkService {

    private final MarkRepository markRepository;
    private final UserService userService;

    @Transactional
    public Mark addMark(User user, Hospital hospital) {
        Mark mark = new Mark();

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            user = userService.getUserById(userDetails.getUserId());
        }

        mark.setUser(user);
        mark.setHospital(hospital);
        markRepository.save(mark);

        return mark;
    }

}
