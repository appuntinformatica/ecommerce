package org.demo.backend.repository;

import java.util.Optional;

import org.demo.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface AccountRepository extends CrudRepository<Account, Long>, JpaRepository<Account, Long> {

	public boolean existsByEmail(String email);

	public Optional<Account> findByEmail(String email);

	public Optional<Account> findByToken(String token);

}
