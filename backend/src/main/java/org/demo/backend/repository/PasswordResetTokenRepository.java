package org.demo.backend.repository;

import java.util.Optional;

import org.demo.backend.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface PasswordResetTokenRepository extends CrudRepository<PasswordResetToken, Long>, JpaRepository<PasswordResetToken, Long> {

	Optional<PasswordResetToken> findByToken(String token);

}
