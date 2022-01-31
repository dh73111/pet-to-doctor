package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TreatmentRepositry {
    private final EntityManager em;

    public Treatment findByTreatmentId(Long id){
        return em.find(Treatment.class, id);
    }

    public List<Treatment> findByUserId(Long id){
        return em.createQuery("select t from Treatment t join t.user u where u.id = :id",
                Treatment.class)
                .setParameter("id", id)
                .getResultList();
    }

    public List<Treatment> findByDoctorId(Long id){
        return em.createQuery("select t from Treatment t join t.doctor d where d.id = :id",
                        Treatment.class)
                .setParameter("id", id)
                .getResultList();
    }

    public Long registerTreatment(TreatmentPostReq treatmentPostReq
            , Doctor doctor, User user, Hospital hospital) {
        Treatment treatment = Treatment.createTreatment(treatmentPostReq, doctor, user, hospital);
        em.persist(treatment);
        return treatment.getId();
    }

    public Treatment updateTreatment(Long id, TreatmentType type){
        Treatment treatment = em.find(Treatment.class, id);
        treatment.setType(type);
        return treatment;
    }
}
