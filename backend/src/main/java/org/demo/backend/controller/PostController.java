package org.demo.backend.controller;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.demo.backend.model.Account;
import org.demo.backend.model.Post;
import org.demo.backend.repository.AccountRepository;
import org.demo.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@PostMapping("add")
	public ResponseEntity<?> add(@RequestBody Post post) {
		Account account = (Account) session.getAttribute("account");
		log.info("account.getId() = {}", account.getId());
		
		Post _post = Post.builder()
						.title(post.getTitle())
						.content(post.getContent())
						.datetime(new Date())
						.account(account)
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
		Account account = (Account) session.getAttribute("account");
		log.info("account.getId() = {}", account.getId());
		
		Post _post = Post.builder()
				.id(post.getId())
				.title(post.getTitle())
				.content(post.getContent())
				.datetime(post.getDatetime())
				.account(account)
			.build();
		
		_post = postRepository.save(_post);
		if ( _post == null || _post.getId() == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
		}

		return ResponseEntity.ok(true);
	}

}
