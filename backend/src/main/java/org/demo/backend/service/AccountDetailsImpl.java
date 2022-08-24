package org.demo.backend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.demo.backend.model.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AccountDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Account account;
	private List<GrantedAuthority> authorities;
	
	public AccountDetailsImpl(Account account) {
		this.account = account;
		authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(account.getRole().name()) ); 
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getPassword() {
		return this.account.getPassword();
	}

	@Override
	public String getUsername() {		
		return this.account.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.account.isEnabled();
	}

}
