package org.demo.backend.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class SignUpDto {
	
	@NotBlank
	private String email;

	@NotBlank
	private String password;

}
