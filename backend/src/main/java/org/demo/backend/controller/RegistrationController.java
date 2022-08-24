package org.demo.backend.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.demo.backend.dto.SignUpDto;
import org.demo.backend.model.Account;
import org.demo.backend.repository.AccountRepository;
import org.demo.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.spring.JwtMessages;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

	@Autowired
	AccountService accountService;
	
    @Autowired
    PasswordEncoder encryptedPasswordEncoder;
    
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	ApplicationEventPublisher eventPublisher;
	
	@PostMapping("/signup")
    public ResponseEntity<String> registerAccount(@Valid @RequestBody SignUpDto signUpDto) {
		log.info("signUpDto: {}", signUpDto.toString());

		if ( accountRepository.existsByEmail(signUpDto.getEmail()) ) {
            return new ResponseEntity<String>(JwtMessages.EMAIL_EXISTS.name(), HttpStatus.BAD_REQUEST);
        }
        
		if ( accountService.registerAccount(signUpDto.getEmail(), signUpDto.getPassword()) ) {
			return new ResponseEntity<String>(JwtMessages.SUCCESS.name(), HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(JwtMessages.UNKNOWN_ERROR.name(), HttpStatus.BAD_REQUEST);
		}
    }
	
	@GetMapping("/registrationConfirm")
	public ResponseEntity<String> confirmRegistration(@RequestParam("token") String token) {
		log.info("token = {}", token);
		
		Optional<Account> account = accountRepository.findByToken(token);
		if ( account.isEmpty() ) {
			log.warn("Account isEmpty!");
			return new ResponseEntity<String>(JwtMessages.INVALID_REFRESH_TOKEN.name(), HttpStatus.NOT_FOUND);
		}
		
		if ( accountService.enableAccount( account.get() ) ) {
			return new ResponseEntity<String>(JwtMessages.SUCCESS.name(), HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(JwtMessages.UNKNOWN_ERROR.name(), HttpStatus.BAD_REQUEST);
		}
	}
	
}
