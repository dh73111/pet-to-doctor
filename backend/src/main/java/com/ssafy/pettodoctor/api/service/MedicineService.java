package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Medicine;
import com.ssafy.pettodoctor.api.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineService {
    private final MedicineRepository medicineRepository;

    public List<Medicine> findByPrescriptionId(Long prescriptionId){
        return medicineRepository.findByPrescriptionId(prescriptionId);
    }
}
