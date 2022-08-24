package org.demo.backend.service;

import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.demo.backend.dto.PasswordDto;
import org.demo.backend.event.OnMailSenderCompleteEvent;
import org.demo.backend.model.Account;
import org.demo.backend.model.PasswordResetToken;
import org.demo.backend.model.Role;
import org.demo.backend.repository.AccountRepository;
import org.demo.backend.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AccountService {

    @Autowired
    PasswordEncoder encryptedPasswordEncoder;
    
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	PasswordResetTokenRepository passwordResetTokenRepository;

	@Autowired
	ApplicationEventPublisher eventPublisher;
	
	public boolean enableAccount(Account account) {				
		account.setEnabled(true);
		account.setToken(null);
		account = accountRepository.save(account);
		if ( account != null && account.getId() != null ) {
			return true;	
		} else {
			log.warn("Account Not Enabled!");
			return false;
		}
	}
	
	public boolean registerAccount(String email, String password) {
		log.info("email = {}", email);
		
		String token = UUID.randomUUID().toString();    
        
        Account account = Account.builder()
        		.email( email )
        		.password( encryptedPasswordEncoder.encode(password) )
        		.enabled(false)
        		.token(token)
        		.role(Role.ROLE_ACCOUNT)
    		.build();
		
        account = accountRepository.save(account);
        if ( account == null || account.getId() == null ) {
        	log.warn("Account NOT CREATED!");
        	return false;
        }
    	
        log.info("Account created! id = {}", account.getId());
    	eventPublisher.publishEvent(new OnMailSenderCompleteEvent(account, "CONFIRM LINK: http://localhost:8080/backend/api/auth/registrationConfirm?token=" + token));
		return true;
	}
	
	public boolean resetPassword(String email) {
		log.info("email = {}", email);
		Optional<Account> account = accountRepository.findByEmail(email);
		if ( account.isEmpty() ) {
			log.warn("email NOT FOUND!");
			return false;
		}
		
		final String token = UUID.randomUUID().toString();
		
		PasswordResetToken prt = new PasswordResetToken(token, account.get());
		prt = passwordResetTokenRepository.save(prt);
		
		if ( prt == null || prt.getId() == null ) {
			log.warn("Reset Token FAILED!");
			return false;
		}
		
    	log.info("Account created! id = {}", prt.getId());
    	eventPublisher.publishEvent(new OnMailSenderCompleteEvent(account.get(), "CONFIRM LINK: http://localhost:8080/backend/api/auth/account/changePassword?token=" + token));
		return true;
	}

	public boolean updatePassword(@Valid PasswordDto passwordDto) {
		log.info("passwordDto = {}", passwordDto.toString());
		
		Account account = null;
		Optional<Account> accountR = accountRepository.findByEmail(passwordDto.getEmail());
		if ( accountR.isPresent() ) {
			account = accountR.get();
		} else {
			Optional<PasswordResetToken> prt = passwordResetTokenRepository.findByToken( passwordDto.getToken() );
			if ( prt.isPresent() ) {
				account = prt.get().getAccount();
			}
		}
		if ( account == null ) {
			log.warn("Account NOT FOUND!");
			return false;
		}

		account.setPassword( encryptedPasswordEncoder.encode(passwordDto.getNewPassword()) );
		account = accountRepository.save(account);
		if ( account == null || account.getId() == null ) {
        	log.warn("Password NOT UPDATED!");
        	return false;
        }
		log.info("Password UPDATED!");
		return true;
	}
}
