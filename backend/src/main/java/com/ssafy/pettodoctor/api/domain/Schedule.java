package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="schedules")
@Getter
@Setter
public class Schedule {
    @Id @GeneratedValue
    @Column(name = "schedules_id")
    private Long id;

    private Integer plusDay;
    private String bitmask;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
