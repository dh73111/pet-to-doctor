package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Prescription;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class PrescriptionRepository {
    private final EntityManager em;

    public void save(Prescription prescription){
        em.persist(prescription);
    }

    public Prescription findById(Long id){
        return em.find(Prescription.class, id);
    }
}
