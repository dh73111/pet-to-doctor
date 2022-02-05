package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Pet;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class PetRes {
    private Long id;
    private String name;
    private LocalDate birthDate;
    private String species;
    private String weight;
    private Long userId;
    private String profileImgUrl;

    public PetRes(Long id, String name, LocalDate birthDate, String species, String weight, Long userId, String profileImgUrl) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.species = species;
        this.weight = weight;
        this.userId = userId;
        this.profileImgUrl = profileImgUrl;
    }

    public static PetRes convertToPetRes(Pet p) {
        return new PetRes(p.getId(),
                p.getName(),
                p.getBirthDate(),
                p.getSpecies(),
                p.getWeight(),
                p.getUser().getId(),
                p.getProfileImgUrl());
    }

    public static List<PetRes> convertToPetResList(List<Pet> petList) {
        List<PetRes> petResList = new ArrayList<>();
        for (Pet p : petList) {
            petResList.add(convertToPetRes(p));
        }
        return petResList;
    }


}
