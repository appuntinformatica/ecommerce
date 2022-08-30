package org.demo.backend.filter;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.ServletRequestPathFilter;

import lombok.extern.slf4j.Slf4j;

import org.demo.backend.component.AccountComponent;
import org.demo.backend.model.Account;
import org.demo.backend.repository.AccountRepository;

 
@Slf4j
@Component
public class PostRequestResponseFilter extends ServletRequestPathFilter {
 
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountComponent accountComponent;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	log.info("username = {}", username);

    	Optional<Account> account = accountRepository.findByEmail( username );
		if ( account.isPresent() ) {

			accountComponent.setId( account.get().getId() );
		} else {
	    	((HttpServletResponse) response).setStatus(HttpStatus.UNAUTHORIZED.value());		
		}

		chain.doFilter(request, response);
    }
}
