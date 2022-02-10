package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Hospital;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class HospitalRepository {
    private final EntityManager em;

    public Hospital findById(Long id) {
        return em.find(Hospital.class, id);
    }

    public List<Hospital> findByDongCode(String dongCode){
        return em.createQuery("select h from Hospital h where h.dongCode = :dongCode", Hospital.class)
                .setParameter("dongCode", dongCode)
                .getResultList();
    }

    public List<Hospital> findByName(String name){
        return em.createQuery("select h from Hospital h where h.name like concat('%',:name,'%')"
                ,Hospital.class)
                .setParameter("name", name)
                .getResultList();
    }
}
