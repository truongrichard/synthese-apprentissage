package com.synthese;

import com.synthese.service.InsertDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringBootDataMongodbApplication {

	@Autowired
	private InsertDataService service;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootDataMongodbApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(){
		return args -> service.insertExercise();
	}

}
