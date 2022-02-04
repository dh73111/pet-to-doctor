package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;
//import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Pet {
    @Id @GeneratedValue
    @Column(name="pet_id")
    private Long id;

    private String name;
    private LocalDate birthDate;
    private String species;
    private String weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    //== 생성 메소드 ==//
    public static Pet createPet(String name, LocalDate birthDate, String species, String weight, User user){
        Pet pet = new Pet();
        pet.setName(name);
        pet.setBirthDate(birthDate);
        pet.setSpecies(species);
        pet.setWeight(weight);
        pet.setUser(user);

        return pet;
    }

}
