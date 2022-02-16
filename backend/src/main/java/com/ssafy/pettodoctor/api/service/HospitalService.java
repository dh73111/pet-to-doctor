package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
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

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HospitalService {
    private final HospitalRepository hospitalRepository;

    @Value("${profileImg.path}")
    private String uploadFolder;

    public Hospital findById(Long id){
        return hospitalRepository.findById(id);
    }

    public List<Hospital> findByDongCode(String dongCode){
        return hospitalRepository.findByDongCode(dongCode);
    }

    public List<Hospital> findByName(String name){
        return hospitalRepository.findByName(name);
    }

    public List<Hospital> findByDongName(String dongName){ return hospitalRepository.findByDongName(dongName); }

    public void updateProfile(Long hospitalId, MultipartFile multipartFile) {
        Hospital hospital = hospitalRepository.findById(hospitalId);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String imageFileName = "hospital_" + hospital.getId() + "_" + Long.toString(System.currentTimeMillis()) + "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        if (multipartFile.getSize() != 0){
            try{
                if (hospital.getProfileImgUrl() != null) {
                    File file = new File(uploadFolder + hospital.getProfileImgUrl());
                    file.delete();
                }
                Files.write(imageFilePath, multipartFile.getBytes());

            } catch (Exception e) {
                e.printStackTrace();
            }
            hospital.setProfileImgUrl(imageFileName);
        }

    }
}
