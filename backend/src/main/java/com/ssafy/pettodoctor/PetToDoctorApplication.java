package com.ssafy.pettodoctor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableScheduling
@SpringBootApplication
public class PetToDoctorApplication {

	public static void main(String[] args) {

		SpringApplication.run(PetToDoctorApplication.class, args);
	}

}
