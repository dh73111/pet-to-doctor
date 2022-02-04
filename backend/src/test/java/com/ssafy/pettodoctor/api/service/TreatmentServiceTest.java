package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class TreatmentServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    DoctorService ds;
    @Autowired
    UserService us;
    @Autowired
    HospitalService hs;
    @Autowired
    TreatmentService ts;

    @Test
    public void 진료예약테스트(){
        User u = new User();
        Doctor d = new Doctor();
        Hospital h = new Hospital();
        d.setHospital(h);
        TreatmentPostReq tpr2 = new TreatmentPostReq();
        tpr2.setType(TreatmentType.RES_REQUEST);
        Treatment t = Treatment.createTreatment(tpr2, d, u ,h);
        t.setPetName("고양이");
        em.persist(u);
        em.persist(d);
        em.persist(h);
        em.persist(t);
        em.flush();
        em.clear();

        Assertions.assertEquals("고양이", ts.findById(t.getId()).getPetName());
        Assertions.assertEquals("고양이", ts.findByUserId(t.getUser().getId(), TreatmentType.RES_REQUEST).get(0).getPetName());
        Assertions.assertEquals("고양이", ts.findByDoctorId(t.getDoctor().getId(), TreatmentType.RES_REQUEST).get(0).getPetName());
        ts.updateTreatment(t.getId(), TreatmentType.RES_REJECT);
        Assertions.assertEquals(TreatmentType.RES_REJECT, ts.findById(t.getId()).getType());

        TreatmentPostReq tpr = new TreatmentPostReq();
        tpr.setDoctorId(d.getId());
        tpr.setUserId(u.getId());
        tpr.setHospitalId(h.getId());
        tpr.setType(TreatmentType.RES_REQUEST);
        ts.registerTreatment(tpr);
        ts.registerTreatment(tpr);

        Assertions.assertEquals(2, ts.findByUserId(u.getId(), TreatmentType.RES_REQUEST).size());
    }
}