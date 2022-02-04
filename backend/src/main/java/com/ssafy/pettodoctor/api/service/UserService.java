package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.PetRepository;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
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

    public Boolean isDuplicated(String email) {
        User findUser = userRepository.findByEmail(email);

        if (findUser == null) {
            return false;
        } else return true;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
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
}
