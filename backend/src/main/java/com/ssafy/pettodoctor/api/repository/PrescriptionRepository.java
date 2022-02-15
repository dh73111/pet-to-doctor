package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.PaymentType;
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

    public List<Prescription> findByDoctorIdAndType(Long doctor_id, TreatmentType type) {
        return em.createQuery("select p from Prescription p where p.id IN " +
                                "(select t.prescription.id from Treatment t where t.doctor.id = :doctor_id and t.type = :type)  ORDER BY p.id DESC ",
                Prescription.class)
                .setParameter("doctor_id",doctor_id)
                .setParameter("type",type)
                .getResultList();
    }

    public List<Prescription> findByDoctorId(Long doctor_id) {
        return em.createQuery("select p from Prescription p where p.id IN" +
                                "(select t.prescription.id from Treatment t where t.doctor.id = :doctor_id) ORDER BY p.id DESC ",
                        Prescription.class)
                .setParameter("doctor_id",doctor_id)
                .getResultList();
    }

//    public Prescription updatePaymentInfo(Long prescriptionId, PaymentType paymentType) {
//        Prescription prescription = em.find(Prescription.class, prescriptionId);
//        prescription.setType(paymentType);
//        return prescription;
//    }
}
