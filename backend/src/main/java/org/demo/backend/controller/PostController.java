package org.demo.backend.controller;

import org.demo.backend.model.Post;
import org.demo.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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
	private PostRepository postRepository;
	
	@PutMapping("update/{id}")
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Post post) {
		log.info("Start id: {}", id);
		log.info("title: {}", post.getTitle());

		int rm = postRepository.update(id, post.getTitle());
		
		log.info("result: {}", rm);
		return ResponseEntity.ok(rm);
	}

}
