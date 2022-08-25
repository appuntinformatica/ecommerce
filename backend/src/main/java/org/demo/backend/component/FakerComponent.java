package org.demo.backend.component;

import java.util.List;
import java.util.Locale;

import org.demo.backend.model.Account;
import org.demo.backend.model.Post;
import org.demo.backend.model.Role;
import org.demo.backend.repository.AccountRepository;
import org.demo.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FakerComponent {

	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	PostRepository postRepository;

    @Autowired
    PasswordEncoder encryptedPasswordEncoder;
    
    public void createDefaultAccounts() {
    	if ( accountRepository.existsByEmail("demo@domain") == false ) {
    		Account account = Account.builder()
    				.email( "demo@domain" )
    				.password( encryptedPasswordEncoder.encode("demo") )
    				.enabled(true)
    				.role(Role.ROLE_ACCOUNT)
    			.build();
    		account = accountRepository.save(account);
    		if ( account != null && account.getId() != null ) {
    			log.info("Account demo created");
    		} else {
    			log.warn("Account demo NOT created");
    		}	
    	}
    }
    
	public void createAccounts(int total) {
		log.info("START total = {}", total);
		for ( int index = 1; index <= total; index++ ) {
			Faker faker = new Faker(Locale.ITALIAN);
			String email = faker.internet().emailAddress();
			
			
			Account account = Account.builder()
					.email( email )
					.password( encryptedPasswordEncoder.encode(email) )
					.enabled(true)
					.role(Role.ROLE_ACCOUNT)
				.build();
			account = accountRepository.save(account);
			if ( account != null && account.getId() != null ) {
				log.info("{}] accountId = {}, email = '{}' created", index, account.getId(), email);
			} else {
				log.warn("{}] Account with email = {} not created!", index, email);
			}			
		}
		log.info("END");
	}

	public void createPosts(int total) {
		log.info("START total = {}", total);
		
		List<Account> accounts = accountRepository.findAll(Sort.by("email"));
		log.info("accounts.size() = {}", accounts.size());
		
		for (Account account : accounts) {
			for ( int index = 1; index <= total; index++ ) {
				Faker faker = new Faker(Locale.ITALIAN);

				for ( int i = 0; i < total; i++ ) {
					Post post = Post.builder()
							.account(account)
							.title( faker.lorem().sentence() )
							.content( faker.lorem().paragraph() )
							.datetime( faker.date().birthday() )
						.build();

					Post postCreated = postRepository.save(post);
					if ( postCreated != null ) {
						log.info("postCreated.id = {}", postCreated.getId());
					} else {
						log.warn("postCreated FAILED!");
					}	
				}
			}	
		}
		log.info("END");
	}
}
