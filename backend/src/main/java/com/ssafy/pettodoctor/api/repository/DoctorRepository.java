package com.ssafy.pettodoctor.api.repository;


import com.ssafy.pettodoctor.api.domain.Doctor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class DoctorRepository {
    private final EntityManager em;

    public void save(Doctor doctor){
        em.persist(doctor);
    }

    public Doctor findById(Long doctor_id) {
        return em.find(Doctor.class, doctor_id);
    }

    public Boolean isCheck(String password) {
        try {
            em.createQuery("select d from Doctor d where d.password = :password", Doctor.class)
                    .setParameter("password", password)
                    .getSingleResult();
        } catch (NoResultException e) {
            return false;
        }
        return true;
    }
}
