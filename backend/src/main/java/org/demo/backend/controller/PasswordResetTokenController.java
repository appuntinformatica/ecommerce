package org.demo.backend.controller;

import javax.validation.Valid;

import org.demo.backend.dto.PasswordDto;
import org.demo.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.spring.JwtMessages;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetTokenController {

	@Autowired
	AccountService accountService;
	
	@PostMapping("/account/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestParam String email) {
		if ( accountService.resetPassword(email) ) {
			return new ResponseEntity<String>(JwtMessages.SUCCESS.name(), HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(JwtMessages.UNKNOWN_ERROR.name(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/account/updatePassword")
	public ResponseEntity<String> updatePassword(@RequestBody @Valid PasswordDto passwordDto) {
		if ( accountService.updatePassword(passwordDto) ) {
			return new ResponseEntity<String>(JwtMessages.SUCCESS.name(), HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(JwtMessages.UNKNOWN_ERROR.name(), HttpStatus.BAD_REQUEST);
		}
	}
	
}
