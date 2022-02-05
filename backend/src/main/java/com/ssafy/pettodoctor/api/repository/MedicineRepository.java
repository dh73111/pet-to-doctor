package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Medicine;
import com.ssafy.pettodoctor.api.domain.Prescription;
import com.ssafy.pettodoctor.api.request.MedicineReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MedicineRepository {
    private final EntityManager em;

    public List<Medicine> findByPrescriptionId(Long prescriptionId){
        return em.createQuery("select m from Medicine m join m.prescription p where p.id = :prescriptionId"
                , Medicine.class)
                .setParameter("prescriptionId", prescriptionId)
                .getResultList();
    }

    public void saveMedicines(Prescription prescription, List<MedicineReq> medicineReqs){
        for(MedicineReq mr : medicineReqs){
            em.persist(Medicine.createMedicine(prescription, mr.getName(), mr.getPrice()));
        }
    }
}
