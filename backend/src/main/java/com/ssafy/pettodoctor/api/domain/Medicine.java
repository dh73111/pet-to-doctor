package com.ssafy.pettodoctor.api.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Medicine {
    @Id @GeneratedValue
    @Column(name = "medicine_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    private String name;
    private Integer price;

    public Medicine(){}

    // 생성자 메소드
    public static Medicine createMedicine(Prescription prescription, String name, Integer price) {
        Medicine medicine = new Medicine();
        medicine.setPrescription(prescription);
        medicine.setName(name);
        medicine.setPrice(price);

        return medicine;
    }
}
