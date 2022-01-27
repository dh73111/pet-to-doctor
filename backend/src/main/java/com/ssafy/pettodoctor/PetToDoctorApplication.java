package com.ssafy.pettodoctor;

import com.ssafy.pettodoctor.api.domain.TestTable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
//@SpringBootApplication
public class PetToDoctorApplication {

	public static void main(String[] args) {

		SpringApplication.run(PetToDoctorApplication.class, args);
	}

}
