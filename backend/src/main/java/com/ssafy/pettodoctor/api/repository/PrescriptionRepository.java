package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Prescription;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

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

    public List<Prescription> findByIdList(Long doctor_id, TreatmentType type) {
        return em.createQuery("select p from Prescription p where p.id = " +
                                "(select t.prescription.id from Treatment t where t.doctor.id = :doctor_id and t.type = :type) ",
                Prescription.class)
                .setParameter("doctor_id",doctor_id)
                .setParameter("type",type)
                .getResultList();
    }
}
