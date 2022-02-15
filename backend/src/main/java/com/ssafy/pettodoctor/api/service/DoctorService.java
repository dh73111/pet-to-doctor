package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.repository.DoctorRepository;
import com.ssafy.pettodoctor.api.request.DoctorPostReq;

import com.ssafy.pettodoctor.common.util.PasswordUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final PasswordUtil passwordUtil;

    @Value("${profileImg.path}")
    private String uploadFolder;

    public List<Doctor> findByHospitalId(Long id){
        return doctorRepository.findByHospitalId(id);
    }

    public Doctor findById(Long id) {
        return doctorRepository.findById(id);
    }

    @Transactional
    public void registerDoctor(DoctorPostReq doctorInfo){
        byte[] salt = PasswordUtil.getNextSalt();
        String hash = new String(PasswordUtil.hash(doctorInfo.getPassword().toCharArray(), salt));

        Doctor doctor = Doctor.createDoctor(
                doctorInfo.getEmail(),
                doctorInfo.getName(),
                hash,
                doctorInfo.getTel(),
                doctorInfo.getVeterinarianLicenseNumber(),
                doctorInfo.getSpecialty(),
                doctorInfo.getPrice(),

                salt
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

    @Transactional
    public void updateProfile(Long doctorId, MultipartFile multipartFile) {
        Doctor doctor = doctorRepository.findById(doctorId);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String imageFileName = "doctor_" + doctor.getId() + "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        if (multipartFile.getSize() != 0) { // 파일이 업로드 되었는지 확인
            try {
                if (doctor.getProfileImgUrl() != null) { // 이미 프로필 사진이 있을 경우
                    File file = new File(uploadFolder + doctor.getProfileImgUrl());
                    file.delete(); // 원래 파일 삭제
                }
                Files.write(imageFilePath, multipartFile.getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }
            doctor.setProfileImgUrl(imageFileName);
        }
    }
}
