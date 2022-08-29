package org.demo.backend.filter;

import org.demo.backend.model.Account;
import org.demo.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.ServletRequestPathFilter;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
 
@Slf4j
@Component
public class PostRequestResponseFilter extends ServletRequestPathFilter {
 
	@Autowired
	AccountRepository accountRepository;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	log.info("username = {}", username);
    	
    	HttpServletRequest req = (HttpServletRequest) request;
    	HttpServletResponse res = (HttpServletResponse) response;
    	
    	Optional<Account> account = accountRepository.findByEmail( username );
		if ( account.isPresent() ) {
			req.getSession().setAttribute("account", account.get());
		} else {
			res.setStatus(HttpStatus.UNAUTHORIZED.value());		
		}

		chain.doFilter(request, response);
    }
}
