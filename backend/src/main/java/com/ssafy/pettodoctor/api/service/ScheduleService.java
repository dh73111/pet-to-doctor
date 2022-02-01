package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Schedule;
import com.ssafy.pettodoctor.api.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public List<Schedule> findAllByDoctorId(Long id){
        return scheduleRepository.findAllByDoctorId(id);
    }

    public Schedule findOneByDoctorId(Long id, Integer plusDay){
        return scheduleRepository.findOneByDoctorId(id, plusDay);
    }

    @Transactional
    public Schedule updateOneByDoctorId(Long id, Integer plusDay, String bitmask){
        return scheduleRepository.updateOneByDoctorId(id, plusDay, bitmask);
    }
}
