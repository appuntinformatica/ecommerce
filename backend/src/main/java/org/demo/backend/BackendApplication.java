package org.demo.backend;

import org.demo.backend.component.FakerComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication(scanBasePackages = { 
				"io.jsonwebtoken.spring", 
				"org.demo.backend" 
			})
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Autowired
	private FakerComponent fakerComponent;

	@Override
	public void run(String... args) throws Exception {
		log.info("START");

		fakerComponent.createDefaultAccounts();
		
		fakerComponent.createAccounts(0);
		
		fakerComponent.createPosts(0);
		
		log.info("STOP");		
	}

}
