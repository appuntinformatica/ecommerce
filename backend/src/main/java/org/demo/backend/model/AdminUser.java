package org.demo.backend.model;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class AdminUser {

	private long id;
	
	private String username;
	
	private String password;
	
	private String[] roles;

}