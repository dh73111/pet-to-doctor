package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.PetRepository;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;

    @Transactional
    public void signup(UserCommonSignupPostReq signupInfo) {
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

    }

    public Boolean isDuplicated(String email) {
        return userRepository.isDuplicated(email);
    }
}
