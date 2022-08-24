package org.demo.backend.repository;

import java.util.List;

import org.demo.backend.model.AdminUser;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "application")
public class AdminUserRepository {

	@Getter
	@Setter
	private List<AdminUser> users;

}
