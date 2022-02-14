package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Admin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class AdminRepository {
    private final EntityManager em;

    // 조회
    public Admin findById(Long id){
        return em.find(Admin.class, id);
    }
}
