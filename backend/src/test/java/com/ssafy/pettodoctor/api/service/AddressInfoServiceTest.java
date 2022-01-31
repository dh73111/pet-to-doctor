package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.AddressInfo;
import com.ssafy.pettodoctor.api.repository.AddressInfoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AddressInfoServiceTest {
    @Autowired
    EntityManager em;
    @Autowired
    AddressInfoRepository addressInfoRepository;

    @Test
    public void 동검색(){
        AddressInfo ai = new AddressInfo();
        ai.setAddress("별내동");
        ai.setDongCode("12345");
        ai.setLatitude("12");

        em.persist(ai);
        em.flush();
        em.clear();

        Assertions.assertEquals(ai.getLatitude(), addressInfoRepository.findByAddress("별내").get(0).getLatitude());
    }
}