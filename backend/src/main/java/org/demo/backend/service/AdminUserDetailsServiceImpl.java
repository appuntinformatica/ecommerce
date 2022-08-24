package org.demo.backend.service;

import java.util.Arrays;
import java.util.Optional;

import org.demo.backend.model.AdminUser;
import org.demo.backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.transaction.annotation.Transactional;


import lombok.extern.slf4j.Slf4j;

@Slf4j
//@Service
public class AdminUserDetailsServiceImpl implements UserDetailsService {
  
	@Autowired
	private AdminUserRepository userRepository;
	
	@Override
	@Transactional
	 public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("username = {}", username);

		Optional<AdminUser> user = Arrays
		        .stream(userRepository.getUsers().toArray(new AdminUser[userRepository.getUsers().size()]))
		        .filter(u -> u.getUsername().equals(username)) 
		        .findFirst();
		if (user.isEmpty())
			throw new UsernameNotFoundException("User Not Found with username: " + username);
		
	    return AdminUserDetailsImpl.build(user.get());
	  }

}
