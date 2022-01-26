package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

}
