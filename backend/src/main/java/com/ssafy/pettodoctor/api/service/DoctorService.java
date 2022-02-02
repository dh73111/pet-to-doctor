package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.repository.DoctorRepository;
import com.ssafy.pettodoctor.api.request.DoctorPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DoctorService {
    private final DoctorRepository doctorRepository;

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

    public Object findById(Long doctor_id) {
        return doctorRepository.findById(doctor_id);
    }

    public Boolean isCheck(String password){
        return doctorRepository.isCheck(password);
    }

    @Transactional
    public Optional<Doctor> updatePassword(Long doctor_id, String password) {
        Optional<Doctor> updateDoctor = Optional.ofNullable(doctorRepository.findById(doctor_id));

        System.out.println("!111");
        updateDoctor.ifPresent(selectDoctor -> {
            selectDoctor.setPassword(password);

            doctorRepository.save(selectDoctor);
        });

        return updateDoctor;
    }
}
