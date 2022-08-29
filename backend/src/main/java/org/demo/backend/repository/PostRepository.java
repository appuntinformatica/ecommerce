package org.demo.backend.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.demo.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PostRepository extends CrudRepository<Post, Long>, JpaRepository<Post, Long> {
	
	@Override		/* --> (GET) http://localhost:8080/backend/api/posts/:id */
	@Query("SELECT p FROM Post p WHERE p.id = :id AND p.account = (SELECT a FROM Account a WHERE a.email = ?#{principal.username})") 
	Optional<Post> findById(@Param("id") Long id);
	
	@Override
	@Modifying
	@Transactional	/* --> (DELETE) http://localhost:8080/backend/api/posts/:id */
	@Query("DELETE Post p WHERE p.id = :id AND p.account = (SELECT a FROM Account a WHERE a.email = ?#{principal.username})") 
	void deleteById(@Param("id") Long id);
	
	/* http://localhost:8080/backend/api/posts */
	@Query(value = "SELECT p FROM Post p WHERE p.account.email = ?#{principal.username}",
			countQuery = "SELECT COUNT(p) FROM Post p WHERE p.account.email = ?#{principal.username}")
	Page<Post> findAll(Pageable pageable);
	
	
	/* http://localhost:8080/backend/api/posts/search/findByTitleOrContent?query=lorem */
	@Query(value = "SELECT p FROM Post p WHERE p.account.email = ?#{principal.username} AND "
						+ "(:query = '' OR "
						+ "LOWER(p.title) LIKE LOWER( CONCAT('%', :query, '%') ) OR "
						+ "LOWER(p.content) LIKE LOWER( CONCAT('%', :query, '%') )"
						+ ")",
			countQuery = "SELECT COUNT(p) FROM Post p WHERE p.account.email = ?#{principal.username} AND "
						+ "(:query = '' OR "
						+ "LOWER(p.title) LIKE LOWER( CONCAT('%', :query, '%') ) OR "
						+ "LOWER(p.content) LIKE LOWER( CONCAT('%', :query, '%') )"
						+ ")")
	Page<Post> findByTitleOrContent(@Param("query") String query, Pageable pageable);
	
	@Modifying
	@Transactional   /* PUT http://localhost:8080/backend/api/posts */
	@Query("UPDATE Post p SET p.title = :title WHERE p.id = :id AND p.account = (SELECT a FROM Account a WHERE a.email = ?#{principal.username})") 
	/* https://stackoverflow.com/questions/40755008/spring-data-rest-update-produce-cross-join-sql-error */
	int update(@Param("id") Long id, @Param("title") String title);

	
}