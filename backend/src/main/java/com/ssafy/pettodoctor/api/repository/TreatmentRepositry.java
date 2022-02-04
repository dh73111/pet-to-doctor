package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.request.PrescriptionPostReq;
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

    public List<Treatment> findByUserId(Long id, TreatmentType treatmentType){
        return em.createQuery("select t from Treatment t join t.user u where u.id = :id and t.type = :treatmentType",
                Treatment.class)
                .setParameter("id", id)
                .setParameter("treatmentType", treatmentType)
                .getResultList();
    }

    public List<Treatment> findByDoctorId(Long id, TreatmentType treatmentType){
        return em.createQuery("select t from Treatment t join t.doctor d where d.id = :id and t.type =: treatmentType",
                        Treatment.class)
                .setParameter("id", id)
                .setParameter("treatmentType", treatmentType)
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

    public Treatment setPrescription(Long treatmentId, Prescription certificateInfo) {
        Treatment treatment = em.find(Treatment.class, treatmentId);
        treatment.setPrescription(certificateInfo);
        return treatment;
    }
}
