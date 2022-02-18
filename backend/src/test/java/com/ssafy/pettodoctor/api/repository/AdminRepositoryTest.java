package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Admin;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AdminRepositoryTest {
    @Autowired
    EntityManager em;

    @Autowired
    AdminRepository adminRepository;

    @Test
    public void 관리자_조회_테스트(){
        Admin admin = Admin.createAdmin("aaa", "aaa", "aaa", "aaa");

        em.persist(admin);
        em.flush();
        em.clear();

        Assertions.assertEquals("aaa", adminRepository.findById(admin.getId()).getEmail(), "관리자 조회 실패");


    }
}