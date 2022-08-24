package org.demo.backend.service;

import java.util.Optional;

import org.demo.backend.model.Account;
import org.demo.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Primary
@Service
public class AccountDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("username = {}", username);

		Optional<Account> account = accountRepository.findByEmail(username);
		
		if ( account.isEmpty() ) {
			throw new UsernameNotFoundException("User Not Found with username: " + username);
		}

		return new AccountDetailsImpl( account.get() );
	}

}
