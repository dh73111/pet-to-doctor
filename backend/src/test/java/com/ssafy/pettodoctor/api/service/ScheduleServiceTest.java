package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.Schedule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ScheduleServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    ScheduleService scheduleService;

    @Test
    public void 스케쥴테스트(){
        Doctor d = new Doctor();
        d.setName("김의사");

        Schedule s1 = new Schedule();
        s1.setPlusDay(1);
        s1.setBitmask("11111");
        s1.setDoctor(d);

        Schedule s2 = new Schedule();
        s2.setPlusDay(2);
        s2.setBitmask("00000");
        s2.setDoctor(d);

        em.persist(d);
        em.persist(s1);
        em.persist(s2);

        em.flush();
        em.clear();

        Assertions.assertEquals(2, scheduleService.findAllByDoctorId(d.getId()).size());
        Assertions.assertEquals("11111", scheduleService.findOneByDoctorId(d.getId(),1).getBitmask());
        scheduleService.updateOneByDoctorId(d.getId(),1, "00000");
        Assertions.assertEquals("00000", scheduleService.findOneByDoctorId(d.getId(),1).getBitmask());

    }
}