package org.demo.backend.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class PasswordDto {

	String token;
	
	String email;
	
	String oldPassword;
	
    String newPassword;
    
}
