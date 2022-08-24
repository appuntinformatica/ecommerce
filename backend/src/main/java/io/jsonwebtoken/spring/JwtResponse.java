package io.jsonwebtoken.spring;

import java.util.Date;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtResponse {
	
	private String token;
	private final String type = "Bearer";
	private String username;
	private List<String> roles;
	private Date expiration;
  
}
