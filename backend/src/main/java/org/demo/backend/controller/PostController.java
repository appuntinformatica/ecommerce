package org.demo.backend.controller;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.demo.backend.component.AccountComponent;
import org.demo.backend.model.Post;
import org.demo.backend.repository.AccountRepository;
import org.demo.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/posts")
@RestController
public class PostController {	 

	@Autowired
	HttpSession session;

	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired 
	AccountComponent accountComponent;
	
	@PostMapping("add")
	public ResponseEntity<?> add(@RequestBody Post post) {
		log.info("account.getId() = {}", accountComponent.getId());
		log.info("{}", post.getDatetime());
		
		Post _post = Post.builder()
						.title(post.getTitle())
						.content(post.getContent())
						.datetime(post.getDatetime())
						.account(accountComponent)
					.build();

		_post = postRepository.save(_post);
		
		if ( _post == null || _post.getId() == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
		}
		
		log.info("result: {}", _post.getId());
		
		return ResponseEntity.ok(_post.getId());
	}

	/* PUT http://localhost:8080/backend/api/posts/update/:id */
	@PutMapping("update/{id}")
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Post post) {
		log.info("id = {}, account.getId() = {}", id, accountComponent.getId());
		
		Post _post = postRepository.findById(id).get();
		_post.setTitle( post.getTitle() );
		_post.setContent( post.getContent() );
		_post.setDatetime( post.getDatetime() );

		_post = postRepository.save(_post);
		if ( _post == null || _post.getId() == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
		}

		return ResponseEntity.ok(true);
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		log.info("id = {}, account.getId() = {}", id, accountComponent.getId());
		
		postRepository.deleteById(id);

		return ResponseEntity.ok(true);
	}


}
