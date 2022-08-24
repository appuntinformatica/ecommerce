package org.demo.backend.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class LoginRequestDto {
	
	@NotBlank
	private String username;

	@NotBlank
	private String password;

}
