package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.repository.DoctorRepository;
import com.ssafy.pettodoctor.api.request.DoctorPostReq;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public List<Doctor> findByHospitalId(Long id){
        return doctorRepository.findByHospitalId(id);
    }

    public Doctor findById(Long id) {
        return doctorRepository.findById(id);
    }

    @Transactional
    public void registerDoctor(DoctorPostReq doctorInfo){
        Doctor doctor = Doctor.createDoctor(
                doctorInfo.getEmail(),
                doctorInfo.getName(),
                doctorInfo.getPassword(),
                doctorInfo.getTel(),


                doctorInfo.getPysicianLicenseNumber(),
                doctorInfo.getSpecialty(),
                doctorInfo.getPrice()

                // 병원은 어캐 받지
//                doctorInfo.get
        );

        doctorRepository.save(doctor);
    }


    public Boolean isCheck(String password){
        return doctorRepository.isCheck(password);
    }

    @Transactional
    public Optional<Doctor> updatePassword(Long doctor_id, String password) {
        Optional<Doctor> updateDoctor = Optional.ofNullable(doctorRepository.findById(doctor_id));

        updateDoctor.ifPresent(selectDoctor -> {
            selectDoctor.setPassword(password);

            doctorRepository.save(selectDoctor);
        });

        return updateDoctor;
    }
}
