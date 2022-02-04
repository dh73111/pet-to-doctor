package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepository {
    private final EntityManager em;

    public List<Schedule> findAllByDoctorId(Long id){
        return em.createQuery("select s from Schedule s join s.doctor d where d.id = :id"
                , Schedule.class)
                .setParameter("id", id)
                .getResultList();
    }

    public Schedule findOneByDoctorId(Long id, Integer plusDay){
        return em.createQuery("select s from Schedule s join s.doctor d where d.id = :id and s.plusDay = :plusDay"
                , Schedule.class)
                .setParameter("id", id)
                .setParameter("plusDay", plusDay)
                .getSingleResult();
    }

    public Schedule updateOneByDoctorId(Long id, Integer plusDay, String bitmask){
        Schedule schedule = findOneByDoctorId(id, plusDay);
        schedule.setBitmask(bitmask);
        return schedule;
    }
}
