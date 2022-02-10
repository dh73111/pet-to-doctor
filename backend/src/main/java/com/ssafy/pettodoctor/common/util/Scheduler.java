package com.ssafy.pettodoctor.common.util;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Scheduler {
    private final ScheduleRepository scheduleRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final UserCertificationRepository userCertificationRepository;

    // "0 * * * * ?" -> 매분 0초에 실행되는 테스트용 "0 0 0 * * ?" -> 매일 0시에 실행되는 실사용 용
    @Scheduled(cron = "0 * * * * ?")
    @Transactional
    public void updateDailySchedule(){
        try{
            scheduleRepository.dailyUpdate(15);
        } catch (Exception e){
            e.printStackTrace();
        }

    }

    @Scheduled(cron = "0 * * * * ?")
    @Transactional
    public void deleteExpiredUser(){
        List<Long> userIdOfExpiredUsers = userRepository.findUserIdOfExpiredUsers(7);

        for (Long userId : userIdOfExpiredUsers) {
            petRepository.deleteAllPetsOfUser(userId);
            userCertificationRepository.deleteByUserId(userId);
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()){
                userRepository.delete(user.get());
            }
            accountRepository.deleteById(userId);
        }

    }
}
