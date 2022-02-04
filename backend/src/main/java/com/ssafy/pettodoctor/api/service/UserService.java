package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.PetRepository;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.request.UserChangeReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import com.ssafy.pettodoctor.api.request.UserPasswordChangeReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
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
        if (user.getPassword().equals(inputPass)) {
            return true;
        }
        return false;
    }

    @Transactional
    public boolean changePassword(Long id, UserPasswordChangeReq upcr) {
        User user = userRepository.findById(id).get();
        if (upcr.getPassword().equals(upcr.getPasswordConf()) && user.getPassword().equals(upcr.getPassword())) {
            user.setPassword(upcr.getNewPassword());
            return true;
        }
        return false;
    }

    @Transactional
    public String getUserPassByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user.getPassword();
    }
}
