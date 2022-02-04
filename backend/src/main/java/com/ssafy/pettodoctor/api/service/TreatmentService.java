package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.repository.*;
import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TreatmentService {
    private final TreatmentRepositry treatmentRepositry;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final PrescriptionRepository prescriptionRepository;

    public Treatment findById(Long id){
        return treatmentRepositry.findByTreatmentId(id);
    }

    public List<Treatment> findByDoctorId(Long id, TreatmentType treatmentType){
        return treatmentRepositry.findByDoctorId(id, treatmentType);
    }

    public List<Treatment> findByUserId(Long id, TreatmentType treatmentType){
        return treatmentRepositry.findByUserId(id, treatmentType);
    }

    @Transactional
    public Long registerTreatment(TreatmentPostReq treatmentPostReq) {
        Doctor doctor = doctorRepository.findById(treatmentPostReq.getDoctorId());
        User user = userRepository.findById(treatmentPostReq.getUserId()).get();
        Hospital hospital = hospitalRepository.findById(treatmentPostReq.getHospitalId());

        return treatmentRepositry.registerTreatment(treatmentPostReq, doctor, user, hospital);
    }

    @Transactional
    public Treatment updateTreatment(Long id, TreatmentType type){
        return treatmentRepositry.updateTreatment(id, type);
    }
}
