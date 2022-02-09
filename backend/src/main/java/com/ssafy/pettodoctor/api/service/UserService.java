package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.domain.UserCertification;
import com.ssafy.pettodoctor.api.repository.PetRepository;
import com.ssafy.pettodoctor.api.repository.UserCertificationRepository;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.request.UserChangeReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import com.ssafy.pettodoctor.api.request.UserPasswordChangeReq;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    @Value("${profileImg.path}")
    private String uploadFolder;

    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final UserCertificationRepository userCertificationRepository;

    @Transactional
    public User signup(UserCommonSignupPostReq signupInfo) {
        // 필수
        User user = User.createCommonUser(signupInfo.getEmail(),
                signupInfo.getName(), signupInfo.getPassword(), signupInfo.getAddress());
        // 선택
        user.setTel(signupInfo.getTel());

        userRepository.save(user);

        if(signupInfo.getPets() != null)
            for(PetPostReq pet : signupInfo.getPets()){
                Pet p = Pet.createPet(pet.getName(), pet.getBirthDate(), pet.getSpecies(), pet.getWeight(), user);
                petRepository.save(p);
            }
        return user;
    }

    @Transactional
    public Boolean isDuplicated(String email) {
        User findUser = userRepository.findByEmail(email);

        if (findUser == null) {
            return false;
        } else return true;
    }

    @Transactional
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Transactional
    public void deleteNowUser(User nowUser) {
        userRepository.delete(nowUser);
    }

    @Transactional
    public Optional<User> changeUser(Long userId, UserChangeReq urq) {
        User user = userRepository.findById(userId).get();
        if (urq.getName() != null) {
            user.setName(urq.getName());
        }
        if (urq.getAddress() != null) {
            user.setAddress(urq.getAddress());
        }
        if (urq.getTel() != null) {
            user.setTel(urq.getTel());
        }
        if (urq.getJoinDate() != null) {
            user.setJoinDate(urq.getJoinDate());
        }
        if (urq.getIsCertificated() != null) {
            user.setIsCertificated(urq.getIsCertificated());
        }
        return Optional.ofNullable(user);
    }

    @Transactional
    public boolean checkPassword(String inputPass, User user) {
        return user.getPassword().equals(inputPass);
    }

    @Transactional
    public boolean changePassword(Long id, UserPasswordChangeReq upcr) {
        User user = userRepository.findById(id).get();
        if (upcr.getNewPassword().equals(upcr.getNewPasswordConf()) && user.getPassword().equals(upcr.getPassword())) {
            user.setPassword(upcr.getNewPassword());
            return true;
        }
        return false;
    }

    public String getUserPassByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user.getPassword();
    }

    @Transactional
    public void updateProfile(Long userId, MultipartFile multipartFile) {
        User user = userRepository.findById(userId).get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String imageFileName = "user_" + user.getId() + "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        if (multipartFile.getSize() != 0) { // 파일이 업로드 되었는지 확인
            try {
                if (user.getProfileImgUrl() != null) { // 이미 프로필 사진이 있을 경우
                    File file = new File(uploadFolder + user.getProfileImgUrl());
                    file.delete(); // 원래 파일 삭제
                }
                Files.write(imageFilePath, multipartFile.getBytes());
            } catch (Exception e) {
                    e.printStackTrace();
            }
            user.setProfileImgUrl(imageFileName);
        }
    }

    @Transactional
    public void mailCertification(String certificationKey) {
        User user = userCertificationRepository.certificate(certificationKey).get();
        UserCertification uc = userCertificationRepository.findByKey(certificationKey).get();
        userCertificationRepository.delete(uc.getId());
        user.setIsCertificated(true);
    }
}
