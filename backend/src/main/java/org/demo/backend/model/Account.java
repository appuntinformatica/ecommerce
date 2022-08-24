package org.demo.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "account")
public class Account {
	
	public Account() { }

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "ac_id")
	Long id;
	
	@Column(name = "ac_email", length = 100, nullable = false, unique = true)
	String email;
	
	@Column(name = "ac_password", length = 200, nullable = false)
	String password;

    @Column(name = "ac_enabled", nullable = false)
    boolean enabled;
    
    @Column(name = "ac_token", length = 256)
	String token;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "ac_role", length = 30)
	Role role;

}
