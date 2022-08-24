package org.demo.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.demo.backend.dto.LoginRequestDto;
import org.demo.backend.service.AccountDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.spring.JwtResponse;
import io.jsonwebtoken.spring.JwtUtils;
import lombok.extern.slf4j.Slf4j;

// http://localhost:8080/backend/api/auth/login
@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtUtils jwtUtils;
	
    @Autowired
    PasswordEncoder encryptedPasswordEncoder;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {
		log.info(loginRequest.toString());
		
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(), 
				loginRequest.getPassword());
		authentication = authenticationManager.authenticate(authentication);
		log.info("auth: {}", authentication.toString());
		
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	
    	JwtResponse jwtResponse = jwtUtils.generateJwtResponse(authentication);
	
    	AccountDetailsImpl userDetails = (AccountDetailsImpl) authentication.getPrincipal();    
		List<String> roles = userDetails.getAuthorities().stream()
	        .map(item -> item.getAuthority())
	        .collect(Collectors.toList());
		
		jwtResponse.setRoles(roles);

		return ResponseEntity.ok(jwtResponse);
	}
	
	

}