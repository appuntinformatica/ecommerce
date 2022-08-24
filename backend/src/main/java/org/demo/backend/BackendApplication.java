package org.demo.backend;

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
	private PostFaker postFaker;

	@Override
	public void run(String... args) throws Exception {
		log.info("START");

		postFaker.createDefaultAccounts();
		
		postFaker.createAccounts(0);
		
		postFaker.createPosts(0);
		
		log.info("STOP");		
	}

}
