package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.MarkRepository;
import com.ssafy.pettodoctor.api.repository.PetRepository;
import com.ssafy.pettodoctor.api.request.PetPostReq;
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
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PetService {
    private final PetRepository petRepository;

    @Value("${profileImg.path}")
    private String uploadFolder;

    @Transactional
    public Optional<Pet> addPet(User user, PetPostReq petReq) { // 테스트를 위해 user를 인자로 쓸 수 있게했지만 실제로 쓸때는 없앨 것.
        Pet pet = Pet.createPet(petReq.getName(), petReq.getBirthDate(), petReq.getSpecies(), petReq.getWeight(), user);
        petRepository.save(pet);
        return Optional.ofNullable(pet);
    }

    @Transactional
    public List<Pet> getPetsOfUser(User user) {
        return petRepository.findByUserId(user.getId());
    }

    @Transactional
    public Pet getPetById(Long id) {
        return petRepository.findOne(id).get();
    }

    @Transactional
    public void delete(User user, Long petId) {
        petRepository.delete(user, petId);
    }

    @Transactional
    public Pet change(Long petId, PetPostReq petReq) {
        Pet pet = petRepository.findOne(petId).get();

        if (petReq.getName() != null) {
            pet.setName(petReq.getName());
        }
        if (petReq.getSpecies() != null) {
            pet.setSpecies(petReq.getSpecies());
        }
        if (petReq.getWeight() != null) {
            pet.setWeight(petReq.getWeight());
        }
        if (petReq.getBirthDate() != null) {
            pet.setBirthDate(petReq.getBirthDate());
        }

        return pet;
    }

    @Transactional
    public void updateProfile(Long petId, MultipartFile multipartFile) {
        Pet pet = petRepository.findOne(petId).get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String imageFileName = "pet_" + pet.getId() + "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        if (multipartFile.getSize() != 0) { // 파일이 업로드 되었는지 확인
            try {
                if (pet.getProfileImgUrl() != null) { // 이미 프로필 사진이 있을 경우
                    File file = new File(uploadFolder + pet.getProfileImgUrl());
                    file.delete(); // 원래 파일 삭제
                }
                Files.write(imageFilePath, multipartFile.getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }
            pet.setProfileImgUrl(imageFileName);
        }
    }
}
